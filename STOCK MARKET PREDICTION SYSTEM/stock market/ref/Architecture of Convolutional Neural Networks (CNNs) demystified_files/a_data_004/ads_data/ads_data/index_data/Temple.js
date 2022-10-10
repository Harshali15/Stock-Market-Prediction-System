var __extends=this.__extends||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];function __(){this.constructor=d;}__.prototype=b.prototype;d.prototype=new __();};
"function"!=typeof Object.assign&&!function(){Object.assign=function(n){"use strict";if(void 0===n||null===n)throw new TypeError("Cannot convert undefined or null to object");for(var t=Object(n),r=1;r<arguments.length;r++){var e=arguments[r];if(void 0!==e&&null!==e)for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])}return t}}();
window.$=window.jQuery || function(e,t,l){try{var n={"#":"getElementById",".":"getElementsByClassName","@":"getElementsByName","=":"getElementsByTagName","*":"querySelectorAll"}[e[0]],m=(t===l?document:t)[n](e.slice(1));!m.length?m[0]=m:null;return !m.length?m:(m.length<2?m[0]:[].slice.call(m))}catch(er){return document.querySelectorAll(e);}}
Element.prototype.hide=function(){this.classList.add('hide');};
Element.prototype.show=function(){this.classList.remove('hide');};
Element.prototype.addEvent=function(event, callback){this.addEventListener(event,callback.bind(temple.banner));};
Element.prototype.find=function(selector) {return $(selector, this);};
NodeList.prototype.each=Array.prototype.forEach;
Object.defineProperty(Array.prototype, "shuffle", {enumerable: false,value: function() {var i = this.length;while (i){var j = Math.floor(Math.random() * i);var t = this[--i];this[i] = this[j];this[j] = t;}return this;}});
String.prototype.timeFormat=function(){var sn=parseInt(this,10);var h=Math.floor(sn/3600);var m=Math.floor((sn-(h*3600))/60);var s=sn-(h*3600)-(m*60);if(m<10){m=m;};if(s<10){s="0"+s;};var t=(m||0)+':'+(s||"00");return t;};
String.prototype.ucfirst=function(){return this.charAt(0).toUpperCase()+this.slice(1);};
Function.prototype.delay=function(a){var b=[].slice.call(arguments,1),c=this;return setTimeout(function(){c.apply(void 0,b)},1e3*a)};

var temple = new Temple(typeof(temple) != "undefined" ? temple.config : null);
window.addEventListener('load', temple.create.bind(temple));

function Temple (config) {
	this.type 		= "Standalone";
	this.version 	= '2.1.5',
	this.color 		= '#ff0088',
	this.isMobile 	= /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
	this.isiOS 		= /iPad|iPhone|iPod/.test(navigator.userAgent),
	this.isiOS9up 	= this.isiOS && ((navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/)[1] > 9),
	this.isiPad 	= /iPad/.test(navigator.userAgent),
	this.isSafari 	= /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
	this.isBackup 	= document.body.classList.contains('phantom-backup'),
	this.core 		= {},
	this.config 	= config,
	this.platforms 	= {},
	this.templates 	= {},
	this.modules 	= {};
	
	this.isLive = function() {
		if (!this.config) return window.location.hostname != 'localhost';
		if (!this.config.localhost) return window.location.hostname != 'localhost';
		var live = window.location.hostname != 'localhost';		
		for (var i = 0; i < this.config.localhost.length; i++) {
			if (window.location.hostname == this.config.localhost[i]) {
				return false;
			}
		}
		return live;
	}();

	this.isAutoplayAvailable = function() {
		if (!this.isMobile) return true;
		if (!this.isiOS) {
			return true;
		} else if (this.isSafari) {
			if(this.isiPad)
				var os = Number(navigator.userAgent.split('iPad')[1].split(' ')[3].replace('_','.')); 
			else
				var os = navigator.userAgent.split('iPhone OS ')[1].split(' ')[0].split('_')[0];
			if(os >= 10)
				return true
			else
				return false;
		} else {
			return false;
		}
	}	

	this.utils = (function() {
		var tracker = function(t) {
			temple.utils.debug('Tracker: ' + t,'green');
		}

		var randBetween = function(min, max) {
		    return Math.floor(Math.random()*(max-min+1)+min);
		}

		var getQueryVar = function(v) { 
			var q = window.location.search.substring(1);
			var vs = q.split('&');
			for (var i=0;i<vs.length;i++) {
				var p = vs[i].split('=');
				if (p[0] == v) {
					return p[1];
				}
			}
			return false;
		}
		
		var loadScript = function(u, c, e) {
			if (typeof(u)=='string')u=[u];t=0;if(!u.length){c();return;};var loader=function(sc){
				var s=document.createElement('script');s.async=true;s.type='text/javascript',s.readyState?s.onreadystatechange=function(){('loaded'==s.readyState||'complete'==s.readyState)&&(s.onreadystatechange=null,c&&c())}:(s.onload=function(e){t++;t==u.length?c&&c(e):loader(u[t]);},s.onerror=function(){temple.utils.debug('ERROR LOADING SCRIPT "' + u + '"'),e&&e()}),s.src=sc,document.body.appendChild(s);};loader(u[0]);
		}

		var loadJSON = function(u, c, e, nt) {
			if(typeof(u)=='string') u = [u];var t=0;
			var comp = c; var obs=[];var data =[];
			c = function(o){data[o] = (nt===true?obs[o].responseText:JSON.parse(obs[o].responseText));t++;if(t==u.length){if(data.length==1)data=data[0];comp.call(temple.banner,data);}};var xobj = [];
			for (var i=0;i<u.length;i++) {
				xobj[i] = new XMLHttpRequest;
				xobj[i].i = i;
				obs.push(xobj[i]);
				xobj[i].overrideMimeType('application/json');
				xobj[i].open('GET',u[i],!0);
				xobj[i].onreadystatechange = function(e) {x=e.currentTarget;
					4==x.readyState&&'404'==x.status&&(temple.utils.debug('No json found','#ff0000'),e&&e.call(temple.banner)),4==x.readyState&&'200'==x.status&&c&&c(this.i)},xobj[i].send(null);
			}
			if(!u.length) comp.call(temple.banner);
		}
		
		var loadImage = function(u, c, e) {
			if(typeof(u)=='string')u = [u];var t=0;
			var imgs = [];
			for(var i=0;i<u.length;i++){
				var im = new Image();
				im.onload = function(e) {
					imgs.push(this);
					t++; if(t==u.length)c&&c(imgs,e);
				};
				im.onerror = e;
				im.src = u[i];
			}
		}
		
		var createStyle = function(n, r) {
			n=(n!='banner'?'#banner '+n:n);
			if(!temple.stylesheet){
				temple.stylesheet=document.createElement('style'),temple.stylesheet.type='text/css';
				var head=document.getElementsByTagName('head')[0];
				head.insertBefore(temple.stylesheet,head.firstChild)
			}
			(temple.stylesheet.sheet||{}).insertRule?temple.stylesheet.sheet.insertRule(n+'{'+r+'}',0):(temple.stylesheet.styleSheet||temple.stylesheet.sheet).addRule(n,r);
		}
		
		var debug = function(e, c, v) {
			if (console.debug && (!temple.isLive || temple.config.debug === true)) {
				console.debug(
					'%c[' + temple.type + ']%s',
					'font-weight:bold;color:' + (typeof c == 'string' ? c : temple.color) + ';',
					' ' + (v || temple.version),
					':',
					e || '',
					typeof c != 'string' && typeof c != 'undefined' ? c : ''
				);	
			}
		}

		var fitText = function(t) {
			TweenMax.set(t,{clearProps:"fontSize, lineHeight"});
			var p = t.parentElement;
			var s = Number(window.getComputedStyle(p,null).getPropertyValue('font-size').replace('px',''));
			
			targetWidth = Number(window.getComputedStyle(t,null).getPropertyValue('width').replace('px',''));
			parentWidth = Number(window.getComputedStyle(p,null).getPropertyValue('width').replace('px',''));
			targetHeight = Number(window.getComputedStyle(t,null).getPropertyValue('height').replace('px',''));
			parentHeight = Number(window.getComputedStyle(p,null).getPropertyValue('height').replace('px',''));
			
			// console.log('target width = ' + targetWidth)
			// console.log('parent width = ' + parentWidth)
			// console.log('target height = ' + targetHeight)
			// console.log('parent height = ' + parentHeight)

			if (targetHeight > parentHeight || targetWidth > parentWidth) {
				while ( Number(window.getComputedStyle(t,null).getPropertyValue('height').replace('px','')) > parentHeight || Number(window.getComputedStyle(t,null).getPropertyValue('width').replace('px','')) > parentWidth ) {
					s -= .2;
					t.style.fontSize = s + 'px';
					t.style.lineHeight = s + 1 + 'px';
				}
			}
		}

		var validURL = function(str) {
			var pattern = new RegExp('^(https?:\\/\\/)?'+
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+
			'((\\d{1,3}\\.){3}\\d{1,3}))'+
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
			'(\\?[;&a-z\\d%_.~+=-]*)?'+
			'(\\#[-a-z\\d_]*)?$','i');
			return pattern.test(str);
		}

		var findElements = function (e, styles) {
			if (styles){
				var obj = {}
				obj.all = [];
				findElement(e, styles);
			} else {
				var obj = [];
				findElement(e);
			}
			
			function findElement(e, styles) {
				if (e && e.childNodes && e.childNodes.length > 0 ) {
					for ( var i = 0; i < e.childNodes.length; i++ ) {
						var child = e.childNodes[i];
						if (child.type == "image/svg+xml" || [ "DIV", "SPAN", "IMG", "CANVAS", "SVG", "CIRCLE", "PATH", "NETFLIX" ].indexOf(child.nodeName.split("-")[0].toUpperCase()) != -1) {
							if (child.id || child.className) {
								if (styles) {
									styles = (typeof(styles) == "string") ? [styles] : styles;

									for (var j = 0; j < styles.length; j++) {
										if (!obj[styles[j]]) {
											obj[styles[j]] = [];
										}

										if (child.id && obj[styles[j]].indexOf(child) == -1) {
											var val = getStyleRuleValue("." + styles[j], "#" + child.id);
											if (val) {
												obj[styles[j]].push(child);
											}
										} 

										var c = (typeof(child.className) == "object") ? String(child.className.baseVal).split(" ") : String(child.className).split(" ");

										for (var k = 0; k < c.length; k++) {
											if (c[k] && obj[styles[j]].indexOf(child) == -1) {
												var val = getStyleRuleValue("." + styles[j], "." + c[k]);
												if (val) {
													obj[styles[j]].push(child);
												}
											}
										}
									}
									obj.all.push(child);
									findElement(child, styles);
								} else {
									obj.push(child);
									findElement(child);
								}
							}
						}
					}
				}
			}

			function getStyleRuleValue (style, selector, sheet) {
				var sheets = typeof sheet !== 'undefined' ? [sheet] : document.styleSheets;
				var ar = []
				for (var i = 0, l = sheets.length; i < l; i++) {
					var sheet = sheets[i];
					if ( !sheet.cssRules ) continue;
					for (var j = 0, k = sheet.cssRules.length; j < k; j++) {
						var rule = sheet.cssRules[j];
						if (rule.selectorText) {
							if (rule.selectorText.indexOf(selector) != -1 && rule.selectorText.indexOf(style) != -1) {
								var all = rule.selectorText.substring(0, rule.selectorText.indexOf(style)).split(".");
								var node = all[all.length-1];
								return node;
							} 
						}
					}
				}
				return;
			}
			return obj;
		}
		
		return {
			randBetween:	function(v,e){ return randBetween(v,e); },
			tracker: 		function(v,e){ return tracker(v,e); },
			getQueryVar: 	function(v){ return getQueryVar(v); },
			loadScript: 	function(u,c,e){ loadScript(u,c,e); },
			loadJSON: 		function(u,c,e,nt){ loadJSON(u,c,e,nt); },
			loadImage: 		function(u,c,e){ loadImage(u,c,e); },
			debug: 			function(e,c,v){ debug(e,c,v); },
			createStyle: 	function(n,r){ createStyle(n,r); },
			fitText: 		function(t){ fitText(t); },
			findElements: 	function(e, styles){ return findElements(e, styles); },
			validURL: 		function(u){ return validURL(u); }
		}
	})();

	this.create = function() {
		if (this.isCreated) return;
		this.isCreated = true;
		if (temple.templates.MonetBanner) {
            var m = document.createElement("monet-integrator");
            var f = document.createElement("netflix-fonts");
            m.setAttribute("dynamic-feed-sheet-name", temple.config.monet.manifest.creativeName);
			
            document.body.appendChild(m);
            document.body.appendChild(f);
        }
		var config = document.body.getAttribute('data-config') || 'config.json';
		config = config.replace('.json', '');
		
		temple.utils.loadJSON(temple.config?[]:config, function(json) {
			this.config = json || temple.config;
			
			
			
			var scripts = [];

			if(!("classList"in document.createElement("_")))
			scripts.push("https://cdnjs.cloudflare.com/ajax/libs/classlist/1.2.201711092/classList.min.js");
			
			

			var m = this.config.modules || [];
			
			
			if (m.length) { scripts.push(this.config.modules[0]); }			
			

			

			temple.utils.loadScript(scripts, function(e) {
				if (temple.Banner) temple.banner = new temple.Banner();
			}.bind(this));
		}.bind(this));
	}

	this.events = {
		READY: 			'ready',
		SHOW: 			'show',
		CORE_READY: 	'core_ready',
		MODULE_READY: 	'module_ready',
		EXIT: 			'exit'
	}	
}

temple.core.EventDispatcher = ( function() {	

	function EventDispatcher() {}

	EventDispatcher.prototype.dispatchEvent = function(event, args) {
		if (!arguments[1]) arguments[1] = this;

		this._events = this._events||[];

		if ( this._events[event] ) {
			var listeners = this._events[event], len = listeners.length;
			while ( len-- ) {
				temple.utils.debug('Event <' + event + '> ' + (arguments[1].target ? arguments[1].target.constructor.name:arguments[1].constructor.name), 'black');
				if (!args) args = {};
				if (!args.target) args.target = this;
				if (!listeners[len]._one) {
					var f = listeners.splice(len, 1);
					f[0](args);
				} else {
					listeners[len](args);					
				}
			}	
			return true;	
		}
		return false;	
	}

	EventDispatcher.prototype.addEventListener = function(event, callback, _one) {
		callback._one = _one != undefined ? _one : true;
		this._events=this._events || [];
		this._events[event] = this._events[event] || [];
		if ( this._events[event] ) {
			this._events[event].push(callback);
		}
	}

	EventDispatcher.prototype.removeEventListener = function(event) {
		if ( this._events[event] ) {
			delete this._events[event];
		}
	}	
	return EventDispatcher;
})();

temple.core.Module = ( function(_super) {
	__extends(Module, _super);
	function Module() {}
	Module.prototype._moduleReady = function() {
		temple.utils.debug('Module << ' + this.constructor.name + ' >>', this.color || 'Tomato');
		this.dispatchEvent(temple.events.MODULE_READY);			
	}
	
	Module.prototype.done = function() {
		setTimeout(this._moduleReady.bind(this), 50);
	}
	return Module;
})( temple.core.EventDispatcher );

