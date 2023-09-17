function dn(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let o = 0; o < s.length; o++)
    n[s[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
const H = {}, Be = [], ce = () => {
}, co = () => !1, uo = /^on[^a-z]/, It = (e) => uo.test(e), pn = (e) => e.startsWith("onUpdate:"), B = Object.assign, mn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, fo = Object.prototype.hasOwnProperty, D = (e, t) => fo.call(e, t), A = Array.isArray, nt = (e) => Pt(e) === "[object Map]", ao = (e) => Pt(e) === "[object Set]", v = (e) => typeof e == "function", G = (e) => typeof e == "string", _n = (e) => typeof e == "symbol", V = (e) => e !== null && typeof e == "object", Es = (e) => V(e) && v(e.then) && v(e.catch), po = Object.prototype.toString, Pt = (e) => po.call(e), mo = (e) => Pt(e).slice(8, -1), _o = (e) => Pt(e) === "[object Object]", hn = (e) => G(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ot = /* @__PURE__ */ dn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Dt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, ho = /-(\w)/g, Ee = Dt((e) => e.replace(ho, (t, n) => n ? n.toUpperCase() : "")), go = /\B([A-Z])/g, re = Dt(
  (e) => e.replace(go, "-$1").toLowerCase()
), xs = Dt(
  (e) => e.charAt(0).toUpperCase() + e.slice(1)
), Wt = Dt(
  (e) => e ? `on${xs(e)}` : ""
), Rt = (e, t) => !Object.is(e, t), Gt = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, At = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, bo = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Vn = (e) => {
  const t = G(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Bn;
const Yt = () => Bn || (Bn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function gn(e) {
  if (A(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], o = G(s) ? Oo(s) : gn(s);
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
const Eo = /;(?![^(]*\))/g, xo = /:([^]+)/, yo = /\/\*[^]*?\*\//g;
function Oo(e) {
  const t = {};
  return e.replace(yo, "").split(Eo).forEach((n) => {
    if (n) {
      const s = n.split(xo);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function bn(e) {
  let t = "";
  if (G(e))
    t = e;
  else if (A(e))
    for (let n = 0; n < e.length; n++) {
      const s = bn(e[n]);
      s && (t += s + " ");
    }
  else if (V(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Co = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", zo = /* @__PURE__ */ dn(Co);
function ys(e) {
  return !!e || e === "";
}
let oe;
class To {
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
function Ro(e, t = oe) {
  t && t.active && t.effects.push(e);
}
function Ao() {
  return oe;
}
const En = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Os = (e) => (e.w & we) > 0, Cs = (e) => (e.n & we) > 0, wo = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= we;
}, So = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const o = t[s];
      Os(o) && !Cs(o) ? o.delete(e) : t[n++] = o, o.w &= ~we, o.n &= ~we;
    }
    t.length = n;
  }
}, Qt = /* @__PURE__ */ new WeakMap();
let et = 0, we = 1;
const en = 30;
let ie;
const Fe = Symbol(""), tn = Symbol("");
class xn {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Ro(this, s);
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
      return this.parent = ie, ie = this, Te = !0, we = 1 << ++et, et <= en ? wo(this) : Wn(this), this.fn();
    } finally {
      et <= en && So(this), we = 1 << --et, ie = this.parent, Te = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    ie === this ? this.deferStop = !0 : this.active && (Wn(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Wn(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let Te = !0;
const zs = [];
function ke() {
  zs.push(Te), Te = !1;
}
function qe() {
  const e = zs.pop();
  Te = e === void 0 ? !0 : e;
}
function te(e, t, n) {
  if (Te && ie) {
    let s = Qt.get(e);
    s || Qt.set(e, s = /* @__PURE__ */ new Map());
    let o = s.get(n);
    o || s.set(n, o = En()), Ts(o);
  }
}
function Ts(e, t) {
  let n = !1;
  et <= en ? Cs(e) || (e.n |= we, n = !Os(e)) : n = !e.has(ie), n && (e.add(ie), ie.deps.push(e));
}
function xe(e, t, n, s, o, r) {
  const l = Qt.get(e);
  if (!l)
    return;
  let u = [];
  if (t === "clear")
    u = [...l.values()];
  else if (n === "length" && A(e)) {
    const f = Number(s);
    l.forEach((a, h) => {
      (h === "length" || h >= f) && u.push(a);
    });
  } else
    switch (n !== void 0 && u.push(l.get(n)), t) {
      case "add":
        A(e) ? hn(n) && u.push(l.get("length")) : (u.push(l.get(Fe)), nt(e) && u.push(l.get(tn)));
        break;
      case "delete":
        A(e) || (u.push(l.get(Fe)), nt(e) && u.push(l.get(tn)));
        break;
      case "set":
        nt(e) && u.push(l.get(Fe));
        break;
    }
  if (u.length === 1)
    u[0] && nn(u[0]);
  else {
    const f = [];
    for (const a of u)
      a && f.push(...a);
    nn(En(f));
  }
}
function nn(e, t) {
  const n = A(e) ? e : [...e];
  for (const s of n)
    s.computed && Gn(s);
  for (const s of n)
    s.computed || Gn(s);
}
function Gn(e, t) {
  (e !== ie || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const vo = /* @__PURE__ */ dn("__proto__,__v_isRef,__isVue"), Rs = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(_n)
), Io = /* @__PURE__ */ yn(), Po = /* @__PURE__ */ yn(!1, !0), Do = /* @__PURE__ */ yn(!0), $n = /* @__PURE__ */ Mo();
function Mo() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = M(this);
      for (let r = 0, l = this.length; r < l; r++)
        te(s, "get", r + "");
      const o = s[t](...n);
      return o === -1 || o === !1 ? s[t](...n.map(M)) : o;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      ke();
      const s = M(this)[t].apply(this, n);
      return qe(), s;
    };
  }), e;
}
function No(e) {
  const t = M(this);
  return te(t, "has", e), t.hasOwnProperty(e);
}
function yn(e = !1, t = !1) {
  return function(s, o, r) {
    if (o === "__v_isReactive")
      return !e;
    if (o === "__v_isReadonly")
      return e;
    if (o === "__v_isShallow")
      return t;
    if (o === "__v_raw" && r === (e ? t ? Jo : Is : t ? vs : Ss).get(s))
      return s;
    const l = A(s);
    if (!e) {
      if (l && D($n, o))
        return Reflect.get($n, o, r);
      if (o === "hasOwnProperty")
        return No;
    }
    const u = Reflect.get(s, o, r);
    return (_n(o) ? Rs.has(o) : vo(o)) || (e || te(s, "get", o), t) ? u : Q(u) ? l && hn(o) ? u : u.value : V(u) ? e ? Ps(u) : zn(u) : u;
  };
}
const Uo = /* @__PURE__ */ As(), Fo = /* @__PURE__ */ As(!0);
function As(e = !1) {
  return function(n, s, o, r) {
    let l = n[s];
    if (rt(l) && Q(l) && !Q(o))
      return !1;
    if (!e && (!sn(o) && !rt(o) && (l = M(l), o = M(o)), !A(n) && Q(l) && !Q(o)))
      return l.value = o, !0;
    const u = A(n) && hn(s) ? Number(s) < n.length : D(n, s), f = Reflect.set(n, s, o, r);
    return n === M(r) && (u ? Rt(o, l) && xe(n, "set", s, o) : xe(n, "add", s, o)), f;
  };
}
function Ho(e, t) {
  const n = D(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && xe(e, "delete", t, void 0), s;
}
function Lo(e, t) {
  const n = Reflect.has(e, t);
  return (!_n(t) || !Rs.has(t)) && te(e, "has", t), n;
}
function jo(e) {
  return te(e, "iterate", A(e) ? "length" : Fe), Reflect.ownKeys(e);
}
const ws = {
  get: Io,
  set: Uo,
  deleteProperty: Ho,
  has: Lo,
  ownKeys: jo
}, Ko = {
  get: Do,
  set(e, t) {
    return !0;
  },
  deleteProperty(e, t) {
    return !0;
  }
}, Vo = /* @__PURE__ */ B(
  {},
  ws,
  {
    get: Po,
    set: Fo
  }
), On = (e) => e, Mt = (e) => Reflect.getPrototypeOf(e);
function ht(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const o = M(e), r = M(t);
  n || (t !== r && te(o, "get", t), te(o, "get", r));
  const { has: l } = Mt(o), u = s ? On : n ? An : Rn;
  if (l.call(o, t))
    return u(e.get(t));
  if (l.call(o, r))
    return u(e.get(r));
  e !== o && e.get(t);
}
function gt(e, t = !1) {
  const n = this.__v_raw, s = M(n), o = M(e);
  return t || (e !== o && te(s, "has", e), te(s, "has", o)), e === o ? n.has(e) : n.has(e) || n.has(o);
}
function bt(e, t = !1) {
  return e = e.__v_raw, !t && te(M(e), "iterate", Fe), Reflect.get(e, "size", e);
}
function Xn(e) {
  e = M(e);
  const t = M(this);
  return Mt(t).has.call(t, e) || (t.add(e), xe(t, "add", e, e)), this;
}
function kn(e, t) {
  t = M(t);
  const n = M(this), { has: s, get: o } = Mt(n);
  let r = s.call(n, e);
  r || (e = M(e), r = s.call(n, e));
  const l = o.call(n, e);
  return n.set(e, t), r ? Rt(t, l) && xe(n, "set", e, t) : xe(n, "add", e, t), this;
}
function qn(e) {
  const t = M(this), { has: n, get: s } = Mt(t);
  let o = n.call(t, e);
  o || (e = M(e), o = n.call(t, e)), s && s.call(t, e);
  const r = t.delete(e);
  return o && xe(t, "delete", e, void 0), r;
}
function Zn() {
  const e = M(this), t = e.size !== 0, n = e.clear();
  return t && xe(e, "clear", void 0, void 0), n;
}
function Et(e, t) {
  return function(s, o) {
    const r = this, l = r.__v_raw, u = M(l), f = t ? On : e ? An : Rn;
    return !e && te(u, "iterate", Fe), l.forEach((a, h) => s.call(o, f(a), f(h), r));
  };
}
function xt(e, t, n) {
  return function(...s) {
    const o = this.__v_raw, r = M(o), l = nt(r), u = e === "entries" || e === Symbol.iterator && l, f = e === "keys" && l, a = o[e](...s), h = n ? On : t ? An : Rn;
    return !t && te(
      r,
      "iterate",
      f ? tn : Fe
    ), {
      // iterator protocol
      next() {
        const { value: y, done: C } = a.next();
        return C ? { value: y, done: C } : {
          value: u ? [h(y[0]), h(y[1])] : h(y),
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
function Ce(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function Bo() {
  const e = {
    get(r) {
      return ht(this, r);
    },
    get size() {
      return bt(this);
    },
    has: gt,
    add: Xn,
    set: kn,
    delete: qn,
    clear: Zn,
    forEach: Et(!1, !1)
  }, t = {
    get(r) {
      return ht(this, r, !1, !0);
    },
    get size() {
      return bt(this);
    },
    has: gt,
    add: Xn,
    set: kn,
    delete: qn,
    clear: Zn,
    forEach: Et(!1, !0)
  }, n = {
    get(r) {
      return ht(this, r, !0);
    },
    get size() {
      return bt(this, !0);
    },
    has(r) {
      return gt.call(this, r, !0);
    },
    add: Ce("add"),
    set: Ce("set"),
    delete: Ce("delete"),
    clear: Ce("clear"),
    forEach: Et(!0, !1)
  }, s = {
    get(r) {
      return ht(this, r, !0, !0);
    },
    get size() {
      return bt(this, !0);
    },
    has(r) {
      return gt.call(this, r, !0);
    },
    add: Ce("add"),
    set: Ce("set"),
    delete: Ce("delete"),
    clear: Ce("clear"),
    forEach: Et(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
    e[r] = xt(
      r,
      !1,
      !1
    ), n[r] = xt(
      r,
      !0,
      !1
    ), t[r] = xt(
      r,
      !1,
      !0
    ), s[r] = xt(
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
  Wo,
  Go,
  $o,
  Xo
] = /* @__PURE__ */ Bo();
function Cn(e, t) {
  const n = t ? e ? Xo : $o : e ? Go : Wo;
  return (s, o, r) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? s : Reflect.get(
    D(n, o) && o in s ? n : s,
    o,
    r
  );
}
const ko = {
  get: /* @__PURE__ */ Cn(!1, !1)
}, qo = {
  get: /* @__PURE__ */ Cn(!1, !0)
}, Zo = {
  get: /* @__PURE__ */ Cn(!0, !1)
}, Ss = /* @__PURE__ */ new WeakMap(), vs = /* @__PURE__ */ new WeakMap(), Is = /* @__PURE__ */ new WeakMap(), Jo = /* @__PURE__ */ new WeakMap();
function Yo(e) {
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
function Qo(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Yo(mo(e));
}
function zn(e) {
  return rt(e) ? e : Tn(
    e,
    !1,
    ws,
    ko,
    Ss
  );
}
function er(e) {
  return Tn(
    e,
    !1,
    Vo,
    qo,
    vs
  );
}
function Ps(e) {
  return Tn(
    e,
    !0,
    Ko,
    Zo,
    Is
  );
}
function Tn(e, t, n, s, o) {
  if (!V(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = o.get(e);
  if (r)
    return r;
  const l = Qo(e);
  if (l === 0)
    return e;
  const u = new Proxy(
    e,
    l === 2 ? s : n
  );
  return o.set(e, u), u;
}
function We(e) {
  return rt(e) ? We(e.__v_raw) : !!(e && e.__v_isReactive);
}
function rt(e) {
  return !!(e && e.__v_isReadonly);
}
function sn(e) {
  return !!(e && e.__v_isShallow);
}
function Ds(e) {
  return We(e) || rt(e);
}
function M(e) {
  const t = e && e.__v_raw;
  return t ? M(t) : e;
}
function Ms(e) {
  return At(e, "__v_skip", !0), e;
}
const Rn = (e) => V(e) ? zn(e) : e, An = (e) => V(e) ? Ps(e) : e;
function tr(e) {
  Te && ie && (e = M(e), Ts(e.dep || (e.dep = En())));
}
function nr(e, t) {
  e = M(e);
  const n = e.dep;
  n && nn(n);
}
function Q(e) {
  return !!(e && e.__v_isRef === !0);
}
function sr(e) {
  return Q(e) ? e.value : e;
}
const or = {
  get: (e, t, n) => sr(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const o = e[t];
    return Q(o) && !Q(n) ? (o.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Ns(e) {
  return We(e) ? e : new Proxy(e, or);
}
class rr {
  constructor(t, n, s, o) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new xn(t, () => {
      this._dirty || (this._dirty = !0, nr(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = s;
  }
  get value() {
    const t = M(this);
    return tr(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function ir(e, t, n = !1) {
  let s, o;
  const r = v(e);
  return r ? (s = e, o = ce) : (s = e.get, o = e.set), new rr(s, o, r || !o, n);
}
function Re(e, t, n, s) {
  let o;
  try {
    o = s ? e(...s) : e();
  } catch (r) {
    Nt(r, t, n);
  }
  return o;
}
function ue(e, t, n, s) {
  if (v(e)) {
    const r = Re(e, t, n, s);
    return r && Es(r) && r.catch((l) => {
      Nt(l, t, n);
    }), r;
  }
  const o = [];
  for (let r = 0; r < e.length; r++)
    o.push(ue(e[r], t, n, s));
  return o;
}
function Nt(e, t, n, s = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let r = t.parent;
    const l = t.proxy, u = n;
    for (; r; ) {
      const a = r.ec;
      if (a) {
        for (let h = 0; h < a.length; h++)
          if (a[h](e, l, u) === !1)
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
        [e, l, u]
      );
      return;
    }
  }
  lr(e, n, o, s);
}
function lr(e, t, n, s = !0) {
  console.error(e);
}
let it = !1, on = !1;
const q = [];
let me = 0;
const Ge = [];
let ge = null, Ne = 0;
const Us = /* @__PURE__ */ Promise.resolve();
let wn = null;
function Fs(e) {
  const t = wn || Us;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function cr(e) {
  let t = me + 1, n = q.length;
  for (; t < n; ) {
    const s = t + n >>> 1;
    lt(q[s]) < e ? t = s + 1 : n = s;
  }
  return t;
}
function Sn(e) {
  (!q.length || !q.includes(
    e,
    it && e.allowRecurse ? me + 1 : me
  )) && (e.id == null ? q.push(e) : q.splice(cr(e.id), 0, e), Hs());
}
function Hs() {
  !it && !on && (on = !0, wn = Us.then(js));
}
function ur(e) {
  const t = q.indexOf(e);
  t > me && q.splice(t, 1);
}
function fr(e) {
  A(e) ? Ge.push(...e) : (!ge || !ge.includes(
    e,
    e.allowRecurse ? Ne + 1 : Ne
  )) && Ge.push(e), Hs();
}
function Jn(e, t = it ? me + 1 : 0) {
  for (; t < q.length; t++) {
    const n = q[t];
    n && n.pre && (q.splice(t, 1), t--, n());
  }
}
function Ls(e) {
  if (Ge.length) {
    const t = [...new Set(Ge)];
    if (Ge.length = 0, ge) {
      ge.push(...t);
      return;
    }
    for (ge = t, ge.sort((n, s) => lt(n) - lt(s)), Ne = 0; Ne < ge.length; Ne++)
      ge[Ne]();
    ge = null, Ne = 0;
  }
}
const lt = (e) => e.id == null ? 1 / 0 : e.id, ar = (e, t) => {
  const n = lt(e) - lt(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function js(e) {
  on = !1, it = !0, q.sort(ar);
  const t = ce;
  try {
    for (me = 0; me < q.length; me++) {
      const n = q[me];
      n && n.active !== !1 && Re(n, null, 14);
    }
  } finally {
    me = 0, q.length = 0, Ls(), it = !1, wn = null, (q.length || Ge.length) && js();
  }
}
function dr(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const s = e.vnode.props || H;
  let o = n;
  const r = t.startsWith("update:"), l = r && t.slice(7);
  if (l && l in s) {
    const h = `${l === "modelValue" ? "model" : l}Modifiers`, { number: y, trim: C } = s[h] || H;
    C && (o = n.map((w) => G(w) ? w.trim() : w)), y && (o = n.map(bo));
  }
  let u, f = s[u = Wt(t)] || // also try camelCase event handler (#2249)
  s[u = Wt(Ee(t))];
  !f && r && (f = s[u = Wt(re(t))]), f && ue(
    f,
    e,
    6,
    o
  );
  const a = s[u + "Once"];
  if (a) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[u])
      return;
    e.emitted[u] = !0, ue(
      a,
      e,
      6,
      o
    );
  }
}
function Ks(e, t, n = !1) {
  const s = t.emitsCache, o = s.get(e);
  if (o !== void 0)
    return o;
  const r = e.emits;
  let l = {}, u = !1;
  if (!v(e)) {
    const f = (a) => {
      const h = Ks(a, t, !0);
      h && (u = !0, B(l, h));
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  return !r && !u ? (V(e) && s.set(e, null), null) : (A(r) ? r.forEach((f) => l[f] = null) : B(l, r), V(e) && s.set(e, l), l);
}
function Ut(e, t) {
  return !e || !It(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), D(e, t[0].toLowerCase() + t.slice(1)) || D(e, re(t)) || D(e, t));
}
let _e = null, Vs = null;
function wt(e) {
  const t = _e;
  return _e = e, Vs = e && e.type.__scopeId || null, t;
}
function pr(e, t = _e, n) {
  if (!t || e._n)
    return e;
  const s = (...o) => {
    s._d && ls(-1);
    const r = wt(t);
    let l;
    try {
      l = e(...o);
    } finally {
      wt(r), s._d && ls(1);
    }
    return l;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function $t(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: o,
    props: r,
    propsOptions: [l],
    slots: u,
    attrs: f,
    emit: a,
    render: h,
    renderCache: y,
    data: C,
    setupState: w,
    ctx: j,
    inheritAttrs: P
  } = e;
  let W, $;
  const X = wt(e);
  try {
    if (n.shapeFlag & 4) {
      const S = o || s;
      W = pe(
        h.call(
          S,
          S,
          y,
          r,
          w,
          C,
          j
        )
      ), $ = f;
    } else {
      const S = t;
      W = pe(
        S.length > 1 ? S(
          r,
          { attrs: f, slots: u, emit: a }
        ) : S(
          r,
          null
          /* we know it doesn't need it */
        )
      ), $ = t.props ? f : mr(f);
    }
  } catch (S) {
    ot.length = 0, Nt(S, e, 1), W = Ae(ct);
  }
  let k = W;
  if ($ && P !== !1) {
    const S = Object.keys($), { shapeFlag: Oe } = k;
    S.length && Oe & 7 && (l && S.some(pn) && ($ = _r(
      $,
      l
    )), k = $e(k, $));
  }
  return n.dirs && (k = $e(k), k.dirs = k.dirs ? k.dirs.concat(n.dirs) : n.dirs), n.transition && (k.transition = n.transition), W = k, wt(X), W;
}
const mr = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || It(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, _r = (e, t) => {
  const n = {};
  for (const s in e)
    (!pn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function hr(e, t, n) {
  const { props: s, children: o, component: r } = e, { props: l, children: u, patchFlag: f } = t, a = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && f >= 0) {
    if (f & 1024)
      return !0;
    if (f & 16)
      return s ? Yn(s, l, a) : !!l;
    if (f & 8) {
      const h = t.dynamicProps;
      for (let y = 0; y < h.length; y++) {
        const C = h[y];
        if (l[C] !== s[C] && !Ut(a, C))
          return !0;
      }
    }
  } else
    return (o || u) && (!u || !u.$stable) ? !0 : s === l ? !1 : s ? l ? Yn(s, l, a) : !0 : !!l;
  return !1;
}
function Yn(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < s.length; o++) {
    const r = s[o];
    if (t[r] !== e[r] && !Ut(n, r))
      return !0;
  }
  return !1;
}
function gr({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const br = (e) => e.__isSuspense;
function Er(e, t) {
  t && t.pendingBranch ? A(e) ? t.effects.push(...e) : t.effects.push(e) : fr(e);
}
const yt = {};
function Xt(e, t, n) {
  return Bs(e, t, n);
}
function Bs(e, t, { immediate: n, deep: s, flush: o, onTrack: r, onTrigger: l } = H) {
  var u;
  const f = Ao() === ((u = Z) == null ? void 0 : u.scope) ? Z : null;
  let a, h = !1, y = !1;
  if (Q(e) ? (a = () => e.value, h = sn(e)) : We(e) ? (a = () => e, s = !0) : A(e) ? (y = !0, h = e.some((S) => We(S) || sn(S)), a = () => e.map((S) => {
    if (Q(S))
      return S.value;
    if (We(S))
      return Ve(S);
    if (v(S))
      return Re(S, f, 2);
  })) : v(e) ? t ? a = () => Re(e, f, 2) : a = () => {
    if (!(f && f.isUnmounted))
      return C && C(), ue(
        e,
        f,
        3,
        [w]
      );
  } : a = ce, t && s) {
    const S = a;
    a = () => Ve(S());
  }
  let C, w = (S) => {
    C = X.onStop = () => {
      Re(S, f, 4);
    };
  }, j;
  if (ft)
    if (w = ce, t ? n && ue(t, f, 3, [
      a(),
      y ? [] : void 0,
      w
    ]) : a(), o === "sync") {
      const S = bi();
      j = S.__watcherHandles || (S.__watcherHandles = []);
    } else
      return ce;
  let P = y ? new Array(e.length).fill(yt) : yt;
  const W = () => {
    if (X.active)
      if (t) {
        const S = X.run();
        (s || h || (y ? S.some(
          (Oe, Ze) => Rt(Oe, P[Ze])
        ) : Rt(S, P))) && (C && C(), ue(t, f, 3, [
          S,
          // pass undefined as the old value when it's changed for the first time
          P === yt ? void 0 : y && P[0] === yt ? [] : P,
          w
        ]), P = S);
      } else
        X.run();
  };
  W.allowRecurse = !!t;
  let $;
  o === "sync" ? $ = W : o === "post" ? $ = () => ee(W, f && f.suspense) : (W.pre = !0, f && (W.id = f.uid), $ = () => Sn(W));
  const X = new xn(a, $);
  t ? n ? W() : P = X.run() : o === "post" ? ee(
    X.run.bind(X),
    f && f.suspense
  ) : X.run();
  const k = () => {
    X.stop(), f && f.scope && mn(f.scope.effects, X);
  };
  return j && j.push(k), k;
}
function xr(e, t, n) {
  const s = this.proxy, o = G(e) ? e.includes(".") ? Ws(s, e) : () => s[e] : e.bind(s, s);
  let r;
  v(t) ? r = t : (r = t.handler, n = t);
  const l = Z;
  Xe(this);
  const u = Bs(o, r.bind(s), n);
  return l ? Xe(l) : He(), u;
}
function Ws(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let o = 0; o < n.length && s; o++)
      s = s[n[o]];
    return s;
  };
}
function Ve(e, t) {
  if (!V(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), Q(e))
    Ve(e.value, t);
  else if (A(e))
    for (let n = 0; n < e.length; n++)
      Ve(e[n], t);
  else if (ao(e) || nt(e))
    e.forEach((n) => {
      Ve(n, t);
    });
  else if (_o(e))
    for (const n in e)
      Ve(e[n], t);
  return e;
}
function De(e, t, n, s) {
  const o = e.dirs, r = t && t.dirs;
  for (let l = 0; l < o.length; l++) {
    const u = o[l];
    r && (u.oldValue = r[l].value);
    let f = u.dir[s];
    f && (ke(), ue(f, n, 8, [
      e.el,
      u,
      e,
      t
    ]), qe());
  }
}
function yr(e, t) {
  return v(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => B({ name: e.name }, t, { setup: e }))()
  ) : e;
}
const Ct = (e) => !!e.type.__asyncLoader, Gs = (e) => e.type.__isKeepAlive;
function Or(e, t) {
  $s(e, "a", t);
}
function Cr(e, t) {
  $s(e, "da", t);
}
function $s(e, t, n = Z) {
  const s = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (Ft(t, s, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      Gs(o.parent.vnode) && zr(s, t, n, o), o = o.parent;
  }
}
function zr(e, t, n, s) {
  const o = Ft(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  Xs(() => {
    mn(s[t], o);
  }, n);
}
function Ft(e, t, n = Z, s = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...l) => {
      if (n.isUnmounted)
        return;
      ke(), Xe(n);
      const u = ue(t, n, e, l);
      return He(), qe(), u;
    });
    return s ? o.unshift(r) : o.push(r), r;
  }
}
const ye = (e) => (t, n = Z) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!ft || e === "sp") && Ft(e, (...s) => t(...s), n)
), Tr = ye("bm"), Rr = ye("m"), Ar = ye("bu"), wr = ye("u"), Sr = ye("bum"), Xs = ye("um"), vr = ye("sp"), Ir = ye(
  "rtg"
), Pr = ye(
  "rtc"
);
function Dr(e, t = Z) {
  Ft("ec", e, t);
}
const Mr = Symbol.for("v-ndc"), rn = (e) => e ? oo(e) ? Mn(e) || e.proxy : rn(e.parent) : null, st = (
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
    $parent: (e) => rn(e.parent),
    $root: (e) => rn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => vn(e),
    $forceUpdate: (e) => e.f || (e.f = () => Sn(e.update)),
    $nextTick: (e) => e.n || (e.n = Fs.bind(e.proxy)),
    $watch: (e) => xr.bind(e)
  })
), kt = (e, t) => e !== H && !e.__isScriptSetup && D(e, t), Nr = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: o, props: r, accessCache: l, type: u, appContext: f } = e;
    let a;
    if (t[0] !== "$") {
      const w = l[t];
      if (w !== void 0)
        switch (w) {
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
        if (kt(s, t))
          return l[t] = 1, s[t];
        if (o !== H && D(o, t))
          return l[t] = 2, o[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (a = e.propsOptions[0]) && D(a, t)
        )
          return l[t] = 3, r[t];
        if (n !== H && D(n, t))
          return l[t] = 4, n[t];
        ln && (l[t] = 0);
      }
    }
    const h = st[t];
    let y, C;
    if (h)
      return t === "$attrs" && te(e, "get", t), h(e);
    if (
      // css module (injected by vue-loader)
      (y = u.__cssModules) && (y = y[t])
    )
      return y;
    if (n !== H && D(n, t))
      return l[t] = 4, n[t];
    if (
      // global properties
      C = f.config.globalProperties, D(C, t)
    )
      return C[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: o, ctx: r } = e;
    return kt(o, t) ? (o[t] = n, !0) : s !== H && D(s, t) ? (s[t] = n, !0) : D(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: o, propsOptions: r }
  }, l) {
    let u;
    return !!n[l] || e !== H && D(e, l) || kt(t, l) || (u = r[0]) && D(u, l) || D(s, l) || D(st, l) || D(o.config.globalProperties, l);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : D(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Qn(e) {
  return A(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let ln = !0;
function Ur(e) {
  const t = vn(e), n = e.proxy, s = e.ctx;
  ln = !1, t.beforeCreate && es(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: r,
    methods: l,
    watch: u,
    provide: f,
    inject: a,
    // lifecycle
    created: h,
    beforeMount: y,
    mounted: C,
    beforeUpdate: w,
    updated: j,
    activated: P,
    deactivated: W,
    beforeDestroy: $,
    beforeUnmount: X,
    destroyed: k,
    unmounted: S,
    render: Oe,
    renderTracked: Ze,
    renderTriggered: at,
    errorCaptured: Se,
    serverPrefetch: jt,
    // public API
    expose: ve,
    inheritAttrs: Je,
    // assets
    components: dt,
    directives: pt,
    filters: Kt
  } = t;
  if (a && Fr(a, s, null), l)
    for (const L in l) {
      const U = l[L];
      v(U) && (s[L] = U.bind(n));
    }
  if (o) {
    const L = o.call(n, n);
    V(L) && (e.data = zn(L));
  }
  if (ln = !0, r)
    for (const L in r) {
      const U = r[L], Ie = v(U) ? U.bind(n, n) : v(U.get) ? U.get.bind(n, n) : ce, mt = !v(U) && v(U.set) ? U.set.bind(n) : ce, Pe = hi({
        get: Ie,
        set: mt
      });
      Object.defineProperty(s, L, {
        enumerable: !0,
        configurable: !0,
        get: () => Pe.value,
        set: (fe) => Pe.value = fe
      });
    }
  if (u)
    for (const L in u)
      ks(u[L], s, n, L);
  if (f) {
    const L = v(f) ? f.call(n) : f;
    Reflect.ownKeys(L).forEach((U) => {
      Br(U, L[U]);
    });
  }
  h && es(h, e, "c");
  function J(L, U) {
    A(U) ? U.forEach((Ie) => L(Ie.bind(n))) : U && L(U.bind(n));
  }
  if (J(Tr, y), J(Rr, C), J(Ar, w), J(wr, j), J(Or, P), J(Cr, W), J(Dr, Se), J(Pr, Ze), J(Ir, at), J(Sr, X), J(Xs, S), J(vr, jt), A(ve))
    if (ve.length) {
      const L = e.exposed || (e.exposed = {});
      ve.forEach((U) => {
        Object.defineProperty(L, U, {
          get: () => n[U],
          set: (Ie) => n[U] = Ie
        });
      });
    } else
      e.exposed || (e.exposed = {});
  Oe && e.render === ce && (e.render = Oe), Je != null && (e.inheritAttrs = Je), dt && (e.components = dt), pt && (e.directives = pt);
}
function Fr(e, t, n = ce) {
  A(e) && (e = cn(e));
  for (const s in e) {
    const o = e[s];
    let r;
    V(o) ? "default" in o ? r = zt(
      o.from || s,
      o.default,
      !0
      /* treat default function as factory */
    ) : r = zt(o.from || s) : r = zt(o), Q(r) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (l) => r.value = l
    }) : t[s] = r;
  }
}
function es(e, t, n) {
  ue(
    A(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function ks(e, t, n, s) {
  const o = s.includes(".") ? Ws(n, s) : () => n[s];
  if (G(e)) {
    const r = t[e];
    v(r) && Xt(o, r);
  } else if (v(e))
    Xt(o, e.bind(n));
  else if (V(e))
    if (A(e))
      e.forEach((r) => ks(r, t, n, s));
    else {
      const r = v(e.handler) ? e.handler.bind(n) : t[e.handler];
      v(r) && Xt(o, r, e);
    }
}
function vn(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: o,
    optionsCache: r,
    config: { optionMergeStrategies: l }
  } = e.appContext, u = r.get(t);
  let f;
  return u ? f = u : !o.length && !n && !s ? f = t : (f = {}, o.length && o.forEach(
    (a) => St(f, a, l, !0)
  ), St(f, t, l)), V(t) && r.set(t, f), f;
}
function St(e, t, n, s = !1) {
  const { mixins: o, extends: r } = t;
  r && St(e, r, n, !0), o && o.forEach(
    (l) => St(e, l, n, !0)
  );
  for (const l in t)
    if (!(s && l === "expose")) {
      const u = Hr[l] || n && n[l];
      e[l] = u ? u(e[l], t[l]) : t[l];
    }
  return e;
}
const Hr = {
  data: ts,
  props: ns,
  emits: ns,
  // objects
  methods: tt,
  computed: tt,
  // lifecycle
  beforeCreate: Y,
  created: Y,
  beforeMount: Y,
  mounted: Y,
  beforeUpdate: Y,
  updated: Y,
  beforeDestroy: Y,
  beforeUnmount: Y,
  destroyed: Y,
  unmounted: Y,
  activated: Y,
  deactivated: Y,
  errorCaptured: Y,
  serverPrefetch: Y,
  // assets
  components: tt,
  directives: tt,
  // watch
  watch: jr,
  // provide / inject
  provide: ts,
  inject: Lr
};
function ts(e, t) {
  return t ? e ? function() {
    return B(
      v(e) ? e.call(this, this) : e,
      v(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Lr(e, t) {
  return tt(cn(e), cn(t));
}
function cn(e) {
  if (A(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Y(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function tt(e, t) {
  return e ? B(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ns(e, t) {
  return e ? A(e) && A(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : B(
    /* @__PURE__ */ Object.create(null),
    Qn(e),
    Qn(t ?? {})
  ) : t;
}
function jr(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = B(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Y(e[s], t[s]);
  return n;
}
function qs() {
  return {
    app: null,
    config: {
      isNativeTag: co,
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
let Kr = 0;
function Vr(e, t) {
  return function(s, o = null) {
    v(s) || (s = B({}, s)), o != null && !V(o) && (o = null);
    const r = qs(), l = /* @__PURE__ */ new Set();
    let u = !1;
    const f = r.app = {
      _uid: Kr++,
      _component: s,
      _props: o,
      _container: null,
      _context: r,
      _instance: null,
      version: Ei,
      get config() {
        return r.config;
      },
      set config(a) {
      },
      use(a, ...h) {
        return l.has(a) || (a && v(a.install) ? (l.add(a), a.install(f, ...h)) : v(a) && (l.add(a), a(f, ...h))), f;
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
        if (!u) {
          const C = Ae(
            s,
            o
          );
          return C.appContext = r, h && t ? t(C, a) : e(C, a, y), u = !0, f._container = a, a.__vue_app__ = f, Mn(C.component) || C.component.proxy;
        }
      },
      unmount() {
        u && (e(null, f._container), delete f._container.__vue_app__);
      },
      provide(a, h) {
        return r.provides[a] = h, f;
      },
      runWithContext(a) {
        vt = f;
        try {
          return a();
        } finally {
          vt = null;
        }
      }
    };
    return f;
  };
}
let vt = null;
function Br(e, t) {
  if (Z) {
    let n = Z.provides;
    const s = Z.parent && Z.parent.provides;
    s === n && (n = Z.provides = Object.create(s)), n[e] = t;
  }
}
function zt(e, t, n = !1) {
  const s = Z || _e;
  if (s || vt) {
    const o = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : vt._context.provides;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && v(t) ? t.call(s && s.proxy) : t;
  }
}
function Wr(e, t, n, s = !1) {
  const o = {}, r = {};
  At(r, Lt, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), Zs(e, t, o, r);
  for (const l in e.propsOptions[0])
    l in o || (o[l] = void 0);
  n ? e.props = s ? o : er(o) : e.type.props ? e.props = o : e.props = r, e.attrs = r;
}
function Gr(e, t, n, s) {
  const {
    props: o,
    attrs: r,
    vnode: { patchFlag: l }
  } = e, u = M(o), [f] = e.propsOptions;
  let a = !1;
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
        if (Ut(e.emitsOptions, C))
          continue;
        const w = t[C];
        if (f)
          if (D(r, C))
            w !== r[C] && (r[C] = w, a = !0);
          else {
            const j = Ee(C);
            o[j] = un(
              f,
              u,
              j,
              w,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          w !== r[C] && (r[C] = w, a = !0);
      }
    }
  } else {
    Zs(e, t, o, r) && (a = !0);
    let h;
    for (const y in u)
      (!t || // for camelCase
      !D(t, y) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((h = re(y)) === y || !D(t, h))) && (f ? n && // for camelCase
      (n[y] !== void 0 || // for kebab-case
      n[h] !== void 0) && (o[y] = un(
        f,
        u,
        y,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete o[y]);
    if (r !== u)
      for (const y in r)
        (!t || !D(t, y)) && (delete r[y], a = !0);
  }
  a && xe(e, "set", "$attrs");
}
function Zs(e, t, n, s) {
  const [o, r] = e.propsOptions;
  let l = !1, u;
  if (t)
    for (let f in t) {
      if (Ot(f))
        continue;
      const a = t[f];
      let h;
      o && D(o, h = Ee(f)) ? !r || !r.includes(h) ? n[h] = a : (u || (u = {}))[h] = a : Ut(e.emitsOptions, f) || (!(f in s) || a !== s[f]) && (s[f] = a, l = !0);
    }
  if (r) {
    const f = M(n), a = u || H;
    for (let h = 0; h < r.length; h++) {
      const y = r[h];
      n[y] = un(
        o,
        f,
        y,
        a[y],
        e,
        !D(a, y)
      );
    }
  }
  return l;
}
function un(e, t, n, s, o, r) {
  const l = e[n];
  if (l != null) {
    const u = D(l, "default");
    if (u && s === void 0) {
      const f = l.default;
      if (l.type !== Function && !l.skipFactory && v(f)) {
        const { propsDefaults: a } = o;
        n in a ? s = a[n] : (Xe(o), s = a[n] = f.call(
          null,
          t
        ), He());
      } else
        s = f;
    }
    l[
      0
      /* shouldCast */
    ] && (r && !u ? s = !1 : l[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === re(n)) && (s = !0));
  }
  return s;
}
function Js(e, t, n = !1) {
  const s = t.propsCache, o = s.get(e);
  if (o)
    return o;
  const r = e.props, l = {}, u = [];
  let f = !1;
  if (!v(e)) {
    const h = (y) => {
      f = !0;
      const [C, w] = Js(y, t, !0);
      B(l, C), w && u.push(...w);
    };
    !n && t.mixins.length && t.mixins.forEach(h), e.extends && h(e.extends), e.mixins && e.mixins.forEach(h);
  }
  if (!r && !f)
    return V(e) && s.set(e, Be), Be;
  if (A(r))
    for (let h = 0; h < r.length; h++) {
      const y = Ee(r[h]);
      ss(y) && (l[y] = H);
    }
  else if (r)
    for (const h in r) {
      const y = Ee(h);
      if (ss(y)) {
        const C = r[h], w = l[y] = A(C) || v(C) ? { type: C } : B({}, C);
        if (w) {
          const j = is(Boolean, w.type), P = is(String, w.type);
          w[
            0
            /* shouldCast */
          ] = j > -1, w[
            1
            /* shouldCastTrue */
          ] = P < 0 || j < P, (j > -1 || D(w, "default")) && u.push(y);
        }
      }
    }
  const a = [l, u];
  return V(e) && s.set(e, a), a;
}
function ss(e) {
  return e[0] !== "$";
}
function os(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function rs(e, t) {
  return os(e) === os(t);
}
function is(e, t) {
  return A(t) ? t.findIndex((n) => rs(n, e)) : v(t) && rs(t, e) ? 0 : -1;
}
const Ys = (e) => e[0] === "_" || e === "$stable", In = (e) => A(e) ? e.map(pe) : [pe(e)], $r = (e, t, n) => {
  if (t._n)
    return t;
  const s = pr((...o) => In(t(...o)), n);
  return s._c = !1, s;
}, Qs = (e, t, n) => {
  const s = e._ctx;
  for (const o in e) {
    if (Ys(o))
      continue;
    const r = e[o];
    if (v(r))
      t[o] = $r(o, r, s);
    else if (r != null) {
      const l = In(r);
      t[o] = () => l;
    }
  }
}, eo = (e, t) => {
  const n = In(t);
  e.slots.default = () => n;
}, Xr = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = M(t), At(t, "_", n)) : Qs(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && eo(e, t);
  At(e.slots, Lt, 1);
}, kr = (e, t, n) => {
  const { vnode: s, slots: o } = e;
  let r = !0, l = H;
  if (s.shapeFlag & 32) {
    const u = t._;
    u ? n && u === 1 ? r = !1 : (B(o, t), !n && u === 1 && delete o._) : (r = !t.$stable, Qs(t, o)), l = t;
  } else
    t && (eo(e, t), l = { default: 1 });
  if (r)
    for (const u in o)
      !Ys(u) && !(u in l) && delete o[u];
};
function fn(e, t, n, s, o = !1) {
  if (A(e)) {
    e.forEach(
      (C, w) => fn(
        C,
        t && (A(t) ? t[w] : t),
        n,
        s,
        o
      )
    );
    return;
  }
  if (Ct(s) && !o)
    return;
  const r = s.shapeFlag & 4 ? Mn(s.component) || s.component.proxy : s.el, l = o ? null : r, { i: u, r: f } = e, a = t && t.r, h = u.refs === H ? u.refs = {} : u.refs, y = u.setupState;
  if (a != null && a !== f && (G(a) ? (h[a] = null, D(y, a) && (y[a] = null)) : Q(a) && (a.value = null)), v(f))
    Re(f, u, 12, [l, h]);
  else {
    const C = G(f), w = Q(f);
    if (C || w) {
      const j = () => {
        if (e.f) {
          const P = C ? D(y, f) ? y[f] : h[f] : f.value;
          o ? A(P) && mn(P, r) : A(P) ? P.includes(r) || P.push(r) : C ? (h[f] = [r], D(y, f) && (y[f] = h[f])) : (f.value = [r], e.k && (h[e.k] = f.value));
        } else
          C ? (h[f] = l, D(y, f) && (y[f] = l)) : w && (f.value = l, e.k && (h[e.k] = l));
      };
      l ? (j.id = -1, ee(j, n)) : j();
    }
  }
}
const ee = Er;
function qr(e) {
  return Zr(e);
}
function Zr(e, t) {
  const n = Yt();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: o,
    patchProp: r,
    createElement: l,
    createText: u,
    createComment: f,
    setText: a,
    setElementText: h,
    parentNode: y,
    nextSibling: C,
    setScopeId: w = ce,
    insertStaticContent: j
  } = e, P = (i, c, d, m = null, p = null, b = null, x = !1, g = null, E = !!c.dynamicChildren) => {
    if (i === c)
      return;
    i && !Qe(i, c) && (m = _t(i), fe(i, p, b, !0), i = null), c.patchFlag === -2 && (E = !1, c.dynamicChildren = null);
    const { type: _, ref: z, shapeFlag: O } = c;
    switch (_) {
      case Ht:
        W(i, c, d, m);
        break;
      case ct:
        $(i, c, d, m);
        break;
      case qt:
        i == null && X(c, d, m, x);
        break;
      case be:
        dt(
          i,
          c,
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
        O & 1 ? Oe(
          i,
          c,
          d,
          m,
          p,
          b,
          x,
          g,
          E
        ) : O & 6 ? pt(
          i,
          c,
          d,
          m,
          p,
          b,
          x,
          g,
          E
        ) : (O & 64 || O & 128) && _.process(
          i,
          c,
          d,
          m,
          p,
          b,
          x,
          g,
          E,
          Le
        );
    }
    z != null && p && fn(z, i && i.ref, b, c || i, !c);
  }, W = (i, c, d, m) => {
    if (i == null)
      s(
        c.el = u(c.children),
        d,
        m
      );
    else {
      const p = c.el = i.el;
      c.children !== i.children && a(p, c.children);
    }
  }, $ = (i, c, d, m) => {
    i == null ? s(
      c.el = f(c.children || ""),
      d,
      m
    ) : c.el = i.el;
  }, X = (i, c, d, m) => {
    [i.el, i.anchor] = j(
      i.children,
      c,
      d,
      m,
      i.el,
      i.anchor
    );
  }, k = ({ el: i, anchor: c }, d, m) => {
    let p;
    for (; i && i !== c; )
      p = C(i), s(i, d, m), i = p;
    s(c, d, m);
  }, S = ({ el: i, anchor: c }) => {
    let d;
    for (; i && i !== c; )
      d = C(i), o(i), i = d;
    o(c);
  }, Oe = (i, c, d, m, p, b, x, g, E) => {
    x = x || c.type === "svg", i == null ? Ze(
      c,
      d,
      m,
      p,
      b,
      x,
      g,
      E
    ) : jt(
      i,
      c,
      p,
      b,
      x,
      g,
      E
    );
  }, Ze = (i, c, d, m, p, b, x, g) => {
    let E, _;
    const { type: z, props: O, shapeFlag: T, transition: R, dirs: I } = i;
    if (E = i.el = l(
      i.type,
      b,
      O && O.is,
      O
    ), T & 8 ? h(E, i.children) : T & 16 && Se(
      i.children,
      E,
      null,
      m,
      p,
      b && z !== "foreignObject",
      x,
      g
    ), I && De(i, null, m, "created"), at(E, i, i.scopeId, x, m), O) {
      for (const N in O)
        N !== "value" && !Ot(N) && r(
          E,
          N,
          null,
          O[N],
          b,
          i.children,
          m,
          p,
          he
        );
      "value" in O && r(E, "value", null, O.value), (_ = O.onVnodeBeforeMount) && de(_, m, i);
    }
    I && De(i, null, m, "beforeMount");
    const F = (!p || p && !p.pendingBranch) && R && !R.persisted;
    F && R.beforeEnter(E), s(E, c, d), ((_ = O && O.onVnodeMounted) || F || I) && ee(() => {
      _ && de(_, m, i), F && R.enter(E), I && De(i, null, m, "mounted");
    }, p);
  }, at = (i, c, d, m, p) => {
    if (d && w(i, d), m)
      for (let b = 0; b < m.length; b++)
        w(i, m[b]);
    if (p) {
      let b = p.subTree;
      if (c === b) {
        const x = p.vnode;
        at(
          i,
          x,
          x.scopeId,
          x.slotScopeIds,
          p.parent
        );
      }
    }
  }, Se = (i, c, d, m, p, b, x, g, E = 0) => {
    for (let _ = E; _ < i.length; _++) {
      const z = i[_] = g ? ze(i[_]) : pe(i[_]);
      P(
        null,
        z,
        c,
        d,
        m,
        p,
        b,
        x,
        g
      );
    }
  }, jt = (i, c, d, m, p, b, x) => {
    const g = c.el = i.el;
    let { patchFlag: E, dynamicChildren: _, dirs: z } = c;
    E |= i.patchFlag & 16;
    const O = i.props || H, T = c.props || H;
    let R;
    d && Me(d, !1), (R = T.onVnodeBeforeUpdate) && de(R, d, c, i), z && De(c, i, d, "beforeUpdate"), d && Me(d, !0);
    const I = p && c.type !== "foreignObject";
    if (_ ? ve(
      i.dynamicChildren,
      _,
      g,
      d,
      m,
      I,
      b
    ) : x || U(
      i,
      c,
      g,
      null,
      d,
      m,
      I,
      b,
      !1
    ), E > 0) {
      if (E & 16)
        Je(
          g,
          c,
          O,
          T,
          d,
          m,
          p
        );
      else if (E & 2 && O.class !== T.class && r(g, "class", null, T.class, p), E & 4 && r(g, "style", O.style, T.style, p), E & 8) {
        const F = c.dynamicProps;
        for (let N = 0; N < F.length; N++) {
          const K = F[N], se = O[K], je = T[K];
          (je !== se || K === "value") && r(
            g,
            K,
            se,
            je,
            p,
            i.children,
            d,
            m,
            he
          );
        }
      }
      E & 1 && i.children !== c.children && h(g, c.children);
    } else
      !x && _ == null && Je(
        g,
        c,
        O,
        T,
        d,
        m,
        p
      );
    ((R = T.onVnodeUpdated) || z) && ee(() => {
      R && de(R, d, c, i), z && De(c, i, d, "updated");
    }, m);
  }, ve = (i, c, d, m, p, b, x) => {
    for (let g = 0; g < c.length; g++) {
      const E = i[g], _ = c[g], z = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        E.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (E.type === be || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Qe(E, _) || // - In the case of a component, it could contain anything.
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
  }, Je = (i, c, d, m, p, b, x) => {
    if (d !== m) {
      if (d !== H)
        for (const g in d)
          !Ot(g) && !(g in m) && r(
            i,
            g,
            d[g],
            null,
            x,
            c.children,
            p,
            b,
            he
          );
      for (const g in m) {
        if (Ot(g))
          continue;
        const E = m[g], _ = d[g];
        E !== _ && g !== "value" && r(
          i,
          g,
          _,
          E,
          x,
          c.children,
          p,
          b,
          he
        );
      }
      "value" in m && r(i, "value", d.value, m.value);
    }
  }, dt = (i, c, d, m, p, b, x, g, E) => {
    const _ = c.el = i ? i.el : u(""), z = c.anchor = i ? i.anchor : u("");
    let { patchFlag: O, dynamicChildren: T, slotScopeIds: R } = c;
    R && (g = g ? g.concat(R) : R), i == null ? (s(_, d, m), s(z, d, m), Se(
      c.children,
      d,
      z,
      p,
      b,
      x,
      g,
      E
    )) : O > 0 && O & 64 && T && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    i.dynamicChildren ? (ve(
      i.dynamicChildren,
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
    (c.key != null || p && c === p.subTree) && to(
      i,
      c,
      !0
      /* shallow */
    )) : U(
      i,
      c,
      d,
      z,
      p,
      b,
      x,
      g,
      E
    );
  }, pt = (i, c, d, m, p, b, x, g, E) => {
    c.slotScopeIds = g, i == null ? c.shapeFlag & 512 ? p.ctx.activate(
      c,
      d,
      m,
      x,
      E
    ) : Kt(
      c,
      d,
      m,
      p,
      b,
      x,
      E
    ) : Un(i, c, E);
  }, Kt = (i, c, d, m, p, b, x) => {
    const g = i.component = fi(
      i,
      m,
      p
    );
    if (Gs(i) && (g.ctx.renderer = Le), ai(g), g.asyncDep) {
      if (p && p.registerDep(g, J), !i.el) {
        const E = g.subTree = Ae(ct);
        $(null, E, c, d);
      }
      return;
    }
    J(
      g,
      i,
      c,
      d,
      p,
      b,
      x
    );
  }, Un = (i, c, d) => {
    const m = c.component = i.component;
    if (hr(i, c, d))
      if (m.asyncDep && !m.asyncResolved) {
        L(m, c, d);
        return;
      } else
        m.next = c, ur(m.update), m.update();
    else
      c.el = i.el, m.vnode = c;
  }, J = (i, c, d, m, p, b, x) => {
    const g = () => {
      if (i.isMounted) {
        let { next: z, bu: O, u: T, parent: R, vnode: I } = i, F = z, N;
        Me(i, !1), z ? (z.el = I.el, L(i, z, x)) : z = I, O && Gt(O), (N = z.props && z.props.onVnodeBeforeUpdate) && de(N, R, z, I), Me(i, !0);
        const K = $t(i), se = i.subTree;
        i.subTree = K, P(
          se,
          K,
          // parent may have changed if it's in a teleport
          y(se.el),
          // anchor may have changed if it's in a fragment
          _t(se),
          i,
          p,
          b
        ), z.el = K.el, F === null && gr(i, K.el), T && ee(T, p), (N = z.props && z.props.onVnodeUpdated) && ee(
          () => de(N, R, z, I),
          p
        );
      } else {
        let z;
        const { el: O, props: T } = c, { bm: R, m: I, parent: F } = i, N = Ct(c);
        if (Me(i, !1), R && Gt(R), !N && (z = T && T.onVnodeBeforeMount) && de(z, F, c), Me(i, !0), O && Bt) {
          const K = () => {
            i.subTree = $t(i), Bt(
              O,
              i.subTree,
              i,
              p,
              null
            );
          };
          N ? c.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !i.isUnmounted && K()
          ) : K();
        } else {
          const K = i.subTree = $t(i);
          P(
            null,
            K,
            d,
            m,
            i,
            p,
            b
          ), c.el = K.el;
        }
        if (I && ee(I, p), !N && (z = T && T.onVnodeMounted)) {
          const K = c;
          ee(
            () => de(z, F, K),
            p
          );
        }
        (c.shapeFlag & 256 || F && Ct(F.vnode) && F.vnode.shapeFlag & 256) && i.a && ee(i.a, p), i.isMounted = !0, c = d = m = null;
      }
    }, E = i.effect = new xn(
      g,
      () => Sn(_),
      i.scope
      // track it in component's effect scope
    ), _ = i.update = () => E.run();
    _.id = i.uid, Me(i, !0), _();
  }, L = (i, c, d) => {
    c.component = i;
    const m = i.vnode.props;
    i.vnode = c, i.next = null, Gr(i, c.props, m, d), kr(i, c.children, d), ke(), Jn(), qe();
  }, U = (i, c, d, m, p, b, x, g, E = !1) => {
    const _ = i && i.children, z = i ? i.shapeFlag : 0, O = c.children, { patchFlag: T, shapeFlag: R } = c;
    if (T > 0) {
      if (T & 128) {
        mt(
          _,
          O,
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
        Ie(
          _,
          O,
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
    R & 8 ? (z & 16 && he(_, p, b), O !== _ && h(d, O)) : z & 16 ? R & 16 ? mt(
      _,
      O,
      d,
      m,
      p,
      b,
      x,
      g,
      E
    ) : he(_, p, b, !0) : (z & 8 && h(d, ""), R & 16 && Se(
      O,
      d,
      m,
      p,
      b,
      x,
      g,
      E
    ));
  }, Ie = (i, c, d, m, p, b, x, g, E) => {
    i = i || Be, c = c || Be;
    const _ = i.length, z = c.length, O = Math.min(_, z);
    let T;
    for (T = 0; T < O; T++) {
      const R = c[T] = E ? ze(c[T]) : pe(c[T]);
      P(
        i[T],
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
      i,
      p,
      b,
      !0,
      !1,
      O
    ) : Se(
      c,
      d,
      m,
      p,
      b,
      x,
      g,
      E,
      O
    );
  }, mt = (i, c, d, m, p, b, x, g, E) => {
    let _ = 0;
    const z = c.length;
    let O = i.length - 1, T = z - 1;
    for (; _ <= O && _ <= T; ) {
      const R = i[_], I = c[_] = E ? ze(c[_]) : pe(c[_]);
      if (Qe(R, I))
        P(
          R,
          I,
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
    for (; _ <= O && _ <= T; ) {
      const R = i[O], I = c[T] = E ? ze(c[T]) : pe(c[T]);
      if (Qe(R, I))
        P(
          R,
          I,
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
      O--, T--;
    }
    if (_ > O) {
      if (_ <= T) {
        const R = T + 1, I = R < z ? c[R].el : m;
        for (; _ <= T; )
          P(
            null,
            c[_] = E ? ze(c[_]) : pe(c[_]),
            d,
            I,
            p,
            b,
            x,
            g,
            E
          ), _++;
      }
    } else if (_ > T)
      for (; _ <= O; )
        fe(i[_], p, b, !0), _++;
    else {
      const R = _, I = _, F = /* @__PURE__ */ new Map();
      for (_ = I; _ <= T; _++) {
        const ne = c[_] = E ? ze(c[_]) : pe(c[_]);
        ne.key != null && F.set(ne.key, _);
      }
      let N, K = 0;
      const se = T - I + 1;
      let je = !1, Ln = 0;
      const Ye = new Array(se);
      for (_ = 0; _ < se; _++)
        Ye[_] = 0;
      for (_ = R; _ <= O; _++) {
        const ne = i[_];
        if (K >= se) {
          fe(ne, p, b, !0);
          continue;
        }
        let ae;
        if (ne.key != null)
          ae = F.get(ne.key);
        else
          for (N = I; N <= T; N++)
            if (Ye[N - I] === 0 && Qe(ne, c[N])) {
              ae = N;
              break;
            }
        ae === void 0 ? fe(ne, p, b, !0) : (Ye[ae - I] = _ + 1, ae >= Ln ? Ln = ae : je = !0, P(
          ne,
          c[ae],
          d,
          null,
          p,
          b,
          x,
          g,
          E
        ), K++);
      }
      const jn = je ? Jr(Ye) : Be;
      for (N = jn.length - 1, _ = se - 1; _ >= 0; _--) {
        const ne = I + _, ae = c[ne], Kn = ne + 1 < z ? c[ne + 1].el : m;
        Ye[_] === 0 ? P(
          null,
          ae,
          d,
          Kn,
          p,
          b,
          x,
          g,
          E
        ) : je && (N < 0 || _ !== jn[N] ? Pe(ae, d, Kn, 2) : N--);
      }
    }
  }, Pe = (i, c, d, m, p = null) => {
    const { el: b, type: x, transition: g, children: E, shapeFlag: _ } = i;
    if (_ & 6) {
      Pe(i.component.subTree, c, d, m);
      return;
    }
    if (_ & 128) {
      i.suspense.move(c, d, m);
      return;
    }
    if (_ & 64) {
      x.move(i, c, d, Le);
      return;
    }
    if (x === be) {
      s(b, c, d);
      for (let O = 0; O < E.length; O++)
        Pe(E[O], c, d, m);
      s(i.anchor, c, d);
      return;
    }
    if (x === qt) {
      k(i, c, d);
      return;
    }
    if (m !== 2 && _ & 1 && g)
      if (m === 0)
        g.beforeEnter(b), s(b, c, d), ee(() => g.enter(b), p);
      else {
        const { leave: O, delayLeave: T, afterLeave: R } = g, I = () => s(b, c, d), F = () => {
          O(b, () => {
            I(), R && R();
          });
        };
        T ? T(b, I, F) : F();
      }
    else
      s(b, c, d);
  }, fe = (i, c, d, m = !1, p = !1) => {
    const {
      type: b,
      props: x,
      ref: g,
      children: E,
      dynamicChildren: _,
      shapeFlag: z,
      patchFlag: O,
      dirs: T
    } = i;
    if (g != null && fn(g, null, d, i, !0), z & 256) {
      c.ctx.deactivate(i);
      return;
    }
    const R = z & 1 && T, I = !Ct(i);
    let F;
    if (I && (F = x && x.onVnodeBeforeUnmount) && de(F, c, i), z & 6)
      lo(i.component, d, m);
    else {
      if (z & 128) {
        i.suspense.unmount(d, m);
        return;
      }
      R && De(i, null, c, "beforeUnmount"), z & 64 ? i.type.remove(
        i,
        c,
        d,
        p,
        Le,
        m
      ) : _ && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (b !== be || O > 0 && O & 64) ? he(
        _,
        c,
        d,
        !1,
        !0
      ) : (b === be && O & 384 || !p && z & 16) && he(E, c, d), m && Fn(i);
    }
    (I && (F = x && x.onVnodeUnmounted) || R) && ee(() => {
      F && de(F, c, i), R && De(i, null, c, "unmounted");
    }, d);
  }, Fn = (i) => {
    const { type: c, el: d, anchor: m, transition: p } = i;
    if (c === be) {
      io(d, m);
      return;
    }
    if (c === qt) {
      S(i);
      return;
    }
    const b = () => {
      o(d), p && !p.persisted && p.afterLeave && p.afterLeave();
    };
    if (i.shapeFlag & 1 && p && !p.persisted) {
      const { leave: x, delayLeave: g } = p, E = () => x(d, b);
      g ? g(i.el, b, E) : E();
    } else
      b();
  }, io = (i, c) => {
    let d;
    for (; i !== c; )
      d = C(i), o(i), i = d;
    o(c);
  }, lo = (i, c, d) => {
    const { bum: m, scope: p, update: b, subTree: x, um: g } = i;
    m && Gt(m), p.stop(), b && (b.active = !1, fe(x, i, c, d)), g && ee(g, c), ee(() => {
      i.isUnmounted = !0;
    }, c), c && c.pendingBranch && !c.isUnmounted && i.asyncDep && !i.asyncResolved && i.suspenseId === c.pendingId && (c.deps--, c.deps === 0 && c.resolve());
  }, he = (i, c, d, m = !1, p = !1, b = 0) => {
    for (let x = b; x < i.length; x++)
      fe(i[x], c, d, m, p);
  }, _t = (i) => i.shapeFlag & 6 ? _t(i.component.subTree) : i.shapeFlag & 128 ? i.suspense.next() : C(i.anchor || i.el), Hn = (i, c, d) => {
    i == null ? c._vnode && fe(c._vnode, null, null, !0) : P(c._vnode || null, i, c, null, null, null, d), Jn(), Ls(), c._vnode = i;
  }, Le = {
    p: P,
    um: fe,
    m: Pe,
    r: Fn,
    mt: Kt,
    mc: Se,
    pc: U,
    pbc: ve,
    n: _t,
    o: e
  };
  let Vt, Bt;
  return t && ([Vt, Bt] = t(
    Le
  )), {
    render: Hn,
    hydrate: Vt,
    createApp: Vr(Hn, Vt)
  };
}
function Me({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function to(e, t, n = !1) {
  const s = e.children, o = t.children;
  if (A(s) && A(o))
    for (let r = 0; r < s.length; r++) {
      const l = s[r];
      let u = o[r];
      u.shapeFlag & 1 && !u.dynamicChildren && ((u.patchFlag <= 0 || u.patchFlag === 32) && (u = o[r] = ze(o[r]), u.el = l.el), n || to(l, u)), u.type === Ht && (u.el = l.el);
    }
}
function Jr(e) {
  const t = e.slice(), n = [0];
  let s, o, r, l, u;
  const f = e.length;
  for (s = 0; s < f; s++) {
    const a = e[s];
    if (a !== 0) {
      if (o = n[n.length - 1], e[o] < a) {
        t[s] = o, n.push(s);
        continue;
      }
      for (r = 0, l = n.length - 1; r < l; )
        u = r + l >> 1, e[n[u]] < a ? r = u + 1 : l = u;
      a < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), n[r] = s);
    }
  }
  for (r = n.length, l = n[r - 1]; r-- > 0; )
    n[r] = l, l = t[l];
  return n;
}
const Yr = (e) => e.__isTeleport, be = Symbol.for("v-fgt"), Ht = Symbol.for("v-txt"), ct = Symbol.for("v-cmt"), qt = Symbol.for("v-stc"), ot = [];
let le = null;
function Qr(e = !1) {
  ot.push(le = e ? null : []);
}
function ei() {
  ot.pop(), le = ot[ot.length - 1] || null;
}
let ut = 1;
function ls(e) {
  ut += e;
}
function ti(e) {
  return e.dynamicChildren = ut > 0 ? le || Be : null, ei(), ut > 0 && le && le.push(e), e;
}
function ni(e, t, n, s, o, r) {
  return ti(
    so(
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
function si(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Qe(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Lt = "__vInternal", no = ({ key: e }) => e ?? null, Tt = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? G(e) || Q(e) || v(e) ? { i: _e, r: e, k: t, f: !!n } : e : null);
function so(e, t = null, n = null, s = 0, o = null, r = e === be ? 0 : 1, l = !1, u = !1) {
  const f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && no(t),
    ref: t && Tt(t),
    scopeId: Vs,
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
    ctx: _e
  };
  return u ? (Pn(f, n), r & 128 && e.normalize(f)) : n && (f.shapeFlag |= G(n) ? 8 : 16), ut > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  le && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (f.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  f.patchFlag !== 32 && le.push(f), f;
}
const Ae = oi;
function oi(e, t = null, n = null, s = 0, o = null, r = !1) {
  if ((!e || e === Mr) && (e = ct), si(e)) {
    const u = $e(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Pn(u, n), ut > 0 && !r && le && (u.shapeFlag & 6 ? le[le.indexOf(e)] = u : le.push(u)), u.patchFlag |= -2, u;
  }
  if (_i(e) && (e = e.__vccOpts), t) {
    t = ri(t);
    let { class: u, style: f } = t;
    u && !G(u) && (t.class = bn(u)), V(f) && (Ds(f) && !A(f) && (f = B({}, f)), t.style = gn(f));
  }
  const l = G(e) ? 1 : br(e) ? 128 : Yr(e) ? 64 : V(e) ? 4 : v(e) ? 2 : 0;
  return so(
    e,
    t,
    n,
    s,
    o,
    l,
    r,
    !0
  );
}
function ri(e) {
  return e ? Ds(e) || Lt in e ? B({}, e) : e : null;
}
function $e(e, t, n = !1) {
  const { props: s, ref: o, patchFlag: r, children: l } = e, u = t ? li(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && no(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? A(o) ? o.concat(Tt(t)) : [o, Tt(t)] : Tt(t)
    ) : o,
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
    ssContent: e.ssContent && $e(e.ssContent),
    ssFallback: e.ssFallback && $e(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function ii(e = " ", t = 0) {
  return Ae(Ht, null, e, t);
}
function pe(e) {
  return e == null || typeof e == "boolean" ? Ae(ct) : A(e) ? Ae(
    be,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? ze(e) : Ae(Ht, null, String(e));
}
function ze(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : $e(e);
}
function Pn(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (A(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Pn(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(Lt in t) ? t._ctx = _e : o === 3 && _e && (_e.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    v(t) ? (t = { default: t, _ctx: _e }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [ii(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function li(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const o in s)
      if (o === "class")
        t.class !== s.class && (t.class = bn([t.class, s.class]));
      else if (o === "style")
        t.style = gn([t.style, s.style]);
      else if (It(o)) {
        const r = t[o], l = s[o];
        l && r !== l && !(A(r) && r.includes(l)) && (t[o] = r ? [].concat(r, l) : l);
      } else
        o !== "" && (t[o] = s[o]);
  }
  return t;
}
function de(e, t, n, s = null) {
  ue(e, t, 7, [
    n,
    s
  ]);
}
const ci = qs();
let ui = 0;
function fi(e, t, n) {
  const s = e.type, o = (t ? t.appContext : e.appContext) || ci, r = {
    uid: ui++,
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
    scope: new To(
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
    propsOptions: Js(s, o),
    emitsOptions: Ks(s, o),
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
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = dr.bind(null, r), e.ce && e.ce(r), r;
}
let Z = null, Dn, Ke, cs = "__VUE_INSTANCE_SETTERS__";
(Ke = Yt()[cs]) || (Ke = Yt()[cs] = []), Ke.push((e) => Z = e), Dn = (e) => {
  Ke.length > 1 ? Ke.forEach((t) => t(e)) : Ke[0](e);
};
const Xe = (e) => {
  Dn(e), e.scope.on();
}, He = () => {
  Z && Z.scope.off(), Dn(null);
};
function oo(e) {
  return e.vnode.shapeFlag & 4;
}
let ft = !1;
function ai(e, t = !1) {
  ft = t;
  const { props: n, children: s } = e.vnode, o = oo(e);
  Wr(e, n, o, t), Xr(e, s);
  const r = o ? di(e, t) : void 0;
  return ft = !1, r;
}
function di(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Ms(new Proxy(e.ctx, Nr));
  const { setup: s } = n;
  if (s) {
    const o = e.setupContext = s.length > 1 ? mi(e) : null;
    Xe(e), ke();
    const r = Re(
      s,
      e,
      0,
      [e.props, o]
    );
    if (qe(), He(), Es(r)) {
      if (r.then(He, He), t)
        return r.then((l) => {
          us(e, l, t);
        }).catch((l) => {
          Nt(l, e, 0);
        });
      e.asyncDep = r;
    } else
      us(e, r, t);
  } else
    ro(e, t);
}
function us(e, t, n) {
  v(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : V(t) && (e.setupState = Ns(t)), ro(e, n);
}
let fs;
function ro(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && fs && !s.render) {
      const o = s.template || vn(e).template;
      if (o) {
        const { isCustomElement: r, compilerOptions: l } = e.appContext.config, { delimiters: u, compilerOptions: f } = s, a = B(
          B(
            {
              isCustomElement: r,
              delimiters: u
            },
            l
          ),
          f
        );
        s.render = fs(o, a);
      }
    }
    e.render = s.render || ce;
  }
  Xe(e), ke(), Ur(e), qe(), He();
}
function pi(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, n) {
        return te(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function mi(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return pi(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Mn(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Ns(Ms(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in st)
          return st[n](e);
      },
      has(t, n) {
        return n in t || n in st;
      }
    }));
}
function _i(e) {
  return v(e) && "__vccOpts" in e;
}
const hi = (e, t) => ir(e, t, ft), gi = Symbol.for("v-scx"), bi = () => zt(gi), Ei = "3.3.4", xi = "http://www.w3.org/2000/svg", Ue = typeof document < "u" ? document : null, as = Ue && /* @__PURE__ */ Ue.createElement("template"), yi = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const o = t ? Ue.createElementNS(xi, e) : Ue.createElement(e, n ? { is: n } : void 0);
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
    const l = n ? n.previousSibling : t.lastChild;
    if (o && (o === r || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), n), !(o === r || !(o = o.nextSibling)); )
        ;
    else {
      as.innerHTML = s ? `<svg>${e}</svg>` : e;
      const u = as.content;
      if (s) {
        const f = u.firstChild;
        for (; f.firstChild; )
          u.appendChild(f.firstChild);
        u.removeChild(f);
      }
      t.insertBefore(u, n);
    }
    return [
      // first
      l ? l.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
};
function Oi(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function Ci(e, t, n) {
  const s = e.style, o = G(n);
  if (n && !o) {
    if (t && !G(t))
      for (const r in t)
        n[r] == null && an(s, r, "");
    for (const r in n)
      an(s, r, n[r]);
  } else {
    const r = s.display;
    o ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (s.display = r);
  }
}
const ds = /\s*!important$/;
function an(e, t, n) {
  if (A(n))
    n.forEach((s) => an(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = zi(e, t);
    ds.test(n) ? e.setProperty(
      re(s),
      n.replace(ds, ""),
      "important"
    ) : e[s] = n;
  }
}
const ps = ["Webkit", "Moz", "ms"], Zt = {};
function zi(e, t) {
  const n = Zt[t];
  if (n)
    return n;
  let s = Ee(t);
  if (s !== "filter" && s in e)
    return Zt[t] = s;
  s = xs(s);
  for (let o = 0; o < ps.length; o++) {
    const r = ps[o] + s;
    if (r in e)
      return Zt[t] = r;
  }
  return t;
}
const ms = "http://www.w3.org/1999/xlink";
function Ti(e, t, n, s, o) {
  if (s && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(ms, t.slice(6, t.length)) : e.setAttributeNS(ms, t, n);
  else {
    const r = zo(t);
    n == null || r && !ys(n) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : n);
  }
}
function Ri(e, t, n, s, o, r, l) {
  if (t === "innerHTML" || t === "textContent") {
    s && l(s, o, r), e[t] = n ?? "";
    return;
  }
  const u = e.tagName;
  if (t === "value" && u !== "PROGRESS" && // custom elements may use _value internally
  !u.includes("-")) {
    e._value = n;
    const a = u === "OPTION" ? e.getAttribute("value") : e.value, h = n ?? "";
    a !== h && (e.value = h), n == null && e.removeAttribute(t);
    return;
  }
  let f = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean" ? n = ys(n) : n == null && a === "string" ? (n = "", f = !0) : a === "number" && (n = 0, f = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  f && e.removeAttribute(t);
}
function Ai(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function wi(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function Si(e, t, n, s, o = null) {
  const r = e._vei || (e._vei = {}), l = r[t];
  if (s && l)
    l.value = s;
  else {
    const [u, f] = vi(t);
    if (s) {
      const a = r[t] = Di(s, o);
      Ai(e, u, a, f);
    } else
      l && (wi(e, u, l, f), r[t] = void 0);
  }
}
const _s = /(?:Once|Passive|Capture)$/;
function vi(e) {
  let t;
  if (_s.test(e)) {
    t = {};
    let s;
    for (; s = e.match(_s); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : re(e.slice(2)), t];
}
let Jt = 0;
const Ii = /* @__PURE__ */ Promise.resolve(), Pi = () => Jt || (Ii.then(() => Jt = 0), Jt = Date.now());
function Di(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    ue(
      Mi(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = Pi(), n;
}
function Mi(e, t) {
  if (A(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((s) => (o) => !o._stopped && s && s(o));
  } else
    return t;
}
const hs = /^on[a-z]/, Ni = (e, t, n, s, o = !1, r, l, u, f) => {
  t === "class" ? Oi(e, s, o) : t === "style" ? Ci(e, n, s) : It(t) ? pn(t) || Si(e, t, n, s, l) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Ui(e, t, s, o)) ? Ri(
    e,
    t,
    s,
    r,
    l,
    u,
    f
  ) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Ti(e, t, s, o));
};
function Ui(e, t, n, s) {
  return s ? !!(t === "innerHTML" || t === "textContent" || t in e && hs.test(t) && v(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || hs.test(t) && G(n) ? !1 : t in e;
}
function Fi(e, t) {
  const n = yr(e);
  class s extends Nn {
    constructor(r) {
      super(n, r, t);
    }
  }
  return s.def = n, s;
}
const Hi = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Nn extends Hi {
  constructor(t, n = {}, s) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && s ? s(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, Fs(() => {
      this._connected || (bs(null, this.shadowRoot), this._instance = null);
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
      const { props: r, styles: l } = s;
      let u;
      if (r && !A(r))
        for (const f in r) {
          const a = r[f];
          (a === Number || a && a.type === Number) && (f in this._props && (this._props[f] = Vn(this._props[f])), (u || (u = /* @__PURE__ */ Object.create(null)))[Ee(f)] = !0);
        }
      this._numberProps = u, o && this._resolveProps(s), this._applyStyles(l), this._update();
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
    this._numberProps && this._numberProps[s] && (n = Vn(n)), this._setProp(s, n, !1);
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
    bs(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = Ae(this._def, B({}, this._props));
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
      let o = this;
      for (; o = o && (o.parentNode || o.host); )
        if (o instanceof Nn) {
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
const Li = /* @__PURE__ */ B({ patchProp: Ni }, yi);
let gs;
function ji() {
  return gs || (gs = qr(Li));
}
const bs = (...e) => {
  ji().render(...e);
}, Ki = `.ads{background-color:#000;color:#fff}
`, Vi = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, o] of t)
    n[s] = o;
  return n;
}, Bi = {}, Wi = {
  class: "ads",
  style: { "text-align": "center" }
};
function Gi(e, t) {
  return Qr(), ni("div", Wi, " ByMazzeo ");
}
const $i = /* @__PURE__ */ Vi(Bi, [["render", Gi], ["styles", [Ki]]]), Xi = Fi($i);
customElements.define("by-mazzeo-ads", Xi);
