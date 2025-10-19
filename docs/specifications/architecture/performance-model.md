---
id: performance-model
title: Performance Model
---

# Performance Model Specification

## Overview

The Performance Model defines targets, budgets, optimization strategies, and measurement criteria for the Abu OS 98 Web Kernel. As a reusable library, performance is critical for adoption and user experience.

## Performance Principles

1. **Budget-Driven** - Hard limits, not aspirational goals
2. **Measurable** - Objective metrics, automated monitoring
3. **User-Centric** - Optimize for perceived performance
4. **Library-First** - Minimal overhead for consumers
5. **No Premature Optimization** - Profile before optimizing
6. **Regress** - Performance tests in CI/CD

## Performance Budgets

### Bundle Size

| Metric | Target | Maximum | Measured |
|--------|--------|---------|----------|
| Total (gzipped) | 30KB | 50KB | Build output |
| Total (uncompressed) | 90KB | 150KB | Build output |
| CSS (gzipped) | 5KB | 10KB | style.css |
| Tree-shaken import | 10KB | 20KB | Per-component |

**Enforcement:**
- CI fails if bundle > Maximum
- Warning if bundle > Target
- Track trend over time (no regressions)

**Measurement:**
```
npm run build
gzip -c dist/index.js | wc -c     # JS size
gzip -c dist/style.css | wc -c    # CSS size
```

### Runtime Memory

| Metric | Target | Maximum |
|--------|--------|---------|
| Initial load (empty desktop) | 2MB | 5MB |
| Per window | 100KB | 200KB |
| 10 windows open | 3MB | 7MB |
| Peak (20 windows) | 5MB | 10MB |

**Enforcement:**
- Browser DevTools Memory Profiler
- Automated tests with memory snapshots
- CI fails if memory leak detected

**Measurement:**
```
1. Open DevTools → Memory tab
2. Take heap snapshot (baseline)
3. Open 10 windows
4. Take heap snapshot (loaded)
5. Close all windows
6. Force GC
7. Take heap snapshot (cleanup)
8. Compare: cleanup should ≈ baseline
```

### Render Performance

| Metric | Target | Maximum |
|--------|--------|---------|
| Initial render (Shell) | 50ms | 100ms |
| Open window | 16ms | 32ms (60fps, 30fps) |
| Drag window (per frame) | 8ms | 16ms (120fps, 60fps) |
| Resize window (per frame) | 8ms | 16ms |
| Theme toggle | 16ms | 32ms |

**Enforcement:**
- Performance.mark/measure
- CI performance tests
- Real device testing (not just dev machines)

**Measurement:**
```
performance.mark('window-open-start');
windowManager.open('test-plugin');
performance.mark('window-open-end');
performance.measure('window-open', 'window-open-start', 'window-open-end');
```

### Network (HTTPKernel)

| Operation | Target | Maximum |
|-----------|--------|---------|
| getSystemInfo() | RTT + 50ms | RTT + 200ms |
| executeCommand() | RTT + 100ms | RTT + 5000ms |
| Connection reuse | Yes | N/A |
| Concurrent requests | 6 | Browser limit |

## Optimization Strategies

### Bundle Size Optimization

**Tree-Shaking:**
- ES modules only (no CommonJS)
- Side-effect free code
- Proper package.json exports field
- Individual component exports

**Code Splitting:**
- Lazy load plugin components (dynamic import)
- Separate CSS bundle (optional import)
- Defer non-critical features

**Minification:**
- esbuild minification (production)
- CSS minification (cssnano)
- Remove console.log in production
- Dead code elimination

**Dependencies:**
- Zero runtime dependencies
- Peer dependencies only (Svelte)
- No large libraries (moment, lodash, etc.)
- Inline small utilities (`< 100` bytes)

### Runtime Performance Optimization

**Virtual Rendering:**
```
Render only visible windows:
  - Skip minimized windows (isMinimized=true)
  - Unmount component when minimized
  - Remount when restored

Desktop icons:
  - Virtual scrolling if > 100 icons
  - Render viewport + 1 screen margin
  - Update on scroll
```

**Debouncing:**
```
localStorage writes:
  - Window position/size: 500ms debounce
  - Theme: Immediate (critical)
  - Audio: 500ms debounce

Event handlers:
  - Window drag: requestAnimationFrame
  - Window resize: requestAnimationFrame
  - Scroll: 100ms debounce
```