temple.core.Core = ( function(_super) {
	__extends(Core, _super);

	function Core() { }

	Core.prototype.exit = function(url) {
		window.open(url||this.defaultExitURL, '_blank');
		this.dispatchEvent(temple.events.EXIT);
	}

	Core.prototype.chain = function(e) {
		try {e.prototype;} catch(err) {
			console.error("Module not loaded. Please add it to your config.");
			console.error("Available modules > ", temple.modules);
			return
		}
		
		if (!this._chained) {
			this._chained = [];
			this._chained.push({m:e, a:arguments[1], c:arguments[2]});
			setTimeout(_runChain.bind(this), 1);
		} else {
			this._chained.push({m:e, a:arguments[1], c:arguments[2]});
		}
		return this;
	}

	Core.prototype.async = function() {
		arguments.callee.caller.async = true;
		return function(){_chainLoaded.call(this);}.bind(this);
	}

	// protected
	
	Core.prototype._politeLoads = function(c) {		
		var loads 	= document.querySelectorAll('[multilingual], [polite]'),
			svgs 	= document.querySelectorAll('[svg]'),
			comps 	= document.querySelectorAll('component'),
			t 		= 0,
			t2 		= 0,
			_s 		= [];

		function onload(e,img) {
			if (loads[t].nodeName == 'DIV') {
				loads[t].style.backgroundImage = "url('" + loads[t].ml + loads[t].getAttribute('data-src') + "')";
				loads[t].style.width = img.width + "px";
				loads[t].style.height = img.height + "px";				
			}
			t++;
			if (t + t2 == loads.length + svgs.length) if (c) setTimeout(c.call(this),10);
		}

		for (var i = 0; i < loads.length; i++) {
			loads[i].ml = loads[i].hasAttribute('multilingual') || '';
			if (loads[i].ml === true) loads[i].ml = 'img/' + this.config.language + '/';
			if (loads[i].nodeName == 'DIV') {
				temple.utils.loadImage(loads[i].ml + loads[i].getAttribute('data-src'), onload.bind(this));
			} else {
				loads[i].onload = onload.bind(this,loads[i]);
				loads[i].src = loads[i].ml + loads[i].getAttribute('data-src');
			}
		}

		for (i = 0; i < svgs.length; i++) {
			_s[i] = {xhr:new XMLHttpRequest(), el:svgs[i]};
			_s[i].xhr.id = i;
			_s[i].xhr.onload = function(e) {
				var r = e.currentTarget.responseXML.documentElement;
				r.setAttribute('class', _s[e.currentTarget.id].el.getAttribute('class'));
				var id = _s[e.currentTarget.id].el.getAttribute('id');
				r.setAttribute('id', id);
				_s[e.currentTarget.id].el.parentNode.replaceChild(r, _s[e.currentTarget.id].el);
				window[id] = r;
				t2++;
				if (t + t2 == loads.length + svgs.length) if (c) setTimeout(c.call(this),10);
			}.bind(this);
			_s[i].xhr.open('GET', svgs[i].getAttribute('data-src'), !0);
			_s[i].xhr.overrideMimeType("image/svg+xml");
			_s[i].xhr.send("");
		}
		
		for (i = 0; i < comps.length; i++) {
			var comp = document.createElement(comps[i].getAttribute("type"));
			var atts = comps[i].attributes;
			for (var u = 0; u < atts.length; u++) {
				comp.setAttribute(atts[u].nodeName, atts[u].nodeValue);
			}
			comps[i].parentNode.replaceChild(comp, comps[i]);
		}
		
		if (!loads.length && !svgs.length) if (c) setTimeout(c.call(this),10);
	}
	
	Core.prototype._initCore = function() {
		this.config = temple.config;
		temple.utils.debug(temple.type + ' Platform');
		this._pageReady();
	}
	
	Core.prototype._pageReady = function() {
		this._bannerInit();
	}
	
	Core.prototype._bannerInit = function() {
		temple.utils.createStyle('#banner', 'position:relative;overflow:hidden;background-color:#000;color:#fff;width:'
	    	+ (temple.config.size.width ? temple.config.size.width + 'px;height:' : 'auto;height:')
	    	+ (temple.config.size.height ? temple.config.size.height + 'px;' : 'auto;'));
	    temple.utils.createStyle('.bannerClick', 'position:absolute;top:0;left:0;width:100%;height:100%;cursor:pointer;background:url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7);');

		this.dispatchEvent(temple.events.CORE_READY);
	}	

	// private

	function _chainLoaded(e) {
		if (this._chained[0].c) this._chained[0].c.call(this);
		this._chained.splice(0, 1);
		_runChain.call(this);
	}
	
	function _runChain(e) {
		if (!this._chained[0]) return;

		if (this._chained[0].m.prototype.__proto__.constructor != temple.core.Module) {
			this._chained[0].m.call(this,this._chained[0].a);
			if (!this._chained[0].m.async) _chainLoaded.call(this);			
			return;
		}

		var name = this._chained[0].m.name || this._chained[0].m.toString().match(/^function\s*([^\s(]+)/)[1];
		var moduleName = name.charAt(0).toLowerCase() + name.slice(1);
		var listName = moduleName;
		this[listName+'List'] = this[listName+'List'] || [];
		if (this[moduleName]) {
			var t = 2;
			var tempName = moduleName;
			tempName = moduleName + t;
			while (this[tempName]) {
				t++;
				tempName = moduleName + t;
			}
			moduleName = tempName;
		}
		this[moduleName] = new this._chained[0].m(this._chained[0].a||this,this,t||0);
		this[moduleName].addEventListener(temple.events.MODULE_READY, _chainLoaded.bind(this));
		this[listName+'List'].push(this[moduleName]);
	}
	return Core;
})( temple.core.EventDispatcher );



//// DOCS


/**
* The holy Temple, home of all that is Rich Media.
* Temple is Life. Life is Temple. Banners is Life. Be Banners.
*
* @class Temple
* @module Temple
*/

/**
* Temple version.
* @property version
* @type {String}
* @default "v2.0"
*/

/**
* Platform type.
* @property type
* @type {String}
* @default "core"
*/

/**
* Check if your creative is running on a mobile.
* @property isMobile
* @type {Boolean}
* @default false
*/

/**
* Check if your creative is running on iOS.
* @property isiOS
* @type {Boolean}
* @default false
*/

/**
* Check if your creative is running on iOS version 9 or higher.
* @property isiOS9up
* @type {Boolean}
* @default false
*/

/**
* Check if your creative is running on an iPad.
* @property isiPad
* @type {Boolean}
* @default false
*/

/**
* Check if your creative is running in the Safari browser.
* @property isSafari
* @type {Boolean}
* @default false
*/

/**
* Check if your creative is running on a live server.
* @property isLive
* @type {Boolean}
* @default false
*/

/**
* Check if your creative is running a browser and device that supports autoplay video.
* @property isAutoplayAvailable
* @type {Boolean}
* @default true
*/

/**
* Your creative's config object.
* @property config
* @type {Object}
* @default 
*    {
*        "size": {
*            "width": 300,
*            "height": 250
*        },
*        "modules": [],
*        "platform": "",
*        "variation": "",
*        "language": ""
*    }
*/

/**
 * Get query variables from url path.
 *
 * @method temple.utils.getQueryVar
 * @param {String} item Variable in url to get.
 * @return {String} 
 */

/**
 * Load a JSON file.
 *
 * @method temple.utils.loadJSON
 * @param {String || Array} url JSON file url. A string array of url's also possible.
 * @param {Function} [callback] Callback function when file loaded.
 * @param {Function} [error] Error function when file not loaded.
 * @param {Boolean} [jsonString] Set to true to return an unparsed JSON string.
 */

/**
 * Load a JavaScript file.
 *
 * @method temple.utils.loadScript
 * @param {String || Array} url Script file url. A string array of url's also possible.
 * @param {Function} [callback] Callback function when file loaded.
 * @param {Function} [error] Error function when file not loaded.
 */

/**
 * Preload an image.
 *
 * @method temple.utils.loadImage
 * @param {String || Array} url Image file url. A string array of url's also possible.
 * @param {Function} [callback] Callback function when file loaded.
 * @param {Function} [error] Error function when file not loaded.
 */

/**
 * Output a debug string in the browser console.
 *
 * @method temple.utils.debug
 * @param {String || Object} debug The string or object you would like to output.
 * @param {String} color Color of the string your debugging.
 */

/**
 * Programmatically create a css style rule.
 *
 * @method temple.utils.createStyle
 * @param {String} selector Class, ID or element selector.
 * @param {String} rule CSS rules.
 */

/**
 * Fit text within an element by decreasing font size.
 *
 * @method temple.utils.fitText
 * @param {HTMLElement} textElement Text element
 */

/**
 * Find HTMLElements in the whole document.
 *
 * @method temple.utils.findElements
 * @param {HTMLElement} element Element to find.
 * @return {Array} Array with all elements found.
 */

/**
 * Track creative counters.
 *
 * @method temple.utils.tracker
 * @param {String} title Tracker title.
 * @param {Boolean} [...args] Optional additional platform specific arguments.
 */

/**
 * CORE_READY is dispatched when the config and all modules are loaded.
 *
 * @event temple.events.CORE_READY
 */

/**
 * EXIT is dispatched when the this.exit() method is called.
 *
 * @event temple.events.EXIT
 */




/**
* With the exception of the JavaScript dom selector library (saltjs), all of the DOM properties are custom properties used within your HTML index file.
*
* @class DOM
* @module DOM
*/

/**
 * saltjs. micro DOM selector library that maps queries to native get commands. https://github.com/james2doyle/saltjs
 *
 * @method $
 * @param {String} selector CSS id or class selector.
 */

/**
* Load svg image as an actual SVG element block.
* @property svg
* @type {*}
* @example 
*       \<img data-src="img/logo.svg" svg /\>
*/

/**
* Defined and element as a multilingual image element. Only include the filename and filetype.
* @property multilingual
* @type {IMG, DIV}
* @example 
*       \<img data-src="main_copy.png" multilingual /\>
*/

/**
* data-src attribute is often used instead of the regular src attribute to define a source file that should be loaded by the framework. If data-src is used always ommit the use of a reagular src attribute.
* @property data-src
* @type {*}
* @example 
*       \<img data-src="main_copy.png" multilingual /\>
*/

/**
* Define an image that should be polite loaded.
* @property polite
* @type {IMG, DIV}
* @example 
*       \<img data-src="background.jpg" polite /\>
*/

/**
* To quickly and easily test different creative config files you can use a GET parameter in your creatives URL path. This will load the specified config file instead of the default config.json. Only use the annex of the config filename as your query string.
* @property ?c={config_title}
* @type {Query String}
* @example 
*       //  Config files available
*           config.json
*           config_test.json
*       
*       //  Creative URL path with query string
*       localhost/banners/test_300x250?c=test
*/


/**
 * NodeList prototypes.
 *
 * @class NodeList
 * @module Prototypes
 */

/**
 * Equivalent of Array.prototype.forEach.
 *
 * @method each
 */

/**
 * Array prototypes.
 *
 * @class Array
 */

/**
 * Shuffle (Randomize) the array.
 *
 * @method shuffle
 */

/**
 * Element prototypes.
 *
 * @class Element
 */

/**
 * Hide the element.
 *
 * @method hide
 */

/**
 * Show the element.
 *
 * @method show
 */

/**
 * Add an event listener to an element and automatically bind the banner class to the event callback.
 *
 * @method addEvent
 * @param {String} event Event to listen to.
 * @param {Function} eventHandler Event handler method.
 */

/**
 * Find a child element(s).
 *
 * @method find
 * @param {String} selector Class, ID or element selector.
 */

/**
 * String prototypes.
 *
 * @class String
 */

/**
 * Format a timestamp into a string hours:minutes:seconds.
 *
 * @method timeFormat
 */

/**
 * Returns a string with the first character of string capitalized, if that character is alphabetic.
 *
 * @method ucfirst
 */

/**
 * Function prototypes.
 *
 * @class Function
 */

/**
 * Delay calling of the function with x amount of seconds.
 *
 * @method delay
 * @param {String} seconds Time delay in seconds.
 * @param {*} [...args] Additional optionl function argument.
 */


/**
* The absolute base class for all classes. Every class derives from the EventDispatcher class.
* The EventDispatcher class adds the capability of adding and dispatching custom events from within your classes.
*
* @class EventDispatcher
* @module Core
* @namespace temple.core
* @constructor
*/

/**
 * Dispatch an event.
 *
 * @method dispatchEvent
 * @param {String} event Event type.
 * @param {Object} parameters Dispathed event parameters.
 */

/**
 * Add an event listener.
 *
 * @method addEventListener
 * @param {String} event Event type.
 * @param {Function} callback Event callback method.
 * @param {Boolean} [sticky] Set to false and the event will only be triggered one time.
 */

/**
 * Remove an event listener. This will remove all handlers for the specified event.
 *
 * @method removeEventListener
 * @param {String} event Event type.
 */

 /**
* List of events that have listeners attached.
* @property _events
* @private
* @type {Array}
*/


/**
* The core class of the banner. The Core handles initial backend setups like loading the config, modules and polite load images.
* Also adds module chaining functionality to the banner class. 
* This should be the base class for every Platform class.
*
* @class Core
* @extends temple.core.EventDispatcher
* @namespace temple.core
* @constructor
*/

/**
 * Exit.
 *
 * @method exit
 * @param {String} url Optional exit event url.
 */

/**
 * An async function in the chain can run asynchronous code and halt the execution of the chain until the asynchronous code has completed. When the code is completed, call the done() function to continue running the chain. See example below:
 *
 * @method async
 * @example
 * 		// in the chain
		this.chain(temple.modules.VideoController)
		     .chain(this.asyncMethod)
		     .chain(this.show)

		// asyncMethod()
		banner.prototype.asyncMethod = function() {
		     // register that this is an async function
		     var done = this.async();

		     // do some async code; using timeout as a demo
		     setTimeout(done, 5000);
		}
 */

/**
 * Parses the index.html for 'polite' attributes and svg attributes and loades the files in place.
 *
 * @method _politeLoads
 * @param {Function} callback Callback function when all images are done loading.
 * @private
 */

/**
 * First method that is called when a new banner instance is made. _initCore adds a load event to the window which triggers the _pageReady method.
 *
 * @method _initCore
 * @private
 */

/**
 * Called when the page is loaded and ready to run javascript. Override this method in your Platform class to run platform specific intitalizations.
 *
 * @method _pageReady
 * @private
 */

/**
 * Triggered when all backend core actions are done and the creative is ready to initiate the banner.
 *
 * @method _bannerInit
 * @private
 */

/**
 * Triggered when a chained module or function is ready.
 *
 * @method _chainLoaded
 * @private
 */

/**
 * Run through the chained modules and functions, instantiate modules and execute functions sequentially. 
 *
 * @method _runChain
 * @private
 */

 /**
* Version number of the Core class.
* @property version
* @type {String}
*/

 /**
* Modules and functions that have been added to the chain.
* @property _chained
* @private
* @type {Array}
*/

/**
 * The chain method makes it possible to sequentially instantiate modules. Once a module is instantiated and its internal done() method is executed, the chain continues on with the next module. Functions are also supported within the chain, chain a function inbetween modules to setup code needed for the next loaded module.
 *
 * @method chain
 * @param {String} module Module to instantiate.
 * @param {Object} config Additional optional module configurations.
 * @param {Function} callback Module ready callback method. Executed when the module's done() method is called.
 * @return {temple.core.Core} Returns a reference to you banner instance.
 */

/**
* Base class for all modules. When creating a new module make sure to extend this class.
*
* @class Module
* @extends temple.core.EventDispatcher
* @namespace temple.core
* @constructor
*/

/**
 * Call this method when the module is ready initialized and done loading it's dependecies.
 *
 * @method done
 */

/**
 * Module is done, dispatch MODULE_READY event.
 *
 * @method _moduleReady
 * @private
 */

 /**
 * MODULE_READY event is dispatched when a module is done loading and initialized. This is when the done() method is called.
 *
 * @event temple.events.MODULE_READY
 */

temple.platforms.doubleclick = {};
temple.platforms.doubleclick.Platform = ( function(_super){ 
	
	__extends(Platform, _super);
	
	function Platform() {
		this.defaultExitURL = "";
		this.exitURLs = [""];
		
		temple.color = "#338e43";
		temple.type = "DoubleClick";
		temple.utils.tracker = this._tracker;
		
		this._platform = {
			_closeOverlay: function() {
				Enabler.close();
			}
		};

		if (typeof(Enabler) == "undefined") {
			temple.utils.loadScript("https://s0.2mdn.net/ads/studio/Enabler.js", this._initCore.bind(this));
		} else {
			this._initCore();
		}
	}

	Platform.prototype.setVideoTracking = function(player) {
		if (!studio.video) {
			Enabler.loadModule(studio.module.ModuleId.VIDEO, function(){
				this.setVideoTracking(player);
			}.bind(this));
			return;
		}
		if (player.playHistory) {
			studio.video.Reporter.detach(player.playHistory[player.playHistory.length-1].id);			
			studio.video.Reporter.attach(player.currentVideo.id, player._video);			
		} else {
			studio.video.Reporter.attach(player.currentVideo.id, player._video);			
		}
	}
	
	Platform.prototype.exit = function(url) {
		url = temple.utils.validURL(url) ? url : null;
		this.dispatchEvent(temple.events.EXIT,url||this.defaultExitURL);
		Enabler.exit('Default Exit', url||this.defaultExitURL);
	}


	// private
	
	Platform.prototype._pageReady = function() {
		temple.isLive = Enabler.isServingInLiveEnvironment();
		if (typeof(Enabler)!="undefined") {
		    if (Enabler.isInitialized()) this._pageLoaded();
		    else Enabler.addEventListener(studio.events.StudioEvent.INIT, this._pageLoaded.bind(this));
		} else {
		    setTimeout(this.init.bind(this), 50);
		}
	}
	
	Platform.prototype._pageLoaded = function() {
		if (Enabler.isPageLoaded()) this._bannerInit();
    	else Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, this._bannerInit.bind(this));
	}

	Platform.prototype._tracker = function(title, repeat) {
		if (studio.video) return;
		if (repeat == undefined) repeat = true;
		this._trackedEvents = this._trackedEvents || [];
		if (this._trackedEvents.length > 19) return;
		if (repeat === false && this._trackedEvents.indexOf(title) >= 0) return;
		if (this._trackedEvents.indexOf(title) == -1) {
			this._trackedEvents.push(title);
		}
		Enabler.counter(title, repeat);
		temple.utils.debug('Tracked Event: ' + (this._trackedEvents.indexOf(title) + 1) + ' - ' + title, 'green');
	}

	Platform.prototype._addExitEvents = function() {
		Enabler.addEventListener(studio.events.StudioEvent.EXIT, this.onExit.bind(this));
    }

	return Platform;

})( temple.core.Core );

temple.platforms.Platform = temple.platforms.doubleclick.Platform;




/**
* The platform class for DoubleClick creatives. Handlers initial DoubleClick enabler setups and overrides the temple.tracker method with DoubleClick specific tracking api calls.
*
* @class Platform
* @extends temple.core.Core
* @namespace temple.platforms.doubleclick
* @module Platforms
* @constructor
*/

/**
* Default exit url. Often defined in dynamic creatives.
* @property defaultExitURL
* @type {String}
*/

/**
* Reference to the creative config json.
* @property config
* @type {Object}
*/

temple.templates.MonetBanner = ( function( _super ) {
    __extends(MonetBanner, _super);

    var __instance;
    
    function MonetBanner() {
        __instance = this;
        _super.call(this, arguments[0]);
        temple.type = "Monet";
        temple.color = "#7b1df1";
        temple.utils.debug('Template <'+arguments.callee.name+'>');
    }

    MonetBanner.prototype.show = function(autoplay) {        
        
        
        this.banner.classList.remove('hide');

        this.onShow();

        this.dispatchEvent(temple.events.SHOW);
        
        
    }  
    
    MonetBanner.prototype.onBannerClick = function() {
        if (temple.utils.isiOS) {
            this.exit(this.monetData.rootAssets["url.Exit_URL_iOS"].url);
            return
        }
        
        if (temple.utils.isMobile) {
            this.exit(this.monetData.rootAssets["url.Exit_URL_Android"].url);
            return
        }

        this.exit(this.monetData.rootAssets["url.Exit_URL_Desktop"].url);
    }

    MonetBanner.prototype.onShow = function() { }
    MonetBanner.prototype.onTabChange = function() { }
    MonetBanner.prototype.onBackupImage = function() { }
    MonetBanner.prototype.onExit = function() { }
    MonetBanner.prototype.onOver = function(e) { }
    MonetBanner.prototype.onOut = function(e) { }
    MonetBanner.prototype.init = function(e) { }
    

    // protected

    MonetBanner.prototype._bannerInit = function() {
        _super.prototype._bannerInit(this);
        _ready.call(this);
    }
    
    MonetBanner.prototype.exit = function(url) {
        url = temple.utils.validURL(url) ? url : null;
        this.dispatchEvent(temple.events.EXIT,url||this.defaultExitURL);
        Enabler.exitOverride('Default Exit', url||this.defaultExitURL);
    }
    
    // private

    function _ready() {
        this.banner = document.getElementById("banner");
        var bannerClick = document.querySelectorAll(".bannerClick");

        

        for (i=0; i < bannerClick.length; i++) {
            bannerClick[i].addEventListener("click", this.onBannerClick.bind(this));
            bannerClick[i].addEventListener("mouseover", this.onOver.bind(this));
            bannerClick[i].addEventListener("mouseleave", this.onOut.bind(this));            
        }

        _addTabEvents.call(this);

        if (this._addExitEvents) this._addExitEvents();
        else this.addEventListener(temple.events.EXIT, this.onExit.bind(this));        

        this._politeLoads( function() {
            if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1 && !window.innerHeight) {
                window.onresize = function() {
                    if (!temple.isVisible) {
                        temple.isVisible = true;
                        window.onresize = null;
                        _initComponent.call(this);
                    }
                }.bind(this);
                
                if (!temple.isVisible) return;
            }
            _initComponent.call(this);
        });

    }
    
    function readyEvent() {
        _webComponentReady.call(__instance);
    }

    function _initComponent() {
        this.monetComponent = document.querySelector("monet-integrator");
        
        if (this.monetComponent.hasAttribute("ready")) {
            _webComponentReady.call(this);
        } else {
            this.monetComponent.addEventListener("ready", readyEvent);
        }
    }

    function _webComponentReady() {
        this.monetComponent.removeEventListener("ready", readyEvent);     
        _validateMonetData.call(this).then(function(data) {
            this.monetData = data;

            function _ready() {
                _setImpressionLogging.call(this);
                this.dispatchEvent(temple.events.READY);
                this.init();
            }

            if (this.initDynamicComponents) {
                _initDynamicComponents.call(this).then(function() {
                    _ready.call(this);
                }.bind(this));
            } else {
                _ready.call(this);                
            }
    

        }.bind(this));
    }

    function _initDynamicComponents() {
        return new Promise(function(resolve, reject) {
            this.initDynamicComponents(resolve);
        }.bind(this));
    }

    function _validateMonetData() {
        return new Promise(function(resolve, reject) {
            this.monetComponent.getMonetData().then(function(data) {
                if (!data.isBackupData) {
                    _getBackupMonetData.call(this).then(function(backupData) {
                        for (var i in backupData.rootAssets) {
                            if (!data.rootAssets[i]) {
                                this.monetComponent.logEvent('MONET_DATA_VALIDATION_ERROR', {
                                    details: "Key `" + i + "` not found in Monet data; using backup data."
                                });
                                resolve(backupData);
                                return;
                            }
                        }
                        resolve(data);
                    }.bind(this));
                } else {
                    resolve(data);
                }
            }.bind(this));
        }.bind(this));
    }

    function _getBackupMonetData() {
        return new Promise(function(resolve, reject) {
            
                temple.utils.loadJSON("backup.json", function(data) {
            
                resolve(data);
            }, reject)
        }.bind(this));
    }

    function _setImpressionLogging() {
        var impressionType = "STANDARD";
        var impressionLoggingArray = this.monetData.assetGroups.length > 1 ? ["MULTI_TITLE"] : ["SINGLE_TITLE"];
        var video = document.querySelectorAll("netflix-video");

        if (temple.config.monet.title_type) {
            impressionLoggingArray = [temple.config.monet.title_type];
        }
        
        if (temple.events.EXPAND) {
            impressionLoggingArray.push("EXPANDING");
        }

        if (video.length) {
            var autoplay = false;
            for (var i = 0; i < video.length; i++) {
                if (video[i].hasAttribute("autoplay")) autoplay = true;
            }
            impressionType = "RICH_MEDIA";
            impressionLoggingArray.push("VIDEO");

            if (autoplay) {
                impressionLoggingArray.push("AUTOPLAY");
            } 
        } 

        if (temple.config.monet.skills) {
            impressionLoggingArray = impressionLoggingArray.concat(temple.config.monet.skills);
        }

        Monet.logEvent("MONET_IMPRESSION", { "type": impressionType, "skills": impressionLoggingArray });

        this.banner.addEventListener("click", _trackMonetEvent_CLICK.bind(this));
        this.addEventListener(temple.events.EXIT, _trackMonetEvent_EXIT.bind(this));

        if (temple.config.expandable) {
            if (!this.banner.lightboxModule) {
                this.banner.expandingModule.addEventListener(temple.events.EXPAND, _trackMonetExpandableEvent_EXPAND.bind(this));
                this.banner.expandingModule.addEventListener(temple.events.COLLAPSE, _trackMonetExpandableEvent_COLLAPSE.bind(this));
            } else {
                this.banner.lightboxModule.addEventListener(temple.events.EXPAND, _trackMonetExpandableEvent_EXPAND.bind(this));
                this.banner.lightboxModule.addEventListener(temple.events.COLLAPSE, _trackMonetExpandableEvent_COLLAPSE.bind(this));
            }           
        }   
    }

    function _trackMonetEvent_CLICK(event) {
        var t = String(event.target);
        Monet.logEvent("CLICK", { "src": t, "coords": { "x": event.clientX, "y": event.clientY } });
    }

    function _trackMonetEvent_EXIT(event) { 
        Monet.logEvent("AD_EXIT", { "url": event.url });
    }

    function _trackMonetExpandableEvent_EXPAND(event) { 
        Monet.logEvent("UNIT_RESIZE", { "type": "expand",
            "Size": { "width": temple.config.expandable.width, "height": temple.config.expandable.height }
        });
    }

    function _trackMonetExpandableEvent_COLLAPSE(event) {
        Monet.logEvent("UNIT_RESIZE", { "type": "collapse",
            "Size": { "width": temple.config.size.width, "height": temple.config.size.height }
        });
    }

    function _addTabEvents() {
        this._isHidden = false;
        if ("hidden" in document) {
            document.addEventListener("visibilitychange", this.onTabChange.bind(this));
        } else if ((this._isHidden = "mozHidden") in document) {
            document.addEventListener("mozvisibilitychange", this.onTabChange.bind(this));
        } else if ((this._isHidden = "webkitHidden") in document) {
            document.addEventListener("webkitvisibilitychange", this.onTabChange.bind(this));
        } else if ((this._isHidden = "msHidden") in document) {
            document.addEventListener("msvisibilitychange", this.onTabChange.bind(this));
        } else if ("onfocusin" in document) {
            document.onfocusin = document.onfocusout = this.onTabChange.bind(this);
        } else {
            window.onpageshow = window.onpagehide = window.onfocus = window.onblur = this.onTabChange.bind(this);
        }
    }
    
    return MonetBanner;

})( temple.platforms.Platform || temple.core.Core );

