// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"19caad876b787b3cd66cc7d25d1f94fa":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "f1893a8c4a9095da3278ffb9b8dd158a";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"62ca92ad2fd69bbbeb829c597f20bcec":[function(require,module,exports) {
require('./bundle-manifest').register(JSON.parse("{\"3278ffb9b8dd158a\":\"controller.f1893a8c.js\",\"4564dc5befcffa2b\":\"icons.850bab2b.svg\"}"));
},{"./bundle-manifest":"ba8df6b71e73837c465d69bebde6e64d"}],"ba8df6b71e73837c465d69bebde6e64d":[function(require,module,exports) {
"use strict";

var mapping = {};

function register(pairs) {
  var keys = Object.keys(pairs);

  for (var i = 0; i < keys.length; i++) {
    mapping[keys[i]] = pairs[keys[i]];
  }
}

function resolve(id) {
  var resolved = mapping[id];

  if (resolved == null) {
    throw new Error('Could not resolve bundle with id ' + id);
  }

  return resolved;
}

module.exports.register = register;
module.exports.resolve = resolve;
},{}],"175e469a7ea7db1c8c0744d04372621f":[function(require,module,exports) {
"use strict";

var _icons = _interopRequireDefault(require("url:../img/icons.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_icons.default);
const recipeContainer = document.querySelector('.recipe');
const search__field = document.querySelector('.search__field');
const Search__btn = document.querySelector('.search__btn');
const results = document.querySelector('.results');
const pagination = document.querySelector('.pagination');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
}; // https://forkify-api.herokuapp.com/v2
///////////////////////////////////////


const renderSpinner = function (parentEl) {
  const html = `<div class="spinner">
  <svg>
    <use href="${_icons.default}#icon-loader"></use>
  </svg>
</div>`;
  parentEl.insertAdjacentHTML('afterbegin', html);
};

let recipe;

async function getrecipe() {
  const idRecipe = window.location.hash.slice(1);
  if (!idRecipe) return;
  renderSpinner(recipeContainer);
  const x = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${idRecipe}`);
  const data = await x.json();
  recipe = data.data.recipe;
  console.log(recipe);
  renderRecipeHTML(recipe);
}

function renderRecipeHTML(recipe) {
  const html = `<figure class="recipe__fig">
<img src="${recipe.image_url}" alt="Tomato" class="recipe__img" />
<h1 class="recipe__title">
  <span>${recipe.title}</span>
</h1>
</figure>

<div class="recipe__details">
<div class="recipe__info">
  <svg class="recipe__info-icon">
    <use href="${_icons.default}#icon-clock"></use>
  </svg>
  <span class="recipe_info-data recipe_info-data--minutes">${recipe.cooking_time}</span>
  <span class="recipe__info-text">minutes</span>
</div>
<div class="recipe__info">
  <svg class="recipe__info-icon">
    <use href="${_icons.default}#icon-users"></use>
  </svg>
  <span class="recipe_info-data recipe_info-data--people">${recipe.servings}</span>
  <span class="recipe__info-text">servings</span>

  <div class="recipe__info-buttons">
    <button data-cur=${recipe.servings - 1} class="btn--tiny btn--increase-servings">
      <svg>
        <use href="${_icons.default}#icon-minus-circle"></use>
      </svg>
    </button>
    <button data-cur=${recipe.servings + 1} class="btn--tiny btn--increase-servings">
      <svg>
        <use href="${_icons.default}#icon-plus-circle"></use>
      </svg>
    </button>
  </div>
</div>

<div class="recipe__user-generated">
  <svg>
    <use href="${_icons.default}#icon-user"></use>
  </svg>
</div>
<button class="btn--round">
  <svg class="">
    <use href="${_icons.default}#icon-bookmark-fill"></use>
  </svg>
</button>
</div>

<div class="recipe__ingredients">
<h2 class="heading--2">Recipe ingredients</h2>
<ul class="recipe__ingredient-list">
${recipe.ingredients.map(ing => {
    return `<li class="recipe__ingredient">
<svg class="recipe__icon">
  <use href="${_icons.default}#icon-check"></use>
</svg>
<div class="recipe__quantity">${ing.quantity}</div>
<div class="recipe__description">
  <span class="recipe__unit">${ing.unit}</span>
  ${ing.description}
</div>
</li>`;
  }).join('')}
 

</ul>
</div>

<div class="recipe__directions">
<h2 class="heading--2">How to cook it</h2>
<p class="recipe__directions-text">
  This recipe was carefully designed and tested by
  <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
  directions at their website.
</p>
<a
  class="btn--small recipe__btn"
  href="${recipe.source_url}"
  target="_blank"
>
  <span>Directions</span>
  <svg class="search__icon">
    <use href="${_icons.default}#icon-arrow-right"></use>
  </svg>
</a>
</div>`;
  recipeContainer.innerHTML = '';
  recipeContainer.insertAdjacentHTML('afterbegin', html);
} //  getrecipe();


window.addEventListener('hashchange', getrecipe);
window.addEventListener('load', getrecipe);
Search__btn.addEventListener('click', function (e) {
  e.preventDefault();
  showRecipe();
});
let currentPage;
let resultPerPage = 10;
let numPages;
let recipes;

async function showRecipe() {
  renderSpinner(results);
  console.log(search__field.value);
  const x1 = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${search__field.value}`);
  const data1 = await x1.json();
  recipes = data1.data.recipes;
  console.log(recipes);
  currentPage = 1;
  renderRecipes(currentPage);
} //////////


function renderRecipes(currentPage) {
  let start = (currentPage - 1) * resultPerPage;
  let end = currentPage * resultPerPage;
  numPages = Math.ceil(recipes.length / resultPerPage);
  const recipeCurrPage = recipes.slice(start, end);
  console.log(recipeCurrPage); ///////Render function//////////
  // renderRecipes(currentPage);

  const html1 = `${recipeCurrPage.map(recipe => {
    return `<li class="preview">
    <a class="preview_link preview_link--active" href="#${recipe.id}">
      <figure class="preview__fig">
        <img src="${recipe.image_url}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${recipe.title}</h4>
        <p class="preview__publisher">${recipe.publisher}</p>
        <div class="preview__user-generated">
          <svg>
            <use href="${_icons.default}#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
   </li>`;
  }).join("")}`;
  results.innerHTML = "";
  results.insertAdjacentHTML("afterbegin", html1); ////render pagination/////////

  const pageHtml = paginationView(currentPage, numPages);
  pagination.innerHTML = '', pagination.insertAdjacentHTML('afterbegin', pageHtml);
} /////////////


function paginationView(currentPage, numPages) {
  //// on page 1 with other pages
  if (currentPage == 1 && numPages > 1) {
    return `<button  data-cur = ${currentPage + 1} class="btn--inline pagination__btn--next">
            <span>page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${_icons.default}#icon-arrow-right"></use>
            </svg>
          </button>`;
  } /////on last page 


  if (numPages == currentPage && numPages > 1) {
    return `<buttondata-cur = ${currentPage - 1} class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${_icons.default}#icon-arrow-left"></use>
    </svg>
    <span>Page ${currentPage - 1}</span>
  </button>`;
  } ////  on other  pages


  if (numPages > 1) {
    return `<button data-cur = ${currentPage - 1} class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${_icons.default}#icon-arrow-left"></use>
    </svg>
    <span>Page ${currentPage - 1}</span>
  </button>
  
  <button data-cur = ${currentPage + 1} class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${_icons.default}#icon-arrow-right"></use>
            </svg>
          </button>`;
  } //// on page 1 and on other page 


  return ``;
} ////////


pagination.addEventListener('click', function (e) {
  const btn = e.target.closest('.btn--inline');
  renderRecipes(+btn.dataset.cur);
});
recipeContainer.addEventListener('click', function (e) {
  const btn = e.target.closest('.btn--tiny');
  if (!btn) return;
  var newServings = +btn.dataset.cur;
  recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity / recipe.servings * newServings;
  });
  recipe.servings = newServings;
  renderRecipeHTML(recipe);
});
},{"url:../img/icons.svg":"51835897319b50fa9bf2a44ed3630fbb"}],"51835897319b50fa9bf2a44ed3630fbb":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + require('./relative-path')("3278ffb9b8dd158a", "4564dc5befcffa2b");
},{"./bundle-url":"2146da1905b95151ed14d455c784e7b7","./relative-path":"1b9943ef25c7bbdf0dd1b9fa91880a6c"}],"2146da1905b95151ed14d455c784e7b7":[function(require,module,exports) {
"use strict";

/* globals document:readonly */
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.


function getOrigin(url) {
  let matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);

  if (!matches) {
    throw new Error('Origin not found');
  }

  return matches[0];
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;
},{}],"1b9943ef25c7bbdf0dd1b9fa91880a6c":[function(require,module,exports) {
"use strict";

var resolve = require('./bundle-manifest').resolve;

module.exports = function (fromId, toId) {
  return relative(dirname(resolve(fromId)), resolve(toId));
};

function dirname(_filePath) {
  if (_filePath === '') {
    return '.';
  }

  var filePath = _filePath[_filePath.length - 1] === '/' ? _filePath.slice(0, _filePath.length - 1) : _filePath;
  var slashIndex = filePath.lastIndexOf('/');
  return slashIndex === -1 ? '.' : filePath.slice(0, slashIndex);
}

function relative(from, to) {
  if (from === to) {
    return '';
  }

  var fromParts = from.split('/');

  if (fromParts[0] === '.') {
    fromParts.shift();
  }

  var toParts = to.split('/');

  if (toParts[0] === '.') {
    toParts.shift();
  } // Find where path segments diverge.


  var i;
  var divergeIndex;

  for (i = 0; (i < toParts.length || i < fromParts.length) && divergeIndex == null; i++) {
    if (fromParts[i] !== toParts[i]) {
      divergeIndex = i;
    }
  } // If there are segments from "from" beyond the point of divergence,
  // return back up the path to that point using "..".


  var parts = [];

  for (i = 0; i < fromParts.length - divergeIndex; i++) {
    parts.push('..');
  } // If there are segments from "to" beyond the point of divergence,
  // continue using the remaining segments.


  if (toParts.length > divergeIndex) {
    parts.push.apply(parts, toParts.slice(divergeIndex));
  }

  return parts.join('/');
}

module.exports._dirname = dirname;
module.exports._relative = relative;
},{"./bundle-manifest":"ba8df6b71e73837c465d69bebde6e64d"}]},{},["19caad876b787b3cd66cc7d25d1f94fa","62ca92ad2fd69bbbeb829c597f20bcec","175e469a7ea7db1c8c0744d04372621f"], null)

//# sourceMappingURL=controller.f1893a8c.js.map