**Memoization:**
```
Derived state ($derived):
  - visibleWindows (computed once per windows change)
  - sortedDesktopIcons (computed once per change)
  - focusedWindow (computed once per focus change)

Avoid:
  - Inline filter/map/sort in render
  - Recreating objects/arrays in getters
  - Expensive computations in templates
```

**Z-Index Compaction:**
```
Prevent unbounded growth:
  - Compact every 100 focus operations
  - Re-assign z-indices sequentially
  - O(n) operation, rare execution
```

### Memory Management

**Component Lifecycle:**
```
Window open:
  - Create component instance
  - Mount in DOM

Window close:
  - Unmount component
  - Svelte auto-cleanup ($effect returns)
  - GC collects instance

Window minimize:
  - Unmount component (free DOM)
  - Keep state in windowManager
  - Restore on un-minimize
```

**Event Listener Cleanup:**
```
All $effect with listeners:
  $effect(() => {
    const handler = () => {...};
    element.addEventListener('click', handler);
    return () => element.removeEventListener('click', handler);
  });

Avoid:
  - Global listeners without cleanup
  - Timer/interval without clearInterval
  - Observers without disconnect
```

**localStorage Management:**
```
Quota limits:
  - Max TTL: 7 days (auto-delete old state)
  - Max windows in history: 10
  - Compress large states (future)

Cleanup:
  - On quota exceeded: Delete old data, retry
  - On app unload: No action (data persists)
```

### Render Performance

**Batch DOM Updates:**
```
Svelte reactivity:
  - Batches updates automatically
  - Multiple $state changes → single render

Avoid:
  - Direct DOM manipulation
  - Layout thrashing (read→write→read→write)
  - Forced synchronous layout
```

**RequestAnimationFrame:**
```
Smooth animations:
  - Window drag: Update position on RAF
  - Window resize: Update size on RAF
  - Scroll: Update virtual list on RAF

Pattern:
  let rafId: number | null = null;
  function updatePosition(x: number, y: number) {
    if (rafId) return; // Throttle to 60fps
    rafId = requestAnimationFrame(() => {
      position.x = x;
      position.y = y;
      rafId = null;
    });
  }
```

**CSS Performance:**
```
Avoid:
  - CSS transitions (Windows 98 has none)
  - CSS animations (instant state changes)
  - Box-shadow blur (use solid shadows)
  - Gradients in light theme (solid colors)

Use:
  - Transform for movement (GPU-accelerated)
  - Will-change for dragging windows
  - Contain: layout (limit reflow scope)
```

## Performance Measurement

### Build-Time Metrics

**Automated in CI:**
```bash
# Bundle size
npm run build
SIZE=$(gzip -c dist/index.js | wc -c)
if [ $SIZE -gt 51200 ]; then  # 50KB
  echo "Bundle too large: $SIZE bytes"
  exit 1
fi
```

**Bundle Analysis:**
```bash
# Visualize bundle composition
npm run build -- --metafile
esbuild-visualizer dist/meta.json
```

### Runtime Metrics

**Performance Markers:**
```typescript
// In critical paths
performance.mark('shell-mount-start');
// ... mount Shell
performance.mark('shell-mount-end');
performance.measure('shell-mount', 'shell-mount-start', 'shell-mount-end');

// Extract metrics
const measures = performance.getEntriesByType('measure');
const shellMount = measures.find(m => m.name === 'shell-mount');
console.log(`Shell mount: ${shellMount.duration}ms`);
```

**Memory Profiling:**
```typescript
// In tests
async function measureMemory(action: () => void) {
  // Force GC (Chrome --expose-gc flag required)
  if (global.gc) global.gc();
  
  const before = (performance as any).memory.usedJSHeapSize;
  action();
  await new Promise(resolve => setTimeout(resolve, 100)); // Settle
  
  if (global.gc) global.gc();
  const after = (performance as any).memory.usedJSHeapSize;
  
  return after - before;
}
```

**Frame Rate Monitoring:**
```typescript
let frameCount = 0;
let lastTime = performance.now();

function measureFPS() {
  frameCount++;
  const now = performance.now();
  
  if (now - lastTime >= 1000) {
    const fps = frameCount;
    console.log(`FPS: ${fps}`);
    frameCount = 0;
    lastTime = now;
  }
  
  requestAnimationFrame(measureFPS);
}
```

### User-Centric Metrics

**Core Web Vitals:**

| Metric | Target | Maximum |
|--------|--------|---------|
| LCP (Largest Contentful Paint) | 1.0s | 2.5s |
| FID (First Input Delay) | 50ms | 100ms |
| CLS (Cumulative Layout Shift) | 0.05 | 0.1 |