temple.Template = temple.templates.MonetBanner;

temple.MVRBanner = ( function(_super) { 

	__extends(MVRBanner, _super);

	function MVRBanner() {
		_super.call(this, arguments[0]);
	}

	MVRBanner.prototype.initDynamicComponents = function() {
		//If it's backup && replacement is set to TRUE && it's not local, show replacement image. Otherwise, just show backup.json (like usual)
		if (this.monetData.isBackupData && this.config.backupImage)  {
			$("#backup").src  = this.config.backupImageUrl;
		}

		this.darkSkin = this.monetData.rootAssets["bool.Template_Black"].value;
		this.skin = this.darkSkin ? "dark" : "light";

		//Test Data
		//this.darkSkin = true;

		switch(this.skin) {
			case "light":
				TweenMax.set([$('#banner'), $('#innerPanel'), $('#tuneIn'), $('#disclaimer'), $('#panelShadow'), $('#n_ribbon')],  {className:'+=lightSkin'});
			break;

			case "dark":
				TweenMax.set([$('#banner'), $('#innerPanel'), $('#tuneIn'), $('#disclaimer'), $('#panelShadow'), $('#n_ribbon')],  {className:'+=darkSkin'});
			break;

			default:
				//Dark
				TweenMax.set([$('#banner'), $('#innerPanel'), $('#tuneIn'), $('#disclaimer'), $('#panelShadow'), $('#n_ribbon')],  {className:'+=darkSkin'});
			break;
		}
	}

	MVRBanner.prototype.init = function() {

		$('#ribbonComponent').addEventListener("leftPillarStart", function() {
			this.mainTimeline.play();
		}.bind(this));

		temple.utils.fitText($('#tuneInText'));
		
		this.setupTimeline();
		this.show();
	}
	
	// MVRBanner.prototype.startAnimation = function() {
	// 	$('#ribbonComponent').play();		
	// }

	MVRBanner.prototype.onShow = function() {
		$('#ribbonComponent').play();		
	}
	
	MVRBanner.prototype.onOver = function() {
		$('#ctaButton').mouseover();		
	}
	
	MVRBanner.prototype.onOut = function() {
		$('#ctaButton').mouseout();		
	}
	

	MVRBanner.prototype.onExit = function() {
		this.mainTimeline.pause("endframe");
	}

	return MVRBanner;

})( temple.Template );

temple.Banner = ( function(_super) { 

	__extends(banner, _super);

	function banner() {
		_super.call(this, arguments[0]);
	}

	banner.prototype.initDynamicComponents = function(done) {
		this.contentType = this.monetData.assetGroups[0]["text.Netflix_Title_Type"].text.toLowerCase();
		this.nrOfTitles = this.monetData.assetGroups.length;

		//Test Data
		//this.contentType = "original";
		//this.nrOfTitles = 2;
		//this.darkSkin = true;

		var _ready = 0;

		function ready() {
			_ready++;
			if (_ready == (this.nrOfTitles)) {
				done();
			}
		}

		for (var i = this.nrOfTitles-1; i >= 0; i--) {
			this.titleDiv = document.createElement("div");
			this.titleDiv.id = "title" + (i+1);

			this.artworkComponent = document.createElement("netflix-img");
			this.artworkComponent.id = "artworkImage" + (i+1);
			this.artworkComponent.setAttribute("width", "100%");
			this.artworkComponent.setAttribute("data-dynamic-key", this.monetData.assetGroups[i]["image.Single_Image_"+ String(this.config.size.width +"x"+ this.config.size.height) + "_C20"].url);
			this.titleDiv.appendChild(this.artworkComponent);
			$('#titles').appendChild(this.titleDiv);

			this.ratingbugComponent = document.createElement("netflix-img");
			this.ratingbugComponent.id = "ratingbug" + (i+1);
			this.ratingbugComponent.classList.add("ratingbug");
			this.ratingbugComponent.setAttribute("data-dynamic-key", this.monetData.assetGroups[i]['image.Ratings_Bug_22x22'].url);
			$("#div_main").appendChild(this.ratingbugComponent);

			this.artworkComponent.addEventListener("ready", ready.bind(this));
			this.ratingbugComponent.addEventListener("ready", ready.bind(this));

		}

		switch(this.contentType) {
			case "original":
				$('#ctaButton').setAttribute("width", 102);
				$('#ctaButton').setAttribute("height", 27);
				TweenMax.set([$('#cta'), $('#logo'), $('.ratingbug'), $('#disclaimer'), $('#tuneIn')],  {className:'+=original'});
			break;

			case "licensed":
				$('#ctaButton').setAttribute("width", 93);
				$('#ctaButton').setAttribute("height", 23);

				TweenMax.set([$('#cta'), $('#logo'), $('.ratingbug'), $('#disclaimer'), $('#tuneIn')],  {className:'+=licensed'});
			break;

			default:
				//Licensed
				$('#ctaButton').setAttribute("width", 93);
				$('#ctaButton').setAttribute("height", 23);
				TweenMax.set([$('#cta'), $('#logo'), $('.ratingbug'), $('#disclaimer'), $('#tuneIn')],  {className:'+=licensed'});
			break;
		}

		_super.prototype.initDynamicComponents.call(this);
	}

	banner.prototype.init = function() {
		TweenMax.set([$('#titles'), $('#panel')], {opacity:0});

		_super.prototype.init.call(this);
	}
	
	banner.prototype.setupTimeline = function() {
		this.carouselTimeline = new TimelineMax({ 
		    repeat: 1,
		    repeatDelay: 1
		});

		this.carouselTimeline
			.to($('#title1'), 1.2, {x:-340, ease:Power2.easeOut}, "carousel1")
			.to($('#ratingbug1'), 0.5, {opacity:0, ease:Power2.easeOut}, "carousel1")
		    .from($('#title2'), 1, {x:150, ease:Power2.easeOut}, "carousel1")
		    .from($('#ratingbug2'), 0.5, {opacity:0, ease:Power2.easeOut}, "carousel1")
		    .add("carousel2", "+=1")
		    .to($('#title2'), 1.2, {x:-340, ease:Power2.easeOut}, "carousel2")
		    .to($('#ratingbug2'), 0.5, {opacity:0, ease:Power2.easeOut}, "carousel2")
		    
	    if (this.nrOfTitles == 2) {
		    
		    this.carouselTimeline
		    	.set($('#title3'), {opacity:0}, "carousel2")
		    	.set($('#title1'), {css:{zIndex:-1}}, "carousel2")
		    	.set($('#title1'), {x:150}, "carousel2")
		    	.to($('#title1'), 1, {x:0, ease:Power2.easeOut}, "carousel2")
		    	.to($('#ratingbug1'), 0.5, {opacity:1, ease:Power2.easeOut}, "carousel2")
		}

	    if (this.nrOfTitles == 3) {
	    	
	    	this.carouselTimeline
		    	.from($('#title3'), 1, {x:150, ease:Power2.easeOut}, "carousel2")
		    	.from($('#ratingbug3'), 0.5, {opacity:0, ease:Power2.easeOut}, "carousel2")
			    .add("carousel3", "+=1")
			    .to($('#title3'), 1.2, {x:-340, ease:Power2.easeOut}, "carousel3")
			    .to($('#ratingbug3'), 0.5, {opacity:0, ease:Power2.easeOut}, "carousel3")
			    .set($('#title1'), {css:{zIndex:-1}}, "carousel3")
			    .set($('#title1'), {x:150}, "carousel3")
			    .set($('#ratingbug1'), {opacity:0}, "carousel3")
			    .to($('#title1'), 1, {x:0, ease:Power2.easeOut}, "carousel3")
			    .to($('#ratingbug1'), 0.5, {opacity:1, ease:Power2.easeOut}, "carousel3")
		}

		this.mainTimeline = new TimelineMax({paused: true});
		this.mainTimeline.add("start")
			.set([$('#titles'), $('#panel')], {opacity:1}, "start")
			.from($('#titles'), 1, { y:-100, ease: Expo.easeOut }, "start")
			.from($('#disclaimer'), 1, { opacity:0, ease: Expo.easeOut }, "start")
			.from($('#ratingbug1'), 1, { opacity:0, ease: Expo.easeOut }, "start")
			.from($('#panel'), 1, { y:-200, ease: Expo.easeOut }, "start")
			.addCallback($('#logo').play.bind($('#logo')), "start+=.3")
			.from($('#cta'), 1, { css:{width:0}, ease: Quad.easeOut }, "start+=1.2")
			.add("endframe");
        
	    if (this.nrOfTitles > 1) {
	    	this.mainTimeline.add(this.carouselTimeline)
	    }

	    else {
	    	this.carouselTimeline.pause();
	    }
	}

	return banner;

})( temple.MVRBanner );



// This is a starting point to create a Utils method to be included to a component
// Copy this file, rename it to your method or give it a name that incapsulates its functionality
window.Utils = window.Utils || {}
//window.sample = function(){};

// v7.1.0 - https://github.com/taylorhakes/promise-polyfill/blob/master/dist/polyfill.min.js
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n():"function"==typeof define&&define.amd?define(n):n()}(0,function(){"use strict";function e(){}function n(e){if(!(this instanceof n))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=undefined,this._deferreds=[],f(e,this)}function t(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,n._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var i;try{i=n(e._value)}catch(f){return void r(t.promise,f)}o(t.promise,i)}else(1===e._state?o:r)(t.promise,e._value)})):e._deferreds.push(t)}function o(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var o=t.then;if(t instanceof n)return e._state=3,e._value=t,void i(e);if("function"==typeof o)return void f(function(e,n){return function(){e.apply(n,arguments)}}(o,t),e)}e._state=1,e._value=t,i(e)}catch(u){r(e,u)}}function r(e,n){e._state=2,e._value=n,i(e)}function i(e){2===e._state&&0===e._deferreds.length&&n._immediateFn(function(){e._handled||n._unhandledRejectionFn(e._value)});for(var o=0,r=e._deferreds.length;r>o;o++)t(e,e._deferreds[o]);e._deferreds=null}function f(e,n){var t=!1;try{e(function(e){t||(t=!0,o(n,e))},function(e){t||(t=!0,r(n,e))})}catch(i){if(t)return;t=!0,r(n,i)}}var u=setTimeout;n.prototype["catch"]=function(e){return this.then(null,e)},n.prototype.then=function(n,o){var r=new this.constructor(e);return t(this,new function(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}(n,o,r)),r},n.prototype["finally"]=function(e){var n=this.constructor;return this.then(function(t){return n.resolve(e()).then(function(){return t})},function(t){return n.resolve(e()).then(function(){return n.reject(t)})})},n.all=function(e){return new n(function(n,t){function o(e,f){try{if(f&&("object"==typeof f||"function"==typeof f)){var u=f.then;if("function"==typeof u)return void u.call(f,function(n){o(e,n)},t)}r[e]=f,0==--i&&n(r)}catch(c){t(c)}}if(!e||"undefined"==typeof e.length)throw new TypeError("Promise.all accepts an array");var r=Array.prototype.slice.call(e);if(0===r.length)return n([]);for(var i=r.length,f=0;r.length>f;f++)o(f,r[f])})},n.resolve=function(e){return e&&"object"==typeof e&&e.constructor===n?e:new n(function(n){n(e)})},n.reject=function(e){return new n(function(n,t){t(e)})},n.race=function(e){return new n(function(n,t){for(var o=0,r=e.length;r>o;o++)e[o].then(n,t)})},n._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){u(e,0)},n._unhandledRejectionFn=function(e){void 0!==console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var c=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==c)return c;throw Error("unable to locate global object")}();c.Promise||(c.Promise=n)});
;

// Custom event polyfill for IE
(function () {
	if (typeof window.CustomEvent === 'function') {
		return;
	}

	function CustomEvent (event, params) {
		params = params || { bubbles: false, cancelable: false, detail: void 0 };

		var evt = document.createEvent('CustomEvent');
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
		return evt;
	}

	CustomEvent.prototype = window.Event.prototype;
	window.CustomEvent = CustomEvent;
})();;

window.Utils = window.Utils || {}

Utils.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

Utils.isiOS    = /iPad|iPhone|iPod/.test(navigator.userAgent);
Utils.isiOS9up = Utils.isiOS && ((navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/)[1] > 9);
Utils.isiPad   = /iPad/.test(navigator.userAgent);
Utils.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);;

// pk-component-assets

// IMPORTANT!!! GWD Compatibility
// Component dependencies must be browser-safe Javascript

var ComponentAssets = new function () {
	var assets = [];

	/**
		@method add
		@param {string} path - relative path to an asset, like `'./images/rubber_ducky.png'`
		@param {string} src - base64-encoded asset, optional
		@desc Add a path to a component asset. Update a path with a data-src.
	*/
	this.add = function (path, src) {
		var asset = getAsset(path);
		if (asset) {
			asset.src = src || null;
		}
		else {
			assets.push({
				path: path,
				src: src || null
			});
		}
	}

	/**
		@method get
		@param {string} path - relative path to an asset, like `'./images/rubber_ducky.png'`
		@desc 
			If the asset path has been declared, and:
			 - if a src has been provided, the asset data will be returned.
			 - if a src has NOT been provided, the asset path will be returned. 

			If the asset path has NOT been declared:
			 - the path will be returned.
	*/
	this.get = function (path) {
		var asset = getAsset(path);
		if (asset) {
			return asset.src || asset.path;
		} 
		else {
			return path;
		}
	}


	// internal
	function getAsset(path) {
		for (var i in assets) {
			if (assets[i].path == path) {
				return assets[i];
			}
		}	
	}


}

window.ComponentAssets = ComponentAssets;;

