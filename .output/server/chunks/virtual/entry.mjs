import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { defineProdDiagnostics } from 'nostics';
import { ansiFormatter } from 'nostics/formatters/ansi';
import { getCurrentScope, ref, watchEffect, getCurrentInstance, onBeforeUnmount, onDeactivated, onActivated, createApp, provide, onErrorCaptured, onServerPrefetch, unref, createVNode, resolveDynamicComponent, shallowReactive, reactive, effectScope, hasInjectionContext, inject, defineAsyncComponent, mergeProps, defineComponent, toRef, computed, isRef, h, isReadonly, useSSRContext, isShallow, isReactive, toRaw } from 'vue';
import { c as createError, $ as $fetch, l as isEqual, s as stringifyParsedURL, m as stringifyQuery, p as parseQuery, n as hasProtocol, f as joinURL, o as defu, w as withQuery, q as sanitizeStatusCode, t as parseURL, e as encodePath, v as decodePath, x as isScriptProtocol } from '../nitro/nitro.mjs';
import { i as injectHead$1, V as VueResolver, p as publicAssetsURL, b as baseURL, h as headSymbol } from '../routes/renderer.mjs';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode, ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { Sparkles, CheckCircle2, Smartphone, Sun, Moon, ArrowRight, X, Menu, Download, Layers, Terminal, Code2, Cpu, Database, FileCode, Globe, GitBranch, GraduationCap, Globe2, Lightbulb, TrendingUp, MapPin, Wrench, ShieldCheck, Building, Layout, ArrowUpRight, Github, Building2, Calendar, Rocket, Mail, Phone, Copy, User, UserCheck, Send, AlertCircle, ArrowUp, Facebook, Linkedin, Instagram, Youtube, FileText, Printer, MessageSquare } from 'lucide-vue-next';
import { walkResolver } from 'unhead/utils';

function useHead(input, options = {}) {
  const head = options.head || injectHead$1();
  return head.ssr ? head.push(input || {}, options) : clientUseHead(head, input, options);
}
function clientUseHead(head, input, options = {}) {
  const scope = getCurrentScope();
  if (scope && !scope.active) {
    return { patch() {
    }, dispose() {
    }, _i: -1 };
  }
  const deactivated = ref(false);
  if (options.onRendered && scope) {
    const _onRendered = options.onRendered;
    options = { ...options, onRendered: (ctx) => scope.run(() => _onRendered(ctx)) };
  }
  let entry;
  watchEffect(() => {
    const i = deactivated.value ? {} : walkResolver(input, VueResolver);
    if (entry) {
      entry.patch(i);
    } else {
      entry = head.push(i, options);
    }
  });
  const vm = getCurrentInstance();
  if (vm) {
    onBeforeUnmount(() => {
      entry.dispose();
    });
    onDeactivated(() => {
      deactivated.value = true;
    });
    onActivated(() => {
      deactivated.value = false;
    });
  }
  return entry;
}

function flatHooks(configHooks, hooks = {}, parentName) {
	for (const key in configHooks) {
		const subHook = configHooks[key];
		const name = parentName ? `${parentName}:${key}` : key;
		if (typeof subHook === "object" && subHook !== null) flatHooks(subHook, hooks, name);
		else if (typeof subHook === "function") hooks[name] = subHook;
	}
	return hooks;
}
const createTask = /* @__PURE__ */ (() => {
	if (console.createTask) return console.createTask;
	const defaultTask = { run: (fn) => fn() };
	return () => defaultTask;
})();
function callHooks(hooks, args, startIndex, task) {
	for (let i = startIndex; i < hooks.length; i += 1) try {
		const result = task ? task.run(() => hooks[i](...args)) : hooks[i](...args);
		if (result && typeof result.then === "function") return Promise.resolve(result).then(() => callHooks(hooks, args, i + 1, task));
	} catch (error) {
		return Promise.reject(error);
	}
}
function serialTaskCaller(hooks, args, name) {
	if (hooks.length > 0) return callHooks(hooks, args, 0, createTask(name));
}
function parallelTaskCaller(hooks, args, name) {
	if (hooks.length > 0) {
		const task = createTask(name);
		return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
	}
}
function callEachWith(callbacks, arg0) {
	for (const callback of [...callbacks]) callback(arg0);
}
var Hookable = class {
	_hooks;
	_before;
	_after;
	_deprecatedHooks;
	_deprecatedMessages;
	constructor() {
		this._hooks = {};
		this._before = void 0;
		this._after = void 0;
		this._deprecatedMessages = void 0;
		this._deprecatedHooks = {};
		this.hook = this.hook.bind(this);
		this.callHook = this.callHook.bind(this);
		this.callHookWith = this.callHookWith.bind(this);
	}
	hook(name, function_, options = {}) {
		if (!name || typeof function_ !== "function") return () => {};
		const originalName = name;
		let dep;
		while (this._deprecatedHooks[name]) {
			dep = this._deprecatedHooks[name];
			name = dep.to;
		}
		if (dep && !options.allowDeprecated) {
			let message = dep.message;
			if (!message) message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
			if (!this._deprecatedMessages) this._deprecatedMessages = /* @__PURE__ */ new Set();
			if (!this._deprecatedMessages.has(message)) {
				console.warn(message);
				this._deprecatedMessages.add(message);
			}
		}
		if (!function_.name) try {
			Object.defineProperty(function_, "name", {
				get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
				configurable: true
			});
		} catch {}
		this._hooks[name] = this._hooks[name] || [];
		this._hooks[name].push(function_);
		return () => {
			if (function_) {
				this.removeHook(name, function_);
				function_ = void 0;
			}
		};
	}
	hookOnce(name, function_) {
		let _unreg;
		let _function = (...arguments_) => {
			if (typeof _unreg === "function") _unreg();
			_unreg = void 0;
			_function = void 0;
			return function_(...arguments_);
		};
		_unreg = this.hook(name, _function);
		return _unreg;
	}
	removeHook(name, function_) {
		const hooks = this._hooks[name];
		if (hooks) {
			const index = hooks.indexOf(function_);
			if (index !== -1) hooks.splice(index, 1);
			if (hooks.length === 0) this._hooks[name] = void 0;
		}
	}
	clearHook(name) {
		this._hooks[name] = void 0;
	}
	deprecateHook(name, deprecated) {
		this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
		const _hooks = this._hooks[name] || [];
		this._hooks[name] = void 0;
		for (const hook of _hooks) this.hook(name, hook);
	}
	deprecateHooks(deprecatedHooks) {
		for (const name in deprecatedHooks) this.deprecateHook(name, deprecatedHooks[name]);
	}
	addHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
		return () => {
			for (const unreg of removeFns) unreg();
			removeFns.length = 0;
		};
	}
	removeHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		for (const key in hooks) this.removeHook(key, hooks[key]);
	}
	removeAllHooks() {
		this._hooks = {};
	}
	callHook(name, ...args) {
		return this.callHookWith(serialTaskCaller, name, args);
	}
	callHookParallel(name, ...args) {
		return this.callHookWith(parallelTaskCaller, name, args);
	}
	callHookWith(caller, name, args) {
		const event = this._before || this._after ? {
			name,
			args,
			context: {}
		} : void 0;
		if (this._before) callEachWith(this._before, event);
		const result = caller(this._hooks[name] ? [...this._hooks[name]] : [], args, name);
		if (result instanceof Promise) return result.finally(() => {
			if (this._after && event) callEachWith(this._after, event);
		});
		if (this._after && event) callEachWith(this._after, event);
		return result;
	}
	beforeEach(function_) {
		this._before = this._before || [];
		this._before.push(function_);
		return () => {
			if (this._before !== void 0) {
				const index = this._before.indexOf(function_);
				if (index !== -1) this._before.splice(index, 1);
			}
		};
	}
	afterEach(function_) {
		this._after = this._after || [];
		this._after.push(function_);
		return () => {
			if (this._after !== void 0) {
				const index = this._after.indexOf(function_);
				if (index !== -1) this._after.splice(index, 1);
			}
		};
	}
};
function createHooks() {
	return new Hookable();
}

function _getAsyncLocalStorage() {
	return globalThis.AsyncLocalStorage || globalThis.process?.getBuiltinModule?.("node:async_hooks")?.AsyncLocalStorage;
}
const _WeakRef = globalThis.WeakRef || class StrongRef {
	#value;
	constructor(value) {
		this.#value = value;
	}
	deref() {
		return this.#value;
	}
};
function createContext(opts = {}) {
	let currentInstance;
	let isSingleton = false;
	const checkConflict = (instance) => {
		if (currentInstance && currentInstance !== instance) throw new Error("Context conflict");
	};
	let als;
	if (opts.asyncContext) {
		const _AsyncLocalStorage = opts.AsyncLocalStorage || _getAsyncLocalStorage();
		if (_AsyncLocalStorage) als = new _AsyncLocalStorage();
		else console.warn("[unctx] `AsyncLocalStorage` is not provided.");
	}
	const _wrapInstance = (instance) => als && instance !== null && typeof instance === "object" ? { __unctx_weak: new _WeakRef(instance) } : instance;
	const _unwrapInstance = (store) => store && store.__unctx_weak ? store.__unctx_weak.deref() : store;
	const _getCurrentInstance = () => {
		if (als) {
			const store = als.getStore();
			if (store !== void 0) return _unwrapInstance(store);
		}
		return currentInstance;
	};
	return {
		use: () => {
			const _instance = _getCurrentInstance();
			if (_instance === void 0) throw new Error("Context is not available");
			return _instance;
		},
		tryUse: () => {
			return _getCurrentInstance() ?? null;
		},
		set: (instance, replace) => {
			if (!replace) checkConflict(instance);
			currentInstance = instance;
			isSingleton = true;
		},
		unset: () => {
			currentInstance = void 0;
			isSingleton = false;
		},
		call: (instance, callback) => {
			checkConflict(instance);
			currentInstance = instance;
			try {
				return als ? als.run(_wrapInstance(instance), callback) : callback();
			} finally {
				if (!isSingleton) currentInstance = void 0;
			}
		},
		async callAsync(instance, callback) {
			currentInstance = instance;
			const onRestore = () => {
				currentInstance = instance;
			};
			const onLeave = () => currentInstance === instance ? onRestore : void 0;
			asyncHandlers.add(onLeave);
			try {
				const r = als ? als.run(_wrapInstance(instance), callback) : callback();
				if (!isSingleton) currentInstance = void 0;
				return await r;
			} finally {
				asyncHandlers.delete(onLeave);
			}
		}
	};
}
function createNamespace(defaultOpts = {}) {
	const contexts = {};
	return { get(key, opts = {}) {
		if (!contexts[key]) contexts[key] = createContext({
			...defaultOpts,
			...opts
		});
		return contexts[key];
	} };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());

//#region node_modules/nuxt/dist/app/diagnostics/_shared.js
/**
* Shared configuration for the runtime (E<N>xxx) diagnostics catalogs.
*
* Catalogs are split by domain and imported directly where used (no barrel),
* so the browser bundle only pulls in the codes a module references. Pair the
* pure-call annotations on each `defineDiagnostics()` with dev-guarded,
* statement-level report calls so report-only diagnostics strip from production.
*
* Codes are stable, fully-qualified `NUXT_E<NNNN>` identifiers. Codes with a
* dedicated docs page resolve a `see:` URL via {@link docsBase}; the rest opt
* out with `docs: false`.
*/
function docsBase(code) {
	return `https://nuxt.com/docs/4.x/errors/${code.replace("NUXT_", "").toLowerCase()}`;
}
var ansi = (open, close) => (s) => `\x1B[${open}m${s}\x1B[${close}m`;
var colors = {
	red: ansi(31, 39),
	yellow: ansi(33, 39),
	cyan: ansi(36, 39),
	gray: ansi(90, 39),
	bold: ansi(1, 22),
	dim: ansi(2, 22)
};
ansiFormatter(colors);
var prodReporter = (diagnostic) => {
	console.error(`[${diagnostic.name}]`);
};
var prodReporters = [prodReporter];
//#endregion
//#region node_modules/nuxt/dist/app/diagnostics/core.js
/**
* E1xxx
* Core / Nuxt-instance / lifecycle runtime diagnostics.
*/
var appDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fnuxt.config.mjs
var nuxtLinkDefaults = {
	"componentName": "NuxtLink"};
