/**
 * Setup file for style tests
 * 
 * This file sets up the testing environment for style tests,
 * including DOM mocking and global test utilities.
 */

import { beforeAll, afterAll } from 'vitest';
import { JSDOM } from 'jsdom';

// Global test utilities
declare global {
  var createTestElement: (tagName: string, className?: string, textContent?: string) => HTMLElement;
  var getComputedStyle: (element: HTMLElement) => CSSStyleDeclaration;
  var simulateEvent: (element: HTMLElement, eventType: string) => void;
}

beforeAll(() => {
  // Set up global test utilities
  global.createTestElement = (tagName: string, className?: string, textContent?: string): HTMLElement => {
    const element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    if (textContent) {
      element.textContent = textContent;
    }
    return element;
  };

  global.getComputedStyle = (element: HTMLElement): CSSStyleDeclaration => {
    return element.ownerDocument.defaultView!.getComputedStyle(element);
  };

  global.simulateEvent = (element: HTMLElement, eventType: string): void => {
    const event = new Event(eventType);
    element.dispatchEvent(event);
  };
});

afterAll(() => {
  // Clean up global utilities
  delete (global as any).createTestElement;
  delete (global as any).getComputedStyle;
  delete (global as any).simulateEvent;
});
