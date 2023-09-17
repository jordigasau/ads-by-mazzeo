function hn(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let o = 0; o < s.length; o++)
    n[s[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
const H = {}, We = [], ue = () => {
}, ho = () => !1, go = /^on[^a-z]/, Nt = (e) => go.test(e), gn = (e) => e.startsWith("onUpdate:"), B = Object.assign, bn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, bo = Object.prototype.hasOwnProperty, D = (e, t) => bo.call(e, t), A = Array.isArray, ot = (e) => Ut(e) === "[object Map]", Eo = (e) => Ut(e) === "[object Set]", S = (e) => typeof e == "function", G = (e) => typeof e == "string", En = (e) => typeof e == "symbol", V = (e) => e !== null && typeof e == "object", zs = (e) => V(e) && S(e.then) && S(e.catch), xo = Object.prototype.toString, Ut = (e) => xo.call(e), yo = (e) => Ut(e).slice(8, -1), Co = (e) => Ut(e) === "[object Object]", xn = (e) => G(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Tt = /* @__PURE__ */ hn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Ft = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Oo = /-(\w)/g, Ee = Ft((e) => e.replace(Oo, (t, n) => n ? n.toUpperCase() : "")), zo = /\B([A-Z])/g, re = Ft(
  (e) => e.replace(zo, "-$1").toLowerCase()
), Ts = Ft(
  (e) => e.charAt(0).toUpperCase() + e.slice(1)
), qt = Ft(
  (e) => e ? `on${Ts(e)}` : ""
), lt = (e, t) => !Object.is(e, t), Rt = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, It = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, nn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Gn = (e) => {
  const t = G(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let $n;
const sn = () => $n || ($n = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function yn(e) {
  if (A(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], o = G(s) ? vo(s) : yn(s);
      if (o)
        for (const r in o)
          t[r] = o[r];
    }
    return t;
  } else {
    if (G(e))
      return e;
    if (V(e))
      return e;
  }
}
const To = /;(?![^(]*\))/g, Ro = /:([^]+)/, Ao = /\/\*[^]*?\*\//g;
function vo(e) {
  const t = {};
  return e.replace(Ao, "").split(To).forEach((n) => {
    if (n) {
      const s = n.split(Ro);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Cn(e) {
  let t = "";
  if (G(e))
    t = e;
  else if (A(e))
    for (let n = 0; n < e.length; n++) {
      const s = Cn(e[n]);
      s && (t += s + " ");
    }
  else if (V(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const So = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Io = /* @__PURE__ */ hn(So);
function Rs(e) {
  return !!e || e === "";
}
let oe;
class wo {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = oe, !t && oe && (this.index = (oe.scopes || (oe.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = oe;
      try {
        return oe = this, t();
      } finally {
        oe = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    oe = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    oe = this.parent;
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
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Po(e, t = oe) {
  t && t.active && t.effects.push(e);
}
function Do() {
  return oe;
}
const On = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, As = (e) => (e.w & ve) > 0, vs = (e) => (e.n & ve) > 0, Mo = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= ve;
}, No = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const o = t[s];
      As(o) && !vs(o) ? o.delete(e) : t[n++] = o, o.w &= ~ve, o.n &= ~ve;
    }
    t.length = n;
  }
}, on = /* @__PURE__ */ new WeakMap();
let nt = 0, ve = 1;
const rn = 30;
let ie;
const He = Symbol(""), ln = Symbol("");
class zn {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Po(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = ie, n = Te;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = ie, ie = this, Te = !0, ve = 1 << ++nt, nt <= rn ? Mo(this) : Xn(this), this.fn();
    } finally {
      nt <= rn && No(this), ve = 1 << --nt, ie = this.parent, Te = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    ie === this ? this.deferStop = !0 : this.active && (Xn(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Xn(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let Te = !0;
const Ss = [];
function Ze() {
  Ss.push(Te), Te = !1;
}
function Je() {
  const e = Ss.pop();
  Te = e === void 0 ? !0 : e;
}
function te(e, t, n) {
  if (Te && ie) {
    let s = on.get(e);
    s || on.set(e, s = /* @__PURE__ */ new Map());
    let o = s.get(n);
    o || s.set(n, o = On()), Is(o);
  }
}
function Is(e, t) {
  let n = !1;
  nt <= rn ? vs(e) || (e.n |= ve, n = !As(e)) : n = !e.has(ie), n && (e.add(ie), ie.deps.push(e));
}
function xe(e, t, n, s, o, r) {
  const i = on.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (n === "length" && A(e)) {
    const f = Number(s);
    i.forEach((a, h) => {
      (h === "length" || h >= f) && c.push(a);
    });
  } else
    switch (n !== void 0 && c.push(i.get(n)), t) {
      case "add":
        A(e) ? xn(n) && c.push(i.get("length")) : (c.push(i.get(He)), ot(e) && c.push(i.get(ln)));
        break;
      case "delete":
        A(e) || (c.push(i.get(He)), ot(e) && c.push(i.get(ln)));
        break;
      case "set":
        ot(e) && c.push(i.get(He));
        break;
    }
  if (c.length === 1)
    c[0] && cn(c[0]);
  else {
    const f = [];
    for (const a of c)
      a && f.push(...a);
    cn(On(f));
  }
}
function cn(e, t) {
  const n = A(e) ? e : [...e];
  for (const s of n)
    s.computed && kn(s);
  for (const s of n)
    s.computed || kn(s);
}
function kn(e, t) {
  (e !== ie || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Uo = /* @__PURE__ */ hn("__proto__,__v_isRef,__isVue"), ws = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(En)
), Fo = /* @__PURE__ */ Tn(), Ho = /* @__PURE__ */ Tn(!1, !0), Lo = /* @__PURE__ */ Tn(!0), qn = /* @__PURE__ */ jo();
function jo() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = M(this);
      for (let r = 0, i = this.length; r < i; r++)
        te(s, "get", r + "");
      const o = s[t](...n);
      return o === -1 || o === !1 ? s[t](...n.map(M)) : o;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Ze();
      const s = M(this)[t].apply(this, n);
      return Je(), s;
    };
  }), e;
}
function Ko(e) {
  const t = M(this);
  return te(t, "has", e), t.hasOwnProperty(e);
}
function Tn(e = !1, t = !1) {
  return function(s, o, r) {
    if (o === "__v_isReactive")
      return !e;
    if (o === "__v_isReadonly")
      return e;
    if (o === "__v_isShallow")
      return t;
    if (o === "__v_raw" && r === (e ? t ? sr : Us : t ? Ns : Ms).get(s))
      return s;
    const i = A(s);
    if (!e) {
      if (i && D(qn, o))
        return Reflect.get(qn, o, r);
      if (o === "hasOwnProperty")
        return Ko;
    }
    const c = Reflect.get(s, o, r);
    return (En(o) ? ws.has(o) : Uo(o)) || (e || te(s, "get", o), t) ? c : J(c) ? i && xn(o) ? c : c.value : V(c) ? e ? Fs(c) : vn(c) : c;
  };
}
const Vo = /* @__PURE__ */ Ps(), Bo = /* @__PURE__ */ Ps(!0);
function Ps(e = !1) {
  return function(n, s, o, r) {
    let i = n[s];
    if (Xe(i) && J(i) && !J(o))
      return !1;
    if (!e && (!wt(o) && !Xe(o) && (i = M(i), o = M(o)), !A(n) && J(i) && !J(o)))
      return i.value = o, !0;
    const c = A(n) && xn(s) ? Number(s) < n.length : D(n, s), f = Reflect.set(n, s, o, r);
    return n === M(r) && (c ? lt(o, i) && xe(n, "set", s, o) : xe(n, "add", s, o)), f;
  };
}
function Wo(e, t) {
  const n = D(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && xe(e, "delete", t, void 0), s;
}
function Go(e, t) {
  const n = Reflect.has(e, t);
  return (!En(t) || !ws.has(t)) && te(e, "has", t), n;
}
function $o(e) {
  return te(e, "iterate", A(e) ? "length" : He), Reflect.ownKeys(e);
}
const Ds = {
  get: Fo,
  set: Vo,
  deleteProperty: Wo,
  has: Go,
  ownKeys: $o
}, Xo = {
  get: Lo,
  set(e, t) {
    return !0;
  },
  deleteProperty(e, t) {
    return !0;
  }
}, ko = /* @__PURE__ */ B(
  {},
  Ds,
  {
    get: Ho,
    set: Bo
  }
), Rn = (e) => e, Ht = (e) => Reflect.getPrototypeOf(e);
function Et(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const o = M(e), r = M(t);
  n || (t !== r && te(o, "get", t), te(o, "get", r));
  const { has: i } = Ht(o), c = s ? Rn : n ? In : ct;
  if (i.call(o, t))
    return c(e.get(t));
  if (i.call(o, r))
    return c(e.get(r));
  e !== o && e.get(t);
}
function xt(e, t = !1) {
  const n = this.__v_raw, s = M(n), o = M(e);
  return t || (e !== o && te(s, "has", e), te(s, "has", o)), e === o ? n.has(e) : n.has(e) || n.has(o);
}
function yt(e, t = !1) {
  return e = e.__v_raw, !t && te(M(e), "iterate", He), Reflect.get(e, "size", e);
}
function Zn(e) {
  e = M(e);
  const t = M(this);
  return Ht(t).has.call(t, e) || (t.add(e), xe(t, "add", e, e)), this;
}
function Jn(e, t) {
  t = M(t);
  const n = M(this), { has: s, get: o } = Ht(n);
  let r = s.call(n, e);
  r || (e = M(e), r = s.call(n, e));
  const i = o.call(n, e);
  return n.set(e, t), r ? lt(t, i) && xe(n, "set", e, t) : xe(n, "add", e, t), this;
}
function Yn(e) {
  const t = M(this), { has: n, get: s } = Ht(t);
  let o = n.call(t, e);
  o || (e = M(e), o = n.call(t, e)), s && s.call(t, e);
  const r = t.delete(e);
  return o && xe(t, "delete", e, void 0), r;
}
function Qn() {
  const e = M(this), t = e.size !== 0, n = e.clear();
  return t && xe(e, "clear", void 0, void 0), n;
}
function Ct(e, t) {
  return function(s, o) {
    const r = this, i = r.__v_raw, c = M(i), f = t ? Rn : e ? In : ct;
    return !e && te(c, "iterate", He), i.forEach((a, h) => s.call(o, f(a), f(h), r));
  };
}
function Ot(e, t, n) {
  return function(...s) {
    const o = this.__v_raw, r = M(o), i = ot(r), c = e === "entries" || e === Symbol.iterator && i, f = e === "keys" && i, a = o[e](...s), h = n ? Rn : t ? In : ct;
    return !t && te(
      r,
      "iterate",
      f ? ln : He
    ), {
      // iterator protocol
      next() {
        const { value: y, done: O } = a.next();
        return O ? { value: y, done: O } : {
          value: c ? [h(y[0]), h(y[1])] : h(y),
          done: O
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
function qo() {
  const e = {
    get(r) {
      return Et(this, r);
    },
    get size() {
      return yt(this);
    },
    has: xt,
    add: Zn,
    set: Jn,
    delete: Yn,
    clear: Qn,
    forEach: Ct(!1, !1)
  }, t = {
    get(r) {
      return Et(this, r, !1, !0);
    },
    get size() {
      return yt(this);
    },
    has: xt,
    add: Zn,
    set: Jn,
    delete: Yn,
    clear: Qn,
    forEach: Ct(!1, !0)
  }, n = {
    get(r) {
      return Et(this, r, !0);
    },
    get size() {
      return yt(this, !0);
    },
    has(r) {
      return xt.call(this, r, !0);
    },
    add: Oe("add"),
    set: Oe("set"),
    delete: Oe("delete"),
    clear: Oe("clear"),
    forEach: Ct(!0, !1)
  }, s = {
    get(r) {
      return Et(this, r, !0, !0);
    },
    get size() {
      return yt(this, !0);
    },
    has(r) {
      return xt.call(this, r, !0);
    },
    add: Oe("add"),
    set: Oe("set"),
    delete: Oe("delete"),
    clear: Oe("clear"),
    forEach: Ct(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
    e[r] = Ot(
      r,
      !1,
      !1
    ), n[r] = Ot(
      r,
      !0,
      !1
    ), t[r] = Ot(
      r,
      !1,
      !0
    ), s[r] = Ot(
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
  Zo,
  Jo,
  Yo,
  Qo
] = /* @__PURE__ */ qo();
function An(e, t) {
  const n = t ? e ? Qo : Yo : e ? Jo : Zo;
  return (s, o, r) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? s : Reflect.get(
    D(n, o) && o in s ? n : s,
    o,
    r
  );
}
const er = {
  get: /* @__PURE__ */ An(!1, !1)
}, tr = {
  get: /* @__PURE__ */ An(!1, !0)
}, nr = {
  get: /* @__PURE__ */ An(!0, !1)
}, Ms = /* @__PURE__ */ new WeakMap(), Ns = /* @__PURE__ */ new WeakMap(), Us = /* @__PURE__ */ new WeakMap(), sr = /* @__PURE__ */ new WeakMap();
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
function rr(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : or(yo(e));
}
function vn(e) {
  return Xe(e) ? e : Sn(
    e,
    !1,
    Ds,
    er,
    Ms
  );
}
function ir(e) {
  return Sn(
    e,
    !1,
    ko,
    tr,
    Ns
  );
}
function Fs(e) {
  return Sn(
    e,
    !0,
    Xo,
    nr,
    Us
  );
}
function Sn(e, t, n, s, o) {
  if (!V(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = o.get(e);
  if (r)
    return r;
  const i = rr(e);
  if (i === 0)
    return e;
  const c = new Proxy(
    e,
    i === 2 ? s : n
  );
  return o.set(e, c), c;
}
function Ge(e) {
  return Xe(e) ? Ge(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Xe(e) {
  return !!(e && e.__v_isReadonly);
}
function wt(e) {
  return !!(e && e.__v_isShallow);
}
function Hs(e) {
  return Ge(e) || Xe(e);
}
function M(e) {
  const t = e && e.__v_raw;
  return t ? M(t) : e;
}
function Ls(e) {
  return It(e, "__v_skip", !0), e;
}
const ct = (e) => V(e) ? vn(e) : e, In = (e) => V(e) ? Fs(e) : e;
function js(e) {
  Te && ie && (e = M(e), Is(e.dep || (e.dep = On())));
}
function Ks(e, t) {
  e = M(e);
  const n = e.dep;
  n && cn(n);
}
function J(e) {
  return !!(e && e.__v_isRef === !0);
}
function lr(e) {
  return cr(e, !1);
}
function cr(e, t) {
  return J(e) ? e : new ur(e, t);
}
class ur {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : M(t), this._value = n ? t : ct(t);
  }
  get value() {
    return js(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || wt(t) || Xe(t);
    t = n ? t : M(t), lt(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : ct(t), Ks(this));
  }
}
function fr(e) {
  return J(e) ? e.value : e;
}
const ar = {
  get: (e, t, n) => fr(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const o = e[t];
    return J(o) && !J(n) ? (o.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Vs(e) {
  return Ge(e) ? e : new Proxy(e, ar);
}
class dr {
  constructor(t, n, s, o) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new zn(t, () => {
      this._dirty || (this._dirty = !0, Ks(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = s;
  }
  get value() {
    const t = M(this);
    return js(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function pr(e, t, n = !1) {
  let s, o;
  const r = S(e);
  return r ? (s = e, o = ue) : (s = e.get, o = e.set), new dr(s, o, r || !o, n);
}
function Re(e, t, n, s) {
  let o;
  try {
    o = s ? e(...s) : e();
  } catch (r) {
    Lt(r, t, n);
  }
  return o;
}
function fe(e, t, n, s) {
  if (S(e)) {
    const r = Re(e, t, n, s);
    return r && zs(r) && r.catch((i) => {
      Lt(i, t, n);
    }), r;
  }
  const o = [];
  for (let r = 0; r < e.length; r++)
    o.push(fe(e[r], t, n, s));
  return o;
}
function Lt(e, t, n, s = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let r = t.parent;
    const i = t.proxy, c = n;
    for (; r; ) {
      const a = r.ec;
      if (a) {
        for (let h = 0; h < a.length; h++)
          if (a[h](e, i, c) === !1)
            return;
      }
      r = r.parent;
    }
    const f = t.appContext.config.errorHandler;
    if (f) {
      Re(
        f,
        null,
        10,
        [e, i, c]
      );
      return;
    }
  }
  mr(e, n, o, s);
}
function mr(e, t, n, s = !0) {
  console.error(e);
}
let ut = !1, un = !1;
const q = [];
let _e = 0;
const $e = [];
let ge = null, Ne = 0;
const Bs = /* @__PURE__ */ Promise.resolve();
let wn = null;
function Ws(e) {
  const t = wn || Bs;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function _r(e) {
  let t = _e + 1, n = q.length;
  for (; t < n; ) {
    const s = t + n >>> 1;
    ft(q[s]) < e ? t = s + 1 : n = s;
  }
  return t;
}
function Pn(e) {
  (!q.length || !q.includes(
    e,
    ut && e.allowRecurse ? _e + 1 : _e
  )) && (e.id == null ? q.push(e) : q.splice(_r(e.id), 0, e), Gs());
}
function Gs() {
  !ut && !un && (un = !0, wn = Bs.then(Xs));
}
function hr(e) {
  const t = q.indexOf(e);
  t > _e && q.splice(t, 1);
}
function gr(e) {
  A(e) ? $e.push(...e) : (!ge || !ge.includes(
    e,
    e.allowRecurse ? Ne + 1 : Ne
  )) && $e.push(e), Gs();
}
function es(e, t = ut ? _e + 1 : 0) {
  for (; t < q.length; t++) {
    const n = q[t];
    n && n.pre && (q.splice(t, 1), t--, n());
  }
}
function $s(e) {
  if ($e.length) {
    const t = [...new Set($e)];
    if ($e.length = 0, ge) {
      ge.push(...t);
      return;
    }
    for (ge = t, ge.sort((n, s) => ft(n) - ft(s)), Ne = 0; Ne < ge.length; Ne++)
      ge[Ne]();
    ge = null, Ne = 0;
  }
}
const ft = (e) => e.id == null ? 1 / 0 : e.id, br = (e, t) => {
  const n = ft(e) - ft(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function Xs(e) {
  un = !1, ut = !0, q.sort(br);
  const t = ue;
  try {
    for (_e = 0; _e < q.length; _e++) {
      const n = q[_e];
      n && n.active !== !1 && Re(n, null, 14);
    }
  } finally {
    _e = 0, q.length = 0, $s(), ut = !1, wn = null, (q.length || $e.length) && Xs();
  }
}
function Er(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const s = e.vnode.props || H;
  let o = n;
  const r = t.startsWith("update:"), i = r && t.slice(7);
  if (i && i in s) {
    const h = `${i === "modelValue" ? "model" : i}Modifiers`, { number: y, trim: O } = s[h] || H;
    O && (o = n.map((v) => G(v) ? v.trim() : v)), y && (o = n.map(nn));
  }
  let c, f = s[c = qt(t)] || // also try camelCase event handler (#2249)
  s[c = qt(Ee(t))];
  !f && r && (f = s[c = qt(re(t))]), f && fe(
    f,
    e,
    6,
    o
  );
  const a = s[c + "Once"];
  if (a) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[c])
      return;
    e.emitted[c] = !0, fe(
      a,
      e,
      6,
      o
    );
  }
}
function ks(e, t, n = !1) {
  const s = t.emitsCache, o = s.get(e);
  if (o !== void 0)
    return o;
  const r = e.emits;
  let i = {}, c = !1;
  if (!S(e)) {
    const f = (a) => {
      const h = ks(a, t, !0);
      h && (c = !0, B(i, h));
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  return !r && !c ? (V(e) && s.set(e, null), null) : (A(r) ? r.forEach((f) => i[f] = null) : B(i, r), V(e) && s.set(e, i), i);
}
function jt(e, t) {
  return !e || !Nt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), D(e, t[0].toLowerCase() + t.slice(1)) || D(e, re(t)) || D(e, t));
}
let le = null, qs = null;
function Pt(e) {
  const t = le;
  return le = e, qs = e && e.type.__scopeId || null, t;
}
function xr(e, t = le, n) {
  if (!t || e._n)
    return e;
  const s = (...o) => {
    s._d && fs(-1);
    const r = Pt(t);
    let i;
    try {
      i = e(...o);
    } finally {
      Pt(r), s._d && fs(1);
    }
    return i;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Zt(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: o,
    props: r,
    propsOptions: [i],
    slots: c,
    attrs: f,
    emit: a,
    render: h,
    renderCache: y,
    data: O,
    setupState: v,
    ctx: j,
    inheritAttrs: P
  } = e;
  let W, $;
  const X = Pt(e);
  try {
    if (n.shapeFlag & 4) {
      const I = o || s;
      W = me(
        h.call(
          I,
          I,
          y,
          r,
          v,
          O,
          j
        )
      ), $ = f;
    } else {
      const I = t;
      W = me(
        I.length > 1 ? I(
          r,
          { attrs: f, slots: c, emit: a }
        ) : I(
          r,
          null
          /* we know it doesn't need it */
        )
      ), $ = t.props ? f : yr(f);
    }
  } catch (I) {
    it.length = 0, Lt(I, e, 1), W = Ae(at);
  }
  let k = W;
  if ($ && P !== !1) {
    const I = Object.keys($), { shapeFlag: Ce } = k;
    I.length && Ce & 7 && (i && I.some(gn) && ($ = Cr(
      $,
      i
    )), k = ke(k, $));
  }
  return n.dirs && (k = ke(k), k.dirs = k.dirs ? k.dirs.concat(n.dirs) : n.dirs), n.transition && (k.transition = n.transition), W = k, Pt(X), W;
}
const yr = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Nt(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Cr = (e, t) => {
  const n = {};
  for (const s in e)
    (!gn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Or(e, t, n) {
  const { props: s, children: o, component: r } = e, { props: i, children: c, patchFlag: f } = t, a = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && f >= 0) {
    if (f & 1024)
      return !0;
    if (f & 16)
      return s ? ts(s, i, a) : !!i;
    if (f & 8) {
      const h = t.dynamicProps;
      for (let y = 0; y < h.length; y++) {
        const O = h[y];
        if (i[O] !== s[O] && !jt(a, O))
          return !0;
      }
    }
  } else
    return (o || c) && (!c || !c.$stable) ? !0 : s === i ? !1 : s ? i ? ts(s, i, a) : !0 : !!i;
  return !1;
}
function ts(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < s.length; o++) {
    const r = s[o];
    if (t[r] !== e[r] && !jt(n, r))
      return !0;
  }
  return !1;
}
function zr({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const Tr = (e) => e.__isSuspense;
function Rr(e, t) {
  t && t.pendingBranch ? A(e) ? t.effects.push(...e) : t.effects.push(e) : gr(e);
}
const zt = {};
function Jt(e, t, n) {
  return Zs(e, t, n);
}
function Zs(e, t, { immediate: n, deep: s, flush: o, onTrack: r, onTrigger: i } = H) {
  var c;
  const f = Do() === ((c = Z) == null ? void 0 : c.scope) ? Z : null;
  let a, h = !1, y = !1;
  if (J(e) ? (a = () => e.value, h = wt(e)) : Ge(e) ? (a = () => e, s = !0) : A(e) ? (y = !0, h = e.some((I) => Ge(I) || wt(I)), a = () => e.map((I) => {
    if (J(I))
      return I.value;
    if (Ge(I))
      return Fe(I);
    if (S(I))
      return Re(I, f, 2);
  })) : S(e) ? t ? a = () => Re(e, f, 2) : a = () => {
    if (!(f && f.isUnmounted))
      return O && O(), fe(
        e,
        f,
        3,
        [v]
      );
  } : a = ue, t && s) {
    const I = a;
    a = () => Fe(I());
  }
  let O, v = (I) => {
    O = X.onStop = () => {
      Re(I, f, 4);
    };
  }, j;
  if (pt)
    if (v = ue, t ? n && fe(t, f, 3, [
      a(),
      y ? [] : void 0,
      v
    ]) : a(), o === "sync") {
      const I = Ti();
      j = I.__watcherHandles || (I.__watcherHandles = []);
    } else
      return ue;
  let P = y ? new Array(e.length).fill(zt) : zt;
  const W = () => {
    if (X.active)
      if (t) {
        const I = X.run();
        (s || h || (y ? I.some(
          (Ce, Ye) => lt(Ce, P[Ye])
        ) : lt(I, P))) && (O && O(), fe(t, f, 3, [
          I,
          // pass undefined as the old value when it's changed for the first time
          P === zt ? void 0 : y && P[0] === zt ? [] : P,
          v
        ]), P = I);
      } else
        X.run();
  };
  W.allowRecurse = !!t;
  let $;
  o === "sync" ? $ = W : o === "post" ? $ = () => ee(W, f && f.suspense) : (W.pre = !0, f && (W.id = f.uid), $ = () => Pn(W));
  const X = new zn(a, $);
  t ? n ? W() : P = X.run() : o === "post" ? ee(
    X.run.bind(X),
    f && f.suspense
  ) : X.run();
  const k = () => {
    X.stop(), f && f.scope && bn(f.scope.effects, X);
  };
  return j && j.push(k), k;
}
function Ar(e, t, n) {
  const s = this.proxy, o = G(e) ? e.includes(".") ? Js(s, e) : () => s[e] : e.bind(s, s);
  let r;
  S(t) ? r = t : (r = t.handler, n = t);
  const i = Z;
  qe(this);
  const c = Zs(o, r.bind(s), n);
  return i ? qe(i) : Le(), c;
}
function Js(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let o = 0; o < n.length && s; o++)
      s = s[n[o]];
    return s;
  };
}
function Fe(e, t) {
  if (!V(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), J(e))
    Fe(e.value, t);
  else if (A(e))
    for (let n = 0; n < e.length; n++)
      Fe(e[n], t);
  else if (Eo(e) || ot(e))
    e.forEach((n) => {
      Fe(n, t);
    });
  else if (Co(e))
    for (const n in e)
      Fe(e[n], t);
  return e;
}
function vr(e, t) {
  const n = le;
  if (n === null)
    return e;
  const s = Wt(n) || n.proxy, o = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [i, c, f, a = H] = t[r];
    i && (S(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Fe(c), o.push({
      dir: i,
      instance: s,
      value: c,
      oldValue: void 0,
      arg: f,
      modifiers: a
    }));
  }
  return e;
}
function De(e, t, n, s) {
  const o = e.dirs, r = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const c = o[i];
    r && (c.oldValue = r[i].value);
    let f = c.dir[s];
    f && (Ze(), fe(f, n, 8, [
      e.el,
      c,
      e,
      t
    ]), Je());
  }
}
function Sr(e, t) {
  return S(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => B({ name: e.name }, t, { setup: e }))()
  ) : e;
}
const At = (e) => !!e.type.__asyncLoader, Ys = (e) => e.type.__isKeepAlive;
function Ir(e, t) {
  Qs(e, "a", t);
}
function wr(e, t) {
  Qs(e, "da", t);
}
function Qs(e, t, n = Z) {
  const s = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (Kt(t, s, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      Ys(o.parent.vnode) && Pr(s, t, n, o), o = o.parent;
  }
}
function Pr(e, t, n, s) {
  const o = Kt(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  eo(() => {
    bn(s[t], o);
  }, n);
}
function Kt(e, t, n = Z, s = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted)
        return;
      Ze(), qe(n);
      const c = fe(t, n, e, i);
      return Le(), Je(), c;
    });
    return s ? o.unshift(r) : o.push(r), r;
  }
}
const ye = (e) => (t, n = Z) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!pt || e === "sp") && Kt(e, (...s) => t(...s), n)
), Dr = ye("bm"), Mr = ye("m"), Nr = ye("bu"), Ur = ye("u"), Fr = ye("bum"), eo = ye("um"), Hr = ye("sp"), Lr = ye(
  "rtg"
), jr = ye(
  "rtc"
);
function Kr(e, t = Z) {
  Kt("ec", e, t);
}
const Vr = Symbol.for("v-ndc"), fn = (e) => e ? ao(e) ? Wt(e) || e.proxy : fn(e.parent) : null, rt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ B(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => fn(e.parent),
    $root: (e) => fn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Dn(e),
    $forceUpdate: (e) => e.f || (e.f = () => Pn(e.update)),
    $nextTick: (e) => e.n || (e.n = Ws.bind(e.proxy)),
    $watch: (e) => Ar.bind(e)
  })
), Yt = (e, t) => e !== H && !e.__isScriptSetup && D(e, t), Br = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: o, props: r, accessCache: i, type: c, appContext: f } = e;
    let a;
    if (t[0] !== "$") {
      const v = i[t];
      if (v !== void 0)
        switch (v) {
          case 1:
            return s[t];
          case 2:
            return o[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (Yt(s, t))
          return i[t] = 1, s[t];
        if (o !== H && D(o, t))
          return i[t] = 2, o[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (a = e.propsOptions[0]) && D(a, t)
        )
          return i[t] = 3, r[t];
        if (n !== H && D(n, t))
          return i[t] = 4, n[t];
        an && (i[t] = 0);
      }
    }
    const h = rt[t];
    let y, O;
    if (h)
      return t === "$attrs" && te(e, "get", t), h(e);
    if (
      // css module (injected by vue-loader)
      (y = c.__cssModules) && (y = y[t])
    )
      return y;
    if (n !== H && D(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      O = f.config.globalProperties, D(O, t)
    )
      return O[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: o, ctx: r } = e;
    return Yt(o, t) ? (o[t] = n, !0) : s !== H && D(s, t) ? (s[t] = n, !0) : D(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: o, propsOptions: r }
  }, i) {
    let c;
    return !!n[i] || e !== H && D(e, i) || Yt(t, i) || (c = r[0]) && D(c, i) || D(s, i) || D(rt, i) || D(o.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : D(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function ns(e) {
  return A(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let an = !0;
function Wr(e) {
  const t = Dn(e), n = e.proxy, s = e.ctx;
  an = !1, t.beforeCreate && ss(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: r,
    methods: i,
    watch: c,
    provide: f,
    inject: a,
    // lifecycle
    created: h,
    beforeMount: y,
    mounted: O,
    beforeUpdate: v,
    updated: j,
    activated: P,
    deactivated: W,
    beforeDestroy: $,
    beforeUnmount: X,
    destroyed: k,
    unmounted: I,
    render: Ce,
    renderTracked: Ye,
    renderTriggered: mt,
    errorCaptured: Se,
    serverPrefetch: Gt,
    // public API
    expose: Ie,
    inheritAttrs: Qe,
    // assets
    components: _t,
    directives: ht,
    filters: $t
  } = t;
  if (a && Gr(a, s, null), i)
    for (const L in i) {
      const U = i[L];
      S(U) && (s[L] = U.bind(n));
    }
  if (o) {
    const L = o.call(n, n);
    V(L) && (e.data = vn(L));
  }
  if (an = !0, r)
    for (const L in r) {
      const U = r[L], we = S(U) ? U.bind(n, n) : S(U.get) ? U.get.bind(n, n) : ue, gt = !S(U) && S(U.set) ? U.set.bind(n) : ue, Pe = Oi({
        get: we,
        set: gt
      });
      Object.defineProperty(s, L, {
        enumerable: !0,
        configurable: !0,
        get: () => Pe.value,
        set: (ae) => Pe.value = ae
      });
    }
  if (c)
    for (const L in c)
      to(c[L], s, n, L);
  if (f) {
    const L = S(f) ? f.call(n) : f;
    Reflect.ownKeys(L).forEach((U) => {
      Jr(U, L[U]);
    });
  }
  h && ss(h, e, "c");
  function Y(L, U) {
    A(U) ? U.forEach((we) => L(we.bind(n))) : U && L(U.bind(n));
  }
  if (Y(Dr, y), Y(Mr, O), Y(Nr, v), Y(Ur, j), Y(Ir, P), Y(wr, W), Y(Kr, Se), Y(jr, Ye), Y(Lr, mt), Y(Fr, X), Y(eo, I), Y(Hr, Gt), A(Ie))
    if (Ie.length) {
      const L = e.exposed || (e.exposed = {});
      Ie.forEach((U) => {
        Object.defineProperty(L, U, {
          get: () => n[U],
          set: (we) => n[U] = we
        });
      });
    } else
      e.exposed || (e.exposed = {});
  Ce && e.render === ue && (e.render = Ce), Qe != null && (e.inheritAttrs = Qe), _t && (e.components = _t), ht && (e.directives = ht);
}
function Gr(e, t, n = ue) {
  A(e) && (e = dn(e));
  for (const s in e) {
    const o = e[s];
    let r;
    V(o) ? "default" in o ? r = vt(
      o.from || s,
      o.default,
      !0
      /* treat default function as factory */
    ) : r = vt(o.from || s) : r = vt(o), J(r) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (i) => r.value = i
    }) : t[s] = r;
  }
}
function ss(e, t, n) {
  fe(
    A(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function to(e, t, n, s) {
  const o = s.includes(".") ? Js(n, s) : () => n[s];
  if (G(e)) {
    const r = t[e];
    S(r) && Jt(o, r);
  } else if (S(e))
    Jt(o, e.bind(n));
  else if (V(e))
    if (A(e))
      e.forEach((r) => to(r, t, n, s));
    else {
      const r = S(e.handler) ? e.handler.bind(n) : t[e.handler];
      S(r) && Jt(o, r, e);
    }
}
function Dn(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: o,
    optionsCache: r,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = r.get(t);
  let f;
  return c ? f = c : !o.length && !n && !s ? f = t : (f = {}, o.length && o.forEach(
    (a) => Dt(f, a, i, !0)
  ), Dt(f, t, i)), V(t) && r.set(t, f), f;
}
function Dt(e, t, n, s = !1) {
  const { mixins: o, extends: r } = t;
  r && Dt(e, r, n, !0), o && o.forEach(
    (i) => Dt(e, i, n, !0)
  );
  for (const i in t)
    if (!(s && i === "expose")) {
      const c = $r[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const $r = {
  data: os,
  props: rs,
  emits: rs,
  // objects
  methods: st,
  computed: st,
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
  components: st,
  directives: st,
  // watch
  watch: kr,
  // provide / inject
  provide: os,
  inject: Xr
};
function os(e, t) {
  return t ? e ? function() {
    return B(
      S(e) ? e.call(this, this) : e,
      S(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Xr(e, t) {
  return st(dn(e), dn(t));
}
function dn(e) {
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
function st(e, t) {
  return e ? B(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function rs(e, t) {
  return e ? A(e) && A(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : B(
    /* @__PURE__ */ Object.create(null),
    ns(e),
    ns(t ?? {})
  ) : t;
}
function kr(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = B(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Q(e[s], t[s]);
  return n;
}
function no() {
  return {
    app: null,
    config: {
      isNativeTag: ho,
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
let qr = 0;
function Zr(e, t) {
  return function(s, o = null) {
    S(s) || (s = B({}, s)), o != null && !V(o) && (o = null);
    const r = no(), i = /* @__PURE__ */ new Set();
    let c = !1;
    const f = r.app = {
      _uid: qr++,
      _component: s,
      _props: o,
      _container: null,
      _context: r,
      _instance: null,
      version: Ri,
      get config() {
        return r.config;
      },
      set config(a) {
      },
      use(a, ...h) {
        return i.has(a) || (a && S(a.install) ? (i.add(a), a.install(f, ...h)) : S(a) && (i.add(a), a(f, ...h))), f;
      },
      mixin(a) {
        return r.mixins.includes(a) || r.mixins.push(a), f;
      },
      component(a, h) {
        return h ? (r.components[a] = h, f) : r.components[a];
      },
      directive(a, h) {
        return h ? (r.directives[a] = h, f) : r.directives[a];
      },
      mount(a, h, y) {
        if (!c) {
          const O = Ae(
            s,
            o
          );
          return O.appContext = r, h && t ? t(O, a) : e(O, a, y), c = !0, f._container = a, a.__vue_app__ = f, Wt(O.component) || O.component.proxy;
        }
      },
      unmount() {
        c && (e(null, f._container), delete f._container.__vue_app__);
      },
      provide(a, h) {
        return r.provides[a] = h, f;
      },
      runWithContext(a) {
        Mt = f;
        try {
          return a();
        } finally {
          Mt = null;
        }
      }
    };
    return f;
  };
}
let Mt = null;
function Jr(e, t) {
  if (Z) {
    let n = Z.provides;
    const s = Z.parent && Z.parent.provides;
    s === n && (n = Z.provides = Object.create(s)), n[e] = t;
  }
}
function vt(e, t, n = !1) {
  const s = Z || le;
  if (s || Mt) {
    const o = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : Mt._context.provides;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && S(t) ? t.call(s && s.proxy) : t;
  }
}
function Yr(e, t, n, s = !1) {
  const o = {}, r = {};
  It(r, Bt, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), so(e, t, o, r);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e.props = s ? o : ir(o) : e.type.props ? e.props = o : e.props = r, e.attrs = r;
}
function Qr(e, t, n, s) {
  const {
    props: o,
    attrs: r,
    vnode: { patchFlag: i }
  } = e, c = M(o), [f] = e.propsOptions;
  let a = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const h = e.vnode.dynamicProps;
      for (let y = 0; y < h.length; y++) {
        let O = h[y];
        if (jt(e.emitsOptions, O))
          continue;
        const v = t[O];
        if (f)
          if (D(r, O))
            v !== r[O] && (r[O] = v, a = !0);
          else {
            const j = Ee(O);
            o[j] = pn(
              f,
              c,
              j,
              v,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          v !== r[O] && (r[O] = v, a = !0);
      }
    }
  } else {
    so(e, t, o, r) && (a = !0);
    let h;
    for (const y in c)
      (!t || // for camelCase
      !D(t, y) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((h = re(y)) === y || !D(t, h))) && (f ? n && // for camelCase
      (n[y] !== void 0 || // for kebab-case
      n[h] !== void 0) && (o[y] = pn(
        f,
        c,
        y,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete o[y]);
    if (r !== c)
      for (const y in r)
        (!t || !D(t, y)) && (delete r[y], a = !0);
  }
  a && xe(e, "set", "$attrs");
}
function so(e, t, n, s) {
  const [o, r] = e.propsOptions;
  let i = !1, c;
  if (t)
    for (let f in t) {
      if (Tt(f))
        continue;
      const a = t[f];
      let h;
      o && D(o, h = Ee(f)) ? !r || !r.includes(h) ? n[h] = a : (c || (c = {}))[h] = a : jt(e.emitsOptions, f) || (!(f in s) || a !== s[f]) && (s[f] = a, i = !0);
    }
  if (r) {
    const f = M(n), a = c || H;
    for (let h = 0; h < r.length; h++) {
      const y = r[h];
      n[y] = pn(
        o,
        f,
        y,
        a[y],
        e,
        !D(a, y)
      );
    }
  }
  return i;
}
function pn(e, t, n, s, o, r) {
  const i = e[n];
  if (i != null) {
    const c = D(i, "default");
    if (c && s === void 0) {
      const f = i.default;
      if (i.type !== Function && !i.skipFactory && S(f)) {
        const { propsDefaults: a } = o;
        n in a ? s = a[n] : (qe(o), s = a[n] = f.call(
          null,
          t
        ), Le());
      } else
        s = f;
    }
    i[
      0
      /* shouldCast */
    ] && (r && !c ? s = !1 : i[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === re(n)) && (s = !0));
  }
  return s;
}
function oo(e, t, n = !1) {
  const s = t.propsCache, o = s.get(e);
  if (o)
    return o;
  const r = e.props, i = {}, c = [];
  let f = !1;
  if (!S(e)) {
    const h = (y) => {
      f = !0;
      const [O, v] = oo(y, t, !0);
      B(i, O), v && c.push(...v);
    };
    !n && t.mixins.length && t.mixins.forEach(h), e.extends && h(e.extends), e.mixins && e.mixins.forEach(h);
  }
  if (!r && !f)
    return V(e) && s.set(e, We), We;
  if (A(r))
    for (let h = 0; h < r.length; h++) {
      const y = Ee(r[h]);
      is(y) && (i[y] = H);
    }
  else if (r)
    for (const h in r) {
      const y = Ee(h);
      if (is(y)) {
        const O = r[h], v = i[y] = A(O) || S(O) ? { type: O } : B({}, O);
        if (v) {
          const j = us(Boolean, v.type), P = us(String, v.type);
          v[
            0
            /* shouldCast */
          ] = j > -1, v[
            1
            /* shouldCastTrue */
          ] = P < 0 || j < P, (j > -1 || D(v, "default")) && c.push(y);
        }
      }
    }
  const a = [i, c];
  return V(e) && s.set(e, a), a;
}
function is(e) {
  return e[0] !== "$";
}
function ls(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function cs(e, t) {
  return ls(e) === ls(t);
}
function us(e, t) {
  return A(t) ? t.findIndex((n) => cs(n, e)) : S(t) && cs(t, e) ? 0 : -1;
}
const ro = (e) => e[0] === "_" || e === "$stable", Mn = (e) => A(e) ? e.map(me) : [me(e)], ei = (e, t, n) => {
  if (t._n)
    return t;
  const s = xr((...o) => Mn(t(...o)), n);
  return s._c = !1, s;
}, io = (e, t, n) => {
  const s = e._ctx;
  for (const o in e) {
    if (ro(o))
      continue;
    const r = e[o];
    if (S(r))
      t[o] = ei(o, r, s);
    else if (r != null) {
      const i = Mn(r);
      t[o] = () => i;
    }
  }
}, lo = (e, t) => {
  const n = Mn(t);
  e.slots.default = () => n;
}, ti = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = M(t), It(t, "_", n)) : io(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && lo(e, t);
  It(e.slots, Bt, 1);
}, ni = (e, t, n) => {
  const { vnode: s, slots: o } = e;
  let r = !0, i = H;
  if (s.shapeFlag & 32) {
    const c = t._;
    c ? n && c === 1 ? r = !1 : (B(o, t), !n && c === 1 && delete o._) : (r = !t.$stable, io(t, o)), i = t;
  } else
    t && (lo(e, t), i = { default: 1 });
  if (r)
    for (const c in o)
      !ro(c) && !(c in i) && delete o[c];
};
function mn(e, t, n, s, o = !1) {
  if (A(e)) {
    e.forEach(
      (O, v) => mn(
        O,
        t && (A(t) ? t[v] : t),
        n,
        s,
        o
      )
    );
    return;
  }
  if (At(s) && !o)
    return;
  const r = s.shapeFlag & 4 ? Wt(s.component) || s.component.proxy : s.el, i = o ? null : r, { i: c, r: f } = e, a = t && t.r, h = c.refs === H ? c.refs = {} : c.refs, y = c.setupState;
  if (a != null && a !== f && (G(a) ? (h[a] = null, D(y, a) && (y[a] = null)) : J(a) && (a.value = null)), S(f))
    Re(f, c, 12, [i, h]);
  else {
    const O = G(f), v = J(f);
    if (O || v) {
      const j = () => {
        if (e.f) {
          const P = O ? D(y, f) ? y[f] : h[f] : f.value;
          o ? A(P) && bn(P, r) : A(P) ? P.includes(r) || P.push(r) : O ? (h[f] = [r], D(y, f) && (y[f] = h[f])) : (f.value = [r], e.k && (h[e.k] = f.value));
        } else
          O ? (h[f] = i, D(y, f) && (y[f] = i)) : v && (f.value = i, e.k && (h[e.k] = i));
      };
      i ? (j.id = -1, ee(j, n)) : j();
    }
  }
}
const ee = Rr;
function si(e) {
  return oi(e);
}
function oi(e, t) {
  const n = sn();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: o,
    patchProp: r,
    createElement: i,
    createText: c,
    createComment: f,
    setText: a,
    setElementText: h,
    parentNode: y,
    nextSibling: O,
    setScopeId: v = ue,
    insertStaticContent: j
  } = e, P = (l, u, d, m = null, p = null, b = null, x = !1, g = null, E = !!u.dynamicChildren) => {
    if (l === u)
      return;
    l && !tt(l, u) && (m = bt(l), ae(l, p, b, !0), l = null), u.patchFlag === -2 && (E = !1, u.dynamicChildren = null);
    const { type: _, ref: z, shapeFlag: C } = u;
    switch (_) {
      case Vt:
        W(l, u, d, m);
        break;
      case at:
        $(l, u, d, m);
        break;
      case Qt:
        l == null && X(u, d, m, x);
        break;
      case be:
        _t(
          l,
          u,
          d,
          m,
          p,
          b,
          x,
          g,
          E
        );
        break;
      default:
        C & 1 ? Ce(
          l,
          u,
          d,
          m,
          p,
          b,
          x,
          g,
          E
        ) : C & 6 ? ht(
          l,
          u,
          d,
          m,
          p,
          b,
          x,
          g,
          E
        ) : (C & 64 || C & 128) && _.process(
          l,
          u,
          d,
          m,
          p,
          b,
          x,
          g,
          E,
          je
        );
    }
    z != null && p && mn(z, l && l.ref, b, u || l, !u);
  }, W = (l, u, d, m) => {
    if (l == null)
      s(
        u.el = c(u.children),
        d,
        m
      );
    else {
      const p = u.el = l.el;
      u.children !== l.children && a(p, u.children);
    }
  }, $ = (l, u, d, m) => {
    l == null ? s(
      u.el = f(u.children || ""),
      d,
      m
    ) : u.el = l.el;
  }, X = (l, u, d, m) => {
    [l.el, l.anchor] = j(
      l.children,
      u,
      d,
      m,
      l.el,
      l.anchor
    );
  }, k = ({ el: l, anchor: u }, d, m) => {
    let p;
    for (; l && l !== u; )
      p = O(l), s(l, d, m), l = p;
    s(u, d, m);
  }, I = ({ el: l, anchor: u }) => {
    let d;
    for (; l && l !== u; )
      d = O(l), o(l), l = d;
    o(u);
  }, Ce = (l, u, d, m, p, b, x, g, E) => {
    x = x || u.type === "svg", l == null ? Ye(
      u,
      d,
      m,
      p,
      b,
      x,
      g,
      E
    ) : Gt(
      l,
      u,
      p,
      b,
      x,
      g,
      E
    );
  }, Ye = (l, u, d, m, p, b, x, g) => {
    let E, _;
    const { type: z, props: C, shapeFlag: T, transition: R, dirs: w } = l;
    if (E = l.el = i(
      l.type,
      b,
      C && C.is,
      C
    ), T & 8 ? h(E, l.children) : T & 16 && Se(
      l.children,
      E,
      null,
      m,
      p,
      b && z !== "foreignObject",
      x,
      g
    ), w && De(l, null, m, "created"), mt(E, l, l.scopeId, x, m), C) {
      for (const N in C)
        N !== "value" && !Tt(N) && r(
          E,
          N,
          null,
          C[N],
          b,
          l.children,
          m,
          p,
          he
        );
      "value" in C && r(E, "value", null, C.value), (_ = C.onVnodeBeforeMount) && pe(_, m, l);
    }
    w && De(l, null, m, "beforeMount");
    const F = (!p || p && !p.pendingBranch) && R && !R.persisted;
    F && R.beforeEnter(E), s(E, u, d), ((_ = C && C.onVnodeMounted) || F || w) && ee(() => {
      _ && pe(_, m, l), F && R.enter(E), w && De(l, null, m, "mounted");
    }, p);
  }, mt = (l, u, d, m, p) => {
    if (d && v(l, d), m)
      for (let b = 0; b < m.length; b++)
        v(l, m[b]);
    if (p) {
      let b = p.subTree;
      if (u === b) {
        const x = p.vnode;
        mt(
          l,
          x,
          x.scopeId,
          x.slotScopeIds,
          p.parent
        );
      }
    }
  }, Se = (l, u, d, m, p, b, x, g, E = 0) => {
    for (let _ = E; _ < l.length; _++) {
      const z = l[_] = g ? ze(l[_]) : me(l[_]);
      P(
        null,
        z,
        u,
        d,
        m,
        p,
        b,
        x,
        g
      );
    }
  }, Gt = (l, u, d, m, p, b, x) => {
    const g = u.el = l.el;
    let { patchFlag: E, dynamicChildren: _, dirs: z } = u;
    E |= l.patchFlag & 16;
    const C = l.props || H, T = u.props || H;
    let R;
    d && Me(d, !1), (R = T.onVnodeBeforeUpdate) && pe(R, d, u, l), z && De(u, l, d, "beforeUpdate"), d && Me(d, !0);
    const w = p && u.type !== "foreignObject";
    if (_ ? Ie(
      l.dynamicChildren,
      _,
      g,
      d,
      m,
      w,
      b
    ) : x || U(
      l,
      u,
      g,
      null,
      d,
      m,
      w,
      b,
      !1
    ), E > 0) {
      if (E & 16)
        Qe(
          g,
          u,
          C,
          T,
          d,
          m,
          p
        );
      else if (E & 2 && C.class !== T.class && r(g, "class", null, T.class, p), E & 4 && r(g, "style", C.style, T.style, p), E & 8) {
        const F = u.dynamicProps;
        for (let N = 0; N < F.length; N++) {
          const K = F[N], se = C[K], Ke = T[K];
          (Ke !== se || K === "value") && r(
            g,
            K,
            se,
            Ke,
            p,
            l.children,
            d,
            m,
            he
          );
        }
      }
      E & 1 && l.children !== u.children && h(g, u.children);
    } else
      !x && _ == null && Qe(
        g,
        u,
        C,
        T,
        d,
        m,
        p
      );
    ((R = T.onVnodeUpdated) || z) && ee(() => {
      R && pe(R, d, u, l), z && De(u, l, d, "updated");
    }, m);
  }, Ie = (l, u, d, m, p, b, x) => {
    for (let g = 0; g < u.length; g++) {
      const E = l[g], _ = u[g], z = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        E.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (E.type === be || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !tt(E, _) || // - In the case of a component, it could contain anything.
        E.shapeFlag & 70) ? y(E.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          d
        )
      );
      P(
        E,
        _,
        z,
        null,
        m,
        p,
        b,
        x,
        !0
      );
    }
  }, Qe = (l, u, d, m, p, b, x) => {
    if (d !== m) {
      if (d !== H)
        for (const g in d)
          !Tt(g) && !(g in m) && r(
            l,
            g,
            d[g],
            null,
            x,
            u.children,
            p,
            b,
            he
          );
      for (const g in m) {
        if (Tt(g))
          continue;
        const E = m[g], _ = d[g];
        E !== _ && g !== "value" && r(
          l,
          g,
          _,
          E,
          x,
          u.children,
          p,
          b,
          he
        );
      }
      "value" in m && r(l, "value", d.value, m.value);
    }
  }, _t = (l, u, d, m, p, b, x, g, E) => {
    const _ = u.el = l ? l.el : c(""), z = u.anchor = l ? l.anchor : c("");
    let { patchFlag: C, dynamicChildren: T, slotScopeIds: R } = u;
    R && (g = g ? g.concat(R) : R), l == null ? (s(_, d, m), s(z, d, m), Se(
      u.children,
      d,
      z,
      p,
      b,
      x,
      g,
      E
    )) : C > 0 && C & 64 && T && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    l.dynamicChildren ? (Ie(
      l.dynamicChildren,
      T,
      d,
      p,
      b,
      x,
      g
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (u.key != null || p && u === p.subTree) && co(
      l,
      u,
      !0
      /* shallow */
    )) : U(
      l,
      u,
      d,
      z,
      p,
      b,
      x,
      g,
      E
    );
  }, ht = (l, u, d, m, p, b, x, g, E) => {
    u.slotScopeIds = g, l == null ? u.shapeFlag & 512 ? p.ctx.activate(
      u,
      d,
      m,
      x,
      E
    ) : $t(
      u,
      d,
      m,
      p,
      b,
      x,
      E
    ) : Ln(l, u, E);
  }, $t = (l, u, d, m, p, b, x) => {
    const g = l.component = gi(
      l,
      m,
      p
    );
    if (Ys(l) && (g.ctx.renderer = je), bi(g), g.asyncDep) {
      if (p && p.registerDep(g, Y), !l.el) {
        const E = g.subTree = Ae(at);
        $(null, E, u, d);
      }
      return;
    }
    Y(
      g,
      l,
      u,
      d,
      p,
      b,
      x
    );
  }, Ln = (l, u, d) => {
    const m = u.component = l.component;
    if (Or(l, u, d))
      if (m.asyncDep && !m.asyncResolved) {
        L(m, u, d);
        return;
      } else
        m.next = u, hr(m.update), m.update();
    else
      u.el = l.el, m.vnode = u;
  }, Y = (l, u, d, m, p, b, x) => {
    const g = () => {
      if (l.isMounted) {
        let { next: z, bu: C, u: T, parent: R, vnode: w } = l, F = z, N;
        Me(l, !1), z ? (z.el = w.el, L(l, z, x)) : z = w, C && Rt(C), (N = z.props && z.props.onVnodeBeforeUpdate) && pe(N, R, z, w), Me(l, !0);
        const K = Zt(l), se = l.subTree;
        l.subTree = K, P(
          se,
          K,
          // parent may have changed if it's in a teleport
          y(se.el),
          // anchor may have changed if it's in a fragment
          bt(se),
          l,
          p,
          b
        ), z.el = K.el, F === null && zr(l, K.el), T && ee(T, p), (N = z.props && z.props.onVnodeUpdated) && ee(
          () => pe(N, R, z, w),
          p
        );
      } else {
        let z;
        const { el: C, props: T } = u, { bm: R, m: w, parent: F } = l, N = At(u);
        if (Me(l, !1), R && Rt(R), !N && (z = T && T.onVnodeBeforeMount) && pe(z, F, u), Me(l, !0), C && kt) {
          const K = () => {
            l.subTree = Zt(l), kt(
              C,
              l.subTree,
              l,
              p,
              null
            );
          };
          N ? u.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !l.isUnmounted && K()
          ) : K();
        } else {
          const K = l.subTree = Zt(l);
          P(
            null,
            K,
            d,
            m,
            l,
            p,
            b
          ), u.el = K.el;
        }
        if (w && ee(w, p), !N && (z = T && T.onVnodeMounted)) {
          const K = u;
          ee(
            () => pe(z, F, K),
            p
          );
        }
        (u.shapeFlag & 256 || F && At(F.vnode) && F.vnode.shapeFlag & 256) && l.a && ee(l.a, p), l.isMounted = !0, u = d = m = null;
      }
    }, E = l.effect = new zn(
      g,
      () => Pn(_),
      l.scope
      // track it in component's effect scope
    ), _ = l.update = () => E.run();
    _.id = l.uid, Me(l, !0), _();
  }, L = (l, u, d) => {
    u.component = l;
    const m = l.vnode.props;
    l.vnode = u, l.next = null, Qr(l, u.props, m, d), ni(l, u.children, d), Ze(), es(), Je();
  }, U = (l, u, d, m, p, b, x, g, E = !1) => {
    const _ = l && l.children, z = l ? l.shapeFlag : 0, C = u.children, { patchFlag: T, shapeFlag: R } = u;
    if (T > 0) {
      if (T & 128) {
        gt(
          _,
          C,
          d,
          m,
          p,
          b,
          x,
          g,
          E
        );
        return;
      } else if (T & 256) {
        we(
          _,
          C,
          d,
          m,
          p,
          b,
          x,
          g,
          E
        );
        return;
      }
    }
    R & 8 ? (z & 16 && he(_, p, b), C !== _ && h(d, C)) : z & 16 ? R & 16 ? gt(
      _,
      C,
      d,
      m,
      p,
      b,
      x,
      g,
      E
    ) : he(_, p, b, !0) : (z & 8 && h(d, ""), R & 16 && Se(
      C,
      d,
      m,
      p,
      b,
      x,
      g,
      E
    ));
  }, we = (l, u, d, m, p, b, x, g, E) => {
    l = l || We, u = u || We;
    const _ = l.length, z = u.length, C = Math.min(_, z);
    let T;
    for (T = 0; T < C; T++) {
      const R = u[T] = E ? ze(u[T]) : me(u[T]);
      P(
        l[T],
        R,
        d,
        null,
        p,
        b,
        x,
        g,
        E
      );
    }
    _ > z ? he(
      l,
      p,
      b,
      !0,
      !1,
      C
    ) : Se(
      u,
      d,
      m,
      p,
      b,
      x,
      g,
      E,
      C
    );
  }, gt = (l, u, d, m, p, b, x, g, E) => {
    let _ = 0;
    const z = u.length;
    let C = l.length - 1, T = z - 1;
    for (; _ <= C && _ <= T; ) {
      const R = l[_], w = u[_] = E ? ze(u[_]) : me(u[_]);
      if (tt(R, w))
        P(
          R,
          w,
          d,
          null,
          p,
          b,
          x,
          g,
          E
        );
      else
        break;
      _++;
    }
    for (; _ <= C && _ <= T; ) {
      const R = l[C], w = u[T] = E ? ze(u[T]) : me(u[T]);
      if (tt(R, w))
        P(
          R,
          w,
          d,
          null,
          p,
          b,
          x,
          g,
          E
        );
      else
        break;
      C--, T--;
    }
    if (_ > C) {
      if (_ <= T) {
        const R = T + 1, w = R < z ? u[R].el : m;
        for (; _ <= T; )
          P(
            null,
            u[_] = E ? ze(u[_]) : me(u[_]),
            d,
            w,
            p,
            b,
            x,
            g,
            E
          ), _++;
      }
    } else if (_ > T)
      for (; _ <= C; )
        ae(l[_], p, b, !0), _++;
    else {
      const R = _, w = _, F = /* @__PURE__ */ new Map();
      for (_ = w; _ <= T; _++) {
        const ne = u[_] = E ? ze(u[_]) : me(u[_]);
        ne.key != null && F.set(ne.key, _);
      }
      let N, K = 0;
      const se = T - w + 1;
      let Ke = !1, Vn = 0;
      const et = new Array(se);
      for (_ = 0; _ < se; _++)
        et[_] = 0;
      for (_ = R; _ <= C; _++) {
        const ne = l[_];
        if (K >= se) {
          ae(ne, p, b, !0);
          continue;
        }
        let de;
        if (ne.key != null)
          de = F.get(ne.key);
        else
          for (N = w; N <= T; N++)
            if (et[N - w] === 0 && tt(ne, u[N])) {
              de = N;
              break;
            }
        de === void 0 ? ae(ne, p, b, !0) : (et[de - w] = _ + 1, de >= Vn ? Vn = de : Ke = !0, P(
          ne,
          u[de],
          d,
          null,
          p,
          b,
          x,
          g,
          E
        ), K++);
      }
      const Bn = Ke ? ri(et) : We;
      for (N = Bn.length - 1, _ = se - 1; _ >= 0; _--) {
        const ne = w + _, de = u[ne], Wn = ne + 1 < z ? u[ne + 1].el : m;
        et[_] === 0 ? P(
          null,
          de,
          d,
          Wn,
          p,
          b,
          x,
          g,
          E
        ) : Ke && (N < 0 || _ !== Bn[N] ? Pe(de, d, Wn, 2) : N--);
      }
    }
  }, Pe = (l, u, d, m, p = null) => {
    const { el: b, type: x, transition: g, children: E, shapeFlag: _ } = l;
    if (_ & 6) {
      Pe(l.component.subTree, u, d, m);
      return;
    }
    if (_ & 128) {
      l.suspense.move(u, d, m);
      return;
    }
    if (_ & 64) {
      x.move(l, u, d, je);
      return;
    }
    if (x === be) {
      s(b, u, d);
      for (let C = 0; C < E.length; C++)
        Pe(E[C], u, d, m);
      s(l.anchor, u, d);
      return;
    }
    if (x === Qt) {
      k(l, u, d);
      return;
    }
    if (m !== 2 && _ & 1 && g)
      if (m === 0)
        g.beforeEnter(b), s(b, u, d), ee(() => g.enter(b), p);
      else {
        const { leave: C, delayLeave: T, afterLeave: R } = g, w = () => s(b, u, d), F = () => {
          C(b, () => {
            w(), R && R();
          });
        };
        T ? T(b, w, F) : F();
      }
    else
      s(b, u, d);
  }, ae = (l, u, d, m = !1, p = !1) => {
    const {
      type: b,
      props: x,
      ref: g,
      children: E,
      dynamicChildren: _,
      shapeFlag: z,
      patchFlag: C,
      dirs: T
    } = l;
    if (g != null && mn(g, null, d, l, !0), z & 256) {
      u.ctx.deactivate(l);
      return;
    }
    const R = z & 1 && T, w = !At(l);
    let F;
    if (w && (F = x && x.onVnodeBeforeUnmount) && pe(F, u, l), z & 6)
      _o(l.component, d, m);
    else {
      if (z & 128) {
        l.suspense.unmount(d, m);
        return;
      }
      R && De(l, null, u, "beforeUnmount"), z & 64 ? l.type.remove(
        l,
        u,
        d,
        p,
        je,
        m
      ) : _ && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (b !== be || C > 0 && C & 64) ? he(
        _,
        u,
        d,
        !1,
        !0
      ) : (b === be && C & 384 || !p && z & 16) && he(E, u, d), m && jn(l);
    }
    (w && (F = x && x.onVnodeUnmounted) || R) && ee(() => {
      F && pe(F, u, l), R && De(l, null, u, "unmounted");
    }, d);
  }, jn = (l) => {
    const { type: u, el: d, anchor: m, transition: p } = l;
    if (u === be) {
      mo(d, m);
      return;
    }
    if (u === Qt) {
      I(l);
      return;
    }
    const b = () => {
      o(d), p && !p.persisted && p.afterLeave && p.afterLeave();
    };
    if (l.shapeFlag & 1 && p && !p.persisted) {
      const { leave: x, delayLeave: g } = p, E = () => x(d, b);
      g ? g(l.el, b, E) : E();
    } else
      b();
  }, mo = (l, u) => {
    let d;
    for (; l !== u; )
      d = O(l), o(l), l = d;
    o(u);
  }, _o = (l, u, d) => {
    const { bum: m, scope: p, update: b, subTree: x, um: g } = l;
    m && Rt(m), p.stop(), b && (b.active = !1, ae(x, l, u, d)), g && ee(g, u), ee(() => {
      l.isUnmounted = !0;
    }, u), u && u.pendingBranch && !u.isUnmounted && l.asyncDep && !l.asyncResolved && l.suspenseId === u.pendingId && (u.deps--, u.deps === 0 && u.resolve());
  }, he = (l, u, d, m = !1, p = !1, b = 0) => {
    for (let x = b; x < l.length; x++)
      ae(l[x], u, d, m, p);
  }, bt = (l) => l.shapeFlag & 6 ? bt(l.component.subTree) : l.shapeFlag & 128 ? l.suspense.next() : O(l.anchor || l.el), Kn = (l, u, d) => {
    l == null ? u._vnode && ae(u._vnode, null, null, !0) : P(u._vnode || null, l, u, null, null, null, d), es(), $s(), u._vnode = l;
  }, je = {
    p: P,
    um: ae,
    m: Pe,
    r: jn,
    mt: $t,
    mc: Se,
    pc: U,
    pbc: Ie,
    n: bt,
    o: e
  };
  let Xt, kt;
  return t && ([Xt, kt] = t(
    je
  )), {
    render: Kn,
    hydrate: Xt,
    createApp: Zr(Kn, Xt)
  };
}
function Me({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function co(e, t, n = !1) {
  const s = e.children, o = t.children;
  if (A(s) && A(o))
    for (let r = 0; r < s.length; r++) {
      const i = s[r];
      let c = o[r];
      c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = o[r] = ze(o[r]), c.el = i.el), n || co(i, c)), c.type === Vt && (c.el = i.el);
    }
}
function ri(e) {
  const t = e.slice(), n = [0];
  let s, o, r, i, c;
  const f = e.length;
  for (s = 0; s < f; s++) {
    const a = e[s];
    if (a !== 0) {
      if (o = n[n.length - 1], e[o] < a) {
        t[s] = o, n.push(s);
        continue;
      }
      for (r = 0, i = n.length - 1; r < i; )
        c = r + i >> 1, e[n[c]] < a ? r = c + 1 : i = c;
      a < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), n[r] = s);
    }
  }
  for (r = n.length, i = n[r - 1]; r-- > 0; )
    n[r] = i, i = t[i];
  return n;
}
const ii = (e) => e.__isTeleport, be = Symbol.for("v-fgt"), Vt = Symbol.for("v-txt"), at = Symbol.for("v-cmt"), Qt = Symbol.for("v-stc"), it = [];
let ce = null;
function li(e = !1) {
  it.push(ce = e ? null : []);
}
function ci() {
  it.pop(), ce = it[it.length - 1] || null;
}
let dt = 1;
function fs(e) {
  dt += e;
}
function ui(e) {
  return e.dynamicChildren = dt > 0 ? ce || We : null, ci(), dt > 0 && ce && ce.push(e), e;
}
function fi(e, t, n, s, o, r) {
  return ui(
    Nn(
      e,
      t,
      n,
      s,
      o,
      r,
      !0
      /* isBlock */
    )
  );
}
function ai(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function tt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Bt = "__vInternal", uo = ({ key: e }) => e ?? null, St = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? G(e) || J(e) || S(e) ? { i: le, r: e, k: t, f: !!n } : e : null);
function Nn(e, t = null, n = null, s = 0, o = null, r = e === be ? 0 : 1, i = !1, c = !1) {
  const f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && uo(t),
    ref: t && St(t),
    scopeId: qs,
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
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: le
  };
  return c ? (Un(f, n), r & 128 && e.normalize(f)) : n && (f.shapeFlag |= G(n) ? 8 : 16), dt > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  ce && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (f.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  f.patchFlag !== 32 && ce.push(f), f;
}
const Ae = di;
function di(e, t = null, n = null, s = 0, o = null, r = !1) {
  if ((!e || e === Vr) && (e = at), ai(e)) {
    const c = ke(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Un(c, n), dt > 0 && !r && ce && (c.shapeFlag & 6 ? ce[ce.indexOf(e)] = c : ce.push(c)), c.patchFlag |= -2, c;
  }
  if (Ci(e) && (e = e.__vccOpts), t) {
    t = pi(t);
    let { class: c, style: f } = t;
    c && !G(c) && (t.class = Cn(c)), V(f) && (Hs(f) && !A(f) && (f = B({}, f)), t.style = yn(f));
  }
  const i = G(e) ? 1 : Tr(e) ? 128 : ii(e) ? 64 : V(e) ? 4 : S(e) ? 2 : 0;
  return Nn(
    e,
    t,
    n,
    s,
    o,
    i,
    r,
    !0
  );
}
function pi(e) {
  return e ? Hs(e) || Bt in e ? B({}, e) : e : null;
}
function ke(e, t, n = !1) {
  const { props: s, ref: o, patchFlag: r, children: i } = e, c = t ? mi(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && uo(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? A(o) ? o.concat(St(t)) : [o, St(t)] : St(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== be ? r === -1 ? 16 : r | 16 : r,
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
    ssContent: e.ssContent && ke(e.ssContent),
    ssFallback: e.ssFallback && ke(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function fo(e = " ", t = 0) {
  return Ae(Vt, null, e, t);
}
function me(e) {
  return e == null || typeof e == "boolean" ? Ae(at) : A(e) ? Ae(
    be,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? ze(e) : Ae(Vt, null, String(e));
}
function ze(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : ke(e);
}
function Un(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (A(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Un(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(Bt in t) ? t._ctx = le : o === 3 && le && (le.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    S(t) ? (t = { default: t, _ctx: le }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [fo(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function mi(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const o in s)
      if (o === "class")
        t.class !== s.class && (t.class = Cn([t.class, s.class]));
      else if (o === "style")
        t.style = yn([t.style, s.style]);
      else if (Nt(o)) {
        const r = t[o], i = s[o];
        i && r !== i && !(A(r) && r.includes(i)) && (t[o] = r ? [].concat(r, i) : i);
      } else
        o !== "" && (t[o] = s[o]);
  }
  return t;
}
function pe(e, t, n, s = null) {
  fe(e, t, 7, [
    n,
    s
  ]);
}
const _i = no();
let hi = 0;
function gi(e, t, n) {
  const s = e.type, o = (t ? t.appContext : e.appContext) || _i, r = {
    uid: hi++,
    vnode: e,
    type: s,
    parent: t,
    appContext: o,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new wo(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: oo(s, o),
    emitsOptions: ks(s, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: H,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: H,
    data: H,
    props: H,
    attrs: H,
    slots: H,
    refs: H,
    setupState: H,
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
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Er.bind(null, r), e.ce && e.ce(r), r;
}
let Z = null, Fn, Ve, as = "__VUE_INSTANCE_SETTERS__";
(Ve = sn()[as]) || (Ve = sn()[as] = []), Ve.push((e) => Z = e), Fn = (e) => {
  Ve.length > 1 ? Ve.forEach((t) => t(e)) : Ve[0](e);
};
const qe = (e) => {
  Fn(e), e.scope.on();
}, Le = () => {
  Z && Z.scope.off(), Fn(null);
};
function ao(e) {
  return e.vnode.shapeFlag & 4;
}
let pt = !1;
function bi(e, t = !1) {
  pt = t;
  const { props: n, children: s } = e.vnode, o = ao(e);
  Yr(e, n, o, t), ti(e, s);
  const r = o ? Ei(e, t) : void 0;
  return pt = !1, r;
}
function Ei(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Ls(new Proxy(e.ctx, Br));
  const { setup: s } = n;
  if (s) {
    const o = e.setupContext = s.length > 1 ? yi(e) : null;
    qe(e), Ze();
    const r = Re(
      s,
      e,
      0,
      [e.props, o]
    );
    if (Je(), Le(), zs(r)) {
      if (r.then(Le, Le), t)
        return r.then((i) => {
          ds(e, i, t);
        }).catch((i) => {
          Lt(i, e, 0);
        });
      e.asyncDep = r;
    } else
      ds(e, r, t);
  } else
    po(e, t);
}
function ds(e, t, n) {
  S(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : V(t) && (e.setupState = Vs(t)), po(e, n);
}
let ps;
function po(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && ps && !s.render) {
      const o = s.template || Dn(e).template;
      if (o) {
        const { isCustomElement: r, compilerOptions: i } = e.appContext.config, { delimiters: c, compilerOptions: f } = s, a = B(
          B(
            {
              isCustomElement: r,
              delimiters: c
            },
            i
          ),
          f
        );
        s.render = ps(o, a);
      }
    }
    e.render = s.render || ue;
  }
  qe(e), Ze(), Wr(e), Je(), Le();
}
function xi(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, n) {
        return te(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function yi(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return xi(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Wt(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Vs(Ls(e.exposed)), {
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
function Ci(e) {
  return S(e) && "__vccOpts" in e;
}
const Oi = (e, t) => pr(e, t, pt), zi = Symbol.for("v-scx"), Ti = () => vt(zi), Ri = "3.3.4", Ai = "http://www.w3.org/2000/svg", Ue = typeof document < "u" ? document : null, ms = Ue && /* @__PURE__ */ Ue.createElement("template"), vi = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const o = t ? Ue.createElementNS(Ai, e) : Ue.createElement(e, n ? { is: n } : void 0);
    return e === "select" && s && s.multiple != null && o.setAttribute("multiple", s.multiple), o;
  },
  createText: (e) => Ue.createTextNode(e),
  createComment: (e) => Ue.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ue.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, o, r) {
    const i = n ? n.previousSibling : t.lastChild;
    if (o && (o === r || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), n), !(o === r || !(o = o.nextSibling)); )
        ;
    else {
      ms.innerHTML = s ? `<svg>${e}</svg>` : e;
      const c = ms.content;
      if (s) {
        const f = c.firstChild;
        for (; f.firstChild; )
          c.appendChild(f.firstChild);
        c.removeChild(f);
      }
      t.insertBefore(c, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
};
function Si(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function Ii(e, t, n) {
  const s = e.style, o = G(n);
  if (n && !o) {
    if (t && !G(t))
      for (const r in t)
        n[r] == null && _n(s, r, "");
    for (const r in n)
      _n(s, r, n[r]);
  } else {
    const r = s.display;
    o ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (s.display = r);
  }
}
const _s = /\s*!important$/;
function _n(e, t, n) {
  if (A(n))
    n.forEach((s) => _n(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = wi(e, t);
    _s.test(n) ? e.setProperty(
      re(s),
      n.replace(_s, ""),
      "important"
    ) : e[s] = n;
  }
}
const hs = ["Webkit", "Moz", "ms"], en = {};
function wi(e, t) {
  const n = en[t];
  if (n)
    return n;
  let s = Ee(t);
  if (s !== "filter" && s in e)
    return en[t] = s;
  s = Ts(s);
  for (let o = 0; o < hs.length; o++) {
    const r = hs[o] + s;
    if (r in e)
      return en[t] = r;
  }
  return t;
}
const gs = "http://www.w3.org/1999/xlink";
function Pi(e, t, n, s, o) {
  if (s && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(gs, t.slice(6, t.length)) : e.setAttributeNS(gs, t, n);
  else {
    const r = Io(t);
    n == null || r && !Rs(n) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : n);
  }
}
function Di(e, t, n, s, o, r, i) {
  if (t === "innerHTML" || t === "textContent") {
    s && i(s, o, r), e[t] = n ?? "";
    return;
  }
  const c = e.tagName;
  if (t === "value" && c !== "PROGRESS" && // custom elements may use _value internally
  !c.includes("-")) {
    e._value = n;
    const a = c === "OPTION" ? e.getAttribute("value") : e.value, h = n ?? "";
    a !== h && (e.value = h), n == null && e.removeAttribute(t);
    return;
  }
  let f = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean" ? n = Rs(n) : n == null && a === "string" ? (n = "", f = !0) : a === "number" && (n = 0, f = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  f && e.removeAttribute(t);
}
function Be(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Mi(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function Ni(e, t, n, s, o = null) {
  const r = e._vei || (e._vei = {}), i = r[t];
  if (s && i)
    i.value = s;
  else {
    const [c, f] = Ui(t);
    if (s) {
      const a = r[t] = Li(s, o);
      Be(e, c, a, f);
    } else
      i && (Mi(e, c, i, f), r[t] = void 0);
  }
}
const bs = /(?:Once|Passive|Capture)$/;
function Ui(e) {
  let t;
  if (bs.test(e)) {
    t = {};
    let s;
    for (; s = e.match(bs); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : re(e.slice(2)), t];
}
let tn = 0;
const Fi = /* @__PURE__ */ Promise.resolve(), Hi = () => tn || (Fi.then(() => tn = 0), tn = Date.now());
function Li(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    fe(
      ji(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = Hi(), n;
}
function ji(e, t) {
  if (A(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((s) => (o) => !o._stopped && s && s(o));
  } else
    return t;
}
const Es = /^on[a-z]/, Ki = (e, t, n, s, o = !1, r, i, c, f) => {
  t === "class" ? Si(e, s, o) : t === "style" ? Ii(e, n, s) : Nt(t) ? gn(t) || Ni(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Vi(e, t, s, o)) ? Di(
    e,
    t,
    s,
    r,
    i,
    c,
    f
  ) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Pi(e, t, s, o));
};
function Vi(e, t, n, s) {
  return s ? !!(t === "innerHTML" || t === "textContent" || t in e && Es.test(t) && S(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || Es.test(t) && G(n) ? !1 : t in e;
}
function Bi(e, t) {
  const n = Sr(e);
  class s extends Hn {
    constructor(r) {
      super(n, r, t);
    }
  }
  return s.def = n, s;
}
const Wi = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Hn extends Wi {
  constructor(t, n = {}, s) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && s ? s(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, Ws(() => {
      this._connected || (Os(null, this.shadowRoot), this._instance = null);
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
      for (const o of s)
        this._setAttr(o.attributeName);
    }).observe(this, { attributes: !0 });
    const t = (s, o = !1) => {
      const { props: r, styles: i } = s;
      let c;
      if (r && !A(r))
        for (const f in r) {
          const a = r[f];
          (a === Number || a && a.type === Number) && (f in this._props && (this._props[f] = Gn(this._props[f])), (c || (c = /* @__PURE__ */ Object.create(null)))[Ee(f)] = !0);
        }
      this._numberProps = c, o && this._resolveProps(s), this._applyStyles(i), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((s) => t(s, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, s = A(n) ? n : Object.keys(n || {});
    for (const o of Object.keys(this))
      o[0] !== "_" && s.includes(o) && this._setProp(o, this[o], !0, !1);
    for (const o of s.map(Ee))
      Object.defineProperty(this, o, {
        get() {
          return this._getProp(o);
        },
        set(r) {
          this._setProp(o, r);
        }
      });
  }
  _setAttr(t) {
    let n = this.getAttribute(t);
    const s = Ee(t);
    this._numberProps && this._numberProps[s] && (n = Gn(n)), this._setProp(s, n, !1);
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
  _setProp(t, n, s = !0, o = !0) {
    n !== this._props[t] && (this._props[t] = n, o && this._instance && this._update(), s && (n === !0 ? this.setAttribute(re(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(re(t), n + "") : n || this.removeAttribute(re(t))));
  }
  _update() {
    Os(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = Ae(this._def, B({}, this._props));
    return this._instance || (t.ce = (n) => {
      this._instance = n, n.isCE = !0;
      const s = (r, i) => {
        this.dispatchEvent(
          new CustomEvent(r, {
            detail: i
          })
        );
      };
      n.emit = (r, ...i) => {
        s(r, i), re(r) !== r && s(re(r), i);
      };
      let o = this;
      for (; o = o && (o.parentNode || o.host); )
        if (o instanceof Hn) {
          n.parent = o._instance, n.provides = o._instance.provides;
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
const xs = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return A(t) ? (n) => Rt(t, n) : t;
};
function Gi(e) {
  e.target.composing = !0;
}
function ys(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const $i = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, o) {
    e._assign = xs(o);
    const r = s || o.props && o.props.type === "number";
    Be(e, t ? "change" : "input", (i) => {
      if (i.target.composing)
        return;
      let c = e.value;
      n && (c = c.trim()), r && (c = nn(c)), e._assign(c);
    }), n && Be(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Be(e, "compositionstart", Gi), Be(e, "compositionend", ys), Be(e, "change", ys));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, modifiers: { lazy: n, trim: s, number: o } }, r) {
    if (e._assign = xs(r), e.composing || document.activeElement === e && e.type !== "range" && (n || s && e.value.trim() === t || (o || e.type === "number") && nn(e.value) === t))
      return;
    const i = t ?? "";
    e.value !== i && (e.value = i);
  }
}, Xi = /* @__PURE__ */ B({ patchProp: Ki }, vi);
let Cs;
function ki() {
  return Cs || (Cs = si(Xi));
}
const Os = (...e) => {
  ki().render(...e);
}, qi = `.ads{background-color:#000;color:#fff}
`, Zi = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, o] of t)
    n[s] = o;
  return n;
}, Ji = {
  class: "ads",
  style: { "text-align": "center" }
}, Yi = {
  __name: "ByMazzeoAdManager.ce",
  setup(e) {
    const t = lr("");
    return (n, s) => (li(), fi("div", Ji, [
      fo(" ByMazzeo mola més que "),
      vr(Nn("input", {
        type: "text",
        "onUpdate:modelValue": s[0] || (s[0] = (o) => t.value = o)
      }, null, 512), [
        [$i, t.value]
      ])
    ]));
  }
}, Qi = /* @__PURE__ */ Zi(Yi, [["styles", [qi]]]), el = Bi(Qi);
customElements.define("by-mazzeo-ads", el);