//#endregion
//#region node_modules/nuxt/dist/app/nuxt.js
function getNuxtAppCtx(id = "nuxt-app") {
	return getContext(id, { asyncContext: false });
}
var NuxtPluginIndicator = "__nuxt_plugin";
/** @since 3.0.0 */
function createNuxtApp(options) {
	let hydratingCount = 0;
	const nuxtApp = {
		_id: options.id || "nuxt-app",
		_scope: effectScope(),
		provide: void 0,
		versions: {
			get nuxt() {
				return "4.5.2";
			},
			get vue() {
				return nuxtApp.vueApp.version;
			}
		},
		payload: shallowReactive({
			...options.ssrContext?.payload || {},
			data: shallowReactive({}),
			state: reactive({}),
			once: /* @__PURE__ */ new Set(),
			_errors: shallowReactive({})
		}),
		static: { data: {} },
		runWithContext(fn) {
			if (nuxtApp._scope.active && !getCurrentScope()) return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
			return callWithNuxt(nuxtApp, fn);
		},
		isHydrating: false,
		deferHydration() {
			if (!nuxtApp.isHydrating) return () => {};
			hydratingCount++;
			let called = false;
			return () => {
				if (called) return;
				called = true;
				hydratingCount--;
				if (hydratingCount === 0) {
					nuxtApp.isHydrating = false;
					return nuxtApp.callHook("app:suspense:resolve");
				}
			};
		},
		_asyncDataPromises: {},
		_asyncData: shallowReactive({}),
		_state: shallowReactive({}),
		_payloadRevivers: {},
		...options
	};
	nuxtApp.payload.serverRendered = true;
	if (nuxtApp.ssrContext) {
		nuxtApp.payload.path = nuxtApp.ssrContext.url;
		nuxtApp.ssrContext.nuxt = nuxtApp;
		nuxtApp.ssrContext.payload = nuxtApp.payload;
		nuxtApp.ssrContext.config = {
			public: nuxtApp.ssrContext.runtimeConfig.public,
			app: nuxtApp.ssrContext.runtimeConfig.app
		};
	}
	nuxtApp.hooks = createHooks();
	nuxtApp.hook = nuxtApp.hooks.hook;
	{
		const contextCaller = async function(hooks, args) {
			for (const hook of hooks) await nuxtApp.runWithContext(() => hook(...args));
		};
		nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, args);
	}
	nuxtApp.callHook = nuxtApp.hooks.callHook;
	nuxtApp.provide = (name, value) => {
		const $name = "$" + name;
		defineGetter(nuxtApp, $name, value);
		defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
	};
	defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
	defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
	const runtimeConfig = options.ssrContext.runtimeConfig;
	nuxtApp.provide("config", runtimeConfig);
	return nuxtApp;
}
/** @since 3.0.0 */
async function applyPlugin(nuxtApp, plugin) {
	if (typeof plugin === "function") {
		const run = () => nuxtApp.runWithContext(() => plugin(nuxtApp));
		const { provide } = await run() || {};
		if (provide && typeof provide === "object") for (const key in provide) nuxtApp.provide(key, provide[key]);
	}
}
/** @since 3.0.0 */
async function applyPlugins(nuxtApp, plugins) {
	let error;
	for (const plugin of plugins) try {
		await applyPlugin(nuxtApp, plugin);
	} catch (e) {
		if (!nuxtApp.payload.error) throw e;
		error ||= e;
	}
	if (error) throw nuxtApp.payload.error || error;
}
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtPlugin(plugin) {
	if (typeof plugin === "function") return plugin;
	const _name = plugin._name || plugin.name;
	delete plugin.name;
	return Object.assign(plugin.setup || (() => {}), plugin, {
		[NuxtPluginIndicator]: true,
		_name
	});
}
/**
* Ensures that the setup function passed in has access to the Nuxt instance via `useNuxtApp`.
* @param nuxt A Nuxt instance
* @param setup The function to call
* @since 3.0.0
*/
function callWithNuxt(nuxt, setup, args) {
	const fn = () => setup();
	const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
	return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
}
function tryUseNuxtApp(id) {
	let nuxtAppInstance;
	if (hasInjectionContext()) nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
	nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
	return nuxtAppInstance || null;
}
function useNuxtApp(id) {
	const nuxtAppInstance = tryUseNuxtApp(id);
	if (!nuxtAppInstance) throw appDiagnostics.NUXT_E1001();
	return nuxtAppInstance;
}
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function useRuntimeConfig(_event) {
	return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
	Object.defineProperty(obj, key, { get: () => val });
}
//#endregion
//#region node_modules/nuxt/dist/app/utils.js
globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
//#endregion
//#region node_modules/nuxt/dist/app/components/injections.js
var PageRouteSymbol = Symbol("route");
//#endregion
//#region node_modules/nuxt/dist/app/diagnostics/navigation.js
/**
* E2xxx
* Navigation / routing / middleware runtime diagnostics.
*/
var navigationDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region node_modules/nuxt/dist/app/composables/router.js
/** @since 3.0.0 */
var useRouter = () => {
	return useNuxtApp()?.$router;
};
/**
* Whether the current effect scope is (a descendant of) the component instance's scope.
* A detached scope (e.g. `createSharedComposable`) outlives the component, so the
* per-page route injected there would freeze after navigation (#18903).
*/
function isScopeWithinInstance(instance) {
	const instanceScope = instance.scope;
	let scope = getCurrentScope();
	while (scope) {
		if (scope === instanceScope) return true;
		scope = scope.parent;
	}
	return false;
}
/** @since 3.0.0 */
var useRoute = (() => {
	if (hasInjectionContext()) {
		const instance = getCurrentInstance();
		if (!instance || isScopeWithinInstance(instance)) return inject(PageRouteSymbol, useNuxtApp()._route);
	}
	return useNuxtApp()._route;
});
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtRouteMiddleware(middleware) {
	return middleware;
}
/** @since 3.0.0 */
var isProcessingMiddleware = () => {
	try {
		if (useNuxtApp()._processingMiddleware) return true;
	} catch {
		return false;
	}
	return false;
};
var HTML_ATTR_UNSAFE_RE = /[&"'<>]/g;
var HTML_ATTR_ENCODE_MAP = {
	"&": "&amp;",
	"\"": "&quot;",
	"'": "&#x27;",
	"<": "&lt;",
	">": "&gt;"
};
function encodeForHtmlAttr(value) {
	return value.replace(HTML_ATTR_UNSAFE_RE, (c) => HTML_ATTR_ENCODE_MAP[c]);
}
/**
* A helper that aids in programmatic navigation within your Nuxt application.
*
* Can be called on the server and on the client, within pages, route middleware, plugins, and more.
* @param {RouteLocationRaw | undefined | null} [to] - The route to navigate to. Accepts a route object, string path, `undefined`, or `null`. Defaults to '/'.
* @param {NavigateToOptions} [options] - Optional customization for controlling the behavior of the navigation.
* @returns {Promise<void | NavigationFailure | false> | false | void | RouteLocationRaw} The navigation result, which varies depending on context and options.
* @see https://nuxt.com/docs/4.x/api/utils/navigate-to
* @since 3.0.0
*/
var navigateTo = (to, options) => {
	to ||= "/";
	const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
	const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
	const isExternal = options?.external || isExternalHost;
	if (isExternal) {
		if (!options?.external) throw navigationDiagnostics.NUXT_E2001({ toPath });
		const { protocol } = new URL(toPath, "http://localhost");
		if (protocol && isScriptProtocol(protocol)) throw navigationDiagnostics.NUXT_E2002({
			toPath,
			protocol
		});
	}
	const inMiddleware = isProcessingMiddleware();
	const router = useRouter();
	const nuxtApp = useNuxtApp();
	if (nuxtApp.ssrContext) {
		const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
		const location = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
		const redirect = async function(response) {
			await nuxtApp.callHook("app:redirected");
			const encodedHeader = encodeURL(location, isExternalHost);
			const encodedLoc = encodeForHtmlAttr(encodedHeader);
			nuxtApp.ssrContext["~renderResponse"] = {
				statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
				body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
				headers: { location: encodedHeader }
			};
			return response;
		};
		if (!isExternal && inMiddleware) {
			router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
			return to;
		}
		return redirect(!inMiddleware ? void 0 : false);
	}
	if (isExternal) {
		nuxtApp._scope.stop();
		if (options?.replace) (void 0).replace(toPath);
		else (void 0).href = toPath;
		if (inMiddleware) {
			if (!nuxtApp.isHydrating) return false;
			return new Promise(() => {});
		}
		return Promise.resolve();
	}
	const encodedTo = typeof to === "string" ? encodeRoutePath(to) : to;
	return options?.replace ? router.replace(encodedTo) : router.push(encodedTo);
};
/**
* @internal
*/
function resolveRouteObject(to) {
	return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
/**
* @internal
*/
function encodeURL(location, isExternalHost = false) {
	const url = new URL(location, "http://localhost");
	if (!isExternalHost) return url.pathname.replace(/^\/{2,}/, "/") + url.search + url.hash;
	if (location.startsWith("//")) return url.toString().replace(url.protocol, "");
	return url.toString();
}
/**
* Encode the pathname of a route location string. Ensures decoded paths like
* `/café` are percent-encoded to match vue-router's encoded route records.
* Already-encoded paths are not double-encoded.
* @internal
*/
function encodeRoutePath(url) {
	const parsed = parseURL(url);
	return encodePath(decodePath(parsed.pathname)) + parsed.search + parsed.hash;
}
//#endregion
//#region node_modules/nuxt/dist/app/composables/error.js
var NUXT_ERROR_SIGNATURE = "__nuxt_error";
/** @since 3.0.0 */
var useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
/** @since 3.0.0 */
var showError = (error) => {
	const nuxtError = createError$1(error);
	try {
		const error = /* @__PURE__ */ useError();
		error.value ||= nuxtError;
	} catch {
		throw nuxtError;
	}
	return nuxtError;
};
/** @since 3.0.0 */
var isNuxtError = (error) => !!error && typeof error === "object" && "__nuxt_error" in error;
/** @since 3.0.0 */
var createError$1 = (error) => {
	if (typeof error !== "string" && error.statusText) error.message ??= error.statusText;
	const nuxtError = createError(error);
	Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
		value: true,
		configurable: false,
		writable: false
	});
	Object.defineProperty(nuxtError, "status", {
		get: () => nuxtError.statusCode,
		configurable: true
	});
	Object.defineProperty(nuxtError, "statusText", {
		get: () => nuxtError.statusMessage,
		configurable: true
	});
	return nuxtError;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Ffetch.mjs
if (!globalThis.$fetch) globalThis.$fetch = $fetch.create({ baseURL: baseURL() });
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fglobal-polyfills.mjs
if (!("global" in globalThis)) globalThis.global = globalThis;
//#endregion
//#region node_modules/nuxt/dist/head/runtime/island-head.js
/**
* No-op `head.push` until the returned `unfreeze` runs. Plugin/transformer
* augmentations on the same head are unaffected.
*/
function freezeHead(head) {
	const realPush = head.push;
	head.push = () => ({
		dispose: () => {},
		patch: () => {},
		_i: 0
	});
	return () => {
		head.push = realPush;
	};
}
//#endregion
//#region node_modules/nuxt/dist/head/runtime/plugins/unhead.server.js
var plugin$2 = /* @__PURE__ */ defineNuxtPlugin({
	name: "nuxt:head",
	enforce: "pre",
	setup(nuxtApp) {
		const head = nuxtApp.ssrContext.head;
		if (nuxtApp.ssrContext.islandContext) {
			const unfreeze = freezeHead(head);
			nuxtApp.hooks.hookOnce("app:created", unfreeze);
		}
		nuxtApp.vueApp.use(head);
	}
});
//#endregion
//#region node_modules/nuxt/dist/app/diagnostics/manifest.js
/**
* E5xxx
* App manifest / route-rules runtime diagnostics.
*/
var manifestDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Frouter.options.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default = {};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Froute-rules.mjs
var sensitiveMatcher = /* @__PURE__ */ (() => {
	const $0 = { prerender: true };
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1);
		if (p === "") r.push({ data: $0 });
		else if (p.charCodeAt(p.length - 1) === 47) {
			if (p === "/") r.push({ data: $0 });
		}
		return r.reverse();
	};
})();
var foldedMatcher = sensitiveMatcher;
var decodeRoutePath = function decodeRoutePath(path) {
	if (!path.includes("%")) return path;
	const queryIndex = path.indexOf("?");
	const pathname = queryIndex === -1 ? path : path.slice(0, queryIndex);
	try {
		return queryIndex === -1 ? decodeURI(pathname) : decodeURI(pathname) + path.slice(queryIndex);
	} catch {
		return path;
	}
};
var normalizePath = (path, fold) => {
	if (typeof path !== "string") return path;
	const decoded = decodeRoutePath(path);
	return fold ? decoded.toLowerCase() : decoded;
};
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default = (path) => virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.sensitive ? defu({}, ...sensitiveMatcher("", normalizePath(path, false)).map((r) => r.data).reverse()) : defu({}, ...foldedMatcher("", normalizePath(path, true)).map((r) => r.data).reverse());
//#endregion
//#region node_modules/nuxt/dist/app/composables/manifest.js
var routeRulesMatcher = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default;
function getRouteRules(arg) {
	const path = typeof arg === "string" ? arg : arg.path;
	try {
		return routeRulesMatcher(path);
	} catch (e) {
		manifestDiagnostics.NUXT_E5003({
			path,
			cause: e
		});
		return {};
	}
}
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fmiddleware.mjs
var globalMiddleware = [/* @__PURE__ */ defineNuxtRouteMiddleware((to) => {})];
//#endregion
//#region node_modules/nuxt/dist/app/plugins/router.js
function getRouteFromPath(fullPath) {
	const route = fullPath && typeof fullPath === "object" ? fullPath : {};
	if (typeof fullPath === "object") fullPath = stringifyParsedURL({
		pathname: fullPath.path || "",
		search: stringifyQuery(fullPath.query || {}),
		hash: fullPath.hash || ""
	});
	const url = new URL(fullPath.toString(), "http://localhost");
	return {
		path: url.pathname,
		fullPath,
		query: parseQuery(url.search),
		hash: url.hash,
		params: route.params || {},
		name: void 0,
		matched: route.matched || [],
		redirectedFrom: void 0,
		meta: route.meta || {},
		href: fullPath
	};
}
var plugin$1 = /* @__PURE__ */ defineNuxtPlugin({
	name: "nuxt:router",
	enforce: "pre",
	setup(nuxtApp) {
		const initialURL = nuxtApp.ssrContext.url;
		const routes = [];
		const hooks = {
			"navigate:before": [],
			"resolve:before": [],
			"navigate:after": [],
			"error": []
		};
		const registerHook = (hook, guard) => {
			hooks[hook].push(guard);
			return () => {
				const index = hooks[hook].indexOf(guard);
				if (index !== -1) hooks[hook].splice(index, 1);
			};
		};
		(/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
		const route = reactive(getRouteFromPath(initialURL));
		let navigationCounter = 0;
		async function handleNavigation(url, replace) {
			const navigationId = ++navigationCounter;
			try {
				const to = getRouteFromPath(url);
				for (const middleware of hooks["navigate:before"]) {
					const result = await middleware(to, route);
					if (navigationId !== navigationCounter) return;
					if (result === false || result instanceof Error) return;
					if (typeof result === "string" && result.length) return await handleNavigation(result, true);
				}
				for (const handler of hooks["resolve:before"]) {
					await handler(to, route);
					if (navigationId !== navigationCounter) return;
				}
				Object.assign(route, to);
				for (const middleware of hooks["navigate:after"]) await middleware(to, route);
			} catch (err) {
				for (const handler of hooks.error) await handler(err);
			}
		}
		const router = {
			currentRoute: computed(() => route),
			isReady: () => Promise.resolve(),
			options: {},
			install: () => Promise.resolve(),
			push: (url) => handleNavigation(url),
			replace: (url) => handleNavigation(url),
			back: () => (void 0).history.go(-1),
			go: (delta) => (void 0).history.go(delta),
			forward: () => (void 0).history.go(1),
			beforeResolve: (guard) => registerHook("resolve:before", guard),
			beforeEach: (guard) => registerHook("navigate:before", guard),
			afterEach: (guard) => registerHook("navigate:after", guard),
			onError: (handler) => registerHook("error", handler),
			resolve: getRouteFromPath,
			addRoute: (parentName, route) => {
				routes.push(route);
			},
			getRoutes: () => routes,
			hasRoute: (name) => routes.some((route) => route.name === name),
			removeRoute: (name) => {
				const index = routes.findIndex((route) => route.name === name);
				if (index !== -1) routes.splice(index, 1);
			}
		};
		nuxtApp.vueApp.component("RouterLink", defineComponent({
			functional: true,
			props: {
				to: {
					type: String,
					required: true
				},
				custom: Boolean,
				replace: Boolean,
				activeClass: String,
				exactActiveClass: String,
				ariaCurrentValue: String
			},
			setup: (props, { slots }) => {
				const navigate = () => handleNavigation(props.to, props.replace);
				return () => {
					const route = router.resolve(props.to);
					return props.custom ? slots.default?.({
						href: props.to,
						navigate,
						route
					}) : h("a", {
						href: props.to,
						onClick: (e) => {
							e.preventDefault();
							return navigate();
						}
					}, slots);
				};
			}
		}));
		nuxtApp._route = route;
		nuxtApp._middleware ||= {
			global: [],
			named: {}
		};
		const initialLayout = nuxtApp.payload.state._layout;
		const initialLayoutProps = nuxtApp.payload.state._layoutProps;
		nuxtApp.hooks.hookOnce("app:created", async () => {
			router.beforeEach(async (to, from) => {
				to.meta = reactive(to.meta || {});
				if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
					to.meta.layout = initialLayout;
					to.meta.layoutProps = initialLayoutProps;
				}
				nuxtApp._processingMiddleware = true;
				nuxtApp._middlewareTo = to;
				if (!nuxtApp.ssrContext?.islandContext) {
					const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
					const routeRules = getRouteRules({ path: to.path });
					if (routeRules.appMiddleware) for (const key in routeRules.appMiddleware) {
						const guard = nuxtApp._middleware.named[key];
						if (!guard) continue;
						if (routeRules.appMiddleware[key]) middlewareEntries.add(guard);
						else middlewareEntries.delete(guard);
					}
					for (const middleware of middlewareEntries) {
						const result = await nuxtApp.runWithContext(() => middleware(to, from));
						if (result === false || result instanceof Error) {
							const error = result || createError({
								status: 404,
								statusText: `Page Not Found: ${initialURL}`,
								data: { path: initialURL }
							});
							delete nuxtApp._processingMiddleware;
							delete nuxtApp._middlewareTo;
							return nuxtApp.runWithContext(() => showError(error));
						}
						if (result === true) continue;
						if (result || result === false) return result;
					}
				}
			});
			router.afterEach(() => {
				delete nuxtApp._processingMiddleware;
				delete nuxtApp._middlewareTo;
			});
			await router.replace(initialURL);
			if (!isEqual(route.fullPath, initialURL)) await nuxtApp.runWithContext(() => navigateTo(route.fullPath));
		});
		return { provide: {
			route,
			router
		} };
	}
});
//#endregion
//#region node_modules/nuxt/dist/app/diagnostics/head.js
/**
* E6xxx
* Head / unhead runtime diagnostics.
*/
var unheadDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region node_modules/nuxt/dist/head/runtime/composables.js
/**
* Injects the head client from the Nuxt context or Vue inject.
*/
function injectHead(nuxtApp) {
	const nuxt = nuxtApp || useNuxtApp();
	return nuxt.ssrContext?.head || nuxt.runWithContext(() => {
		if (hasInjectionContext()) {
			const head = inject(headSymbol);
			if (!head) throw unheadDiagnostics.NUXT_E6001();
			return head;
		}
	});
}
function useHead$1(input, options = {}) {
	const head = options.head || injectHead(options.nuxt);
	return useHead(input, {
		head,
		...options
	});
}
//#endregion
//#region node_modules/nuxt/dist/app/diagnostics/state.js
/**
* E7xxx
* Payload / state / cookie runtime diagnostics.
*/
var stateDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region node_modules/nuxt/dist/app/composables/payload.js
/**
* This is an experimental function for configuring passing rich data from server -> client.
* @since 3.4.0
*/
function definePayloadReducer(name, reduce) {
	useNuxtApp().ssrContext["~payloadReducers"][name] = reduce;
}
//#endregion
//#region node_modules/nuxt/dist/app/plugins/revive-payload.server.js
var reducers = [
	["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
	["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
	["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
	["Ref", (data) => isRef(data) && data.value],
	["Reactive", (data) => isReactive(data) && toRaw(data)]
];
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fplugins.server.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fplugins_server_default = [
	plugin$2,
	plugin$1,
	/* @__PURE__ */ defineNuxtPlugin({
		name: "nuxt:revive-payload:server",
		setup() {
			for (const [reducer, fn] of reducers) definePayloadReducer(reducer, fn);
		}
	}),
	/* @__PURE__ */ defineNuxtPlugin({ name: "nuxt:global-components" })
];
//#endregion
//#region app/components/BackgroundOrbs.vue?vue&type=script&setup=true&lang.ts
var BackgroundOrbs_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BackgroundOrbs",
	__ssrInlineRender: true,
	setup(__props) {
		ref(null);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 pointer-events-none overflow-hidden z-0 select-none" }, _attrs))}><div class="absolute inset-0 bg-tech-grid opacity-50"></div><div class="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full blur-[140px] opacity-30 animate-pulse" style="${ssrRenderStyle({
				"background": "radial-gradient(circle, rgba(0, 242, 254, 0.35) 0%, transparent 70%)",
				"animation-duration": "10s"
			})}"></div><div class="absolute top-[40%] -right-[15%] w-[55vw] h-[55vw] rounded-full blur-[160px] opacity-25 animate-pulse" style="${ssrRenderStyle({
				"background": "radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, transparent 70%)",
				"animation-duration": "12s",
				"animation-delay": "-3s"
			})}"></div><canvas class="absolute inset-0 w-full h-full pointer-events-none"></canvas><div class="absolute inset-0 bg-gradient-to-b from-[#030612]/20 via-transparent to-[#030612]/75"></div></div>`);
		};
	}
});
//#endregion
//#region app/components/BackgroundOrbs.vue
var _sfc_setup$16 = BackgroundOrbs_vue_vue_type_script_setup_true_lang_default.setup;
BackgroundOrbs_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BackgroundOrbs.vue");
	return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
var BackgroundOrbs_default = Object.assign(BackgroundOrbs_vue_vue_type_script_setup_true_lang_default, { __name: "BackgroundOrbs" });
//#endregion
//#region node_modules/nuxt/dist/app/composables/state.js
var useStateKeyPrefix = "$s";
function useState(...args) {
	const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
	if (typeof args[0] !== "string") args.unshift(autoKey);
	const [_key, init] = args;
	if (!_key || typeof _key !== "string") throw stateDiagnostics.NUXT_E7009({ key: _key });
	if (init !== void 0 && typeof init !== "function") throw stateDiagnostics.NUXT_E7007({ type: typeof init });
	const key = useStateKeyPrefix + _key;
	const nuxtApp = useNuxtApp();
	const state = toRef(nuxtApp.payload.state, key);
	if (init) nuxtApp._state[key] ??= { _default: init };
	if (state.value === void 0 && init) {
		const initialValue = init();
		if (isRef(initialValue)) {
			nuxtApp.payload.state[key] = initialValue;
			return initialValue;
		}
		state.value = initialValue;
	}
	return state;
}
//#endregion
//#region app/composables/usePortfolioState.ts
var usePortfolioState = () => {
	const activeSection = useState("activeSection", () => "home");
	const isDarkMode = useState("isDarkMode", () => true);
	const isCvModalOpen = useState("isCvModalOpen", () => false);
	const activeProject = useState("activeProject", () => null);
	const islandNotification = useState("islandNotification", () => ({
		show: false,
		title: "",
		subtitle: "",
		type: "info"
	}));
	const triggerDynamicIsland = (title, subtitle = "", type = "info") => {
		islandNotification.value = {
			show: true,
			title,
			subtitle,
			type
		};
	};
	const toggleDarkMode = () => {
		isDarkMode.value = !isDarkMode.value;
		triggerDynamicIsland(isDarkMode.value ? "Dark Mode" : "Light Mode", "System display appearance adjusted", "haptic");
	};
	const fireConfetti = () => {};
	const openCv = () => {
		isCvModalOpen.value = true;
		triggerDynamicIsland("Curriculum Vitae", "CV preview ready & downloadable", "success");
	};
	const closeCv = () => {
		isCvModalOpen.value = false;
	};
	const openProject = (project) => {
		activeProject.value = project;
		triggerDynamicIsland(project.title, "Project architecture & specs", "info");
	};
	const closeProject = () => {
		activeProject.value = null;
	};
	return {
		activeSection,
		isDarkMode,
		toggleDarkMode,
		isCvModalOpen,
		openCv,
		closeCv,
		activeProject,
		openProject,
		closeProject,
		islandNotification,
		triggerDynamicIsland,
		fireConfetti
	};
};
//#endregion
//#region app/components/DynamicIslandNotification.vue?vue&type=script&setup=true&lang.ts
var DynamicIslandNotification_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DynamicIslandNotification",
	__ssrInlineRender: true,
	setup(__props) {
		const { islandNotification } = usePortfolioState();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-500 ease-out" }, _attrs))}>`);
			if (unref(islandNotification).show) {
				_push(`<div class="pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-full bg-black/90 text-white backdrop-blur-2xl border border-white/20 shadow-[0_12px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(0,122,255,0.4)] animate-in fade-in slide-in-from-top-3 duration-300"><div class="relative flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-inner">`);
				if (unref(islandNotification).type === "haptic") _push(ssrRenderComponent(unref(Sparkles), {
					class: "w-4 h-4 text-white animate-spin",
					style: { "animation-duration": "4s" }
				}, null, _parent));
				else if (unref(islandNotification).type === "success") _push(ssrRenderComponent(unref(CheckCircle2), { class: "w-4 h-4 text-emerald-300" }, null, _parent));
				else _push(ssrRenderComponent(unref(Smartphone), { class: "w-4 h-4 text-cyan-200" }, null, _parent));
				_push(`<span class="absolute -top-0.5 -right-0.5 flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span></span></div><div class="flex flex-col pr-1"><span class="text-xs font-semibold tracking-wide text-white/95 leading-tight">${ssrInterpolate(unref(islandNotification).title)}</span>`);
				if (unref(islandNotification).subtitle) _push(`<span class="text-[11px] text-white/70 leading-tight">${ssrInterpolate(unref(islandNotification).subtitle)}</span>`);
				else _push(`<!---->`);
				_push(`</div><button class="ml-1 p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors" aria-label="Dismiss"><span class="text-xs font-bold leading-none">×</span></button></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/components/DynamicIslandNotification.vue
var _sfc_setup$15 = DynamicIslandNotification_vue_vue_type_script_setup_true_lang_default.setup;
DynamicIslandNotification_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DynamicIslandNotification.vue");
	return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
var DynamicIslandNotification_default = Object.assign(DynamicIslandNotification_vue_vue_type_script_setup_true_lang_default, { __name: "DynamicIslandNotification" });
//#endregion
//#region \0virtual:public?%2Fimages%2Fsokuntha-profile.jpg
var _virtual_public__2Fimages_2Fsokuntha_profile_default = publicAssetsURL("/images/sokuntha-profile.jpg");
//#endregion
//#region app/components/Navbar.vue?vue&type=script&setup=true&lang.ts
var Navbar_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Navbar",
	__ssrInlineRender: true,
	setup(__props) {
		const { activeSection, isDarkMode} = usePortfolioState();
		const isMobileMenuOpen = ref(false);
		const isScrolled = ref(false);
		const navItems = [
			{
				id: "about",
				label: "ABOUT"
			},
			{
				id: "projects",
				label: "PROJECTS"
			},
			{
				id: "skills",
				label: "SKILLS"
			},
			{
				id: "education",
				label: "EDUCATION"
			},
			{
				id: "contact",
				label: "CONTACT"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<header${ssrRenderAttrs(mergeProps({ class: ["fixed top-0 left-0 right-0 z-40 transition-all duration-300", [isScrolled.value ? "bg-[#030612]/85 backdrop-blur-2xl border-b border-white/10 py-3 shadow-2xl" : "bg-transparent py-5"]] }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"><a href="#home" class="group flex items-center gap-3 focus:outline-none"><div class="w-9 h-9 rounded-xl overflow-hidden border border-white/40 shadow-[0_0_15px_rgba(0,242,254,0.4)] group-hover:scale-105 transition-transform flex-shrink-0"><img${ssrRenderAttr("src", _virtual_public__2Fimages_2Fsokuntha_profile_default)} alt="Sorn Sokuntha" class="w-full h-full object-cover object-[50%_20%]"></div><div class="flex items-baseline gap-1.5"><span class="text-base font-black tracking-tight text-white">SORN</span><span class="text-base font-black tracking-tight neon-gradient-text">Sokuntha</span></div></a><nav class="hidden md:flex items-center px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-inner space-x-1"><!--[-->`);
			ssrRenderList(navItems, (item) => {
				_push(`<button class="${ssrRenderClass([[unref(activeSection) === item.id ? "text-white bg-white/15 shadow-sm" : "text-neutral-400 hover:text-white"], "px-3.5 py-1 text-[11px] font-bold tracking-wider rounded-full transition-all cursor-pointer select-none"])}">${ssrInterpolate(item.label)}</button>`);
			});
			_push(`<!--]--></nav><div class="hidden lg:flex items-center gap-3"><div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-[11px] font-mono"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span><span>AVAILABLE FOR HIRE</span></div><button class="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer"${ssrRenderAttr("title", unref(isDarkMode) ? "Switch to Light Mode" : "Switch to Dark Mode")}${ssrRenderAttr("aria-label", unref(isDarkMode) ? "Switch to Light Mode" : "Switch to Dark Mode")}>`);
			if (unref(isDarkMode)) _push(ssrRenderComponent(unref(Sun), { class: "w-4 h-4 text-amber-300" }, null, _parent));
			else _push(ssrRenderComponent(unref(Moon), { class: "w-4 h-4 text-indigo-400" }, null, _parent));
			_push(`</button><button class="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/20 text-xs font-bold text-white tracking-wider uppercase transition-all shadow-md cursor-pointer hover:border-cyan-400/50"><span>HIRE ME</span>`);
			_push(ssrRenderComponent(unref(ArrowRight), { class: "w-3.5 h-3.5 text-cyan-300" }, null, _parent));
			_push(`</button></div><div class="flex items-center gap-2 md:hidden"><button class="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-neutral-300"${ssrRenderAttr("aria-label", unref(isDarkMode) ? "Switch to Light" : "Switch to Dark")}>`);
			if (unref(isDarkMode)) _push(ssrRenderComponent(unref(Sun), { class: "w-4 h-4 text-amber-300" }, null, _parent));
			else _push(ssrRenderComponent(unref(Moon), { class: "w-4 h-4 text-indigo-400" }, null, _parent));
			_push(`</button><button class="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-neutral-300"${ssrRenderAttr("aria-label", isMobileMenuOpen.value ? "Close Menu" : "Open Menu")}>`);
			if (isMobileMenuOpen.value) _push(ssrRenderComponent(unref(X), { class: "w-5 h-5 text-white" }, null, _parent));
			else _push(ssrRenderComponent(unref(Menu), { class: "w-5 h-5 text-white" }, null, _parent));
			_push(`</button></div></div>`);
			if (isMobileMenuOpen.value) {
				_push(`<div class="md:hidden mt-3 max-w-sm mx-auto p-4 rounded-3xl bg-[#080d1e]/95 border border-white/15 backdrop-blur-2xl shadow-2xl"><div class="flex flex-col space-y-1.5"><!--[-->`);
				ssrRenderList(navItems, (item) => {
					_push(`<button class="${ssrRenderClass([[unref(activeSection) === item.id ? "bg-blue-600/30 text-cyan-300 border border-blue-500/40" : "text-neutral-300 hover:bg-white/10"], "flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all"])}"><span>${ssrInterpolate(item.label)}</span>`);
					if (unref(activeSection) === item.id) _push(`<span class="w-2 h-2 rounded-full bg-cyan-400"></span>`);
					else _push(`<!---->`);
					_push(`</button>`);
				});
				_push(`<!--]--><div class="pt-3 border-t border-white/10 flex gap-2"><button class="flex-1 pro-btn-primary flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg">`);
				_push(ssrRenderComponent(unref(Download), { class: "w-4 h-4" }, null, _parent));
				_push(`<span>DOWNLOAD CV</span></button></div></div></div>`);
			} else _push(`<!---->`);
			_push(`</header>`);
		};
	}
});
//#endregion
//#region app/components/Navbar.vue
var _sfc_setup$14 = Navbar_vue_vue_type_script_setup_true_lang_default.setup;
Navbar_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navbar.vue");
	return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
