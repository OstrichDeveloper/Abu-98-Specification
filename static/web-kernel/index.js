var eo = Object.defineProperty;
var _s = (n) => {
  throw TypeError(n);
};
var to = (n, e, t) => e in n ? eo(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var sr = (n, e, t) => to(n, typeof e != "symbol" ? e + "" : e, t), Li = (n, e, t) => e.has(n) || _s("Cannot " + t);
var ue = (n, e, t) => (Li(n, e, "read from private field"), t ? t.call(n) : e.get(n)), Xe = (n, e, t) => e.has(n) ? _s("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), Ae = (n, e, t, r) => (Li(n, e, "write to private field"), r ? r.call(n, t) : e.set(n, t), t), at = (n, e, t) => (Li(n, e, "access private method"), t);
var xr = Array.isArray, no = Array.prototype.indexOf, rs = Array.from, di = Object.defineProperty, En = Object.getOwnPropertyDescriptor, Js = Object.getOwnPropertyDescriptors, ro = Object.prototype, io = Array.prototype, is = Object.getPrototypeOf, ys = Object.isExtensible;
function zr(n) {
  return typeof n == "function";
}
const un = () => {
};
function so(n) {
  for (var e = 0; e < n.length; e++)
    n[e]();
}
function Zs() {
  var n, e, t = new Promise((r, s) => {
    n = r, e = s;
  });
  return { promise: t, resolve: n, reject: e };
}
const Et = 2, ss = 4, as = 8, Zn = 16, hn = 32, Qn = 64, os = 128, Pt = 256, ui = 512, ut = 1024, jt = 2048, In = 4096, Xt = 8192, $n = 16384, ls = 32768, Sr = 65536, ks = 1 << 17, ao = 1 << 18, Tr = 1 << 19, oo = 1 << 20, qi = 1 << 21, _i = 1 << 22, Un = 1 << 23, nn = Symbol("$state"), Qs = Symbol("legacy props"), lo = Symbol(""), Dr = new class extends Error {
  constructor() {
    super(...arguments);
    sr(this, "name", "StaleReactionError");
    sr(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}(), cs = 3, er = 8;
function yi(n) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function co() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function uo(n) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function vo() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function fo(n) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function ho() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function po() {
  throw new Error("https://svelte.dev/e/hydration_failed");
}
function mo(n) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function go() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function bo() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function wo() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function _o() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const ki = 1, xi = 2, $s = 4, yo = 8, ko = 16, xo = 1, So = 4, To = 8, Eo = 16, Co = 1, zo = 2, ea = "[", Si = "[!", ds = "]", Vn = {}, lt = Symbol(), Mo = "http://www.w3.org/1999/xhtml";
function Gr(n) {
  console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Io() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Ao() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
let De = !1;
function Vt(n) {
  De = n;
}
let We;
function vt(n) {
  if (n === null)
    throw Gr(), Vn;
  return We = n;
}
function Yn() {
  return vt(
    /** @type {TemplateNode} */
    /* @__PURE__ */ Jt(We)
  );
}
function l(n) {
  if (De) {
    if (/* @__PURE__ */ Jt(We) !== null)
      throw Gr(), Vn;
    We = n;
  }
}
function rn(n = 1) {
  if (De) {
    for (var e = n, t = We; e--; )
      t = /** @type {TemplateNode} */
      /* @__PURE__ */ Jt(t);
    We = t;
  }
}
function vi(n = !0) {
  for (var e = 0, t = We; ; ) {
    if (t.nodeType === er) {
      var r = (
        /** @type {Comment} */
        t.data
      );
      if (r === ds) {
        if (e === 0) return t;
        e -= 1;
      } else (r === ea || r === Si) && (e += 1);
    }
    var s = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Jt(t)
    );
    n && t.remove(), t = s;
  }
}
function ta(n) {
  if (!n || n.nodeType !== er)
    throw Gr(), Vn;
  return (
    /** @type {Comment} */
    n.data
  );
}
function na(n) {
  return n === this.v;
}
function us(n, e) {
  return n != n ? e == e : n !== e || n !== null && typeof n == "object" || typeof n == "function";
}
function ra(n) {
  return !us(n, this.v);
}
let et = null;
function br(n) {
  et = n;
}
function wp(n) {
  return (
    /** @type {T} */
    sa().get(n)
  );
}
function _p(n, e) {
  return sa().set(n, e), e;
}
function Fe(n, e = !1, t) {
  et = {
    p: et,
    c: null,
    e: null,
    s: n,
    x: null,
    l: null
  };
}
function Oe(n) {
  var e = (
    /** @type {ComponentContext} */
    et
  ), t = e.e;
  if (t !== null) {
    e.e = null;
    for (var r of t)
      Ta(r);
  }
  return n !== void 0 && (e.x = n), et = e.p, n ?? /** @type {T} */
  {};
}
function ia() {
  return !0;
}
function sa(n) {
  return et === null && yi(), et.c ?? (et.c = new Map(Do(et) || void 0));
}
function Do(n) {
  let e = n.p;
  for (; e !== null; ) {
    const t = e.c;
    if (t !== null)
      return t;
    e = e.p;
  }
  return null;
}
let Fn = [];
function aa() {
  var n = Fn;
  Fn = [], so(n);
}
function fn(n) {
  if (Fn.length === 0 && !Lr) {
    var e = Fn;
    queueMicrotask(() => {
      e === Fn && aa();
    });
  }
  Fn.push(n);
}
function Lo() {
  for (; Fn.length > 0; )
    aa();
}
const Ro = /* @__PURE__ */ new WeakMap();
function oa(n) {
  var e = Pe;
  if (e === null)
    return He.f |= Un, n;
  if ((e.f & ls) === 0) {
    if ((e.f & os) === 0)
      throw !e.parent && n instanceof Error && la(n), n;
    e.b.error(n);
  } else
    wr(n, e);
}
function wr(n, e) {
  for (; e !== null; ) {
    if ((e.f & os) !== 0)
      try {
        e.b.error(n);
        return;
      } catch (t) {
        n = t;
      }
    e = e.parent;
  }
  throw n instanceof Error && la(n), n;
}
function la(n) {
  const e = Ro.get(n);
  e && (di(n, "message", {
    value: e.message
  }), di(n, "stack", {
    value: e.stack
  }));
}
const $r = /* @__PURE__ */ new Set();
let Ze = null, ti = null, Wi = /* @__PURE__ */ new Set(), tn = [], Ti = null, Ui = !1, Lr = !1;
var fr, hr, Pn, qr, pr, mr, Nn, gr, Wr, Ur, Nt, Ki, ni, Gi;
const ur = class ur {
  constructor() {
    Xe(this, Nt);
    /**
     * The current values of any sources that are updated in this batch
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Source, any>}
     */
    sr(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any sources that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Source, any>}
     */
    Xe(this, fr, /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<() => void>}
     */
    Xe(this, hr, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    Xe(this, Pn, 0);
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    Xe(this, qr, null);
    /**
     * Async effects inside a newly-created `<svelte:boundary>`
     * — these do not prevent the batch from committing
     * @type {Effect[]}
     */
    Xe(this, pr, []);
    /**
     * Template effects and `$effect.pre` effects, which run when
     * a batch is committed
     * @type {Effect[]}
     */
    Xe(this, mr, []);
    /**
     * The same as `#render_effects`, but for `$effect` (which runs after)
     * @type {Effect[]}
     */
    Xe(this, Nn, []);
    /**
     * Block effects, which may need to re-run on subsequent flushes
     * in order to update internal sources (e.g. each block items)
     * @type {Effect[]}
     */
    Xe(this, gr, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Effect[]}
     */
    Xe(this, Wr, []);
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Effect[]}
     */
    Xe(this, Ur, []);
    /**
     * A set of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`
     * @type {Set<Effect>}
     */
    sr(this, "skipped_effects", /* @__PURE__ */ new Set());
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(e) {
    tn = [], ti = null;
    var t = ur.apply(this);
    for (const a of e)
      at(this, Nt, Ki).call(this, a);
    if (ue(this, Pn) === 0) {
      at(this, Nt, Gi).call(this);
      var r = ue(this, mr), s = ue(this, Nn);
      Ae(this, mr, []), Ae(this, Nn, []), Ae(this, gr, []), ti = this, Ze = null, xs(r), xs(s), ti = null, ue(this, qr)?.resolve();
    } else
      at(this, Nt, ni).call(this, ue(this, mr)), at(this, Nt, ni).call(this, ue(this, Nn)), at(this, Nt, ni).call(this, ue(this, gr));
    t();
    for (const a of ue(this, pr))
      Nr(a);
    Ae(this, pr, []);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(e, t) {
    ue(this, fr).has(e) || ue(this, fr).set(e, t), this.current.set(e, e.v);
  }
  activate() {
    Ze = this;
  }
  deactivate() {
    Ze = null;
  }
  flush() {
    if (tn.length > 0) {
      if (this.activate(), ca(), Ze !== null && Ze !== this)
        return;
    } else ue(this, Pn) === 0 && at(this, Nt, Gi).call(this);
    this.deactivate();
    for (const e of Wi)
      if (Wi.delete(e), e(), Ze !== null)
        break;
  }
  increment() {
    Ae(this, Pn, ue(this, Pn) + 1);
  }
  decrement() {
    Ae(this, Pn, ue(this, Pn) - 1);
    for (const e of ue(this, Wr))
      bt(e, jt), Xn(e);
    for (const e of ue(this, Ur))
      bt(e, In), Xn(e);
    this.flush();
  }
  /** @param {() => void} fn */
  add_callback(e) {
    ue(this, hr).add(e);
  }
  settled() {
    return (ue(this, qr) ?? Ae(this, qr, Zs())).promise;
  }
  static ensure() {
    if (Ze === null) {
      const e = Ze = new ur();
      $r.add(Ze), Lr || ur.enqueue(() => {
        Ze === e && e.flush();
      });
    }
    return Ze;
  }
  /** @param {() => void} task */
  static enqueue(e) {
    fn(e);
  }
  /**
   * @param {Batch} current_batch
   */
  static apply(e) {
    return un;
  }
};
fr = new WeakMap(), hr = new WeakMap(), Pn = new WeakMap(), qr = new WeakMap(), pr = new WeakMap(), mr = new WeakMap(), Nn = new WeakMap(), gr = new WeakMap(), Wr = new WeakMap(), Ur = new WeakMap(), Nt = new WeakSet(), /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 */
Ki = function(e) {
  e.f ^= ut;
  for (var t = e.first; t !== null; ) {
    var r = t.f, s = (r & (hn | Qn)) !== 0, a = s && (r & ut) !== 0, o = a || (r & Xt) !== 0 || this.skipped_effects.has(t);
    if (!o && t.fn !== null) {
      s ? t.f ^= ut : (r & ss) !== 0 ? ue(this, Nn).push(t) : (r & ut) === 0 && ((r & _i) !== 0 && t.b?.is_pending() ? ue(this, pr).push(t) : Ii(t) && ((t.f & Zn) !== 0 && ue(this, gr).push(t), Nr(t)));
      var c = t.first;
      if (c !== null) {
        t = c;
        continue;
      }
    }
    var u = t.parent;
    for (t = t.next; t === null && u !== null; )
      t = u.next, u = u.parent;
  }
}, /**
 * @param {Effect[]} effects
 */
ni = function(e) {
  for (const t of e)
    ((t.f & jt) !== 0 ? ue(this, Wr) : ue(this, Ur)).push(t), bt(t, ut);
  e.length = 0;
}, /**
 * Append and remove branches to/from the DOM
 */
Gi = function() {
  var e;
  for (const t of ue(this, hr))
    t();
  if (ue(this, hr).clear(), $r.size > 1) {
    ue(this, fr).clear();
    let t = !0;
    for (const r of $r) {
      if (r === this) {
        t = !1;
        continue;
      }
      for (const [s, a] of this.current) {
        if (r.current.has(s))
          if (t)
            r.current.set(s, a);
          else
            continue;
        da(s);
      }
      if (tn.length > 0) {
        Ze = r;
        const s = ur.apply(r);
        for (const a of tn)
          at(e = r, Nt, Ki).call(e, a);
        tn = [], s();
      }
    }
    Ze = null;
  }
  $r.delete(this);
};
let dn = ur;
function Bo(n) {
  var e = Lr;
  Lr = !0;
  try {
    for (var t; ; ) {
      if (Lo(), tn.length === 0 && (Ze?.flush(), tn.length === 0))
        return Ti = null, /** @type {T} */
        t;
      ca();
    }
  } finally {
    Lr = e;
  }
}
function ca() {
  var n = vr;
  Ui = !0;
  try {
    var e = 0;
    for (Es(!0); tn.length > 0; ) {
      var t = dn.ensure();
      if (e++ > 1e3) {
        var r, s;
        Fo();
      }
      t.process(tn), Cn.clear();
    }
  } finally {
    Ui = !1, Es(n), Ti = null;
  }
}
function Fo() {
  try {
    ho();
  } catch (n) {
    wr(n, Ti);
  }
}
let Bn = null;
function xs(n) {
  var e = n.length;
  if (e !== 0) {
    for (var t = 0; t < e; ) {
      var r = n[t++];
      if ((r.f & ($n | Xt)) === 0 && Ii(r) && (Bn = [], Nr(r), r.deps === null && r.first === null && r.nodes_start === null && (r.teardown === null && r.ac === null ? Ma(r) : r.fn = null), Bn?.length > 0)) {
        Cn.clear();
        for (const s of Bn)
          Nr(s);
        Bn = [];
      }
    }
    Bn = null;
  }
}
function da(n) {
  if (n.reactions !== null)
    for (const e of n.reactions) {
      const t = e.f;
      (t & Et) !== 0 ? da(
        /** @type {Derived} */
        e
      ) : (t & (_i | Zn)) !== 0 && (bt(e, jt), Xn(
        /** @type {Effect} */
        e
      ));
    }
}
function Xn(n) {
  for (var e = Ti = n; e.parent !== null; ) {
    e = e.parent;
    var t = e.f;
    if (Ui && e === Pe && (t & Zn) !== 0)
      return;
    if ((t & (Qn | hn)) !== 0) {
      if ((t & ut) === 0) return;
      e.f ^= ut;
    }
  }
  tn.push(e);
}
function Oo(n) {
  let e = 0, t = Jn(0), r;
  return () => {
    Jo() && (i(t), Mi(() => (e === 0 && (r = An(() => n(() => Rr(t)))), e += 1, () => {
      fn(() => {
        e -= 1, e === 0 && (r?.(), r = void 0, Rr(t));
      });
    })));
  };
}
var Ho = Sr | Tr | os;
function Po(n, e, t) {
  new No(n, e, t);
}
var Ut, At, Kr, Qt, jn, $t, Ot, kt, en, yn, qn, kn, Wn, xn, bi, wi, ct, ua, va, ri, ii, Vi;
class No {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   */
  constructor(e, t, r) {
    Xe(this, ct);
    /** @type {Boundary | null} */
    sr(this, "parent");
    Xe(this, Ut, !1);
    /** @type {TemplateNode} */
    Xe(this, At);
    /** @type {TemplateNode | null} */
    Xe(this, Kr, De ? We : null);
    /** @type {BoundaryProps} */
    Xe(this, Qt);
    /** @type {((anchor: Node) => void)} */
    Xe(this, jn);
    /** @type {Effect} */
    Xe(this, $t);
    /** @type {Effect | null} */
    Xe(this, Ot, null);
    /** @type {Effect | null} */
    Xe(this, kt, null);
    /** @type {Effect | null} */
    Xe(this, en, null);
    /** @type {DocumentFragment | null} */
    Xe(this, yn, null);
    Xe(this, qn, 0);
    Xe(this, kn, 0);
    Xe(this, Wn, !1);
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    Xe(this, xn, null);
    Xe(this, bi, () => {
      ue(this, xn) && _r(ue(this, xn), ue(this, qn));
    });
    Xe(this, wi, Oo(() => (Ae(this, xn, Jn(ue(this, qn))), () => {
      Ae(this, xn, null);
    })));
    Ae(this, At, e), Ae(this, Qt, t), Ae(this, jn, r), this.parent = /** @type {Effect} */
    Pe.b, Ae(this, Ut, !!ue(this, Qt).pending), Ae(this, $t, Vr(() => {
      if (Pe.b = this, De) {
        const s = ue(this, Kr);
        Yn(), /** @type {Comment} */
        s.nodeType === er && /** @type {Comment} */
        s.data === Si ? at(this, ct, va).call(this) : at(this, ct, ua).call(this);
      } else {
        try {
          Ae(this, Ot, xt(() => r(ue(this, At))));
        } catch (s) {
          this.error(s);
        }
        ue(this, kn) > 0 ? at(this, ct, ii).call(this) : Ae(this, Ut, !1);
      }
    }, Ho)), De && Ae(this, At, We);
  }
  /**
   * Returns `true` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_pending() {
    return ue(this, Ut) || !!this.parent && this.parent.is_pending();
  }
  has_pending_snippet() {
    return !!ue(this, Qt).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   */
  update_pending_count(e) {
    at(this, ct, Vi).call(this, e), Ae(this, qn, ue(this, qn) + e), Wi.add(ue(this, bi));
  }
  get_effect_pending() {
    return ue(this, wi).call(this), i(
      /** @type {Source<number>} */
      ue(this, xn)
    );
  }
  /** @param {unknown} error */
  error(e) {
    var t = ue(this, Qt).onerror;
    let r = ue(this, Qt).failed;
    if (ue(this, Wn) || !t && !r)
      throw e;
    ue(this, Ot) && (Lt(ue(this, Ot)), Ae(this, Ot, null)), ue(this, kt) && (Lt(ue(this, kt)), Ae(this, kt, null)), ue(this, en) && (Lt(ue(this, en)), Ae(this, en, null)), De && (vt(
      /** @type {TemplateNode} */
      ue(this, Kr)
    ), rn(), vt(vi()));
    var s = !1, a = !1;
    const o = () => {
      if (s) {
        Ao();
        return;
      }
      s = !0, a && _o(), dn.ensure(), Ae(this, qn, 0), ue(this, en) !== null && Kn(ue(this, en), () => {
        Ae(this, en, null);
      }), Ae(this, Ut, this.has_pending_snippet()), Ae(this, Ot, at(this, ct, ri).call(this, () => (Ae(this, Wn, !1), xt(() => ue(this, jn).call(this, ue(this, At)))))), ue(this, kn) > 0 ? at(this, ct, ii).call(this) : Ae(this, Ut, !1);
    };
    var c = He;
    try {
      St(null), a = !0, t?.(e, o), a = !1;
    } catch (u) {
      wr(u, ue(this, $t) && ue(this, $t).parent);
    } finally {
      St(c);
    }
    r && fn(() => {
      Ae(this, en, at(this, ct, ri).call(this, () => {
        Ae(this, Wn, !0);
        try {
          return xt(() => {
            r(
              ue(this, At),
              () => e,
              () => o
            );
          });
        } catch (u) {
          return wr(
            u,
            /** @type {Effect} */
            ue(this, $t).parent
          ), null;
        } finally {
          Ae(this, Wn, !1);
        }
      }));
    });
  }
}
Ut = new WeakMap(), At = new WeakMap(), Kr = new WeakMap(), Qt = new WeakMap(), jn = new WeakMap(), $t = new WeakMap(), Ot = new WeakMap(), kt = new WeakMap(), en = new WeakMap(), yn = new WeakMap(), qn = new WeakMap(), kn = new WeakMap(), Wn = new WeakMap(), xn = new WeakMap(), bi = new WeakMap(), wi = new WeakMap(), ct = new WeakSet(), ua = function() {
  try {
    Ae(this, Ot, xt(() => ue(this, jn).call(this, ue(this, At))));
  } catch (e) {
    this.error(e);
  }
  Ae(this, Ut, !1);
}, va = function() {
  const e = ue(this, Qt).pending;
  e && (Ae(this, kt, xt(() => e(ue(this, At)))), dn.enqueue(() => {
    Ae(this, Ot, at(this, ct, ri).call(this, () => (dn.ensure(), xt(() => ue(this, jn).call(this, ue(this, At)))))), ue(this, kn) > 0 ? at(this, ct, ii).call(this) : (Kn(
      /** @type {Effect} */
      ue(this, kt),
      () => {
        Ae(this, kt, null);
      }
    ), Ae(this, Ut, !1));
  }));
}, /**
 * @param {() => Effect | null} fn
 */
ri = function(e) {
  var t = Pe, r = He, s = et;
  on(ue(this, $t)), St(ue(this, $t)), br(ue(this, $t).ctx);
  try {
    return e();
  } catch (a) {
    return oa(a), null;
  } finally {
    on(t), St(r), br(s);
  }
}, ii = function() {
  const e = (
    /** @type {(anchor: Node) => void} */
    ue(this, Qt).pending
  );
  ue(this, Ot) !== null && (Ae(this, yn, document.createDocumentFragment()), jo(ue(this, Ot), ue(this, yn))), ue(this, kt) === null && Ae(this, kt, xt(() => e(ue(this, At))));
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 */
Vi = function(e) {
  var t;
  if (!this.has_pending_snippet()) {
    this.parent && at(t = this.parent, ct, Vi).call(t, e);
    return;
  }
  Ae(this, kn, ue(this, kn) + e), ue(this, kn) === 0 && (Ae(this, Ut, !1), ue(this, kt) && Kn(ue(this, kt), () => {
    Ae(this, kt, null);
  }), ue(this, yn) && (ue(this, At).before(ue(this, yn)), Ae(this, yn, null)), fn(() => {
    dn.ensure().flush();
  }));
};
function jo(n, e) {
  for (var t = n.nodes_start, r = n.nodes_end; t !== null; ) {
    var s = t === r ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Jt(t)
    );
    e.append(t), t = s;
  }
}
function qo(n, e, t) {
  const r = Ei;
  if (e.length === 0) {
    t(n.map(r));
    return;
  }
  var s = Ze, a = (
    /** @type {Effect} */
    Pe
  ), o = Wo(), c = De;
  Promise.all(e.map((u) => /* @__PURE__ */ Uo(u))).then((u) => {
    o();
    try {
      t([...n.map(r), ...u]);
    } catch (v) {
      (a.f & $n) === 0 && wr(v, a);
    }
    c && Vt(!1), s?.deactivate(), fa();
  }).catch((u) => {
    wr(u, a);
  });
}
function Wo() {
  var n = Pe, e = He, t = et, r = Ze, s = De;
  if (s)
    var a = We;
  return function() {
    on(n), St(e), br(t), r?.activate(), s && (Vt(!0), vt(a));
  };
}
function fa() {
  on(null), St(null), br(null);
}
// @__NO_SIDE_EFFECTS__
function Ei(n) {
  var e = Et | jt, t = He !== null && (He.f & Et) !== 0 ? (
    /** @type {Derived} */
    He
  ) : null;
  return Pe === null || t !== null && (t.f & Pt) !== 0 ? e |= Pt : Pe.f |= Tr, {
    ctx: et,
    deps: null,
    effects: null,
    equals: na,
    f: e,
    fn: n,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      lt
    ),
    wv: 0,
    parent: t ?? Pe,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function Uo(n, e) {
  let t = (
    /** @type {Effect | null} */
    Pe
  );
  t === null && co();
  var r = (
    /** @type {Boundary} */
    t.b
  ), s = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), a = Jn(
    /** @type {V} */
    lt
  ), o = !He, c = /* @__PURE__ */ new Map();
  return Qo(() => {
    var u = Zs();
    s = u.promise;
    try {
      Promise.resolve(n()).then(u.resolve, u.reject);
    } catch (g) {
      u.reject(g);
    }
    var v = (
      /** @type {Batch} */
      Ze
    ), p = r.is_pending();
    o && (r.update_pending_count(1), p || (v.increment(), c.get(v)?.reject(Dr), c.set(v, u)));
    const _ = (g, y = void 0) => {
      p || v.activate(), y ? y !== Dr && (a.f |= Un, _r(a, y)) : ((a.f & Un) !== 0 && (a.f ^= Un), _r(a, g)), o && (r.update_pending_count(-1), p || v.decrement()), fa();
    };
    u.promise.then(_, (g) => _(null, g || "unknown"));
  }), zi(() => {
    for (const u of c.values())
      u.reject(Dr);
  }), new Promise((u) => {
    function v(p) {
      function _() {
        p === s ? u(a) : v(s);
      }
      p.then(_, _);
    }
    v(s);
  });
}
// @__NO_SIDE_EFFECTS__
function ze(n) {
  const e = /* @__PURE__ */ Ei(n);
  return Da(e), e;
}
// @__NO_SIDE_EFFECTS__
function ha(n) {
  const e = /* @__PURE__ */ Ei(n);
  return e.equals = ra, e;
}
function pa(n) {
  var e = n.effects;
  if (e !== null) {
    n.effects = null;
    for (var t = 0; t < e.length; t += 1)
      Lt(
        /** @type {Effect} */
        e[t]
      );
  }
}
function Ko(n) {
  for (var e = n.parent; e !== null; ) {
    if ((e.f & Et) === 0)
      return (
        /** @type {Effect} */
        e
      );
    e = e.parent;
  }
  return null;
}
function vs(n) {
  var e, t = Pe;
  on(Ko(n));
  try {
    pa(n), e = Fa(n);
  } finally {
    on(t);
  }
  return e;
}
function ma(n) {
  var e = vs(n);
  if (n.equals(e) || (n.v = e, n.wv = Ra()), !tr) {
    var t = (Sn || (n.f & Pt) !== 0) && n.deps !== null ? In : ut;
    bt(n, t);
  }
}
const Cn = /* @__PURE__ */ new Map();
function Jn(n, e) {
  var t = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: n,
    reactions: null,
    equals: na,
    rv: 0,
    wv: 0
  };
  return t;
}
// @__NO_SIDE_EFFECTS__
function j(n, e) {
  const t = Jn(n);
  return Da(t), t;
}
// @__NO_SIDE_EFFECTS__
function ga(n, e = !1, t = !0) {
  const r = Jn(n);
  return e || (r.equals = ra), r;
}
function f(n, e, t = !1) {
  He !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!Kt || (He.f & ks) !== 0) && ia() && (He.f & (Et | Zn | _i | ks)) !== 0 && !vn?.includes(n) && wo();
  let r = t ? Be(e) : e;
  return _r(n, r);
}
function _r(n, e) {
  if (!n.equals(e)) {
    var t = n.v;
    tr ? Cn.set(n, e) : Cn.set(n, t), n.v = e;
    var r = dn.ensure();
    r.capture(n, t), (n.f & Et) !== 0 && ((n.f & jt) !== 0 && vs(
      /** @type {Derived} */
      n
    ), bt(n, (n.f & Pt) === 0 ? ut : In)), n.wv = Ra(), ba(n, jt), Pe !== null && (Pe.f & ut) !== 0 && (Pe.f & (hn | Qn)) === 0 && (Ft === null ? el([n]) : Ft.push(n));
  }
  return e;
}
function Hr(n, e = 1) {
  var t = i(n), r = e === 1 ? t++ : t--;
  return f(n, t), r;
}
function Rr(n) {
  f(n, n.v + 1);
}
function ba(n, e) {
  var t = n.reactions;
  if (t !== null)
    for (var r = t.length, s = 0; s < r; s++) {
      var a = t[s], o = a.f, c = (o & jt) === 0;
      c && bt(a, e), (o & Et) !== 0 ? ba(
        /** @type {Derived} */
        a,
        In
      ) : c && ((o & Zn) !== 0 && Bn !== null && Bn.push(
        /** @type {Effect} */
        a
      ), Xn(
        /** @type {Effect} */
        a
      ));
    }
}
function Be(n) {
  if (typeof n != "object" || n === null || nn in n)
    return n;
  const e = is(n);
  if (e !== ro && e !== io)
    return n;
  var t = /* @__PURE__ */ new Map(), r = xr(n), s = /* @__PURE__ */ j(0), a = Gn, o = (c) => {
    if (Gn === a)
      return c();
    var u = He, v = Gn;
    St(null), zs(a);
    var p = c();
    return St(u), zs(v), p;
  };
  return r && t.set("length", /* @__PURE__ */ j(
    /** @type {any[]} */
    n.length
  )), new Proxy(
    /** @type {any} */
    n,
    {
      defineProperty(c, u, v) {
        (!("value" in v) || v.configurable === !1 || v.enumerable === !1 || v.writable === !1) && go();
        var p = t.get(u);
        return p === void 0 ? p = o(() => {
          var _ = /* @__PURE__ */ j(v.value);
          return t.set(u, _), _;
        }) : f(p, v.value, !0), !0;
      },
      deleteProperty(c, u) {
        var v = t.get(u);
        if (v === void 0) {
          if (u in c) {
            const p = o(() => /* @__PURE__ */ j(lt));
            t.set(u, p), Rr(s);
          }
        } else
          f(v, lt), Rr(s);
        return !0;
      },
      get(c, u, v) {
        if (u === nn)
          return n;
        var p = t.get(u), _ = u in c;
        if (p === void 0 && (!_ || En(c, u)?.writable) && (p = o(() => {
          var y = Be(_ ? c[u] : lt), I = /* @__PURE__ */ j(y);
          return I;
        }), t.set(u, p)), p !== void 0) {
          var g = i(p);
          return g === lt ? void 0 : g;
        }
        return Reflect.get(c, u, v);
      },
      getOwnPropertyDescriptor(c, u) {
        var v = Reflect.getOwnPropertyDescriptor(c, u);
        if (v && "value" in v) {
          var p = t.get(u);
          p && (v.value = i(p));
        } else if (v === void 0) {
          var _ = t.get(u), g = _?.v;
          if (_ !== void 0 && g !== lt)
            return {
              enumerable: !0,
              configurable: !0,
              value: g,
              writable: !0
            };
        }
        return v;
      },
      has(c, u) {
        if (u === nn)
          return !0;
        var v = t.get(u), p = v !== void 0 && v.v !== lt || Reflect.has(c, u);
        if (v !== void 0 || Pe !== null && (!p || En(c, u)?.writable)) {
          v === void 0 && (v = o(() => {
            var g = p ? Be(c[u]) : lt, y = /* @__PURE__ */ j(g);
            return y;
          }), t.set(u, v));
          var _ = i(v);
          if (_ === lt)
            return !1;
        }
        return p;
      },
      set(c, u, v, p) {
        var _ = t.get(u), g = u in c;
        if (r && u === "length")
          for (var y = v; y < /** @type {Source<number>} */
          _.v; y += 1) {
            var I = t.get(y + "");
            I !== void 0 ? f(I, lt) : y in c && (I = o(() => /* @__PURE__ */ j(lt)), t.set(y + "", I));
          }
        if (_ === void 0)
          (!g || En(c, u)?.writable) && (_ = o(() => /* @__PURE__ */ j(void 0)), f(_, Be(v)), t.set(u, _));
        else {
          g = _.v !== lt;
          var E = o(() => Be(v));
          f(_, E);
        }
        var L = Reflect.getOwnPropertyDescriptor(c, u);
        if (L?.set && L.set.call(p, v), !g) {
          if (r && typeof u == "string") {
            var T = (
              /** @type {Source<number>} */
              t.get("length")
            ), C = Number(u);
            Number.isInteger(C) && C >= T.v && f(T, C + 1);
          }
          Rr(s);
        }
        return !0;
      },
      ownKeys(c) {
        i(s);
        var u = Reflect.ownKeys(c).filter((_) => {
          var g = t.get(_);
          return g === void 0 || g.v !== lt;
        });
        for (var [v, p] of t)
          p.v !== lt && !(v in c) && u.push(v);
        return u;
      },
      setPrototypeOf() {
        bo();
      }
    }
  );
}
function Ss(n) {
  try {
    if (n !== null && typeof n == "object" && nn in n)
      return n[nn];
  } catch {
  }
  return n;
}
function Go(n, e) {
  return Object.is(Ss(n), Ss(e));
}
var Rt, wa, _a, ya;
function Yi() {
  if (Rt === void 0) {
    Rt = window, wa = /Firefox/.test(navigator.userAgent);
    var n = Element.prototype, e = Node.prototype, t = Text.prototype;
    _a = En(e, "firstChild").get, ya = En(e, "nextSibling").get, ys(n) && (n.__click = void 0, n.__className = void 0, n.__attributes = null, n.__style = void 0, n.__e = void 0), ys(t) && (t.__t = void 0);
  }
}
function an(n = "") {
  return document.createTextNode(n);
}
// @__NO_SIDE_EFFECTS__
function Yt(n) {
  return _a.call(n);
}
// @__NO_SIDE_EFFECTS__
function Jt(n) {
  return ya.call(n);
}
function d(n, e) {
  if (!De)
    return /* @__PURE__ */ Yt(n);
  var t = (
    /** @type {TemplateNode} */
    /* @__PURE__ */ Yt(We)
  );
  if (t === null)
    t = We.appendChild(an());
  else if (e && t.nodeType !== cs) {
    var r = an();
    return t?.before(r), vt(r), r;
  }
  return vt(t), t;
}
function Ce(n, e = !1) {
  if (!De) {
    var t = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ Yt(
        /** @type {Node} */
        n
      )
    );
    return t instanceof Comment && t.data === "" ? /* @__PURE__ */ Jt(t) : t;
  }
  if (e && We?.nodeType !== cs) {
    var r = an();
    return We?.before(r), vt(r), r;
  }
  return We;
}
function h(n, e = 1, t = !1) {
  let r = De ? We : n;
  for (var s; e--; )
    s = r, r = /** @type {TemplateNode} */
    /* @__PURE__ */ Jt(r);
  if (!De)
    return r;
  if (t && r?.nodeType !== cs) {
    var a = an();
    return r === null ? s?.after(a) : r.before(a), vt(a), a;
  }
  return vt(r), /** @type {TemplateNode} */
  r;
}
function ka(n) {
  n.textContent = "";
}
function fs() {
  return !1;
}
function Vo(n, e) {
  {
    const t = document.body;
    n.autofocus = !0, fn(() => {
      document.activeElement === t && n.focus();
    });
  }
}
let Ts = !1;
function xa() {
  Ts || (Ts = !0, document.addEventListener(
    "reset",
    (n) => {
      Promise.resolve().then(() => {
        if (!n.defaultPrevented)
          for (
            const e of
            /**@type {HTMLFormElement} */
            n.target.elements
          )
            e.__on_r?.();
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possiblity of stopPropagation)
    { capture: !0 }
  ));
}
function Ci(n) {
  var e = He, t = Pe;
  St(null), on(null);
  try {
    return n();
  } finally {
    St(e), on(t);
  }
}
function Sa(n, e, t, r = t) {
  n.addEventListener(e, () => Ci(t));
  const s = n.__on_r;
  s ? n.__on_r = () => {
    s(), r(!0);
  } : n.__on_r = () => r(!0), xa();
}
function Yo(n) {
  Pe === null && He === null && fo(), He !== null && (He.f & Pt) !== 0 && Pe === null && vo(), tr && uo();
}
function Xo(n, e) {
  var t = e.last;
  t === null ? e.last = e.first = n : (t.next = n, n.prev = t, e.last = n);
}
function pn(n, e, t, r = !0) {
  var s = Pe;
  s !== null && (s.f & Xt) !== 0 && (n |= Xt);
  var a = {
    ctx: et,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: n | jt,
    first: null,
    fn: e,
    last: null,
    next: null,
    parent: s,
    b: s && s.b,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0,
    ac: null
  };
  if (t)
    try {
      Nr(a), a.f |= ls;
    } catch (u) {
      throw Lt(a), u;
    }
  else e !== null && Xn(a);
  if (r) {
    var o = a;
    if (t && o.deps === null && o.teardown === null && o.nodes_start === null && o.first === o.last && // either `null`, or a singular child
    (o.f & Tr) === 0 && (o = o.first), o !== null && (o.parent = s, s !== null && Xo(o, s), He !== null && (He.f & Et) !== 0 && (n & Qn) === 0)) {
      var c = (
        /** @type {Derived} */
        He
      );
      (c.effects ?? (c.effects = [])).push(o);
    }
  }
  return a;
}
function Jo() {
  return He !== null && !Kt;
}
function zi(n) {
  const e = pn(as, null, !1);
  return bt(e, ut), e.teardown = n, e;
}
function st(n) {
  Yo();
  var e = (
    /** @type {Effect} */
    Pe.f
  ), t = !He && (e & hn) !== 0 && (e & ls) === 0;
  if (t) {
    var r = (
      /** @type {ComponentContext} */
      et
    );
    (r.e ?? (r.e = [])).push(n);
  } else
    return Ta(n);
}
function Ta(n) {
  return pn(ss | oo, n, !1);
}
function Zo(n) {
  dn.ensure();
  const e = pn(Qn | Tr, n, !0);
  return (t = {}) => new Promise((r) => {
    t.outro ? Kn(e, () => {
      Lt(e), r(void 0);
    }) : (Lt(e), r(void 0));
  });
}
function hs(n) {
  return pn(ss, n, !1);
}
function Qo(n) {
  return pn(_i | Tr, n, !0);
}
function Mi(n, e = 0) {
  return pn(as | e, n, !0);
}
function Z(n, e = [], t = []) {
  qo(e, t, (r) => {
    pn(as, () => n(...r.map(i)), !0);
  });
}
function Vr(n, e = 0) {
  var t = pn(Zn | e, n, !0);
  return t;
}
function xt(n, e = !0) {
  return pn(hn | Tr, n, !0, e);
}
function Ea(n) {
  var e = n.teardown;
  if (e !== null) {
    const t = tr, r = He;
    Cs(!0), St(null);
    try {
      e.call(null);
    } finally {
      Cs(t), St(r);
    }
  }
}
function Ca(n, e = !1) {
  var t = n.first;
  for (n.first = n.last = null; t !== null; ) {
    const s = t.ac;
    s !== null && Ci(() => {
      s.abort(Dr);
    });
    var r = t.next;
    (t.f & Qn) !== 0 ? t.parent = null : Lt(t, e), t = r;
  }
}
function $o(n) {
  for (var e = n.first; e !== null; ) {
    var t = e.next;
    (e.f & hn) === 0 && Lt(e), e = t;
  }
}
function Lt(n, e = !0) {
  var t = !1;
  (e || (n.f & ao) !== 0) && n.nodes_start !== null && n.nodes_end !== null && (za(
    n.nodes_start,
    /** @type {TemplateNode} */
    n.nodes_end
  ), t = !0), Ca(n, e && !t), fi(n, 0), bt(n, $n);
  var r = n.transitions;
  if (r !== null)
    for (const a of r)
      a.stop();
  Ea(n);
  var s = n.parent;
  s !== null && s.first !== null && Ma(n), n.next = n.prev = n.teardown = n.ctx = n.deps = n.fn = n.nodes_start = n.nodes_end = n.ac = null;
}
function za(n, e) {
  for (; n !== null; ) {
    var t = n === e ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Jt(n)
    );
    n.remove(), n = t;
  }
}
function Ma(n) {
  var e = n.parent, t = n.prev, r = n.next;
  t !== null && (t.next = r), r !== null && (r.prev = t), e !== null && (e.first === n && (e.first = r), e.last === n && (e.last = t));
}
function Kn(n, e) {
  var t = [];
  ps(n, t, !0), Ia(t, () => {
    Lt(n), e && e();
  });
}
function Ia(n, e) {
  var t = n.length;
  if (t > 0) {
    var r = () => --t || e();
    for (var s of n)
      s.out(r);
  } else
    e();
}
function ps(n, e, t) {
  if ((n.f & Xt) === 0) {
    if (n.f ^= Xt, n.transitions !== null)
      for (const o of n.transitions)
        (o.is_global || t) && e.push(o);
    for (var r = n.first; r !== null; ) {
      var s = r.next, a = (r.f & Sr) !== 0 || (r.f & hn) !== 0;
      ps(r, e, a ? t : !1), r = s;
    }
  }
}
function ms(n) {
  Aa(n, !0);
}
function Aa(n, e) {
  if ((n.f & Xt) !== 0) {
    n.f ^= Xt, (n.f & ut) === 0 && (bt(n, jt), Xn(n));
    for (var t = n.first; t !== null; ) {
      var r = t.next, s = (t.f & Sr) !== 0 || (t.f & hn) !== 0;
      Aa(t, s ? e : !1), t = r;
    }
    if (n.transitions !== null)
      for (const a of n.transitions)
        (a.is_global || e) && a.in();
  }
}
let vr = !1;
function Es(n) {
  vr = n;
}
let tr = !1;
function Cs(n) {
  tr = n;
}
let He = null, Kt = !1;
function St(n) {
  He = n;
}
let Pe = null;
function on(n) {
  Pe = n;
}
let vn = null;
function Da(n) {
  He !== null && (vn === null ? vn = [n] : vn.push(n));
}
let mt = null, It = 0, Ft = null;
function el(n) {
  Ft = n;
}
let La = 1, Pr = 0, Gn = Pr;
function zs(n) {
  Gn = n;
}
let Sn = !1;
function Ra() {
  return ++La;
}
function Ii(n) {
  var e = n.f;
  if ((e & jt) !== 0)
    return !0;
  if ((e & In) !== 0) {
    var t = n.deps, r = (e & Pt) !== 0;
    if (t !== null) {
      var s, a, o = (e & ui) !== 0, c = r && Pe !== null && !Sn, u = t.length;
      if ((o || c) && (Pe === null || (Pe.f & $n) === 0)) {
        var v = (
          /** @type {Derived} */
          n
        ), p = v.parent;
        for (s = 0; s < u; s++)
          a = t[s], (o || !a?.reactions?.includes(v)) && (a.reactions ?? (a.reactions = [])).push(v);
        o && (v.f ^= ui), c && p !== null && (p.f & Pt) === 0 && (v.f ^= Pt);
      }
      for (s = 0; s < u; s++)
        if (a = t[s], Ii(
          /** @type {Derived} */
          a
        ) && ma(
          /** @type {Derived} */
          a
        ), a.wv > n.wv)
          return !0;
    }
    (!r || Pe !== null && !Sn) && bt(n, ut);
  }
  return !1;
}
function Ba(n, e, t = !0) {
  var r = n.reactions;
  if (r !== null && !vn?.includes(n))
    for (var s = 0; s < r.length; s++) {
      var a = r[s];
      (a.f & Et) !== 0 ? Ba(
        /** @type {Derived} */
        a,
        e,
        !1
      ) : e === a && (t ? bt(a, jt) : (a.f & ut) !== 0 && bt(a, In), Xn(
        /** @type {Effect} */
        a
      ));
    }
}
function Fa(n) {
  var E;
  var e = mt, t = It, r = Ft, s = He, a = Sn, o = vn, c = et, u = Kt, v = Gn, p = n.f;
  mt = /** @type {null | Value[]} */
  null, It = 0, Ft = null, Sn = (p & Pt) !== 0 && (Kt || !vr || He === null), He = (p & (hn | Qn)) === 0 ? n : null, vn = null, br(n.ctx), Kt = !1, Gn = ++Pr, n.ac !== null && (Ci(() => {
    n.ac.abort(Dr);
  }), n.ac = null);
  try {
    n.f |= qi;
    var _ = (
      /** @type {Function} */
      n.fn
    ), g = _(), y = n.deps;
    if (mt !== null) {
      var I;
      if (fi(n, It), y !== null && It > 0)
        for (y.length = It + mt.length, I = 0; I < mt.length; I++)
          y[It + I] = mt[I];
      else
        n.deps = y = mt;
      if (!Sn || // Deriveds that already have reactions can cleanup, so we still add them as reactions
      (p & Et) !== 0 && /** @type {import('#client').Derived} */
      n.reactions !== null)
        for (I = It; I < y.length; I++)
          ((E = y[I]).reactions ?? (E.reactions = [])).push(n);
    } else y !== null && It < y.length && (fi(n, It), y.length = It);
    if (ia() && Ft !== null && !Kt && y !== null && (n.f & (Et | In | jt)) === 0)
      for (I = 0; I < /** @type {Source[]} */
      Ft.length; I++)
        Ba(
          Ft[I],
          /** @type {Effect} */
          n
        );
    return s !== null && s !== n && (Pr++, Ft !== null && (r === null ? r = Ft : r.push(.../** @type {Source[]} */
    Ft))), (n.f & Un) !== 0 && (n.f ^= Un), g;
  } catch (L) {
    return oa(L);
  } finally {
    n.f ^= qi, mt = e, It = t, Ft = r, He = s, Sn = a, vn = o, br(c), Kt = u, Gn = v;
  }
}
function tl(n, e) {
  let t = e.reactions;
  if (t !== null) {
    var r = no.call(t, n);
    if (r !== -1) {
      var s = t.length - 1;
      s === 0 ? t = e.reactions = null : (t[r] = t[s], t.pop());
    }
  }
  t === null && (e.f & Et) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (mt === null || !mt.includes(e)) && (bt(e, In), (e.f & (Pt | ui)) === 0 && (e.f ^= ui), pa(
    /** @type {Derived} **/
    e
  ), fi(
    /** @type {Derived} **/
    e,
    0
  ));
}
function fi(n, e) {
  var t = n.deps;
  if (t !== null)
    for (var r = e; r < t.length; r++)
      tl(n, t[r]);
}
function Nr(n) {
  var e = n.f;
  if ((e & $n) === 0) {
    bt(n, ut);
    var t = Pe, r = vr;
    Pe = n, vr = !0;
    try {
      (e & Zn) !== 0 ? $o(n) : Ca(n), Ea(n);
      var s = Fa(n);
      n.teardown = typeof s == "function" ? s : null, n.wv = La;
      var a;
    } finally {
      vr = r, Pe = t;
    }
  }
}
async function nl() {
  await Promise.resolve(), Bo();
}
function i(n) {
  var e = n.f, t = (e & Et) !== 0;
  if (He !== null && !Kt) {
    var r = Pe !== null && (Pe.f & $n) !== 0;
    if (!r && !vn?.includes(n)) {
      var s = He.deps;
      if ((He.f & qi) !== 0)
        n.rv < Pr && (n.rv = Pr, mt === null && s !== null && s[It] === n ? It++ : mt === null ? mt = [n] : (!Sn || !mt.includes(n)) && mt.push(n));
      else {
        (He.deps ?? (He.deps = [])).push(n);
        var a = n.reactions;
        a === null ? n.reactions = [He] : a.includes(He) || a.push(He);
      }
    }
  } else if (t && /** @type {Derived} */
  n.deps === null && /** @type {Derived} */
  n.effects === null) {
    var o = (
      /** @type {Derived} */
      n
    ), c = o.parent;
    c !== null && (c.f & Pt) === 0 && (o.f ^= Pt);
  }
  if (tr) {
    if (Cn.has(n))
      return Cn.get(n);
    if (t) {
      o = /** @type {Derived} */
      n;
      var u = o.v;
      return ((o.f & ut) === 0 && o.reactions !== null || Oa(o)) && (u = vs(o)), Cn.set(o, u), u;
    }
  } else t && (o = /** @type {Derived} */
  n, Ii(o) && ma(o));
  if ((n.f & Un) !== 0)
    throw n.v;
  return n.v;
}
function Oa(n) {
  if (n.v === lt) return !0;
  if (n.deps === null) return !1;
  for (const e of n.deps)
    if (Cn.has(e) || (e.f & Et) !== 0 && Oa(
      /** @type {Derived} */
      e
    ))
      return !0;
  return !1;
}
function An(n) {
  var e = Kt;
  try {
    return Kt = !0, n();
  } finally {
    Kt = e;
  }
}
const rl = -7169;
function bt(n, e) {
  n.f = n.f & rl | e;
}
function il(n) {
  if (!(typeof n != "object" || !n || n instanceof EventTarget)) {
    if (nn in n)
      Xi(n);
    else if (!Array.isArray(n))
      for (let e in n) {
        const t = n[e];
        typeof t == "object" && t && nn in t && Xi(t);
      }
  }
}
function Xi(n, e = /* @__PURE__ */ new Set()) {
  if (typeof n == "object" && n !== null && // We don't want to traverse DOM elements
  !(n instanceof EventTarget) && !e.has(n)) {
    e.add(n), n instanceof Date && n.getTime();
    for (let r in n)
      try {
        Xi(n[r], e);
      } catch {
      }
    const t = is(n);
    if (t !== Object.prototype && t !== Array.prototype && t !== Map.prototype && t !== Set.prototype && t !== Date.prototype) {
      const r = Js(t);
      for (let s in r) {
        const a = r[s].get;
        if (a)
          try {
            a.call(n);
          } catch {
          }
      }
    }
  }
}
const sl = ["touchstart", "touchmove"];
function al(n) {
  return sl.includes(n);
}
const Ha = /* @__PURE__ */ new Set(), Ji = /* @__PURE__ */ new Set();
function ol(n) {
  if (!De) return;
  n.removeAttribute("onload"), n.removeAttribute("onerror");
  const e = n.__e;
  e !== void 0 && (n.__e = void 0, queueMicrotask(() => {
    n.isConnected && n.dispatchEvent(e);
  }));
}
function ll(n, e, t, r = {}) {
  function s(a) {
    if (r.capture || Ar.call(e, a), !a.cancelBubble)
      return Ci(() => t?.call(this, a));
  }
  return n.startsWith("pointer") || n.startsWith("touch") || n === "wheel" ? fn(() => {
    e.addEventListener(n, s, r);
  }) : e.addEventListener(n, s, r), s;
}
function G(n, e, t, r, s) {
  var a = { capture: r, passive: s }, o = ll(n, e, t, a);
  (e === document.body || // @ts-ignore
  e === window || // @ts-ignore
  e === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  e instanceof HTMLMediaElement) && zi(() => {
    e.removeEventListener(n, o, a);
  });
}
function tt(n) {
  for (var e = 0; e < n.length; e++)
    Ha.add(n[e]);
  for (var t of Ji)
    t(n);
}
let Ms = null;
function Ar(n) {
  var e = this, t = (
    /** @type {Node} */
    e.ownerDocument
  ), r = n.type, s = n.composedPath?.() || [], a = (
    /** @type {null | Element} */
    s[0] || n.target
  );
  Ms = n;
  var o = 0, c = Ms === n && n.__root;
  if (c) {
    var u = s.indexOf(c);
    if (u !== -1 && (e === document || e === /** @type {any} */
    window)) {
      n.__root = e;
      return;
    }
    var v = s.indexOf(e);
    if (v === -1)
      return;
    u <= v && (o = u);
  }
  if (a = /** @type {Element} */
  s[o] || n.target, a !== e) {
    di(n, "currentTarget", {
      configurable: !0,
      get() {
        return a || t;
      }
    });
    var p = He, _ = Pe;
    St(null), on(null);
    try {
      for (var g, y = []; a !== null; ) {
        var I = a.assignedSlot || a.parentNode || /** @type {any} */
        a.host || null;
        try {
          var E = a["__" + r];
          if (E != null && (!/** @type {any} */
          a.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          n.target === a))
            if (xr(E)) {
              var [L, ...T] = E;
              L.apply(a, [n, ...T]);
            } else
              E.call(a, n);
        } catch (C) {
          g ? y.push(C) : g = C;
        }
        if (n.cancelBubble || I === e || I === null)
          break;
        a = I;
      }
      if (g) {
        for (let C of y)
          queueMicrotask(() => {
            throw C;
          });
        throw g;
      }
    } finally {
      n.__root = e, delete n.currentTarget, St(p), on(_);
    }
  }
}
function Pa(n) {
  var e = document.createElement("template");
  return e.innerHTML = n.replaceAll("<!>", "<!---->"), e.content;
}
function zn(n, e) {
  var t = (
    /** @type {Effect} */
    Pe
  );
  t.nodes_start === null && (t.nodes_start = n, t.nodes_end = e);
}
// @__NO_SIDE_EFFECTS__
function b(n, e) {
  var t = (e & Co) !== 0, r = (e & zo) !== 0, s, a = !n.startsWith("<!>");
  return () => {
    if (De)
      return zn(We, null), We;
    s === void 0 && (s = Pa(a ? n : "<!>" + n), t || (s = /** @type {Node} */
    /* @__PURE__ */ Yt(s)));
    var o = (
      /** @type {TemplateNode} */
      r || wa ? document.importNode(s, !0) : s.cloneNode(!0)
    );
    if (t) {
      var c = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Yt(o)
      ), u = (
        /** @type {TemplateNode} */
        o.lastChild
      );
      zn(c, u);
    } else
      zn(o, o);
    return o;
  };
}
function Re() {
  if (De)
    return zn(We, null), We;
  var n = document.createDocumentFragment(), e = document.createComment(""), t = an();
  return n.append(e, t), zn(e, t), n;
}
function m(n, e) {
  if (De) {
    Pe.nodes_end = We, Yn();
    return;
  }
  n !== null && n.before(
    /** @type {Node} */
    e
  );
}
function q(n, e) {
  var t = e == null ? "" : typeof e == "object" ? e + "" : e;
  t !== (n.__t ?? (n.__t = n.nodeValue)) && (n.__t = t, n.nodeValue = t + "");
}
function cl(n, e) {
  return Na(n, e);
}
function yp(n, e) {
  Yi(), e.intro = e.intro ?? !1;
  const t = e.target, r = De, s = We;
  try {
    for (var a = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Yt(t)
    ); a && (a.nodeType !== er || /** @type {Comment} */
    a.data !== ea); )
      a = /** @type {TemplateNode} */
      /* @__PURE__ */ Jt(a);
    if (!a)
      throw Vn;
    Vt(!0), vt(
      /** @type {Comment} */
      a
    );
    const o = Na(n, { ...e, anchor: a });
    return Vt(!1), /**  @type {Exports} */
    o;
  } catch (o) {
    if (o instanceof Error && o.message.split(`
`).some((c) => c.startsWith("https://svelte.dev/e/")))
      throw o;
    return o !== Vn && console.warn("Failed to hydrate: ", o), e.recover === !1 && po(), Yi(), ka(t), Vt(!1), cl(n, e);
  } finally {
    Vt(r), vt(s);
  }
}
const ar = /* @__PURE__ */ new Map();
function Na(n, { target: e, anchor: t, props: r = {}, events: s, context: a, intro: o = !0 }) {
  Yi();
  var c = /* @__PURE__ */ new Set(), u = (_) => {
    for (var g = 0; g < _.length; g++) {
      var y = _[g];
      if (!c.has(y)) {
        c.add(y);
        var I = al(y);
        e.addEventListener(y, Ar, { passive: I });
        var E = ar.get(y);
        E === void 0 ? (document.addEventListener(y, Ar, { passive: I }), ar.set(y, 1)) : ar.set(y, E + 1);
      }
    }
  };
  u(rs(Ha)), Ji.add(u);
  var v = void 0, p = Zo(() => {
    var _ = t ?? e.appendChild(an());
    return Po(
      /** @type {TemplateNode} */
      _,
      {
        pending: () => {
        }
      },
      (g) => {
        if (a) {
          Fe({});
          var y = (
            /** @type {ComponentContext} */
            et
          );
          y.c = a;
        }
        if (s && (r.$$events = s), De && zn(
          /** @type {TemplateNode} */
          g,
          null
        ), v = n(g, r) || {}, De && (Pe.nodes_end = We, We === null || We.nodeType !== er || /** @type {Comment} */
        We.data !== ds))
          throw Gr(), Vn;
        a && Oe();
      }
    ), () => {
      for (var g of c) {
        e.removeEventListener(g, Ar);
        var y = (
          /** @type {number} */
          ar.get(g)
        );
        --y === 0 ? (document.removeEventListener(g, Ar), ar.delete(g)) : ar.set(g, y);
      }
      Ji.delete(u), _ !== t && _.parentNode?.removeChild(_);
    };
  });
  return Zi.set(v, p), v;
}
let Zi = /* @__PURE__ */ new WeakMap();
function kp(n, e) {
  const t = Zi.get(n);
  return t ? (Zi.delete(n), t(e)) : Promise.resolve();
}
function K(n, e, t = !1) {
  De && Yn();
  var r = n, s = null, a = null, o = lt, c = t ? Sr : 0, u = !1;
  const v = (y, I = !0) => {
    u = !0, g(I, y);
  };
  var p = null;
  function _() {
    p !== null && (p.lastChild.remove(), r.before(p), p = null);
    var y = o ? s : a, I = o ? a : s;
    y && ms(y), I && Kn(I, () => {
      o ? a = null : s = null;
    });
  }
  const g = (y, I) => {
    if (o === (o = y)) return;
    let E = !1;
    if (De) {
      const w = ta(r) === Si;
      !!o === w && (r = vi(), vt(r), Vt(!1), E = !0);
    }
    var L = fs(), T = r;
    if (L && (p = document.createDocumentFragment(), p.append(T = an())), o ? s ?? (s = I && xt(() => I(T))) : a ?? (a = I && xt(() => I(T))), L) {
      var C = (
        /** @type {Batch} */
        Ze
      ), z = o ? s : a, k = o ? a : s;
      z && C.skipped_effects.delete(z), k && C.skipped_effects.add(k), C.add_callback(_);
    } else
      _();
    E && Vt(!0);
  };
  Vr(() => {
    u = !1, e(v), u || g(null, null);
  }, c), De && (r = We);
}
function je(n, e) {
  return e;
}
function dl(n, e, t) {
  for (var r = n.items, s = [], a = e.length, o = 0; o < a; o++)
    ps(e[o].e, s, !0);
  var c = a > 0 && s.length === 0 && t !== null;
  if (c) {
    var u = (
      /** @type {Element} */
      /** @type {Element} */
      t.parentNode
    );
    ka(u), u.append(
      /** @type {Element} */
      t
    ), r.clear(), Zt(n, e[0].prev, e[a - 1].next);
  }
  Ia(s, () => {
    for (var v = 0; v < a; v++) {
      var p = e[v];
      c || (r.delete(p.k), Zt(n, p.prev, p.next)), Lt(p.e, !c);
    }
  });
}
function Le(n, e, t, r, s, a = null) {
  var o = n, c = { flags: e, items: /* @__PURE__ */ new Map(), first: null }, u = (e & $s) !== 0;
  if (u) {
    var v = (
      /** @type {Element} */
      n
    );
    o = De ? vt(
      /** @type {Comment | Text} */
      /* @__PURE__ */ Yt(v)
    ) : v.appendChild(an());
  }
  De && Yn();
  var p = null, _ = !1, g = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ ha(() => {
    var T = t();
    return xr(T) ? T : T == null ? [] : rs(T);
  }), I, E;
  function L() {
    ul(
      E,
      I,
      c,
      g,
      o,
      s,
      e,
      r,
      t
    ), a !== null && (I.length === 0 ? p ? ms(p) : p = xt(() => a(o)) : p !== null && Kn(p, () => {
      p = null;
    }));
  }
  Vr(() => {
    E ?? (E = /** @type {Effect} */
    Pe), I = /** @type {V[]} */
    i(y);
    var T = I.length;
    if (_ && T === 0)
      return;
    _ = T === 0;
    let C = !1;
    if (De) {
      var z = ta(o) === Si;
      z !== (T === 0) && (o = vi(), vt(o), Vt(!1), C = !0);
    }
    if (De) {
      for (var k = null, w, A = 0; A < T; A++) {
        if (We.nodeType === er && /** @type {Comment} */
        We.data === ds) {
          o = /** @type {Comment} */
          We, C = !0, Vt(!1);
          break;
        }
        var x = I[A], N = r(x, A);
        w = Qi(
          We,
          c,
          k,
          null,
          x,
          N,
          A,
          s,
          e,
          t
        ), c.items.set(N, w), k = w;
      }
      T > 0 && vt(vi());
    }
    if (De)
      T === 0 && a && (p = xt(() => a(o)));
    else if (fs()) {
      var te = /* @__PURE__ */ new Set(), J = (
        /** @type {Batch} */
        Ze
      );
      for (A = 0; A < T; A += 1) {
        x = I[A], N = r(x, A);
        var H = c.items.get(N) ?? g.get(N);
        H ? (e & (ki | xi)) !== 0 && ja(H, x, A, e) : (w = Qi(
          null,
          c,
          null,
          null,
          x,
          N,
          A,
          s,
          e,
          t,
          !0
        ), g.set(N, w)), te.add(N);
      }
      for (const [O, B] of c.items)
        te.has(O) || J.skipped_effects.add(B.e);
      J.add_callback(L);
    } else
      L();
    C && Vt(!0), i(y);
  }), De && (o = We);
}
function ul(n, e, t, r, s, a, o, c, u) {
  var v = (o & yo) !== 0, p = (o & (ki | xi)) !== 0, _ = e.length, g = t.items, y = t.first, I = y, E, L = null, T, C = [], z = [], k, w, A, x;
  if (v)
    for (x = 0; x < _; x += 1)
      k = e[x], w = c(k, x), A = g.get(w), A !== void 0 && (A.a?.measure(), (T ?? (T = /* @__PURE__ */ new Set())).add(A));
  for (x = 0; x < _; x += 1) {
    if (k = e[x], w = c(k, x), A = g.get(w), A === void 0) {
      var N = r.get(w);
      if (N !== void 0) {
        r.delete(w), g.set(w, N);
        var te = L ? L.next : I;
        Zt(t, L, N), Zt(t, N, te), Ri(N, te, s), L = N;
      } else {
        var J = I ? (
          /** @type {TemplateNode} */
          I.e.nodes_start
        ) : s;
        L = Qi(
          J,
          t,
          L,
          L === null ? t.first : L.next,
          k,
          w,
          x,
          a,
          o,
          u
        );
      }
      g.set(w, L), C = [], z = [], I = L.next;
      continue;
    }
    if (p && ja(A, k, x, o), (A.e.f & Xt) !== 0 && (ms(A.e), v && (A.a?.unfix(), (T ?? (T = /* @__PURE__ */ new Set())).delete(A))), A !== I) {
      if (E !== void 0 && E.has(A)) {
        if (C.length < z.length) {
          var H = z[0], O;
          L = H.prev;
          var B = C[0], F = C[C.length - 1];
          for (O = 0; O < C.length; O += 1)
            Ri(C[O], H, s);
          for (O = 0; O < z.length; O += 1)
            E.delete(z[O]);
          Zt(t, B.prev, F.next), Zt(t, L, B), Zt(t, F, H), I = H, L = F, x -= 1, C = [], z = [];
        } else
          E.delete(A), Ri(A, I, s), Zt(t, A.prev, A.next), Zt(t, A, L === null ? t.first : L.next), Zt(t, L, A), L = A;
        continue;
      }
      for (C = [], z = []; I !== null && I.k !== w; )
        (I.e.f & Xt) === 0 && (E ?? (E = /* @__PURE__ */ new Set())).add(I), z.push(I), I = I.next;
      if (I === null)
        continue;
      A = I;
    }
    C.push(A), L = A, I = A.next;
  }
  if (I !== null || E !== void 0) {
    for (var P = E === void 0 ? [] : rs(E); I !== null; )
      (I.e.f & Xt) === 0 && P.push(I), I = I.next;
    var U = P.length;
    if (U > 0) {
      var ee = (o & $s) !== 0 && _ === 0 ? s : null;
      if (v) {
        for (x = 0; x < U; x += 1)
          P[x].a?.measure();
        for (x = 0; x < U; x += 1)
          P[x].a?.fix();
      }
      dl(t, P, ee);
    }
  }
  v && fn(() => {
    if (T !== void 0)
      for (A of T)
        A.a?.apply();
  }), n.first = t.first && t.first.e, n.last = L && L.e;
  for (var W of r.values())
    Lt(W.e);
  r.clear();
}
function ja(n, e, t, r) {
  (r & ki) !== 0 && _r(n.v, e), (r & xi) !== 0 ? _r(
    /** @type {Value<number>} */
    n.i,
    t
  ) : n.i = t;
}
function Qi(n, e, t, r, s, a, o, c, u, v, p) {
  var _ = (u & ki) !== 0, g = (u & ko) === 0, y = _ ? g ? /* @__PURE__ */ ga(s, !1, !1) : Jn(s) : s, I = (u & xi) === 0 ? o : Jn(o), E = {
    i: I,
    v: y,
    k: a,
    a: null,
    // @ts-expect-error
    e: null,
    prev: t,
    next: r
  };
  try {
    if (n === null) {
      var L = document.createDocumentFragment();
      L.append(n = an());
    }
    return E.e = xt(() => c(
      /** @type {Node} */
      n,
      y,
      I,
      v
    ), De), E.e.prev = t && t.e, E.e.next = r && r.e, t === null ? p || (e.first = E) : (t.next = E, t.e.next = E.e), r !== null && (r.prev = E, r.e.prev = E.e), E;
  } finally {
  }
}
function Ri(n, e, t) {
  for (var r = n.next ? (
    /** @type {TemplateNode} */
    n.next.e.nodes_start
  ) : t, s = e ? (
    /** @type {TemplateNode} */
    e.e.nodes_start
  ) : t, a = (
    /** @type {TemplateNode} */
    n.e.nodes_start
  ); a !== null && a !== r; ) {
    var o = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Jt(a)
    );
    s.before(a), a = o;
  }
}
function Zt(n, e, t) {
  e === null ? n.first = t : (e.next = t, e.e.next = t && t.e), t !== null && (t.prev = e, t.e.prev = e && e.e);
}
function vl(n, e, t = !1, r = !1, s = !1) {
  var a = n, o = "";
  Z(() => {
    var c = (
      /** @type {Effect} */
      Pe
    );
    if (o === (o = e() ?? "")) {
      De && Yn();
      return;
    }
    if (c.nodes_start !== null && (za(
      c.nodes_start,
      /** @type {TemplateNode} */
      c.nodes_end
    ), c.nodes_start = c.nodes_end = null), o !== "") {
      if (De) {
        We.data;
        for (var u = Yn(), v = u; u !== null && (u.nodeType !== er || /** @type {Comment} */
        u.data !== ""); )
          v = u, u = /** @type {TemplateNode} */
          /* @__PURE__ */ Jt(u);
        if (u === null)
          throw Gr(), Vn;
        zn(We, v), a = vt(u);
        return;
      }
      var p = o + "";
      t ? p = `<svg>${p}</svg>` : r && (p = `<math>${p}</math>`);
      var _ = Pa(p);
      if ((t || r) && (_ = /** @type {Element} */
      /* @__PURE__ */ Yt(_)), zn(
        /** @type {TemplateNode} */
        /* @__PURE__ */ Yt(_),
        /** @type {TemplateNode} */
        _.lastChild
      ), t || r)
        for (; /* @__PURE__ */ Yt(_); )
          a.before(
            /** @type {Node} */
            /* @__PURE__ */ Yt(_)
          );
      else
        a.before(_);
    }
  });
}
function fl(n, e, ...t) {
  var r = n, s = un, a;
  Vr(() => {
    s !== (s = e()) && (a && (Lt(a), a = null), a = xt(() => (
      /** @type {SnippetFn} */
      s(r, ...t)
    )));
  }, Sr), De && (r = We);
}
function hl(n, e, t) {
  De && Yn();
  var r = n, s, a, o = null, c = null;
  function u() {
    a && (Kn(a), a = null), o && (o.lastChild.remove(), r.before(o), o = null), a = c, c = null;
  }
  Vr(() => {
    if (s !== (s = e())) {
      var v = fs();
      if (s) {
        var p = r;
        v && (o = document.createDocumentFragment(), o.append(p = an()), a && Ze.skipped_effects.add(a)), c = xt(() => t(p, s));
      }
      v ? Ze.add_callback(u) : u();
    }
  }, Sr), De && (r = We);
}
function pl(n, e, t) {
  hs(() => {
    var r = An(() => e(n, t?.()) || {});
    if (t && r?.update) {
      var s = !1, a = (
        /** @type {any} */
        {}
      );
      Mi(() => {
        var o = t();
        il(o), s && us(a, o) && (a = o, r.update(o));
      }), s = !0;
    }
    if (r?.destroy)
      return () => (
        /** @type {Function} */
        r.destroy()
      );
  });
}
const Is = [...` 	
\r\f \v\uFEFF`];
function ml(n, e, t) {
  var r = n == null ? "" : "" + n;
  if (e && (r = r ? r + " " + e : e), t) {
    for (var s in t)
      if (t[s])
        r = r ? r + " " + s : s;
      else if (r.length)
        for (var a = s.length, o = 0; (o = r.indexOf(s, o)) >= 0; ) {
          var c = o + a;
          (o === 0 || Is.includes(r[o - 1])) && (c === r.length || Is.includes(r[c])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(c + 1) : o = c;
        }
  }
  return r === "" ? null : r;
}
function As(n, e = !1) {
  var t = e ? " !important;" : ";", r = "";
  for (var s in n) {
    var a = n[s];
    a != null && a !== "" && (r += " " + s + ": " + a + t);
  }
  return r;
}
function Bi(n) {
  return n[0] !== "-" || n[1] !== "-" ? n.toLowerCase() : n;
}
function gl(n, e) {
  if (e) {
    var t = "", r, s;
    if (Array.isArray(e) ? (r = e[0], s = e[1]) : r = e, n) {
      n = String(n).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var a = !1, o = 0, c = !1, u = [];
      r && u.push(...Object.keys(r).map(Bi)), s && u.push(...Object.keys(s).map(Bi));
      var v = 0, p = -1;
      const E = n.length;
      for (var _ = 0; _ < E; _++) {
        var g = n[_];
        if (c ? g === "/" && n[_ - 1] === "*" && (c = !1) : a ? a === g && (a = !1) : g === "/" && n[_ + 1] === "*" ? c = !0 : g === '"' || g === "'" ? a = g : g === "(" ? o++ : g === ")" && o--, !c && a === !1 && o === 0) {
          if (g === ":" && p === -1)
            p = _;
          else if (g === ";" || _ === E - 1) {
            if (p !== -1) {
              var y = Bi(n.substring(v, p).trim());
              if (!u.includes(y)) {
                g !== ";" && _++;
                var I = n.substring(v, _).trim();
                t += " " + I + ";";
              }
            }
            v = _ + 1, p = -1;
          }
        }
      }
    }
    return r && (t += As(r)), s && (t += As(s, !0)), t = t.trim(), t === "" ? null : t;
  }
  return n == null ? null : String(n);
}
function xe(n, e, t, r, s, a) {
  var o = n.__className;
  if (De || o !== t || o === void 0) {
    var c = ml(t, r, a);
    (!De || c !== n.getAttribute("class")) && (c == null ? n.removeAttribute("class") : n.className = c), n.__className = t;
  } else if (a && s !== a)
    for (var u in a) {
      var v = !!a[u];
      (s == null || v !== !!s[u]) && n.classList.toggle(u, v);
    }
  return a;
}
function Fi(n, e = {}, t, r) {
  for (var s in t) {
    var a = t[s];
    e[s] !== a && (t[s] == null ? n.style.removeProperty(s) : n.style.setProperty(s, a, r));
  }
}
function qt(n, e, t, r) {
  var s = n.__style;
  if (De || s !== e) {
    var a = gl(e, r);
    (!De || a !== n.getAttribute("style")) && (a == null ? n.removeAttribute("style") : n.style.cssText = a), n.__style = e;
  } else r && (Array.isArray(r) ? (Fi(n, t?.[0], r[0]), Fi(n, t?.[1], r[1], "important")) : Fi(n, t, r));
  return r;
}
function gs(n, e, t = !1) {
  if (n.multiple) {
    if (e == null)
      return;
    if (!xr(e))
      return Io();
    for (var r of n.options)
      r.selected = e.includes(Br(r));
    return;
  }
  for (r of n.options) {
    var s = Br(r);
    if (Go(s, e)) {
      r.selected = !0;
      return;
    }
  }
  (!t || e !== void 0) && (n.selectedIndex = -1);
}
function qa(n) {
  var e = new MutationObserver(() => {
    gs(n, n.__value);
  });
  e.observe(n, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), zi(() => {
    e.disconnect();
  });
}
function bl(n, e, t = e) {
  var r = !0;
  Sa(n, "change", (s) => {
    var a = s ? "[selected]" : ":checked", o;
    if (n.multiple)
      o = [].map.call(n.querySelectorAll(a), Br);
    else {
      var c = n.querySelector(a) ?? // will fall back to first non-disabled option if no option is selected
      n.querySelector("option:not([disabled])");
      o = c && Br(c);
    }
    t(o);
  }), hs(() => {
    var s = e();
    if (gs(n, s, r), r && s === void 0) {
      var a = n.querySelector(":checked");
      a !== null && (s = Br(a), t(s));
    }
    n.__value = s, r = !1;
  }), qa(n);
}
function Br(n) {
  return "__value" in n ? n.__value : n.value;
}
const wl = Symbol("is custom element"), _l = Symbol("is html");
function gt(n) {
  if (De) {
    var e = !1, t = () => {
      if (!e) {
        if (e = !0, n.hasAttribute("value")) {
          var r = n.value;
          Se(n, "value", null), n.value = r;
        }
        if (n.hasAttribute("checked")) {
          var s = n.checked;
          Se(n, "checked", null), n.checked = s;
        }
      }
    };
    n.__on_r = t, fn(t), xa();
  }
}
function yl(n, e) {
  var t = bs(n);
  t.value === (t.value = // treat null and undefined the same for the initial value
  e ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  n.value === e && (e !== 0 || n.nodeName !== "PROGRESS") || (n.value = e ?? "");
}
function kl(n, e) {
  var t = bs(n);
  t.checked !== (t.checked = // treat null and undefined the same for the initial value
  e ?? void 0) && (n.checked = e);
}
function Se(n, e, t, r) {
  var s = bs(n);
  De && (s[e] = n.getAttribute(e), e === "src" || e === "srcset" || e === "href" && n.nodeName === "LINK") || s[e] !== (s[e] = t) && (e === "loading" && (n[lo] = t), t == null ? n.removeAttribute(e) : typeof t != "string" && xl(n).includes(e) ? n[e] = t : n.setAttribute(e, t));
}
function bs(n) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    n.__attributes ?? (n.__attributes = {
      [wl]: n.nodeName.includes("-"),
      [_l]: n.namespaceURI === Mo
    })
  );
}
var Ds = /* @__PURE__ */ new Map();
function xl(n) {
  var e = n.getAttribute("is") || n.nodeName, t = Ds.get(e);
  if (t) return t;
  Ds.set(e, t = []);
  for (var r, s = n, a = Element.prototype; a !== s; ) {
    r = Js(s);
    for (var o in r)
      r[o].set && t.push(o);
    s = is(s);
  }
  return t;
}
function Dt(n, e, t = e) {
  var r = /* @__PURE__ */ new WeakSet();
  Sa(n, "input", async (s) => {
    var a = s ? n.defaultValue : n.value;
    if (a = Oi(n) ? Hi(a) : a, t(a), Ze !== null && r.add(Ze), await nl(), a !== (a = e())) {
      var o = n.selectionStart, c = n.selectionEnd;
      n.value = a ?? "", c !== null && (n.selectionStart = o, n.selectionEnd = Math.min(c, n.value.length));
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  (De && n.defaultValue !== n.value || // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  An(e) == null && n.value) && (t(Oi(n) ? Hi(n.value) : n.value), Ze !== null && r.add(Ze)), Mi(() => {
    var s = e();
    if (n === document.activeElement) {
      var a = (
        /** @type {Batch} */
        ti ?? Ze
      );
      if (r.has(a))
        return;
    }
    Oi(n) && s === Hi(n.value) || n.type === "date" && !s && !n.value || s !== n.value && (n.value = s ?? "");
  });
}
function Oi(n) {
  var e = n.type;
  return e === "number" || e === "range";
}
function Hi(n) {
  return n === "" ? null : +n;
}
function Ls(n, e) {
  return n === e || n?.[nn] === e;
}
function Tt(n = {}, e, t, r) {
  return hs(() => {
    var s, a;
    return Mi(() => {
      s = a, a = [], An(() => {
        n !== t(...a) && (e(n, ...a), s && Ls(t(...s), n) && e(null, ...s));
      });
    }), () => {
      fn(() => {
        a && Ls(t(...a), n) && e(null, ...a);
      });
    };
  }), n;
}
function Mn(n) {
  return function(...e) {
    var t = (
      /** @type {Event} */
      e[0]
    );
    return t.stopPropagation(), n?.apply(this, e);
  };
}
function Fr(n, e) {
  var t = (
    /** @type {Record<string, Function[] | Function>} */
    n.$$events?.[e.type]
  ), r = xr(t) ? t.slice() : t == null ? [] : [t];
  for (var s of r)
    s.call(this, e);
}
function Wa(n, e, t) {
  if (n == null)
    return e(void 0), un;
  const r = An(
    () => n.subscribe(
      e,
      // @ts-expect-error
      t
    )
  );
  return r.unsubscribe ? () => r.unsubscribe() : r;
}
const or = [];
function Sl(n, e = un) {
  let t = null;
  const r = /* @__PURE__ */ new Set();
  function s(c) {
    if (us(n, c) && (n = c, t)) {
      const u = !or.length;
      for (const v of r)
        v[1](), or.push(v, n);
      if (u) {
        for (let v = 0; v < or.length; v += 2)
          or[v][0](or[v + 1]);
        or.length = 0;
      }
    }
  }
  function a(c) {
    s(c(
      /** @type {T} */
      n
    ));
  }
  function o(c, u = un) {
    const v = [c, u];
    return r.add(v), r.size === 1 && (t = e(s, a) || un), c(
      /** @type {T} */
      n
    ), () => {
      r.delete(v), r.size === 0 && t && (t(), t = null);
    };
  }
  return { set: s, update: a, subscribe: o };
}
function Tl(n) {
  let e;
  return Wa(n, (t) => e = t)(), e;
}
let ei = !1, $i = Symbol();
function El(n, e, t) {
  const r = t[e] ?? (t[e] = {
    store: null,
    source: /* @__PURE__ */ ga(void 0),
    unsubscribe: un
  });
  if (r.store !== n && !($i in t))
    if (r.unsubscribe(), r.store = n ?? null, n == null)
      r.source.v = void 0, r.unsubscribe = un;
    else {
      var s = !0;
      r.unsubscribe = Wa(n, (a) => {
        s ? r.source.v = a : f(r.source, a);
      }), s = !1;
    }
  return n && $i in t ? Tl(n) : i(r.source);
}
function Cl() {
  const n = {};
  function e() {
    zi(() => {
      for (var t in n)
        n[t].unsubscribe();
      di(n, $i, {
        enumerable: !1,
        value: !0
      });
    });
  }
  return [n, e];
}
function zl(n) {
  var e = ei;
  try {
    return ei = !1, [n(), ei];
  } finally {
    ei = e;
  }
}
const Ml = {
  get(n, e) {
    let t = n.props.length;
    for (; t--; ) {
      let r = n.props[t];
      if (zr(r) && (r = r()), typeof r == "object" && r !== null && e in r) return r[e];
    }
  },
  set(n, e, t) {
    let r = n.props.length;
    for (; r--; ) {
      let s = n.props[r];
      zr(s) && (s = s());
      const a = En(s, e);
      if (a && a.set)
        return a.set(t), !0;
    }
    return !1;
  },
  getOwnPropertyDescriptor(n, e) {
    let t = n.props.length;
    for (; t--; ) {
      let r = n.props[t];
      if (zr(r) && (r = r()), typeof r == "object" && r !== null && e in r) {
        const s = En(r, e);
        return s && !s.configurable && (s.configurable = !0), s;
      }
    }
  },
  has(n, e) {
    if (e === nn || e === Qs) return !1;
    for (let t of n.props)
      if (zr(t) && (t = t()), t != null && e in t) return !0;
    return !1;
  },
  ownKeys(n) {
    const e = [];
    for (let t of n.props)
      if (zr(t) && (t = t()), !!t) {
        for (const r in t)
          e.includes(r) || e.push(r);
        for (const r of Object.getOwnPropertySymbols(t))
          e.includes(r) || e.push(r);
      }
    return e;
  }
};
function Rs(...n) {
  return new Proxy({ props: n }, Ml);
}
function be(n, e, t, r) {
  var s = (t & To) !== 0, a = (t & Eo) !== 0, o = (
    /** @type {V} */
    r
  ), c = !0, u = () => (c && (c = !1, o = a ? An(
    /** @type {() => V} */
    r
  ) : (
    /** @type {V} */
    r
  )), o), v;
  if (s) {
    var p = nn in n || Qs in n;
    v = En(n, e)?.set ?? (p && e in n ? (C) => n[e] = C : void 0);
  }
  var _, g = !1;
  s ? [_, g] = zl(() => (
    /** @type {V} */
    n[e]
  )) : _ = /** @type {V} */
  n[e], _ === void 0 && r !== void 0 && (_ = u(), v && (mo(), v(_)));
  var y;
  if (y = () => {
    var C = (
      /** @type {V} */
      n[e]
    );
    return C === void 0 ? u() : (c = !0, C);
  }, (t & So) === 0)
    return y;
  if (v) {
    var I = n.$$legacy;
    return (
      /** @type {() => V} */
      (function(C, z) {
        return arguments.length > 0 ? ((!z || I || g) && v(z ? y() : C), C) : y();
      })
    );
  }
  var E = !1, L = ((t & xo) !== 0 ? Ei : ha)(() => (E = !1, y()));
  s && i(L);
  var T = (
    /** @type {Effect} */
    Pe
  );
  return (
    /** @type {() => V} */
    (function(C, z) {
      if (arguments.length > 0) {
        const k = z ? i(L) : s ? Be(C) : C;
        return f(L, k), E = !0, o !== void 0 && (o = k), C;
      }
      return tr && E || (T.f & $n) !== 0 ? L.v : i(L);
    })
  );
}
function wt(n) {
  et === null && yi(), st(() => {
    const e = An(n);
    if (typeof e == "function") return (
      /** @type {() => void} */
      e
    );
  });
}
function Yr(n) {
  et === null && yi(), wt(() => () => An(n));
}
function Il(n, e, { bubbles: t = !1, cancelable: r = !1 } = {}) {
  return new CustomEvent(n, { detail: e, bubbles: t, cancelable: r });
}
function _t() {
  const n = et;
  return n === null && yi(), (e, t, r) => {
    const s = (
      /** @type {Record<string, Function | Function[]>} */
      n.s.$$events?.[
        /** @type {string} */
        e
      ]
    );
    if (s) {
      const a = xr(s) ? s.slice() : [s], o = Il(
        /** @type {string} */
        e,
        t,
        r
      );
      for (const c of a)
        c.call(n.x, o);
      return !o.defaultPrevented;
    }
    return !0;
  };
}
class Xr extends Error {
  constructor(e, t, r) {
    super(e), this.name = "KernelError", this.code = t, this.details = r;
  }
}
class xp extends Xr {
  constructor(e, t) {
    super(`Network error accessing ${e}`, "NETWORK_ERROR", { url: e, originalError: t }), this.name = "NetworkError";
  }
}
class Ee extends Xr {
  constructor(e, t) {
    super(`Validation error: ${e} - ${t}`, "VALIDATION_ERROR", { field: e, reason: t }), this.name = "ValidationError";
  }
}
class Sp extends Xr {
  constructor(e) {
    super(
      `Authorization error: requires ${e}`,
      "AUTHORIZATION_ERROR",
      { requiredPermission: e }
    ), this.name = "AuthorizationError";
  }
}
class Tp extends Xr {
  constructor(e) {
    super(`Service unavailable, retry after ${e}s`, "SERVICE_UNAVAILABLE", {
      retryAfter: e
    }), this.name = "ServiceUnavailableError";
  }
}
class Ep extends Xr {
  constructor(e, t) {
    super(`Request timeout after ${e}ms for ${t}`, "TIMEOUT_ERROR", { timeout: e, url: t }), this.name = "TimeoutError";
  }
}
function Ua(n) {
  return typeof n == "object" && n !== null && "x" in n && "y" in n && typeof n.x == "number" && typeof n.y == "number";
}
function Ka(n) {
  return typeof n == "object" && n !== null && "width" in n && "height" in n && typeof n.width == "number" && typeof n.height == "number";
}
function Ga(n) {
  return typeof n == "object" && n !== null && "x" in n && "y" in n && "width" in n && "height" in n && typeof n.x == "number" && typeof n.y == "number" && typeof n.width == "number" && typeof n.height == "number";
}
function Cp(n) {
  if (typeof n != "object" || n === null) return !1;
  const e = n;
  return typeof e.id == "string" && typeof e.pluginId == "string" && typeof e.title == "string" && typeof e.iconClass == "string" && Ua(e.position) && Ka(e.size) && typeof e.zIndex == "number" && typeof e.isMinimized == "boolean" && typeof e.isMaximized == "boolean" && typeof e.isFocused == "boolean" && typeof e.isResizable == "boolean" && (e.preMaximizeBounds === void 0 || Ga(e.preMaximizeBounds));
}
function zp(n) {
  if (typeof n != "object" || n === null) return !1;
  const e = n;
  return typeof e.version == "number" && typeof e.timestamp == "number" && typeof e.ttl == "number" && typeof e.windows == "object" && e.windows !== null && Array.isArray(e.windows.open) && Array.isArray(e.windows.history) && typeof e.desktop == "object" && e.desktop !== null && (e.desktop.layout === "grid" || e.desktop.layout === "custom") && Array.isArray(e.desktop.icons) && typeof e.theme == "object" && e.theme !== null && (e.theme.current === "light" || e.theme.current === "dark") && typeof e.theme.auto == "boolean" && typeof e.audio == "object" && e.audio !== null && typeof e.audio.volume == "number" && typeof e.audio.muted == "boolean" && (e.audio.track === null || typeof e.audio.track == "string");
}
const yr = 200, kr = 100, Bs = 20, jr = 100, Mp = 500, Ip = 1e3, Ap = 1100, Al = 28, Dp = 24, Lp = 2, hi = "abu-os-98:state:v1", es = 1, Dl = 7, Ll = 500, Rp = 16, Rl = 600, Bl = 400, Fl = 48, Ol = 16, Bp = 8, Fs = 0, Os = 1, Va = 0.5, Fp = "light", Op = [
  "n",
  "ne",
  "e",
  "se",
  "s",
  "sw",
  "w",
  "nw"
], Hp = ["light", "dark"];
function Or(n) {
  if (!Ua(n))
    throw new Ee("position", "Must be an object with x and y number properties");
  if (!Number.isFinite(n.x))
    throw new Ee("position.x", "Must be a finite number");
  if (!Number.isFinite(n.y))
    throw new Ee("position.y", "Must be a finite number");
  if (n.y < 0)
    throw new Ee("position.y", "Must be greater than or equal to 0");
  return n;
}
function pi(n) {
  if (!Ka(n))
    throw new Ee("size", "Must be an object with width and height number properties");
  if (!Number.isFinite(n.width) || n.width < 0)
    throw new Ee("size.width", "Must be a finite non-negative number");
  if (!Number.isFinite(n.height) || n.height < 0)
    throw new Ee("size.height", "Must be a finite non-negative number");
  if (n.width < yr)
    throw new Ee("size.width", `Must be at least ${yr}px`);
  if (n.height < kr)
    throw new Ee("size.height", `Must be at least ${kr}px`);
  return n;
}
function Hl(n) {
  if (!Ga(n))
    throw new Ee(
      "bounds",
      "Must be an object with x, y, width, and height number properties"
    );
  if (!Number.isFinite(n.x))
    throw new Ee("bounds.x", "Must be a finite number");
  if (!Number.isFinite(n.y) || n.y < 0)
    throw new Ee("bounds.y", "Must be a finite non-negative number");
  if (!Number.isFinite(n.width) || n.width < yr)
    throw new Ee("bounds.width", `Must be at least ${yr}px`);
  if (!Number.isFinite(n.height) || n.height < kr)
    throw new Ee("bounds.height", `Must be at least ${kr}px`);
  return n;
}
function Pp(n) {
  if (typeof n != "object" || n === null)
    throw new Ee("windowState", "Must be an object");
  const e = n;
  if (!e.id || typeof e.id != "string")
    throw new Ee("windowState.id", "Must be a non-empty string");
  if (!e.pluginId || typeof e.pluginId != "string")
    throw new Ee("windowState.pluginId", "Must be a non-empty string");
  if (!e.title || typeof e.title != "string")
    throw new Ee("windowState.title", "Must be a non-empty string");
  if (!e.iconClass || typeof e.iconClass != "string")
    throw new Ee("windowState.iconClass", "Must be a non-empty string");
  if (Or(e.position), pi(e.size), typeof e.zIndex != "number" || e.zIndex < jr)
    throw new Ee("windowState.zIndex", `Must be a number >= ${jr}`);
  if (typeof e.isMinimized != "boolean")
    throw new Ee("windowState.isMinimized", "Must be a boolean");
  if (typeof e.isMaximized != "boolean")
    throw new Ee("windowState.isMaximized", "Must be a boolean");
  if (e.isMinimized && e.isMaximized)
    throw new Ee("windowState", "Cannot be both minimized and maximized");
  if (typeof e.isFocused != "boolean")
    throw new Ee("windowState.isFocused", "Must be a boolean");
  if (typeof e.isResizable != "boolean")
    throw new Ee("windowState.isResizable", "Must be a boolean");
  return e.preMaximizeBounds !== void 0 && Hl(e.preMaximizeBounds), e;
}
function Ya(n) {
  if (typeof n != "number")
    throw new Ee("volume", "Must be a number");
  if (!Number.isFinite(n))
    throw new Ee("volume", "Must be a finite number");
  if (n < Fs || n > Os)
    throw new Ee("volume", `Must be between ${Fs} and ${Os}`);
  return n;
}
function Xa(n) {
  if (typeof n != "object" || n === null)
    throw new Ee("storedState", "Must be an object");
  const e = n;
  if (typeof e.version != "number" || e.version !== es)
    throw new Ee("storedState.version", `Must be ${es}`);
  if (typeof e.timestamp != "number" || e.timestamp <= 0)
    throw new Ee("storedState.timestamp", "Must be a positive number");
  if (typeof e.ttl != "number" || e.ttl <= 0)
    throw new Ee("storedState.ttl", "Must be a positive number");
  const r = Date.now() - e.timestamp, s = e.ttl * 24 * 60 * 60 * 1e3;
  if (r > s)
    throw new Ee("storedState", "State has exceeded TTL and is expired");
  if (typeof e.windows != "object" || e.windows === null)
    throw new Ee("storedState.windows", "Must be an object");
  if (!Array.isArray(e.windows.open))
    throw new Ee("storedState.windows.open", "Must be an array");
  if (!Array.isArray(e.windows.history))
    throw new Ee("storedState.windows.history", "Must be an array");
  if (typeof e.desktop != "object" || e.desktop === null)
    throw new Ee("storedState.desktop", "Must be an object");
  if (e.desktop.layout !== "grid" && e.desktop.layout !== "custom")
    throw new Ee("storedState.desktop.layout", 'Must be "grid" or "custom"');
  if (!Array.isArray(e.desktop.icons))
    throw new Ee("storedState.desktop.icons", "Must be an array");
  if (typeof e.theme != "object" || e.theme === null)
    throw new Ee("storedState.theme", "Must be an object");
  if (e.theme.current !== "light" && e.theme.current !== "dark")
    throw new Ee("storedState.theme.current", 'Must be "light" or "dark"');
  if (typeof e.theme.auto != "boolean")
    throw new Ee("storedState.theme.auto", "Must be a boolean");
  if (typeof e.audio != "object" || e.audio === null)
    throw new Ee("storedState.audio", "Must be an object");
  if (Ya(e.audio.volume), typeof e.audio.muted != "boolean")
    throw new Ee("storedState.audio.muted", "Must be a boolean");
  if (e.audio.track !== null && typeof e.audio.track != "string")
    throw new Ee("storedState.audio.track", "Must be a string or null");
  return e;
}
function si(n) {
  if (typeof n != "string" || n.length === 0)
    throw new Ee("pluginId", "Must be a non-empty string");
  if (!/^[a-z0-9-]+$/.test(n))
    throw new Ee("pluginId", "Must be lowercase kebab-case (letters, numbers, hyphens)");
  return n;
}
function Hs(n) {
  if (typeof n != "string")
    throw new Ee("version", "Must be a string");
  if (!/^\d+\.\d+\.\d+$/.test(n))
    throw new Ee("version", 'Must be in semantic version format (e.g., "1.0.0")');
  const e = n.split(".");
  for (const t of e)
    if (t.length > 1 && t.startsWith("0"))
      throw new Ee("version", "Version components cannot have leading zeros");
  return n;
}
class Pl {
  constructor() {
    this.data = /* @__PURE__ */ new Map();
  }
  getItem(e) {
    return this.data.get(e) ?? null;
  }
  setItem(e, t) {
    this.data.set(e, t);
  }
  removeItem(e) {
    this.data.delete(e);
  }
  clear() {
    this.data.clear();
  }
}
let ts = null, Ps = !1;
function Nl() {
  try {
    const n = "__abu_os_storage_test__";
    localStorage.setItem(n, "test"), localStorage.removeItem(n), Ps = !0;
  } catch (n) {
    console.warn("localStorage unavailable, using in-memory fallback:", n), ts = new Pl(), Ps = !1;
  }
}
Nl();
function mi() {
  return ts || localStorage;
}
function jl() {
  try {
    const n = mi().getItem(hi);
    if (!n)
      return null;
    const e = JSON.parse(n);
    return Xa(e);
  } catch (n) {
    return n instanceof SyntaxError ? console.error("Failed to parse stored state (corrupted data):", n) : n instanceof Ee ? console.warn("Stored state validation failed:", n.message) : console.error("Failed to load stored state:", n), null;
  }
}
function Ns(n) {
  try {
    const e = JSON.stringify(n);
    return mi().setItem(hi, e), !0;
  } catch (e) {
    const t = e instanceof DOMException && e.name === "QuotaExceededError" || e instanceof Error && e.name === "QuotaExceededError", r = e instanceof DOMException && e.name === "SecurityError" || e instanceof Error && e.name === "SecurityError";
    if (t) {
      console.error("Storage quota exceeded, attempting to clear old data");
      try {
        return ql(), mi().setItem(hi, JSON.stringify(n)), !0;
      } catch (s) {
        return console.error("Failed to save after clearing:", s), !1;
      }
    } else return r ? (console.error("Storage access denied (SecurityError):", e), !1) : (console.error("Failed to save state:", e), !1);
  }
}
function ql() {
  try {
    mi().removeItem(hi);
  } catch (n) {
    console.error("Failed to clear storage:", n);
  }
}
function js() {
  return {
    version: es,
    timestamp: Date.now(),
    ttl: Dl,
    windows: {
      open: [],
      history: []
    },
    desktop: {
      layout: "grid",
      icons: []
    },
    theme: {
      current: "light",
      auto: !1
    },
    audio: {
      volume: 0.5,
      muted: !1,
      track: null
    },
    system: {
      taskbarPosition: "bottom",
      startMenuPinned: []
    }
  };
}
let Dn = null, Mr = null;
function sn() {
  try {
    const n = jl();
    return n ? Xa(n) : js();
  } catch (n) {
    return n instanceof Ee ? console.warn("Validation failed during restore, using defaults:", n.message) : console.error("Unexpected error during restore:", n), js();
  }
}
function Ai(n, e = !1) {
  if (e) {
    Dn && (clearTimeout(Dn), Dn = null), Mr = null, Ns({ ...n, timestamp: Date.now() });
    return;
  }
  Dn && clearTimeout(Dn), Mr = n, Dn = setTimeout(
    () => {
      Mr && Ns({ ...Mr, timestamp: Date.now() }), Dn = null, Mr = null;
    },
    Ll
  );
}
const pt = /* @__PURE__ */ new Map(), Ln = /* @__PURE__ */ new Map(), Bt = /* @__PURE__ */ new Map(), Wl = /* @__PURE__ */ new Map(), Rn = /* @__PURE__ */ new Map(), Tn = {
  registerWindow(n) {
    if (!n)
      throw new Error("Plugin is required");
    if (typeof n.id != "string")
      throw new Error("Plugin missing required field: id");
    if (si(n.id), pt.has(n.id))
      throw new Error(`Plugin ID already registered: ${n.id}`);
    if (!n.name || typeof n.name != "string")
      throw new Error("Plugin missing required field: name");
    if (!n.version || typeof n.version != "string")
      throw new Error("Plugin missing required field: version");
    if (Hs(n.version), !n.component)
      throw new Error("Plugin missing required field: component");
    if (!n.defaultTitle || typeof n.defaultTitle != "string")
      throw new Error("Plugin missing required field: defaultTitle");
    if (!n.defaultIcon || typeof n.defaultIcon != "string")
      throw new Error("Plugin missing required field: defaultIcon");
    if (n.defaultSize && pi(n.defaultSize), pt.set(n.id, n), n.onInstall)
      try {
        n.onInstall();
      } catch (e) {
        console.error(`Error during plugin install for ${n.id}:`, e);
      }
  },
  registerComposite(n) {
    if (!n)
      throw new Error("Plugin is required");
    if (typeof n.id != "string")
      throw new Error("Plugin missing required field: id");
    if (si(n.id), pt.has(n.id)) {
      const e = pt.get(n.id);
      if (e && JSON.stringify(e) === JSON.stringify(n))
        return;
      throw new Error(`Plugin ID already registered: ${n.id}`);
    }
    if (!n.name || typeof n.name != "string")
      throw new Error("Plugin missing required field: name");
    if (!n.version || typeof n.version != "string")
      throw new Error("Plugin missing required field: version");
    if (Hs(n.version), !n.main || typeof n.main != "function")
      throw new Error("Plugin missing required field: main");
    if (pt.set(n.id, n), n.onInstall)
      try {
        n.onInstall();
      } catch (e) {
        console.error(`Error during plugin install for ${n.id}:`, e);
      }
  },
  unregisterWindow(n) {
    si(n);
    const e = pt.get(n);
    if (!e)
      throw new Error(`Plugin not found: ${n}`);
    if ("onUninstall" in e && e.onUninstall)
      try {
        e.onUninstall();
      } catch (t) {
        console.error(`Error during plugin uninstall for ${n}:`, t);
      }
    pt.delete(n);
  },
  unregister(n) {
    this.unregisterWindow(n);
  },
  async activate(n) {
    const e = pt.get(n);
    if (!e)
      throw new Error(`Plugin not found: ${n}`);
    if ("type" in e && e.type === "composite") {
      const t = {
        pluginId: e.id,
        pluginName: e.name,
        windowManager: {
          open: (s, a) => e.windows && e.windows.some((o) => o.id === s) ? Ie.open(e.id, a) : Ie.open(s, a),
          openMultiple: (s) => s.map((a) => e.windows && e.windows.some((o) => o.id === a.windowId) ? Ie.open(e.id, a.options) : Ie.open(a.windowId, a.options)),
          close: (s) => Ie.close(s),
          closeAll: () => Ie.closeAll(),
          focus: (s) => Ie.focus(s),
          minimize: (s) => Ie.minimize(s),
          maximize: (s) => Ie.maximize(s),
          restore: (s) => Ie.restore(s),
          getWindow: (s) => Ie.all.find((a) => a.id === s) || null,
          getWindows: (s) => Ie.all.filter((a) => !s || a.pluginId === s),
          isOpen: (s) => Ie.all.some((a) => a.pluginId === s),
          sendMessage: (s, a) => {
            console.log("sendMessage not implemented:", s, a);
          },
          broadcast: (s, a) => {
            console.log("broadcast not implemented:", s, a);
          },
          onWindowOpened: (s) => (console.log("onWindowOpened not implemented"), () => {
          }),
          onWindowClosed: (s) => (console.log("onWindowClosed not implemented"), () => {
          }),
          onWindowFocused: (s) => (console.log("onWindowFocused not implemented"), () => {
          })
        },
        kernel: {
          getSystemInfo: () => ({
            osName: "test-os",
            version: "1.0.0",
            platform: "test",
            uptime: Date.now(),
            totalMemory: 1073741824,
            usedMemory: 536870912
          }),
          getUptime: () => Date.now(),
          getProcesses: () => [],
          killProcess: (s) => {
          }
        },
        storage: {
          get: (s) => {
            const a = `plugin:${e.id}:${s}`, o = localStorage.getItem(a);
            return o ? JSON.parse(o) : null;
          },
          set: (s, a) => {
            const o = `plugin:${e.id}:${s}`;
            localStorage.setItem(o, JSON.stringify(a));
          },
          remove: (s) => {
            const a = `plugin:${e.id}:${s}`;
            localStorage.removeItem(a);
          },
          clear: () => {
            const s = `plugin:${e.id}:`;
            for (let a = localStorage.length - 1; a >= 0; a--) {
              const o = localStorage.key(a);
              o && o.startsWith(s) && localStorage.removeItem(o);
            }
          },
          keys: () => {
            const s = `plugin:${e.id}:`, a = [];
            for (let o = 0; o < localStorage.length; o++) {
              const c = localStorage.key(o);
              c && c.startsWith(s) && a.push(c.substring(s.length));
            }
            return a;
          },
          getObject: (s) => {
            const a = `plugin:${e.id}:${s}`, o = localStorage.getItem(a);
            return o ? JSON.parse(o) : null;
          },
          setObject: (s, a) => {
            const o = `plugin:${e.id}:${s}`;
            localStorage.setItem(o, JSON.stringify(a));
          },
          getAll: () => {
            const s = `plugin:${e.id}:`, a = {};
            for (let o = 0; o < localStorage.length; o++) {
              const c = localStorage.key(o);
              if (c && c.startsWith(s)) {
                const u = c.substring(s.length), v = localStorage.getItem(c);
                a[u] = v ? JSON.parse(v) : null;
              }
            }
            return a;
          },
          setAll: (s) => {
            const a = `plugin:${e.id}:`;
            Object.entries(s).forEach(([o, c]) => {
              const u = `${a}${o}`;
              localStorage.setItem(u, JSON.stringify(c));
            });
          }
        },
        events: {
          emit: (s, a) => {
            const o = `plugin:event:${s}`;
            (Bt.get(o) || []).forEach((u) => {
              try {
                u(a);
              } catch (v) {
                console.error("Event handler error:", v);
              }
            });
          },
          on: (s, a) => {
            const o = `plugin:event:${s}`;
            return Bt.has(o) || Bt.set(o, []), Bt.get(o).push(a), () => {
              const c = Bt.get(o) || [], u = c.indexOf(a);
              u > -1 && c.splice(u, 1);
            };
          },
          off: (s, a) => {
            const o = `plugin:event:${s}`, c = Bt.get(o) || [], u = c.indexOf(a);
            u > -1 && c.splice(u, 1);
          },
          once: (s, a) => {
            const o = (c) => {
              a(c), t.events.off(s, o);
            };
            return t.events.on(s, o);
          },
          onFrom: (s, a, o) => {
            const c = `plugin:event:${s}:${a}`;
            return Bt.has(c) || Bt.set(c, []), Bt.get(c).push(o), () => {
              const u = Bt.get(c) || [], v = u.indexOf(o);
              v > -1 && u.splice(v, 1);
            };
          },
          emitTo: (s, a, o) => {
            const c = `plugin:event:${e.id}:${a}`;
            (Bt.get(c) || []).forEach((v) => {
              try {
                v(o);
              } catch (p) {
                console.error("Event handler error:", p);
              }
            });
          }
        },
        components: {
          register: (s, a) => {
          },
          unregister: (s) => {
          },
          get: (s) => null,
          getAll: () => /* @__PURE__ */ new Map(),
          has: (s) => !1
        },
        state: {
          create: (s) => {
            const a = { value: s };
            return {
              value: a.value,
              set: (o) => {
                a.value = o;
              },
              subscribe: (o) => {
              }
            };
          },
          createShared: (s, a) => {
            const o = `shared:${s}`;
            Rn.has(o) || Rn.set(o, { value: a, subscribers: [] });
            const c = Rn.get(o);
            return {
              value: c.value,
              set: (u) => {
                c.value = u, c.subscribers.forEach((v) => {
                  try {
                    v(u);
                  } catch (p) {
                    console.error("Shared state subscriber error:", p);
                  }
                });
              },
              subscribe: (u) => {
              }
            };
          },
          getShared: (s) => {
            const a = `shared:${s}`;
            Rn.has(a) || Rn.set(a, { value: 0, subscribers: [] });
            const o = Rn.get(a);
            return new Proxy({
              value: o.value,
              set: (c) => {
                o.value = c, o.subscribers.forEach((u) => {
                  try {
                    u(c);
                  } catch (v) {
                    console.error("Shared state subscriber error:", v);
                  }
                });
              },
              subscribe: (c) => {
              }
            }, {
              get(c, u) {
                if (u === "value")
                  return o.value;
              },
              set(c, u, v) {
                return u === "value" ? (o.value = v, o.subscribers.forEach((p) => {
                  try {
                    p(v);
                  } catch (_) {
                    console.error("Shared state subscriber error:", _);
                  }
                }), !0) : !1;
              }
            });
          },
          derived: (s) => ({ value: null }),
          effect: (s) => {
          }
        },
        utils: {
          generateId: () => Math.random().toString(36).substr(2, 9),
          formatBytes: (s) => {
            if (s === 0) return "0 B";
            const a = 1024, o = ["B", "KB", "MB", "GB"], c = Math.floor(Math.log(s) / Math.log(a));
            return parseFloat((s / Math.pow(a, c)).toFixed(2)) + " " + o[c];
          },
          formatDuration: (s) => {
            if (s < 1e3) return `${s}ms`;
            const a = Math.floor(s / 1e3);
            if (a < 60) return `${a}s`;
            const o = Math.floor(a / 60);
            return o < 60 ? `${o}m ${a % 60}s` : `${Math.floor(o / 60)}h ${o % 60}m`;
          }
        }
      }, r = e.main(t);
      if (Ln.set(n, r), r.onWindowOpened || r.onWindowClosed) {
        const s = t.windowManager.open, a = t.windowManager.close;
        t.windowManager.open = (o, c) => {
          const u = s(o, c);
          return r.onWindowOpened && r.onWindowOpened(u, ""), u;
        }, t.windowManager.close = (o) => {
          a(o), r.onWindowClosed && r.onWindowClosed(o, "");
        };
      }
      return r.activate && await r.activate(), r;
    }
    throw new Error("Cannot activate window plugin directly");
  },
  async deactivate(n) {
    const e = Ln.get(n);
    if (!e) return;
    const t = pt.get(n);
    if (t && "type" in t && t.type === "composite") {
      const r = Ie.all;
      for (const s of r)
        s.pluginId === n && Ie.close(s.id);
    }
    e.deactivate && await e.deactivate();
  },
  async destroy(n) {
    const e = Ln.get(n);
    e && (e.destroy && await e.destroy(), Ln.delete(n));
  },
  getInstance(n) {
    return Ln.get(n) || null;
  },
  getInstances() {
    return new Map(Ln);
  },
  get(n) {
    return pt.get(n);
  },
  getAllPlugins() {
    return Array.from(pt.values());
  },
  getAllByType(n) {
    return Array.from(pt.values()).filter((e) => "type" in e ? e.type === n : n === "window");
  },
  has(n) {
    return pt.has(n);
  },
  getWindowDefinitions(n) {
    const e = pt.get(n);
    return !e || !("windows" in e) ? [] : e.windows || [];
  },
  clear() {
    pt.clear(), Ln.clear(), Bt.clear(), Wl.clear(), Rn.clear();
  },
  _clear() {
    this.clear();
  }
};
let Ge = /* @__PURE__ */ j(Be([])), Wt = /* @__PURE__ */ j(null), gi = /* @__PURE__ */ j(Be(jr)), ai = !1;
const Pi = /* @__PURE__ */ ze(() => i(Ge).filter((n) => !n.isMinimized)), Ul = /* @__PURE__ */ ze(() => i(Ge).filter((n) => n.isMinimized)), Kl = /* @__PURE__ */ ze(() => i(Ge).find((n) => n.id === i(Wt)) ?? null);
function qs() {
  return `window-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
function Ni() {
  const n = i(gi);
  return Hr(gi), n;
}
function Gl(n) {
  const e = typeof window < "u" ? window.innerWidth : 1024, t = typeof window < "u" ? window.innerHeight : 768;
  return {
    x: Math.max(0, Math.floor((e - n.width) / 2)),
    y: Math.max(0, Math.floor((t - n.height) / 2))
  };
}
function wn(n = !1) {
  if (!ai) return;
  const e = sn();
  e.windows.open = i(Ge).map((t) => ({
    pluginId: t.pluginId,
    position: t.position,
    size: t.size,
    // Only persist minimized state, not maximized (maximized windows restore to normal)
    state: t.isMinimized ? "minimized" : "normal",
    preMaximizeBounds: t.preMaximizeBounds
  })), Ai(e, n);
}
const Ie = {
  get all() {
    return i(Ge);
  },
  get count() {
    return i(Ge).length;
  },
  get focused() {
    return i(Kl);
  },
  get visible() {
    return i(Pi);
  },
  get minimized() {
    return i(Ul);
  },
  get windows() {
    return i(Ge);
  },
  getWindow(n) {
    return i(Ge).find((e) => e.id === n) ?? null;
  },
  // Add aliases for backward compatibility
  getWindowWithAliases(n) {
    const e = i(Ge).find((t) => t.id === n);
    return e ? {
      ...e,
      minimized: e.isMinimized,
      maximized: e.isMaximized,
      focused: e.isFocused
    } : null;
  },
  // Deprecated: Plugin registry is now global, this method is kept for backwards compatibility
  setPluginRegistry() {
  },
  open(n, e) {
    si(n);
    const t = Tn.get(n);
    if (!t)
      throw new Error(`Plugin not found: ${n}`);
    if (i(Ge).length >= Bs)
      throw new Error(`Maximum number of windows (${Bs}) reached`);
    const r = "component" in t, s = r ? t.defaultSize : void 0, a = r ? t.defaultTitle : t.name, o = r ? t.defaultIcon : "icon-apps-default", c = r ? t.isResizable ?? !0 : !0, u = e?.size || s || { width: Rl, height: Bl };
    pi(u);
    const v = e?.position || Gl(u);
    Or(v);
    const p = qs(), _ = {
      id: p,
      pluginId: n,
      title: e?.title || a,
      iconClass: o,
      position: v,
      size: u,
      zIndex: Ni(),
      isMinimized: !1,
      isMaximized: !1,
      isFocused: !1,
      isResizable: c
    };
    return i(Ge).push(_), Ie.focus(p), wn(), p;
  },
  close(n) {
    const e = i(Ge).findIndex((s) => s.id === n);
    if (e === -1) return;
    const t = i(Ge)[e];
    if (i(Ge).splice(e, 1), i(Wt) === n) {
      const s = i(Ge).length > 0 ? i(Ge)[i(Ge).length - 1] : null;
      f(Wt, s?.id ?? null, !0), s && (s.isFocused = !0);
    }
    const r = sn();
    r.windows.history.unshift(t.pluginId), r.windows.history = r.windows.history.slice(0, 10), wn(!0);
  },
  closeAll() {
    i(Ge).forEach((n) => {
      const e = sn();
      e.windows.history.unshift(n.pluginId), e.windows.history = e.windows.history.slice(0, 10);
    }), f(Ge, [], !0), f(Wt, null), wn(!0);
  },
  minimize(n) {
    const e = i(Ge).find((t) => t.id === n);
    if (e) {
      if (e.isMinimized = !0, e.isFocused = !1, i(Wt) === n) {
        const t = i(Pi)[i(Pi).length - 1];
        f(Wt, t?.id ?? null, !0), t && (t.isFocused = !0);
      }
      wn();
    }
  },
  maximize(n) {
    const e = i(Ge).find((s) => s.id === n);
    if (!e || e.isMaximized) return;
    e.preMaximizeBounds = {
      x: e.position.x,
      y: e.position.y,
      width: e.size.width,
      height: e.size.height
    };
    const t = typeof globalThis.window < "u" ? globalThis.window.innerWidth : 1024, r = typeof globalThis.window < "u" ? globalThis.window.innerHeight : 768;
    e.position = { x: 0, y: 0 }, e.size = { width: t, height: r }, e.isMaximized = !0, e.isMinimized = !1, Ie.focus(n), wn();
  },
  restore(n) {
    const e = i(Ge).find((t) => t.id === n);
    e && (e.isMinimized ? (e.isMinimized = !1, Ie.focus(n)) : e.isMaximized && e.preMaximizeBounds && (e.position = {
      x: e.preMaximizeBounds.x,
      y: e.preMaximizeBounds.y
    }, e.size = {
      width: e.preMaximizeBounds.width,
      height: e.preMaximizeBounds.height
    }, e.isMaximized = !1, e.preMaximizeBounds = void 0, Ie.focus(n)), wn());
  },
  focus(n) {
    const e = i(Ge).find((t) => t.id === n);
    e && (i(Ge).forEach((t) => {
      t.isFocused = !1;
    }), e.isFocused = !0, e.zIndex = Ni(), f(Wt, n, !0));
  },
  clearAllFocus() {
    i(Ge).forEach((n) => {
      n.isFocused = !1;
    }), f(Wt, null);
  },
  move(n, e) {
    Or(e);
    const t = i(Ge).find((r) => r.id === n);
    t && (t.isMaximized || (t.position = e, wn()));
  },
  resize(n, e, t) {
    pi(e);
    const r = i(Ge).find((s) => s.id === n);
    r && (r.isMaximized || r.isResizable && (r.size = e, t && (Or(t), r.position = t), wn()));
  },
  init() {
    if (ai) return;
    const n = sn();
    f(Ge, [], !0), f(Wt, null), f(gi, jr, !0);
    for (const e of n.windows.open) {
      const t = Tn.get(e.pluginId);
      if (!t) {
        console.warn(`Plugin ${e.pluginId} not found, skipping window restore`);
        continue;
      }
      const r = "component" in t, s = r ? t.defaultTitle : t.name, a = r ? t.defaultIcon : "icon-apps-default", o = r ? t.isResizable ?? !0 : !0, u = {
        id: qs(),
        pluginId: e.pluginId,
        title: s,
        iconClass: a,
        position: e.position,
        size: e.size,
        zIndex: Ni(),
        isMinimized: e.state === "minimized",
        isMaximized: e.state === "maximized",
        isFocused: !1,
        isResizable: o,
        preMaximizeBounds: e.preMaximizeBounds
      };
      i(Ge).push(u);
    }
    if (i(Ge).length > 0) {
      const e = i(Ge)[i(Ge).length - 1];
      e.isFocused = !0, f(Wt, e.id, !0);
    }
    ai = !0;
  },
  _reset() {
    f(Ge, [], !0), f(Wt, null), f(gi, jr, !0), ai = !1;
  }
};
let dt = /* @__PURE__ */ j(Be([])), ln = /* @__PURE__ */ j(null), cr = /* @__PURE__ */ j(!0), oi = !1;
const Vl = /* @__PURE__ */ ze(() => i(dt).find((n) => n.id === i(ln)) ?? null), Yl = /* @__PURE__ */ ze(() => [...i(dt)].sort((n, e) => !n.position || !e.position ? 0 : n.position.y !== e.position.y ? n.position.y - e.position.y : n.position.x - e.position.x));
function Ir() {
  if (!oi) return;
  const n = sn();
  n.desktop.layout = i(cr) ? "grid" : "custom", n.desktop.icons = i(dt).map((e) => ({
    id: e.id,
    label: e.label,
    iconClass: e.iconClass,
    type: e.type,
    position: e.position
  })), Ai(n);
}
const Qe = {
  get items() {
    return i(dt);
  },
  get selectedItemId() {
    return i(ln);
  },
  get selected() {
    return i(Vl);
  },
  get sortedItems() {
    return i(Yl);
  },
  get gridEnabled() {
    return i(cr);
  },
  getItem(n) {
    return i(dt).find((e) => e.id === n) ?? null;
  },
  addItem(n) {
    if (i(dt).some((e) => e.id === n.id))
      throw new Error(`Desktop item with id "${n.id}" already exists`);
    i(dt).push(n), Ir();
  },
  removeItem(n) {
    const e = i(dt).findIndex((t) => t.id === n);
    e !== -1 && (i(dt).splice(e, 1), i(ln) === n && f(ln, null), Ir());
  },
  moveItem(n, e) {
    Or(e);
    const t = i(dt).find((r) => r.id === n);
    t && (t.position = e, f(cr, !1), Ir());
  },
  selectItem(n) {
    i(dt).find((t) => t.id === n) && f(ln, n, !0);
  },
  clearSelection() {
    f(ln, null);
  },
  activate(n) {
    const e = i(dt).find((t) => t.id === n);
    e && e.action();
  },
  setGridEnabled(n) {
    f(cr, n, !0), Ir();
  },
  init(n = []) {
    if (oi) return;
    const e = sn();
    f(dt, [...n], !0), f(ln, null), f(cr, e.desktop.layout === "grid");
    for (const t of e.desktop.icons) {
      const r = i(dt).find((s) => s.id === t.id);
      r && t.position && (r.position = t.position);
    }
    oi = !0;
  },
  clear() {
    f(dt, [], !0), f(ln, null), Ir();
  },
  _reset() {
    f(dt, [], !0), f(ln, null), f(cr, !0), oi = !1;
  }
};
let cn = /* @__PURE__ */ j("light"), li = !1;
const Xl = /* @__PURE__ */ ze(() => i(cn) === "dark"), Jl = /* @__PURE__ */ ze(() => i(cn) === "light");
function Ws(n) {
  typeof document > "u" || (document.documentElement.setAttribute("data-theme", n), document.body.classList.remove("theme-light", "theme-dark"), document.body.classList.add(`theme-${n}`));
}
function Zl() {
  if (!li) return;
  const n = sn();
  n.theme.current = i(cn), Ai(n, !0);
}
const Ht = {
  get current() {
    return i(cn);
  },
  get isDark() {
    return i(Xl);
  },
  get isLight() {
    return i(Jl);
  },
  set(n) {
    if (n !== "light" && n !== "dark")
      throw new Error(`Invalid theme: ${n}. Must be 'light' or 'dark'.`);
    f(cn, n, !0), Ws(n), Zl();
  },
  toggle() {
    Ht.set(i(cn) === "light" ? "dark" : "light");
  },
  setTheme(n) {
    Ht.set(n);
  },
  toggleTheme() {
    Ht.toggle();
  },
  getTheme() {
    return Ht.current;
  },
  init() {
    if (li) return;
    const n = sn();
    f(cn, n.theme.current, !0), Ws(i(cn)), li = !0;
  },
  _reset() {
    f(cn, "light"), li = !1;
  }
};
let On = /* @__PURE__ */ j(Be(Va)), _n = /* @__PURE__ */ j(!1), lr = /* @__PURE__ */ j(!1), dr = /* @__PURE__ */ j(null), ci = !1;
const Ql = /* @__PURE__ */ ze(() => i(_n) ? 0 : i(On)), $l = /* @__PURE__ */ ze(() => Math.round(i(On) * 100));
function Us() {
  if (!ci) return;
  const n = sn();
  n.audio.volume = i(On), n.audio.muted = i(_n), n.audio.track = i(dr), Ai(n);
}
const Gt = {
  get volume() {
    return i(On);
  },
  get muted() {
    return i(_n);
  },
  get playing() {
    return i(lr);
  },
  get effectiveVolume() {
    return i(Ql);
  },
  get volumePercent() {
    return i($l);
  },
  get currentTrack() {
    return i(dr);
  },
  setVolume(n) {
    Ya(n), f(On, n, !0), Us();
  },
  toggleMute() {
    f(_n, !i(_n)), Us();
  },
  isMuted() {
    return i(_n);
  },
  play(n) {
    n && f(dr, n, !0), f(lr, !0);
  },
  pause() {
    f(lr, !1);
  },
  stop() {
    f(lr, !1), f(dr, null);
  },
  init() {
    if (ci) return;
    const n = sn();
    f(On, n.audio.volume, !0), f(_n, n.audio.muted, !0), f(dr, n.audio.track, !0), f(lr, !1), ci = !0;
  },
  _reset() {
    f(On, Va, !0), f(_n, !1), f(lr, !1), f(dr, null), ci = !1;
  }
}, it = Be({ activeDialog: null, queue: [] });
function Jr(n) {
  return new Promise((e) => {
    const t = { ...n, resolver: e };
    it.activeDialog === null ? it.activeDialog = t : it.queue = [...it.queue, t];
  });
}
function ec(n) {
  it.activeDialog && (it.activeDialog.resolver(n), it.queue.length > 0 ? (it.activeDialog = it.queue[0], it.queue = it.queue.slice(1)) : it.activeDialog = null);
}
async function tc(n, e = "Abu OS 98") {
  await Jr({
    title: e,
    message: n,
    type: "info",
    buttons: [{ label: "OK", value: "ok", default: !0 }]
  });
}
async function nc(n, e = "Confirm") {
  return await Jr({
    title: e,
    message: n,
    type: "question",
    buttons: [
      { label: "Yes", value: !0, default: !0 },
      { label: "No", value: !1 }
    ]
  }) === !0;
}
async function rc(n, e = "Error") {
  await Jr({
    title: e,
    message: n,
    type: "error",
    buttons: [{ label: "OK", value: "ok", default: !0 }]
  });
}
async function ic(n, e = "Warning") {
  await Jr({
    title: e,
    message: n,
    type: "warning",
    buttons: [{ label: "OK", value: "ok", default: !0 }]
  });
}
async function sc(n) {
  return Jr(n);
}
function ac() {
  it.activeDialog && it.activeDialog.resolver(void 0), it.activeDialog = null, it.queue = [];
}
function oc() {
  return { activeDialog: it.activeDialog, queue: it.queue };
}
function lc() {
  return it.activeDialog;
}
const $e = {
  alert: tc,
  confirm: nc,
  error: rc,
  warning: ic,
  show: sc,
  close: ec,
  closeAll: ac,
  getState: oc,
  get activeDialog() {
    return lc();
  }
}, cc = "5";
var Xs;
typeof window < "u" && ((Xs = window.__svelte ?? (window.__svelte = {})).v ?? (Xs.v = /* @__PURE__ */ new Set())).add(cc);
var dc = /* @__PURE__ */ b('<button type="button" tabindex="0"><span class="button-label svelte-fib6r7"> </span></button>');
function ns(n, e) {
  let t = be(e, "disabled", 3, !1), r = be(e, "variant", 3, "default");
  var s = dc();
  let a;
  s.__click = function(...u) {
    e.onclick?.apply(this, u);
  };
  var o = d(s), c = d(o, !0);
  l(o), l(s), Z(
    (u) => {
      a = xe(s, 1, "win98-button svelte-fib6r7", null, a, u), s.disabled = t(), q(c, e.label);
    },
    [() => ({ primary: r() === "primary" })]
  ), m(n, s);
}
tt(["click"]);
function uc(n, e, t, r) {
  if (!e()) {
    const s = n.target;
    t(s.checked), r.onchange(t());
  }
}
var vc = /* @__PURE__ */ b('<span class="win98-checkbox__checkmark svelte-1cmejsa">✓</span>'), fc = /* @__PURE__ */ b('<label class="win98-checkbox svelte-1cmejsa"><input type="checkbox" class="win98-checkbox__input svelte-1cmejsa" tabindex="0"/> <span class="win98-checkbox__box svelte-1cmejsa"><!></span> <span class="win98-checkbox__label svelte-1cmejsa"> </span></label>');
function Ks(n, e) {
  Fe(e, !0);
  let t = be(e, "checked", 15), r = be(e, "disabled", 3, !1);
  var s = fc(), a = d(s);
  gt(a), a.__change = [uc, r, t, e];
  var o = h(a, 2), c = d(o);
  {
    var u = (_) => {
      var g = vc();
      m(_, g);
    };
    K(c, (_) => {
      t() && _(u);
    });
  }
  l(o);
  var v = h(o, 2), p = d(v, !0);
  l(v), l(s), Z(() => {
    kl(a, t()), a.disabled = r(), q(p, e.label);
  }), m(n, s), Oe();
}
tt(["change"]);
var hc = (n, e) => e(Number(n.target.value)), pc = /* @__PURE__ */ b('<div class="settings-window svelte-1l4irno"><div class="settings-section svelte-1l4irno"><h2 class="section-title svelte-1l4irno">Display</h2> <div class="setting-item svelte-1l4irno"><label class="setting-label svelte-1l4irno">Theme:</label> <div class="setting-control svelte-1l4irno"><span class="theme-indicator svelte-1l4irno"> </span> <!></div></div></div> <div class="settings-divider svelte-1l4irno"></div> <div class="settings-section svelte-1l4irno"><h2 class="section-title svelte-1l4irno">Audio</h2> <div class="setting-item svelte-1l4irno"><label class="setting-label svelte-1l4irno">Volume:</label> <div class="setting-control svelte-1l4irno"><input type="range" min="0" max="100" class="volume-slider svelte-1l4irno"/> <span class="volume-value svelte-1l4irno"> </span></div></div> <div class="setting-item svelte-1l4irno"><!></div></div> <div class="settings-divider svelte-1l4irno"></div> <div class="settings-section svelte-1l4irno"><h2 class="section-title svelte-1l4irno">Desktop</h2> <div class="setting-item svelte-1l4irno"><!></div></div> <div class="settings-footer svelte-1l4irno"><p class="settings-note svelte-1l4irno">Settings are automatically saved</p></div></div>');
function mc(n, e) {
  Fe(e, !0);
  let t = /* @__PURE__ */ j(Be(Ht.current)), r = /* @__PURE__ */ j(Gt.volume * 100), s = /* @__PURE__ */ j(Be(Gt.muted)), a = /* @__PURE__ */ j(Be(Qe.gridEnabled));
  function o() {
    Ht.toggle(), f(t, Ht.current, !0);
  }
  function c(O) {
    Gt.setVolume(O / 100), f(r, O, !0);
  }
  function u(O) {
    O !== Gt.muted && Gt.toggleMute(), f(s, O, !0);
  }
  function v(O) {
    Qe.setGridEnabled(O), f(a, O, !0);
  }
  var p = pc(), _ = d(p), g = h(d(_), 2), y = h(d(g), 2), I = d(y), E = d(I, !0);
  l(I);
  var L = h(I, 2);
  ns(L, { label: "Toggle Theme", onclick: o }), l(y), l(g), l(_);
  var T = h(_, 4), C = h(d(T), 2), z = h(d(C), 2), k = d(z);
  gt(k), k.__input = [hc, c];
  var w = h(k, 2), A = d(w);
  l(w), l(z), l(C);
  var x = h(C, 2), N = d(x);
  Ks(N, {
    get checked() {
      return i(s);
    },
    label: "Mute",
    onchange: u
  }), l(x), l(T);
  var te = h(T, 4), J = h(d(te), 2), H = d(J);
  Ks(H, {
    get checked() {
      return i(a);
    },
    label: "Auto-arrange icons in grid",
    onchange: v
  }), l(J), l(te), rn(2), l(p), Z(
    (O) => {
      q(E, i(t) === "dark" ? "Dark" : "Light"), yl(k, i(r)), k.disabled = i(s), q(A, `${O ?? ""}%`);
    },
    [() => Math.round(i(r))]
  ), m(n, p), Oe();
}
tt(["input"]);
var gc = /* @__PURE__ */ b('<div class="loading svelte-1akwiww">Loading system information...</div>'), bc = /* @__PURE__ */ b('<div class="info-row svelte-1akwiww"><span class="info-label svelte-1akwiww">Operating System:</span> <span class="info-value svelte-1akwiww"> </span></div> <div class="info-row svelte-1akwiww"><span class="info-label svelte-1akwiww">Version:</span> <span class="info-value svelte-1akwiww"> </span></div> <div class="info-row svelte-1akwiww"><span class="info-label svelte-1akwiww">Uptime:</span> <span class="info-value svelte-1akwiww"> </span></div> <div class="info-row svelte-1akwiww"><span class="info-label svelte-1akwiww">Memory:</span> <span class="info-value svelte-1akwiww"> </span></div> <div class="info-row svelte-1akwiww"><span class="info-label svelte-1akwiww">Memory Usage:</span> <div class="memory-bar svelte-1akwiww"><div class="memory-bar-fill svelte-1akwiww"></div></div></div>', 1), wc = /* @__PURE__ */ b('<div class="control-panel svelte-1akwiww"><div class="panel-header svelte-1akwiww"><i class="icon icon-system-control-panel icon-size-32"></i> <h1 class="panel-title svelte-1akwiww">Control Panel</h1></div> <div class="panel-section svelte-1akwiww"><div class="section-header svelte-1akwiww"><i class="icon icon-hardware-devices-display-properties"></i> <h2 class="section-title svelte-1akwiww">Display</h2></div> <div class="section-content svelte-1akwiww"><div class="info-row svelte-1akwiww"><span class="info-label svelte-1akwiww">Current Theme:</span> <span class="info-value svelte-1akwiww"> </span></div> <div class="info-row svelte-1akwiww"><span class="info-label svelte-1akwiww">Background:</span> <span class="info-value svelte-1akwiww"> </span></div></div></div> <div class="panel-section svelte-1akwiww"><div class="section-header svelte-1akwiww"><i class="icon icon-ui-misc-loudspeaker-wave"></i> <h2 class="section-title svelte-1akwiww">Audio</h2></div> <div class="section-content svelte-1akwiww"><div class="info-row svelte-1akwiww"><span class="info-label svelte-1akwiww">Volume:</span> <span class="info-value svelte-1akwiww"> </span></div> <div class="info-row svelte-1akwiww"><span class="info-label svelte-1akwiww">Muted:</span> <span class="info-value svelte-1akwiww"> </span></div> <div class="info-row svelte-1akwiww"><span class="info-label svelte-1akwiww">Status:</span> <span class="info-value svelte-1akwiww"> </span></div></div></div> <div class="panel-section svelte-1akwiww"><div class="section-header svelte-1akwiww"><i class="icon icon-system-computer"></i> <h2 class="section-title svelte-1akwiww">System</h2></div> <div class="section-content svelte-1akwiww"><!></div></div> <div class="panel-footer svelte-1akwiww"><i class="icon icon-ui-misc-info"></i> <span class="footer-text svelte-1akwiww">Use Settings to change system configuration</span></div></div>');
function _c(n, e) {
  Fe(e, !0);
  let t = /* @__PURE__ */ j(null), r = /* @__PURE__ */ j(!0);
  st(() => {
    e.kernel ? e.kernel.getSystemInfo().then((F) => {
      f(t, F, !0), f(r, !1);
    }) : (f(
      t,
      {
        osName: "Abu OS 98",
        version: "1.0.0",
        uptime: 0,
        totalMemory: 2048,
        usedMemory: 512
      },
      !0
    ), f(r, !1));
  });
  function s(F) {
    const P = Math.floor(F / 3600), U = Math.floor(F % 3600 / 60), ee = F % 60;
    return `${P}h ${U}m ${ee}s`;
  }
  var a = wc(), o = h(d(a), 2), c = h(d(o), 2), u = d(c), v = h(d(u), 2), p = d(v, !0);
  l(v), l(u);
  var _ = h(u, 2), g = h(d(_), 2), y = d(g, !0);
  l(g), l(_), l(c), l(o);
  var I = h(o, 2), E = h(d(I), 2), L = d(E), T = h(d(L), 2), C = d(T);
  l(T), l(L);
  var z = h(L, 2), k = h(d(z), 2), w = d(k, !0);
  l(k), l(z);
  var A = h(z, 2), x = h(d(A), 2), N = d(x, !0);
  l(x), l(A), l(E), l(I);
  var te = h(I, 2), J = h(d(te), 2), H = d(J);
  {
    var O = (F) => {
      var P = gc();
      m(F, P);
    }, B = (F) => {
      var P = Re(), U = Ce(P);
      {
        var ee = (W) => {
          var se = bc(), S = Ce(se), M = h(d(S), 2), V = d(M, !0);
          l(M), l(S);
          var $ = h(S, 2), Y = h(d($), 2), oe = d(Y, !0);
          l(Y), l($);
          var ie = h($, 2), re = h(d(ie), 2), ae = d(re, !0);
          l(re), l(ie);
          var fe = h(ie, 2), me = h(d(fe), 2), ve = d(me);
          l(me), l(fe);
          var X = h(fe, 2), le = h(d(X), 2), we = d(le);
          l(le), l(X), Z(
            (D) => {
              q(V, i(t).osName), q(oe, i(t).version), q(ae, D), q(ve, `${i(t).usedMemory ?? ""} / ${i(t).totalMemory ?? ""} MB`), qt(we, `width: ${i(t).usedMemory / i(t).totalMemory * 100}%`);
            },
            [() => s(i(t).uptime)]
          ), m(W, se);
        };
        K(
          U,
          (W) => {
            i(t) && W(ee);
          },
          !0
        );
      }
      m(F, P);
    };
    K(H, (F) => {
      i(r) ? F(O) : F(B, !1);
    });
  }
  l(J), l(te), rn(2), l(a), Z(() => {
    q(p, Ht.current === "dark" ? "Dark Mode" : "Light Mode"), q(y, Ht.current === "dark" ? "Blue Gradient" : "Teal"), q(C, `${Gt.volumePercent ?? ""}%`), q(w, Gt.muted ? "Yes" : "No"), q(N, Gt.playing ? "Playing" : "Stopped");
  }), m(n, a), Oe();
}
function yc(n, e, t) {
  const r = n.target;
  e(r.value), t.oninput(e());
}
function kc(n, e) {
  const t = n.target;
  e.onchange?.(t.value);
}
var xc = /* @__PURE__ */ b('<input class="win98-input svelte-1i3zh50" role="textbox"/>');
function ji(n, e) {
  Fe(e, !0);
  let t = be(e, "value", 15), r = be(e, "placeholder", 3, ""), s = be(e, "disabled", 3, !1), a = be(e, "readonly", 3, !1), o = be(e, "required", 3, !1), c = be(e, "type", 3, "text");
  var u = xc();
  gt(u), u.__input = [yc, t, e], u.__change = [kc, e], Z(() => {
    Se(u, "type", c()), Se(u, "placeholder", r()), u.disabled = s(), u.readOnly = a(), u.required = o(), Se(u, "aria-label", e["aria-label"]), Se(u, "aria-invalid", e["aria-invalid"]);
  }), Dt(u, t), m(n, u), Oe();
}
tt(["input", "change"]);
function Sc(n, e, t, r, s) {
  n.key === "Enter" ? (n.preventDefault(), e()) : n.key === "ArrowUp" ? (n.preventDefault(), t.length > 0 && (i(r) === -1 ? f(r, t.length - 1) : i(r) > 0 && Hr(r, -1), f(s, t[i(r)], !0))) : n.key === "ArrowDown" && (n.preventDefault(), i(r) !== -1 && (i(r) < t.length - 1 ? (Hr(r), f(s, t[i(r)], !0)) : (f(r, -1), f(s, ""))));
}
var Tc = /* @__PURE__ */ b('<div class="connection-form svelte-9fjk4h"><h2 class="form-title svelte-9fjk4h">SSH Connection</h2> <div class="form-field svelte-9fjk4h"><label for="host" class="svelte-9fjk4h">Host:</label> <!></div> <div class="form-field svelte-9fjk4h"><label for="port" class="svelte-9fjk4h">Port:</label> <!></div> <div class="form-field svelte-9fjk4h"><label for="username" class="svelte-9fjk4h">Username:</label> <!></div> <div class="form-actions svelte-9fjk4h"><!></div> <div class="form-note svelte-9fjk4h"><i class="icon icon-ui-misc-info"></i> <span>This is a mock SSH terminal. Commands will be executed through the kernel interface.</span></div></div>'), Ec = /* @__PURE__ */ b('<div class="output-line svelte-9fjk4h"> </div>'), Cc = /* @__PURE__ */ b('<div class="terminal-container svelte-9fjk4h"><div class="terminal-header svelte-9fjk4h"><span class="terminal-status svelte-9fjk4h"><i class="icon icon-ui-misc-info"></i> </span> <!></div> <div class="terminal-output svelte-9fjk4h"></div> <div class="terminal-input-area svelte-9fjk4h"><span class="terminal-prompt svelte-9fjk4h"> </span> <input type="text" class="terminal-input svelte-9fjk4h" placeholder="Enter command..."/></div></div>'), zc = /* @__PURE__ */ b('<div class="ssh-terminal svelte-9fjk4h"><!></div>');
function Mc(n, e) {
  Fe(e, !0);
  let t = /* @__PURE__ */ j(""), r = /* @__PURE__ */ j("22"), s = /* @__PURE__ */ j(""), a = /* @__PURE__ */ j(!1), o = /* @__PURE__ */ j(Be([])), c = /* @__PURE__ */ j(""), u = Be([]), v = /* @__PURE__ */ j(-1), p;
  function _() {
    if (!i(t) || !i(s)) {
      y("Error: Host and username are required");
      return;
    }
    y(`Connecting to ${i(s)}@${i(t)}:${i(r)}...`), setTimeout(
      () => {
        f(a, !0), y("Connection established (mock mode)"), y(`Welcome to ${i(t)}`), y(`Last login: ${(/* @__PURE__ */ new Date()).toLocaleString()}`), y(""), y(`${i(s)}@${i(t)}:~$`);
      },
      500
    );
  }
  function g() {
    y(""), y("Connection closed."), f(a, !1), f(c, "");
  }
  function y(k) {
    i(o).push(k), f(o, i(o), !0), setTimeout(
      () => {
        p && (p.scrollTop = p.scrollHeight);
      },
      0
    );
  }
  async function I(k) {
    if (k.trim()) {
      if (y(`${i(s)}@${i(t)}:~$ ${k}`), u.push(k), f(v, -1), e.kernel)
        try {
          const w = await e.kernel.executeCommand(k);
          w.stdout && w.stdout.split(`
`).forEach((A) => y(A)), w.stderr && w.stderr.split(`
`).forEach((A) => y(`Error: ${A}`)), w.exitCode !== 0 && y(`Exit code: ${w.exitCode}`);
        } catch (w) {
          y(`Error: ${w}`);
        }
      else
        y(`bash: ${k}: command not found`);
      y(""), y(`${i(s)}@${i(t)}:~$`);
    }
  }
  function E() {
    if (!i(c).trim()) return;
    const k = i(c);
    f(c, ""), I(k);
  }
  var L = zc(), T = d(L);
  {
    var C = (k) => {
      var w = Tc(), A = h(d(w), 2), x = h(d(A), 2);
      ji(x, {
        id: "host",
        get value() {
          return i(t);
        },
        placeholder: "example.com",
        oninput: (F) => f(t, F, !0)
      }), l(A);
      var N = h(A, 2), te = h(d(N), 2);
      ji(te, {
        id: "port",
        get value() {
          return i(r);
        },
        placeholder: "22",
        oninput: (F) => f(r, F, !0)
      }), l(N);
      var J = h(N, 2), H = h(d(J), 2);
      ji(H, {
        id: "username",
        get value() {
          return i(s);
        },
        placeholder: "user",
        oninput: (F) => f(s, F, !0)
      }), l(J);
      var O = h(J, 2), B = d(O);
      ns(B, { label: "Connect", onclick: _ }), l(O), rn(2), l(w), m(k, w);
    }, z = (k) => {
      var w = Cc(), A = d(w), x = d(A), N = h(d(x));
      l(x);
      var te = h(x, 2);
      ns(te, { label: "Disconnect", onclick: g }), l(A);
      var J = h(A, 2);
      Le(J, 21, () => i(o), je, (P, U) => {
        var ee = Ec(), W = d(ee, !0);
        l(ee), Z(() => q(W, i(U))), m(P, ee);
      }), l(J), Tt(J, (P) => p = P, () => p);
      var H = h(J, 2), O = d(H), B = d(O);
      l(O);
      var F = h(O, 2);
      gt(F), F.__keydown = [
        Sc,
        E,
        u,
        v,
        c
      ], Vo(F), l(H), l(w), Z(() => {
        q(N, ` Connected to ${i(t) ?? ""}`), q(B, `${i(s) ?? ""}@${i(t) ?? ""}:~$`);
      }), Dt(F, () => i(c), (P) => f(c, P)), m(k, w);
    };
    K(T, (k) => {
      i(a) ? k(z, !1) : k(C);
    });
  }
  l(L), m(n, L), Oe();
}
tt(["keydown"]);
function Ic(n, e) {
  e("about:blank");
}
function Gs(n, e) {
  f(e, !i(e));
}
function Ac(n, e) {
  n.key === "Enter" && e();
}
function Dc(n, e) {
  f(e, null);
}
var Lc = (
  // Keyboard shortcuts
  (n, e) => {
    n.stopPropagation(), e("file");
  }
), Rc = (n, e) => {
  n.stopPropagation(), e("edit");
}, Bc = (n, e) => {
  n.stopPropagation(), e("view");
}, Fc = (n, e) => {
  n.stopPropagation(), e("favorites");
}, Oc = (n, e) => {
  n.stopPropagation(), e("tools");
}, Hc = (n, e) => {
  n.stopPropagation(), e("help");
}, Pc = (n) => n.stopPropagation(), Nc = /* @__PURE__ */ b('<div class="ie-dropdown svelte-kqnazb" style="left: 0px;"><div class="ie-menu-dropdown-item disabled svelte-kqnazb">New</div> <div class="ie-menu-dropdown-item disabled svelte-kqnazb">Open...</div> <div class="ie-menu-dropdown-separator svelte-kqnazb"></div> <div class="ie-menu-dropdown-item disabled svelte-kqnazb">Save</div> <div class="ie-menu-dropdown-item disabled svelte-kqnazb">Save As...</div></div>'), jc = (n) => n.stopPropagation(), qc = /* @__PURE__ */ b('<div class="ie-dropdown svelte-kqnazb" style="left: 31px;"><div class="ie-menu-dropdown-item disabled svelte-kqnazb">Cut</div> <div class="ie-menu-dropdown-item disabled svelte-kqnazb">Copy</div> <div class="ie-menu-dropdown-item disabled svelte-kqnazb">Paste</div> <div class="ie-menu-dropdown-separator svelte-kqnazb"></div> <div class="ie-menu-dropdown-item disabled svelte-kqnazb">Select All</div></div>'), Wc = (n) => n.stopPropagation(), Uc = /* @__PURE__ */ b('<div class="ie-dropdown svelte-kqnazb" style="left: 67px;"><div class="ie-menu-dropdown-item disabled svelte-kqnazb">Toolbars</div> <div class="ie-menu-dropdown-item disabled svelte-kqnazb">Status Bar</div> <div class="ie-menu-dropdown-separator svelte-kqnazb"></div> <div class="ie-menu-dropdown-item svelte-kqnazb">Stop</div> <div class="ie-menu-dropdown-item svelte-kqnazb">Refresh</div> <div class="ie-menu-dropdown-separator svelte-kqnazb"></div> <div class="ie-menu-dropdown-item disabled svelte-kqnazb">Source</div> <div class="ie-menu-dropdown-item disabled svelte-kqnazb">Full Screen</div></div>'), Kc = (n) => n.stopPropagation(), Gc = (n, e, t) => e(i(t).url), Vc = /* @__PURE__ */ b('<div class="ie-menu-dropdown-item svelte-kqnazb"> </div>'), Yc = /* @__PURE__ */ b('<div class="ie-menu-dropdown-item disabled svelte-kqnazb">(Empty)</div>'), Xc = /* @__PURE__ */ b('<div class="ie-dropdown svelte-kqnazb" style="left: 107px;"><div class="ie-menu-dropdown-item svelte-kqnazb">Add to Favorites...</div> <div class="ie-menu-dropdown-separator svelte-kqnazb"></div> <!></div>'), Jc = (n) => n.stopPropagation(), Zc = /* @__PURE__ */ b('<div class="ie-dropdown svelte-kqnazb" style="left: 180px;"><div class="ie-menu-dropdown-item disabled svelte-kqnazb">Mail and News</div> <div class="ie-menu-dropdown-separator svelte-kqnazb"></div> <div class="ie-menu-dropdown-item disabled svelte-kqnazb">Internet Options...</div></div>'), Qc = (n) => n.stopPropagation(), $c = /* @__PURE__ */ b('<div class="ie-dropdown svelte-kqnazb" style="left: 229px;"><div class="ie-menu-dropdown-item disabled svelte-kqnazb">Contents and Index</div> <div class="ie-menu-dropdown-separator svelte-kqnazb"></div> <div class="ie-menu-dropdown-item disabled svelte-kqnazb">About Internet Explorer</div></div>'), ed = /* @__PURE__ */ b('<div class="ie-favorites-empty svelte-kqnazb">No favorites</div>'), td = (n, e, t) => e(i(t).url), nd = (n, e, t) => e(i(t).id), rd = /* @__PURE__ */ b('<div class="ie-favorite-item svelte-kqnazb"><button type="button" class="ie-favorite-link svelte-kqnazb"><i class="icon icon-ui-toolbar-favorites ie-favorite-icon svelte-kqnazb"></i> <span> </span></button> <button type="button" class="ie-favorite-delete svelte-kqnazb">×</button></div>'), id = /* @__PURE__ */ b('<div class="ie-favorites-panel svelte-kqnazb"><div class="ie-favorites-header svelte-kqnazb"><strong>Favorites</strong> <button type="button" class="ie-favorites-close svelte-kqnazb">×</button></div> <div class="ie-favorites-list svelte-kqnazb"><!></div></div>'), sd = /* @__PURE__ */ b('<div class="ie-error svelte-kqnazb"><h2 class="svelte-kqnazb">The page cannot be displayed</h2> <p>The page you are looking for is currently unavailable. The Web site might be experiencing technical difficulties, or you may need to adjust your browser settings.</p> <hr class="svelte-kqnazb"/> <p><strong>Please try the following:</strong></p> <ul class="svelte-kqnazb"><li class="svelte-kqnazb">Click the <strong>Refresh</strong> button, or try again later.</li> <li class="svelte-kqnazb">If you typed the page address in the Address bar, make sure that it is spelled correctly.</li> <li class="svelte-kqnazb">Many sites (Google, Facebook, etc.) block iframe embedding for security reasons.</li></ul> <p>HTTP 403 - Forbidden or X-Frame-Options blocking</p></div>'), ad = /* @__PURE__ */ b('<iframe class="ie-iframe svelte-kqnazb" title="Browser Content" sandbox="allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"></iframe>'), od = /* @__PURE__ */ b('<div class="ie-browser svelte-kqnazb"><div class="ie-menubar svelte-kqnazb"><button type="button"><span class="ie-menu-text svelte-kqnazb"><u class="svelte-kqnazb">F</u>ile</span></button> <button type="button"><span class="ie-menu-text svelte-kqnazb"><u class="svelte-kqnazb">E</u>dit</span></button> <button type="button"><span class="ie-menu-text svelte-kqnazb"><u class="svelte-kqnazb">V</u>iew</span></button> <button type="button"><span class="ie-menu-text svelte-kqnazb">F<u class="svelte-kqnazb">a</u>vorites</span></button> <button type="button"><span class="ie-menu-text svelte-kqnazb"><u class="svelte-kqnazb">T</u>ools</span></button> <button type="button"><span class="ie-menu-text svelte-kqnazb"><u class="svelte-kqnazb">H</u>elp</span></button> <!> <!> <!> <!> <!> <!></div> <div class="ie-toolbar svelte-kqnazb"><button type="button" class="ie-toolbar-btn svelte-kqnazb" title="Back (Alt+Left Arrow)"><span class="ie-btn-icon svelte-kqnazb">◄</span></button> <button type="button" class="ie-toolbar-btn svelte-kqnazb" title="Forward (Alt+Right Arrow)"><span class="ie-btn-icon svelte-kqnazb">►</span></button> <button type="button" class="ie-toolbar-btn svelte-kqnazb" title="Stop (Esc)"><span class="ie-btn-icon svelte-kqnazb">■</span></button> <button type="button" class="ie-toolbar-btn svelte-kqnazb" title="Refresh (F5)"><i class="icon icon-ui-toolbar-search ie-toolbar-icon svelte-kqnazb"></i></button> <button type="button" class="ie-toolbar-btn svelte-kqnazb" title="Home"><i class="icon icon-ui-toolbar-homepage ie-toolbar-icon svelte-kqnazb"></i></button> <div class="ie-toolbar-separator svelte-kqnazb"></div> <button type="button" class="ie-toolbar-btn-text svelte-kqnazb" disabled title="Search"><i class="icon icon-ui-toolbar-search ie-toolbar-icon svelte-kqnazb"></i> <span class="ie-btn-text svelte-kqnazb">Search</span></button> <button type="button" class="ie-toolbar-btn-text svelte-kqnazb" title="Favorites"><i class="icon icon-ui-toolbar-favorites ie-toolbar-icon svelte-kqnazb"></i> <span class="ie-btn-text svelte-kqnazb">Favorites</span></button> <button type="button" class="ie-toolbar-btn-text svelte-kqnazb" disabled title="History"><i class="icon icon-ui-toolbar-history ie-toolbar-icon svelte-kqnazb"></i> <span class="ie-btn-text svelte-kqnazb">History</span></button></div> <div class="ie-addressbar svelte-kqnazb"><span class="ie-address-label svelte-kqnazb">Address</span> <div class="ie-address-combo svelte-kqnazb"><button type="button" class="ie-address-dropdown svelte-kqnazb" title="Recent pages"><span class="ie-dropdown-arrow">▼</span></button> <div class="ie-address-input-wrapper svelte-kqnazb"><span class="ie-address-icon svelte-kqnazb">📄</span> <input type="text" class="ie-address-input svelte-kqnazb" placeholder=""/></div></div> <button type="button" class="ie-go-btn svelte-kqnazb">Go</button></div> <div class="ie-linksbar svelte-kqnazb"><span class="ie-links-label svelte-kqnazb">Links</span> <button type="button" class="ie-links-dropdown svelte-kqnazb">▼</button> <button type="button" class="ie-link-btn svelte-kqnazb" disabled>Best of the Web</button> <button type="button" class="ie-link-btn svelte-kqnazb" disabled>Channel Guide</button> <button type="button" class="ie-link-btn svelte-kqnazb" disabled>Customize Links</button></div> <!> <div class="ie-content svelte-kqnazb"><!></div> <div class="ie-statusbar svelte-kqnazb"><div class="ie-status-text svelte-kqnazb"> </div> <div class="ie-status-zone svelte-kqnazb"><span class="ie-zone-icon svelte-kqnazb">🌐</span> <span>My Computer</span></div></div></div>');
function ld(n, e) {
  Fe(e, !0);
  let t = /* @__PURE__ */ j(""), r = /* @__PURE__ */ j(""), s = /* @__PURE__ */ j(Be([])), a = /* @__PURE__ */ j(-1), o = /* @__PURE__ */ j(!1), c = /* @__PURE__ */ j(!1), u = /* @__PURE__ */ j(Be([])), v = null, p = /* @__PURE__ */ j(!1), _ = /* @__PURE__ */ j("Ready"), g = /* @__PURE__ */ j(null);
  const y = /* @__PURE__ */ ze(() => i(a) > 0), I = /* @__PURE__ */ ze(() => i(a) < i(s).length - 1);
  st(() => {
    const ce = localStorage.getItem("abu-browser-bookmarks");
    if (ce)
      try {
        f(u, JSON.parse(ce), !0);
      } catch (Te) {
        console.error("Failed to load bookmarks:", Te), f(u, [], !0);
      }
  });
  function E() {
    try {
      localStorage.setItem("abu-browser-bookmarks", JSON.stringify(i(u)));
    } catch (ce) {
      console.error("Failed to save bookmarks:", ce);
    }
  }
  function L(ce) {
    return ce.trim() ? ce === "about:blank" || ce.match(/^https?:\/\//i) ? ce : `https://${ce}` : "about:blank";
  }
  function T(ce) {
    const Te = L(ce);
    i(a) < i(s).length - 1 && f(s, i(s).slice(0, i(a) + 1), !0), f(s, [...i(s), Te], !0), f(a, i(s).length - 1), i(s).length > 50 && (f(s, i(s).slice(-50), !0), f(a, i(s).length - 1)), f(t, Te, !0), f(r, Te, !0), f(o, !0), f(p, !1), f(_, `Opening page ${Te}...`);
  }
  function C() {
    i(r).trim() && T(i(r));
  }
  function z() {
    i(y) && (Hr(a, -1), f(t, i(s)[i(a)], !0), f(r, i(t), !0), f(o, !0), f(p, !1), f(_, `Opening page ${i(t)}...`));
  }
  function k() {
    i(I) && (Hr(a), f(t, i(s)[i(a)], !0), f(r, i(t), !0), f(o, !0), f(p, !1), f(_, `Opening page ${i(t)}...`));
  }
  function w() {
    v && (f(o, !0), f(p, !1), f(_, "Refreshing..."), v.src = i(t));
  }
  function A() {
    v && v.contentWindow && (v.contentWindow.stop(), f(o, !1), f(_, "Stopped"));
  }
  function x() {
    f(o, !1), f(p, !1), f(_, "Done");
  }
  function N() {
    f(o, !1), f(p, !0), f(_, "Page cannot be displayed");
  }
  function te() {
    if (!i(t) || i(t) === "about:blank" || i(u).some((Te) => Te.url === i(t))) return;
    const ce = {
      id: `bm-${Date.now()}`,
      title: i(t),
      url: i(t),
      dateAdded: Date.now()
    };
    f(u, [...i(u), ce], !0), E();
  }
  function J(ce) {
    f(u, i(u).filter((Te) => Te.id !== ce), !0), E();
  }
  function H(ce) {
    f(r, ce, !0), T(ce), f(c, !1);
  }
  function O(ce) {
    f(g, i(g) === ce ? null : ce, !0);
  }
  function B(ce) {
    ce.altKey && ce.key === "ArrowLeft" ? (ce.preventDefault(), z()) : ce.altKey && ce.key === "ArrowRight" ? (ce.preventDefault(), k()) : ce.key === "F5" ? (ce.preventDefault(), w()) : ce.key === "Escape" && i(o) ? (ce.preventDefault(), A()) : ce.ctrlKey && ce.key === "d" && (ce.preventDefault(), te());
  }
  var F = od();
  G("keydown", Rt, B), F.__click = [Dc, g];
  var P = d(F), U = d(P);
  let ee;
  U.__click = [Lc, O];
  var W = h(U, 2);
  let se;
  W.__click = [Rc, O];
  var S = h(W, 2);
  let M;
  S.__click = [Bc, O];
  var V = h(S, 2);
  let $;
  V.__click = [Fc, O];
  var Y = h(V, 2);
  let oe;
  Y.__click = [Oc, O];
  var ie = h(Y, 2);
  let re;
  ie.__click = [Hc, O];
  var ae = h(ie, 2);
  {
    var fe = (ce) => {
      var Te = Nc();
      Te.__click = [Pc], m(ce, Te);
    };
    K(ae, (ce) => {
      i(g) === "file" && ce(fe);
    });
  }
  var me = h(ae, 2);
  {
    var ve = (ce) => {
      var Te = qc();
      Te.__click = [jc], m(ce, Te);
    };
    K(me, (ce) => {
      i(g) === "edit" && ce(ve);
    });
  }
  var X = h(me, 2);
  {
    var le = (ce) => {
      var Te = Uc();
      Te.__click = [Wc];
      var ot = h(d(Te), 6);
      ot.__click = A;
      var Mt = h(ot, 2);
      Mt.__click = w, rn(6), l(Te), m(ce, Te);
    };
    K(X, (ce) => {
      i(g) === "view" && ce(le);
    });
  }
  var we = h(X, 2);
  {
    var D = (ce) => {
      var Te = Xc();
      Te.__click = [Kc];
      var ot = d(Te);
      ot.__click = te;
      var Mt = h(ot, 4);
      {
        var mn = (gn) => {
          var nr = Re(), bn = Ce(nr);
          Le(bn, 17, () => i(u), je, (rr, Zr) => {
            var ir = Vc();
            ir.__click = [Gc, H, Zr];
            var Cr = d(ir, !0);
            l(ir), Z(() => q(Cr, i(Zr).title)), m(rr, ir);
          }), m(gn, nr);
        }, Er = (gn) => {
          var nr = Yc();
          m(gn, nr);
        };
        K(Mt, (gn) => {
          i(u).length > 0 ? gn(mn) : gn(Er, !1);
        });
      }
      l(Te), m(ce, Te);
    };
    K(we, (ce) => {
      i(g) === "favorites" && ce(D);
    });
  }
  var Q = h(we, 2);
  {
    var R = (ce) => {
      var Te = Zc();
      Te.__click = [Jc], m(ce, Te);
    };
    K(Q, (ce) => {
      i(g) === "tools" && ce(R);
    });
  }
  var ne = h(Q, 2);
  {
    var ge = (ce) => {
      var Te = $c();
      Te.__click = [Qc], m(ce, Te);
    };
    K(ne, (ce) => {
      i(g) === "help" && ce(ge);
    });
  }
  l(P);
  var de = h(P, 2), pe = d(de);
  pe.__click = z;
  var he = h(pe, 2);
  he.__click = k;
  var ke = h(he, 2);
  ke.__click = A;
  var Me = h(ke, 2);
  Me.__click = w;
  var _e = h(Me, 2);
  _e.__click = [Ic, T];
  var ye = h(_e, 6);
  ye.__click = [Gs, c], rn(2), l(de);
  var Ue = h(de, 2), qe = h(d(Ue), 2), Ke = h(d(qe), 2), Ve = h(d(Ke), 2);
  gt(Ve), Ve.__keydown = [Ac, C], l(Ke), l(qe);
  var Ye = h(qe, 2);
  Ye.__click = C, l(Ue);
  var Ne = h(Ue, 4);
  {
    var Je = (ce) => {
      var Te = id(), ot = d(Te), Mt = h(d(ot), 2);
      Mt.__click = [Gs, c], l(ot);
      var mn = h(ot, 2), Er = d(mn);
      {
        var gn = (bn) => {
          var rr = ed();
          m(bn, rr);
        }, nr = (bn) => {
          var rr = Re(), Zr = Ce(rr);
          Le(Zr, 17, () => i(u), je, (ir, Cr) => {
            var Di = rd(), Qr = d(Di);
            Qr.__click = [td, H, Cr];
            var ws = h(d(Qr), 2), Qa = d(ws, !0);
            l(ws), l(Qr);
            var $a = h(Qr, 2);
            $a.__click = [nd, J, Cr], l(Di), Z(() => q(Qa, i(Cr).title)), m(ir, Di);
          }), m(bn, rr);
        };
        K(Er, (bn) => {
          i(u).length === 0 ? bn(gn) : bn(nr, !1);
        });
      }
      l(mn), l(Te), m(ce, Te);
    };
    K(Ne, (ce) => {
      i(c) && ce(Je);
    });
  }
  var nt = h(Ne, 2), Ct = d(nt);
  {
    var ft = (ce) => {
      var Te = sd();
      m(ce, Te);
    }, ht = (ce) => {
      var Te = ad();
      Tt(Te, (ot) => v = ot, () => v), Z(() => Se(Te, "src", i(t))), G("load", Te, x), G("error", Te, N), ol(Te), m(ce, Te);
    };
    K(Ct, (ce) => {
      i(p) ? ce(ft) : ce(ht, !1);
    });
  }
  l(nt);
  var yt = h(nt, 2), rt = d(yt), zt = d(rt, !0);
  l(rt), rn(2), l(yt), l(F), Z(
    (ce, Te, ot, Mt, mn, Er) => {
      ee = xe(U, 1, "ie-menu-item svelte-kqnazb", null, ee, ce), se = xe(W, 1, "ie-menu-item svelte-kqnazb", null, se, Te), M = xe(S, 1, "ie-menu-item svelte-kqnazb", null, M, ot), $ = xe(V, 1, "ie-menu-item svelte-kqnazb", null, $, Mt), oe = xe(Y, 1, "ie-menu-item svelte-kqnazb", null, oe, mn), re = xe(ie, 1, "ie-menu-item svelte-kqnazb", null, re, Er), pe.disabled = !i(y), he.disabled = !i(I), ke.disabled = !i(o), Se(Ve, "id", `address-${e.windowId ?? ""}`), q(zt, i(_));
    },
    [
      () => ({ active: i(g) === "file" }),
      () => ({ active: i(g) === "edit" }),
      () => ({ active: i(g) === "view" }),
      () => ({ active: i(g) === "favorites" }),
      () => ({ active: i(g) === "tools" }),
      () => ({ active: i(g) === "help" })
    ]
  ), Dt(Ve, () => i(r), (ce) => f(r, ce)), m(n, F), Oe();
}
tt(["click", "keydown"]);
function cd(n, e, t) {
  if (f(e, [], !0), i(t)) {
    const r = i(t).querySelector(".cursor");
    r && r.parentElement && r.parentElement.remove();
  }
}
function dd(n, e, t, r) {
  f(e, ""), f(t, "disconnected"), f(r, !0);
}
var ud = /* @__PURE__ */ b('<div class="error-message svelte-f0apch"><span class="error-icon svelte-f0apch">⚠</span> <span> </span></div>'), vd = /* @__PURE__ */ b('<button type="button" class="msdos-button svelte-f0apch">Retry</button>'), fd = /* @__PURE__ */ b('<button type="button" class="msdos-button svelte-f0apch"> </button>'), hd = (
  // Format bytes
  // Cleanup on unmount
  (n, e) => {
    f(e, "");
  }
), pd = /* @__PURE__ */ b('<div class="connection-dialog"><div class="dialog-overlay svelte-f0apch"><div class="win98-dialog svelte-f0apch"><div class="dialog-header svelte-f0apch"><span class="titlebar-text svelte-f0apch">Microsoft(R) Windows 98</span> <span class="copyright svelte-f0apch">(C)Copyright Microsoft Corp 1981-1999</span></div> <div class="win98-dialog-content svelte-f0apch"><!> <div class="info-text svelte-f0apch"> </div> <div class="help-text svelte-f0apch">Connect to a ttyd or websockify server</div> <div class="dialog-field svelte-f0apch"><label class="svelte-f0apch">Host:</label> <input type="text" placeholder="abupi.local" class="svelte-f0apch"/></div> <div class="dialog-field svelte-f0apch"><label class="svelte-f0apch">Port:</label> <input type="text" placeholder="7681" class="svelte-f0apch"/></div> <div class="dialog-field svelte-f0apch"><label class="svelte-f0apch">Username:</label> <input type="text" placeholder="pi" class="svelte-f0apch"/></div> <div class="dialog-field svelte-f0apch"><label class="svelte-f0apch">Password:</label> <input type="password" placeholder="" class="svelte-f0apch"/></div> <div class="dialog-buttons svelte-f0apch"><!> <button type="button" class="msdos-button svelte-f0apch">Cancel</button></div></div></div></div></div>'), md = /* @__PURE__ */ b('<div class="terminal-line svelte-f0apch"> </div>'), gd = /* @__PURE__ */ b('<span class="cursor svelte-f0apch">█</span>'), bd = /* @__PURE__ */ b('<div class="terminal-line svelte-f0apch"><!></div>'), wd = /* @__PURE__ */ b('<span class="cursor svelte-f0apch">█</span>'), _d = /* @__PURE__ */ b('<div class="msdos-screen svelte-f0apch" tabindex="0"><div class="terminal-output svelte-f0apch"><!> <!></div></div> <div class="status-bar svelte-f0apch"><div class="status-left svelte-f0apch"><span class="status-indicator connected svelte-f0apch">●</span> <span> </span></div> <div class="status-center svelte-f0apch"><span> </span></div> <div class="status-right svelte-f0apch"><button type="button" class="status-button svelte-f0apch">Disconnect</button> <button type="button" class="status-button svelte-f0apch">Clear</button></div></div>', 1), yd = /* @__PURE__ */ b('<div class="msdos-console svelte-f0apch"><!> <!></div>');
function kd(n, e) {
  Fe(e, !0);
  let t = /* @__PURE__ */ j("disconnected"), r = /* @__PURE__ */ j(!0), s = /* @__PURE__ */ j("abupi.local"), a = /* @__PURE__ */ j("7681"), o = /* @__PURE__ */ j("pi"), c = /* @__PURE__ */ j(""), u = /* @__PURE__ */ j(""), v = /* @__PURE__ */ j(0), p = /* @__PURE__ */ j(Be([])), _ = /* @__PURE__ */ j(!0), g = null, y = /* @__PURE__ */ j(null), I = /* @__PURE__ */ j(0), E;
  const L = /* @__PURE__ */ ze(() => `ws://${i(s)}:${i(a)}/ws`), T = /* @__PURE__ */ ze(() => i(t) === "connected"), C = /* @__PURE__ */ ze(() => i(t) === "connecting");
  st(() => {
    (i(T) || i(C)) && i(p).length === 0 && (k("Microsoft(R) Windows 98"), k("(C)Copyright Microsoft Corp 1981-1999"), k(""));
  }), st(() => (i(T) ? E = window.setInterval(
    () => {
      f(_, !i(_));
    },
    530
  ) : (E && window.clearInterval(E), f(_, !0)), () => {
    E && window.clearInterval(E);
  }));
  function z() {
    i(y) && (i(y).scrollTop = 999999, requestAnimationFrame(() => {
      i(y) && (i(y).scrollTop = 999999);
    }));
  }
  function k(P) {
    if (!P) return;
    const U = P.split(/\r?\n/);
    if (i(p).length > 0 && !P.startsWith(`
`) && !P.startsWith("\r")) {
      const ee = i(p)[i(p).length - 1];
      U[0] && (i(p)[i(p).length - 1] = ee + U[0], U.shift());
    }
    U.forEach((ee) => {
      i(p).push(ee);
    }), i(p).length > 1e4 && f(p, i(p).slice(-1e4), !0), z();
  }
  async function w() {
    if (!i(s) || !i(o)) {
      f(u, "Host and username are required"), f(t, "error");
      return;
    }
    f(u, ""), f(p, [], !0), f(I, Date.now(), !0), f(t, "connecting"), setTimeout(
      () => {
        i(t) === "connecting" && f(r, !1);
      },
      0
    );
    try {
      let P = i(L);
      try {
        const U = await fetch(`http://${i(s)}:${i(a)}/token`);
        if (U.ok) {
          const { token: ee } = await U.json();
          P = `${i(L)}?token=${ee}`;
        }
      } catch {
        console.log("No token required or CORS blocked, connecting directly...");
      }
      g = new WebSocket(P), g.onopen = () => {
        f(t, "connected"), f(
          r,
          !1
          // Hide dialog when connected
        ), console.log("WebSocket connected, terminal ready");
        const U = (ee) => {
          x(ee);
        };
        window.addEventListener("keydown", U), i(c) && g && g.send(i(c) + `
`);
      }, g.onmessage = async (U) => {
        const ee = U.data;
        let W = "";
        typeof ee == "string" ? (W = ee, f(v, i(v) + ee.length)) : ee instanceof Blob ? (W = await ee.text(), f(v, i(v) + W.length)) : ee instanceof ArrayBuffer && (W = new TextDecoder().decode(ee), f(v, i(v) + ee.byteLength)), W && (console.log("Received:", W.length, "bytes"), k(W));
      }, g.onerror = (U) => {
        console.error("WebSocket error:", U), f(u, "Connection error occurred"), f(t, "error"), f(r, !1), k("ERROR: Connection failed"), console.log("Added ERROR message to terminal output");
      }, g.onclose = (U) => {
        f(t, "disconnected"), f(r, !0), g = null;
      };
    } catch (P) {
      f(u, `Connection failed: ${P}`), f(t, "error");
    }
  }
  function A() {
    g && (g.close(), g = null), k(""), k("Connection closed"), f(t, "disconnected");
  }
  st(() => {
    i(T) && i(y) && (i(y).tabIndex = 0, i(y).focus());
  });
  function x(P) {
    if (!i(T) || !g || g.readyState !== 1 || P.ctrlKey && P.key === "v")
      return;
    if (P.ctrlKey && P.key === "c") {
      const ee = window.getSelection();
      if (ee && ee.toString().length > 0)
        return;
    }
    (!P.ctrlKey || P.ctrlKey && P.key !== "c" && P.key !== "v") && P.preventDefault();
    let U = "";
    if (P.ctrlKey && P.key.length === 1 && !P.altKey && !P.metaKey) {
      const ee = P.key.toLowerCase();
      ee >= "a" && ee <= "z" && (U = String.fromCharCode(ee.charCodeAt(0) - 96));
    } else if (P.key.length === 1 && !P.ctrlKey && !P.altKey && !P.metaKey)
      U = P.key;
    else
      switch (P.key) {
        case "Enter":
          U = "\r";
          break;
        case "Backspace":
          U = "";
          break;
        case "Tab":
          U = "	";
          break;
        case "Escape":
          U = "\x1B";
          break;
        case "ArrowUp":
          U = "\x1B[A";
          break;
        case "ArrowDown":
          U = "\x1B[B";
          break;
        case "ArrowRight":
          U = "\x1B[C";
          break;
        case "ArrowLeft":
          U = "\x1B[D";
          break;
        case "Home":
          U = "\x1B[H";
          break;
        case "End":
          U = "\x1B[F";
          break;
        case "PageUp":
          U = "\x1B[5~";
          break;
        case "PageDown":
          U = "\x1B[6~";
          break;
        case "Delete":
          U = "\x1B[3~";
          break;
        case "Insert":
          U = "\x1B[2~";
          break;
      }
    U && g && g.readyState === 1 && g.send(U);
  }
  function N(P) {
    if (!i(T) || !g || g.readyState !== WebSocket.OPEN) return;
    P.preventDefault();
    const U = P.clipboardData?.getData("text");
    U && g.readyState === WebSocket.OPEN && g.send(U);
  }
  function te(P) {
    return P < 1024 ? `${P} B` : P < 1024 * 1024 ? `${(P / 1024).toFixed(1)} KB` : `${(P / (1024 * 1024)).toFixed(1)} MB`;
  }
  Yr(() => {
    g && g.close(), E && window.clearInterval(E);
  });
  var J = yd(), H = d(J);
  {
    var O = (P) => {
      var U = pd(), ee = d(U), W = d(ee), se = h(d(W), 2), S = d(se);
      {
        var M = (pe) => {
          var he = ud(), ke = h(d(he), 2), Me = d(ke, !0);
          l(ke), l(he), Z(() => q(Me, i(u))), m(pe, he);
        };
        K(S, (pe) => {
          i(u) && pe(M);
        });
      }
      var V = h(S, 2), $ = d(V);
      l(V);
      var Y = h(V, 4), oe = d(Y), ie = h(oe, 2);
      gt(ie), l(Y);
      var re = h(Y, 2), ae = d(re), fe = h(ae, 2);
      gt(fe), l(re);
      var me = h(re, 2), ve = d(me), X = h(ve, 2);
      gt(X), l(me);
      var le = h(me, 2), we = d(le), D = h(we, 2);
      gt(D), l(le);
      var Q = h(le, 2), R = d(Q);
      {
        var ne = (pe) => {
          var he = vd();
          he.__click = [dd, u, t, r], m(pe, he);
        }, ge = (pe) => {
          var he = fd();
          he.__click = w;
          var ke = d(he, !0);
          l(he), Z(() => q(ke, i(t) === "connecting" ? "Connecting..." : "Connect")), m(pe, he);
        };
        K(R, (pe) => {
          i(t) === "error" ? pe(ne) : pe(ge, !1);
        });
      }
      var de = h(R, 2);
      de.__click = [hd, u], l(Q), l(se), l(W), l(ee), l(U), Z(() => {
        q($, `WebSocket URL: ${i(L) ?? ""}`), Se(oe, "for", `host-${e.windowId ?? ""}`), Se(ie, "id", `host-${e.windowId ?? ""}`), ie.disabled = i(C), Se(ae, "for", `port-${e.windowId ?? ""}`), Se(fe, "id", `port-${e.windowId ?? ""}`), fe.disabled = i(C), Se(ve, "for", `username-${e.windowId ?? ""}`), Se(X, "id", `username-${e.windowId ?? ""}`), X.disabled = i(C), Se(we, "for", `password-${e.windowId ?? ""}`), Se(D, "id", `password-${e.windowId ?? ""}`), D.disabled = i(C);
      }), Dt(ie, () => i(s), (pe) => f(s, pe)), Dt(fe, () => i(a), (pe) => f(a, pe)), Dt(X, () => i(o), (pe) => f(o, pe)), Dt(D, () => i(c), (pe) => f(c, pe)), m(P, U);
    };
    K(H, (P) => {
      i(r) && P(O);
    });
  }
  var B = h(H, 2);
  {
    var F = (P) => {
      var U = _d(), ee = Ce(U);
      ee.__keydown = x;
      var W = d(ee), se = d(W);
      Le(se, 17, () => i(p), je, (le, we) => {
        var D = md(), Q = d(D, !0);
        l(D), Z(() => q(Q, i(we))), m(le, D);
      });
      var S = h(se, 2);
      {
        var M = (le) => {
          var we = bd(), D = d(we);
          {
            var Q = (R) => {
              var ne = gd();
              m(R, ne);
            };
            K(D, (R) => {
              i(_) && R(Q);
            });
          }
          l(we), m(le, we);
        }, V = (le) => {
          var we = Re(), D = Ce(we);
          {
            var Q = (R) => {
              var ne = wd();
              m(R, ne);
            };
            K(D, (R) => {
              i(_) && R(Q);
            });
          }
          m(le, we);
        };
        K(S, (le) => {
          i(p).length === 0 ? le(M) : le(V, !1);
        });
      }
      l(W), l(ee), Tt(ee, (le) => f(y, le), () => i(y));
      var $ = h(ee, 2), Y = d($), oe = h(d(Y), 2), ie = d(oe);
      l(oe), l(Y);
      var re = h(Y, 2), ae = d(re), fe = d(ae);
      l(ae), l(re);
      var me = h(re, 2), ve = d(me);
      ve.__click = A;
      var X = h(ve, 2);
      X.__click = [cd, p, y], l(me), l($), Z(
        (le) => {
          q(ie, `Connected: ${i(o) ?? ""}@${i(s) ?? ""}:${i(a) ?? ""}`), q(fe, `Rx: ${le ?? ""}`);
        },
        [() => te(i(v))]
      ), G("paste", ee, N), m(P, U);
    };
    K(B, (P) => {
      (!i(r) || i(t) === "connecting") && P(F);
    });
  }
  l(J), m(n, J), Oe();
}
tt(["click", "keydown"]);
var xd = /* @__PURE__ */ b('<div class="terminal-line svelte-1fgrhx"> </div>'), Sd = /* @__PURE__ */ b('<div class="terminal-input-line svelte-1fgrhx"><span class="terminal-prompt svelte-1fgrhx" data-testid="terminal-prompt"> </span> <span class="terminal-input svelte-1fgrhx" data-testid="terminal-input"> </span> <span class="terminal-cursor svelte-1fgrhx" data-testid="terminal-cursor">█</span></div>'), Td = /* @__PURE__ */ b('<span class="terminal-cursor svelte-1fgrhx" data-testid="terminal-cursor">█</span>'), Ed = /* @__PURE__ */ b('<div class="terminal svelte-1fgrhx" data-testid="terminal"><div class="terminal-screen builtin-terminal svelte-1fgrhx" data-testid="terminal-screen" role="textbox" tabindex="0"><div class="terminal-output svelte-1fgrhx" data-testid="terminal-output"><!> <!></div></div></div>');
function Cd(n, e) {
  Fe(e, !0);
  let t = be(e, "mode", 3, "dos"), r = be(e, "prompt", 3, "C:\\>"), s = be(e, "bootMessage", 19, () => [
    "Microsoft(R) Windows 98",
    "   (C)Copyright Microsoft Corp 1981-1999.",
    ""
  ]), a = be(e, "enableCommandHistory", 3, !0), o = be(e, "maxHistorySize", 3, 100), c = be(e, "stream", 3, void 0), u = be(e, "enableInput", 3, !1), v = be(e, "onInput", 3, void 0), p = be(e, "maxLines", 3, 1e4), _ = be(e, "cursorBlinkRate", 3, 530), g = be(e, "autoScroll", 3, !0), y = be(e, "commands", 19, () => ({})), I = be(e, "onCommand", 3, void 0), E = be(e, "onReady", 3, void 0), L = be(e, "onClear", 3, void 0), T = be(e, "api", 3, void 0), C = /* @__PURE__ */ j(Be([])), z = /* @__PURE__ */ j(""), k = /* @__PURE__ */ j(Be([])), w = /* @__PURE__ */ j(-1), A = /* @__PURE__ */ j(!0), x = /* @__PURE__ */ j(null), N = null, te;
  const J = /* @__PURE__ */ ze(() => t() === "dos");
  T() && T()(re()), E() && E()();
  const H = {
    echo: {
      execute: (D) => ({
        output: D.length > 0 ? [D.join(" ")] : [""],
        exitCode: 0
      }),
      help: "Displays messages",
      syntax: "echo [message]"
    }
  }, O = /* @__PURE__ */ ze(() => ({ ...H, ...y() }));
  wt(async () => {
    t() === "dos" && i(C).push(...s(), r()), B(), c() && Y(c()), await Promise.resolve(), i(x) && i(x).addEventListener("keydown", W);
  }), Yr(() => {
    F(), N && N.releaseLock(), i(x) && i(x).removeEventListener("keydown", W);
  });
  function B() {
    te = window.setInterval(
      () => {
        f(A, !i(A));
      },
      _()
    );
  }
  function F() {
    te && window.clearInterval(te);
  }
  st(() => {
    g() && i(x) && i(C).length > 0 && setTimeout(
      () => {
        i(x) && (i(x).scrollTop = i(x).scrollHeight);
      },
      0
    );
  });
  function P(D) {
    const Q = D.split(/\r?\n/);
    i(C).push(...Q), i(C).length > p() && f(C, i(C).slice(-p()), !0);
  }
  function U(D) {
    i(C).push(D), i(C).length > p() && f(C, i(C).slice(-p()), !0);
  }
  async function ee(D) {
    const Q = D.trim();
    if (!Q)
      return { output: [], exitCode: 0 };
    const R = Q.split(/\s+/), ne = R[0].toLowerCase(), ge = R.slice(1);
    if (I())
      return I()(ne, ge);
    const de = i(O)[ne];
    if (de)
      try {
        return de.execute(ge, { terminal: re() });
      } catch (pe) {
        return {
          output: [`Error executing command: ${pe}`],
          exitCode: 1,
          error: String(pe)
        };
      }
    return {
      output: [
        `'${ne}' is not recognized as an internal or external`,
        "command, operable program or batch file."
      ],
      exitCode: 1,
      error: "Command not found"
    };
  }
  function W(D) {
    if (!i(J)) {
      u() && v() && se(D);
      return;
    }
    D.key === "Enter" ? (D.preventDefault(), S()) : D.key === "Backspace" ? (D.preventDefault(), i(z).length > 0 && f(z, i(z).slice(0, -1), !0)) : D.key === "ArrowUp" ? (D.preventDefault(), M(-1)) : D.key === "ArrowDown" ? (D.preventDefault(), M(1)) : D.ctrlKey && D.key === "c" ? (D.preventDefault(), f(z, ""), U(""), U(r())) : D.ctrlKey && D.key === "l" ? (D.preventDefault(), V()) : D.key.length === 1 && !D.ctrlKey && !D.altKey && !D.metaKey && (D.preventDefault(), f(z, i(z) + D.key));
  }
  function se(D) {
    if (!v()) return;
    let Q = "";
    if (D.ctrlKey && D.key.length === 1) {
      const R = D.key.toLowerCase();
      R >= "a" && R <= "z" && (Q = String.fromCharCode(R.charCodeAt(0) - 96));
    } else if (D.key.length === 1)
      Q = D.key;
    else
      switch (D.key) {
        case "Enter":
          Q = "\r";
          break;
        case "Backspace":
          Q = "";
          break;
        case "Tab":
          Q = "	";
          break;
        case "Escape":
          Q = "\x1B";
          break;
        case "ArrowUp":
          Q = "\x1B[A";
          break;
        case "ArrowDown":
          Q = "\x1B[B";
          break;
        case "ArrowRight":
          Q = "\x1B[C";
          break;
        case "ArrowLeft":
          Q = "\x1B[D";
          break;
      }
    Q && v()(Q);
  }
  async function S() {
    const D = i(z);
    if (U(r() + D), a() && D.trim() && (i(k).push(D), i(k).length > o())) {
      const Q = i(k).length - o();
      i(k).splice(0, Q);
    }
    if (f(w, -1), f(z, ""), D.trim())
      try {
        (await ee(D)).output.forEach((R) => U(R));
      } catch (Q) {
        U(`Error: ${Q}`);
      }
    U(""), U(r());
  }
  function M(D) {
    if (i(k).length === 0) return;
    const Q = i(
      w
      // Invert direction to match history index
    ) - D;
    Q < -1 ? (f(w, -1), f(z, "")) : Q >= i(k).length ? (f(w, i(k).length - 1), f(z, i(
      k
      // Oldest command
    )[0], !0)) : Q === -1 ? (f(w, -1), f(z, "")) : (f(w, Q), f(z, i(k)[i(k).length - 1 - i(w)], !0));
  }
  function V() {
    f(C, [r()], !0), L() && L()();
  }
  function $() {
    f(C, [], !0), f(z, ""), f(k, [], !0), f(w, -1), t() === "dos" && i(C).push(...s(), r());
  }
  async function Y(D) {
    N = D.getReader();
    try {
      for (; ; ) {
        const { done: Q, value: R } = await N.read();
        if (Q) break;
        P(R);
      }
    } catch (Q) {
      console.error("Stream error:", Q);
    } finally {
      N.releaseLock(), N = null;
    }
  }
  function oe() {
    N && (N.releaseLock(), N = null);
  }
  function ie() {
    i(x) && i(x).focus();
  }
  function re() {
    return {
      write: (D) => P(D),
      writeLine: (D) => U(D),
      writeError: (D) => U(D),
      writeLines: (D) => D.forEach((Q) => U(Q)),
      sendInput: (D) => {
        v() && v()(D);
      },
      sendKeys: (D) => {
        v() && v()(D);
      },
      clear: V,
      reset: $,
      focus: ie,
      attachStream: Y,
      detachStream: oe,
      getOutput: () => i(C),
      getHistory: () => [...i(k)],
      getMode: () => t(),
      executeCommand: ee,
      navigateHistory: M,
      getCurrentInput: () => i(
        z
        // Force string copy to avoid closure issues
      ) + ""
    };
  }
  var ae = Ed(), fe = d(ae), me = d(fe), ve = d(me);
  Le(ve, 17, () => i(C), je, (D, Q, R) => {
    var ne = xd();
    Se(ne, "data-testid", `terminal-line-${R}`);
    var ge = d(ne, !0);
    l(ne), Z(() => q(ge, i(Q))), m(D, ne);
  });
  var X = h(ve, 2);
  {
    var le = (D) => {
      var Q = Sd(), R = d(Q), ne = d(R, !0);
      l(R);
      var ge = h(R, 2), de = d(ge, !0);
      l(ge);
      var pe = h(ge, 2);
      let he;
      l(Q), Z(
        (ke) => {
          q(ne, r()), q(de, i(z)), he = qt(pe, "", he, ke);
        },
        [() => ({ opacity: i(A) ? 1 : 0 })]
      ), m(D, Q);
    }, we = (D) => {
      var Q = Td();
      let R;
      Z((ne) => R = qt(Q, "", R, ne), [() => ({ opacity: i(A) ? 1 : 0 })]), m(D, Q);
    };
    K(X, (D) => {
      i(J) ? D(le) : D(we, !1);
    });
  }
  l(me), l(fe), Tt(fe, (D) => f(x, D), () => i(x)), l(ae), m(n, ae), Oe();
}
var zd = /* @__PURE__ */ b('<div class="builtin-terminal"><!></div>');
function Md(n, e) {
  var t = zd(), r = d(t);
  Cd(r, {
    mode: "dos",
    prompt: "C:\\\\>",
    bootMessage: [
      "Microsoft(R) Windows 98",
      "   (C)Copyright Microsoft Corp 1981-1999.",
      "",
      "Simple Terminal - Command Line Interface"
    ],
    enableCommandHistory: !0,
    maxHistorySize: 100,
    maxLines: 1e3,
    cursorBlinkRate: 530,
    autoScroll: !0,
    get api() {
      return e.api;
    }
  }), l(t), m(n, t);
}
const Id = [
  {
    id: "builtin-settings",
    name: "Settings",
    version: "1.0.0",
    component: mc,
    defaultTitle: "Settings",
    defaultIcon: "icon-system-settings",
    defaultSize: {
      width: 500,
      height: 450
    },
    isResizable: !0
  },
  {
    id: "builtin-control-panel",
    name: "Control Panel",
    version: "1.0.0",
    component: _c,
    defaultTitle: "Control Panel",
    defaultIcon: "icon-system-control-panel",
    defaultSize: {
      width: 550,
      height: 500
    },
    isResizable: !0
  },
  {
    id: "builtin-ssh",
    name: "SSH Terminal",
    version: "1.0.0",
    component: Mc,
    defaultTitle: "SSH Terminal",
    defaultIcon: "icon-apps-accessories-notepad",
    defaultSize: {
      width: 600,
      height: 450
    },
    isResizable: !0
  },
  {
    id: "builtin-browser",
    name: "Internet Explorer",
    version: "1.0.0",
    component: ld,
    defaultTitle: "Abu Internet Browser",
    defaultIcon: "icon-apps-internet-internet-explorer",
    defaultSize: {
      width: 800,
      height: 600
    },
    isResizable: !0
  },
  {
    id: "builtin-msdos",
    name: "MS-DOS Prompt",
    version: "1.0.0",
    component: kd,
    defaultTitle: "MS-DOS Prompt",
    defaultIcon: "icon-ui-misc-ms-dos",
    defaultSize: {
      width: 680,
      height: 500
    },
    isResizable: !0
  },
  {
    id: "builtin-terminal",
    name: "Terminal",
    version: "1.0.0",
    component: Md,
    defaultTitle: "Terminal",
    defaultIcon: "icon-ui-misc-ms-dos",
    defaultSize: {
      width: 640,
      height: 480
    },
    isResizable: !0
  }
];
class Np {
  constructor() {
    this.bootTimestamp = Date.now();
  }
  async getSystemInfo() {
    await this.delay(50, 100);
    const e = Math.floor((Date.now() - this.bootTimestamp) / 1e3), t = Math.floor(Math.random() * 1e3) + 500;
    return {
      osName: "Abu OS 98",
      version: "1.0.0",
      uptime: e,
      totalMemory: 2048,
      usedMemory: t
    };
  }
  async executeCommand(e) {
    const t = Date.now();
    await this.delay(100, 300);
    const r = Date.now() - t, s = e.trim();
    if (s.startsWith("ping ") || s === "ping") {
      const a = s.startsWith("ping ") ? s.substring(5).trim() : "";
      return this.handlePing(a, r);
    }
    return s === "dir" ? {
      exitCode: 0,
      stdout: `Volume in drive C has no label.
 Directory of C:\\

10/14/2025  06:00 PM    <DIR>          Windows
10/14/2025  06:00 PM    <DIR>          Program Files
10/14/2025  06:00 PM    <DIR>          Users
               0 File(s)              0 bytes
               3 Dir(s)  12,345,678,912 bytes free`,
      stderr: "",
      executionTime: r
    } : s === "ipconfig" ? {
      exitCode: 0,
      stdout: `Windows IP Configuration

Ethernet adapter Local Area Connection:

   Connection-specific DNS Suffix  . : 
   IPv4 Address. . . . . . . . . . . : 192.168.1.100
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.1.1`,
      stderr: "",
      executionTime: r
    } : {
      exitCode: 127,
      stdout: "",
      stderr: `'${s}' is not recognized as an internal or external command,
operable program or batch file.`,
      executionTime: r
    };
  }
  handlePing(e, t) {
    return e.length > 0 && (e.includes(".") || e === "localhost") && !e.includes(" ") ? {
      exitCode: 0,
      stdout: `Reply from ${e}: bytes=32 time=15ms TTL=64`,
      stderr: "",
      executionTime: t
    } : {
      exitCode: 1,
      stdout: "",
      stderr: `Ping request could not find host ${e}. Please check the name and try again.`,
      executionTime: t
    };
  }
  delay(e, t) {
    const r = Math.floor(Math.random() * (t - e + 1)) + e;
    return new Promise((s) => setTimeout(s, r));
  }
}
class jp {
  constructor(e, t) {
    this.baseUrl = e, this.authToken = t;
  }
  async getSystemInfo() {
    throw this.baseUrl, this.authToken, new Error("HTTPKernel not yet implemented - use MockKernel for now");
  }
  async executeCommand(e) {
    throw new Error("HTTPKernel not yet implemented - use MockKernel for now");
  }
  // Future implementation will include:
  // - private async fetch() with retry logic
  // - private handleError() for HTTP status codes
  // - private validateResponse() for schema validation
  // - private exponentialBackoff() for retries
}
function Ad(n) {
  n.target.closest(".desktop-icon") || Qe.clearSelection();
}
var Dd = (
  // Clear any pending single-click action
  // Delay selection to allow double-click to interrupt
  // Cancel pending single-click selection
  // Activate immediately
  (n, e, t) => e(n, i(t).id)
), Ld = (n, e, t) => e(n, i(t).id), Rd = (n, e, t) => e(n, i(t).id), Bd = /* @__PURE__ */ b('<div role="button" tabindex="0"><div></div> <div class="desktop-icon-label svelte-6ypzjp"> </div></div>'), Fd = /* @__PURE__ */ b('<div class="desktop win98-desktop svelte-6ypzjp"></div>');
function Od(n, e) {
  Fe(e, !0);
  const t = Fl, r = Ol, s = 8;
  let a = /* @__PURE__ */ j(null), o = /* @__PURE__ */ j(Be({ x: 0, y: 0 })), c = null;
  function u(E) {
    const L = window.innerHeight - Al, T = Math.floor((L - 2 * s) / (t + r)), C = Math.floor(E / T), z = E % T;
    return {
      x: s + C * (t + r),
      y: s + z * (t + r)
    };
  }
  function v(E, L) {
    E.stopPropagation(), c && (clearTimeout(c), c = null), c = window.setTimeout(
      () => {
        Qe.selectItem(L), c = null;
      },
      200
    );
  }
  function p(E, L) {
    E.stopPropagation(), c && (clearTimeout(c), c = null), Qe.activate(L);
  }
  function _(E, L) {
    const C = E.currentTarget.getBoundingClientRect();
    f(a, L, !0), f(o, { x: E.clientX - C.left, y: E.clientY - C.top }, !0), Qe.selectItem(L), E.preventDefault();
  }
  function g(E) {
    if (i(a)) {
      const L = E.clientX - i(o).x, T = E.clientY - i(o).y;
      Qe.moveItem(i(a), { x: L, y: T });
    }
  }
  function y() {
    f(a, null);
  }
  st(() => {
    if (i(a))
      return window.addEventListener("mousemove", g), window.addEventListener("mouseup", y), () => {
        window.removeEventListener("mousemove", g), window.removeEventListener("mouseup", y);
      };
  });
  var I = Fd();
  I.__click = [Ad], Le(I, 21, () => Qe.sortedItems, je, (E, L, T) => {
    const C = /* @__PURE__ */ ze(() => i(L).position || (Qe.gridEnabled, u(T)));
    var z = Bd();
    let k;
    z.__click = [Dd, v, L], z.__dblclick = [Ld, p, L], z.__mousedown = [Rd, _, L];
    var w = d(z), A = h(w, 2), x = d(A, !0);
    l(A), l(z), Z(
      (N) => {
        k = xe(z, 1, "desktop-icon svelte-6ypzjp", null, k, N), Se(z, "data-item-id", i(L).id), qt(z, `left: ${i(C).x ?? ""}px; top: ${i(C).y ?? ""}px;`), Se(z, "aria-label", i(L).label), xe(w, 1, `desktop-icon-image ${i(L).iconClass ?? ""}`, "svelte-6ypzjp"), q(x, i(L).label);
      },
      [
        () => ({ selected: i(L).id === Qe.selectedItemId })
      ]
    ), m(E, z);
  }), l(I), m(n, I), Oe();
}
tt(["click", "dblclick", "mousedown"]);
var Hd = (n, e) => e(n), Pd = (n, e, t) => e(i(t).id), Nd = /* @__PURE__ */ b('<button type="button"><i></i> <span class="window-title svelte-1u9l71b"> </span></button>'), jd = (n, e) => e(n), qd = (n, e) => e(n), Wd = /* @__PURE__ */ b('<div class="taskbar svelte-1u9l71b"><button type="button"><i class="icon icon-ui-misc-start size-16"></i> <span class="start-text">Start</span></button> <div class="taskbar-windows svelte-1u9l71b"></div> <div class="taskbar-tray svelte-1u9l71b"><button type="button" class="tray-button svelte-1u9l71b"><i></i></button> <button type="button" class="tray-button svelte-1u9l71b"><i class="icon icon-hardware-devices-display-properties size-16"></i></button> <div class="taskbar-clock svelte-1u9l71b"> </div></div></div>');
function Ud(n, e) {
  Fe(e, !0);
  let t = /* @__PURE__ */ j(Be(/* @__PURE__ */ new Date())), r = be(e, "isStartMenuOpen", 3, !1);
  function s(z) {
    z.stopPropagation(), e.onStartMenuToggle?.(!r());
  }
  function a(z) {
    const k = Ie.all.find((w) => w.id === z);
    k && (k.isFocused && !k.isMinimized ? Ie.minimize(z) : (k.isMinimized && Ie.restore(z), Ie.focus(z)));
  }
  function o(z) {
    z.stopPropagation(), Gt.toggleMute();
  }
  function c(z) {
    z.stopPropagation(), Ht.toggle();
  }
  st(() => {
    const z = setInterval(
      () => {
        f(t, /* @__PURE__ */ new Date(), !0);
      },
      1e3
    );
    return () => clearInterval(z);
  });
  const u = /* @__PURE__ */ ze(() => () => i(t).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: !0 }));
  var v = Wd(), p = d(v);
  let _;
  p.__click = [Hd, s];
  var g = h(p, 2);
  Le(g, 21, () => Ie.all.filter((z) => !z.isMinimized), je, (z, k) => {
    var w = Nd();
    let A;
    w.__click = [Pd, a, k];
    var x = d(w), N = h(x, 2), te = d(N, !0);
    l(N), l(w), Z(
      (J) => {
        A = xe(w, 1, "taskbar-window-button svelte-1u9l71b", null, A, J), Se(w, "title", i(k).title), xe(x, 1, `icon ${i(k).iconClass ?? ""} size-16`, "svelte-1u9l71b"), q(te, i(k).title);
      },
      [() => ({ active: i(k).isFocused })]
    ), m(z, w);
  }), l(g);
  var y = h(g, 2), I = d(y);
  I.__click = [jd, o];
  var E = d(I);
  xe(E, 1, "icon icon-control-audio size-16"), l(I);
  var L = h(I, 2);
  L.__click = [qd, c];
  var T = h(L, 2), C = d(T, !0);
  l(T), l(y), l(v), Z(
    (z, k) => {
      _ = xe(p, 1, "taskbar-start-button svelte-1u9l71b", null, _, z), Se(I, "title", Gt.muted ? "Unmute" : "Mute"), Se(L, "title", Ht.isDark ? "Switch to Light Theme" : "Switch to Dark Theme"), q(C, k);
    },
    [
      () => ({ pressed: r() }),
      () => i(u)()
    ]
  ), m(n, v), Oe();
}
tt(["click"]);
var Kd = /* @__PURE__ */ b('<div class="start-menu-divider svelte-1o2xm1i"></div>'), Gd = (n, e, t) => e(i(t)), Vd = /* @__PURE__ */ b("<i></i>"), Yd = /* @__PURE__ */ b('<span class="start-menu-icon svelte-1o2xm1i"></span>'), Xd = /* @__PURE__ */ b('<span class="submenu-arrow svelte-1o2xm1i">►</span>'), Jd = (n, e) => i(e).action?.(), Zd = /* @__PURE__ */ b("<i></i>"), Qd = /* @__PURE__ */ b('<span class="start-menu-icon svelte-1o2xm1i"></span>'), $d = /* @__PURE__ */ b('<button type="button" class="start-menu-item submenu-item svelte-1o2xm1i"><!> <span class="start-menu-label svelte-1o2xm1i"> </span></button>'), eu = /* @__PURE__ */ b('<div class="start-menu-empty svelte-1o2xm1i">No programs available</div>'), tu = /* @__PURE__ */ b('<div class="start-menu-submenu svelte-1o2xm1i"><!> <!></div>'), nu = /* @__PURE__ */ b('<div class="start-menu-item-container svelte-1o2xm1i"><button type="button"><!> <span class="start-menu-label svelte-1o2xm1i"> </span> <!></button> <!></div>'), ru = /* @__PURE__ */ b('<div class="start-menu svelte-1o2xm1i"><div class="start-menu-sidebar svelte-1o2xm1i"><div class="start-menu-title svelte-1o2xm1i">Abu OS 98</div></div> <div class="start-menu-content svelte-1o2xm1i"></div></div> <div class="start-menu-backdrop svelte-1o2xm1i"></div>', 1);
function iu(n, e) {
  Fe(e, !0);
  let t = be(e, "show", 3, !1);
  const r = /* @__PURE__ */ ze(() => Tn.getAllPlugins()), s = /* @__PURE__ */ ze(() => i(r).map((E) => ({
    id: `program-${E.id}`,
    label: E.name,
    iconClass: E.defaultIcon,
    action: () => {
      Ie.open(E.id), e.onClose();
    }
  }))), a = [
    {
      id: "control-panel",
      label: "Control Panel",
      iconClass: "icon-system-control-panel",
      action: () => {
        Ie.open("builtin-control-panel"), e.onClose();
      }
    },
    {
      id: "printers",
      label: "Printers",
      iconClass: "icon-hardware-printers-printers",
      disabled: !0,
      action: () => {
        $e.alert("Coming soon", "Printers"), e.onClose();
      }
    },
    {
      id: "taskbar",
      label: "Taskbar & Start Menu",
      iconClass: "icon-ui-misc-taskbar",
      disabled: !0,
      action: () => {
        $e.alert("Coming soon", "Taskbar Settings"), e.onClose();
      }
    },
    {
      id: "folder-options",
      label: "Folder Options...",
      iconClass: "icon-system-directory-folder-options",
      disabled: !0,
      action: () => {
        $e.alert("Coming soon", "Folder Options"), e.onClose();
      }
    },
    {
      id: "active-desktop",
      label: "Active Desktop",
      iconClass: "icon-system-desktop",
      disabled: !0,
      action: () => {
        $e.alert("Coming soon", "Active Desktop"), e.onClose();
      }
    },
    {
      id: "windows-update",
      label: "Windows Update",
      iconClass: "icon-ui-misc-windows-update",
      disabled: !0,
      action: () => {
        $e.alert("Coming soon", "Windows Update"), e.onClose();
      }
    }
  ], o = [
    {
      id: "find-files",
      label: "Files or Folders...",
      iconClass: "icon-ui-misc-find",
      disabled: !0,
      action: () => {
        $e.alert("Coming soon", "Find Files"), e.onClose();
      }
    },
    {
      id: "find-computer",
      label: "Computer...",
      iconClass: "icon-system-network",
      disabled: !0,
      action: () => {
        $e.alert("Coming soon", "Find Computer"), e.onClose();
      }
    },
    {
      id: "find-internet",
      label: "On the Internet...",
      iconClass: "icon-apps-internet-internet-explorer",
      disabled: !0,
      action: () => {
        $e.alert("Coming soon", "Find on Internet"), e.onClose();
      }
    }
  ], c = [
    {
      id: "fav-channels",
      label: "Channels",
      iconClass: "icon-ui-misc-channels",
      disabled: !0,
      action: () => {
        $e.alert("Coming soon", "Channels"), e.onClose();
      }
    },
    {
      id: "fav-links",
      label: "Links",
      iconClass: "icon-ui-toolbar-favorites-folder",
      disabled: !0,
      action: () => {
        $e.alert("Coming soon", "Links"), e.onClose();
      }
    }
  ], u = /* @__PURE__ */ ze(() => [
    {
      id: "windows-update-main",
      label: "Windows Update",
      iconClass: "icon-ui-misc-windows-update",
      disabled: !0,
      action: () => {
        $e.alert("Coming soon", "Windows Update"), e.onClose();
      }
    },
    { id: "divider-0", label: "", divider: !0 },
    {
      id: "programs",
      label: "Programs",
      iconClass: "icon-system-directory-open",
      submenu: i(s)
    },
    {
      id: "favorites",
      label: "Favorites",
      iconClass: "icon-ui-toolbar-favorites-folder",
      submenu: c
    },
    {
      id: "documents",
      label: "Documents",
      iconClass: "icon-system-folder-closed",
      submenu: [],
      disabled: !0
    },
    {
      id: "settings",
      label: "Settings",
      iconClass: "icon-system-settings",
      submenu: a
    },
    {
      id: "find",
      label: "Find",
      iconClass: "icon-ui-misc-find",
      submenu: o
    },
    {
      id: "help",
      label: "Help",
      iconClass: "icon-ui-misc-help",
      disabled: !0,
      action: () => {
        $e.alert("Coming soon", "Help & Support"), e.onClose();
      }
    },
    {
      id: "run",
      label: "Run...",
      iconClass: "icon-ui-misc-run",
      disabled: !0,
      action: () => {
        $e.alert("Coming soon", "Run"), e.onClose();
      }
    },
    { id: "divider-1", label: "", divider: !0 },
    {
      id: "logoff",
      label: "Log Off Abu...",
      iconClass: "icon-files-system-files-log-off",
      disabled: !0,
      action: () => {
        $e.alert("Coming soon", "Log Off"), e.onClose();
      }
    },
    {
      id: "shutdown",
      label: "Shut Down...",
      iconClass: "icon-ui-misc-shutdown",
      action: () => {
        $e.alert("Shutdown functionality not yet implemented", "Shut Down"), e.onClose();
      }
    }
  ]);
  let v = /* @__PURE__ */ j(null);
  st(() => {
    t() || f(v, null);
  });
  function p(E) {
    E.disabled || (E.submenu ? f(v, i(v) === E.id ? null : E.id, !0) : E.action && E.action());
  }
  function _(E) {
    E.submenu && f(v, E.id, !0);
  }
  var g = Re(), y = Ce(g);
  {
    var I = (E) => {
      var L = ru(), T = Ce(L), C = h(d(T), 2);
      Le(C, 21, () => i(u), je, (k, w) => {
        var A = Re(), x = Ce(A);
        {
          var N = (J) => {
            var H = Kd();
            m(J, H);
          }, te = (J) => {
            var H = nu(), O = d(H);
            let B;
            O.__click = [Gd, p, w];
            var F = d(O);
            {
              var P = ($) => {
                var Y = Vd();
                Z(() => xe(Y, 1, `icon ${i(w).iconClass ?? ""} start-menu-icon`, "svelte-1o2xm1i")), m($, Y);
              }, U = ($) => {
                var Y = Yd();
                m($, Y);
              };
              K(F, ($) => {
                i(w).iconClass ? $(P) : $(U, !1);
              });
            }
            var ee = h(F, 2), W = d(ee, !0);
            l(ee);
            var se = h(ee, 2);
            {
              var S = ($) => {
                var Y = Xd();
                m($, Y);
              };
              K(se, ($) => {
                i(w).submenu && $(S);
              });
            }
            l(O);
            var M = h(O, 2);
            {
              var V = ($) => {
                var Y = tu(), oe = d(Y);
                Le(oe, 17, () => i(w).submenu, je, (ae, fe) => {
                  var me = $d();
                  me.__click = [Jd, fe];
                  var ve = d(me);
                  {
                    var X = (Q) => {
                      var R = Zd();
                      Z(() => xe(R, 1, `icon ${i(fe).iconClass ?? ""} start-menu-icon`, "svelte-1o2xm1i")), m(Q, R);
                    }, le = (Q) => {
                      var R = Qd();
                      m(Q, R);
                    };
                    K(ve, (Q) => {
                      i(fe).iconClass ? Q(X) : Q(le, !1);
                    });
                  }
                  var we = h(ve, 2), D = d(we, !0);
                  l(we), l(me), Z(() => q(D, i(fe).label)), m(ae, me);
                });
                var ie = h(oe, 2);
                {
                  var re = (ae) => {
                    var fe = eu();
                    m(ae, fe);
                  };
                  K(ie, (ae) => {
                    i(w).submenu.length === 0 && ae(re);
                  });
                }
                l(Y), m($, Y);
              };
              K(M, ($) => {
                i(w).submenu && i(v) === i(w).id && $(V);
              });
            }
            l(H), Z(
              ($) => {
                B = xe(O, 1, "start-menu-item svelte-1o2xm1i", null, B, $), O.disabled = i(w).disabled, q(W, i(w).label);
              },
              [
                () => ({
                  disabled: i(w).disabled,
                  expanded: i(v) === i(w).id
                })
              ]
            ), G("mouseenter", O, () => _(i(w))), m(J, H);
          };
          K(x, (J) => {
            i(w).divider ? J(N) : J(te, !1);
          });
        }
        m(k, A);
      }), l(C), l(T);
      var z = h(T, 2);
      z.__click = function(...k) {
        e.onClose?.apply(this, k);
      }, m(E, L);
    };
    K(y, (E) => {
      t() && E(I);
    });
  }
  m(n, g), Oe();
}
tt(["click"]);
var su = /* @__PURE__ */ b('<div class="win98-scrollbar-vertical" role="scrollbar" aria-orientation="vertical" aria-controls="scrollbar-content"><button class="win98-scrollbar-button" aria-label="Scroll up" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><polygon points="8,5 12,11 4,11"></polygon></svg></button> <div class="win98-scrollbar-track" role="presentation"><div role="presentation"></div></div> <button class="win98-scrollbar-button" aria-label="Scroll down" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><polygon points="8,11 12,5 4,5"></polygon></svg></button></div>'), au = /* @__PURE__ */ b('<div class="win98-scrollbar-horizontal" role="scrollbar" aria-orientation="horizontal" aria-controls="scrollbar-content"><button class="win98-scrollbar-button" aria-label="Scroll left" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><polygon points="5,8 11,12 11,4"></polygon></svg></button> <div class="win98-scrollbar-track" role="presentation"><div role="presentation"></div></div> <button class="win98-scrollbar-button" aria-label="Scroll right" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><polygon points="11,8 5,12 5,4"></polygon></svg></button></div>'), ou = /* @__PURE__ */ b('<div class="win98-scrollbar-corner"></div>'), lu = /* @__PURE__ */ b('<div class="win98-scrollbar-wrapper"><div class="win98-scrollbar-content" role="region" tabindex="-1"><!></div> <!> <!> <!></div>');
function Ja(n, e) {
  Fe(e, !0);
  let t = be(e, "orientation", 3, "vertical"), r = be(
    e,
    "scrollLineAmount",
    3,
    40
    // pixels to scroll per line (arrow button click)
  ), s = be(
    e,
    "scrollPageAmount",
    3,
    200
    // pixels to scroll per page (track click)
  ), a, o, c = /* @__PURE__ */ j(null), u = /* @__PURE__ */ j(null), v = /* @__PURE__ */ j(!1), p = /* @__PURE__ */ j(!1), _ = /* @__PURE__ */ j(0), g = /* @__PURE__ */ j(0), y = /* @__PURE__ */ j(0), I = /* @__PURE__ */ j(0), E = /* @__PURE__ */ j(!1), L = /* @__PURE__ */ j(!1), T = /* @__PURE__ */ j(0), C = /* @__PURE__ */ j(0), z = /* @__PURE__ */ j(0), k = /* @__PURE__ */ j(0);
  const w = 16, A = 24;
  function x() {
    if (!o) return;
    const {
      scrollHeight: D,
      clientHeight: Q,
      scrollWidth: R,
      clientWidth: ne,
      scrollTop: ge,
      scrollLeft: de
    } = o;
    if ((t() === "vertical" || t() === "both") && (f(v, D > Q), i(v))) {
      const pe = Q - w * 2, he = Q / D;
      f(_, Math.max(pe * he, A), !0);
      const ke = pe - i(_), Me = ge / (D - Q);
      f(g, w + Me * ke);
    }
    if ((t() === "horizontal" || t() === "both") && (f(p, R > ne), i(p))) {
      const pe = ne - w * 2, he = ne / R;
      f(y, Math.max(pe * he, A), !0);
      const ke = pe - i(y), Me = de / (R - ne);
      f(I, w + Me * ke);
    }
  }
  function N() {
    x();
  }
  function te() {
    o && (o.scrollTop -= r());
  }
  function J() {
    o && (o.scrollTop += r());
  }
  function H() {
    o && (o.scrollLeft -= r());
  }
  function O() {
    o && (o.scrollLeft += r());
  }
  function B(D) {
    if (!o || !i(c)) return;
    const Q = D.target;
    if (Q.classList.contains("win98-scrollbar-thumb")) return;
    const R = Q.getBoundingClientRect(), ne = D.clientY - R.top, ge = i(g) - w + i(_) / 2;
    ne < ge ? o.scrollTop -= s() : o.scrollTop += s();
  }
  function F(D) {
    if (!o || !i(u)) return;
    const Q = D.target;
    if (Q.classList.contains("win98-scrollbar-thumb")) return;
    const R = Q.getBoundingClientRect(), ne = D.clientX - R.left, ge = i(I) - w + i(y) / 2;
    ne < ge ? o.scrollLeft -= s() : o.scrollLeft += s();
  }
  function P(D) {
    o && (D.preventDefault(), f(E, !0), f(T, D.clientY, !0), f(z, o.scrollTop, !0), document.addEventListener("mousemove", ee), document.addEventListener("mouseup", W));
  }
  function U(D) {
    o && (D.preventDefault(), f(L, !0), f(C, D.clientX, !0), f(k, o.scrollLeft, !0), document.addEventListener("mousemove", ee), document.addEventListener("mouseup", W));
  }
  function ee(D) {
    if (o) {
      if (i(E)) {
        const Q = D.clientY - i(T), { scrollHeight: R, clientHeight: ne } = o, de = ne - w * 2 - i(_), he = Q / de * (R - ne);
        o.scrollTop = i(z) + he;
      }
      if (i(L)) {
        const Q = D.clientX - i(C), { scrollWidth: R, clientWidth: ne } = o, de = ne - w * 2 - i(y), he = Q / de * (R - ne);
        o.scrollLeft = i(k) + he;
      }
    }
  }
  function W() {
    f(E, !1), f(L, !1), document.removeEventListener("mousemove", ee), document.removeEventListener("mouseup", W);
  }
  function se(D) {
    x();
  }
  let S;
  wt(() => {
    x(), S = new ResizeObserver(() => {
      x();
    }), o && (S.observe(o), Array.from(o.children).forEach((D) => {
      S.observe(D);
    }));
  }), Yr(() => {
    S && S.disconnect(), document.removeEventListener("mousemove", ee), document.removeEventListener("mouseup", W);
  });
  function M(D, Q) {
    o && o.scrollTo(D, Q);
  }
  function V() {
    o && (o.scrollTop = 0);
  }
  function $() {
    o && (o.scrollTop = o.scrollHeight);
  }
  function Y() {
    return o ? {
      scrollTop: o.scrollTop,
      scrollLeft: o.scrollLeft,
      scrollHeight: o.scrollHeight,
      scrollWidth: o.scrollWidth,
      clientHeight: o.clientHeight,
      clientWidth: o.clientWidth
    } : null;
  }
  var oe = { scrollTo: M, scrollToTop: V, scrollToBottom: $, getScrollPosition: Y }, ie = lu(), re = d(ie), ae = d(re);
  fl(ae, () => e.children ?? un), l(re), Tt(re, (D) => o = D, () => o);
  var fe = h(re, 2);
  {
    var me = (D) => {
      var Q = su(), R = d(Q);
      R.__click = te;
      var ne = h(R, 2);
      ne.__click = B;
      var ge = d(ne);
      let de;
      ge.__mousedown = P, Tt(ge, (he) => f(c, he), () => i(c)), l(ne);
      var pe = h(ne, 2);
      pe.__click = J, l(Q), Z(
        (he) => {
          Se(Q, "aria-valuenow", o?.scrollTop || 0), de = xe(ge, 1, "win98-scrollbar-thumb", null, de, he), qt(ge, `height: ${i(_) ?? ""}px; top: ${i(g) - w}px;`);
        },
        [() => ({ dragging: i(E) })]
      ), m(D, Q);
    };
    K(fe, (D) => {
      i(v) && D(me);
    });
  }
  var ve = h(fe, 2);
  {
    var X = (D) => {
      var Q = au(), R = d(Q);
      R.__click = H;
      var ne = h(R, 2);
      ne.__click = F;
      var ge = d(ne);
      let de;
      ge.__mousedown = U, Tt(ge, (he) => f(u, he), () => i(u)), l(ne);
      var pe = h(ne, 2);
      pe.__click = O, l(Q), Z(
        (he) => {
          Se(Q, "aria-valuenow", o?.scrollLeft || 0), de = xe(ge, 1, "win98-scrollbar-thumb", null, de, he), qt(ge, `width: ${i(y) ?? ""}px; left: ${i(I) - w}px;`);
        },
        [() => ({ dragging: i(L) })]
      ), m(D, Q);
    };
    K(ve, (D) => {
      i(p) && D(X);
    });
  }
  var le = h(ve, 2);
  {
    var we = (D) => {
      var Q = ou();
      m(D, Q);
    };
    K(le, (D) => {
      i(v) && i(p) && D(we);
    });
  }
  return l(ie), Tt(ie, (D) => a = D, () => a), G("scroll", re, N), G("wheel", re, se), m(n, ie), Oe(oe);
}
tt(["click", "mousedown"]);
function cu(n, e, t, r, s, a) {
  n.target.closest(".window-controls") || e.window.isMaximized || (f(t, !0), f(r, n.clientX, !0), f(s, n.clientY, !0), f(a, { ...e.window.position }, !0), Ie.focus(e.window.id), n.preventDefault());
}
function du(n, e) {
  Ie.minimize(e.window.id);
}
function uu(n, e) {
  e.window.isMaximized ? Ie.restore(e.window.id) : Ie.maximize(e.window.id);
}
function vu(n, e) {
  Ie.close(e.window.id);
}
function fu(n, e) {
  e.window.isFocused || Ie.focus(e.window.id);
}
var hu = /* @__PURE__ */ b("<div></div>"), pu = /* @__PURE__ */ b('<div class="window-error svelte-6vpc9m"> </div>'), mu = (
  // Global event listeners for drag and resize
  (n, e) => e(n, "n")
), gu = (n, e) => e(n, "s"), bu = (n, e) => e(n, "e"), wu = (n, e) => e(n, "w"), _u = (n, e) => e(n, "ne"), yu = (n, e) => e(n, "nw"), ku = (n, e) => e(n, "se"), xu = (n, e) => e(n, "sw"), Su = /* @__PURE__ */ b('<div class="resize-handle n svelte-6vpc9m"></div> <div class="resize-handle s svelte-6vpc9m"></div> <div class="resize-handle e svelte-6vpc9m"></div> <div class="resize-handle w svelte-6vpc9m"></div> <div class="resize-handle ne svelte-6vpc9m"></div> <div class="resize-handle nw svelte-6vpc9m"></div> <div class="resize-handle se svelte-6vpc9m"></div> <div class="resize-handle sw svelte-6vpc9m"></div>', 1), Tu = /* @__PURE__ */ b('<div role="dialog"><div class="window-titlebar win98-titlebar svelte-6vpc9m"><div class="window-title svelte-6vpc9m"><i></i> <span class="window-title-text"> </span></div> <div class="window-controls svelte-6vpc9m"><button type="button" class="window-control minimize svelte-6vpc9m" aria-label="Minimize"><span class="control-symbol svelte-6vpc9m">−</span></button> <button type="button" class="window-control maximize svelte-6vpc9m"><span class="control-symbol svelte-6vpc9m"> </span></button> <button type="button" class="window-control close svelte-6vpc9m" aria-label="Close"><span class="control-symbol svelte-6vpc9m">×</span></button></div></div> <div class="window-content-wrapper win98-window-content svelte-6vpc9m"><!></div> <!></div>');
function Eu(n, e) {
  Fe(e, !0);
  let t = /* @__PURE__ */ j(!1), r = /* @__PURE__ */ j(!1), s = /* @__PURE__ */ j(0), a = /* @__PURE__ */ j(0), o = /* @__PURE__ */ j(Be({ x: 0, y: 0 })), c = /* @__PURE__ */ j(null), u = /* @__PURE__ */ j(Be({ width: 0, height: 0 })), v = /* @__PURE__ */ j(Be({ x: 0, y: 0 })), p = null, _ = null;
  const g = /* @__PURE__ */ ze(() => Tn.get(e.window.pluginId)), y = /* @__PURE__ */ ze(() => i(g) && typeof i(g).component == "function" && !i(g).component.prototype?.$$render);
  wt(() => (i(y) && i(g) && p && (_ = i(g).component(p, e.window.id, () => Ie.close(e.window.id))), () => {
    _ && (typeof _.destroy == "function" ? _.destroy() : typeof _ == "function" && _());
  }));
  const I = /* @__PURE__ */ ze(() => () => e.window.isMinimized ? "display: none;" : `
			position: absolute;
			left: ${e.window.position.x}px;
			top: ${e.window.position.y}px;
			width: ${e.window.size.width}px;
			height: ${e.window.size.height}px;
			z-index: ${e.window.zIndex};
		`);
  function E(S) {
    if (i(t)) {
      const M = S.clientX - i(s), V = S.clientY - i(a), $ = i(o).x + M, Y = Math.max(0, i(o).y + V);
      Ie.move(e.window.id, { x: $, y: Y });
    } else i(r) && i(c) && C(S);
  }
  function L() {
    f(t, !1), f(r, !1), f(c, null);
  }
  function T(S, M) {
    !e.window.isResizable || e.window.isMaximized || (f(r, !0), f(c, M, !0), f(s, S.clientX, !0), f(a, S.clientY, !0), f(u, { ...e.window.size }, !0), f(v, { ...e.window.position }, !0), Ie.focus(e.window.id), S.preventDefault(), S.stopPropagation());
  }
  function C(S) {
    if (!i(c)) return;
    const M = S.clientX - i(s), V = S.clientY - i(a);
    let $ = i(u).width, Y = i(u).height, oe = i(v).x, ie = i(v).y;
    if (i(c).includes("e"))
      $ = Math.max(yr, i(u).width + M);
    else if (i(c).includes("w")) {
      const re = i(u).width - yr, ae = Math.min(M, re);
      $ = i(u).width - ae, oe = i(v).x + ae;
    }
    if (i(c).includes("s"))
      Y = Math.max(kr, i(u).height + V);
    else if (i(c).includes("n")) {
      const re = i(u).height - kr, ae = Math.min(V, re);
      Y = i(u).height - ae, ie = i(v).y + ae;
    }
    Ie.resize(e.window.id, { width: $, height: Y }, { x: oe, y: ie });
  }
  st(() => {
    if (i(t) || i(r))
      return window.addEventListener("mousemove", E), window.addEventListener("mouseup", L), () => {
        window.removeEventListener("mousemove", E), window.removeEventListener("mouseup", L);
      };
  });
  var z = Tu();
  let k;
  z.__click = [fu, e];
  var w = d(z);
  w.__mousedown = [
    cu,
    e,
    t,
    s,
    a,
    o
  ];
  var A = d(w), x = d(A), N = h(x, 2), te = d(N, !0);
  l(N), l(A);
  var J = h(A, 2), H = d(J);
  H.__click = [du, e];
  var O = h(H, 2);
  O.__click = [uu, e];
  var B = d(O), F = d(B, !0);
  l(B), l(O);
  var P = h(O, 2);
  P.__click = [vu, e], l(J), l(w);
  var U = h(w, 2), ee = d(U);
  Ja(ee, {
    orientation: "both",
    children: (S, M) => {
      var V = Re(), $ = Ce(V);
      {
        var Y = (ie) => {
          var re = Re(), ae = Ce(re);
          {
            var fe = (ve) => {
              var X = hu();
              Tt(X, (le) => p = le, () => p), m(ve, X);
            }, me = (ve) => {
              var X = Re(), le = Ce(X);
              hl(le, () => i(g).component, (we, D) => {
                D(we, {});
              }), m(ve, X);
            };
            K(ae, (ve) => {
              i(y) ? ve(fe) : ve(me, !1);
            });
          }
          m(ie, re);
        }, oe = (ie) => {
          var re = pu(), ae = d(re);
          l(re), Z(() => q(ae, `Plugin not found: ${e.window.pluginId ?? ""}`)), m(ie, re);
        };
        K($, (ie) => {
          i(g) ? ie(Y) : ie(oe, !1);
        });
      }
      m(S, V);
    },
    $$slots: { default: !0 }
  }), l(U);
  var W = h(U, 2);
  {
    var se = (S) => {
      var M = Su(), V = Ce(M);
      V.__mousedown = [mu, T];
      var $ = h(V, 2);
      $.__mousedown = [gu, T];
      var Y = h($, 2);
      Y.__mousedown = [bu, T];
      var oe = h(Y, 2);
      oe.__mousedown = [wu, T];
      var ie = h(oe, 2);
      ie.__mousedown = [_u, T];
      var re = h(ie, 2);
      re.__mousedown = [yu, T];
      var ae = h(re, 2);
      ae.__mousedown = [ku, T];
      var fe = h(ae, 2);
      fe.__mousedown = [xu, T], m(S, M);
    };
    K(W, (S) => {
      e.window.isResizable && !e.window.isMaximized && S(se);
    });
  }
  l(z), Z(
    (S, M) => {
      k = xe(z, 1, "window svelte-6vpc9m", null, k, S), qt(z, M), Se(z, "aria-label", e.window.title), xe(x, 1, `icon ${e.window.iconClass ?? ""} size-16`, "svelte-6vpc9m"), q(te, e.window.title), Se(O, "aria-label", e.window.isMaximized ? "Restore" : "Maximize"), q(F, e.window.isMaximized ? "❐" : "□");
    },
    [
      () => ({ focused: e.window.isFocused }),
      () => i(I)()
    ]
  ), m(n, z), Oe();
}
tt(["click", "mousedown"]);
var Cu = (n) => n.stopPropagation(), zu = (n, e, t) => e(i(t)), Mu = /* @__PURE__ */ b('<button type="button" class="messagebox-button svelte-znhvty"> </button>'), Iu = /* @__PURE__ */ b('<div class="messagebox-backdrop svelte-znhvty"><div class="messagebox svelte-znhvty" role="dialog"><div class="messagebox-titlebar svelte-znhvty"><div class="messagebox-title svelte-znhvty"><span class="messagebox-title-text"> </span></div> <button type="button" class="messagebox-close svelte-znhvty" aria-label="Close"><span class="close-icon">×</span></button></div> <div class="messagebox-content svelte-znhvty"><div class="messagebox-icon svelte-znhvty"> </div> <div class="messagebox-message svelte-znhvty"> </div></div> <div class="messagebox-buttons svelte-znhvty"></div></div></div>');
function Au(n, e) {
  Fe(e, !0);
  const t = { error: "⚠️", warning: "⚠️", info: "ℹ️", question: "❓" };
  function r(T) {
    T.action(), e.onclose();
  }
  var s = Iu();
  s.__click = function(...T) {
    e.onclose?.apply(this, T);
  };
  var a = d(s);
  a.__click = [Cu];
  var o = d(a), c = d(o), u = d(c), v = d(u, !0);
  l(u), l(c);
  var p = h(c, 2);
  p.__click = function(...T) {
    e.onclose?.apply(this, T);
  }, l(o);
  var _ = h(o, 2), g = d(_), y = d(g, !0);
  l(g);
  var I = h(g, 2), E = d(I, !0);
  l(I), l(_);
  var L = h(_, 2);
  Le(L, 21, () => e.buttons, je, (T, C) => {
    var z = Mu();
    z.__click = [zu, r, C];
    var k = d(z, !0);
    l(z), Z(() => q(k, i(C).label)), m(T, z);
  }), l(L), l(a), l(s), Z(() => {
    Se(a, "aria-label", e.title), q(v, e.title), q(y, t[e.type]), q(E, e.message);
  }), m(n, s), Oe();
}
tt(["click"]);
function Du(n, e, t, r) {
  !e() && t() === "standard" && r.onclick && r.onclick();
}
var Lu = /* @__PURE__ */ b('<span class="win98-menu-item__label svelte-1xnfubf"> </span>'), Ru = /* @__PURE__ */ b('<img class="win98-menu-item__icon svelte-1xnfubf" alt="" draggable="false"/>'), Bu = /* @__PURE__ */ b('<span class="win98-menu-item__shortcut svelte-1xnfubf"> </span>'), Fu = /* @__PURE__ */ b('<span class="win98-menu-item__arrow svelte-1xnfubf">►</span>'), Ou = /* @__PURE__ */ b('<!> <span class="win98-menu-item__label svelte-1xnfubf"> </span> <!> <!>', 1), Hu = /* @__PURE__ */ b("<div><!></div>");
function Vs(n, e) {
  Fe(e, !0);
  let t = be(e, "label", 3, ""), r = be(e, "hasSubmenu", 3, !1), s = be(e, "disabled", 3, !1), a = be(e, "type", 3, "standard"), o = /* @__PURE__ */ ze(() => () => !s() && a() === "standard"), c = /* @__PURE__ */ ze(() => () => {
    switch (a()) {
      case "separator":
        return "separator";
      case "header":
        return "presentation";
      default:
        return "menuitem";
    }
  });
  var u = Hu();
  let v;
  u.__click = [Du, s, a, e];
  var p = d(u);
  {
    var _ = (y) => {
    }, g = (y) => {
      var I = Re(), E = Ce(I);
      {
        var L = (C) => {
          var z = Lu(), k = d(z, !0);
          l(z), Z(() => q(k, t())), m(C, z);
        }, T = (C) => {
          var z = Ou(), k = Ce(z);
          {
            var w = (O) => {
              var B = Ru();
              Z(() => Se(B, "src", e.icon)), m(O, B);
            };
            K(k, (O) => {
              e.icon && O(w);
            });
          }
          var A = h(k, 2), x = d(A, !0);
          l(A);
          var N = h(A, 2);
          {
            var te = (O) => {
              var B = Bu(), F = d(B, !0);
              l(B), Z(() => q(F, e.shortcut)), m(O, B);
            };
            K(N, (O) => {
              e.shortcut && O(te);
            });
          }
          var J = h(N, 2);
          {
            var H = (O) => {
              var B = Fu();
              m(O, B);
            };
            K(J, (O) => {
              r() && O(H);
            });
          }
          Z(() => q(x, t())), m(C, z);
        };
        K(
          E,
          (C) => {
            a() === "header" ? C(L) : C(T, !1);
          },
          !0
        );
      }
      m(y, I);
    };
    K(p, (y) => {
      a() === "separator" ? y(_) : y(g, !1);
    });
  }
  l(u), Z(
    (y, I, E) => {
      v = xe(u, 1, "win98-menu-item svelte-1xnfubf", null, v, y), Se(u, "role", I), Se(u, "tabindex", E), Se(u, "aria-label", t()), Se(u, "aria-disabled", s());
    },
    [
      () => ({
        "win98-menu-item--separator": a() === "separator",
        "win98-menu-item--header": a() === "header",
        "win98-menu-item--disabled": s()
      }),
      () => i(c)(),
      () => i(o)() ? 0 : void 0
    ]
  ), m(n, u), Oe();
}
tt(["click"]);
var Pu = /* @__PURE__ */ b('<div class="win98-context-menu win98-context-menu--submenu svelte-m4fvsr" role="menu"></div>'), Nu = /* @__PURE__ */ b('<div class="context-menu-item-container svelte-m4fvsr" role="presentation"><!> <!></div>'), ju = /* @__PURE__ */ b('<div class="win98-context-menu svelte-m4fvsr" role="menu" tabindex="0"></div>');
function qu(n, e) {
  Fe(e, !0);
  let t = be(e, "items", 19, () => []), r = be(e, "visible", 3, !1), s = be(e, "x", 3, 0), a = be(e, "y", 3, 0), o = be(e, "label", 3, "Context menu"), c = /* @__PURE__ */ j(-1), u = /* @__PURE__ */ j(-1), v = /* @__PURE__ */ j(null), p = /* @__PURE__ */ j(null);
  const _ = /* @__PURE__ */ ze(() => () => t().map((H, O) => ({ item: H, index: O })).filter(({ item: H }) => H.type !== "separator" && H.type !== "header"));
  function g(H) {
    r() && e.onclose && (H.target.closest(".win98-context-menu") || e.onclose());
  }
  function y(H) {
    if (r())
      switch (H.key) {
        case "Escape":
          H.preventDefault(), e.onclose && e.onclose();
          break;
        case "ArrowDown":
          H.preventDefault(), I();
          break;
        case "ArrowUp":
          H.preventDefault(), E();
          break;
        case "ArrowRight":
          H.preventDefault(), T();
          break;
        case "ArrowLeft":
          H.preventDefault(), C();
          break;
        case "Enter":
          H.preventDefault(), z();
          break;
        default:
          H.key.length === 1 && !H.ctrlKey && !H.altKey && !H.metaKey && (H.preventDefault(), L(H.key.toLowerCase()));
          break;
      }
  }
  function I() {
    const H = i(_)();
    H.length !== 0 && f(c, i(c) < H.length - 1 ? i(c) + 1 : 0, !0);
  }
  function E() {
    const H = i(_)();
    H.length !== 0 && f(c, i(c) > 0 ? i(c) - 1 : H.length - 1, !0);
  }
  function L(H) {
    const B = i(_)().findIndex(({ item: F }) => F.label?.toLowerCase().startsWith(H));
    B !== -1 && f(c, B, !0);
  }
  function T() {
    const H = i(_)();
    if (i(c) >= 0 && i(c) < H.length) {
      const { item: O } = H[i(c)];
      (O.hasSubmenu || O.submenu) && f(u, i(c), !0);
    }
  }
  function C() {
    f(u, -1);
  }
  function z() {
    const H = i(_)();
    if (i(c) >= 0 && i(c) < H.length) {
      const { item: O } = H[i(c)];
      k(O);
    }
  }
  function k(H) {
    H.disabled || H.hasSubmenu || H.submenu || (H.onclick && H.onclick(), e.onclose && e.onclose());
  }
  function w(H) {
    f(u, H, !0);
  }
  function A() {
    setTimeout(
      () => {
        i(u) !== -1 && f(u, -1);
      },
      200
    );
  }
  function x(H, O) {
    const B = O.getBoundingClientRect(), F = H.getBoundingClientRect(), P = window.innerWidth, U = window.innerHeight;
    let ee = B.right - 4, W = B.top;
    ee + F.width > P && (ee = B.left - F.width + 4), W + F.height > U && (W = U - F.height), W < 0 && (W = 0), H.style.left = `${ee}px`, H.style.top = `${W}px`;
  }
  function N(H, O) {
    const B = H.parentElement?.querySelector(".win98-menu-item");
    B && x(H, B);
  }
  st(() => {
    r() || (f(c, -1), f(u, -1));
  }), st(() => (r() ? (document.addEventListener("click", g), document.addEventListener("keydown", y), i(p) && i(p).focus()) : (document.removeEventListener("click", g), document.removeEventListener("keydown", y)), () => {
    document.removeEventListener("click", g), document.removeEventListener("keydown", y);
  }));
  var te = ju();
  let J;
  Le(te, 23, t, (H, O) => `${H.label || "no-label"}-${H.type || "no-type"}-${O}`, (H, O, B) => {
    var F = Nu(), P = d(F);
    Vs(P, Rs(() => i(O), { onclick: () => k(i(O)) }));
    var U = h(P, 2);
    {
      var ee = (W) => {
        var se = Pu();
        Le(se, 21, () => i(O).submenu || [], je, (S, M) => {
          Vs(S, Rs(() => i(M), {
            onclick: () => {
              i(M).onclick && i(M).onclick(), e.onclose && e.onclose();
            }
          }));
        }), l(se), Tt(se, (S) => f(v, S), () => i(v)), pl(se, (S, M) => N?.(S), () => i(O)), Z(() => Se(se, "aria-label", `${i(O).label} submenu`)), m(W, se);
      };
      K(U, (W) => {
        (i(O).hasSubmenu || i(O).submenu) && i(u) === i(B) && W(ee);
      });
    }
    l(F), G("mouseenter", F, () => {
      (i(O).hasSubmenu || i(O).submenu) && w(i(B));
    }), G("mouseleave", F, () => {
      (i(O).hasSubmenu || i(O).submenu) && A();
    }), m(H, F);
  }), l(te), Tt(te, (H) => f(p, H), () => i(p)), Z(
    (H) => {
      Se(te, "aria-label", o()), J = qt(te, "", J, H);
    },
    [
      () => ({
        display: r() ? "block" : "none",
        left: `${s() ?? ""}px`,
        top: `${a() ?? ""}px`
      })
    ]
  ), m(n, te), Oe();
}
const Wu = { visible: !1, data: null }, Uu = Sl(Wu);
class Ku {
  constructor() {
    this.store = Uu, this.setupGlobalHandlers();
  }
  setupGlobalHandlers() {
    document.addEventListener("contextmenu", (e) => {
      if (e.ctrlKey)
        return;
      e.preventDefault();
      const t = e.target;
      this.showContextMenuForElement(t, e.clientX, e.clientY);
    }), document.addEventListener("click", (e) => {
      e.target.closest(".win98-context-menu") || this.close();
    }), document.addEventListener("keydown", (e) => {
      e.key === "Escape" && this.close();
    });
  }
  showContextMenuForElement(e, t, r) {
    e.classList.contains("desktop-icon") ? this.showDesktopIconContextMenu(t, r, e) : e.classList.contains("win98-desktop") ? this.showDesktopContextMenu(t, r) : e.classList.contains("win98-titlebar") ? this.showWindowContextMenu(t, r) : e.classList.contains("win98-window-content") ? this.showWindowContentContextMenu(t, r) : e.tagName === "INPUT" || e.tagName === "TEXTAREA" ? this.showTextSelectionContextMenu(t, r) : this.showDefaultContextMenu(t, r);
  }
  showDesktopIconContextMenu(e, t, r) {
    const s = () => {
      if (r)
        return r.closest(".desktop-icon");
      try {
        return document.elementFromPoint(e, t)?.closest(".desktop-icon");
      } catch {
        return null;
      }
    }, a = {
      items: [
        {
          label: "Open",
          onclick: () => {
            const o = s();
            if (o) {
              const c = o.getAttribute("data-item-id");
              c && Qe.activate(c);
            }
          }
        },
        {
          label: "Open With",
          hasSubmenu: !0,
          submenu: [
            {
              label: "Notepad",
              onclick: () => {
                const o = s();
                if (o) {
                  const c = o.getAttribute("data-item-id");
                  c && Qe.activate(c);
                }
              }
            },
            {
              label: "WordPad",
              onclick: () => {
                const o = s();
                if (o) {
                  const c = o.getAttribute("data-item-id");
                  c && Qe.activate(c);
                }
              }
            }
          ]
        },
        { type: "separator" },
        {
          label: "Cut",
          shortcut: "Ctrl+X",
          onclick: () => {
            const o = s();
            if (o) {
              const c = o.getAttribute("data-item-id");
              c && (Qe.selectItem(c), sessionStorage.setItem("clipboard-action", "cut"), sessionStorage.setItem("clipboard-item", c));
            }
          }
        },
        {
          label: "Copy",
          shortcut: "Ctrl+C",
          onclick: () => {
            const o = s();
            if (o) {
              const c = o.getAttribute("data-item-id");
              c && (Qe.selectItem(c), sessionStorage.setItem("clipboard-action", "copy"), sessionStorage.setItem("clipboard-item", c));
            }
          }
        },
        {
          label: "Create Shortcut",
          onclick: () => {
            const o = s();
            if (o) {
              const c = o.getAttribute("data-item-id");
              if (c) {
                const u = Qe.items.find((v) => v.id === c);
                if (u) {
                  const v = `${c}-shortcut-${Date.now()}`;
                  Qe.addItem({
                    id: v,
                    label: `${u.label} Shortcut`,
                    iconClass: u.iconClass,
                    type: "shortcut",
                    action: u.action
                  });
                }
              }
            }
          }
        },
        { type: "separator" },
        {
          label: "Delete",
          onclick: () => {
            const o = s();
            if (o) {
              const c = o.getAttribute("data-item-id");
              if (c) {
                const u = Qe.items.find((p) => p.id === c), v = u ? u.label : "this item";
                confirm(`Are you sure you want to delete "${v}"?`) && Qe.removeItem(c);
              }
            }
          }
        },
        {
          label: "Rename",
          onclick: () => {
            const o = s();
            if (o) {
              const u = o.querySelector(".desktop-icon-label").textContent || "", v = prompt("Enter new name:", u);
              if (v && v !== u && v.trim()) {
                const p = o.getAttribute("data-item-id");
                if (p) {
                  const _ = Qe.items.find((g) => g.id === p);
                  _ && (_.label = v.trim());
                }
              }
            }
          }
        },
        { type: "separator" },
        {
          label: "Properties",
          onclick: () => {
            const o = s();
            if (o) {
              const c = o.getAttribute("data-item-id");
              if (c) {
                const u = Qe.items.find((v) => v.id === c);
                u && $e.alert(
                  `Properties for "${u.label}"

Type: ${u.type}
Icon: ${u.iconClass}`,
                  "Properties"
                );
              }
            }
          }
        }
      ],
      x: e,
      y: t,
      label: "Desktop icon context menu"
    };
    this.show(a);
  }
  showDesktopContextMenu(e, t) {
    const r = {
      items: [
        {
          label: "Arrange Icons",
          hasSubmenu: !0,
          submenu: [
            {
              label: "by Name",
              onclick: () => console.log("Arrange by Name")
            },
            {
              label: "by Type",
              onclick: () => console.log("Arrange by Type")
            },
            {
              label: "by Size",
              onclick: () => console.log("Arrange by Size")
            },
            {
              label: "by Date",
              onclick: () => console.log("Arrange by Date")
            }
          ]
        },
        {
          label: "Line up Icons",
          onclick: () => console.log("Line up Icons")
        },
        { type: "separator" },
        { label: "Refresh", onclick: () => console.log("Refresh") },
        { label: "Paste", onclick: () => console.log("Paste") },
        {
          label: "Paste Shortcut",
          onclick: () => console.log("Paste Shortcut")
        },
        { type: "separator" },
        {
          label: "New",
          hasSubmenu: !0,
          submenu: [
            { label: "Folder", onclick: () => console.log("New Folder") },
            {
              label: "Text Document",
              onclick: () => console.log("New Text Document")
            },
            {
              label: "Shortcut",
              onclick: () => console.log("New Shortcut")
            }
          ]
        },
        { type: "separator" },
        {
          label: "Properties",
          onclick: () => console.log("Desktop Properties")
        }
      ],
      x: e,
      y: t,
      label: "Desktop context menu"
    };
    this.show(r);
  }
  showWindowContextMenu(e, t) {
    const r = {
      items: [
        { label: "Restore", onclick: () => console.log("Restore") },
        { label: "Move", onclick: () => console.log("Move") },
        { label: "Size", onclick: () => console.log("Size") },
        { label: "Minimize", onclick: () => console.log("Minimize") },
        { label: "Maximize", onclick: () => console.log("Maximize") },
        { type: "separator" },
        {
          label: "Close",
          shortcut: "Alt+F4",
          onclick: () => console.log("Close")
        }
      ],
      x: e,
      y: t,
      label: "Window context menu"
    };
    this.show(r);
  }
  showWindowContentContextMenu(e, t) {
    const r = {
      items: [
        {
          label: "Cut",
          shortcut: "Ctrl+X",
          onclick: () => console.log("Cut")
        },
        {
          label: "Copy",
          shortcut: "Ctrl+C",
          onclick: () => console.log("Copy")
        },
        {
          label: "Paste",
          shortcut: "Ctrl+V",
          onclick: () => console.log("Paste")
        },
        { type: "separator" },
        {
          label: "Select All",
          shortcut: "Ctrl+A",
          onclick: () => console.log("Select All")
        }
      ],
      x: e,
      y: t,
      label: "Window content context menu"
    };
    this.show(r);
  }
  showTextSelectionContextMenu(e, t) {
    const r = {
      items: [
        {
          label: "Cut",
          shortcut: "Ctrl+X",
          onclick: () => console.log("Cut")
        },
        {
          label: "Copy",
          shortcut: "Ctrl+C",
          onclick: () => console.log("Copy")
        },
        {
          label: "Paste",
          shortcut: "Ctrl+V",
          onclick: () => console.log("Paste")
        },
        { type: "separator" },
        { label: "Delete", onclick: () => console.log("Delete") },
        { type: "separator" },
        {
          label: "Select All",
          shortcut: "Ctrl+A",
          onclick: () => console.log("Select All")
        }
      ],
      x: e,
      y: t,
      label: "Text selection context menu"
    };
    this.show(r);
  }
  showDefaultContextMenu(e, t) {
    const r = {
      items: [
        {
          label: "Cut",
          shortcut: "Ctrl+X",
          onclick: () => console.log("Cut")
        },
        {
          label: "Copy",
          shortcut: "Ctrl+C",
          onclick: () => console.log("Copy")
        },
        {
          label: "Paste",
          shortcut: "Ctrl+V",
          onclick: () => console.log("Paste")
        },
        { type: "separator" },
        {
          label: "Select All",
          shortcut: "Ctrl+A",
          onclick: () => console.log("Select All")
        }
      ],
      x: e,
      y: t,
      label: "Default context menu"
    };
    this.show(r);
  }
  show(e) {
    this.store.set({ visible: !0, data: e });
  }
  close() {
    this.store.set({ visible: !1, data: null });
  }
  hideContextMenu() {
    this.close();
  }
  // Public method to show custom context menu
  showCustom(e, t, r, s) {
    this.show({ items: e, x: t, y: r, label: s || "Custom context menu" });
  }
  // Get the current store for components to subscribe to
  getStore() {
    return this.store;
  }
}
const Gu = new Ku(), Vu = Gu.getStore();
function Yu(n) {
  const e = () => El(Vu, "$contextMenu", t), [t, r] = Cl(), s = /* @__PURE__ */ ze(e);
  function a() {
  }
  var o = Re(), c = Ce(o);
  {
    var u = (v) => {
      qu(v, {
        get items() {
          return i(s).data.items;
        },
        get visible() {
          return i(s).visible;
        },
        get x() {
          return i(s).data.x;
        },
        get y() {
          return i(s).data.y;
        },
        get label() {
          return i(s).data.label;
        },
        onclose: a
      });
    };
    K(c, (v) => {
      i(s).visible && i(s).data && v(u);
    });
  }
  m(n, o), r();
}
function Xu(n, e) {
  const t = n.target;
  (t.classList.contains("shell") || t.classList.contains("desktop")) && (Ie.clearAllFocus(), f(e, !1));
}
var Ju = /* @__PURE__ */ b("<!> <!> <!> <!> <!> <!>", 1), Zu = /* @__PURE__ */ b('<div class="shell-loading svelte-lveiav">Loading Abu OS 98...</div>'), Qu = /* @__PURE__ */ b('<div class="shell svelte-lveiav"><!></div>');
function qp(n, e) {
  Fe(e, !0);
  let t = be(e, "plugins", 19, () => []), r = /* @__PURE__ */ j(!1), s = /* @__PURE__ */ j(!1);
  const a = /* @__PURE__ */ ze(() => $e.activeDialog);
  wt(() => {
    Id.forEach((y) => {
      try {
        Tn.get(y.id) || Tn.registerWindow(y);
      } catch (I) {
        console.error(`Failed to register built-in plugin ${y.id}:`, I);
      }
    }), t().forEach((y) => {
      try {
        Tn.get(y.id) || Tn.registerWindow(y);
      } catch (I) {
        console.error(`Failed to register plugin ${y.id}:`, I);
      }
    }), Ie.init(), Ht.init(), Gt.init();
    const g = [
      {
        id: "my-computer",
        label: "My Computer",
        iconClass: "icon-system-computer",
        type: "program",
        action: () => Ie.open("builtin-control-panel")
      },
      {
        id: "recycle-bin",
        label: "Recycle Bin",
        iconClass: "icon-system-recycle-bin-empty",
        type: "program",
        action: () => $e.alert("No items to display", "Recycle Bin")
      },
      {
        id: "control-panel",
        label: "Control Panel",
        iconClass: "icon-system-control-panel",
        type: "program",
        action: () => Ie.open("builtin-control-panel")
      },
      {
        id: "internet-explorer",
        label: "Internet Explorer",
        iconClass: "icon-apps-internet-internet-explorer",
        type: "program",
        action: () => Ie.open("builtin-browser")
      },
      {
        id: "ssh-terminal",
        label: "SSH Terminal",
        iconClass: "icon-ui-misc-ms-dos",
        type: "program",
        action: () => Ie.open("builtin-msdos")
      },
      {
        id: "terminal",
        label: "Terminal",
        iconClass: "icon-ui-misc-ms-dos",
        type: "program",
        action: () => Ie.open("builtin-terminal")
      }
    ];
    Qe.init(g), f(s, !0);
  });
  function o(g) {
    f(r, g, !0);
  }
  function c() {
    f(r, !1);
  }
  var u = Qu();
  u.__click = [
    // Only clear focus if clicking on desktop background (not windows/taskbar)
    Xu,
    r
  ];
  var v = d(u);
  {
    var p = (g) => {
      var y = Ju(), I = Ce(y);
      Od(I, {});
      var E = h(I, 2);
      Le(E, 17, () => Ie.all, (w) => w.id, (w, A) => {
        Eu(w, {
          get window() {
            return i(A);
          }
        });
      });
      var L = h(E, 2);
      Ud(L, {
        get isStartMenuOpen() {
          return i(r);
        },
        onStartMenuToggle: o
      });
      var T = h(L, 2);
      iu(T, {
        get show() {
          return i(r);
        },
        onClose: c
      });
      var C = h(T, 2);
      {
        var z = (w) => {
          {
            let A = /* @__PURE__ */ ze(() => i(a).buttons.map((x) => ({
              label: x.label,
              action: () => $e.close(x.value)
            })));
            Au(w, {
              get title() {
                return i(a).title;
              },
              get message() {
                return i(a).message;
              },
              get type() {
                return i(a).type;
              },
              get buttons() {
                return i(A);
              },
              onclose: () => $e.close(void 0)
            });
          }
        };
        K(C, (w) => {
          i(a) && w(z);
        });
      }
      var k = h(C, 2);
      Yu(k), m(g, y);
    }, _ = (g) => {
      var y = Zu();
      m(g, y);
    };
    K(v, (g) => {
      i(s) ? g(p) : g(_, !1);
    });
  }
  l(u), m(n, u), Oe();
}
tt(["click"]);
function $u(n, e, t, r) {
  if (!e()) {
    const s = n.target;
    t(s.value), r.onchange(t());
  }
}
var ev = /* @__PURE__ */ b("<option> </option>"), tv = /* @__PURE__ */ b('<select class="win98-select svelte-su0wqr" tabindex="0"></select>');
function Wp(n, e) {
  Fe(e, !0);
  let t = be(e, "value", 15), r = be(e, "disabled", 3, !1);
  var s = tv();
  s.__change = [$u, r, t, e], Le(s, 21, () => e.options, je, (o, c) => {
    var u = ev(), v = d(u, !0);
    l(u);
    var p = {};
    Z(() => {
      q(v, i(c).label), p !== (p = i(c).value) && (u.value = (u.__value = i(c).value) ?? "");
    }), m(o, u);
  }), l(s);
  var a;
  qa(s), Z(() => {
    s.disabled = r(), Se(s, "aria-label", e["aria-label"]), a !== (a = t()) && (s.value = (s.__value = t()) ?? "", gs(s, t()));
  }), m(n, s), Oe();
}
tt(["change"]);
class nv {
  constructor() {
    this.topics = /* @__PURE__ */ new Map(), this.topicTree = [], this.relationships = /* @__PURE__ */ new Map();
  }
  /**
   * Load all help content from available sources
   * 
   * @returns Promise that resolves when content is loaded
   * @throws Error if content loading fails
   */
  async loadContent() {
    try {
      this.topics.clear(), this.topicTree = [], this.relationships.clear(), await this.createDefaultTopics(), this.topicTree = this.buildTopicHierarchy(Array.from(this.topics.values())), this.relationships = this.buildTopicRelationships(Array.from(this.topics.values()));
    } catch (e) {
      throw new Error(`Failed to load help content: ${e instanceof Error ? e.message : "Unknown error"}`);
    }
  }
  /**
   * Load a specific topic by ID
   * 
   * @param topicId - The topic ID to load
   * @returns Promise that resolves with the topic
   * @throws Error if topic is not found
   */
  async loadTopic(e) {
    const t = this.topics.get(e);
    if (!t)
      throw new Error(`Topic not found: ${e}`);
    return t;
  }
  /**
   * Load the complete topic tree
   * 
   * @returns Promise that resolves with the topic tree
   */
  async loadTopicTree() {
    return this.topicTree;
  }
  /**
   * Parse markdown content to HTML
   * 
   * @param content - Markdown content to parse
   * @returns HTML content
   */
  parseMarkdown(e) {
    return e.replace(/^### (.*$)/gim, "<h3>$1</h3>").replace(/^## (.*$)/gim, "<h2>$1</h2>").replace(/^# (.*$)/gim, "<h1>$1</h1>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>").replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>").replace(/`(.*?)`/g, "<code>$1</code>").replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>').replace(/\n/g, "<br>");
  }
  /**
   * Extract metadata from content
   * 
   * @param content - Content to extract metadata from
   * @returns Extracted metadata
   */
  extractMetadata(e) {
    const t = {
      title: "Untitled",
      category: "general"
    }, r = e.match(/^---\n([\s\S]*?)\n---/);
    if (r) {
      const a = r[1].split(`
`);
      for (const o of a) {
        const c = o.match(/^(\w+):\s*(.*)$/);
        if (c) {
          const [, u, v] = c;
          switch (u) {
            case "author":
              t.author = v;
              break;
            case "version":
              t.version = v;
              break;
            case "tags":
              t.tags = v.split(",").map((_) => _.trim());
              break;
            case "difficulty":
              ["beginner", "intermediate", "advanced"].includes(v) && (t.difficulty = v);
              break;
            case "estimatedReadTime":
              const p = parseInt(v, 10);
              isNaN(p) || (t.estimatedReadTime = p);
              break;
          }
        }
      }
    }
    if (!t.estimatedReadTime) {
      const s = e.split(/\s+/).length;
      t.estimatedReadTime = Math.max(1, Math.ceil(s / 200));
    }
    return t;
  }
  /**
   * Build topic hierarchy from flat topic list
   * 
   * @param topics - Flat list of topics
   * @returns Hierarchical topic tree
   */
  buildTopicHierarchy(e) {
    const t = /* @__PURE__ */ new Map(), r = [];
    for (const s of e)
      t.set(s.id, { ...s, children: [] });
    for (const s of e) {
      const a = t.get(s.id);
      if (s.parentId) {
        const o = t.get(s.parentId);
        o ? o.children.push(a) : r.push(a);
      } else
        r.push(a);
    }
    return r;
  }
  /**
   * Validate a topic
   * 
   * @param topic - Topic to validate
   * @returns Validation result
   */
  validateTopic(e) {
    const t = [], r = [];
    return (!e.id || typeof e.id != "string") && t.push({
      field: "id",
      message: "Topic ID is required and must be a string",
      code: "MISSING_ID"
    }), (!e.title || typeof e.title != "string") && t.push({
      field: "title",
      message: "Topic title is required and must be a string",
      code: "MISSING_TITLE"
    }), (!e.content || typeof e.content != "string") && t.push({
      field: "content",
      message: "Topic content is required and must be a string",
      code: "MISSING_CONTENT"
    }), (!e.category || !["design", "specifications", "kernel", "enterprise", "service", "shared"].includes(e.category)) && t.push({
      field: "category",
      message: "Topic category is required and must be a valid category",
      code: "INVALID_CATEGORY"
    }), e.id && !/^[a-z0-9-]+$/.test(e.id) && t.push({
      field: "id",
      message: "Topic ID must contain only lowercase letters, numbers, and hyphens",
      code: "INVALID_ID_FORMAT"
    }), e.content && e.content.length < 10 && r.push({
      field: "content",
      message: "Topic content is very short, consider adding more detail",
      code: "SHORT_CONTENT"
    }), e.keywords && e.keywords.length === 0 && r.push({
      field: "keywords",
      message: "Topic has no keywords, consider adding some for better searchability",
      code: "NO_KEYWORDS"
    }), e.keywords && !Array.isArray(e.keywords) && t.push({
      field: "keywords",
      message: "Keywords must be an array of strings",
      code: "INVALID_KEYWORDS"
    }), e.lastModified && !(e.lastModified instanceof Date) && t.push({
      field: "lastModified",
      message: "Last modified date must be a valid Date object",
      code: "INVALID_DATE"
    }), e.relatedTopics && !Array.isArray(e.relatedTopics) && t.push({
      field: "relatedTopics",
      message: "Related topics must be an array of topic IDs",
      code: "INVALID_RELATED_TOPICS"
    }), {
      valid: t.length === 0,
      errors: t,
      warnings: r
    };
  }
  /**
   * Validate content string
   * 
   * @param content - Content to validate
   * @returns Validation result
   */
  validateContent(e) {
    const t = [], r = [];
    return !e || typeof e != "string" ? t.push({
      field: "content",
      message: "Content is required and must be a string",
      code: "MISSING_CONTENT"
    }) : (e.trim().length === 0 && t.push({
      field: "content",
      message: "Content cannot be empty",
      code: "EMPTY_CONTENT"
    }), e.trim().length < 10 && r.push({
      field: "content",
      message: "Content is very short, consider adding more detail",
      code: "SHORT_CONTENT"
    }), /<script/i.test(e) && t.push({
      field: "content",
      message: "Content contains potentially dangerous script tags",
      code: "DANGEROUS_CONTENT"
    })), {
      valid: t.length === 0,
      errors: t,
      warnings: r
    };
  }
  /**
   * Update a topic
   * 
   * @param topicId - Topic ID to update
   * @param updates - Updates to apply
   * @returns Promise that resolves when update is complete
   * @throws Error if topic is not found
   */
  async updateTopic(e, t) {
    const r = this.topics.get(e);
    if (!r)
      throw new Error(`Topic not found: ${e}`);
    const s = { ...r, ...t }, a = this.validateTopic(s);
    if (!a.valid)
      throw new Error(`Invalid topic updates: ${a.errors.map((o) => o.message).join(", ")}`);
    this.topics.set(e, s), (t.parentId !== void 0 || t.id !== void 0) && (this.topicTree = this.buildTopicHierarchy(Array.from(this.topics.values())));
  }
  /**
   * Add a new topic
   * 
   * @param topic - Topic to add
   * @returns Promise that resolves when topic is added
   * @throws Error if topic is invalid or already exists
   */
  async addTopic(e) {
    const t = this.validateTopic(e);
    if (!t.valid)
      throw new Error(`Invalid topic: ${t.errors.map((r) => r.message).join(", ")}`);
    if (this.topics.has(e.id))
      throw new Error(`Topic already exists: ${e.id}`);
    this.topics.set(e.id, e), this.topicTree = this.buildTopicHierarchy(Array.from(this.topics.values()));
  }
  /**
   * Remove a topic
   * 
   * @param topicId - Topic ID to remove
   * @returns Promise that resolves when topic is removed
   * @throws Error if topic is not found
   */
  async removeTopic(e) {
    if (!this.topics.get(e))
      throw new Error(`Topic not found: ${e}`);
    this.topics.delete(e), this.topicTree = this.buildTopicHierarchy(Array.from(this.topics.values()));
  }
  /**
   * Get related topics for a given topic
   * 
   * @param topicId - Topic ID to get related topics for
   * @returns Array of related topics
   */
  getRelatedTopics(e) {
    const t = this.topics.get(e);
    return !t || !t.relatedTopics ? [] : t.relatedTopics.map((r) => this.topics.get(r)).filter((r) => r !== void 0);
  }
  /**
   * Get topic path (breadcrumb) for a given topic
   * 
   * @param topicId - Topic ID to get path for
   * @returns Array of topics in path order
   */
  getTopicPath(e) {
    const t = this.topics.get(e);
    if (!t) return [];
    const r = [];
    let s = t;
    for (; s && (r.unshift(s), s.parentId); )
      s = this.topics.get(s.parentId);
    return r;
  }
  /**
   * Build topic relationships
   * 
   * @param topics - Topics to build relationships for
   * @returns Map of topic ID to related topic IDs
   */
  buildTopicRelationships(e) {
    const t = /* @__PURE__ */ new Map();
    for (const r of e) {
      const s = [];
      for (const a of e)
        a.id !== r.id && r.keywords.filter(
          (c) => a.keywords.includes(c)
        ).length > 0 && s.push(a.id);
      for (const a of e)
        a.id !== r.id && a.category === r.category && !s.includes(a.id) && s.push(a.id);
      t.set(r.id, s.slice(0, 5));
    }
    return t;
  }
  /**
   * Get topic by ID
   * 
   * @param topicId - Topic ID
   * @returns Topic or null if not found
   */
  getTopic(e) {
    return this.topics.get(e);
  }
  /**
   * Get all topics
   * 
   * @returns Array of all topics
   */
  getAllTopics() {
    return Array.from(this.topics.values());
  }
  /**
   * Get topics by category
   * 
   * @param category - Category to filter by
   * @returns Array of topics in category
   */
  getTopicsByCategory(e) {
    return Array.from(this.topics.values()).filter((t) => t.category === e);
  }
  /**
   * Load content file
   * 
   * @param path - Path to content file
   * @returns Promise that resolves with content file
   */
  async loadContentFile(e) {
    try {
      const t = await this.loadContentFromPath(e), r = this.extractMetadata(t);
      return {
        path: e,
        content: t,
        metadata: {
          title: r.title,
          category: r.category,
          tags: r.tags || [],
          difficulty: r.difficulty || "beginner",
          author: r.author,
          version: r.version
        },
        lastModified: /* @__PURE__ */ new Date(),
        size: t.length,
        checksum: this.calculateChecksum(t)
      };
    } catch (t) {
      throw new Error(`Failed to load content file ${e}: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
  /**
   * Load all content files
   * 
   * @returns Promise that resolves with all content files
   */
  async loadAllContentFiles() {
    try {
      const e = await this.getContentPaths(), t = [];
      for (const r of e)
        try {
          const s = await this.loadContentFile(r);
          t.push(s);
        } catch (s) {
          console.warn(`Failed to load content file ${r}:`, s);
        }
      return t;
    } catch (e) {
      throw new Error(`Failed to load all content files: ${e instanceof Error ? e.message : "Unknown error"}`);
    }
  }
  /**
   * Reload content file
   * 
   * @param path - Path to content file
   * @returns Promise that resolves with reloaded content file
   */
  async reloadContentFile(e) {
    return this.loadContentFile(e);
  }
  /**
   * Preload content files
   * 
   * @param paths - Paths to preload
   * @returns Promise that resolves when preloading is complete
   */
  async preloadContentFiles(e) {
    try {
      const t = e.map((r) => this.loadContentFile(r));
      await Promise.all(t);
    } catch (t) {
      throw new Error(`Failed to preload content files: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
  /**
   * Parse content file
   * 
   * @param contentFile - Content file to parse
   * @returns Promise that resolves with parsed content
   */
  async parseContentFile(e) {
    try {
      const t = this.parseMarkdown(e.content), r = this.extractTableOfContents(e.content), s = this.extractLinks(e.content), a = this.extractImages(e.content), o = this.extractCodeBlocks(e.content), c = this.extractTables(e.content);
      return {
        html: t,
        toc: r,
        metadata: e.metadata,
        links: s,
        images: a,
        codeBlocks: o,
        tables: c
      };
    } catch (t) {
      throw new Error(`Failed to parse content file: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
  /**
   * Build topic from parsed content
   * 
   * @param parsedContent - Parsed content
   * @returns Promise that resolves with help topic
   */
  async buildTopicFromParsedContent(e) {
    try {
      return {
        id: this.generateTopicId(e.metadata.title),
        title: e.metadata.title,
        content: e.html,
        icon: this.getIconForCategory(e.metadata.category),
        children: [],
        keywords: e.metadata.keywords || [],
        category: e.metadata.category,
        lastModified: /* @__PURE__ */ new Date(),
        relatedTopics: [],
        metadata: {
          title: e.metadata.title,
          category: e.metadata.category,
          author: e.metadata.author,
          version: e.metadata.version,
          tags: e.metadata.tags,
          difficulty: e.metadata.difficulty,
          estimatedReadTime: e.metadata.estimatedReadTime
        }
      };
    } catch (t) {
      throw new Error(`Failed to build topic from parsed content: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
  /**
   * Build category from topics
   * 
   * @param topics - Topics to build category from
   * @returns Promise that resolves with help category
   */
  async buildCategoryFromTopics(e) {
    if (e.length === 0)
      throw new Error("Cannot build category from empty topic list");
    const t = e[0].category, r = e.map((s) => s.id);
    return {
      id: t,
      name: this.formatCategoryName(t),
      topics: r
    };
  }
  /**
   * Process content batch
   * 
   * @param files - Content files to process
   * @returns Promise that resolves with processed content
   */
  async processContentBatch(e) {
    try {
      const t = [], r = /* @__PURE__ */ new Set();
      for (const s of e)
        try {
          const a = await this.parseContentFile(s), o = await this.buildTopicFromParsedContent(a);
          t.push(o), r.add(o.category);
        } catch (a) {
          console.warn(`Failed to process content file ${s.path}:`, a);
        }
      return {
        topics: t,
        categories: Array.from(r)
      };
    } catch (t) {
      throw new Error(`Failed to process content batch: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
  /**
   * Get content file by path
   * 
   * @param path - Content file path
   * @returns Content file or null if not found
   */
  getContentFile(e) {
    return null;
  }
  /**
   * Get category by ID
   * 
   * @param id - Category ID
   * @returns Category or null if not found
   */
  getCategory(e) {
    const t = this.getTopicsByCategory(e);
    return t.length === 0 ? null : {
      id: e,
      name: this.formatCategoryName(e),
      topics: t.map((r) => r.id)
    };
  }
  /**
   * Get all categories
   * 
   * @returns Array of all categories
   */
  getAllCategories() {
    const e = /* @__PURE__ */ new Set(), t = this.getAllTopics();
    for (const r of t)
      e.add(r.category);
    return Array.from(e).map((r) => ({
      id: r,
      name: this.formatCategoryName(r),
      topics: t.filter((s) => s.category === r).map((s) => s.id)
    }));
  }
  /**
   * Get topics by tag
   * 
   * @param tag - Tag to filter by
   * @returns Array of topics with tag
   */
  getTopicsByTag(e) {
    return this.getAllTopics().filter(
      (t) => t.keywords.includes(e) || t.metadata?.tags && t.metadata.tags.includes(e)
    );
  }
  /**
   * Get topics by difficulty
   * 
   * @param difficulty - Difficulty level to filter by
   * @returns Array of topics with difficulty
   */
  getTopicsByDifficulty(e) {
    return this.getAllTopics().filter(
      (t) => t.metadata?.difficulty === e
    );
  }
  /**
   * Add content file
   * 
   * @param contentFile - Content file to add
   * @returns Promise that resolves when content is added
   */
  async addContentFile(e) {
    try {
      const t = await this.parseContentFile(e), r = await this.buildTopicFromParsedContent(t);
      await this.addTopic(r);
    } catch (t) {
      throw new Error(`Failed to add content file: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
  /**
   * Update content file
   * 
   * @param path - Path to content file
   * @param contentFile - Updated content file
   * @returns Promise that resolves when content is updated
   */
  async updateContentFile(e, t) {
    try {
      const r = this.generateTopicId(t.metadata.title), s = await this.parseContentFile(t), a = await this.buildTopicFromParsedContent(s);
      await this.updateTopic(r, a);
    } catch (r) {
      throw new Error(`Failed to update content file: ${r instanceof Error ? r.message : "Unknown error"}`);
    }
  }
  /**
   * Remove content file
   * 
   * @param path - Path to content file
   * @returns Promise that resolves when content is removed
   */
  async removeContentFile(e) {
    try {
      const r = this.getAllTopics().find((s) => s.id === this.generateTopicId(e));
      r && await this.removeTopic(r.id);
    } catch (t) {
      throw new Error(`Failed to remove content file: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
  /**
   * Validate content file
   * 
   * @param contentFile - Content file to validate
   * @returns Array of validation results
   */
  async validateContentFile(e) {
    try {
      const t = [], r = this.validateContent(e.content);
      t.push(r);
      const s = this.validateMetadata(e.metadata);
      return t.push(s), t;
    } catch (t) {
      throw new Error(`Failed to validate content file: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
  /**
   * Clear cache
   */
  clearCache() {
    this.topics.clear(), this.topicTree = [], this.relationships.clear();
  }
  /**
   * Get cache statistics
   * 
   * @returns Cache statistics
   */
  getCacheStats() {
    return {
      size: this.topics.size,
      maxSize: 1e3,
      // TODO: Make configurable
      hitRate: 0.95,
      // TODO: Implement actual tracking
      missRate: 0.05,
      evictions: 0
    };
  }
  /**
   * Set cache size
   * 
   * @param size - Maximum cache size
   */
  setCacheSize(e) {
    console.log(`Cache size set to ${e}`);
  }
  /**
   * Create default topics for testing
   * 
   * @returns Promise that resolves when default topics are created
   */
  async createDefaultTopics() {
    const e = [
      {
        id: "getting-started",
        title: "Getting Started",
        content: "<h1>Getting Started</h1><p>Welcome to the Abu OS 98 Help System. This guide will help you get started with using the help system.</p>",
        icon: "help-icon-folder",
        children: [],
        keywords: ["getting started", "welcome", "introduction", "help"],
        category: "shared",
        lastModified: /* @__PURE__ */ new Date(),
        relatedTopics: ["help-system-overview"]
      },
      {
        id: "help-system-overview",
        title: "Help System Overview",
        content: "<h1>Help System Overview</h1><p>The Windows 98 F1 Help System provides comprehensive documentation for the Abu OS 98 ecosystem.</p>",
        icon: "help-icon-document",
        parentId: "getting-started",
        children: [],
        keywords: ["help system", "overview", "documentation"],
        category: "shared",
        lastModified: /* @__PURE__ */ new Date(),
        relatedTopics: ["getting-started"]
      },
      {
        id: "design-system",
        title: "Design System",
        content: "<h1>Design System</h1><p>The Abu OS 98 design system provides Windows 98 authentic styling and components.</p>",
        icon: "help-icon-folder",
        children: [],
        keywords: ["design", "styling", "components", "windows 98"],
        category: "design",
        lastModified: /* @__PURE__ */ new Date(),
        relatedTopics: ["visual-system"]
      },
      {
        id: "visual-system",
        title: "Visual System",
        content: "<h1>Visual System</h1><p>The visual system defines colors, typography, and layout for Windows 98 authentic appearance.</p>",
        icon: "help-icon-document",
        parentId: "design-system",
        children: [],
        keywords: ["visual", "colors", "typography", "layout"],
        category: "design",
        lastModified: /* @__PURE__ */ new Date(),
        relatedTopics: ["design-system"]
      }
    ];
    for (const t of e)
      this.topics.set(t.id, t);
  }
  /**
   * Load content from path (placeholder implementation)
   * 
   * @param path - Content path
   * @returns Promise that resolves with content
   */
  async loadContentFromPath(e) {
    return `# Content from ${e}

This is placeholder content for ${e}.`;
  }
  /**
   * Get content paths (placeholder implementation)
   * 
   * @returns Promise that resolves with content paths
   */
  async getContentPaths() {
    return ["getting-started.md", "help-system-overview.md", "design-system.md", "visual-system.md"];
  }
  /**
   * Calculate content checksum
   * 
   * @param content - Content to calculate checksum for
   * @returns Content checksum
   */
  calculateChecksum(e) {
    let t = 0;
    for (let r = 0; r < e.length; r++) {
      const s = e.charCodeAt(r);
      t = (t << 5) - t + s, t = t & t;
    }
    return t.toString(16);
  }
  /**
   * Extract table of contents from content
   * 
   * @param content - Content to extract TOC from
   * @returns Table of contents
   */
  extractTableOfContents(e) {
    const t = [], r = e.split(`
`);
    for (const s of r) {
      const a = s.match(/^(#{1,6})\s+(.+)$/);
      if (a) {
        const o = a[1].length, c = a[2], u = this.generateHeadingId(c);
        t.push({
          id: u,
          text: c,
          level: o,
          children: []
        });
      }
    }
    return { items: t };
  }
  /**
   * Extract links from content
   * 
   * @param content - Content to extract links from
   * @returns Array of content links
   */
  extractLinks(e) {
    const t = [], r = /\[([^\]]+)\]\(([^)]+)\)/g;
    let s;
    for (; (s = r.exec(e)) !== null; ) {
      const a = s[1], o = s[2], c = o.startsWith("http") ? "external" : "internal";
      t.push({
        text: a,
        url: o,
        type: c
      });
    }
    return t;
  }
  /**
   * Extract images from content
   * 
   * @param content - Content to extract images from
   * @returns Array of content images
   */
  extractImages(e) {
    const t = [], r = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let s;
    for (; (s = r.exec(e)) !== null; ) {
      const a = s[1], o = s[2];
      t.push({
        src: o,
        alt: a
      });
    }
    return t;
  }
  /**
   * Extract code blocks from content
   * 
   * @param content - Content to extract code blocks from
   * @returns Array of code blocks
   */
  extractCodeBlocks(e) {
    const t = [], r = /```(\w+)?\n([\s\S]*?)```/g;
    let s;
    for (; (s = r.exec(e)) !== null; ) {
      const a = s[1] || "text", o = s[2];
      t.push({
        language: a,
        code: o
      });
    }
    return t;
  }
  /**
   * Extract tables from content
   * 
   * @param content - Content to extract tables from
   * @returns Array of tables
   */
  extractTables(e) {
    const t = [], r = e.split(`
`);
    let s = null;
    for (const a of r)
      if (a.includes("|")) {
        const o = a.split("|").map((c) => c.trim()).filter((c) => c);
        s ? s.rows.push(o) : s = {
          headers: o,
          rows: []
        };
      } else s && (t.push(s), s = null);
    return s && t.push(s), t;
  }
  /**
   * Generate topic ID from title
   * 
   * @param title - Topic title
   * @returns Generated topic ID
   */
  generateTopicId(e) {
    return e.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  }
  /**
   * Generate heading ID from text
   * 
   * @param text - Heading text
   * @returns Generated heading ID
   */
  generateHeadingId(e) {
    return e.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  }
  /**
   * Get icon for category
   * 
   * @param category - Category name
   * @returns Icon class name
   */
  getIconForCategory(e) {
    return {
      "getting-started": "help-icon-folder",
      design: "help-icon-folder",
      specifications: "help-icon-document",
      api: "help-icon-document",
      guides: "help-icon-document",
      kernel: "help-icon-folder",
      enterprise: "help-icon-folder",
      service: "help-icon-folder",
      shared: "help-icon-folder",
      build: "help-icon-folder",
      general: "help-icon-folder"
    }[e] || "help-icon-document";
  }
  /**
   * Format category name
   * 
   * @param category - Category ID
   * @returns Formatted category name
   */
  formatCategoryName(e) {
    return e.split("-").map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" ");
  }
  /**
   * Validate metadata
   * 
   * @param metadata - Metadata to validate
   * @returns Validation result
   */
  validateMetadata(e) {
    const t = [], r = [];
    return (!e.title || typeof e.title != "string") && t.push({
      field: "title",
      message: "Metadata title is required and must be a string",
      code: "MISSING_TITLE"
    }), (!e.category || typeof e.category != "string") && t.push({
      field: "category",
      message: "Metadata category is required and must be a string",
      code: "MISSING_CATEGORY"
    }), (!e.tags || !Array.isArray(e.tags)) && r.push({
      field: "tags",
      message: "Metadata tags should be an array",
      code: "INVALID_TAGS"
    }), {
      valid: t.length === 0,
      errors: t,
      warnings: r
    };
  }
}
class rv {
  constructor(e) {
    this.searchIndex = {
      terms: /* @__PURE__ */ new Map(),
      documents: /* @__PURE__ */ new Map(),
      lastUpdated: /* @__PURE__ */ new Date()
    }, this.searchHistory = [], this.maxHistorySize = 20, this.config = this.createDefaultConfig(e);
  }
  /**
   * Search topics with query
   * 
   * @param query - Search query string
   * @param options - Search options
   * @returns Array of search results
   */
  search(e, t = {}) {
    if (!e || e.trim().length === 0)
      return [];
    try {
      this.addToHistory(e);
      const r = this.parseQuery(e), s = this.findMatchingDocuments(r);
      let o = this.rankResults(s, r);
      return t.category && (o = o.filter((c) => c.category === t.category)), t.limit && (o = o.slice(0, t.limit)), o;
    } catch (r) {
      throw new Error(`Search failed: ${r instanceof Error ? r.message : "Unknown error"}`);
    }
  }
  /**
   * Build search index from topics
   * 
   * @param topics - Topics to index
   * @returns Promise that resolves when index is built
   */
  async buildSearchIndex(e) {
    try {
      this.searchIndex.terms.clear(), this.searchIndex.documents.clear();
      for (const t of e)
        await this.updateSearchIndex(t.id, t);
      this.searchIndex.lastUpdated = /* @__PURE__ */ new Date();
    } catch (t) {
      throw new Error(`Failed to build search index: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
  /**
   * Update search index for a specific topic
   * 
   * @param topicId - Topic ID to update
   * @param topic - Topic to index
   * @returns Promise that resolves when index is updated
   */
  async updateSearchIndex(e, t) {
    try {
      const r = {
        id: e,
        title: t.title,
        content: t.content,
        keywords: t.keywords,
        category: t.category,
        lastModified: t.lastModified
      };
      this.searchIndex.documents.set(e, r);
      const s = this.tokenize(t.title);
      for (let o = 0; o < s.length; o++)
        this.addTermToIndex(s[o], e, o, "title");
      const a = this.tokenize(t.content);
      for (let o = 0; o < a.length; o++)
        this.addTermToIndex(a[o], e, o, "content");
      for (const o of t.keywords) {
        const c = this.tokenize(o);
        for (let u = 0; u < c.length; u++)
          this.addTermToIndex(c[u], e, u, "keywords");
      }
      this.addTermToIndex(t.category, e, 0, "category");
    } catch (r) {
      throw new Error(`Failed to update search index for topic ${e}: ${r instanceof Error ? r.message : "Unknown error"}`);
    }
  }
  /**
   * Tokenize text into search terms
   * 
   * @param text - Text to tokenize
   * @returns Array of normalized terms
   */
  tokenize(e) {
    return !e || typeof e != "string" ? [] : e.replace(/<[^>]*>/g, " ").toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).filter((r) => r.length > 0).map((r) => this.normalize(r));
  }
  /**
   * Normalize search term
   * 
   * @param term - Term to normalize
   * @returns Normalized term
   */
  normalize(e) {
    return e.toLowerCase().trim();
  }
  /**
   * Parse search query
   * 
   * @param query - Query string to parse
   * @returns Parsed query object
   */
  parseQuery(e) {
    const t = [], r = [], s = [], a = /"([^"]+)"/g;
    let o;
    for (; (o = a.exec(e)) !== null; )
      r.push(o[1]);
    const u = e.replace(a, "").split(/\s+/).filter((v) => v.length > 0);
    for (let v = 0; v < u.length; v++) {
      const p = u[v].toLowerCase();
      p === "and" || p === "&&" ? s.push({ type: "AND", operand: "", position: v }) : p === "or" || p === "||" ? s.push({ type: "OR", operand: "", position: v }) : p === "not" || p === "!" ? s.push({ type: "NOT", operand: "", position: v }) : p.startsWith("-") ? s.push({ type: "NOT", operand: p.substring(1), position: v }) : t.push(this.normalize(p));
    }
    return {
      terms: t,
      phrases: r,
      operators: s,
      fuzzy: !1,
      // TODO: Implement fuzzy matching
      caseSensitive: !1
    };
  }
  /**
   * Find documents matching the parsed query
   * 
   * @param parsedQuery - Parsed query object
   * @returns Array of matching document IDs with scores
   */
  findMatchingDocuments(e) {
    const t = /* @__PURE__ */ new Map();
    for (const r of e.terms) {
      const s = this.searchIndex.terms.get(r);
      if (s)
        for (const a of s.documents) {
          const o = t.get(a.documentId) || 0;
          t.set(a.documentId, o + a.frequency);
        }
    }
    for (const r of e.phrases) {
      const s = this.tokenize(r);
      for (const a of s) {
        const o = this.searchIndex.terms.get(a);
        if (o)
          for (const c of o.documents) {
            const u = t.get(c.documentId) || 0;
            t.set(c.documentId, u + c.frequency * 2);
          }
      }
    }
    for (const r of e.operators)
      if (r.type === "NOT" && r.operand) {
        const s = this.searchIndex.terms.get(r.operand);
        if (s)
          for (const a of s.documents)
            t.delete(a.documentId);
      }
    return Array.from(t.entries()).filter(([, r]) => r > 0).map(([r, s]) => ({ documentId: r, score: s }));
  }
  /**
   * Rank search results by relevance
   * 
   * @param matchingDocs - Documents with scores
   * @param parsedQuery - Parsed query
   * @returns Ranked search results
   */
  rankResults(e, t) {
    const r = [];
    for (const { documentId: s, score: a } of e) {
      const o = this.searchIndex.documents.get(s);
      if (!o) continue;
      const c = this.calculateMaxScore(o, t), u = c > 0 ? Math.min(a / c, 1) : 0, v = this.createSnippet(o.content, t), p = this.getMatchedTerms(o, t);
      r.push({
        topicId: s,
        title: o.title,
        snippet: v,
        relevance: u,
        matchedTerms: p,
        category: o.category,
        lastModified: o.lastModified
      });
    }
    return r.sort((s, a) => a.relevance - s.relevance);
  }
  /**
   * Calculate maximum possible score for a document
   * 
   * @param document - Document to calculate max score for
   * @param parsedQuery - Parsed query
   * @returns Maximum possible score
   */
  calculateMaxScore(e, t) {
    let r = 0;
    const s = this.tokenize(e.title);
    r += s.length * 3;
    const a = this.tokenize(e.content);
    return r += a.length, r += e.keywords.length * 2, r += 1, r;
  }
  /**
   * Create content snippet with highlighted matches
   * 
   * @param content - Content to create snippet from
   * @param parsedQuery - Parsed query
   * @returns Content snippet
   */
  createSnippet(e, t) {
    const r = e.replace(/<[^>]*>/g, " "), s = [...t.terms, ...t.phrases.flatMap((p) => this.tokenize(p))];
    let a = -1, o = "";
    for (const p of s) {
      const _ = r.toLowerCase().indexOf(p.toLowerCase());
      _ !== -1 && (a === -1 || _ < a) && (a = _, o = p);
    }
    if (a === -1)
      return r.substring(0, 200) + (r.length > 200 ? "..." : "");
    const c = Math.max(0, a - 100), u = Math.min(r.length, a + o.length + 100);
    let v = r.substring(c, u);
    return c > 0 && (v = "..." + v), u < r.length && (v = v + "..."), v;
  }
  /**
   * Get matched terms for a document
   * 
   * @param document - Document
   * @param parsedQuery - Parsed query
   * @returns Array of matched terms
   */
  getMatchedTerms(e, t) {
    const r = [], s = [...t.terms, ...t.phrases.flatMap((a) => this.tokenize(a))];
    for (const a of s)
      (e.title + " " + e.content + " " + e.keywords.join(" ")).toLowerCase().includes(a.toLowerCase()) && r.push(a);
    return r;
  }
  /**
   * Highlight matches in content
   * 
   * @param content - Content to highlight
   * @param terms - Terms to highlight
   * @returns Content with highlighted terms
   */
  highlightMatches(e, t) {
    let r = e;
    for (const s of t) {
      const a = new RegExp(`(${s})`, "gi");
      r = r.replace(a, "<mark>$1</mark>");
    }
    return r;
  }
  /**
   * Add query to search history
   * 
   * @param query - Query to add
   */
  addToHistory(e) {
    if (!e || e.trim().length === 0) return;
    const t = e.trim(), r = this.searchHistory.indexOf(t);
    r !== -1 && this.searchHistory.splice(r, 1), this.searchHistory.unshift(t), this.searchHistory.length > this.maxHistorySize && (this.searchHistory = this.searchHistory.slice(0, this.maxHistorySize));
  }
  /**
   * Get search history
   * 
   * @returns Array of recent search queries
   */
  getSearchHistory() {
    return [...this.searchHistory];
  }
  /**
   * Clear search history
   */
  clearSearchHistory() {
    this.searchHistory = [];
  }
  /**
   * Add term to search index
   * 
   * @param term - Term to add
   * @param documentId - Document ID
   * @param position - Position in document
   * @param field - Field where term appears
   */
  addTermToIndex(e, t, r, s) {
    if (!e || e.length === 0) return;
    const a = this.normalize(e);
    if (a.length === 0) return;
    let o = this.searchIndex.terms.get(a);
    o || (o = {
      term: a,
      documents: [],
      frequency: 0
    }, this.searchIndex.terms.set(a, o));
    let c = o.documents.find((u) => u.documentId === t);
    c || (c = {
      documentId: t,
      frequency: 0,
      positions: [],
      fields: []
    }, o.documents.push(c)), c.frequency++, c.positions.push(r), c.fields.includes(s) || c.fields.push(s), o.frequency++;
  }
  /**
   * Get the search index
   * 
   * @returns The current search index
   */
  getSearchIndex() {
    return this.searchIndex;
  }
  /**
   * Check if the search index is built
   * 
   * @returns True if index is built, false otherwise
   */
  isIndexBuilt() {
    return this.searchIndex.documents.size > 0;
  }
  /**
   * Execute a parsed query
   * 
   * @param parsedQuery - The parsed query to execute
   * @returns Array of search results
   */
  executeQuery(e) {
    if (!e || e.terms.length === 0)
      return [];
    const t = this.findMatchingDocuments(e);
    return this.rankResults(t, e);
  }
  /**
   * Calculate relevance score for a term match
   * 
   * @param term - The search term
   * @param text - The text to search in
   * @returns Relevance score between 0 and 1
   */
  calculateRelevance(e, t) {
    if (!e || !t) return 0;
    const r = this.normalize(e), s = this.normalize(t);
    if (s.includes(r)) {
      if (s === r) return 1;
      const a = r.length, o = s.length;
      return a / o;
    }
    return 0;
  }
  /**
   * Generate a snippet from content with highlighted terms
   * 
   * @param content - The content to generate snippet from
   * @param terms - Terms to highlight
   * @param maxLength - Maximum snippet length (default: 200)
   * @returns Generated snippet with highlighted terms
   */
  generateSnippet(e, t, r = 200) {
    if (!e || !t) return "";
    const s = this.normalize(t).split(" "), a = e.replace(/<[^>]*>/g, "").trim();
    if (a.length <= r)
      return this.highlightMatches(a, s);
    let o = -1;
    for (const p of s) {
      const _ = a.toLowerCase().indexOf(p.toLowerCase());
      _ !== -1 && (o === -1 || _ < o) && (o = _);
    }
    if (o === -1)
      return a.substring(0, r) + "...";
    const c = Math.max(0, o - Math.floor(r / 2)), u = Math.min(a.length, c + r);
    let v = a.substring(c, u);
    return c > 0 && (v = "..." + v), u < a.length && (v = v + "..."), this.highlightMatches(v, s);
  }
  /**
   * Search with advanced query
   * 
   * @param query - Advanced search query
   * @returns Promise that resolves with enhanced search results
   */
  async searchAdvanced(e) {
    try {
      return (await this.search(e.terms.join(" "), e.options)).map((r) => this.enhanceSearchResult(r, e));
    } catch (t) {
      throw new Error(`Advanced search failed: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
  /**
   * Search by category
   * 
   * @param query - Search query
   * @param category - Category to filter by
   * @returns Promise that resolves with search results
   */
  async searchByCategory(e, t) {
    return this.search(e, { category: t });
  }
  /**
   * Search by tag
   * 
   * @param query - Search query
   * @param tag - Tag to filter by
   * @returns Promise that resolves with search results
   */
  async searchByTag(e, t) {
    try {
      return (await this.search(e)).filter((s) => {
        const a = this.searchIndex.documents.get(s.topicId);
        return a && a.keywords.includes(t);
      });
    } catch (r) {
      throw new Error(`Tag search failed: ${r instanceof Error ? r.message : "Unknown error"}`);
    }
  }
  /**
   * Get search suggestions
   * 
   * @param query - Partial search query
   * @returns Promise that resolves with suggestions
   */
  async getSuggestions(e) {
    if (!e || e.length < 2)
      return [];
    try {
      const t = [], r = this.normalize(e), s = this.searchHistory.filter(
        (c) => this.normalize(c).includes(r)
      ).slice(0, 5);
      t.push(...s);
      const a = Array.from(this.searchIndex.terms.keys()).filter((c) => c.includes(r)).slice(0, 5);
      return t.push(...a), [...new Set(t)].slice(0, this.config.maxSuggestions);
    } catch (t) {
      return console.warn("Failed to get search suggestions:", t), [];
    }
  }
  /**
   * Get related topics
   * 
   * @param topicId - Topic ID to get related topics for
   * @returns Promise that resolves with related topics
   */
  async getRelatedTopics(e) {
    try {
      const t = this.searchIndex.documents.get(e);
      if (!t)
        return [];
      const r = [], s = t.keywords;
      for (const [a, o] of this.searchIndex.documents.entries()) {
        if (a === e) continue;
        const c = s.filter(
          (u) => o.keywords.includes(u)
        );
        if (c.length > 0) {
          const u = c.length / Math.max(s.length, o.keywords.length);
          r.push({
            topicId: a,
            title: o.title,
            snippet: this.createSnippet(o.content, { terms: [], phrases: [], operators: [], fuzzy: !1, caseSensitive: !1 }),
            relevance: u,
            matchedTerms: c,
            category: o.category,
            lastModified: o.lastModified
          });
        }
      }
      return r.sort((a, o) => o.relevance - a.relevance).slice(0, 5);
    } catch (t) {
      throw new Error(`Failed to get related topics: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
  /**
   * Get popular searches
   * 
   * @returns Promise that resolves with popular search queries
   */
  async getPopularSearches() {
    return this.searchHistory.slice(0, 10);
  }
  /**
   * Get search suggestions for partial query
   * 
   * @param query - Partial search query
   * @returns Array of search suggestions
   */
  getSearchSuggestions(e) {
    if (!e || e.trim().length === 0)
      return [];
    const t = [], r = e.toLowerCase();
    for (const s of this.searchHistory)
      s.toLowerCase().includes(r) && t.push(s);
    for (const s of this.searchIndex.terms.keys())
      s.toLowerCase().includes(r) && t.push(s);
    return [...new Set(t)].slice(0, 10);
  }
  /**
   * Check if search index is built
   * 
   * @returns True if index is built
   */
  isIndexed() {
    return this.searchIndex.documents.size > 0;
  }
  /**
   * Remove from search index
   * 
   * @param path - Path to remove from index
   * @returns Promise that resolves when removal is complete
   */
  async removeFromIndex(e) {
    try {
      if (!this.searchIndex.documents.get(e))
        return;
      this.searchIndex.documents.delete(e);
      for (const [r, s] of this.searchIndex.terms.entries())
        s.documents = s.documents.filter((a) => a.documentId !== e), s.documents.length === 0 && this.searchIndex.terms.delete(r);
      this.searchIndex.lastUpdated = /* @__PURE__ */ new Date();
    } catch (t) {
      throw new Error(`Failed to remove from index: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
  /**
   * Clear search index
   * 
   * @returns Promise that resolves when index is cleared
   */
  async clearIndex() {
    try {
      this.searchIndex.terms.clear(), this.searchIndex.documents.clear(), this.searchIndex.lastUpdated = /* @__PURE__ */ new Date();
    } catch (e) {
      throw new Error(`Failed to clear index: ${e instanceof Error ? e.message : "Unknown error"}`);
    }
  }
  /**
   * Rebuild search index
   * 
   * @returns Promise that resolves when index is rebuilt
   */
  async rebuildIndex() {
    try {
      const e = Array.from(this.searchIndex.documents.values());
      await this.clearIndex();
      for (const t of e) {
        const r = {
          id: t.id,
          title: t.title,
          content: t.content,
          icon: "help-icon-document",
          children: [],
          keywords: t.keywords,
          category: t.category,
          lastModified: t.lastModified,
          relatedTopics: []
        };
        await this.updateSearchIndex(t.id, r);
      }
    } catch (e) {
      throw new Error(`Failed to rebuild index: ${e instanceof Error ? e.message : "Unknown error"}`);
    }
  }
  /**
   * Get search index statistics
   * 
   * @returns Search index statistics
   */
  getIndexStats() {
    const e = this.searchIndex.terms.size, t = this.searchIndex.documents.size, r = t > 0 ? Array.from(this.searchIndex.terms.values()).reduce((s, a) => s + a.documents.length, 0) / t : 0;
    return {
      totalTerms: e,
      totalDocuments: t,
      averageTermsPerDocument: r,
      indexSize: this.calculateIndexSize(),
      buildTime: 0,
      // TODO: Track build time
      lastUpdated: this.searchIndex.lastUpdated
    };
  }
  /**
   * Set search configuration
   * 
   * @param config - Search configuration
   */
  setConfig(e) {
    this.config = { ...this.config, ...e };
  }
  /**
   * Get search configuration
   * 
   * @returns Current search configuration
   */
  getConfig() {
    return { ...this.config };
  }
  /**
   * Set stop words
   * 
   * @param words - Array of stop words
   */
  setStopWords(e) {
    this.config.stopWords = e;
  }
  /**
   * Set minimum score threshold
   * 
   * @param score - Minimum score threshold
   */
  setMinScore(e) {
    this.config.minScore = e;
  }
  /**
   * Enhance search result with additional data
   * 
   * @param result - Basic search result
   * @param query - Search query
   * @returns Enhanced search result
   */
  enhanceSearchResult(e, t) {
    const r = this.generateHighlights(e, t), s = this.createEnhancedSnippet(e, t), a = this.getMatchedTermsFromQuery(e, t);
    return {
      ...e,
      topic: this.createTopicFromResult(e),
      highlights: r,
      snippet: s,
      matchedTerms: a
    };
  }
  /**
   * Generate search highlights
   * 
   * @param result - Search result
   * @param query - Search query
   * @returns Array of search highlights
   */
  generateHighlights(e, t) {
    const r = [], s = [...t.terms, ...t.filters.map((a) => a.value)];
    for (const a of s) {
      const o = e.title.toLowerCase().indexOf(a.toLowerCase());
      o !== -1 && r.push({
        start: o,
        end: o + a.length,
        type: "title",
        term: a
      });
      const c = e.snippet.toLowerCase().indexOf(a.toLowerCase());
      c !== -1 && r.push({
        start: c,
        end: c + a.length,
        type: "content",
        term: a
      });
    }
    return r;
  }
  /**
   * Create enhanced snippet
   * 
   * @param result - Search result
   * @param query - Search query
   * @returns Enhanced snippet
   */
  createEnhancedSnippet(e, t) {
    const r = this.searchIndex.documents.get(e.topicId);
    if (!r)
      return e.snippet;
    const s = [...t.terms, ...t.filters.map((a) => a.value)];
    return this.generateSnippet(r.content, s.join(" "), 300);
  }
  /**
   * Get matched terms from query
   * 
   * @param result - Search result
   * @param query - Search query
   * @returns Array of matched terms
   */
  getMatchedTermsFromQuery(e, t) {
    const r = [], s = [...t.terms, ...t.filters.map((a) => a.value)];
    for (const a of s) {
      const o = this.searchIndex.documents.get(e.topicId);
      o && (o.title + " " + o.content).toLowerCase().includes(a.toLowerCase()) && r.push(a);
    }
    return r;
  }
  /**
   * Create topic from search result
   * 
   * @param result - Search result
   * @returns Help topic
   */
  createTopicFromResult(e) {
    const t = this.searchIndex.documents.get(e.topicId);
    if (!t)
      throw new Error(`Document not found for topic ID: ${e.topicId}`);
    return {
      id: t.id,
      title: t.title,
      content: t.content,
      icon: "help-icon-document",
      children: [],
      keywords: t.keywords,
      category: t.category,
      lastModified: t.lastModified,
      relatedTopics: []
    };
  }
  /**
   * Calculate index size in bytes
   * 
   * @returns Index size in bytes
   */
  calculateIndexSize() {
    let e = 0;
    for (const [t, r] of this.searchIndex.terms.entries())
      e += t.length * 2, e += r.documents.length * 50;
    for (const [t, r] of this.searchIndex.documents.entries())
      e += t.length * 2, e += r.title.length * 2, e += r.content.length * 2, e += r.keywords.length * 20;
    return e;
  }
  /**
   * Create default search configuration
   * 
   * @param overrides - Configuration overrides
   * @returns Default search configuration
   */
  createDefaultConfig(e) {
    return { ...{
      maxResults: 50,
      minScore: 0.1,
      enableFuzzy: !0,
      fuzzyThreshold: 0.8,
      enableStemming: !0,
      stopWords: ["the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by"],
      enableSuggestions: !0,
      maxSuggestions: 10
    }, ...e };
  }
}
class iv {
  constructor() {
    this.bookmarks = /* @__PURE__ */ new Map(), this.storageKey = "abu-help-bookmarks", this.maxBookmarks = 1e3;
  }
  /**
   * Add a bookmark for a topic
   * 
   * @param topicId - Topic ID to bookmark
   * @param title - Optional bookmark title
   * @returns Promise that resolves with the created bookmark
   * @throws Error if bookmark creation fails
   */
  async addBookmark(e, t) {
    if (!e || typeof e != "string")
      throw new Error("Topic ID is required and must be a string");
    if (this.bookmarks.has(e))
      throw new Error(`Bookmark already exists for topic: ${e}`);
    if (this.bookmarks.size >= this.maxBookmarks)
      throw new Error(`Maximum number of bookmarks (${this.maxBookmarks}) reached`);
    try {
      const r = {
        id: this.generateBookmarkId(),
        topicId: e,
        title: t || `Bookmark for ${e}`,
        dateAdded: /* @__PURE__ */ new Date(),
        category: "general",
        notes: "",
        tags: []
      };
      return this.bookmarks.set(e, r), await this.saveBookmarks(), r;
    } catch (r) {
      throw new Error(`Failed to add bookmark: ${r instanceof Error ? r.message : "Unknown error"}`);
    }
  }
  /**
   * Remove a bookmark
   * 
   * @param topicId - Topic ID to remove bookmark for
   * @returns Promise that resolves when bookmark is removed
   * @throws Error if bookmark removal fails
   */
  async removeBookmark(e) {
    if (!e || typeof e != "string")
      throw new Error("Topic ID is required and must be a string");
    if (!this.bookmarks.get(e))
      throw new Error(`Bookmark not found for topic: ${e}`);
    try {
      this.bookmarks.delete(e), await this.saveBookmarks();
    } catch (r) {
      throw new Error(`Failed to remove bookmark: ${r instanceof Error ? r.message : "Unknown error"}`);
    }
  }
  /**
   * Get all bookmarks
   * 
   * @returns Array of all bookmarks
   */
  getBookmarks() {
    return Array.from(this.bookmarks.values());
  }
  /**
   * Get a specific bookmark by topic ID
   * 
   * @param topicId - Topic ID to get bookmark for
   * @returns Bookmark or null if not found
   */
  getBookmark(e) {
    return this.bookmarks.get(e) || null;
  }
  /**
   * Check if a topic is bookmarked
   * 
   * @param topicId - Topic ID to check
   * @returns True if topic is bookmarked
   */
  isBookmarked(e) {
    return this.bookmarks.has(e);
  }
  /**
   * Update a bookmark
   * 
   * @param bookmarkId - Bookmark ID to update
   * @param updates - Updates to apply
   * @returns Promise that resolves when bookmark is updated
   * @throws Error if bookmark update fails
   */
  async updateBookmark(e, t) {
    if (!e || typeof e != "string")
      throw new Error("Bookmark ID is required and must be a string");
    let r;
    for (const s of this.bookmarks.values())
      if (s.id === e) {
        r = s;
        break;
      }
    if (!r)
      throw new Error(`Bookmark not found: ${e}`);
    try {
      const s = { ...r, ...t };
      if (t.title !== void 0 && (!t.title || typeof t.title != "string"))
        throw new Error("Bookmark title must be a non-empty string");
      if (t.category !== void 0 && (!t.category || typeof t.category != "string"))
        throw new Error("Bookmark category must be a non-empty string");
      if (t.notes !== void 0 && typeof t.notes != "string")
        throw new Error("Bookmark notes must be a string");
      if (t.tags !== void 0 && (!Array.isArray(t.tags) || !t.tags.every((a) => typeof a == "string")))
        throw new Error("Bookmark tags must be an array of strings");
      this.bookmarks.set(r.topicId, s), await this.saveBookmarks();
    } catch (s) {
      throw new Error(`Failed to update bookmark: ${s instanceof Error ? s.message : "Unknown error"}`);
    }
  }
  /**
   * Organize bookmarks
   * 
   * @param organization - Organization configuration
   * @returns Promise that resolves when bookmarks are organized
   * @throws Error if organization fails
   */
  async organizeBookmarks(e) {
    try {
      for (const r of e.categories)
        for (const s of r.bookmarks) {
          const a = this.getBookmarkById(s);
          a && (a.category = r.name, this.bookmarks.set(a.topicId, a));
        }
      const t = this.sortBookmarks(e.sortBy, e.sortOrder);
      this.bookmarks.clear();
      for (const r of t)
        this.bookmarks.set(r.topicId, r);
      await this.saveBookmarks();
    } catch (t) {
      throw new Error(`Failed to organize bookmarks: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
  /**
   * Save bookmarks to localStorage
   * 
   * @returns Promise that resolves when bookmarks are saved
   * @throws Error if saving fails
   */
  async saveBookmarks() {
    try {
      const e = Array.from(this.bookmarks.values()), t = JSON.stringify(e, this.dateReplacer);
      typeof localStorage < "u" && localStorage.setItem(this.storageKey, t);
    } catch (e) {
      throw new Error(`Failed to save bookmarks: ${e instanceof Error ? e.message : "Unknown error"}`);
    }
  }
  /**
   * Load bookmarks from localStorage
   * 
   * @returns Promise that resolves when bookmarks are loaded
   * @throws Error if loading fails
   */
  async loadBookmarks() {
    try {
      if (typeof localStorage > "u")
        return;
      const e = localStorage.getItem(this.storageKey);
      if (!e)
        return;
      const t = JSON.parse(e, this.dateReviver);
      this.bookmarks.clear();
      for (const r of t)
        this.validateBookmark(r) && this.bookmarks.set(r.topicId, r);
    } catch (e) {
      throw this.bookmarks.clear(), typeof localStorage < "u" && localStorage.removeItem(this.storageKey), new Error(`Failed to load bookmarks: ${e instanceof Error ? e.message : "Unknown error"}`);
    }
  }
  /**
   * Export bookmarks to JSON string
   * 
   * @returns Promise that resolves with exported bookmarks JSON
   */
  async exportBookmarks() {
    try {
      const e = Array.from(this.bookmarks.values());
      return JSON.stringify(e, this.dateReplacer, 2);
    } catch (e) {
      throw new Error(`Failed to export bookmarks: ${e instanceof Error ? e.message : "Unknown error"}`);
    }
  }
  /**
   * Import bookmarks from JSON string
   * 
   * @param data - JSON string containing bookmarks
   * @returns Promise that resolves when bookmarks are imported
   * @throws Error if import fails
   */
  async importBookmarks(e) {
    if (!e || typeof e != "string")
      throw new Error("Import data must be a non-empty string");
    try {
      const t = JSON.parse(e, this.dateReviver);
      if (!Array.isArray(t))
        throw new Error("Import data must be an array of bookmarks");
      const r = [];
      for (const s of t)
        this.validateBookmark(s) && r.push(s);
      if (this.bookmarks.size + r.length > this.maxBookmarks)
        throw new Error(`Import would exceed maximum bookmark limit of ${this.maxBookmarks}`);
      for (const s of r)
        this.bookmarks.set(s.topicId, s);
      await this.saveBookmarks();
    } catch (t) {
      throw new Error(`Failed to import bookmarks: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
  /**
   * Get bookmarks by category
   * 
   * @param category - Category to filter by
   * @returns Array of bookmarks in category
   */
  getBookmarksByCategory(e) {
    return Array.from(this.bookmarks.values()).filter((t) => t.category === e);
  }
  /**
   * Get bookmark categories
   * 
   * @returns Array of unique categories
   */
  getCategories() {
    const e = /* @__PURE__ */ new Set();
    for (const t of this.bookmarks.values())
      t.category && e.add(t.category);
    return Array.from(e).sort();
  }
  /**
   * Search bookmarks
   * 
   * @param query - Search query
   * @returns Array of matching bookmarks
   */
  searchBookmarks(e) {
    if (!e || e.trim().length === 0)
      return this.getBookmarks();
    const t = e.toLowerCase().trim();
    return Array.from(this.bookmarks.values()).filter(
      (r) => r.title.toLowerCase().includes(t) || r.topicId.toLowerCase().includes(t) || r.notes && r.notes.toLowerCase().includes(t) || r.tags && r.tags.some((s) => s.toLowerCase().includes(t)) || r.category && r.category.toLowerCase().includes(t)
    );
  }
  /**
   * Get bookmark statistics
   * 
   * @returns Bookmark statistics
   */
  getBookmarkStats() {
    const e = Array.from(this.bookmarks.values()), t = {};
    let r = null, s = null;
    for (const a of e) {
      const o = a.category || "uncategorized";
      t[o] = (t[o] || 0) + 1, (!r || a.dateAdded < r) && (r = a.dateAdded), (!s || a.dateAdded > s) && (s = a.dateAdded);
    }
    return {
      total: e.length,
      byCategory: t,
      oldest: r,
      newest: s
    };
  }
  /**
   * Clear all bookmarks
   * 
   * @returns Promise that resolves when bookmarks are cleared
   */
  async clearAllBookmarks() {
    try {
      this.bookmarks.clear(), await this.saveBookmarks();
    } catch (e) {
      throw new Error(`Failed to clear bookmarks: ${e instanceof Error ? e.message : "Unknown error"}`);
    }
  }
  /**
   * Generate unique bookmark ID
   * 
   * @returns Unique bookmark ID
   */
  generateBookmarkId() {
    return `bookmark_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  /**
   * Get bookmark by ID
   * 
   * @param bookmarkId - Bookmark ID
   * @returns Bookmark or null if not found
   */
  getBookmarkById(e) {
    for (const t of this.bookmarks.values())
      if (t.id === e)
        return t;
    return null;
  }
  /**
   * Sort bookmarks
   * 
   * @param sortBy - Sort field
   * @param sortOrder - Sort order
   * @returns Sorted bookmarks array
   */
  sortBookmarks(e, t) {
    return Array.from(this.bookmarks.values()).sort((s, a) => {
      let o = 0;
      switch (e) {
        case "title":
          o = s.title.localeCompare(a.title);
          break;
        case "dateAdded":
          o = s.dateAdded.getTime() - a.dateAdded.getTime();
          break;
        case "category":
          o = (s.category || "").localeCompare(a.category || "");
          break;
      }
      return t === "desc" ? -o : o;
    });
  }
  /**
   * Validate bookmark
   * 
   * @param bookmark - Bookmark to validate
   * @returns True if bookmark is valid
   */
  validateBookmark(e) {
    return e && typeof e == "object" && typeof e.id == "string" && typeof e.topicId == "string" && typeof e.title == "string" && e.dateAdded instanceof Date && (e.category === void 0 || typeof e.category == "string") && (e.notes === void 0 || typeof e.notes == "string") && (e.tags === void 0 || Array.isArray(e.tags) && e.tags.every((t) => typeof t == "string"));
  }
  /**
   * Date replacer for JSON serialization
   * 
   * @param key - JSON key
   * @param value - JSON value
   * @returns Serialized value
   */
  dateReplacer(e, t) {
    return t instanceof Date ? { __type: "Date", value: t.toISOString() } : t;
  }
  /**
   * Date reviver for JSON deserialization
   * 
   * @param key - JSON key
   * @param value - JSON value
   * @returns Deserialized value
   */
  dateReviver(e, t) {
    return t && typeof t == "object" && t.__type === "Date" ? new Date(t.value) : t;
  }
}
class sv {
  constructor() {
    this.history = [], this.currentIndex = -1, this.storageKey = "abu-help-history", this.maxHistorySize = 1e3, this.visitCounts = /* @__PURE__ */ new Map(), this.visitTimestamps = /* @__PURE__ */ new Map();
  }
  /**
   * Navigate to a topic
   * 
   * @param topicId - Topic ID to navigate to
   */
  navigateTo(e) {
    if (!e || typeof e != "string")
      throw new Error("Topic ID is required and must be a string");
    if (this.currentIndex < this.history.length - 1 && (this.history = this.history.slice(0, this.currentIndex + 1)), this.history.push(e), this.currentIndex = this.history.length - 1, this.history.length > this.maxHistorySize) {
      const t = this.history.shift();
      t && this.removeTopicFromStats(t), this.currentIndex--;
    }
    this.updateVisitStats(e);
  }
  /**
   * Go back in history
   * 
   * @returns Previous topic ID or null if no history
   */
  goBack() {
    return this.canGoBack() ? (this.currentIndex--, this.history[this.currentIndex]) : null;
  }
  /**
   * Go forward in history
   * 
   * @returns Next topic ID or null if no forward history
   */
  goForward() {
    return this.canGoForward() ? (this.currentIndex++, this.history[this.currentIndex]) : null;
  }
  /**
   * Get navigation history
   * 
   * @returns Array of topic IDs in history
   */
  getHistory() {
    return [...this.history];
  }
  /**
   * Get current history index
   * 
   * @returns Current index in history
   */
  getCurrentIndex() {
    return this.currentIndex;
  }
  /**
   * Check if can go back
   * 
   * @returns True if can go back
   */
  canGoBack() {
    return this.currentIndex > 0;
  }
  /**
   * Check if can go forward
   * 
   * @returns True if can go forward
   */
  canGoForward() {
    return this.currentIndex < this.history.length - 1;
  }
  /**
   * Clear navigation history
   */
  clearHistory() {
    this.history = [], this.currentIndex = -1, this.visitCounts.clear(), this.visitTimestamps.clear();
  }
  /**
   * Remove topic from history
   * 
   * @param topicId - Topic ID to remove
   */
  removeFromHistory(e) {
    const t = this.history.indexOf(e);
    t !== -1 && (this.history.splice(t, 1), t <= this.currentIndex && this.currentIndex--, this.removeTopicFromStats(e));
  }
  /**
   * Get history entry by index
   * 
   * @param index - History index
   * @returns Topic ID or null if index is invalid
   */
  getHistoryEntry(e) {
    return e < 0 || e >= this.history.length ? null : this.history[e];
  }
  /**
   * Save history to localStorage
   */
  saveHistory() {
    try {
      if (typeof localStorage > "u")
        return;
      const e = {
        history: this.history,
        currentIndex: this.currentIndex,
        visitCounts: Array.from(this.visitCounts.entries()),
        visitTimestamps: Array.from(this.visitTimestamps.entries()).map(([t, r]) => [
          t,
          r.map((s) => s.toISOString())
        ])
      };
      localStorage.setItem(this.storageKey, JSON.stringify(e));
    } catch (e) {
      console.warn("Failed to save history:", e);
    }
  }
  /**
   * Load history from localStorage
   */
  loadHistory() {
    try {
      if (typeof localStorage > "u")
        return;
      const e = localStorage.getItem(this.storageKey);
      if (!e)
        return;
      const t = JSON.parse(e);
      t.history && Array.isArray(t.history) && (this.history = t.history, this.currentIndex = typeof t.currentIndex == "number" ? t.currentIndex : -1, (this.currentIndex < -1 || this.currentIndex >= this.history.length) && (this.currentIndex = this.history.length - 1)), t.visitCounts && Array.isArray(t.visitCounts) && (this.visitCounts = new Map(t.visitCounts)), t.visitTimestamps && Array.isArray(t.visitTimestamps) && (this.visitTimestamps = new Map(
        t.visitTimestamps.map(([r, s]) => [
          r,
          s.map((a) => new Date(a))
        ])
      ));
    } catch (e) {
      console.warn("Failed to load history:", e), this.history = [], this.currentIndex = -1, this.visitCounts.clear(), this.visitTimestamps.clear();
    }
  }
  /**
   * Get most visited topics
   * 
   * @returns Array of topic IDs sorted by visit count
   */
  getMostVisited() {
    return Array.from(this.visitCounts.entries()).sort(([, t], [, r]) => r - t).map(([t]) => t);
  }
  /**
   * Get recent topics
   * 
   * @param count - Number of recent topics to return
   * @returns Array of recent topic IDs
   */
  getRecentTopics(e = 10) {
    const t = [], r = /* @__PURE__ */ new Set();
    for (let s = this.history.length - 1; s >= 0 && t.length < e; s--) {
      const a = this.history[s];
      r.has(a) || (t.push(a), r.add(a));
    }
    return t;
  }
  /**
   * Get history statistics
   * 
   * @returns History statistics
   */
  getHistoryStats() {
    const e = Array.from(this.visitCounts.values()).reduce((o, c) => o + c, 0), t = this.visitCounts.size, r = Array.from(this.visitCounts.entries()).sort(([, o], [, c]) => c - o).slice(0, 10).map(([o, c]) => ({ topicId: o, count: c }));
    let s = 0;
    if (this.visitTimestamps.size > 0) {
      const o = Array.from(this.visitTimestamps.values()).flat();
      if (o.length > 1) {
        const c = o.sort((v, p) => v.getTime() - p.getTime());
        s = (c[c.length - 1].getTime() - c[0].getTime()) / (c.length - 1);
      }
    }
    let a = null;
    for (const o of this.visitTimestamps.values())
      for (const c of o)
        (!a || c > a) && (a = c);
    return {
      totalVisits: e,
      uniqueTopics: t,
      mostVisited: r,
      averageSessionLength: s,
      lastVisit: a || /* @__PURE__ */ new Date()
    };
  }
  /**
   * Get visit count for a topic
   * 
   * @param topicId - Topic ID
   * @returns Visit count
   */
  getVisitCount(e) {
    return this.visitCounts.get(e) || 0;
  }
  /**
   * Get visit timestamps for a topic
   * 
   * @param topicId - Topic ID
   * @returns Array of visit timestamps
   */
  getVisitTimestamps(e) {
    return this.visitTimestamps.get(e) || [];
  }
  /**
   * Get topics visited today
   * 
   * @returns Array of topic IDs visited today
   */
  getTopicsVisitedToday() {
    const e = /* @__PURE__ */ new Date();
    e.setHours(0, 0, 0, 0);
    const t = [];
    for (const [r, s] of this.visitTimestamps.entries())
      s.some((o) => o >= e) && t.push(r);
    return t;
  }
  /**
   * Get topics visited this week
   * 
   * @returns Array of topic IDs visited this week
   */
  getTopicsVisitedThisWeek() {
    const e = /* @__PURE__ */ new Date();
    e.setDate(e.getDate() - 7);
    const t = [];
    for (const [r, s] of this.visitTimestamps.entries())
      s.some((o) => o >= e) && t.push(r);
    return t;
  }
  /**
   * Clear old history entries
   * 
   * @param daysOld - Number of days old to consider for removal
   */
  clearOldHistory(e = 30) {
    const t = /* @__PURE__ */ new Date();
    t.setDate(t.getDate() - e);
    for (const [r, s] of this.visitTimestamps.entries()) {
      const a = s.filter((o) => o >= t);
      a.length === 0 ? (this.visitTimestamps.delete(r), this.visitCounts.delete(r)) : (this.visitTimestamps.set(r, a), this.visitCounts.set(r, a.length));
    }
  }
  /**
   * Update visit statistics for a topic
   * 
   * @param topicId - Topic ID
   */
  updateVisitStats(e) {
    const t = this.visitCounts.get(e) || 0;
    this.visitCounts.set(e, t + 1);
    const r = this.visitTimestamps.get(e) || [];
    r.push(/* @__PURE__ */ new Date()), this.visitTimestamps.set(e, r);
  }
  /**
   * Remove topic from statistics
   * 
   * @param topicId - Topic ID
   */
  removeTopicFromStats(e) {
    this.visitCounts.delete(e), this.visitTimestamps.delete(e);
  }
  /**
   * Get current topic
   * 
   * @returns Current topic ID or null if no current topic
   */
  getCurrentTopic() {
    return this.currentIndex >= 0 && this.currentIndex < this.history.length ? this.history[this.currentIndex] : null;
  }
  /**
   * Get history length
   * 
   * @returns Number of entries in history
   */
  getHistoryLength() {
    return this.history.length;
  }
  /**
   * Check if history is empty
   * 
   * @returns True if history is empty
   */
  isHistoryEmpty() {
    return this.history.length === 0;
  }
}
class Za {
  constructor(e) {
    this.eventListeners = /* @__PURE__ */ new Map(), this.storageKey = "abu-help-system-state", this.isInitialized = !1, this.contentManager = new nv(), this.searchEngine = new rv(), this.bookmarkManager = new iv(), this.historyManager = new sv(), this.config = this.createDefaultConfig(e), this.state = this.createDefaultState();
  }
  /**
   * Initialize the help system
   * 
   * @returns Promise that resolves when initialization is complete
   * @throws Error if initialization fails
   */
  async initialize() {
    if (!this.isInitialized)
      try {
        await this.contentManager.loadContent();
        const e = this.contentManager.getAllTopics();
        await this.searchEngine.buildSearchIndex(e), await this.bookmarkManager.loadBookmarks(), this.historyManager.loadHistory(), this.loadState(), this.isInitialized = !0, this.emit("state:changed", this.state);
      } catch (e) {
        throw new Error(`Failed to initialize help system: ${e instanceof Error ? e.message : "Unknown error"}`);
      }
  }
  /**
   * Navigate to a topic
   * 
   * @param topicId - Topic ID to navigate to
   * @returns Promise that resolves when navigation is complete
   * @throws Error if navigation fails
   */
  async navigateTo(e) {
    this.isInitialized || await this.initialize();
    try {
      const t = await this.contentManager.loadTopic(e);
      this.historyManager.navigateTo(e), this.state.currentTopic = e, this.state.history = this.historyManager.getHistory(), this.saveState(), this.emit("topic:changed", { topicId: e, topic: t }), this.emit("history:updated", this.state.history), this.emit("state:changed", this.state);
    } catch (t) {
      throw this.emit("error:occurred", { error: t, context: "navigateTo" }), new Error(`Failed to navigate to topic ${e}: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
  /**
   * Go back in history
   * 
   * @returns Promise that resolves when navigation is complete
   * @throws Error if navigation fails
   */
  async goBack() {
    this.isInitialized || await this.initialize();
    try {
      const e = this.historyManager.goBack();
      e && await this.navigateTo(e);
    } catch (e) {
      throw this.emit("error:occurred", { error: e, context: "goBack" }), new Error(`Failed to go back: ${e instanceof Error ? e.message : "Unknown error"}`);
    }
  }
  /**
   * Go forward in history
   * 
   * @returns Promise that resolves when navigation is complete
   * @throws Error if navigation fails
   */
  async goForward() {
    this.isInitialized || await this.initialize();
    try {
      const e = this.historyManager.goForward();
      e && await this.navigateTo(e);
    } catch (e) {
      throw this.emit("error:occurred", { error: e, context: "goForward" }), new Error(`Failed to go forward: ${e instanceof Error ? e.message : "Unknown error"}`);
    }
  }
  /**
   * Go to home topic
   * 
   * @returns Promise that resolves when navigation is complete
   * @throws Error if navigation fails
   */
  async goHome() {
    this.isInitialized || await this.initialize();
    try {
      await this.navigateTo("getting-started");
    } catch (e) {
      throw this.emit("error:occurred", { error: e, context: "goHome" }), new Error(`Failed to go home: ${e instanceof Error ? e.message : "Unknown error"}`);
    }
  }
  /**
   * Search topics
   * 
   * @param query - Search query
   * @returns Promise that resolves with search results
   * @throws Error if search fails
   */
  async search(e) {
    this.isInitialized || await this.initialize();
    try {
      const t = await this.searchEngine.search(e);
      return this.state.searchQuery = e, this.state.searchResults = t, this.saveState(), this.emit("search:performed", { query: e, results: t }), this.emit("state:changed", this.state), t;
    } catch (t) {
      throw this.emit("error:occurred", { error: t, context: "search" }), new Error(`Search failed: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
  /**
   * Get search history
   * 
   * @returns Array of recent search queries
   */
  getSearchHistory() {
    return this.searchEngine.getSearchHistory();
  }
  /**
   * Add bookmark
   * 
   * @param topicId - Topic ID to bookmark
   * @param title - Optional bookmark title
   * @returns Promise that resolves when bookmark is added
   * @throws Error if bookmark addition fails
   */
  async addBookmark(e, t) {
    this.isInitialized || await this.initialize();
    try {
      const r = await this.bookmarkManager.addBookmark(e, t);
      this.state.bookmarks = this.bookmarkManager.getBookmarks(), this.saveState(), this.emit("bookmark:added", { bookmark: r }), this.emit("state:changed", this.state);
    } catch (r) {
      throw this.emit("error:occurred", { error: r, context: "addBookmark" }), new Error(`Failed to add bookmark: ${r instanceof Error ? r.message : "Unknown error"}`);
    }
  }
  /**
   * Remove bookmark
   * 
   * @param topicId - Topic ID to remove bookmark for
   * @returns Promise that resolves when bookmark is removed
   * @throws Error if bookmark removal fails
   */
  async removeBookmark(e) {
    this.isInitialized || await this.initialize();
    try {
      await this.bookmarkManager.removeBookmark(e), this.state.bookmarks = this.bookmarkManager.getBookmarks(), this.saveState(), this.emit("bookmark:removed", { topicId: e }), this.emit("state:changed", this.state);
    } catch (t) {
      throw this.emit("error:occurred", { error: t, context: "removeBookmark" }), new Error(`Failed to remove bookmark: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
  /**
   * Get bookmarks
   * 
   * @returns Array of all bookmarks
   */
  getBookmarks() {
    return this.bookmarkManager.getBookmarks();
  }
  /**
   * Check if topic is bookmarked
   * 
   * @param topicId - Topic ID to check
   * @returns True if topic is bookmarked
   */
  isBookmarked(e) {
    return this.bookmarkManager.isBookmarked(e);
  }
  /**
   * Get navigation history
   * 
   * @returns Array of topic IDs in history
   */
  getHistory() {
    return this.historyManager.getHistory();
  }
  /**
   * Clear navigation history
   */
  clearHistory() {
    this.historyManager.clearHistory(), this.state.history = [], this.saveState(), this.emit("history:updated", this.state.history), this.emit("state:changed", this.state);
  }
  /**
   * Get topic by ID
   * 
   * @param topicId - Topic ID
   * @returns Topic or null if not found
   */
  getTopic(e) {
    return this.contentManager.getTopic(e);
  }
  /**
   * Get topic tree
   * 
   * @returns Hierarchical topic tree
   */
  getTopicTree() {
    return this.contentManager.getAllTopics();
  }
  /**
   * Get related topics
   * 
   * @param topicId - Topic ID to get related topics for
   * @returns Array of related topics
   */
  getRelatedTopics(e) {
    return this.contentManager.getRelatedTopics(e);
  }
  /**
   * Get current system state
   * 
   * @returns Current system state
   */
  getState() {
    return { ...this.state };
  }
  /**
   * Save system state to localStorage
   */
  saveState() {
    try {
      if (typeof localStorage > "u")
        return;
      const e = JSON.stringify(this.state, this.dateReplacer);
      localStorage.setItem(this.storageKey, e);
    } catch (e) {
      console.warn("Failed to save help system state:", e);
    }
  }
  /**
   * Load system state from localStorage
   */
  loadState() {
    try {
      if (typeof localStorage > "u")
        return;
      const e = localStorage.getItem(this.storageKey);
      if (!e)
        return;
      const t = JSON.parse(e, this.dateReviver);
      this.validateState(t) && (this.state = { ...this.state, ...t });
    } catch (e) {
      console.warn("Failed to load help system state:", e);
    }
  }
  /**
   * Reset system state to defaults
   */
  resetState() {
    this.state = this.createDefaultState(), this.saveState(), this.emit("state:changed", this.state);
  }
  /**
   * Set active tab
   * 
   * @param tab - Tab to set as active
   */
  setActiveTab(e) {
    this.state.activeTab = e, this.saveState(), this.emit("state:changed", this.state);
  }
  /**
   * Set window state
   * 
   * @param windowState - Window state to set
   */
  setWindowState(e) {
    this.state.windowState = { ...this.state.windowState, ...e }, this.saveState(), this.emit("state:changed", this.state);
  }
  /**
   * Set user preferences
   * 
   * @param preferences - User preferences to set
   */
  setUserPreferences(e) {
    this.state.userPreferences = { ...this.state.userPreferences, ...e }, this.saveState(), this.emit("state:changed", this.state);
  }
  /**
   * Add event listener
   * 
   * @param event - Event name
   * @param callback - Event handler
   * @returns Unsubscribe function
   */
  on(e, t) {
    return this.eventListeners.has(e) || this.eventListeners.set(e, /* @__PURE__ */ new Set()), this.eventListeners.get(e).add(t), () => {
      const r = this.eventListeners.get(e);
      r && (r.delete(t), r.size === 0 && this.eventListeners.delete(e));
    };
  }
  /**
   * Remove event listener
   * 
   * @param event - Event name
   * @param callback - Event handler
   */
  off(e, t) {
    const r = this.eventListeners.get(e);
    r && (r.delete(t), r.size === 0 && this.eventListeners.delete(e));
  }
  /**
   * Emit event
   * 
   * @param event - Event name
   * @param data - Event data
   */
  emit(e, t) {
    const r = this.eventListeners.get(e);
    if (r)
      for (const s of r)
        try {
          s(t);
        } catch (a) {
          console.error(`Error in event listener for ${e}:`, a);
        }
  }
  /**
   * Create default system state
   * 
   * @returns Default system state
   */
  createDefaultState() {
    return {
      currentTopic: null,
      activeTab: "contents",
      searchQuery: "",
      searchResults: [],
      bookmarks: [],
      history: [],
      windowState: {
        position: { x: 100, y: 100 },
        size: { width: 800, height: 600 },
        splitterPosition: 250,
        maximized: !1
      },
      userPreferences: {
        fontSize: "medium",
        theme: "windows98",
        language: "en",
        accessibility: {
          highContrast: !1,
          reducedMotion: !1,
          screenReader: !1,
          keyboardNavigation: !0
        }
      }
    };
  }
  /**
   * Validate loaded state
   * 
   * @param state - State to validate
   * @returns True if state is valid
   */
  validateState(e) {
    if (!e || typeof e != "object")
      return !1;
    const t = ["activeTab", "searchQuery", "searchResults", "bookmarks", "history", "windowState", "userPreferences"];
    for (const r of t)
      if (!(r in e))
        return !1;
    return !(!["contents", "index", "search", "favorites", "history"].includes(e.activeTab) || !Array.isArray(e.searchResults) || !Array.isArray(e.bookmarks) || !Array.isArray(e.history));
  }
  /**
   * Date replacer for JSON serialization
   * 
   * @param key - JSON key
   * @param value - JSON value
   * @returns Serialized value
   */
  dateReplacer(e, t) {
    return t instanceof Date ? { __type: "Date", value: t.toISOString() } : t;
  }
  /**
   * Date reviver for JSON deserialization
   * 
   * @param key - JSON key
   * @param value - JSON value
   * @returns Deserialized value
   */
  dateReviver(e, t) {
    return t && typeof t == "object" && t.__type === "Date" ? new Date(t.value) : t;
  }
  /**
   * Get initialization status
   * 
   * @returns True if system is initialized
   */
  isSystemInitialized() {
    return this.isInitialized;
  }
  /**
   * Get system statistics
   * 
   * @returns System statistics
   */
  getSystemStats() {
    return {
      totalTopics: this.contentManager.getAllTopics().length,
      totalCategories: this.getCategories().length,
      totalBookmarks: this.bookmarkManager.getBookmarks().length,
      historySize: this.historyManager.getHistory().length,
      cacheSize: 0,
      // TODO: Implement cache size tracking
      lastUpdated: /* @__PURE__ */ new Date(),
      uptime: Date.now() - this.state.startTime || 0
    };
  }
  /**
   * Get system configuration
   * 
   * @returns Current configuration
   */
  getConfig() {
    return { ...this.config };
  }
  /**
   * Update system configuration
   * 
   * @param config - Configuration updates
   */
  async updateConfig(e) {
    this.config = { ...this.config, ...e }, this.saveState(), this.emit("configChanged", this.config);
  }
  /**
   * Reset configuration to defaults
   */
  async resetConfig() {
    this.config = this.createDefaultConfig(), this.saveState(), this.emit("configChanged", this.config);
  }
  /**
   * Get categories
   * 
   * @returns Array of categories
   */
  getCategories() {
    const e = this.contentManager.getAllTopics(), t = new Set(e.map((r) => r.category));
    return Array.from(t);
  }
  /**
   * Get topics by category
   * 
   * @param category - Category to filter by
   * @returns Array of topics in category
   */
  getTopicsByCategory(e) {
    return this.contentManager.getAllTopics().filter((t) => t.category === e);
  }
  /**
   * Get all topics
   * 
   * @returns Array of all topics
   */
  getAllTopics() {
    return this.contentManager.getAllTopics();
  }
  /**
   * Search with options
   * 
   * @param query - Search query
   * @param options - Search options
   * @returns Promise that resolves with search results
   */
  async searchWithOptions(e, t) {
    this.isInitialized || await this.initialize();
    try {
      const r = await this.searchEngine.search(e, t);
      return this.state.searchQuery = e, this.state.searchResults = r, this.saveState(), this.emit("search:performed", { query: e, results: r }), this.emit("state:changed", this.state), r;
    } catch (r) {
      throw this.emit("error:occurred", { error: r, context: "searchWithOptions" }), new Error(`Search failed: ${r instanceof Error ? r.message : "Unknown error"}`);
    }
  }
  /**
   * Get search suggestions
   * 
   * @param query - Partial search query
   * @returns Array of search suggestions
   */
  async getSearchSuggestions(e) {
    this.isInitialized || await this.initialize();
    try {
      return await this.searchEngine.getSuggestions(e);
    } catch (t) {
      return this.emit("error:occurred", { error: t, context: "getSearchSuggestions" }), [];
    }
  }
  /**
   * Clear search history
   */
  async clearSearchHistory() {
    this.searchEngine.clearSearchHistory(), this.emit("searchHistory:cleared");
  }
  /**
   * Check if can go back
   * 
   * @returns True if can go back
   */
  canGoBack() {
    return this.historyManager.canGoBack();
  }
  /**
   * Check if can go forward
   * 
   * @returns True if can go forward
   */
  canGoForward() {
    return this.historyManager.canGoForward();
  }
  /**
   * Get navigation history
   * 
   * @returns Navigation history
   */
  getNavigationHistory() {
    return {
      topics: this.historyManager.getHistory(),
      currentIndex: this.historyManager.getCurrentIndex(),
      maxSize: this.config.maxHistorySize,
      timestamps: []
      // TODO: Implement timestamp tracking
    };
  }
  /**
   * Get history item by index
   * 
   * @param index - History index
   * @returns Topic or null
   */
  getHistoryItem(e) {
    const t = this.historyManager.getHistoryEntry(e);
    return t && this.getTopic(t) || null;
  }
  /**
   * Add bookmark with folder
   * 
   * @param topicId - Topic ID to bookmark
   * @param folder - Optional folder name
   * @param notes - Optional notes
   */
  async addBookmarkWithFolder(e, t, r) {
    this.isInitialized || await this.initialize();
    try {
      const s = await this.bookmarkManager.addBookmark(e);
      (t || r) && await this.bookmarkManager.updateBookmark(s.id, {
        category: t,
        notes: r
      }), this.state.bookmarks = this.bookmarkManager.getBookmarks(), this.saveState(), this.emit("bookmark:added", { bookmark: s }), this.emit("state:changed", this.state);
    } catch (s) {
      throw this.emit("error:occurred", { error: s, context: "addBookmarkWithFolder" }), new Error(`Failed to add bookmark: ${s instanceof Error ? s.message : "Unknown error"}`);
    }
  }
  /**
   * Organize bookmarks
   * 
   * @param bookmarks - Bookmarks to organize
   */
  async organizeBookmarks(e) {
    this.isInitialized || await this.initialize();
    try {
      await this.bookmarkManager.organizeBookmarks({
        categories: [],
        sortBy: "title",
        sortOrder: "asc"
      }), this.state.bookmarks = this.bookmarkManager.getBookmarks(), this.saveState(), this.emit("bookmarks:organized", { bookmarks: e }), this.emit("state:changed", this.state);
    } catch (t) {
      throw this.emit("error:occurred", { error: t, context: "organizeBookmarks" }), new Error(`Failed to organize bookmarks: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
  /**
   * Export bookmarks
   * 
   * @returns Exported bookmark data
   */
  async exportBookmarks() {
    this.isInitialized || await this.initialize();
    try {
      return await this.bookmarkManager.exportBookmarks();
    } catch (e) {
      throw this.emit("error:occurred", { error: e, context: "exportBookmarks" }), new Error(`Failed to export bookmarks: ${e instanceof Error ? e.message : "Unknown error"}`);
    }
  }
  /**
   * Import bookmarks
   * 
   * @param data - Bookmark data to import
   */
  async importBookmarks(e) {
    this.isInitialized || await this.initialize();
    try {
      await this.bookmarkManager.importBookmarks(e), this.state.bookmarks = this.bookmarkManager.getBookmarks(), this.saveState(), this.emit("bookmarks:imported"), this.emit("state:changed", this.state);
    } catch (t) {
      throw this.emit("error:occurred", { error: t, context: "importBookmarks" }), new Error(`Failed to import bookmarks: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
  /**
   * Validate content
   * 
   * @returns Array of validation results
   */
  async validateContent() {
    this.isInitialized || await this.initialize();
    try {
      const e = this.contentManager.getAllTopics(), t = [];
      for (const r of e) {
        const s = this.contentManager.validateTopic(r);
        t.push(s);
      }
      return t;
    } catch (e) {
      throw this.emit("error:occurred", { error: e, context: "validateContent" }), new Error(`Failed to validate content: ${e instanceof Error ? e.message : "Unknown error"}`);
    }
  }
  /**
   * Refresh system
   */
  async refresh() {
    if (!this.isInitialized) {
      await this.initialize();
      return;
    }
    try {
      await this.contentManager.loadContent();
      const e = this.contentManager.getAllTopics();
      await this.searchEngine.buildSearchIndex(e), this.emit("system:refreshed");
    } catch (e) {
      throw this.emit("error:occurred", { error: e, context: "refresh" }), new Error(`Failed to refresh system: ${e instanceof Error ? e.message : "Unknown error"}`);
    }
  }
  /**
   * Destroy the help system
   */
  async destroy() {
    try {
      this.saveState(), this.eventListeners.clear(), this.isInitialized = !1, this.emit("system:destroyed");
    } catch (e) {
      console.error("Error destroying help system:", e);
    }
  }
  /**
   * Create default configuration
   * 
   * @param overrides - Configuration overrides
   * @returns Default configuration
   */
  createDefaultConfig(e) {
    return { ...{
      enableSearch: !0,
      enableBookmarks: !0,
      enableHistory: !0,
      maxHistorySize: 100,
      defaultWindowSize: {
        width: 800,
        height: 600
      },
      splitterPosition: 250,
      theme: "windows98",
      fontSize: "medium",
      showStatusBar: !0,
      autoSave: !0,
      searchConfig: {
        maxResults: 50,
        minScore: 0.1,
        enableFuzzy: !0,
        fuzzyThreshold: 0.8,
        enableStemming: !0,
        stopWords: ["the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by"],
        enableSuggestions: !0,
        maxSuggestions: 10
      },
      cacheConfig: {
        maxSize: 1e3,
        ttl: 3e5,
        // 5 minutes
        enableCompression: !0,
        enablePersistence: !0
      },
      performanceConfig: {
        enableLazyLoading: !0,
        enableVirtualScrolling: !0,
        preloadCount: 5,
        debounceDelay: 300
      }
    }, ...e };
  }
}
class Hn {
  constructor() {
    this.currentTheme = "light";
  }
  /**
   * Get singleton instance
   */
  static getInstance() {
    return Hn.instance || (Hn.instance = new Hn()), Hn.instance;
  }
  /**
   * Set theme
   */
  setTheme(e) {
    this.currentTheme = e, document.documentElement.setAttribute("data-help-theme", e);
  }
  /**
   * Get current theme
   */
  getTheme() {
    return this.currentTheme;
  }
  /**
   * Apply Windows 98 styling to element
   */
  applyWin98Styling(e, t) {
    switch (e.classList.add("help-system"), t) {
      case "button":
        e.classList.add("help-button");
        break;
      case "input":
        e.classList.add("help-input");
        break;
      case "panel":
        e.classList.add("help-panel");
        break;
      case "dialog":
        e.classList.add("help-dialog");
        break;
    }
  }
  /**
   * Remove Windows 98 styling from element
   */
  removeWin98Styling(e) {
    e.classList.remove(
      "help-system",
      "help-button",
      "help-input",
      "help-panel",
      "help-dialog"
    );
  }
  /**
   * Initialize help system styles
   */
  initialize() {
    this.setTheme("light"), document.documentElement.classList.add("help-system-root"), this.setupThemeListeners();
  }
  /**
   * Set up theme change listeners
   */
  setupThemeListeners() {
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-contrast: high)"), t = window.matchMedia("(prefers-reduced-motion: reduce)");
      e.addEventListener("change", (r) => {
        r.matches ? this.setTheme("high-contrast") : this.setTheme("light");
      }), t.addEventListener("change", (r) => {
        document.documentElement.setAttribute("data-reduced-motion", r.matches ? "true" : "false");
      });
    }
  }
  /**
   * Get CSS custom property value
   */
  getCSSProperty(e) {
    return getComputedStyle(document.documentElement).getPropertyValue(e);
  }
  /**
   * Set CSS custom property value
   */
  setCSSProperty(e, t) {
    document.documentElement.style.setProperty(e, t);
  }
  /**
   * Get Windows 98 color value
   */
  getWin98Color(e) {
    return this.getCSSProperty(`--win98-color-${e}`);
  }
  /**
   * Set Windows 98 color value
   */
  setWin98Color(e, t) {
    this.setCSSProperty(`--win98-color-${e}`, t);
  }
}
const Up = {
  THEMES: {
    LIGHT: "light",
    DARK: "dark",
    HIGH_CONTRAST: "high-contrast"
  },
  COLORS: {
    FACE: "3d-face",
    HIGHLIGHT: "3d-highlight",
    SHADOW: "3d-shadow",
    DARK_SHADOW: "3d-darkshadow",
    WINDOW_TEXT: "window-text",
    BUTTON_TEXT: "button-text",
    HIGHLIGHT_TEXT: "highlight-text",
    DISABLED_TEXT: "disabled-text",
    LINK_TEXT: "link-text",
    VISITED_LINK: "visited-link",
    HIGHLIGHT_BACKGROUND: "highlight",
    ACTIVE_BORDER: "active-border",
    INACTIVE_BORDER: "inactive-border",
    WINDOW_FRAME: "window-frame",
    SCROLLBAR: "scrollbar",
    SCROLLBAR_THUMB: "scrollbar-thumb",
    SCROLLBAR_HIGHLIGHT: "scrollbar-highlight",
    SCROLLBAR_SHADOW: "scrollbar-shadow",
    STATUS_BAR: "status-bar",
    STATUS_TEXT: "status-text",
    STATUS_BORDER: "status-border"
  },
  FONTS: {
    FAMILY: "win98-font-family",
    FAMILY_MONO: "win98-font-family-mono",
    SIZE_BASE: "win98-font-size-base",
    SIZE_SMALL: "win98-font-size-small",
    SIZE_LARGE: "win98-font-size-large",
    SIZE_TITLE: "win98-font-size-title",
    SIZE_HEADING: "win98-font-size-heading",
    WEIGHT_NORMAL: "win98-font-weight-normal",
    WEIGHT_BOLD: "win98-font-weight-bold",
    LINE_HEIGHT_BASE: "win98-line-height-base",
    LINE_HEIGHT_TIGHT: "win98-line-height-tight",
    LINE_HEIGHT_LOOSE: "win98-line-height-loose"
  },
  SPACING: {
    XS: "win98-spacing-xs",
    SM: "win98-spacing-sm",
    MD: "win98-spacing-md",
    LG: "win98-spacing-lg",
    XL: "win98-spacing-xl",
    XXL: "win98-spacing-xxl"
  }
}, Kp = {
  /**
   * Create Windows 98 button element
   */
  createButton(n, e = "") {
    const t = document.createElement("button");
    return t.textContent = n, t.className = `help-button ${e}`.trim(), t;
  },
  /**
   * Create Windows 98 input element
   */
  createInput(n = "text", e = "", t = "") {
    const r = document.createElement("input");
    return r.type = n, r.placeholder = e, r.className = `help-input ${t}`.trim(), r;
  },
  /**
   * Create Windows 98 panel element
   */
  createPanel(n = "") {
    const e = document.createElement("div");
    return e.className = `help-panel ${n}`.trim(), e;
  },
  /**
   * Create Windows 98 dialog element
   */
  createDialog(n = "") {
    const e = document.createElement("div");
    return e.className = `help-dialog ${n}`.trim(), e;
  },
  /**
   * Apply Windows 98 border to element
   */
  applyBorder(n, e) {
    n.classList.add(`help-border-${e}`);
  },
  /**
   * Apply Windows 98 scrollbar to element
   */
  applyScrollbar(n) {
    n.classList.add("help-scrollbar");
  },
  /**
   * Check if element has Windows 98 styling
   */
  hasWin98Styling(n) {
    return n.classList.contains("help-system") || n.classList.contains("help-button") || n.classList.contains("help-input") || n.classList.contains("help-panel") || n.classList.contains("help-dialog");
  },
  /**
   * Get element's Windows 98 style type
   */
  getWin98StyleType(n) {
    return n.classList.contains("help-button") ? "button" : n.classList.contains("help-input") ? "input" : n.classList.contains("help-panel") ? "panel" : n.classList.contains("help-dialog") ? "dialog" : null;
  }
};
function Gp() {
  const n = Hn.getInstance();
  return n.initialize(), n;
}
function Vp() {
  return Hn.getInstance();
}
function av(n) {
  return typeof n == "string" && ["getting-started", "design", "specifications", "api", "guides", "kernel", "enterprise", "service", "shared", "build", "general"].includes(n);
}
function ov(n) {
  return typeof n == "string" && ["contents", "index", "search", "favorites", "history"].includes(n);
}
function Yp(n) {
  if (typeof n != "object" || n === null) return !1;
  const e = n;
  return typeof e.id == "string" && typeof e.title == "string" && typeof e.content == "string" && typeof e.icon == "string" && Array.isArray(e.children) && Array.isArray(e.keywords) && av(e.category) && e.lastModified instanceof Date && Array.isArray(e.relatedTopics);
}
function Xp(n) {
  if (typeof n != "object" || n === null) return !1;
  const e = n;
  return typeof e.id == "string" && typeof e.topicId == "string" && typeof e.title == "string" && e.dateAdded instanceof Date;
}
function Jp(n) {
  if (typeof n != "object" || n === null) return !1;
  const e = n;
  return typeof e.topicId == "string" && typeof e.title == "string" && typeof e.snippet == "string" && typeof e.relevance == "number" && Array.isArray(e.matchedTerms) && typeof e.category == "string" && e.lastModified instanceof Date;
}
function Zp(n) {
  if (typeof n != "object" || n === null) return !1;
  const e = n;
  return (e.currentTopic === null || typeof e.currentTopic == "string") && ov(e.activeTab) && typeof e.searchQuery == "string" && Array.isArray(e.searchResults) && Array.isArray(e.bookmarks) && Array.isArray(e.history) && typeof e.windowState == "object" && typeof e.userPreferences == "object";
}
function Qp() {
  return new Za();
}
const $p = "1.0.0", em = {
  MAX_BOOKMARKS: 1e3,
  MAX_HISTORY_SIZE: 1e3,
  MAX_SEARCH_HISTORY: 20,
  DEFAULT_WINDOW_SIZE: { width: 800, height: 600 },
  DEFAULT_SPLITTER_POSITION: 250,
  STORAGE_KEYS: {
    BOOKMARKS: "abu-help-bookmarks",
    HISTORY: "abu-help-history",
    STATE: "abu-help-system-state"
  }
};
var lv = /* @__PURE__ */ b('<div class="menu-separator svelte-1w43kb6"></div>'), cv = /* @__PURE__ */ b('<span class="menu-shortcut svelte-1w43kb6"> </span>'), dv = /* @__PURE__ */ b('<button><span class="menu-label svelte-1w43kb6"> </span> <!></button>'), uv = /* @__PURE__ */ b('<div class="menu-dropdown svelte-1w43kb6"></div>'), vv = /* @__PURE__ */ b('<div class="menu-separator svelte-1w43kb6"></div>'), fv = /* @__PURE__ */ b('<span class="menu-shortcut svelte-1w43kb6"> </span>'), hv = /* @__PURE__ */ b('<button><span class="menu-label svelte-1w43kb6"> </span> <!></button>'), pv = /* @__PURE__ */ b('<div class="menu-dropdown svelte-1w43kb6"></div>'), mv = /* @__PURE__ */ b('<div class="menu-separator svelte-1w43kb6"></div>'), gv = /* @__PURE__ */ b('<span class="menu-check svelte-1w43kb6">✓</span>'), bv = /* @__PURE__ */ b('<button><span class="menu-label svelte-1w43kb6"> </span> <!></button>'), wv = /* @__PURE__ */ b('<div class="menu-submenu svelte-1w43kb6"><button class="menu-dropdown-item svelte-1w43kb6"><span class="menu-label svelte-1w43kb6"> </span> <span class="menu-arrow svelte-1w43kb6">▶</span></button> <div class="menu-submenu-dropdown svelte-1w43kb6"></div></div>'), _v = /* @__PURE__ */ b('<span class="menu-check svelte-1w43kb6">✓</span>'), yv = /* @__PURE__ */ b('<span class="menu-shortcut svelte-1w43kb6"> </span>'), kv = /* @__PURE__ */ b('<button><span class="menu-label svelte-1w43kb6"> </span> <!> <!></button>'), xv = /* @__PURE__ */ b('<div class="menu-dropdown svelte-1w43kb6"></div>'), Sv = /* @__PURE__ */ b('<div class="menu-separator svelte-1w43kb6"></div>'), Tv = /* @__PURE__ */ b('<span class="menu-shortcut svelte-1w43kb6"> </span>'), Ev = /* @__PURE__ */ b('<button><span class="menu-label svelte-1w43kb6"> </span> <!></button>'), Cv = /* @__PURE__ */ b('<div class="menu-dropdown svelte-1w43kb6"></div>'), zv = /* @__PURE__ */ b('<div class="menu-separator svelte-1w43kb6"></div>'), Mv = /* @__PURE__ */ b('<span class="menu-shortcut svelte-1w43kb6"> </span>'), Iv = /* @__PURE__ */ b('<button class="menu-dropdown-item svelte-1w43kb6"><span class="menu-label svelte-1w43kb6"> </span> <!></button>'), Av = /* @__PURE__ */ b('<div class="menu-dropdown svelte-1w43kb6"></div>'), Dv = /* @__PURE__ */ b(`<div class="dialog-overlay svelte-1w43kb6"><div class="dialog svelte-1w43kb6"><div class="dialog-title-bar svelte-1w43kb6"><div class="dialog-title svelte-1w43kb6">About Help System</div> <button class="dialog-close svelte-1w43kb6">×</button></div> <div class="dialog-content svelte-1w43kb6"><div class="about-content svelte-1w43kb6"><div class="about-icon svelte-1w43kb6">📖</div> <div class="about-title svelte-1w43kb6">Windows 98 Help System</div> <div class="about-version svelte-1w43kb6">Version 1.0.0</div> <div class="about-description svelte-1w43kb6">A comprehensive help system for the Abu OS 98 ecosystem, 
            providing Windows 98 authentic styling and functionality.</div> <div class="about-copyright svelte-1w43kb6">© 2024 Abu OS 98. All rights reserved.</div></div></div> <div class="dialog-buttons svelte-1w43kb6"><button class="dialog-button svelte-1w43kb6">OK</button></div></div></div>`), Lv = /* @__PURE__ */ b('<div class="dialog-overlay svelte-1w43kb6"><div class="dialog svelte-1w43kb6"><div class="dialog-title-bar svelte-1w43kb6"><div class="dialog-title svelte-1w43kb6">Print</div> <button class="dialog-close svelte-1w43kb6">×</button></div> <div class="dialog-content svelte-1w43kb6"><div class="print-content svelte-1w43kb6"><div class="print-preview svelte-1w43kb6"><div class="print-preview-header svelte-1w43kb6"><div class="print-preview-title svelte-1w43kb6"> </div></div> <div class="print-preview-body svelte-1w43kb6">Preview of content to be printed...</div></div></div></div> <div class="dialog-buttons svelte-1w43kb6"><button class="dialog-button svelte-1w43kb6">Cancel</button> <button class="dialog-button primary svelte-1w43kb6">Print</button></div></div></div>'), Rv = /* @__PURE__ */ b('<div class="menu-bar svelte-1w43kb6"><div><button class="menu-button svelte-1w43kb6">&File</button> <!></div> <div><button class="menu-button svelte-1w43kb6">&Edit</button> <!></div> <div><button class="menu-button svelte-1w43kb6">&View</button> <!></div> <div><button class="menu-button svelte-1w43kb6">&Go</button> <!></div> <div><button class="menu-button svelte-1w43kb6">&Help</button> <!></div></div> <!> <!>', 1);
function Bv(n, e) {
  Fe(e, !0);
  let t = be(e, "currentTopic", 11, null), r = null, s = !1, a = !1;
  const o = _t(), c = [
    { id: "new", label: "New", shortcut: "Ctrl+N", disabled: !0 },
    {
      id: "open",
      label: "Open...",
      shortcut: "Ctrl+O",
      disabled: !0
    },
    { id: "separator1", type: "separator" },
    {
      id: "print",
      label: "Print...",
      shortcut: "Ctrl+P",
      action: () => a = !0
    },
    { id: "separator2", type: "separator" },
    {
      id: "exit",
      label: "Exit",
      shortcut: "Alt+F4",
      action: () => o("close")
    }
  ], u = [
    {
      id: "copy",
      label: "Copy",
      shortcut: "Ctrl+C",
      disabled: !0
    },
    {
      id: "select-all",
      label: "Select All",
      shortcut: "Ctrl+A",
      disabled: !0
    },
    { id: "separator1", type: "separator" },
    {
      id: "find",
      label: "Find...",
      shortcut: "Ctrl+F",
      action: () => o("search", { query: "" })
    }
  ], v = [
    {
      id: "toolbar",
      label: "Toolbar",
      checked: !0,
      action: () => L()
    },
    {
      id: "status-bar",
      label: "Status Bar",
      checked: !0,
      action: () => T()
    },
    { id: "separator1", type: "separator" },
    {
      id: "font-size",
      label: "Font Size",
      submenu: [
        {
          id: "small",
          label: "Small",
          action: () => C("small")
        },
        {
          id: "medium",
          label: "Medium",
          checked: !0,
          action: () => C("medium")
        },
        {
          id: "large",
          label: "Large",
          action: () => C("large")
        }
      ]
    },
    { id: "separator2", type: "separator" },
    {
      id: "refresh",
      label: "Refresh",
      shortcut: "F5",
      action: () => z()
    }
  ], p = [
    {
      id: "back",
      label: "Back",
      shortcut: "Alt+Left",
      disabled: !e.helpSystem?.canGoBack(),
      action: () => o("go-back")
    },
    {
      id: "forward",
      label: "Forward",
      shortcut: "Alt+Right",
      disabled: !e.helpSystem?.canGoForward(),
      action: () => o("go-forward")
    },
    {
      id: "home",
      label: "Home",
      shortcut: "Alt+Home",
      action: () => o("go-home")
    },
    { id: "separator1", type: "separator" },
    {
      id: "bookmark",
      label: "Add Bookmark",
      shortcut: "Ctrl+D",
      disabled: !t(),
      action: () => E()
    }
  ], _ = [
    {
      id: "contents",
      label: "Help Topics",
      shortcut: "F1",
      action: () => o("navigate", { topicId: "getting-started" })
    },
    {
      id: "index",
      label: "Index",
      action: () => o("search", { query: "" })
    },
    { id: "separator1", type: "separator" },
    {
      id: "about",
      label: "About Help System",
      action: () => s = !0
    }
  ];
  function g(R) {
    r = r === R ? null : R;
  }
  function y(R) {
    R.action && R.action(), r = null;
  }
  function I(R) {
    if (R.ctrlKey || R.altKey)
      switch (R.key) {
        case "n":
          R.ctrlKey && R.preventDefault();
          break;
        case "o":
          R.ctrlKey && R.preventDefault();
          break;
        case "p":
          R.ctrlKey && (R.preventDefault(), a = !0);
          break;
        case "c":
          R.ctrlKey && R.preventDefault();
          break;
        case "a":
          R.ctrlKey && R.preventDefault();
          break;
        case "f":
          R.ctrlKey && (R.preventDefault(), o("search", { query: "" }));
          break;
        case "d":
          R.ctrlKey && (R.preventDefault(), E());
          break;
        case "F4":
          R.altKey && (R.preventDefault(), o("close"));
          break;
      }
    switch (R.key) {
      case "F1":
        R.preventDefault(), o("navigate", { topicId: "getting-started" });
        break;
      case "F5":
        R.preventDefault(), z();
        break;
    }
    if (r)
      switch (R.key) {
        case "Escape":
          r = null;
          break;
      }
  }
  function E() {
    t() && o("bookmark", { topicId: t().id });
  }
  function L() {
    o("preference-change", {
      showToolbar: !e.helpSystem.getState().userPreferences.showToolbar
    });
  }
  function T() {
    o("preference-change", {
      showStatusBar: !e.helpSystem.getState().userPreferences.showStatusBar
    });
  }
  function C(R) {
    o("preference-change", { fontSize: R });
  }
  async function z() {
    try {
      await e.helpSystem.refresh();
    } catch (R) {
      console.error("Failed to refresh:", R);
    }
  }
  function k() {
    s = !1, a = !1;
  }
  function w(R) {
    R.target.closest(".menu-bar, .menu-dropdown") || (r = null);
  }
  var A = Rv();
  G("keydown", Rt, I), G("click", Rt, w);
  var x = Ce(A), N = d(x);
  let te;
  var J = d(N), H = h(J, 2);
  {
    var O = (R) => {
      var ne = uv();
      Le(ne, 21, () => c, je, (ge, de) => {
        var pe = Re(), he = Ce(pe);
        {
          var ke = (_e) => {
            var ye = lv();
            m(_e, ye);
          }, Me = (_e) => {
            var ye = dv();
            let Ue;
            var qe = d(ye), Ke = d(qe, !0);
            l(qe);
            var Ve = h(qe, 2);
            {
              var Ye = (Ne) => {
                var Je = cv(), nt = d(Je, !0);
                l(Je), Z(() => q(nt, i(de).shortcut)), m(Ne, Je);
              };
              K(Ve, (Ne) => {
                i(de).shortcut && Ne(Ye);
              });
            }
            l(ye), Z(
              (Ne) => {
                Ue = xe(ye, 1, "menu-dropdown-item svelte-1w43kb6", null, Ue, Ne), q(Ke, i(de).label);
              },
              [() => ({ disabled: i(de).disabled })]
            ), G("click", ye, () => y(i(de))), m(_e, ye);
          };
          K(he, (_e) => {
            i(de).type === "separator" ? _e(ke) : _e(Me, !1);
          });
        }
        m(ge, pe);
      }), l(ne), m(R, ne);
    };
    K(H, (R) => {
      r === "file" && R(O);
    });
  }
  l(N);
  var B = h(N, 2);
  let F;
  var P = d(B), U = h(P, 2);
  {
    var ee = (R) => {
      var ne = pv();
      Le(ne, 21, () => u, je, (ge, de) => {
        var pe = Re(), he = Ce(pe);
        {
          var ke = (_e) => {
            var ye = vv();
            m(_e, ye);
          }, Me = (_e) => {
            var ye = hv();
            let Ue;
            var qe = d(ye), Ke = d(qe, !0);
            l(qe);
            var Ve = h(qe, 2);
            {
              var Ye = (Ne) => {
                var Je = fv(), nt = d(Je, !0);
                l(Je), Z(() => q(nt, i(de).shortcut)), m(Ne, Je);
              };
              K(Ve, (Ne) => {
                i(de).shortcut && Ne(Ye);
              });
            }
            l(ye), Z(
              (Ne) => {
                Ue = xe(ye, 1, "menu-dropdown-item svelte-1w43kb6", null, Ue, Ne), q(Ke, i(de).label);
              },
              [() => ({ disabled: i(de).disabled })]
            ), G("click", ye, () => y(i(de))), m(_e, ye);
          };
          K(he, (_e) => {
            i(de).type === "separator" ? _e(ke) : _e(Me, !1);
          });
        }
        m(ge, pe);
      }), l(ne), m(R, ne);
    };
    K(U, (R) => {
      r === "edit" && R(ee);
    });
  }
  l(B);
  var W = h(B, 2);
  let se;
  var S = d(W), M = h(S, 2);
  {
    var V = (R) => {
      var ne = xv();
      Le(ne, 21, () => v, je, (ge, de) => {
        var pe = Re(), he = Ce(pe);
        {
          var ke = (_e) => {
            var ye = mv();
            m(_e, ye);
          }, Me = (_e) => {
            var ye = Re(), Ue = Ce(ye);
            {
              var qe = (Ve) => {
                var Ye = wv(), Ne = d(Ye), Je = d(Ne), nt = d(Je, !0);
                l(Je), rn(2), l(Ne);
                var Ct = h(Ne, 2);
                Le(Ct, 21, () => i(de).submenu, je, (ft, ht) => {
                  var yt = bv();
                  let rt;
                  var zt = d(yt), ce = d(zt, !0);
                  l(zt);
                  var Te = h(zt, 2);
                  {
                    var ot = (Mt) => {
                      var mn = gv();
                      m(Mt, mn);
                    };
                    K(Te, (Mt) => {
                      i(ht).checked && Mt(ot);
                    });
                  }
                  l(yt), Z(
                    (Mt) => {
                      rt = xe(yt, 1, "menu-dropdown-item svelte-1w43kb6", null, rt, Mt), q(ce, i(ht).label);
                    },
                    [() => ({ checked: i(ht).checked })]
                  ), G("click", yt, () => y(i(ht))), m(ft, yt);
                }), l(Ct), l(Ye), Z(() => q(nt, i(de).label)), m(Ve, Ye);
              }, Ke = (Ve) => {
                var Ye = kv();
                let Ne;
                var Je = d(Ye), nt = d(Je, !0);
                l(Je);
                var Ct = h(Je, 2);
                {
                  var ft = (rt) => {
                    var zt = _v();
                    m(rt, zt);
                  };
                  K(Ct, (rt) => {
                    i(de).checked && rt(ft);
                  });
                }
                var ht = h(Ct, 2);
                {
                  var yt = (rt) => {
                    var zt = yv(), ce = d(zt, !0);
                    l(zt), Z(() => q(ce, i(de).shortcut)), m(rt, zt);
                  };
                  K(ht, (rt) => {
                    i(de).shortcut && rt(yt);
                  });
                }
                l(Ye), Z(
                  (rt) => {
                    Ne = xe(Ye, 1, "menu-dropdown-item svelte-1w43kb6", null, Ne, rt), q(nt, i(de).label);
                  },
                  [() => ({ checked: i(de).checked })]
                ), G("click", Ye, () => y(i(de))), m(Ve, Ye);
              };
              K(
                Ue,
                (Ve) => {
                  i(de).submenu ? Ve(qe) : Ve(Ke, !1);
                },
                !0
              );
            }
            m(_e, ye);
          };
          K(he, (_e) => {
            i(de).type === "separator" ? _e(ke) : _e(Me, !1);
          });
        }
        m(ge, pe);
      }), l(ne), m(R, ne);
    };
    K(M, (R) => {
      r === "view" && R(V);
    });
  }
  l(W);
  var $ = h(W, 2);
  let Y;
  var oe = d($), ie = h(oe, 2);
  {
    var re = (R) => {
      var ne = Cv();
      Le(ne, 21, () => p, je, (ge, de) => {
        var pe = Re(), he = Ce(pe);
        {
          var ke = (_e) => {
            var ye = Sv();
            m(_e, ye);
          }, Me = (_e) => {
            var ye = Ev();
            let Ue;
            var qe = d(ye), Ke = d(qe, !0);
            l(qe);
            var Ve = h(qe, 2);
            {
              var Ye = (Ne) => {
                var Je = Tv(), nt = d(Je, !0);
                l(Je), Z(() => q(nt, i(de).shortcut)), m(Ne, Je);
              };
              K(Ve, (Ne) => {
                i(de).shortcut && Ne(Ye);
              });
            }
            l(ye), Z(
              (Ne) => {
                Ue = xe(ye, 1, "menu-dropdown-item svelte-1w43kb6", null, Ue, Ne), q(Ke, i(de).label);
              },
              [() => ({ disabled: i(de).disabled })]
            ), G("click", ye, () => y(i(de))), m(_e, ye);
          };
          K(he, (_e) => {
            i(de).type === "separator" ? _e(ke) : _e(Me, !1);
          });
        }
        m(ge, pe);
      }), l(ne), m(R, ne);
    };
    K(ie, (R) => {
      r === "go" && R(re);
    });
  }
  l($);
  var ae = h($, 2);
  let fe;
  var me = d(ae), ve = h(me, 2);
  {
    var X = (R) => {
      var ne = Av();
      Le(ne, 21, () => _, je, (ge, de) => {
        var pe = Re(), he = Ce(pe);
        {
          var ke = (_e) => {
            var ye = zv();
            m(_e, ye);
          }, Me = (_e) => {
            var ye = Iv(), Ue = d(ye), qe = d(Ue, !0);
            l(Ue);
            var Ke = h(Ue, 2);
            {
              var Ve = (Ye) => {
                var Ne = Mv(), Je = d(Ne, !0);
                l(Ne), Z(() => q(Je, i(de).shortcut)), m(Ye, Ne);
              };
              K(Ke, (Ye) => {
                i(de).shortcut && Ye(Ve);
              });
            }
            l(ye), Z(() => q(qe, i(de).label)), G("click", ye, () => y(i(de))), m(_e, ye);
          };
          K(he, (_e) => {
            i(de).type === "separator" ? _e(ke) : _e(Me, !1);
          });
        }
        m(ge, pe);
      }), l(ne), m(R, ne);
    };
    K(ve, (R) => {
      r === "help" && R(X);
    });
  }
  l(ae), l(x);
  var le = h(x, 2);
  {
    var we = (R) => {
      var ne = Dv(), ge = d(ne), de = d(ge), pe = h(d(de), 2);
      l(de);
      var he = h(de, 4), ke = d(he);
      l(he), l(ge), l(ne), G("click", pe, k), G("click", ke, k), G("click", ge, Mn(function(Me) {
        Fr.call(this, e, Me);
      })), G("click", ne, k), m(R, ne);
    };
    K(le, (R) => {
      s && R(we);
    });
  }
  var D = h(le, 2);
  {
    var Q = (R) => {
      var ne = Lv(), ge = d(ne), de = d(ge), pe = h(d(de), 2);
      l(de);
      var he = h(de, 2), ke = d(he), Me = d(ke), _e = d(Me), ye = d(_e), Ue = d(ye, !0);
      l(ye), l(_e), rn(2), l(Me), l(ke), l(he);
      var qe = h(he, 2), Ke = d(qe), Ve = h(Ke, 2);
      l(qe), l(ge), l(ne), Z(() => q(Ue, t()?.title || "Help Topic")), G("click", pe, k), G("click", Ke, k), G("click", Ve, k), G("click", ge, Mn(function(Ye) {
        Fr.call(this, e, Ye);
      })), G("click", ne, k), m(R, ne);
    };
    K(D, (R) => {
      a && R(Q);
    });
  }
  Z(
    (R, ne, ge, de, pe) => {
      te = xe(N, 1, "menu-item svelte-1w43kb6", null, te, R), F = xe(B, 1, "menu-item svelte-1w43kb6", null, F, ne), se = xe(W, 1, "menu-item svelte-1w43kb6", null, se, ge), Y = xe($, 1, "menu-item svelte-1w43kb6", null, Y, de), fe = xe(ae, 1, "menu-item svelte-1w43kb6", null, fe, pe);
    },
    [
      () => ({ active: r === "file" }),
      () => ({ active: r === "edit" }),
      () => ({ active: r === "view" }),
      () => ({ active: r === "go" }),
      () => ({ active: r === "help" })
    ]
  ), G("click", J, () => g("file")), G("keydown", J, (R) => R.key === "Enter" && g("file")), G("click", P, () => g("edit")), G("keydown", P, (R) => R.key === "Enter" && g("edit")), G("click", S, () => g("view")), G("keydown", S, (R) => R.key === "Enter" && g("view")), G("click", oe, () => g("go")), G("keydown", oe, (R) => R.key === "Enter" && g("go")), G("click", me, () => g("help")), G("keydown", me, (R) => R.key === "Enter" && g("help")), m(n, A), Oe();
}
var Fv = /* @__PURE__ */ b('<div class="toolbar-separator svelte-1n2n5l3"></div>'), Ov = /* @__PURE__ */ b('<button><span class="toolbar-icon svelte-1n2n5l3"> </span> <span class="toolbar-label svelte-1n2n5l3"> </span></button>'), Hv = /* @__PURE__ */ b('<button type="button" class="search-clear svelte-1n2n5l3" title="Clear search">×</button>'), Pv = /* @__PURE__ */ b('<button type="button"> </button>'), Nv = /* @__PURE__ */ b('<div class="search-suggestions svelte-1n2n5l3"></div>'), jv = /* @__PURE__ */ b('<span class="status-item svelte-1n2n5l3" title="Current topic"> </span>'), qv = /* @__PURE__ */ b('<span class="status-item svelte-1n2n5l3" title="System status"> </span>'), Wv = /* @__PURE__ */ b('<div class="toolbar svelte-1n2n5l3"><div class="toolbar-section svelte-1n2n5l3"></div> <div class="toolbar-section search-container svelte-1n2n5l3"><form class="search-form svelte-1n2n5l3"><div class="search-input-container svelte-1n2n5l3"><input type="text" class="search-input svelte-1n2n5l3" placeholder="Search help topics..."/> <!></div> <!></form></div> <div class="toolbar-section status-section svelte-1n2n5l3"><div class="status-indicators svelte-1n2n5l3"><!> <!></div></div></div>');
function Uv(n, e) {
  Fe(e, !0);
  let t = be(e, "currentTopic", 11, null), r = be(e, "canGoBack", 11, !1), s = be(e, "canGoForward", 11, !1), a = "", o = !1, c = [], u = -1;
  const v = _t(), p = [
    {
      id: "back",
      label: "Back",
      icon: "◀",
      disabled: !r(),
      action: () => v("go-back"),
      tooltip: "Go back (Alt+Left)"
    },
    {
      id: "forward",
      label: "Forward",
      icon: "▶",
      disabled: !s(),
      action: () => v("go-forward"),
      tooltip: "Go forward (Alt+Right)"
    },
    {
      id: "home",
      label: "Home",
      icon: "🏠",
      disabled: !1,
      action: () => v("go-home"),
      tooltip: "Go to home topic (Alt+Home)"
    },
    { id: "separator1", type: "separator" },
    {
      id: "bookmark",
      label: "Bookmark",
      icon: "⭐",
      disabled: !t(),
      action: () => L(),
      tooltip: "Add bookmark (Ctrl+D)"
    },
    {
      id: "print",
      label: "Print",
      icon: "🖨️",
      disabled: !t(),
      action: () => T(),
      tooltip: "Print topic (Ctrl+P)"
    },
    { id: "separator2", type: "separator" },
    {
      id: "refresh",
      label: "Refresh",
      icon: "🔄",
      disabled: !1,
      action: () => C(),
      tooltip: "Refresh (F5)"
    }
  ];
  async function _(M) {
    if (a = M.target.value, a.length >= 2)
      try {
        c = await e.helpSystem.getSearchSuggestions(a), o = c.length > 0, u = -1;
      } catch ($) {
        console.warn("Failed to get search suggestions:", $), c = [], o = !1;
      }
    else
      c = [], o = !1;
  }
  async function g(M) {
    M.preventDefault(), a.trim() && (v("search", { query: a.trim() }), o = !1);
  }
  function y(M) {
    if (o)
      switch (M.key) {
        case "ArrowDown":
          M.preventDefault(), u = Math.min(u + 1, c.length - 1);
          break;
        case "ArrowUp":
          M.preventDefault(), u = Math.max(u - 1, -1);
          break;
        case "Enter":
          M.preventDefault(), u >= 0 ? (a = c[u], v("search", { query: a })) : v("search", { query: a.trim() }), o = !1;
          break;
        case "Escape":
          o = !1, u = -1;
          break;
      }
  }
  function I(M) {
    a = M, v("search", { query: M }), o = !1;
  }
  function E() {
    a = "", o = !1, c = [], u = -1;
  }
  function L() {
    t() && v("bookmark", { topicId: t().id });
  }
  function T() {
    t() && window.print();
  }
  async function C() {
    try {
      await e.helpSystem.refresh();
    } catch (M) {
      console.error("Failed to refresh:", M);
    }
  }
  function z(M) {
    M.target.closest(".search-container") || (o = !1);
  }
  function k(M) {
    if (M.ctrlKey || M.altKey)
      switch (M.key) {
        case "d":
          M.ctrlKey && (M.preventDefault(), L());
          break;
        case "p":
          M.ctrlKey && (M.preventDefault(), T());
          break;
        case "f":
          if (M.ctrlKey) {
            M.preventDefault();
            const V = document.querySelector(".search-input");
            V && V.focus();
          }
          break;
      }
    switch (M.key) {
      case "F5":
        M.preventDefault(), C();
        break;
    }
    if (M.altKey)
      switch (M.key) {
        case "ArrowLeft":
          M.preventDefault(), r() && v("go-back");
          break;
        case "ArrowRight":
          M.preventDefault(), s() && v("go-forward");
          break;
        case "Home":
          M.preventDefault(), v("go-home");
          break;
      }
  }
  var w = Wv();
  G("keydown", Rt, k), G("click", Rt, z);
  var A = d(w);
  Le(A, 21, () => p, je, (M, V) => {
    var $ = Re(), Y = Ce($);
    {
      var oe = (re) => {
        var ae = Fv();
        m(re, ae);
      }, ie = (re) => {
        var ae = Ov();
        let fe;
        var me = d(ae), ve = d(me, !0);
        l(me);
        var X = h(me, 2), le = d(X, !0);
        l(X), l(ae), Z(
          (we) => {
            fe = xe(ae, 1, "toolbar-button svelte-1n2n5l3", null, fe, we), Se(ae, "title", i(V).tooltip), q(ve, i(V).icon), q(le, i(V).label);
          },
          [() => ({ disabled: i(V).disabled })]
        ), G("click", ae, function(...we) {
          i(V).action?.apply(this, we);
        }), m(re, ae);
      };
      K(Y, (re) => {
        i(V).type === "separator" ? re(oe) : re(ie, !1);
      });
    }
    m(M, $);
  }), l(A);
  var x = h(A, 2), N = d(x), te = d(N), J = d(te);
  gt(J);
  var H = h(J, 2);
  {
    var O = (M) => {
      var V = Hv();
      G("click", V, E), m(M, V);
    };
    K(H, (M) => {
      a && M(O);
    });
  }
  l(te);
  var B = h(te, 2);
  {
    var F = (M) => {
      var V = Nv();
      Le(V, 21, () => c, je, ($, Y, oe) => {
        var ie = Pv();
        let re;
        var ae = d(ie, !0);
        l(ie), Z(
          (fe) => {
            re = xe(ie, 1, "search-suggestion svelte-1n2n5l3", null, re, fe), q(ae, i(Y));
          },
          [() => ({ selected: oe === u })]
        ), G("click", ie, () => I(i(Y))), m($, ie);
      }), l(V), m(M, V);
    };
    K(B, (M) => {
      o && c.length > 0 && M(F);
    });
  }
  l(N), l(x);
  var P = h(x, 2), U = d(P), ee = d(U);
  {
    var W = (M) => {
      var V = jv(), $ = d(V);
      l(V), Z(() => q($, `📄 ${t().title ?? ""}`)), m(M, V);
    };
    K(ee, (M) => {
      t() && M(W);
    });
  }
  var se = h(ee, 2);
  {
    var S = (M) => {
      var V = qv(), $ = d(V);
      l(V), Z(
        (Y, oe) => q($, `${Y ?? ""} 
          ${oe ?? ""}`),
        [
          () => e.helpSystem.isSystemInitialized() ? "🟢" : "🟡",
          () => e.helpSystem.isSystemInitialized() ? "Ready" : "Loading..."
        ]
      ), m(M, V);
    };
    K(se, (M) => {
      e.helpSystem && M(S);
    });
  }
  l(U), l(P), l(w), Dt(J, () => a, (M) => a = M), G("input", J, _), G("keydown", J, y), G("submit", N, g), m(n, w), Oe();
}
var Kv = /* @__PURE__ */ b('<button><span class="tab-icon svelte-1wmnc3u"> </span> <span class="tab-label svelte-1wmnc3u"> </span></button>'), Gv = /* @__PURE__ */ b('<div class="tab-bar svelte-1wmnc3u"></div>');
function Vv(n, e) {
  Fe(e, !0);
  let t = be(e, "activeTab", 11, "contents");
  const r = _t(), s = [
    {
      id: "contents",
      label: "Contents",
      icon: "📚",
      tooltip: "Table of contents"
    },
    {
      id: "index",
      label: "Index",
      icon: "🔍",
      tooltip: "Search index"
    },
    {
      id: "search",
      label: "Search",
      icon: "🔎",
      tooltip: "Search topics"
    },
    {
      id: "favorites",
      label: "Favorites",
      icon: "⭐",
      tooltip: "Bookmarked topics"
    },
    {
      id: "history",
      label: "History",
      icon: "🕒",
      tooltip: "Recently visited topics"
    }
  ];
  function a(v) {
    v !== t() && r("tab-change", { tab: v });
  }
  function o(v, p) {
    (v.key === "Enter" || v.key === " ") && (v.preventDefault(), a(p));
  }
  function c(v) {
    if (v.ctrlKey && v.key >= "1" && v.key <= "5") {
      v.preventDefault();
      const p = parseInt(v.key) - 1;
      p >= 0 && p < s.length && a(s[p].id);
    }
  }
  var u = Gv();
  G("keydown", Rt, c), Le(u, 21, () => s, je, (v, p) => {
    var _ = Kv();
    let g;
    var y = d(_), I = d(y, !0);
    l(y);
    var E = h(y, 2), L = d(E, !0);
    l(E), l(_), Z(
      (T, C) => {
        g = xe(_, 1, "tab-button svelte-1wmnc3u", null, g, T), Se(_, "title", `${i(p).tooltip ?? ""} (Ctrl+${C ?? ""})`), q(I, i(p).icon), q(L, i(p).label);
      },
      [
        () => ({ active: t() === i(p).id }),
        () => s.indexOf(i(p)) + 1
      ]
    ), G("click", _, () => a(i(p).id)), G("keydown", _, (T) => o(T, i(p).id)), m(v, _);
  }), l(u), m(n, u), Oe();
}
var Yv = (n, e) => e.toggleNode(e.topic.id), Xv = /* @__PURE__ */ b('<button class="expand-button svelte-1733b2"> </button>'), Jv = /* @__PURE__ */ b('<span class="expand-spacer svelte-1733b2"></span>'), Zv = (n, e) => e.handleTopicClick(e.topic), Qv = (n, e) => e.handleTopicKeydown(n, e.topic), $v = /* @__PURE__ */ b('<div class="node-children svelte-1733b2"></div>'), ef = /* @__PURE__ */ b('<div><div><!> <span class="node-icon svelte-1733b2"> </span> <button class="node-label svelte-1733b2"> </button></div> <!></div>');
function tf(n, e) {
  Fe(e, !0);
  let t = be(e, "currentTopic", 3, null), r = be(e, "level", 3, 0);
  var s = ef();
  let a;
  var o = d(s);
  let c;
  var u = d(o);
  {
    var v = (T) => {
      var C = Xv();
      C.__click = [Yv, e];
      var z = d(C, !0);
      l(C), Z(
        (k, w) => {
          Se(C, "title", k), q(z, w);
        },
        [
          () => e.isExpanded(e.topic.id) ? "Collapse" : "Expand",
          () => e.isExpanded(e.topic.id) ? "▼" : "▶"
        ]
      ), m(T, C);
    }, p = (T) => {
      var C = Jv();
      m(T, C);
    };
    K(u, (T) => {
      e.hasChildren(e.topic) ? T(v) : T(p, !1);
    });
  }
  var _ = h(u, 2), g = d(_, !0);
  l(_);
  var y = h(_, 2);
  y.__click = [Zv, e], y.__keydown = [Qv, e];
  var I = d(y, !0);
  l(y), l(o);
  var E = h(o, 2);
  {
    var L = (T) => {
      var C = $v();
      Le(C, 21, () => e.topic.children, je, (z, k) => {
        {
          let w = /* @__PURE__ */ ze(() => r() + 1);
          TreeNode(z, {
            get topic() {
              return i(k);
            },
            get currentTopic() {
              return t();
            },
            get expandedNodes() {
              return e.expandedNodes;
            },
            get isExpanded() {
              return e.isExpanded;
            },
            get hasChildren() {
              return e.hasChildren;
            },
            get toggleNode() {
              return e.toggleNode;
            },
            get handleTopicClick() {
              return e.handleTopicClick;
            },
            get handleTopicKeydown() {
              return e.handleTopicKeydown;
            },
            get getNodeIcon() {
              return e.getNodeIcon;
            },
            get level() {
              return i(w);
            }
          });
        }
      }), l(C), m(T, C);
    };
    K(E, (T) => {
      e.hasChildren(e.topic) && e.isExpanded(e.topic.id) && T(L);
    });
  }
  l(s), Z(
    (T, C, z) => {
      a = xe(s, 1, "tree-node svelte-1733b2", null, a, T), c = xe(o, 1, "node-content svelte-1733b2", null, c, C), qt(o, `padding-left: ${r() * 16 + 4}px;`), q(g, z), Se(y, "title", e.topic.title), q(I, e.topic.title);
    },
    [
      () => ({ current: t()?.id === e.topic.id }),
      () => ({
        "has-children": e.hasChildren(e.topic),
        expanded: e.isExpanded(e.topic.id)
      }),
      () => e.getNodeIcon(e.topic)
    ]
  ), m(n, s), Oe();
}
tt(["click", "keydown"]);
var nf = /* @__PURE__ */ b('<div class="tree-loading svelte-lch3cf"><div class="loading-spinner svelte-lch3cf"></div> <div class="loading-text svelte-lch3cf">Loading topics...</div></div>'), rf = /* @__PURE__ */ b('<div class="tree-error svelte-lch3cf"><div class="error-icon svelte-lch3cf">⚠️</div> <div class="error-text svelte-lch3cf"> </div> <button class="retry-button svelte-lch3cf">Retry</button></div>'), sf = /* @__PURE__ */ b('<div class="tree-nodes svelte-lch3cf"></div>'), af = /* @__PURE__ */ b('<div class="topic-tree svelte-lch3cf"><div class="tree-header svelte-lch3cf"><div class="tree-title svelte-lch3cf">Contents</div> <div class="tree-controls svelte-lch3cf"><button class="tree-control-button svelte-lch3cf" title="Expand all">+</button> <button class="tree-control-button svelte-lch3cf" title="Collapse all">-</button></div></div> <div class="tree-content svelte-lch3cf"><!></div></div>');
function of(n, e) {
  Fe(e, !0);
  let t = be(e, "currentTopic", 11, null), r = [], s = /* @__PURE__ */ new Set(), a = !0, o = null;
  const c = _t();
  wt(async () => {
    try {
      await u();
    } catch (B) {
      o = B instanceof Error ? B.message : "Failed to load topics";
    } finally {
      a = !1;
    }
  });
  async function u() {
    try {
      r = e.helpSystem.getTopicTree(), t() && v(t().id);
    } catch (B) {
      throw new Error(`Failed to load topics: ${B instanceof Error ? B.message : "Unknown error"}`);
    }
  }
  function v(B) {
    const F = p(r, B);
    for (const P of F)
      s.add(P);
  }
  function p(B, F, P = []) {
    for (const U of B) {
      const ee = [...P, U.id];
      if (U.id === F)
        return ee;
      if (U.children && U.children.length > 0) {
        const W = p(U.children, F, ee);
        if (W.length > 0)
          return W;
      }
    }
    return [];
  }
  function _(B) {
    s.has(B) ? s.delete(B) : s.add(B), s = s;
  }
  function g(B) {
    return s.has(B);
  }
  function y(B) {
    return B.children && B.children.length > 0;
  }
  function I(B) {
    c("navigate", { topicId: B.id });
  }
  function E(B, F) {
    switch (B.key) {
      case "Enter":
      case " ":
        B.preventDefault(), I(F);
        break;
      case "ArrowRight":
        y(F) && !g(F.id) && (B.preventDefault(), _(F.id));
        break;
      case "ArrowLeft":
        y(F) && g(F.id) && (B.preventDefault(), _(F.id));
        break;
    }
  }
  function L() {
    const B = /* @__PURE__ */ new Set();
    C(r, B), s = B;
  }
  function T() {
    s.clear();
  }
  function C(B, F) {
    for (const P of B)
      F.add(P.id), P.children && P.children.length > 0 && C(P.children, F);
  }
  function z(B) {
    return y(B) ? g(B.id) ? "📂" : "📁" : "📄";
  }
  st(() => {
    t() && v(t().id);
  });
  var k = af(), w = d(k), A = h(d(w), 2), x = d(A), N = h(x, 2);
  l(A), l(w);
  var te = h(w, 2), J = d(te);
  {
    var H = (B) => {
      var F = nf();
      m(B, F);
    }, O = (B) => {
      var F = Re(), P = Ce(F);
      {
        var U = (W) => {
          var se = rf(), S = h(d(se), 2), M = d(S, !0);
          l(S);
          var V = h(S, 2);
          l(se), Z(() => q(M, o)), G("click", V, () => {
            a = !0, o = null, u();
          }), m(W, se);
        }, ee = (W) => {
          var se = sf();
          Le(se, 21, () => r, je, (S, M) => {
            tf(S, {
              get topic() {
                return i(M);
              },
              get currentTopic() {
                return t();
              },
              get expandedNodes() {
                return s;
              },
              isExpanded: g,
              hasChildren: y,
              toggleNode: _,
              handleTopicClick: I,
              handleTopicKeydown: E,
              getNodeIcon: z,
              level: 0
            });
          }), l(se), m(W, se);
        };
        K(
          P,
          (W) => {
            o ? W(U) : W(ee, !1);
          },
          !0
        );
      }
      m(B, F);
    };
    K(J, (B) => {
      a ? B(H) : B(O, !1);
    });
  }
  l(te), l(k), G("click", x, L), G("click", N, T), m(n, k), Oe();
}
var lf = /* @__PURE__ */ b('<div class="loading-container svelte-1y5fa3a"><div class="loading-spinner svelte-1y5fa3a"></div> <div class="loading-text svelte-1y5fa3a">Loading content...</div></div>'), cf = () => window.location.reload(), df = /* @__PURE__ */ b('<div class="error-container svelte-1y5fa3a"><div class="error-icon svelte-1y5fa3a">⚠️</div> <div class="error-title svelte-1y5fa3a">Error Loading Content</div> <div class="error-message svelte-1y5fa3a"> </div> <button class="retry-button svelte-1y5fa3a">Retry</button></div>'), uf = /* @__PURE__ */ b('<div class="empty-container svelte-1y5fa3a"><div class="empty-icon svelte-1y5fa3a">📖</div> <div class="empty-title svelte-1y5fa3a">No Content Available</div> <div class="empty-message svelte-1y5fa3a">Select a topic from the table of contents to view its content.</div></div>'), vf = /* @__PURE__ */ b('<h2 class="content-subtitle svelte-1y5fa3a"> </h2>'), ff = /* @__PURE__ */ b('<h1 class="content-title svelte-1y5fa3a"> </h1> <!>', 1), hf = /* @__PURE__ */ b('<li class="related-item svelte-1y5fa3a"><a class="related-link svelte-1y5fa3a"> </a></li>'), pf = /* @__PURE__ */ b('<div class="related-topics svelte-1y5fa3a"><h3 class="related-title svelte-1y5fa3a">Related Topics</h3> <ul class="related-list svelte-1y5fa3a"></ul></div>'), mf = /* @__PURE__ */ b('<div class="content-container svelte-1y5fa3a" role="main" aria-label="Help content"><div class="content-header svelte-1y5fa3a"><!></div> <div class="content-body svelte-1y5fa3a"><!></div> <!></div>'), gf = /* @__PURE__ */ b('<div class="content-area win98-content-area svelte-1y5fa3a"><!></div>');
function bf(n, e) {
  Fe(e, !0);
  let t = be(e, "currentTopic", 3, null), r = be(e, "isLoading", 3, !1), s = be(e, "error", 3, null), a, o = /* @__PURE__ */ j(0);
  const c = /* @__PURE__ */ ze(() => t() && t().content), u = /* @__PURE__ */ ze(() => t()?.content || "");
  function v(E) {
    const L = E.target;
    f(o, L.scrollTop, !0);
  }
  function p(E) {
    const L = E.target;
    if (L.tagName === "A") {
      E.preventDefault();
      const T = L.getAttribute("href");
      if (T)
        if (T.startsWith("#")) {
          const C = T.substring(1), z = new CustomEvent("topic-navigate", { detail: { topicId: C }, bubbles: !0 });
          L.dispatchEvent(z);
        } else
          window.open(T, "_blank");
    }
  }
  wt(() => {
    a && (a.addEventListener("scroll", v), a.addEventListener("click", p));
  }), Yr(() => {
    a && (a.removeEventListener("scroll", v), a.removeEventListener("click", p));
  });
  var _ = gf(), g = d(_);
  {
    var y = (E) => {
      var L = lf();
      m(E, L);
    }, I = (E) => {
      var L = Re(), T = Ce(L);
      {
        var C = (k) => {
          var w = df(), A = h(d(w), 4), x = d(A, !0);
          l(A);
          var N = h(A, 2);
          N.__click = [cf], l(w), Z(() => q(x, s())), m(k, w);
        }, z = (k) => {
          var w = Re(), A = Ce(w);
          {
            var x = (te) => {
              var J = uf();
              m(te, J);
            }, N = (te) => {
              var J = mf(), H = d(J), O = d(H);
              {
                var B = (W) => {
                  var se = ff(), S = Ce(se), M = d(S, !0);
                  l(S);
                  var V = h(S, 2);
                  {
                    var $ = (Y) => {
                      var oe = vf(), ie = d(oe, !0);
                      l(oe), Z(() => q(ie, t().subtitle)), m(Y, oe);
                    };
                    K(V, (Y) => {
                      t().subtitle && Y($);
                    });
                  }
                  Z(() => q(M, t().title)), m(W, se);
                };
                K(O, (W) => {
                  t() && W(B);
                });
              }
              l(H);
              var F = h(H, 2), P = d(F);
              vl(P, () => i(u)), l(F);
              var U = h(F, 2);
              {
                var ee = (W) => {
                  var se = pf(), S = h(d(se), 2);
                  Le(S, 21, () => t().relatedTopics, je, (M, V) => {
                    var $ = hf(), Y = d($), oe = d(Y, !0);
                    l(Y), l($), Z(() => {
                      Se(Y, "href", `#${i(V).id ?? ""}`), Se(Y, "title", i(V).title), q(oe, i(V).title);
                    }), m(M, $);
                  }), l(S), l(se), m(W, se);
                };
                K(U, (W) => {
                  t()?.relatedTopics && t().relatedTopics.length > 0 && W(ee);
                });
              }
              l(J), Tt(J, (W) => a = W, () => a), m(te, J);
            };
            K(
              A,
              (te) => {
                i(c) ? te(N, !1) : te(x);
              },
              !0
            );
          }
          m(k, w);
        };
        K(
          T,
          (k) => {
            s() ? k(C) : k(z, !1);
          },
          !0
        );
      }
      m(E, L);
    };
    K(g, (E) => {
      r() ? E(y) : E(I, !1);
    });
  }
  l(_), m(n, _), Oe();
}
tt(["click"]);
var wf = /* @__PURE__ */ b('<span class="status-message svelte-fzb8h3"> </span>'), _f = /* @__PURE__ */ b('<span class="progress-text svelte-fzb8h3"> </span>'), yf = /* @__PURE__ */ b('<div class="status-progress svelte-fzb8h3"><div class="progress-bar svelte-fzb8h3"><div class="progress-fill svelte-fzb8h3"></div></div> <!></div>'), kf = /* @__PURE__ */ b('<span class="status-topic-id svelte-fzb8h3"> </span>'), xf = /* @__PURE__ */ b('<div class="status-bar win98-status-bar svelte-fzb8h3"><div class="status-left svelte-fzb8h3"><span class="status-text svelte-fzb8h3"> </span> <!></div> <div class="status-center svelte-fzb8h3"><!></div> <div class="status-right svelte-fzb8h3"><span class="status-system svelte-fzb8h3"> </span> <!></div></div>');
function Sf(n, e) {
  Fe(e, !0);
  let t = be(e, "currentTopic", 3, null), r = be(e, "isLoading", 3, !1), s = be(e, "progress", 3, 0), a = be(e, "message", 3, "");
  const o = /* @__PURE__ */ ze(() => t() ? t().title : "Ready"), c = /* @__PURE__ */ ze(() => s() > 0 ? `${Math.round(s())}%` : ""), u = /* @__PURE__ */ ze(() => e.systemState?.isOnline ? "Online" : "Offline");
  var v = xf(), p = d(v), _ = d(p), g = d(_, !0);
  l(_);
  var y = h(_, 2);
  {
    var I = (x) => {
      var N = wf(), te = d(N, !0);
      l(N), Z(() => q(te, a())), m(x, N);
    };
    K(y, (x) => {
      a() && x(I);
    });
  }
  l(p);
  var E = h(p, 2), L = d(E);
  {
    var T = (x) => {
      var N = yf(), te = d(N), J = d(te);
      l(te);
      var H = h(te, 2);
      {
        var O = (B) => {
          var F = _f(), P = d(F, !0);
          l(F), Z(() => q(P, i(c))), m(B, F);
        };
        K(H, (B) => {
          i(c) && B(O);
        });
      }
      l(N), Z(() => qt(J, `width: ${s() ?? ""}%`)), m(x, N);
    };
    K(L, (x) => {
      r() && x(T);
    });
  }
  l(E);
  var C = h(E, 2), z = d(C), k = d(z, !0);
  l(z);
  var w = h(z, 2);
  {
    var A = (x) => {
      var N = kf(), te = d(N);
      l(N), Z(() => q(te, `Topic: ${t().id ?? ""}`)), m(x, N);
    };
    K(w, (x) => {
      t() && x(A);
    });
  }
  l(C), l(v), Z(() => {
    q(g, i(o)), q(k, i(u));
  }), m(n, v), Oe();
}
function Tf(n, e) {
  f(e, !i(e));
}
var Ef = (n, e) => n.key === "Enter" && e(), Cf = /* @__PURE__ */ b('<div class="search-error svelte-1iypcgc"><div class="error-icon svelte-1iypcgc">⚠️</div> <div class="error-text svelte-1iypcgc"> </div></div>'), zf = (n, e, t) => e(i(t).id), Mf = /* @__PURE__ */ b('<div class="result-description svelte-1iypcgc"> </div>'), If = /* @__PURE__ */ b('<div><div class="result-title svelte-1iypcgc"> </div> <!></div>'), Af = /* @__PURE__ */ b('<div class="results-list svelte-1iypcgc"></div>'), Df = /* @__PURE__ */ b('<div class="no-results svelte-1iypcgc"><div class="no-results-icon svelte-1iypcgc">🔍</div> <div class="no-results-text svelte-1iypcgc"> </div></div>'), Lf = /* @__PURE__ */ b('<div class="search-prompt svelte-1iypcgc"><div class="prompt-icon svelte-1iypcgc">💡</div> <div class="prompt-text svelte-1iypcgc">Enter a search term to find help topics</div></div>'), Rf = /* @__PURE__ */ b('<div class="panel-content svelte-1iypcgc"><div class="search-input-container svelte-1iypcgc"><input type="text" class="search-input win98-input svelte-1iypcgc" placeholder="Search help topics..."/> <button class="search-button win98-button svelte-1iypcgc"> </button></div> <div class="search-results svelte-1iypcgc"><!></div></div>'), Bf = /* @__PURE__ */ b('<div class="search-panel win98-panel svelte-1iypcgc"><div class="panel-header svelte-1iypcgc"><div class="panel-title svelte-1iypcgc"><span class="panel-icon svelte-1iypcgc">🔍</span> <span class="panel-label svelte-1iypcgc">Search</span></div> <div class="panel-controls svelte-1iypcgc"><span>▼</span></div></div> <!></div>');
function Ff(n, e) {
  Fe(e, !0);
  let t = be(e, "currentTopic", 11, null);
  const r = _t();
  let s = /* @__PURE__ */ j(""), a = /* @__PURE__ */ j(Be([])), o = /* @__PURE__ */ j(!1), c = /* @__PURE__ */ j(null), u = /* @__PURE__ */ j(!0);
  async function v() {
    if (!i(s).trim()) {
      f(a, [], !0);
      return;
    }
    f(o, !0), f(c, null);
    try {
      f(a, await e.helpSystem.searchEngine.search(i(s).trim()), !0);
    } catch (k) {
      f(c, k instanceof Error ? k.message : "Search failed", !0), f(a, [], !0);
    } finally {
      f(o, !1);
    }
  }
  function p() {
    clearTimeout(g), g = setTimeout(v, 300);
  }
  function _(k) {
    r("topic-select", k);
  }
  let g;
  var y = Bf(), I = d(y);
  I.__click = [Tf, u];
  var E = h(d(I), 2), L = d(E);
  let T;
  l(E), l(I);
  var C = h(I, 2);
  {
    var z = (k) => {
      var w = Rf(), A = d(w), x = d(A);
      gt(x), x.__input = p, x.__keydown = [Ef, v];
      var N = h(x, 2);
      N.__click = v;
      var te = d(N, !0);
      l(N), l(A);
      var J = h(A, 2), H = d(J);
      {
        var O = (F) => {
          var P = Cf(), U = h(d(P), 2), ee = d(U, !0);
          l(U), l(P), Z(() => q(ee, i(c))), m(F, P);
        }, B = (F) => {
          var P = Re(), U = Ce(P);
          {
            var ee = (se) => {
              Ja(se, {
                children: (S, M) => {
                  var V = Af();
                  Le(V, 21, () => i(a), ($) => $.id, ($, Y) => {
                    var oe = If();
                    let ie;
                    oe.__click = [zf, _, Y];
                    var re = d(oe), ae = d(re, !0);
                    l(re);
                    var fe = h(re, 2);
                    {
                      var me = (ve) => {
                        var X = Mf(), le = d(X, !0);
                        l(X), Z(() => q(le, i(Y).description)), m(ve, X);
                      };
                      K(fe, (ve) => {
                        i(Y).description && ve(me);
                      });
                    }
                    l(oe), Z(
                      (ve) => {
                        ie = xe(oe, 1, "result-item svelte-1iypcgc", null, ie, ve), q(ae, i(Y).title);
                      },
                      [() => ({ current: t()?.id === i(Y).id })]
                    ), m($, oe);
                  }), l(V), m(S, V);
                },
                $$slots: { default: !0 }
              });
            }, W = (se) => {
              var S = Re(), M = Ce(S);
              {
                var V = (Y) => {
                  var oe = Df(), ie = h(d(oe), 2), re = d(ie);
                  l(ie), l(oe), Z(() => q(re, `No results found for "${i(s) ?? ""}"`)), m(Y, oe);
                }, $ = (Y) => {
                  var oe = Lf();
                  m(Y, oe);
                };
                K(
                  M,
                  (Y) => {
                    i(s).trim() ? Y(V) : Y($, !1);
                  },
                  !0
                );
              }
              m(se, S);
            };
            K(
              U,
              (se) => {
                i(a).length > 0 ? se(ee) : se(W, !1);
              },
              !0
            );
          }
          m(F, P);
        };
        K(H, (F) => {
          i(c) ? F(O) : F(B, !1);
        });
      }
      l(J), l(w), Z(() => {
        N.disabled = i(o), q(te, i(o) ? "⏳" : "🔍");
      }), Dt(x, () => i(s), (F) => f(s, F)), m(k, w);
    };
    K(C, (k) => {
      i(u) && k(z);
    });
  }
  l(y), Z((k) => T = xe(L, 1, "expand-icon svelte-1iypcgc", null, T, k), [() => ({ expanded: i(u) })]), m(n, y), Oe();
}
tt(["click", "input", "keydown"]);
function Ys(n, e, t) {
  n.key === "Enter" ? e() : n.key === "Escape" && t();
}
function Of(n, e) {
  f(e, !i(e));
}
var Hf = (n, e) => {
  n.stopPropagation(), f(e, !0);
}, Pf = (n, e, t) => e(i(t)), Nf = (n, e, t) => e(i(t), n), jf = (n, e, t) => e(i(t).id, n), qf = /* @__PURE__ */ b('<div role="button" tabindex="0"><div class="favorite-content svelte-an0cof"><div class="favorite-title svelte-an0cof"> </div> <div class="favorite-url svelte-an0cof"> </div></div> <div class="favorite-actions svelte-an0cof"><button class="action-button edit-button svelte-an0cof" title="Edit favorite">✏️</button> <button class="action-button remove-button svelte-an0cof" title="Remove favorite">×</button></div></div>'), Wf = /* @__PURE__ */ b('<div class="search-container svelte-an0cof"><input type="text" class="search-input svelte-an0cof" placeholder="Search favorites..."/></div> <div class="favorites-list svelte-an0cof"></div>', 1), Uf = (n, e) => f(e, !0), Kf = /* @__PURE__ */ b('<div class="empty-state svelte-an0cof"><div class="empty-icon svelte-an0cof">⭐</div> <div class="empty-title svelte-an0cof">No Favorites</div> <div class="empty-message svelte-an0cof">Add topics to your favorites for quick access.</div> <button class="add-first-button svelte-an0cof">Add First Favorite</button></div>'), Gf = /* @__PURE__ */ b('<div class="panel-content svelte-an0cof"><!></div>'), Vf = (n) => n.stopPropagation(), Yf = /* @__PURE__ */ b('<div class="dialog-overlay svelte-an0cof"><div class="dialog svelte-an0cof"><div class="dialog-header svelte-an0cof"><div class="dialog-title svelte-an0cof">Add to Favorites</div> <button class="dialog-close svelte-an0cof">×</button></div> <div class="dialog-content svelte-an0cof"><div class="form-group svelte-an0cof"><label for="bookmark-title" class="svelte-an0cof">Title:</label> <input id="bookmark-title" type="text" class="form-input svelte-an0cof" placeholder="Enter bookmark title"/></div> <div class="form-group svelte-an0cof"><label for="bookmark-url" class="svelte-an0cof">URL:</label> <input id="bookmark-url" type="text" class="form-input svelte-an0cof" placeholder="Enter bookmark URL"/></div></div> <div class="dialog-buttons svelte-an0cof"><button class="dialog-button svelte-an0cof">Cancel</button> <button class="dialog-button primary svelte-an0cof">Add</button></div></div></div>'), Xf = /* @__PURE__ */ b('<div class="favorites-panel win98-panel svelte-an0cof"><div class="panel-header svelte-an0cof"><div class="panel-title svelte-an0cof"><span class="panel-icon svelte-an0cof">⭐</span> Favorites</div> <div class="panel-controls svelte-an0cof"><button class="panel-button add-button svelte-an0cof" title="Add to Favorites">+</button> <button> </button></div></div> <!></div> <!>', 1);
function Jf(n, e) {
  Fe(e, !0);
  let t = be(e, "favorites", 19, () => []), r = be(e, "currentTopic", 3, null), s = /* @__PURE__ */ j(!0), a = /* @__PURE__ */ j(""), o = /* @__PURE__ */ j(!1), c = /* @__PURE__ */ j(""), u = /* @__PURE__ */ j("");
  const v = _t(), p = /* @__PURE__ */ ze(() => () => {
    if (!i(a).trim()) return t();
    const B = i(a).toLowerCase();
    return t().filter((F) => F.title.toLowerCase().includes(B) || F.url.toLowerCase().includes(B));
  }), _ = /* @__PURE__ */ ze(() => t().length > 0);
  function g(B) {
    v("favorite-select", { bookmark: B });
  }
  function y(B, F) {
    F.stopPropagation(), v("favorite-remove", { id: B });
  }
  function I(B, F) {
    F.stopPropagation(), f(c, B.title, !0), f(u, B.url, !0), f(o, !0);
  }
  function E() {
    i(c).trim() && i(u).trim() && (v("favorite-add", {
      title: i(c).trim(),
      url: i(u).trim()
    }), f(c, ""), f(u, ""), f(o, !1));
  }
  function L() {
    f(c, ""), f(u, ""), f(o, !1);
  }
  var T = Xf(), C = Ce(T), z = d(C);
  z.__click = [Of, s];
  var k = h(d(z), 2), w = d(k);
  w.__click = [Hf, o];
  var A = h(w, 2);
  let x;
  var N = d(A, !0);
  l(A), l(k), l(z);
  var te = h(z, 2);
  {
    var J = (B) => {
      var F = Gf(), P = d(F);
      {
        var U = (W) => {
          var se = Wf(), S = Ce(se), M = d(S);
          gt(M), l(S);
          var V = h(S, 2);
          Le(V, 21, () => i(p), ($) => $.id, ($, Y) => {
            var oe = qf();
            let ie;
            oe.__click = [Pf, g, Y];
            var re = d(oe), ae = d(re), fe = d(ae, !0);
            l(ae);
            var me = h(ae, 2), ve = d(me, !0);
            l(me), l(re);
            var X = h(re, 2), le = d(X);
            le.__click = [Nf, I, Y];
            var we = h(le, 2);
            we.__click = [jf, y, Y], l(X), l(oe), Z(
              (D) => {
                ie = xe(oe, 1, "favorite-item svelte-an0cof", null, ie, D), q(fe, i(Y).title), q(ve, i(Y).url);
              },
              [
                () => ({ current: r()?.id === i(Y).url })
              ]
            ), m($, oe);
          }), l(V), Dt(M, () => i(a), ($) => f(a, $)), m(W, se);
        }, ee = (W) => {
          var se = Kf(), S = h(d(se), 6);
          S.__click = [Uf, o], l(se), m(W, se);
        };
        K(P, (W) => {
          i(_) ? W(U) : W(ee, !1);
        });
      }
      l(F), m(B, F);
    };
    K(te, (B) => {
      i(s) && B(J);
    });
  }
  l(C);
  var H = h(C, 2);
  {
    var O = (B) => {
      var F = Yf();
      F.__click = L;
      var P = d(F);
      P.__click = [Vf];
      var U = d(P), ee = h(d(U), 2);
      ee.__click = L, l(U);
      var W = h(U, 2), se = d(W), S = h(d(se), 2);
      gt(S), S.__keydown = [Ys, E, L], l(se);
      var M = h(se, 2), V = h(d(M), 2);
      gt(V), V.__keydown = [Ys, E, L], l(M), l(W);
      var $ = h(W, 2), Y = d($);
      Y.__click = L;
      var oe = h(Y, 2);
      oe.__click = E, l($), l(P), l(F), Dt(S, () => i(c), (ie) => f(c, ie)), Dt(V, () => i(u), (ie) => f(u, ie)), m(B, F);
    };
    K(H, (B) => {
      i(o) && B(O);
    });
  }
  Z(
    (B) => {
      x = xe(A, 1, "panel-button toggle-button svelte-an0cof", null, x, B), Se(A, "title", i(s) ? "Collapse" : "Expand"), q(N, i(s) ? "−" : "+");
    },
    [() => ({ expanded: i(s) })]
  ), m(n, T), Oe();
}
tt(["click", "keydown"]);
var Zf = /* @__PURE__ */ b('<div class="history-loading svelte-v2eznj"><div class="loading-spinner svelte-v2eznj"></div> <p class="svelte-v2eznj">Loading history...</p></div>'), Qf = /* @__PURE__ */ b('<div class="history-error svelte-v2eznj"><p class="svelte-v2eznj"> </p> <button class="svelte-v2eznj">Retry</button></div>'), $f = /* @__PURE__ */ b(`<div class="history-empty svelte-v2eznj"><div class="empty-content svelte-v2eznj"><h3 class="svelte-v2eznj">No History</h3> <p class="svelte-v2eznj">You haven't visited any topics yet.</p> <p class="svelte-v2eznj">Navigate through help topics to build your history.</p></div></div>`), eh = /* @__PURE__ */ b('<li class="svelte-v2eznj"><button class="most-visited-link svelte-v2eznj"> </button></li>'), th = /* @__PURE__ */ b('<div class="most-visited svelte-v2eznj"><h5 class="svelte-v2eznj">Most Visited Topics:</h5> <ul class="svelte-v2eznj"></ul></div>'), nh = /* @__PURE__ */ b('<div class="history-stats svelte-v2eznj"><h4 class="svelte-v2eznj">History Statistics</h4> <div class="stats-grid svelte-v2eznj"><div class="stat-item svelte-v2eznj"><span class="stat-label svelte-v2eznj">Total Visits:</span> <span class="stat-value svelte-v2eznj"> </span></div> <div class="stat-item svelte-v2eznj"><span class="stat-label svelte-v2eznj">Unique Topics:</span> <span class="stat-value svelte-v2eznj"> </span></div></div> <!></div>'), rh = /* @__PURE__ */ b('<div class="current-indicator svelte-v2eznj">← Current position</div>'), ih = /* @__PURE__ */ b('<div tabindex="0" role="button" title="Click to navigate, Delete to remove"><div class="history-content svelte-v2eznj"><div class="history-header svelte-v2eznj"><span class="history-icon svelte-v2eznj">📄</span> <span class="history-title svelte-v2eznj"> </span> <button class="remove-button svelte-v2eznj" title="Remove from history">✕</button></div> <div class="history-meta svelte-v2eznj"><span class="history-category svelte-v2eznj"> </span> <span class="history-position svelte-v2eznj"> </span></div> <!></div></div>'), sh = /* @__PURE__ */ b('<div class="history-interface svelte-v2eznj"><div class="history-controls svelte-v2eznj"><div class="history-info svelte-v2eznj"><span class="svelte-v2eznj"> </span> <button class="stats-button svelte-v2eznj" title="Show statistics">📊</button></div> <div class="history-actions svelte-v2eznj"><button class="clear-button svelte-v2eznj" title="Clear all history">Clear All</button></div></div> <!> <div class="history-list svelte-v2eznj"><div class="history-items svelte-v2eznj"></div></div></div>'), ah = /* @__PURE__ */ b('<div class="help-history-panel svelte-v2eznj"><!></div>');
function oh(n, e) {
  Fe(e, !0);
  let t = /* @__PURE__ */ j(Be([])), r = Be(/* @__PURE__ */ new Map()), s = /* @__PURE__ */ j(!0), a = /* @__PURE__ */ j(null), o = /* @__PURE__ */ j(-1), c = /* @__PURE__ */ j(!1);
  const u = _t();
  async function v() {
    try {
      f(s, !0), f(a, null);
      const k = e.helpManager.getHistory();
      f(t, k, !0), f(o, e.helpManager.getCurrentIndex(), !0), r.clear();
      for (const w of k) {
        const A = e.helpManager.getTopic(w);
        A && r.set(w, A);
      }
    } catch (k) {
      f(a, `Failed to load history: ${k instanceof Error ? k.message : "Unknown error"}`), console.error("Error loading history:", k);
    } finally {
      f(s, !1);
    }
  }
  function p(k, w) {
    for (; e.helpManager.getCurrentIndex() < w; )
      e.helpManager.goForward();
    for (; e.helpManager.getCurrentIndex() > w; )
      e.helpManager.goBack();
    u("topic-select", k);
  }
  function _() {
    confirm("Are you sure you want to clear all history?") && (e.helpManager.clearHistory(), v());
  }
  function g(k) {
    e.helpManager.removeFromHistory(k), v();
  }
  function y(k, w, A) {
    k.key === "Enter" || k.key === " " ? (k.preventDefault(), p(w, A)) : k.key === "Delete" && (k.preventDefault(), g(w));
  }
  function I() {
    f(c, !i(c));
  }
  let E = /* @__PURE__ */ ze(() => (() => {
    const k = new Set(i(t)).size, w = i(t).length, A = e.helpManager.getMostVisited().slice(0, 5);
    return { uniqueTopics: k, totalVisits: w, mostVisited: A };
  })());
  wt(() => (v(), e.helpManager?.on("history:updated", () => {
    v();
  })));
  var L = ah(), T = d(L);
  {
    var C = (k) => {
      var w = Zf();
      m(k, w);
    }, z = (k) => {
      var w = Re(), A = Ce(w);
      {
        var x = (te) => {
          var J = Qf(), H = d(J), O = d(H, !0);
          l(H);
          var B = h(H, 2);
          l(J), Z(() => q(O, i(a))), G("click", B, v), m(te, J);
        }, N = (te) => {
          var J = Re(), H = Ce(J);
          {
            var O = (F) => {
              var P = $f();
              m(F, P);
            }, B = (F) => {
              var P = sh(), U = d(P), ee = d(U), W = d(ee), se = d(W);
              l(W);
              var S = h(W, 2);
              l(ee);
              var M = h(ee, 2), V = d(M);
              l(M), l(U);
              var $ = h(U, 2);
              {
                var Y = (re) => {
                  var ae = nh(), fe = h(d(ae), 2), me = d(fe), ve = h(d(me), 2), X = d(ve, !0);
                  l(ve), l(me);
                  var le = h(me, 2), we = h(d(le), 2), D = d(we, !0);
                  l(we), l(le), l(fe);
                  var Q = h(fe, 2);
                  {
                    var R = (ne) => {
                      var ge = th(), de = h(d(ge), 2);
                      Le(de, 21, () => i(E).mostVisited, je, (pe, he) => {
                        const ke = /* @__PURE__ */ ze(() => r.get(i(he)));
                        var Me = Re(), _e = Ce(Me);
                        {
                          var ye = (Ue) => {
                            var qe = eh(), Ke = d(qe), Ve = d(Ke, !0);
                            l(Ke), l(qe), Z(() => q(Ve, i(ke).title)), G("click", Ke, () => u("topic-select", i(he))), m(Ue, qe);
                          };
                          K(_e, (Ue) => {
                            i(ke) && Ue(ye);
                          });
                        }
                        m(pe, Me);
                      }), l(de), l(ge), m(ne, ge);
                    };
                    K(Q, (ne) => {
                      i(E).mostVisited.length > 0 && ne(R);
                    });
                  }
                  l(ae), Z(() => {
                    q(X, i(E).totalVisits), q(D, i(E).uniqueTopics);
                  }), m(re, ae);
                };
                K($, (re) => {
                  i(c) && re(Y);
                });
              }
              var oe = h($, 2), ie = d(oe);
              Le(ie, 21, () => i(t), je, (re, ae, fe) => {
                const me = /* @__PURE__ */ ze(() => r.get(i(ae)));
                var ve = Re(), X = Ce(ve);
                {
                  var le = (we) => {
                    var D = ih();
                    let Q;
                    var R = d(D), ne = d(R), ge = h(d(ne), 2), de = d(ge, !0);
                    l(ge);
                    var pe = h(ge, 2);
                    l(ne);
                    var he = h(ne, 2), ke = d(he), Me = d(ke, !0);
                    l(ke);
                    var _e = h(ke, 2), ye = d(_e);
                    l(_e), l(he);
                    var Ue = h(he, 2);
                    {
                      var qe = (Ke) => {
                        var Ve = rh();
                        m(Ke, Ve);
                      };
                      K(Ue, (Ke) => {
                        fe === i(o) && Ke(qe);
                      });
                    }
                    l(R), l(D), Z(
                      (Ke) => {
                        Q = xe(D, 1, "history-item svelte-v2eznj", null, Q, Ke), q(de, i(me).title), q(Me, i(me).category), q(ye, `${fe + 1} of ${i(t).length ?? ""}`);
                      },
                      [() => ({ current: fe === i(o) })]
                    ), G("click", pe, Mn(() => g(i(ae)))), G("click", D, () => p(i(ae), fe)), G("keydown", D, (Ke) => y(Ke, i(ae), fe)), m(we, D);
                  };
                  K(X, (we) => {
                    i(me) && we(le);
                  });
                }
                m(re, ve);
              }), l(ie), l(oe), l(P), Z(() => q(se, `${i(t).length ?? ""} entries`)), G("click", S, I), G("click", V, _), m(F, P);
            };
            K(
              H,
              (F) => {
                i(t).length === 0 ? F(O) : F(B, !1);
              },
              !0
            );
          }
          m(te, J);
        };
        K(
          A,
          (te) => {
            i(a) ? te(x) : te(N, !1);
          },
          !0
        );
      }
      m(k, w);
    };
    K(T, (k) => {
      i(s) ? k(C) : k(z, !1);
    });
  }
  l(L), m(n, L), Oe();
}
var lh = /* @__PURE__ */ b('<div><div class="title-bar-text svelte-1ykz96w"><span class="title-bar-icon svelte-1ykz96w">📖</span> </div> <div class="title-bar-controls svelte-1ykz96w"><button class="title-bar-button minimize svelte-1ykz96w" title="Minimize"><span class="minimize-icon svelte-1ykz96w">_</span></button> <button class="title-bar-button maximize svelte-1ykz96w"><span class="maximize-icon svelte-1ykz96w"> </span></button> <button class="title-bar-button close svelte-1ykz96w" title="Close"><span class="close-icon svelte-1ykz96w">×</span></button></div></div>'), ch = /* @__PURE__ */ b('<div class="loading-overlay svelte-1ykz96w"><div class="loading-spinner svelte-1ykz96w"></div> <div class="loading-text svelte-1ykz96w">Loading help system...</div></div>'), dh = /* @__PURE__ */ b('<div class="error-overlay svelte-1ykz96w"><div class="error-content svelte-1ykz96w"><div class="error-icon svelte-1ykz96w">⚠️</div> <div class="error-title svelte-1ykz96w">Error</div> <div class="error-message svelte-1ykz96w"> </div> <button class="error-button svelte-1ykz96w">OK</button></div></div>'), uh = /* @__PURE__ */ b('<div><!> <!> <!> <!> <div class="main-content svelte-1ykz96w"><div class="left-panel svelte-1ykz96w"><!></div> <div></div> <div class="right-panel svelte-1ykz96w"><!></div></div> <!> <!> <!></div>');
function tm(n, e) {
  Fe(e, !0);
  let t = be(e, "config", 27, () => Be({})), r = be(e, "initialTopic", 11, null), s = be(e, "windowTitle", 11, "Windows 98 Help System"), a, o, c = null, u = !0, v = null, p, _ = !1, g = !1, y = [];
  wt(async () => {
    try {
      a = new Za(t()), I(), await a.initialize(), r() ? await a.navigateTo(r()) : await a.goHome(), o = a.getState(), c = o.currentTopic ? a.getTopic(o.currentTopic) : null, p = o.windowState, u = !1;
    } catch (X) {
      v = X instanceof Error ? X.message : "Failed to initialize help system", u = !1;
    }
  }), Yr(() => {
    y.forEach((X) => X()), a && a.destroy();
  });
  function I() {
    if (!a) return;
    const X = a.on("state:changed", (D) => {
      o = D, c = D.currentTopic ? a.getTopic(D.currentTopic) : null;
    }), le = a.on("topic:changed", ({ topic: D }) => {
      c = D;
    }), we = a.on("error:occurred", ({ error: D }) => {
      v = D.message;
    });
    y.push(X, le, we);
  }
  async function E(X) {
    try {
      v = null, await a.navigateTo(X);
    } catch (le) {
      v = le instanceof Error ? le.message : "Navigation failed";
    }
  }
  async function L() {
    try {
      v = null, await a.goBack();
    } catch (X) {
      v = X instanceof Error ? X.message : "Go back failed";
    }
  }
  async function T() {
    try {
      v = null, await a.goForward();
    } catch (X) {
      v = X instanceof Error ? X.message : "Go forward failed";
    }
  }
  async function C() {
    try {
      v = null, await a.goHome();
    } catch (X) {
      v = X instanceof Error ? X.message : "Go home failed";
    }
  }
  async function z(X) {
    try {
      v = null, await a.search(X);
    } catch (le) {
      v = le instanceof Error ? le.message : "Search failed";
    }
  }
  async function k(X) {
    try {
      v = null, await a.addBookmark(X);
    } catch (le) {
      v = le instanceof Error ? le.message : "Failed to add bookmark";
    }
  }
  async function w(X) {
    try {
      v = null, await a.removeBookmark(X);
    } catch (le) {
      v = le instanceof Error ? le.message : "Failed to remove bookmark";
    }
  }
  function A(X) {
    a.setActiveTab(X);
  }
  function x() {
    _ = !_, a.setWindowState({ maximized: _ });
  }
  function N() {
    g = !g;
  }
  function te() {
    console.log("Help system closed");
  }
  function J(X) {
    a.setWindowState({ splitterPosition: X });
  }
  function H(X) {
    a.setUserPreferences(X);
  }
  var O = uh();
  let B;
  var F = d(O);
  {
    var P = (X) => {
      var le = lh();
      xe(le, 1, "title-bar svelte-1ykz96w", null, {}, { draggable });
      var we = d(le), D = h(d(we));
      l(we);
      var Q = h(we, 2), R = d(Q), ne = h(R, 2), ge = d(ne), de = d(ge, !0);
      l(ge), l(ne);
      var pe = h(ne, 2);
      l(Q), l(le), Z(() => {
        q(D, ` ${s() ?? ""}`), Se(ne, "title", _ ? "Restore" : "Maximize"), q(de, _ ? "⧉" : "□");
      }), G("click", R, N), G("click", ne, x), G("click", pe, te), m(X, le);
    };
    K(F, (X) => {
      showWindowControls && X(P);
    });
  }
  var U = h(F, 2);
  Bv(U, {
    get helpSystem() {
      return a;
    },
    get currentTopic() {
      return c;
    },
    $$events: {
      navigate: E,
      search: z,
      bookmark: k,
      "preference-change": H
    }
  });
  var ee = h(U, 2);
  {
    let X = /* @__PURE__ */ ze(() => a?.canGoBack() || !1), le = /* @__PURE__ */ ze(() => a?.canGoForward() || !1);
    Uv(ee, {
      get helpSystem() {
        return a;
      },
      get currentTopic() {
        return c;
      },
      get canGoBack() {
        return i(X);
      },
      get canGoForward() {
        return i(le);
      },
      $$events: {
        navigate: E,
        "go-back": L,
        "go-forward": T,
        "go-home": C,
        search: z,
        bookmark: k
      }
    });
  }
  var W = h(ee, 2);
  {
    let X = /* @__PURE__ */ ze(() => o?.activeTab || "contents");
    Vv(W, {
      get activeTab() {
        return i(X);
      },
      $$events: { "tab-change": A }
    });
  }
  var se = h(W, 2), S = d(se), M = d(S);
  {
    var V = (X) => {
      of(X, {
        get helpSystem() {
          return a;
        },
        get currentTopic() {
          return c;
        },
        $$events: { navigate: E }
      });
    }, $ = (X) => {
      var le = Re(), we = Ce(le);
      {
        var D = (R) => {
          Ff(R, {
            get helpSystem() {
              return a;
            },
            $$events: { search: z, navigate: E }
          });
        }, Q = (R) => {
          var ne = Re(), ge = Ce(ne);
          {
            var de = (he) => {
              Jf(he, {
                get helpSystem() {
                  return a;
                },
                $$events: { navigate: E, bookmark: w }
              });
            }, pe = (he) => {
              var ke = Re(), Me = Ce(ke);
              {
                var _e = (ye) => {
                  oh(ye, {
                    get helpSystem() {
                      return a;
                    },
                    $$events: { navigate: E }
                  });
                };
                K(
                  Me,
                  (ye) => {
                    o?.activeTab === "history" && ye(_e);
                  },
                  !0
                );
              }
              m(he, ke);
            };
            K(
              ge,
              (he) => {
                o?.activeTab === "favorites" ? he(de) : he(pe, !1);
              },
              !0
            );
          }
          m(R, ne);
        };
        K(
          we,
          (R) => {
            o?.activeTab === "index" ? R(D) : R(Q, !1);
          },
          !0
        );
      }
      m(X, le);
    };
    K(M, (X) => {
      o?.activeTab === "contents" ? X(V) : X($, !1);
    });
  }
  l(S);
  var Y = h(S, 2);
  xe(Y, 1, "splitter svelte-1ykz96w", null, {}, { resizable });
  var oe = h(Y, 2), ie = d(oe);
  bf(ie, {
    get currentTopic() {
      return c;
    },
    get isLoading() {
      return u;
    },
    get error() {
      return v;
    },
    $$events: { navigate: E }
  }), l(oe), l(se);
  var re = h(se, 2);
  Sf(re, {
    get helpSystem() {
      return a;
    },
    get currentTopic() {
      return c;
    },
    get isLoading() {
      return u;
    },
    get error() {
      return v;
    }
  });
  var ae = h(re, 2);
  {
    var fe = (X) => {
      var le = ch();
      m(X, le);
    };
    K(ae, (X) => {
      u && X(fe);
    });
  }
  var me = h(ae, 2);
  {
    var ve = (X) => {
      var le = dh(), we = d(le), D = h(d(we), 4), Q = d(D, !0);
      l(D);
      var R = h(D, 2);
      l(we), l(le), Z(() => q(Q, v)), G("click", R, () => v = null), m(X, le);
    };
    K(me, (X) => {
      v && X(ve);
    });
  }
  l(O), Z(
    (X) => {
      B = xe(O, 1, "help-system svelte-1ykz96w", null, B, X), qt(O, `
    --window-width: ${p.size.width ?? ""}px;
    --window-height: ${p.size.height ?? ""}px;
    --splitter-position: ${p.splitterPosition ?? ""}px;
  `);
    },
    [
      () => ({
        maximized: _,
        minimized: g,
        loading: u,
        error: v
      })
    ]
  ), G("mousedown", Y, J), m(n, O), Oe();
}
var vh = /* @__PURE__ */ b('<span class="menu-shortcut svelte-ij4uz1"> </span>'), fh = /* @__PURE__ */ b('<button class="menu-dropdown-item svelte-ij4uz1"><span class="menu-label svelte-ij4uz1"> </span> <!></button>'), hh = /* @__PURE__ */ b('<div class="menu-dropdown svelte-ij4uz1"></div>'), ph = /* @__PURE__ */ b('<div><button class="menu-button svelte-ij4uz1"> </button> <!></div>'), mh = /* @__PURE__ */ b('<div class="help-dialog-overlay svelte-ij4uz1"><div class="help-dialog svelte-ij4uz1"><div class="dialog-header svelte-ij4uz1"><h3 class="svelte-ij4uz1">Print</h3> <button class="dialog-close svelte-ij4uz1">×</button></div> <div class="dialog-content svelte-ij4uz1"><p class="svelte-ij4uz1">Print functionality would be implemented here.</p> <div class="dialog-buttons svelte-ij4uz1"><button class="dialog-button primary svelte-ij4uz1">OK</button> <button class="dialog-button svelte-ij4uz1">Cancel</button></div></div></div></div>'), gh = /* @__PURE__ */ b('<div class="help-dialog-overlay svelte-ij4uz1"><div class="help-dialog svelte-ij4uz1"><div class="dialog-header svelte-ij4uz1"><h3 class="svelte-ij4uz1">Font</h3> <button class="dialog-close svelte-ij4uz1">×</button></div> <div class="dialog-content svelte-ij4uz1"><p class="svelte-ij4uz1">Font selection would be implemented here.</p> <div class="dialog-buttons svelte-ij4uz1"><button class="dialog-button primary svelte-ij4uz1">OK</button> <button class="dialog-button svelte-ij4uz1">Cancel</button></div></div></div></div>'), bh = /* @__PURE__ */ b('<div class="help-dialog-overlay svelte-ij4uz1"><div class="help-dialog svelte-ij4uz1"><div class="dialog-header svelte-ij4uz1"><h3 class="svelte-ij4uz1">About Help</h3> <button class="dialog-close svelte-ij4uz1">×</button></div> <div class="dialog-content svelte-ij4uz1"><div class="about-content svelte-ij4uz1"><h4 class="svelte-ij4uz1">Windows 98 F1 Help System</h4> <p class="svelte-ij4uz1">Version 1.0.0</p> <p class="svelte-ij4uz1">Part of the Abu OS 98 Web Kernel</p> <p class="svelte-ij4uz1">© 2024 Abu OS 98 Project</p></div> <div class="dialog-buttons svelte-ij4uz1"><button class="dialog-button primary svelte-ij4uz1">OK</button></div></div></div></div>'), wh = /* @__PURE__ */ b('<div class="help-menu-bar svelte-ij4uz1"></div> <!> <!> <!>', 1);
function nm(n, e) {
  Fe(e, !0);
  let t = be(e, "close", 3, () => {
  }), r = /* @__PURE__ */ j(null), s = /* @__PURE__ */ j(!1), a = /* @__PURE__ */ j(!1), o = /* @__PURE__ */ j(!1);
  const c = _t(), u = [
    {
      name: "File",
      items: [
        { label: "New", shortcut: "Ctrl+N", action: () => g() },
        {
          label: "Open...",
          shortcut: "Ctrl+O",
          action: () => y()
        },
        {
          label: "Print...",
          shortcut: "Ctrl+P",
          action: () => I()
        },
        { label: "Print Setup...", action: () => E() },
        {
          label: "Exit",
          shortcut: "Alt+F4",
          action: () => L()
        }
      ]
    },
    {
      name: "Edit",
      items: [
        {
          label: "Copy",
          shortcut: "Ctrl+C",
          action: () => T()
        },
        {
          label: "Find...",
          shortcut: "Ctrl+F",
          action: () => C()
        },
        {
          label: "Find Next",
          shortcut: "F3",
          action: () => z()
        }
      ]
    },
    {
      name: "Bookmark",
      items: [
        {
          label: "Define...",
          shortcut: "Ctrl+D",
          action: () => k()
        },
        { label: "Go to Bookmark", action: () => w() }
      ]
    },
    {
      name: "Options",
      items: [
        { label: "Font...", action: () => A() },
        { label: "Keep Help on Top", action: () => x() },
        {
          label: "Use System Colors",
          action: () => N()
        }
      ]
    },
    {
      name: "Help",
      items: [
        { label: "How to Use Help", action: () => te() },
        { label: "About Help", action: () => J() }
      ]
    }
  ];
  function v(S) {
    i(r) === S ? f(r, null) : f(r, S, !0);
  }
  function p(S) {
    S(), f(r, null);
  }
  function _(S) {
    S.target.closest(".help-menu-bar") || f(r, null);
  }
  function g() {
    console.log("New help window");
  }
  function y() {
    console.log("Open help file");
  }
  function I() {
    f(s, !0);
  }
  function E() {
    console.log("Print setup");
  }
  function L() {
    t()();
  }
  function T() {
    const S = e.helpManager?.getState().currentTopic;
    if (S) {
      const M = e.helpManager?.getTopic(S);
      M && navigator.clipboard?.writeText(M.content.replace(/<[^>]*>/g, ""));
    }
  }
  function C() {
    c("focus-search");
  }
  function z() {
    console.log("Find next");
  }
  function k() {
    const S = e.helpManager?.getState().currentTopic;
    if (S) {
      const M = e.helpManager?.getTopic(S);
      M && e.helpManager?.addBookmark(S, M.title);
    }
  }
  function w() {
    e.helpManager?.setActiveTab("favorites");
  }
  function A() {
    f(a, !0);
  }
  function x() {
    console.log("Keep on top");
  }
  function N() {
    console.log("Use system colors");
  }
  function te() {
    console.log("How to use help");
  }
  function J() {
    f(o, !0);
  }
  function H(S) {
    if (S.ctrlKey || S.altKey)
      switch (S.key) {
        case "n":
          S.ctrlKey && (S.preventDefault(), g());
          break;
        case "o":
          S.ctrlKey && (S.preventDefault(), y());
          break;
        case "p":
          S.ctrlKey && (S.preventDefault(), I());
          break;
        case "c":
          S.ctrlKey && (S.preventDefault(), T());
          break;
        case "f":
          S.ctrlKey && (S.preventDefault(), C());
          break;
        case "d":
          S.ctrlKey && (S.preventDefault(), k());
          break;
        case "F4":
          S.altKey && (S.preventDefault(), L());
          break;
      }
    else S.key === "F3" && (S.preventDefault(), z());
  }
  var O = wh();
  G("click", Rt, _), G("keydown", Rt, H);
  var B = Ce(O);
  Le(B, 21, () => u, je, (S, M) => {
    var V = ph();
    let $;
    var Y = d(V), oe = d(Y, !0);
    l(Y);
    var ie = h(Y, 2);
    {
      var re = (ae) => {
        var fe = hh();
        Le(fe, 21, () => i(M).items, je, (me, ve) => {
          var X = fh(), le = d(X), we = d(le, !0);
          l(le);
          var D = h(le, 2);
          {
            var Q = (R) => {
              var ne = vh(), ge = d(ne, !0);
              l(ne), Z(() => q(ge, i(ve).shortcut)), m(R, ne);
            };
            K(D, (R) => {
              i(ve).shortcut && R(Q);
            });
          }
          l(X), Z(() => q(we, i(ve).label)), G("click", X, () => p(i(ve).action)), G("keydown", X, (R) => R.key === "Enter" && p(i(ve).action)), m(me, X);
        }), l(fe), m(ae, fe);
      };
      K(ie, (ae) => {
        i(r) === i(M).name && ae(re);
      });
    }
    l(V), Z(
      (ae) => {
        $ = xe(V, 1, "menu-item svelte-ij4uz1", null, $, ae), q(oe, i(M).name);
      },
      [() => ({ active: i(r) === i(M).name })]
    ), G("click", Y, () => v(i(M).name)), G("keydown", Y, (ae) => ae.key === "Enter" && v(i(M).name)), m(S, V);
  }), l(B);
  var F = h(B, 2);
  {
    var P = (S) => {
      var M = mh(), V = d(M), $ = d(V), Y = h(d($), 2);
      l($);
      var oe = h($, 2), ie = h(d(oe), 2), re = d(ie), ae = h(re, 2);
      l(ie), l(oe), l(V), l(M), G("click", Y, () => f(s, !1)), G("click", re, () => f(s, !1)), G("click", ae, () => f(s, !1)), G("click", V, Mn(function(fe) {
        Fr.call(this, e, fe);
      })), G("click", M, () => f(s, !1)), m(S, M);
    };
    K(F, (S) => {
      i(s) && S(P);
    });
  }
  var U = h(F, 2);
  {
    var ee = (S) => {
      var M = gh(), V = d(M), $ = d(V), Y = h(d($), 2);
      l($);
      var oe = h($, 2), ie = h(d(oe), 2), re = d(ie), ae = h(re, 2);
      l(ie), l(oe), l(V), l(M), G("click", Y, () => f(a, !1)), G("click", re, () => f(a, !1)), G("click", ae, () => f(a, !1)), G("click", V, Mn(function(fe) {
        Fr.call(this, e, fe);
      })), G("click", M, () => f(a, !1)), m(S, M);
    };
    K(U, (S) => {
      i(a) && S(ee);
    });
  }
  var W = h(U, 2);
  {
    var se = (S) => {
      var M = bh(), V = d(M), $ = d(V), Y = h(d($), 2);
      l($);
      var oe = h($, 2), ie = h(d(oe), 2), re = d(ie);
      l(ie), l(oe), l(V), l(M), G("click", Y, () => f(o, !1)), G("click", re, () => f(o, !1)), G("click", V, Mn(function(ae) {
        Fr.call(this, e, ae);
      })), G("click", M, () => f(o, !1)), m(S, M);
    };
    K(W, (S) => {
      i(o) && S(se);
    });
  }
  m(n, O), Oe();
}
var _h = /* @__PURE__ */ b('<div class="help-toolbar svelte-1hxsdic"><div class="toolbar-group svelte-1hxsdic"><button title="Go Back (Alt+Left)"><span class="toolbar-icon svelte-1hxsdic">◄</span></button> <button title="Go Forward (Alt+Right)"><span class="toolbar-icon svelte-1hxsdic">►</span></button> <button class="toolbar-button svelte-1hxsdic" title="Stop"><span class="toolbar-icon svelte-1hxsdic">■</span></button> <button class="toolbar-button svelte-1hxsdic" title="Go Home (Alt+Home)"><span class="toolbar-icon svelte-1hxsdic">🏠</span></button></div> <div class="toolbar-separator svelte-1hxsdic"></div> <div class="toolbar-group svelte-1hxsdic"><button class="toolbar-button svelte-1hxsdic" title="Search"><span class="toolbar-icon svelte-1hxsdic">🔍</span></button> <button class="toolbar-button svelte-1hxsdic" title="Contents"><span class="toolbar-icon svelte-1hxsdic">📖</span></button> <button class="toolbar-button svelte-1hxsdic" title="Index"><span class="toolbar-icon svelte-1hxsdic">📋</span></button></div></div>');
function rm(n, e) {
  Fe(e, !0);
  let t = /* @__PURE__ */ j(!1), r = /* @__PURE__ */ j(!1);
  const s = _t();
  function a() {
    e.helpManager && (f(t, e.helpManager.getHistory().length > 0 && e.helpManager.getCurrentIndex() > 0, !0), f(r, e.helpManager.getCurrentIndex() < e.helpManager.getHistory().length - 1));
  }
  function o() {
    i(t) && s("go-back");
  }
  function c() {
    i(r) && s("go-forward");
  }
  function u() {
    console.log("Stop");
  }
  function v() {
    s("go-home");
  }
  function p() {
    e.helpManager?.setActiveTab("search");
  }
  function _() {
    e.helpManager?.setActiveTab("contents");
  }
  function g() {
    e.helpManager?.setActiveTab("index");
  }
  st(() => {
    if (e.helpManager)
      return a(), e.helpManager.on("state:changed", () => {
        a();
      });
  });
  function y(J) {
    if (J.altKey)
      switch (J.key) {
        case "ArrowLeft":
          J.preventDefault(), o();
          break;
        case "ArrowRight":
          J.preventDefault(), c();
          break;
        case "Home":
          J.preventDefault(), v();
          break;
      }
  }
  var I = _h();
  G("keydown", Rt, y);
  var E = d(I), L = d(E);
  let T;
  var C = h(L, 2);
  let z;
  var k = h(C, 2), w = h(k, 2);
  l(E);
  var A = h(E, 4), x = d(A), N = h(x, 2), te = h(N, 2);
  l(A), l(I), Z(
    (J, H) => {
      T = xe(L, 1, "toolbar-button svelte-1hxsdic", null, T, J), z = xe(C, 1, "toolbar-button svelte-1hxsdic", null, z, H);
    },
    [
      () => ({ disabled: !i(t) }),
      () => ({ disabled: !i(r) })
    ]
  ), G("click", L, o), G("click", C, c), G("click", k, u), G("click", w, v), G("click", x, p), G("click", N, _), G("click", te, g), m(n, I), Oe();
}
var yh = /* @__PURE__ */ b('<button><span class="tab-icon svelte-1k5cqed"> </span> <span class="tab-label svelte-1k5cqed"> </span></button>'), kh = /* @__PURE__ */ b('<div class="help-tab-bar svelte-1k5cqed"></div>');
function im(n, e) {
  Fe(e, !0);
  let t = be(e, "activeTab", 3, "contents");
  const r = _t(), s = [
    { id: "contents", label: "Contents", icon: "📖" },
    { id: "index", label: "Index", icon: "📋" },
    { id: "search", label: "Search", icon: "🔍" },
    { id: "favorites", label: "Favorites", icon: "⭐" },
    { id: "history", label: "History", icon: "🕒" }
  ];
  function a(u) {
    u !== t() && r("tab-change", u);
  }
  function o(u) {
    const v = s.findIndex((p) => p.id === t());
    u.key === "ArrowLeft" && v > 0 ? (u.preventDefault(), a(s[v - 1].id)) : u.key === "ArrowRight" && v < s.length - 1 ? (u.preventDefault(), a(s[v + 1].id)) : u.key === "Home" ? (u.preventDefault(), a(s[0].id)) : u.key === "End" && (u.preventDefault(), a(s[s.length - 1].id));
  }
  var c = kh();
  G("keydown", Rt, o), Le(c, 21, () => s, je, (u, v) => {
    var p = yh();
    let _;
    var g = d(p), y = d(g, !0);
    l(g);
    var I = h(g, 2), E = d(I, !0);
    l(I), l(p), Z(
      (L) => {
        _ = xe(p, 1, "help-tab svelte-1k5cqed", null, _, L), Se(p, "title", i(v).label), q(y, i(v).icon), q(E, i(v).label);
      },
      [() => ({ active: t() === i(v).id })]
    ), G("click", p, () => a(i(v).id)), G("keydown", p, (L) => L.key === "Enter" && a(i(v).id)), m(u, p);
  }), l(c), m(n, c), Oe();
}
var xh = /* @__PURE__ */ b('<div class="tree-loading svelte-1dsu8mk"><div class="loading-spinner svelte-1dsu8mk"></div> <p class="svelte-1dsu8mk">Loading topics...</p></div>'), Sh = /* @__PURE__ */ b('<div class="tree-error svelte-1dsu8mk"><p class="svelte-1dsu8mk"> </p> <button class="svelte-1dsu8mk">Retry</button></div>'), Th = /* @__PURE__ */ b('<div class="tree-empty svelte-1dsu8mk"><p class="svelte-1dsu8mk">No topics available</p></div>'), Eh = /* @__PURE__ */ b('<button class="expand-button svelte-1dsu8mk"> </button>'), Ch = /* @__PURE__ */ b('<span class="expand-spacer svelte-1dsu8mk"></span>'), zh = /* @__PURE__ */ b('<div tabindex="0" role="treeitem"><!> <span class="topic-icon svelte-1dsu8mk"> </span> <span class="topic-title svelte-1dsu8mk"> </span> <button> </button></div>'), Mh = /* @__PURE__ */ b('<div class="tree-content svelte-1dsu8mk"></div>'), Ih = /* @__PURE__ */ b('<div class="help-topic-tree svelte-1dsu8mk"><!></div>');
function sm(n, e) {
  Fe(e, !0);
  let t = /* @__PURE__ */ j(Be([])), r = /* @__PURE__ */ j(Be(/* @__PURE__ */ new Set())), s = /* @__PURE__ */ j(null), a = /* @__PURE__ */ j(!0), o = /* @__PURE__ */ j(null);
  const c = _t();
  async function u() {
    try {
      f(a, !0), f(o, null);
      const w = await e.helpManager.loadTopicTree();
      f(t, w, !0);
      for (const x of w)
        x.children.length > 0 && i(r).add(x.id);
      const A = e.helpManager.getState();
      f(s, A.currentTopic, !0);
    } catch (w) {
      f(o, `Failed to load topic tree: ${w instanceof Error ? w.message : "Unknown error"}`), console.error("Error loading topic tree:", w);
    } finally {
      f(a, !1);
    }
  }
  function v(w) {
    i(r).has(w) ? i(r).delete(w) : i(r).add(w), f(
      r,
      // Trigger reactivity
      i(r),
      !0
    );
  }
  function p(w) {
    f(s, w.id, !0), c("topic-select", w.id);
  }
  function _(w, A) {
    switch (w.key) {
      case "Enter":
      case " ":
        w.preventDefault(), A.children.length > 0 ? v(A.id) : p(A);
        break;
      case "ArrowRight":
        w.preventDefault(), A.children.length > 0 && !i(r).has(A.id) && v(A.id);
        break;
      case "ArrowLeft":
        w.preventDefault(), A.children.length > 0 && i(r).has(A.id) && v(A.id);
        break;
    }
  }
  function g(w) {
    return w.children.length > 0 ? i(r).has(w.id) ? "📁" : "📂" : "📄";
  }
  function y(w) {
    return e.helpManager?.isBookmarked(w) || !1;
  }
  function I(w, A) {
    w.stopPropagation(), c("bookmark-toggle", A);
  }
  wt(() => (u(), e.helpManager?.on("state:changed", (A) => {
    f(s, A.currentTopic, !0);
  })));
  function E(w, A = 0) {
    const x = [w];
    if (i(r).has(w.id))
      for (const N of w.children)
        x.push(...E(N, A + 1));
    return x;
  }
  let L = /* @__PURE__ */ ze(() => i(t).flatMap((w) => E(w)));
  var T = Ih(), C = d(T);
  {
    var z = (w) => {
      var A = xh();
      m(w, A);
    }, k = (w) => {
      var A = Re(), x = Ce(A);
      {
        var N = (J) => {
          var H = Sh(), O = d(H), B = d(O, !0);
          l(O);
          var F = h(O, 2);
          l(H), Z(() => q(B, i(o))), G("click", F, u), m(J, H);
        }, te = (J) => {
          var H = Re(), O = Ce(H);
          {
            var B = (P) => {
              var U = Th();
              m(P, U);
            }, F = (P) => {
              var U = Mh();
              Le(U, 21, () => i(L), je, (ee, W) => {
                var se = zh();
                let S;
                var M = d(se);
                {
                  var V = (ve) => {
                    var X = Eh(), le = d(X, !0);
                    l(X), Z(
                      (we, D) => {
                        Se(X, "aria-label", we), q(le, D);
                      },
                      [
                        () => i(r).has(i(W).id) ? "Collapse" : "Expand",
                        () => i(r).has(i(W).id) ? "▼" : "▶"
                      ]
                    ), G("click", X, Mn(() => v(i(W).id))), m(ve, X);
                  }, $ = (ve) => {
                    var X = Ch();
                    m(ve, X);
                  };
                  K(M, (ve) => {
                    i(W).children.length > 0 ? ve(V) : ve($, !1);
                  });
                }
                var Y = h(M, 2), oe = d(Y, !0);
                l(Y);
                var ie = h(Y, 2), re = d(ie, !0);
                l(ie);
                var ae = h(ie, 2);
                let fe;
                var me = d(ae, !0);
                l(ae), l(se), Z(
                  (ve, X, le, we, D, Q, R, ne) => {
                    S = xe(se, 1, "tree-item svelte-1dsu8mk", null, S, ve), qt(se, `padding-left: ${X ?? ""}px;`), Se(se, "aria-expanded", le), Se(se, "aria-selected", i(s) === i(W).id), q(oe, we), Se(ie, "title", i(W).title), q(re, i(W).title), fe = xe(ae, 1, "bookmark-button svelte-1dsu8mk", null, fe, D), Se(ae, "title", Q), Se(ae, "aria-label", R), q(me, ne);
                  },
                  [
                    () => ({
                      selected: i(s) === i(W).id,
                      folder: i(W).children.length > 0,
                      document: i(W).children.length === 0
                    }),
                    () => (i(W).parentId ? 16 : 0) + (i(L).findIndex((ve) => ve.id === i(W).id) > 0 ? 16 : 0),
                    () => i(W).children.length > 0 ? i(r).has(i(W).id) : void 0,
                    () => g(i(W)),
                    () => ({ bookmarked: y(i(W).id) }),
                    () => y(i(W).id) ? "Remove bookmark" : "Add bookmark",
                    () => y(i(W).id) ? "Remove bookmark" : "Add bookmark",
                    () => y(i(W).id) ? "⭐" : "☆"
                  ]
                ), G("click", ae, (ve) => I(ve, i(W).id)), G("click", se, () => p(i(W))), G("keydown", se, (ve) => _(ve, i(W))), m(ee, se);
              }), l(U), m(P, U);
            };
            K(
              O,
              (P) => {
                i(t).length === 0 ? P(B) : P(F, !1);
              },
              !0
            );
          }
          m(J, H);
        };
        K(
          x,
          (J) => {
            i(o) ? J(N) : J(te, !1);
          },
          !0
        );
      }
      m(w, A);
    };
    K(C, (w) => {
      i(a) ? w(z) : w(k, !1);
    });
  }
  l(T), m(n, T), Oe();
}
var Ah = /* @__PURE__ */ b('<div class="content-empty svelte-hn8o8h"><div class="empty-content svelte-hn8o8h"><h2 class="svelte-hn8o8h">Welcome to Help</h2> <p class="svelte-hn8o8h">Select a topic from the Contents tab to view help information.</p> <div class="empty-actions svelte-hn8o8h"><button class="svelte-hn8o8h">Getting Started</button></div></div></div>'), Dh = /* @__PURE__ */ b('<span class="read-time svelte-hn8o8h"> </span>'), Lh = /* @__PURE__ */ b('<li class="svelte-hn8o8h"><button class="related-topic-link svelte-hn8o8h"> </button></li>'), Rh = /* @__PURE__ */ b('<div class="related-topics svelte-hn8o8h"><h3 class="svelte-hn8o8h">Related Topics</h3> <ul class="svelte-hn8o8h"></ul></div>'), Bh = /* @__PURE__ */ b('<div class="content-header svelte-hn8o8h"><div class="content-title svelte-hn8o8h"><h1 class="svelte-hn8o8h"> </h1> <div class="content-meta svelte-hn8o8h"><span class="topic-category svelte-hn8o8h"> </span> <!></div></div> <div class="content-actions svelte-hn8o8h"><button> </button></div></div> <div class="content-body svelte-hn8o8h"><div class="content-text svelte-hn8o8h"></div> <!></div>', 1), Fh = /* @__PURE__ */ b('<div class="help-content-area svelte-hn8o8h"><!></div>');
function am(n, e) {
  Fe(e, !0);
  let t = be(e, "topic", 3, null), r = /* @__PURE__ */ j(void 0), s = /* @__PURE__ */ j(!1), a = /* @__PURE__ */ j(Be([]));
  const o = _t();
  function c() {
    t() && f(s, e.helpManager?.isBookmarked(t().id) || !1, !0);
  }
  function u() {
    t() && f(a, e.helpManager?.getRelatedTopics(t().id) || [], !0);
  }
  function v() {
    t() && o("bookmark-toggle", t().id);
  }
  function p(T) {
    o("topic-select", T.id);
  }
  function _(T) {
    const C = T.target;
    if (C.tagName === "A") {
      const z = C.getAttribute("href");
      if (z && z.startsWith("#")) {
        T.preventDefault();
        const k = z.substring(1);
        o("topic-select", k);
      }
    }
  }
  function g(T) {
    return T.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>').replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>").replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>").replace(/`(.*?)`/g, "<code>$1</code>");
  }
  st(() => {
    t() && (c(), u());
  }), wt(() => {
    const T = e.helpManager?.on("bookmark:added", (z) => {
      t() && z.bookmark.topicId === t().id && f(s, !0);
    }), C = e.helpManager?.on("bookmark:removed", (z) => {
      t() && z.topicId === t().id && f(s, !1);
    });
    return () => {
      T?.(), C?.();
    };
  });
  var y = Fh(), I = d(y);
  {
    var E = (T) => {
      var C = Ah(), z = d(C), k = h(d(z), 4), w = d(k);
      l(k), l(z), l(C), G("click", w, () => o("topic-select", "getting-started")), m(T, C);
    }, L = (T) => {
      var C = Bh(), z = Ce(C), k = d(z), w = d(k), A = d(w, !0);
      l(w);
      var x = h(w, 2), N = d(x), te = d(N, !0);
      l(N);
      var J = h(N, 2);
      {
        var H = (S) => {
          var M = Dh(), V = d(M);
          l(M), Z(() => q(V, `${t().metadata.estimatedReadTime ?? ""} min read`)), m(S, M);
        };
        K(J, (S) => {
          t().metadata?.estimatedReadTime && S(H);
        });
      }
      l(x), l(k);
      var O = h(k, 2), B = d(O);
      let F;
      var P = d(B, !0);
      l(B), l(O), l(z);
      var U = h(z, 2), ee = d(U);
      Tt(ee, (S) => f(r, S), () => i(r));
      var W = h(ee, 2);
      {
        var se = (S) => {
          var M = Rh(), V = h(d(M), 2);
          Le(V, 21, () => i(a), je, ($, Y) => {
            var oe = Lh(), ie = d(oe), re = d(ie, !0);
            l(ie), l(oe), Z(() => q(re, i(Y).title)), G("click", ie, () => p(i(Y))), m($, oe);
          }), l(V), l(M), m(S, M);
        };
        K(W, (S) => {
          i(a).length > 0 && S(se);
        });
      }
      l(U), Z(
        (S, M) => {
          q(A, t().title), q(te, t().category), F = xe(B, 1, "bookmark-button svelte-hn8o8h", null, F, S), Se(B, "title", i(s) ? "Remove bookmark" : "Add bookmark"), q(P, i(s) ? "⭐" : "☆"), Se(ee, "innerhtml", M);
        },
        [
          () => ({ bookmarked: i(s) }),
          () => g(t().content)
        ]
      ), G("click", B, v), G("click", ee, _), m(T, C);
    };
    K(I, (T) => {
      t() ? T(L, !1) : T(E);
    });
  }
  l(y), m(n, y), Oe();
}
var Oh = /* @__PURE__ */ b('<span class="offline-indicator svelte-1ucssk" title="Offline">📴</span>'), Hh = /* @__PURE__ */ b('<span class="page-indicator svelte-1ucssk"> </span>'), Ph = /* @__PURE__ */ b('<div class="help-status-bar svelte-1ucssk"><div class="status-left svelte-1ucssk"><span class="status-text svelte-1ucssk"> </span> <!></div> <div class="status-right svelte-1ucssk"><!> <span class="time-indicator svelte-1ucssk"> </span></div></div>');
function om(n, e) {
  Fe(e, !0);
  let t = be(e, "currentTopic", 3, null), r = be(e, "systemState", 3, null), s = /* @__PURE__ */ j("Ready"), a = /* @__PURE__ */ j(""), o = /* @__PURE__ */ j(!0), c = /* @__PURE__ */ new Date();
  function u() {
    if (!r()) {
      f(s, "Ready");
      return;
    }
    switch (r().activeTab) {
      case "contents":
        f(s, "Ready");
        break;
      case "index":
        f(s, "Index ready");
        break;
      case "search":
        r().searchQuery ? f(s, `Search results for "${r().searchQuery}"`) : f(s, "Enter search terms");
        break;
      case "favorites":
        f(s, `${r().bookmarks.length} bookmarks`);
        break;
      case "history":
        f(s, `${r().history.length} history entries`);
        break;
      default:
        f(s, "Ready");
    }
  }
  function v() {
    if (!t()) {
      f(a, "");
      return;
    }
    f(a, "1 of 1");
  }
  function p() {
    f(o, navigator.onLine, !0);
  }
  function _() {
    return c.toLocaleTimeString();
  }
  st(() => {
    r() && (u(), v(), c = /* @__PURE__ */ new Date());
  }), st(() => {
    t() && v();
  }), wt(() => {
    p(), u(), v(), window.addEventListener("online", p), window.addEventListener("offline", p);
    const x = e.helpManager?.on("state:changed", () => {
      u(), v(), c = /* @__PURE__ */ new Date();
    }), N = e.helpManager?.on("topic:changed", () => {
      v(), c = /* @__PURE__ */ new Date();
    }), te = e.helpManager?.on("search:performed", () => {
      u(), c = /* @__PURE__ */ new Date();
    });
    return () => {
      window.removeEventListener("online", p), window.removeEventListener("offline", p), x?.(), N?.(), te?.();
    };
  });
  var g = Ph(), y = d(g), I = d(y), E = d(I, !0);
  l(I);
  var L = h(I, 2);
  {
    var T = (x) => {
      var N = Oh();
      m(x, N);
    };
    K(L, (x) => {
      i(o) || x(T);
    });
  }
  l(y);
  var C = h(y, 2), z = d(C);
  {
    var k = (x) => {
      var N = Hh(), te = d(N, !0);
      l(N), Z(() => q(te, i(a))), m(x, N);
    };
    K(z, (x) => {
      i(a) && x(k);
    });
  }
  var w = h(z, 2), A = d(w, !0);
  l(w), l(C), l(g), Z(
    (x, N) => {
      q(E, i(s)), Se(w, "title", `Last updated: ${x ?? ""}`), q(A, N);
    },
    [_, _]
  ), m(n, g), Oe();
}
var Nh = /* @__PURE__ */ b('<button class="history-item svelte-9qj55b"> </button>'), jh = /* @__PURE__ */ b('<div class="search-history svelte-9qj55b"><div class="history-header svelte-9qj55b"><span class="svelte-9qj55b">Recent Searches</span> <button class="clear-history-button svelte-9qj55b">Clear</button></div> <div class="history-items svelte-9qj55b"></div></div>'), qh = /* @__PURE__ */ b('<div class="search-error svelte-9qj55b"><p class="svelte-9qj55b"> </p> <button class="svelte-9qj55b">Retry</button></div>'), Wh = /* @__PURE__ */ b('<div class="search-loading svelte-9qj55b"><div class="loading-spinner svelte-9qj55b"></div> <p class="svelte-9qj55b">Searching...</p></div>'), Uh = /* @__PURE__ */ b('<div class="search-no-results svelte-9qj55b"><p class="svelte-9qj55b"> </p> <p class="svelte-9qj55b">Try different keywords or check your spelling.</p></div>'), Kh = /* @__PURE__ */ b('<div class="search-empty svelte-9qj55b"><p class="svelte-9qj55b">Enter search terms above to find help topics.</p> <div class="search-tips svelte-9qj55b"><h4 class="svelte-9qj55b">Search Tips:</h4> <ul class="svelte-9qj55b"><li class="svelte-9qj55b">Use specific keywords</li> <li class="svelte-9qj55b">Try different word combinations</li> <li class="svelte-9qj55b">Check your spelling</li> <li class="svelte-9qj55b">Use quotes for exact phrases</li></ul></div></div>'), Gh = /* @__PURE__ */ b('<span class="result-terms svelte-9qj55b"> </span>'), Vh = /* @__PURE__ */ b('<div class="search-result svelte-9qj55b" tabindex="0" role="button"><div class="result-header svelte-9qj55b"><h3 class="result-title svelte-9qj55b"> </h3> <span class="result-category svelte-9qj55b"> </span></div> <div class="result-snippet svelte-9qj55b"> </div> <div class="result-meta svelte-9qj55b"><span class="result-relevance svelte-9qj55b"> </span> <!></div></div>'), Yh = /* @__PURE__ */ b('<div class="results-list svelte-9qj55b"><div class="results-header svelte-9qj55b"><span class="svelte-9qj55b"> </span></div> <!></div>'), Xh = /* @__PURE__ */ b('<div class="help-search-panel svelte-9qj55b"><div class="search-input-container svelte-9qj55b"><form class="search-form svelte-9qj55b"><div class="search-input-group svelte-9qj55b"><input type="text" placeholder="Enter search terms..." class="search-input svelte-9qj55b" autocomplete="off"/> <button type="button" class="search-button svelte-9qj55b"> </button> <button type="button" class="history-button svelte-9qj55b" title="Search History">📋</button> <button type="button" class="clear-button svelte-9qj55b" title="Clear Search">✕</button></div></form> <!></div> <div class="search-results svelte-9qj55b"><!></div></div>');
function lm(n, e) {
  Fe(e, !0);
  let t = /* @__PURE__ */ j(""), r = /* @__PURE__ */ j(Be([])), s = /* @__PURE__ */ j(Be([])), a = /* @__PURE__ */ j(!1), o = /* @__PURE__ */ j(null), c = /* @__PURE__ */ j(!1);
  const u = _t();
  let v;
  async function p(S) {
    if (!S.trim()) {
      f(r, [], !0);
      return;
    }
    try {
      f(a, !0), f(o, null);
      const M = await e.helpManager.search(S);
      f(r, M, !0);
    } catch (M) {
      f(o, `Search failed: ${M instanceof Error ? M.message : "Unknown error"}`), console.error("Search error:", M), f(r, [], !0);
    } finally {
      f(a, !1);
    }
  }
  function _(S) {
    const M = S.target;
    f(t, M.value, !0);
  }
  function g(S) {
    S.preventDefault(), p(i(t));
  }
  function y() {
    p(i(t));
  }
  function I() {
    f(t, ""), f(r, [], !0), f(o, null), v?.focus();
  }
  function E(S) {
    u("topic-select", S.topicId);
  }
  function L(S) {
    f(t, S, !0), p(S), f(c, !1);
  }
  function T() {
    e.helpManager?.clearSearchHistory(), f(s, [], !0);
  }
  function C() {
    f(c, !i(c));
  }
  function z(S) {
    S.key === "Escape" ? f(c, !1) : S.key === "ArrowDown" && i(c) && i(s).length > 0 && S.preventDefault();
  }
  function k() {
    f(s, e.helpManager?.getSearchHistory() || [], !0);
  }
  wt(() => (k(), v?.focus(), e.helpManager?.on("search:performed", (M) => {
    k();
  }))), st(() => {
    e.helpManager && k();
  });
  var w = Xh();
  G("keydown", Rt, z);
  var A = d(w), x = d(A), N = d(x), te = d(N);
  gt(te), Tt(te, (S) => v = S, () => v);
  var J = h(te, 2), H = d(J, !0);
  l(J);
  var O = h(J, 2), B = h(O, 2);
  l(N), l(x);
  var F = h(x, 2);
  {
    var P = (S) => {
      var M = jh(), V = d(M), $ = h(d(V), 2);
      l(V);
      var Y = h(V, 2);
      Le(Y, 21, () => i(s), je, (oe, ie) => {
        var re = Nh(), ae = d(re, !0);
        l(re), Z(() => q(ae, i(ie))), G("click", re, () => L(i(ie))), m(oe, re);
      }), l(Y), l(M), G("click", $, T), m(S, M);
    };
    K(F, (S) => {
      i(c) && i(s).length > 0 && S(P);
    });
  }
  l(A);
  var U = h(A, 2), ee = d(U);
  {
    var W = (S) => {
      var M = qh(), V = d(M), $ = d(V, !0);
      l(V);
      var Y = h(V, 2);
      l(M), Z(() => q($, i(o))), G("click", Y, () => p(i(t))), m(S, M);
    }, se = (S) => {
      var M = Re(), V = Ce(M);
      {
        var $ = (oe) => {
          var ie = Wh();
          m(oe, ie);
        }, Y = (oe) => {
          var ie = Re(), re = Ce(ie);
          {
            var ae = (me) => {
              var ve = Uh(), X = d(ve), le = d(X);
              l(X), rn(2), l(ve), Z(() => q(le, `No results found for "${i(t) ?? ""}"`)), m(me, ve);
            }, fe = (me) => {
              var ve = Re(), X = Ce(ve);
              {
                var le = (D) => {
                  var Q = Kh();
                  m(D, Q);
                }, we = (D) => {
                  var Q = Yh(), R = d(Q), ne = d(R), ge = d(ne);
                  l(ne), l(R);
                  var de = h(R, 2);
                  Le(de, 17, () => i(r), je, (pe, he) => {
                    var ke = Vh(), Me = d(ke), _e = d(Me), ye = d(_e, !0);
                    l(_e);
                    var Ue = h(_e, 2), qe = d(Ue, !0);
                    l(Ue), l(Me);
                    var Ke = h(Me, 2), Ve = d(Ke, !0);
                    l(Ke);
                    var Ye = h(Ke, 2), Ne = d(Ye), Je = d(Ne);
                    l(Ne);
                    var nt = h(Ne, 2);
                    {
                      var Ct = (ft) => {
                        var ht = Gh(), yt = d(ht);
                        l(ht), Z((rt) => q(yt, `Matched: ${rt ?? ""}`), [() => i(he).matchedTerms.join(", ")]), m(ft, ht);
                      };
                      K(nt, (ft) => {
                        i(he).matchedTerms.length > 0 && ft(Ct);
                      });
                    }
                    l(Ye), l(ke), Z(
                      (ft) => {
                        q(ye, i(he).title), q(qe, i(he).category), q(Ve, i(he).snippet), q(Je, `Relevance: ${ft ?? ""}%`);
                      },
                      [() => Math.round(i(he).relevance * 100)]
                    ), G("click", ke, () => E(i(he))), G("keydown", ke, (ft) => ft.key === "Enter" && E(i(he))), m(pe, ke);
                  }), l(Q), Z(() => q(ge, `Found ${i(r).length ?? ""} result${i(r).length !== 1 ? "s" : ""}`)), m(D, Q);
                };
                K(
                  X,
                  (D) => {
                    i(r).length === 0 ? D(le) : D(we, !1);
                  },
                  !0
                );
              }
              m(me, ve);
            };
            K(
              re,
              (me) => {
                i(r).length === 0 && i(t) ? me(ae) : me(fe, !1);
              },
              !0
            );
          }
          m(oe, ie);
        };
        K(
          V,
          (oe) => {
            i(a) ? oe($) : oe(Y, !1);
          },
          !0
        );
      }
      m(S, M);
    };
    K(ee, (S) => {
      i(o) ? S(W) : S(se, !1);
    });
  }
  l(U), l(w), Z(() => {
    J.disabled = i(a), q(H, i(a) ? "⏳" : "🔍");
  }), Dt(te, () => i(t), (S) => f(t, S)), G("input", te, _), G("click", J, y), G("click", O, C), G("click", B, I), G("submit", x, g), m(n, w), Oe();
}
var Jh = /* @__PURE__ */ b('<div class="index-loading svelte-la50o3"><div class="loading-spinner svelte-la50o3"></div> <p class="svelte-la50o3">Loading index...</p></div>'), Zh = /* @__PURE__ */ b('<div class="index-error svelte-la50o3"><p class="svelte-la50o3"> </p> <button class="svelte-la50o3">Retry</button></div>'), Qh = /* @__PURE__ */ b('<div class="index-empty svelte-la50o3"><p class="svelte-la50o3">No topics available for indexing</p></div>'), $h = /* @__PURE__ */ b("<button> </button>"), ep = /* @__PURE__ */ b('<div class="no-topics svelte-la50o3"><p class="svelte-la50o3"> </p></div>'), tp = /* @__PURE__ */ b('<div class="topic-item svelte-la50o3" tabindex="0" role="button"><span class="topic-icon svelte-la50o3">📄</span> <span class="topic-title svelte-la50o3"> </span> <span class="topic-category svelte-la50o3"> </span></div>'), np = /* @__PURE__ */ b('<div class="topics-items svelte-la50o3"></div>'), rp = /* @__PURE__ */ b('<div class="topics-header svelte-la50o3"><h3 class="svelte-la50o3"> </h3></div> <!>', 1), ip = /* @__PURE__ */ b('<div class="no-selection svelte-la50o3"><p class="svelte-la50o3">Select a letter to view topics</p></div>'), sp = /* @__PURE__ */ b('<div class="index-interface svelte-la50o3"><div class="letter-nav svelte-la50o3"></div> <div class="topics-list svelte-la50o3"><!></div></div>'), ap = /* @__PURE__ */ b('<div class="help-index-panel svelte-la50o3"><!></div>');
function cm(n, e) {
  Fe(e, !0);
  let t = /* @__PURE__ */ j(Be([])), r = /* @__PURE__ */ j(Be([])), s = /* @__PURE__ */ j(null), a = /* @__PURE__ */ j(!0), o = /* @__PURE__ */ j(null);
  const c = _t();
  async function u() {
    try {
      f(a, !0), f(o, null);
      const T = e.helpManager.getAllTopics();
      f(t, T, !0);
      const C = /* @__PURE__ */ new Map();
      for (const z of T) {
        const k = z.title.charAt(0).toUpperCase();
        C.has(k) || C.set(k, []), C.get(k).push(z);
      }
      for (const [z, k] of C)
        k.sort((w, A) => w.title.localeCompare(A.title));
      f(r, Array.from(C.entries()).map(([z, k]) => ({ letter: z, topics: k })).sort((z, k) => z.letter.localeCompare(k.letter)), !0), i(r).length > 0 && f(s, i(r)[0].letter, !0);
    } catch (T) {
      f(o, `Failed to load index: ${T instanceof Error ? T.message : "Unknown error"}`), console.error("Error loading index:", T);
    } finally {
      f(a, !1);
    }
  }
  function v(T) {
    f(s, T, !0);
  }
  function p(T) {
    c("topic-select", T.id);
  }
  function _(T, C) {
    (T.key === "Enter" || T.key === " ") && (T.preventDefault(), p(C));
  }
  let g = /* @__PURE__ */ ze(() => i(s) ? i(r).find((T) => T.letter === i(s))?.topics || [] : []);
  wt(() => {
    u();
  });
  var y = ap(), I = d(y);
  {
    var E = (T) => {
      var C = Jh();
      m(T, C);
    }, L = (T) => {
      var C = Re(), z = Ce(C);
      {
        var k = (A) => {
          var x = Zh(), N = d(x), te = d(N, !0);
          l(N);
          var J = h(N, 2);
          l(x), Z(() => q(te, i(o))), G("click", J, u), m(A, x);
        }, w = (A) => {
          var x = Re(), N = Ce(x);
          {
            var te = (H) => {
              var O = Qh();
              m(H, O);
            }, J = (H) => {
              var O = sp(), B = d(O);
              Le(B, 21, () => i(r), je, (W, se) => {
                var S = $h();
                let M;
                var V = d(S, !0);
                l(S), Z(
                  ($) => {
                    M = xe(S, 1, "letter-button svelte-la50o3", null, M, $), Se(S, "title", `${i(se).letter ?? ""} (${i(se).topics.length ?? ""} topics)`), q(V, i(se).letter);
                  },
                  [
                    () => ({ selected: i(s) === i(se).letter })
                  ]
                ), G("click", S, () => v(i(se).letter)), m(W, S);
              }), l(B);
              var F = h(B, 2), P = d(F);
              {
                var U = (W) => {
                  var se = rp(), S = Ce(se), M = d(S), V = d(M);
                  l(M), l(S);
                  var $ = h(S, 2);
                  {
                    var Y = (ie) => {
                      var re = ep(), ae = d(re), fe = d(ae);
                      l(ae), l(re), Z(() => q(fe, `No topics found for letter "${i(s) ?? ""}"`)), m(ie, re);
                    }, oe = (ie) => {
                      var re = np();
                      Le(re, 21, () => i(g), je, (ae, fe) => {
                        var me = tp(), ve = h(d(me), 2), X = d(ve, !0);
                        l(ve);
                        var le = h(ve, 2), we = d(le, !0);
                        l(le), l(me), Z(() => {
                          Se(me, "title", i(fe).title), q(X, i(fe).title), q(we, i(fe).category);
                        }), G("click", me, () => p(i(fe))), G("keydown", me, (D) => _(D, i(fe))), m(ae, me);
                      }), l(re), m(ie, re);
                    };
                    K($, (ie) => {
                      i(g).length === 0 ? ie(Y) : ie(oe, !1);
                    });
                  }
                  Z(() => q(V, `${i(s) ?? ""} (${i(g).length ?? ""} topics)`)), m(W, se);
                }, ee = (W) => {
                  var se = ip();
                  m(W, se);
                };
                K(P, (W) => {
                  i(s) ? W(U) : W(ee, !1);
                });
              }
              l(F), l(O), m(H, O);
            };
            K(
              N,
              (H) => {
                i(r).length === 0 ? H(te) : H(J, !1);
              },
              !0
            );
          }
          m(A, x);
        };
        K(
          z,
          (A) => {
            i(o) ? A(k) : A(w, !1);
          },
          !0
        );
      }
      m(T, C);
    };
    K(I, (T) => {
      i(a) ? T(E) : T(L, !1);
    });
  }
  l(y), m(n, y), Oe();
}
var op = /* @__PURE__ */ b('<div class="favorites-loading svelte-20v6lo"><div class="loading-spinner svelte-20v6lo"></div> <p class="svelte-20v6lo">Loading bookmarks...</p></div>'), lp = /* @__PURE__ */ b('<div class="favorites-error svelte-20v6lo"><p class="svelte-20v6lo"> </p> <button class="svelte-20v6lo">Retry</button></div>'), cp = /* @__PURE__ */ b(`<div class="favorites-empty svelte-20v6lo"><div class="empty-content svelte-20v6lo"><h3 class="svelte-20v6lo">No Bookmarks</h3> <p class="svelte-20v6lo">You haven't bookmarked any topics yet.</p> <p class="svelte-20v6lo">Click the star icon (⭐) next to any topic to add it to your favorites.</p></div></div>`), dp = /* @__PURE__ */ b('<option class="svelte-20v6lo"> </option>'), up = /* @__PURE__ */ b('<div class="no-matches svelte-20v6lo"><p class="svelte-20v6lo">No bookmarks match the current filter.</p></div>'), vp = /* @__PURE__ */ b('<div class="bookmark-notes svelte-20v6lo"> </div>'), fp = /* @__PURE__ */ b('<div class="bookmark-item svelte-20v6lo" tabindex="0" role="button" title="Click to open, Delete to remove"><div class="bookmark-content svelte-20v6lo"><div class="bookmark-header svelte-20v6lo"><span class="bookmark-icon svelte-20v6lo">⭐</span> <span class="bookmark-title svelte-20v6lo"> </span> <button class="remove-button svelte-20v6lo" title="Remove bookmark">✕</button></div> <div class="bookmark-meta svelte-20v6lo"><span class="bookmark-category svelte-20v6lo"> </span> <span class="bookmark-date svelte-20v6lo"> </span></div> <!></div></div>'), hp = /* @__PURE__ */ b('<div class="bookmarks-items svelte-20v6lo"></div>'), pp = /* @__PURE__ */ b('<div class="favorites-interface svelte-20v6lo"><div class="favorites-controls svelte-20v6lo"><div class="sort-controls svelte-20v6lo"><label class="svelte-20v6lo">Sort by:</label> <button> </button> <button> </button> <button> </button></div> <div class="filter-controls svelte-20v6lo"><label class="svelte-20v6lo">Filter:</label> <select class="category-filter svelte-20v6lo"><option class="svelte-20v6lo">All Categories</option><!></select></div> <div class="action-controls svelte-20v6lo"><button class="clear-all-button svelte-20v6lo" title="Remove all bookmarks">Clear All</button></div></div> <div class="bookmarks-list svelte-20v6lo"><div class="bookmarks-header svelte-20v6lo"><span class="svelte-20v6lo"> </span></div> <!></div></div>'), mp = /* @__PURE__ */ b('<div class="help-favorites-panel svelte-20v6lo"><!></div>');
function dm(n, e) {
  Fe(e, !0);
  let t = /* @__PURE__ */ j(Be([])), r = Be(/* @__PURE__ */ new Map()), s = /* @__PURE__ */ j(!0), a = /* @__PURE__ */ j(null), o = /* @__PURE__ */ j("title"), c = /* @__PURE__ */ j("asc"), u = /* @__PURE__ */ j(null);
  const v = _t();
  async function p() {
    try {
      f(s, !0), f(a, null);
      const x = e.helpManager.getBookmarks();
      f(t, x, !0), r.clear();
      for (const N of x) {
        const te = e.helpManager.getTopic(N.topicId);
        te && r.set(N.topicId, te);
      }
    } catch (x) {
      f(a, `Failed to load bookmarks: ${x instanceof Error ? x.message : "Unknown error"}`), console.error("Error loading bookmarks:", x);
    } finally {
      f(s, !1);
    }
  }
  function _(x) {
    v("topic-select", x.topicId);
  }
  function g(x) {
    v("bookmark-toggle", x.topicId);
  }
  function y(x) {
    i(o) === x ? f(c, i(c) === "asc" ? "desc" : "asc", !0) : (f(o, x, !0), f(c, "asc"));
  }
  function I(x) {
    f(u, x, !0);
  }
  function E() {
    if (confirm("Are you sure you want to remove all bookmarks?")) {
      for (const x of i(t))
        e.helpManager.removeBookmark(x.topicId);
      p();
    }
  }
  function L(x, N) {
    x.key === "Enter" || x.key === " " ? (x.preventDefault(), _(N)) : x.key === "Delete" && (x.preventDefault(), g(N));
  }
  let T = /* @__PURE__ */ ze(() => (() => {
    let x = i(t);
    return i(u) && (x = x.filter((N) => r.get(N.topicId)?.category === i(u))), x.sort((N, te) => {
      let J = 0;
      switch (i(o)) {
        case "title":
          J = N.title.localeCompare(te.title);
          break;
        case "dateAdded":
          J = N.dateAdded.getTime() - te.dateAdded.getTime();
          break;
        case "category":
          const H = r.get(N.topicId), O = r.get(te.topicId), B = H?.category || "", F = O?.category || "";
          J = B.localeCompare(F);
          break;
      }
      return i(c) === "desc" ? -J : J;
    });
  })()), C = /* @__PURE__ */ ze(() => Array.from(new Set(i(t).map((x) => r.get(x.topicId)?.category).filter(Boolean))).sort());
  wt(() => {
    p();
    const x = e.helpManager?.on("bookmark:added", () => {
      p();
    }), N = e.helpManager?.on("bookmark:removed", () => {
      p();
    });
    return () => {
      x?.(), N?.();
    };
  });
  var z = mp(), k = d(z);
  {
    var w = (x) => {
      var N = op();
      m(x, N);
    }, A = (x) => {
      var N = Re(), te = Ce(N);
      {
        var J = (O) => {
          var B = lp(), F = d(B), P = d(F, !0);
          l(F);
          var U = h(F, 2);
          l(B), Z(() => q(P, i(a))), G("click", U, p), m(O, B);
        }, H = (O) => {
          var B = Re(), F = Ce(B);
          {
            var P = (ee) => {
              var W = cp();
              m(ee, W);
            }, U = (ee) => {
              var W = pp(), se = d(W), S = d(se), M = h(d(S), 2);
              let V;
              var $ = d(M);
              l(M);
              var Y = h(M, 2);
              let oe;
              var ie = d(Y);
              l(Y);
              var re = h(Y, 2);
              let ae;
              var fe = d(re);
              l(re), l(S);
              var me = h(S, 2), ve = h(d(me), 2), X = d(ve);
              X.value = X.__value = "";
              var le = h(X);
              Le(le, 17, () => i(C), je, (ke, Me) => {
                var _e = dp(), ye = d(_e, !0);
                l(_e);
                var Ue = {};
                Z(() => {
                  q(ye, i(Me)), Ue !== (Ue = i(Me)) && (_e.value = (_e.__value = i(Me)) ?? "");
                }), m(ke, _e);
              }), l(ve), l(me);
              var we = h(me, 2), D = d(we);
              l(we), l(se);
              var Q = h(se, 2), R = d(Q), ne = d(R), ge = d(ne);
              l(ne), l(R);
              var de = h(R, 2);
              {
                var pe = (ke) => {
                  var Me = up();
                  m(ke, Me);
                }, he = (ke) => {
                  var Me = hp();
                  Le(Me, 21, () => i(T), je, (_e, ye) => {
                    const Ue = /* @__PURE__ */ ze(() => r.get(i(ye).topicId));
                    var qe = fp(), Ke = d(qe), Ve = d(Ke), Ye = h(d(Ve), 2), Ne = d(Ye, !0);
                    l(Ye);
                    var Je = h(Ye, 2);
                    l(Ve);
                    var nt = h(Ve, 2), Ct = d(nt), ft = d(Ct, !0);
                    l(Ct);
                    var ht = h(Ct, 2), yt = d(ht);
                    l(ht), l(nt);
                    var rt = h(nt, 2);
                    {
                      var zt = (ce) => {
                        var Te = vp(), ot = d(Te, !0);
                        l(Te), Z(() => q(ot, i(ye).notes)), m(ce, Te);
                      };
                      K(rt, (ce) => {
                        i(ye).notes && ce(zt);
                      });
                    }
                    l(Ke), l(qe), Z(
                      (ce) => {
                        q(Ne, i(ye).title), q(ft, i(Ue)?.category || "Unknown"), q(yt, `Added ${ce ?? ""}`);
                      },
                      [() => i(ye).dateAdded.toLocaleDateString()]
                    ), G("click", Je, Mn(() => g(i(ye)))), G("click", qe, () => _(i(ye))), G("keydown", qe, (ce) => L(ce, i(ye))), m(_e, qe);
                  }), l(Me), m(ke, Me);
                };
                K(de, (ke) => {
                  i(T).length === 0 ? ke(pe) : ke(he, !1);
                });
              }
              l(Q), l(W), Z(
                (ke, Me, _e) => {
                  V = xe(M, 1, "sort-button svelte-20v6lo", null, V, ke), q($, `Title ${i(o) === "title" ? i(c) === "asc" ? "↑" : "↓" : ""}`), oe = xe(Y, 1, "sort-button svelte-20v6lo", null, oe, Me), q(ie, `Date ${i(o) === "dateAdded" ? i(c) === "asc" ? "↑" : "↓" : ""}`), ae = xe(re, 1, "sort-button svelte-20v6lo", null, ae, _e), q(fe, `Category ${i(o) === "category" ? i(c) === "asc" ? "↑" : "↓" : ""}`), q(ge, `${i(T).length ?? ""} bookmark${i(T).length !== 1 ? "s" : ""}`);
                },
                [
                  () => ({ active: i(o) === "title" }),
                  () => ({ active: i(o) === "dateAdded" }),
                  () => ({ active: i(o) === "category" })
                ]
              ), G("click", M, () => y("title")), G("click", Y, () => y("dateAdded")), G("click", re, () => y("category")), bl(ve, () => i(u), (ke) => f(u, ke)), G("change", ve, (ke) => I(ke.target.value || null)), G("click", D, E), m(ee, W);
            };
            K(
              F,
              (ee) => {
                i(t).length === 0 ? ee(P) : ee(U, !1);
              },
              !0
            );
          }
          m(O, B);
        };
        K(
          te,
          (O) => {
            i(a) ? O(J) : O(H, !1);
          },
          !0
        );
      }
      m(x, N);
    };
    K(k, (x) => {
      i(s) ? x(w) : x(A, !1);
    });
  }
  l(z), m(n, z), Oe();
}
const um = "1.0.0";
export {
  Sp as AuthorizationError,
  ns as Button,
  Ks as Checkbox,
  Fp as DEFAULT_THEME,
  Bl as DEFAULT_WINDOW_HEIGHT,
  Rl as DEFAULT_WINDOW_WIDTH,
  Bp as DESKTOP_GRID_COLUMNS,
  Fl as DESKTOP_ICON_SIZE,
  Ol as DESKTOP_ICON_SPACING,
  Rp as DRAG_DEBOUNCE_MS,
  Od as Desktop,
  Up as HELP_STYLE_CONSTANTS,
  em as HELP_SYSTEM_CONSTANTS,
  $p as HELP_SYSTEM_VERSION,
  jp as HTTPKernel,
  iv as HelpBookmarkManager,
  am as HelpContentArea,
  nv as HelpContentManager,
  dm as HelpFavoritesPanel,
  sv as HelpHistoryManager,
  oh as HelpHistoryPanel,
  cm as HelpIndexPanel,
  nm as HelpMenuBar,
  rv as HelpSearchEngine,
  lm as HelpSearchPanel,
  om as HelpStatusBar,
  Hn as HelpStyleManager,
  Kp as HelpStyleUtils,
  tm as HelpSystem,
  Za as HelpSystemManager,
  im as HelpTabBar,
  rm as HelpToolbar,
  sm as HelpTopicTree,
  Xr as KernelError,
  Bs as MAX_WINDOWS,
  kr as MIN_WINDOW_HEIGHT,
  yr as MIN_WINDOW_WIDTH,
  Mp as MODAL_BASE_Z,
  Au as MessageBox,
  Np as MockKernel,
  xp as NetworkError,
  Ap as START_MENU_Z,
  Ll as STORAGE_DEBOUNCE_MS,
  hi as STORAGE_KEY,
  Dl as STORAGE_TTL_DAYS,
  es as STORAGE_VERSION,
  Hp as SUPPORTED_THEMES,
  Ja as Scrollbar,
  Wp as Select,
  Tp as ServiceUnavailableError,
  qp as Shell,
  iu as StartMenu,
  Al as TASKBAR_HEIGHT,
  Ip as TASKBAR_Z,
  Dp as TITLEBAR_HEIGHT,
  Ud as Taskbar,
  ji as TextInput,
  Ep as TimeoutError,
  Va as VOLUME_DEFAULT,
  Os as VOLUME_MAX,
  Fs as VOLUME_MIN,
  Ee as ValidationError,
  jr as WINDOW_BASE_Z,
  Lp as WINDOW_BORDER_WIDTH,
  Op as WINDOW_RESIZE_HANDLES,
  Eu as Window,
  Gt as audio,
  Id as builtinPlugins,
  Qp as createHelpSystemManager,
  Qe as desktop,
  $e as dialogManager,
  wp as getContext,
  Vp as getHelpStyleManager,
  yp as hydrate,
  Gp as initializeHelpStyles,
  Ga as isBounds,
  Xp as isHelpBookmark,
  av as isHelpCategory,
  Zp as isHelpSystemState,
  ov as isHelpTab,
  Yp as isHelpTopic,
  Ua as isPosition,
  Jp as isSearchResult,
  Ka as isSize,
  zp as isStoredState,
  Cp as isWindowState,
  cl as mount,
  wt as onMount,
  Tn as pluginRegistry,
  _p as setContext,
  Ht as theme,
  kp as unmount,
  Hl as validateBounds,
  si as validatePluginId,
  Or as validatePosition,
  Hs as validateSemanticVersion,
  pi as validateSize,
  Xa as validateStoredState,
  Ya as validateVolume,
  Pp as validateWindowState,
  um as version,
  Ie as windowManager
};
//# sourceMappingURL=index.js.map
