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
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: f, getOwnPropertySymbols: ee, getPrototypeOf: te } = Object, ne = globalThis, re = ne.trustedTypes, ie = re ? re.emptyScript : "", ae = ne.reactiveElementPolyfillSupport, p = (e, t) => e, oe = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? ie : null;
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
}, se = (e, t) => !l(e, t), ce = {
	attribute: !0,
	type: String,
	converter: oe,
	reflect: !1,
	useDefault: !1,
	hasChanged: se
};
Symbol.metadata ??= Symbol("metadata"), ne.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var m = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = ce) {
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
		return this.elementProperties.get(e) ?? ce;
	}
	static _$Ei() {
		if (this.hasOwnProperty(p("elementProperties"))) return;
		let e = te(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(p("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(p("properties"))) {
			let e = this.properties, t = [...f(e), ...ee(e)];
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
			let i = (n.converter?.toAttribute === void 0 ? oe : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? oe : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? se)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
m.elementStyles = [], m.shadowRootOptions = { mode: "open" }, m[p("elementProperties")] = /* @__PURE__ */ new Map(), m[p("finalized")] = /* @__PURE__ */ new Map(), ae?.({ ReactiveElement: m }), (ne.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var le = globalThis, ue = (e) => e, de = le.trustedTypes, fe = de ? de.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, pe = "$lit$", h = `lit$${Math.random().toFixed(9).slice(2)}$`, me = "?" + h, he = `<${me}>`, g = document, _ = () => g.createComment(""), v = (e) => e === null || typeof e != "object" && typeof e != "function", ge = Array.isArray, _e = (e) => ge(e) || typeof e?.[Symbol.iterator] == "function", ve = "[ 	\n\f\r]", y = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ye = /-->/g, be = />/g, b = RegExp(`>|${ve}(?:([^\\s"'>=/]+)(${ve}*=${ve}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), xe = /'/g, Se = /"/g, Ce = /^(?:script|style|textarea|title)$/i, x = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), S = Symbol.for("lit-noChange"), C = Symbol.for("lit-nothing"), we = /* @__PURE__ */ new WeakMap(), w = g.createTreeWalker(g, 129);
function Te(e, t) {
	if (!ge(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return fe === void 0 ? t : fe.createHTML(t);
}
var Ee = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = y;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === y ? c[1] === "!--" ? o = ye : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = b) : (Ce.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = b) : o = be : o === b ? c[0] === ">" ? (o = i ?? y, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? b : c[3] === "\"" ? Se : xe) : o === Se || o === xe ? o = b : o === ye || o === be ? o = y : (o = b, i = void 0);
		let d = o === b && e[t + 1].startsWith("/>") ? " " : "";
		a += o === y ? n + he : l >= 0 ? (r.push(s), n.slice(0, l) + pe + n.slice(l) + h + d) : n + h + (l === -2 ? t : d);
	}
	return [Te(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, De = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Ee(t, n);
		if (this.el = e.createElement(l, r), w.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = w.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(pe)) {
					let t = u[o++], n = i.getAttribute(e).split(h), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? je : r[1] === "?" ? Me : r[1] === "@" ? Ne : Ae
					}), i.removeAttribute(e);
				} else e.startsWith(h) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (Ce.test(i.tagName)) {
					let e = i.textContent.split(h), t = e.length - 1;
					if (t > 0) {
						i.textContent = de ? de.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], _()), w.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], _());
					}
				}
			} else if (i.nodeType === 8) if (i.data === me) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(h, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += h.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = g.createElement("template");
		return n.innerHTML = e, n;
	}
};
function T(e, t, n = e, r) {
	if (t === S) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = v(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = T(e, i._$AS(e, t.values), i, r)), t;
}
var Oe = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? g).importNode(t, !0);
		w.currentNode = r;
		let i = w.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new ke(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Pe(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = w.nextNode(), a++);
		}
		return w.currentNode = g, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, ke = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = C, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = T(this, e, t), v(e) ? e === C || e == null || e === "" ? (this._$AH !== C && this._$AR(), this._$AH = C) : e !== this._$AH && e !== S && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? _e(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== C && v(this._$AH) ? this._$AA.nextSibling.data = e : this.T(g.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = De.createElement(Te(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Oe(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = we.get(e.strings);
		return t === void 0 && we.set(e.strings, t = new De(e)), t;
	}
	k(t) {
		ge(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(_()), this.O(_()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = ue(e).nextSibling;
			ue(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, Ae = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = C, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = C;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = T(this, e, t, 0), a = !v(e) || e !== this._$AH && e !== S, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = T(this, r[n + o], t, o), s === S && (s = this._$AH[o]), a ||= !v(s) || s !== this._$AH[o], s === C ? e = C : e !== C && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === C ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, je = class extends Ae {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === C ? void 0 : e;
	}
}, Me = class extends Ae {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== C);
	}
}, Ne = class extends Ae {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = T(this, e, t, 0) ?? C) === S) return;
		let n = this._$AH, r = e === C && n !== C || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== C && (n === C || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Pe = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		T(this, e);
	}
}, Fe = le.litHtmlPolyfillSupport;
Fe?.(De, ke), (le.litHtmlVersions ??= []).push("3.3.2");
var Ie = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new ke(t.insertBefore(_(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Le = globalThis, E = class extends m {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ie(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return S;
	}
};
E._$litElement$ = !0, E.finalized = !0, Le.litElementHydrateSupport?.({ LitElement: E });
var Re = Le.litElementPolyfillSupport;
Re?.({ LitElement: E }), (Le.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/custom-element.js
var ze = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, Be = {
	attribute: !0,
	type: String,
	converter: oe,
	reflect: !1,
	hasChanged: se
}, Ve = (e = Be, t, n) => {
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
function He(e) {
	return (t, n) => typeof n == "object" ? Ve(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function Ue(e) {
	return He({
		...e,
		state: !0,
		attribute: !1
	});
}
Object.freeze({ status: "aborted" });
function D(e, t, n) {
	function r(n, r) {
		if (n._zod || Object.defineProperty(n, "_zod", {
			value: {
				def: r,
				constr: o,
				traits: /* @__PURE__ */ new Set()
			},
			enumerable: !1
		}), n._zod.traits.has(e)) return;
		n._zod.traits.add(e), t(n, r);
		let i = o.prototype, a = Object.keys(i);
		for (let e = 0; e < a.length; e++) {
			let t = a[e];
			t in n || (n[t] = i[t].bind(n));
		}
	}
	let i = n?.Parent ?? Object;
	class a extends i {}
	Object.defineProperty(a, "name", { value: e });
	function o(e) {
		var t;
		let i = n?.Parent ? new a() : this;
		r(i, e), (t = i._zod).deferred ?? (t.deferred = []);
		for (let e of i._zod.deferred) e();
		return i;
	}
	return Object.defineProperty(o, "init", { value: r }), Object.defineProperty(o, Symbol.hasInstance, { value: (t) => n?.Parent && t instanceof n.Parent ? !0 : t?._zod?.traits?.has(e) }), Object.defineProperty(o, "name", { value: e }), o;
}
var O = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
}, We = class extends Error {
	constructor(e) {
		super(`Encountered unidirectional transform during encode: ${e}`), this.name = "ZodEncodeError";
	}
}, Ge = {};
function k(e) {
	return e && Object.assign(Ge, e), Ge;
}
//#endregion
//#region node_modules/zod/v4/core/util.js
function Ke(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function qe(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
function Je(e) {
	return { get value() {
		{
			let t = e();
			return Object.defineProperty(this, "value", { value: t }), t;
		}
		throw Error("cached value already set");
	} };
}
function Ye(e) {
	return e == null;
}
function Xe(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function Ze(e, t) {
	let n = (e.toString().split(".")[1] || "").length, r = t.toString(), i = (r.split(".")[1] || "").length;
	if (i === 0 && /\d?e-\d?/.test(r)) {
		let e = r.match(/\d?e-(\d?)/);
		e?.[1] && (i = Number.parseInt(e[1]));
	}
	let a = n > i ? n : i;
	return Number.parseInt(e.toFixed(a).replace(".", "")) % Number.parseInt(t.toFixed(a).replace(".", "")) / 10 ** a;
}
var Qe = Symbol("evaluating");
function A(e, t, n) {
	let r;
	Object.defineProperty(e, t, {
		get() {
			if (r !== Qe) return r === void 0 && (r = Qe, r = n()), r;
		},
		set(n) {
			Object.defineProperty(e, t, { value: n });
		},
		configurable: !0
	});
}
function j(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function M(...e) {
	let t = {};
	for (let n of e) Object.assign(t, Object.getOwnPropertyDescriptors(n));
	return Object.defineProperties({}, t);
}
function $e(e) {
	return JSON.stringify(e);
}
function et(e) {
	return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var tt = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function N(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
var nt = Je(() => {
	if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return !1;
	try {
		return Function(""), !0;
	} catch {
		return !1;
	}
});
function P(e) {
	if (N(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return !(N(n) === !1 || Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1);
}
function rt(e) {
	return P(e) ? { ...e } : Array.isArray(e) ? [...e] : e;
}
var it = new Set([
	"string",
	"number",
	"symbol"
]);
function F(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function I(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function L(e) {
	let t = e;
	if (!t) return {};
	if (typeof t == "string") return { error: () => t };
	if (t?.message !== void 0) {
		if (t?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
		t.error = t.message;
	}
	return delete t.message, typeof t.error == "string" ? {
		...t,
		error: () => t.error
	} : t;
}
function at(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
var ot = {
	safeint: [-(2 ** 53 - 1), 2 ** 53 - 1],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function st(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".pick() cannot be used on object schemas containing refinements");
	return I(e, M(e._zod.def, {
		get shape() {
			let e = {};
			for (let r in t) {
				if (!(r in n.shape)) throw Error(`Unrecognized key: "${r}"`);
				t[r] && (e[r] = n.shape[r]);
			}
			return j(this, "shape", e), e;
		},
		checks: []
	}));
}
function ct(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".omit() cannot be used on object schemas containing refinements");
	return I(e, M(e._zod.def, {
		get shape() {
			let r = { ...e._zod.def.shape };
			for (let e in t) {
				if (!(e in n.shape)) throw Error(`Unrecognized key: "${e}"`);
				t[e] && delete r[e];
			}
			return j(this, "shape", r), r;
		},
		checks: []
	}));
}
function lt(e, t) {
	if (!P(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = e._zod.def.shape;
		for (let e in t) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return I(e, M(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return j(this, "shape", n), n;
	} }));
}
function ut(e, t) {
	if (!P(t)) throw Error("Invalid input to safeExtend: expected a plain object");
	return I(e, M(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return j(this, "shape", n), n;
	} }));
}
function dt(e, t) {
	return I(e, M(e._zod.def, {
		get shape() {
			let n = {
				...e._zod.def.shape,
				...t._zod.def.shape
			};
			return j(this, "shape", n), n;
		},
		get catchall() {
			return t._zod.def.catchall;
		},
		checks: []
	}));
}
function ft(e, t, n) {
	let r = t._zod.def.checks;
	if (r && r.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
	return I(t, M(t._zod.def, {
		get shape() {
			let r = t._zod.def.shape, i = { ...r };
			if (n) for (let t in n) {
				if (!(t in r)) throw Error(`Unrecognized key: "${t}"`);
				n[t] && (i[t] = e ? new e({
					type: "optional",
					innerType: r[t]
				}) : r[t]);
			}
			else for (let t in r) i[t] = e ? new e({
				type: "optional",
				innerType: r[t]
			}) : r[t];
			return j(this, "shape", i), i;
		},
		checks: []
	}));
}
function pt(e, t, n) {
	return I(t, M(t._zod.def, { get shape() {
		let r = t._zod.def.shape, i = { ...r };
		if (n) for (let t in n) {
			if (!(t in i)) throw Error(`Unrecognized key: "${t}"`);
			n[t] && (i[t] = new e({
				type: "nonoptional",
				innerType: r[t]
			}));
		}
		else for (let t in r) i[t] = new e({
			type: "nonoptional",
			innerType: r[t]
		});
		return j(this, "shape", i), i;
	} }));
}
function R(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function mt(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function ht(e) {
	return typeof e == "string" ? e : e?.message;
}
function z(e, t, n) {
	let r = {
		...e,
		path: e.path ?? []
	};
	return e.message || (r.message = ht(e.inst?._zod.def?.error?.(e)) ?? ht(t?.error?.(e)) ?? ht(n.customError?.(e)) ?? ht(n.localeError?.(e)) ?? "Invalid input"), delete r.inst, delete r.continue, t?.reportInput || delete r.input, r;
}
function gt(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function B(...e) {
	let [t, n, r] = e;
	return typeof t == "string" ? {
		message: t,
		code: "custom",
		input: n,
		inst: r
	} : { ...t };
}
//#endregion
//#region node_modules/zod/v4/core/errors.js
var _t = (e, t) => {
	e.name = "$ZodError", Object.defineProperty(e, "_zod", {
		value: e._zod,
		enumerable: !1
	}), Object.defineProperty(e, "issues", {
		value: t,
		enumerable: !1
	}), e.message = JSON.stringify(t, qe, 2), Object.defineProperty(e, "toString", {
		value: () => e.message,
		enumerable: !1
	});
}, vt = D("$ZodError", _t), yt = D("$ZodError", _t, { Parent: Error });
function bt(e, t = (e) => e.message) {
	let n = {}, r = [];
	for (let i of e.issues) i.path.length > 0 ? (n[i.path[0]] = n[i.path[0]] || [], n[i.path[0]].push(t(i))) : r.push(t(i));
	return {
		formErrors: r,
		fieldErrors: n
	};
}
function xt(e, t = (e) => e.message) {
	let n = { _errors: [] }, r = (e) => {
		for (let i of e.issues) if (i.code === "invalid_union" && i.errors.length) i.errors.map((e) => r({ issues: e }));
		else if (i.code === "invalid_key") r({ issues: i.issues });
		else if (i.code === "invalid_element") r({ issues: i.issues });
		else if (i.path.length === 0) n._errors.push(t(i));
		else {
			let e = n, r = 0;
			for (; r < i.path.length;) {
				let n = i.path[r];
				r === i.path.length - 1 ? (e[n] = e[n] || { _errors: [] }, e[n]._errors.push(t(i))) : e[n] = e[n] || { _errors: [] }, e = e[n], r++;
			}
		}
	};
	return r(e), n;
}
//#endregion
//#region node_modules/zod/v4/core/parse.js
var St = (e) => (t, n, r, i) => {
	let a = r ? Object.assign(r, { async: !1 }) : { async: !1 }, o = t._zod.run({
		value: n,
		issues: []
	}, a);
	if (o instanceof Promise) throw new O();
	if (o.issues.length) {
		let t = new (i?.Err ?? e)(o.issues.map((e) => z(e, a, k())));
		throw tt(t, i?.callee), t;
	}
	return o.value;
}, Ct = (e) => async (t, n, r, i) => {
	let a = r ? Object.assign(r, { async: !0 }) : { async: !0 }, o = t._zod.run({
		value: n,
		issues: []
	}, a);
	if (o instanceof Promise && (o = await o), o.issues.length) {
		let t = new (i?.Err ?? e)(o.issues.map((e) => z(e, a, k())));
		throw tt(t, i?.callee), t;
	}
	return o.value;
}, wt = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new O();
	return a.issues.length ? {
		success: !1,
		error: new (e ?? vt)(a.issues.map((e) => z(e, i, k())))
	} : {
		success: !0,
		data: a.value
	};
}, Tt = /* @__PURE__ */ wt(yt), Et = (e) => async (t, n, r) => {
	let i = r ? Object.assign(r, { async: !0 }) : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? {
		success: !1,
		error: new e(a.issues.map((e) => z(e, i, k())))
	} : {
		success: !0,
		data: a.value
	};
}, Dt = /* @__PURE__ */ Et(yt), Ot = (e) => (t, n, r) => {
	let i = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
	return St(e)(t, n, i);
}, kt = (e) => (t, n, r) => St(e)(t, n, r), At = (e) => async (t, n, r) => {
	let i = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
	return Ct(e)(t, n, i);
}, jt = (e) => async (t, n, r) => Ct(e)(t, n, r), Mt = (e) => (t, n, r) => {
	let i = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
	return wt(e)(t, n, i);
}, Nt = (e) => (t, n, r) => wt(e)(t, n, r), Pt = (e) => async (t, n, r) => {
	let i = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
	return Et(e)(t, n, i);
}, Ft = (e) => async (t, n, r) => Et(e)(t, n, r), It = /^[cC][^\s-]{8,}$/, Lt = /^[0-9a-z]+$/, Rt = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, zt = /^[0-9a-vA-V]{20}$/, Bt = /^[A-Za-z0-9]{27}$/, Vt = /^[a-zA-Z0-9_-]{21}$/, Ht = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Ut = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, Wt = (e) => e ? RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, Gt = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Kt = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function qt() {
	return new RegExp(Kt, "u");
}
var Jt = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Yt = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, Xt = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, Zt = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Qt = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, $t = /^[A-Za-z0-9_-]*$/, en = /^\+[1-9]\d{6,14}$/, tn = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", nn = /* @__PURE__ */ RegExp(`^${tn}$`);
function rn(e) {
	let t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function an(e) {
	return RegExp(`^${rn(e)}$`);
}
function on(e) {
	let t = rn({ precision: e.precision }), n = ["Z"];
	e.local && n.push(""), e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	let r = `${t}(?:${n.join("|")})`;
	return RegExp(`^${tn}T(?:${r})$`);
}
var sn = (e) => {
	let t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
	return RegExp(`^${t}$`);
}, cn = /^-?\d+$/, ln = /^-?\d+(?:\.\d+)?$/, un = /^[^A-Z]*$/, dn = /^[^a-z]*$/, V = /* @__PURE__ */ D("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), fn = {
	number: "number",
	bigint: "bigint",
	object: "date"
}, pn = /* @__PURE__ */ D("$ZodCheckLessThan", (e, t) => {
	V.init(e, t);
	let n = fn[typeof t.value];
	e._zod.onattach.push((e) => {
		let n = e._zod.bag, r = (t.inclusive ? n.maximum : n.exclusiveMaximum) ?? Infinity;
		t.value < r && (t.inclusive ? n.maximum = t.value : n.exclusiveMaximum = t.value);
	}), e._zod.check = (r) => {
		(t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
			origin: n,
			code: "too_big",
			maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), mn = /* @__PURE__ */ D("$ZodCheckGreaterThan", (e, t) => {
	V.init(e, t);
	let n = fn[typeof t.value];
	e._zod.onattach.push((e) => {
		let n = e._zod.bag, r = (t.inclusive ? n.minimum : n.exclusiveMinimum) ?? -Infinity;
		t.value > r && (t.inclusive ? n.minimum = t.value : n.exclusiveMinimum = t.value);
	}), e._zod.check = (r) => {
		(t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
			origin: n,
			code: "too_small",
			minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), hn = /* @__PURE__ */ D("$ZodCheckMultipleOf", (e, t) => {
	V.init(e, t), e._zod.onattach.push((e) => {
		var n;
		(n = e._zod.bag).multipleOf ?? (n.multipleOf = t.value);
	}), e._zod.check = (n) => {
		if (typeof n.value != typeof t.value) throw Error("Cannot mix number and bigint in multiple_of check.");
		(typeof n.value == "bigint" ? n.value % t.value === BigInt(0) : Ze(n.value, t.value) === 0) || n.issues.push({
			origin: typeof n.value,
			code: "not_multiple_of",
			divisor: t.value,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), gn = /* @__PURE__ */ D("$ZodCheckNumberFormat", (e, t) => {
	V.init(e, t), t.format = t.format || "float64";
	let n = t.format?.includes("int"), r = n ? "int" : "number", [i, a] = ot[t.format];
	e._zod.onattach.push((e) => {
		let r = e._zod.bag;
		r.format = t.format, r.minimum = i, r.maximum = a, n && (r.pattern = cn);
	}), e._zod.check = (o) => {
		let s = o.value;
		if (n) {
			if (!Number.isInteger(s)) {
				o.issues.push({
					expected: r,
					format: t.format,
					code: "invalid_type",
					continue: !1,
					input: s,
					inst: e
				});
				return;
			}
			if (!Number.isSafeInteger(s)) {
				s > 0 ? o.issues.push({
					input: s,
					code: "too_big",
					maximum: 2 ** 53 - 1,
					note: "Integers must be within the safe integer range.",
					inst: e,
					origin: r,
					inclusive: !0,
					continue: !t.abort
				}) : o.issues.push({
					input: s,
					code: "too_small",
					minimum: -(2 ** 53 - 1),
					note: "Integers must be within the safe integer range.",
					inst: e,
					origin: r,
					inclusive: !0,
					continue: !t.abort
				});
				return;
			}
		}
		s < i && o.issues.push({
			origin: "number",
			input: s,
			code: "too_small",
			minimum: i,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		}), s > a && o.issues.push({
			origin: "number",
			input: s,
			code: "too_big",
			maximum: a,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		});
	};
}), _n = /* @__PURE__ */ D("$ZodCheckMaxLength", (e, t) => {
	var n;
	V.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !Ye(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag.maximum ?? Infinity;
		t.maximum < n && (e._zod.bag.maximum = t.maximum);
	}), e._zod.check = (n) => {
		let r = n.value;
		if (r.length <= t.maximum) return;
		let i = gt(r);
		n.issues.push({
			origin: i,
			code: "too_big",
			maximum: t.maximum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), vn = /* @__PURE__ */ D("$ZodCheckMinLength", (e, t) => {
	var n;
	V.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !Ye(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag.minimum ?? -Infinity;
		t.minimum > n && (e._zod.bag.minimum = t.minimum);
	}), e._zod.check = (n) => {
		let r = n.value;
		if (r.length >= t.minimum) return;
		let i = gt(r);
		n.issues.push({
			origin: i,
			code: "too_small",
			minimum: t.minimum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), yn = /* @__PURE__ */ D("$ZodCheckLengthEquals", (e, t) => {
	var n;
	V.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !Ye(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag;
		n.minimum = t.length, n.maximum = t.length, n.length = t.length;
	}), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if (i === t.length) return;
		let a = gt(r), o = i > t.length;
		n.issues.push({
			origin: a,
			...o ? {
				code: "too_big",
				maximum: t.length
			} : {
				code: "too_small",
				minimum: t.length
			},
			inclusive: !0,
			exact: !0,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), bn = /* @__PURE__ */ D("$ZodCheckStringFormat", (e, t) => {
	var n, r;
	V.init(e, t), e._zod.onattach.push((e) => {
		let n = e._zod.bag;
		n.format = t.format, t.pattern && (n.patterns ??= /* @__PURE__ */ new Set(), n.patterns.add(t.pattern));
	}), t.pattern ? (n = e._zod).check ?? (n.check = (n) => {
		t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: t.format,
			input: n.value,
			...t.pattern ? { pattern: t.pattern.toString() } : {},
			inst: e,
			continue: !t.abort
		});
	}) : (r = e._zod).check ?? (r.check = () => {});
}), xn = /* @__PURE__ */ D("$ZodCheckRegex", (e, t) => {
	bn.init(e, t), e._zod.check = (n) => {
		t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "regex",
			input: n.value,
			pattern: t.pattern.toString(),
			inst: e,
			continue: !t.abort
		});
	};
}), Sn = /* @__PURE__ */ D("$ZodCheckLowerCase", (e, t) => {
	t.pattern ??= un, bn.init(e, t);
}), Cn = /* @__PURE__ */ D("$ZodCheckUpperCase", (e, t) => {
	t.pattern ??= dn, bn.init(e, t);
}), wn = /* @__PURE__ */ D("$ZodCheckIncludes", (e, t) => {
	V.init(e, t);
	let n = F(t.includes), r = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${n}` : n);
	t.pattern = r, e._zod.onattach.push((e) => {
		let t = e._zod.bag;
		t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(r);
	}), e._zod.check = (n) => {
		n.value.includes(t.includes, t.position) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "includes",
			includes: t.includes,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Tn = /* @__PURE__ */ D("$ZodCheckStartsWith", (e, t) => {
	V.init(e, t);
	let n = RegExp(`^${F(t.prefix)}.*`);
	t.pattern ??= n, e._zod.onattach.push((e) => {
		let t = e._zod.bag;
		t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(n);
	}), e._zod.check = (n) => {
		n.value.startsWith(t.prefix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "starts_with",
			prefix: t.prefix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), En = /* @__PURE__ */ D("$ZodCheckEndsWith", (e, t) => {
	V.init(e, t);
	let n = RegExp(`.*${F(t.suffix)}$`);
	t.pattern ??= n, e._zod.onattach.push((e) => {
		let t = e._zod.bag;
		t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(n);
	}), e._zod.check = (n) => {
		n.value.endsWith(t.suffix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "ends_with",
			suffix: t.suffix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Dn = /* @__PURE__ */ D("$ZodCheckOverwrite", (e, t) => {
	V.init(e, t), e._zod.check = (e) => {
		e.value = t.tx(e.value);
	};
}), On = class {
	constructor(e = []) {
		this.content = [], this.indent = 0, this && (this.args = e);
	}
	indented(e) {
		this.indent += 1, e(this), --this.indent;
	}
	write(e) {
		if (typeof e == "function") {
			e(this, { execution: "sync" }), e(this, { execution: "async" });
			return;
		}
		let t = e.split("\n").filter((e) => e), n = Math.min(...t.map((e) => e.length - e.trimStart().length)), r = t.map((e) => e.slice(n)).map((e) => " ".repeat(this.indent * 2) + e);
		for (let e of r) this.content.push(e);
	}
	compile() {
		let e = Function, t = this?.args, n = [...(this?.content ?? [""]).map((e) => `  ${e}`)];
		return new e(...t, n.join("\n"));
	}
}, kn = {
	major: 4,
	minor: 3,
	patch: 6
}, H = /* @__PURE__ */ D("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = kn;
	let r = [...e._zod.def.checks ?? []];
	e._zod.traits.has("$ZodCheck") && r.unshift(e);
	for (let t of r) for (let n of t._zod.onattach) n(e);
	if (r.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (e, t, n) => {
			let r = R(e), i;
			for (let a of t) {
				if (a._zod.def.when) {
					if (!a._zod.def.when(e)) continue;
				} else if (r) continue;
				let t = e.issues.length, o = a._zod.check(e);
				if (o instanceof Promise && n?.async === !1) throw new O();
				if (i || o instanceof Promise) i = (i ?? Promise.resolve()).then(async () => {
					await o, e.issues.length !== t && (r ||= R(e, t));
				});
				else {
					if (e.issues.length === t) continue;
					r ||= R(e, t);
				}
			}
			return i ? i.then(() => e) : e;
		}, n = (n, i, a) => {
			if (R(n)) return n.aborted = !0, n;
			let o = t(i, r, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new O();
				return o.then((t) => e._zod.parse(t, a));
			}
			return e._zod.parse(o, a);
		};
		e._zod.run = (i, a) => {
			if (a.skipChecks) return e._zod.parse(i, a);
			if (a.direction === "backward") {
				let t = e._zod.parse({
					value: i.value,
					issues: []
				}, {
					...a,
					skipChecks: !0
				});
				return t instanceof Promise ? t.then((e) => n(e, i, a)) : n(t, i, a);
			}
			let o = e._zod.parse(i, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new O();
				return o.then((e) => t(e, r, a));
			}
			return t(o, r, a);
		};
	}
	A(e, "~standard", () => ({
		validate: (t) => {
			try {
				let n = Tt(e, t);
				return n.success ? { value: n.data } : { issues: n.error?.issues };
			} catch {
				return Dt(e, t).then((e) => e.success ? { value: e.data } : { issues: e.error?.issues });
			}
		},
		vendor: "zod",
		version: 1
	}));
}), An = /* @__PURE__ */ D("$ZodString", (e, t) => {
	H.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? sn(e._zod.bag), e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = String(n.value);
		} catch {}
		return typeof n.value == "string" || n.issues.push({
			expected: "string",
			code: "invalid_type",
			input: n.value,
			inst: e
		}), n;
	};
}), U = /* @__PURE__ */ D("$ZodStringFormat", (e, t) => {
	bn.init(e, t), An.init(e, t);
}), jn = /* @__PURE__ */ D("$ZodGUID", (e, t) => {
	t.pattern ??= Ut, U.init(e, t);
}), Mn = /* @__PURE__ */ D("$ZodUUID", (e, t) => {
	if (t.version) {
		let e = {
			v1: 1,
			v2: 2,
			v3: 3,
			v4: 4,
			v5: 5,
			v6: 6,
			v7: 7,
			v8: 8
		}[t.version];
		if (e === void 0) throw Error(`Invalid UUID version: "${t.version}"`);
		t.pattern ??= Wt(e);
	} else t.pattern ??= Wt();
	U.init(e, t);
}), Nn = /* @__PURE__ */ D("$ZodEmail", (e, t) => {
	t.pattern ??= Gt, U.init(e, t);
}), Pn = /* @__PURE__ */ D("$ZodURL", (e, t) => {
	U.init(e, t), e._zod.check = (n) => {
		try {
			let r = n.value.trim(), i = new URL(r);
			t.hostname && (t.hostname.lastIndex = 0, t.hostname.test(i.hostname) || n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid hostname",
				pattern: t.hostname.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			})), t.protocol && (t.protocol.lastIndex = 0, t.protocol.test(i.protocol.endsWith(":") ? i.protocol.slice(0, -1) : i.protocol) || n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid protocol",
				pattern: t.protocol.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			})), t.normalize ? n.value = i.href : n.value = r;
			return;
		} catch {
			n.issues.push({
				code: "invalid_format",
				format: "url",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
}), Fn = /* @__PURE__ */ D("$ZodEmoji", (e, t) => {
	t.pattern ??= qt(), U.init(e, t);
}), In = /* @__PURE__ */ D("$ZodNanoID", (e, t) => {
	t.pattern ??= Vt, U.init(e, t);
}), Ln = /* @__PURE__ */ D("$ZodCUID", (e, t) => {
	t.pattern ??= It, U.init(e, t);
}), Rn = /* @__PURE__ */ D("$ZodCUID2", (e, t) => {
	t.pattern ??= Lt, U.init(e, t);
}), zn = /* @__PURE__ */ D("$ZodULID", (e, t) => {
	t.pattern ??= Rt, U.init(e, t);
}), Bn = /* @__PURE__ */ D("$ZodXID", (e, t) => {
	t.pattern ??= zt, U.init(e, t);
}), Vn = /* @__PURE__ */ D("$ZodKSUID", (e, t) => {
	t.pattern ??= Bt, U.init(e, t);
}), Hn = /* @__PURE__ */ D("$ZodISODateTime", (e, t) => {
	t.pattern ??= on(t), U.init(e, t);
}), Un = /* @__PURE__ */ D("$ZodISODate", (e, t) => {
	t.pattern ??= nn, U.init(e, t);
}), Wn = /* @__PURE__ */ D("$ZodISOTime", (e, t) => {
	t.pattern ??= an(t), U.init(e, t);
}), Gn = /* @__PURE__ */ D("$ZodISODuration", (e, t) => {
	t.pattern ??= Ht, U.init(e, t);
}), Kn = /* @__PURE__ */ D("$ZodIPv4", (e, t) => {
	t.pattern ??= Jt, U.init(e, t), e._zod.bag.format = "ipv4";
}), qn = /* @__PURE__ */ D("$ZodIPv6", (e, t) => {
	t.pattern ??= Yt, U.init(e, t), e._zod.bag.format = "ipv6", e._zod.check = (n) => {
		try {
			new URL(`http://[${n.value}]`);
		} catch {
			n.issues.push({
				code: "invalid_format",
				format: "ipv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
}), Jn = /* @__PURE__ */ D("$ZodCIDRv4", (e, t) => {
	t.pattern ??= Xt, U.init(e, t);
}), Yn = /* @__PURE__ */ D("$ZodCIDRv6", (e, t) => {
	t.pattern ??= Zt, U.init(e, t), e._zod.check = (n) => {
		let r = n.value.split("/");
		try {
			if (r.length !== 2) throw Error();
			let [e, t] = r;
			if (!t) throw Error();
			let n = Number(t);
			if (`${n}` !== t || n < 0 || n > 128) throw Error();
			new URL(`http://[${e}]`);
		} catch {
			n.issues.push({
				code: "invalid_format",
				format: "cidrv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
});
function Xn(e) {
	if (e === "") return !0;
	if (e.length % 4 != 0) return !1;
	try {
		return atob(e), !0;
	} catch {
		return !1;
	}
}
var Zn = /* @__PURE__ */ D("$ZodBase64", (e, t) => {
	t.pattern ??= Qt, U.init(e, t), e._zod.bag.contentEncoding = "base64", e._zod.check = (n) => {
		Xn(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
});
function Qn(e) {
	if (!$t.test(e)) return !1;
	let t = e.replace(/[-_]/g, (e) => e === "-" ? "+" : "/");
	return Xn(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
var $n = /* @__PURE__ */ D("$ZodBase64URL", (e, t) => {
	t.pattern ??= $t, U.init(e, t), e._zod.bag.contentEncoding = "base64url", e._zod.check = (n) => {
		Qn(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), er = /* @__PURE__ */ D("$ZodE164", (e, t) => {
	t.pattern ??= en, U.init(e, t);
});
function tr(e, t = null) {
	try {
		let n = e.split(".");
		if (n.length !== 3) return !1;
		let [r] = n;
		if (!r) return !1;
		let i = JSON.parse(atob(r));
		return !("typ" in i && i?.typ !== "JWT" || !i.alg || t && (!("alg" in i) || i.alg !== t));
	} catch {
		return !1;
	}
}
var nr = /* @__PURE__ */ D("$ZodJWT", (e, t) => {
	U.init(e, t), e._zod.check = (n) => {
		tr(n.value, t.alg) || n.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), rr = /* @__PURE__ */ D("$ZodNumber", (e, t) => {
	H.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? ln, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = Number(n.value);
		} catch {}
		let i = n.value;
		if (typeof i == "number" && !Number.isNaN(i) && Number.isFinite(i)) return n;
		let a = typeof i == "number" ? Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? void 0 : "Infinity" : void 0;
		return n.issues.push({
			expected: "number",
			code: "invalid_type",
			input: i,
			inst: e,
			...a ? { received: a } : {}
		}), n;
	};
}), ir = /* @__PURE__ */ D("$ZodNumberFormat", (e, t) => {
	gn.init(e, t), rr.init(e, t);
}), ar = /* @__PURE__ */ D("$ZodUnknown", (e, t) => {
	H.init(e, t), e._zod.parse = (e) => e;
}), or = /* @__PURE__ */ D("$ZodNever", (e, t) => {
	H.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
		expected: "never",
		code: "invalid_type",
		input: t.value,
		inst: e
	}), t);
});
function sr(e, t, n) {
	e.issues.length && t.issues.push(...mt(n, e.issues)), t.value[n] = e.value;
}
var cr = /* @__PURE__ */ D("$ZodArray", (e, t) => {
	H.init(e, t), e._zod.parse = (n, r) => {
		let i = n.value;
		if (!Array.isArray(i)) return n.issues.push({
			expected: "array",
			code: "invalid_type",
			input: i,
			inst: e
		}), n;
		n.value = Array(i.length);
		let a = [];
		for (let e = 0; e < i.length; e++) {
			let o = i[e], s = t.element._zod.run({
				value: o,
				issues: []
			}, r);
			s instanceof Promise ? a.push(s.then((t) => sr(t, n, e))) : sr(s, n, e);
		}
		return a.length ? Promise.all(a).then(() => n) : n;
	};
});
function lr(e, t, n, r, i) {
	if (e.issues.length) {
		if (i && !(n in r)) return;
		t.issues.push(...mt(n, e.issues));
	}
	e.value === void 0 ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
function ur(e) {
	let t = Object.keys(e.shape);
	for (let n of t) if (!e.shape?.[n]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${n}": expected a Zod schema`);
	let n = at(e.shape);
	return {
		...e,
		keys: t,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(n)
	};
}
function dr(e, t, n, r, i, a) {
	let o = [], s = i.keySet, c = i.catchall._zod, l = c.def.type, u = c.optout === "optional";
	for (let i in t) {
		if (s.has(i)) continue;
		if (l === "never") {
			o.push(i);
			continue;
		}
		let a = c.run({
			value: t[i],
			issues: []
		}, r);
		a instanceof Promise ? e.push(a.then((e) => lr(e, n, i, t, u))) : lr(a, n, i, t, u);
	}
	return o.length && n.issues.push({
		code: "unrecognized_keys",
		keys: o,
		input: t,
		inst: a
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var fr = /* @__PURE__ */ D("$ZodObject", (e, t) => {
	if (H.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
		let e = t.shape;
		Object.defineProperty(t, "shape", { get: () => {
			let n = { ...e };
			return Object.defineProperty(t, "shape", { value: n }), n;
		} });
	}
	let n = Je(() => ur(t));
	A(e._zod, "propValues", () => {
		let e = t.shape, n = {};
		for (let t in e) {
			let r = e[t]._zod;
			if (r.values) {
				n[t] ?? (n[t] = /* @__PURE__ */ new Set());
				for (let e of r.values) n[t].add(e);
			}
		}
		return n;
	});
	let r = N, i = t.catchall, a;
	e._zod.parse = (t, o) => {
		a ??= n.value;
		let s = t.value;
		if (!r(s)) return t.issues.push({
			expected: "object",
			code: "invalid_type",
			input: s,
			inst: e
		}), t;
		t.value = {};
		let c = [], l = a.shape;
		for (let e of a.keys) {
			let n = l[e], r = n._zod.optout === "optional", i = n._zod.run({
				value: s[e],
				issues: []
			}, o);
			i instanceof Promise ? c.push(i.then((n) => lr(n, t, e, s, r))) : lr(i, t, e, s, r);
		}
		return i ? dr(c, s, t, o, n.value, e) : c.length ? Promise.all(c).then(() => t) : t;
	};
}), pr = /* @__PURE__ */ D("$ZodObjectJIT", (e, t) => {
	fr.init(e, t);
	let n = e._zod.parse, r = Je(() => ur(t)), i = (e) => {
		let t = new On([
			"shape",
			"payload",
			"ctx"
		]), n = r.value, i = (e) => {
			let t = $e(e);
			return `shape[${t}]._zod.run({ value: input[${t}], issues: [] }, ctx)`;
		};
		t.write("const input = payload.value;");
		let a = Object.create(null), o = 0;
		for (let e of n.keys) a[e] = `key_${o++}`;
		t.write("const newResult = {};");
		for (let r of n.keys) {
			let n = a[r], o = $e(r), s = e[r]?._zod?.optout === "optional";
			t.write(`const ${n} = ${i(r)};`), s ? t.write(`
        if (${n}.issues.length) {
          if (${o} in input) {
            payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${o}, ...iss.path] : [${o}]
            })));
          }
        }
        
        if (${n}.value === undefined) {
          if (${o} in input) {
            newResult[${o}] = undefined;
          }
        } else {
          newResult[${o}] = ${n}.value;
        }
        
      `) : t.write(`
        if (${n}.issues.length) {
          payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${o}, ...iss.path] : [${o}]
          })));
        }
        
        if (${n}.value === undefined) {
          if (${o} in input) {
            newResult[${o}] = undefined;
          }
        } else {
          newResult[${o}] = ${n}.value;
        }
        
      `);
		}
		t.write("payload.value = newResult;"), t.write("return payload;");
		let s = t.compile();
		return (t, n) => s(e, t, n);
	}, a, o = N, s = !Ge.jitless, c = s && nt.value, l = t.catchall, u;
	e._zod.parse = (d, f) => {
		u ??= r.value;
		let ee = d.value;
		return o(ee) ? s && c && f?.async === !1 && f.jitless !== !0 ? (a ||= i(t.shape), d = a(d, f), l ? dr([], ee, d, f, u, e) : d) : n(d, f) : (d.issues.push({
			expected: "object",
			code: "invalid_type",
			input: ee,
			inst: e
		}), d);
	};
});
function mr(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !R(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => z(e, r, k())))
	}), t);
}
var hr = /* @__PURE__ */ D("$ZodUnion", (e, t) => {
	H.init(e, t), A(e._zod, "optin", () => t.options.some((e) => e._zod.optin === "optional") ? "optional" : void 0), A(e._zod, "optout", () => t.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), A(e._zod, "values", () => {
		if (t.options.every((e) => e._zod.values)) return new Set(t.options.flatMap((e) => Array.from(e._zod.values)));
	}), A(e._zod, "pattern", () => {
		if (t.options.every((e) => e._zod.pattern)) {
			let e = t.options.map((e) => e._zod.pattern);
			return RegExp(`^(${e.map((e) => Xe(e.source)).join("|")})$`);
		}
	});
	let n = t.options.length === 1, r = t.options[0]._zod.run;
	e._zod.parse = (i, a) => {
		if (n) return r(i, a);
		let o = !1, s = [];
		for (let e of t.options) {
			let t = e._zod.run({
				value: i.value,
				issues: []
			}, a);
			if (t instanceof Promise) s.push(t), o = !0;
			else {
				if (t.issues.length === 0) return t;
				s.push(t);
			}
		}
		return o ? Promise.all(s).then((t) => mr(t, i, e, a)) : mr(s, i, e, a);
	};
}), gr = /* @__PURE__ */ D("$ZodIntersection", (e, t) => {
	H.init(e, t), e._zod.parse = (e, n) => {
		let r = e.value, i = t.left._zod.run({
			value: r,
			issues: []
		}, n), a = t.right._zod.run({
			value: r,
			issues: []
		}, n);
		return i instanceof Promise || a instanceof Promise ? Promise.all([i, a]).then(([t, n]) => vr(e, t, n)) : vr(e, i, a);
	};
});
function _r(e, t) {
	if (e === t || e instanceof Date && t instanceof Date && +e == +t) return {
		valid: !0,
		data: e
	};
	if (P(e) && P(t)) {
		let n = Object.keys(t), r = Object.keys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		for (let n of r) {
			let r = _r(e[n], t[n]);
			if (!r.valid) return {
				valid: !1,
				mergeErrorPath: [n, ...r.mergeErrorPath]
			};
			i[n] = r.data;
		}
		return {
			valid: !0,
			data: i
		};
	}
	if (Array.isArray(e) && Array.isArray(t)) {
		if (e.length !== t.length) return {
			valid: !1,
			mergeErrorPath: []
		};
		let n = [];
		for (let r = 0; r < e.length; r++) {
			let i = e[r], a = t[r], o = _r(i, a);
			if (!o.valid) return {
				valid: !1,
				mergeErrorPath: [r, ...o.mergeErrorPath]
			};
			n.push(o.data);
		}
		return {
			valid: !0,
			data: n
		};
	}
	return {
		valid: !1,
		mergeErrorPath: []
	};
}
function vr(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i;
	for (let n of t.issues) if (n.code === "unrecognized_keys") {
		i ??= n;
		for (let e of n.keys) r.has(e) || r.set(e, {}), r.get(e).l = !0;
	} else e.issues.push(n);
	for (let t of n.issues) if (t.code === "unrecognized_keys") for (let e of t.keys) r.has(e) || r.set(e, {}), r.get(e).r = !0;
	else e.issues.push(t);
	let a = [...r].filter(([, e]) => e.l && e.r).map(([e]) => e);
	if (a.length && i && e.issues.push({
		...i,
		keys: a
	}), R(e)) return e;
	let o = _r(t.value, n.value);
	if (!o.valid) throw Error(`Unmergable intersection. Error path: ${JSON.stringify(o.mergeErrorPath)}`);
	return e.value = o.data, e;
}
var yr = /* @__PURE__ */ D("$ZodEnum", (e, t) => {
	H.init(e, t);
	let n = Ke(t.entries), r = new Set(n);
	e._zod.values = r, e._zod.pattern = RegExp(`^(${n.filter((e) => it.has(typeof e)).map((e) => typeof e == "string" ? F(e) : e.toString()).join("|")})$`), e._zod.parse = (t, i) => {
		let a = t.value;
		return r.has(a) || t.issues.push({
			code: "invalid_value",
			values: n,
			input: a,
			inst: e
		}), t;
	};
}), br = /* @__PURE__ */ D("$ZodTransform", (e, t) => {
	H.init(e, t), e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new We(e.constructor.name);
		let i = t.transform(n.value, n);
		if (r.async) return (i instanceof Promise ? i : Promise.resolve(i)).then((e) => (n.value = e, n));
		if (i instanceof Promise) throw new O();
		return n.value = i, n;
	};
});
function xr(e, t) {
	return e.issues.length && t === void 0 ? {
		issues: [],
		value: void 0
	} : e;
}
var Sr = /* @__PURE__ */ D("$ZodOptional", (e, t) => {
	H.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", A(e._zod, "values", () => t.innerType._zod.values ? new Set([...t.innerType._zod.values, void 0]) : void 0), A(e._zod, "pattern", () => {
		let e = t.innerType._zod.pattern;
		return e ? RegExp(`^(${Xe(e.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (t.innerType._zod.optin === "optional") {
			let r = t.innerType._zod.run(e, n);
			return r instanceof Promise ? r.then((t) => xr(t, e.value)) : xr(r, e.value);
		}
		return e.value === void 0 ? e : t.innerType._zod.run(e, n);
	};
}), Cr = /* @__PURE__ */ D("$ZodExactOptional", (e, t) => {
	Sr.init(e, t), A(e._zod, "values", () => t.innerType._zod.values), A(e._zod, "pattern", () => t.innerType._zod.pattern), e._zod.parse = (e, n) => t.innerType._zod.run(e, n);
}), wr = /* @__PURE__ */ D("$ZodNullable", (e, t) => {
	H.init(e, t), A(e._zod, "optin", () => t.innerType._zod.optin), A(e._zod, "optout", () => t.innerType._zod.optout), A(e._zod, "pattern", () => {
		let e = t.innerType._zod.pattern;
		return e ? RegExp(`^(${Xe(e.source)}|null)$`) : void 0;
	}), A(e._zod, "values", () => t.innerType._zod.values ? new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
}), Tr = /* @__PURE__ */ D("$ZodDefault", (e, t) => {
	H.init(e, t), e._zod.optin = "optional", A(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		if (e.value === void 0) return e.value = t.defaultValue, e;
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => Er(e, t)) : Er(r, t);
	};
});
function Er(e, t) {
	return e.value === void 0 && (e.value = t.defaultValue), e;
}
var Dr = /* @__PURE__ */ D("$ZodPrefault", (e, t) => {
	H.init(e, t), e._zod.optin = "optional", A(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => (n.direction === "backward" || e.value === void 0 && (e.value = t.defaultValue), t.innerType._zod.run(e, n));
}), Or = /* @__PURE__ */ D("$ZodNonOptional", (e, t) => {
	H.init(e, t), A(e._zod, "values", () => {
		let e = t.innerType._zod.values;
		return e ? new Set([...e].filter((e) => e !== void 0)) : void 0;
	}), e._zod.parse = (n, r) => {
		let i = t.innerType._zod.run(n, r);
		return i instanceof Promise ? i.then((t) => kr(t, e)) : kr(i, e);
	};
});
function kr(e, t) {
	return !e.issues.length && e.value === void 0 && e.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: e.value,
		inst: t
	}), e;
}
var Ar = /* @__PURE__ */ D("$ZodCatch", (e, t) => {
	H.init(e, t), A(e._zod, "optin", () => t.innerType._zod.optin), A(e._zod, "optout", () => t.innerType._zod.optout), A(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((r) => (e.value = r.value, r.issues.length && (e.value = t.catchValue({
			...e,
			error: { issues: r.issues.map((e) => z(e, n, k())) },
			input: e.value
		}), e.issues = []), e)) : (e.value = r.value, r.issues.length && (e.value = t.catchValue({
			...e,
			error: { issues: r.issues.map((e) => z(e, n, k())) },
			input: e.value
		}), e.issues = []), e);
	};
}), jr = /* @__PURE__ */ D("$ZodPipe", (e, t) => {
	H.init(e, t), A(e._zod, "values", () => t.in._zod.values), A(e._zod, "optin", () => t.in._zod.optin), A(e._zod, "optout", () => t.out._zod.optout), A(e._zod, "propValues", () => t.in._zod.propValues), e._zod.parse = (e, n) => {
		if (n.direction === "backward") {
			let r = t.out._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => Mr(e, t.in, n)) : Mr(r, t.in, n);
		}
		let r = t.in._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => Mr(e, t.out, n)) : Mr(r, t.out, n);
	};
});
function Mr(e, t, n) {
	return e.issues.length ? (e.aborted = !0, e) : t._zod.run({
		value: e.value,
		issues: e.issues
	}, n);
}
var Nr = /* @__PURE__ */ D("$ZodReadonly", (e, t) => {
	H.init(e, t), A(e._zod, "propValues", () => t.innerType._zod.propValues), A(e._zod, "values", () => t.innerType._zod.values), A(e._zod, "optin", () => t.innerType?._zod?.optin), A(e._zod, "optout", () => t.innerType?._zod?.optout), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then(Pr) : Pr(r);
	};
});
function Pr(e) {
	return e.value = Object.freeze(e.value), e;
}
var Fr = /* @__PURE__ */ D("$ZodCustom", (e, t) => {
	V.init(e, t), H.init(e, t), e._zod.parse = (e, t) => e, e._zod.check = (n) => {
		let r = n.value, i = t.fn(r);
		if (i instanceof Promise) return i.then((t) => Ir(t, n, r, e));
		Ir(i, n, r, e);
	};
});
function Ir(e, t, n, r) {
	if (!e) {
		let e = {
			code: "custom",
			input: n,
			inst: r,
			path: [...r._zod.def.path ?? []],
			continue: !r._zod.def.abort
		};
		r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(B(e));
	}
}
//#endregion
//#region node_modules/zod/v4/core/registries.js
var Lr, Rr = class {
	constructor() {
		this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
	}
	add(e, ...t) {
		let n = t[0];
		return this._map.set(e, n), n && typeof n == "object" && "id" in n && this._idmap.set(n.id, e), this;
	}
	clear() {
		return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
	}
	remove(e) {
		let t = this._map.get(e);
		return t && typeof t == "object" && "id" in t && this._idmap.delete(t.id), this._map.delete(e), this;
	}
	get(e) {
		let t = e._zod.parent;
		if (t) {
			let n = { ...this.get(t) ?? {} };
			delete n.id;
			let r = {
				...n,
				...this._map.get(e)
			};
			return Object.keys(r).length ? r : void 0;
		}
		return this._map.get(e);
	}
	has(e) {
		return this._map.has(e);
	}
};
function zr() {
	return new Rr();
}
(Lr = globalThis).__zod_globalRegistry ?? (Lr.__zod_globalRegistry = zr());
var W = globalThis.__zod_globalRegistry;
//#endregion
//#region node_modules/zod/v4/core/api.js
/* @__NO_SIDE_EFFECTS__ */
function Br(e, t) {
	return new e({
		type: "string",
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Vr(e, t) {
	return new e({
		type: "string",
		format: "email",
		check: "string_format",
		abort: !1,
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Hr(e, t) {
	return new e({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: !1,
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Ur(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Wr(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v4",
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Gr(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v6",
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Kr(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v7",
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function qr(e, t) {
	return new e({
		type: "string",
		format: "url",
		check: "string_format",
		abort: !1,
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Jr(e, t) {
	return new e({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: !1,
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Yr(e, t) {
	return new e({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: !1,
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Xr(e, t) {
	return new e({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: !1,
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Zr(e, t) {
	return new e({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: !1,
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Qr(e, t) {
	return new e({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: !1,
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function $r(e, t) {
	return new e({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: !1,
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ei(e, t) {
	return new e({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: !1,
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ti(e, t) {
	return new e({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: !1,
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ni(e, t) {
	return new e({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: !1,
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ri(e, t) {
	return new e({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: !1,
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ii(e, t) {
	return new e({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: !1,
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ai(e, t) {
	return new e({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: !1,
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function oi(e, t) {
	return new e({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: !1,
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function si(e, t) {
	return new e({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: !1,
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ci(e, t) {
	return new e({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: !1,
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function li(e, t) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ui(e, t) {
	return new e({
		type: "string",
		format: "date",
		check: "string_format",
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function di(e, t) {
	return new e({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function fi(e, t) {
	return new e({
		type: "string",
		format: "duration",
		check: "string_format",
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function pi(e, t) {
	return new e({
		type: "number",
		checks: [],
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function mi(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "safeint",
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function hi(e) {
	return new e({ type: "unknown" });
}
/* @__NO_SIDE_EFFECTS__ */
function gi(e, t) {
	return new e({
		type: "never",
		...L(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _i(e, t) {
	return new pn({
		check: "less_than",
		...L(t),
		value: e,
		inclusive: !1
	});
}
/* @__NO_SIDE_EFFECTS__ */
function vi(e, t) {
	return new pn({
		check: "less_than",
		...L(t),
		value: e,
		inclusive: !0
	});
}
/* @__NO_SIDE_EFFECTS__ */
function yi(e, t) {
	return new mn({
		check: "greater_than",
		...L(t),
		value: e,
		inclusive: !1
	});
}
/* @__NO_SIDE_EFFECTS__ */
function bi(e, t) {
	return new mn({
		check: "greater_than",
		...L(t),
		value: e,
		inclusive: !0
	});
}
/* @__NO_SIDE_EFFECTS__ */
function xi(e, t) {
	return new hn({
		check: "multiple_of",
		...L(t),
		value: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Si(e, t) {
	return new _n({
		check: "max_length",
		...L(t),
		maximum: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Ci(e, t) {
	return new vn({
		check: "min_length",
		...L(t),
		minimum: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function wi(e, t) {
	return new yn({
		check: "length_equals",
		...L(t),
		length: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Ti(e, t) {
	return new xn({
		check: "string_format",
		format: "regex",
		...L(t),
		pattern: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Ei(e) {
	return new Sn({
		check: "string_format",
		format: "lowercase",
		...L(e)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Di(e) {
	return new Cn({
		check: "string_format",
		format: "uppercase",
		...L(e)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Oi(e, t) {
	return new wn({
		check: "string_format",
		format: "includes",
		...L(t),
		includes: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ki(e, t) {
	return new Tn({
		check: "string_format",
		format: "starts_with",
		...L(t),
		prefix: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Ai(e, t) {
	return new En({
		check: "string_format",
		format: "ends_with",
		...L(t),
		suffix: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function G(e) {
	return new Dn({
		check: "overwrite",
		tx: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ji(e) {
	return /* @__PURE__ */ G((t) => t.normalize(e));
}
/* @__NO_SIDE_EFFECTS__ */
function Mi() {
	return /* @__PURE__ */ G((e) => e.trim());
}
/* @__NO_SIDE_EFFECTS__ */
function Ni() {
	return /* @__PURE__ */ G((e) => e.toLowerCase());
}
/* @__NO_SIDE_EFFECTS__ */
function Pi() {
	return /* @__PURE__ */ G((e) => e.toUpperCase());
}
/* @__NO_SIDE_EFFECTS__ */
function Fi() {
	return /* @__PURE__ */ G((e) => et(e));
}
/* @__NO_SIDE_EFFECTS__ */
function Ii(e, t, n) {
	return new e({
		type: "array",
		element: t,
		...L(n)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Li(e, t, n) {
	return new e({
		type: "custom",
		check: "custom",
		fn: t,
		...L(n)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Ri(e) {
	let t = /* @__PURE__ */ zi((n) => (n.addIssue = (e) => {
		if (typeof e == "string") n.issues.push(B(e, n.value, t._zod.def));
		else {
			let r = e;
			r.fatal && (r.continue = !1), r.code ??= "custom", r.input ??= n.value, r.inst ??= t, r.continue ??= !t._zod.def.abort, n.issues.push(B(r));
		}
	}, e(n.value, n)));
	return t;
}
/* @__NO_SIDE_EFFECTS__ */
function zi(e, t) {
	let n = new V({
		check: "custom",
		...L(t)
	});
	return n._zod.check = e, n;
}
//#endregion
//#region node_modules/zod/v4/core/to-json-schema.js
function Bi(e) {
	let t = e?.target ?? "draft-2020-12";
	return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
		processors: e.processors ?? {},
		metadataRegistry: e?.metadata ?? W,
		target: t,
		unrepresentable: e?.unrepresentable ?? "throw",
		override: e?.override ?? (() => {}),
		io: e?.io ?? "output",
		counter: 0,
		seen: /* @__PURE__ */ new Map(),
		cycles: e?.cycles ?? "ref",
		reused: e?.reused ?? "inline",
		external: e?.external ?? void 0
	};
}
function K(e, t, n = {
	path: [],
	schemaPath: []
}) {
	var r;
	let i = e._zod.def, a = t.seen.get(e);
	if (a) return a.count++, n.schemaPath.includes(e) && (a.cycle = n.path), a.schema;
	let o = {
		schema: {},
		count: 1,
		cycle: void 0,
		path: n.path
	};
	t.seen.set(e, o);
	let s = e._zod.toJSONSchema?.();
	if (s) o.schema = s;
	else {
		let r = {
			...n,
			schemaPath: [...n.schemaPath, e],
			path: n.path
		};
		if (e._zod.processJSONSchema) e._zod.processJSONSchema(t, o.schema, r);
		else {
			let n = o.schema, a = t.processors[i.type];
			if (!a) throw Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);
			a(e, t, n, r);
		}
		let a = e._zod.parent;
		a && (o.ref ||= a, K(a, t, r), t.seen.get(a).isParent = !0);
	}
	let c = t.metadataRegistry.get(e);
	return c && Object.assign(o.schema, c), t.io === "input" && q(e) && (delete o.schema.examples, delete o.schema.default), t.io === "input" && o.schema._prefault && ((r = o.schema).default ?? (r.default = o.schema._prefault)), delete o.schema._prefault, t.seen.get(e).schema;
}
function Vi(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = /* @__PURE__ */ new Map();
	for (let t of e.seen.entries()) {
		let n = e.metadataRegistry.get(t[0])?.id;
		if (n) {
			let e = r.get(n);
			if (e && e !== t[0]) throw Error(`Duplicate schema id "${n}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
			r.set(n, t[0]);
		}
	}
	let i = (t) => {
		let r = e.target === "draft-2020-12" ? "$defs" : "definitions";
		if (e.external) {
			let n = e.external.registry.get(t[0])?.id, i = e.external.uri ?? ((e) => e);
			if (n) return { ref: i(n) };
			let a = t[1].defId ?? t[1].schema.id ?? `schema${e.counter++}`;
			return t[1].defId = a, {
				defId: a,
				ref: `${i("__shared")}#/${r}/${a}`
			};
		}
		if (t[1] === n) return { ref: "#" };
		let i = `#/${r}/`, a = t[1].schema.id ?? `__schema${e.counter++}`;
		return {
			defId: a,
			ref: i + a
		};
	}, a = (e) => {
		if (e[1].schema.$ref) return;
		let t = e[1], { ref: n, defId: r } = i(e);
		t.def = { ...t.schema }, r && (t.defId = r);
		let a = t.schema;
		for (let e in a) delete a[e];
		a.$ref = n;
	};
	if (e.cycles === "throw") for (let t of e.seen.entries()) {
		let e = t[1];
		if (e.cycle) throw Error(`Cycle detected: #/${e.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
	}
	for (let n of e.seen.entries()) {
		let r = n[1];
		if (t === n[0]) {
			a(n);
			continue;
		}
		if (e.external) {
			let r = e.external.registry.get(n[0])?.id;
			if (t !== n[0] && r) {
				a(n);
				continue;
			}
		}
		if (e.metadataRegistry.get(n[0])?.id) {
			a(n);
			continue;
		}
		if (r.cycle) {
			a(n);
			continue;
		}
		if (r.count > 1 && e.reused === "ref") {
			a(n);
			continue;
		}
	}
}
function Hi(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = (t) => {
		let n = e.seen.get(t);
		if (n.ref === null) return;
		let i = n.def ?? n.schema, a = { ...i }, o = n.ref;
		if (n.ref = null, o) {
			r(o);
			let n = e.seen.get(o), s = n.schema;
			if (s.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (i.allOf = i.allOf ?? [], i.allOf.push(s)) : Object.assign(i, s), Object.assign(i, a), t._zod.parent === o) for (let e in i) e === "$ref" || e === "allOf" || e in a || delete i[e];
			if (s.$ref && n.def) for (let e in i) e === "$ref" || e === "allOf" || e in n.def && JSON.stringify(i[e]) === JSON.stringify(n.def[e]) && delete i[e];
		}
		let s = t._zod.parent;
		if (s && s !== o) {
			r(s);
			let t = e.seen.get(s);
			if (t?.schema.$ref && (i.$ref = t.schema.$ref, t.def)) for (let e in i) e === "$ref" || e === "allOf" || e in t.def && JSON.stringify(i[e]) === JSON.stringify(t.def[e]) && delete i[e];
		}
		e.override({
			zodSchema: t,
			jsonSchema: i,
			path: n.path ?? []
		});
	};
	for (let t of [...e.seen.entries()].reverse()) r(t[0]);
	let i = {};
	if (e.target === "draft-2020-12" ? i.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? i.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? i.$schema = "http://json-schema.org/draft-04/schema#" : e.target, e.external?.uri) {
		let n = e.external.registry.get(t)?.id;
		if (!n) throw Error("Schema is missing an `id` property");
		i.$id = e.external.uri(n);
	}
	Object.assign(i, n.def ?? n.schema);
	let a = e.external?.defs ?? {};
	for (let t of e.seen.entries()) {
		let e = t[1];
		e.def && e.defId && (a[e.defId] = e.def);
	}
	e.external || Object.keys(a).length > 0 && (e.target === "draft-2020-12" ? i.$defs = a : i.definitions = a);
	try {
		let n = JSON.parse(JSON.stringify(i));
		return Object.defineProperty(n, "~standard", {
			value: {
				...t["~standard"],
				jsonSchema: {
					input: Wi(t, "input", e.processors),
					output: Wi(t, "output", e.processors)
				}
			},
			enumerable: !1,
			writable: !1
		}), n;
	} catch {
		throw Error("Error converting schema to JSON.");
	}
}
function q(e, t) {
	let n = t ?? { seen: /* @__PURE__ */ new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	let r = e._zod.def;
	if (r.type === "transform") return !0;
	if (r.type === "array") return q(r.element, n);
	if (r.type === "set") return q(r.valueType, n);
	if (r.type === "lazy") return q(r.getter(), n);
	if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault") return q(r.innerType, n);
	if (r.type === "intersection") return q(r.left, n) || q(r.right, n);
	if (r.type === "record" || r.type === "map") return q(r.keyType, n) || q(r.valueType, n);
	if (r.type === "pipe") return q(r.in, n) || q(r.out, n);
	if (r.type === "object") {
		for (let e in r.shape) if (q(r.shape[e], n)) return !0;
		return !1;
	}
	if (r.type === "union") {
		for (let e of r.options) if (q(e, n)) return !0;
		return !1;
	}
	if (r.type === "tuple") {
		for (let e of r.items) if (q(e, n)) return !0;
		return !!(r.rest && q(r.rest, n));
	}
	return !1;
}
var Ui = (e, t = {}) => (n) => {
	let r = Bi({
		...n,
		processors: t
	});
	return K(e, r), Vi(r, e), Hi(r, e);
}, Wi = (e, t, n = {}) => (r) => {
	let { libraryOptions: i, target: a } = r ?? {}, o = Bi({
		...i ?? {},
		target: a,
		io: t,
		processors: n
	});
	return K(e, o), Vi(o, e), Hi(o, e);
}, Gi = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: ""
}, Ki = (e, t, n, r) => {
	let i = n;
	i.type = "string";
	let { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l } = e._zod.bag;
	if (typeof a == "number" && (i.minLength = a), typeof o == "number" && (i.maxLength = o), s && (i.format = Gi[s] ?? s, i.format === "" && delete i.format, s === "time" && delete i.format), l && (i.contentEncoding = l), c && c.size > 0) {
		let e = [...c];
		e.length === 1 ? i.pattern = e[0].source : e.length > 1 && (i.allOf = [...e.map((e) => ({
			...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
			pattern: e.source
		}))]);
	}
}, qi = (e, t, n, r) => {
	let i = n, { minimum: a, maximum: o, format: s, multipleOf: c, exclusiveMaximum: l, exclusiveMinimum: u } = e._zod.bag;
	typeof s == "string" && s.includes("int") ? i.type = "integer" : i.type = "number", typeof u == "number" && (t.target === "draft-04" || t.target === "openapi-3.0" ? (i.minimum = u, i.exclusiveMinimum = !0) : i.exclusiveMinimum = u), typeof a == "number" && (i.minimum = a, typeof u == "number" && t.target !== "draft-04" && (u >= a ? delete i.minimum : delete i.exclusiveMinimum)), typeof l == "number" && (t.target === "draft-04" || t.target === "openapi-3.0" ? (i.maximum = l, i.exclusiveMaximum = !0) : i.exclusiveMaximum = l), typeof o == "number" && (i.maximum = o, typeof l == "number" && t.target !== "draft-04" && (l <= o ? delete i.maximum : delete i.exclusiveMaximum)), typeof c == "number" && (i.multipleOf = c);
}, Ji = (e, t, n, r) => {
	n.not = {};
}, Yi = (e, t, n, r) => {
	let i = e._zod.def, a = Ke(i.entries);
	a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), n.enum = a;
}, Xi = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Custom types cannot be represented in JSON Schema");
}, Zi = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Transforms cannot be represented in JSON Schema");
}, Qi = (e, t, n, r) => {
	let i = n, a = e._zod.def, { minimum: o, maximum: s } = e._zod.bag;
	typeof o == "number" && (i.minItems = o), typeof s == "number" && (i.maxItems = s), i.type = "array", i.items = K(a.element, t, {
		...r,
		path: [...r.path, "items"]
	});
}, $i = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "object", i.properties = {};
	let o = a.shape;
	for (let e in o) i.properties[e] = K(o[e], t, {
		...r,
		path: [
			...r.path,
			"properties",
			e
		]
	});
	let s = new Set(Object.keys(o)), c = new Set([...s].filter((e) => {
		let n = a.shape[e]._zod;
		return t.io === "input" ? n.optin === void 0 : n.optout === void 0;
	}));
	c.size > 0 && (i.required = Array.from(c)), a.catchall?._zod.def.type === "never" ? i.additionalProperties = !1 : a.catchall ? a.catchall && (i.additionalProperties = K(a.catchall, t, {
		...r,
		path: [...r.path, "additionalProperties"]
	})) : t.io === "output" && (i.additionalProperties = !1);
}, ea = (e, t, n, r) => {
	let i = e._zod.def, a = i.inclusive === !1, o = i.options.map((e, n) => K(e, t, {
		...r,
		path: [
			...r.path,
			a ? "oneOf" : "anyOf",
			n
		]
	}));
	a ? n.oneOf = o : n.anyOf = o;
}, ta = (e, t, n, r) => {
	let i = e._zod.def, a = K(i.left, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			0
		]
	}), o = K(i.right, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			1
		]
	}), s = (e) => "allOf" in e && Object.keys(e).length === 1;
	n.allOf = [...s(a) ? a.allOf : [a], ...s(o) ? o.allOf : [o]];
}, na = (e, t, n, r) => {
	let i = e._zod.def, a = K(i.innerType, t, r), o = t.seen.get(e);
	t.target === "openapi-3.0" ? (o.ref = i.innerType, n.nullable = !0) : n.anyOf = [a, { type: "null" }];
}, ra = (e, t, n, r) => {
	let i = e._zod.def;
	K(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, ia = (e, t, n, r) => {
	let i = e._zod.def;
	K(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.default = JSON.parse(JSON.stringify(i.defaultValue));
}, aa = (e, t, n, r) => {
	let i = e._zod.def;
	K(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, t.io === "input" && (n._prefault = JSON.parse(JSON.stringify(i.defaultValue)));
}, oa = (e, t, n, r) => {
	let i = e._zod.def;
	K(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
	let o;
	try {
		o = i.catchValue(void 0);
	} catch {
		throw Error("Dynamic catch values are not supported in JSON Schema");
	}
	n.default = o;
}, sa = (e, t, n, r) => {
	let i = e._zod.def, a = t.io === "input" ? i.in._zod.def.type === "transform" ? i.out : i.in : i.out;
	K(a, t, r);
	let o = t.seen.get(e);
	o.ref = a;
}, ca = (e, t, n, r) => {
	let i = e._zod.def;
	K(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.readOnly = !0;
}, la = (e, t, n, r) => {
	let i = e._zod.def;
	K(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, ua = /* @__PURE__ */ D("ZodISODateTime", (e, t) => {
	Hn.init(e, t), X.init(e, t);
});
function da(e) {
	return /* @__PURE__ */ li(ua, e);
}
var fa = /* @__PURE__ */ D("ZodISODate", (e, t) => {
	Un.init(e, t), X.init(e, t);
});
function pa(e) {
	return /* @__PURE__ */ ui(fa, e);
}
var ma = /* @__PURE__ */ D("ZodISOTime", (e, t) => {
	Wn.init(e, t), X.init(e, t);
});
function ha(e) {
	return /* @__PURE__ */ di(ma, e);
}
var ga = /* @__PURE__ */ D("ZodISODuration", (e, t) => {
	Gn.init(e, t), X.init(e, t);
});
function _a(e) {
	return /* @__PURE__ */ fi(ga, e);
}
//#endregion
//#region node_modules/zod/v4/classic/errors.js
var va = (e, t) => {
	vt.init(e, t), e.name = "ZodError", Object.defineProperties(e, {
		format: { value: (t) => xt(e, t) },
		flatten: { value: (t) => bt(e, t) },
		addIssue: { value: (t) => {
			e.issues.push(t), e.message = JSON.stringify(e.issues, qe, 2);
		} },
		addIssues: { value: (t) => {
			e.issues.push(...t), e.message = JSON.stringify(e.issues, qe, 2);
		} },
		isEmpty: { get() {
			return e.issues.length === 0;
		} }
	});
};
D("ZodError", va);
var J = D("ZodError", va, { Parent: Error }), ya = /* @__PURE__ */ St(J), ba = /* @__PURE__ */ Ct(J), xa = /* @__PURE__ */ wt(J), Sa = /* @__PURE__ */ Et(J), Ca = /* @__PURE__ */ Ot(J), wa = /* @__PURE__ */ kt(J), Ta = /* @__PURE__ */ At(J), Ea = /* @__PURE__ */ jt(J), Da = /* @__PURE__ */ Mt(J), Oa = /* @__PURE__ */ Nt(J), ka = /* @__PURE__ */ Pt(J), Aa = /* @__PURE__ */ Ft(J), Y = /* @__PURE__ */ D("ZodType", (e, t) => (H.init(e, t), Object.assign(e["~standard"], { jsonSchema: {
	input: Wi(e, "input"),
	output: Wi(e, "output")
} }), e.toJSONSchema = Ui(e, {}), e.def = t, e.type = t.type, Object.defineProperty(e, "_def", { value: t }), e.check = (...n) => e.clone(M(t, { checks: [...t.checks ?? [], ...n.map((e) => typeof e == "function" ? { _zod: {
	check: e,
	def: { check: "custom" },
	onattach: []
} } : e)] }), { parent: !0 }), e.with = e.check, e.clone = (t, n) => I(e, t, n), e.brand = () => e, e.register = ((t, n) => (t.add(e, n), e)), e.parse = (t, n) => ya(e, t, n, { callee: e.parse }), e.safeParse = (t, n) => xa(e, t, n), e.parseAsync = async (t, n) => ba(e, t, n, { callee: e.parseAsync }), e.safeParseAsync = async (t, n) => Sa(e, t, n), e.spa = e.safeParseAsync, e.encode = (t, n) => Ca(e, t, n), e.decode = (t, n) => wa(e, t, n), e.encodeAsync = async (t, n) => Ta(e, t, n), e.decodeAsync = async (t, n) => Ea(e, t, n), e.safeEncode = (t, n) => Da(e, t, n), e.safeDecode = (t, n) => Oa(e, t, n), e.safeEncodeAsync = async (t, n) => ka(e, t, n), e.safeDecodeAsync = async (t, n) => Aa(e, t, n), e.refine = (t, n) => e.check(zo(t, n)), e.superRefine = (t) => e.check(Bo(t)), e.overwrite = (t) => e.check(/* @__PURE__ */ G(t)), e.optional = () => xo(e), e.exactOptional = () => Co(e), e.nullable = () => To(e), e.nullish = () => xo(To(e)), e.nonoptional = (t) => jo(e, t), e.array = () => co(e), e.or = (t) => po([e, t]), e.and = (t) => ho(e, t), e.transform = (t) => Fo(e, yo(t)), e.default = (t) => Do(e, t), e.prefault = (t) => ko(e, t), e.catch = (t) => No(e, t), e.pipe = (t) => Fo(e, t), e.readonly = () => Lo(e), e.describe = (t) => {
	let n = e.clone();
	return W.add(n, { description: t }), n;
}, Object.defineProperty(e, "description", {
	get() {
		return W.get(e)?.description;
	},
	configurable: !0
}), e.meta = (...t) => {
	if (t.length === 0) return W.get(e);
	let n = e.clone();
	return W.add(n, t[0]), n;
}, e.isOptional = () => e.safeParse(void 0).success, e.isNullable = () => e.safeParse(null).success, e.apply = (t) => t(e), e)), ja = /* @__PURE__ */ D("_ZodString", (e, t) => {
	An.init(e, t), Y.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ki(e, t, n, r);
	let n = e._zod.bag;
	e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null, e.regex = (...t) => e.check(/* @__PURE__ */ Ti(...t)), e.includes = (...t) => e.check(/* @__PURE__ */ Oi(...t)), e.startsWith = (...t) => e.check(/* @__PURE__ */ ki(...t)), e.endsWith = (...t) => e.check(/* @__PURE__ */ Ai(...t)), e.min = (...t) => e.check(/* @__PURE__ */ Ci(...t)), e.max = (...t) => e.check(/* @__PURE__ */ Si(...t)), e.length = (...t) => e.check(/* @__PURE__ */ wi(...t)), e.nonempty = (...t) => e.check(/* @__PURE__ */ Ci(1, ...t)), e.lowercase = (t) => e.check(/* @__PURE__ */ Ei(t)), e.uppercase = (t) => e.check(/* @__PURE__ */ Di(t)), e.trim = () => e.check(/* @__PURE__ */ Mi()), e.normalize = (...t) => e.check(/* @__PURE__ */ ji(...t)), e.toLowerCase = () => e.check(/* @__PURE__ */ Ni()), e.toUpperCase = () => e.check(/* @__PURE__ */ Pi()), e.slugify = () => e.check(/* @__PURE__ */ Fi());
}), Ma = /* @__PURE__ */ D("ZodString", (e, t) => {
	An.init(e, t), ja.init(e, t), e.email = (t) => e.check(/* @__PURE__ */ Vr(Pa, t)), e.url = (t) => e.check(/* @__PURE__ */ qr(La, t)), e.jwt = (t) => e.check(/* @__PURE__ */ ci(Qa, t)), e.emoji = (t) => e.check(/* @__PURE__ */ Jr(Ra, t)), e.guid = (t) => e.check(/* @__PURE__ */ Hr(Fa, t)), e.uuid = (t) => e.check(/* @__PURE__ */ Ur(Ia, t)), e.uuidv4 = (t) => e.check(/* @__PURE__ */ Wr(Ia, t)), e.uuidv6 = (t) => e.check(/* @__PURE__ */ Gr(Ia, t)), e.uuidv7 = (t) => e.check(/* @__PURE__ */ Kr(Ia, t)), e.nanoid = (t) => e.check(/* @__PURE__ */ Yr(za, t)), e.guid = (t) => e.check(/* @__PURE__ */ Hr(Fa, t)), e.cuid = (t) => e.check(/* @__PURE__ */ Xr(Ba, t)), e.cuid2 = (t) => e.check(/* @__PURE__ */ Zr(Va, t)), e.ulid = (t) => e.check(/* @__PURE__ */ Qr(Ha, t)), e.base64 = (t) => e.check(/* @__PURE__ */ ai(Ya, t)), e.base64url = (t) => e.check(/* @__PURE__ */ oi(Xa, t)), e.xid = (t) => e.check(/* @__PURE__ */ $r(Ua, t)), e.ksuid = (t) => e.check(/* @__PURE__ */ ei(Wa, t)), e.ipv4 = (t) => e.check(/* @__PURE__ */ ti(Ga, t)), e.ipv6 = (t) => e.check(/* @__PURE__ */ ni(Ka, t)), e.cidrv4 = (t) => e.check(/* @__PURE__ */ ri(qa, t)), e.cidrv6 = (t) => e.check(/* @__PURE__ */ ii(Ja, t)), e.e164 = (t) => e.check(/* @__PURE__ */ si(Za, t)), e.datetime = (t) => e.check(da(t)), e.date = (t) => e.check(pa(t)), e.time = (t) => e.check(ha(t)), e.duration = (t) => e.check(_a(t));
});
function Na(e) {
	return /* @__PURE__ */ Br(Ma, e);
}
var X = /* @__PURE__ */ D("ZodStringFormat", (e, t) => {
	U.init(e, t), ja.init(e, t);
}), Pa = /* @__PURE__ */ D("ZodEmail", (e, t) => {
	Nn.init(e, t), X.init(e, t);
}), Fa = /* @__PURE__ */ D("ZodGUID", (e, t) => {
	jn.init(e, t), X.init(e, t);
}), Ia = /* @__PURE__ */ D("ZodUUID", (e, t) => {
	Mn.init(e, t), X.init(e, t);
}), La = /* @__PURE__ */ D("ZodURL", (e, t) => {
	Pn.init(e, t), X.init(e, t);
}), Ra = /* @__PURE__ */ D("ZodEmoji", (e, t) => {
	Fn.init(e, t), X.init(e, t);
}), za = /* @__PURE__ */ D("ZodNanoID", (e, t) => {
	In.init(e, t), X.init(e, t);
}), Ba = /* @__PURE__ */ D("ZodCUID", (e, t) => {
	Ln.init(e, t), X.init(e, t);
}), Va = /* @__PURE__ */ D("ZodCUID2", (e, t) => {
	Rn.init(e, t), X.init(e, t);
}), Ha = /* @__PURE__ */ D("ZodULID", (e, t) => {
	zn.init(e, t), X.init(e, t);
}), Ua = /* @__PURE__ */ D("ZodXID", (e, t) => {
	Bn.init(e, t), X.init(e, t);
}), Wa = /* @__PURE__ */ D("ZodKSUID", (e, t) => {
	Vn.init(e, t), X.init(e, t);
}), Ga = /* @__PURE__ */ D("ZodIPv4", (e, t) => {
	Kn.init(e, t), X.init(e, t);
}), Ka = /* @__PURE__ */ D("ZodIPv6", (e, t) => {
	qn.init(e, t), X.init(e, t);
}), qa = /* @__PURE__ */ D("ZodCIDRv4", (e, t) => {
	Jn.init(e, t), X.init(e, t);
}), Ja = /* @__PURE__ */ D("ZodCIDRv6", (e, t) => {
	Yn.init(e, t), X.init(e, t);
}), Ya = /* @__PURE__ */ D("ZodBase64", (e, t) => {
	Zn.init(e, t), X.init(e, t);
}), Xa = /* @__PURE__ */ D("ZodBase64URL", (e, t) => {
	$n.init(e, t), X.init(e, t);
}), Za = /* @__PURE__ */ D("ZodE164", (e, t) => {
	er.init(e, t), X.init(e, t);
}), Qa = /* @__PURE__ */ D("ZodJWT", (e, t) => {
	nr.init(e, t), X.init(e, t);
}), $a = /* @__PURE__ */ D("ZodNumber", (e, t) => {
	rr.init(e, t), Y.init(e, t), e._zod.processJSONSchema = (t, n, r) => qi(e, t, n, r), e.gt = (t, n) => e.check(/* @__PURE__ */ yi(t, n)), e.gte = (t, n) => e.check(/* @__PURE__ */ bi(t, n)), e.min = (t, n) => e.check(/* @__PURE__ */ bi(t, n)), e.lt = (t, n) => e.check(/* @__PURE__ */ _i(t, n)), e.lte = (t, n) => e.check(/* @__PURE__ */ vi(t, n)), e.max = (t, n) => e.check(/* @__PURE__ */ vi(t, n)), e.int = (t) => e.check(no(t)), e.safe = (t) => e.check(no(t)), e.positive = (t) => e.check(/* @__PURE__ */ yi(0, t)), e.nonnegative = (t) => e.check(/* @__PURE__ */ bi(0, t)), e.negative = (t) => e.check(/* @__PURE__ */ _i(0, t)), e.nonpositive = (t) => e.check(/* @__PURE__ */ vi(0, t)), e.multipleOf = (t, n) => e.check(/* @__PURE__ */ xi(t, n)), e.step = (t, n) => e.check(/* @__PURE__ */ xi(t, n)), e.finite = () => e;
	let n = e._zod.bag;
	e.minValue = Math.max(n.minimum ?? -Infinity, n.exclusiveMinimum ?? -Infinity) ?? null, e.maxValue = Math.min(n.maximum ?? Infinity, n.exclusiveMaximum ?? Infinity) ?? null, e.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? .5), e.isFinite = !0, e.format = n.format ?? null;
});
function eo(e) {
	return /* @__PURE__ */ pi($a, e);
}
var to = /* @__PURE__ */ D("ZodNumberFormat", (e, t) => {
	ir.init(e, t), $a.init(e, t);
});
function no(e) {
	return /* @__PURE__ */ mi(to, e);
}
var ro = /* @__PURE__ */ D("ZodUnknown", (e, t) => {
	ar.init(e, t), Y.init(e, t), e._zod.processJSONSchema = (e, t, n) => void 0;
});
function io() {
	return /* @__PURE__ */ hi(ro);
}
var ao = /* @__PURE__ */ D("ZodNever", (e, t) => {
	or.init(e, t), Y.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ji(e, t, n, r);
});
function oo(e) {
	return /* @__PURE__ */ gi(ao, e);
}
var so = /* @__PURE__ */ D("ZodArray", (e, t) => {
	cr.init(e, t), Y.init(e, t), e._zod.processJSONSchema = (t, n, r) => Qi(e, t, n, r), e.element = t.element, e.min = (t, n) => e.check(/* @__PURE__ */ Ci(t, n)), e.nonempty = (t) => e.check(/* @__PURE__ */ Ci(1, t)), e.max = (t, n) => e.check(/* @__PURE__ */ Si(t, n)), e.length = (t, n) => e.check(/* @__PURE__ */ wi(t, n)), e.unwrap = () => e.element;
});
function co(e, t) {
	return /* @__PURE__ */ Ii(so, e, t);
}
var lo = /* @__PURE__ */ D("ZodObject", (e, t) => {
	pr.init(e, t), Y.init(e, t), e._zod.processJSONSchema = (t, n, r) => $i(e, t, n, r), A(e, "shape", () => t.shape), e.keyof = () => _o(Object.keys(e._zod.def.shape)), e.catchall = (t) => e.clone({
		...e._zod.def,
		catchall: t
	}), e.passthrough = () => e.clone({
		...e._zod.def,
		catchall: io()
	}), e.loose = () => e.clone({
		...e._zod.def,
		catchall: io()
	}), e.strict = () => e.clone({
		...e._zod.def,
		catchall: oo()
	}), e.strip = () => e.clone({
		...e._zod.def,
		catchall: void 0
	}), e.extend = (t) => lt(e, t), e.safeExtend = (t) => ut(e, t), e.merge = (t) => dt(e, t), e.pick = (t) => st(e, t), e.omit = (t) => ct(e, t), e.partial = (...t) => ft(bo, e, t[0]), e.required = (...t) => pt(Ao, e, t[0]);
});
function uo(e, t) {
	return new lo({
		type: "object",
		shape: e ?? {},
		...L(t)
	});
}
var fo = /* @__PURE__ */ D("ZodUnion", (e, t) => {
	hr.init(e, t), Y.init(e, t), e._zod.processJSONSchema = (t, n, r) => ea(e, t, n, r), e.options = t.options;
});
function po(e, t) {
	return new fo({
		type: "union",
		options: e,
		...L(t)
	});
}
var mo = /* @__PURE__ */ D("ZodIntersection", (e, t) => {
	gr.init(e, t), Y.init(e, t), e._zod.processJSONSchema = (t, n, r) => ta(e, t, n, r);
});
function ho(e, t) {
	return new mo({
		type: "intersection",
		left: e,
		right: t
	});
}
var go = /* @__PURE__ */ D("ZodEnum", (e, t) => {
	yr.init(e, t), Y.init(e, t), e._zod.processJSONSchema = (t, n, r) => Yi(e, t, n, r), e.enum = t.entries, e.options = Object.values(t.entries);
	let n = new Set(Object.keys(t.entries));
	e.extract = (e, r) => {
		let i = {};
		for (let r of e) if (n.has(r)) i[r] = t.entries[r];
		else throw Error(`Key ${r} not found in enum`);
		return new go({
			...t,
			checks: [],
			...L(r),
			entries: i
		});
	}, e.exclude = (e, r) => {
		let i = { ...t.entries };
		for (let t of e) if (n.has(t)) delete i[t];
		else throw Error(`Key ${t} not found in enum`);
		return new go({
			...t,
			checks: [],
			...L(r),
			entries: i
		});
	};
});
function _o(e, t) {
	return new go({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		...L(t)
	});
}
var vo = /* @__PURE__ */ D("ZodTransform", (e, t) => {
	br.init(e, t), Y.init(e, t), e._zod.processJSONSchema = (t, n, r) => Zi(e, t, n, r), e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new We(e.constructor.name);
		n.addIssue = (r) => {
			if (typeof r == "string") n.issues.push(B(r, n.value, t));
			else {
				let t = r;
				t.fatal && (t.continue = !1), t.code ??= "custom", t.input ??= n.value, t.inst ??= e, n.issues.push(B(t));
			}
		};
		let i = t.transform(n.value, n);
		return i instanceof Promise ? i.then((e) => (n.value = e, n)) : (n.value = i, n);
	};
});
function yo(e) {
	return new vo({
		type: "transform",
		transform: e
	});
}
var bo = /* @__PURE__ */ D("ZodOptional", (e, t) => {
	Sr.init(e, t), Y.init(e, t), e._zod.processJSONSchema = (t, n, r) => la(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function xo(e) {
	return new bo({
		type: "optional",
		innerType: e
	});
}
var So = /* @__PURE__ */ D("ZodExactOptional", (e, t) => {
	Cr.init(e, t), Y.init(e, t), e._zod.processJSONSchema = (t, n, r) => la(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Co(e) {
	return new So({
		type: "optional",
		innerType: e
	});
}
var wo = /* @__PURE__ */ D("ZodNullable", (e, t) => {
	wr.init(e, t), Y.init(e, t), e._zod.processJSONSchema = (t, n, r) => na(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function To(e) {
	return new wo({
		type: "nullable",
		innerType: e
	});
}
var Eo = /* @__PURE__ */ D("ZodDefault", (e, t) => {
	Tr.init(e, t), Y.init(e, t), e._zod.processJSONSchema = (t, n, r) => ia(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function Do(e, t) {
	return new Eo({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : rt(t);
		}
	});
}
var Oo = /* @__PURE__ */ D("ZodPrefault", (e, t) => {
	Dr.init(e, t), Y.init(e, t), e._zod.processJSONSchema = (t, n, r) => aa(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function ko(e, t) {
	return new Oo({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : rt(t);
		}
	});
}
var Ao = /* @__PURE__ */ D("ZodNonOptional", (e, t) => {
	Or.init(e, t), Y.init(e, t), e._zod.processJSONSchema = (t, n, r) => ra(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function jo(e, t) {
	return new Ao({
		type: "nonoptional",
		innerType: e,
		...L(t)
	});
}
var Mo = /* @__PURE__ */ D("ZodCatch", (e, t) => {
	Ar.init(e, t), Y.init(e, t), e._zod.processJSONSchema = (t, n, r) => oa(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function No(e, t) {
	return new Mo({
		type: "catch",
		innerType: e,
		catchValue: typeof t == "function" ? t : () => t
	});
}
var Po = /* @__PURE__ */ D("ZodPipe", (e, t) => {
	jr.init(e, t), Y.init(e, t), e._zod.processJSONSchema = (t, n, r) => sa(e, t, n, r), e.in = t.in, e.out = t.out;
});
function Fo(e, t) {
	return new Po({
		type: "pipe",
		in: e,
		out: t
	});
}
var Io = /* @__PURE__ */ D("ZodReadonly", (e, t) => {
	Nr.init(e, t), Y.init(e, t), e._zod.processJSONSchema = (t, n, r) => ca(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Lo(e) {
	return new Io({
		type: "readonly",
		innerType: e
	});
}
var Ro = /* @__PURE__ */ D("ZodCustom", (e, t) => {
	Fr.init(e, t), Y.init(e, t), e._zod.processJSONSchema = (t, n, r) => Xi(e, t, n, r);
});
function zo(e, t = {}) {
	return /* @__PURE__ */ Li(Ro, e, t);
}
function Bo(e) {
	return /* @__PURE__ */ Ri(e);
}
function Vo(e, t) {
	return Fo(yo(e), t);
}
//#endregion
//#region src/parser.ts
var Z = Vo((e) => {
	if (e != null) {
		if (typeof e == "string") {
			let t = e.trim();
			return t.length > 0 ? t : void 0;
		}
		return e;
	}
}, Na().min(1).optional()), Ho = Vo((e) => {
	if (!(e == null || e === "")) return e;
}, eo().finite().optional()), Uo = uo({
	username: Z,
	friendly_name: Z,
	entity_picture: Z,
	media_content_type: Z,
	media_duration: Ho,
	media_episode: Ho,
	media_library_title: Z,
	media_position: Ho,
	media_season: Ho,
	media_series_title: Z,
	media_title: Z
}).passthrough(), Wo = uo({
	entity_id: Na().min(1),
	state: Na().min(1),
	attributes: Uo
}), Q = (e, t, n) => n === void 0 ? e : {
	...e,
	[t]: n
}, Go = (e) => {
	switch (e) {
		case "playing":
		case "paused":
		case "idle":
		case "off":
		case "unavailable": return e;
		default: return "unknown";
	}
}, Ko = (e) => {
	switch (e) {
		case "tvshow":
		case "movie": return e;
		default: return "unknown";
	}
}, qo = (e) => {
	let { attributes: t } = e, n = {
		entityId: e.entity_id,
		playbackState: Go(e.state),
		mediaContentType: Ko(t.media_content_type),
		displayName: t.username ?? t.friendly_name ?? e.entity_id
	};
	return n = Q(n, "friendlyName", t.friendly_name), n = Q(n, "username", t.username), n = Q(n, "entityPicture", t.entity_picture), n = Q(n, "mediaTitle", t.media_title), n = Q(n, "mediaSeriesTitle", t.media_series_title), n = Q(n, "mediaLibraryTitle", t.media_library_title), n = Q(n, "mediaPosition", t.media_position), n = Q(n, "mediaDuration", t.media_duration), n = Q(n, "mediaSeason", t.media_season), n = Q(n, "mediaEpisode", t.media_episode), n;
}, Jo = (e) => {
	let t = Wo.safeParse(e);
	if (t.success) return qo(t.data);
}, Yo = (e) => {
	let t = Wo.safeParse(e);
	if (t.success) return;
	let n = t.error.issues[0], r = n ? `${n.path.join(".") || "entity"}: ${n.message}` : "Unknown parse error";
	return {
		entityId: e.entity_id,
		reason: r,
		entity: e
	};
}, Xo = {
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
}, Zo = (e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), Qo = (e) => {
	throw Error(`Unhandled Plex media content type: ${String(e)}`);
}, $o = (e) => {
	let t = {};
	return e.primaryTitle !== void 0 && (t.primaryTitle = e.primaryTitle), e.secondaryTitle !== void 0 && (t.secondaryTitle = e.secondaryTitle), e.libraryTitle !== void 0 && (t.libraryTitle = e.libraryTitle), e.progress !== void 0 && (t.progress = e.progress), t;
}, es = (e, t) => {
	let n = t.entities ?? [], r = (e) => {
		let t = Jo(e);
		return t ? {
			kind: "session",
			session: t
		} : {
			kind: "parse-failure",
			failure: Yo(e) ?? {
				entityId: e.entity_id,
				reason: "Unknown parse error",
				entity: e
			}
		};
	};
	if (n.length > 0) return n.map((t) => e.states[t]).filter((e) => !!e).map(r);
	let i = RegExp(`^${Zo("media_player.plex_*").replace(/\\\*/g, ".*")}$`);
	return Object.values(e.states).filter((e) => e.entity_id.startsWith("media_player.") && i.test(e.entity_id)).map(r);
}, ts = (e) => Xo[e.playbackState], ns = (e) => ts(e).active, rs = (e) => e.displayName, is = (e) => {
	let t = Math.max(0, Math.floor(e)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${r}:${String(i).padStart(2, "0")}`;
}, as = (e) => {
	let t = e.mediaPosition, n = e.mediaDuration;
	if (!(t === void 0 || n === void 0 || n <= 0)) return {
		position: t,
		duration: n,
		percent: Math.min(100, Math.max(0, t / n * 100)),
		positionLabel: is(t),
		durationLabel: is(n)
	};
}, os = (e) => {
	let t = e.mediaSeason, n = e.mediaEpisode;
	if (!(t === void 0 && n === void 0)) return t !== void 0 && n !== void 0 ? `S${t}E${n}` : n === void 0 ? `S${t}` : `E${n}`;
}, ss = (e, t) => {
	let n = e.mediaTitle, r = e.mediaLibraryTitle, i = e.friendlyName;
	switch (t) {
		case "tvshow": {
			let t = e.mediaSeriesTitle;
			return $o({
				primaryTitle: n,
				secondaryTitle: [t, os(e)].filter(Boolean).join(" · ") || i,
				libraryTitle: r,
				progress: as(e)
			});
		}
		case "movie": return $o({
			primaryTitle: n,
			secondaryTitle: void 0,
			libraryTitle: r,
			progress: as(e)
		});
		default: return Qo(t);
	}
}, cs = (e) => e.mediaContentType === "unknown" ? $o({
	primaryTitle: e.mediaTitle,
	secondaryTitle: e.friendlyName,
	libraryTitle: e.mediaLibraryTitle,
	progress: as(e)
}) : ss(e, e.mediaContentType), ls = (e) => e.entityPicture;
//#endregion
//#region \0@oxc-project+runtime@0.124.0/helpers/decorate.js
function us(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/plex-sessions-card.ts
var $ = class extends E {
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

    .warning-icon {
      --mdc-icon-size: 22px;
      color: var(--warning-color, #b26a00);
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

    .parse-warning {
      display: grid;
      place-items: center;
      gap: 8px;
      min-height: 108px;
      text-align: center;
    }

    .parse-warning-label {
      color: var(--secondary-text-color, #666);
      font-size: 0.8rem;
      font-weight: 600;
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
		if (!this.hass || !this.config) return C;
		let e = es(this.hass, this.config), t = this.getVisibleEntities(e), n = this.getEmptyState(e, t), r = this.getGridStyle();
		return x`
      <ha-card>
        <div class="header">${this.config.title ?? "Plex"}</div>
        ${t.length > 0 ? x`
              <div class="grid" style=${r}>
                ${t.map((e) => this.renderConfiguredEntity(e))}
              </div>
            ` : this.renderEmptyState(n)}
      </ha-card>
    `;
	}
	getVisibleEntities(e) {
		return this.config ? [...e.filter((e) => e.kind === "parse-failure" || this.config?.show_inactive ? !0 : ns(e.session))].sort((e, t) => this.getConfiguredEntityLabel(e).localeCompare(this.getConfiguredEntityLabel(t))) : [];
	}
	getGridStyle() {
		let e = Math.max(1, this.config?.max_columns ?? 4);
		return `max-width: ${e * 220 + (e - 1) * 8}px;`;
	}
	getEmptyState(e, t) {
		return !this.hass || !this.config ? {
			title: "No Plex sessions",
			body: "The card is waiting for Home Assistant state."
		} : e.length === 0 ? {
			title: "No Plex clients found",
			body: "No matching Plex media players were discovered for this card."
		} : t.length > 0 ? {
			title: "",
			body: ""
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
		return x`
      <div class=${t ? "empty illustrated" : "empty"}>
        ${t ? x`
              <div class="empty-art" aria-hidden="true">
                <ha-icon class="sheep-icon" icon="mdi:sheep"></ha-icon>
                <ha-icon class="sleep-icon one" icon="mdi:sleep"></ha-icon>
              </div>
            ` : C}
        <div class="empty-title">${e.title}</div>
        ${e.body ? x`<div class="empty-body">${e.body}</div>` : C}
      </div>
    `;
	}
	getConfiguredEntityLabel(e) {
		return e.kind === "session" ? rs(e.session) : e.failure.entityId;
	}
	getParseFailureTitle(e) {
		return [
			`Failed to parse Plex entity: ${e.entityId}`,
			e.reason,
			"Please provide example entity data in a GitHub issue."
		].join("\n");
	}
	renderConfiguredEntity(e) {
		return e.kind === "session" ? this.renderEntity(e.session) : this.renderParseFailure(e.failure);
	}
	renderParseFailure(e) {
		return x`
      <div class="tile parse-warning" title=${this.getParseFailureTitle(e)}>
        <ha-icon class="warning-icon" icon="mdi:alert-circle-outline"></ha-icon>
        <div class="parse-warning-label">Parse failed</div>
      </div>
    `;
	}
	renderEntity(e) {
		let t = ls(e), n = rs(e).slice(0, 1).toUpperCase(), r = ts(e), i = cs(e);
		return x`
      <div
        class="tile"
        role="button"
        tabindex="0"
        @click=${() => this.showMoreInfo(e.entityId)}
        @keydown=${(t) => this.handleTileKeydown(t, e.entityId)}
      >
        <div class="top">
          <div class="artwork detailed">
            ${t ? x`<img src=${t} alt=${`${rs(e)} artwork`} />` : x`${n}`}
          </div>
          <div class="content">
            <div class="row">
              <div class="identity">
                <div class="name">${rs(e)}</div>
                ${i.libraryTitle ? x`
                      <div class="library-trail">
                        <ha-icon class="library-icon" icon="mdi:chevron-right"></ha-icon>
                        <span>${i.libraryTitle}</span>
                      </div>
                    ` : C}
              </div>
              <div class="state" title=${r.label}>
                <ha-icon
                  class="state-icon"
                  .icon=${r.icon}
                  .label=${r.label}
                ></ha-icon>
              </div>
            </div>
            ${i.primaryTitle ? x`<div class="media-primary">${i.primaryTitle}</div>` : C}
            ${i.secondaryTitle ? x`<div class="media-secondary">${i.secondaryTitle}</div>` : C}
          </div>
        </div>
        ${i.progress ? x`
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
            ` : C}
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
us([He({ attribute: !1 })], $.prototype, "hass", void 0), us([Ue()], $.prototype, "config", void 0), $ = us([ze("plex-server-sessions")], $), window.customCards = window.customCards || [], window.customCards.push({
	type: "plex-server-sessions",
	name: "Plex Server Sessions",
	description: "Compact Lovelace card for Plex sessions."
});
//#endregion
export { $ as PlexSessionsCard };