var Navbar_default = Object.assign(Navbar_vue_vue_type_script_setup_true_lang_default, { __name: "Navbar" });
//#endregion
//#region app/components/Hero.vue?vue&type=script&setup=true&lang.ts
var Hero_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Hero",
	__ssrInlineRender: true,
	setup(__props) {
		const { isDarkMode} = usePortfolioState();
		const tiltX = ref(0);
		const tiltY = ref(0);
		const projectsCount = ref(0);
		const yearCount = ref(2022);
		const focusCount = ref(0);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "home",
				class: "relative min-h-[90vh] pt-32 pb-16 flex items-center justify-center overflow-hidden"
			}, _attrs))} data-v-46e22b5e><div class="absolute inset-0 pointer-events-none overflow-hidden z-0" data-v-46e22b5e><div class="absolute top-[20%] left-[12%] w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f2fe] animate-drift" style="${ssrRenderStyle({
				"animation-delay": "0s",
				"animation-duration": "9s"
			})}" data-v-46e22b5e></div><div class="absolute top-[60%] left-[28%] w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_14px_#a855f7] animate-drift" style="${ssrRenderStyle({
				"animation-delay": "2s",
				"animation-duration": "11s"
			})}" data-v-46e22b5e></div><div class="absolute top-[35%] right-[22%] w-1.5 h-1.5 rounded-full bg-pink-400 shadow-[0_0_12px_#ec4899] animate-drift" style="${ssrRenderStyle({
				"animation-delay": "4s",
				"animation-duration": "8s"
			})}" data-v-46e22b5e></div><div class="absolute top-[75%] right-[12%] w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34c759] animate-drift" style="${ssrRenderStyle({
				"animation-delay": "1.5s",
				"animation-duration": "10s"
			})}" data-v-46e22b5e></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10" data-v-46e22b5e><div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center" data-v-46e22b5e><div class="lg:col-span-6 flex flex-col items-start space-y-6 text-left z-10" data-v-46e22b5e><div class="flex items-center gap-2.5 flex-wrap" data-v-46e22b5e><div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/35 text-xs font-semibold text-emerald-300 shadow-[0_0_20px_rgba(52,199,89,0.2)]" data-v-46e22b5e><span class="relative flex h-2 w-2" data-v-46e22b5e><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" data-v-46e22b5e></span><span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" data-v-46e22b5e></span></span><span class="tracking-wide uppercase text-[11px]" data-v-46e22b5e>AVAILABLE FOR INTERNSHIP</span></div><div class="${ssrRenderClass([unref(isDarkMode) ? "bg-white/[0.05] border-white/10 text-neutral-300" : "bg-slate-200/80 border-slate-300/80 text-slate-700", "px-3 py-1.5 rounded-full border text-[11px] font-mono transition-colors duration-300"])}" data-v-46e22b5e> v4.0 | Mobile Edition </div></div><div class="space-y-3" data-v-46e22b5e><h1 class="text-4xl sm:text-6xl lg:text-[76px] font-black tracking-tight leading-[1.05]" data-v-46e22b5e><span class="${ssrRenderClass([unref(isDarkMode) ? "text-white" : "text-slate-900", "drop-shadow-md mr-3 transition-colors duration-300"])}" data-v-46e22b5e>SORN</span><span class="neon-gradient-text inline-block" data-v-46e22b5e>Sokuntha</span></h1><div class="${ssrRenderClass([unref(isDarkMode) ? "text-neutral-300" : "text-slate-700", "text-[10px] sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase flex items-center gap-2 flex-wrap transition-colors duration-300"])}" data-v-46e22b5e><span class="text-cyan-400 animate-pulse" data-v-46e22b5e>●</span><span data-v-46e22b5e>COMPUTER SCIENCE GRADUATE</span><span class="${ssrRenderClass(unref(isDarkMode) ? "text-neutral-500" : "text-slate-400")}" data-v-46e22b5e>/</span><span data-v-46e22b5e>MOBILE APP DEVELOPER</span></div></div><p class="${ssrRenderClass([unref(isDarkMode) ? "text-neutral-300/90" : "text-slate-600", "text-base sm:text-lg leading-relaxed max-w-xl font-normal transition-colors duration-300"])}" data-v-46e22b5e> A passionate and motivated Computer Science graduate with a strong interest in Mobile Application Development. Experienced in developing mobile and web applications and eager to gain real-world experience through a Mobile App Development Internship. </p><div class="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-lg pt-1" data-v-46e22b5e><div class="pro-stat-box p-2.5 sm:p-4 flex flex-col justify-center glass-shine-wrapper group cursor-default" data-v-46e22b5e><span class="text-xl sm:text-3xl font-black text-cyan-300 tracking-tight transition-transform duration-300 group-hover:scale-105" data-v-46e22b5e> 0${ssrInterpolate(projectsCount.value)}+ </span><span class="${ssrRenderClass([unref(isDarkMode) ? "text-neutral-400" : "text-slate-500", "text-[9px] sm:text-[11px] font-mono tracking-wider uppercase mt-0.5 transition-colors duration-300"])}" data-v-46e22b5e>PROJECTS</span></div><div class="pro-stat-box p-2.5 sm:p-4 flex flex-col justify-center glass-shine-wrapper group cursor-default" data-v-46e22b5e><span class="text-xl sm:text-3xl font-black text-purple-300 tracking-tight transition-transform duration-300 group-hover:scale-105" data-v-46e22b5e>${ssrInterpolate(yearCount.value)}</span><span class="${ssrRenderClass([unref(isDarkMode) ? "text-neutral-400" : "text-slate-500", "text-[9px] sm:text-[11px] font-mono tracking-wider uppercase mt-0.5 transition-colors duration-300"])}" data-v-46e22b5e>RUPP GRADUATE</span></div><div class="pro-stat-box p-2.5 sm:p-4 flex flex-col justify-center glass-shine-wrapper group cursor-default" data-v-46e22b5e><span class="text-xl sm:text-3xl font-black text-emerald-300 tracking-tight transition-transform duration-300 group-hover:scale-105" data-v-46e22b5e>${ssrInterpolate(focusCount.value)}% </span><span class="${ssrRenderClass([unref(isDarkMode) ? "text-neutral-400" : "text-slate-500", "text-[9px] sm:text-[11px] font-mono tracking-wider uppercase mt-0.5 transition-colors duration-300"])}" data-v-46e22b5e>INTERNSHIP FOCUS</span></div></div><div class="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto" data-v-46e22b5e><button class="pro-btn-primary flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold tracking-wider text-white shadow-xl cursor-pointer group glass-shine-wrapper" data-v-46e22b5e><span data-v-46e22b5e>VIEW PROJECTS</span>`);
			_push(ssrRenderComponent(unref(ArrowUpRight), { class: "w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" }, null, _parent));
			_push(`</button><button class="${ssrRenderClass([unref(isDarkMode) ? "text-white" : "text-slate-800", "pro-btn-secondary flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold tracking-wider shadow-md cursor-pointer hover:border-cyan-400/50 glass-shine-wrapper group transition-colors duration-300"])}" data-v-46e22b5e><span data-v-46e22b5e>LET&#39;S TALK</span>`);
			_push(ssrRenderComponent(unref(MessageSquare), { class: "w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" }, null, _parent));
			_push(`</button><button class="${ssrRenderClass([unref(isDarkMode) ? "text-neutral-300 hover:text-white" : "text-slate-700 hover:text-slate-900", "pro-btn-secondary flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold shadow-md cursor-pointer border-dashed glass-shine-wrapper group transition-colors duration-300"])}" data-v-46e22b5e>`);
			_push(ssrRenderComponent(unref(Download), { class: "w-4 h-4 text-purple-400 group-hover:translate-y-0.5 transition-transform" }, null, _parent));
			_push(`<span data-v-46e22b5e>DOWNLOAD CV</span></button></div><div class="pt-2 flex flex-wrap items-center gap-3 text-xs text-neutral-400" data-v-46e22b5e><button class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl pro-pill hover:border-cyan-400/50 hover:text-white transition-all cursor-pointer hover:scale-102" data-v-46e22b5e><span class="w-2 h-2 rounded-full bg-emerald-400" data-v-46e22b5e></span><span class="font-mono" data-v-46e22b5e>+855 99 43 08 69</span>`);
			_push(ssrRenderComponent(unref(Copy), { class: "w-3 h-3 ml-1 opacity-70" }, null, _parent));
			_push(`</button><button class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl pro-pill hover:border-purple-400/50 hover:text-white transition-all cursor-pointer hover:scale-102" data-v-46e22b5e>`);
			_push(ssrRenderComponent(unref(Mail), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400" }, null, _parent));
			_push(`<span class="font-mono" data-v-46e22b5e>sornsokuntha21@gmail.com</span>`);
			_push(ssrRenderComponent(unref(Copy), { class: "w-3 h-3 ml-1 opacity-70" }, null, _parent));
			_push(`</button></div></div><div class="lg:col-span-6 relative flex items-center justify-center select-none py-8 preserve-3d" style="${ssrRenderStyle({ "perspective": "1200px" })}" data-v-46e22b5e><div class="relative w-[290px] xs:w-[330px] sm:w-[440px] lg:w-[520px] aspect-square flex items-center justify-center transition-transform duration-150 ease-out preserve-3d" style="${ssrRenderStyle({ transform: `perspective(1200px) rotateX(${tiltX.value}deg) rotateY(${tiltY.value}deg)` })}" data-v-46e22b5e><div class="absolute inset-0 rounded-full border border-purple-500/35 animate-orbit" style="${ssrRenderStyle({ "transform": "translateZ(10px)" })}" data-v-46e22b5e></div><div class="absolute inset-0 rounded-full overflow-hidden pointer-events-none opacity-45" style="${ssrRenderStyle({ "transform": "translateZ(20px)" })}" data-v-46e22b5e><div class="w-full h-full rounded-full animate-radar origin-center" style="${ssrRenderStyle({ "background": "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(0, 242, 254, 0.45) 360deg)" })}" data-v-46e22b5e></div></div><div class="absolute inset-4 rounded-full border border-cyan-400/35 animate-sonar pointer-events-none" style="${ssrRenderStyle({ "transform": "translateZ(25px)" })}" data-v-46e22b5e></div><div class="absolute inset-6 rounded-full border border-cyan-400/35 animate-orbit" style="${ssrRenderStyle({
				"animation-direction": "reverse",
				"animation-duration": "25s",
				"transform": "translateZ(35px)"
			})}" data-v-46e22b5e></div><div class="absolute inset-12 rounded-full border-2 border-indigo-500/40 shadow-[0_0_60px_rgba(88,86,214,0.4)]" style="${ssrRenderStyle({ "transform": "translateZ(45px)" })}" data-v-46e22b5e></div><div class="relative w-[220px] xs:w-[250px] sm:w-[340px] lg:w-[420px] aspect-square rounded-full p-[3px] overflow-hidden flex items-center justify-center shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_80px_rgba(0,242,254,0.5)] group/avatar cursor-pointer transition-transform duration-300 preserve-3d" style="${ssrRenderStyle({ "transform": "translateZ(65px)" })}" data-v-46e22b5e><div class="absolute inset-[-100%] animate-spin-conic bg-[conic-gradient(from_0deg,#00f2fe,#4facfe,#a855f7,#ec4899,#00f2fe)] opacity-95" data-v-46e22b5e></div><div class="relative w-full h-full rounded-full overflow-hidden bg-slate-950 border border-white/60 flex items-center justify-center backdrop-blur-2xl transition-all duration-500 group-hover/avatar:scale-[0.98]" data-v-46e22b5e><img${ssrRenderAttr("src", _virtual_public__2Fimages_2Fsokuntha_profile_default)} alt="Sorn Sokuntha - Mobile App Developer" class="absolute inset-0 w-full h-full object-cover object-[52%_25%] transition-transform duration-700 ease-out group-hover/avatar:scale-110" data-v-46e22b5e><div class="absolute inset-0 bg-gradient-to-t from-[#030612]/95 via-[#030612]/40 to-transparent pointer-events-none flex flex-col justify-end p-3 sm:p-7 text-center z-10" style="${ssrRenderStyle({ "transform": "translateZ(25px)" })}" data-v-46e22b5e><h3 class="text-base sm:text-2xl font-black text-white tracking-wide drop-shadow-md group-hover/avatar:text-cyan-300 transition-colors" data-v-46e22b5e> Sorn Sokuntha </h3><p class="text-[10px] sm:text-sm text-cyan-300 font-mono mt-0.5 sm:mt-1 font-bold drop-shadow" data-v-46e22b5e> Mobile App Developer </p><div class="mt-2 mx-auto px-3 py-0.5 rounded-full pro-pill text-[10px] text-neutral-200 font-mono flex items-center gap-1.5 border border-white/30 backdrop-blur-xl shadow-lg" data-v-46e22b5e><span class="relative flex h-1.5 w-1.5" data-v-46e22b5e><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" data-v-46e22b5e></span><span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" data-v-46e22b5e></span></span><span data-v-46e22b5e>RUPP Graduate • 2026</span></div></div><div class="absolute inset-0 bg-gradient-to-tr from-white/15 via-transparent to-transparent pointer-events-none z-10" data-v-46e22b5e></div></div></div><div class="${ssrRenderClass([unref(isDarkMode) ? "bg-[#080d1e]/95 border border-cyan-400/70 shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(0,242,254,0.45)]" : "bg-white/95 border border-cyan-500/50 shadow-[0_12px_28px_rgba(0,0,0,0.12),0_0_20px_rgba(0,113,227,0.2)]", "absolute -top-3 left-0 sm:-left-5 z-30 flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full backdrop-blur-xl animate-float-1 hover:scale-115 transition-all cursor-pointer"])}" style="${ssrRenderStyle({ "transform": "translateZ(105px)" })}" data-v-46e22b5e><div class="p-1 rounded-full bg-emerald-500/25 text-emerald-400" data-v-46e22b5e>`);
			_push(ssrRenderComponent(unref(Smartphone), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5" }, null, _parent));
			_push(`</div><span class="${ssrRenderClass([unref(isDarkMode) ? "text-white" : "text-slate-900", "text-[10px] sm:text-xs font-bold tracking-tight transition-colors duration-300"])}" data-v-46e22b5e>Android Native SDK</span></div><div class="${ssrRenderClass([unref(isDarkMode) ? "bg-[#080d1e]/95 border border-purple-400/70 shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(168,85,247,0.45)]" : "bg-white/95 border border-purple-500/50 shadow-[0_12px_28px_rgba(0,0,0,0.12),0_0_20px_rgba(168,85,247,0.2)]", "absolute top-3 -right-2 sm:top-10 sm:-right-6 z-30 flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full backdrop-blur-xl animate-float-2 hover:scale-115 transition-all cursor-pointer"])}" style="${ssrRenderStyle({ "transform": "translateZ(115px)" })}" data-v-46e22b5e><div class="p-1 rounded-full bg-purple-500/25 text-purple-400" data-v-46e22b5e>`);
			_push(ssrRenderComponent(unref(Layers), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5" }, null, _parent));
			_push(`</div><span class="${ssrRenderClass([unref(isDarkMode) ? "text-white" : "text-slate-900", "text-[10px] sm:text-xs font-bold tracking-tight transition-colors duration-300"])}" data-v-46e22b5e>Cross-platform</span></div><div class="${ssrRenderClass([unref(isDarkMode) ? "bg-[#080d1e]/95 border border-blue-400/70 shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(59,130,246,0.45)]" : "bg-white/95 border border-blue-500/50 shadow-[0_12px_28px_rgba(0,0,0,0.12),0_0_20px_rgba(59,130,246,0.2)]", "absolute bottom-3 -left-2 sm:bottom-10 sm:-left-6 z-30 flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full backdrop-blur-xl animate-float-3 hover:scale-115 transition-all cursor-pointer"])}" style="${ssrRenderStyle({ "transform": "translateZ(110px)" })}" data-v-46e22b5e><div class="p-1 rounded-full bg-blue-500/25 text-cyan-400" data-v-46e22b5e>`);
			_push(ssrRenderComponent(unref(Cpu), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5" }, null, _parent));
			_push(`</div><span class="${ssrRenderClass([unref(isDarkMode) ? "text-white" : "text-slate-900", "text-[10px] sm:text-xs font-bold tracking-tight transition-colors duration-300"])}" data-v-46e22b5e>Java &amp; OOP</span></div><div class="${ssrRenderClass([unref(isDarkMode) ? "bg-[#080d1e]/95 border border-pink-400/70 shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(236,72,153,0.45)]" : "bg-white/95 border border-pink-500/50 shadow-[0_12px_28px_rgba(0,0,0,0.12),0_0_20px_rgba(236,72,153,0.2)]", "absolute -bottom-3 right-0 sm:-right-5 z-30 flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full backdrop-blur-xl animate-float-4 hover:scale-115 transition-all cursor-pointer"])}" style="${ssrRenderStyle({ "transform": "translateZ(120px)" })}" data-v-46e22b5e><div class="p-1 rounded-full bg-pink-500/25 text-pink-400" data-v-46e22b5e>`);
			_push(ssrRenderComponent(unref(Database), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5" }, null, _parent));
			_push(`</div><span class="${ssrRenderClass([unref(isDarkMode) ? "text-white" : "text-slate-900", "text-[10px] sm:text-xs font-bold tracking-tight transition-colors duration-300"])}" data-v-46e22b5e>Laravel &amp; PHP</span></div></div></div></div></div></section>`);
		};
	}
});
//#endregion
//#region \0plugin-vue:export-helper
var _plugin_vue_export_helper_default = (sfc, props) => {
	const target = sfc.__vccOpts || sfc;
	for (const [key, val] of props) target[key] = val;
	return target;
};
//#endregion
//#region app/components/Hero.vue
var _sfc_setup$13 = Hero_vue_vue_type_script_setup_true_lang_default.setup;
Hero_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Hero.vue");
	return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
var Hero_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(Hero_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-46e22b5e"]]), { __name: "Hero" });
//#endregion
//#region app/components/TechMarquee.vue?vue&type=script&setup=true&lang.ts
var TechMarquee_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TechMarquee",
	__ssrInlineRender: true,
	setup(__props) {
		const techItems = [
			{
				name: "ANDROID",
				icon: Smartphone,
				color: "text-emerald-400"
			},
			{
				name: "CROSS-PLATFORM",
				icon: Layers,
				color: "text-cyan-400"
			},
			{
				name: "JAVA",
				icon: Terminal,
				color: "text-amber-400"
			},
			{
				name: "C / C++",
				icon: Code2,
				color: "text-blue-400"
			},
			{
				name: "C#",
				icon: Code2,
				color: "text-purple-400"
			},
			{
				name: "OOP",
				icon: Cpu,
				color: "text-pink-400"
			},
			{
				name: "LARAVEL",
				icon: Database,
				color: "text-rose-400"
			},
			{
				name: "PHP",
				icon: FileCode,
				color: "text-indigo-400"
			},
			{
				name: "REACT JS",
				icon: Globe,
				color: "text-cyan-400"
			},
			{
				name: "JAVASCRIPT",
				icon: Code2,
				color: "text-yellow-400"
			},
			{
				name: "VUE.JS",
				icon: Layers,
				color: "text-emerald-400"
			},
			{
				name: "NUXT 4",
				icon: Sparkles,
				color: "text-teal-400"
			},
			{
				name: "TAILWIND CSS",
				icon: Globe,
				color: "text-sky-400"
			},
			{
				name: "GIT",
				icon: GitBranch,
				color: "text-orange-400"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full overflow-hidden py-4 border-y border-white/10 bg-black/40 backdrop-blur-xl" }, _attrs))}><div class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#040711] to-transparent z-10 pointer-events-none"></div><div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#040711] to-transparent z-10 pointer-events-none"></div><div class="animate-marquee flex items-center gap-10"><!--[-->`);
			ssrRenderList(techItems, (item, idx) => {
				_push(`<div class="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider text-neutral-300 hover:text-white select-none whitespace-nowrap transition-colors">`);
				ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.icon), { class: ["w-4 h-4", item.color] }, null), _parent);
				_push(`<span>${ssrInterpolate(item.name)}</span></div>`);
			});
			_push(`<!--]--><!--[-->`);
			ssrRenderList(techItems, (item, idx) => {
				_push(`<div class="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider text-neutral-300 hover:text-white select-none whitespace-nowrap transition-colors">`);
				ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.icon), { class: ["w-4 h-4", item.color] }, null), _parent);
				_push(`<span>${ssrInterpolate(item.name)}</span></div>`);
			});
			_push(`<!--]--></div></div>`);
		};
	}
});
//#endregion
//#region app/components/TechMarquee.vue
var _sfc_setup$12 = TechMarquee_vue_vue_type_script_setup_true_lang_default.setup;
TechMarquee_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TechMarquee.vue");
	return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