**Custom Metrics:**

| Metric | Target | Maximum |
|--------|--------|---------|
| Time to Interactive (TTI) | 1.5s | 3.0s |
| First Window Open | 100ms | 200ms |
| Theme Toggle Response | 16ms | 32ms |

## Performance Testing

### Unit Tests

**Bundle Size:**
```typescript
test('bundle size when built then under 50KB gzipped', async () => {
  const size = await getBundleSize('dist/index.js');
  expect(size).toBeLessThan(50 * 1024);
});
```

**Memory Leaks:**
```typescript
test('window lifecycle when 100 windows opened and closed then no leak', async () => {
  const initialMemory = getMemoryUsage();
  
  for (let i = 0; i < 100; i++) {
    const id = windowManager.open('test-plugin');
    windowManager.close(id);
  }
  
  await forceGC();
  const finalMemory = getMemoryUsage();
  
  // Allow 1MB tolerance
  expect(finalMemory - initialMemory).toBeLessThan(1024 * 1024);
});
```

**Render Performance:**
```typescript
test('window drag when dragged 1000px then completes in under 100ms', () => {
  const id = windowManager.open('test-plugin');
  
  performance.mark('drag-start');
  for (let x = 0; x < 1000; x += 10) {
    windowManager.move(id, {x, y: 100});
  }
  performance.mark('drag-end');
  
  const measure = performance.measure('drag', 'drag-start', 'drag-end');
  expect(measure.duration).toBeLessThan(100);
});
```

### Integration Tests

**Real Browser Testing:**
```typescript
test('shell render when mounted then completes in under 100ms', async () => {
  const { container } = render(Shell, { plugins: [] });
  
  const perfEntries = performance.getEntriesByType('measure');
  const renderTime = perfEntries.find(e => e.name === 'shell-render');
  
  expect(renderTime.duration).toBeLessThan(100);
});
```

### Performance CI

**GitHub Actions:**
```yaml
- name: Performance Test
  run: |
    npm run build
    npm run test:performance
    
- name: Bundle Size Check
  run: |
    SIZE=$(gzip -c dist/index.js | wc -c)
    echo "Bundle size: $SIZE bytes"
    if [ $SIZE -gt 51200 ]; then
      echo "::error::Bundle exceeds 50KB limit"
      exit 1
    fi
```

**Lighthouse CI:**
```yaml
- name: Run Lighthouse
  uses: treosh/lighthouse-ci-action@v9
  with:
    urls: http://localhost:3000
    budgetPath: ./lighthouse-budget.json
```

## Performance Regression Detection

### Baseline Tracking

**Store baseline metrics in repo:**
```json
{
  "bundleSize": 45000,
  "shellRender": 65,
  "windowOpen": 12,
  "memoryPeak": 4500000
}
```

**Compare on each build:**
```bash
# Alert if > 5% regression
if [ $CURRENT_SIZE -gt $((BASELINE_SIZE * 105 / 100)) ]; then
  echo "::warning::Bundle size increased by >5%"
fi
```

### Continuous Monitoring

**Track metrics over time:**
- Bundle size per commit
- Render times per commit
- Memory usage per commit
- Graph trends (detect gradual regressions)

## Platform-Specific Considerations

### Desktop Browsers

**Targets:**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

**Assumptions:**
- Fast CPU (4+ cores)
- Adequate RAM (8GB+)
- GPU available

### Mobile Browsers (Future)

**Targets:**
- Mobile Chrome/Safari
- Mid-range devices (2019+)

**Adjustments:**
- Reduce max windows: 10 (vs 20 desktop)
- Increase debounce: 1000ms (vs 500ms)
- Disable animations entirely
- Smaller bundle budget: 30KB (vs 50KB)

### Low-End Devices

**Graceful Degradation:**
- Detect slow devices (performance.now() baseline)
- Reduce max windows automatically
- Increase debounce timings
- Disable non-essential features

## Summary

Performance Model defines:

- **Hard Budgets** - Bundle: 50KB, Memory: 10MB peak, Render: 16ms
- **Optimization Strategies** - Virtual rendering, debouncing, memoization
- **Measurement** - Automated in CI, real device testing
- **Regression Prevention** - Baseline tracking, continuous monitoring
- **Platform Awareness** - Desktop-first, mobile-conscious

All targets measurable, enforced, and tracked over time.
