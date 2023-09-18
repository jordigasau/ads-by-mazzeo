function gn(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let i = 0; i < s.length; i++)
    n[s[i]] = !0;
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
const U = {}, Be = [], ae = () => {
}, xi = () => !1, Ei = /^on[^a-z]/, zt = (e) => Ei.test(e), bn = (e) => e.startsWith("onUpdate:"), K = Object.assign, vn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, yi = Object.prototype.hasOwnProperty, M = (e, t) => yi.call(e, t), A = Array.isArray, We = (e) => kt(e) === "[object Map]", ws = (e) => kt(e) === "[object Set]", S = (e) => typeof e == "function", W = (e) => typeof e == "string", xn = (e) => typeof e == "symbol", L = (e) => e !== null && typeof e == "object", Ss = (e) => L(e) && S(e.then) && S(e.catch), Is = Object.prototype.toString, kt = (e) => Is.call(e), Ci = (e) => kt(e).slice(8, -1), Ps = (e) => kt(e) === "[object Object]", En = (e) => W(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Tt = /* @__PURE__ */ gn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Ft = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Oi = /-(\w)/g, ve = Ft((e) => e.replace(Oi, (t, n) => n ? n.toUpperCase() : "")), Ti = /\B([A-Z])/g, re = Ft(
  (e) => e.replace(Ti, "-$1").toLowerCase()
), Ds = Ft(
  (e) => e.charAt(0).toUpperCase() + e.slice(1)
), qt = Ft(
  (e) => e ? `on${Ds(e)}` : ""
), lt = (e, t) => !Object.is(e, t), Xt = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, It = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Ai = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Xn = (e) => {
  const t = W(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Yn;
const tn = () => Yn || (Yn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function yn(e) {
  if (A(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], i = W(s) ? Ii(s) : yn(s);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else {
    if (W(e))
      return e;
    if (L(e))
      return e;
  }
}
const Ri = /;(?![^(]*\))/g, wi = /:([^]+)/, Si = /\/\*[^]*?\*\//g;
function Ii(e) {
  const t = {};
  return e.replace(Si, "").split(Ri).forEach((n) => {
    if (n) {
      const s = n.split(wi);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Cn(e) {
  let t = "";
  if (W(e))
    t = e;
  else if (A(e))
    for (let n = 0; n < e.length; n++) {
      const s = Cn(e[n]);
      s && (t += s + " ");
    }
  else if (L(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Pi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Di = /* @__PURE__ */ gn(Pi);
function Ms(e) {
  return !!e || e === "";
}
const Zn = (e) => W(e) ? e : e == null ? "" : A(e) || L(e) && (e.toString === Is || !S(e.toString)) ? JSON.stringify(e, Ns, 2) : String(e), Ns = (e, t) => t && t.__v_isRef ? Ns(e, t.value) : We(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, i]) => (n[`${s} =>`] = i, n), {})
} : ws(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : L(t) && !A(t) && !Ps(t) ? String(t) : t;
let ie;
class Mi {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = ie, !t && ie && (this.index = (ie.scopes || (ie.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = ie;
      try {
        return ie = this, t();
      } finally {
        ie = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ie = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    ie = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Ni(e, t = ie) {
  t && t.active && t.effects.push(e);
}
function zi() {
  return ie;
}
const On = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, zs = (e) => (e.w & Se) > 0, ks = (e) => (e.n & Se) > 0, ki = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= Se;
}, Fi = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const i = t[s];
      zs(i) && !ks(i) ? i.delete(e) : t[n++] = i, i.w &= ~Se, i.n &= ~Se;
    }
    t.length = n;
  }
}, nn = /* @__PURE__ */ new WeakMap();
let st = 0, Se = 1;
const sn = 30;
let oe;
const Ue = Symbol(""), rn = Symbol("");
class Tn {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Ni(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = oe, n = Ae;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = oe, oe = this, Ae = !0, Se = 1 << ++st, st <= sn ? ki(this) : Jn(this), this.fn();
    } finally {
      st <= sn && Fi(this), Se = 1 << --st, oe = this.parent, Ae = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    oe === this ? this.deferStop = !0 : this.active && (Jn(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Jn(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let Ae = !0;
const Fs = [];
function Ze() {
  Fs.push(Ae), Ae = !1;
}
function Je() {
  const e = Fs.pop();
  Ae = e === void 0 ? !0 : e;
}
function te(e, t, n) {
  if (Ae && oe) {
    let s = nn.get(e);
    s || nn.set(e, s = /* @__PURE__ */ new Map());
    let i = s.get(n);
    i || s.set(n, i = On()), Us(i);
  }
}
function Us(e, t) {
  let n = !1;
  st <= sn ? ks(e) || (e.n |= Se, n = !zs(e)) : n = !e.has(oe), n && (e.add(oe), oe.deps.push(e));
}
function Ee(e, t, n, s, i, r) {
  const l = nn.get(e);
  if (!l)
    return;
  let a = [];
  if (t === "clear")
    a = [...l.values()];
  else if (n === "length" && A(e)) {
    const u = Number(s);
    l.forEach((f, h) => {
      (h === "length" || h >= u) && a.push(f);
    });
  } else
    switch (n !== void 0 && a.push(l.get(n)), t) {
      case "add":
        A(e) ? En(n) && a.push(l.get("length")) : (a.push(l.get(Ue)), We(e) && a.push(l.get(rn)));
        break;
      case "delete":
        A(e) || (a.push(l.get(Ue)), We(e) && a.push(l.get(rn)));
        break;
      case "set":
        We(e) && a.push(l.get(Ue));
        break;
    }
  if (a.length === 1)
    a[0] && on(a[0]);
  else {
    const u = [];
    for (const f of a)
      f && u.push(...f);
    on(On(u));
  }
}
function on(e, t) {
  const n = A(e) ? e : [...e];
  for (const s of n)
    s.computed && Qn(s);
  for (const s of n)
    s.computed || Qn(s);
}
function Qn(e, t) {
  (e !== oe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Ui = /* @__PURE__ */ gn("__proto__,__v_isRef,__isVue"), Hs = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(xn)
), Hi = /* @__PURE__ */ An(), Li = /* @__PURE__ */ An(!1, !0), ji = /* @__PURE__ */ An(!0), es = /* @__PURE__ */ Vi();
function Vi() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = N(this);
      for (let r = 0, l = this.length; r < l; r++)
        te(s, "get", r + "");
      const i = s[t](...n);
      return i === -1 || i === !1 ? s[t](...n.map(N)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Ze();
      const s = N(this)[t].apply(this, n);
      return Je(), s;
    };
  }), e;
}
function Ki(e) {
  const t = N(this);
  return te(t, "has", e), t.hasOwnProperty(e);
}
function An(e = !1, t = !1) {
  return function(s, i, r) {
    if (i === "__v_isReactive")
      return !e;
    if (i === "__v_isReadonly")
      return e;
    if (i === "__v_isShallow")
      return t;
    if (i === "__v_raw" && r === (e ? t ? rr : Bs : t ? Ks : Vs).get(s))
      return s;
    const l = A(s);
    if (!e) {
      if (l && M(es, i))
        return Reflect.get(es, i, r);
      if (i === "hasOwnProperty")
        return Ki;
    }
    const a = Reflect.get(s, i, r);
    return (xn(i) ? Hs.has(i) : Ui(i)) || (e || te(s, "get", i), t) ? a : Z(a) ? l && En(i) ? a : a.value : L(a) ? e ? Ws(a) : Sn(a) : a;
  };
}
const Bi = /* @__PURE__ */ Ls(), Wi = /* @__PURE__ */ Ls(!0);
function Ls(e = !1) {
  return function(n, s, i, r) {
    let l = n[s];
    if (qe(l) && Z(l) && !Z(i))
      return !1;
    if (!e && (!Pt(i) && !qe(i) && (l = N(l), i = N(i)), !A(n) && Z(l) && !Z(i)))
      return l.value = i, !0;
    const a = A(n) && En(s) ? Number(s) < n.length : M(n, s), u = Reflect.set(n, s, i, r);
    return n === N(r) && (a ? lt(i, l) && Ee(n, "set", s, i) : Ee(n, "add", s, i)), u;
  };
}
function $i(e, t) {
  const n = M(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && Ee(e, "delete", t, void 0), s;
}
function Gi(e, t) {
  const n = Reflect.has(e, t);
  return (!xn(t) || !Hs.has(t)) && te(e, "has", t), n;
}
function qi(e) {
  return te(e, "iterate", A(e) ? "length" : Ue), Reflect.ownKeys(e);
}
const js = {
  get: Hi,
  set: Bi,
  deleteProperty: $i,
  has: Gi,
  ownKeys: qi
}, Xi = {
  get: ji,
  set(e, t) {
    return !0;
  },
  deleteProperty(e, t) {
    return !0;
  }
}, Yi = /* @__PURE__ */ K(
  {},
  js,
  {
    get: Li,
    set: Wi
  }
), Rn = (e) => e, Ut = (e) => Reflect.getPrototypeOf(e);
function vt(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const i = N(e), r = N(t);
  n || (t !== r && te(i, "get", t), te(i, "get", r));
  const { has: l } = Ut(i), a = s ? Rn : n ? Pn : ct;
  if (l.call(i, t))
    return a(e.get(t));
  if (l.call(i, r))
    return a(e.get(r));
  e !== i && e.get(t);
}
function xt(e, t = !1) {
  const n = this.__v_raw, s = N(n), i = N(e);
  return t || (e !== i && te(s, "has", e), te(s, "has", i)), e === i ? n.has(e) : n.has(e) || n.has(i);
}
function Et(e, t = !1) {
  return e = e.__v_raw, !t && te(N(e), "iterate", Ue), Reflect.get(e, "size", e);
}
function ts(e) {
  e = N(e);
  const t = N(this);
  return Ut(t).has.call(t, e) || (t.add(e), Ee(t, "add", e, e)), this;
}
function ns(e, t) {
  t = N(t);
  const n = N(this), { has: s, get: i } = Ut(n);
  let r = s.call(n, e);
  r || (e = N(e), r = s.call(n, e));
  const l = i.call(n, e);
  return n.set(e, t), r ? lt(t, l) && Ee(n, "set", e, t) : Ee(n, "add", e, t), this;
}
function ss(e) {
  const t = N(this), { has: n, get: s } = Ut(t);
  let i = n.call(t, e);
  i || (e = N(e), i = n.call(t, e)), s && s.call(t, e);
  const r = t.delete(e);
  return i && Ee(t, "delete", e, void 0), r;
}
function is() {
  const e = N(this), t = e.size !== 0, n = e.clear();
  return t && Ee(e, "clear", void 0, void 0), n;
}
function yt(e, t) {
  return function(s, i) {
    const r = this, l = r.__v_raw, a = N(l), u = t ? Rn : e ? Pn : ct;
    return !e && te(a, "iterate", Ue), l.forEach((f, h) => s.call(i, u(f), u(h), r));
  };
}
function Ct(e, t, n) {
  return function(...s) {
    const i = this.__v_raw, r = N(i), l = We(r), a = e === "entries" || e === Symbol.iterator && l, u = e === "keys" && l, f = i[e](...s), h = n ? Rn : t ? Pn : ct;
    return !t && te(
      r,
      "iterate",
      u ? rn : Ue
    ), {
      // iterator protocol
      next() {
        const { value: E, done: C } = f.next();
        return C ? { value: E, done: C } : {
          value: a ? [h(E[0]), h(E[1])] : h(E),
          done: C
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Oe(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function Zi() {
  const e = {
    get(r) {
      return vt(this, r);
    },
    get size() {
      return Et(this);
    },
    has: xt,
    add: ts,
    set: ns,
    delete: ss,
    clear: is,
    forEach: yt(!1, !1)
  }, t = {
    get(r) {
      return vt(this, r, !1, !0);
    },
    get size() {
      return Et(this);
    },
    has: xt,
    add: ts,
    set: ns,
    delete: ss,
    clear: is,
    forEach: yt(!1, !0)
  }, n = {
    get(r) {
      return vt(this, r, !0);
    },
    get size() {
      return Et(this, !0);
    },
    has(r) {
      return xt.call(this, r, !0);
    },
    add: Oe("add"),
    set: Oe("set"),
    delete: Oe("delete"),
    clear: Oe("clear"),
    forEach: yt(!0, !1)
  }, s = {
    get(r) {
      return vt(this, r, !0, !0);
    },
    get size() {
      return Et(this, !0);
    },
    has(r) {
      return xt.call(this, r, !0);
    },
    add: Oe("add"),
    set: Oe("set"),
    delete: Oe("delete"),
    clear: Oe("clear"),
    forEach: yt(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
    e[r] = Ct(
      r,
      !1,
      !1
    ), n[r] = Ct(
      r,
      !0,
      !1
    ), t[r] = Ct(
      r,
      !1,
      !0
    ), s[r] = Ct(
      r,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    s
  ];
}
const [
  Ji,
  Qi,
  er,
  tr
] = /* @__PURE__ */ Zi();
function wn(e, t) {
  const n = t ? e ? tr : er : e ? Qi : Ji;
  return (s, i, r) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? s : Reflect.get(
    M(n, i) && i in s ? n : s,
    i,
    r
  );
}
const nr = {
  get: /* @__PURE__ */ wn(!1, !1)
}, sr = {
  get: /* @__PURE__ */ wn(!1, !0)
}, ir = {
  get: /* @__PURE__ */ wn(!0, !1)
}, Vs = /* @__PURE__ */ new WeakMap(), Ks = /* @__PURE__ */ new WeakMap(), Bs = /* @__PURE__ */ new WeakMap(), rr = /* @__PURE__ */ new WeakMap();
function or(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function lr(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : or(Ci(e));
}
function Sn(e) {
  return qe(e) ? e : In(
    e,
    !1,
    js,
    nr,
    Vs
  );
}
function cr(e) {
  return In(
    e,
    !1,
    Yi,
    sr,
    Ks
  );
}
function Ws(e) {
  return In(
    e,
    !0,
    Xi,
    ir,
    Bs
  );
}
function In(e, t, n, s, i) {
  if (!L(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = i.get(e);
  if (r)
    return r;
  const l = lr(e);
  if (l === 0)
    return e;
  const a = new Proxy(
    e,
    l === 2 ? s : n
  );
  return i.set(e, a), a;
}
function $e(e) {
  return qe(e) ? $e(e.__v_raw) : !!(e && e.__v_isReactive);
}
function qe(e) {
  return !!(e && e.__v_isReadonly);
}
function Pt(e) {
  return !!(e && e.__v_isShallow);
}
function $s(e) {
  return $e(e) || qe(e);
}
function N(e) {
  const t = e && e.__v_raw;
  return t ? N(t) : e;
}
function Gs(e) {
  return It(e, "__v_skip", !0), e;
}
const ct = (e) => L(e) ? Sn(e) : e, Pn = (e) => L(e) ? Ws(e) : e;
function qs(e) {
  Ae && oe && (e = N(e), Us(e.dep || (e.dep = On())));
}
function Xs(e, t) {
  e = N(e);
  const n = e.dep;
  n && on(n);
}
function Z(e) {
  return !!(e && e.__v_isRef === !0);
}
function rs(e) {
  return ar(e, !1);
}
function ar(e, t) {
  return Z(e) ? e : new ur(e, t);
}
class ur {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : N(t), this._value = n ? t : ct(t);
  }
  get value() {
    return qs(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Pt(t) || qe(t);
    t = n ? t : N(t), lt(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : ct(t), Xs(this));
  }
}
function fr(e) {
  return Z(e) ? e.value : e;
}
const pr = {
  get: (e, t, n) => fr(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const i = e[t];
    return Z(i) && !Z(n) ? (i.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Ys(e) {
  return $e(e) ? e : new Proxy(e, pr);
}
class _r {
  constructor(t, n, s, i) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new Tn(t, () => {
      this._dirty || (this._dirty = !0, Xs(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = s;
  }
  get value() {
    const t = N(this);
    return qs(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function dr(e, t, n = !1) {
  let s, i;
  const r = S(e);
  return r ? (s = e, i = ae) : (s = e.get, i = e.set), new _r(s, i, r || !i, n);
}
function Re(e, t, n, s) {
  let i;
  try {
    i = s ? e(...s) : e();
  } catch (r) {
    Ht(r, t, n);
  }
  return i;
}
function ue(e, t, n, s) {
  if (S(e)) {
    const r = Re(e, t, n, s);
    return r && Ss(r) && r.catch((l) => {
      Ht(l, t, n);
    }), r;
  }
  const i = [];
  for (let r = 0; r < e.length; r++)
    i.push(ue(e[r], t, n, s));
  return i;
}
function Ht(e, t, n, s = !0) {
  const i = t ? t.vnode : null;
  if (t) {
    let r = t.parent;
    const l = t.proxy, a = n;
    for (; r; ) {
      const f = r.ec;
      if (f) {
        for (let h = 0; h < f.length; h++)
          if (f[h](e, l, a) === !1)
            return;
      }
      r = r.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      Re(
        u,
        null,
        10,
        [e, l, a]
      );
      return;
    }
  }
  mr(e, n, i, s);
}
function mr(e, t, n, s = !0) {
  console.error(e);
}
let at = !1, ln = !1;
const Y = [];
let he = 0;
const Ge = [];
let be = null, ke = 0;
const Zs = /* @__PURE__ */ Promise.resolve();
let Dn = null;
function Js(e) {
  const t = Dn || Zs;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function hr(e) {
  let t = he + 1, n = Y.length;
  for (; t < n; ) {
    const s = t + n >>> 1;
    ut(Y[s]) < e ? t = s + 1 : n = s;
  }
  return t;
}
function Mn(e) {
  (!Y.length || !Y.includes(
    e,
    at && e.allowRecurse ? he + 1 : he
  )) && (e.id == null ? Y.push(e) : Y.splice(hr(e.id), 0, e), Qs());
}
function Qs() {
  !at && !ln && (ln = !0, Dn = Zs.then(ti));
}
function gr(e) {
  const t = Y.indexOf(e);
  t > he && Y.splice(t, 1);
}
function br(e) {
  A(e) ? Ge.push(...e) : (!be || !be.includes(
    e,
    e.allowRecurse ? ke + 1 : ke
  )) && Ge.push(e), Qs();
}
function os(e, t = at ? he + 1 : 0) {
  for (; t < Y.length; t++) {
    const n = Y[t];
    n && n.pre && (Y.splice(t, 1), t--, n());
  }
}
function ei(e) {
  if (Ge.length) {
    const t = [...new Set(Ge)];
    if (Ge.length = 0, be) {
      be.push(...t);
      return;
    }
    for (be = t, be.sort((n, s) => ut(n) - ut(s)), ke = 0; ke < be.length; ke++)
      be[ke]();
    be = null, ke = 0;
  }
}
const ut = (e) => e.id == null ? 1 / 0 : e.id, vr = (e, t) => {
  const n = ut(e) - ut(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function ti(e) {
  ln = !1, at = !0, Y.sort(vr);
  const t = ae;
  try {
    for (he = 0; he < Y.length; he++) {
      const n = Y[he];
      n && n.active !== !1 && Re(n, null, 14);
    }
  } finally {
    he = 0, Y.length = 0, ei(), at = !1, Dn = null, (Y.length || Ge.length) && ti();
  }
}
function xr(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const s = e.vnode.props || U;
  let i = n;
  const r = t.startsWith("update:"), l = r && t.slice(7);
  if (l && l in s) {
    const h = `${l === "modelValue" ? "model" : l}Modifiers`, { number: E, trim: C } = s[h] || U;
    C && (i = n.map((w) => W(w) ? w.trim() : w)), E && (i = n.map(Ai));
  }
  let a, u = s[a = qt(t)] || // also try camelCase event handler (#2249)
  s[a = qt(ve(t))];
  !u && r && (u = s[a = qt(re(t))]), u && ue(
    u,
    e,
    6,
    i
  );
  const f = s[a + "Once"];
  if (f) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[a])
      return;
    e.emitted[a] = !0, ue(
      f,
      e,
      6,
      i
    );
  }
}
function ni(e, t, n = !1) {
  const s = t.emitsCache, i = s.get(e);
  if (i !== void 0)
    return i;
  const r = e.emits;
  let l = {}, a = !1;
  if (!S(e)) {
    const u = (f) => {
      const h = ni(f, t, !0);
      h && (a = !0, K(l, h));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !r && !a ? (L(e) && s.set(e, null), null) : (A(r) ? r.forEach((u) => l[u] = null) : K(l, r), L(e) && s.set(e, l), l);
}
function Lt(e, t) {
  return !e || !zt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), M(e, t[0].toLowerCase() + t.slice(1)) || M(e, re(t)) || M(e, t));
}
let le = null, si = null;
function Dt(e) {
  const t = le;
  return le = e, si = e && e.type.__scopeId || null, t;
}
function Er(e, t = le, n) {
  if (!t || e._n)
    return e;
  const s = (...i) => {
    s._d && hs(-1);
    const r = Dt(t);
    let l;
    try {
      l = e(...i);
    } finally {
      Dt(r), s._d && hs(1);
    }
    return l;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Yt(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: i,
    props: r,
    propsOptions: [l],
    slots: a,
    attrs: u,
    emit: f,
    render: h,
    renderCache: E,
    data: C,
    setupState: w,
    ctx: j,
    inheritAttrs: D
  } = e;
  let B, G;
  const q = Dt(e);
  try {
    if (n.shapeFlag & 4) {
      const I = i || s;
      B = me(
        h.call(
          I,
          I,
          E,
          r,
          w,
          C,
          j
        )
      ), G = u;
    } else {
      const I = t;
      B = me(
        I.length > 1 ? I(
          r,
          { attrs: u, slots: a, emit: f }
        ) : I(
          r,
          null
          /* we know it doesn't need it */
        )
      ), G = t.props ? u : yr(u);
    }
  } catch (I) {
    ot.length = 0, Ht(I, e, 1), B = we(ft);
  }
  let X = B;
  if (G && D !== !1) {
    const I = Object.keys(G), { shapeFlag: Ce } = X;
    I.length && Ce & 7 && (l && I.some(bn) && (G = Cr(
      G,
      l
    )), X = Xe(X, G));
  }
  return n.dirs && (X = Xe(X), X.dirs = X.dirs ? X.dirs.concat(n.dirs) : n.dirs), n.transition && (X.transition = n.transition), B = X, Dt(q), B;
}
const yr = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || zt(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Cr = (e, t) => {
  const n = {};
  for (const s in e)
    (!bn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Or(e, t, n) {
  const { props: s, children: i, component: r } = e, { props: l, children: a, patchFlag: u } = t, f = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return s ? ls(s, l, f) : !!l;
    if (u & 8) {
      const h = t.dynamicProps;
      for (let E = 0; E < h.length; E++) {
        const C = h[E];
        if (l[C] !== s[C] && !Lt(f, C))
          return !0;
      }
    }
  } else
    return (i || a) && (!a || !a.$stable) ? !0 : s === l ? !1 : s ? l ? ls(s, l, f) : !0 : !!l;
  return !1;
}
function ls(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < s.length; i++) {
    const r = s[i];
    if (t[r] !== e[r] && !Lt(n, r))
      return !0;
  }
  return !1;
}
function Tr({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const Ar = (e) => e.__isSuspense;
function Rr(e, t) {
  t && t.pendingBranch ? A(e) ? t.effects.push(...e) : t.effects.push(e) : br(e);
}
function wr(e, t) {
  return Nn(
    e,
    null,
    { flush: "post" }
  );
}
const Ot = {};
function Zt(e, t, n) {
  return Nn(e, t, n);
}
function Nn(e, t, { immediate: n, deep: s, flush: i, onTrack: r, onTrigger: l } = U) {
  var a;
  const u = zi() === ((a = $) == null ? void 0 : a.scope) ? $ : null;
  let f, h = !1, E = !1;
  if (Z(e) ? (f = () => e.value, h = Pt(e)) : $e(e) ? (f = () => e, s = !0) : A(e) ? (E = !0, h = e.some((I) => $e(I) || Pt(I)), f = () => e.map((I) => {
    if (Z(I))
      return I.value;
    if ($e(I))
      return Ke(I);
    if (S(I))
      return Re(I, u, 2);
  })) : S(e) ? t ? f = () => Re(e, u, 2) : f = () => {
    if (!(u && u.isUnmounted))
      return C && C(), ue(
        e,
        u,
        3,
        [w]
      );
  } : f = ae, t && s) {
    const I = f;
    f = () => Ke(I());
  }
  let C, w = (I) => {
    C = q.onStop = () => {
      Re(I, u, 4);
    };
  }, j;
  if (_t)
    if (w = ae, t ? n && ue(t, u, 3, [
      f(),
      E ? [] : void 0,
      w
    ]) : f(), i === "sync") {
      const I = Ro();
      j = I.__watcherHandles || (I.__watcherHandles = []);
    } else
      return ae;
  let D = E ? new Array(e.length).fill(Ot) : Ot;
  const B = () => {
    if (q.active)
      if (t) {
        const I = q.run();
        (s || h || (E ? I.some(
          (Ce, Qe) => lt(Ce, D[Qe])
        ) : lt(I, D))) && (C && C(), ue(t, u, 3, [
          I,
          // pass undefined as the old value when it's changed for the first time
          D === Ot ? void 0 : E && D[0] === Ot ? [] : D,
          w
        ]), D = I);
      } else
        q.run();
  };
  B.allowRecurse = !!t;
  let G;
  i === "sync" ? G = B : i === "post" ? G = () => ee(B, u && u.suspense) : (B.pre = !0, u && (B.id = u.uid), G = () => Mn(B));
  const q = new Tn(f, G);
  t ? n ? B() : D = q.run() : i === "post" ? ee(
    q.run.bind(q),
    u && u.suspense
  ) : q.run();
  const X = () => {
    q.stop(), u && u.scope && vn(u.scope.effects, q);
  };
  return j && j.push(X), X;
}
function Sr(e, t, n) {
  const s = this.proxy, i = W(e) ? e.includes(".") ? ii(s, e) : () => s[e] : e.bind(s, s);
  let r;
  S(t) ? r = t : (r = t.handler, n = t);
  const l = $;
  Ye(this);
  const a = Nn(i, r.bind(s), n);
  return l ? Ye(l) : He(), a;
}
function ii(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let i = 0; i < n.length && s; i++)
      s = s[n[i]];
    return s;
  };
}
function Ke(e, t) {
  if (!L(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), Z(e))
    Ke(e.value, t);
  else if (A(e))
    for (let n = 0; n < e.length; n++)
      Ke(e[n], t);
  else if (ws(e) || We(e))
    e.forEach((n) => {
      Ke(n, t);
    });
  else if (Ps(e))
    for (const n in e)
      Ke(e[n], t);
  return e;
}
function Ne(e, t, n, s) {
  const i = e.dirs, r = t && t.dirs;
  for (let l = 0; l < i.length; l++) {
    const a = i[l];
    r && (a.oldValue = r[l].value);
    let u = a.dir[s];
    u && (Ze(), ue(u, n, 8, [
      e.el,
      a,
      e,
      t
    ]), Je());
  }
}
function Ir(e, t) {
  return S(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => K({ name: e.name }, t, { setup: e }))()
  ) : e;
}
const At = (e) => !!e.type.__asyncLoader, ri = (e) => e.type.__isKeepAlive;
function Pr(e, t) {
  oi(e, "a", t);
}
function Dr(e, t) {
  oi(e, "da", t);
}
function oi(e, t, n = $) {
  const s = e.__wdc || (e.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (jt(t, s, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      ri(i.parent.vnode) && Mr(s, t, n, i), i = i.parent;
  }
}
function Mr(e, t, n, s) {
  const i = jt(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  kn(() => {
    vn(s[t], i);
  }, n);
}
function jt(e, t, n = $, s = !1) {
  if (n) {
    const i = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...l) => {
      if (n.isUnmounted)
        return;
      Ze(), Ye(n);
      const a = ue(t, n, e, l);
      return He(), Je(), a;
    });
    return s ? i.unshift(r) : i.push(r), r;
  }
}
const ye = (e) => (t, n = $) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!_t || e === "sp") && jt(e, (...s) => t(...s), n)
), Nr = ye("bm"), zn = ye("m"), zr = ye("bu"), kr = ye("u"), Fr = ye("bum"), kn = ye("um"), Ur = ye("sp"), Hr = ye(
  "rtg"
), Lr = ye(
  "rtc"
);
function jr(e, t = $) {
  jt("ec", e, t);
}
const Vr = Symbol.for("v-ndc"), cn = (e) => e ? hi(e) ? jn(e) || e.proxy : cn(e.parent) : null, rt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ K(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => cn(e.parent),
    $root: (e) => cn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Fn(e),
    $forceUpdate: (e) => e.f || (e.f = () => Mn(e.update)),
    $nextTick: (e) => e.n || (e.n = Js.bind(e.proxy)),
    $watch: (e) => Sr.bind(e)
  })
), Jt = (e, t) => e !== U && !e.__isScriptSetup && M(e, t), Kr = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: i, props: r, accessCache: l, type: a, appContext: u } = e;
    let f;
    if (t[0] !== "$") {
      const w = l[t];
      if (w !== void 0)
        switch (w) {
          case 1:
            return s[t];
          case 2:
            return i[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (Jt(s, t))
          return l[t] = 1, s[t];
        if (i !== U && M(i, t))
          return l[t] = 2, i[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (f = e.propsOptions[0]) && M(f, t)
        )
          return l[t] = 3, r[t];
        if (n !== U && M(n, t))
          return l[t] = 4, n[t];
        an && (l[t] = 0);
      }
    }
    const h = rt[t];
    let E, C;
    if (h)
      return t === "$attrs" && te(e, "get", t), h(e);
    if (
      // css module (injected by vue-loader)
      (E = a.__cssModules) && (E = E[t])
    )
      return E;
    if (n !== U && M(n, t))
      return l[t] = 4, n[t];
    if (
      // global properties
      C = u.config.globalProperties, M(C, t)
    )
      return C[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: i, ctx: r } = e;
    return Jt(i, t) ? (i[t] = n, !0) : s !== U && M(s, t) ? (s[t] = n, !0) : M(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: i, propsOptions: r }
  }, l) {
    let a;
    return !!n[l] || e !== U && M(e, l) || Jt(t, l) || (a = r[0]) && M(a, l) || M(s, l) || M(rt, l) || M(i.config.globalProperties, l);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : M(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function cs(e) {
  return A(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let an = !0;
function Br(e) {
  const t = Fn(e), n = e.proxy, s = e.ctx;
  an = !1, t.beforeCreate && as(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: r,
    methods: l,
    watch: a,
    provide: u,
    inject: f,
    // lifecycle
    created: h,
    beforeMount: E,
    mounted: C,
    beforeUpdate: w,
    updated: j,
    activated: D,
    deactivated: B,
    beforeDestroy: G,
    beforeUnmount: q,
    destroyed: X,
    unmounted: I,
    render: Ce,
    renderTracked: Qe,
    renderTriggered: dt,
    errorCaptured: Ie,
    serverPrefetch: Bt,
    // public API
    expose: Pe,
    inheritAttrs: et,
    // assets
    components: mt,
    directives: ht,
    filters: Wt
  } = t;
  if (f && Wr(f, s, null), l)
    for (const H in l) {
      const k = l[H];
      S(k) && (s[H] = k.bind(n));
    }
  if (i) {
    const H = i.call(n, n);
    L(H) && (e.data = Sn(H));
  }
  if (an = !0, r)
    for (const H in r) {
      const k = r[H], De = S(k) ? k.bind(n, n) : S(k.get) ? k.get.bind(n, n) : ae, gt = !S(k) && S(k.set) ? k.set.bind(n) : ae, Me = _n({
        get: De,
        set: gt
      });
      Object.defineProperty(s, H, {
        enumerable: !0,
        configurable: !0,
        get: () => Me.value,
        set: (fe) => Me.value = fe
      });
    }
  if (a)
    for (const H in a)
      li(a[H], s, n, H);
  if (u) {
    const H = S(u) ? u.call(n) : u;
    Reflect.ownKeys(H).forEach((k) => {
      Zr(k, H[k]);
    });
  }
  h && as(h, e, "c");
  function J(H, k) {
    A(k) ? k.forEach((De) => H(De.bind(n))) : k && H(k.bind(n));
  }
  if (J(Nr, E), J(zn, C), J(zr, w), J(kr, j), J(Pr, D), J(Dr, B), J(jr, Ie), J(Lr, Qe), J(Hr, dt), J(Fr, q), J(kn, I), J(Ur, Bt), A(Pe))
    if (Pe.length) {
      const H = e.exposed || (e.exposed = {});
      Pe.forEach((k) => {
        Object.defineProperty(H, k, {
          get: () => n[k],
          set: (De) => n[k] = De
        });
      });
    } else
      e.exposed || (e.exposed = {});
  Ce && e.render === ae && (e.render = Ce), et != null && (e.inheritAttrs = et), mt && (e.components = mt), ht && (e.directives = ht);
}
function Wr(e, t, n = ae) {
  A(e) && (e = un(e));
  for (const s in e) {
    const i = e[s];
    let r;
    L(i) ? "default" in i ? r = Rt(
      i.from || s,
      i.default,
      !0
      /* treat default function as factory */
    ) : r = Rt(i.from || s) : r = Rt(i), Z(r) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (l) => r.value = l
    }) : t[s] = r;
  }
}
function as(e, t, n) {
  ue(
    A(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function li(e, t, n, s) {
  const i = s.includes(".") ? ii(n, s) : () => n[s];
  if (W(e)) {
    const r = t[e];
    S(r) && Zt(i, r);
  } else if (S(e))
    Zt(i, e.bind(n));
  else if (L(e))
    if (A(e))
      e.forEach((r) => li(r, t, n, s));
    else {
      const r = S(e.handler) ? e.handler.bind(n) : t[e.handler];
      S(r) && Zt(i, r, e);
    }
}
function Fn(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: i,
    optionsCache: r,
    config: { optionMergeStrategies: l }
  } = e.appContext, a = r.get(t);
  let u;
  return a ? u = a : !i.length && !n && !s ? u = t : (u = {}, i.length && i.forEach(
    (f) => Mt(u, f, l, !0)
  ), Mt(u, t, l)), L(t) && r.set(t, u), u;
}
function Mt(e, t, n, s = !1) {
  const { mixins: i, extends: r } = t;
  r && Mt(e, r, n, !0), i && i.forEach(
    (l) => Mt(e, l, n, !0)
  );
  for (const l in t)
    if (!(s && l === "expose")) {
      const a = $r[l] || n && n[l];
      e[l] = a ? a(e[l], t[l]) : t[l];
    }
  return e;
}
const $r = {
  data: us,
  props: fs,
  emits: fs,
  // objects
  methods: it,
  computed: it,
  // lifecycle
  beforeCreate: Q,
  created: Q,
  beforeMount: Q,
  mounted: Q,
  beforeUpdate: Q,
  updated: Q,
  beforeDestroy: Q,
  beforeUnmount: Q,
  destroyed: Q,
  unmounted: Q,
  activated: Q,
  deactivated: Q,
  errorCaptured: Q,
  serverPrefetch: Q,
  // assets
  components: it,
  directives: it,
  // watch
  watch: qr,
  // provide / inject
  provide: us,
  inject: Gr
};
function us(e, t) {
  return t ? e ? function() {
    return K(
      S(e) ? e.call(this, this) : e,
      S(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Gr(e, t) {
  return it(un(e), un(t));
}
function un(e) {
  if (A(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Q(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function it(e, t) {
  return e ? K(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function fs(e, t) {
  return e ? A(e) && A(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : K(
    /* @__PURE__ */ Object.create(null),
    cs(e),
    cs(t ?? {})
  ) : t;
}
function qr(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = K(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Q(e[s], t[s]);
  return n;
}
function ci() {
  return {
    app: null,
    config: {
      isNativeTag: xi,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Xr = 0;
function Yr(e, t) {
  return function(s, i = null) {
    S(s) || (s = K({}, s)), i != null && !L(i) && (i = null);
    const r = ci(), l = /* @__PURE__ */ new Set();
    let a = !1;
    const u = r.app = {
      _uid: Xr++,
      _component: s,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: wo,
      get config() {
        return r.config;
      },
      set config(f) {
      },
      use(f, ...h) {
        return l.has(f) || (f && S(f.install) ? (l.add(f), f.install(u, ...h)) : S(f) && (l.add(f), f(u, ...h))), u;
      },
      mixin(f) {
        return r.mixins.includes(f) || r.mixins.push(f), u;
      },
      component(f, h) {
        return h ? (r.components[f] = h, u) : r.components[f];
      },
      directive(f, h) {
        return h ? (r.directives[f] = h, u) : r.directives[f];
      },
      mount(f, h, E) {
        if (!a) {
          const C = we(
            s,
            i
          );
          return C.appContext = r, h && t ? t(C, f) : e(C, f, E), a = !0, u._container = f, f.__vue_app__ = u, jn(C.component) || C.component.proxy;
        }
      },
      unmount() {
        a && (e(null, u._container), delete u._container.__vue_app__);
      },
      provide(f, h) {
        return r.provides[f] = h, u;
      },
      runWithContext(f) {
        Nt = u;
        try {
          return f();
        } finally {
          Nt = null;
        }
      }
    };
    return u;
  };
}
let Nt = null;
function Zr(e, t) {
  if ($) {
    let n = $.provides;
    const s = $.parent && $.parent.provides;
    s === n && (n = $.provides = Object.create(s)), n[e] = t;
  }
}
function Rt(e, t, n = !1) {
  const s = $ || le;
  if (s || Nt) {
    const i = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : Nt._context.provides;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return n && S(t) ? t.call(s && s.proxy) : t;
  }
}
function Jr(e, t, n, s = !1) {
  const i = {}, r = {};
  It(r, Kt, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), ai(e, t, i, r);
  for (const l in e.propsOptions[0])
    l in i || (i[l] = void 0);
  n ? e.props = s ? i : cr(i) : e.type.props ? e.props = i : e.props = r, e.attrs = r;
}
function Qr(e, t, n, s) {
  const {
    props: i,
    attrs: r,
    vnode: { patchFlag: l }
  } = e, a = N(i), [u] = e.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || l > 0) && !(l & 16)
  ) {
    if (l & 8) {
      const h = e.vnode.dynamicProps;
      for (let E = 0; E < h.length; E++) {
        let C = h[E];
        if (Lt(e.emitsOptions, C))
          continue;
        const w = t[C];
        if (u)
          if (M(r, C))
            w !== r[C] && (r[C] = w, f = !0);
          else {
            const j = ve(C);
            i[j] = fn(
              u,
              a,
              j,
              w,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          w !== r[C] && (r[C] = w, f = !0);
      }
    }
  } else {
    ai(e, t, i, r) && (f = !0);
    let h;
    for (const E in a)
      (!t || // for camelCase
      !M(t, E) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((h = re(E)) === E || !M(t, h))) && (u ? n && // for camelCase
      (n[E] !== void 0 || // for kebab-case
      n[h] !== void 0) && (i[E] = fn(
        u,
        a,
        E,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete i[E]);
    if (r !== a)
      for (const E in r)
        (!t || !M(t, E)) && (delete r[E], f = !0);
  }
  f && Ee(e, "set", "$attrs");
}
function ai(e, t, n, s) {
  const [i, r] = e.propsOptions;
  let l = !1, a;
  if (t)
    for (let u in t) {
      if (Tt(u))
        continue;
      const f = t[u];
      let h;
      i && M(i, h = ve(u)) ? !r || !r.includes(h) ? n[h] = f : (a || (a = {}))[h] = f : Lt(e.emitsOptions, u) || (!(u in s) || f !== s[u]) && (s[u] = f, l = !0);
    }
  if (r) {
    const u = N(n), f = a || U;
    for (let h = 0; h < r.length; h++) {
      const E = r[h];
      n[E] = fn(
        i,
        u,
        E,
        f[E],
        e,
        !M(f, E)
      );
    }
  }
  return l;
}
function fn(e, t, n, s, i, r) {
  const l = e[n];
  if (l != null) {
    const a = M(l, "default");
    if (a && s === void 0) {
      const u = l.default;
      if (l.type !== Function && !l.skipFactory && S(u)) {
        const { propsDefaults: f } = i;
        n in f ? s = f[n] : (Ye(i), s = f[n] = u.call(
          null,
          t
        ), He());
      } else
        s = u;
    }
    l[
      0
      /* shouldCast */
    ] && (r && !a ? s = !1 : l[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === re(n)) && (s = !0));
  }
  return s;
}
function ui(e, t, n = !1) {
  const s = t.propsCache, i = s.get(e);
  if (i)
    return i;
  const r = e.props, l = {}, a = [];
  let u = !1;
  if (!S(e)) {
    const h = (E) => {
      u = !0;
      const [C, w] = ui(E, t, !0);
      K(l, C), w && a.push(...w);
    };
    !n && t.mixins.length && t.mixins.forEach(h), e.extends && h(e.extends), e.mixins && e.mixins.forEach(h);
  }
  if (!r && !u)
    return L(e) && s.set(e, Be), Be;
  if (A(r))
    for (let h = 0; h < r.length; h++) {
      const E = ve(r[h]);
      ps(E) && (l[E] = U);
    }
  else if (r)
    for (const h in r) {
      const E = ve(h);
      if (ps(E)) {
        const C = r[h], w = l[E] = A(C) || S(C) ? { type: C } : K({}, C);
        if (w) {
          const j = ms(Boolean, w.type), D = ms(String, w.type);
          w[
            0
            /* shouldCast */
          ] = j > -1, w[
            1
            /* shouldCastTrue */
          ] = D < 0 || j < D, (j > -1 || M(w, "default")) && a.push(E);
        }
      }
    }
  const f = [l, a];
  return L(e) && s.set(e, f), f;
}
function ps(e) {
  return e[0] !== "$";
}
function _s(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function ds(e, t) {
  return _s(e) === _s(t);
}
function ms(e, t) {
  return A(t) ? t.findIndex((n) => ds(n, e)) : S(t) && ds(t, e) ? 0 : -1;
}
const fi = (e) => e[0] === "_" || e === "$stable", Un = (e) => A(e) ? e.map(me) : [me(e)], eo = (e, t, n) => {
  if (t._n)
    return t;
  const s = Er((...i) => Un(t(...i)), n);
  return s._c = !1, s;
}, pi = (e, t, n) => {
  const s = e._ctx;
  for (const i in e) {
    if (fi(i))
      continue;
    const r = e[i];
    if (S(r))
      t[i] = eo(i, r, s);
    else if (r != null) {
      const l = Un(r);
      t[i] = () => l;
    }
  }
}, _i = (e, t) => {
  const n = Un(t);
  e.slots.default = () => n;
}, to = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = N(t), It(t, "_", n)) : pi(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && _i(e, t);
  It(e.slots, Kt, 1);
}, no = (e, t, n) => {
  const { vnode: s, slots: i } = e;
  let r = !0, l = U;
  if (s.shapeFlag & 32) {
    const a = t._;
    a ? n && a === 1 ? r = !1 : (K(i, t), !n && a === 1 && delete i._) : (r = !t.$stable, pi(t, i)), l = t;
  } else
    t && (_i(e, t), l = { default: 1 });
  if (r)
    for (const a in i)
      !fi(a) && !(a in l) && delete i[a];
};
function pn(e, t, n, s, i = !1) {
  if (A(e)) {
    e.forEach(
      (C, w) => pn(
        C,
        t && (A(t) ? t[w] : t),
        n,
        s,
        i
      )
    );
    return;
  }
  if (At(s) && !i)
    return;
  const r = s.shapeFlag & 4 ? jn(s.component) || s.component.proxy : s.el, l = i ? null : r, { i: a, r: u } = e, f = t && t.r, h = a.refs === U ? a.refs = {} : a.refs, E = a.setupState;
  if (f != null && f !== u && (W(f) ? (h[f] = null, M(E, f) && (E[f] = null)) : Z(f) && (f.value = null)), S(u))
    Re(u, a, 12, [l, h]);
  else {
    const C = W(u), w = Z(u);
    if (C || w) {
      const j = () => {
        if (e.f) {
          const D = C ? M(E, u) ? E[u] : h[u] : u.value;
          i ? A(D) && vn(D, r) : A(D) ? D.includes(r) || D.push(r) : C ? (h[u] = [r], M(E, u) && (E[u] = h[u])) : (u.value = [r], e.k && (h[e.k] = u.value));
        } else
          C ? (h[u] = l, M(E, u) && (E[u] = l)) : w && (u.value = l, e.k && (h[e.k] = l));
      };
      l ? (j.id = -1, ee(j, n)) : j();
    }
  }
}
const ee = Rr;
function so(e) {
  return io(e);
}
function io(e, t) {
  const n = tn();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: i,
    patchProp: r,
    createElement: l,
    createText: a,
    createComment: u,
    setText: f,
    setElementText: h,
    parentNode: E,
    nextSibling: C,
    setScopeId: w = ae,
    insertStaticContent: j
  } = e, D = (o, c, p, d = null, _ = null, b = null, x = !1, g = null, v = !!c.dynamicChildren) => {
    if (o === c)
      return;
    o && !nt(o, c) && (d = bt(o), fe(o, _, b, !0), o = null), c.patchFlag === -2 && (v = !1, c.dynamicChildren = null);
    const { type: m, ref: O, shapeFlag: y } = c;
    switch (m) {
      case Vt:
        B(o, c, p, d);
        break;
      case ft:
        G(o, c, p, d);
        break;
      case wt:
        o == null && q(c, p, d, x);
        break;
      case de:
        mt(
          o,
          c,
          p,
          d,
          _,
          b,
          x,
          g,
          v
        );
        break;
      default:
        y & 1 ? Ce(
          o,
          c,
          p,
          d,
          _,
          b,
          x,
          g,
          v
        ) : y & 6 ? ht(
          o,
          c,
          p,
          d,
          _,
          b,
          x,
          g,
          v
        ) : (y & 64 || y & 128) && m.process(
          o,
          c,
          p,
          d,
          _,
          b,
          x,
          g,
          v,
          Le
        );
    }
    O != null && _ && pn(O, o && o.ref, b, c || o, !c);
  }, B = (o, c, p, d) => {
    if (o == null)
      s(
        c.el = a(c.children),
        p,
        d
      );
    else {
      const _ = c.el = o.el;
      c.children !== o.children && f(_, c.children);
    }
  }, G = (o, c, p, d) => {
    o == null ? s(
      c.el = u(c.children || ""),
      p,
      d
    ) : c.el = o.el;
  }, q = (o, c, p, d) => {
    [o.el, o.anchor] = j(
      o.children,
      c,
      p,
      d,
      o.el,
      o.anchor
    );
  }, X = ({ el: o, anchor: c }, p, d) => {
    let _;
    for (; o && o !== c; )
      _ = C(o), s(o, p, d), o = _;
    s(c, p, d);
  }, I = ({ el: o, anchor: c }) => {
    let p;
    for (; o && o !== c; )
      p = C(o), i(o), o = p;
    i(c);
  }, Ce = (o, c, p, d, _, b, x, g, v) => {
    x = x || c.type === "svg", o == null ? Qe(
      c,
      p,
      d,
      _,
      b,
      x,
      g,
      v
    ) : Bt(
      o,
      c,
      _,
      b,
      x,
      g,
      v
    );
  }, Qe = (o, c, p, d, _, b, x, g) => {
    let v, m;
    const { type: O, props: y, shapeFlag: T, transition: R, dirs: P } = o;
    if (v = o.el = l(
      o.type,
      b,
      y && y.is,
      y
    ), T & 8 ? h(v, o.children) : T & 16 && Ie(
      o.children,
      v,
      null,
      d,
      _,
      b && O !== "foreignObject",
      x,
      g
    ), P && Ne(o, null, d, "created"), dt(v, o, o.scopeId, x, d), y) {
      for (const z in y)
        z !== "value" && !Tt(z) && r(
          v,
          z,
          null,
          y[z],
          b,
          o.children,
          d,
          _,
          ge
        );
      "value" in y && r(v, "value", null, y.value), (m = y.onVnodeBeforeMount) && _e(m, d, o);
    }
    P && Ne(o, null, d, "beforeMount");
    const F = (!_ || _ && !_.pendingBranch) && R && !R.persisted;
    F && R.beforeEnter(v), s(v, c, p), ((m = y && y.onVnodeMounted) || F || P) && ee(() => {
      m && _e(m, d, o), F && R.enter(v), P && Ne(o, null, d, "mounted");
    }, _);
  }, dt = (o, c, p, d, _) => {
    if (p && w(o, p), d)
      for (let b = 0; b < d.length; b++)
        w(o, d[b]);
    if (_) {
      let b = _.subTree;
      if (c === b) {
        const x = _.vnode;
        dt(
          o,
          x,
          x.scopeId,
          x.slotScopeIds,
          _.parent
        );
      }
    }
  }, Ie = (o, c, p, d, _, b, x, g, v = 0) => {
    for (let m = v; m < o.length; m++) {
      const O = o[m] = g ? Te(o[m]) : me(o[m]);
      D(
        null,
        O,
        c,
        p,
        d,
        _,
        b,
        x,
        g
      );
    }
  }, Bt = (o, c, p, d, _, b, x) => {
    const g = c.el = o.el;
    let { patchFlag: v, dynamicChildren: m, dirs: O } = c;
    v |= o.patchFlag & 16;
    const y = o.props || U, T = c.props || U;
    let R;
    p && ze(p, !1), (R = T.onVnodeBeforeUpdate) && _e(R, p, c, o), O && Ne(c, o, p, "beforeUpdate"), p && ze(p, !0);
    const P = _ && c.type !== "foreignObject";
    if (m ? Pe(
      o.dynamicChildren,
      m,
      g,
      p,
      d,
      P,
      b
    ) : x || k(
      o,
      c,
      g,
      null,
      p,
      d,
      P,
      b,
      !1
    ), v > 0) {
      if (v & 16)
        et(
          g,
          c,
          y,
          T,
          p,
          d,
          _
        );
      else if (v & 2 && y.class !== T.class && r(g, "class", null, T.class, _), v & 4 && r(g, "style", y.style, T.style, _), v & 8) {
        const F = c.dynamicProps;
        for (let z = 0; z < F.length; z++) {
          const V = F[z], se = y[V], je = T[V];
          (je !== se || V === "value") && r(
            g,
            V,
            se,
            je,
            _,
            o.children,
            p,
            d,
            ge
          );
        }
      }
      v & 1 && o.children !== c.children && h(g, c.children);
    } else
      !x && m == null && et(
        g,
        c,
        y,
        T,
        p,
        d,
        _
      );
    ((R = T.onVnodeUpdated) || O) && ee(() => {
      R && _e(R, p, c, o), O && Ne(c, o, p, "updated");
    }, d);
  }, Pe = (o, c, p, d, _, b, x) => {
    for (let g = 0; g < c.length; g++) {
      const v = o[g], m = c[g], O = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        v.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (v.type === de || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !nt(v, m) || // - In the case of a component, it could contain anything.
        v.shapeFlag & 70) ? E(v.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          p
        )
      );
      D(
        v,
        m,
        O,
        null,
        d,
        _,
        b,
        x,
        !0
      );
    }
  }, et = (o, c, p, d, _, b, x) => {
    if (p !== d) {
      if (p !== U)
        for (const g in p)
          !Tt(g) && !(g in d) && r(
            o,
            g,
            p[g],
            null,
            x,
            c.children,
            _,
            b,
            ge
          );
      for (const g in d) {
        if (Tt(g))
          continue;
        const v = d[g], m = p[g];
        v !== m && g !== "value" && r(
          o,
          g,
          m,
          v,
          x,
          c.children,
          _,
          b,
          ge
        );
      }
      "value" in d && r(o, "value", p.value, d.value);
    }
  }, mt = (o, c, p, d, _, b, x, g, v) => {
    const m = c.el = o ? o.el : a(""), O = c.anchor = o ? o.anchor : a("");
    let { patchFlag: y, dynamicChildren: T, slotScopeIds: R } = c;
    R && (g = g ? g.concat(R) : R), o == null ? (s(m, p, d), s(O, p, d), Ie(
      c.children,
      p,
      O,
      _,
      b,
      x,
      g,
      v
    )) : y > 0 && y & 64 && T && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    o.dynamicChildren ? (Pe(
      o.dynamicChildren,
      T,
      p,
      _,
      b,
      x,
      g
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (c.key != null || _ && c === _.subTree) && di(
      o,
      c,
      !0
      /* shallow */
    )) : k(
      o,
      c,
      p,
      O,
      _,
      b,
      x,
      g,
      v
    );
  }, ht = (o, c, p, d, _, b, x, g, v) => {
    c.slotScopeIds = g, o == null ? c.shapeFlag & 512 ? _.ctx.activate(
      c,
      p,
      d,
      x,
      v
    ) : Wt(
      c,
      p,
      d,
      _,
      b,
      x,
      v
    ) : Kn(o, c, v);
  }, Wt = (o, c, p, d, _, b, x) => {
    const g = o.component = vo(
      o,
      d,
      _
    );
    if (ri(o) && (g.ctx.renderer = Le), Eo(g), g.asyncDep) {
      if (_ && _.registerDep(g, J), !o.el) {
        const v = g.subTree = we(ft);
        G(null, v, c, p);
      }
      return;
    }
    J(
      g,
      o,
      c,
      p,
      _,
      b,
      x
    );
  }, Kn = (o, c, p) => {
    const d = c.component = o.component;
    if (Or(o, c, p))
      if (d.asyncDep && !d.asyncResolved) {
        H(d, c, p);
        return;
      } else
        d.next = c, gr(d.update), d.update();
    else
      c.el = o.el, d.vnode = c;
  }, J = (o, c, p, d, _, b, x) => {
    const g = () => {
      if (o.isMounted) {
        let { next: O, bu: y, u: T, parent: R, vnode: P } = o, F = O, z;
        ze(o, !1), O ? (O.el = P.el, H(o, O, x)) : O = P, y && Xt(y), (z = O.props && O.props.onVnodeBeforeUpdate) && _e(z, R, O, P), ze(o, !0);
        const V = Yt(o), se = o.subTree;
        o.subTree = V, D(
          se,
          V,
          // parent may have changed if it's in a teleport
          E(se.el),
          // anchor may have changed if it's in a fragment
          bt(se),
          o,
          _,
          b
        ), O.el = V.el, F === null && Tr(o, V.el), T && ee(T, _), (z = O.props && O.props.onVnodeUpdated) && ee(
          () => _e(z, R, O, P),
          _
        );
      } else {
        let O;
        const { el: y, props: T } = c, { bm: R, m: P, parent: F } = o, z = At(c);
        if (ze(o, !1), R && Xt(R), !z && (O = T && T.onVnodeBeforeMount) && _e(O, F, c), ze(o, !0), y && Gt) {
          const V = () => {
            o.subTree = Yt(o), Gt(
              y,
              o.subTree,
              o,
              _,
              null
            );
          };
          z ? c.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !o.isUnmounted && V()
          ) : V();
        } else {
          const V = o.subTree = Yt(o);
          D(
            null,
            V,
            p,
            d,
            o,
            _,
            b
          ), c.el = V.el;
        }
        if (P && ee(P, _), !z && (O = T && T.onVnodeMounted)) {
          const V = c;
          ee(
            () => _e(O, F, V),
            _
          );
        }
        (c.shapeFlag & 256 || F && At(F.vnode) && F.vnode.shapeFlag & 256) && o.a && ee(o.a, _), o.isMounted = !0, c = p = d = null;
      }
    }, v = o.effect = new Tn(
      g,
      () => Mn(m),
      o.scope
      // track it in component's effect scope
    ), m = o.update = () => v.run();
    m.id = o.uid, ze(o, !0), m();
  }, H = (o, c, p) => {
    c.component = o;
    const d = o.vnode.props;
    o.vnode = c, o.next = null, Qr(o, c.props, d, p), no(o, c.children, p), Ze(), os(), Je();
  }, k = (o, c, p, d, _, b, x, g, v = !1) => {
    const m = o && o.children, O = o ? o.shapeFlag : 0, y = c.children, { patchFlag: T, shapeFlag: R } = c;
    if (T > 0) {
      if (T & 128) {
        gt(
          m,
          y,
          p,
          d,
          _,
          b,
          x,
          g,
          v
        );
        return;
      } else if (T & 256) {
        De(
          m,
          y,
          p,
          d,
          _,
          b,
          x,
          g,
          v
        );
        return;
      }
    }
    R & 8 ? (O & 16 && ge(m, _, b), y !== m && h(p, y)) : O & 16 ? R & 16 ? gt(
      m,
      y,
      p,
      d,
      _,
      b,
      x,
      g,
      v
    ) : ge(m, _, b, !0) : (O & 8 && h(p, ""), R & 16 && Ie(
      y,
      p,
      d,
      _,
      b,
      x,
      g,
      v
    ));
  }, De = (o, c, p, d, _, b, x, g, v) => {
    o = o || Be, c = c || Be;
    const m = o.length, O = c.length, y = Math.min(m, O);
    let T;
    for (T = 0; T < y; T++) {
      const R = c[T] = v ? Te(c[T]) : me(c[T]);
      D(
        o[T],
        R,
        p,
        null,
        _,
        b,
        x,
        g,
        v
      );
    }
    m > O ? ge(
      o,
      _,
      b,
      !0,
      !1,
      y
    ) : Ie(
      c,
      p,
      d,
      _,
      b,
      x,
      g,
      v,
      y
    );
  }, gt = (o, c, p, d, _, b, x, g, v) => {
    let m = 0;
    const O = c.length;
    let y = o.length - 1, T = O - 1;
    for (; m <= y && m <= T; ) {
      const R = o[m], P = c[m] = v ? Te(c[m]) : me(c[m]);
      if (nt(R, P))
        D(
          R,
          P,
          p,
          null,
          _,
          b,
          x,
          g,
          v
        );
      else
        break;
      m++;
    }
    for (; m <= y && m <= T; ) {
      const R = o[y], P = c[T] = v ? Te(c[T]) : me(c[T]);
      if (nt(R, P))
        D(
          R,
          P,
          p,
          null,
          _,
          b,
          x,
          g,
          v
        );
      else
        break;
      y--, T--;
    }
    if (m > y) {
      if (m <= T) {
        const R = T + 1, P = R < O ? c[R].el : d;
        for (; m <= T; )
          D(
            null,
            c[m] = v ? Te(c[m]) : me(c[m]),
            p,
            P,
            _,
            b,
            x,
            g,
            v
          ), m++;
      }
    } else if (m > T)
      for (; m <= y; )
        fe(o[m], _, b, !0), m++;
    else {
      const R = m, P = m, F = /* @__PURE__ */ new Map();
      for (m = P; m <= T; m++) {
        const ne = c[m] = v ? Te(c[m]) : me(c[m]);
        ne.key != null && F.set(ne.key, m);
      }
      let z, V = 0;
      const se = T - P + 1;
      let je = !1, $n = 0;
      const tt = new Array(se);
      for (m = 0; m < se; m++)
        tt[m] = 0;
      for (m = R; m <= y; m++) {
        const ne = o[m];
        if (V >= se) {
          fe(ne, _, b, !0);
          continue;
        }
        let pe;
        if (ne.key != null)
          pe = F.get(ne.key);
        else
          for (z = P; z <= T; z++)
            if (tt[z - P] === 0 && nt(ne, c[z])) {
              pe = z;
              break;
            }
        pe === void 0 ? fe(ne, _, b, !0) : (tt[pe - P] = m + 1, pe >= $n ? $n = pe : je = !0, D(
          ne,
          c[pe],
          p,
          null,
          _,
          b,
          x,
          g,
          v
        ), V++);
      }
      const Gn = je ? ro(tt) : Be;
      for (z = Gn.length - 1, m = se - 1; m >= 0; m--) {
        const ne = P + m, pe = c[ne], qn = ne + 1 < O ? c[ne + 1].el : d;
        tt[m] === 0 ? D(
          null,
          pe,
          p,
          qn,
          _,
          b,
          x,
          g,
          v
        ) : je && (z < 0 || m !== Gn[z] ? Me(pe, p, qn, 2) : z--);
      }
    }
  }, Me = (o, c, p, d, _ = null) => {
    const { el: b, type: x, transition: g, children: v, shapeFlag: m } = o;
    if (m & 6) {
      Me(o.component.subTree, c, p, d);
      return;
    }
    if (m & 128) {
      o.suspense.move(c, p, d);
      return;
    }
    if (m & 64) {
      x.move(o, c, p, Le);
      return;
    }
    if (x === de) {
      s(b, c, p);
      for (let y = 0; y < v.length; y++)
        Me(v[y], c, p, d);
      s(o.anchor, c, p);
      return;
    }
    if (x === wt) {
      X(o, c, p);
      return;
    }
    if (d !== 2 && m & 1 && g)
      if (d === 0)
        g.beforeEnter(b), s(b, c, p), ee(() => g.enter(b), _);
      else {
        const { leave: y, delayLeave: T, afterLeave: R } = g, P = () => s(b, c, p), F = () => {
          y(b, () => {
            P(), R && R();
          });
        };
        T ? T(b, P, F) : F();
      }
    else
      s(b, c, p);
  }, fe = (o, c, p, d = !1, _ = !1) => {
    const {
      type: b,
      props: x,
      ref: g,
      children: v,
      dynamicChildren: m,
      shapeFlag: O,
      patchFlag: y,
      dirs: T
    } = o;
    if (g != null && pn(g, null, p, o, !0), O & 256) {
      c.ctx.deactivate(o);
      return;
    }
    const R = O & 1 && T, P = !At(o);
    let F;
    if (P && (F = x && x.onVnodeBeforeUnmount) && _e(F, c, o), O & 6)
      vi(o.component, p, d);
    else {
      if (O & 128) {
        o.suspense.unmount(p, d);
        return;
      }
      R && Ne(o, null, c, "beforeUnmount"), O & 64 ? o.type.remove(
        o,
        c,
        p,
        _,
        Le,
        d
      ) : m && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (b !== de || y > 0 && y & 64) ? ge(
        m,
        c,
        p,
        !1,
        !0
      ) : (b === de && y & 384 || !_ && O & 16) && ge(v, c, p), d && Bn(o);
    }
    (P && (F = x && x.onVnodeUnmounted) || R) && ee(() => {
      F && _e(F, c, o), R && Ne(o, null, c, "unmounted");
    }, p);
  }, Bn = (o) => {
    const { type: c, el: p, anchor: d, transition: _ } = o;
    if (c === de) {
      bi(p, d);
      return;
    }
    if (c === wt) {
      I(o);
      return;
    }
    const b = () => {
      i(p), _ && !_.persisted && _.afterLeave && _.afterLeave();
    };
    if (o.shapeFlag & 1 && _ && !_.persisted) {
      const { leave: x, delayLeave: g } = _, v = () => x(p, b);
      g ? g(o.el, b, v) : v();
    } else
      b();
  }, bi = (o, c) => {
    let p;
    for (; o !== c; )
      p = C(o), i(o), o = p;
    i(c);
  }, vi = (o, c, p) => {
    const { bum: d, scope: _, update: b, subTree: x, um: g } = o;
    d && Xt(d), _.stop(), b && (b.active = !1, fe(x, o, c, p)), g && ee(g, c), ee(() => {
      o.isUnmounted = !0;
    }, c), c && c.pendingBranch && !c.isUnmounted && o.asyncDep && !o.asyncResolved && o.suspenseId === c.pendingId && (c.deps--, c.deps === 0 && c.resolve());
  }, ge = (o, c, p, d = !1, _ = !1, b = 0) => {
    for (let x = b; x < o.length; x++)
      fe(o[x], c, p, d, _);
  }, bt = (o) => o.shapeFlag & 6 ? bt(o.component.subTree) : o.shapeFlag & 128 ? o.suspense.next() : C(o.anchor || o.el), Wn = (o, c, p) => {
    o == null ? c._vnode && fe(c._vnode, null, null, !0) : D(c._vnode || null, o, c, null, null, null, p), os(), ei(), c._vnode = o;
  }, Le = {
    p: D,
    um: fe,
    m: Me,
    r: Bn,
    mt: Wt,
    mc: Ie,
    pc: k,
    pbc: Pe,
    n: bt,
    o: e
  };
  let $t, Gt;
  return t && ([$t, Gt] = t(
    Le
  )), {
    render: Wn,
    hydrate: $t,
    createApp: Yr(Wn, $t)
  };
}
function ze({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function di(e, t, n = !1) {
  const s = e.children, i = t.children;
  if (A(s) && A(i))
    for (let r = 0; r < s.length; r++) {
      const l = s[r];
      let a = i[r];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[r] = Te(i[r]), a.el = l.el), n || di(l, a)), a.type === Vt && (a.el = l.el);
    }
}
function ro(e) {
  const t = e.slice(), n = [0];
  let s, i, r, l, a;
  const u = e.length;
  for (s = 0; s < u; s++) {
    const f = e[s];
    if (f !== 0) {
      if (i = n[n.length - 1], e[i] < f) {
        t[s] = i, n.push(s);
        continue;
      }
      for (r = 0, l = n.length - 1; r < l; )
        a = r + l >> 1, e[n[a]] < f ? r = a + 1 : l = a;
      f < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), n[r] = s);
    }
  }
  for (r = n.length, l = n[r - 1]; r-- > 0; )
    n[r] = l, l = t[l];
  return n;
}
const oo = (e) => e.__isTeleport, de = Symbol.for("v-fgt"), Vt = Symbol.for("v-txt"), ft = Symbol.for("v-cmt"), wt = Symbol.for("v-stc"), ot = [];
let ce = null;
function lo(e = !1) {
  ot.push(ce = e ? null : []);
}
function co() {
  ot.pop(), ce = ot[ot.length - 1] || null;
}
let pt = 1;
function hs(e) {
  pt += e;
}
function ao(e) {
  return e.dynamicChildren = pt > 0 ? ce || Be : null, co(), pt > 0 && ce && ce.push(e), e;
}
function uo(e, t, n, s, i, r) {
  return ao(
    xe(
      e,
      t,
      n,
      s,
      i,
      r,
      !0
      /* isBlock */
    )
  );
}
function fo(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function nt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Kt = "__vInternal", mi = ({ key: e }) => e ?? null, St = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? W(e) || Z(e) || S(e) ? { i: le, r: e, k: t, f: !!n } : e : null);
function xe(e, t = null, n = null, s = 0, i = null, r = e === de ? 0 : 1, l = !1, a = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && mi(t),
    ref: t && St(t),
    scopeId: si,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: s,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: le
  };
  return a ? (Hn(u, n), r & 128 && e.normalize(u)) : n && (u.shapeFlag |= W(n) ? 8 : 16), pt > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  ce && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && ce.push(u), u;
}
const we = po;
function po(e, t = null, n = null, s = 0, i = null, r = !1) {
  if ((!e || e === Vr) && (e = ft), fo(e)) {
    const a = Xe(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Hn(a, n), pt > 0 && !r && ce && (a.shapeFlag & 6 ? ce[ce.indexOf(e)] = a : ce.push(a)), a.patchFlag |= -2, a;
  }
  if (To(e) && (e = e.__vccOpts), t) {
    t = _o(t);
    let { class: a, style: u } = t;
    a && !W(a) && (t.class = Cn(a)), L(u) && ($s(u) && !A(u) && (u = K({}, u)), t.style = yn(u));
  }
  const l = W(e) ? 1 : Ar(e) ? 128 : oo(e) ? 64 : L(e) ? 4 : S(e) ? 2 : 0;
  return xe(
    e,
    t,
    n,
    s,
    i,
    l,
    r,
    !0
  );
}
function _o(e) {
  return e ? $s(e) || Kt in e ? K({}, e) : e : null;
}
function Xe(e, t, n = !1) {
  const { props: s, ref: i, patchFlag: r, children: l } = e, a = t ? ho(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && mi(a),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? A(i) ? i.concat(St(t)) : [i, St(t)] : St(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== de ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Xe(e.ssContent),
    ssFallback: e.ssFallback && Xe(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function mo(e = " ", t = 0) {
  return we(Vt, null, e, t);
}
function me(e) {
  return e == null || typeof e == "boolean" ? we(ft) : A(e) ? we(
    de,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Te(e) : we(Vt, null, String(e));
}
function Te(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Xe(e);
}
function Hn(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (A(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Hn(e, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = t._;
      !i && !(Kt in t) ? t._ctx = le : i === 3 && le && (le.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    S(t) ? (t = { default: t, _ctx: le }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [mo(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function ho(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const i in s)
      if (i === "class")
        t.class !== s.class && (t.class = Cn([t.class, s.class]));
      else if (i === "style")
        t.style = yn([t.style, s.style]);
      else if (zt(i)) {
        const r = t[i], l = s[i];
        l && r !== l && !(A(r) && r.includes(l)) && (t[i] = r ? [].concat(r, l) : l);
      } else
        i !== "" && (t[i] = s[i]);
  }
  return t;
}
function _e(e, t, n, s = null) {
  ue(e, t, 7, [
    n,
    s
  ]);
}
const go = ci();
let bo = 0;
function vo(e, t, n) {
  const s = e.type, i = (t ? t.appContext : e.appContext) || go, r = {
    uid: bo++,
    vnode: e,
    type: s,
    parent: t,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new Mi(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: ui(s, i),
    emitsOptions: ni(s, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: U,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: U,
    data: U,
    props: U,
    attrs: U,
    slots: U,
    refs: U,
    setupState: U,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = xr.bind(null, r), e.ce && e.ce(r), r;
}
let $ = null;
const xo = () => $ || le;
let Ln, Ve, gs = "__VUE_INSTANCE_SETTERS__";
(Ve = tn()[gs]) || (Ve = tn()[gs] = []), Ve.push((e) => $ = e), Ln = (e) => {
  Ve.length > 1 ? Ve.forEach((t) => t(e)) : Ve[0](e);
};
const Ye = (e) => {
  Ln(e), e.scope.on();
}, He = () => {
  $ && $.scope.off(), Ln(null);
};
function hi(e) {
  return e.vnode.shapeFlag & 4;
}
let _t = !1;
function Eo(e, t = !1) {
  _t = t;
  const { props: n, children: s } = e.vnode, i = hi(e);
  Jr(e, n, i, t), to(e, s);
  const r = i ? yo(e, t) : void 0;
  return _t = !1, r;
}
function yo(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Gs(new Proxy(e.ctx, Kr));
  const { setup: s } = n;
  if (s) {
    const i = e.setupContext = s.length > 1 ? Oo(e) : null;
    Ye(e), Ze();
    const r = Re(
      s,
      e,
      0,
      [e.props, i]
    );
    if (Je(), He(), Ss(r)) {
      if (r.then(He, He), t)
        return r.then((l) => {
          bs(e, l, t);
        }).catch((l) => {
          Ht(l, e, 0);
        });
      e.asyncDep = r;
    } else
      bs(e, r, t);
  } else
    gi(e, t);
}
function bs(e, t, n) {
  S(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : L(t) && (e.setupState = Ys(t)), gi(e, n);
}
let vs;
function gi(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && vs && !s.render) {
      const i = s.template || Fn(e).template;
      if (i) {
        const { isCustomElement: r, compilerOptions: l } = e.appContext.config, { delimiters: a, compilerOptions: u } = s, f = K(
          K(
            {
              isCustomElement: r,
              delimiters: a
            },
            l
          ),
          u
        );
        s.render = vs(i, f);
      }
    }
    e.render = s.render || ae;
  }
  Ye(e), Ze(), Br(e), Je(), He();
}
function Co(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, n) {
        return te(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function Oo(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Co(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function jn(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Ys(Gs(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in rt)
          return rt[n](e);
      },
      has(t, n) {
        return n in t || n in rt;
      }
    }));
}
function To(e) {
  return S(e) && "__vccOpts" in e;
}
const _n = (e, t) => dr(e, t, _t), Ao = Symbol.for("v-scx"), Ro = () => Rt(Ao), wo = "3.3.4", So = "http://www.w3.org/2000/svg", Fe = typeof document < "u" ? document : null, xs = Fe && /* @__PURE__ */ Fe.createElement("template"), Io = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const i = t ? Fe.createElementNS(So, e) : Fe.createElement(e, n ? { is: n } : void 0);
    return e === "select" && s && s.multiple != null && i.setAttribute("multiple", s.multiple), i;
  },
  createText: (e) => Fe.createTextNode(e),
  createComment: (e) => Fe.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Fe.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, i, r) {
    const l = n ? n.previousSibling : t.lastChild;
    if (i && (i === r || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), n), !(i === r || !(i = i.nextSibling)); )
        ;
    else {
      xs.innerHTML = s ? `<svg>${e}</svg>` : e;
      const a = xs.content;
      if (s) {
        const u = a.firstChild;
        for (; u.firstChild; )
          a.appendChild(u.firstChild);
        a.removeChild(u);
      }
      t.insertBefore(a, n);
    }
    return [
      // first
      l ? l.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
};
function Po(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function Do(e, t, n) {
  const s = e.style, i = W(n);
  if (n && !i) {
    if (t && !W(t))
      for (const r in t)
        n[r] == null && dn(s, r, "");
    for (const r in n)
      dn(s, r, n[r]);
  } else {
    const r = s.display;
    i ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (s.display = r);
  }
}
const Es = /\s*!important$/;
function dn(e, t, n) {
  if (A(n))
    n.forEach((s) => dn(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = Mo(e, t);
    Es.test(n) ? e.setProperty(
      re(s),
      n.replace(Es, ""),
      "important"
    ) : e[s] = n;
  }
}
const ys = ["Webkit", "Moz", "ms"], Qt = {};
function Mo(e, t) {
  const n = Qt[t];
  if (n)
    return n;
  let s = ve(t);
  if (s !== "filter" && s in e)
    return Qt[t] = s;
  s = Ds(s);
  for (let i = 0; i < ys.length; i++) {
    const r = ys[i] + s;
    if (r in e)
      return Qt[t] = r;
  }
  return t;
}
const Cs = "http://www.w3.org/1999/xlink";
function No(e, t, n, s, i) {
  if (s && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(Cs, t.slice(6, t.length)) : e.setAttributeNS(Cs, t, n);
  else {
    const r = Di(t);
    n == null || r && !Ms(n) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : n);
  }
}
function zo(e, t, n, s, i, r, l) {
  if (t === "innerHTML" || t === "textContent") {
    s && l(s, i, r), e[t] = n ?? "";
    return;
  }
  const a = e.tagName;
  if (t === "value" && a !== "PROGRESS" && // custom elements may use _value internally
  !a.includes("-")) {
    e._value = n;
    const f = a === "OPTION" ? e.getAttribute("value") : e.value, h = n ?? "";
    f !== h && (e.value = h), n == null && e.removeAttribute(t);
    return;
  }
  let u = !1;
  if (n === "" || n == null) {
    const f = typeof e[t];
    f === "boolean" ? n = Ms(n) : n == null && f === "string" ? (n = "", u = !0) : f === "number" && (n = 0, u = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  u && e.removeAttribute(t);
}
function ko(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Fo(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function Uo(e, t, n, s, i = null) {
  const r = e._vei || (e._vei = {}), l = r[t];
  if (s && l)
    l.value = s;
  else {
    const [a, u] = Ho(t);
    if (s) {
      const f = r[t] = Vo(s, i);
      ko(e, a, f, u);
    } else
      l && (Fo(e, a, l, u), r[t] = void 0);
  }
}
const Os = /(?:Once|Passive|Capture)$/;
function Ho(e) {
  let t;
  if (Os.test(e)) {
    t = {};
    let s;
    for (; s = e.match(Os); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : re(e.slice(2)), t];
}
let en = 0;
const Lo = /* @__PURE__ */ Promise.resolve(), jo = () => en || (Lo.then(() => en = 0), en = Date.now());
function Vo(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    ue(
      Ko(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = jo(), n;
}
function Ko(e, t) {
  if (A(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((s) => (i) => !i._stopped && s && s(i));
  } else
    return t;
}
const Ts = /^on[a-z]/, Bo = (e, t, n, s, i = !1, r, l, a, u) => {
  t === "class" ? Po(e, s, i) : t === "style" ? Do(e, n, s) : zt(t) ? bn(t) || Uo(e, t, n, s, l) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Wo(e, t, s, i)) ? zo(
    e,
    t,
    s,
    r,
    l,
    a,
    u
  ) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), No(e, t, s, i));
};
function Wo(e, t, n, s) {
  return s ? !!(t === "innerHTML" || t === "textContent" || t in e && Ts.test(t) && S(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || Ts.test(t) && W(n) ? !1 : t in e;
}
function $o(e, t) {
  const n = Ir(e);
  class s extends Vn {
    constructor(r) {
      super(n, r, t);
    }
  }
  return s.def = n, s;
}
const Go = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Vn extends Go {
  constructor(t, n = {}, s) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && s ? s(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, Js(() => {
      this._connected || (Rs(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let s = 0; s < this.attributes.length; s++)
      this._setAttr(this.attributes[s].name);
    new MutationObserver((s) => {
      for (const i of s)
        this._setAttr(i.attributeName);
    }).observe(this, { attributes: !0 });
    const t = (s, i = !1) => {
      const { props: r, styles: l } = s;
      let a;
      if (r && !A(r))
        for (const u in r) {
          const f = r[u];
          (f === Number || f && f.type === Number) && (u in this._props && (this._props[u] = Xn(this._props[u])), (a || (a = /* @__PURE__ */ Object.create(null)))[ve(u)] = !0);
        }
      this._numberProps = a, i && this._resolveProps(s), this._applyStyles(l), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((s) => t(s, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, s = A(n) ? n : Object.keys(n || {});
    for (const i of Object.keys(this))
      i[0] !== "_" && s.includes(i) && this._setProp(i, this[i], !0, !1);
    for (const i of s.map(ve))
      Object.defineProperty(this, i, {
        get() {
          return this._getProp(i);
        },
        set(r) {
          this._setProp(i, r);
        }
      });
  }
  _setAttr(t) {
    let n = this.getAttribute(t);
    const s = ve(t);
    this._numberProps && this._numberProps[s] && (n = Xn(n)), this._setProp(s, n, !1);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, n, s = !0, i = !0) {
    n !== this._props[t] && (this._props[t] = n, i && this._instance && this._update(), s && (n === !0 ? this.setAttribute(re(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(re(t), n + "") : n || this.removeAttribute(re(t))));
  }
  _update() {
    Rs(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = we(this._def, K({}, this._props));
    return this._instance || (t.ce = (n) => {
      this._instance = n, n.isCE = !0;
      const s = (r, l) => {
        this.dispatchEvent(
          new CustomEvent(r, {
            detail: l
          })
        );
      };
      n.emit = (r, ...l) => {
        s(r, l), re(r) !== r && s(re(r), l);
      };
      let i = this;
      for (; i = i && (i.parentNode || i.host); )
        if (i instanceof Vn) {
          n.parent = i._instance, n.provides = i._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((n) => {
      const s = document.createElement("style");
      s.textContent = n, this.shadowRoot.appendChild(s);
    });
  }
}
function qo(e) {
  const t = xo();
  if (!t)
    return;
  const n = t.ut = (i = e(t.proxy)) => {
    Array.from(
      document.querySelectorAll(`[data-v-owner="${t.uid}"]`)
    ).forEach((r) => hn(r, i));
  }, s = () => {
    const i = e(t.proxy);
    mn(t.subTree, i), n(i);
  };
  wr(s), zn(() => {
    const i = new MutationObserver(s);
    i.observe(t.subTree.el.parentNode, { childList: !0 }), kn(() => i.disconnect());
  });
}
function mn(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
      mn(n.activeBranch, t);
    });
  }
  for (; e.component; )
    e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el)
    hn(e.el, t);
  else if (e.type === de)
    e.children.forEach((n) => mn(n, t));
  else if (e.type === wt) {
    let { el: n, anchor: s } = e;
    for (; n && (hn(n, t), n !== s); )
      n = n.nextSibling;
  }
}
function hn(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    for (const s in t)
      n.setProperty(`--${s}`, t[s]);
  }
}
const Xo = /* @__PURE__ */ K({ patchProp: Bo }, Io);
let As;
function Yo() {
  return As || (As = so(Xo));
}
const Rs = (...e) => {
  Yo().render(...e);
};
const Zo = `.display{margin:0;color:#fff;background-color:#7fffd4;height:100%;width:100%;min-height:20vh;background:no-repeat center center fixed;background-image:var(--5169e56a);-webkit-background-size:cover;-moz-background-size:cover;-o-background-size:cover;background-size:cover;font-family:Gill Sans,Gill Sans MT,Calibri,Trebuchet MS,sans-serif}.row{display:flex;flex-wrap:wrap}.column{flex:25%;margin:5px;align-content:end}.middle{text-align:center}.end{text-align:right}
`, Jo = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, i] of t)
    n[s] = i;
  return n;
}, Qo = { class: "row" }, el = { class: "column start" }, tl = /* @__PURE__ */ xe("div", { class: "column middle" }, "Dimarts 15", -1), nl = /* @__PURE__ */ xe("div", { class: "column end" }, "Sala Gran", -1), sl = /* @__PURE__ */ xe("div", { class: "row" }, [
  /* @__PURE__ */ xe("div", { class: "column" }, [
    /* @__PURE__ */ xe("h1", null, " Maya Nui a l'Auditori de Girona")
  ])
], -1), il = " url('http://localhost:3000/music.jpg')", rl = {
  __name: "ByMazzeoAdManager.ce",
  setup(e) {
    qo((l) => ({
      "5169e56a": il
    }));
    const t = rs(null), n = rs(null);
    zn(() => {
      window.addEventListener("resize", s), t.value = n.value.getBoundingClientRect();
    });
    const s = () => {
      t.value = n.value.getBoundingClientRect();
    }, i = _n(() => t.value ? parseInt(t.value.width) : 0), r = _n(() => t.value ? parseInt(t.value.height) : 0);
    return (l, a) => (lo(), uo("div", {
      ref_key: "display",
      ref: n,
      class: "display"
    }, [
      xe("div", Qo, [
        xe("div", el, Zn(i.value) + " " + Zn(r.value), 1),
        tl,
        nl
      ]),
      sl
    ], 512));
  }
}, ol = /* @__PURE__ */ Jo(rl, [["styles", [Zo]]]);
customElements.define(
  "by-mazzeo-ads",
  $o(ol)
);