var TechMarquee_default = Object.assign(TechMarquee_vue_vue_type_script_setup_true_lang_default, { __name: "TechMarquee" });
//#endregion
//#region app/components/About.vue?vue&type=script&setup=true&lang.ts
var About_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "About",
	__ssrInlineRender: true,
	setup(__props) {
		const highlights = [
			{
				icon: GraduationCap,
				title: "Computer Science Graduate",
				desc: "Graduated with a Bachelor of Computer Science from the Royal University of Phnom Penh (RUPP, 2022–2026), grounded in solid theoretical and practical software engineering fundamentals.",
				gradient: "from-blue-500/20 to-cyan-500/20",
				iconColor: "text-cyan-400",
				tag: "RUPP 2026"
			},
			{
				icon: Smartphone,
				title: "Mobile Application Development",
				desc: "Dedicated focus on crafting fluid, responsive mobile interfaces and architectures for Android and cross-platform ecosystems with user-first paradigms.",
				gradient: "from-purple-500/20 to-pink-500/20",
				iconColor: "text-purple-400",
				tag: "Core Specialization"
			},
			{
				icon: Globe2,
				title: "Full Web Development Stack",
				desc: "Hands-on experience developing clean web interfaces and reliable backend systems utilizing modern JavaScript, React JS, PHP, and Laravel.",
				gradient: "from-cyan-500/20 to-emerald-500/20",
				iconColor: "text-emerald-400",
				tag: "Full-Stack Logic"
			},
			{
				icon: Lightbulb,
				title: "Problem Solving & OOP",
				desc: "Strong grounding in object-oriented programming (OOP), data structures, and algorithmic logic across C, C++, C#, and Java.",
				gradient: "from-amber-500/20 to-orange-500/20",
				iconColor: "text-amber-400",
				tag: "Architecture"
			},
			{
				icon: Sparkles,
				title: "User-Friendly Application Design",
				desc: "Passionate about seamless user experiences, intuitive navigation hierarchies, accessibility, and modern glassmorphic interface aesthetics.",
				gradient: "from-indigo-500/20 to-purple-500/20",
				iconColor: "text-indigo-400",
				tag: "UI / UX Design"
			},
			{
				icon: TrendingUp,
				title: "Continuous Learning & Growth",
				desc: "Eager to absorb mentorship from senior engineers, tackle complex real-world engineering hurdles, and make impactful team contributions.",
				gradient: "from-emerald-500/20 to-teal-500/20",
				iconColor: "text-teal-400",
				tag: "Career Ambition"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "about",
				class: "py-24 relative"
			}, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-left max-w-3xl mb-14 space-y-3"><div class="section-tag text-cyan-400 flex items-center gap-2"><span>01 //</span><span>ABOUT ME</span></div><h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight"> Blending Technical Precision with Mobile Innovation </h2><p class="text-neutral-400 text-base sm:text-lg leading-relaxed"> Driven by a curiosity for how software transforms daily life, I build dependable mobile and web applications with clean architecture and intuitive user interfaces. </p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
			ssrRenderList(highlights, (item, idx) => {
				_push(`<div class="pro-card card-3d preserve-3d p-7 sm:p-8 flex flex-col justify-between group relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:rotate-x-2 hover:border-cyan-400/50 hover:shadow-[0_25px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,242,254,0.25)]"><div class="${ssrRenderClass([`bg-gradient-to-br ${item.gradient}`, "absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"])}"></div><div><div class="flex items-center justify-between mb-5"><div class="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/[0.05] border border-white/12 backdrop-blur-md group-hover:scale-110 transition-transform shadow-md" style="${ssrRenderStyle({ "transform": "translateZ(35px)" })}">`);
				ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.icon), { class: ["w-6 h-6", item.iconColor] }, null), _parent);
				_push(`</div><span class="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-neutral-300">${ssrInterpolate(item.tag)}</span></div><h3 class="text-lg font-bold text-white mb-2.5 tracking-tight group-hover:text-cyan-300 transition-colors" style="${ssrRenderStyle({ "transform": "translateZ(25px)" })}">${ssrInterpolate(item.title)}</h3><p class="text-sm text-neutral-400 leading-relaxed">${ssrInterpolate(item.desc)}</p></div><div class="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400"><span class="font-mono text-[11px] text-cyan-400/80">Software Engineering</span>`);
				_push(ssrRenderComponent(unref(CheckCircle2), { class: "w-4 h-4 text-emerald-400" }, null, _parent));
				_push(`</div></div>`);
			});
			_push(`<!--]--></div><div class="mt-10 p-6 sm:p-8 rounded-[24px] pro-card flex flex-wrap items-center justify-around gap-6 text-sm text-neutral-300"><div class="flex items-center gap-3.5"><div class="p-3 rounded-2xl bg-blue-500/20 text-cyan-400 border border-blue-500/30">`);
			_push(ssrRenderComponent(unref(MapPin), { class: "w-5 h-5" }, null, _parent));
			_push(`</div><div><p class="text-xs text-neutral-400 font-medium">Resident Location</p><p class="font-bold text-white">Phnom Penh, Cambodia</p></div></div><div class="flex items-center gap-3.5"><div class="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">`);
			_push(ssrRenderComponent(unref(GraduationCap), { class: "w-5 h-5" }, null, _parent));
			_push(`</div><div><p class="text-xs text-neutral-400 font-medium">Academic Degree</p><p class="font-bold text-white">B.S. in Computer Science (RUPP)</p></div></div><div class="flex items-center gap-3.5"><div class="p-3 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">`);
			_push(ssrRenderComponent(unref(Smartphone), { class: "w-5 h-5" }, null, _parent));
			_push(`</div><div><p class="text-xs text-neutral-400 font-medium">Primary Goal</p><p class="font-bold text-white">Mobile App Dev Internship</p></div></div></div></div></section>`);
		};
	}
});
//#endregion
//#region app/components/About.vue
var _sfc_setup$11 = About_vue_vue_type_script_setup_true_lang_default.setup;
About_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/About.vue");
	return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
