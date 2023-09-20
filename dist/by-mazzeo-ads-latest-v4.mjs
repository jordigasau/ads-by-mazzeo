function hn(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let i = 0; i < s.length; i++)
    n[s[i]] = !0;
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
const U = {}, Ke = [], ae = () => {
}, mi = () => !1, hi = /^on[^a-z]/, Nt = (e) => hi.test(e), gn = (e) => e.startsWith("onUpdate:"), K = Object.assign, bn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, gi = Object.prototype.hasOwnProperty, M = (e, t) => gi.call(e, t), R = Array.isArray, st = (e) => zt(e) === "[object Map]", bi = (e) => zt(e) === "[object Set]", I = (e) => typeof e == "function", $ = (e) => typeof e == "string", vn = (e) => typeof e == "symbol", V = (e) => e !== null && typeof e == "object", As = (e) => V(e) && I(e.then) && I(e.catch), vi = Object.prototype.toString, zt = (e) => vi.call(e), xi = (e) => zt(e).slice(8, -1), yi = (e) => zt(e) === "[object Object]", xn = (e) => $(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Tt = /* @__PURE__ */ hn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), kt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Ei = /-(\w)/g, ve = kt((e) => e.replace(Ei, (t, n) => n ? n.toUpperCase() : "")), Ci = /\B([A-Z])/g, re = kt(
  (e) => e.replace(Ci, "-$1").toLowerCase()
), Rs = kt(
  (e) => e.charAt(0).toUpperCase() + e.slice(1)
), Gt = kt(
  (e) => e ? `on${Rs(e)}` : ""
), lt = (e, t) => !Object.is(e, t), qt = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, St = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Oi = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, qn = (e) => {
  const t = $(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Xn;
const en = () => Xn || (Xn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function yn(e) {
  if (R(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], i = $(s) ? wi(s) : yn(s);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else {
    if ($(e))
      return e;
    if (V(e))
      return e;
  }
}
const Ti = /;(?![^(]*\))/g, Ai = /:([^]+)/, Ri = /\/\*[^]*?\*\//g;
function wi(e) {
  const t = {};
  return e.replace(Ri, "").split(Ti).forEach((n) => {
    if (n) {
      const s = n.split(Ai);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function En(e) {
  let t = "";
  if ($(e))
    t = e;
  else if (R(e))
    for (let n = 0; n < e.length; n++) {
      const s = En(e[n]);
      s && (t += s + " ");
    }
  else if (V(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Si = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Ii = /* @__PURE__ */ hn(Si);
function ws(e) {
  return !!e || e === "";
}
let ie;
class Pi {
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
function Di(e, t = ie) {
  t && t.active && t.effects.push(e);
}
function Mi() {
  return ie;
}
const Cn = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Ss = (e) => (e.w & we) > 0, Is = (e) => (e.n & we) > 0, Ni = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= we;
}, zi = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const i = t[s];
      Ss(i) && !Is(i) ? i.delete(e) : t[n++] = i, i.w &= ~we, i.n &= ~we;
    }
    t.length = n;
  }
}, tn = /* @__PURE__ */ new WeakMap();
let tt = 0, we = 1;
const nn = 30;
let oe;
const Fe = Symbol(""), sn = Symbol("");
class On {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Di(this, s);
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
      return this.parent = oe, oe = this, Ae = !0, we = 1 << ++tt, tt <= nn ? Ni(this) : Yn(this), this.fn();
    } finally {
      tt <= nn && zi(this), we = 1 << --tt, oe = this.parent, Ae = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    oe === this ? this.deferStop = !0 : this.active && (Yn(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Yn(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let Ae = !0;
const Ps = [];
function Xe() {
  Ps.push(Ae), Ae = !1;
}
function Ye() {
  const e = Ps.pop();
  Ae = e === void 0 ? !0 : e;
}
function te(e, t, n) {
  if (Ae && oe) {
    let s = tn.get(e);
    s || tn.set(e, s = /* @__PURE__ */ new Map());
    let i = s.get(n);
    i || s.set(n, i = Cn()), Ds(i);
  }
}
function Ds(e, t) {
  let n = !1;
  tt <= nn ? Is(e) || (e.n |= we, n = !Ss(e)) : n = !e.has(oe), n && (e.add(oe), oe.deps.push(e));
}
function ye(e, t, n, s, i, r) {
  const l = tn.get(e);
  if (!l)
    return;
  let a = [];
  if (t === "clear")
    a = [...l.values()];
  else if (n === "length" && R(e)) {
    const u = Number(s);
    l.forEach((f, h) => {
      (h === "length" || h >= u) && a.push(f);
    });
  } else
    switch (n !== void 0 && a.push(l.get(n)), t) {
      case "add":
        R(e) ? xn(n) && a.push(l.get("length")) : (a.push(l.get(Fe)), st(e) && a.push(l.get(sn)));
        break;
      case "delete":
        R(e) || (a.push(l.get(Fe)), st(e) && a.push(l.get(sn)));
        break;
      case "set":
        st(e) && a.push(l.get(Fe));
        break;
    }
  if (a.length === 1)
    a[0] && rn(a[0]);
  else {
    const u = [];
    for (const f of a)
      f && u.push(...f);
    rn(Cn(u));
  }
}
function rn(e, t) {
  const n = R(e) ? e : [...e];
  for (const s of n)
    s.computed && Zn(s);
  for (const s of n)
    s.computed || Zn(s);
}
function Zn(e, t) {
  (e !== oe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const ki = /* @__PURE__ */ hn("__proto__,__v_isRef,__isVue"), Ms = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(vn)
), Fi = /* @__PURE__ */ Tn(), Ui = /* @__PURE__ */ Tn(!1, !0), Hi = /* @__PURE__ */ Tn(!0), Jn = /* @__PURE__ */ Li();
function Li() {
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
      Xe();
      const s = N(this)[t].apply(this, n);
      return Ye(), s;
    };
  }), e;
}
function ji(e) {
  const t = N(this);
  return te(t, "has", e), t.hasOwnProperty(e);
}
function Tn(e = !1, t = !1) {
  return function(s, i, r) {
    if (i === "__v_isReactive")
      return !e;
    if (i === "__v_isReadonly")
      return e;
    if (i === "__v_isShallow")
      return t;
    if (i === "__v_raw" && r === (e ? t ? sr : Us : t ? Fs : ks).get(s))
      return s;
    const l = R(s);
    if (!e) {
      if (l && M(Jn, i))
        return Reflect.get(Jn, i, r);
      if (i === "hasOwnProperty")
        return ji;
    }
    const a = Reflect.get(s, i, r);
    return (vn(i) ? Ms.has(i) : ki(i)) || (e || te(s, "get", i), t) ? a : Z(a) ? l && xn(i) ? a : a.value : V(a) ? e ? Hs(a) : wn(a) : a;
  };
}
const Vi = /* @__PURE__ */ Ns(), Ki = /* @__PURE__ */ Ns(!0);
function Ns(e = !1) {
  return function(n, s, i, r) {
    let l = n[s];
    if ($e(l) && Z(l) && !Z(i))
      return !1;
    if (!e && (!It(i) && !$e(i) && (l = N(l), i = N(i)), !R(n) && Z(l) && !Z(i)))
      return l.value = i, !0;
    const a = R(n) && xn(s) ? Number(s) < n.length : M(n, s), u = Reflect.set(n, s, i, r);
    return n === N(r) && (a ? lt(i, l) && ye(n, "set", s, i) : ye(n, "add", s, i)), u;
  };
}
function Bi(e, t) {
  const n = M(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && ye(e, "delete", t, void 0), s;
}
function Wi(e, t) {
  const n = Reflect.has(e, t);
  return (!vn(t) || !Ms.has(t)) && te(e, "has", t), n;
}
function $i(e) {
  return te(e, "iterate", R(e) ? "length" : Fe), Reflect.ownKeys(e);
}
const zs = {
  get: Fi,
  set: Vi,
  deleteProperty: Bi,
  has: Wi,
  ownKeys: $i
}, Gi = {
  get: Hi,
  set(e, t) {
    return !0;
  },
  deleteProperty(e, t) {
    return !0;
  }
}, qi = /* @__PURE__ */ K(
  {},
  zs,
  {
    get: Ui,
    set: Ki
  }
), An = (e) => e, Ft = (e) => Reflect.getPrototypeOf(e);
function vt(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const i = N(e), r = N(t);
  n || (t !== r && te(i, "get", t), te(i, "get", r));
  const { has: l } = Ft(i), a = s ? An : n ? In : ct;
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
function yt(e, t = !1) {
  return e = e.__v_raw, !t && te(N(e), "iterate", Fe), Reflect.get(e, "size", e);
}
function Qn(e) {
  e = N(e);
  const t = N(this);
  return Ft(t).has.call(t, e) || (t.add(e), ye(t, "add", e, e)), this;
}
function es(e, t) {
  t = N(t);
  const n = N(this), { has: s, get: i } = Ft(n);
  let r = s.call(n, e);
  r || (e = N(e), r = s.call(n, e));
  const l = i.call(n, e);
  return n.set(e, t), r ? lt(t, l) && ye(n, "set", e, t) : ye(n, "add", e, t), this;
}
function ts(e) {
  const t = N(this), { has: n, get: s } = Ft(t);
  let i = n.call(t, e);
  i || (e = N(e), i = n.call(t, e)), s && s.call(t, e);
  const r = t.delete(e);
  return i && ye(t, "delete", e, void 0), r;
}
function ns() {
  const e = N(this), t = e.size !== 0, n = e.clear();
  return t && ye(e, "clear", void 0, void 0), n;
}
function Et(e, t) {
  return function(s, i) {
    const r = this, l = r.__v_raw, a = N(l), u = t ? An : e ? In : ct;
    return !e && te(a, "iterate", Fe), l.forEach((f, h) => s.call(i, u(f), u(h), r));
  };
}
function Ct(e, t, n) {
  return function(...s) {
    const i = this.__v_raw, r = N(i), l = st(r), a = e === "entries" || e === Symbol.iterator && l, u = e === "keys" && l, f = i[e](...s), h = n ? An : t ? In : ct;
    return !t && te(
      r,
      "iterate",
      u ? sn : Fe
    ), {
      // iterator protocol
      next() {
        const { value: y, done: C } = f.next();
        return C ? { value: y, done: C } : {
          value: a ? [h(y[0]), h(y[1])] : h(y),
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
function Xi() {
  const e = {
    get(r) {
      return vt(this, r);
    },
    get size() {
      return yt(this);
    },
    has: xt,
    add: Qn,
    set: es,
    delete: ts,
    clear: ns,
    forEach: Et(!1, !1)
  }, t = {
    get(r) {
      return vt(this, r, !1, !0);
    },
    get size() {
      return yt(this);
    },
    has: xt,
    add: Qn,
    set: es,
    delete: ts,
    clear: ns,
    forEach: Et(!1, !0)
  }, n = {
    get(r) {
      return vt(this, r, !0);
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
    forEach: Et(!0, !1)
  }, s = {
    get(r) {
      return vt(this, r, !0, !0);
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
    forEach: Et(!0, !0)
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
  Yi,
  Zi,
  Ji,
  Qi
] = /* @__PURE__ */ Xi();
function Rn(e, t) {
  const n = t ? e ? Qi : Ji : e ? Zi : Yi;
  return (s, i, r) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? s : Reflect.get(
    M(n, i) && i in s ? n : s,
    i,
    r
  );
}
const er = {
  get: /* @__PURE__ */ Rn(!1, !1)
}, tr = {
  get: /* @__PURE__ */ Rn(!1, !0)
}, nr = {
  get: /* @__PURE__ */ Rn(!0, !1)
}, ks = /* @__PURE__ */ new WeakMap(), Fs = /* @__PURE__ */ new WeakMap(), Us = /* @__PURE__ */ new WeakMap(), sr = /* @__PURE__ */ new WeakMap();
function ir(e) {
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
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ir(xi(e));
}
function wn(e) {
  return $e(e) ? e : Sn(
    e,
    !1,
    zs,
    er,
    ks
  );
}
function or(e) {
  return Sn(
    e,
    !1,
    qi,
    tr,
    Fs
  );
}
function Hs(e) {
  return Sn(
    e,
    !0,
    Gi,
    nr,
    Us
  );
}
function Sn(e, t, n, s, i) {
  if (!V(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = i.get(e);
  if (r)
    return r;
  const l = rr(e);
  if (l === 0)
    return e;
  const a = new Proxy(
    e,
    l === 2 ? s : n
  );
  return i.set(e, a), a;
}
function Be(e) {
  return $e(e) ? Be(e.__v_raw) : !!(e && e.__v_isReactive);
}
function $e(e) {
  return !!(e && e.__v_isReadonly);
}
function It(e) {
  return !!(e && e.__v_isShallow);
}
function Ls(e) {
  return Be(e) || $e(e);
}
function N(e) {
  const t = e && e.__v_raw;
  return t ? N(t) : e;
}
function js(e) {
  return St(e, "__v_skip", !0), e;
}
const ct = (e) => V(e) ? wn(e) : e, In = (e) => V(e) ? Hs(e) : e;
function Vs(e) {
  Ae && oe && (e = N(e), Ds(e.dep || (e.dep = Cn())));
}
function Ks(e, t) {
  e = N(e);
  const n = e.dep;
  n && rn(n);
}
function Z(e) {
  return !!(e && e.__v_isRef === !0);
}
function ss(e) {
  return lr(e, !1);
}
function lr(e, t) {
  return Z(e) ? e : new cr(e, t);
}
class cr {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : N(t), this._value = n ? t : ct(t);
  }
  get value() {
    return Vs(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || It(t) || $e(t);
    t = n ? t : N(t), lt(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : ct(t), Ks(this));
  }
}
function ar(e) {
  return Z(e) ? e.value : e;
}
const ur = {
  get: (e, t, n) => ar(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const i = e[t];
    return Z(i) && !Z(n) ? (i.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Bs(e) {
  return Be(e) ? e : new Proxy(e, ur);
}
class fr {
  constructor(t, n, s, i) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new On(t, () => {
      this._dirty || (this._dirty = !0, Ks(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = s;
  }
  get value() {
    const t = N(this);
    return Vs(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function pr(e, t, n = !1) {
  let s, i;
  const r = I(e);
  return r ? (s = e, i = ae) : (s = e.get, i = e.set), new fr(s, i, r || !i, n);
}
function Re(e, t, n, s) {
  let i;
  try {
    i = s ? e(...s) : e();
  } catch (r) {
    Ut(r, t, n);
  }
  return i;
}
function ue(e, t, n, s) {
  if (I(e)) {
    const r = Re(e, t, n, s);
    return r && As(r) && r.catch((l) => {
      Ut(l, t, n);
    }), r;
  }
  const i = [];
  for (let r = 0; r < e.length; r++)
    i.push(ue(e[r], t, n, s));
  return i;
}
function Ut(e, t, n, s = !0) {
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
  dr(e, n, i, s);
}
function dr(e, t, n, s = !0) {
  console.error(e);
}
let at = !1, on = !1;
const Y = [];
let he = 0;
const We = [];
let be = null, ze = 0;
const Ws = /* @__PURE__ */ Promise.resolve();
let Pn = null;
function $s(e) {
  const t = Pn || Ws;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function _r(e) {
  let t = he + 1, n = Y.length;
  for (; t < n; ) {
    const s = t + n >>> 1;
    ut(Y[s]) < e ? t = s + 1 : n = s;
  }
  return t;
}
function Dn(e) {
  (!Y.length || !Y.includes(
    e,
    at && e.allowRecurse ? he + 1 : he
  )) && (e.id == null ? Y.push(e) : Y.splice(_r(e.id), 0, e), Gs());
}
function Gs() {
  !at && !on && (on = !0, Pn = Ws.then(Xs));
}
function mr(e) {
  const t = Y.indexOf(e);
  t > he && Y.splice(t, 1);
}
function hr(e) {
  R(e) ? We.push(...e) : (!be || !be.includes(
    e,
    e.allowRecurse ? ze + 1 : ze
  )) && We.push(e), Gs();
}
function is(e, t = at ? he + 1 : 0) {
  for (; t < Y.length; t++) {
    const n = Y[t];
    n && n.pre && (Y.splice(t, 1), t--, n());
  }
}
function qs(e) {
  if (We.length) {
    const t = [...new Set(We)];
    if (We.length = 0, be) {
      be.push(...t);
      return;
    }
    for (be = t, be.sort((n, s) => ut(n) - ut(s)), ze = 0; ze < be.length; ze++)
      be[ze]();
    be = null, ze = 0;
  }
}
const ut = (e) => e.id == null ? 1 / 0 : e.id, gr = (e, t) => {
  const n = ut(e) - ut(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function Xs(e) {
  on = !1, at = !0, Y.sort(gr);
  const t = ae;
  try {
    for (he = 0; he < Y.length; he++) {
      const n = Y[he];
      n && n.active !== !1 && Re(n, null, 14);
    }
  } finally {
    he = 0, Y.length = 0, qs(), at = !1, Pn = null, (Y.length || We.length) && Xs();
  }
}
function br(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const s = e.vnode.props || U;
  let i = n;
  const r = t.startsWith("update:"), l = r && t.slice(7);
  if (l && l in s) {
    const h = `${l === "modelValue" ? "model" : l}Modifiers`, { number: y, trim: C } = s[h] || U;
    C && (i = n.map((w) => $(w) ? w.trim() : w)), y && (i = n.map(Oi));
  }
  let a, u = s[a = Gt(t)] || // also try camelCase event handler (#2249)
  s[a = Gt(ve(t))];
  !u && r && (u = s[a = Gt(re(t))]), u && ue(
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
function Ys(e, t, n = !1) {
  const s = t.emitsCache, i = s.get(e);
  if (i !== void 0)
    return i;
  const r = e.emits;
  let l = {}, a = !1;
  if (!I(e)) {
    const u = (f) => {
      const h = Ys(f, t, !0);
      h && (a = !0, K(l, h));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !r && !a ? (V(e) && s.set(e, null), null) : (R(r) ? r.forEach((u) => l[u] = null) : K(l, r), V(e) && s.set(e, l), l);
}
function Ht(e, t) {
  return !e || !Nt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), M(e, t[0].toLowerCase() + t.slice(1)) || M(e, re(t)) || M(e, t));
}
let le = null, Zs = null;
function Pt(e) {
  const t = le;
  return le = e, Zs = e && e.type.__scopeId || null, t;
}
function vr(e, t = le, n) {
  if (!t || e._n)
    return e;
  const s = (...i) => {
    s._d && _s(-1);
    const r = Pt(t);
    let l;
    try {
      l = e(...i);
    } finally {
      Pt(r), s._d && _s(1);
    }
    return l;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Xt(e) {
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
    renderCache: y,
    data: C,
    setupState: w,
    ctx: L,
    inheritAttrs: D
  } = e;
  let B, G;
  const q = Pt(e);
  try {
    if (n.shapeFlag & 4) {
      const S = i || s;
      B = me(
        h.call(
          S,
          S,
          y,
          r,
          w,
          C,
          L
        )
      ), G = u;
    } else {
      const S = t;
      B = me(
        S.length > 1 ? S(
          r,
          { attrs: u, slots: a, emit: f }
        ) : S(
          r,
          null
          /* we know it doesn't need it */
        )
      ), G = t.props ? u : xr(u);
    }
  } catch (S) {
    ot.length = 0, Ut(S, e, 1), B = xe(ft);
  }
  let X = B;
  if (G && D !== !1) {
    const S = Object.keys(G), { shapeFlag: Ce } = X;
    S.length && Ce & 7 && (l && S.some(gn) && (G = yr(
      G,
      l
    )), X = Ge(X, G));
  }
  return n.dirs && (X = Ge(X), X.dirs = X.dirs ? X.dirs.concat(n.dirs) : n.dirs), n.transition && (X.transition = n.transition), B = X, Pt(q), B;
}
const xr = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Nt(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, yr = (e, t) => {
  const n = {};
  for (const s in e)
    (!gn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Er(e, t, n) {
  const { props: s, children: i, component: r } = e, { props: l, children: a, patchFlag: u } = t, f = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return s ? rs(s, l, f) : !!l;
    if (u & 8) {
      const h = t.dynamicProps;
      for (let y = 0; y < h.length; y++) {
        const C = h[y];
        if (l[C] !== s[C] && !Ht(f, C))
          return !0;
      }
    }
  } else
    return (i || a) && (!a || !a.$stable) ? !0 : s === l ? !1 : s ? l ? rs(s, l, f) : !0 : !!l;
  return !1;
}
function rs(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < s.length; i++) {
    const r = s[i];
    if (t[r] !== e[r] && !Ht(n, r))
      return !0;
  }
  return !1;
}
function Cr({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const Or = (e) => e.__isSuspense;
function Tr(e, t) {
  t && t.pendingBranch ? R(e) ? t.effects.push(...e) : t.effects.push(e) : hr(e);
}
function Ar(e, t) {
  return Mn(
    e,
    null,
    { flush: "post" }
  );
}
const Ot = {};
function Yt(e, t, n) {
  return Mn(e, t, n);
}
function Mn(e, t, { immediate: n, deep: s, flush: i, onTrack: r, onTrigger: l } = U) {
  var a;
  const u = Mi() === ((a = W) == null ? void 0 : a.scope) ? W : null;
  let f, h = !1, y = !1;
  if (Z(e) ? (f = () => e.value, h = It(e)) : Be(e) ? (f = () => e, s = !0) : R(e) ? (y = !0, h = e.some((S) => Be(S) || It(S)), f = () => e.map((S) => {
    if (Z(S))
      return S.value;
    if (Be(S))
      return Ve(S);
    if (I(S))
      return Re(S, u, 2);
  })) : I(e) ? t ? f = () => Re(e, u, 2) : f = () => {
    if (!(u && u.isUnmounted))
      return C && C(), ue(
        e,
        u,
        3,
        [w]
      );
  } : f = ae, t && s) {
    const S = f;
    f = () => Ve(S());
  }
  let C, w = (S) => {
    C = q.onStop = () => {
      Re(S, u, 4);
    };
  }, L;
  if (dt)
    if (w = ae, t ? n && ue(t, u, 3, [
      f(),
      y ? [] : void 0,
      w
    ]) : f(), i === "sync") {
      const S = Ao();
      L = S.__watcherHandles || (S.__watcherHandles = []);
    } else
      return ae;
  let D = y ? new Array(e.length).fill(Ot) : Ot;
  const B = () => {
    if (q.active)
      if (t) {
        const S = q.run();
        (s || h || (y ? S.some(
          (Ce, Ze) => lt(Ce, D[Ze])
        ) : lt(S, D))) && (C && C(), ue(t, u, 3, [
          S,
          // pass undefined as the old value when it's changed for the first time
          D === Ot ? void 0 : y && D[0] === Ot ? [] : D,
          w
        ]), D = S);
      } else
        q.run();
  };
  B.allowRecurse = !!t;
  let G;
  i === "sync" ? G = B : i === "post" ? G = () => ee(B, u && u.suspense) : (B.pre = !0, u && (B.id = u.uid), G = () => Dn(B));
  const q = new On(f, G);
  t ? n ? B() : D = q.run() : i === "post" ? ee(
    q.run.bind(q),
    u && u.suspense
  ) : q.run();
  const X = () => {
    q.stop(), u && u.scope && bn(u.scope.effects, q);
  };
  return L && L.push(X), X;
}
function Rr(e, t, n) {
  const s = this.proxy, i = $(e) ? e.includes(".") ? Js(s, e) : () => s[e] : e.bind(s, s);
  let r;
  I(t) ? r = t : (r = t.handler, n = t);
  const l = W;
  qe(this);
  const a = Mn(i, r.bind(s), n);
  return l ? qe(l) : Ue(), a;
}
function Js(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let i = 0; i < n.length && s; i++)
      s = s[n[i]];
    return s;
  };
}
function Ve(e, t) {
  if (!V(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), Z(e))
    Ve(e.value, t);
  else if (R(e))
    for (let n = 0; n < e.length; n++)
      Ve(e[n], t);
  else if (bi(e) || st(e))
    e.forEach((n) => {
      Ve(n, t);
    });
  else if (yi(e))
    for (const n in e)
      Ve(e[n], t);
  return e;
}
function Me(e, t, n, s) {
  const i = e.dirs, r = t && t.dirs;
  for (let l = 0; l < i.length; l++) {
    const a = i[l];
    r && (a.oldValue = r[l].value);
    let u = a.dir[s];
    u && (Xe(), ue(u, n, 8, [
      e.el,
      a,
      e,
      t
    ]), Ye());
  }
}
function wr(e, t) {
  return I(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => K({ name: e.name }, t, { setup: e }))()
  ) : e;
}
const At = (e) => !!e.type.__asyncLoader, Qs = (e) => e.type.__isKeepAlive;
function Sr(e, t) {
  ei(e, "a", t);
}
function Ir(e, t) {
  ei(e, "da", t);
}
function ei(e, t, n = W) {
  const s = e.__wdc || (e.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (Lt(t, s, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      Qs(i.parent.vnode) && Pr(s, t, n, i), i = i.parent;
  }
}
function Pr(e, t, n, s) {
  const i = Lt(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  zn(() => {
    bn(s[t], i);
  }, n);
}
function Lt(e, t, n = W, s = !1) {
  if (n) {
    const i = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...l) => {
      if (n.isUnmounted)
        return;
      Xe(), qe(n);
      const a = ue(t, n, e, l);
      return Ue(), Ye(), a;
    });
    return s ? i.unshift(r) : i.push(r), r;
  }
}
const Ee = (e) => (t, n = W) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!dt || e === "sp") && Lt(e, (...s) => t(...s), n)
), Dr = Ee("bm"), Nn = Ee("m"), Mr = Ee("bu"), Nr = Ee("u"), zr = Ee("bum"), zn = Ee("um"), kr = Ee("sp"), Fr = Ee(
  "rtg"
), Ur = Ee(
  "rtc"
);
function Hr(e, t = W) {
  Lt("ec", e, t);
}
const Lr = Symbol.for("v-ndc"), ln = (e) => e ? fi(e) ? Ln(e) || e.proxy : ln(e.parent) : null, it = (
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
    $parent: (e) => ln(e.parent),
    $root: (e) => ln(e.root),
    $emit: (e) => e.emit,
    $options: (e) => kn(e),
    $forceUpdate: (e) => e.f || (e.f = () => Dn(e.update)),
    $nextTick: (e) => e.n || (e.n = $s.bind(e.proxy)),
    $watch: (e) => Rr.bind(e)
  })
), Zt = (e, t) => e !== U && !e.__isScriptSetup && M(e, t), jr = {
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
        if (Zt(s, t))
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
        cn && (l[t] = 0);
      }
    }
    const h = it[t];
    let y, C;
    if (h)
      return t === "$attrs" && te(e, "get", t), h(e);
    if (
      // css module (injected by vue-loader)
      (y = a.__cssModules) && (y = y[t])
    )
      return y;
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
    return Zt(i, t) ? (i[t] = n, !0) : s !== U && M(s, t) ? (s[t] = n, !0) : M(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: i, propsOptions: r }
  }, l) {
    let a;
    return !!n[l] || e !== U && M(e, l) || Zt(t, l) || (a = r[0]) && M(a, l) || M(s, l) || M(it, l) || M(i.config.globalProperties, l);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : M(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function os(e) {
  return R(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let cn = !0;
function Vr(e) {
  const t = kn(e), n = e.proxy, s = e.ctx;
  cn = !1, t.beforeCreate && ls(t.beforeCreate, e, "bc");
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
    beforeMount: y,
    mounted: C,
    beforeUpdate: w,
    updated: L,
    activated: D,
    deactivated: B,
    beforeDestroy: G,
    beforeUnmount: q,
    destroyed: X,
    unmounted: S,
    render: Ce,
    renderTracked: Ze,
    renderTriggered: _t,
    errorCaptured: Se,
    serverPrefetch: Kt,
    // public API
    expose: Ie,
    inheritAttrs: Je,
    // assets
    components: mt,
    directives: ht,
    filters: Bt
  } = t;
  if (f && Kr(f, s, null), l)
    for (const H in l) {
      const k = l[H];
      I(k) && (s[H] = k.bind(n));
    }
  if (i) {
    const H = i.call(n, n);
    V(H) && (e.data = wn(H));
  }
  if (cn = !0, r)
    for (const H in r) {
      const k = r[H], Pe = I(k) ? k.bind(n, n) : I(k.get) ? k.get.bind(n, n) : ae, gt = !I(k) && I(k.set) ? k.set.bind(n) : ae, De = pn({
        get: Pe,
        set: gt
      });
      Object.defineProperty(s, H, {
        enumerable: !0,
        configurable: !0,
        get: () => De.value,
        set: (fe) => De.value = fe
      });
    }
  if (a)
    for (const H in a)
      ti(a[H], s, n, H);
  if (u) {
    const H = I(u) ? u.call(n) : u;
    Reflect.ownKeys(H).forEach((k) => {
      Xr(k, H[k]);
    });
  }
  h && ls(h, e, "c");
  function J(H, k) {
    R(k) ? k.forEach((Pe) => H(Pe.bind(n))) : k && H(k.bind(n));
  }
  if (J(Dr, y), J(Nn, C), J(Mr, w), J(Nr, L), J(Sr, D), J(Ir, B), J(Hr, Se), J(Ur, Ze), J(Fr, _t), J(zr, q), J(zn, S), J(kr, Kt), R(Ie))
    if (Ie.length) {
      const H = e.exposed || (e.exposed = {});
      Ie.forEach((k) => {
        Object.defineProperty(H, k, {
          get: () => n[k],
          set: (Pe) => n[k] = Pe
        });
      });
    } else
      e.exposed || (e.exposed = {});
  Ce && e.render === ae && (e.render = Ce), Je != null && (e.inheritAttrs = Je), mt && (e.components = mt), ht && (e.directives = ht);
}
function Kr(e, t, n = ae) {
  R(e) && (e = an(e));
  for (const s in e) {
    const i = e[s];
    let r;
    V(i) ? "default" in i ? r = Rt(
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
function ls(e, t, n) {
  ue(
    R(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function ti(e, t, n, s) {
  const i = s.includes(".") ? Js(n, s) : () => n[s];
  if ($(e)) {
    const r = t[e];
    I(r) && Yt(i, r);
  } else if (I(e))
    Yt(i, e.bind(n));
  else if (V(e))
    if (R(e))
      e.forEach((r) => ti(r, t, n, s));
    else {
      const r = I(e.handler) ? e.handler.bind(n) : t[e.handler];
      I(r) && Yt(i, r, e);
    }
}
function kn(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: i,
    optionsCache: r,
    config: { optionMergeStrategies: l }
  } = e.appContext, a = r.get(t);
  let u;
  return a ? u = a : !i.length && !n && !s ? u = t : (u = {}, i.length && i.forEach(
    (f) => Dt(u, f, l, !0)
  ), Dt(u, t, l)), V(t) && r.set(t, u), u;
}
function Dt(e, t, n, s = !1) {
  const { mixins: i, extends: r } = t;
  r && Dt(e, r, n, !0), i && i.forEach(
    (l) => Dt(e, l, n, !0)
  );
  for (const l in t)
    if (!(s && l === "expose")) {
      const a = Br[l] || n && n[l];
      e[l] = a ? a(e[l], t[l]) : t[l];
    }
  return e;
}
const Br = {
  data: cs,
  props: as,
  emits: as,
  // objects
  methods: nt,
  computed: nt,
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
  components: nt,
  directives: nt,
  // watch
  watch: $r,
  // provide / inject
  provide: cs,
  inject: Wr
};
function cs(e, t) {
  return t ? e ? function() {
    return K(
      I(e) ? e.call(this, this) : e,
      I(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Wr(e, t) {
  return nt(an(e), an(t));
}
function an(e) {
  if (R(e)) {
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
function nt(e, t) {
  return e ? K(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function as(e, t) {
  return e ? R(e) && R(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : K(
    /* @__PURE__ */ Object.create(null),
    os(e),
    os(t ?? {})
  ) : t;
}
function $r(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = K(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Q(e[s], t[s]);
  return n;
}
function ni() {
  return {
    app: null,
    config: {
      isNativeTag: mi,
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
let Gr = 0;
function qr(e, t) {
  return function(s, i = null) {
    I(s) || (s = K({}, s)), i != null && !V(i) && (i = null);
    const r = ni(), l = /* @__PURE__ */ new Set();
    let a = !1;
    const u = r.app = {
      _uid: Gr++,
      _component: s,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: Ro,
      get config() {
        return r.config;
      },
      set config(f) {
      },
      use(f, ...h) {
        return l.has(f) || (f && I(f.install) ? (l.add(f), f.install(u, ...h)) : I(f) && (l.add(f), f(u, ...h))), u;
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
      mount(f, h, y) {
        if (!a) {
          const C = xe(
            s,
            i
          );
          return C.appContext = r, h && t ? t(C, f) : e(C, f, y), a = !0, u._container = f, f.__vue_app__ = u, Ln(C.component) || C.component.proxy;
        }
      },
      unmount() {
        a && (e(null, u._container), delete u._container.__vue_app__);
      },
      provide(f, h) {
        return r.provides[f] = h, u;
      },
      runWithContext(f) {
        Mt = u;
        try {
          return f();
        } finally {
          Mt = null;
        }
      }
    };
    return u;
  };
}
let Mt = null;
function Xr(e, t) {
  if (W) {
    let n = W.provides;
    const s = W.parent && W.parent.provides;
    s === n && (n = W.provides = Object.create(s)), n[e] = t;
  }
}
function Rt(e, t, n = !1) {
  const s = W || le;
  if (s || Mt) {
    const i = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : Mt._context.provides;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return n && I(t) ? t.call(s && s.proxy) : t;
  }
}
function Yr(e, t, n, s = !1) {
  const i = {}, r = {};
  St(r, Vt, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), si(e, t, i, r);
  for (const l in e.propsOptions[0])
    l in i || (i[l] = void 0);
  n ? e.props = s ? i : or(i) : e.type.props ? e.props = i : e.props = r, e.attrs = r;
}
function Zr(e, t, n, s) {
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
      for (let y = 0; y < h.length; y++) {
        let C = h[y];
        if (Ht(e.emitsOptions, C))
          continue;
        const w = t[C];
        if (u)
          if (M(r, C))
            w !== r[C] && (r[C] = w, f = !0);
          else {
            const L = ve(C);
            i[L] = un(
              u,
              a,
              L,
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
    si(e, t, i, r) && (f = !0);
    let h;
    for (const y in a)
      (!t || // for camelCase
      !M(t, y) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((h = re(y)) === y || !M(t, h))) && (u ? n && // for camelCase
      (n[y] !== void 0 || // for kebab-case
      n[h] !== void 0) && (i[y] = un(
        u,
        a,
        y,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete i[y]);
    if (r !== a)
      for (const y in r)
        (!t || !M(t, y)) && (delete r[y], f = !0);
  }
  f && ye(e, "set", "$attrs");
}
function si(e, t, n, s) {
  const [i, r] = e.propsOptions;
  let l = !1, a;
  if (t)
    for (let u in t) {
      if (Tt(u))
        continue;
      const f = t[u];
      let h;
      i && M(i, h = ve(u)) ? !r || !r.includes(h) ? n[h] = f : (a || (a = {}))[h] = f : Ht(e.emitsOptions, u) || (!(u in s) || f !== s[u]) && (s[u] = f, l = !0);
    }
  if (r) {
    const u = N(n), f = a || U;
    for (let h = 0; h < r.length; h++) {
      const y = r[h];
      n[y] = un(
        i,
        u,
        y,
        f[y],
        e,
        !M(f, y)
      );
    }
  }
  return l;
}
function un(e, t, n, s, i, r) {
  const l = e[n];
  if (l != null) {
    const a = M(l, "default");
    if (a && s === void 0) {
      const u = l.default;
      if (l.type !== Function && !l.skipFactory && I(u)) {
        const { propsDefaults: f } = i;
        n in f ? s = f[n] : (qe(i), s = f[n] = u.call(
          null,
          t
        ), Ue());
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
function ii(e, t, n = !1) {
  const s = t.propsCache, i = s.get(e);
  if (i)
    return i;
  const r = e.props, l = {}, a = [];
  let u = !1;
  if (!I(e)) {
    const h = (y) => {
      u = !0;
      const [C, w] = ii(y, t, !0);
      K(l, C), w && a.push(...w);
    };
    !n && t.mixins.length && t.mixins.forEach(h), e.extends && h(e.extends), e.mixins && e.mixins.forEach(h);
  }
  if (!r && !u)
    return V(e) && s.set(e, Ke), Ke;
  if (R(r))
    for (let h = 0; h < r.length; h++) {
      const y = ve(r[h]);
      us(y) && (l[y] = U);
    }
  else if (r)
    for (const h in r) {
      const y = ve(h);
      if (us(y)) {
        const C = r[h], w = l[y] = R(C) || I(C) ? { type: C } : K({}, C);
        if (w) {
          const L = ds(Boolean, w.type), D = ds(String, w.type);
          w[
            0
            /* shouldCast */
          ] = L > -1, w[
            1
            /* shouldCastTrue */
          ] = D < 0 || L < D, (L > -1 || M(w, "default")) && a.push(y);
        }
      }
    }
  const f = [l, a];
  return V(e) && s.set(e, f), f;
}
function us(e) {
  return e[0] !== "$";
}
function fs(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function ps(e, t) {
  return fs(e) === fs(t);
}
function ds(e, t) {
  return R(t) ? t.findIndex((n) => ps(n, e)) : I(t) && ps(t, e) ? 0 : -1;
}
const ri = (e) => e[0] === "_" || e === "$stable", Fn = (e) => R(e) ? e.map(me) : [me(e)], Jr = (e, t, n) => {
  if (t._n)
    return t;
  const s = vr((...i) => Fn(t(...i)), n);
  return s._c = !1, s;
}, oi = (e, t, n) => {
  const s = e._ctx;
  for (const i in e) {
    if (ri(i))
      continue;
    const r = e[i];
    if (I(r))
      t[i] = Jr(i, r, s);
    else if (r != null) {
      const l = Fn(r);
      t[i] = () => l;
    }
  }
}, li = (e, t) => {
  const n = Fn(t);
  e.slots.default = () => n;
}, Qr = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = N(t), St(t, "_", n)) : oi(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && li(e, t);
  St(e.slots, Vt, 1);
}, eo = (e, t, n) => {
  const { vnode: s, slots: i } = e;
  let r = !0, l = U;
  if (s.shapeFlag & 32) {
    const a = t._;
    a ? n && a === 1 ? r = !1 : (K(i, t), !n && a === 1 && delete i._) : (r = !t.$stable, oi(t, i)), l = t;
  } else
    t && (li(e, t), l = { default: 1 });
  if (r)
    for (const a in i)
      !ri(a) && !(a in l) && delete i[a];
};
function fn(e, t, n, s, i = !1) {
  if (R(e)) {
    e.forEach(
      (C, w) => fn(
        C,
        t && (R(t) ? t[w] : t),
        n,
        s,
        i
      )
    );
    return;
  }
  if (At(s) && !i)
    return;
  const r = s.shapeFlag & 4 ? Ln(s.component) || s.component.proxy : s.el, l = i ? null : r, { i: a, r: u } = e, f = t && t.r, h = a.refs === U ? a.refs = {} : a.refs, y = a.setupState;
  if (f != null && f !== u && ($(f) ? (h[f] = null, M(y, f) && (y[f] = null)) : Z(f) && (f.value = null)), I(u))
    Re(u, a, 12, [l, h]);
  else {
    const C = $(u), w = Z(u);
    if (C || w) {
      const L = () => {
        if (e.f) {
          const D = C ? M(y, u) ? y[u] : h[u] : u.value;
          i ? R(D) && bn(D, r) : R(D) ? D.includes(r) || D.push(r) : C ? (h[u] = [r], M(y, u) && (y[u] = h[u])) : (u.value = [r], e.k && (h[e.k] = u.value));
        } else
          C ? (h[u] = l, M(y, u) && (y[u] = l)) : w && (u.value = l, e.k && (h[e.k] = l));
      };
      l ? (L.id = -1, ee(L, n)) : L();
    }
  }
}
const ee = Tr;
function to(e) {
  return no(e);
}
function no(e, t) {
  const n = en();
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
    parentNode: y,
    nextSibling: C,
    setScopeId: w = ae,
    insertStaticContent: L
  } = e, D = (o, c, p, _ = null, d = null, b = null, x = !1, g = null, v = !!c.dynamicChildren) => {
    if (o === c)
      return;
    o && !et(o, c) && (_ = bt(o), fe(o, d, b, !0), o = null), c.patchFlag === -2 && (v = !1, c.dynamicChildren = null);
    const { type: m, ref: O, shapeFlag: E } = c;
    switch (m) {
      case jt:
        B(o, c, p, _);
        break;
      case ft:
        G(o, c, p, _);
        break;
      case rt:
        o == null && q(c, p, _, x);
        break;
      case _e:
        mt(
          o,
          c,
          p,
          _,
          d,
          b,
          x,
          g,
          v
        );
        break;
      default:
        E & 1 ? Ce(
          o,
          c,
          p,
          _,
          d,
          b,
          x,
          g,
          v
        ) : E & 6 ? ht(
          o,
          c,
          p,
          _,
          d,
          b,
          x,
          g,
          v
        ) : (E & 64 || E & 128) && m.process(
          o,
          c,
          p,
          _,
          d,
          b,
          x,
          g,
          v,
          He
        );
    }
    O != null && d && fn(O, o && o.ref, b, c || o, !c);
  }, B = (o, c, p, _) => {
    if (o == null)
      s(
        c.el = a(c.children),
        p,
        _
      );
    else {
      const d = c.el = o.el;
      c.children !== o.children && f(d, c.children);
    }
  }, G = (o, c, p, _) => {
    o == null ? s(
      c.el = u(c.children || ""),
      p,
      _
    ) : c.el = o.el;
  }, q = (o, c, p, _) => {
    [o.el, o.anchor] = L(
      o.children,
      c,
      p,
      _,
      o.el,
      o.anchor
    );
  }, X = ({ el: o, anchor: c }, p, _) => {
    let d;
    for (; o && o !== c; )
      d = C(o), s(o, p, _), o = d;
    s(c, p, _);
  }, S = ({ el: o, anchor: c }) => {
    let p;
    for (; o && o !== c; )
      p = C(o), i(o), o = p;
    i(c);
  }, Ce = (o, c, p, _, d, b, x, g, v) => {
    x = x || c.type === "svg", o == null ? Ze(
      c,
      p,
      _,
      d,
      b,
      x,
      g,
      v
    ) : Kt(
      o,
      c,
      d,
      b,
      x,
      g,
      v
    );
  }, Ze = (o, c, p, _, d, b, x, g) => {
    let v, m;
    const { type: O, props: E, shapeFlag: T, transition: A, dirs: P } = o;
    if (v = o.el = l(
      o.type,
      b,
      E && E.is,
      E
    ), T & 8 ? h(v, o.children) : T & 16 && Se(
      o.children,
      v,
      null,
      _,
      d,
      b && O !== "foreignObject",
      x,
      g
    ), P && Me(o, null, _, "created"), _t(v, o, o.scopeId, x, _), E) {
      for (const z in E)
        z !== "value" && !Tt(z) && r(
          v,
          z,
          null,
          E[z],
          b,
          o.children,
          _,
          d,
          ge
        );
      "value" in E && r(v, "value", null, E.value), (m = E.onVnodeBeforeMount) && de(m, _, o);
    }
    P && Me(o, null, _, "beforeMount");
    const F = (!d || d && !d.pendingBranch) && A && !A.persisted;
    F && A.beforeEnter(v), s(v, c, p), ((m = E && E.onVnodeMounted) || F || P) && ee(() => {
      m && de(m, _, o), F && A.enter(v), P && Me(o, null, _, "mounted");
    }, d);
  }, _t = (o, c, p, _, d) => {
    if (p && w(o, p), _)
      for (let b = 0; b < _.length; b++)
        w(o, _[b]);
    if (d) {
      let b = d.subTree;
      if (c === b) {
        const x = d.vnode;
        _t(
          o,
          x,
          x.scopeId,
          x.slotScopeIds,
          d.parent
        );
      }
    }
  }, Se = (o, c, p, _, d, b, x, g, v = 0) => {
    for (let m = v; m < o.length; m++) {
      const O = o[m] = g ? Te(o[m]) : me(o[m]);
      D(
        null,
        O,
        c,
        p,
        _,
        d,
        b,
        x,
        g
      );
    }
  }, Kt = (o, c, p, _, d, b, x) => {
    const g = c.el = o.el;
    let { patchFlag: v, dynamicChildren: m, dirs: O } = c;
    v |= o.patchFlag & 16;
    const E = o.props || U, T = c.props || U;
    let A;
    p && Ne(p, !1), (A = T.onVnodeBeforeUpdate) && de(A, p, c, o), O && Me(c, o, p, "beforeUpdate"), p && Ne(p, !0);
    const P = d && c.type !== "foreignObject";
    if (m ? Ie(
      o.dynamicChildren,
      m,
      g,
      p,
      _,
      P,
      b
    ) : x || k(
      o,
      c,
      g,
      null,
      p,
      _,
      P,
      b,
      !1
    ), v > 0) {
      if (v & 16)
        Je(
          g,
          c,
          E,
          T,
          p,
          _,
          d
        );
      else if (v & 2 && E.class !== T.class && r(g, "class", null, T.class, d), v & 4 && r(g, "style", E.style, T.style, d), v & 8) {
        const F = c.dynamicProps;
        for (let z = 0; z < F.length; z++) {
          const j = F[z], se = E[j], Le = T[j];
          (Le !== se || j === "value") && r(
            g,
            j,
            se,
            Le,
            d,
            o.children,
            p,
            _,
            ge
          );
        }
      }
      v & 1 && o.children !== c.children && h(g, c.children);
    } else
      !x && m == null && Je(
        g,
        c,
        E,
        T,
        p,
        _,
        d
      );
    ((A = T.onVnodeUpdated) || O) && ee(() => {
      A && de(A, p, c, o), O && Me(c, o, p, "updated");
    }, _);
  }, Ie = (o, c, p, _, d, b, x) => {
    for (let g = 0; g < c.length; g++) {
      const v = o[g], m = c[g], O = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        v.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (v.type === _e || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !et(v, m) || // - In the case of a component, it could contain anything.
        v.shapeFlag & 70) ? y(v.el) : (
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
        _,
        d,
        b,
        x,
        !0
      );
    }
  }, Je = (o, c, p, _, d, b, x) => {
    if (p !== _) {
      if (p !== U)
        for (const g in p)
          !Tt(g) && !(g in _) && r(
            o,
            g,
            p[g],
            null,
            x,
            c.children,
            d,
            b,
            ge
          );
      for (const g in _) {
        if (Tt(g))
          continue;
        const v = _[g], m = p[g];
        v !== m && g !== "value" && r(
          o,
          g,
          m,
          v,
          x,
          c.children,
          d,
          b,
          ge
        );
      }
      "value" in _ && r(o, "value", p.value, _.value);
    }
  }, mt = (o, c, p, _, d, b, x, g, v) => {
    const m = c.el = o ? o.el : a(""), O = c.anchor = o ? o.anchor : a("");
    let { patchFlag: E, dynamicChildren: T, slotScopeIds: A } = c;
    A && (g = g ? g.concat(A) : A), o == null ? (s(m, p, _), s(O, p, _), Se(
      c.children,
      p,
      O,
      d,
      b,
      x,
      g,
      v
    )) : E > 0 && E & 64 && T && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    o.dynamicChildren ? (Ie(
      o.dynamicChildren,
      T,
      p,
      d,
      b,
      x,
      g
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (c.key != null || d && c === d.subTree) && ci(
      o,
      c,
      !0
      /* shallow */
    )) : k(
      o,
      c,
      p,
      O,
      d,
      b,
      x,
      g,
      v
    );
  }, ht = (o, c, p, _, d, b, x, g, v) => {
    c.slotScopeIds = g, o == null ? c.shapeFlag & 512 ? d.ctx.activate(
      c,
      p,
      _,
      x,
      v
    ) : Bt(
      c,
      p,
      _,
      d,
      b,
      x,
      v
    ) : Vn(o, c, v);
  }, Bt = (o, c, p, _, d, b, x) => {
    const g = o.component = bo(
      o,
      _,
      d
    );
    if (Qs(o) && (g.ctx.renderer = He), xo(g), g.asyncDep) {
      if (d && d.registerDep(g, J), !o.el) {
        const v = g.subTree = xe(ft);
        G(null, v, c, p);
      }
      return;
    }
    J(
      g,
      o,
      c,
      p,
      d,
      b,
      x
    );
  }, Vn = (o, c, p) => {
    const _ = c.component = o.component;
    if (Er(o, c, p))
      if (_.asyncDep && !_.asyncResolved) {
        H(_, c, p);
        return;
      } else
        _.next = c, mr(_.update), _.update();
    else
      c.el = o.el, _.vnode = c;
  }, J = (o, c, p, _, d, b, x) => {
    const g = () => {
      if (o.isMounted) {
        let { next: O, bu: E, u: T, parent: A, vnode: P } = o, F = O, z;
        Ne(o, !1), O ? (O.el = P.el, H(o, O, x)) : O = P, E && qt(E), (z = O.props && O.props.onVnodeBeforeUpdate) && de(z, A, O, P), Ne(o, !0);
        const j = Xt(o), se = o.subTree;
        o.subTree = j, D(
          se,
          j,
          // parent may have changed if it's in a teleport
          y(se.el),
          // anchor may have changed if it's in a fragment
          bt(se),
          o,
          d,
          b
        ), O.el = j.el, F === null && Cr(o, j.el), T && ee(T, d), (z = O.props && O.props.onVnodeUpdated) && ee(
          () => de(z, A, O, P),
          d
        );
      } else {
        let O;
        const { el: E, props: T } = c, { bm: A, m: P, parent: F } = o, z = At(c);
        if (Ne(o, !1), A && qt(A), !z && (O = T && T.onVnodeBeforeMount) && de(O, F, c), Ne(o, !0), E && $t) {
          const j = () => {
            o.subTree = Xt(o), $t(
              E,
              o.subTree,
              o,
              d,
              null
            );
          };
          z ? c.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !o.isUnmounted && j()
          ) : j();
        } else {
          const j = o.subTree = Xt(o);
          D(
            null,
            j,
            p,
            _,
            o,
            d,
            b
          ), c.el = j.el;
        }
        if (P && ee(P, d), !z && (O = T && T.onVnodeMounted)) {
          const j = c;
          ee(
            () => de(O, F, j),
            d
          );
        }
        (c.shapeFlag & 256 || F && At(F.vnode) && F.vnode.shapeFlag & 256) && o.a && ee(o.a, d), o.isMounted = !0, c = p = _ = null;
      }
    }, v = o.effect = new On(
      g,
      () => Dn(m),
      o.scope
      // track it in component's effect scope
    ), m = o.update = () => v.run();
    m.id = o.uid, Ne(o, !0), m();
  }, H = (o, c, p) => {
    c.component = o;
    const _ = o.vnode.props;
    o.vnode = c, o.next = null, Zr(o, c.props, _, p), eo(o, c.children, p), Xe(), is(), Ye();
  }, k = (o, c, p, _, d, b, x, g, v = !1) => {
    const m = o && o.children, O = o ? o.shapeFlag : 0, E = c.children, { patchFlag: T, shapeFlag: A } = c;
    if (T > 0) {
      if (T & 128) {
        gt(
          m,
          E,
          p,
          _,
          d,
          b,
          x,
          g,
          v
        );
        return;
      } else if (T & 256) {
        Pe(
          m,
          E,
          p,
          _,
          d,
          b,
          x,
          g,
          v
        );
        return;
      }
    }
    A & 8 ? (O & 16 && ge(m, d, b), E !== m && h(p, E)) : O & 16 ? A & 16 ? gt(
      m,
      E,
      p,
      _,
      d,
      b,
      x,
      g,
      v
    ) : ge(m, d, b, !0) : (O & 8 && h(p, ""), A & 16 && Se(
      E,
      p,
      _,
      d,
      b,
      x,
      g,
      v
    ));
  }, Pe = (o, c, p, _, d, b, x, g, v) => {
    o = o || Ke, c = c || Ke;
    const m = o.length, O = c.length, E = Math.min(m, O);
    let T;
    for (T = 0; T < E; T++) {
      const A = c[T] = v ? Te(c[T]) : me(c[T]);
      D(
        o[T],
        A,
        p,
        null,
        d,
        b,
        x,
        g,
        v
      );
    }
    m > O ? ge(
      o,
      d,
      b,
      !0,
      !1,
      E
    ) : Se(
      c,
      p,
      _,
      d,
      b,
      x,
      g,
      v,
      E
    );
  }, gt = (o, c, p, _, d, b, x, g, v) => {
    let m = 0;
    const O = c.length;
    let E = o.length - 1, T = O - 1;
    for (; m <= E && m <= T; ) {
      const A = o[m], P = c[m] = v ? Te(c[m]) : me(c[m]);
      if (et(A, P))
        D(
          A,
          P,
          p,
          null,
          d,
          b,
          x,
          g,
          v
        );
      else
        break;
      m++;
    }
    for (; m <= E && m <= T; ) {
      const A = o[E], P = c[T] = v ? Te(c[T]) : me(c[T]);
      if (et(A, P))
        D(
          A,
          P,
          p,
          null,
          d,
          b,
          x,
          g,
          v
        );
      else
        break;
      E--, T--;
    }
    if (m > E) {
      if (m <= T) {
        const A = T + 1, P = A < O ? c[A].el : _;
        for (; m <= T; )
          D(
            null,
            c[m] = v ? Te(c[m]) : me(c[m]),
            p,
            P,
            d,
            b,
            x,
            g,
            v
          ), m++;
      }
    } else if (m > T)
      for (; m <= E; )
        fe(o[m], d, b, !0), m++;
    else {
      const A = m, P = m, F = /* @__PURE__ */ new Map();
      for (m = P; m <= T; m++) {
        const ne = c[m] = v ? Te(c[m]) : me(c[m]);
        ne.key != null && F.set(ne.key, m);
      }
      let z, j = 0;
      const se = T - P + 1;
      let Le = !1, Wn = 0;
      const Qe = new Array(se);
      for (m = 0; m < se; m++)
        Qe[m] = 0;
      for (m = A; m <= E; m++) {
        const ne = o[m];
        if (j >= se) {
          fe(ne, d, b, !0);
          continue;
        }
        let pe;
        if (ne.key != null)
          pe = F.get(ne.key);
        else
          for (z = P; z <= T; z++)
            if (Qe[z - P] === 0 && et(ne, c[z])) {
              pe = z;
              break;
            }
        pe === void 0 ? fe(ne, d, b, !0) : (Qe[pe - P] = m + 1, pe >= Wn ? Wn = pe : Le = !0, D(
          ne,
          c[pe],
          p,
          null,
          d,
          b,
          x,
          g,
          v
        ), j++);
      }
      const $n = Le ? so(Qe) : Ke;
      for (z = $n.length - 1, m = se - 1; m >= 0; m--) {
        const ne = P + m, pe = c[ne], Gn = ne + 1 < O ? c[ne + 1].el : _;
        Qe[m] === 0 ? D(
          null,
          pe,
          p,
          Gn,
          d,
          b,
          x,
          g,
          v
        ) : Le && (z < 0 || m !== $n[z] ? De(pe, p, Gn, 2) : z--);
      }
    }
  }, De = (o, c, p, _, d = null) => {
    const { el: b, type: x, transition: g, children: v, shapeFlag: m } = o;
    if (m & 6) {
      De(o.component.subTree, c, p, _);
      return;
    }
    if (m & 128) {
      o.suspense.move(c, p, _);
      return;
    }
    if (m & 64) {
      x.move(o, c, p, He);
      return;
    }
    if (x === _e) {
      s(b, c, p);
      for (let E = 0; E < v.length; E++)
        De(v[E], c, p, _);
      s(o.anchor, c, p);
      return;
    }
    if (x === rt) {
      X(o, c, p);
      return;
    }
    if (_ !== 2 && m & 1 && g)
      if (_ === 0)
        g.beforeEnter(b), s(b, c, p), ee(() => g.enter(b), d);
      else {
        const { leave: E, delayLeave: T, afterLeave: A } = g, P = () => s(b, c, p), F = () => {
          E(b, () => {
            P(), A && A();
          });
        };
        T ? T(b, P, F) : F();
      }
    else
      s(b, c, p);
  }, fe = (o, c, p, _ = !1, d = !1) => {
    const {
      type: b,
      props: x,
      ref: g,
      children: v,
      dynamicChildren: m,
      shapeFlag: O,
      patchFlag: E,
      dirs: T
    } = o;
    if (g != null && fn(g, null, p, o, !0), O & 256) {
      c.ctx.deactivate(o);
      return;
    }
    const A = O & 1 && T, P = !At(o);
    let F;
    if (P && (F = x && x.onVnodeBeforeUnmount) && de(F, c, o), O & 6)
      _i(o.component, p, _);
    else {
      if (O & 128) {
        o.suspense.unmount(p, _);
        return;
      }
      A && Me(o, null, c, "beforeUnmount"), O & 64 ? o.type.remove(
        o,
        c,
        p,
        d,
        He,
        _
      ) : m && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (b !== _e || E > 0 && E & 64) ? ge(
        m,
        c,
        p,
        !1,
        !0
      ) : (b === _e && E & 384 || !d && O & 16) && ge(v, c, p), _ && Kn(o);
    }
    (P && (F = x && x.onVnodeUnmounted) || A) && ee(() => {
      F && de(F, c, o), A && Me(o, null, c, "unmounted");
    }, p);
  }, Kn = (o) => {
    const { type: c, el: p, anchor: _, transition: d } = o;
    if (c === _e) {
      di(p, _);
      return;
    }
    if (c === rt) {
      S(o);
      return;
    }
    const b = () => {
      i(p), d && !d.persisted && d.afterLeave && d.afterLeave();
    };
    if (o.shapeFlag & 1 && d && !d.persisted) {
      const { leave: x, delayLeave: g } = d, v = () => x(p, b);
      g ? g(o.el, b, v) : v();
    } else
      b();
  }, di = (o, c) => {
    let p;
    for (; o !== c; )
      p = C(o), i(o), o = p;
    i(c);
  }, _i = (o, c, p) => {
    const { bum: _, scope: d, update: b, subTree: x, um: g } = o;
    _ && qt(_), d.stop(), b && (b.active = !1, fe(x, o, c, p)), g && ee(g, c), ee(() => {
      o.isUnmounted = !0;
    }, c), c && c.pendingBranch && !c.isUnmounted && o.asyncDep && !o.asyncResolved && o.suspenseId === c.pendingId && (c.deps--, c.deps === 0 && c.resolve());
  }, ge = (o, c, p, _ = !1, d = !1, b = 0) => {
    for (let x = b; x < o.length; x++)
      fe(o[x], c, p, _, d);
  }, bt = (o) => o.shapeFlag & 6 ? bt(o.component.subTree) : o.shapeFlag & 128 ? o.suspense.next() : C(o.anchor || o.el), Bn = (o, c, p) => {
    o == null ? c._vnode && fe(c._vnode, null, null, !0) : D(c._vnode || null, o, c, null, null, null, p), is(), qs(), c._vnode = o;
  }, He = {
    p: D,
    um: fe,
    m: De,
    r: Kn,
    mt: Bt,
    mc: Se,
    pc: k,
    pbc: Ie,
    n: bt,
    o: e
  };
  let Wt, $t;
  return t && ([Wt, $t] = t(
    He
  )), {
    render: Bn,
    hydrate: Wt,
    createApp: qr(Bn, Wt)
  };
}
function Ne({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function ci(e, t, n = !1) {
  const s = e.children, i = t.children;
  if (R(s) && R(i))
    for (let r = 0; r < s.length; r++) {
      const l = s[r];
      let a = i[r];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[r] = Te(i[r]), a.el = l.el), n || ci(l, a)), a.type === jt && (a.el = l.el);
    }
}
function so(e) {
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
const io = (e) => e.__isTeleport, _e = Symbol.for("v-fgt"), jt = Symbol.for("v-txt"), ft = Symbol.for("v-cmt"), rt = Symbol.for("v-stc"), ot = [];
let ce = null;
function ro(e = !1) {
  ot.push(ce = e ? null : []);
}
function oo() {
  ot.pop(), ce = ot[ot.length - 1] || null;
}
let pt = 1;
function _s(e) {
  pt += e;
}
function lo(e) {
  return e.dynamicChildren = pt > 0 ? ce || Ke : null, oo(), pt > 0 && ce && ce.push(e), e;
}
function co(e, t, n, s, i, r) {
  return lo(
    ui(
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
function ao(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function et(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Vt = "__vInternal", ai = ({ key: e }) => e ?? null, wt = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? $(e) || Z(e) || I(e) ? { i: le, r: e, k: t, f: !!n } : e : null);
function ui(e, t = null, n = null, s = 0, i = null, r = e === _e ? 0 : 1, l = !1, a = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ai(t),
    ref: t && wt(t),
    scopeId: Zs,
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
  return a ? (Un(u, n), r & 128 && e.normalize(u)) : n && (u.shapeFlag |= $(n) ? 8 : 16), pt > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  ce && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && ce.push(u), u;
}
const xe = uo;
function uo(e, t = null, n = null, s = 0, i = null, r = !1) {
  if ((!e || e === Lr) && (e = ft), ao(e)) {
    const a = Ge(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Un(a, n), pt > 0 && !r && ce && (a.shapeFlag & 6 ? ce[ce.indexOf(e)] = a : ce.push(a)), a.patchFlag |= -2, a;
  }
  if (Oo(e) && (e = e.__vccOpts), t) {
    t = fo(t);
    let { class: a, style: u } = t;
    a && !$(a) && (t.class = En(a)), V(u) && (Ls(u) && !R(u) && (u = K({}, u)), t.style = yn(u));
  }
  const l = $(e) ? 1 : Or(e) ? 128 : io(e) ? 64 : V(e) ? 4 : I(e) ? 2 : 0;
  return ui(
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
function fo(e) {
  return e ? Ls(e) || Vt in e ? K({}, e) : e : null;
}
function Ge(e, t, n = !1) {
  const { props: s, ref: i, patchFlag: r, children: l } = e, a = t ? mo(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && ai(a),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? R(i) ? i.concat(wt(t)) : [i, wt(t)] : wt(t)
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
    patchFlag: t && e.type !== _e ? r === -1 ? 16 : r | 16 : r,
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
    ssContent: e.ssContent && Ge(e.ssContent),
    ssFallback: e.ssFallback && Ge(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function po(e = " ", t = 0) {
  return xe(jt, null, e, t);
}
function _o(e, t) {
  const n = xe(rt, null, e);
  return n.staticCount = t, n;
}
function me(e) {
  return e == null || typeof e == "boolean" ? xe(ft) : R(e) ? xe(
    _e,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Te(e) : xe(jt, null, String(e));
}
function Te(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ge(e);
}
function Un(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (R(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Un(e, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = t._;
      !i && !(Vt in t) ? t._ctx = le : i === 3 && le && (le.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    I(t) ? (t = { default: t, _ctx: le }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [po(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function mo(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const i in s)
      if (i === "class")
        t.class !== s.class && (t.class = En([t.class, s.class]));
      else if (i === "style")
        t.style = yn([t.style, s.style]);
      else if (Nt(i)) {
        const r = t[i], l = s[i];
        l && r !== l && !(R(r) && r.includes(l)) && (t[i] = r ? [].concat(r, l) : l);
      } else
        i !== "" && (t[i] = s[i]);
  }
  return t;
}
function de(e, t, n, s = null) {
  ue(e, t, 7, [
    n,
    s
  ]);
}
const ho = ni();
let go = 0;
function bo(e, t, n) {
  const s = e.type, i = (t ? t.appContext : e.appContext) || ho, r = {
    uid: go++,
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
    scope: new Pi(
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
    propsOptions: ii(s, i),
    emitsOptions: Ys(s, i),
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
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = br.bind(null, r), e.ce && e.ce(r), r;
}
let W = null;
const vo = () => W || le;
let Hn, je, ms = "__VUE_INSTANCE_SETTERS__";
(je = en()[ms]) || (je = en()[ms] = []), je.push((e) => W = e), Hn = (e) => {
  je.length > 1 ? je.forEach((t) => t(e)) : je[0](e);
};
const qe = (e) => {
  Hn(e), e.scope.on();
}, Ue = () => {
  W && W.scope.off(), Hn(null);
};
function fi(e) {
  return e.vnode.shapeFlag & 4;
}
let dt = !1;
function xo(e, t = !1) {
  dt = t;
  const { props: n, children: s } = e.vnode, i = fi(e);
  Yr(e, n, i, t), Qr(e, s);
  const r = i ? yo(e, t) : void 0;
  return dt = !1, r;
}
function yo(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = js(new Proxy(e.ctx, jr));
  const { setup: s } = n;
  if (s) {
    const i = e.setupContext = s.length > 1 ? Co(e) : null;
    qe(e), Xe();
    const r = Re(
      s,
      e,
      0,
      [e.props, i]
    );
    if (Ye(), Ue(), As(r)) {
      if (r.then(Ue, Ue), t)
        return r.then((l) => {
          hs(e, l, t);
        }).catch((l) => {
          Ut(l, e, 0);
        });
      e.asyncDep = r;
    } else
      hs(e, r, t);
  } else
    pi(e, t);
}
function hs(e, t, n) {
  I(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : V(t) && (e.setupState = Bs(t)), pi(e, n);
}
let gs;
function pi(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && gs && !s.render) {
      const i = s.template || kn(e).template;
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
        s.render = gs(i, f);
      }
    }
    e.render = s.render || ae;
  }
  qe(e), Xe(), Vr(e), Ye(), Ue();
}
function Eo(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, n) {
        return te(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function Co(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Eo(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Ln(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Bs(js(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in it)
          return it[n](e);
      },
      has(t, n) {
        return n in t || n in it;
      }
    }));
}
function Oo(e) {
  return I(e) && "__vccOpts" in e;
}
const pn = (e, t) => pr(e, t, dt), To = Symbol.for("v-scx"), Ao = () => Rt(To), Ro = "3.3.4", wo = "http://www.w3.org/2000/svg", ke = typeof document < "u" ? document : null, bs = ke && /* @__PURE__ */ ke.createElement("template"), So = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const i = t ? ke.createElementNS(wo, e) : ke.createElement(e, n ? { is: n } : void 0);
    return e === "select" && s && s.multiple != null && i.setAttribute("multiple", s.multiple), i;
  },
  createText: (e) => ke.createTextNode(e),
  createComment: (e) => ke.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => ke.querySelector(e),
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
      bs.innerHTML = s ? `<svg>${e}</svg>` : e;
      const a = bs.content;
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
function Io(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function Po(e, t, n) {
  const s = e.style, i = $(n);
  if (n && !i) {
    if (t && !$(t))
      for (const r in t)
        n[r] == null && dn(s, r, "");
    for (const r in n)
      dn(s, r, n[r]);
  } else {
    const r = s.display;
    i ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (s.display = r);
  }
}
const vs = /\s*!important$/;
function dn(e, t, n) {
  if (R(n))
    n.forEach((s) => dn(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = Do(e, t);
    vs.test(n) ? e.setProperty(
      re(s),
      n.replace(vs, ""),
      "important"
    ) : e[s] = n;
  }
}
const xs = ["Webkit", "Moz", "ms"], Jt = {};
function Do(e, t) {
  const n = Jt[t];
  if (n)
    return n;
  let s = ve(t);
  if (s !== "filter" && s in e)
    return Jt[t] = s;
  s = Rs(s);
  for (let i = 0; i < xs.length; i++) {
    const r = xs[i] + s;
    if (r in e)
      return Jt[t] = r;
  }
  return t;
}
const ys = "http://www.w3.org/1999/xlink";
function Mo(e, t, n, s, i) {
  if (s && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(ys, t.slice(6, t.length)) : e.setAttributeNS(ys, t, n);
  else {
    const r = Ii(t);
    n == null || r && !ws(n) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : n);
  }
}
function No(e, t, n, s, i, r, l) {
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
    f === "boolean" ? n = ws(n) : n == null && f === "string" ? (n = "", u = !0) : f === "number" && (n = 0, u = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  u && e.removeAttribute(t);
}
function zo(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function ko(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function Fo(e, t, n, s, i = null) {
  const r = e._vei || (e._vei = {}), l = r[t];
  if (s && l)
    l.value = s;
  else {
    const [a, u] = Uo(t);
    if (s) {
      const f = r[t] = jo(s, i);
      zo(e, a, f, u);
    } else
      l && (ko(e, a, l, u), r[t] = void 0);
  }
}
const Es = /(?:Once|Passive|Capture)$/;
function Uo(e) {
  let t;
  if (Es.test(e)) {
    t = {};
    let s;
    for (; s = e.match(Es); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : re(e.slice(2)), t];
}
let Qt = 0;
const Ho = /* @__PURE__ */ Promise.resolve(), Lo = () => Qt || (Ho.then(() => Qt = 0), Qt = Date.now());
function jo(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    ue(
      Vo(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = Lo(), n;
}
function Vo(e, t) {
  if (R(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((s) => (i) => !i._stopped && s && s(i));
  } else
    return t;
}
const Cs = /^on[a-z]/, Ko = (e, t, n, s, i = !1, r, l, a, u) => {
  t === "class" ? Io(e, s, i) : t === "style" ? Po(e, n, s) : Nt(t) ? gn(t) || Fo(e, t, n, s, l) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Bo(e, t, s, i)) ? No(
    e,
    t,
    s,
    r,
    l,
    a,
    u
  ) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Mo(e, t, s, i));
};
function Bo(e, t, n, s) {
  return s ? !!(t === "innerHTML" || t === "textContent" || t in e && Cs.test(t) && I(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || Cs.test(t) && $(n) ? !1 : t in e;
}
function Wo(e, t) {
  const n = wr(e);
  class s extends jn {
    constructor(r) {
      super(n, r, t);
    }
  }
  return s.def = n, s;
}
const $o = typeof HTMLElement < "u" ? HTMLElement : class {
};
class jn extends $o {
  constructor(t, n = {}, s) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && s ? s(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, $s(() => {
      this._connected || (Ts(null, this.shadowRoot), this._instance = null);
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
      if (r && !R(r))
        for (const u in r) {
          const f = r[u];
          (f === Number || f && f.type === Number) && (u in this._props && (this._props[u] = qn(this._props[u])), (a || (a = /* @__PURE__ */ Object.create(null)))[ve(u)] = !0);
        }
      this._numberProps = a, i && this._resolveProps(s), this._applyStyles(l), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((s) => t(s, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, s = R(n) ? n : Object.keys(n || {});
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
    this._numberProps && this._numberProps[s] && (n = qn(n)), this._setProp(s, n, !1);
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
    Ts(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = xe(this._def, K({}, this._props));
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
        if (i instanceof jn) {
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
function Go(e) {
  const t = vo();
  if (!t)
    return;
  const n = t.ut = (i = e(t.proxy)) => {
    Array.from(
      document.querySelectorAll(`[data-v-owner="${t.uid}"]`)
    ).forEach((r) => mn(r, i));
  }, s = () => {
    const i = e(t.proxy);
    _n(t.subTree, i), n(i);
  };
  Ar(s), Nn(() => {
    const i = new MutationObserver(s);
    i.observe(t.subTree.el.parentNode, { childList: !0 }), zn(() => i.disconnect());
  });
}
function _n(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
      _n(n.activeBranch, t);
    });
  }
  for (; e.component; )
    e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el)
    mn(e.el, t);
  else if (e.type === _e)
    e.children.forEach((n) => _n(n, t));
  else if (e.type === rt) {
    let { el: n, anchor: s } = e;
    for (; n && (mn(n, t), n !== s); )
      n = n.nextSibling;
  }
}
function mn(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    for (const s in t)
      n.setProperty(`--${s}`, t[s]);
  }
}
const qo = /* @__PURE__ */ K({ patchProp: Ko }, So);
let Os;
function Xo() {
  return Os || (Os = to(qo));
}
const Ts = (...e) => {
  Xo().render(...e);
};
const Yo = `@import"https://fonts.googleapis.com/css?family=Roboto&display=swap";h1{font-family:Roboto,sans-serif}a{color:#f0f8ff}.container{background-image:var(--6b6d6844);background-repeat:no-repeat;background-size:cover;font-family:Roboto,sans-serif;display:grid;aspect-ratio:3 / 2;max-width:1200px;grid-template-rows:10% auto 10%;grid-template-columns:1fr 1fr;background-color:#000;grid-auto-rows:150px;color:#fff}.content{grid-column-start:1;grid-column-end:3;align-self:center;justify-self:center}.column{padding:30px}h1{margin:0;font-size:8vw;line-height:1em}.btn{padding:10px 20px;border-radius:20px;border:none;background-color:#fff;color:#000}
`, Zo = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, i] of t)
    n[s] = i;
  return n;
}, Jo = /* @__PURE__ */ _o('<div class="column" style="justify-self:start;"> top-lefty </div><div class="column" style="justify-self:end;"> top-right </div><div class="column content" style=""><h1>Streaming satellites a la Mirona</h1></div><div class="column" style="justify-self:start;align-self:end;"> bottom-left </div><div class="column" style="justify-self:end;align-self:end;"><button class="btn">Comprar entrades</button></div>', 5), Qo = [
  Jo
], el = "url('https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", tl = {
  __name: "ByMazzeoAdManager.ce",
  setup(e) {
    Go((i) => ({
      "6b6d6844": el
    }));
    const t = ss(null), n = ss(null);
    Nn(() => {
      window.addEventListener("resize", s), t.value = n.value.getBoundingClientRect();
    });
    const s = () => {
      t.value = n.value.getBoundingClientRect();
    };
    return pn(() => t.value ? parseInt(t.value.width) : 0), pn(() => t.value ? parseInt(t.value.height) : 0), (i, r) => (ro(), co("div", {
      ref_key: "display",
      ref: n,
      class: "container",
      style: { "background-color": "black" }
    }, Qo, 512));
  }
}, nl = /* @__PURE__ */ Zo(tl, [["styles", [Yo]]]);
customElements.define(
  "by-mazzeo-ads",
  Wo(nl)
);
