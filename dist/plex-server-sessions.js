//#region node_modules/@lit/reactive-element/css-tag.js
var e = globalThis, t = e.ShadowRoot && (e.ShadyCSS === void 0 || e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, n = Symbol(), r = /* @__PURE__ */ new WeakMap(), i = class {
	constructor(e, t, r) {
		if (this._$cssResult$ = !0, r !== n) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, n = this.t;
		if (t && e === void 0) {
			let t = n !== void 0 && n.length === 1;
			t && (e = r.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && r.set(n, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, a = (e) => new i(typeof e == "string" ? e : e + "", void 0, n), o = (e, ...t) => new i(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, n), s = (n, r) => {
	if (t) n.adoptedStyleSheets = r.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let t of r) {
		let r = document.createElement("style"), i = e.litNonce;
		i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
	}
}, c = t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return a(t);
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: ee, getOwnPropertySymbols: te, getPrototypeOf: ne } = Object, f = globalThis, p = f.trustedTypes, re = p ? p.emptyScript : "", ie = f.reactiveElementPolyfillSupport, m = (e, t) => e, h = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? re : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, g = (e, t) => !l(e, t), _ = {
	attribute: !0,
	type: String,
	converter: h,
	reflect: !1,
	useDefault: !1,
	hasChanged: g
};
Symbol.metadata ??= Symbol("metadata"), f.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var v = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = _) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && u(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = d(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? _;
	}
	static _$Ei() {
		if (this.hasOwnProperty(m("elementProperties"))) return;
		let e = ne(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(m("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(m("properties"))) {
			let e = this.properties, t = [...ee(e), ...te(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(Infinity).reverse());
			for (let e of n) t.unshift(c(e));
		} else e !== void 0 && t.push(c(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return s(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? h : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? h : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? g)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
v.elementStyles = [], v.shadowRootOptions = { mode: "open" }, v[m("elementProperties")] = /* @__PURE__ */ new Map(), v[m("finalized")] = /* @__PURE__ */ new Map(), ie?.({ ReactiveElement: v }), (f.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var y = globalThis, ae = (e) => e, b = y.trustedTypes, x = b ? b.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, S = "$lit$", C = `lit$${Math.random().toFixed(9).slice(2)}$`, w = "?" + C, oe = `<${w}>`, T = document, E = () => T.createComment(""), D = (e) => e === null || typeof e != "object" && typeof e != "function", O = Array.isArray, se = (e) => O(e) || typeof e?.[Symbol.iterator] == "function", k = "[ 	\n\f\r]", A = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ce = /-->/g, le = />/g, j = RegExp(`>|${k}(?:([^\\s"'>=/]+)(${k}*=${k}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), ue = /'/g, de = /"/g, M = /^(?:script|style|textarea|title)$/i, N = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), P = Symbol.for("lit-noChange"), F = Symbol.for("lit-nothing"), I = /* @__PURE__ */ new WeakMap(), L = T.createTreeWalker(T, 129);
function R(e, t) {
	if (!O(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return x === void 0 ? t : x.createHTML(t);
}
var fe = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = A;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === A ? c[1] === "!--" ? o = ce : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = j) : (M.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = j) : o = le : o === j ? c[0] === ">" ? (o = i ?? A, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? j : c[3] === "\"" ? de : ue) : o === de || o === ue ? o = j : o === ce || o === le ? o = A : (o = j, i = void 0);
		let d = o === j && e[t + 1].startsWith("/>") ? " " : "";
		a += o === A ? n + oe : l >= 0 ? (r.push(s), n.slice(0, l) + S + n.slice(l) + C + d) : n + C + (l === -2 ? t : d);
	}
	return [R(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, z = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = fe(t, n);
		if (this.el = e.createElement(l, r), L.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = L.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(S)) {
					let t = u[o++], n = i.getAttribute(e).split(C), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? me : r[1] === "?" ? he : r[1] === "@" ? ge : H
					}), i.removeAttribute(e);
				} else e.startsWith(C) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (M.test(i.tagName)) {
					let e = i.textContent.split(C), t = e.length - 1;
					if (t > 0) {
						i.textContent = b ? b.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], E()), L.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], E());
					}
				}
			} else if (i.nodeType === 8) if (i.data === w) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(C, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += C.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = T.createElement("template");
		return n.innerHTML = e, n;
	}
};
function B(e, t, n = e, r) {
	if (t === P) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = D(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = B(e, i._$AS(e, t.values), i, r)), t;
}
var pe = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? T).importNode(t, !0);
		L.currentNode = r;
		let i = L.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new V(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new _e(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = L.nextNode(), a++);
		}
		return L.currentNode = T, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, V = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = F, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = B(this, e, t), D(e) ? e === F || e == null || e === "" ? (this._$AH !== F && this._$AR(), this._$AH = F) : e !== this._$AH && e !== P && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? se(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== F && D(this._$AH) ? this._$AA.nextSibling.data = e : this.T(T.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = z.createElement(R(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new pe(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = I.get(e.strings);
		return t === void 0 && I.set(e.strings, t = new z(e)), t;
	}
	k(t) {
		O(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(E()), this.O(E()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = ae(e).nextSibling;
			ae(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, H = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = F, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = F;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = B(this, e, t, 0), a = !D(e) || e !== this._$AH && e !== P, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = B(this, r[n + o], t, o), s === P && (s = this._$AH[o]), a ||= !D(s) || s !== this._$AH[o], s === F ? e = F : e !== F && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === F ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, me = class extends H {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === F ? void 0 : e;
	}
}, he = class extends H {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== F);
	}
}, ge = class extends H {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = B(this, e, t, 0) ?? F) === P) return;
		let n = this._$AH, r = e === F && n !== F || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== F && (n === F || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, _e = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		B(this, e);
	}
}, ve = y.litHtmlPolyfillSupport;
ve?.(z, V), (y.litHtmlVersions ??= []).push("3.3.2");
var ye = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new V(t.insertBefore(E(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, U = globalThis, W = class extends v {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ye(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return P;
	}
};
W._$litElement$ = !0, W.finalized = !0, U.litElementHydrateSupport?.({ LitElement: W });
var be = U.litElementPolyfillSupport;
be?.({ LitElement: W }), (U.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/custom-element.js
var xe = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, Se = {
	attribute: !0,
	type: String,
	converter: h,
	reflect: !1,
	hasChanged: g
}, Ce = (e = Se, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
			},
			init(t) {
				return t !== void 0 && this.C(r, void 0, e, t), t;
			}
		};
	}
	if (r === "setter") {
		let { name: r } = n;
		return function(n) {
			let i = this[r];
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function G(e) {
	return (t, n) => typeof n == "object" ? Ce(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function we(e) {
	return G({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region src/helpers.ts
var Te = {
	playing: {
		icon: "mdi:play",
		label: "Playing",
		active: !0
	},
	paused: {
		icon: "mdi:pause",
		label: "Paused",
		active: !0
	},
	idle: {
		icon: "mdi:stop",
		label: "Idle",
		active: !1
	},
	off: {
		icon: "mdi:power",
		label: "Off",
		active: !1
	},
	unavailable: {
		icon: "mdi:lan-disconnect",
		label: "Unavailable",
		active: !1
	},
	unknown: {
		icon: "mdi:help-circle-outline",
		label: "Unknown",
		active: !1
	}
}, Ee = (e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), K = (e, t) => {
	let n = t.entities ?? [];
	if (n.length > 0) return n.map((t) => e.states[t]).filter((e) => !!e);
	let r = RegExp(`^${Ee("media_player.plex_*").replace(/\\\*/g, ".*")}$`);
	return Object.values(e.states).filter((e) => e.entity_id.startsWith("media_player.") && r.test(e.entity_id));
}, De = (e) => {
	switch (e.state) {
		case "playing":
		case "paused":
		case "idle":
		case "off":
		case "unavailable": return e.state;
		default: return "unknown";
	}
}, q = (e) => Te[De(e)], J = (e) => {
	let t = Z(e, "media_content_type");
	switch (t) {
		case "tvshow":
		case "movie": return t;
		default: return "unknown";
	}
}, Oe = (e) => q(e).active, Y = (e) => String(e.attributes.username ?? e.attributes.friendly_name ?? e.entity_id), X = (e, t) => {
	let n = e.attributes[t];
	return typeof n == "number" && Number.isFinite(n) ? n : void 0;
}, Z = (e, t) => {
	let n = e.attributes[t];
	return typeof n == "string" && n.length > 0 ? n : void 0;
}, ke = (e) => {
	let t = Math.max(0, Math.floor(e)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${r}:${String(i).padStart(2, "0")}`;
}, Ae = (e) => {
	let t = X(e, "media_position"), n = X(e, "media_duration");
	if (!(t === void 0 || n === void 0 || n <= 0)) return {
		position: t,
		duration: n,
		percent: Math.min(100, Math.max(0, t / n * 100)),
		positionLabel: ke(t),
		durationLabel: ke(n)
	};
}, je = (e) => {
	if (J(e) !== "tvshow") return;
	let t = X(e, "media_season"), n = X(e, "media_episode");
	if (!(t === void 0 && n === void 0)) return t !== void 0 && n !== void 0 ? `S${t}E${n}` : n === void 0 ? `S${t}` : `E${n}`;
}, Me = (e) => {
	let t = J(e), n = Z(e, "media_title"), r = Z(e, "media_series_title"), i = je(e), a = Z(e, "media_library_title"), o = Z(e, "friendly_name");
	return {
		primaryTitle: n,
		secondaryTitle: t === "tvshow" ? [r, i].filter(Boolean).join(" · ") || o : t === "movie" ? void 0 : r ?? o,
		detailLabel: t === "tvshow" ? void 0 : i,
		libraryTitle: a,
		progress: Ae(e)
	};
}, Ne = (e) => {
	let t = e.attributes.entity_picture;
	if (typeof t == "string" && t.length > 0) return t;
};
//#endregion
//#region \0@oxc-project+runtime@0.122.0/helpers/decorate.js
function Q(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/plex-sessions-card.ts
var $ = class extends W {
	static {
		this.styles = o`
    :host {
      display: block;
    }

    ha-card {
      padding: 16px;
    }

    .header {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 12px;
    }

    .grid {
      display: grid;
      gap: 8px;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      justify-content: start;
    }

    .tile {
      border: 1px solid var(--divider-color, #d9d9d9);
      border-radius: 12px;
      padding: 10px 12px 8px;
      display: grid;
      grid-template-rows: auto 1fr auto;
      gap: 6px;
      background: var(--card-background-color, #fff);
      cursor: pointer;
      transition: border-color 120ms ease, box-shadow 120ms ease;
    }

    .tile:hover,
    .tile:focus-visible {
      border-color: var(--primary-color, #03a9f4);
      box-shadow: 0 0 0 1px color-mix(in srgb, var(--primary-color, #03a9f4) 35%, transparent);
      outline: none;
    }

    .top {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      gap: 10px;
      align-items: start;
    }

    .artwork {
      width: 42px;
      height: 42px;
      border-radius: 10px;
      overflow: hidden;
      background: linear-gradient(135deg, #2f3640 0%, #66707a 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.8rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .artwork.detailed {
      width: 52px;
      height: 52px;
      border-radius: 12px;
    }

    .artwork img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }

    .content {
      min-width: 0;
      display: grid;
      gap: 4px;
      align-content: start;
      min-height: 72px;
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      min-width: 0;
    }

    .identity {
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 6px;
      overflow: hidden;
      white-space: nowrap;
    }

    .name {
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .state {
      opacity: 0.8;
      color: var(--secondary-text-color, #666);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .state-icon {
      --mdc-icon-size: 18px;
    }

    .media-primary {
      font-size: 0.95rem;
      font-weight: 600;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .media-secondary,
    .media-detail,
    .progress-time {
      color: var(--secondary-text-color, #666);
      font-size: 0.85rem;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .library-trail {
      min-width: 0;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      color: var(--secondary-text-color, #666);
      font-size: 0.8rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex-shrink: 1;
    }

    .library-icon {
      --mdc-icon-size: 14px;
      flex-shrink: 0;
    }

    .progress {
      display: grid;
      gap: 3px;
      grid-column: 1 / -1;
      align-content: end;
    }

    .progress-bar {
      height: 5px;
      border-radius: 999px;
      overflow: hidden;
      background: color-mix(in srgb, var(--primary-color, #03a9f4) 14%, transparent);
    }

    .progress-fill {
      height: 100%;
      border-radius: inherit;
      background: var(--primary-color, #03a9f4);
    }

    .empty {
      display: grid;
      gap: 10px;
      padding: 8px 0 4px;
      justify-items: center;
      text-align: center;
    }

    .empty.illustrated {
      padding: 12px 0 8px;
    }

    .empty-art {
      position: relative;
      width: 120px;
      height: 76px;
    }

    .empty-art ha-icon {
      position: absolute;
      color: var(--secondary-text-color, #666);
    }

    .empty-art .sheep-icon {
      --mdc-icon-size: 64px;
      left: 22px;
      top: 12px;
    }

    .empty-art .sleep-icon {
      --mdc-icon-size: 28px;
      color: color-mix(in srgb, var(--secondary-text-color, #666) 80%, white);
    }

    .empty-art .sleep-icon.one {
      right: 18px;
      top: 16px;
    }

    .empty-title {
      color: var(--primary-text-color, #111);
      font-size: 0.95rem;
      font-weight: 600;
    }

    .empty-body {
      color: var(--secondary-text-color, #666);
      font-size: 0.9rem;
      max-width: 28ch;
    }
  `;
	}
	setConfig(e) {
		if (!e.type) throw Error("Card type is required");
		this.config = {
			show_inactive: !1,
			max_columns: 4,
			...e
		};
	}
	getCardSize() {
		return 2;
	}
	render() {
		if (!this.hass || !this.config) return F;
		let e = this.getVisibleEntities(), t = this.getEmptyState(), n = this.getGridStyle();
		return N`
      <ha-card>
        <div class="header">${this.config.title ?? "Plex"}</div>
        ${e.length > 0 ? N`
              <div class="grid" style=${n}>
                ${e.map((e) => this.renderEntity(e))}
              </div>
            ` : this.renderEmptyState(t)}
      </ha-card>
    `;
	}
	getVisibleEntities() {
		return !this.hass || !this.config ? [] : [...K(this.hass, this.config).filter((e) => this.config?.show_inactive ? !0 : Oe(e))].sort((e, t) => Y(e).localeCompare(Y(t)));
	}
	getGridStyle() {
		let e = Math.max(1, this.config?.max_columns ?? 4);
		return `max-width: ${e * 220 + (e - 1) * 8}px;`;
	}
	getEmptyState() {
		return !this.hass || !this.config ? {
			title: "No Plex sessions",
			body: "The card is waiting for Home Assistant state."
		} : K(this.hass, this.config).length === 0 ? {
			title: "No Plex clients found",
			body: "No matching Plex media players were discovered for this card."
		} : this.config.show_inactive ? {
			title: "No Plex sessions",
			body: "No Plex clients are currently available to display."
		} : {
			title: "Nobody is watching",
			body: ""
		};
	}
	renderEmptyState(e) {
		let t = e.title === "Nobody is watching";
		return N`
      <div class=${t ? "empty illustrated" : "empty"}>
        ${t ? N`
              <div class="empty-art" aria-hidden="true">
                <ha-icon class="sheep-icon" icon="mdi:sheep"></ha-icon>
                <ha-icon class="sleep-icon one" icon="mdi:sleep"></ha-icon>
              </div>
            ` : F}
        <div class="empty-title">${e.title}</div>
        ${e.body ? N`<div class="empty-body">${e.body}</div>` : F}
      </div>
    `;
	}
	renderEntity(e) {
		let t = Ne(e), n = Y(e).slice(0, 1).toUpperCase(), r = q(e), i = Me(e);
		return N`
      <div
        class="tile"
        role="button"
        tabindex="0"
        @click=${() => this.showMoreInfo(e.entity_id)}
        @keydown=${(t) => this.handleTileKeydown(t, e.entity_id)}
      >
        <div class="top">
          <div class="artwork detailed">
            ${t ? N`<img src=${t} alt=${`${Y(e)} artwork`} />` : N`${n}`}
          </div>
          <div class="content">
            <div class="row">
              <div class="identity">
                <div class="name">${Y(e)}</div>
                ${i.libraryTitle ? N`
                      <div class="library-trail">
                        <ha-icon class="library-icon" icon="mdi:chevron-right"></ha-icon>
                        <span>${i.libraryTitle}</span>
                      </div>
                    ` : F}
              </div>
              <div class="state" title=${r.label}>
                <ha-icon
                  class="state-icon"
                  .icon=${r.icon}
                  .label=${r.label}
                ></ha-icon>
              </div>
            </div>
            ${i.primaryTitle ? N`<div class="media-primary">${i.primaryTitle}</div>` : F}
            ${i.secondaryTitle ? N`<div class="media-secondary">${i.secondaryTitle}</div>` : F}
            ${i.detailLabel ? N`<div class="media-detail">${i.detailLabel}</div>` : F}
          </div>
        </div>
        ${i.progress ? N`
              <div class="progress">
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    style=${`width: ${i.progress.percent}%;`}
                  ></div>
                </div>
                <div class="progress-time">
                  ${i.progress.positionLabel} /
                  ${i.progress.durationLabel}
                </div>
              </div>
            ` : F}
      </div>
    `;
	}
	handleTileKeydown(e, t) {
		e.key !== "Enter" && e.key !== " " || (e.preventDefault(), this.showMoreInfo(t));
	}
	showMoreInfo(e) {
		this.dispatchEvent(new CustomEvent("hass-more-info", {
			detail: { entityId: e },
			bubbles: !0,
			composed: !0
		}));
	}
};
Q([G({ attribute: !1 })], $.prototype, "hass", void 0), Q([we()], $.prototype, "config", void 0), $ = Q([xe("plex-server-sessions")], $), window.customCards = window.customCards || [], window.customCards.push({
	type: "plex-server-sessions",
	name: "Plex Server Sessions",
	description: "Compact Lovelace card for Plex sessions."
});
//#endregion
export { $ as PlexSessionsCard };