var About_default = Object.assign(About_vue_vue_type_script_setup_true_lang_default, { __name: "About" });
//#endregion
//#region app/components/Skills.vue?vue&type=script&setup=true&lang.ts
var Skills_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Skills",
	__ssrInlineRender: true,
	setup(__props) {
		const activeSkillFilter = ref("all");
		const skillCategories = [
			{
				id: "mobile",
				name: "Mobile Development",
				subtitle: "Core Focus & Native Platforms",
				icon: Smartphone,
				iconColor: "text-cyan-400",
				skills: [{
					name: "Android",
					note: "Native & Modern SDK"
				}, {
					name: "Cross-platform Mobile Development",
					note: "Multi-OS Architecture"
				}]
			},
			{
				id: "programming",
				name: "Programming & Foundations",
				subtitle: "Core Languages & Paradigms",
				icon: Terminal,
				iconColor: "text-purple-400",
				skills: [
					{
						name: "C / C++",
						note: "Foundations & Memory"
					},
					{
						name: "C#",
						note: "Application Logic"
					},
					{
						name: "Java",
						note: "Android & Enterprise"
					},
					{
						name: "OOP",
						note: "Design Patterns & Principles"
					}
				]
			},
			{
				id: "web",
				name: "Web Development Stack",
				subtitle: "Frontend & Backend Systems",
				icon: Globe,
				iconColor: "text-emerald-400",
				skills: [
					{
						name: "HTML",
						note: "Semantic Structure"
					},
					{
						name: "CSS",
						note: "Responsive Styling"
					},
					{
						name: "JavaScript",
						note: "ES6+ & Asynchronous"
					},
					{
						name: "React JS",
						note: "Component Architecture"
					},
					{
						name: "PHP",
						note: "Server-Side Processing"
					},
					{
						name: "Laravel",
						note: "MVC Framework & APIs"
					}
				]
			},
			{
				id: "tools",
				name: "Tools & Soft Skills",
				subtitle: "Workflow, Productivity & Collaboration",
				icon: Wrench,
				iconColor: "text-amber-400",
				skills: [
					{
						name: "Git",
						note: "Version Control & Branching"
					},
					{
						name: "Microsoft Office",
						note: "Documentation & Reporting"
					},
					{
						name: "Public Relations",
						note: "Stakeholder Engagement"
					},
					{
						name: "Teamwork",
						note: "Agile Collaboration"
					},
					{
						name: "Time Management",
						note: "Task Prioritization"
					},
					{
						name: "Effective Communication",
						note: "Clear Articulation"
					},
					{
						name: "Critical Thinking",
						note: "Analytical Problem Solving"
					}
				]
			}
		];
		const filteredCategories = computed(() => {
			if (activeSkillFilter.value === "all") return skillCategories;
			return skillCategories.filter((c) => c.id === activeSkillFilter.value);
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "skills",
				class: "py-24 relative"
			}, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-left max-w-3xl mb-12 space-y-3"><div class="section-tag text-purple-400 flex items-center gap-2"><span>02 //</span><span>TECHNICAL SKILLS</span></div><h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight"> Specialized Competencies &amp; Tools </h2><p class="text-neutral-400 text-base sm:text-lg leading-relaxed"> Comprehensive foundation built across mobile platforms, programming fundamentals, web technologies, engineering workflows, and team collaboration. </p><div class="pt-4 flex items-center flex-wrap gap-2"><div class="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl w-full sm:w-auto"><button class="${ssrRenderClass([[activeSkillFilter.value === "all" ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md" : "text-neutral-400 hover:text-white"], "px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer"])}"> All Skills </button><button class="${ssrRenderClass([[activeSkillFilter.value === "mobile" ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md" : "text-neutral-400 hover:text-white"], "px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer"])}"> Mobile Dev </button><button class="${ssrRenderClass([[activeSkillFilter.value === "programming" ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md" : "text-neutral-400 hover:text-white"], "px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer"])}"> Programming &amp; OOP </button><button class="${ssrRenderClass([[activeSkillFilter.value === "web" ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md" : "text-neutral-400 hover:text-white"], "px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer"])}"> Web Dev </button><button class="${ssrRenderClass([[activeSkillFilter.value === "tools" ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md" : "text-neutral-400 hover:text-white"], "px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer"])}"> Tools &amp; Soft Skills </button></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
			ssrRenderList(filteredCategories.value, (cat) => {
				_push(`<div class="pro-card card-3d preserve-3d p-7 sm:p-8 flex flex-col justify-between group transition-all duration-500 hover:-translate-y-2 hover:rotate-x-2 hover:border-purple-400/50 hover:shadow-[0_25px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(168,85,247,0.25)]"><div><div class="flex items-center justify-between mb-6"><div class="flex items-center gap-3.5"><div class="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/12 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform shadow-md" style="${ssrRenderStyle({ "transform": "translateZ(35px)" })}">`);
				ssrRenderVNode(_push, createVNode(resolveDynamicComponent(cat.icon), { class: ["w-6 h-6", cat.iconColor] }, null), _parent);
				_push(`</div><div><h3 class="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">${ssrInterpolate(cat.name)}</h3><p class="text-xs text-neutral-400">${ssrInterpolate(cat.subtitle)}</p></div></div></div><div class="flex flex-wrap gap-2.5"><!--[-->`);
				ssrRenderList(cat.skills, (skill) => {
					_push(`<div class="px-4 py-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 transition-all duration-200 cursor-default flex items-center gap-2.5 group/skill hover:scale-105"><div class="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]"></div><div class="flex flex-col"><span class="text-xs font-bold text-white tracking-tight">${ssrInterpolate(skill.name)}</span><span class="text-[10px] text-neutral-400">${ssrInterpolate(skill.note)}</span></div></div>`);
				});
				_push(`<!--]--></div></div><div class="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-mono"><span>${ssrInterpolate(cat.skills.length)} Verified Skills</span><div class="flex items-center gap-1.5 text-emerald-400">`);
				_push(ssrRenderComponent(unref(ShieldCheck), { class: "w-4 h-4" }, null, _parent));
				_push(`<span>Production Ready</span></div></div></div>`);
			});
			_push(`<!--]--></div></div></section>`);
		};
	}
});
//#endregion
//#region app/components/Skills.vue
var _sfc_setup$10 = Skills_vue_vue_type_script_setup_true_lang_default.setup;
Skills_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Skills.vue");
	return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