(function() {
  function chooseExitURL(desktopExitURL, iosExitURL, androidExitURL) {
    var exitURL = null;

    if (Utils.isMobile) {
      exitURL = Utils.isiOS ? iosExitURL : androidExitURL;
    }

    return exitURL || desktopExitURL;
  }

  function doHTTPRequest(url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          log('info', 'url loaded', url, xhr.response);
          resolve(xhr.response);
          return;
        }

        var errorMessage = 'Failed to load ' + url + ' [' + xhr.status + ']' + xhr.responseText;
        log('error', errorMessage);
        reject(new Error(errorMessage));
      });

      xhr.addEventListener('error', function(errorEvent) {
        var message = 'Error in loading ' + url;
        log('error', message, errorEvent);
        reject(errorEvent.error || new Error(message));
      });

      xhr.open('GET', url);
      xhr.send();
    });
  }

  function listenForLoad(target) {
    return new Promise(function(resolve, reject) {
      var onLoad = null;
      var onError = null;

      var onDone = function() {
        target.removeEventListener('load', onLoad);
        target.removeEventListener('error', onError);
      };

      onLoad = function() {
        onDone();
        resolve(null);
      };
      onError = function(event) {
        onDone();
        reject(event.error);
      };

      target.addEventListener('load', onLoad);
      target.addEventListener('error', onError);
    });
  }

  function log(level) {
    if (!!window.Enabler && Enabler.isServingInLiveEnvironment() && level !== 'error') {
      return;
    }
    console[level].apply(console, Array.prototype.slice.call(arguments, 1));
  }

  function getGWDDynamicContent(dynamicFeedSheetName) {
    var dynamicContent = {};
    var windowDynamicContent = window.devDynamicContent || window.dynamicContent;

    if (!windowDynamicContent) {
      return dynamicContent;
    }

    dynamicContent[dynamicFeedSheetName] = windowDynamicContent[dynamicFeedSheetName];
    return dynamicContent;
  }

  var ElementCreationObserver = (function() {
    function elementMatchesSelector(element, selector) {
      if (element.nodeType !== Node.ELEMENT_NODE) {
        return false;
      }

      var matcher =
        element.matches ||
        element.matchesSelector ||
        element.mozMatchesSelector ||
        element.msMatchesSelector ||
        element.oMatchesSelector ||
        element.webkitMatchesSelector;
      if (!matcher) {
        return false;
      }
      return matcher.call(element, selector);
    }

    function ElementCreationObserver() {
      this.mutationObserver = null;
    }

    ElementCreationObserver.prototype.startObserving = function(selectorToObserve, callback) {
      if (!window.MutationObserver || window.MutationObserver._isPolyfilled) {
        var monetElementObserverFunctionName = 'monetElementObserver_' + '_' + Math.floor(Math.random() * 10000);

        window[monetElementObserverFunctionName] = function() {
          var matchingElements = Array.prototype.slice.call(document.querySelectorAll(selectorToObserve));
          if (matchingElements.length > 0) {
            callback(matchingElements);
          }
          window[monetElementObserverFunctionName] = null;
        };

        var scriptSource = 'window.' + monetElementObserverFunctionName + '();';
        var scriptBase64URI = 'data:text/javascript;base64,' + btoa(scriptSource);

        var triggerScript = document.createElement('script');
        triggerScript.setAttribute('type', 'text/javascript');
        triggerScript.setAttribute('src', scriptBase64URI);

        // IE10 behavior on when a dynamic script tag gets executed doesn't
        // seem to be obvious. Scheduling the script to execute at the end
        // of the current event loop seems to be the most reliable way
        // to get the script to execute before web components start to execute.
        setTimeout(function() {
          document.head.appendChild(triggerScript);
        }, 0);
      } else {
        var config = { attributes: false, childList: true, characterData: false, subtree: true };
        this.mutationObserver = new MutationObserver(function(mutations) {
          var matchedNodes = [];

          mutations.forEach(function(mutationRecord) {
            if (mutationRecord.type !== 'childList') {
              return;
            }

            var addedNodes = Array.prototype.slice.call(mutationRecord.addedNodes);
            addedNodes.forEach(function(addedNode) {
              if (addedNode.nodeType !== Node.ELEMENT_NODE) {
                return;
              }

              if (elementMatchesSelector(addedNode, selectorToObserve)) {
                matchedNodes.push(addedNode);
              }
              var subtreeMatches = addedNode.querySelectorAll(selectorToObserve);
              Array.prototype.push.apply(matchedNodes, subtreeMatches);
            });
          });

          if (matchedNodes.length > 0) {
            callback(matchedNodes);
          }
        });
        this.mutationObserver.observe(document, config);
      }
    };

    ElementCreationObserver.prototype.stopObserving = function() {
      if (!!this.mutationObserver) {
        this.mutationObserver.disconnect();
        this.mutationObserver = null;
      }
    };

    return ElementCreationObserver;
  })();

  var MonetLoader = (function() {
    var MONET_SDK_URL = 'https://ae.nflximg.net/monet/scripts/monet.min.js';
    var ENABLER_URL = 'https://s0.2mdn.net/ads/studio/Enabler.js';

    var monetInitialized = false;
    var scriptURLToLoadPromise = {};

    function loadScript(scriptURL) {
      var script = document.createElement('script');

      var loadPromise = listenForLoad(script);

      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', scriptURL);
      document.head.appendChild(script);

      return loadPromise;
    }

    function ensureExternalScriptExecuted(scriptURL) {
      var scriptPromise = scriptURLToLoadPromise[scriptURL];
      if (!scriptPromise) {
        scriptPromise = scriptURLToLoadPromise[scriptURL] = loadScript(scriptURL);
      }
      return scriptPromise;
    }

    function ensureMonetSDKInjected() {
      if (!!window.Monet) {
        return Promise.resolve();
      }
      return ensureExternalScriptExecuted(MONET_SDK_URL);
    }

    function ensureEnablerInjected() {
      if (!!window.Enabler) {
        return Promise.resolve();
      }
      return ensureExternalScriptExecuted(ENABLER_URL);
    }

    function ensureEnablerInitialized() {
      if (Enabler.isInitialized()) {
        return Promise.resolve();
      }

      return new Promise(function(resolve, reject) {
        Enabler.addEventListener(studio.events.StudioEvent.INIT, function() {
          resolve();
        });
      });
    }

    function initializeMonet() {
      // Enabler script is typically already injected, no need to parallelize Enabler and
      // monet loading
      return ensureEnablerInjected()
        .then(ensureMonetSDKInjected)
        .then(ensureEnablerInitialized)
        .then(function() {
          if (!monetInitialized) {
            monetInitialized = true;

            Monet.initialize(Enabler);
            // TODO (shashanks): Move this event logging to inside Monet.initialize
            // Monet.logEvent('MONET_INITIALIZED');
          }
          return Monet;
        });
    }

    function MonetLoader() {}

    MonetLoader.prototype.getInitialized = function() {
      return initializeMonet();
    };

    return MonetLoader;
  })();

  var MonetDataProvider = (function() {
    var STATIC_BACKUP_LOCATION = 'backup.json';
    var MONET_COMPONENT_TYPE_TO_VALUE_FIELD_NAME = {
      text: 'text',
      number: 'value',
      image: 'url',
      video: 'url',
      url: 'url',
      bool: 'value'
    };
    var MonetDataProviderDataType = {
      MONET: 'MONET',
      GWD: 'GWD'
    };

    function getMonetComponentValueFieldForComponentType(monetComponentType) {
      return MONET_COMPONENT_TYPE_TO_VALUE_FIELD_NAME[monetComponentType] || 'value';
    }

    function convertMonetAssetsToGWDAssets(monetAssets, dynamicFeedSheetName) {
      var gwdData = {};
      Object.keys(monetAssets.rootAssets).forEach(function(key) {
        var value = monetAssets.rootAssets[key];

        var monetComponentType = key.split('.')[0];
        var gwdKey = value.id;
        var gwdValue = value[getMonetComponentValueFieldForComponentType(monetComponentType) || 'value'];
        if (monetComponentType === 'url' || monetComponentType === 'image' || monetComponentType === 'video') {
          gwdValue = {
            Url: gwdValue
          };
        }

        gwdData[gwdKey] = gwdValue;
      });

      var gwdAssets = {};
      gwdAssets[dynamicFeedSheetName] = [gwdData];
      return gwdAssets;
    }

    function guessGWDDataValueMonetComponentType(value) {
      if (typeof value === 'boolean') {
        return 'bool';
      }
      if (typeof value === 'number') {
        return 'number';
      }
      if (typeof value === 'string') {
        if (/(^[^.]*$)|(\.(gif|jpg|jpeg|png)$)/i.test(value) || /^https:\/\/[^.]+.nflximg.net\/api\/v\d\/rendition/.test(value)) {
          return 'image';
        }
        if (/(^[^.]*$)|(\.(mpeg|webm|flv|mp4)$)/i.test(value)) {
          return 'video';
        }
        if (/^https?/.test(value)) {
          return 'url';
        }
        return 'text';
      }
      return null;
    }

    function convertGWDAssetsToMonetAssets(gwdAssets, dynamicFeedSheetName) {
      var dynamicContentValues = gwdAssets[dynamicFeedSheetName][0];
      var rootAssets = {};
      Object.keys(dynamicContentValues).forEach(function(key) {
        var value = dynamicContentValues[key];
        if (typeof value === 'object' && value.hasOwnProperty('Url')) {
          value = value.Url;
        }

        var monetComponentType = guessGWDDataValueMonetComponentType(value);
        if (monetComponentType === null) {
          log('warn', 'Failed to guess monet type for GWD value', value);
          return;
        }

        var monetKey = monetComponentType + '.' + key;
        var monetValue = {
          type: monetComponentType,
          id: key
        };
        var valueFieldKey = getMonetComponentValueFieldForComponentType(monetComponentType);
        monetValue[valueFieldKey] = value;

        rootAssets[monetKey] = monetValue;
      });

      return {
        rootAssets: rootAssets
      };
    }

    function validateGWDAssets(providedGWDData, defaultDynamicContent) {
      var validationPromises = Object.keys(defaultDynamicContent).map(function(key) {
        // Keys starting with _ are for book keeping within GWD (e.g _id)
        // and not used for binding.
        // Note (shashanks): Make sure that we never have used keys starting with an _
        if (key[0] === '_') {
          return Promise.resolve();
        }

        if (!providedGWDData.hasOwnProperty(key)) {
          var message = 'GWD assets invalid - missing key ' + key;
          return Promise.reject(new Error(message));
        }

        var defaultValue = defaultDynamicContent[key];
        var providedValue = providedGWDData[key];

        var defaultValueType = guessGWDDataValueMonetComponentType(defaultValue);
        var providedValueType = guessGWDDataValueMonetComponentType(providedValue);
        if (defaultValueType !== providedValueType) {
          var message = [
            'GWD assets invalid - data type mismatch, expected',
            '\n\t defaultValueType:',
            defaultValueType,
            '\n\t found',
            '\n\t providedValueType:',
            providedValueType,
            '\n\t defaultValue:',
            defaultValue,
            '\n\t providedValue:',
            providedValue
          ].join(' ');
          return Promise.reject(new Error(message));
        }

        if (typeof providedValue === 'object') {
          return validateGWDAssets(providedValue, defaultValue);
        }

        return Promise.resolve();
      });

      return Promise.all(validationPromises);
    }

    function processAssets(monetDataProvider, monetAssets, gwdAssets) {
      if (!gwdAssets && !!monetAssets && monetDataProvider.dynamicFeedSheetName) {
        gwdAssets = convertMonetAssetsToGWDAssets(monetAssets, monetDataProvider.dynamicFeedSheetName);
      }
      if (!monetAssets && !!gwdAssets && monetDataProvider.dynamicFeedSheetName) {
        monetAssets = convertGWDAssetsToMonetAssets(gwdAssets, monetDataProvider.dynamicFeedSheetName);
      }

      // Set the Exit_URL based on the platform
      if (!!gwdAssets && monetDataProvider.dynamicFeedSheetName) {
        var dynSheet = gwdAssets[monetDataProvider.dynamicFeedSheetName][0];
        dynSheet.Exit_URL = {
          Url: chooseExitURL(dynSheet.Exit_URL_Desktop.Url, dynSheet.Exit_URL_iOS.Url, dynSheet.Exit_URL_Android.Url)
        };
      }
      if (!!monetAssets) {
        var getExitURLForKey = function(key) {
          return monetAssets.rootAssets[key] && monetAssets.rootAssets[key].url;
        };

        monetAssets.rootAssets['url.Exit_URL'] = {
          type: 'url',
          id: 'Exit_URL',
          url: chooseExitURL(
            getExitURLForKey('url.Exit_URL_Desktop'),
            getExitURLForKey('url.Exit_URL_iOS'),
            getExitURLForKey('url.Exit_URL_Android')
          )
        };
      }

      monetDataProvider.dataTransformers.forEach(function(transformer) {
        transformer.call(monetDataProvider, gwdAssets, monetDataProvider);
      });

      var assets = {};
      assets[MonetDataProviderDataType.MONET] = monetAssets;
      assets[MonetDataProviderDataType.GWD] = gwdAssets;

      return assets;
    }

    function validateProcessedAssets(processedAssets, monet, dynamicFeedSheetName) {
      var defaultDynamicContent = getGWDDynamicContent(dynamicFeedSheetName);
      if (!defaultDynamicContent) {
        // If not in a GWD container, there is no validation to be done
        return Promise.resolve(processedAssets);
      }

      // Validate GWD assets
      var primaryGWDAssets = processedAssets[MonetDataProvider.MonetDataProviderDataType.GWD];
      return validateGWDAssets(primaryGWDAssets, defaultDynamicContent).then(
        function() {
          return processedAssets;
        },
        function(error) {
          monet.logEvent('MONET_DATA_ERROR', {
            stack: error.stack,
            details: error.message
          });
          return Promise.reject(error);
        }
      );
    }

    function loadPrimaryAssets(monetDataProvider, monet) {
      if (!monetDataProvider.primaryAssetsPromise) {
        var monetRequestParams = monet.buildMonetRequest();
        monetDataProvider.primaryAssetsPromise = new Promise(function(resolve, reject) {
          monet.load(
            monetRequestParams,
            function(monetAssets) {
              // TODO (shashanks): Move this event logging to inside Monet
              monet.logEvent('MONET_ASSETS_LOADED');
              var processedAssets = processAssets(monetDataProvider, monetAssets, null);
              validateProcessedAssets(processedAssets, monet, monetDataProvider.dynamicFeedSheetName).then(function() {
                resolve(processedAssets);
              }, reject);
            },
            function(error) {
              log('warn', 'Error in loading creative assets from monet', error);
              reject(error);
            }
          );
        });
      }

      return monetDataProvider.primaryAssetsPromise;
    }

    function loadBackupAssets(monetDataProvider, monet) {
      if (!monetDataProvider.backupAssetsPromise) {
        monetDataProvider.backupAssetsPromise = doHTTPRequest(monetDataProvider.backupLocation || STATIC_BACKUP_LOCATION)
          .then(function(backupMonetAssets) {
            backupMonetAssets = JSON.parse(backupMonetAssets);
            backupMonetAssets.isBackupData = true;
            monet.logEvent('BACKUP_ASSETS_LOADED');
            var processedAssets = processAssets(monetDataProvider, backupMonetAssets, null);
            return validateProcessedAssets(processedAssets, monet, monetDataProvider.dynamicFeedSheetName);
          })
          .then(null, function(error) {
            log('warn', 'Backup load failed, trying dynamicContent', error);

            var dynContent = getGWDDynamicContent(monetDataProvider.dynamicFeedSheetName);
            if (!!dynContent) {
              monet.logEvent('DYNAMIC_CONTENT_LOADED');
              return processAssets(monetDataProvider, null, dynContent);
            }

            return Promise.reject(error);
          });
      }
      return monetDataProvider.backupAssetsPromise;
    }

    function MonetDataProvider(monetLoader, dynamicFeedSheetName, backupLocation) {
      this.backupLocation = backupLocation;
      this.monetLoader = monetLoader;
      this.dynamicFeedSheetName = dynamicFeedSheetName;

      this.dataLoadPromise = null;
      this.dataLoadFinished = false;
      this.loadedData = null;

      this.primaryAssetsPromise = null;
      this.backupAssetsPromise = null;

      this.dataTransformers = [];
    }

    MonetDataProvider.prototype.loadData = function() {
      var monetLoader = this.monetLoader;
      var monetDataProvider = this;

      if (!this.dataLoadPromise) {
        this.dataLoadPromise = monetLoader
          .getInitialized()
          .then(function(monet) {
            return loadPrimaryAssets(monetDataProvider, monet);
          })
          .then(null, function(error) {
            log('warn', 'primary assets load failed, trying backup', error);
            return monetLoader.getInitialized().then(function(monet) {
              return loadBackupAssets(monetDataProvider, monet);
            });
          })
          .then(
            function(data) {
              monetDataProvider.dataLoadFinished = true;
              return (monetDataProvider.loadedData = data);
            },
            function(error) {
              monetDataProvider.dataLoadFinished = true;
              return Promise.reject(error);
            }
          );
      }

      return this.dataLoadPromise;
    };

    MonetDataProvider.prototype.isDataLoaded = function() {
      return this.dataLoadFinished;
    };

    MonetDataProvider.prototype.getData = function(dataType) {
      if (!this.dataLoadFinished) {
        return null;
      }
      return this.loadedData[dataType];
    };

    MonetDataProvider.prototype.getDataWhenLoaded = function(dataType) {
      return this.dataLoadPromise.then(function(data) {
        return data[dataType];
      });
    };

    MonetDataProvider.prototype.getBackupData = function(dataType) {
      var monetDataProvider = this;

      return this.monetLoader.getInitialized().then(function(monet) {
        return loadBackupAssets(monetDataProvider, monet).then(function(backupAssets) {
          return backupAssets[dataType];
        });
      });
    };

    MonetDataProvider.prototype.addDataTransformer = function(dataTransformer) {
      this.dataTransformers.push(dataTransformer);
    };

    MonetDataProvider.MonetDataProviderDataType = MonetDataProviderDataType;

    return MonetDataProvider;
  })();

  (function() {
    var MONET_GWD_COMPONENT_NAME = 'monet-integrator';
    var DOUBLECLICK_COMPONENT_NAME = 'gwd-doubleclick';
    var DOUBLECLICK_COMPONENT_DATA_PROVIDER_ATTRIBUTE_NAME = 'data-provider';
    var DEFAULT_GWD_DATA_PROVIDER_TAG_NAME = 'gwd-gpa-data-provider';

    var elementCreationObserver = new ElementCreationObserver();

    var _collection = [];
    var _isEmpty = true;

    function fireEvent(monetComponent, eventName) {
      var event = new CustomEvent(eventName, {
        bubbles: true,
        cancelable: true
      });
      monetComponent.dispatchEvent(event);
    }

    function replaceDoubleClickDataProvider(monetGWDComponent) {
      var monetGWDComponentId = monetGWDComponent.getAttribute('id');

      var doubleClickComponents = document.querySelectorAll(DOUBLECLICK_COMPONENT_NAME);
      for (var i = 0; i < doubleClickComponents.length; ++i) {
        var doubleClickComponent = doubleClickComponents[i];
        doubleClickComponent.setAttribute(DOUBLECLICK_COMPONENT_DATA_PROVIDER_ATTRIBUTE_NAME, monetGWDComponentId);
      }

      // Remove the default data provider so that it doesn't try to load its own
      // data. The default component can try to load its own data and pollute
      // devDynamicContent.
      var defaultGWDDataProvider = document.querySelector(DEFAULT_GWD_DATA_PROVIDER_TAG_NAME);
      if (!!defaultGWDDataProvider && !!defaultGWDDataProvider.parentNode) {
        defaultGWDDataProvider.parentNode.removeChild(defaultGWDDataProvider);
      }
    }

    function setUpMonetComponentRePrioritization() {
      elementCreationObserver.startObserving('monet-integrator', function(createdNodes) {
        elementCreationObserver.stopObserving();
        var monetGWDNode = createdNodes[0];
        document.body.insertBefore(monetGWDNode, document.body.firstChild);
        replaceDoubleClickDataProvider(monetGWDNode);
      });
    }

    var proto = Object.create(HTMLElement.prototype, {
      pendingLogs: {
        value: [],
        enumerable: false
      },

      createdCallback: {
        value: function() {
          this.monetLoader = null;
          this.monetDataProvider = null;
          replaceDoubleClickDataProvider(this);
        },
        enumerable: true
      },

      attachedCallback: {
        value: function() {
          if (this._attached) return;
          this._attached = true;
          var component = this;

          this.monetLoader = new MonetLoader();
          this.monetLoader.getInitialized().then(function(monet) {
            if (component.pendingLogs.length === 0) {
              return;
            }

            var pendingLogs = component.pendingLogs.slice();
            component.pendingLogs.length = 0;
            monet.logEvents(pendingLogs);
          });

          var dynamicFeedSheetName = this.getAttribute('dynamic-feed-sheet-name');
          if (!dynamicFeedSheetName || (dynamicFeedSheetName && dynamicFeedSheetName.length < 1)) {
            log('warn', 'Missing `dynamic-feed-sheet-name="your sheet name"`');
          }

          this.monetDataProvider = new MonetDataProvider(this.monetLoader, dynamicFeedSheetName, this.getAttribute('backup'));
          this.monetDataProvider.loadData().then(
            function() {
              // fireEvent(component, 'ready');
            },
            function(error) {
              fireEvent(component, 'error');
            }
          );
        },
        enumerable: true
      },

      attributeChangedCallback: {
        value: function(attributeName) {},
        enumerable: true
      },

      isDataLoaded: {
        value: function() {
          return !!this.monetDataProvider && this.monetDataProvider.isDataLoaded();
        }
      },

      getData: {
        value: function() {
          return this.monetDataProvider.getData(MonetDataProvider.MonetDataProviderDataType.GWD);
        }
      },

      getMonetData: {
        value: function() {
          return this.monetDataProvider.getDataWhenLoaded(MonetDataProvider.MonetDataProviderDataType.MONET);
        }
      },

      getBackupMonetData: {
        value: function() {
          return this.monetDataProvider.getBackupData(MonetDataProvider.MonetDataProviderDataType.MONET);
        }
      },

      addDataTransformer: {
        value: function(transformer) {
          return this.monetDataProvider.addDataTransformer(transformer);
        }
      },

      logEvent: {
        value: function(eventType, eventData) {
          if (!this.monetLoader) {
            // TODO (shashank): Capture timing parameters here
            this.pendingLogs.push({
              eventType: eventType,
              eventData: eventData
            });
            return;
          }

          this.monetLoader.getInitialized().then(
            function(monet) {
              monet.logEvent(eventType, eventData);
            },
            function(error) {
              log('error', 'Failed to log Monet event', error, eventType, eventData);
            }
          );
        }
      },

      register: {
        value: function(component) {
          _isEmpty = false;
          if (_collection.indexOf(component) > -1) {
            return;
          }

          _collection.push(component);

          component.addEventListener(
            'ready',
            function(event) {
              var index = _collection.indexOf(event.target);
              if (index > -1) {
                _collection.splice(index, 1);

                if (_collection.length == 0) {
                  this.setAttribute('ready', '');
                  fireEvent(this, 'ready');
                }
              }
            }.bind(this)
          );
        }
      },

      preview: {
        value: function() {
          return false;
        }
      }
    });

    setUpMonetComponentRePrioritization();
    document.registerElement(MONET_GWD_COMPONENT_NAME, { prototype: proto });
  })();
})();
;

window.Utils = window.Utils || {}
Utils.createStyle = function(nodeId, styles) {
	var id = nodeId + '-component-stylesheet';
	var stylesheet = document.getElementById(id) || this.stylesheet;
	if (!stylesheet) {
		stylesheet = document.createElement( 'style' );
		stylesheet.type = 'text/css';
		stylesheet.id = id;
		this.appendChild(stylesheet);
	}
	var str = stylesheet.innerHTML;
	
	for ( var i = 0; i < arguments.length - 1; i += 2 ) {
		
		// if we want the value to be directly applied to the node
		// eg. 'netflix-video.hide' vs 'netflix-video .hide'
		// check if the first value in a pair is an array
		// then use the first value as the key, the second as the boolean
		var nameArg = arguments[i + 1];
		var space = ' '
		if (Array.isArray(nameArg)) {			
			if (nameArg[1] === true) space = '';
			nameArg = nameArg[0]
		}

		// strip out the white space after comma
		var names = nameArg.replace( /\,\s+/g, ',' );
		
		str += nodeId + space
		str += names;
		str += ' { ' + ( arguments[ i + 2 ] || '' ) + ' }\n';
	}

	stylesheet.innerHTML = str;
	this.stylesheet = stylesheet;	
}
;

/*
 * Copyright 2016 Small Batch, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
/* Web Font Loader v1.6.26 - (c) Adobe Systems, Google. License: Apache 2.0 */
(function(){function aa(a,b,c){return a.call.apply(a.bind,arguments)}function ba(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function p(a,b,c){p=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return p.apply(null,arguments)}var q=Date.now||function(){return+new Date};function ca(a,b){this.a=a;this.m=b||a;this.c=this.m.document}var da=!!window.FontFace;function t(a,b,c,d){b=a.c.createElement(b);if(c)for(var e in c)c.hasOwnProperty(e)&&("style"==e?b.style.cssText=c[e]:b.setAttribute(e,c[e]));d&&b.appendChild(a.c.createTextNode(d));return b}function u(a,b,c){a=a.c.getElementsByTagName(b)[0];a||(a=document.documentElement);a.insertBefore(c,a.lastChild)}function v(a){a.parentNode&&a.parentNode.removeChild(a)}
function w(a,b,c){b=b||[];c=c||[];for(var d=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=!1,g=0;g<d.length;g+=1)if(b[e]===d[g]){f=!0;break}f||d.push(b[e])}b=[];for(e=0;e<d.length;e+=1){f=!1;for(g=0;g<c.length;g+=1)if(d[e]===c[g]){f=!0;break}f||b.push(d[e])}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function y(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return!0;return!1}
function z(a){if("string"===typeof a.f)return a.f;var b=a.m.location.protocol;"about:"==b&&(b=a.a.location.protocol);return"https:"==b?"https:":"http:"}function ea(a){return a.m.location.hostname||a.a.location.hostname}
function A(a,b,c){function d(){k&&e&&f&&(k(g),k=null)}b=t(a,"link",{rel:"stylesheet",href:b,media:"all"});var e=!1,f=!0,g=null,k=c||null;da?(b.onload=function(){e=!0;d()},b.onerror=function(){e=!0;g=Error("Stylesheet failed to load");d()}):setTimeout(function(){e=!0;d()},0);u(a,"head",b)}
function B(a,b,c,d){var e=a.c.getElementsByTagName("head")[0];if(e){var f=t(a,"script",{src:b}),g=!1;f.onload=f.onreadystatechange=function(){g||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(g=!0,c&&c(null),f.onload=f.onreadystatechange=null,"HEAD"==f.parentNode.tagName&&e.removeChild(f))};e.appendChild(f);setTimeout(function(){g||(g=!0,c&&c(Error("Script load timeout")))},d||5E3);return f}return null};function C(){this.a=0;this.c=null}function D(a){a.a++;return function(){a.a--;E(a)}}function F(a,b){a.c=b;E(a)}function E(a){0==a.a&&a.c&&(a.c(),a.c=null)};function G(a){this.a=a||"-"}G.prototype.c=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.a)};function H(a,b){this.c=a;this.f=4;this.a="n";var c=(b||"n4").match(/^([nio])([1-9])$/i);c&&(this.a=c[1],this.f=parseInt(c[2],10))}function fa(a){return I(a)+" "+(a.f+"00")+" 300px "+J(a.c)}function J(a){var b=[];a=a.split(/,\s*/);for(var c=0;c<a.length;c++){var d=a[c].replace(/['"]/g,"");-1!=d.indexOf(" ")||/^\d/.test(d)?b.push("'"+d+"'"):b.push(d)}return b.join(",")}function K(a){return a.a+a.f}function I(a){var b="normal";"o"===a.a?b="oblique":"i"===a.a&&(b="italic");return b}
function ga(a){var b=4,c="n",d=null;a&&((d=a.match(/(normal|oblique|italic)/i))&&d[1]&&(c=d[1].substr(0,1).toLowerCase()),(d=a.match(/([1-9]00|normal|bold)/i))&&d[1]&&(/bold/i.test(d[1])?b=7:/[1-9]00/.test(d[1])&&(b=parseInt(d[1].substr(0,1),10))));return c+b};function ha(a,b){this.c=a;this.f=a.m.document.documentElement;this.h=b;this.a=new G("-");this.j=!1!==b.events;this.g=!1!==b.classes}function ia(a){a.g&&w(a.f,[a.a.c("wf","loading")]);L(a,"loading")}function M(a){if(a.g){var b=y(a.f,a.a.c("wf","active")),c=[],d=[a.a.c("wf","loading")];b||c.push(a.a.c("wf","inactive"));w(a.f,c,d)}L(a,"inactive")}function L(a,b,c){if(a.j&&a.h[b])if(c)a.h[b](c.c,K(c));else a.h[b]()};function ja(){this.c={}}function ka(a,b,c){var d=[],e;for(e in b)if(b.hasOwnProperty(e)){var f=a.c[e];f&&d.push(f(b[e],c))}return d};function N(a,b){this.c=a;this.f=b;this.a=t(this.c,"span",{"aria-hidden":"true"},this.f)}function O(a){u(a.c,"body",a.a)}function P(a){return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+J(a.c)+";"+("font-style:"+I(a)+";font-weight:"+(a.f+"00")+";")};function Q(a,b,c,d,e,f){this.g=a;this.j=b;this.a=d;this.c=c;this.f=e||3E3;this.h=f||void 0}Q.prototype.start=function(){var a=this.c.m.document,b=this,c=q(),d=new Promise(function(d,e){function k(){q()-c>=b.f?e():a.fonts.load(fa(b.a),b.h).then(function(a){1<=a.length?d():setTimeout(k,25)},function(){e()})}k()}),e=new Promise(function(a,d){setTimeout(d,b.f)});Promise.race([e,d]).then(function(){b.g(b.a)},function(){b.j(b.a)})};function R(a,b,c,d,e,f,g){this.v=a;this.B=b;this.c=c;this.a=d;this.s=g||"BESbswy";this.f={};this.w=e||3E3;this.u=f||null;this.o=this.j=this.h=this.g=null;this.g=new N(this.c,this.s);this.h=new N(this.c,this.s);this.j=new N(this.c,this.s);this.o=new N(this.c,this.s);a=new H(this.a.c+",serif",K(this.a));a=P(a);this.g.a.style.cssText=a;a=new H(this.a.c+",sans-serif",K(this.a));a=P(a);this.h.a.style.cssText=a;a=new H("serif",K(this.a));a=P(a);this.j.a.style.cssText=a;a=new H("sans-serif",K(this.a));a=
P(a);this.o.a.style.cssText=a;O(this.g);O(this.h);O(this.j);O(this.o)}var S={D:"serif",C:"sans-serif"},T=null;function U(){if(null===T){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);T=!!a&&(536>parseInt(a[1],10)||536===parseInt(a[1],10)&&11>=parseInt(a[2],10))}return T}R.prototype.start=function(){this.f.serif=this.j.a.offsetWidth;this.f["sans-serif"]=this.o.a.offsetWidth;this.A=q();la(this)};
function ma(a,b,c){for(var d in S)if(S.hasOwnProperty(d)&&b===a.f[S[d]]&&c===a.f[S[d]])return!0;return!1}function la(a){var b=a.g.a.offsetWidth,c=a.h.a.offsetWidth,d;(d=b===a.f.serif&&c===a.f["sans-serif"])||(d=U()&&ma(a,b,c));d?q()-a.A>=a.w?U()&&ma(a,b,c)&&(null===a.u||a.u.hasOwnProperty(a.a.c))?V(a,a.v):V(a,a.B):na(a):V(a,a.v)}function na(a){setTimeout(p(function(){la(this)},a),50)}function V(a,b){setTimeout(p(function(){v(this.g.a);v(this.h.a);v(this.j.a);v(this.o.a);b(this.a)},a),0)};function W(a,b,c){this.c=a;this.a=b;this.f=0;this.o=this.j=!1;this.s=c}var X=null;W.prototype.g=function(a){var b=this.a;b.g&&w(b.f,[b.a.c("wf",a.c,K(a).toString(),"active")],[b.a.c("wf",a.c,K(a).toString(),"loading"),b.a.c("wf",a.c,K(a).toString(),"inactive")]);L(b,"fontactive",a);this.o=!0;oa(this)};
W.prototype.h=function(a){var b=this.a;if(b.g){var c=y(b.f,b.a.c("wf",a.c,K(a).toString(),"active")),d=[],e=[b.a.c("wf",a.c,K(a).toString(),"loading")];c||d.push(b.a.c("wf",a.c,K(a).toString(),"inactive"));w(b.f,d,e)}L(b,"fontinactive",a);oa(this)};function oa(a){0==--a.f&&a.j&&(a.o?(a=a.a,a.g&&w(a.f,[a.a.c("wf","active")],[a.a.c("wf","loading"),a.a.c("wf","inactive")]),L(a,"active")):M(a.a))};function pa(a){this.j=a;this.a=new ja;this.h=0;this.f=this.g=!0}pa.prototype.load=function(a){this.c=new ca(this.j,a.context||this.j);this.g=!1!==a.events;this.f=!1!==a.classes;qa(this,new ha(this.c,a),a)};
function ra(a,b,c,d,e){var f=0==--a.h;(a.f||a.g)&&setTimeout(function(){var a=e||null,k=d||null||{};if(0===c.length&&f)M(b.a);else{b.f+=c.length;f&&(b.j=f);var h,m=[];for(h=0;h<c.length;h++){var l=c[h],n=k[l.c],r=b.a,x=l;r.g&&w(r.f,[r.a.c("wf",x.c,K(x).toString(),"loading")]);L(r,"fontloading",x);r=null;null===X&&(X=window.FontFace?(x=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent))?42<parseInt(x[1],10):!0:!1);X?r=new Q(p(b.g,b),p(b.h,b),b.c,l,b.s,n):r=new R(p(b.g,b),p(b.h,b),b.c,l,b.s,a,
n);m.push(r)}for(h=0;h<m.length;h++)m[h].start()}},0)}function qa(a,b,c){var d=[],e=c.timeout;ia(b);var d=ka(a.a,c,a.c),f=new W(a.c,b,e);a.h=d.length;b=0;for(c=d.length;b<c;b++)d[b].load(function(b,d,c){ra(a,f,b,d,c)})};function sa(a,b){this.c=a;this.a=b}function ta(a,b,c){var d=z(a.c);a=(a.a.api||"fast.fonts.net/jsapi").replace(/^.*http(s?):(\/\/)?/,"");return d+"//"+a+"/"+b+".js"+(c?"?v="+c:"")}
sa.prototype.load=function(a){function b(){if(f["__mti_fntLst"+d]){var c=f["__mti_fntLst"+d](),e=[],h;if(c)for(var m=0;m<c.length;m++){var l=c[m].fontfamily;void 0!=c[m].fontStyle&&void 0!=c[m].fontWeight?(h=c[m].fontStyle+c[m].fontWeight,e.push(new H(l,h))):e.push(new H(l))}a(e)}else setTimeout(function(){b()},50)}var c=this,d=c.a.projectId,e=c.a.version;if(d){var f=c.c.m;B(this.c,ta(c,d,e),function(e){e?a([]):(f["__MonotypeConfiguration__"+d]=function(){return c.a},b())}).id="__MonotypeAPIScript__"+
d}else a([])};function ua(a,b){this.c=a;this.a=b}ua.prototype.load=function(a){var b,c,d=this.a.urls||[],e=this.a.families||[],f=this.a.testStrings||{},g=new C;b=0;for(c=d.length;b<c;b++)A(this.c,d[b],D(g));var k=[];b=0;for(c=e.length;b<c;b++)if(d=e[b].split(":"),d[1])for(var h=d[1].split(","),m=0;m<h.length;m+=1)k.push(new H(d[0],h[m]));else k.push(new H(d[0]));F(g,function(){a(k,f)})};function va(a,b,c){a?this.c=a:this.c=b+wa;this.a=[];this.f=[];this.g=c||""}var wa="//fonts.googleapis.com/css";function xa(a,b){for(var c=b.length,d=0;d<c;d++){var e=b[d].split(":");3==e.length&&a.f.push(e.pop());var f="";2==e.length&&""!=e[1]&&(f=":");a.a.push(e.join(f))}}
function ya(a){if(0==a.a.length)throw Error("No fonts to load!");if(-1!=a.c.indexOf("kit="))return a.c;for(var b=a.a.length,c=[],d=0;d<b;d++)c.push(a.a[d].replace(/ /g,"+"));b=a.c+"?family="+c.join("%7C");0<a.f.length&&(b+="&subset="+a.f.join(","));0<a.g.length&&(b+="&text="+encodeURIComponent(a.g));return b};function za(a){this.f=a;this.a=[];this.c={}}
var Aa={latin:"BESbswy","latin-ext":"\u00e7\u00f6\u00fc\u011f\u015f",cyrillic:"\u0439\u044f\u0416",greek:"\u03b1\u03b2\u03a3",khmer:"\u1780\u1781\u1782",Hanuman:"\u1780\u1781\u1782"},Ba={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},Ca={i:"i",italic:"i",n:"n",normal:"n"},
Da=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
function Ea(a){for(var b=a.f.length,c=0;c<b;c++){var d=a.f[c].split(":"),e=d[0].replace(/\+/g," "),f=["n4"];if(2<=d.length){var g;var k=d[1];g=[];if(k)for(var k=k.split(","),h=k.length,m=0;m<h;m++){var l;l=k[m];if(l.match(/^[\w-]+$/)){var n=Da.exec(l.toLowerCase());if(null==n)l="";else{l=n[2];l=null==l||""==l?"n":Ca[l];n=n[1];if(null==n||""==n)n="4";else var r=Ba[n],n=r?r:isNaN(n)?"4":n.substr(0,1);l=[l,n].join("")}}else l="";l&&g.push(l)}0<g.length&&(f=g);3==d.length&&(d=d[2],g=[],d=d?d.split(","):
g,0<d.length&&(d=Aa[d[0]])&&(a.c[e]=d))}a.c[e]||(d=Aa[e])&&(a.c[e]=d);for(d=0;d<f.length;d+=1)a.a.push(new H(e,f[d]))}};function Fa(a,b){this.c=a;this.a=b}var Ga={Arimo:!0,Cousine:!0,Tinos:!0};Fa.prototype.load=function(a){var b=new C,c=this.c,d=new va(this.a.api,z(c),this.a.text),e=this.a.families;xa(d,e);var f=new za(e);Ea(f);A(c,ya(d),D(b));F(b,function(){a(f.a,f.c,Ga)})};function Ha(a,b){this.c=a;this.a=b}Ha.prototype.load=function(a){var b=this.a.id,c=this.c.m;b?B(this.c,(this.a.api||"https://use.typekit.net")+"/"+b+".js",function(b){if(b)a([]);else if(c.Typekit&&c.Typekit.config&&c.Typekit.config.fn){b=c.Typekit.config.fn;for(var e=[],f=0;f<b.length;f+=2)for(var g=b[f],k=b[f+1],h=0;h<k.length;h++)e.push(new H(g,k[h]));try{c.Typekit.load({events:!1,classes:!1,async:!0})}catch(m){}a(e)}},2E3):a([])};function Ia(a,b){this.c=a;this.f=b;this.a=[]}Ia.prototype.load=function(a){var b=this.f.id,c=this.c.m,d=this;b?(c.__webfontfontdeckmodule__||(c.__webfontfontdeckmodule__={}),c.__webfontfontdeckmodule__[b]=function(b,c){for(var g=0,k=c.fonts.length;g<k;++g){var h=c.fonts[g];d.a.push(new H(h.name,ga("font-weight:"+h.weight+";font-style:"+h.style)))}a(d.a)},B(this.c,z(this.c)+(this.f.api||"//f.fontdeck.com/s/css/js/")+ea(this.c)+"/"+b+".js",function(b){b&&a([])})):a([])};var Y=new pa(window);Y.a.c.custom=function(a,b){return new ua(b,a)};Y.a.c.fontdeck=function(a,b){return new Ia(b,a)};Y.a.c.monotype=function(a,b){return new sa(b,a)};Y.a.c.typekit=function(a,b){return new Ha(b,a)};Y.a.c.google=function(a,b){return new Fa(b,a)};window.WebFont={load:p(Y.load,Y)};if(window.WebFontConfig)Y.load(window.WebFontConfig);}());
;

(function() {
  var COMPONENT_NAME = 'netflix-fonts';

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  function loadFonts(locales, component) {
    var fonts = {};
    var failed = [];

    var fontFamilies = {
      en: ['Netflix Sans'],
      he: ['Noto Sans Hebrew', 'Assistant', 'Rubik'],
      th: ['Neue Helvetica Thai', 'Prompt'],
      ar: ['Neue Helvetica Arab', 'Changa', 'Droid Arabic Kufi']
    };

    locales = locales.filter(onlyUnique);

    for (var i = 0, len = locales.length; i < len; i++) {
      var locale = locales[i];

      switch (locale) {
        case 'he':
          fonts.he = {
            links: [
              'https://fonts.googleapis.com/earlyaccess/notosanshebrew.css',
              'https://fonts.googleapis.com/css?family=Assistant:400,600,700&subset=hebrew',
              'https://fonts.googleapis.com/css?family=Rubik:400,700&subset=hebrew'
            ],
            fams: fontFamilies.he.slice()
          };
          break;

        case 'th':
          fonts.th = {
            links: [
              'https://ae.nflximg.net/monet/fonts/thai/neuehelveticathai.css',
              'https://fonts.googleapis.com/css?family=Prompt:400,600,700&subset=thai'
            ],
            fams: fontFamilies.th.slice()
          };
          break;

        case 'ar':
          fonts.ar = {
            links: [
              'https://ae.nflximg.net/monet/fonts/arabic/neuehelveticaarabic.css',
              'https://fonts.googleapis.com/css?family=Changa:400,600,700&subset=arabic',
              'https://fonts.googleapis.com/earlyaccess/droidarabickufi.css'
            ],
            fams: fontFamilies.ar.slice()
          };
          break;
      }
    }

    fonts.en = {
      links: ['https://ae.nflximg.net/monet/fonts/netflixsans.css'],
      fams: fontFamilies.en.slice()
    };

    function onComplete() {
      if (failed.length) {
        var urls = [];
        var fams = [];
        for (var i = 0, len = failed.length; i < len; i++) {
          for (f in fontFamilies) {
            var index = fontFamilies[f].indexOf(failed[i]);
            if (index > -1) {
              if (fontFamilies[f][index + 1]) {
                urls.push(fonts[f].links.shift());
                fams.push(fonts[f].fams.shift());
              }
              break;
            }
          }
        }

        if (urls[0]) {
          WebFontConfig.custom.families = fams;
          WebFontConfig.custom.urls = urls;
          WebFont.load(WebFontConfig);
        } else {
          component.fontsLoaded = true;
        }

        failed = [];
      } else {
        component.fontsLoaded = true;
      }

      component.dispatchEvent(new CustomEvent('ready'));
    }

    var urls = [];
    var fams = [];

    for (var i in fonts) {
      var u = fonts[i].links.shift();
      var f = fonts[i].fams.shift();
      if (u) {
        urls.push(u);
        fams.push(f);
      }
    }

    var WebFontConfig = {
      custom: {
        families: fams,
        urls: urls
      },
      timeout: 2000,
      active: onComplete.bind(component),
      inactive: onComplete.bind(component),
      fontinactive: function(familyName) {
        failed.push(familyName);
      }
    };
    WebFont.load(WebFontConfig);
  }

  if (document.registerElement) {
    var component = Object.create(HTMLElement.prototype, {
      attachedCallback: {
        value: function() {
          var dom = this;
          Utils.createStyle.call(
            dom,
            '',
            '.en, .da, .nl, .fi, .fr, .de, .it, .no, .pt, .ro, .es, .sv, .tr, .pl, .el',
            "font-family: 'Netflix Sans', Helvetica, Arial, sans-serif;",
            '.zh',
            "-webkit-locale: 'zh'; font-family: 'Netflix Sans', 'Microsoft JhengHei UI', '微軟正黑體', 'Heiti TC', '黑体-简', Arial, Helvetica, sans-serif;",
            '.ja',
            "-webkit-locale: 'ja'; font-family: 'Netflix Sans', 'Yu Gothic Medium', 'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ', Arial, Helvetica, sans-serif;",
            '.ko',
            "-webkit-locale: 'ko'; font-family: 'Netflix Sans', 'Malgun Gothic', '맑은 고딕', 'Apple SD Gothic Neo', '애플 SD 산돌고딕 Neo', Arial, Helvetica, sans-serif;",
            '.ar',
            "font-family: 'Netflix Sans', 'Neue Helvetica Arab', 'Changa', 'Droid Arabic Kufi', Arial, sans-serif;",
            '.th',
            "font-family: 'Netflix Sans', 'Neue Helvetica Thai', 'Prompt', Arial, sans-serif;",
            '.th .cta_copy',
            'margin-top: -2px;',
            '.he',
            "font-family: 'Netflix Sans', 'Noto Sans Hebrew', 'Assistant', 'Rubik', Arial, sans-serif;"
          );

          var locales = [];
          var forceLocale = this.getAttribute('locale') ? [this.getAttribute('locale')] : null;

          var MonetComponent = document.querySelector('monet-integrator');

          if (MonetComponent) {
            MonetComponent.register(this);
            MonetComponent.getMonetData().then(function(data) {
              try {
                for (var i in data.rootAssets) {
                  if (i.split('.')[0] === 'text') {
                    locales.push(Monet.getComponentLocale(i).substr(0, 2));
                  }
                }

                loadFonts(forceLocale || locales, dom);
              } catch (e) {
                MonetComponent.getBackupMonetData().then(
                  function() {
                    for (var i in data.rootAssets) {
                      if (i.split('.')[0] === 'text') {
                        locales.push(Monet.getComponentLocale(i).substr(0, 2));
                      }
                    }

                    loadFonts(forceLocale || locales, dom);
                  },
                  function(error) {
                    Monet.logEvent('MONET_DATA_ERROR', { details: 'Failed to load backup Monet data', stack: error });
                  }
                );
              }
            });
          }
        }
      },
      preview: {
        value: function() {
          return false;
        }
      }
    });

    document.registerElement(COMPONENT_NAME, { prototype: component });
  }
})();
;

/*!
 * VERSION: 0.8.1
 * DATE: 2015-12-18
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * MorphSVGPlugin is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";var a=Math.PI/180,b=180/Math.PI,c=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,d=/(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,e=/[achlmqstvz]/gi,f=_gsScope.TweenLite,g=function(a){window.console&&console.log(a)},h=function(b,c){var d,e,f,g,h,i,j=Math.ceil(Math.abs(c)/90),k=0,l=[];for(b*=a,c*=a,d=c/j,e=4/3*Math.sin(d/2)/(1+Math.cos(d/2)),i=0;j>i;i++)f=b+i*d,g=Math.cos(f),h=Math.sin(f),l[k++]=g-e*h,l[k++]=h+e*g,f+=d,g=Math.cos(f),h=Math.sin(f),l[k++]=g+e*h,l[k++]=h-e*g,l[k++]=g,l[k++]=h;return l},i=function(c,d,e,f,g,i,j,k,l){if(c!==k||d!==l){e=Math.abs(e),f=Math.abs(f);var m=g%360*a,n=Math.cos(m),o=Math.sin(m),p=(c-k)/2,q=(d-l)/2,r=n*p+o*q,s=-o*p+n*q,t=e*e,u=f*f,v=r*r,w=s*s,x=v/t+w/u;x>1&&(e=Math.sqrt(x)*e,f=Math.sqrt(x)*f,t=e*e,u=f*f);var y=i===j?-1:1,z=(t*u-t*w-u*v)/(t*w+u*v);0>z&&(z=0);var A=y*Math.sqrt(z),B=A*(e*s/f),C=A*-(f*r/e),D=(c+k)/2,E=(d+l)/2,F=D+(n*B-o*C),G=E+(o*B+n*C),H=(r-B)/e,I=(s-C)/f,J=(-r-B)/e,K=(-s-C)/f,L=Math.sqrt(H*H+I*I),M=H;y=0>I?-1:1;var N=y*Math.acos(M/L)*b;L=Math.sqrt((H*H+I*I)*(J*J+K*K)),M=H*J+I*K,y=0>H*K-I*J?-1:1;var O=y*Math.acos(M/L)*b;!j&&O>0?O-=360:j&&0>O&&(O+=360),O%=360,N%=360;var P,Q,R,S=h(N,O),T=n*e,U=o*e,V=o*-f,W=n*f,X=S.length-2;for(P=0;X>P;P+=2)Q=S[P],R=S[P+1],S[P]=Q*T+R*V+F,S[P+1]=Q*U+R*W+G;return S[S.length-2]=k,S[S.length-1]=l,S}},j=function(a){var b,d,e,f,h,j,k,l,m,n,o,p,q,r=(a+"").match(c)||[],s=[],t=0,u=0,v=r.length,w=2,x=0;if(!a||!isNaN(r[0])||isNaN(r[1]))return g("ERROR: malformed path data: "+a),s;for(b=0;v>b;b++)if(q=h,isNaN(r[b])?(h=r[b].toUpperCase(),j=h!==r[b]):b--,e=+r[b+1],f=+r[b+2],j&&(e+=t,f+=u),0===b&&(l=e,m=f),"M"===h)k&&k.length<8&&(s.length-=1,w=0),t=l=e,u=m=f,k=[e,f],x+=w,w=2,s.push(k),b+=2,h="L";else if("C"===h)k||(k=[0,0]),k[w++]=e,k[w++]=f,j||(t=u=0),k[w++]=t+1*r[b+3],k[w++]=u+1*r[b+4],k[w++]=t+=1*r[b+5],k[w++]=u+=1*r[b+6],b+=6;else if("S"===h)"C"===q||"S"===q?(n=t-k[w-4],o=u-k[w-3],k[w++]=t+n,k[w++]=u+o):(k[w++]=t,k[w++]=u),k[w++]=e,k[w++]=f,j||(t=u=0),k[w++]=t+=1*r[b+3],k[w++]=u+=1*r[b+4],b+=4;else if("Q"===h)n=e-t,o=f-u,k[w++]=t+2*n/3,k[w++]=u+2*o/3,j||(t=u=0),t+=1*r[b+3],u+=1*r[b+4],n=e-t,o=f-u,k[w++]=t+2*n/3,k[w++]=u+2*o/3,k[w++]=t,k[w++]=u,b+=4;else if("T"===h)n=t-k[w-4],o=u-k[w-3],k[w++]=t+n,k[w++]=u+o,n=t+1.5*n-e,o=u+1.5*o-f,k[w++]=e+2*n/3,k[w++]=f+2*o/3,k[w++]=t=e,k[w++]=u=f,b+=2;else if("H"===h)f=u,k[w++]=t+(e-t)/3,k[w++]=u+(f-u)/3,k[w++]=t+2*(e-t)/3,k[w++]=u+2*(f-u)/3,k[w++]=t=e,k[w++]=f,b+=1;else if("V"===h)f=e,e=t,j&&(f+=u-t),k[w++]=e,k[w++]=u+(f-u)/3,k[w++]=e,k[w++]=u+2*(f-u)/3,k[w++]=e,k[w++]=u=f,b+=1;else if("L"===h||"Z"===h)"Z"===h&&(e=l,f=m,k.closed=!0),("L"===h||Math.abs(t-e)>.5||Math.abs(u-f)>.5)&&(k[w++]=t+(e-t)/3,k[w++]=u+(f-u)/3,k[w++]=t+2*(e-t)/3,k[w++]=u+2*(f-u)/3,k[w++]=e,k[w++]=f,"L"===h&&(b+=2)),t=e,u=f;else if("A"===h){for(p=i(t,u,1*r[b+1],1*r[b+2],1*r[b+3],1*r[b+4],1*r[b+5],(j?t:0)+1*r[b+6],(j?u:0)+1*r[b+7]),d=0;d<p.length;d++)k[w++]=p[d];t=k[w-2],u=k[w-1],b+=7}else g("Error: malformed path data: "+a);return s.totalPoints=x+w,s},k=function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q=0,r=.999999,s=a.length,t=b/((s-2)/6);for(o=2;s>o;o+=6)for(q+=t;q>r;)c=a[o-2],d=a[o-1],e=a[o],f=a[o+1],g=a[o+2],h=a[o+3],i=a[o+4],j=a[o+5],p=1/(Math.floor(q)+1),k=c+(e-c)*p,m=e+(g-e)*p,k+=(m-k)*p,m+=(g+(i-g)*p-m)*p,l=d+(f-d)*p,n=f+(h-f)*p,l+=(n-l)*p,n+=(h+(j-h)*p-n)*p,a.splice(o,4,c+(e-c)*p,d+(f-d)*p,k,l,k+(m-k)*p,l+(n-l)*p,m,n,g+(i-g)*p,h+(j-h)*p),o+=6,s+=6,q--;return a},l=function(a){var b,c,d,e,f="",g=a.length,h=100;for(c=0;g>c;c++){for(e=a[c],f+="M"+e[0]+","+e[1]+" C",b=e.length,d=2;b>d;d++)f+=(e[d++]*h|0)/h+","+(e[d++]*h|0)/h+" "+(e[d++]*h|0)/h+","+(e[d++]*h|0)/h+" "+(e[d++]*h|0)/h+","+(e[d]*h|0)/h+" ";e.closed&&(f+="z")}return f},m=function(a){for(var b=[],c=a.length-1,d=0;--c>-1;)b[d++]=a[c],b[d++]=a[c+1],c--;for(c=0;d>c;c++)a[c]=b[c];a.reversed=a.reversed?!1:!0},n=function(a){var b,c=a.length,d=0,e=0;for(b=0;c>b;b++)d+=a[b++],e+=a[b];return[d/(c/2),e/(c/2)]},o=function(a){var b,c,d,e=a.length,f=a[0],g=f,h=a[1],i=h;for(d=6;e>d;d+=6)b=a[d],c=a[d+1],b>f?f=b:g>b&&(g=b),c>h?h=c:i>c&&(i=c);return a.centerX=(f+g)/2,a.centerY=(h+i)/2,a.size=(f-g)*(h-i)},p=function(a){for(var b,c,d,e,f,g=a.length,h=a[0][0],i=h,j=a[0][1],k=j;--g>-1;)for(f=a[g],b=f.length,e=6;b>e;e+=6)c=f[e],d=f[e+1],c>h?h=c:i>c&&(i=c),d>j?j=d:k>d&&(k=d);return a.centerX=(h+i)/2,a.centerY=(j+k)/2,a.size=(h-i)*(j-k)},q=function(a,b){return b.length-a.length},r=function(a,b){var c=a.size||o(a),d=b.size||o(b);return Math.abs(d-c)<(c+d)/20?b.centerX-a.centerX||b.centerY-a.centerY:d-c},s=function(a,b){var c,d,e=a.slice(0),f=a.length,g=f-2;for(b=0|b,c=0;f>c;c++)d=(c+b)%g,a[c++]=e[d],a[c]=e[d+1]},t=function(a,b,c,d,e){var f,g,h,i,j=a.length,k=0,l=j-2;for(c*=6,g=0;j>g;g+=6)f=(g+c)%l,i=a[f]-(b[g]-d),h=a[f+1]-(b[g+1]-e),k+=Math.sqrt(h*h+i*i);return k},u=function(a,b,c){var d,e,f,g=a.length,h=n(a),i=n(b),j=i[0]-h[0],k=i[1]-h[1],l=t(a,b,0,j,k),o=0;for(f=6;g>f;f+=6)e=t(a,b,f/6,j,k),l>e&&(l=e,o=f);if(c)for(d=a.slice(0),m(d),f=6;g>f;f+=6)e=t(d,b,f/6,j,k),l>e&&(l=e,o=-f);return o/6},v=function(a,b,c){for(var d,e,f,g,h,i,j=a.length,k=99999999999,l=0,m=0;--j>-1;)for(d=a[j],i=d.length,h=0;i>h;h+=6)e=d[h]-b,f=d[h+1]-c,g=Math.sqrt(e*e+f*f),k>g&&(k=g,l=d[h],m=d[h+1]);return[l,m]},w=function(a,b,c,d,e,f){var g,h,i,j,k,l=b.length,m=0,n=Math.min(a.size||o(a),b[c].size||o(b[c]))*d,p=999999999999,q=a.centerX+e,r=a.centerY+f;for(h=c;l>h&&(g=b[h].size||o(b[h]),!(n>g));h++)i=b[h].centerX-q,j=b[h].centerY-r,k=Math.sqrt(i*i+j*j),p>k&&(m=h,p=k);return k=b[m],b.splice(m,1),k},x=function(a,b,c,d){var e,f,h,i,j,l,n,t=b.length-a.length,x=t>0?b:a,y=t>0?a:b,z=0,A="complexity"===d?q:r,B="position"===d?0:"number"==typeof d?d:.8,C=y.length,D="object"==typeof c&&c.push?c.slice(0):[c],E="reverse"===D[0]||D[0]<0,F="log"===c;if(y[0]){if(x.length>1&&(a.sort(A),b.sort(A),l=x.size||p(x),l=y.size||p(y),l=x.centerX-y.centerX,n=x.centerY-y.centerY,A===r))for(C=0;C<y.length;C++)x.splice(C,0,w(y[C],x,C,B,l,n));if(t)for(0>t&&(t=-t),x[0].length>y[0].length&&k(y[0],(x[0].length-y[0].length)/6|0),C=y.length;t>z;)i=x[C].size||o(x[C]),h=v(y,x[C].centerX,x[C].centerY),i=h[0],j=h[1],y[C++]=[i,j,i,j,i,j,i,j],y.totalPoints+=8,z++;for(C=0;C<a.length;C++)e=b[C],f=a[C],t=e.length-f.length,0>t?k(e,-t/6|0):t>0&&k(f,t/6|0),E&&!f.reversed&&m(f),c=D[C]||0===D[C]?D[C]:"auto",c&&(f.closed||Math.abs(f[0]-f[f.length-2])<.5&&Math.abs(f[1]-f[f.length-1])<.5?"auto"===c||"log"===c?(D[C]=c=u(f,e,0===C),0>c&&(E=!0,m(f),c=-c),s(f,6*c)):"reverse"!==c&&(C&&0>c&&m(f),s(f,6*(0>c?-c:c))):!E&&("auto"===c&&Math.abs(e[0]-f[0])+Math.abs(e[1]-f[1])+Math.abs(e[e.length-2]-f[f.length-2])+Math.abs(e[e.length-1]-f[f.length-1])>Math.abs(e[0]-f[f.length-2])+Math.abs(e[1]-f[f.length-1])+Math.abs(e[e.length-2]-f[0])+Math.abs(e[e.length-1]-f[1])||c%2)?(m(f),D[C]=-1,E=!0):"auto"===c?D[C]=0:"reverse"===c&&(D[C]=-1),f.closed!==e.closed&&(f.closed=e.closed=!1));return F&&g("shapeIndex:["+D.join(",")+"]"),D}},y=function(a,b,c,d){var e=j(a[0]),f=j(a[1]);x(e,f,b||0===b?b:"auto",c)&&(a[0]=l(e),a[1]=l(f),("log"===d||d===!0)&&g('precompile:["'+a[0]+'","'+a[1]+'"]'))},z=function(a,b,c){return b||c||a||0===a?function(d){y(d,a,b,c)}:y},A=function(a,b){if(!b)return a;var c,e,f,g=a.match(d)||[],h=g.length,i="";for("reverse"===b?(e=h-1,c=-2):(e=(2*(parseInt(b,10)||0)+1+100*h)%h,c=2),f=0;h>f;f+=2)i+=g[e-1]+","+g[e]+" ",e=(e+c)%h;return i},B=function(a,b){var c,d,e,f,g,h,i,j=0,k=parseFloat(a[0]),l=parseFloat(a[1]),m=k+","+l+" ",n=.999999;for(e=a.length,c=.5*b/(.5*e-1),d=0;e-2>d;d+=2){if(j+=c,h=parseFloat(a[d+2]),i=parseFloat(a[d+3]),j>n)for(g=1/(Math.floor(j)+1),f=1;j>n;)m+=(k+(h-k)*g*f).toFixed(2)+","+(l+(i-l)*g*f).toFixed(2)+" ",j--,f++;m+=h+","+i+" ",k=h,l=i}return m},C=function(a){var b=a[0].match(d)||[],c=a[1].match(d)||[],e=c.length-b.length;e>0?a[0]=B(b,e):a[1]=B(c,-e)},D=function(a){return isNaN(a)?C:function(b){C(b),b[1]=A(b[1],parseInt(a,10))}},E=function(a,b){var c=document.createElementNS("http://www.w3.org/2000/svg","path"),d=Array.prototype.slice.call(a.attributes),e=d.length;for(b=","+b+",";--e>-1;)-1===b.indexOf(","+d[e].nodeName+",")&&c.setAttributeNS(null,d[e].nodeName,d[e].nodeValue);return c},F=function(a,b){var c,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y=a.tagName.toLowerCase(),z=.552284749831;return"path"!==y&&a.getBBox?(i=E(a,"x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),"rect"===y?(g=+a.getAttribute("rx")||0,h=+a.getAttribute("ry")||0,e=+a.getAttribute("x")||0,f=+a.getAttribute("y")||0,m=(+a.getAttribute("width")||0)-2*g,n=(+a.getAttribute("height")||0)-2*h,g||h?(o=e+g*(1-z),p=e+g,q=p+m,r=q+g*z,s=q+g,t=f+h*(1-z),u=f+h,v=u+n,w=v+h*z,x=v+h,c="M"+s+","+u+" V"+v+" C"+[s,w,r,x,q,x,q-(q-p)/3,x,p+(q-p)/3,x,p,x,o,x,e,w,e,v,e,v-(v-u)/3,e,u+(v-u)/3,e,u,e,t,o,f,p,f,p+(q-p)/3,f,q-(q-p)/3,f,q,f,r,f,s,t,s,u].join(",")+"z"):c="M"+(e+m)+","+f+" v"+n+" h"+-m+" v"+-n+" h"+m+"z"):"circle"===y||"ellipse"===y?("circle"===y?(g=h=+a.getAttribute("r")||0,k=g*z):(g=+a.getAttribute("rx")||0,h=+a.getAttribute("ry")||0,k=h*z),e=+a.getAttribute("cx")||0,f=+a.getAttribute("cy")||0,j=g*z,c="M"+(e+g)+","+f+" C"+[e+g,f+k,e+j,f+h,e,f+h,e-j,f+h,e-g,f+k,e-g,f,e-g,f-k,e-j,f-h,e,f-h,e+j,f-h,e+g,f-k,e+g,f].join(",")+"z"):"line"===y?c="M"+a.getAttribute("x1")+","+a.getAttribute("y1")+" L"+a.getAttribute("x2")+","+a.getAttribute("y2"):("polyline"===y||"polygon"===y)&&(l=(a.getAttribute("points")+"").match(d)||[],e=l.shift(),f=l.shift(),c="M"+e+","+f+" L"+l.join(","),"polygon"===y&&(c+=","+e+","+f+"z")),i.setAttribute("d",c),b&&a.parentNode&&(a.parentNode.insertBefore(i,a),a.parentNode.removeChild(a)),i):a},G=function(a,b,c){var e,h,i="string"==typeof a;return(!i||(a.match(d)||[]).length<3)&&(e=i?f.selector(a):[a],e&&e[0]?(e=e[0],h=e.nodeName.toUpperCase(),b&&"PATH"!==h&&(e=F(e,!1),h="PATH"),a=e.getAttribute("PATH"===h?"d":"points")||"",e===c&&(a=e.getAttributeNS(null,"data-original")||a)):(g("WARNING: invalid morph to: "+a),a=!1)),a},H="Use MorphSVGPlugin.convertToPath(elementOrSelectorText) to convert to a path before morphing.",I=_gsScope._gsDefine.plugin({propName:"morphSVG",API:2,global:!0,version:"0.8.1",init:function(a,b,c){var d,f,h,i,j;return"function"!=typeof a.setAttribute?!1:(d=a.nodeName.toUpperCase(),j="POLYLINE"===d||"POLYGON"===d,"PATH"===d||j?(f="PATH"===d?"d":"points",("string"==typeof b||b.getBBox||b[0])&&(b={shape:b}),i=G(b.shape||b.d||b.points||"","d"===f,a),j&&e.test(i)?(g("WARNING: a <"+d+"> cannot accept path data. "+H),!1):(i&&(this._target=a,a.getAttributeNS(null,"data-original")||a.setAttributeNS(null,"data-original",a.getAttribute(f)),h=this._addTween(a,"setAttribute",a.getAttribute(f)+"",i+"","morphSVG",!1,f,"object"==typeof b.precompile?function(a){a[0]=b.precompile[0],a[1]=b.precompile[1]}:"d"===f?z(b.shapeIndex,b.map||I.defaultMap,b.precompile):D(b.shapeIndex)),h&&(this._overwriteProps.push("morphSVG"),h.end=i,h.endProp=f)),!0)):(g("WARNING: cannot morph a <"+d+"> SVG element. "+H),!1))},set:function(a){var b;if(this._super.setRatio.call(this,a),1===a)for(b=this._firstPT;b;)b.end&&this._target.setAttribute(b.endProp,b.end),b=b._next}});I.pathFilter=y,I.pointsFilter=C,I.subdivideRawBezier=k,I.defaultMap="size",I.pathDataToRawBezier=function(a){return j(G(a,!0))},I.equalizeSegmentQuantity=x,I.convertToPath=function(a,b){"string"==typeof a&&(a=f.selector(a));for(var c=a&&0!==a.length?a.length&&a[0]&&a[0].nodeType?Array.prototype.slice.call(a,0):[a]:[],d=c.length;--d>-1;)c[d]=F(c[d],b!==!1);return c},I.pathDataToBezier=function(a,b){var c,d,e,g,h,i,k,l,m=j(G(a,!0))[0]||[],n=0;if(b=b||{},l=b.align||b.relative,g=b.matrix||[1,0,0,1,0,0],h=b.offsetX||0,i=b.offsetY||0,"relative"===l||l===!0?(h-=m[0]*g[0]+m[1]*g[2],i-=m[0]*g[1]+m[1]*g[3],n="+="):(h+=g[4],i+=g[5],l&&(l="string"==typeof l?f.selector(l):[l],l&&l[0]&&(k=l[0].getBBox()||{x:0,y:0},h-=k.x,i-=k.y))),c=[],e=m.length,g)for(d=0;e>d;d+=2)c.push({x:n+(m[d]*g[0]+m[d+1]*g[2]+h),y:n+(m[d]*g[1]+m[d+1]*g[3]+i)});else for(d=0;e>d;d+=2)c.push({x:n+(m[d]+h),y:n+(m[d+1]+i)});return c}}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()();;

(function() {
  var COMPONENT_NAME = 'netflix-brand-logo';
  var svg;

  function createGradient(svg, id, stops, p) {
    var isGradient = false;
    var svgNS = svg.namespaceURI;
    var s = [];

    if (id.indexOf('url(') > -1) {
      isGradient = true;
    }
    id = id.replace('url(#', '').replace(')', '');

    if (isGradient) {
      var grad = document.createElementNS(svgNS, 'linearGradient');
      grad.setAttribute('id', id);
      grad.setAttribute('gradientUnits', 'userSpaceOnUse');
      grad.setAttribute('spreadMethod', 'pad');
      grad.setAttribute('x1', p.x1 || 0);
      grad.setAttribute('y1', p.y1 || 0);
      grad.setAttribute('x2', p.x2 || 0);
      grad.setAttribute('y2', p.y2 || 0);
    }

    for (var i = 0; i < stops.length; i++) {
      var attrs = stops[i];
      var stop = document.createElementNS(svgNS, 'stop');
      for (var attr in attrs) {
        if (attrs.hasOwnProperty(attr)) stop.setAttribute(attr, attrs[attr]);
      }
      if (isGradient) grad.appendChild(stop);
      s.push(stop);
    }

    if (isGradient) {
      var defs = svg.querySelector('defs') || svg.insertBefore(document.createElementNS(svgNS, 'defs'), svg.firstChild);
      defs.appendChild(grad);
    }

    return s;
  }

  function drawPath(path, fill, gradient) {
    var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    p.setAttributeNS(null, 'd', path);
    p.setAttribute('fill', fill);

    if (gradient) {
      var stops = [];
      stops.push({ offset: '0%', 'stop-color': gradient.stop1 || '#B60009' });
      if (gradient.stop3) {
        stops.push({ offset: '50%', 'stop-color': gradient.stop2 || '#540001' });
        stops.push({ offset: '100%', 'stop-color': gradient.stop3 || '#B60009' });
      } else {
        stops.push({ offset: '100%', 'stop-color': gradient.stop2 || '#540001' });
      }
      p.gradient = createGradient(svg, fill, stops, gradient);
    }
    return p;
  }

  (function() {
    var component = Object.create(HTMLElement.prototype, {
      attachedCallback: {
        value: function() {
          if (this._attached) return;
          this._attached = true;

          var comps = document.querySelectorAll(COMPONENT_NAME);

          for (var i = 0; i < comps.length; i++) {
            if (comps[i].uid == undefined) {
              comps[i].uid = i;
            } else {
              continue;
            }
          }

          Utils.createStyle.call(
            this,
            COMPONENT_NAME,
            '',
            'position:absolute;  pointer-events:none;',
            'svg',
            '-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform-origin:top left;transform-origin:top left;'
          );

          this.lowBranding = this.hasAttribute('lowBranding') || false;
          this.color = this.getAttribute('color') || '#E50914';
          this.animDuration = this.getAttribute('duration') || 1.375;
          svg = this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          this.svg.setAttribute('width', '936px');
          this.svg.setAttribute('height', '254px');
          this.svg.setAttribute('viewBox', '0 0 936 254');

          this.resize();

          if (this.lowBranding) {
            this.n_leftShape = drawPath('M 45 2 L 0 2 0 235 Q 17 231 45 232 L 45 2 Z', 'url(#n_leftGrad' + this.uid + ')', {
              x1: '-48',
              y1: '-141',
              x2: '-38',
              y2: '-144'
            });
            this.n_leftShape.to = 'M 37 2 L 0 2 0 254 Q 19 251 40 249 L 37 2 Z';

            this.n_rightShape = drawPath('M 127 2 L 83 2 83 219 127 235 127 2 Z', 'url(#n_rightGrad' + this.uid + ')', {
              x1: '104',
              y1: '140',
              x2: '84',
              y2: '146'
            });
            this.n_rightShape.to = 'M 128 2 L 90 2 89 242 128 238 129 2 Z';
          } else {
            this.n_leftShape = drawPath('M 45 2 L 0 2 0 235 Q 17 231 45 232 L 45 2 Z', this.color, {
              x1: '-48',
              y1: '-141',
              x2: '-38',
              y2: '-144'
            });
            this.n_leftShape.to = 'M 37 2 L 0 2 0 254 Q 19 251 40 249 L 37 2 Z';

            this.n_rightShape = drawPath('M 127 2 L 83 2 83 219 127 235 127 2 Z', this.color, {
              x1: '104',
              y1: '140',
              x2: '84',
              y2: '146'
            });
            this.n_rightShape.to = 'M 128 2 L 90 2 89 242 128 238 129 2 Z';
          }

          //Define svg shapes
          // N

          this.n_midShape = drawPath('M 45 2 L 0 2 81 232 Q 110 231 127 236 L 45 2 Z', this.color);
          this.n_midShape.to = 'M 37 2 L 0 2 85 243 123 239 37 2 Z';

          //E
          this.e_topShape = drawPath('M 274 41 L 274 1 167 1 167 41 274 41 Z', this.color);
          this.e_topShape.to = 'M 167 41 L 167 1 167 1 167 41 167 41 Z';

          this.e_mainShape = drawPath('M 206 3 L 167 3 167 227 206 227 206 3 Z', this.color, {
            x1: '190',
            y1: '65',
            x2: '190',
            y2: '24',
            stop1: this.color
          });
          this.e_mainShape.to = 'M 206 3 L 206 3 167 3 167 3 206 3 Z';

          this.e_bottomShape = drawPath('M 274 186 L 167 188 167 227 274 225 274 186 Z', this.color, {
            x1: '232',
            y1: '204',
            x2: '197',
            y2: '205',
            stop1: this.color
          });
          this.e_bottomShape.to = 'M 167 188 L 167 188 167 227 167 227 167 188 Z';

          this.e_midShape = drawPath('M 182 134 L 257 134 257 94 182 94 182 134 Z', this.color);
          this.e_midShape.to = 'M 182 94 L 182 94 182 134 182 134 182 94 Z';

          //T
          this.t_midShape = drawPath('M 381 8 L 341 8 341 224 381 222 381 8 Z', this.color, {
            x1: '366',
            y1: '69',
            x2: '366',
            y2: '29',
            stop1: this.color
          });
          this.t_midShape.to = 'M 381 8 L 381 8 341 8 341 8 381 8 Z';

          this.t_topShape = drawPath('M 423 41 L 423 1 300 1 300 41 423 41 Z', this.color);
          this.t_topShape.to = 'M 300 41 L 300 1 300 1 300 41 300 41 ';

          //F
          this.f_topShape = drawPath('M 558 41 L 558 1 448 1 448 41 558 41 Z', this.color);
          this.f_topShape.to = 'M 448 41 L 448 1 448 1 448 41 448 41 Z';

          this.f_midShape = drawPath('M 541 132 L 541 92 466 92 466 132 541 132 Z', this.color);
          this.f_midShape.to = 'M 466 132 L 466 92 466 92 466 132 466 132 Z';

          this.f_mainShape = drawPath('M 488 18 L 448 18 448 222 488 222 488 18 Z', this.color, {
            x1: '472',
            y1: '69',
            x2: '472',
            y2: '28',
            stop1: this.color
          });
          this.f_mainShape.to = 'M 488 18 L 448 18 448 18 488 18 488 18 Z';

          //L
          this.l_bottomShape = drawPath('M 691 231 L 691 192 584 184 584 223 691 231 Z', this.color);
          this.l_bottomShape.to = 'M 584.1 223.1 L 584.1 184.1 584 184 584 223 584.1 223.1 Z';
          this.l_mainShape = drawPath('M 624 0 L 584 0 584 223 624 223 624 0 Z', this.color, {
            x1: '599',
            y1: '158',
            x2: '599',
            y2: '201',
            stop1: this.color
          });
          this.l_mainShape.to = 'M 624 0 L 584 0 584 0 624 0 624 0 Z';

          //I
          this.i_mainShape = drawPath('M 763 0 L 723 0 723 230 763 233 763 0 Z', this.color);
          this.i_mainShape.to = 'M 763 0 L 723 0 723 0 763 0 763 0 Z';

          //X
          this.x_frontShape = drawPath('M 791 236 L 791 236 831 241 831 241 791 236 Z', this.color);
          this.x_frontShape.to = 'M 935 1 L 893 1 791 236 831 241 935 1 Z';

          this.x_backShape = drawPath('M 891 248 L 934 254 837 0 794 0 891 248 Z', this.color, {
            x1: '946',
            y1: '-104',
            x2: '1011',
            y2: '-64',
            stop1: this.color
          });
          this.x_backShape.to = 'M 827 0 L 784 0 791 0 833 0 827 0 Z';

          var arr = [
            'n_leftShape',
            'n_rightShape',
            'n_midShape',
            'e_bottomShape',
            'e_midShape',
            'e_mainShape',
            'e_topShape',
            't_midShape',
            't_topShape',
            'f_midShape',
            'f_mainShape',
            'f_topShape',
            'l_mainShape',
            'l_bottomShape',
            'i_mainShape',
            'x_backShape',
            'x_frontShape'
          ];

          for (var i = 0; i < arr.length; i++) {
            this.svg.appendChild(this[arr[i]]);
          }

          this.appendChild(this.svg);

          // Create SVG animation timeline
          this.timeline = new TimelineMax({
            paused: true,
            onComplete: this.onPlayComplete.bind(this),
            onReverseComplete: this.onReverseComplete.bind(this)
          });

          var left = Number(window.getComputedStyle(this, 'left').left.replace('px', ''));
          this.timeline
            .add('start')
            .to(this.n_leftShape, 1.3, { morphSVG: this.n_leftShape.to, ease: Quad.easeOut }, 'start+=.2')
            .to(this.n_leftShape.gradient, 1.3, { stopColor: this.color, ease: Linear.easeNone }, 'start+=.2')
            .to(this.n_rightShape, 1.3, { morphSVG: this.n_rightShape.to, ease: Quad.easeOut }, 'start+=.2')
            .to(this.n_rightShape.gradient, 1.3, { stopColor: this.color, ease: Linear.easeNone }, 'start+=.2')
            .to(this.n_midShape, 1.3, { morphSVG: this.n_midShape.to, ease: Quad.easeOut }, 'start+=.2')
            .fromTo(
              this.e_topShape,
              0.15,
              { morphSVG: this.e_topShape.to },
              { morphSVG: this.e_topShape, ease: Quad.easeOut },
              'start+=.425'
            )
            .fromTo(
              this.e_mainShape,
              0.15,
              { morphSVG: this.e_mainShape.to },
              { morphSVG: this.e_mainShape, ease: Quad.easeOut },
              'start+=.45'
            )
            .to(this.e_mainShape.gradient, 0.3, { stopColor: this.color, ease: Linear.easeNone }, 'start+=.6')
            .fromTo(
              this.e_midShape,
              0.15,
              { morphSVG: this.e_midShape.to },
              { morphSVG: this.e_midShape, ease: Quad.easeOut },
              'start+=.55'
            )
            .fromTo(
              this.e_bottomShape,
              0.15,
              { morphSVG: this.e_bottomShape.to },
              { morphSVG: this.e_bottomShape.to, ease: Quad.easeOut },
              'start+=.575'
            )
            .to(
              this.e_bottomShape,
              0.15,
              { morphSVG: 'M 274 187 L 167 194 167 233 274 226 274 187 Z', ease: Quad.easeOut },
              'start+=.585'
            )
            .to(this.e_bottomShape.gradient, 0.3, { stopColor: this.color, ease: Linear.easeNone }, 'start+=.595')
            .fromTo(
              this.t_topShape,
              0.15,
              { morphSVG: this.t_topShape.to },
              { morphSVG: this.t_topShape, ease: Quad.easeOut },
              'start+=.575'
            )
            .fromTo(
              this.t_midShape,
              0.15,
              { morphSVG: this.t_midShape.to },
              { morphSVG: this.t_midShape, ease: Quad.easeOut },
              'start+=.6'
            )
            .to(this.t_midShape.gradient, 0.3, { stopColor: this.color, ease: Linear.easeNone }, 'start+=.75')
            .fromTo(
              this.f_topShape,
              0.15,
              { morphSVG: this.f_topShape.to },
              { morphSVG: this.f_topShape, ease: Quad.easeOut },
              'start+=.625'
            )
            .fromTo(
              this.f_mainShape,
              0.2,
              { morphSVG: this.f_mainShape.to },
              { morphSVG: this.f_mainShape, ease: Quad.easeOut },
              'start+=.675'
            )
            .fromTo(
              this.f_midShape,
              0.15,
              { morphSVG: this.f_midShape.to },
              { morphSVG: this.f_midShape, ease: Quad.easeOut },
              'start+=.775'
            )
            .to(this.f_mainShape.gradient, 0.3, { stopColor: this.color, ease: Linear.easeNone }, 'start+=.9')
            .fromTo(
              this.l_mainShape,
              0.15,
              { morphSVG: this.l_mainShape.to },
              { morphSVG: this.l_mainShape, ease: Quad.easeOut },
              'start+=.725'
            )
            .fromTo(
              this.l_bottomShape,
              0.15,
              { morphSVG: this.l_bottomShape.to },
              { morphSVG: this.l_bottomShape, ease: Quad.easeOut },
              'start+=.85'
            )
            .to(
              this.l_bottomShape,
              0.3,
              { morphSVG: 'M 691 228 L 691 189 584 184 584 223 691 228 Z', ease: Quad.easeOut },
              'start+=1'
            )
            .to(this.l_mainShape.gradient, 0.3, { stopColor: this.color, ease: Linear.easeNone }, 'start+=1.025')
            .fromTo(
              this.i_mainShape,
              0.15,
              { morphSVG: this.i_mainShape.to },
              { morphSVG: this.i_mainShape, ease: Quad.easeOut },
              'start+=.875'
            )
            .fromTo(
              this.x_backShape,
              0.3,
              { morphSVG: this.x_backShape.to },
              { morphSVG: { shape: this.x_backShape, shapeIndex: 2 }, ease: Quad.easeOut },
              'start+=.925'
            )
            .to(
              this.x_frontShape,
              0.3,
              { morphSVG: { shape: 'M 935 1 L 893 1 790 237 831 241 935 1 Z', shapeIndex: 3 }, ease: Quad.easeOut },
              'start+=1.025'
            )
            .to(this.x_backShape.gradient, 0.3, { stopColor: this.color, ease: Linear.easeNone }, 'start+=1.025');

          this.dispatchEvent(new CustomEvent('ready'));
        },
        enumerable: true
      },

      attributeChangedCallback: {
        value: function() {
          var width = this.getAttribute('width');
          width = parseInt(width, 10);

          if (this.size && this.size.w != width) {
            this.resize();
          }
        },
        enumerable: true
      },

      resize: {
        value: function(s) {
          var width;
          var height;
          var scale;

          if (s) {
            width = s.w;
            height = s.h;
            scale = width / 936;
          } else {
            if (this.lowBranding) {
              width = Number(this.getAttribute('width') || this.offsetWidth || 100);
              height = Number(254 / 127 * width);
              scale = width / 127;
            } else {
              width = Number(this.getAttribute('width') || this.offsetWidth || 100);
              height = Number(254 / 936 * width);
              scale = width / 936;
            }
          }

          this.size = { w: width, h: height };

          TweenLite.set(this, { width: width, height: height });
          this.svg.setAttribute('style', 'transform: scale(' + scale + ');' + '-webkit-transform: scale(' + scale + ');');
        }
      },

      play: {
        value: function() {
          if (!this.lowBranding) this.timeline.duration(this.animDuration).play();
        }
      },

      reset: {
        value: function() {
          if (!this.lowBranding) this.timeline.seek(0);
        }
      },

      reverse: {
        value: function() {
          if (!this.lowBranding) this.timeline.reverse();
        }
      },

      progress: {
        value: function(t) {
          if (!this.lowBranding) this.timeline.progress(t);
        }
      },

      onPlayComplete: {
        value: function() {
          this.dispatchEvent(new CustomEvent('playComplete'));
        }
      },

      onReverseComplete: {
        value: function() {
          this.dispatchEvent(new CustomEvent('reverseComplete'));
        }
      },

      preview: {
        value: function() {
          // this.play();
          this.addEventListener(
            'ready',
            function() {
              this.play();
              setTimeout(this.reverse.bind(this), 3000);
            }.bind(this)
          );
        }
      }
    });

    document.registerElement(COMPONENT_NAME, { prototype: component });
  })();
})();
;

(function() {
  var COMPONENT_NAME = 'netflix-flushed-ribbon';

  // checks for existing Utils from shared / imported Utils methods
  window.Utils = (function(Utils) {
    Utils.SvgContainer = function(width, height, coordinates, stroke) {
      return (
        '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" ' +
        'width="' +
        width +
        'px" ' +
        'height="' +
        height +
        'px" ' +
        'viewBox="0 0 ' +
        width +
        ' ' +
        height +
        '"><defs><linearGradient id="Gradient_1" gradientUnits="userSpaceOnUse" ' +
        coordinates +
        ' spreadMethod="pad"><stop  offset="0%" stop-color="#AD050F"/><stop offset="100%" stop-color="#9D030C"/></linearGradient>' +
        '<g ' +
        'transform="scale(' +
        width / 100 +
        ',' +
        height / 100 +
        ')" >' +
        '<path fill="#9D030C" stroke="none" d="' +
        stroke +
        '"/></g></defs><g transform="matrix( 1, 0, 0, 1, 0,0) "></svg>'
      );
    };

    return Utils;
  })(window.Utils || {});

  var component = Object.create(HTMLElement.prototype, {
    createdCallback: {
      value: function() {
        this.leftContainer = create('leftContainer', this);
        this.rightContainer = create('rightContainer', this);
        this.midContainer = create('midContainer', this);
        this.mid = create('mid', this.midContainer);

        function create(name, target) {
          var elem = document.createElement('div');
          elem.classList.add(name);
          if (target) {
            target.appendChild(elem);
          }
          return elem;
        }
      },
      enumerable: true
    },

    attachedCallback: {
      value: function() {
        this.width = this.getAttribute('width') || this.offsetWidth || 300;
        this.height = this.getAttribute('height') || this.offsetHeight || 250;

        this.scale = 1;

        var defaultScale = {
          '970x250': 2.5,
          '300x600': 1.5,
          '728x90': 2,
          '320x480': 1.3
        };

        var offset = this.width > this.height ? -6 : 7;

        if (defaultScale[this.width + 'x' + this.height]) {
          this.scale = defaultScale[this.width + 'x' + this.height];
        }

        if (Number(this.getAttribute('scale'))) {
          this.scale = Number(this.getAttribute('scale'));
        }

        var scaleWidth = this.width * 0.5;
        var scaleHeight = 600;

        this.leftContainer.innerHTML = Utils.SvgContainer(
          scaleWidth,
          scaleHeight,
          'x1="-11.475" y1="55.6375" x2="62.875" y2="50.4625"',
          'M 0 0 L 0 100 100 100 100 0 0 0 Z'
        );
        this.rightContainer.innerHTML = Utils.SvgContainer(
          scaleWidth,
          scaleHeight,
          'x1="111.475" y1="44.3125" x2="37.125" y2="49.4875"',
          'M 100 100 L 100 0 0 0 0 100 100 100 Z'
        );

        Utils.createStyle.call(
          this,
          COMPONENT_NAME,
          '',
          'overflow: hidden; width:' +
            this.width +
            'px; height:' +
            this.height +
            'px; display:block; position:relative; pointer-events:none; z-index:100;',
          '.leftContainer',
          'background-color: #9d030c;position: absolute; top: 0; left: 0; width: 50%; height: ' +
            this.height +
            'px; overflow: hidden;',
          '.rightContainer',
          'background-color: #9d030c;position: absolute; top: 0; right: 0; width: 50%; height: ' +
            this.height +
            'px;overflow: hidden;',
          '.midContainer',
          'position: absolute; width: ' +
            this.width +
            'px; height: ' +
            this.height +
            'px; transform-origin: 50% 50%; -webkit-transform: rotate(-19deg); transform:rotate(-19deg);',
          '.mid',
          'position:absolute; top:50%; left:50%; width: ' +
            160 * this.scale +
            'px; height: ' +
            this.height * 2.5 +
            'px; overflow: hidden; transform: translate(-50%,-150%); background-color: #e50914;'
        );

        TweenMax.set([this.leftContainer, this.rightContainer], { y: this.height });

        this.timeline = new TimelineMax({ paused: true });
        this.timeline
          .fromTo(this.leftContainer, 0.2, { y: this.height }, { y: 0, ease: Power2.easeIn }, 'start')
          .fromTo(this.mid, 0.2, { x: '-50%', y: '-150%' }, { x: '-50%', y: '-50%', ease: Power2.easeIn }, 'start+=.2')
          .fromTo(
            this.rightContainer,
            0.2,
            { y: this.height },
            { y: 0, ease: Power2.easeIn, onComplete: this.onCoverComplete.bind(this) },
            'start+=.4'
          )
          .to(
            this.leftContainer,
            0.2,
            {
              y: -this.height,
              ease: Power2.easeIn,
              onStart: this.onLeftPillarStart.bind(this),
              onComplete: this.onLeftPillarComplete.bind(this)
            },
            'start+=.85'
          )
          .to(this.mid, 0.3, { x: '-50%', y: '200%', ease: Power2.easeIn }, 'start+=1.15')
          .to(
            this.rightContainer,
            0.3,
            { y: -this.height, ease: Power2.easeIn, onComplete: this.onComplete.bind(this) },
            'start+=1.35'
          );

        this.dispatchEvent(new CustomEvent('ready'));
      },
      enumerable: true
    },

    play: {
      value: function() {
        this.timeline.play();
      }
    },

    onComplete: {
      value: function() {
        this.dispatchEvent(new CustomEvent('complete'));
      }
    },

    onCoverComplete: {
      value: function() {
        this.dispatchEvent(new CustomEvent('coverComplete'));
      }
    },

    onLeftPillarComplete: {
      value: function() {
        this.dispatchEvent(new CustomEvent('leftPillarComplete'));
      }
    },

    onLeftPillarStart: {
      value: function() {
        this.dispatchEvent(new CustomEvent('leftPillarStart'));
      }
    },

    progress: {
      value: function(value, suppressEvents) {
        this.timeline.progress(value, suppressEvents);
      }
    },

    preview: {
      value: function() {
        this.addEventListener('ready', this.play);
      }
    }
  });

  document.registerElement(COMPONENT_NAME, { prototype: component });
})();
;

window.Utils = window.Utils || {}
Utils.SvgIcon = function(id, path, color) {
	var i = document.createElementNS("http://www.w3.org/2000/svg", "path");
	i.setAttributeNS(null, "d", path);
	i.setAttribute("data-original", path);
	if (color != undefined) {
		i.setAttribute('fill', color);
	}
	i.setAttribute("class", id || "");
	return i;
};;

(function() {
  var COMPONENT_NAME = 'netflix-cta';
  var PREFIX = 'mm-component';

  function style() {
    // use unique class name as identifier because there are dynamic values in the generated stylesheet
    var UNIQUE_CLASS_NAME = 'uc-' + (Math.random() * 1000000).toFixed(0);

    Utils.createStyle.call(
      this,
      COMPONENT_NAME + '.' + UNIQUE_CLASS_NAME,
      '.button',
      'will-change: transform;cursor: pointer;overflow: hidden;text-align: center;font-size:' +
        this.data.size +
        'px; font-family: ' +
        this.data.font,
      '.button .fill',
      'will-change: transform;width:100%;height:100%;transform-origin:top left;-webkit-transform-origin:top left;transform: scale(0, 1);-webkit-transform: scale(0, 1); transition: transform .4s cubic-bezier(0.19, 1, 0.22, 1);',
      '.button .arrow',
      'will-change: transform;position:absolute;text-align: right;top:50%;left:auto;right:auto;width:100%;font-size:160% !important;-webkit-transform: translate(0%, -50%);transform: translate(0%, -50%);',
      '.button .arrow svg',
      'position:absolute;right:4%;left:auto;top:0;',
      '.button .copy',
      'will-change: transform;transform-origin: 0 0;white-space:nowrap;letter-spacing:1.5px; padding:4px 8%;transition: color .4s cubic-bezier(0.19, 1, 0.22, 1);color:' +
        this.data.color[1],
      '.button .border',
      '-webkit-box-sizing: border-box;box-sizing: border-box;position: absolute;top: 0;left: 0;width:100%;height:100%;border:solid ' +
        this.borderSize +
        'px ' +
        this.data.color[0],
      'div',
      'position: absolute;top: 0;left: 0;'
    );

    if (!Utils.isMobile) {
      Utils.createStyle.call(
        this,
        COMPONENT_NAME + '.' + UNIQUE_CLASS_NAME,
        '.button:hover .bgImageHover',
        'width:100% !important;',
        '.button.hover .bgImageHover',
        'width:100% !important;',
        '.button:hover .fill',
        'transform: scale(1, 1); -webkit-transform: scale(1, 1);',
        '.button.hover .fill',
        'transform: scale(1, 1); -webkit-transform: scale(1, 1);',
        '.button:hover .arrow',
        'color:' + this.data.color[0],
        '.button.hover .arrow',
        'color:' + this.data.color[0],
        '.button:hover .copy',
        'color:' + this.data.color[0],
        '.button.hover .copy',
        'color:' + this.data.color[0],
        '.button.isArrow:hover .copy',
        'color:' + this.data.color[0]
      );
    }

    this.className += ' ' + PREFIX + ' ' + UNIQUE_CLASS_NAME;
    this.style.position = 'absolute';
    this.button.style.backgroundColor = this.data.color[0];
    this.fill.style.backgroundColor = this.data.color[1];
  }

  var component = Object.create(HTMLElement.prototype, {
    createdCallback: {
      value: function() {
        this._attached = false;

        this.button = document.createElement('div');
        this.button.className = 'button';
        this.fill = document.createElement('div');
        this.fill.className = 'fill';
        this.copy = document.createElement('div');
        this.copy.className = 'copy';
        this.arrow = document.createElement('div');
        this.arrow.className = 'arrow';
        this.border = document.createElement('div');
        this.border.className = 'border';
      },
      enumerable: true
    },

    attachedCallback: {
      value: function() {
        this._attached = true;

        this.data = {};
        this.data.color = [this.getAttribute('color-1') || '#e50914', this.getAttribute('color-2') || '#ffffff'];
        this.data.size = this.getAttribute('font-size') || 20;
        this.data.font = (this.getAttribute('font') || 'Netflix Sans') + ', Arial, sans-serif';
        this.data.text = this.getAttribute('text');

        var bgImg = this.getAttribute('background-image');
        if (bgImg) {
          this.bgImgContainer = document.createElement('div');
          this.bgImgContainer.className = 'bgImage';
          var img = new Image();
          img.src = bgImg;
          this.bgImgContainer.appendChild(img);
          this.button.appendChild(this.bgImgContainer);
          this.bgImgContainer.setAttribute('style', 'position: absolute; top:0;left:0;');
          img.setAttribute('style', 'min-width:' + this.width + 'px;');
        }

        this.appendChild(this.button);
        this.button.appendChild(this.fill);

        var bgImgHover = this.getAttribute('background-image-hover');
        if (bgImgHover) {
          this.bgImgContainerHover = document.createElement('div');
          this.bgImgContainerHover.className = 'bgImageHover';
          var imgHover = new Image();
          imgHover.src = bgImgHover;
          this.bgImgContainerHover.appendChild(imgHover);
          this.button.appendChild(this.bgImgContainerHover);
          this.bgImgContainerHover.setAttribute(
            'style',
            'position: absolute; top:0;left:0;width:0%;overflow:hidden;height:' +
              this.height +
              'px; transition: width .4s cubic-bezier(0.19, 1, 0.22, 1);'
          );
          imgHover.setAttribute('style', 'min-width:' + this.width + 'px;');
          this.fill.setAttribute('style', 'display:none;');
        }

        this.button.appendChild(this.copy);

        this.hasArrow = this.hasAttribute('arrow');
        this.hasBorder = this.hasAttribute('border');
        this.borderSize = this.getAttribute('border') || 1;

        if (this.hasArrow) {
          this.button.appendChild(this.arrow);
          this.button.className += ' isArrow';
        }

        if (this.hasBorder) {
          this.button.appendChild(this.border);
        }

        style.call(this);

        this.button.addEventListener(
          'click',
          function() {
            if (this.click) this.click();
            c = document.createEvent('CustomEvent');
            c.initCustomEvent('cta-click', !0, !0, 'Netflix CTA Click');
            this.dispatchEvent(c);
          }.bind(this)
        );

        // necessary to get the arrow to change color properly
        this.button.addEventListener(
          'mouseover',
          function(event) {
            this.mouseover.call(this);
          }.bind(this)
        );

        this.button.addEventListener(
          'mouseout',
          function(event) {
            this.mouseout.call(this);
          }.bind(this)
        );

        var cta = 'WATCH NOW';

        var MonetComponent = document.querySelector('monet-integrator');
        if (MonetComponent) {
          MonetComponent.register(this);
          MonetComponent.getMonetData().then(
            function(data) {
              var key = this.getAttribute('data-dynamic-key') || 'CTA';
              var d = key;
              if (d.split('.').length === 1) {
                d = 'rootAssets["text.' + d + '"].text';
              }
              try {
                cta = eval('data.' + d);
                var locale = Monet.getComponentLocale('text.' + key).substr(0, 2);
                this.copy.classList.add(locale);
                if (locale == 'ar' || locale == 'he') {
                  this.setAttribute('rtl', true);
                }
                this.text(cta);
                this.dispatchEvent(new CustomEvent('ready'));
              } catch (e) {
                Monet.logEvent('MONET_DATA_ERROR', {
                  details: 'Netflix CTA Component error; Could not find data in rootAssets: ' + 'text.' + d,
                  stack: e
                });

                MonetComponent.getBackupMonetData().then(
                  function(backupData) {
                    var ld = d;
                    if (d.split('.').length === 1) {
                      d = 'rootAssets["text.' + d + '"].text';
                    }
                    cta = eval('backupData.' + d);
                    var locale = Monet.getComponentLocale('text.' + key).substr(0, 2);
                    this.copy.classList.add(locale);
                    if (locale == 'ar' || locale == 'he') {
                      this.setAttribute('rtl', true);
                    }
                    this.text(cta);

                    this.dispatchEvent(new CustomEvent('ready'));
                  }.bind(this),
                  function(error) {
                    Monet.logEvent('MONET_DATA_ERROR', { details: 'Failed to load backup Monet data', stack: error });
                  }
                );
              }
            }.bind(this),
            function(error) {
              Monet.logEvent('MONET_DATA_ERROR', { details: 'Failed to load backup Monet data', stack: error });
            }
          );
        }
      },
      enumerable: true
    },

    attributeChangedCallback: {
      value: function() {
        if (this._attached) this.resize();
      },
      enumerable: true
    },

    text: {
      value: function(text, size) {
        this.copy.innerHTML = text || this.copy.innerHTML;
        this.resize();
      }
    },

    resize: {
      value: function(w, h) {
        this.rtl = this.getAttribute('rtl');

        if (this.rtl) {
          this.arrow.setAttribute(
            'style',
            'position:absolute;text-align: left;top:50%;left:auto;right:auto;width:100%;font-size:160% !important;-webkit-transform: scale(-1,1) translate(0%, -50%);transform: scale(-1,1) translate(0%, -50%);'
          );
        } else {
          this.arrow.setAttribute(
            'style',
            'position:absolute;text-align: right;top:50%;left:auto;right:auto;width:100%;font-size:160% !important;-webkit-transform: translate(0%, -50%);transform: translate(0%, -50%);'
          );
        }

        var width = w || (this.getAttribute('width') || (this.offsetWidth || 109));
        var height = h || (this.getAttribute('height') || (this.offsetHeight || 28));

        this.button.style.width = this.style.width = width + 'px';
        this.button.style.height = this.style.height = height + 'px';
        this.copy.setAttribute('style', 'transform: scale(1);');
        var lines = this.copy.innerHTML.split(/\r\n|\r|\n|\<br\>/).length;

        var copyBounds = this.copy.getBoundingClientRect();
        var buttonBounds = this.button.getBoundingClientRect();
        var pr = '8%';

        if (this.hasArrow) {
          var s = copyBounds.width / buttonBounds.width;
          pr = s * 16 + '%';
          if (this.rtl) {
            this.copy.setAttribute(
              'style',
              'padding-top: ' + (lines > 1 ? '0' : '20%') + '; padding-left: ' + pr + ';padding-right: ' + s * 16 + '%'
            );
          } else {
            this.copy.setAttribute(
              'style',
              'padding-top:' + (lines > 1 ? '0' : '20%') + '; padding-right: ' + pr + ';padding-left: ' + s * 16 + '%'
            );
          }
          copyBounds = this.copy.getBoundingClientRect();
          buttonBounds = this.button.getBoundingClientRect();
        }

        var widthTransform = buttonBounds.width / copyBounds.width;
        var heightTransform = buttonBounds.height / copyBounds.height;
        var value = widthTransform < heightTransform ? widthTransform : heightTransform;

        var matrix = window.getComputedStyle(this.copy, null).getPropertyValue('transform');
        if (this.rtl) {
          this.copy.setAttribute('style', 'transform: scale(' + value.toFixed(3) + ');padding-left: ' + pr);
        } else {
          this.copy.setAttribute('style', 'transform: scale(' + value.toFixed(3) + ');padding-right: ' + pr);
        }

        var copyBounds = this.copy.getBoundingClientRect();
        var xp = Math.ceil(copyBounds.width * 0.96 / 2);
        var yp = Math.ceil(copyBounds.height / 2);
        var p = buttonBounds.width - copyBounds.width;

        this.height = height;
        if (this._attached) {
          this.arrow.innerHTML = '';

          // createArrow
          var s = Math.floor(this.height / 3.3);
          TweenMax.set(this.arrow, {
            height: s
          });
          var elem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          elem.setAttribute('width', s + 'px');
          elem.setAttribute('height', s + 'px');
          elem.line = new Utils.SvgIcon('line1', 'M0,0 l' + s / 2 + ',' + s / 2 + 'l-' + s / 2 + ',' + s / 2);
          elem.line.setAttribute('fill', 'none');
          elem.line.setAttribute('stroke', this.data.color[1] || 0);
          elem.line.setAttribute('stroke-width', 2);
          elem.appendChild(elem.line);

          this.arrow.appendChild(elem);
        }

        if (this.rtl) {
          this.copy.setAttribute(
            'style',
            'backface-visibility: hidden; transform: translateZ(0) scale(' +
              value.toFixed(3) +
              ') translate(-50%,0); left: 50%;top:50%;margin-top:-' +
              yp +
              'px;padding-left: ' +
              pr
          );
        } else {
          this.copy.setAttribute(
            'style',
            'backface-visibility: hidden; transform: translateZ(0) scale(' +
              value.toFixed(3) +
              ') translate(-50%,0); left: 50%;top:50%;margin-top:-' +
              yp +
              'px;padding-right: ' +
              pr
          );
        }
      }
    },

    mouseover: {
      value: function() {
        if (!Utils.isMobile) {
          this.button.classList.add('hover');
        }
        this.arrow.querySelector('svg').line.setAttribute('stroke', this.data.color[0]);
      }
    },

    mouseout: {
      value: function() {
        if (!Utils.isMobile) {
          this.button.classList.remove('hover');
        }
        this.arrow.querySelector('svg').line.setAttribute('stroke', this.data.color[1]);
      }
    },

    preview: {
      value: function() {
        this.setAttribute('arrow', '');
        this.setAttribute('border', '');
        this.text('WATCH NOW');
      }
    }
  });

  document.registerElement(COMPONENT_NAME, { prototype: component });
})();
;

(function() {
  var COMPONENT_NAME = 'netflix-img';

  if (document.registerElement) {
    var component = Object.create(HTMLElement.prototype, {
      createdCallback: {
        value: function() {
          var img = document.createElement('img');
          this.appendChild(img);
        }
      },

      attachedCallback: {
        value: function() {
          var dom = this;
          var img = this.children[0];

          var height = dom.getAttribute('height');
          var width = dom.getAttribute('width');
          if (width) {
            img.setAttribute('width', width);
          }

          if (height) {
            img.setAttribute('height', height);
          }

          var MonetComponent = document.querySelector('monet-integrator');
          if (MonetComponent) {
            MonetComponent.register(this);

            MonetComponent.getMonetData().then(function(data) {
              var imgPath;
              var bindSrc = dom.getAttribute('data-dynamic-key');

              var imgId = dom.getAttribute('id');

              try {
                // absolute paths eg. assets/img.png
                if (/\.(jpe?g|png|gif|svg)$/i.test(bindSrc) || /\.(nflximg.net)/i.test(bindSrc)) {
                  imgPath = bindSrc;
                  img.setAttribute('src', bindSrc);
                } else {
                  imgPath = data.rootAssets['image.' + bindSrc].url;
                  img.setAttribute('src', imgPath);
                }
              } catch (e) {
                MonetComponent.getBackupMonetData().then(
                  function(backupData) {
                    if (backupData.rootAssets['image.' + bindSrc]) {
                      imgPath = backupData.rootAssets['image.' + bindSrc].url;
                      img.setAttribute('src', imgPath);
                    } else {
                      console.warn('Image source incorrectly set!');
                      dom.dispatchEvent(new CustomEvent('ready'));
                    }
                  },
                  function(error) {
                    console.error('Failed to load backup Monet data', error);
                  }
                );
              }

              if (imgId) {
                img.setAttribute('id', imgId + '-img');
              }
            });
          }

          img.onload = img.onerror = function(event) {
            dom.dispatchEvent(new CustomEvent('ready'));
          };
        }
      },

      preview: {
        value: function() {
          var imgPath = '//ae.nflximg.net/monet/img/c20/netflix_placement.svg';
          this.children[0].setAttribute('src', imgPath);
          this.setAttribute('width', 300);
          this.setAttribute('height', 300);
        }
      }
    });

    document.registerElement(COMPONENT_NAME, { prototype: component });
  }
})();
;

(function(){
    var COMPONENT_NAME = 'netflix-ratings-bug';

    function getIconDimensions(iconPath) {
        if (iconPath && iconPath.indexOf('_') > 0) {
            var startingPoint = iconPath.lastIndexOf('_');
            var dimensions = iconPath.substr(Number(startingPoint) + 1).split('x');

            if (dimensions && dimensions.length > 1) {
                return { width: dimensions[0], height: dimensions[1] };
            }

            return null;
        }
    }

    function createRatingsBug(ratingsIconSrc, iconWidth, iconHeight, dom) {
        if (!ratingsIconSrc) {
            dom.dispatchEvent(new CustomEvent('ready'));
            return;
        }

        var ratingsIcon = document.createElement('img');
        ratingsIcon.onload = function() {
            dom.dispatchEvent(new CustomEvent('ready'));
        };

        ratingsIcon.id = 'RatingsIcon';
        ratingsIcon.className = 'ratings-icon';
        ratingsIcon.setAttribute('src', ratingsIconSrc);
        ratingsIcon.setAttribute('width', iconWidth);
        ratingsIcon.setAttribute('height', iconHeight);

        dom.appendChild(ratingsIcon);
    }

    if (document.registerElement) {
        var component = Object.create(HTMLElement.prototype, {
            attachedCallback: {
                value: function() {
                    var dom = this;
                    var iconWidth = 20;
                    var iconHeight = 20;

                    var MonetComponent = document.querySelector('monet-integrator');
                    if (MonetComponent) {
                        MonetComponent.register(this);

                        MonetComponent.getMonetData().then(function(data) {
                            var ratingIcon = dom.getAttribute('data-dynamic-key');
                            try {
                                var imgSrc = data.rootAssets['image.' + ratingIcon];
                                var dimensions = getIconDimensions(ratingIcon);

                                if (dimensions) {
                                    iconWidth = dimensions.width;
                                    iconHeight = dimensions.height;
                                }

                                createRatingsBug(imgSrc.url, iconWidth, iconHeight, dom);
                            } catch (e) {
                                MonetComponent.getBackupMonetData().then(
                                    function(backupData) {
                                        var ratingIconSrc = backupData.rootAssets['image.Ratings_Bug_20x20'].url;
                                        createRatingsBug(ratingIconSrc, iconWidth, iconHeight, dom);
                                    },
                                    function(error) {
                                        console.error('Failed to load backup Monet data', error);
                                    }
                                );
                            }
                        });
                    }
                }
            },

            preview: {
                value: function() {}
            }
        });

        document.registerElement(COMPONENT_NAME, { prototype: component });
    }
})();
;

(function() {
  // remove any tags, replace <br> with \n and render back to innerHTML
  function safeBRReplace(str) {
    var frag = document.createDocumentFragment();
    frag.textContent = str.replace(/<br\s*\/?>/gm, '\n');
    return frag.textContent.replace(/\n/gm, '<br>');
  }

  if (document.registerElement) {
    var elType = 'netflix-text';

    var component = Object.create(HTMLElement.prototype, {
      createdCallback: {
        value: function() {
          var textSpan = document.createElement('span');
          this.appendChild(textSpan);
        }
      },

      attachedCallback: {
        value: function() {
          var dom = this;
          var textSpan = this.children[0];

          var MonetComponent = document.querySelector('monet-integrator');
          if (MonetComponent) {
            MonetComponent.register(this);
            MonetComponent.getMonetData().then(function(data) {
              var bindSrc = dom.getAttribute('data-dynamic-key');
              if (bindSrc.split('.').length == 1) {
                bindSrc = 'rootAssets["text.' + bindSrc + '"].text';
              }

              try {
                var dynamicText = eval('data.' + bindSrc);
                if (dynamicText) {
                  textSpan.innerHTML = safeBRReplace(dynamicText);
                  textSpan.classList.add(Monet.getComponentLocale('text.' + dom.getAttribute('data-dynamic-key')).substr(0, 2));
                }

                dom.dispatchEvent(new CustomEvent('ready'));
              } catch (e) {
                console.error('Monet dynamic ID not found in JSON: ', bindSrc, 'trying backup');

                MonetComponent.getBackupMonetData().then(
                  function(backupData) {
                    if (backupData) {
                      var dynamicText = eval('backupData.' + bindSrc);
                      textSpan.innerHTML = safeBRReplace(dynamicText);
                      textSpan.classList.add(
                        Monet.getComponentLocale('text.' + dom.getAttribute('data-dynamic-key')).substr(0, 2)
                      );
                    }
                    dom.dispatchEvent(new CustomEvent('ready'));
                  },
                  function(error) {
                    console.error('Failed to load backup Monet data', error);
                  }
                );
              }
            });
          } else {
            console.warn('No "monet-integrator" component found. Dynamic binding is disabled');
          }
        }
      },

      preview: {
        value: function() {
					this.children[0].innerHTML = 'This is a preview of the text component.';
					// ensure the preview in C2.0 doesn't get cut off
					this.style.height = '40px';
					this.style.display = 'inline-block';
        }
      }
    });

    document.registerElement(elType, { prototype: component });
  }
})();
;