var Skills_default = Object.assign(Skills_vue_vue_type_script_setup_true_lang_default, { __name: "Skills" });
//#endregion
//#region app/components/Projects.vue?vue&type=script&setup=true&lang.ts
var Projects_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Projects",
	__ssrInlineRender: true,
	setup(__props) {
		usePortfolioState();
		const selectedCategory = ref("all");
		const projects = [
			{
				id: "hotel-booking",
				title: "Hotel Booking System",
				subtitle: "Enterprise Room Reservation & Inventory Platform",
				category: "System",
				description: "A comprehensive hotel reservation management system engineered for high-accuracy availability checking, streamlined booking workflows, role-based user management, and efficient data handling.",
				technologies: [
					"PHP",
					"Laravel",
					"OOP",
					"HTML/CSS",
					"JavaScript"
				],
				features: [
					"Room booking workflow",
					"Real-time availability checking",
					"User management & roles",
					"Efficient data handling & storage"
				],
				gradient: "from-blue-600/30 via-indigo-600/20 to-cyan-500/20",
				accentColor: "#0071e3",
				iconName: "Building",
				mockupType: "system"
			},
			{
				id: "skincare-mobile",
				title: "Skincare Mobile Application",
				subtitle: "Intelligent Skin Analysis & Personalized Routine",
				category: "Mobile",
				description: "An intuitive mobile application designed to provide personalized skincare recommendations based on interactive user inputs, skin profiles, and structured data processing algorithms.",
				technologies: [
					"Android",
					"Cross-platform Mobile",
					"Java",
					"OOP",
					"UI/UX Design"
				],
				features: [
					"Skincare recommendations engine",
					"User-friendly mobile UI",
					"Dynamic user input processing",
					"Reliable data processing pipeline"
				],
				gradient: "from-purple-600/30 via-pink-600/20 to-blue-500/20",
				accentColor: "#af52de",
				iconName: "Smartphone",
				mockupType: "phone"
			},
			{
				id: "idp-website",
				title: "IDP Website Development",
				subtitle: "Multi-Device Responsive Information Portal",
				category: "Web",
				description: "A fully responsive web platform developed with modern web standards, delivering smooth multi-screen adaptation across mobile smartphones, tablets, and wide desktop displays.",
				technologies: [
					"HTML",
					"CSS",
					"JavaScript",
					"Responsive Design",
					"Cross-Browser UI"
				],
				features: [
					"Semantic HTML5 structure",
					"Modern responsive CSS styling",
					"Interactive JavaScript components",
					"Complete Mobile/Tablet/Desktop support"
				],
				gradient: "from-cyan-600/30 via-teal-600/20 to-emerald-500/20",
				accentColor: "#32ade6",
				iconName: "Layout",
				mockupType: "browser"
			}
		];
		const filteredProjects = computed(() => {
			if (selectedCategory.value === "all") return projects;
			return projects.filter((p) => p.category === selectedCategory.value);
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "projects",
				class: "py-24 relative"
			}, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-left max-w-3xl mb-12 space-y-3"><div class="section-tag text-cyan-400 flex items-center gap-2"><span>03 //</span><span>FEATURED PROJECTS</span></div><h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight"> Software &amp; Mobile Applications </h2><p class="text-neutral-400 text-base sm:text-lg leading-relaxed"> Showcasing real-world applications engineered with a strong emphasis on clean code, seamless user experience, and practical business logic. </p><div class="pt-4 flex items-center"><div class="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl w-full sm:w-auto"><button class="${ssrRenderClass([[selectedCategory.value === "all" ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md" : "text-neutral-400 hover:text-white"], "px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer"])}"> All (3) </button><button class="${ssrRenderClass([[selectedCategory.value === "Mobile" ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md" : "text-neutral-400 hover:text-white"], "px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer"])}"> Mobile App </button><button class="${ssrRenderClass([[selectedCategory.value === "System" ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md" : "text-neutral-400 hover:text-white"], "px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer"])}"> Hotel System </button><button class="${ssrRenderClass([[selectedCategory.value === "Web" ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md" : "text-neutral-400 hover:text-white"], "px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer"])}"> IDP Website </button></div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><!--[-->`);
			ssrRenderList(filteredProjects.value, (project) => {
				_push(`<div class="pro-card card-3d preserve-3d flex flex-col justify-between overflow-hidden group hover:border-cyan-400/50 relative transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(0,113,227,0.3)]"><div class="relative h-56 w-full overflow-hidden bg-gradient-to-br from-black/85 via-slate-950 to-slate-900 border-b border-white/10 flex items-center justify-center p-6"><div class="${ssrRenderClass([`bg-gradient-to-br ${project.gradient}`, "absolute inset-0 opacity-40 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none"])}"></div>`);
				if (project.mockupType === "phone") {
					_push(`<div class="relative z-10 w-32 h-44 rounded-3xl bg-slate-950/95 border-2 border-white/40 shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_30px_rgba(175,82,222,0.35)] p-2.5 flex flex-col justify-between transition-all duration-500 group-hover:scale-110 group-hover:rotate-0 group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_50px_rgba(175,82,222,0.6)]" style="${ssrRenderStyle({ "transform": "perspective(800px) rotateY(-14deg) rotateX(10deg) translateZ(35px)" })}"><div class="w-12 h-2.5 bg-black rounded-full mx-auto border border-white/10 flex items-center justify-center"><div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div></div><div class="space-y-1.5 px-1 py-1"><div class="h-10 rounded-xl bg-gradient-to-tr from-purple-600/40 to-pink-500/30 border border-purple-400/40 flex items-center justify-center">`);
					_push(ssrRenderComponent(unref(Sparkles), { class: "w-5 h-5 text-purple-300" }, null, _parent));
					_push(`</div><div class="h-2 w-4/5 bg-white/40 rounded"></div><div class="h-2 w-3/5 bg-white/25 rounded"></div></div><div class="w-10 h-1 bg-white/40 rounded-full mx-auto"></div></div>`);
				} else {
					_push(`<div class="relative z-10 w-64 sm:w-72 h-42 rounded-2xl bg-slate-950/95 border border-white/40 shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_30px_rgba(0,113,227,0.35)] p-3 flex flex-col justify-between transition-all duration-500 group-hover:scale-108 group-hover:rotate-0 group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_50px_rgba(0,113,227,0.6)]" style="${ssrRenderStyle({ "transform": "perspective(800px) rotateX(12deg) rotateY(-8deg) translateZ(30px)" })}"><div class="flex items-center gap-1.5 pb-2 border-b border-white/15"><div class="w-2.5 h-2.5 rounded-full bg-red-400/90"></div><div class="w-2.5 h-2.5 rounded-full bg-yellow-400/90"></div><div class="w-2.5 h-2.5 rounded-full bg-emerald-400/90"></div><div class="ml-2 flex-1 h-3.5 rounded-md bg-white/10 border border-white/15 flex items-center px-2"><span class="text-[8px] text-white/70 font-mono tracking-tight">https://${ssrInterpolate(project.id)}.internal</span></div></div><div class="flex-1 py-2 flex items-center justify-center"><div class="text-center space-y-1.5"><div class="inline-flex p-2.5 rounded-xl bg-blue-500/20 text-cyan-300 border border-blue-400/30">`);
					ssrRenderVNode(_push, createVNode(resolveDynamicComponent(project.mockupType === "system" ? unref(Building) : unref(Layout)), { class: "w-5 h-5" }, null), _parent);
					_push(`</div><p class="text-[11px] font-bold text-white tracking-wide">${ssrInterpolate(project.title)}</p><p class="text-[9px] text-neutral-400">High-Concurrency Architecture</p></div></div></div>`);
				}
				_push(`<div class="absolute top-3.5 left-3.5 z-20"><span class="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-black/80 backdrop-blur-md text-white border border-white/20 shadow-md">${ssrInterpolate(project.category)}</span></div></div><div class="p-7 flex-1 flex flex-col justify-between space-y-5"><div><h3 class="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">${ssrInterpolate(project.title)}</h3><p class="text-xs text-cyan-400/90 font-medium mt-1">${ssrInterpolate(project.subtitle)}</p><p class="text-xs sm:text-sm text-neutral-400 mt-3 leading-relaxed">${ssrInterpolate(project.description)}</p><div class="mt-4 space-y-2"><!--[-->`);
				ssrRenderList(project.features, (feat) => {
					_push(`<div class="flex items-center gap-2 text-xs text-neutral-300">`);
					_push(ssrRenderComponent(unref(CheckCircle2), { class: "w-3.5 h-3.5 text-cyan-400 shrink-0" }, null, _parent));
					_push(`<span>${ssrInterpolate(feat)}</span></div>`);
				});
				_push(`<!--]--></div></div><div class="space-y-4 pt-4 border-t border-white/10"><div class="flex flex-wrap gap-1.5"><!--[-->`);
				ssrRenderList(project.technologies, (tech) => {
					_push(`<span class="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-white/[0.05] border border-white/10 text-neutral-300">${ssrInterpolate(tech)}</span>`);
				});
				_push(`<!--]--></div><div class="grid grid-cols-2 gap-2.5 pt-1"><button class="pro-btn-primary flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md group/btn cursor-pointer"><span>View Details</span>`);
				_push(ssrRenderComponent(unref(ArrowUpRight), { class: "w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" }, null, _parent));
				_push(`</button><button class="pro-btn-secondary flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white cursor-pointer" title="Coursework Repository">`);
				_push(ssrRenderComponent(unref(Github), { class: "w-3.5 h-3.5" }, null, _parent));
				_push(`<span>GitHub</span></button></div></div></div></div>`);
			});
			_push(`<!--]--></div></div></section>`);
		};
	}
});
//#endregion
//#region app/components/Projects.vue
var _sfc_setup$9 = Projects_vue_vue_type_script_setup_true_lang_default.setup;
Projects_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Projects.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var Projects_default = Object.assign(Projects_vue_vue_type_script_setup_true_lang_default, { __name: "Projects" });
//#endregion
//#region app/components/Education.vue?vue&type=script&setup=true&lang.ts
var Education_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Education",
	__ssrInlineRender: true,
	setup(__props) {
		const educationTimeline = [{
			degree: "Bachelor of Computer Science",
			institution: "Royal University of Phnom Penh (RUPP)",
			period: "2022 – 2026",
			status: "Graduated",
			badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-400/35",
			description: "Comprehensive 4-year computer science curriculum emphasizing software engineering, object-oriented programming (C++, Java, C#), mobile and web systems architecture, database management, and hands-on capstone project development.",
			highlights: [
				"Graduated with strong foundations in OOP & System Design",
				"Developed real-world web and mobile software projects",
				"Under the academic mentorship of top faculty lecturers"
			]
		}, {
			degree: "High School Diploma",
			institution: "Toul Kbel High School",
			period: "2020 – 2022",
			status: "Completed",
			badgeColor: "bg-blue-500/15 text-cyan-300 border-blue-400/35",
			description: "Completed secondary education with focused studies in mathematics, scientific methodology, and analytical thinking, establishing the groundwork for computer science and software development pursuits.",
			highlights: ["Advanced Mathematics & Science curriculum", "Fostered critical thinking and problem-solving aptitude"]
		}];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "education",
				class: "py-24 relative"
			}, _attrs))}><div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-left max-w-3xl mb-14 space-y-3"><div class="section-tag text-emerald-400 flex items-center gap-2"><span>04 //</span><span>EDUCATION &amp; TIMELINE</span></div><h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight"> Academic Foundations &amp; Journey </h2><p class="text-neutral-400 text-base sm:text-lg leading-relaxed"> Academic journey reflecting continuous discipline, computer science rigor, and engineering excellence. </p></div><div class="relative pl-8 sm:pl-12 space-y-12 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-cyan-400 before:via-purple-500 before:to-blue-600 before:opacity-60"><!--[-->`);
			ssrRenderList(educationTimeline, (item) => {
				_push(`<div class="relative group"><div class="absolute -left-8 sm:-left-12 top-2 w-6 h-6 rounded-full bg-[#030612] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_#22d3ee] group-hover:scale-125 transition-transform duration-300"><div class="w-2 h-2 rounded-full bg-cyan-300 animate-pulse"></div></div><div class="pro-card p-7 sm:p-8 space-y-4 hover:border-cyan-400/40 transition-all"><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"><div><div class="flex items-center gap-3 flex-wrap"><h3 class="text-lg sm:text-xl font-bold text-white tracking-tight">${ssrInterpolate(item.degree)}</h3><span class="${ssrRenderClass([item.badgeColor, "px-3 py-0.5 rounded-full text-[11px] font-semibold border"])}">${ssrInterpolate(item.status)}</span></div><div class="flex items-center gap-2 text-sm text-cyan-300 font-medium mt-1">`);
				_push(ssrRenderComponent(unref(Building2), { class: "w-4 h-4" }, null, _parent));
				_push(`<span>${ssrInterpolate(item.institution)}</span></div></div><div class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-neutral-300 self-start sm:self-center">`);
				_push(ssrRenderComponent(unref(Calendar), { class: "w-3.5 h-3.5 text-cyan-400" }, null, _parent));
				_push(`<span>${ssrInterpolate(item.period)}</span></div></div><p class="text-sm text-neutral-400 leading-relaxed">${ssrInterpolate(item.description)}</p><div class="pt-3 border-t border-white/10 space-y-2"><!--[-->`);
				ssrRenderList(item.highlights, (hl) => {
					_push(`<div class="flex items-start gap-2.5 text-xs text-neutral-300">`);
					_push(ssrRenderComponent(unref(CheckCircle2), { class: "w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" }, null, _parent));
					_push(`<span>${ssrInterpolate(hl)}</span></div>`);
				});
				_push(`<!--]--></div></div></div>`);
			});
			_push(`<!--]--></div></div></section>`);
		};
	}
});
//#endregion
//#region app/components/Education.vue
var _sfc_setup$8 = Education_vue_vue_type_script_setup_true_lang_default.setup;
Education_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Education.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var Education_default = Object.assign(Education_vue_vue_type_script_setup_true_lang_default, { __name: "Education" });
//#endregion
//#region app/components/InternshipCta.vue?vue&type=script&setup=true&lang.ts
var InternshipCta_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "InternshipCta",
	__ssrInlineRender: true,
	setup(__props) {
		usePortfolioState();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({ class: "py-20 relative" }, _attrs))}><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div class="relative rounded-[36px] overflow-hidden p-8 sm:p-14 lg:p-16 pro-card border border-white/20 shadow-[0_25px_70px_-15px_rgba(0,113,227,0.4)]"><div class="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-600/30 blur-3xl pointer-events-none"></div><div class="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-purple-600/30 blur-3xl pointer-events-none"></div><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none"></div><div class="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-7"><div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full pro-pill text-xs font-semibold text-cyan-300">`);
			_push(ssrRenderComponent(unref(Rocket), { class: "w-4 h-4 text-cyan-400" }, null, _parent));
			_push(`<span class="tracking-wide uppercase text-[11px]">CAREER OPPORTUNITY</span></div><h2 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight"> Looking for an Opportunity to Grow </h2><blockquote class="text-base sm:text-xl text-neutral-200 leading-relaxed font-normal max-w-2xl border-l-2 border-cyan-400/60 pl-4 py-1 text-left sm:text-center sm:border-l-0 sm:pl-0"> &quot;I am currently seeking a Mobile App Development Internship where I can apply my programming knowledge, contribute to real-world projects, learn from experienced developers, and grow as a professional software developer.&quot; </blockquote><div class="flex flex-wrap items-center justify-center gap-4 pt-2"><button class="pro-btn-primary flex items-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-bold tracking-wider text-white shadow-xl group cursor-pointer">`);
			_push(ssrRenderComponent(unref(Mail), { class: "w-4 h-4" }, null, _parent));
			_push(`<span>CONTACT ME</span>`);
			_push(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 group-hover:translate-x-1 transition-transform" }, null, _parent));
			_push(`</button><button class="pro-btn-secondary flex items-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-bold tracking-wider text-white shadow-md hover:border-cyan-400/50 cursor-pointer">`);
			_push(ssrRenderComponent(unref(Download), { class: "w-4 h-4 text-cyan-400" }, null, _parent));
			_push(`<span>DOWNLOAD CV</span></button></div><div class="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-neutral-400"><button class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl pro-pill hover:border-cyan-400/40 hover:text-white transition-all cursor-pointer">`);
			_push(ssrRenderComponent(unref(Phone), { class: "w-3.5 h-3.5 text-cyan-400" }, null, _parent));
			_push(`<span class="font-mono">+855 99 43 08 69</span>`);
			_push(ssrRenderComponent(unref(Copy), { class: "w-3 h-3 ml-1 opacity-70" }, null, _parent));
			_push(`</button><button class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl pro-pill hover:border-purple-400/40 hover:text-white transition-all cursor-pointer">`);
			_push(ssrRenderComponent(unref(Mail), { class: "w-3.5 h-3.5 text-purple-400" }, null, _parent));
			_push(`<span class="font-mono">sornsokuntha21@gmail.com</span>`);
			_push(ssrRenderComponent(unref(Copy), { class: "w-3 h-3 ml-1 opacity-70" }, null, _parent));
			_push(`</button></div><div class="pt-6 border-t border-white/10 w-full flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400"><span class="flex items-center gap-1.5">`);
			_push(ssrRenderComponent(unref(CheckCircle2), { class: "w-4 h-4 text-emerald-400" }, null, _parent));
			_push(`<span class="font-medium">Quick Learner &amp; Adaptable</span></span><span class="flex items-center gap-1.5">`);
			_push(ssrRenderComponent(unref(CheckCircle2), { class: "w-4 h-4 text-cyan-400" }, null, _parent));
			_push(`<span class="font-medium">Full Internship Availability</span></span><span class="flex items-center gap-1.5">`);
			_push(ssrRenderComponent(unref(CheckCircle2), { class: "w-4 h-4 text-purple-400" }, null, _parent));
			_push(`<span class="font-medium">Dedicated Team Player</span></span></div></div></div></div></section>`);
		};
	}
});
//#endregion
//#region app/components/InternshipCta.vue
var _sfc_setup$7 = InternshipCta_vue_vue_type_script_setup_true_lang_default.setup;
InternshipCta_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/InternshipCta.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var InternshipCta_default = Object.assign(InternshipCta_vue_vue_type_script_setup_true_lang_default, { __name: "InternshipCta" });
//#endregion
//#region app/components/Contact.vue?vue&type=script&setup=true&lang.ts
var Contact_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Contact",
	__ssrInlineRender: true,
	setup(__props) {
		usePortfolioState();
		const formData = ref({
			name: "",
			email: "",
			message: ""
		});
		const errors = ref({});
		const isSubmitting = ref(false);
		const submitted = ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "contact",
				class: "py-24 relative"
			}, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-left max-w-3xl mb-14 space-y-3"><div class="section-tag text-cyan-400 flex items-center gap-2"><span>05 //</span><span>GET IN TOUCH</span></div><h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight"> Let&#39;s Connect &amp; Build Together </h2><p class="text-neutral-400 text-base sm:text-lg leading-relaxed"> Open for Mobile App Development Internship opportunities, technical interviews, and collaborative software projects. </p></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div class="lg:col-span-5 space-y-6"><div class="pro-card p-7 sm:p-8 space-y-6"><h3 class="text-lg font-bold text-white tracking-tight flex items-center gap-2.5"><span class="p-1.5 rounded-xl bg-blue-500/20 text-cyan-400">`);
			_push(ssrRenderComponent(unref(User), { class: "w-5 h-5" }, null, _parent));
			_push(`</span><span>Contact Coordinates</span></h3><div class="space-y-4"><div class="flex items-start justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/10 group hover:border-cyan-400/40 transition-all"><a href="tel:+85599430869" class="flex items-center gap-3.5 text-neutral-200 hover:text-cyan-300 transition-colors"><div class="p-2.5 rounded-xl bg-blue-500/20 text-cyan-400 border border-blue-400/30">`);
			_push(ssrRenderComponent(unref(Phone), { class: "w-4 h-4" }, null, _parent));
			_push(`</div><div><p class="text-[11px] text-neutral-400 font-medium">Direct Phone</p><p class="text-sm font-bold tracking-wide font-mono">+855 99 43 08 69</p></div></a><button class="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer" title="Copy Phone">`);
			_push(ssrRenderComponent(unref(Copy), { class: "w-4 h-4" }, null, _parent));
			_push(`</button></div><div class="flex items-start justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/10 group hover:border-purple-400/40 transition-all"><a href="mailto:sornsokuntha21@gmail.com" class="flex items-center gap-3.5 text-neutral-200 hover:text-cyan-300 transition-colors"><div class="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-400/30">`);
			_push(ssrRenderComponent(unref(Mail), { class: "w-4 h-4" }, null, _parent));
			_push(`</div><div><p class="text-[11px] text-neutral-400 font-medium">Email Address</p><p class="text-sm font-bold tracking-wide font-mono">sornsokuntha21@gmail.com</p></div></a><button class="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer" title="Copy Email">`);
			_push(ssrRenderComponent(unref(Copy), { class: "w-4 h-4" }, null, _parent));
			_push(`</button></div><div class="flex items-start gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/10"><div class="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">`);
			_push(ssrRenderComponent(unref(MapPin), { class: "w-4 h-4" }, null, _parent));
			_push(`</div><div><p class="text-[11px] text-neutral-400 font-medium">Resident Location</p><p class="text-xs sm:text-sm font-semibold text-white leading-snug"> Sangkat Touk Thla, Khan Sen Sok, Phnom Penh, Cambodia </p></div></div></div></div><div class="pro-card p-7 sm:p-8 space-y-4 border-l-4 border-l-purple-500"><div class="flex items-center gap-2.5"><div class="p-2 rounded-xl bg-purple-500/20 text-purple-400">`);
			_push(ssrRenderComponent(unref(UserCheck), { class: "w-5 h-5" }, null, _parent));
			_push(`</div><div><h4 class="text-sm font-bold text-white">Academic Reference</h4><p class="text-[11px] text-neutral-400">University Faculty Mentor</p></div></div><div class="space-y-1"><p class="text-base font-bold text-white">Mr. Thou Chamroeun</p><p class="text-xs text-neutral-300"> Lecturer (Web Front-End &amp; Back-End) </p><p class="text-xs text-cyan-400 font-medium"> Royal University of Phnom Penh (RUPP) </p></div><div class="pt-3 border-t border-white/10 space-y-2 text-xs"><div class="flex items-center justify-between p-2 rounded-xl bg-white/[0.03]"><a href="tel:+85512522227" class="flex items-center gap-2 text-neutral-300 hover:text-white">`);
			_push(ssrRenderComponent(unref(Phone), { class: "w-3.5 h-3.5 text-purple-400" }, null, _parent));
			_push(`<span class="font-mono">+855 12 52 22 27</span></a><button class="text-neutral-400 hover:text-white cursor-pointer">`);
			_push(ssrRenderComponent(unref(Copy), { class: "w-3.5 h-3.5" }, null, _parent));
			_push(`</button></div><div class="flex items-center justify-between p-2 rounded-xl bg-white/[0.03]"><a href="mailto:thou.chamroeun@rupp.edu.kh" class="flex items-center gap-2 text-neutral-300 hover:text-white">`);
			_push(ssrRenderComponent(unref(Mail), { class: "w-3.5 h-3.5 text-purple-400" }, null, _parent));
			_push(`<span class="font-mono">thou.chamroeun@rupp.edu.kh</span></a><button class="text-neutral-400 hover:text-white cursor-pointer">`);
			_push(ssrRenderComponent(unref(Copy), { class: "w-3.5 h-3.5" }, null, _parent));
			_push(`</button></div></div></div></div><div class="lg:col-span-7"><div class="pro-card p-7 sm:p-10 relative overflow-hidden"><h3 class="text-2xl font-bold text-white tracking-tight mb-2"> Send a Message </h3><p class="text-xs sm:text-sm text-neutral-400 mb-6"> Fill in the form below to initiate communication. (Frontend validation active; direct email also provided). </p>`);
			if (submitted.value) {
				_push(`<div class="p-6 sm:p-8 rounded-3xl bg-emerald-500/15 border border-emerald-400/30 space-y-4 animate-in fade-in zoom-in-95 duration-300"><div class="flex items-center gap-3.5"><div class="w-12 h-12 rounded-2xl bg-emerald-500/30 flex items-center justify-center text-emerald-300 shadow-inner">`);
				_push(ssrRenderComponent(unref(CheckCircle2), { class: "w-7 h-7" }, null, _parent));
				_push(`</div><div><h4 class="text-base font-bold text-white">Validation Passed Successfully</h4><p class="text-xs text-emerald-300">Thank you, ${ssrInterpolate(formData.value.name)}!</p></div></div><p class="text-xs sm:text-sm text-neutral-300 leading-relaxed"> As specified in requirements, this portfolio uses client-side validation without claiming an active SMTP server. To ensure your message reaches Sorn Sokuntha immediately, click below to open your preferred email client: </p><div class="flex flex-wrap gap-3 pt-3"><a${ssrRenderAttr("href", `mailto:sornsokuntha21@gmail.com?subject=Internship Inquiry from ${encodeURIComponent(formData.value.name)}&body=${encodeURIComponent(formData.value.message)}`)} class="pro-btn-primary flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold text-white shadow-md cursor-pointer">`);
				_push(ssrRenderComponent(unref(Send), { class: "w-3.5 h-3.5" }, null, _parent));
				_push(`<span>Open in Mail App</span></a><button class="pro-btn-secondary px-5 py-3 rounded-2xl text-xs font-semibold text-neutral-300 hover:text-white cursor-pointer"> Submit Another </button></div></div>`);
			} else {
				_push(`<form class="space-y-5"><div><label class="block text-xs font-bold text-neutral-300 mb-2"> Your Name </label><div class="relative"><input${ssrRenderAttr("value", formData.value.name)} type="text" placeholder="e.g. Recruit Manager / Engineering Lead" class="${ssrRenderClass([[errors.value.name ? "border-red-400" : ""], "w-full px-4 py-3.5 rounded-2xl pro-input text-sm text-white placeholder:text-neutral-500 focus:outline-none"])}"></div>`);
				if (errors.value.name) {
					_push(`<p class="text-[11px] text-red-400 mt-1.5 flex items-center gap-1 font-medium">`);
					_push(ssrRenderComponent(unref(AlertCircle), { class: "w-3 h-3" }, null, _parent));
					_push(`<span>${ssrInterpolate(errors.value.name)}</span></p>`);
				} else _push(`<!---->`);
				_push(`</div><div><label class="block text-xs font-bold text-neutral-300 mb-2"> Email Address </label><div class="relative"><input${ssrRenderAttr("value", formData.value.email)} type="email" placeholder="name@company.com" class="${ssrRenderClass([[errors.value.email ? "border-red-400" : ""], "w-full px-4 py-3.5 rounded-2xl pro-input text-sm text-white placeholder:text-neutral-500 focus:outline-none"])}"></div>`);
				if (errors.value.email) {
					_push(`<p class="text-[11px] text-red-400 mt-1.5 flex items-center gap-1 font-medium">`);
					_push(ssrRenderComponent(unref(AlertCircle), { class: "w-3 h-3" }, null, _parent));
					_push(`<span>${ssrInterpolate(errors.value.email)}</span></p>`);
				} else _push(`<!---->`);
				_push(`</div><div><label class="block text-xs font-bold text-neutral-300 mb-2"> Message </label><div class="relative"><textarea rows="4" placeholder="Hello Sorn, we would like to invite you for an interview regarding our Mobile App Development Internship..." class="${ssrRenderClass([[errors.value.message ? "border-red-400" : ""], "w-full px-4 py-3.5 rounded-2xl pro-input text-sm text-white placeholder:text-neutral-500 focus:outline-none resize-none"])}">${ssrInterpolate(formData.value.message)}</textarea></div>`);
				if (errors.value.message) {
					_push(`<p class="text-[11px] text-red-400 mt-1.5 flex items-center gap-1 font-medium">`);
					_push(ssrRenderComponent(unref(AlertCircle), { class: "w-3 h-3" }, null, _parent));
					_push(`<span>${ssrInterpolate(errors.value.message)}</span></p>`);
				} else _push(`<!---->`);
				_push(`</div><div class="pt-2"><button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="w-full pro-btn-primary flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold tracking-wider text-white shadow-xl cursor-pointer disabled:opacity-50">`);
				_push(ssrRenderComponent(unref(Send), { class: "w-4 h-4" }, null, _parent));
				_push(`<span>${ssrInterpolate(isSubmitting.value ? "VALIDATING..." : "SEND MESSAGE")}</span></button></div><div class="pt-2 text-center"><p class="text-[11px] text-neutral-500"> Strictly respects client-side form validation guidelines without false transmission claims. </p></div></form>`);
			}
			_push(`</div></div></div></div></section>`);
		};
	}
});
//#endregion
//#region app/components/Contact.vue
var _sfc_setup$6 = Contact_vue_vue_type_script_setup_true_lang_default.setup;
Contact_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Contact.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var Contact_default = Object.assign(Contact_vue_vue_type_script_setup_true_lang_default, { __name: "Contact" });
//#endregion
//#region app/components/Footer.vue?vue&type=script&setup=true&lang.ts
var Footer_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Footer",
	__ssrInlineRender: true,
	setup(__props) {
		const { isDarkMode} = usePortfolioState();
		const socialLinks = [
			{
				name: "Facebook",
				icon: Facebook,
				url: "https://facebook.com",
				color: "hover:text-[#1877F2]",
				borderColor: "hover:border-[#1877F2]/60",
				glowColor: "hover:shadow-[0_0_20px_rgba(24,119,242,0.4)]",
				badge: "Social"
			},
			{
				name: "LinkedIn",
				icon: Linkedin,
				url: "https://linkedin.com",
				color: "hover:text-[#0A66C2]",
				borderColor: "hover:border-[#0A66C2]/60",
				glowColor: "hover:shadow-[0_0_20px_rgba(10,102,194,0.4)]",
				badge: "Network"
			},
			{
				name: "Instagram",
				icon: Instagram,
				url: "https://instagram.com",
				color: "hover:text-[#E4405F]",
				borderColor: "hover:border-[#E4405F]/60",
				glowColor: "hover:shadow-[0_0_20px_rgba(228,64,95,0.4)]",
				badge: "Media"
			},
			{
				name: "Telegram",
				icon: Send,
				url: "https://t.me/+85599430869",
				color: "hover:text-[#229ED9]",
				borderColor: "hover:border-[#229ED9]/60",
				glowColor: "hover:shadow-[0_0_20px_rgba(34,158,217,0.4)]",
				badge: "Direct Chat"
			},
			{
				name: "YouTube",
				icon: Youtube,
				url: "https://youtube.com",
				color: "hover:text-[#FF0000]",
				borderColor: "hover:border-[#FF0000]/60",
				glowColor: "hover:shadow-[0_0_20px_rgba(255,0,0,0.4)]",
				badge: "Video"
			},
			{
				name: "Gmail",
				icon: Mail,
				url: "mailto:sornsokuntha21@gmail.com",
				color: "hover:text-[#EA4335]",
				borderColor: "hover:border-[#EA4335]/60",
				glowColor: "hover:shadow-[0_0_20px_rgba(234,67,53,0.4)]",
				badge: "Email"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<footer${ssrRenderAttrs(mergeProps({ class: ["relative z-10 border-t py-16 mt-20 backdrop-blur-2xl transition-colors duration-500", unref(isDarkMode) ? "border-white/10 bg-black/50 text-white" : "border-slate-200/90 bg-white/70 text-slate-900"] }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"><div class="rounded-3xl p-8 pro-card flex flex-col md:flex-row items-center justify-between gap-6"><div class="flex items-center gap-4"><div class="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white/50 shadow-[0_0_25px_rgba(0,242,254,0.4)] transition-transform duration-300 hover:scale-105 flex-shrink-0"><img${ssrRenderAttr("src", _virtual_public__2Fimages_2Fsokuntha_profile_default)} alt="Sorn Sokuntha" class="w-full h-full object-cover object-[50%_20%]"></div><div><h4 class="${ssrRenderClass([unref(isDarkMode) ? "text-white" : "text-slate-900", "text-lg font-black tracking-wide flex items-center gap-2.5 transition-colors duration-300"])}"><span>SORN SOKUNTHA</span><span class="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/35"> iOS 26 Liquid Glass </span></h4><p class="${ssrRenderClass([unref(isDarkMode) ? "text-neutral-400" : "text-slate-600", "text-xs mt-0.5 transition-colors duration-300"])}"> Computer Science Graduate (RUPP) • Mobile App Developer </p></div></div><div class="text-center md:text-right space-y-1"><p class="${ssrRenderClass([unref(isDarkMode) ? "text-neutral-300" : "text-slate-700", "text-xs flex items-center justify-center md:justify-end gap-1.5 font-medium transition-colors duration-300"])}"><span>Royal University of Phnom Penh (RUPP)</span><span class="text-cyan-400">●</span><span>2022 – 2026 Graduated</span></p><p class="${ssrRenderClass([unref(isDarkMode) ? "text-neutral-400" : "text-slate-500", "text-[11px] font-mono transition-colors duration-300"])}"> Phnom Penh, Cambodia • +855 99 43 08 69 </p></div><button class="${ssrRenderClass([unref(isDarkMode) ? "text-neutral-200 hover:text-white" : "text-slate-700 hover:text-slate-950", "p-3.5 rounded-2xl pro-btn-secondary cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 shadow-lg group"])}" title="Back to Top" aria-label="Back to top">`);
			_push(ssrRenderComponent(unref(ArrowUp), { class: "w-5 h-5 group-hover:-translate-y-0.5 transition-transform" }, null, _parent));
			_push(`</button></div><div class="space-y-4"><div class="flex items-center justify-between"><div class="section-tag text-cyan-400 flex items-center gap-2"><span>CHANNELS //</span><span>CONNECT ACROSS PLATFORMS</span></div><span class="${ssrRenderClass([unref(isDarkMode) ? "text-neutral-400" : "text-slate-500", "text-[11px] font-mono hidden sm:inline-block transition-colors duration-300"])}">6 Channels Available</span></div><div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5"><!--[-->`);
			ssrRenderList(socialLinks, (social) => {
				_push(`<a${ssrRenderAttr("href", social.url)} target="_blank" rel="noopener noreferrer" class="${ssrRenderClass([[
					social.borderColor,
					social.glowColor,
					unref(isDarkMode) ? "border-white/10" : "border-slate-200/90"
				], "group pro-stat-box p-3.5 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer glass-shine-wrapper border"])}"><div class="${ssrRenderClass([[social.color, unref(isDarkMode) ? "bg-white/[0.05] border-white/10" : "bg-slate-100 border-slate-200"], "w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 group-hover:scale-110"])}">`);
				ssrRenderVNode(_push, createVNode(resolveDynamicComponent(social.icon), { class: "w-5 h-5 transition-colors" }, null), _parent);
				_push(`</div><div class="text-center"><span class="${ssrRenderClass([[social.color, unref(isDarkMode) ? "text-white" : "text-slate-900"], "text-xs font-bold tracking-wide block transition-colors duration-300"])}">${ssrInterpolate(social.name)}</span><span class="${ssrRenderClass([unref(isDarkMode) ? "text-neutral-400" : "text-slate-500", "text-[9px] font-mono uppercase tracking-wider transition-colors duration-300"])}">${ssrInterpolate(social.badge)}</span></div></a>`);
			});
			_push(`<!--]--></div></div><div class="${ssrRenderClass([unref(isDarkMode) ? "border-white/10 text-neutral-500" : "border-slate-200 text-slate-500", "pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs transition-colors duration-300"])}"><p>© 2026 Sorn Sokuntha. Computer Science Graduate &amp; Mobile App Developer.</p><p class="${ssrRenderClass([unref(isDarkMode) ? "text-neutral-400" : "text-slate-500", "font-mono text-[11px]"])}"> Built with Nuxt 4 + Vue 3 + Tailwind CSS </p></div></div></footer>`);
		};
	}
});
//#endregion
//#region app/components/Footer.vue
var _sfc_setup$5 = Footer_vue_vue_type_script_setup_true_lang_default.setup;
Footer_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var Footer_default = Object.assign(Footer_vue_vue_type_script_setup_true_lang_default, { __name: "Footer" });
//#endregion
//#region app/components/CvModal.vue?vue&type=script&setup=true&lang.ts
var CvModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CvModal",
	__ssrInlineRender: true,
	setup(__props) {
		const { isCvModalOpen} = usePortfolioState();
		return (_ctx, _push, _parent, _attrs) => {
			if (unref(isCvModalOpen)) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" }, _attrs))}><div class="absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"></div><div class="relative w-full max-w-3xl rounded-[32px] ios-glass-nav border border-white/25 shadow-[0_25px_70px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.4)] overflow-hidden z-10 animate-in zoom-in-95 duration-300 max-h-[92vh] flex flex-col"><div class="px-6 py-4 border-b border-white/10 flex items-center justify-between print:hidden"><div class="flex items-center gap-3"><div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center border border-white/20">`);
				_push(ssrRenderComponent(unref(FileText), { class: "w-5 h-5 text-white" }, null, _parent));
				_push(`</div><div><h3 class="text-base font-bold text-white tracking-tight">Curriculum Vitae</h3><p class="text-xs text-cyan-300">Sorn Sokuntha • Candidate Profile</p></div></div><div class="flex items-center gap-2"><button class="ios-btn-secondary p-2 rounded-xl text-neutral-300 hover:text-white" title="Copy CV Text">`);
				_push(ssrRenderComponent(unref(Copy), { class: "w-4 h-4" }, null, _parent));
				_push(`</button><button class="ios-btn-primary flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-md">`);
				_push(ssrRenderComponent(unref(Printer), { class: "w-3.5 h-3.5" }, null, _parent));
				_push(`<span>Print / PDF</span></button><button class="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors ml-1" aria-label="Close CV">`);
				_push(ssrRenderComponent(unref(X), { class: "w-5 h-5" }, null, _parent));
				_push(`</button></div></div><div class="p-6 sm:p-10 overflow-y-auto space-y-6 text-neutral-200 print:text-black print:bg-white bg-slate-950/70"><div class="border-b border-white/15 pb-6 space-y-2"><h1 class="text-2xl sm:text-3xl font-extrabold text-white print:text-black tracking-tight"> SORN SOKUNTHA </h1><p class="text-sm font-semibold text-cyan-400 print:text-blue-700"> Computer Science Graduate | Mobile App Developer </p><div class="pt-2 flex flex-wrap gap-4 text-xs text-neutral-300 print:text-gray-700"><span class="flex items-center gap-1.5">`);
				_push(ssrRenderComponent(unref(Phone), { class: "w-3.5 h-3.5 text-cyan-400" }, null, _parent));
				_push(`<span>+855 99 43 08 69</span></span><span class="flex items-center gap-1.5">`);
				_push(ssrRenderComponent(unref(Mail), { class: "w-3.5 h-3.5 text-purple-400" }, null, _parent));
				_push(`<span>sornsokuntha21@gmail.com</span></span><span class="flex items-center gap-1.5">`);
				_push(ssrRenderComponent(unref(MapPin), { class: "w-3.5 h-3.5 text-emerald-400" }, null, _parent));
				_push(`<span>Sangkat Touk Thla, Khan Sen Sok, Phnom Penh</span></span></div></div><div class="space-y-1.5"><h2 class="text-xs font-bold uppercase tracking-wider text-cyan-400 print:text-blue-800"> Professional Objective </h2><p class="text-xs sm:text-sm text-neutral-300 print:text-gray-800 leading-relaxed"> A passionate and motivated Computer Science graduate with a strong interest in Mobile Application Development. Experienced in developing mobile and web applications and eager to gain real-world experience through a Mobile App Development Internship. </p></div><div class="space-y-3"><h2 class="text-xs font-bold uppercase tracking-wider text-cyan-400 print:text-blue-800"> Education </h2><div class="space-y-2"><div class="flex items-start justify-between"><div><p class="text-xs sm:text-sm font-bold text-white print:text-black"> Bachelor of Computer Science </p><p class="text-xs text-neutral-400 print:text-gray-600">Royal University of Phnom Penh (RUPP)</p></div><span class="text-xs font-mono text-cyan-300 print:text-blue-600 font-semibold">2022 – 2026 (Graduated)</span></div><div class="flex items-start justify-between"><div><p class="text-xs sm:text-sm font-bold text-white print:text-black"> High School Diploma </p><p class="text-xs text-neutral-400 print:text-gray-600">Toul Kbel High School</p></div><span class="text-xs font-mono text-cyan-300 print:text-blue-600 font-semibold">2020 – 2022</span></div></div></div><div class="space-y-2"><h2 class="text-xs font-bold uppercase tracking-wider text-cyan-400 print:text-blue-800"> Technical &amp; Professional Skills </h2><div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300 print:text-gray-800"><p><strong class="text-white print:text-black">Mobile:</strong> Android, Cross-platform Mobile Development</p><p><strong class="text-white print:text-black">Programming:</strong> C / C++, C#, Java, OOP</p><p><strong class="text-white print:text-black">Web:</strong> HTML, CSS, JavaScript, React JS, PHP, Laravel</p><p><strong class="text-white print:text-black">Tools:</strong> Git, Microsoft Office</p><p class="sm:col-span-2"><strong class="text-white print:text-black">Soft Skills:</strong> Public Relations, Teamwork, Time Management, Effective Communication, Critical Thinking</p></div></div><div class="space-y-3"><h2 class="text-xs font-bold uppercase tracking-wider text-cyan-400 print:text-blue-800"> Academic &amp; Practical Projects </h2><div class="space-y-3"><div class="p-3 rounded-xl bg-white/[0.03] border border-white/10 print:border-gray-300"><p class="text-xs sm:text-sm font-bold text-white print:text-black">Hotel Booking System</p><p class="text-[11px] text-cyan-300 print:text-blue-600">Technologies: PHP, Laravel, OOP</p><p class="text-xs text-neutral-300 print:text-gray-700 mt-1"> Room booking, real-time availability checking, user management, and efficient data handling. </p></div><div class="p-3 rounded-xl bg-white/[0.03] border border-white/10 print:border-gray-300"><p class="text-xs sm:text-sm font-bold text-white print:text-black">Skincare Mobile Application</p><p class="text-[11px] text-cyan-300 print:text-blue-600">Technologies: Android, Cross-platform, Java, OOP</p><p class="text-xs text-neutral-300 print:text-gray-700 mt-1"> Skincare recommendations, user-friendly UI, interactive user input, and data processing. </p></div><div class="p-3 rounded-xl bg-white/[0.03] border border-white/10 print:border-gray-300"><p class="text-xs sm:text-sm font-bold text-white print:text-black">IDP Website Development</p><p class="text-[11px] text-cyan-300 print:text-blue-600">Technologies: HTML, CSS, JavaScript</p><p class="text-xs text-neutral-300 print:text-gray-700 mt-1"> Responsive design with multi-device compatibility across mobile, tablet, and desktop viewports. </p></div></div></div><div class="space-y-1.5 border-t border-white/15 pt-4"><h2 class="text-xs font-bold uppercase tracking-wider text-cyan-400 print:text-blue-800"> Professional Reference </h2><p class="text-xs sm:text-sm font-bold text-white print:text-black">Mr. Thou Chamroeun</p><p class="text-xs text-neutral-300 print:text-gray-700">Lecturer (Web Front-End &amp; Back-End), Royal University of Phnom Penh</p><p class="text-xs text-neutral-400 print:text-gray-600"> Phone: +855 12 52 22 27 | Email: thou.chamroeun@rupp.edu.kh </p></div></div></div></div>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region app/components/CvModal.vue
var _sfc_setup$4 = CvModal_vue_vue_type_script_setup_true_lang_default.setup;
CvModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CvModal.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var CvModal_default = Object.assign(CvModal_vue_vue_type_script_setup_true_lang_default, { __name: "CvModal" });
//#endregion
//#region app/components/ProjectModal.vue?vue&type=script&setup=true&lang.ts
var ProjectModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ProjectModal",
	__ssrInlineRender: true,
	setup(__props) {
		const { activeProject} = usePortfolioState();
		return (_ctx, _push, _parent, _attrs) => {
			if (unref(activeProject)) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" }, _attrs))}><div class="absolute inset-0 bg-black/75 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"></div><div class="relative w-full max-w-2xl rounded-[32px] ios-glass-nav border border-white/25 shadow-[0_25px_70px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.4)] overflow-hidden z-10 animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col"><div class="px-6 py-4 border-b border-white/10 flex items-center justify-between"><div class="flex items-center gap-3"><div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center border border-white/20">`);
				_push(ssrRenderComponent(unref(Smartphone), { class: "w-5 h-5 text-white" }, null, _parent));
				_push(`</div><div><h3 class="text-base font-bold text-white tracking-tight">${ssrInterpolate(unref(activeProject).title)}</h3><p class="text-xs text-cyan-300 font-medium">${ssrInterpolate(unref(activeProject).subtitle)}</p></div></div><button class="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors" aria-label="Close project modal">`);
				_push(ssrRenderComponent(unref(X), { class: "w-5 h-5" }, null, _parent));
				_push(`</button></div><div class="p-6 sm:p-8 overflow-y-auto space-y-6"><div><h4 class="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Project Overview</h4><p class="text-sm sm:text-base text-neutral-200 light:text-slate-700 leading-relaxed">${ssrInterpolate(unref(activeProject).description)}</p></div><div><h4 class="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Key Features &amp; Modules</h4><div class="grid grid-cols-1 sm:grid-cols-2 gap-3"><!--[-->`);
				ssrRenderList(unref(activeProject).features, (feat) => {
					_push(`<div class="flex items-start gap-2.5 p-3 rounded-2xl bg-white/[0.04] border border-white/10">`);
					_push(ssrRenderComponent(unref(CheckCircle2), { class: "w-4 h-4 text-cyan-400 shrink-0 mt-0.5" }, null, _parent));
					_push(`<span class="text-xs font-medium text-neutral-200">${ssrInterpolate(feat)}</span></div>`);
				});
				_push(`<!--]--></div></div><div><h4 class="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2.5">Technologies Used</h4><div class="flex flex-wrap gap-2"><!--[-->`);
				ssrRenderList(unref(activeProject).technologies, (tech) => {
					_push(`<span class="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-cyan-300 border border-blue-400/30">${ssrInterpolate(tech)}</span>`);
				});
				_push(`<!--]--></div></div><div class="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 text-xs text-neutral-300">`);
				_push(ssrRenderComponent(unref(ShieldCheck), { class: "w-5 h-5 text-emerald-400 shrink-0" }, null, _parent));
				_push(`<span>Developed as part of software engineering coursework and practical system development.</span></div></div><div class="px-6 py-4 border-t border-white/10 bg-black/40 flex items-center justify-between flex-wrap gap-3"><button class="ios-btn-secondary flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-neutral-200 hover:text-white">`);
				_push(ssrRenderComponent(unref(Github), { class: "w-4 h-4" }, null, _parent));
				_push(`<span>GitHub (University Project)</span></button><button class="ios-btn-primary px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg"> Close Preview </button></div></div></div>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region app/components/ProjectModal.vue
var _sfc_setup$3 = ProjectModal_vue_vue_type_script_setup_true_lang_default.setup;
ProjectModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProjectModal.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var ProjectModal_default = Object.assign(ProjectModal_vue_vue_type_script_setup_true_lang_default, { __name: "ProjectModal" });
//#endregion
//#region app/app.vue?vue&type=script&setup=true&lang.ts
var app_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "app",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_BackgroundOrbs = BackgroundOrbs_default;
			const _component_DynamicIslandNotification = DynamicIslandNotification_default;
			const _component_Navbar = Navbar_default;
			const _component_Hero = Hero_default;
			const _component_TechMarquee = TechMarquee_default;
			const _component_About = About_default;
			const _component_Skills = Skills_default;
			const _component_Projects = Projects_default;
			const _component_Education = Education_default;
			const _component_InternshipCta = InternshipCta_default;
			const _component_Contact = Contact_default;
			const _component_Footer = Footer_default;
			const _component_CvModal = CvModal_default;
			const _component_ProjectModal = ProjectModal_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "relative min-h-screen selection:bg-cyan-400/30 selection:text-cyan-200 bg-[#030612] text-white" }, _attrs))}>`);
			_push(ssrRenderComponent(_component_BackgroundOrbs, null, null, _parent));
			_push(ssrRenderComponent(_component_DynamicIslandNotification, null, null, _parent));
			_push(ssrRenderComponent(_component_Navbar, null, null, _parent));
			_push(`<main class="relative z-10 space-y-12">`);
			_push(ssrRenderComponent(_component_Hero, null, null, _parent));
			_push(ssrRenderComponent(_component_TechMarquee, null, null, _parent));
			_push(ssrRenderComponent(_component_About, null, null, _parent));
			_push(ssrRenderComponent(_component_Skills, null, null, _parent));
			_push(ssrRenderComponent(_component_Projects, null, null, _parent));
			_push(ssrRenderComponent(_component_Education, null, null, _parent));
			_push(ssrRenderComponent(_component_InternshipCta, null, null, _parent));
			_push(ssrRenderComponent(_component_Contact, null, null, _parent));
			_push(`</main>`);
			_push(ssrRenderComponent(_component_Footer, null, null, _parent));
			_push(ssrRenderComponent(_component_CvModal, null, null, _parent));
			_push(ssrRenderComponent(_component_ProjectModal, null, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/app.vue
var _sfc_setup$2 = app_vue_vue_type_script_setup_true_lang_default.setup;
app_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var app_default = app_vue_vue_type_script_setup_true_lang_default;
//#endregion
//#region node_modules/nuxt/dist/app/components/nuxt-error-page.vue
var _sfc_main$1 = {
	__name: "nuxt-error-page",
	__ssrInlineRender: true,
	props: { error: Object },
	setup(__props) {
		const _error = __props.error;
		const status = Number(_error.statusCode || 500);
		const is404 = status === 404;
		const statusText = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
		const description = _error.message || _error.toString();
		const stack = void 0;
		const _Error404 = defineAsyncComponent(() => import('../build/error-404-DjOKR65M.mjs'));
		const _Error = defineAsyncComponent(() => import('../build/error-500-BwFlv8H2.mjs'));
		const ErrorTemplate = is404 ? _Error404 : _Error;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({
				status: unref(status),
				statusText: unref(statusText),
				statusCode: unref(status),
				statusMessage: unref(statusText),
				description: unref(description),
				stack: unref(stack)
			}, _attrs), null, _parent));
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fisland-renderer.mjs
var IslandRenderer = () => null;
//#endregion
//#region node_modules/nuxt/dist/app/components/nuxt-root.vue
var _sfc_main = {
	__name: "nuxt-root",
	__ssrInlineRender: true,
	setup(__props) {
		const nuxtApp = useNuxtApp();
		nuxtApp.deferHydration();
		nuxtApp.ssrContext.url;
		const SingleRenderer = false;
		provide(PageRouteSymbol, useRoute());
		nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup", []);
		const error = /* @__PURE__ */ useError();
		const abortRender = error.value && !nuxtApp.ssrContext.error;
		function invokeAppErrorHandler(err, target, info) {
			const errorHandler = nuxtApp.vueApp.config.errorHandler;
			if (errorHandler && !errorHandler.__nuxt_default) try {
				errorHandler(err, target, info);
			} catch (handlerError) {
				console.error("[nuxt] Error in `app.config.errorHandler`", handlerError);
			}
		}
		onErrorCaptured((err, target, info) => {
			nuxtApp.hooks.callHook("vue:error", err, target, info)?.catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
			{
				const p = nuxtApp.runWithContext(() => showError(err));
				onServerPrefetch(() => p);
				invokeAppErrorHandler(err, target, info);
				return false;
			}
		});
		const islandContext = nuxtApp.ssrContext.islandContext;
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderSuspense(_push, {
				default: () => {
					if (unref(abortRender)) _push(`<div></div>`);
					else if (unref(error)) _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
					else if (unref(islandContext)) _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
					else if (unref(SingleRenderer)) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
					else _push(ssrRenderComponent(unref(app_default), null, null, _parent));
				},
				_: 1
			});
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-root.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
//#region node_modules/nuxt/dist/app/entry.js
var entry$1 = async function createNuxtAppServer(ssrContext) {
	const vueApp = createApp(_sfc_main);
	const nuxt = createNuxtApp({
		vueApp,
		ssrContext
	});
	try {
		await applyPlugins(nuxt, virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fplugins_server_default);
		await nuxt.hooks.callHook("app:created", vueApp);
	} catch (error) {
		await nuxt.hooks.callHook("app:error", error);
		nuxt.payload.error ||= createError$1(error);
	}
	if (ssrContext && (ssrContext["~renderResponse"] || ssrContext._renderResponse)) throw new Error("skipping render");
	return vueApp;
};
var entry_default = ((ssrContext) => entry$1(ssrContext));

const entry = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: entry_default
}, Symbol.toStringTag, { value: 'Module' }));

export { _plugin_vue_export_helper_default as _, useRouter as a, useRuntimeConfig as b, useNuxtApp as c, nuxtLinkDefaults as d, encodeRoutePath as e, entry as f, navigateTo as n, resolveRouteObject as r, useHead$1 as u };
//# sourceMappingURL=entry.mjs.map
