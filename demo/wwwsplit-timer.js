angular.module('wwwsplit-timer.templates', ['timer.tmpl']);
angular.module('timer.tmpl', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('timer.tmpl', '<div class="ng-scope" id="control_nav">\n' + '  <button class="control" id="start" ng-click="start_timer()" ng-disabled="running || is_editing">\n' + '    <i class="icon-play icon-2x icon-white"></i>\n' + '  </button>\n' + '  <button disabled="disabled" class="control" id="reset" ng-click="reset_timer()" ng-disabled="!(running || is_finished)">\n' + '    <i class="icon-refresh icon-2x icon-white"></i>\n' + '  </button>\n' + '  <button disabled="disabled" class="control" id="split" ng-click="split()" ng-disabled="!running">\n' + '    <i class="icon-forward icon-2x icon-white"></i>\n' + '  </button>\n' + '  <button disabled="disabled" class="control" id="unsplit" ng-click="unsplit()" ng-disabled="!running || current_split == current_run.splits[0]">\n' + '    <i class="icon-backward icon-2x icon-white"></i>\n' + '  </button>\n' + '  <button style="display: none;" class="control" id="cancel_edit" ng-click="cancel_edit()" ng-disabled="running || run_editor_form.$invalid" ng-show="is_editing">\n' + '    <i class="icon-ban-circle icon-2x icon-white"></i>\n' + '  </button>\n' + '</div>\n' + '\n' + '<div id=\'current_run\'>\n' + '  <table class=\'table\' id=\'current_run_splits\' ng-class=\'{"table-hover": !running}\'>\n' + '    <tr id=\'current_run_title\'>\n' + '      <th colspan=\'2\'>\n' + '        <h1>\n' + '          {{current_run.title}} #{{current_run.attempts}}\n' + '        </h1>\n' + '        <h4 id=\'current_run_game_title\'>\n' + '          <a ng-href=\'#/games/{{current_run.game.id}}\'>\n' + '            {{current_run.game.title}}\n' + '          </a>\n' + '        </h4>\n' + '      </th>\n' + '    </tr>\n' + '    <tr class=\'current_run_split\' ng-class=\'{active_split: split == current_split}\' ng-repeat=\'split in current_run.splits\'>\n' + '      <td class=\'split_title\'>\n' + '      {{split.title}}\n' + '      </td>\n' + '      <td class=\'split_time\' ng-class=\'{ahead: split.live_data.live_time < split.split_time, behind: split.live_data.live_time > split.split_time,\n' + '      gained_time: split.live_data.segment_diff < 0, lost_time: split.live_data.segment_diff > 0 ,\n' + '      unknown: split.live_data.live_time && !split.live_data.relative_time,\n' + '      best: split.live_data.best_segment}\'>\n' + '        <span>{{split.live_data.relative_time || split.live_data.live_time || split.split_time | milliseconds_to_HMS}}</span>\n' + '      </td>\n' + '    </tr>\n' + '  </table>\n' + '</div>\n' + '\n' + '<div class=\'text-right\' id=\'clock\'>\n' + '  <h1 class=\'clock\'>\n' + '    {{(elapsed_time | milliseconds_to_HMS) || \'\'}}\n' + '  </h1>\n' + '</div>\n' + '\n' + '<div class=\'highchart\' id=\'current_run_chart_data\' ng-model=\'current_run_chart_series\' ng-options=\'current_run_chart_options\'></div>');
  }
]);
(function () {
  angular.module('d3', []).factory('d3Service', [
    '$document',
    '$q',
    '$rootScope',
    function ($document, $q, $rootScope) {
      var d3;
      d3 = void 0;
      d3 = function () {
        function n(n) {
          return null != n && !isNaN(n);
        }
        function t(n) {
          return n.length;
        }
        function e(n) {
          for (var t = 1; n * t % 1;)
            t *= 10;
          return t;
        }
        function r(n, t) {
          try {
            for (var e in t)
              Object.defineProperty(n.prototype, e, {
                value: t[e],
                enumerable: !1
              });
          } catch (r) {
            n.prototype = t;
          }
        }
        function u() {
        }
        function i() {
        }
        function o(n, t, e) {
          return function () {
            var r = e.apply(t, arguments);
            return r === t ? n : r;
          };
        }
        function a(n, t) {
          if (t in n)
            return t;
          t = t.charAt(0).toUpperCase() + t.substring(1);
          for (var e = 0, r = aa.length; r > e; ++e) {
            var u = aa[e] + t;
            if (u in n)
              return u;
          }
        }
        function c() {
        }
        function s() {
        }
        function l(n) {
          function t() {
            for (var t, r = e, u = -1, i = r.length; ++u < i;)
              (t = r[u].on) && t.apply(this, arguments);
            return n;
          }
          var e = [], r = new u();
          return t.on = function (t, u) {
            var i, o = r.get(t);
            return arguments.length < 2 ? o && o.on : (o && (o.on = null, e = e.slice(0, i = e.indexOf(o)).concat(e.slice(i + 1)), r.remove(t)), u && e.push(r.set(t, { on: u })), n);
          }, t;
        }
        function f() {
          Zo.event.preventDefault();
        }
        function h() {
          for (var n, t = Zo.event; n = t.sourceEvent;)
            t = n;
          return t;
        }
        function g(n) {
          for (var t = new s(), e = 0, r = arguments.length; ++e < r;)
            t[arguments[e]] = l(t);
          return t.of = function (e, r) {
            return function (u) {
              try {
                var i = u.sourceEvent = Zo.event;
                u.target = n, Zo.event = u, t[u.type].apply(e, r);
              } finally {
                Zo.event = i;
              }
            };
          }, t;
        }
        function p(n) {
          return sa(n, pa), n;
        }
        function v(n) {
          return 'function' == typeof n ? n : function () {
            return la(n, this);
          };
        }
        function d(n) {
          return 'function' == typeof n ? n : function () {
            return fa(n, this);
          };
        }
        function m(n, t) {
          function e() {
            this.removeAttribute(n);
          }
          function r() {
            this.removeAttributeNS(n.space, n.local);
          }
          function u() {
            this.setAttribute(n, t);
          }
          function i() {
            this.setAttributeNS(n.space, n.local, t);
          }
          function o() {
            var e = t.apply(this, arguments);
            null == e ? this.removeAttribute(n) : this.setAttribute(n, e);
          }
          function a() {
            var e = t.apply(this, arguments);
            null == e ? this.removeAttributeNS(n.space, n.local) : this.setAttributeNS(n.space, n.local, e);
          }
          return n = Zo.ns.qualify(n), null == t ? n.local ? r : e : 'function' == typeof t ? n.local ? a : o : n.local ? i : u;
        }
        function y(n) {
          return n.trim().replace(/\s+/g, ' ');
        }
        function x(n) {
          return new RegExp('(?:^|\\s+)' + Zo.requote(n) + '(?:\\s+|$)', 'g');
        }
        function M(n, t) {
          function e() {
            for (var e = -1; ++e < u;)
              n[e](this, t);
          }
          function r() {
            for (var e = -1, r = t.apply(this, arguments); ++e < u;)
              n[e](this, r);
          }
          n = n.trim().split(/\s+/).map(_);
          var u = n.length;
          return 'function' == typeof t ? r : e;
        }
        function _(n) {
          var t = x(n);
          return function (e, r) {
            if (u = e.classList)
              return r ? u.add(n) : u.remove(n);
            var u = e.getAttribute('class') || '';
            r ? (t.lastIndex = 0, t.test(u) || e.setAttribute('class', y(u + ' ' + n))) : e.setAttribute('class', y(u.replace(t, ' ')));
          };
        }
        function b(n, t, e) {
          function r() {
            this.style.removeProperty(n);
          }
          function u() {
            this.style.setProperty(n, t, e);
          }
          function i() {
            var r = t.apply(this, arguments);
            null == r ? this.style.removeProperty(n) : this.style.setProperty(n, r, e);
          }
          return null == t ? r : 'function' == typeof t ? i : u;
        }
        function w(n, t) {
          function e() {
            delete this[n];
          }
          function r() {
            this[n] = t;
          }
          function u() {
            var e = t.apply(this, arguments);
            null == e ? delete this[n] : this[n] = e;
          }
          return null == t ? e : 'function' == typeof t ? u : r;
        }
        function S(n) {
          return 'function' == typeof n ? n : (n = Zo.ns.qualify(n)).local ? function () {
            return this.ownerDocument.createElementNS(n.space, n.local);
          } : function () {
            return this.ownerDocument.createElementNS(this.namespaceURI, n);
          };
        }
        function k(n) {
          return { __data__: n };
        }
        function E(n) {
          return function () {
            return ga(this, n);
          };
        }
        function A(n) {
          return arguments.length || (n = Zo.ascending), function (t, e) {
            return t && e ? n(t.__data__, e.__data__) : !t - !e;
          };
        }
        function C(n, t) {
          for (var e = 0, r = n.length; r > e; e++)
            for (var u, i = n[e], o = 0, a = i.length; a > o; o++)
              (u = i[o]) && t(u, o, e);
          return n;
        }
        function N(n) {
          return sa(n, da), n;
        }
        function L(n) {
          var t, e;
          return function (r, u, i) {
            var o, a = n[i].update, c = a.length;
            for (i != e && (e = i, t = 0), u >= t && (t = u + 1); !(o = a[t]) && ++t < c;);
            return o;
          };
        }
        function T() {
          var n = this.__transition__;
          n && ++n.active;
        }
        function q(n, t, e) {
          function r() {
            var t = this[o];
            t && (this.removeEventListener(n, t, t.$), delete this[o]);
          }
          function u() {
            var u = s(t, Xo(arguments));
            r.call(this), this.addEventListener(n, this[o] = u, u.$ = e), u._ = t;
          }
          function i() {
            var t, e = new RegExp('^__on([^.]+)' + Zo.requote(n) + '$');
            for (var r in this)
              if (t = r.match(e)) {
                var u = this[r];
                this.removeEventListener(t[1], u, u.$), delete this[r];
              }
          }
          var o = '__on' + n, a = n.indexOf('.'), s = z;
          a > 0 && (n = n.substring(0, a));
          var l = ya.get(n);
          return l && (n = l, s = R), a ? t ? u : r : t ? c : i;
        }
        function z(n, t) {
          return function (e) {
            var r = Zo.event;
            Zo.event = e, t[0] = this.__data__;
            try {
              n.apply(this, t);
            } finally {
              Zo.event = r;
            }
          };
        }
        function R(n, t) {
          var e = z(n, t);
          return function (n) {
            var t = this, r = n.relatedTarget;
            r && (r === t || 8 & r.compareDocumentPosition(t)) || e.call(t, n);
          };
        }
        function D() {
          var n = '.dragsuppress-' + ++Ma, t = 'touchmove' + n, e = 'selectstart' + n, r = 'dragstart' + n, u = 'click' + n, i = Zo.select(Wo).on(t, f).on(e, f).on(r, f), o = Bo.style, a = o[xa];
          return o[xa] = 'none', function (t) {
            function e() {
              i.on(u, null);
            }
            i.on(n, null), o[xa] = a, t && (i.on(u, function () {
              f(), e();
            }, !0), setTimeout(e, 0));
          };
        }
        function P(n, t) {
          t.changedTouches && (t = t.changedTouches[0]);
          var e = n.ownerSVGElement || n;
          if (e.createSVGPoint) {
            var r = e.createSVGPoint();
            if (0 > _a && (Wo.scrollX || Wo.scrollY)) {
              e = Zo.select('body').append('svg').style({
                position: 'absolute',
                top: 0,
                left: 0,
                margin: 0,
                padding: 0,
                border: 'none'
              }, 'important');
              var u = e[0][0].getScreenCTM();
              _a = !(u.f || u.e), e.remove();
            }
            return _a ? (r.x = t.pageX, r.y = t.pageY) : (r.x = t.clientX, r.y = t.clientY), r = r.matrixTransform(n.getScreenCTM().inverse()), [
              r.x,
              r.y
            ];
          }
          var i = n.getBoundingClientRect();
          return [
            t.clientX - i.left - n.clientLeft,
            t.clientY - i.top - n.clientTop
          ];
        }
        function U(n) {
          return n > 0 ? 1 : 0 > n ? -1 : 0;
        }
        function j(n) {
          return n > 1 ? 0 : -1 > n ? ba : Math.acos(n);
        }
        function H(n) {
          return n > 1 ? Sa : -1 > n ? -Sa : Math.asin(n);
        }
        function F(n) {
          return ((n = Math.exp(n)) - 1 / n) / 2;
        }
        function O(n) {
          return ((n = Math.exp(n)) + 1 / n) / 2;
        }
        function Y(n) {
          return ((n = Math.exp(2 * n)) - 1) / (n + 1);
        }
        function I(n) {
          return (n = Math.sin(n / 2)) * n;
        }
        function Z() {
        }
        function V(n, t, e) {
          return new X(n, t, e);
        }
        function X(n, t, e) {
          this.h = n, this.s = t, this.l = e;
        }
        function $(n, t, e) {
          function r(n) {
            return n > 360 ? n -= 360 : 0 > n && (n += 360), 60 > n ? i + (o - i) * n / 60 : 180 > n ? o : 240 > n ? i + (o - i) * (240 - n) / 60 : i;
          }
          function u(n) {
            return Math.round(255 * r(n));
          }
          var i, o;
          return n = isNaN(n) ? 0 : (n %= 360) < 0 ? n + 360 : n, t = isNaN(t) ? 0 : 0 > t ? 0 : t > 1 ? 1 : t, e = 0 > e ? 0 : e > 1 ? 1 : e, o = 0.5 >= e ? e * (1 + t) : e + t - e * t, i = 2 * e - o, ot(u(n + 120), u(n), u(n - 120));
        }
        function B(n, t, e) {
          return new W(n, t, e);
        }
        function W(n, t, e) {
          this.h = n, this.c = t, this.l = e;
        }
        function J(n, t, e) {
          return isNaN(n) && (n = 0), isNaN(t) && (t = 0), G(e, Math.cos(n *= Aa) * t, Math.sin(n) * t);
        }
        function G(n, t, e) {
          return new K(n, t, e);
        }
        function K(n, t, e) {
          this.l = n, this.a = t, this.b = e;
        }
        function Q(n, t, e) {
          var r = (n + 16) / 116, u = r + t / 500, i = r - e / 200;
          return u = tt(u) * ja, r = tt(r) * Ha, i = tt(i) * Fa, ot(rt(3.2404542 * u - 1.5371385 * r - 0.4985314 * i), rt(-0.969266 * u + 1.8760108 * r + 0.041556 * i), rt(0.0556434 * u - 0.2040259 * r + 1.0572252 * i));
        }
        function nt(n, t, e) {
          return n > 0 ? B(Math.atan2(e, t) * Ca, Math.sqrt(t * t + e * e), n) : B(0 / 0, 0 / 0, n);
        }
        function tt(n) {
          return n > 0.206893034 ? n * n * n : (n - 4 / 29) / 7.787037;
        }
        function et(n) {
          return n > 0.008856 ? Math.pow(n, 1 / 3) : 7.787037 * n + 4 / 29;
        }
        function rt(n) {
          return Math.round(255 * (0.00304 >= n ? 12.92 * n : 1.055 * Math.pow(n, 1 / 2.4) - 0.055));
        }
        function ut(n) {
          return ot(n >> 16, 255 & n >> 8, 255 & n);
        }
        function it(n) {
          return ut(n) + '';
        }
        function ot(n, t, e) {
          return new at(n, t, e);
        }
        function at(n, t, e) {
          this.r = n, this.g = t, this.b = e;
        }
        function ct(n) {
          return 16 > n ? '0' + Math.max(0, n).toString(16) : Math.min(255, n).toString(16);
        }
        function st(n, t, e) {
          var r, u, i, o = 0, a = 0, c = 0;
          if (r = /([a-z]+)\((.*)\)/i.exec(n))
            switch (u = r[2].split(','), r[1]) {
            case 'hsl':
              return e(parseFloat(u[0]), parseFloat(u[1]) / 100, parseFloat(u[2]) / 100);
            case 'rgb':
              return t(gt(u[0]), gt(u[1]), gt(u[2]));
            }
          return (i = Ia.get(n)) ? t(i.r, i.g, i.b) : (null != n && '#' === n.charAt(0) && (4 === n.length ? (o = n.charAt(1), o += o, a = n.charAt(2), a += a, c = n.charAt(3), c += c) : 7 === n.length && (o = n.substring(1, 3), a = n.substring(3, 5), c = n.substring(5, 7)), o = parseInt(o, 16), a = parseInt(a, 16), c = parseInt(c, 16)), t(o, a, c));
        }
        function lt(n, t, e) {
          var r, u, i = Math.min(n /= 255, t /= 255, e /= 255), o = Math.max(n, t, e), a = o - i, c = (o + i) / 2;
          return a ? (u = 0.5 > c ? a / (o + i) : a / (2 - o - i), r = n == o ? (t - e) / a + (e > t ? 6 : 0) : t == o ? (e - n) / a + 2 : (n - t) / a + 4, r *= 60) : (r = 0 / 0, u = c > 0 && 1 > c ? 0 : r), V(r, u, c);
        }
        function ft(n, t, e) {
          n = ht(n), t = ht(t), e = ht(e);
          var r = et((0.4124564 * n + 0.3575761 * t + 0.1804375 * e) / ja), u = et((0.2126729 * n + 0.7151522 * t + 0.072175 * e) / Ha), i = et((0.0193339 * n + 0.119192 * t + 0.9503041 * e) / Fa);
          return G(116 * u - 16, 500 * (r - u), 200 * (u - i));
        }
        function ht(n) {
          return (n /= 255) <= 0.04045 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
        }
        function gt(n) {
          var t = parseFloat(n);
          return '%' === n.charAt(n.length - 1) ? Math.round(2.55 * t) : t;
        }
        function pt(n) {
          return 'function' == typeof n ? n : function () {
            return n;
          };
        }
        function vt(n) {
          return n;
        }
        function dt(n) {
          return function (t, e, r) {
            return 2 === arguments.length && 'function' == typeof e && (r = e, e = null), mt(t, e, n, r);
          };
        }
        function mt(n, t, e, r) {
          function u() {
            var n, t = c.status;
            if (!t && c.responseText || t >= 200 && 300 > t || 304 === t) {
              try {
                n = e.call(i, c);
              } catch (r) {
                return o.error.call(i, r), void 0;
              }
              o.load.call(i, n);
            } else
              o.error.call(i, c);
          }
          var i = {}, o = Zo.dispatch('beforesend', 'progress', 'load', 'error'), a = {}, c = new XMLHttpRequest(), s = null;
          return !Wo.XDomainRequest || 'withCredentials' in c || !/^(http(s)?:)?\/\//.test(n) || (c = new XDomainRequest()), 'onload' in c ? c.onload = c.onerror = u : c.onreadystatechange = function () {
            c.readyState > 3 && u();
          }, c.onprogress = function (n) {
            var t = Zo.event;
            Zo.event = n;
            try {
              o.progress.call(i, c);
            } finally {
              Zo.event = t;
            }
          }, i.header = function (n, t) {
            return n = (n + '').toLowerCase(), arguments.length < 2 ? a[n] : (null == t ? delete a[n] : a[n] = t + '', i);
          }, i.mimeType = function (n) {
            return arguments.length ? (t = null == n ? null : n + '', i) : t;
          }, i.responseType = function (n) {
            return arguments.length ? (s = n, i) : s;
          }, i.response = function (n) {
            return e = n, i;
          }, [
            'get',
            'post'
          ].forEach(function (n) {
            i[n] = function () {
              return i.send.apply(i, [n].concat(Xo(arguments)));
            };
          }), i.send = function (e, r, u) {
            if (2 === arguments.length && 'function' == typeof r && (u = r, r = null), c.open(e, n, !0), null == t || 'accept' in a || (a.accept = t + ',*/*'), c.setRequestHeader)
              for (var l in a)
                c.setRequestHeader(l, a[l]);
            return null != t && c.overrideMimeType && c.overrideMimeType(t), null != s && (c.responseType = s), null != u && i.on('error', u).on('load', function (n) {
              u(null, n);
            }), o.beforesend.call(i, c), c.send(null == r ? null : r), i;
          }, i.abort = function () {
            return c.abort(), i;
          }, Zo.rebind(i, o, 'on'), null == r ? i : i.get(yt(r));
        }
        function yt(n) {
          return 1 === n.length ? function (t, e) {
            n(null == t ? e : null);
          } : n;
        }
        function xt() {
          var n = Mt(), t = _t() - n;
          t > 24 ? (isFinite(t) && (clearTimeout($a), $a = setTimeout(xt, t)), Xa = 0) : (Xa = 1, Wa(xt));
        }
        function Mt() {
          var n = Date.now();
          for (Ba = Za; Ba;)
            n >= Ba.t && (Ba.f = Ba.c(n - Ba.t)), Ba = Ba.n;
          return n;
        }
        function _t() {
          for (var n, t = Za, e = 1 / 0; t;)
            t.f ? t = n ? n.n = t.n : Za = t.n : (t.t < e && (e = t.t), t = (n = t).n);
          return Va = n, e;
        }
        function bt(n, t) {
          var e = Math.pow(10, 3 * ua(8 - t));
          return {
            scale: t > 8 ? function (n) {
              return n / e;
            } : function (n) {
              return n * e;
            },
            symbol: n
          };
        }
        function wt(n, t) {
          return t - (n ? Math.ceil(Math.log(n) / Math.LN10) : 1);
        }
        function St(n) {
          return n + '';
        }
        function kt() {
        }
        function Et(n, t, e) {
          var r = e.s = n + t, u = r - n, i = r - u;
          e.t = n - i + (t - u);
        }
        function At(n, t) {
          n && ac.hasOwnProperty(n.type) && ac[n.type](n, t);
        }
        function Ct(n, t, e) {
          var r, u = -1, i = n.length - e;
          for (t.lineStart(); ++u < i;)
            r = n[u], t.point(r[0], r[1], r[2]);
          t.lineEnd();
        }
        function Nt(n, t) {
          var e = -1, r = n.length;
          for (t.polygonStart(); ++e < r;)
            Ct(n[e], t, 1);
          t.polygonEnd();
        }
        function Lt() {
          function n(n, t) {
            n *= Aa, t = t * Aa / 2 + ba / 4;
            var e = n - r, o = Math.cos(t), a = Math.sin(t), c = i * a, s = u * o + c * Math.cos(e), l = c * Math.sin(e);
            sc.add(Math.atan2(l, s)), r = n, u = o, i = a;
          }
          var t, e, r, u, i;
          lc.point = function (o, a) {
            lc.point = n, r = (t = o) * Aa, u = Math.cos(a = (e = a) * Aa / 2 + ba / 4), i = Math.sin(a);
          }, lc.lineEnd = function () {
            n(t, e);
          };
        }
        function Tt(n) {
          var t = n[0], e = n[1], r = Math.cos(e);
          return [
            r * Math.cos(t),
            r * Math.sin(t),
            Math.sin(e)
          ];
        }
        function qt(n, t) {
          return n[0] * t[0] + n[1] * t[1] + n[2] * t[2];
        }
        function zt(n, t) {
          return [
            n[1] * t[2] - n[2] * t[1],
            n[2] * t[0] - n[0] * t[2],
            n[0] * t[1] - n[1] * t[0]
          ];
        }
        function Rt(n, t) {
          n[0] += t[0], n[1] += t[1], n[2] += t[2];
        }
        function Dt(n, t) {
          return [
            n[0] * t,
            n[1] * t,
            n[2] * t
          ];
        }
        function Pt(n) {
          var t = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
          n[0] /= t, n[1] /= t, n[2] /= t;
        }
        function Ut(n) {
          return [
            Math.atan2(n[1], n[0]),
            H(n[2])
          ];
        }
        function jt(n, t) {
          return ua(n[0] - t[0]) < ka && ua(n[1] - t[1]) < ka;
        }
        function Ht(n, t) {
          n *= Aa;
          var e = Math.cos(t *= Aa);
          Ft(e * Math.cos(n), e * Math.sin(n), Math.sin(t));
        }
        function Ft(n, t, e) {
          ++fc, gc += (n - gc) / fc, pc += (t - pc) / fc, vc += (e - vc) / fc;
        }
        function Ot() {
          function n(n, u) {
            n *= Aa;
            var i = Math.cos(u *= Aa), o = i * Math.cos(n), a = i * Math.sin(n), c = Math.sin(u), s = Math.atan2(Math.sqrt((s = e * c - r * a) * s + (s = r * o - t * c) * s + (s = t * a - e * o) * s), t * o + e * a + r * c);
            hc += s, dc += s * (t + (t = o)), mc += s * (e + (e = a)), yc += s * (r + (r = c)), Ft(t, e, r);
          }
          var t, e, r;
          bc.point = function (u, i) {
            u *= Aa;
            var o = Math.cos(i *= Aa);
            t = o * Math.cos(u), e = o * Math.sin(u), r = Math.sin(i), bc.point = n, Ft(t, e, r);
          };
        }
        function Yt() {
          bc.point = Ht;
        }
        function It() {
          function n(n, t) {
            n *= Aa;
            var e = Math.cos(t *= Aa), o = e * Math.cos(n), a = e * Math.sin(n), c = Math.sin(t), s = u * c - i * a, l = i * o - r * c, f = r * a - u * o, h = Math.sqrt(s * s + l * l + f * f), g = r * o + u * a + i * c, p = h && -j(g) / h, v = Math.atan2(h, g);
            xc += p * s, Mc += p * l, _c += p * f, hc += v, dc += v * (r + (r = o)), mc += v * (u + (u = a)), yc += v * (i + (i = c)), Ft(r, u, i);
          }
          var t, e, r, u, i;
          bc.point = function (o, a) {
            t = o, e = a, bc.point = n, o *= Aa;
            var c = Math.cos(a *= Aa);
            r = c * Math.cos(o), u = c * Math.sin(o), i = Math.sin(a), Ft(r, u, i);
          }, bc.lineEnd = function () {
            n(t, e), bc.lineEnd = Yt, bc.point = Ht;
          };
        }
        function Zt() {
          return !0;
        }
        function Vt(n, t, e, r, u) {
          var i = [], o = [];
          if (n.forEach(function (n) {
              if (!((t = n.length - 1) <= 0)) {
                var t, e = n[0], r = n[t];
                if (jt(e, r)) {
                  u.lineStart();
                  for (var a = 0; t > a; ++a)
                    u.point((e = n[a])[0], e[1]);
                  return u.lineEnd(), void 0;
                }
                var c = new $t(e, n, null, !0), s = new $t(e, null, c, !1);
                c.o = s, i.push(c), o.push(s), c = new $t(r, n, null, !1), s = new $t(r, null, c, !0), c.o = s, i.push(c), o.push(s);
              }
            }), o.sort(t), Xt(i), Xt(o), i.length) {
            for (var a = 0, c = e, s = o.length; s > a; ++a)
              o[a].e = c = !c;
            for (var l, f, h = i[0];;) {
              for (var g = h, p = !0; g.v;)
                if ((g = g.n) === h)
                  return;
              l = g.z, u.lineStart();
              do {
                if (g.v = g.o.v = !0, g.e) {
                  if (p)
                    for (var a = 0, s = l.length; s > a; ++a)
                      u.point((f = l[a])[0], f[1]);
                  else
                    r(g.x, g.n.x, 1, u);
                  g = g.n;
                } else {
                  if (p) {
                    l = g.p.z;
                    for (var a = l.length - 1; a >= 0; --a)
                      u.point((f = l[a])[0], f[1]);
                  } else
                    r(g.x, g.p.x, -1, u);
                  g = g.p;
                }
                g = g.o, l = g.z, p = !p;
              } while (!g.v);
              u.lineEnd();
            }
          }
        }
        function Xt(n) {
          if (t = n.length) {
            for (var t, e, r = 0, u = n[0]; ++r < t;)
              u.n = e = n[r], e.p = u, u = e;
            u.n = e = n[0], e.p = u;
          }
        }
        function $t(n, t, e, r) {
          this.x = n, this.z = t, this.o = e, this.e = r, this.v = !1, this.n = this.p = null;
        }
        function Bt(n, t, e, r) {
          return function (u, i) {
            function o(t, e) {
              var r = u(t, e);
              n(t = r[0], e = r[1]) && i.point(t, e);
            }
            function a(n, t) {
              var e = u(n, t);
              d.point(e[0], e[1]);
            }
            function c() {
              y.point = a, d.lineStart();
            }
            function s() {
              y.point = o, d.lineEnd();
            }
            function l(n, t) {
              v.push([
                n,
                t
              ]);
              var e = u(n, t);
              M.point(e[0], e[1]);
            }
            function f() {
              M.lineStart(), v = [];
            }
            function h() {
              l(v[0][0], v[0][1]), M.lineEnd();
              var n, t = M.clean(), e = x.buffer(), r = e.length;
              if (v.pop(), p.push(v), v = null, r) {
                if (1 & t) {
                  n = e[0];
                  var u, r = n.length - 1, o = -1;
                  for (i.lineStart(); ++o < r;)
                    i.point((u = n[o])[0], u[1]);
                  return i.lineEnd(), void 0;
                }
                r > 1 && 2 & t && e.push(e.pop().concat(e.shift())), g.push(e.filter(Wt));
              }
            }
            var g, p, v, d = t(i), m = u.invert(r[0], r[1]), y = {
                point: o,
                lineStart: c,
                lineEnd: s,
                polygonStart: function () {
                  y.point = l, y.lineStart = f, y.lineEnd = h, g = [], p = [], i.polygonStart();
                },
                polygonEnd: function () {
                  y.point = o, y.lineStart = c, y.lineEnd = s, g = Zo.merge(g);
                  var n = Kt(m, p);
                  g.length ? Vt(g, Gt, n, e, i) : n && (i.lineStart(), e(null, null, 1, i), i.lineEnd()), i.polygonEnd(), g = p = null;
                },
                sphere: function () {
                  i.polygonStart(), i.lineStart(), e(null, null, 1, i), i.lineEnd(), i.polygonEnd();
                }
              }, x = Jt(), M = t(x);
            return y;
          };
        }
        function Wt(n) {
          return n.length > 1;
        }
        function Jt() {
          var n, t = [];
          return {
            lineStart: function () {
              t.push(n = []);
            },
            point: function (t, e) {
              n.push([
                t,
                e
              ]);
            },
            lineEnd: c,
            buffer: function () {
              var e = t;
              return t = [], n = null, e;
            },
            rejoin: function () {
              t.length > 1 && t.push(t.pop().concat(t.shift()));
            }
          };
        }
        function Gt(n, t) {
          return ((n = n.x)[0] < 0 ? n[1] - Sa - ka : Sa - n[1]) - ((t = t.x)[0] < 0 ? t[1] - Sa - ka : Sa - t[1]);
        }
        function Kt(n, t) {
          var e = n[0], r = n[1], u = [
              Math.sin(e),
              -Math.cos(e),
              0
            ], i = 0, o = 0;
          sc.reset();
          for (var a = 0, c = t.length; c > a; ++a) {
            var s = t[a], l = s.length;
            if (l)
              for (var f = s[0], h = f[0], g = f[1] / 2 + ba / 4, p = Math.sin(g), v = Math.cos(g), d = 1;;) {
                d === l && (d = 0), n = s[d];
                var m = n[0], y = n[1] / 2 + ba / 4, x = Math.sin(y), M = Math.cos(y), _ = m - h, b = ua(_) > ba, w = p * x;
                if (sc.add(Math.atan2(w * Math.sin(_), v * M + w * Math.cos(_))), i += b ? _ + (_ >= 0 ? wa : -wa) : _, b ^ h >= e ^ m >= e) {
                  var S = zt(Tt(f), Tt(n));
                  Pt(S);
                  var k = zt(u, S);
                  Pt(k);
                  var E = (b ^ _ >= 0 ? -1 : 1) * H(k[2]);
                  (r > E || r === E && (S[0] || S[1])) && (o += b ^ _ >= 0 ? 1 : -1);
                }
                if (!d++)
                  break;
                h = m, p = x, v = M, f = n;
              }
          }
          return (-ka > i || ka > i && 0 > sc) ^ 1 & o;
        }
        function Qt(n) {
          var t, e = 0 / 0, r = 0 / 0, u = 0 / 0;
          return {
            lineStart: function () {
              n.lineStart(), t = 1;
            },
            point: function (i, o) {
              var a = i > 0 ? ba : -ba, c = ua(i - e);
              ua(c - ba) < ka ? (n.point(e, r = (r + o) / 2 > 0 ? Sa : -Sa), n.point(u, r), n.lineEnd(), n.lineStart(), n.point(a, r), n.point(i, r), t = 0) : u !== a && c >= ba && (ua(e - u) < ka && (e -= u * ka), ua(i - a) < ka && (i -= a * ka), r = ne(e, r, i, o), n.point(u, r), n.lineEnd(), n.lineStart(), n.point(a, r), t = 0), n.point(e = i, r = o), u = a;
            },
            lineEnd: function () {
              n.lineEnd(), e = r = 0 / 0;
            },
            clean: function () {
              return 2 - t;
            }
          };
        }
        function ne(n, t, e, r) {
          var u, i, o = Math.sin(n - e);
          return ua(o) > ka ? Math.atan((Math.sin(t) * (i = Math.cos(r)) * Math.sin(e) - Math.sin(r) * (u = Math.cos(t)) * Math.sin(n)) / (u * i * o)) : (t + r) / 2;
        }
        function te(n, t, e, r) {
          var u;
          if (null == n)
            u = e * Sa, r.point(-ba, u), r.point(0, u), r.point(ba, u), r.point(ba, 0), r.point(ba, -u), r.point(0, -u), r.point(-ba, -u), r.point(-ba, 0), r.point(-ba, u);
          else if (ua(n[0] - t[0]) > ka) {
            var i = n[0] < t[0] ? ba : -ba;
            u = e * i / 2, r.point(-i, u), r.point(0, u), r.point(i, u);
          } else
            r.point(t[0], t[1]);
        }
        function ee(n) {
          function t(n, t) {
            return Math.cos(n) * Math.cos(t) > i;
          }
          function e(n) {
            var e, i, c, s, l;
            return {
              lineStart: function () {
                s = c = !1, l = 1;
              },
              point: function (f, h) {
                var g, p = [
                    f,
                    h
                  ], v = t(f, h), d = o ? v ? 0 : u(f, h) : v ? u(f + (0 > f ? ba : -ba), h) : 0;
                if (!e && (s = c = v) && n.lineStart(), v !== c && (g = r(e, p), (jt(e, g) || jt(p, g)) && (p[0] += ka, p[1] += ka, v = t(p[0], p[1]))), v !== c)
                  l = 0, v ? (n.lineStart(), g = r(p, e), n.point(g[0], g[1])) : (g = r(e, p), n.point(g[0], g[1]), n.lineEnd()), e = g;
                else if (a && e && o ^ v) {
                  var m;
                  d & i || !(m = r(p, e, !0)) || (l = 0, o ? (n.lineStart(), n.point(m[0][0], m[0][1]), n.point(m[1][0], m[1][1]), n.lineEnd()) : (n.point(m[1][0], m[1][1]), n.lineEnd(), n.lineStart(), n.point(m[0][0], m[0][1])));
                }
                !v || e && jt(e, p) || n.point(p[0], p[1]), e = p, c = v, i = d;
              },
              lineEnd: function () {
                c && n.lineEnd(), e = null;
              },
              clean: function () {
                return l | (s && c) << 1;
              }
            };
          }
          function r(n, t, e) {
            var r = Tt(n), u = Tt(t), o = [
                1,
                0,
                0
              ], a = zt(r, u), c = qt(a, a), s = a[0], l = c - s * s;
            if (!l)
              return !e && n;
            var f = i * c / l, h = -i * s / l, g = zt(o, a), p = Dt(o, f), v = Dt(a, h);
            Rt(p, v);
            var d = g, m = qt(p, d), y = qt(d, d), x = m * m - y * (qt(p, p) - 1);
            if (!(0 > x)) {
              var M = Math.sqrt(x), _ = Dt(d, (-m - M) / y);
              if (Rt(_, p), _ = Ut(_), !e)
                return _;
              var b, w = n[0], S = t[0], k = n[1], E = t[1];
              w > S && (b = w, w = S, S = b);
              var A = S - w, C = ua(A - ba) < ka, N = C || ka > A;
              if (!C && k > E && (b = k, k = E, E = b), N ? C ? k + E > 0 ^ _[1] < (ua(_[0] - w) < ka ? k : E) : k <= _[1] && _[1] <= E : A > ba ^ (w <= _[0] && _[0] <= S)) {
                var L = Dt(d, (-m + M) / y);
                return Rt(L, p), [
                  _,
                  Ut(L)
                ];
              }
            }
          }
          function u(t, e) {
            var r = o ? n : ba - n, u = 0;
            return -r > t ? u |= 1 : t > r && (u |= 2), -r > e ? u |= 4 : e > r && (u |= 8), u;
          }
          var i = Math.cos(n), o = i > 0, a = ua(i) > ka, c = Ne(n, 6 * Aa);
          return Bt(t, e, c, o ? [
            0,
            -n
          ] : [
            -ba,
            n - ba
          ]);
        }
        function re(n, t, e, r) {
          return function (u) {
            var i, o = u.a, a = u.b, c = o.x, s = o.y, l = a.x, f = a.y, h = 0, g = 1, p = l - c, v = f - s;
            if (i = n - c, p || !(i > 0)) {
              if (i /= p, 0 > p) {
                if (h > i)
                  return;
                g > i && (g = i);
              } else if (p > 0) {
                if (i > g)
                  return;
                i > h && (h = i);
              }
              if (i = e - c, p || !(0 > i)) {
                if (i /= p, 0 > p) {
                  if (i > g)
                    return;
                  i > h && (h = i);
                } else if (p > 0) {
                  if (h > i)
                    return;
                  g > i && (g = i);
                }
                if (i = t - s, v || !(i > 0)) {
                  if (i /= v, 0 > v) {
                    if (h > i)
                      return;
                    g > i && (g = i);
                  } else if (v > 0) {
                    if (i > g)
                      return;
                    i > h && (h = i);
                  }
                  if (i = r - s, v || !(0 > i)) {
                    if (i /= v, 0 > v) {
                      if (i > g)
                        return;
                      i > h && (h = i);
                    } else if (v > 0) {
                      if (h > i)
                        return;
                      g > i && (g = i);
                    }
                    return h > 0 && (u.a = {
                      x: c + h * p,
                      y: s + h * v
                    }), 1 > g && (u.b = {
                      x: c + g * p,
                      y: s + g * v
                    }), u;
                  }
                }
              }
            }
          };
        }
        function ue(n, t, e, r) {
          function u(r, u) {
            return ua(r[0] - n) < ka ? u > 0 ? 0 : 3 : ua(r[0] - e) < ka ? u > 0 ? 2 : 1 : ua(r[1] - t) < ka ? u > 0 ? 1 : 0 : u > 0 ? 3 : 2;
          }
          function i(n, t) {
            return o(n.x, t.x);
          }
          function o(n, t) {
            var e = u(n, 1), r = u(t, 1);
            return e !== r ? e - r : 0 === e ? t[1] - n[1] : 1 === e ? n[0] - t[0] : 2 === e ? n[1] - t[1] : t[0] - n[0];
          }
          return function (a) {
            function c(n) {
              for (var t = 0, e = m.length, r = n[1], u = 0; e > u; ++u)
                for (var i, o = 1, a = m[u], c = a.length, l = a[0]; c > o; ++o)
                  i = a[o], l[1] <= r ? i[1] > r && s(l, i, n) > 0 && ++t : i[1] <= r && s(l, i, n) < 0 && --t, l = i;
              return 0 !== t;
            }
            function s(n, t, e) {
              return (t[0] - n[0]) * (e[1] - n[1]) - (e[0] - n[0]) * (t[1] - n[1]);
            }
            function l(i, a, c, s) {
              var l = 0, f = 0;
              if (null == i || (l = u(i, c)) !== (f = u(a, c)) || o(i, a) < 0 ^ c > 0) {
                do
                  s.point(0 === l || 3 === l ? n : e, l > 1 ? r : t);
                while ((l = (l + c + 4) % 4) !== f);
              } else
                s.point(a[0], a[1]);
            }
            function f(u, i) {
              return u >= n && e >= u && i >= t && r >= i;
            }
            function h(n, t) {
              f(n, t) && a.point(n, t);
            }
            function g() {
              L.point = v, m && m.push(y = []), k = !0, S = !1, b = w = 0 / 0;
            }
            function p() {
              d && (v(x, M), _ && S && C.rejoin(), d.push(C.buffer())), L.point = h, S && a.lineEnd();
            }
            function v(n, t) {
              n = Math.max(-Sc, Math.min(Sc, n)), t = Math.max(-Sc, Math.min(Sc, t));
              var e = f(n, t);
              if (m && y.push([
                  n,
                  t
                ]), k)
                x = n, M = t, _ = e, k = !1, e && (a.lineStart(), a.point(n, t));
              else if (e && S)
                a.point(n, t);
              else {
                var r = {
                    a: {
                      x: b,
                      y: w
                    },
                    b: {
                      x: n,
                      y: t
                    }
                  };
                N(r) ? (S || (a.lineStart(), a.point(r.a.x, r.a.y)), a.point(r.b.x, r.b.y), e || a.lineEnd(), E = !1) : e && (a.lineStart(), a.point(n, t), E = !1);
              }
              b = n, w = t, S = e;
            }
            var d, m, y, x, M, _, b, w, S, k, E, A = a, C = Jt(), N = re(n, t, e, r), L = {
                point: h,
                lineStart: g,
                lineEnd: p,
                polygonStart: function () {
                  a = C, d = [], m = [], E = !0;
                },
                polygonEnd: function () {
                  a = A, d = Zo.merge(d);
                  var t = c([
                      n,
                      r
                    ]), e = E && t, u = d.length;
                  (e || u) && (a.polygonStart(), e && (a.lineStart(), l(null, null, 1, a), a.lineEnd()), u && Vt(d, i, t, l, a), a.polygonEnd()), d = m = y = null;
                }
              };
            return L;
          };
        }
        function ie(n, t) {
          function e(e, r) {
            return e = n(e, r), t(e[0], e[1]);
          }
          return n.invert && t.invert && (e.invert = function (e, r) {
            return e = t.invert(e, r), e && n.invert(e[0], e[1]);
          }), e;
        }
        function oe(n) {
          var t = 0, e = ba / 3, r = _e(n), u = r(t, e);
          return u.parallels = function (n) {
            return arguments.length ? r(t = n[0] * ba / 180, e = n[1] * ba / 180) : [
              180 * (t / ba),
              180 * (e / ba)
            ];
          }, u;
        }
        function ae(n, t) {
          function e(n, t) {
            var e = Math.sqrt(i - 2 * u * Math.sin(t)) / u;
            return [
              e * Math.sin(n *= u),
              o - e * Math.cos(n)
            ];
          }
          var r = Math.sin(n), u = (r + Math.sin(t)) / 2, i = 1 + r * (2 * u - r), o = Math.sqrt(i) / u;
          return e.invert = function (n, t) {
            var e = o - t;
            return [
              Math.atan2(n, e) / u,
              H((i - (n * n + e * e) * u * u) / (2 * u))
            ];
          }, e;
        }
        function ce() {
          function n(n, t) {
            Ec += u * n - r * t, r = n, u = t;
          }
          var t, e, r, u;
          Tc.point = function (i, o) {
            Tc.point = n, t = r = i, e = u = o;
          }, Tc.lineEnd = function () {
            n(t, e);
          };
        }
        function se(n, t) {
          Ac > n && (Ac = n), n > Nc && (Nc = n), Cc > t && (Cc = t), t > Lc && (Lc = t);
        }
        function le() {
          function n(n, t) {
            o.push('M', n, ',', t, i);
          }
          function t(n, t) {
            o.push('M', n, ',', t), a.point = e;
          }
          function e(n, t) {
            o.push('L', n, ',', t);
          }
          function r() {
            a.point = n;
          }
          function u() {
            o.push('Z');
          }
          var i = fe(4.5), o = [], a = {
              point: n,
              lineStart: function () {
                a.point = t;
              },
              lineEnd: r,
              polygonStart: function () {
                a.lineEnd = u;
              },
              polygonEnd: function () {
                a.lineEnd = r, a.point = n;
              },
              pointRadius: function (n) {
                return i = fe(n), a;
              },
              result: function () {
                if (o.length) {
                  var n = o.join('');
                  return o = [], n;
                }
              }
            };
          return a;
        }
        function fe(n) {
          return 'm0,' + n + 'a' + n + ',' + n + ' 0 1,1 0,' + -2 * n + 'a' + n + ',' + n + ' 0 1,1 0,' + 2 * n + 'z';
        }
        function he(n, t) {
          gc += n, pc += t, ++vc;
        }
        function ge() {
          function n(n, r) {
            var u = n - t, i = r - e, o = Math.sqrt(u * u + i * i);
            dc += o * (t + n) / 2, mc += o * (e + r) / 2, yc += o, he(t = n, e = r);
          }
          var t, e;
          zc.point = function (r, u) {
            zc.point = n, he(t = r, e = u);
          };
        }
        function pe() {
          zc.point = he;
        }
        function ve() {
          function n(n, t) {
            var e = n - r, i = t - u, o = Math.sqrt(e * e + i * i);
            dc += o * (r + n) / 2, mc += o * (u + t) / 2, yc += o, o = u * n - r * t, xc += o * (r + n), Mc += o * (u + t), _c += 3 * o, he(r = n, u = t);
          }
          var t, e, r, u;
          zc.point = function (i, o) {
            zc.point = n, he(t = r = i, e = u = o);
          }, zc.lineEnd = function () {
            n(t, e);
          };
        }
        function de(n) {
          function t(t, e) {
            n.moveTo(t, e), n.arc(t, e, o, 0, wa);
          }
          function e(t, e) {
            n.moveTo(t, e), a.point = r;
          }
          function r(t, e) {
            n.lineTo(t, e);
          }
          function u() {
            a.point = t;
          }
          function i() {
            n.closePath();
          }
          var o = 4.5, a = {
              point: t,
              lineStart: function () {
                a.point = e;
              },
              lineEnd: u,
              polygonStart: function () {
                a.lineEnd = i;
              },
              polygonEnd: function () {
                a.lineEnd = u, a.point = t;
              },
              pointRadius: function (n) {
                return o = n, a;
              },
              result: c
            };
          return a;
        }
        function me(n) {
          function t(t) {
            function r(e, r) {
              e = n(e, r), t.point(e[0], e[1]);
            }
            function u() {
              x = 0 / 0, S.point = o, t.lineStart();
            }
            function o(r, u) {
              var o = Tt([
                  r,
                  u
                ]), a = n(r, u);
              e(x, M, y, _, b, w, x = a[0], M = a[1], y = r, _ = o[0], b = o[1], w = o[2], i, t), t.point(x, M);
            }
            function a() {
              S.point = r, t.lineEnd();
            }
            function c() {
              u(), S.point = s, S.lineEnd = l;
            }
            function s(n, t) {
              o(f = n, h = t), g = x, p = M, v = _, d = b, m = w, S.point = o;
            }
            function l() {
              e(x, M, y, _, b, w, g, p, f, v, d, m, i, t), S.lineEnd = a, a();
            }
            var f, h, g, p, v, d, m, y, x, M, _, b, w, S = {
                point: r,
                lineStart: u,
                lineEnd: a,
                polygonStart: function () {
                  t.polygonStart(), S.lineStart = c;
                },
                polygonEnd: function () {
                  t.polygonEnd(), S.lineStart = u;
                }
              };
            return S;
          }
          function e(t, i, o, a, c, s, l, f, h, g, p, v, d, m) {
            var y = l - t, x = f - i, M = y * y + x * x;
            if (M > 4 * r && d--) {
              var _ = a + g, b = c + p, w = s + v, S = Math.sqrt(_ * _ + b * b + w * w), k = Math.asin(w /= S), E = ua(ua(w) - 1) < ka ? (o + h) / 2 : Math.atan2(b, _), A = n(E, k), C = A[0], N = A[1], L = C - t, T = N - i, q = x * L - y * T;
              (q * q / M > r || ua((y * L + x * T) / M - 0.5) > 0.3 || u > a * g + c * p + s * v) && (e(t, i, o, a, c, s, C, N, E, _ /= S, b /= S, w, d, m), m.point(C, N), e(C, N, E, _, b, w, l, f, h, g, p, v, d, m));
            }
          }
          var r = 0.5, u = Math.cos(30 * Aa), i = 16;
          return t.precision = function (n) {
            return arguments.length ? (i = (r = n * n) > 0 && 16, t) : Math.sqrt(r);
          }, t;
        }
        function ye(n) {
          this.stream = n;
        }
        function xe(n) {
          var t = me(function (t, e) {
              return n([
                t * Ca,
                e * Ca
              ]);
            });
          return function (n) {
            var e = new ye(n = t(n));
            return e.point = function (t, e) {
              n.point(t * Aa, e * Aa);
            }, e;
          };
        }
        function Me(n) {
          return _e(function () {
            return n;
          })();
        }
        function _e(n) {
          function t(n) {
            return n = a(n[0] * Aa, n[1] * Aa), [
              n[0] * h + c,
              s - n[1] * h
            ];
          }
          function e(n) {
            return n = a.invert((n[0] - c) / h, (s - n[1]) / h), n && [
              n[0] * Ca,
              n[1] * Ca
            ];
          }
          function r() {
            a = ie(o = ke(m, y, x), i);
            var n = i(v, d);
            return c = g - n[0] * h, s = p + n[1] * h, u();
          }
          function u() {
            return l && (l.valid = !1, l = null), t;
          }
          var i, o, a, c, s, l, f = me(function (n, t) {
              return n = i(n, t), [
                n[0] * h + c,
                s - n[1] * h
              ];
            }), h = 150, g = 480, p = 250, v = 0, d = 0, m = 0, y = 0, x = 0, M = wc, _ = vt, b = null, w = null;
          return t.stream = function (n) {
            return l && (l.valid = !1), l = be(M(o, f(_(n)))), l.valid = !0, l;
          }, t.clipAngle = function (n) {
            return arguments.length ? (M = null == n ? (b = n, wc) : ee((b = +n) * Aa), u()) : b;
          }, t.clipExtent = function (n) {
            return arguments.length ? (w = n, _ = n ? ue(n[0][0], n[0][1], n[1][0], n[1][1]) : vt, u()) : w;
          }, t.scale = function (n) {
            return arguments.length ? (h = +n, r()) : h;
          }, t.translate = function (n) {
            return arguments.length ? (g = +n[0], p = +n[1], r()) : [
              g,
              p
            ];
          }, t.center = function (n) {
            return arguments.length ? (v = n[0] % 360 * Aa, d = n[1] % 360 * Aa, r()) : [
              v * Ca,
              d * Ca
            ];
          }, t.rotate = function (n) {
            return arguments.length ? (m = n[0] % 360 * Aa, y = n[1] % 360 * Aa, x = n.length > 2 ? n[2] % 360 * Aa : 0, r()) : [
              m * Ca,
              y * Ca,
              x * Ca
            ];
          }, Zo.rebind(t, f, 'precision'), function () {
            return i = n.apply(this, arguments), t.invert = i.invert && e, r();
          };
        }
        function be(n) {
          var t = new ye(n);
          return t.point = function (t, e) {
            n.point(t * Aa, e * Aa);
          }, t;
        }
        function we(n, t) {
          return [
            n,
            t
          ];
        }
        function Se(n, t) {
          return [
            n > ba ? n - wa : -ba > n ? n + wa : n,
            t
          ];
        }
        function ke(n, t, e) {
          return n ? t || e ? ie(Ae(n), Ce(t, e)) : Ae(n) : t || e ? Ce(t, e) : Se;
        }
        function Ee(n) {
          return function (t, e) {
            return t += n, [
              t > ba ? t - wa : -ba > t ? t + wa : t,
              e
            ];
          };
        }
        function Ae(n) {
          var t = Ee(n);
          return t.invert = Ee(-n), t;
        }
        function Ce(n, t) {
          function e(n, t) {
            var e = Math.cos(t), a = Math.cos(n) * e, c = Math.sin(n) * e, s = Math.sin(t), l = s * r + a * u;
            return [
              Math.atan2(c * i - l * o, a * r - s * u),
              H(l * i + c * o)
            ];
          }
          var r = Math.cos(n), u = Math.sin(n), i = Math.cos(t), o = Math.sin(t);
          return e.invert = function (n, t) {
            var e = Math.cos(t), a = Math.cos(n) * e, c = Math.sin(n) * e, s = Math.sin(t), l = s * i - c * o;
            return [
              Math.atan2(c * i + s * o, a * r + l * u),
              H(l * r - a * u)
            ];
          }, e;
        }
        function Ne(n, t) {
          var e = Math.cos(n), r = Math.sin(n);
          return function (u, i, o, a) {
            var c = o * t;
            null != u ? (u = Le(e, u), i = Le(e, i), (o > 0 ? i > u : u > i) && (u += o * wa)) : (u = n + o * wa, i = n - 0.5 * c);
            for (var s, l = u; o > 0 ? l > i : i > l; l -= c)
              a.point((s = Ut([
                e,
                -r * Math.cos(l),
                -r * Math.sin(l)
              ]))[0], s[1]);
          };
        }
        function Le(n, t) {
          var e = Tt(t);
          e[0] -= n, Pt(e);
          var r = j(-e[1]);
          return ((-e[2] < 0 ? -r : r) + 2 * Math.PI - ka) % (2 * Math.PI);
        }
        function Te(n, t, e) {
          var r = Zo.range(n, t - ka, e).concat(t);
          return function (n) {
            return r.map(function (t) {
              return [
                n,
                t
              ];
            });
          };
        }
        function qe(n, t, e) {
          var r = Zo.range(n, t - ka, e).concat(t);
          return function (n) {
            return r.map(function (t) {
              return [
                t,
                n
              ];
            });
          };
        }
        function ze(n) {
          return n.source;
        }
        function Re(n) {
          return n.target;
        }
        function De(n, t, e, r) {
          var u = Math.cos(t), i = Math.sin(t), o = Math.cos(r), a = Math.sin(r), c = u * Math.cos(n), s = u * Math.sin(n), l = o * Math.cos(e), f = o * Math.sin(e), h = 2 * Math.asin(Math.sqrt(I(r - t) + u * o * I(e - n))), g = 1 / Math.sin(h), p = h ? function (n) {
              var t = Math.sin(n *= h) * g, e = Math.sin(h - n) * g, r = e * c + t * l, u = e * s + t * f, o = e * i + t * a;
              return [
                Math.atan2(u, r) * Ca,
                Math.atan2(o, Math.sqrt(r * r + u * u)) * Ca
              ];
            } : function () {
              return [
                n * Ca,
                t * Ca
              ];
            };
          return p.distance = h, p;
        }
        function Pe() {
          function n(n, u) {
            var i = Math.sin(u *= Aa), o = Math.cos(u), a = ua((n *= Aa) - t), c = Math.cos(a);
            Rc += Math.atan2(Math.sqrt((a = o * Math.sin(a)) * a + (a = r * i - e * o * c) * a), e * i + r * o * c), t = n, e = i, r = o;
          }
          var t, e, r;
          Dc.point = function (u, i) {
            t = u * Aa, e = Math.sin(i *= Aa), r = Math.cos(i), Dc.point = n;
          }, Dc.lineEnd = function () {
            Dc.point = Dc.lineEnd = c;
          };
        }
        function Ue(n, t) {
          function e(t, e) {
            var r = Math.cos(t), u = Math.cos(e), i = n(r * u);
            return [
              i * u * Math.sin(t),
              i * Math.sin(e)
            ];
          }
          return e.invert = function (n, e) {
            var r = Math.sqrt(n * n + e * e), u = t(r), i = Math.sin(u), o = Math.cos(u);
            return [
              Math.atan2(n * i, r * o),
              Math.asin(r && e * i / r)
            ];
          }, e;
        }
        function je(n, t) {
          function e(n, t) {
            var e = ua(ua(t) - Sa) < ka ? 0 : o / Math.pow(u(t), i);
            return [
              e * Math.sin(i * n),
              o - e * Math.cos(i * n)
            ];
          }
          var r = Math.cos(n), u = function (n) {
              return Math.tan(ba / 4 + n / 2);
            }, i = n === t ? Math.sin(n) : Math.log(r / Math.cos(t)) / Math.log(u(t) / u(n)), o = r * Math.pow(u(n), i) / i;
          return i ? (e.invert = function (n, t) {
            var e = o - t, r = U(i) * Math.sqrt(n * n + e * e);
            return [
              Math.atan2(n, e) / i,
              2 * Math.atan(Math.pow(o / r, 1 / i)) - Sa
            ];
          }, e) : Fe;
        }
        function He(n, t) {
          function e(n, t) {
            var e = i - t;
            return [
              e * Math.sin(u * n),
              i - e * Math.cos(u * n)
            ];
          }
          var r = Math.cos(n), u = n === t ? Math.sin(n) : (r - Math.cos(t)) / (t - n), i = r / u + n;
          return ua(u) < ka ? we : (e.invert = function (n, t) {
            var e = i - t;
            return [
              Math.atan2(n, e) / u,
              i - U(u) * Math.sqrt(n * n + e * e)
            ];
          }, e);
        }
        function Fe(n, t) {
          return [
            n,
            Math.log(Math.tan(ba / 4 + t / 2))
          ];
        }
        function Oe(n) {
          var t, e = Me(n), r = e.scale, u = e.translate, i = e.clipExtent;
          return e.scale = function () {
            var n = r.apply(e, arguments);
            return n === e ? t ? e.clipExtent(null) : e : n;
          }, e.translate = function () {
            var n = u.apply(e, arguments);
            return n === e ? t ? e.clipExtent(null) : e : n;
          }, e.clipExtent = function (n) {
            var o = i.apply(e, arguments);
            if (o === e) {
              if (t = null == n) {
                var a = ba * r(), c = u();
                i([
                  [
                    c[0] - a,
                    c[1] - a
                  ],
                  [
                    c[0] + a,
                    c[1] + a
                  ]
                ]);
              }
            } else
              t && (o = null);
            return o;
          }, e.clipExtent(null);
        }
        function Ye(n, t) {
          var e = Math.cos(t) * Math.sin(n);
          return [
            Math.log((1 + e) / (1 - e)) / 2,
            Math.atan2(Math.tan(t), Math.cos(n))
          ];
        }
        function Ie(n) {
          function t(t) {
            function o() {
              s.push('M', i(n(l), a));
            }
            for (var c, s = [], l = [], f = -1, h = t.length, g = pt(e), p = pt(r); ++f < h;)
              u.call(this, c = t[f], f) ? l.push([
                +g.call(this, c, f),
                +p.call(this, c, f)
              ]) : l.length && (o(), l = []);
            return l.length && o(), s.length ? s.join('') : null;
          }
          var e = Ze, r = Ve, u = Zt, i = Xe, o = i.key, a = 0.7;
          return t.x = function (n) {
            return arguments.length ? (e = n, t) : e;
          }, t.y = function (n) {
            return arguments.length ? (r = n, t) : r;
          }, t.defined = function (n) {
            return arguments.length ? (u = n, t) : u;
          }, t.interpolate = function (n) {
            return arguments.length ? (o = 'function' == typeof n ? i = n : (i = Oc.get(n) || Xe).key, t) : o;
          }, t.tension = function (n) {
            return arguments.length ? (a = n, t) : a;
          }, t;
        }
        function Ze(n) {
          return n[0];
        }
        function Ve(n) {
          return n[1];
        }
        function Xe(n) {
          return n.join('L');
        }
        function $e(n) {
          return Xe(n) + 'Z';
        }
        function Be(n) {
          for (var t = 0, e = n.length, r = n[0], u = [
                r[0],
                ',',
                r[1]
              ]; ++t < e;)
            u.push('H', (r[0] + (r = n[t])[0]) / 2, 'V', r[1]);
          return e > 1 && u.push('H', r[0]), u.join('');
        }
        function We(n) {
          for (var t = 0, e = n.length, r = n[0], u = [
                r[0],
                ',',
                r[1]
              ]; ++t < e;)
            u.push('V', (r = n[t])[1], 'H', r[0]);
          return u.join('');
        }
        function Je(n) {
          for (var t = 0, e = n.length, r = n[0], u = [
                r[0],
                ',',
                r[1]
              ]; ++t < e;)
            u.push('H', (r = n[t])[0], 'V', r[1]);
          return u.join('');
        }
        function Ge(n, t) {
          return n.length < 4 ? Xe(n) : n[1] + nr(n.slice(1, n.length - 1), tr(n, t));
        }
        function Ke(n, t) {
          return n.length < 3 ? Xe(n) : n[0] + nr((n.push(n[0]), n), tr([n[n.length - 2]].concat(n, [n[1]]), t));
        }
        function Qe(n, t) {
          return n.length < 3 ? Xe(n) : n[0] + nr(n, tr(n, t));
        }
        function nr(n, t) {
          if (t.length < 1 || n.length != t.length && n.length != t.length + 2)
            return Xe(n);
          var e = n.length != t.length, r = '', u = n[0], i = n[1], o = t[0], a = o, c = 1;
          if (e && (r += 'Q' + (i[0] - 2 * o[0] / 3) + ',' + (i[1] - 2 * o[1] / 3) + ',' + i[0] + ',' + i[1], u = n[1], c = 2), t.length > 1) {
            a = t[1], i = n[c], c++, r += 'C' + (u[0] + o[0]) + ',' + (u[1] + o[1]) + ',' + (i[0] - a[0]) + ',' + (i[1] - a[1]) + ',' + i[0] + ',' + i[1];
            for (var s = 2; s < t.length; s++, c++)
              i = n[c], a = t[s], r += 'S' + (i[0] - a[0]) + ',' + (i[1] - a[1]) + ',' + i[0] + ',' + i[1];
          }
          if (e) {
            var l = n[c];
            r += 'Q' + (i[0] + 2 * a[0] / 3) + ',' + (i[1] + 2 * a[1] / 3) + ',' + l[0] + ',' + l[1];
          }
          return r;
        }
        function tr(n, t) {
          for (var e, r = [], u = (1 - t) / 2, i = n[0], o = n[1], a = 1, c = n.length; ++a < c;)
            e = i, i = o, o = n[a], r.push([
              u * (o[0] - e[0]),
              u * (o[1] - e[1])
            ]);
          return r;
        }
        function er(n) {
          if (n.length < 3)
            return Xe(n);
          var t = 1, e = n.length, r = n[0], u = r[0], i = r[1], o = [
              u,
              u,
              u,
              (r = n[1])[0]
            ], a = [
              i,
              i,
              i,
              r[1]
            ], c = [
              u,
              ',',
              i,
              'L',
              or(Zc, o),
              ',',
              or(Zc, a)
            ];
          for (n.push(n[e - 1]); ++t <= e;)
            r = n[t], o.shift(), o.push(r[0]), a.shift(), a.push(r[1]), ar(c, o, a);
          return n.pop(), c.push('L', r), c.join('');
        }
        function rr(n) {
          if (n.length < 4)
            return Xe(n);
          for (var t, e = [], r = -1, u = n.length, i = [0], o = [0]; ++r < 3;)
            t = n[r], i.push(t[0]), o.push(t[1]);
          for (e.push(or(Zc, i) + ',' + or(Zc, o)), --r; ++r < u;)
            t = n[r], i.shift(), i.push(t[0]), o.shift(), o.push(t[1]), ar(e, i, o);
          return e.join('');
        }
        function ur(n) {
          for (var t, e, r = -1, u = n.length, i = u + 4, o = [], a = []; ++r < 4;)
            e = n[r % u], o.push(e[0]), a.push(e[1]);
          for (t = [
              or(Zc, o),
              ',',
              or(Zc, a)
            ], --r; ++r < i;)
            e = n[r % u], o.shift(), o.push(e[0]), a.shift(), a.push(e[1]), ar(t, o, a);
          return t.join('');
        }
        function ir(n, t) {
          var e = n.length - 1;
          if (e)
            for (var r, u, i = n[0][0], o = n[0][1], a = n[e][0] - i, c = n[e][1] - o, s = -1; ++s <= e;)
              r = n[s], u = s / e, r[0] = t * r[0] + (1 - t) * (i + u * a), r[1] = t * r[1] + (1 - t) * (o + u * c);
          return er(n);
        }
        function or(n, t) {
          return n[0] * t[0] + n[1] * t[1] + n[2] * t[2] + n[3] * t[3];
        }
        function ar(n, t, e) {
          n.push('C', or(Yc, t), ',', or(Yc, e), ',', or(Ic, t), ',', or(Ic, e), ',', or(Zc, t), ',', or(Zc, e));
        }
        function cr(n, t) {
          return (t[1] - n[1]) / (t[0] - n[0]);
        }
        function sr(n) {
          for (var t = 0, e = n.length - 1, r = [], u = n[0], i = n[1], o = r[0] = cr(u, i); ++t < e;)
            r[t] = (o + (o = cr(u = i, i = n[t + 1]))) / 2;
          return r[t] = o, r;
        }
        function lr(n) {
          for (var t, e, r, u, i = [], o = sr(n), a = -1, c = n.length - 1; ++a < c;)
            t = cr(n[a], n[a + 1]), ua(t) < ka ? o[a] = o[a + 1] = 0 : (e = o[a] / t, r = o[a + 1] / t, u = e * e + r * r, u > 9 && (u = 3 * t / Math.sqrt(u), o[a] = u * e, o[a + 1] = u * r));
          for (a = -1; ++a <= c;)
            u = (n[Math.min(c, a + 1)][0] - n[Math.max(0, a - 1)][0]) / (6 * (1 + o[a] * o[a])), i.push([
              u || 0,
              o[a] * u || 0
            ]);
          return i;
        }
        function fr(n) {
          return n.length < 3 ? Xe(n) : n[0] + nr(n, lr(n));
        }
        function hr(n, t, e, r) {
          var u, i, o, a, c, s, l;
          return u = r[n], i = u[0], o = u[1], u = r[t], a = u[0], c = u[1], u = r[e], s = u[0], l = u[1], (l - o) * (a - i) - (c - o) * (s - i) > 0;
        }
        function gr(n, t, e) {
          return (e[0] - t[0]) * (n[1] - t[1]) < (e[1] - t[1]) * (n[0] - t[0]);
        }
        function pr(n, t, e, r) {
          var u = n[0], i = e[0], o = t[0] - u, a = r[0] - i, c = n[1], s = e[1], l = t[1] - c, f = r[1] - s, h = (a * (c - s) - f * (u - i)) / (f * o - a * l);
          return [
            u + h * o,
            c + h * l
          ];
        }
        function vr(n) {
          var t = n[0], e = n[n.length - 1];
          return !(t[0] - e[0] || t[1] - e[1]);
        }
        function dr() {
          Ur(this), this.edge = this.site = this.circle = null;
        }
        function mr(n) {
          var t = Gc.pop() || new dr();
          return t.site = n, t;
        }
        function yr(n) {
          Cr(n), Bc.remove(n), Gc.push(n), Ur(n);
        }
        function xr(n) {
          var t = n.circle, e = t.x, r = t.cy, u = {
              x: e,
              y: r
            }, i = n.P, o = n.N, a = [n];
          yr(n);
          for (var c = i; c.circle && ua(e - c.circle.x) < ka && ua(r - c.circle.cy) < ka;)
            i = c.P, a.unshift(c), yr(c), c = i;
          a.unshift(c), Cr(c);
          for (var s = o; s.circle && ua(e - s.circle.x) < ka && ua(r - s.circle.cy) < ka;)
            o = s.N, a.push(s), yr(s), s = o;
          a.push(s), Cr(s);
          var l, f = a.length;
          for (l = 1; f > l; ++l)
            s = a[l], c = a[l - 1], Rr(s.edge, c.site, s.site, u);
          c = a[0], s = a[f - 1], s.edge = qr(c.site, s.site, null, u), Ar(c), Ar(s);
        }
        function Mr(n) {
          for (var t, e, r, u, i = n.x, o = n.y, a = Bc._; a;)
            if (r = _r(a, o) - i, r > ka)
              a = a.L;
            else {
              if (u = i - br(a, o), !(u > ka)) {
                r > -ka ? (t = a.P, e = a) : u > -ka ? (t = a, e = a.N) : t = e = a;
                break;
              }
              if (!a.R) {
                t = a;
                break;
              }
              a = a.R;
            }
          var c = mr(n);
          if (Bc.insert(t, c), t || e) {
            if (t === e)
              return Cr(t), e = mr(t.site), Bc.insert(c, e), c.edge = e.edge = qr(t.site, c.site), Ar(t), Ar(e), void 0;
            if (!e)
              return c.edge = qr(t.site, c.site), void 0;
            Cr(t), Cr(e);
            var s = t.site, l = s.x, f = s.y, h = n.x - l, g = n.y - f, p = e.site, v = p.x - l, d = p.y - f, m = 2 * (h * d - g * v), y = h * h + g * g, x = v * v + d * d, M = {
                x: (d * y - g * x) / m + l,
                y: (h * x - v * y) / m + f
              };
            Rr(e.edge, s, p, M), c.edge = qr(s, n, null, M), e.edge = qr(n, p, null, M), Ar(t), Ar(e);
          }
        }
        function _r(n, t) {
          var e = n.site, r = e.x, u = e.y, i = u - t;
          if (!i)
            return r;
          var o = n.P;
          if (!o)
            return -1 / 0;
          e = o.site;
          var a = e.x, c = e.y, s = c - t;
          if (!s)
            return a;
          var l = a - r, f = 1 / i - 1 / s, h = l / s;
          return f ? (-h + Math.sqrt(h * h - 2 * f * (l * l / (-2 * s) - c + s / 2 + u - i / 2))) / f + r : (r + a) / 2;
        }
        function br(n, t) {
          var e = n.N;
          if (e)
            return _r(e, t);
          var r = n.site;
          return r.y === t ? r.x : 1 / 0;
        }
        function wr(n) {
          this.site = n, this.edges = [];
        }
        function Sr(n) {
          for (var t, e, r, u, i, o, a, c, s, l, f = n[0][0], h = n[1][0], g = n[0][1], p = n[1][1], v = $c, d = v.length; d--;)
            if (i = v[d], i && i.prepare())
              for (a = i.edges, c = a.length, o = 0; c > o;)
                l = a[o].end(), r = l.x, u = l.y, s = a[++o % c].start(), t = s.x, e = s.y, (ua(r - t) > ka || ua(u - e) > ka) && (a.splice(o, 0, new Dr(zr(i.site, l, ua(r - f) < ka && p - u > ka ? {
                  x: f,
                  y: ua(t - f) < ka ? e : p
                } : ua(u - p) < ka && h - r > ka ? {
                  x: ua(e - p) < ka ? t : h,
                  y: p
                } : ua(r - h) < ka && u - g > ka ? {
                  x: h,
                  y: ua(t - h) < ka ? e : g
                } : ua(u - g) < ka && r - f > ka ? {
                  x: ua(e - g) < ka ? t : f,
                  y: g
                } : null), i.site, null)), ++c);
        }
        function kr(n, t) {
          return t.angle - n.angle;
        }
        function Er() {
          Ur(this), this.x = this.y = this.arc = this.site = this.cy = null;
        }
        function Ar(n) {
          var t = n.P, e = n.N;
          if (t && e) {
            var r = t.site, u = n.site, i = e.site;
            if (r !== i) {
              var o = u.x, a = u.y, c = r.x - o, s = r.y - a, l = i.x - o, f = i.y - a, h = 2 * (c * f - s * l);
              if (!(h >= -Ea)) {
                var g = c * c + s * s, p = l * l + f * f, v = (f * g - s * p) / h, d = (c * p - l * g) / h, f = d + a, m = Kc.pop() || new Er();
                m.arc = n, m.site = u, m.x = v + o, m.y = f + Math.sqrt(v * v + d * d), m.cy = f, n.circle = m;
                for (var y = null, x = Jc._; x;)
                  if (m.y < x.y || m.y === x.y && m.x <= x.x) {
                    if (!x.L) {
                      y = x.P;
                      break;
                    }
                    x = x.L;
                  } else {
                    if (!x.R) {
                      y = x;
                      break;
                    }
                    x = x.R;
                  }
                Jc.insert(y, m), y || (Wc = m);
              }
            }
          }
        }
        function Cr(n) {
          var t = n.circle;
          t && (t.P || (Wc = t.N), Jc.remove(t), Kc.push(t), Ur(t), n.circle = null);
        }
        function Nr(n) {
          for (var t, e = Xc, r = re(n[0][0], n[0][1], n[1][0], n[1][1]), u = e.length; u--;)
            t = e[u], (!Lr(t, n) || !r(t) || ua(t.a.x - t.b.x) < ka && ua(t.a.y - t.b.y) < ka) && (t.a = t.b = null, e.splice(u, 1));
        }
        function Lr(n, t) {
          var e = n.b;
          if (e)
            return !0;
          var r, u, i = n.a, o = t[0][0], a = t[1][0], c = t[0][1], s = t[1][1], l = n.l, f = n.r, h = l.x, g = l.y, p = f.x, v = f.y, d = (h + p) / 2, m = (g + v) / 2;
          if (v === g) {
            if (o > d || d >= a)
              return;
            if (h > p) {
              if (i) {
                if (i.y >= s)
                  return;
              } else
                i = {
                  x: d,
                  y: c
                };
              e = {
                x: d,
                y: s
              };
            } else {
              if (i) {
                if (i.y < c)
                  return;
              } else
                i = {
                  x: d,
                  y: s
                };
              e = {
                x: d,
                y: c
              };
            }
          } else if (r = (h - p) / (v - g), u = m - r * d, -1 > r || r > 1)
            if (h > p) {
              if (i) {
                if (i.y >= s)
                  return;
              } else
                i = {
                  x: (c - u) / r,
                  y: c
                };
              e = {
                x: (s - u) / r,
                y: s
              };
            } else {
              if (i) {
                if (i.y < c)
                  return;
              } else
                i = {
                  x: (s - u) / r,
                  y: s
                };
              e = {
                x: (c - u) / r,
                y: c
              };
            }
          else if (v > g) {
            if (i) {
              if (i.x >= a)
                return;
            } else
              i = {
                x: o,
                y: r * o + u
              };
            e = {
              x: a,
              y: r * a + u
            };
          } else {
            if (i) {
              if (i.x < o)
                return;
            } else
              i = {
                x: a,
                y: r * a + u
              };
            e = {
              x: o,
              y: r * o + u
            };
          }
          return n.a = i, n.b = e, !0;
        }
        function Tr(n, t) {
          this.l = n, this.r = t, this.a = this.b = null;
        }
        function qr(n, t, e, r) {
          var u = new Tr(n, t);
          return Xc.push(u), e && Rr(u, n, t, e), r && Rr(u, t, n, r), $c[n.i].edges.push(new Dr(u, n, t)), $c[t.i].edges.push(new Dr(u, t, n)), u;
        }
        function zr(n, t, e) {
          var r = new Tr(n, null);
          return r.a = t, r.b = e, Xc.push(r), r;
        }
        function Rr(n, t, e, r) {
          n.a || n.b ? n.l === e ? n.b = r : n.a = r : (n.a = r, n.l = t, n.r = e);
        }
        function Dr(n, t, e) {
          var r = n.a, u = n.b;
          this.edge = n, this.site = t, this.angle = e ? Math.atan2(e.y - t.y, e.x - t.x) : n.l === t ? Math.atan2(u.x - r.x, r.y - u.y) : Math.atan2(r.x - u.x, u.y - r.y);
        }
        function Pr() {
          this._ = null;
        }
        function Ur(n) {
          n.U = n.C = n.L = n.R = n.P = n.N = null;
        }
        function jr(n, t) {
          var e = t, r = t.R, u = e.U;
          u ? u.L === e ? u.L = r : u.R = r : n._ = r, r.U = u, e.U = r, e.R = r.L, e.R && (e.R.U = e), r.L = e;
        }
        function Hr(n, t) {
          var e = t, r = t.L, u = e.U;
          u ? u.L === e ? u.L = r : u.R = r : n._ = r, r.U = u, e.U = r, e.L = r.R, e.L && (e.L.U = e), r.R = e;
        }
        function Fr(n) {
          for (; n.L;)
            n = n.L;
          return n;
        }
        function Or(n, t) {
          var e, r, u, i = n.sort(Yr).pop();
          for (Xc = [], $c = new Array(n.length), Bc = new Pr(), Jc = new Pr();;)
            if (u = Wc, i && (!u || i.y < u.y || i.y === u.y && i.x < u.x))
              (i.x !== e || i.y !== r) && ($c[i.i] = new wr(i), Mr(i), e = i.x, r = i.y), i = n.pop();
            else {
              if (!u)
                break;
              xr(u.arc);
            }
          t && (Nr(t), Sr(t));
          var o = {
              cells: $c,
              edges: Xc
            };
          return Bc = Jc = Xc = $c = null, o;
        }
        function Yr(n, t) {
          return t.y - n.y || t.x - n.x;
        }
        function Ir(n, t, e) {
          return (n.x - e.x) * (t.y - n.y) - (n.x - t.x) * (e.y - n.y);
        }
        function Zr(n) {
          return n.x;
        }
        function Vr(n) {
          return n.y;
        }
        function Xr() {
          return {
            leaf: !0,
            nodes: [],
            point: null,
            x: null,
            y: null
          };
        }
        function $r(n, t, e, r, u, i) {
          if (!n(t, e, r, u, i)) {
            var o = 0.5 * (e + u), a = 0.5 * (r + i), c = t.nodes;
            c[0] && $r(n, c[0], e, r, o, a), c[1] && $r(n, c[1], o, r, u, a), c[2] && $r(n, c[2], e, a, o, i), c[3] && $r(n, c[3], o, a, u, i);
          }
        }
        function Br(n, t) {
          n = Zo.rgb(n), t = Zo.rgb(t);
          var e = n.r, r = n.g, u = n.b, i = t.r - e, o = t.g - r, a = t.b - u;
          return function (n) {
            return '#' + ct(Math.round(e + i * n)) + ct(Math.round(r + o * n)) + ct(Math.round(u + a * n));
          };
        }
        function Wr(n, t) {
          var e, r = {}, u = {};
          for (e in n)
            e in t ? r[e] = Kr(n[e], t[e]) : u[e] = n[e];
          for (e in t)
            e in n || (u[e] = t[e]);
          return function (n) {
            for (e in r)
              u[e] = r[e](n);
            return u;
          };
        }
        function Jr(n, t) {
          return t -= n = +n, function (e) {
            return n + t * e;
          };
        }
        function Gr(n, t) {
          var e, r, u, i, o, a = 0, c = 0, s = [], l = [];
          for (n += '', t += '', ns.lastIndex = 0, r = 0; e = ns.exec(t); ++r)
            e.index && s.push(t.substring(a, c = e.index)), l.push({
              i: s.length,
              x: e[0]
            }), s.push(null), a = ns.lastIndex;
          for (a < t.length && s.push(t.substring(a)), r = 0, i = l.length; (e = ns.exec(n)) && i > r; ++r)
            if (o = l[r], o.x == e[0]) {
              if (o.i)
                if (null == s[o.i + 1])
                  for (s[o.i - 1] += o.x, s.splice(o.i, 1), u = r + 1; i > u; ++u)
                    l[u].i--;
                else
                  for (s[o.i - 1] += o.x + s[o.i + 1], s.splice(o.i, 2), u = r + 1; i > u; ++u)
                    l[u].i -= 2;
              else if (null == s[o.i + 1])
                s[o.i] = o.x;
              else
                for (s[o.i] = o.x + s[o.i + 1], s.splice(o.i + 1, 1), u = r + 1; i > u; ++u)
                  l[u].i--;
              l.splice(r, 1), i--, r--;
            } else
              o.x = Jr(parseFloat(e[0]), parseFloat(o.x));
          for (; i > r;)
            o = l.pop(), null == s[o.i + 1] ? s[o.i] = o.x : (s[o.i] = o.x + s[o.i + 1], s.splice(o.i + 1, 1)), i--;
          return 1 === s.length ? null == s[0] ? (o = l[0].x, function (n) {
            return o(n) + '';
          }) : function () {
            return t;
          } : function (n) {
            for (r = 0; i > r; ++r)
              s[(o = l[r]).i] = o.x(n);
            return s.join('');
          };
        }
        function Kr(n, t) {
          for (var e, r = Zo.interpolators.length; --r >= 0 && !(e = Zo.interpolators[r](n, t)););
          return e;
        }
        function Qr(n, t) {
          var e, r = [], u = [], i = n.length, o = t.length, a = Math.min(n.length, t.length);
          for (e = 0; a > e; ++e)
            r.push(Kr(n[e], t[e]));
          for (; i > e; ++e)
            u[e] = n[e];
          for (; o > e; ++e)
            u[e] = t[e];
          return function (n) {
            for (e = 0; a > e; ++e)
              u[e] = r[e](n);
            return u;
          };
        }
        function nu(n) {
          return function (t) {
            return 0 >= t ? 0 : t >= 1 ? 1 : n(t);
          };
        }
        function tu(n) {
          return function (t) {
            return 1 - n(1 - t);
          };
        }
        function eu(n) {
          return function (t) {
            return 0.5 * (0.5 > t ? n(2 * t) : 2 - n(2 - 2 * t));
          };
        }
        function ru(n) {
          return n * n;
        }
        function uu(n) {
          return n * n * n;
        }
        function iu(n) {
          if (0 >= n)
            return 0;
          if (n >= 1)
            return 1;
          var t = n * n, e = t * n;
          return 4 * (0.5 > n ? e : 3 * (n - t) + e - 0.75);
        }
        function ou(n) {
          return function (t) {
            return Math.pow(t, n);
          };
        }
        function au(n) {
          return 1 - Math.cos(n * Sa);
        }
        function cu(n) {
          return Math.pow(2, 10 * (n - 1));
        }
        function su(n) {
          return 1 - Math.sqrt(1 - n * n);
        }
        function lu(n, t) {
          var e;
          return arguments.length < 2 && (t = 0.45), arguments.length ? e = t / wa * Math.asin(1 / n) : (n = 1, e = t / 4), function (r) {
            return 1 + n * Math.pow(2, -10 * r) * Math.sin((r - e) * wa / t);
          };
        }
        function fu(n) {
          return n || (n = 1.70158), function (t) {
            return t * t * ((n + 1) * t - n);
          };
        }
        function hu(n) {
          return 1 / 2.75 > n ? 7.5625 * n * n : 2 / 2.75 > n ? 7.5625 * (n -= 1.5 / 2.75) * n + 0.75 : 2.5 / 2.75 > n ? 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375 : 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
        }
        function gu(n, t) {
          n = Zo.hcl(n), t = Zo.hcl(t);
          var e = n.h, r = n.c, u = n.l, i = t.h - e, o = t.c - r, a = t.l - u;
          return isNaN(o) && (o = 0, r = isNaN(r) ? t.c : r), isNaN(i) ? (i = 0, e = isNaN(e) ? t.h : e) : i > 180 ? i -= 360 : -180 > i && (i += 360), function (n) {
            return J(e + i * n, r + o * n, u + a * n) + '';
          };
        }
        function pu(n, t) {
          n = Zo.hsl(n), t = Zo.hsl(t);
          var e = n.h, r = n.s, u = n.l, i = t.h - e, o = t.s - r, a = t.l - u;
          return isNaN(o) && (o = 0, r = isNaN(r) ? t.s : r), isNaN(i) ? (i = 0, e = isNaN(e) ? t.h : e) : i > 180 ? i -= 360 : -180 > i && (i += 360), function (n) {
            return $(e + i * n, r + o * n, u + a * n) + '';
          };
        }
        function vu(n, t) {
          n = Zo.lab(n), t = Zo.lab(t);
          var e = n.l, r = n.a, u = n.b, i = t.l - e, o = t.a - r, a = t.b - u;
          return function (n) {
            return Q(e + i * n, r + o * n, u + a * n) + '';
          };
        }
        function du(n, t) {
          return t -= n, function (e) {
            return Math.round(n + t * e);
          };
        }
        function mu(n) {
          var t = [
              n.a,
              n.b
            ], e = [
              n.c,
              n.d
            ], r = xu(t), u = yu(t, e), i = xu(Mu(e, t, -u)) || 0;
          t[0] * e[1] < e[0] * t[1] && (t[0] *= -1, t[1] *= -1, r *= -1, u *= -1), this.rotate = (r ? Math.atan2(t[1], t[0]) : Math.atan2(-e[0], e[1])) * Ca, this.translate = [
            n.e,
            n.f
          ], this.scale = [
            r,
            i
          ], this.skew = i ? Math.atan2(u, i) * Ca : 0;
        }
        function yu(n, t) {
          return n[0] * t[0] + n[1] * t[1];
        }
        function xu(n) {
          var t = Math.sqrt(yu(n, n));
          return t && (n[0] /= t, n[1] /= t), t;
        }
        function Mu(n, t, e) {
          return n[0] += e * t[0], n[1] += e * t[1], n;
        }
        function _u(n, t) {
          var e, r = [], u = [], i = Zo.transform(n), o = Zo.transform(t), a = i.translate, c = o.translate, s = i.rotate, l = o.rotate, f = i.skew, h = o.skew, g = i.scale, p = o.scale;
          return a[0] != c[0] || a[1] != c[1] ? (r.push('translate(', null, ',', null, ')'), u.push({
            i: 1,
            x: Jr(a[0], c[0])
          }, {
            i: 3,
            x: Jr(a[1], c[1])
          })) : c[0] || c[1] ? r.push('translate(' + c + ')') : r.push(''), s != l ? (s - l > 180 ? l += 360 : l - s > 180 && (s += 360), u.push({
            i: r.push(r.pop() + 'rotate(', null, ')') - 2,
            x: Jr(s, l)
          })) : l && r.push(r.pop() + 'rotate(' + l + ')'), f != h ? u.push({
            i: r.push(r.pop() + 'skewX(', null, ')') - 2,
            x: Jr(f, h)
          }) : h && r.push(r.pop() + 'skewX(' + h + ')'), g[0] != p[0] || g[1] != p[1] ? (e = r.push(r.pop() + 'scale(', null, ',', null, ')'), u.push({
            i: e - 4,
            x: Jr(g[0], p[0])
          }, {
            i: e - 2,
            x: Jr(g[1], p[1])
          })) : (1 != p[0] || 1 != p[1]) && r.push(r.pop() + 'scale(' + p + ')'), e = u.length, function (n) {
            for (var t, i = -1; ++i < e;)
              r[(t = u[i]).i] = t.x(n);
            return r.join('');
          };
        }
        function bu(n, t) {
          return t = t - (n = +n) ? 1 / (t - n) : 0, function (e) {
            return (e - n) * t;
          };
        }
        function wu(n, t) {
          return t = t - (n = +n) ? 1 / (t - n) : 0, function (e) {
            return Math.max(0, Math.min(1, (e - n) * t));
          };
        }
        function Su(n) {
          for (var t = n.source, e = n.target, r = Eu(t, e), u = [t]; t !== r;)
            t = t.parent, u.push(t);
          for (var i = u.length; e !== r;)
            u.splice(i, 0, e), e = e.parent;
          return u;
        }
        function ku(n) {
          for (var t = [], e = n.parent; null != e;)
            t.push(n), n = e, e = e.parent;
          return t.push(n), t;
        }
        function Eu(n, t) {
          if (n === t)
            return n;
          for (var e = ku(n), r = ku(t), u = e.pop(), i = r.pop(), o = null; u === i;)
            o = u, u = e.pop(), i = r.pop();
          return o;
        }
        function Au(n) {
          n.fixed |= 2;
        }
        function Cu(n) {
          n.fixed &= -7;
        }
        function Nu(n) {
          n.fixed |= 4, n.px = n.x, n.py = n.y;
        }
        function Lu(n) {
          n.fixed &= -5;
        }
        function Tu(n, t, e) {
          var r = 0, u = 0;
          if (n.charge = 0, !n.leaf)
            for (var i, o = n.nodes, a = o.length, c = -1; ++c < a;)
              i = o[c], null != i && (Tu(i, t, e), n.charge += i.charge, r += i.charge * i.cx, u += i.charge * i.cy);
          if (n.point) {
            n.leaf || (n.point.x += Math.random() - 0.5, n.point.y += Math.random() - 0.5);
            var s = t * e[n.point.index];
            n.charge += n.pointCharge = s, r += s * n.point.x, u += s * n.point.y;
          }
          n.cx = r / n.charge, n.cy = u / n.charge;
        }
        function qu(n, t) {
          return Zo.rebind(n, t, 'sort', 'children', 'value'), n.nodes = n, n.links = Pu, n;
        }
        function zu(n) {
          return n.children;
        }
        function Ru(n) {
          return n.value;
        }
        function Du(n, t) {
          return t.value - n.value;
        }
        function Pu(n) {
          return Zo.merge(n.map(function (n) {
            return (n.children || []).map(function (t) {
              return {
                source: n,
                target: t
              };
            });
          }));
        }
        function Uu(n) {
          return n.x;
        }
        function ju(n) {
          return n.y;
        }
        function Hu(n, t, e) {
          n.y0 = t, n.y = e;
        }
        function Fu(n) {
          return Zo.range(n.length);
        }
        function Ou(n) {
          for (var t = -1, e = n[0].length, r = []; ++t < e;)
            r[t] = 0;
          return r;
        }
        function Yu(n) {
          for (var t, e = 1, r = 0, u = n[0][1], i = n.length; i > e; ++e)
            (t = n[e][1]) > u && (r = e, u = t);
          return r;
        }
        function Iu(n) {
          return n.reduce(Zu, 0);
        }
        function Zu(n, t) {
          return n + t[1];
        }
        function Vu(n, t) {
          return Xu(n, Math.ceil(Math.log(t.length) / Math.LN2 + 1));
        }
        function Xu(n, t) {
          for (var e = -1, r = +n[0], u = (n[1] - r) / t, i = []; ++e <= t;)
            i[e] = u * e + r;
          return i;
        }
        function $u(n) {
          return [
            Zo.min(n),
            Zo.max(n)
          ];
        }
        function Bu(n, t) {
          return n.parent == t.parent ? 1 : 2;
        }
        function Wu(n) {
          var t = n.children;
          return t && t.length ? t[0] : n._tree.thread;
        }
        function Ju(n) {
          var t, e = n.children;
          return e && (t = e.length) ? e[t - 1] : n._tree.thread;
        }
        function Gu(n, t) {
          var e = n.children;
          if (e && (u = e.length))
            for (var r, u, i = -1; ++i < u;)
              t(r = Gu(e[i], t), n) > 0 && (n = r);
          return n;
        }
        function Ku(n, t) {
          return n.x - t.x;
        }
        function Qu(n, t) {
          return t.x - n.x;
        }
        function ni(n, t) {
          return n.depth - t.depth;
        }
        function ti(n, t) {
          function e(n, r) {
            var u = n.children;
            if (u && (o = u.length))
              for (var i, o, a = null, c = -1; ++c < o;)
                i = u[c], e(i, a), a = i;
            t(n, r);
          }
          e(n, null);
        }
        function ei(n) {
          for (var t, e = 0, r = 0, u = n.children, i = u.length; --i >= 0;)
            t = u[i]._tree, t.prelim += e, t.mod += e, e += t.shift + (r += t.change);
        }
        function ri(n, t, e) {
          n = n._tree, t = t._tree;
          var r = e / (t.number - n.number);
          n.change += r, t.change -= r, t.shift += e, t.prelim += e, t.mod += e;
        }
        function ui(n, t, e) {
          return n._tree.ancestor.parent == t.parent ? n._tree.ancestor : e;
        }
        function ii(n, t) {
          return n.value - t.value;
        }
        function oi(n, t) {
          var e = n._pack_next;
          n._pack_next = t, t._pack_prev = n, t._pack_next = e, e._pack_prev = t;
        }
        function ai(n, t) {
          n._pack_next = t, t._pack_prev = n;
        }
        function ci(n, t) {
          var e = t.x - n.x, r = t.y - n.y, u = n.r + t.r;
          return 0.999 * u * u > e * e + r * r;
        }
        function si(n) {
          function t(n) {
            l = Math.min(n.x - n.r, l), f = Math.max(n.x + n.r, f), h = Math.min(n.y - n.r, h), g = Math.max(n.y + n.r, g);
          }
          if ((e = n.children) && (s = e.length)) {
            var e, r, u, i, o, a, c, s, l = 1 / 0, f = -1 / 0, h = 1 / 0, g = -1 / 0;
            if (e.forEach(li), r = e[0], r.x = -r.r, r.y = 0, t(r), s > 1 && (u = e[1], u.x = u.r, u.y = 0, t(u), s > 2))
              for (i = e[2], gi(r, u, i), t(i), oi(r, i), r._pack_prev = i, oi(i, u), u = r._pack_next, o = 3; s > o; o++) {
                gi(r, u, i = e[o]);
                var p = 0, v = 1, d = 1;
                for (a = u._pack_next; a !== u; a = a._pack_next, v++)
                  if (ci(a, i)) {
                    p = 1;
                    break;
                  }
                if (1 == p)
                  for (c = r._pack_prev; c !== a._pack_prev && !ci(c, i); c = c._pack_prev, d++);
                p ? (d > v || v == d && u.r < r.r ? ai(r, u = a) : ai(r = c, u), o--) : (oi(r, i), u = i, t(i));
              }
            var m = (l + f) / 2, y = (h + g) / 2, x = 0;
            for (o = 0; s > o; o++)
              i = e[o], i.x -= m, i.y -= y, x = Math.max(x, i.r + Math.sqrt(i.x * i.x + i.y * i.y));
            n.r = x, e.forEach(fi);
          }
        }
        function li(n) {
          n._pack_next = n._pack_prev = n;
        }
        function fi(n) {
          delete n._pack_next, delete n._pack_prev;
        }
        function hi(n, t, e, r) {
          var u = n.children;
          if (n.x = t += r * n.x, n.y = e += r * n.y, n.r *= r, u)
            for (var i = -1, o = u.length; ++i < o;)
              hi(u[i], t, e, r);
        }
        function gi(n, t, e) {
          var r = n.r + e.r, u = t.x - n.x, i = t.y - n.y;
          if (r && (u || i)) {
            var o = t.r + e.r, a = u * u + i * i;
            o *= o, r *= r;
            var c = 0.5 + (r - o) / (2 * a), s = Math.sqrt(Math.max(0, 2 * o * (r + a) - (r -= a) * r - o * o)) / (2 * a);
            e.x = n.x + c * u + s * i, e.y = n.y + c * i - s * u;
          } else
            e.x = n.x + r, e.y = n.y;
        }
        function pi(n) {
          return 1 + Zo.max(n, function (n) {
            return n.y;
          });
        }
        function vi(n) {
          return n.reduce(function (n, t) {
            return n + t.x;
          }, 0) / n.length;
        }
        function di(n) {
          var t = n.children;
          return t && t.length ? di(t[0]) : n;
        }
        function mi(n) {
          var t, e = n.children;
          return e && (t = e.length) ? mi(e[t - 1]) : n;
        }
        function yi(n) {
          return {
            x: n.x,
            y: n.y,
            dx: n.dx,
            dy: n.dy
          };
        }
        function xi(n, t) {
          var e = n.x + t[3], r = n.y + t[0], u = n.dx - t[1] - t[3], i = n.dy - t[0] - t[2];
          return 0 > u && (e += u / 2, u = 0), 0 > i && (r += i / 2, i = 0), {
            x: e,
            y: r,
            dx: u,
            dy: i
          };
        }
        function Mi(n) {
          var t = n[0], e = n[n.length - 1];
          return e > t ? [
            t,
            e
          ] : [
            e,
            t
          ];
        }
        function _i(n) {
          return n.rangeExtent ? n.rangeExtent() : Mi(n.range());
        }
        function bi(n, t, e, r) {
          var u = e(n[0], n[1]), i = r(t[0], t[1]);
          return function (n) {
            return i(u(n));
          };
        }
        function wi(n, t) {
          var e, r = 0, u = n.length - 1, i = n[r], o = n[u];
          return i > o && (e = r, r = u, u = e, e = i, i = o, o = e), n[r] = t.floor(i), n[u] = t.ceil(o), n;
        }
        function Si(n) {
          return n ? {
            floor: function (t) {
              return Math.floor(t / n) * n;
            },
            ceil: function (t) {
              return Math.ceil(t / n) * n;
            }
          } : ls;
        }
        function ki(n, t, e, r) {
          var u = [], i = [], o = 0, a = Math.min(n.length, t.length) - 1;
          for (n[a] < n[0] && (n = n.slice().reverse(), t = t.slice().reverse()); ++o <= a;)
            u.push(e(n[o - 1], n[o])), i.push(r(t[o - 1], t[o]));
          return function (t) {
            var e = Zo.bisect(n, t, 1, a) - 1;
            return i[e](u[e](t));
          };
        }
        function Ei(n, t, e, r) {
          function u() {
            var u = Math.min(n.length, t.length) > 2 ? ki : bi, c = r ? wu : bu;
            return o = u(n, t, c, e), a = u(t, n, c, Kr), i;
          }
          function i(n) {
            return o(n);
          }
          var o, a;
          return i.invert = function (n) {
            return a(n);
          }, i.domain = function (t) {
            return arguments.length ? (n = t.map(Number), u()) : n;
          }, i.range = function (n) {
            return arguments.length ? (t = n, u()) : t;
          }, i.rangeRound = function (n) {
            return i.range(n).interpolate(du);
          }, i.clamp = function (n) {
            return arguments.length ? (r = n, u()) : r;
          }, i.interpolate = function (n) {
            return arguments.length ? (e = n, u()) : e;
          }, i.ticks = function (t) {
            return Li(n, t);
          }, i.tickFormat = function (t, e) {
            return Ti(n, t, e);
          }, i.nice = function (t) {
            return Ci(n, t), u();
          }, i.copy = function () {
            return Ei(n, t, e, r);
          }, u();
        }
        function Ai(n, t) {
          return Zo.rebind(n, t, 'range', 'rangeRound', 'interpolate', 'clamp');
        }
        function Ci(n, t) {
          return wi(n, Si(Ni(n, t)[2]));
        }
        function Ni(n, t) {
          null == t && (t = 10);
          var e = Mi(n), r = e[1] - e[0], u = Math.pow(10, Math.floor(Math.log(r / t) / Math.LN10)), i = t / r * u;
          return 0.15 >= i ? u *= 10 : 0.35 >= i ? u *= 5 : 0.75 >= i && (u *= 2), e[0] = Math.ceil(e[0] / u) * u, e[1] = Math.floor(e[1] / u) * u + 0.5 * u, e[2] = u, e;
        }
        function Li(n, t) {
          return Zo.range.apply(Zo, Ni(n, t));
        }
        function Ti(n, t, e) {
          var r = -Math.floor(Math.log(Ni(n, t)[2]) / Math.LN10 + 0.01);
          return Zo.format(e ? e.replace(tc, function (n, t, e, u, i, o, a, c, s, l) {
            return [
              t,
              e,
              u,
              i,
              o,
              a,
              c,
              s || '.' + (r - 2 * ('%' === l)),
              l
            ].join('');
          }) : ',.' + r + 'f');
        }
        function qi(n, t, e, r) {
          function u(n) {
            return (e ? Math.log(0 > n ? 0 : n) : -Math.log(n > 0 ? 0 : -n)) / Math.log(t);
          }
          function i(n) {
            return e ? Math.pow(t, n) : -Math.pow(t, -n);
          }
          function o(t) {
            return n(u(t));
          }
          return o.invert = function (t) {
            return i(n.invert(t));
          }, o.domain = function (t) {
            return arguments.length ? (e = t[0] >= 0, n.domain((r = t.map(Number)).map(u)), o) : r;
          }, o.base = function (e) {
            return arguments.length ? (t = +e, n.domain(r.map(u)), o) : t;
          }, o.nice = function () {
            var t = wi(r.map(u), e ? Math : hs);
            return n.domain(t), r = t.map(i), o;
          }, o.ticks = function () {
            var n = Mi(r), o = [], a = n[0], c = n[1], s = Math.floor(u(a)), l = Math.ceil(u(c)), f = t % 1 ? 2 : t;
            if (isFinite(l - s)) {
              if (e) {
                for (; l > s; s++)
                  for (var h = 1; f > h; h++)
                    o.push(i(s) * h);
                o.push(i(s));
              } else
                for (o.push(i(s)); s++ < l;)
                  for (var h = f - 1; h > 0; h--)
                    o.push(i(s) * h);
              for (s = 0; o[s] < a; s++);
              for (l = o.length; o[l - 1] > c; l--);
              o = o.slice(s, l);
            }
            return o;
          }, o.tickFormat = function (n, t) {
            if (!arguments.length)
              return fs;
            arguments.length < 2 ? t = fs : 'function' != typeof t && (t = Zo.format(t));
            var r, a = Math.max(0.1, n / o.ticks().length), c = e ? (r = 1e-12, Math.ceil) : (r = -1e-12, Math.floor);
            return function (n) {
              return n / i(c(u(n) + r)) <= a ? t(n) : '';
            };
          }, o.copy = function () {
            return qi(n.copy(), t, e, r);
          }, Ai(o, n);
        }
        function zi(n, t, e) {
          function r(t) {
            return n(u(t));
          }
          var u = Ri(t), i = Ri(1 / t);
          return r.invert = function (t) {
            return i(n.invert(t));
          }, r.domain = function (t) {
            return arguments.length ? (n.domain((e = t.map(Number)).map(u)), r) : e;
          }, r.ticks = function (n) {
            return Li(e, n);
          }, r.tickFormat = function (n, t) {
            return Ti(e, n, t);
          }, r.nice = function (n) {
            return r.domain(Ci(e, n));
          }, r.exponent = function (o) {
            return arguments.length ? (u = Ri(t = o), i = Ri(1 / t), n.domain(e.map(u)), r) : t;
          }, r.copy = function () {
            return zi(n.copy(), t, e);
          }, Ai(r, n);
        }
        function Ri(n) {
          return function (t) {
            return 0 > t ? -Math.pow(-t, n) : Math.pow(t, n);
          };
        }
        function Di(n, t) {
          function e(e) {
            return o[((i.get(e) || 'range' === t.t && i.set(e, n.push(e))) - 1) % o.length];
          }
          function r(t, e) {
            return Zo.range(n.length).map(function (n) {
              return t + e * n;
            });
          }
          var i, o, a;
          return e.domain = function (r) {
            if (!arguments.length)
              return n;
            n = [], i = new u();
            for (var o, a = -1, c = r.length; ++a < c;)
              i.has(o = r[a]) || i.set(o, n.push(o));
            return e[t.t].apply(e, t.a);
          }, e.range = function (n) {
            return arguments.length ? (o = n, a = 0, t = {
              t: 'range',
              a: arguments
            }, e) : o;
          }, e.rangePoints = function (u, i) {
            arguments.length < 2 && (i = 0);
            var c = u[0], s = u[1], l = (s - c) / (Math.max(1, n.length - 1) + i);
            return o = r(n.length < 2 ? (c + s) / 2 : c + l * i / 2, l), a = 0, t = {
              t: 'rangePoints',
              a: arguments
            }, e;
          }, e.rangeBands = function (u, i, c) {
            arguments.length < 2 && (i = 0), arguments.length < 3 && (c = i);
            var s = u[1] < u[0], l = u[s - 0], f = u[1 - s], h = (f - l) / (n.length - i + 2 * c);
            return o = r(l + h * c, h), s && o.reverse(), a = h * (1 - i), t = {
              t: 'rangeBands',
              a: arguments
            }, e;
          }, e.rangeRoundBands = function (u, i, c) {
            arguments.length < 2 && (i = 0), arguments.length < 3 && (c = i);
            var s = u[1] < u[0], l = u[s - 0], f = u[1 - s], h = Math.floor((f - l) / (n.length - i + 2 * c)), g = f - l - (n.length - i) * h;
            return o = r(l + Math.round(g / 2), h), s && o.reverse(), a = Math.round(h * (1 - i)), t = {
              t: 'rangeRoundBands',
              a: arguments
            }, e;
          }, e.rangeBand = function () {
            return a;
          }, e.rangeExtent = function () {
            return Mi(t.a[0]);
          }, e.copy = function () {
            return Di(n, t);
          }, e.domain(n);
        }
        function Pi(n, t) {
          function e() {
            var e = 0, i = t.length;
            for (u = []; ++e < i;)
              u[e - 1] = Zo.quantile(n, e / i);
            return r;
          }
          function r(n) {
            return isNaN(n = +n) ? void 0 : t[Zo.bisect(u, n)];
          }
          var u;
          return r.domain = function (t) {
            return arguments.length ? (n = t.filter(function (n) {
              return !isNaN(n);
            }).sort(Zo.ascending), e()) : n;
          }, r.range = function (n) {
            return arguments.length ? (t = n, e()) : t;
          }, r.quantiles = function () {
            return u;
          }, r.invertExtent = function (e) {
            return e = t.indexOf(e), 0 > e ? [
              0 / 0,
              0 / 0
            ] : [
              e > 0 ? u[e - 1] : n[0],
              e < u.length ? u[e] : n[n.length - 1]
            ];
          }, r.copy = function () {
            return Pi(n, t);
          }, e();
        }
        function Ui(n, t, e) {
          function r(t) {
            return e[Math.max(0, Math.min(o, Math.floor(i * (t - n))))];
          }
          function u() {
            return i = e.length / (t - n), o = e.length - 1, r;
          }
          var i, o;
          return r.domain = function (e) {
            return arguments.length ? (n = +e[0], t = +e[e.length - 1], u()) : [
              n,
              t
            ];
          }, r.range = function (n) {
            return arguments.length ? (e = n, u()) : e;
          }, r.invertExtent = function (t) {
            return t = e.indexOf(t), t = 0 > t ? 0 / 0 : t / i + n, [
              t,
              t + 1 / i
            ];
          }, r.copy = function () {
            return Ui(n, t, e);
          }, u();
        }
        function ji(n, t) {
          function e(e) {
            return e >= e ? t[Zo.bisect(n, e)] : void 0;
          }
          return e.domain = function (t) {
            return arguments.length ? (n = t, e) : n;
          }, e.range = function (n) {
            return arguments.length ? (t = n, e) : t;
          }, e.invertExtent = function (e) {
            return e = t.indexOf(e), [
              n[e - 1],
              n[e]
            ];
          }, e.copy = function () {
            return ji(n, t);
          }, e;
        }
        function Hi(n) {
          function t(n) {
            return +n;
          }
          return t.invert = t, t.domain = t.range = function (e) {
            return arguments.length ? (n = e.map(t), t) : n;
          }, t.ticks = function (t) {
            return Li(n, t);
          }, t.tickFormat = function (t, e) {
            return Ti(n, t, e);
          }, t.copy = function () {
            return Hi(n);
          }, t;
        }
        function Fi(n) {
          return n.innerRadius;
        }
        function Oi(n) {
          return n.outerRadius;
        }
        function Yi(n) {
          return n.startAngle;
        }
        function Ii(n) {
          return n.endAngle;
        }
        function Zi(n) {
          for (var t, e, r, u = -1, i = n.length; ++u < i;)
            t = n[u], e = t[0], r = t[1] + ms, t[0] = e * Math.cos(r), t[1] = e * Math.sin(r);
          return n;
        }
        function Vi(n) {
          function t(t) {
            function c() {
              v.push('M', a(n(m), f), l, s(n(d.reverse()), f), 'Z');
            }
            for (var h, g, p, v = [], d = [], m = [], y = -1, x = t.length, M = pt(e), _ = pt(u), b = e === r ? function () {
                  return g;
                } : pt(r), w = u === i ? function () {
                  return p;
                } : pt(i); ++y < x;)
              o.call(this, h = t[y], y) ? (d.push([
                g = +M.call(this, h, y),
                p = +_.call(this, h, y)
              ]), m.push([
                +b.call(this, h, y),
                +w.call(this, h, y)
              ])) : d.length && (c(), d = [], m = []);
            return d.length && c(), v.length ? v.join('') : null;
          }
          var e = Ze, r = Ze, u = 0, i = Ve, o = Zt, a = Xe, c = a.key, s = a, l = 'L', f = 0.7;
          return t.x = function (n) {
            return arguments.length ? (e = r = n, t) : r;
          }, t.x0 = function (n) {
            return arguments.length ? (e = n, t) : e;
          }, t.x1 = function (n) {
            return arguments.length ? (r = n, t) : r;
          }, t.y = function (n) {
            return arguments.length ? (u = i = n, t) : i;
          }, t.y0 = function (n) {
            return arguments.length ? (u = n, t) : u;
          }, t.y1 = function (n) {
            return arguments.length ? (i = n, t) : i;
          }, t.defined = function (n) {
            return arguments.length ? (o = n, t) : o;
          }, t.interpolate = function (n) {
            return arguments.length ? (c = 'function' == typeof n ? a = n : (a = Oc.get(n) || Xe).key, s = a.reverse || a, l = a.closed ? 'M' : 'L', t) : c;
          }, t.tension = function (n) {
            return arguments.length ? (f = n, t) : f;
          }, t;
        }
        function Xi(n) {
          return n.radius;
        }
        function $i(n) {
          return [
            n.x,
            n.y
          ];
        }
        function Bi(n) {
          return function () {
            var t = n.apply(this, arguments), e = t[0], r = t[1] + ms;
            return [
              e * Math.cos(r),
              e * Math.sin(r)
            ];
          };
        }
        function Wi() {
          return 64;
        }
        function Ji() {
          return 'circle';
        }
        function Gi(n) {
          var t = Math.sqrt(n / ba);
          return 'M0,' + t + 'A' + t + ',' + t + ' 0 1,1 0,' + -t + 'A' + t + ',' + t + ' 0 1,1 0,' + t + 'Z';
        }
        function Ki(n, t) {
          return sa(n, Ss), n.id = t, n;
        }
        function Qi(n, t, e, r) {
          var u = n.id;
          return C(n, 'function' == typeof e ? function (n, i, o) {
            n.__transition__[u].tween.set(t, r(e.call(n, n.__data__, i, o)));
          } : (e = r(e), function (n) {
            n.__transition__[u].tween.set(t, e);
          }));
        }
        function no(n) {
          return null == n && (n = ''), function () {
            this.textContent = n;
          };
        }
        function to(n, t, e, r) {
          var i = n.__transition__ || (n.__transition__ = {
              active: 0,
              count: 0
            }), o = i[e];
          if (!o) {
            var a = r.time;
            o = i[e] = {
              tween: new u(),
              time: a,
              ease: r.ease,
              delay: r.delay,
              duration: r.duration
            }, ++i.count, Zo.timer(function (r) {
              function u(r) {
                return i.active > e ? s() : (i.active = e, o.event && o.event.start.call(n, l, t), o.tween.forEach(function (e, r) {
                  (r = r.call(n, l, t)) && v.push(r);
                }), Zo.timer(function () {
                  return p.c = c(r || 1) ? Zt : c, 1;
                }, 0, a), void 0);
              }
              function c(r) {
                if (i.active !== e)
                  return s();
                for (var u = r / g, a = f(u), c = v.length; c > 0;)
                  v[--c].call(n, a);
                return u >= 1 ? (o.event && o.event.end.call(n, l, t), s()) : void 0;
              }
              function s() {
                return --i.count ? delete i[e] : delete n.__transition__, 1;
              }
              var l = n.__data__, f = o.ease, h = o.delay, g = o.duration, p = Ba, v = [];
              return p.t = h + a, r >= h ? u(r - h) : (p.c = u, void 0);
            }, 0, a);
          }
        }
        function eo(n, t) {
          n.attr('transform', function (n) {
            return 'translate(' + t(n) + ',0)';
          });
        }
        function ro(n, t) {
          n.attr('transform', function (n) {
            return 'translate(0,' + t(n) + ')';
          });
        }
        function uo() {
          this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0]);
        }
        function io(n, t, e) {
          function r(t) {
            var e = n(t), r = i(e, 1);
            return r - t > t - e ? e : r;
          }
          function u(e) {
            return t(e = n(new Ts(e - 1)), 1), e;
          }
          function i(n, e) {
            return t(n = new Ts(+n), e), n;
          }
          function o(n, r, i) {
            var o = u(n), a = [];
            if (i > 1)
              for (; r > o;)
                e(o) % i || a.push(new Date(+o)), t(o, 1);
            else
              for (; r > o;)
                a.push(new Date(+o)), t(o, 1);
            return a;
          }
          function a(n, t, e) {
            try {
              Ts = uo;
              var r = new uo();
              return r._ = n, o(r, t, e);
            } finally {
              Ts = Date;
            }
          }
          n.floor = n, n.round = r, n.ceil = u, n.offset = i, n.range = o;
          var c = n.utc = oo(n);
          return c.floor = c, c.round = oo(r), c.ceil = oo(u), c.offset = oo(i), c.range = a, n;
        }
        function oo(n) {
          return function (t, e) {
            try {
              Ts = uo;
              var r = new uo();
              return r._ = t, n(r, e)._;
            } finally {
              Ts = Date;
            }
          };
        }
        function ao(n) {
          function t(t) {
            for (var r, u, i, o = [], a = -1, c = 0; ++a < e;)
              37 === n.charCodeAt(a) && (o.push(n.substring(c, a)), null != (u = Js[r = n.charAt(++a)]) && (r = n.charAt(++a)), (i = Gs[r]) && (r = i(t, null == u ? 'e' === r ? ' ' : '0' : u)), o.push(r), c = a + 1);
            return o.push(n.substring(c, a)), o.join('');
          }
          var e = n.length;
          return t.parse = function (t) {
            var e = {
                y: 1900,
                m: 0,
                d: 1,
                H: 0,
                M: 0,
                S: 0,
                L: 0,
                Z: null
              }, r = co(e, n, t, 0);
            if (r != t.length)
              return null;
            'p' in e && (e.H = e.H % 12 + 12 * e.p);
            var u = null != e.Z && Ts !== uo, i = new (u ? uo : Ts)();
            return 'j' in e ? i.setFullYear(e.y, 0, e.j) : 'w' in e && ('W' in e || 'U' in e) ? (i.setFullYear(e.y, 0, 1), i.setFullYear(e.y, 0, 'W' in e ? (e.w + 6) % 7 + 7 * e.W - (i.getDay() + 5) % 7 : e.w + 7 * e.U - (i.getDay() + 6) % 7)) : i.setFullYear(e.y, e.m, e.d), i.setHours(e.H + Math.floor(e.Z / 100), e.M + e.Z % 100, e.S, e.L), u ? i._ : i;
          }, t.toString = function () {
            return n;
          }, t;
        }
        function co(n, t, e, r) {
          for (var u, i, o, a = 0, c = t.length, s = e.length; c > a;) {
            if (r >= s)
              return -1;
            if (u = t.charCodeAt(a++), 37 === u) {
              if (o = t.charAt(a++), i = Ks[o in Js ? t.charAt(a++) : o], !i || (r = i(n, e, r)) < 0)
                return -1;
            } else if (u != e.charCodeAt(r++))
              return -1;
          }
          return r;
        }
        function so(n) {
          return new RegExp('^(?:' + n.map(Zo.requote).join('|') + ')', 'i');
        }
        function lo(n) {
          for (var t = new u(), e = -1, r = n.length; ++e < r;)
            t.set(n[e].toLowerCase(), e);
          return t;
        }
        function fo(n, t, e) {
          var r = 0 > n ? '-' : '', u = (r ? -n : n) + '', i = u.length;
          return r + (e > i ? new Array(e - i + 1).join(t) + u : u);
        }
        function ho(n, t, e) {
          Is.lastIndex = 0;
          var r = Is.exec(t.substring(e));
          return r ? (n.w = Zs.get(r[0].toLowerCase()), e + r[0].length) : -1;
        }
        function go(n, t, e) {
          Os.lastIndex = 0;
          var r = Os.exec(t.substring(e));
          return r ? (n.w = Ys.get(r[0].toLowerCase()), e + r[0].length) : -1;
        }
        function po(n, t, e) {
          Qs.lastIndex = 0;
          var r = Qs.exec(t.substring(e, e + 1));
          return r ? (n.w = +r[0], e + r[0].length) : -1;
        }
        function vo(n, t, e) {
          Qs.lastIndex = 0;
          var r = Qs.exec(t.substring(e));
          return r ? (n.U = +r[0], e + r[0].length) : -1;
        }
        function mo(n, t, e) {
          Qs.lastIndex = 0;
          var r = Qs.exec(t.substring(e));
          return r ? (n.W = +r[0], e + r[0].length) : -1;
        }
        function yo(n, t, e) {
          $s.lastIndex = 0;
          var r = $s.exec(t.substring(e));
          return r ? (n.m = Bs.get(r[0].toLowerCase()), e + r[0].length) : -1;
        }
        function xo(n, t, e) {
          Vs.lastIndex = 0;
          var r = Vs.exec(t.substring(e));
          return r ? (n.m = Xs.get(r[0].toLowerCase()), e + r[0].length) : -1;
        }
        function Mo(n, t, e) {
          return co(n, Gs.c.toString(), t, e);
        }
        function _o(n, t, e) {
          return co(n, Gs.x.toString(), t, e);
        }
        function bo(n, t, e) {
          return co(n, Gs.X.toString(), t, e);
        }
        function wo(n, t, e) {
          Qs.lastIndex = 0;
          var r = Qs.exec(t.substring(e, e + 4));
          return r ? (n.y = +r[0], e + r[0].length) : -1;
        }
        function So(n, t, e) {
          Qs.lastIndex = 0;
          var r = Qs.exec(t.substring(e, e + 2));
          return r ? (n.y = Eo(+r[0]), e + r[0].length) : -1;
        }
        function ko(n, t, e) {
          return /^[+-]\d{4}$/.test(t = t.substring(e, e + 5)) ? (n.Z = +t, e + 5) : -1;
        }
        function Eo(n) {
          return n + (n > 68 ? 1900 : 2000);
        }
        function Ao(n, t, e) {
          Qs.lastIndex = 0;
          var r = Qs.exec(t.substring(e, e + 2));
          return r ? (n.m = r[0] - 1, e + r[0].length) : -1;
        }
        function Co(n, t, e) {
          Qs.lastIndex = 0;
          var r = Qs.exec(t.substring(e, e + 2));
          return r ? (n.d = +r[0], e + r[0].length) : -1;
        }
        function No(n, t, e) {
          Qs.lastIndex = 0;
          var r = Qs.exec(t.substring(e, e + 3));
          return r ? (n.j = +r[0], e + r[0].length) : -1;
        }
        function Lo(n, t, e) {
          Qs.lastIndex = 0;
          var r = Qs.exec(t.substring(e, e + 2));
          return r ? (n.H = +r[0], e + r[0].length) : -1;
        }
        function To(n, t, e) {
          Qs.lastIndex = 0;
          var r = Qs.exec(t.substring(e, e + 2));
          return r ? (n.M = +r[0], e + r[0].length) : -1;
        }
        function qo(n, t, e) {
          Qs.lastIndex = 0;
          var r = Qs.exec(t.substring(e, e + 2));
          return r ? (n.S = +r[0], e + r[0].length) : -1;
        }
        function zo(n, t, e) {
          Qs.lastIndex = 0;
          var r = Qs.exec(t.substring(e, e + 3));
          return r ? (n.L = +r[0], e + r[0].length) : -1;
        }
        function Ro(n, t, e) {
          var r = nl.get(t.substring(e, e += 2).toLowerCase());
          return null == r ? -1 : (n.p = r, e);
        }
        function Do(n) {
          var t = n.getTimezoneOffset(), e = t > 0 ? '-' : '+', r = ~~(ua(t) / 60), u = ua(t) % 60;
          return e + fo(r, '0', 2) + fo(u, '0', 2);
        }
        function Po(n, t, e) {
          Ws.lastIndex = 0;
          var r = Ws.exec(t.substring(e, e + 1));
          return r ? e + r[0].length : -1;
        }
        function Uo(n) {
          function t(n) {
            try {
              Ts = uo;
              var t = new Ts();
              return t._ = n, e(t);
            } finally {
              Ts = Date;
            }
          }
          var e = ao(n);
          return t.parse = function (n) {
            try {
              Ts = uo;
              var t = e.parse(n);
              return t && t._;
            } finally {
              Ts = Date;
            }
          }, t.toString = e.toString, t;
        }
        function jo(n) {
          return n.toISOString();
        }
        function Ho(n, t, e) {
          function r(t) {
            return n(t);
          }
          function u(n, e) {
            var r = n[1] - n[0], u = r / e, i = Zo.bisect(el, u);
            return i == el.length ? [
              t.year,
              Ni(n.map(function (n) {
                return n / 31536000000;
              }), e)[2]
            ] : i ? t[u / el[i - 1] < el[i] / u ? i - 1 : i] : [
              ol,
              Ni(n, e)[2]
            ];
          }
          return r.invert = function (t) {
            return Fo(n.invert(t));
          }, r.domain = function (t) {
            return arguments.length ? (n.domain(t), r) : n.domain().map(Fo);
          }, r.nice = function (n, t) {
            function e(e) {
              return !isNaN(e) && !n.range(e, Fo(+e + 1), t).length;
            }
            var i = r.domain(), o = Mi(i), a = null == n ? u(o, 10) : 'number' == typeof n && u(o, n);
            return a && (n = a[0], t = a[1]), r.domain(wi(i, t > 1 ? {
              floor: function (t) {
                for (; e(t = n.floor(t));)
                  t = Fo(t - 1);
                return t;
              },
              ceil: function (t) {
                for (; e(t = n.ceil(t));)
                  t = Fo(+t + 1);
                return t;
              }
            } : n));
          }, r.ticks = function (n, t) {
            var e = Mi(r.domain()), i = null == n ? u(e, 10) : 'number' == typeof n ? u(e, n) : !n.range && [
                { range: n },
                t
              ];
            return i && (n = i[0], t = i[1]), n.range(e[0], Fo(+e[1] + 1), 1 > t ? 1 : t);
          }, r.tickFormat = function () {
            return e;
          }, r.copy = function () {
            return Ho(n.copy(), t, e);
          }, Ai(r, n);
        }
        function Fo(n) {
          return new Date(n);
        }
        function Oo(n) {
          return function (t) {
            for (var e = n.length - 1, r = n[e]; !r[1](t);)
              r = n[--e];
            return r[0](t);
          };
        }
        function Yo(n) {
          return JSON.parse(n.responseText);
        }
        function Io(n) {
          var t = $o.createRange();
          return t.selectNode($o.body), t.createContextualFragment(n.responseText);
        }
        var Zo = { version: '3.3.7' };
        Date.now || (Date.now = function () {
          return +new Date();
        });
        var Vo = [].slice, Xo = function (n) {
            return Vo.call(n);
          }, $o = document, Bo = $o.documentElement, Wo = window;
        try {
          Xo(Bo.childNodes)[0].nodeType;
        } catch (Jo) {
          Xo = function (n) {
            for (var t = n.length, e = new Array(t); t--;)
              e[t] = n[t];
            return e;
          };
        }
        try {
          $o.createElement('div').style.setProperty('opacity', 0, '');
        } catch (Go) {
          var Ko = Wo.Element.prototype, Qo = Ko.setAttribute, na = Ko.setAttributeNS, ta = Wo.CSSStyleDeclaration.prototype, ea = ta.setProperty;
          Ko.setAttribute = function (n, t) {
            Qo.call(this, n, t + '');
          }, Ko.setAttributeNS = function (n, t, e) {
            na.call(this, n, t, e + '');
          }, ta.setProperty = function (n, t, e) {
            ea.call(this, n, t + '', e);
          };
        }
        Zo.ascending = function (n, t) {
          return t > n ? -1 : n > t ? 1 : n >= t ? 0 : 0 / 0;
        }, Zo.descending = function (n, t) {
          return n > t ? -1 : t > n ? 1 : t >= n ? 0 : 0 / 0;
        }, Zo.min = function (n, t) {
          var e, r, u = -1, i = n.length;
          if (1 === arguments.length) {
            for (; ++u < i && !(null != (e = n[u]) && e >= e);)
              e = void 0;
            for (; ++u < i;)
              null != (r = n[u]) && e > r && (e = r);
          } else {
            for (; ++u < i && !(null != (e = t.call(n, n[u], u)) && e >= e);)
              e = void 0;
            for (; ++u < i;)
              null != (r = t.call(n, n[u], u)) && e > r && (e = r);
          }
          return e;
        }, Zo.max = function (n, t) {
          var e, r, u = -1, i = n.length;
          if (1 === arguments.length) {
            for (; ++u < i && !(null != (e = n[u]) && e >= e);)
              e = void 0;
            for (; ++u < i;)
              null != (r = n[u]) && r > e && (e = r);
          } else {
            for (; ++u < i && !(null != (e = t.call(n, n[u], u)) && e >= e);)
              e = void 0;
            for (; ++u < i;)
              null != (r = t.call(n, n[u], u)) && r > e && (e = r);
          }
          return e;
        }, Zo.extent = function (n, t) {
          var e, r, u, i = -1, o = n.length;
          if (1 === arguments.length) {
            for (; ++i < o && !(null != (e = u = n[i]) && e >= e);)
              e = u = void 0;
            for (; ++i < o;)
              null != (r = n[i]) && (e > r && (e = r), r > u && (u = r));
          } else {
            for (; ++i < o && !(null != (e = u = t.call(n, n[i], i)) && e >= e);)
              e = void 0;
            for (; ++i < o;)
              null != (r = t.call(n, n[i], i)) && (e > r && (e = r), r > u && (u = r));
          }
          return [
            e,
            u
          ];
        }, Zo.sum = function (n, t) {
          var e, r = 0, u = n.length, i = -1;
          if (1 === arguments.length)
            for (; ++i < u;)
              isNaN(e = +n[i]) || (r += e);
          else
            for (; ++i < u;)
              isNaN(e = +t.call(n, n[i], i)) || (r += e);
          return r;
        }, Zo.mean = function (t, e) {
          var r, u = t.length, i = 0, o = -1, a = 0;
          if (1 === arguments.length)
            for (; ++o < u;)
              n(r = t[o]) && (i += (r - i) / ++a);
          else
            for (; ++o < u;)
              n(r = e.call(t, t[o], o)) && (i += (r - i) / ++a);
          return a ? i : void 0;
        }, Zo.quantile = function (n, t) {
          var e = (n.length - 1) * t + 1, r = Math.floor(e), u = +n[r - 1], i = e - r;
          return i ? u + i * (n[r] - u) : u;
        }, Zo.median = function (t, e) {
          return arguments.length > 1 && (t = t.map(e)), t = t.filter(n), t.length ? Zo.quantile(t.sort(Zo.ascending), 0.5) : void 0;
        }, Zo.bisector = function (n) {
          return {
            left: function (t, e, r, u) {
              for (arguments.length < 3 && (r = 0), arguments.length < 4 && (u = t.length); u > r;) {
                var i = r + u >>> 1;
                n.call(t, t[i], i) < e ? r = i + 1 : u = i;
              }
              return r;
            },
            right: function (t, e, r, u) {
              for (arguments.length < 3 && (r = 0), arguments.length < 4 && (u = t.length); u > r;) {
                var i = r + u >>> 1;
                e < n.call(t, t[i], i) ? u = i : r = i + 1;
              }
              return r;
            }
          };
        };
        var ra = Zo.bisector(function (n) {
            return n;
          });
        Zo.bisectLeft = ra.left, Zo.bisect = Zo.bisectRight = ra.right, Zo.shuffle = function (n) {
          for (var t, e, r = n.length; r;)
            e = 0 | Math.random() * r--, t = n[r], n[r] = n[e], n[e] = t;
          return n;
        }, Zo.permute = function (n, t) {
          for (var e = t.length, r = new Array(e); e--;)
            r[e] = n[t[e]];
          return r;
        }, Zo.pairs = function (n) {
          for (var t, e = 0, r = n.length - 1, u = n[0], i = new Array(0 > r ? 0 : r); r > e;)
            i[e] = [
              t = u,
              u = n[++e]
            ];
          return i;
        }, Zo.zip = function () {
          if (!(u = arguments.length))
            return [];
          for (var n = -1, e = Zo.min(arguments, t), r = new Array(e); ++n < e;)
            for (var u, i = -1, o = r[n] = new Array(u); ++i < u;)
              o[i] = arguments[i][n];
          return r;
        }, Zo.transpose = function (n) {
          return Zo.zip.apply(Zo, n);
        }, Zo.keys = function (n) {
          var t = [];
          for (var e in n)
            t.push(e);
          return t;
        }, Zo.values = function (n) {
          var t = [];
          for (var e in n)
            t.push(n[e]);
          return t;
        }, Zo.entries = function (n) {
          var t = [];
          for (var e in n)
            t.push({
              key: e,
              value: n[e]
            });
          return t;
        }, Zo.merge = function (n) {
          for (var t, e, r, u = n.length, i = -1, o = 0; ++i < u;)
            o += n[i].length;
          for (e = new Array(o); --u >= 0;)
            for (r = n[u], t = r.length; --t >= 0;)
              e[--o] = r[t];
          return e;
        };
        var ua = Math.abs;
        Zo.range = function (n, t, r) {
          if (arguments.length < 3 && (r = 1, arguments.length < 2 && (t = n, n = 0)), 1 / 0 === (t - n) / r)
            throw new Error('infinite range');
          var u, i = [], o = e(ua(r)), a = -1;
          if (n *= o, t *= o, r *= o, 0 > r)
            for (; (u = n + r * ++a) > t;)
              i.push(u / o);
          else
            for (; (u = n + r * ++a) < t;)
              i.push(u / o);
          return i;
        }, Zo.map = function (n) {
          var t = new u();
          if (n instanceof u)
            n.forEach(function (n, e) {
              t.set(n, e);
            });
          else
            for (var e in n)
              t.set(e, n[e]);
          return t;
        }, r(u, {
          has: function (n) {
            return ia + n in this;
          },
          get: function (n) {
            return this[ia + n];
          },
          set: function (n, t) {
            return this[ia + n] = t;
          },
          remove: function (n) {
            return n = ia + n, n in this && delete this[n];
          },
          keys: function () {
            var n = [];
            return this.forEach(function (t) {
              n.push(t);
            }), n;
          },
          values: function () {
            var n = [];
            return this.forEach(function (t, e) {
              n.push(e);
            }), n;
          },
          entries: function () {
            var n = [];
            return this.forEach(function (t, e) {
              n.push({
                key: t,
                value: e
              });
            }), n;
          },
          forEach: function (n) {
            for (var t in this)
              t.charCodeAt(0) === oa && n.call(this, t.substring(1), this[t]);
          }
        });
        var ia = '\0', oa = ia.charCodeAt(0);
        Zo.nest = function () {
          function n(t, a, c) {
            if (c >= o.length)
              return r ? r.call(i, a) : e ? a.sort(e) : a;
            for (var s, l, f, h, g = -1, p = a.length, v = o[c++], d = new u(); ++g < p;)
              (h = d.get(s = v(l = a[g]))) ? h.push(l) : d.set(s, [l]);
            return t ? (l = t(), f = function (e, r) {
              l.set(e, n(t, r, c));
            }) : (l = {}, f = function (e, r) {
              l[e] = n(t, r, c);
            }), d.forEach(f), l;
          }
          function t(n, e) {
            if (e >= o.length)
              return n;
            var r = [], u = a[e++];
            return n.forEach(function (n, u) {
              r.push({
                key: n,
                values: t(u, e)
              });
            }), u ? r.sort(function (n, t) {
              return u(n.key, t.key);
            }) : r;
          }
          var e, r, i = {}, o = [], a = [];
          return i.map = function (t, e) {
            return n(e, t, 0);
          }, i.entries = function (e) {
            return t(n(Zo.map, e, 0), 0);
          }, i.key = function (n) {
            return o.push(n), i;
          }, i.sortKeys = function (n) {
            return a[o.length - 1] = n, i;
          }, i.sortValues = function (n) {
            return e = n, i;
          }, i.rollup = function (n) {
            return r = n, i;
          }, i;
        }, Zo.set = function (n) {
          var t = new i();
          if (n)
            for (var e = 0, r = n.length; r > e; ++e)
              t.add(n[e]);
          return t;
        }, r(i, {
          has: function (n) {
            return ia + n in this;
          },
          add: function (n) {
            return this[ia + n] = !0, n;
          },
          remove: function (n) {
            return n = ia + n, n in this && delete this[n];
          },
          values: function () {
            var n = [];
            return this.forEach(function (t) {
              n.push(t);
            }), n;
          },
          forEach: function (n) {
            for (var t in this)
              t.charCodeAt(0) === oa && n.call(this, t.substring(1));
          }
        }), Zo.behavior = {}, Zo.rebind = function (n, t) {
          for (var e, r = 1, u = arguments.length; ++r < u;)
            n[e = arguments[r]] = o(n, t, t[e]);
          return n;
        };
        var aa = [
            'webkit',
            'ms',
            'moz',
            'Moz',
            'o',
            'O'
          ];
        Zo.dispatch = function () {
          for (var n = new s(), t = -1, e = arguments.length; ++t < e;)
            n[arguments[t]] = l(n);
          return n;
        }, s.prototype.on = function (n, t) {
          var e = n.indexOf('.'), r = '';
          if (e >= 0 && (r = n.substring(e + 1), n = n.substring(0, e)), n)
            return arguments.length < 2 ? this[n].on(r) : this[n].on(r, t);
          if (2 === arguments.length) {
            if (null == t)
              for (n in this)
                this.hasOwnProperty(n) && this[n].on(r, null);
            return this;
          }
        }, Zo.event = null, Zo.requote = function (n) {
          return n.replace(ca, '\\$&');
        };
        var ca = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g, sa = {}.__proto__ ? function (n, t) {
            n.__proto__ = t;
          } : function (n, t) {
            for (var e in t)
              n[e] = t[e];
          }, la = function (n, t) {
            return t.querySelector(n);
          }, fa = function (n, t) {
            return t.querySelectorAll(n);
          }, ha = Bo[a(Bo, 'matchesSelector')], ga = function (n, t) {
            return ha.call(n, t);
          };
        'function' == typeof Sizzle && (la = function (n, t) {
          return Sizzle(n, t)[0] || null;
        }, fa = function (n, t) {
          return Sizzle.uniqueSort(Sizzle(n, t));
        }, ga = Sizzle.matchesSelector), Zo.selection = function () {
          return ma;
        };
        var pa = Zo.selection.prototype = [];
        pa.select = function (n) {
          var t, e, r, u, i = [];
          n = v(n);
          for (var o = -1, a = this.length; ++o < a;) {
            i.push(t = []), t.parentNode = (r = this[o]).parentNode;
            for (var c = -1, s = r.length; ++c < s;)
              (u = r[c]) ? (t.push(e = n.call(u, u.__data__, c, o)), e && '__data__' in u && (e.__data__ = u.__data__)) : t.push(null);
          }
          return p(i);
        }, pa.selectAll = function (n) {
          var t, e, r = [];
          n = d(n);
          for (var u = -1, i = this.length; ++u < i;)
            for (var o = this[u], a = -1, c = o.length; ++a < c;)
              (e = o[a]) && (r.push(t = Xo(n.call(e, e.__data__, a, u))), t.parentNode = e);
          return p(r);
        };
        var va = {
            svg: 'http://www.w3.org/2000/svg',
            xhtml: 'http://www.w3.org/1999/xhtml',
            xlink: 'http://www.w3.org/1999/xlink',
            xml: 'http://www.w3.org/XML/1998/namespace',
            xmlns: 'http://www.w3.org/2000/xmlns/'
          };
        Zo.ns = {
          prefix: va,
          qualify: function (n) {
            var t = n.indexOf(':'), e = n;
            return t >= 0 && (e = n.substring(0, t), n = n.substring(t + 1)), va.hasOwnProperty(e) ? {
              space: va[e],
              local: n
            } : n;
          }
        }, pa.attr = function (n, t) {
          if (arguments.length < 2) {
            if ('string' == typeof n) {
              var e = this.node();
              return n = Zo.ns.qualify(n), n.local ? e.getAttributeNS(n.space, n.local) : e.getAttribute(n);
            }
            for (t in n)
              this.each(m(t, n[t]));
            return this;
          }
          return this.each(m(n, t));
        }, pa.classed = function (n, t) {
          if (arguments.length < 2) {
            if ('string' == typeof n) {
              var e = this.node(), r = (n = n.trim().split(/^|\s+/g)).length, u = -1;
              if (t = e.classList) {
                for (; ++u < r;)
                  if (!t.contains(n[u]))
                    return !1;
              } else
                for (t = e.getAttribute('class'); ++u < r;)
                  if (!x(n[u]).test(t))
                    return !1;
              return !0;
            }
            for (t in n)
              this.each(M(t, n[t]));
            return this;
          }
          return this.each(M(n, t));
        }, pa.style = function (n, t, e) {
          var r = arguments.length;
          if (3 > r) {
            if ('string' != typeof n) {
              2 > r && (t = '');
              for (e in n)
                this.each(b(e, n[e], t));
              return this;
            }
            if (2 > r)
              return Wo.getComputedStyle(this.node(), null).getPropertyValue(n);
            e = '';
          }
          return this.each(b(n, t, e));
        }, pa.property = function (n, t) {
          if (arguments.length < 2) {
            if ('string' == typeof n)
              return this.node()[n];
            for (t in n)
              this.each(w(t, n[t]));
            return this;
          }
          return this.each(w(n, t));
        }, pa.text = function (n) {
          return arguments.length ? this.each('function' == typeof n ? function () {
            var t = n.apply(this, arguments);
            this.textContent = null == t ? '' : t;
          } : null == n ? function () {
            this.textContent = '';
          } : function () {
            this.textContent = n;
          }) : this.node().textContent;
        }, pa.html = function (n) {
          return arguments.length ? this.each('function' == typeof n ? function () {
            var t = n.apply(this, arguments);
            this.innerHTML = null == t ? '' : t;
          } : null == n ? function () {
            this.innerHTML = '';
          } : function () {
            this.innerHTML = n;
          }) : this.node().innerHTML;
        }, pa.append = function (n) {
          return n = S(n), this.select(function () {
            return this.appendChild(n.apply(this, arguments));
          });
        }, pa.insert = function (n, t) {
          return n = S(n), t = v(t), this.select(function () {
            return this.insertBefore(n.apply(this, arguments), t.apply(this, arguments) || null);
          });
        }, pa.remove = function () {
          return this.each(function () {
            var n = this.parentNode;
            n && n.removeChild(this);
          });
        }, pa.data = function (n, t) {
          function e(n, e) {
            var r, i, o, a = n.length, f = e.length, h = Math.min(a, f), g = new Array(f), p = new Array(f), v = new Array(a);
            if (t) {
              var d, m = new u(), y = new u(), x = [];
              for (r = -1; ++r < a;)
                d = t.call(i = n[r], i.__data__, r), m.has(d) ? v[r] = i : m.set(d, i), x.push(d);
              for (r = -1; ++r < f;)
                d = t.call(e, o = e[r], r), (i = m.get(d)) ? (g[r] = i, i.__data__ = o) : y.has(d) || (p[r] = k(o)), y.set(d, o), m.remove(d);
              for (r = -1; ++r < a;)
                m.has(x[r]) && (v[r] = n[r]);
            } else {
              for (r = -1; ++r < h;)
                i = n[r], o = e[r], i ? (i.__data__ = o, g[r] = i) : p[r] = k(o);
              for (; f > r; ++r)
                p[r] = k(e[r]);
              for (; a > r; ++r)
                v[r] = n[r];
            }
            p.update = g, p.parentNode = g.parentNode = v.parentNode = n.parentNode, c.push(p), s.push(g), l.push(v);
          }
          var r, i, o = -1, a = this.length;
          if (!arguments.length) {
            for (n = new Array(a = (r = this[0]).length); ++o < a;)
              (i = r[o]) && (n[o] = i.__data__);
            return n;
          }
          var c = N([]), s = p([]), l = p([]);
          if ('function' == typeof n)
            for (; ++o < a;)
              e(r = this[o], n.call(r, r.parentNode.__data__, o));
          else
            for (; ++o < a;)
              e(r = this[o], n);
          return s.enter = function () {
            return c;
          }, s.exit = function () {
            return l;
          }, s;
        }, pa.datum = function (n) {
          return arguments.length ? this.property('__data__', n) : this.property('__data__');
        }, pa.filter = function (n) {
          var t, e, r, u = [];
          'function' != typeof n && (n = E(n));
          for (var i = 0, o = this.length; o > i; i++) {
            u.push(t = []), t.parentNode = (e = this[i]).parentNode;
            for (var a = 0, c = e.length; c > a; a++)
              (r = e[a]) && n.call(r, r.__data__, a) && t.push(r);
          }
          return p(u);
        }, pa.order = function () {
          for (var n = -1, t = this.length; ++n < t;)
            for (var e, r = this[n], u = r.length - 1, i = r[u]; --u >= 0;)
              (e = r[u]) && (i && i !== e.nextSibling && i.parentNode.insertBefore(e, i), i = e);
          return this;
        }, pa.sort = function (n) {
          n = A.apply(this, arguments);
          for (var t = -1, e = this.length; ++t < e;)
            this[t].sort(n);
          return this.order();
        }, pa.each = function (n) {
          return C(this, function (t, e, r) {
            n.call(t, t.__data__, e, r);
          });
        }, pa.call = function (n) {
          var t = Xo(arguments);
          return n.apply(t[0] = this, t), this;
        }, pa.empty = function () {
          return !this.node();
        }, pa.node = function () {
          for (var n = 0, t = this.length; t > n; n++)
            for (var e = this[n], r = 0, u = e.length; u > r; r++) {
              var i = e[r];
              if (i)
                return i;
            }
          return null;
        }, pa.size = function () {
          var n = 0;
          return this.each(function () {
            ++n;
          }), n;
        };
        var da = [];
        Zo.selection.enter = N, Zo.selection.enter.prototype = da, da.append = pa.append, da.empty = pa.empty, da.node = pa.node, da.call = pa.call, da.size = pa.size, da.select = function (n) {
          for (var t, e, r, u, i, o = [], a = -1, c = this.length; ++a < c;) {
            r = (u = this[a]).update, o.push(t = []), t.parentNode = u.parentNode;
            for (var s = -1, l = u.length; ++s < l;)
              (i = u[s]) ? (t.push(r[s] = e = n.call(u.parentNode, i.__data__, s, a)), e.__data__ = i.__data__) : t.push(null);
          }
          return p(o);
        }, da.insert = function (n, t) {
          return arguments.length < 2 && (t = L(this)), pa.insert.call(this, n, t);
        }, pa.transition = function () {
          for (var n, t, e = Ms || ++ks, r = [], u = _s || {
                time: Date.now(),
                ease: iu,
                delay: 0,
                duration: 250
              }, i = -1, o = this.length; ++i < o;) {
            r.push(n = []);
            for (var a = this[i], c = -1, s = a.length; ++c < s;)
              (t = a[c]) && to(t, c, e, u), n.push(t);
          }
          return Ki(r, e);
        }, pa.interrupt = function () {
          return this.each(T);
        }, Zo.select = function (n) {
          var t = ['string' == typeof n ? la(n, $o) : n];
          return t.parentNode = Bo, p([t]);
        }, Zo.selectAll = function (n) {
          var t = Xo('string' == typeof n ? fa(n, $o) : n);
          return t.parentNode = Bo, p([t]);
        };
        var ma = Zo.select(Bo);
        pa.on = function (n, t, e) {
          var r = arguments.length;
          if (3 > r) {
            if ('string' != typeof n) {
              2 > r && (t = !1);
              for (e in n)
                this.each(q(e, n[e], t));
              return this;
            }
            if (2 > r)
              return (r = this.node()['__on' + n]) && r._;
            e = !1;
          }
          return this.each(q(n, t, e));
        };
        var ya = Zo.map({
            mouseenter: 'mouseover',
            mouseleave: 'mouseout'
          });
        ya.forEach(function (n) {
          'on' + n in $o && ya.remove(n);
        });
        var xa = a(Bo.style, 'userSelect'), Ma = 0;
        Zo.mouse = function (n) {
          return P(n, h());
        };
        var _a = /WebKit/.test(Wo.navigator.userAgent) ? -1 : 0;
        Zo.touches = function (n, t) {
          return arguments.length < 2 && (t = h().touches), t ? Xo(t).map(function (t) {
            var e = P(n, t);
            return e.identifier = t.identifier, e;
          }) : [];
        }, Zo.behavior.drag = function () {
          function n() {
            this.on('mousedown.drag', o).on('touchstart.drag', a);
          }
          function t() {
            return Zo.event.changedTouches[0].identifier;
          }
          function e(n, t) {
            return Zo.touches(n).filter(function (n) {
              return n.identifier === t;
            })[0];
          }
          function r(n, t, e, r) {
            return function () {
              function o() {
                var n = t(l, g), e = n[0] - v[0], r = n[1] - v[1];
                d |= e | r, v = n, f({
                  type: 'drag',
                  x: n[0] + c[0],
                  y: n[1] + c[1],
                  dx: e,
                  dy: r
                });
              }
              function a() {
                m.on(e + '.' + p, null).on(r + '.' + p, null), y(d && Zo.event.target === h), f({ type: 'dragend' });
              }
              var c, s = this, l = s.parentNode, f = u.of(s, arguments), h = Zo.event.target, g = n(), p = null == g ? 'drag' : 'drag-' + g, v = t(l, g), d = 0, m = Zo.select(Wo).on(e + '.' + p, o).on(r + '.' + p, a), y = D();
              i ? (c = i.apply(s, arguments), c = [
                c.x - v[0],
                c.y - v[1]
              ]) : c = [
                0,
                0
              ], f({ type: 'dragstart' });
            };
          }
          var u = g(n, 'drag', 'dragstart', 'dragend'), i = null, o = r(c, Zo.mouse, 'mousemove', 'mouseup'), a = r(t, e, 'touchmove', 'touchend');
          return n.origin = function (t) {
            return arguments.length ? (i = t, n) : i;
          }, Zo.rebind(n, u, 'on');
        };
        var ba = Math.PI, wa = 2 * ba, Sa = ba / 2, ka = 0.000001, Ea = ka * ka, Aa = ba / 180, Ca = 180 / ba, Na = Math.SQRT2, La = 2, Ta = 4;
        Zo.interpolateZoom = function (n, t) {
          function e(n) {
            var t = n * y;
            if (m) {
              var e = O(v), o = i / (La * h) * (e * Y(Na * t + v) - F(v));
              return [
                r + o * s,
                u + o * l,
                i * e / O(Na * t + v)
              ];
            }
            return [
              r + n * s,
              u + n * l,
              i * Math.exp(Na * t)
            ];
          }
          var r = n[0], u = n[1], i = n[2], o = t[0], a = t[1], c = t[2], s = o - r, l = a - u, f = s * s + l * l, h = Math.sqrt(f), g = (c * c - i * i + Ta * f) / (2 * i * La * h), p = (c * c - i * i - Ta * f) / (2 * c * La * h), v = Math.log(Math.sqrt(g * g + 1) - g), d = Math.log(Math.sqrt(p * p + 1) - p), m = d - v, y = (m || Math.log(c / i)) / Na;
          return e.duration = 1000 * y, e;
        }, Zo.behavior.zoom = function () {
          function n(n) {
            n.on(A, s).on(Ra + '.zoom', h).on(C, p).on('dblclick.zoom', v).on(L, l);
          }
          function t(n) {
            return [
              (n[0] - S.x) / S.k,
              (n[1] - S.y) / S.k
            ];
          }
          function e(n) {
            return [
              n[0] * S.k + S.x,
              n[1] * S.k + S.y
            ];
          }
          function r(n) {
            S.k = Math.max(E[0], Math.min(E[1], n));
          }
          function u(n, t) {
            t = e(t), S.x += n[0] - t[0], S.y += n[1] - t[1];
          }
          function i() {
            _ && _.domain(M.range().map(function (n) {
              return (n - S.x) / S.k;
            }).map(M.invert)), w && w.domain(b.range().map(function (n) {
              return (n - S.y) / S.k;
            }).map(b.invert));
          }
          function o(n) {
            n({ type: 'zoomstart' });
          }
          function a(n) {
            i(), n({
              type: 'zoom',
              scale: S.k,
              translate: [
                S.x,
                S.y
              ]
            });
          }
          function c(n) {
            n({ type: 'zoomend' });
          }
          function s() {
            function n() {
              l = 1, u(Zo.mouse(r), h), a(i);
            }
            function e() {
              f.on(C, Wo === r ? p : null).on(N, null), g(l && Zo.event.target === s), c(i);
            }
            var r = this, i = q.of(r, arguments), s = Zo.event.target, l = 0, f = Zo.select(Wo).on(C, n).on(N, e), h = t(Zo.mouse(r)), g = D();
            T.call(r), o(i);
          }
          function l() {
            function n() {
              var n = Zo.touches(p);
              return g = S.k, n.forEach(function (n) {
                n.identifier in d && (d[n.identifier] = t(n));
              }), n;
            }
            function e() {
              for (var t = Zo.event.changedTouches, e = 0, i = t.length; i > e; ++e)
                d[t[e].identifier] = null;
              var o = n(), c = Date.now();
              if (1 === o.length) {
                if (500 > c - x) {
                  var s = o[0], l = d[s.identifier];
                  r(2 * S.k), u(s, l), f(), a(v);
                }
                x = c;
              } else if (o.length > 1) {
                var s = o[0], h = o[1], g = s[0] - h[0], p = s[1] - h[1];
                m = g * g + p * p;
              }
            }
            function i() {
              for (var n, t, e, i, o = Zo.touches(p), c = 0, s = o.length; s > c; ++c, i = null)
                if (e = o[c], i = d[e.identifier]) {
                  if (t)
                    break;
                  n = e, t = i;
                }
              if (i) {
                var l = (l = e[0] - n[0]) * l + (l = e[1] - n[1]) * l, f = m && Math.sqrt(l / m);
                n = [
                  (n[0] + e[0]) / 2,
                  (n[1] + e[1]) / 2
                ], t = [
                  (t[0] + i[0]) / 2,
                  (t[1] + i[1]) / 2
                ], r(f * g);
              }
              x = null, u(n, t), a(v);
            }
            function h() {
              if (Zo.event.touches.length) {
                for (var t = Zo.event.changedTouches, e = 0, r = t.length; r > e; ++e)
                  delete d[t[e].identifier];
                for (var u in d)
                  return void n();
              }
              b.on(M, null).on(_, null), w.on(A, s).on(L, l), k(), c(v);
            }
            var g, p = this, v = q.of(p, arguments), d = {}, m = 0, y = Zo.event.changedTouches[0].identifier, M = 'touchmove.zoom-' + y, _ = 'touchend.zoom-' + y, b = Zo.select(Wo).on(M, i).on(_, h), w = Zo.select(p).on(A, null).on(L, e), k = D();
            T.call(p), e(), o(v);
          }
          function h() {
            var n = q.of(this, arguments);
            y ? clearTimeout(y) : (T.call(this), o(n)), y = setTimeout(function () {
              y = null, c(n);
            }, 50), f();
            var e = m || Zo.mouse(this);
            d || (d = t(e)), r(Math.pow(2, 0.002 * qa()) * S.k), u(e, d), a(n);
          }
          function p() {
            d = null;
          }
          function v() {
            var n = q.of(this, arguments), e = Zo.mouse(this), i = t(e), s = Math.log(S.k) / Math.LN2;
            o(n), r(Math.pow(2, Zo.event.shiftKey ? Math.ceil(s) - 1 : Math.floor(s) + 1)), u(e, i), a(n), c(n);
          }
          var d, m, y, x, M, _, b, w, S = {
              x: 0,
              y: 0,
              k: 1
            }, k = [
              960,
              500
            ], E = za, A = 'mousedown.zoom', C = 'mousemove.zoom', N = 'mouseup.zoom', L = 'touchstart.zoom', q = g(n, 'zoomstart', 'zoom', 'zoomend');
          return n.event = function (n) {
            n.each(function () {
              var n = q.of(this, arguments), t = S;
              Ms ? Zo.select(this).transition().each('start.zoom', function () {
                S = this.__chart__ || {
                  x: 0,
                  y: 0,
                  k: 1
                }, o(n);
              }).tween('zoom:zoom', function () {
                var e = k[0], r = k[1], u = e / 2, i = r / 2, o = Zo.interpolateZoom([
                    (u - S.x) / S.k,
                    (i - S.y) / S.k,
                    e / S.k
                  ], [
                    (u - t.x) / t.k,
                    (i - t.y) / t.k,
                    e / t.k
                  ]);
                return function (t) {
                  var r = o(t), c = e / r[2];
                  this.__chart__ = S = {
                    x: u - r[0] * c,
                    y: i - r[1] * c,
                    k: c
                  }, a(n);
                };
              }).each('end.zoom', function () {
                c(n);
              }) : (this.__chart__ = S, o(n), a(n), c(n));
            });
          }, n.translate = function (t) {
            return arguments.length ? (S = {
              x: +t[0],
              y: +t[1],
              k: S.k
            }, i(), n) : [
              S.x,
              S.y
            ];
          }, n.scale = function (t) {
            return arguments.length ? (S = {
              x: S.x,
              y: S.y,
              k: +t
            }, i(), n) : S.k;
          }, n.scaleExtent = function (t) {
            return arguments.length ? (E = null == t ? za : [
              +t[0],
              +t[1]
            ], n) : E;
          }, n.center = function (t) {
            return arguments.length ? (m = t && [
              +t[0],
              +t[1]
            ], n) : m;
          }, n.size = function (t) {
            return arguments.length ? (k = t && [
              +t[0],
              +t[1]
            ], n) : k;
          }, n.x = function (t) {
            return arguments.length ? (_ = t, M = t.copy(), S = {
              x: 0,
              y: 0,
              k: 1
            }, n) : _;
          }, n.y = function (t) {
            return arguments.length ? (w = t, b = t.copy(), S = {
              x: 0,
              y: 0,
              k: 1
            }, n) : w;
          }, Zo.rebind(n, q, 'on');
        };
        var qa, za = [
            0,
            1 / 0
          ], Ra = 'onwheel' in $o ? (qa = function () {
            return -Zo.event.deltaY * (Zo.event.deltaMode ? 120 : 1);
          }, 'wheel') : 'onmousewheel' in $o ? (qa = function () {
            return Zo.event.wheelDelta;
          }, 'mousewheel') : (qa = function () {
            return -Zo.event.detail;
          }, 'MozMousePixelScroll');
        Z.prototype.toString = function () {
          return this.rgb() + '';
        }, Zo.hsl = function (n, t, e) {
          return 1 === arguments.length ? n instanceof X ? V(n.h, n.s, n.l) : st('' + n, lt, V) : V(+n, +t, +e);
        };
        var Da = X.prototype = new Z();
        Da.brighter = function (n) {
          return n = Math.pow(0.7, arguments.length ? n : 1), V(this.h, this.s, this.l / n);
        }, Da.darker = function (n) {
          return n = Math.pow(0.7, arguments.length ? n : 1), V(this.h, this.s, n * this.l);
        }, Da.rgb = function () {
          return $(this.h, this.s, this.l);
        }, Zo.hcl = function (n, t, e) {
          return 1 === arguments.length ? n instanceof W ? B(n.h, n.c, n.l) : n instanceof K ? nt(n.l, n.a, n.b) : nt((n = ft((n = Zo.rgb(n)).r, n.g, n.b)).l, n.a, n.b) : B(+n, +t, +e);
        };
        var Pa = W.prototype = new Z();
        Pa.brighter = function (n) {
          return B(this.h, this.c, Math.min(100, this.l + Ua * (arguments.length ? n : 1)));
        }, Pa.darker = function (n) {
          return B(this.h, this.c, Math.max(0, this.l - Ua * (arguments.length ? n : 1)));
        }, Pa.rgb = function () {
          return J(this.h, this.c, this.l).rgb();
        }, Zo.lab = function (n, t, e) {
          return 1 === arguments.length ? n instanceof K ? G(n.l, n.a, n.b) : n instanceof W ? J(n.l, n.c, n.h) : ft((n = Zo.rgb(n)).r, n.g, n.b) : G(+n, +t, +e);
        };
        var Ua = 18, ja = 0.95047, Ha = 1, Fa = 1.08883, Oa = K.prototype = new Z();
        Oa.brighter = function (n) {
          return G(Math.min(100, this.l + Ua * (arguments.length ? n : 1)), this.a, this.b);
        }, Oa.darker = function (n) {
          return G(Math.max(0, this.l - Ua * (arguments.length ? n : 1)), this.a, this.b);
        }, Oa.rgb = function () {
          return Q(this.l, this.a, this.b);
        }, Zo.rgb = function (n, t, e) {
          return 1 === arguments.length ? n instanceof at ? ot(n.r, n.g, n.b) : st('' + n, ot, $) : ot(~~n, ~~t, ~~e);
        };
        var Ya = at.prototype = new Z();
        Ya.brighter = function (n) {
          n = Math.pow(0.7, arguments.length ? n : 1);
          var t = this.r, e = this.g, r = this.b, u = 30;
          return t || e || r ? (t && u > t && (t = u), e && u > e && (e = u), r && u > r && (r = u), ot(Math.min(255, ~~(t / n)), Math.min(255, ~~(e / n)), Math.min(255, ~~(r / n)))) : ot(u, u, u);
        }, Ya.darker = function (n) {
          return n = Math.pow(0.7, arguments.length ? n : 1), ot(~~(n * this.r), ~~(n * this.g), ~~(n * this.b));
        }, Ya.hsl = function () {
          return lt(this.r, this.g, this.b);
        }, Ya.toString = function () {
          return '#' + ct(this.r) + ct(this.g) + ct(this.b);
        };
        var Ia = Zo.map({
            aliceblue: 15792383,
            antiquewhite: 16444375,
            aqua: 65535,
            aquamarine: 8388564,
            azure: 15794175,
            beige: 16119260,
            bisque: 16770244,
            black: 0,
            blanchedalmond: 16772045,
            blue: 255,
            blueviolet: 9055202,
            brown: 10824234,
            burlywood: 14596231,
            cadetblue: 6266528,
            chartreuse: 8388352,
            chocolate: 13789470,
            coral: 16744272,
            cornflowerblue: 6591981,
            cornsilk: 16775388,
            crimson: 14423100,
            cyan: 65535,
            darkblue: 139,
            darkcyan: 35723,
            darkgoldenrod: 12092939,
            darkgray: 11119017,
            darkgreen: 25600,
            darkgrey: 11119017,
            darkkhaki: 12433259,
            darkmagenta: 9109643,
            darkolivegreen: 5597999,
            darkorange: 16747520,
            darkorchid: 10040012,
            darkred: 9109504,
            darksalmon: 15308410,
            darkseagreen: 9419919,
            darkslateblue: 4734347,
            darkslategray: 3100495,
            darkslategrey: 3100495,
            darkturquoise: 52945,
            darkviolet: 9699539,
            deeppink: 16716947,
            deepskyblue: 49151,
            dimgray: 6908265,
            dimgrey: 6908265,
            dodgerblue: 2003199,
            firebrick: 11674146,
            floralwhite: 16775920,
            forestgreen: 2263842,
            fuchsia: 16711935,
            gainsboro: 14474460,
            ghostwhite: 16316671,
            gold: 16766720,
            goldenrod: 14329120,
            gray: 8421504,
            green: 32768,
            greenyellow: 11403055,
            grey: 8421504,
            honeydew: 15794160,
            hotpink: 16738740,
            indianred: 13458524,
            indigo: 4915330,
            ivory: 16777200,
            khaki: 15787660,
            lavender: 15132410,
            lavenderblush: 16773365,
            lawngreen: 8190976,
            lemonchiffon: 16775885,
            lightblue: 11393254,
            lightcoral: 15761536,
            lightcyan: 14745599,
            lightgoldenrodyellow: 16448210,
            lightgray: 13882323,
            lightgreen: 9498256,
            lightgrey: 13882323,
            lightpink: 16758465,
            lightsalmon: 16752762,
            lightseagreen: 2142890,
            lightskyblue: 8900346,
            lightslategray: 7833753,
            lightslategrey: 7833753,
            lightsteelblue: 11584734,
            lightyellow: 16777184,
            lime: 65280,
            limegreen: 3329330,
            linen: 16445670,
            magenta: 16711935,
            maroon: 8388608,
            mediumaquamarine: 6737322,
            mediumblue: 205,
            mediumorchid: 12211667,
            mediumpurple: 9662683,
            mediumseagreen: 3978097,
            mediumslateblue: 8087790,
            mediumspringgreen: 64154,
            mediumturquoise: 4772300,
            mediumvioletred: 13047173,
            midnightblue: 1644912,
            mintcream: 16121850,
            mistyrose: 16770273,
            moccasin: 16770229,
            navajowhite: 16768685,
            navy: 128,
            oldlace: 16643558,
            olive: 8421376,
            olivedrab: 7048739,
            orange: 16753920,
            orangered: 16729344,
            orchid: 14315734,
            palegoldenrod: 15657130,
            palegreen: 10025880,
            paleturquoise: 11529966,
            palevioletred: 14381203,
            papayawhip: 16773077,
            peachpuff: 16767673,
            peru: 13468991,
            pink: 16761035,
            plum: 14524637,
            powderblue: 11591910,
            purple: 8388736,
            red: 16711680,
            rosybrown: 12357519,
            royalblue: 4286945,
            saddlebrown: 9127187,
            salmon: 16416882,
            sandybrown: 16032864,
            seagreen: 3050327,
            seashell: 16774638,
            sienna: 10506797,
            silver: 12632256,
            skyblue: 8900331,
            slateblue: 6970061,
            slategray: 7372944,
            slategrey: 7372944,
            snow: 16775930,
            springgreen: 65407,
            steelblue: 4620980,
            tan: 13808780,
            teal: 32896,
            thistle: 14204888,
            tomato: 16737095,
            turquoise: 4251856,
            violet: 15631086,
            wheat: 16113331,
            white: 16777215,
            whitesmoke: 16119285,
            yellow: 16776960,
            yellowgreen: 10145074
          });
        Ia.forEach(function (n, t) {
          Ia.set(n, ut(t));
        }), Zo.functor = pt, Zo.xhr = dt(vt), Zo.dsv = function (n, t) {
          function e(n, e, i) {
            arguments.length < 3 && (i = e, e = null);
            var o = Zo.xhr(n, t, i);
            return o.row = function (n) {
              return arguments.length ? o.response(null == (e = n) ? r : u(n)) : e;
            }, o.row(e);
          }
          function r(n) {
            return e.parse(n.responseText);
          }
          function u(n) {
            return function (t) {
              return e.parse(t.responseText, n);
            };
          }
          function o(t) {
            return t.map(a).join(n);
          }
          function a(n) {
            return c.test(n) ? '"' + n.replace(/\"/g, '""') + '"' : n;
          }
          var c = new RegExp('["' + n + '\n]'), s = n.charCodeAt(0);
          return e.parse = function (n, t) {
            var r;
            return e.parseRows(n, function (n, e) {
              if (r)
                return r(n, e - 1);
              var u = new Function('d', 'return {' + n.map(function (n, t) {
                  return JSON.stringify(n) + ': d[' + t + ']';
                }).join(',') + '}');
              r = t ? function (n, e) {
                return t(u(n), e);
              } : u;
            });
          }, e.parseRows = function (n, t) {
            function e() {
              if (l >= c)
                return o;
              if (u)
                return u = !1, i;
              var t = l;
              if (34 === n.charCodeAt(t)) {
                for (var e = t; e++ < c;)
                  if (34 === n.charCodeAt(e)) {
                    if (34 !== n.charCodeAt(e + 1))
                      break;
                    ++e;
                  }
                l = e + 2;
                var r = n.charCodeAt(e + 1);
                return 13 === r ? (u = !0, 10 === n.charCodeAt(e + 2) && ++l) : 10 === r && (u = !0), n.substring(t + 1, e).replace(/""/g, '"');
              }
              for (; c > l;) {
                var r = n.charCodeAt(l++), a = 1;
                if (10 === r)
                  u = !0;
                else if (13 === r)
                  u = !0, 10 === n.charCodeAt(l) && (++l, ++a);
                else if (r !== s)
                  continue;
                return n.substring(t, l - a);
              }
              return n.substring(t);
            }
            for (var r, u, i = {}, o = {}, a = [], c = n.length, l = 0, f = 0; (r = e()) !== o;) {
              for (var h = []; r !== i && r !== o;)
                h.push(r), r = e();
              (!t || (h = t(h, f++))) && a.push(h);
            }
            return a;
          }, e.format = function (t) {
            if (Array.isArray(t[0]))
              return e.formatRows(t);
            var r = new i(), u = [];
            return t.forEach(function (n) {
              for (var t in n)
                r.has(t) || u.push(r.add(t));
            }), [u.map(a).join(n)].concat(t.map(function (t) {
              return u.map(function (n) {
                return a(t[n]);
              }).join(n);
            })).join('\n');
          }, e.formatRows = function (n) {
            return n.map(o).join('\n');
          }, e;
        }, Zo.csv = Zo.dsv(',', 'text/csv'), Zo.tsv = Zo.dsv(' ', 'text/tab-separated-values');
        var Za, Va, Xa, $a, Ba, Wa = Wo[a(Wo, 'requestAnimationFrame')] || function (n) {
            setTimeout(n, 17);
          };
        Zo.timer = function (n, t, e) {
          var r = arguments.length;
          2 > r && (t = 0), 3 > r && (e = Date.now());
          var u = e + t, i = {
              c: n,
              t: u,
              f: !1,
              n: null
            };
          Va ? Va.n = i : Za = i, Va = i, Xa || ($a = clearTimeout($a), Xa = 1, Wa(xt));
        }, Zo.timer.flush = function () {
          Mt(), _t();
        };
        var Ja = '.', Ga = ',', Ka = [
            3,
            3
          ], Qa = '$', nc = [
            'y',
            'z',
            'a',
            'f',
            'p',
            'n',
            '\xb5',
            'm',
            '',
            'k',
            'M',
            'G',
            'T',
            'P',
            'E',
            'Z',
            'Y'
          ].map(bt);
        Zo.formatPrefix = function (n, t) {
          var e = 0;
          return n && (0 > n && (n *= -1), t && (n = Zo.round(n, wt(n, t))), e = 1 + Math.floor(1e-12 + Math.log(n) / Math.LN10), e = Math.max(-24, Math.min(24, 3 * Math.floor((0 >= e ? e + 1 : e - 1) / 3)))), nc[8 + e / 3];
        }, Zo.round = function (n, t) {
          return t ? Math.round(n * (t = Math.pow(10, t))) / t : Math.round(n);
        }, Zo.format = function (n) {
          var t = tc.exec(n), e = t[1] || ' ', r = t[2] || '>', u = t[3] || '', i = t[4] || '', o = t[5], a = +t[6], c = t[7], s = t[8], l = t[9], f = 1, h = '', g = !1;
          switch (s && (s = +s.substring(1)), (o || '0' === e && '=' === r) && (o = e = '0', r = '=', c && (a -= Math.floor((a - 1) / 4))), l) {
          case 'n':
            c = !0, l = 'g';
            break;
          case '%':
            f = 100, h = '%', l = 'f';
            break;
          case 'p':
            f = 100, h = '%', l = 'r';
            break;
          case 'b':
          case 'o':
          case 'x':
          case 'X':
            '#' === i && (i = '0' + l.toLowerCase());
          case 'c':
          case 'd':
            g = !0, s = 0;
            break;
          case 's':
            f = -1, l = 'r';
          }
          '#' === i ? i = '' : '$' === i && (i = Qa), 'r' != l || s || (l = 'g'), null != s && ('g' == l ? s = Math.max(1, Math.min(21, s)) : ('e' == l || 'f' == l) && (s = Math.max(0, Math.min(20, s)))), l = ec.get(l) || St;
          var p = o && c;
          return function (n) {
            if (g && n % 1)
              return '';
            var t = 0 > n || 0 === n && 0 > 1 / n ? (n = -n, '-') : u;
            if (0 > f) {
              var v = Zo.formatPrefix(n, s);
              n = v.scale(n), h = v.symbol;
            } else
              n *= f;
            n = l(n, s);
            var d = n.lastIndexOf('.'), m = 0 > d ? n : n.substring(0, d), y = 0 > d ? '' : Ja + n.substring(d + 1);
            !o && c && (m = rc(m));
            var x = i.length + m.length + y.length + (p ? 0 : t.length), M = a > x ? new Array(x = a - x + 1).join(e) : '';
            return p && (m = rc(M + m)), t += i, n = m + y, ('<' === r ? t + n + M : '>' === r ? M + t + n : '^' === r ? M.substring(0, x >>= 1) + t + n + M.substring(x) : t + (p ? n : M + n)) + h;
          };
        };
        var tc = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i, ec = Zo.map({
            b: function (n) {
              return n.toString(2);
            },
            c: function (n) {
              return String.fromCharCode(n);
            },
            o: function (n) {
              return n.toString(8);
            },
            x: function (n) {
              return n.toString(16);
            },
            X: function (n) {
              return n.toString(16).toUpperCase();
            },
            g: function (n, t) {
              return n.toPrecision(t);
            },
            e: function (n, t) {
              return n.toExponential(t);
            },
            f: function (n, t) {
              return n.toFixed(t);
            },
            r: function (n, t) {
              return (n = Zo.round(n, wt(n, t))).toFixed(Math.max(0, Math.min(20, wt(n * (1 + 1e-15), t))));
            }
          }), rc = vt;
        if (Ka) {
          var uc = Ka.length;
          rc = function (n) {
            for (var t = n.length, e = [], r = 0, u = Ka[0]; t > 0 && u > 0;)
              e.push(n.substring(t -= u, t + u)), u = Ka[r = (r + 1) % uc];
            return e.reverse().join(Ga);
          };
        }
        Zo.geo = {}, kt.prototype = {
          s: 0,
          t: 0,
          add: function (n) {
            Et(n, this.t, ic), Et(ic.s, this.s, this), this.s ? this.t += ic.t : this.s = ic.t;
          },
          reset: function () {
            this.s = this.t = 0;
          },
          valueOf: function () {
            return this.s;
          }
        };
        var ic = new kt();
        Zo.geo.stream = function (n, t) {
          n && oc.hasOwnProperty(n.type) ? oc[n.type](n, t) : At(n, t);
        };
        var oc = {
            Feature: function (n, t) {
              At(n.geometry, t);
            },
            FeatureCollection: function (n, t) {
              for (var e = n.features, r = -1, u = e.length; ++r < u;)
                At(e[r].geometry, t);
            }
          }, ac = {
            Sphere: function (n, t) {
              t.sphere();
            },
            Point: function (n, t) {
              n = n.coordinates, t.point(n[0], n[1], n[2]);
            },
            MultiPoint: function (n, t) {
              for (var e = n.coordinates, r = -1, u = e.length; ++r < u;)
                n = e[r], t.point(n[0], n[1], n[2]);
            },
            LineString: function (n, t) {
              Ct(n.coordinates, t, 0);
            },
            MultiLineString: function (n, t) {
              for (var e = n.coordinates, r = -1, u = e.length; ++r < u;)
                Ct(e[r], t, 0);
            },
            Polygon: function (n, t) {
              Nt(n.coordinates, t);
            },
            MultiPolygon: function (n, t) {
              for (var e = n.coordinates, r = -1, u = e.length; ++r < u;)
                Nt(e[r], t);
            },
            GeometryCollection: function (n, t) {
              for (var e = n.geometries, r = -1, u = e.length; ++r < u;)
                At(e[r], t);
            }
          };
        Zo.geo.area = function (n) {
          return cc = 0, Zo.geo.stream(n, lc), cc;
        };
        var cc, sc = new kt(), lc = {
            sphere: function () {
              cc += 4 * ba;
            },
            point: c,
            lineStart: c,
            lineEnd: c,
            polygonStart: function () {
              sc.reset(), lc.lineStart = Lt;
            },
            polygonEnd: function () {
              var n = 2 * sc;
              cc += 0 > n ? 4 * ba + n : n, lc.lineStart = lc.lineEnd = lc.point = c;
            }
          };
        Zo.geo.bounds = function () {
          function n(n, t) {
            x.push(M = [
              l = n,
              h = n
            ]), f > t && (f = t), t > g && (g = t);
          }
          function t(t, e) {
            var r = Tt([
                t * Aa,
                e * Aa
              ]);
            if (m) {
              var u = zt(m, r), i = [
                  u[1],
                  -u[0],
                  0
                ], o = zt(i, u);
              Pt(o), o = Ut(o);
              var c = t - p, s = c > 0 ? 1 : -1, v = o[0] * Ca * s, d = ua(c) > 180;
              if (d ^ (v > s * p && s * t > v)) {
                var y = o[1] * Ca;
                y > g && (g = y);
              } else if (v = (v + 360) % 360 - 180, d ^ (v > s * p && s * t > v)) {
                var y = -o[1] * Ca;
                f > y && (f = y);
              } else
                f > e && (f = e), e > g && (g = e);
              d ? p > t ? a(l, t) > a(l, h) && (h = t) : a(t, h) > a(l, h) && (l = t) : h >= l ? (l > t && (l = t), t > h && (h = t)) : t > p ? a(l, t) > a(l, h) && (h = t) : a(t, h) > a(l, h) && (l = t);
            } else
              n(t, e);
            m = r, p = t;
          }
          function e() {
            _.point = t;
          }
          function r() {
            M[0] = l, M[1] = h, _.point = n, m = null;
          }
          function u(n, e) {
            if (m) {
              var r = n - p;
              y += ua(r) > 180 ? r + (r > 0 ? 360 : -360) : r;
            } else
              v = n, d = e;
            lc.point(n, e), t(n, e);
          }
          function i() {
            lc.lineStart();
          }
          function o() {
            u(v, d), lc.lineEnd(), ua(y) > ka && (l = -(h = 180)), M[0] = l, M[1] = h, m = null;
          }
          function a(n, t) {
            return (t -= n) < 0 ? t + 360 : t;
          }
          function c(n, t) {
            return n[0] - t[0];
          }
          function s(n, t) {
            return t[0] <= t[1] ? t[0] <= n && n <= t[1] : n < t[0] || t[1] < n;
          }
          var l, f, h, g, p, v, d, m, y, x, M, _ = {
              point: n,
              lineStart: e,
              lineEnd: r,
              polygonStart: function () {
                _.point = u, _.lineStart = i, _.lineEnd = o, y = 0, lc.polygonStart();
              },
              polygonEnd: function () {
                lc.polygonEnd(), _.point = n, _.lineStart = e, _.lineEnd = r, 0 > sc ? (l = -(h = 180), f = -(g = 90)) : y > ka ? g = 90 : -ka > y && (f = -90), M[0] = l, M[1] = h;
              }
            };
          return function (n) {
            g = h = -(l = f = 1 / 0), x = [], Zo.geo.stream(n, _);
            var t = x.length;
            if (t) {
              x.sort(c);
              for (var e, r = 1, u = x[0], i = [u]; t > r; ++r)
                e = x[r], s(e[0], u) || s(e[1], u) ? (a(u[0], e[1]) > a(u[0], u[1]) && (u[1] = e[1]), a(e[0], u[1]) > a(u[0], u[1]) && (u[0] = e[0])) : i.push(u = e);
              for (var o, e, p = -1 / 0, t = i.length - 1, r = 0, u = i[t]; t >= r; u = e, ++r)
                e = i[r], (o = a(u[1], e[0])) > p && (p = o, l = e[0], h = u[1]);
            }
            return x = M = null, 1 / 0 === l || 1 / 0 === f ? [
              [
                0 / 0,
                0 / 0
              ],
              [
                0 / 0,
                0 / 0
              ]
            ] : [
              [
                l,
                f
              ],
              [
                h,
                g
              ]
            ];
          };
        }(), Zo.geo.centroid = function (n) {
          fc = hc = gc = pc = vc = dc = mc = yc = xc = Mc = _c = 0, Zo.geo.stream(n, bc);
          var t = xc, e = Mc, r = _c, u = t * t + e * e + r * r;
          return Ea > u && (t = dc, e = mc, r = yc, ka > hc && (t = gc, e = pc, r = vc), u = t * t + e * e + r * r, Ea > u) ? [
            0 / 0,
            0 / 0
          ] : [
            Math.atan2(e, t) * Ca,
            H(r / Math.sqrt(u)) * Ca
          ];
        };
        var fc, hc, gc, pc, vc, dc, mc, yc, xc, Mc, _c, bc = {
            sphere: c,
            point: Ht,
            lineStart: Ot,
            lineEnd: Yt,
            polygonStart: function () {
              bc.lineStart = It;
            },
            polygonEnd: function () {
              bc.lineStart = Ot;
            }
          }, wc = Bt(Zt, Qt, te, [
            -ba,
            -ba / 2
          ]), Sc = 1000000000;
        Zo.geo.clipExtent = function () {
          var n, t, e, r, u, i, o = {
              stream: function (n) {
                return u && (u.valid = !1), u = i(n), u.valid = !0, u;
              },
              extent: function (a) {
                return arguments.length ? (i = ue(n = +a[0][0], t = +a[0][1], e = +a[1][0], r = +a[1][1]), u && (u.valid = !1, u = null), o) : [
                  [
                    n,
                    t
                  ],
                  [
                    e,
                    r
                  ]
                ];
              }
            };
          return o.extent([
            [
              0,
              0
            ],
            [
              960,
              500
            ]
          ]);
        }, (Zo.geo.conicEqualArea = function () {
          return oe(ae);
        }).raw = ae, Zo.geo.albers = function () {
          return Zo.geo.conicEqualArea().rotate([
            96,
            0
          ]).center([
            -0.6,
            38.7
          ]).parallels([
            29.5,
            45.5
          ]).scale(1070);
        }, Zo.geo.albersUsa = function () {
          function n(n) {
            var i = n[0], o = n[1];
            return t = null, e(i, o), t || (r(i, o), t) || u(i, o), t;
          }
          var t, e, r, u, i = Zo.geo.albers(), o = Zo.geo.conicEqualArea().rotate([
              154,
              0
            ]).center([
              -2,
              58.5
            ]).parallels([
              55,
              65
            ]), a = Zo.geo.conicEqualArea().rotate([
              157,
              0
            ]).center([
              -3,
              19.9
            ]).parallels([
              8,
              18
            ]), c = {
              point: function (n, e) {
                t = [
                  n,
                  e
                ];
              }
            };
          return n.invert = function (n) {
            var t = i.scale(), e = i.translate(), r = (n[0] - e[0]) / t, u = (n[1] - e[1]) / t;
            return (u >= 0.12 && 0.234 > u && r >= -0.425 && -0.214 > r ? o : u >= 0.166 && 0.234 > u && r >= -0.214 && -0.115 > r ? a : i).invert(n);
          }, n.stream = function (n) {
            var t = i.stream(n), e = o.stream(n), r = a.stream(n);
            return {
              point: function (n, u) {
                t.point(n, u), e.point(n, u), r.point(n, u);
              },
              sphere: function () {
                t.sphere(), e.sphere(), r.sphere();
              },
              lineStart: function () {
                t.lineStart(), e.lineStart(), r.lineStart();
              },
              lineEnd: function () {
                t.lineEnd(), e.lineEnd(), r.lineEnd();
              },
              polygonStart: function () {
                t.polygonStart(), e.polygonStart(), r.polygonStart();
              },
              polygonEnd: function () {
                t.polygonEnd(), e.polygonEnd(), r.polygonEnd();
              }
            };
          }, n.precision = function (t) {
            return arguments.length ? (i.precision(t), o.precision(t), a.precision(t), n) : i.precision();
          }, n.scale = function (t) {
            return arguments.length ? (i.scale(t), o.scale(0.35 * t), a.scale(t), n.translate(i.translate())) : i.scale();
          }, n.translate = function (t) {
            if (!arguments.length)
              return i.translate();
            var s = i.scale(), l = +t[0], f = +t[1];
            return e = i.translate(t).clipExtent([
              [
                l - 0.455 * s,
                f - 0.238 * s
              ],
              [
                l + 0.455 * s,
                f + 0.238 * s
              ]
            ]).stream(c).point, r = o.translate([
              l - 0.307 * s,
              f + 0.201 * s
            ]).clipExtent([
              [
                l - 0.425 * s + ka,
                f + 0.12 * s + ka
              ],
              [
                l - 0.214 * s - ka,
                f + 0.234 * s - ka
              ]
            ]).stream(c).point, u = a.translate([
              l - 0.205 * s,
              f + 0.212 * s
            ]).clipExtent([
              [
                l - 0.214 * s + ka,
                f + 0.166 * s + ka
              ],
              [
                l - 0.115 * s - ka,
                f + 0.234 * s - ka
              ]
            ]).stream(c).point, n;
          }, n.scale(1070);
        };
        var kc, Ec, Ac, Cc, Nc, Lc, Tc = {
            point: c,
            lineStart: c,
            lineEnd: c,
            polygonStart: function () {
              Ec = 0, Tc.lineStart = ce;
            },
            polygonEnd: function () {
              Tc.lineStart = Tc.lineEnd = Tc.point = c, kc += ua(Ec / 2);
            }
          }, qc = {
            point: se,
            lineStart: c,
            lineEnd: c,
            polygonStart: c,
            polygonEnd: c
          }, zc = {
            point: he,
            lineStart: ge,
            lineEnd: pe,
            polygonStart: function () {
              zc.lineStart = ve;
            },
            polygonEnd: function () {
              zc.point = he, zc.lineStart = ge, zc.lineEnd = pe;
            }
          };
        Zo.geo.transform = function (n) {
          return {
            stream: function (t) {
              var e = new ye(t);
              for (var r in n)
                e[r] = n[r];
              return e;
            }
          };
        }, ye.prototype = {
          point: function (n, t) {
            this.stream.point(n, t);
          },
          sphere: function () {
            this.stream.sphere();
          },
          lineStart: function () {
            this.stream.lineStart();
          },
          lineEnd: function () {
            this.stream.lineEnd();
          },
          polygonStart: function () {
            this.stream.polygonStart();
          },
          polygonEnd: function () {
            this.stream.polygonEnd();
          }
        }, Zo.geo.path = function () {
          function n(n) {
            return n && ('function' == typeof a && i.pointRadius(+a.apply(this, arguments)), o && o.valid || (o = u(i)), Zo.geo.stream(n, o)), i.result();
          }
          function t() {
            return o = null, n;
          }
          var e, r, u, i, o, a = 4.5;
          return n.area = function (n) {
            return kc = 0, Zo.geo.stream(n, u(Tc)), kc;
          }, n.centroid = function (n) {
            return gc = pc = vc = dc = mc = yc = xc = Mc = _c = 0, Zo.geo.stream(n, u(zc)), _c ? [
              xc / _c,
              Mc / _c
            ] : yc ? [
              dc / yc,
              mc / yc
            ] : vc ? [
              gc / vc,
              pc / vc
            ] : [
              0 / 0,
              0 / 0
            ];
          }, n.bounds = function (n) {
            return Nc = Lc = -(Ac = Cc = 1 / 0), Zo.geo.stream(n, u(qc)), [
              [
                Ac,
                Cc
              ],
              [
                Nc,
                Lc
              ]
            ];
          }, n.projection = function (n) {
            return arguments.length ? (u = (e = n) ? n.stream || xe(n) : vt, t()) : e;
          }, n.context = function (n) {
            return arguments.length ? (i = null == (r = n) ? new le() : new de(n), 'function' != typeof a && i.pointRadius(a), t()) : r;
          }, n.pointRadius = function (t) {
            return arguments.length ? (a = 'function' == typeof t ? t : (i.pointRadius(+t), +t), n) : a;
          }, n.projection(Zo.geo.albersUsa()).context(null);
        }, Zo.geo.projection = Me, Zo.geo.projectionMutator = _e, (Zo.geo.equirectangular = function () {
          return Me(we);
        }).raw = we.invert = we, Zo.geo.rotation = function (n) {
          function t(t) {
            return t = n(t[0] * Aa, t[1] * Aa), t[0] *= Ca, t[1] *= Ca, t;
          }
          return n = ke(n[0] % 360 * Aa, n[1] * Aa, n.length > 2 ? n[2] * Aa : 0), t.invert = function (t) {
            return t = n.invert(t[0] * Aa, t[1] * Aa), t[0] *= Ca, t[1] *= Ca, t;
          }, t;
        }, Se.invert = we, Zo.geo.circle = function () {
          function n() {
            var n = 'function' == typeof r ? r.apply(this, arguments) : r, t = ke(-n[0] * Aa, -n[1] * Aa, 0).invert, u = [];
            return e(null, null, 1, {
              point: function (n, e) {
                u.push(n = t(n, e)), n[0] *= Ca, n[1] *= Ca;
              }
            }), {
              type: 'Polygon',
              coordinates: [u]
            };
          }
          var t, e, r = [
              0,
              0
            ], u = 6;
          return n.origin = function (t) {
            return arguments.length ? (r = t, n) : r;
          }, n.angle = function (r) {
            return arguments.length ? (e = Ne((t = +r) * Aa, u * Aa), n) : t;
          }, n.precision = function (r) {
            return arguments.length ? (e = Ne(t * Aa, (u = +r) * Aa), n) : u;
          }, n.angle(90);
        }, Zo.geo.distance = function (n, t) {
          var e, r = (t[0] - n[0]) * Aa, u = n[1] * Aa, i = t[1] * Aa, o = Math.sin(r), a = Math.cos(r), c = Math.sin(u), s = Math.cos(u), l = Math.sin(i), f = Math.cos(i);
          return Math.atan2(Math.sqrt((e = f * o) * e + (e = s * l - c * f * a) * e), c * l + s * f * a);
        }, Zo.geo.graticule = function () {
          function n() {
            return {
              type: 'MultiLineString',
              coordinates: t()
            };
          }
          function t() {
            return Zo.range(Math.ceil(i / d) * d, u, d).map(h).concat(Zo.range(Math.ceil(s / m) * m, c, m).map(g)).concat(Zo.range(Math.ceil(r / p) * p, e, p).filter(function (n) {
              return ua(n % d) > ka;
            }).map(l)).concat(Zo.range(Math.ceil(a / v) * v, o, v).filter(function (n) {
              return ua(n % m) > ka;
            }).map(f));
          }
          var e, r, u, i, o, a, c, s, l, f, h, g, p = 10, v = p, d = 90, m = 360, y = 2.5;
          return n.lines = function () {
            return t().map(function (n) {
              return {
                type: 'LineString',
                coordinates: n
              };
            });
          }, n.outline = function () {
            return {
              type: 'Polygon',
              coordinates: [h(i).concat(g(c).slice(1), h(u).reverse().slice(1), g(s).reverse().slice(1))]
            };
          }, n.extent = function (t) {
            return arguments.length ? n.majorExtent(t).minorExtent(t) : n.minorExtent();
          }, n.majorExtent = function (t) {
            return arguments.length ? (i = +t[0][0], u = +t[1][0], s = +t[0][1], c = +t[1][1], i > u && (t = i, i = u, u = t), s > c && (t = s, s = c, c = t), n.precision(y)) : [
              [
                i,
                s
              ],
              [
                u,
                c
              ]
            ];
          }, n.minorExtent = function (t) {
            return arguments.length ? (r = +t[0][0], e = +t[1][0], a = +t[0][1], o = +t[1][1], r > e && (t = r, r = e, e = t), a > o && (t = a, a = o, o = t), n.precision(y)) : [
              [
                r,
                a
              ],
              [
                e,
                o
              ]
            ];
          }, n.step = function (t) {
            return arguments.length ? n.majorStep(t).minorStep(t) : n.minorStep();
          }, n.majorStep = function (t) {
            return arguments.length ? (d = +t[0], m = +t[1], n) : [
              d,
              m
            ];
          }, n.minorStep = function (t) {
            return arguments.length ? (p = +t[0], v = +t[1], n) : [
              p,
              v
            ];
          }, n.precision = function (t) {
            return arguments.length ? (y = +t, l = Te(a, o, 90), f = qe(r, e, y), h = Te(s, c, 90), g = qe(i, u, y), n) : y;
          }, n.majorExtent([
            [
              -180,
              -90 + ka
            ],
            [
              180,
              90 - ka
            ]
          ]).minorExtent([
            [
              -180,
              -80 - ka
            ],
            [
              180,
              80 + ka
            ]
          ]);
        }, Zo.geo.greatArc = function () {
          function n() {
            return {
              type: 'LineString',
              coordinates: [
                t || r.apply(this, arguments),
                e || u.apply(this, arguments)
              ]
            };
          }
          var t, e, r = ze, u = Re;
          return n.distance = function () {
            return Zo.geo.distance(t || r.apply(this, arguments), e || u.apply(this, arguments));
          }, n.source = function (e) {
            return arguments.length ? (r = e, t = 'function' == typeof e ? null : e, n) : r;
          }, n.target = function (t) {
            return arguments.length ? (u = t, e = 'function' == typeof t ? null : t, n) : u;
          }, n.precision = function () {
            return arguments.length ? n : 0;
          }, n;
        }, Zo.geo.interpolate = function (n, t) {
          return De(n[0] * Aa, n[1] * Aa, t[0] * Aa, t[1] * Aa);
        }, Zo.geo.length = function (n) {
          return Rc = 0, Zo.geo.stream(n, Dc), Rc;
        };
        var Rc, Dc = {
            sphere: c,
            point: c,
            lineStart: Pe,
            lineEnd: c,
            polygonStart: c,
            polygonEnd: c
          }, Pc = Ue(function (n) {
            return Math.sqrt(2 / (1 + n));
          }, function (n) {
            return 2 * Math.asin(n / 2);
          });
        (Zo.geo.azimuthalEqualArea = function () {
          return Me(Pc);
        }).raw = Pc;
        var Uc = Ue(function (n) {
            var t = Math.acos(n);
            return t && t / Math.sin(t);
          }, vt);
        (Zo.geo.azimuthalEquidistant = function () {
          return Me(Uc);
        }).raw = Uc, (Zo.geo.conicConformal = function () {
          return oe(je);
        }).raw = je, (Zo.geo.conicEquidistant = function () {
          return oe(He);
        }).raw = He;
        var jc = Ue(function (n) {
            return 1 / n;
          }, Math.atan);
        (Zo.geo.gnomonic = function () {
          return Me(jc);
        }).raw = jc, Fe.invert = function (n, t) {
          return [
            n,
            2 * Math.atan(Math.exp(t)) - Sa
          ];
        }, (Zo.geo.mercator = function () {
          return Oe(Fe);
        }).raw = Fe;
        var Hc = Ue(function () {
            return 1;
          }, Math.asin);
        (Zo.geo.orthographic = function () {
          return Me(Hc);
        }).raw = Hc;
        var Fc = Ue(function (n) {
            return 1 / (1 + n);
          }, function (n) {
            return 2 * Math.atan(n);
          });
        (Zo.geo.stereographic = function () {
          return Me(Fc);
        }).raw = Fc, Ye.invert = function (n, t) {
          return [
            Math.atan2(F(n), Math.cos(t)),
            H(Math.sin(t) / O(n))
          ];
        }, (Zo.geo.transverseMercator = function () {
          return Oe(Ye);
        }).raw = Ye, Zo.geom = {}, Zo.svg = {}, Zo.svg.line = function () {
          return Ie(vt);
        };
        var Oc = Zo.map({
            linear: Xe,
            'linear-closed': $e,
            step: Be,
            'step-before': We,
            'step-after': Je,
            basis: er,
            'basis-open': rr,
            'basis-closed': ur,
            bundle: ir,
            cardinal: Qe,
            'cardinal-open': Ge,
            'cardinal-closed': Ke,
            monotone: fr
          });
        Oc.forEach(function (n, t) {
          t.key = n, t.closed = /-closed$/.test(n);
        });
        var Yc = [
            0,
            2 / 3,
            1 / 3,
            0
          ], Ic = [
            0,
            1 / 3,
            2 / 3,
            0
          ], Zc = [
            0,
            1 / 6,
            2 / 3,
            1 / 6
          ];
        Zo.geom.hull = function (n) {
          function t(n) {
            if (n.length < 3)
              return [];
            var t, u, i, o, a, c, s, l, f, h, g, p, v = pt(e), d = pt(r), m = n.length, y = m - 1, x = [], M = [], _ = 0;
            if (v === Ze && r === Ve)
              t = n;
            else
              for (i = 0, t = []; m > i; ++i)
                t.push([
                  +v.call(this, u = n[i], i),
                  +d.call(this, u, i)
                ]);
            for (i = 1; m > i; ++i)
              (t[i][1] < t[_][1] || t[i][1] == t[_][1] && t[i][0] < t[_][0]) && (_ = i);
            for (i = 0; m > i; ++i)
              i !== _ && (c = t[i][1] - t[_][1], a = t[i][0] - t[_][0], x.push({
                angle: Math.atan2(c, a),
                index: i
              }));
            for (x.sort(function (n, t) {
                return n.angle - t.angle;
              }), g = x[0].angle, h = x[0].index, f = 0, i = 1; y > i; ++i) {
              if (o = x[i].index, g == x[i].angle) {
                if (a = t[h][0] - t[_][0], c = t[h][1] - t[_][1], s = t[o][0] - t[_][0], l = t[o][1] - t[_][1], a * a + c * c >= s * s + l * l) {
                  x[i].index = -1;
                  continue;
                }
                x[f].index = -1;
              }
              g = x[i].angle, f = i, h = o;
            }
            for (M.push(_), i = 0, o = 0; 2 > i; ++o)
              x[o].index > -1 && (M.push(x[o].index), i++);
            for (p = M.length; y > o; ++o)
              if (!(x[o].index < 0)) {
                for (; !hr(M[p - 2], M[p - 1], x[o].index, t);)
                  --p;
                M[p++] = x[o].index;
              }
            var b = [];
            for (i = p - 1; i >= 0; --i)
              b.push(n[M[i]]);
            return b;
          }
          var e = Ze, r = Ve;
          return arguments.length ? t(n) : (t.x = function (n) {
            return arguments.length ? (e = n, t) : e;
          }, t.y = function (n) {
            return arguments.length ? (r = n, t) : r;
          }, t);
        }, Zo.geom.polygon = function (n) {
          return sa(n, Vc), n;
        };
        var Vc = Zo.geom.polygon.prototype = [];
        Vc.area = function () {
          for (var n, t = -1, e = this.length, r = this[e - 1], u = 0; ++t < e;)
            n = r, r = this[t], u += n[1] * r[0] - n[0] * r[1];
          return 0.5 * u;
        }, Vc.centroid = function (n) {
          var t, e, r = -1, u = this.length, i = 0, o = 0, a = this[u - 1];
          for (arguments.length || (n = -1 / (6 * this.area())); ++r < u;)
            t = a, a = this[r], e = t[0] * a[1] - a[0] * t[1], i += (t[0] + a[0]) * e, o += (t[1] + a[1]) * e;
          return [
            i * n,
            o * n
          ];
        }, Vc.clip = function (n) {
          for (var t, e, r, u, i, o, a = vr(n), c = -1, s = this.length - vr(this), l = this[s - 1]; ++c < s;) {
            for (t = n.slice(), n.length = 0, u = this[c], i = t[(r = t.length - a) - 1], e = -1; ++e < r;)
              o = t[e], gr(o, l, u) ? (gr(i, l, u) || n.push(pr(i, o, l, u)), n.push(o)) : gr(i, l, u) && n.push(pr(i, o, l, u)), i = o;
            a && n.push(n[0]), l = u;
          }
          return n;
        };
        var Xc, $c, Bc, Wc, Jc, Gc = [], Kc = [];
        wr.prototype.prepare = function () {
          for (var n, t = this.edges, e = t.length; e--;)
            n = t[e].edge, n.b && n.a || t.splice(e, 1);
          return t.sort(kr), t.length;
        }, Dr.prototype = {
          start: function () {
            return this.edge.l === this.site ? this.edge.a : this.edge.b;
          },
          end: function () {
            return this.edge.l === this.site ? this.edge.b : this.edge.a;
          }
        }, Pr.prototype = {
          insert: function (n, t) {
            var e, r, u;
            if (n) {
              if (t.P = n, t.N = n.N, n.N && (n.N.P = t), n.N = t, n.R) {
                for (n = n.R; n.L;)
                  n = n.L;
                n.L = t;
              } else
                n.R = t;
              e = n;
            } else
              this._ ? (n = Fr(this._), t.P = null, t.N = n, n.P = n.L = t, e = n) : (t.P = t.N = null, this._ = t, e = null);
            for (t.L = t.R = null, t.U = e, t.C = !0, n = t; e && e.C;)
              r = e.U, e === r.L ? (u = r.R, u && u.C ? (e.C = u.C = !1, r.C = !0, n = r) : (n === e.R && (jr(this, e), n = e, e = n.U), e.C = !1, r.C = !0, Hr(this, r))) : (u = r.L, u && u.C ? (e.C = u.C = !1, r.C = !0, n = r) : (n === e.L && (Hr(this, e), n = e, e = n.U), e.C = !1, r.C = !0, jr(this, r))), e = n.U;
            this._.C = !1;
          },
          remove: function (n) {
            n.N && (n.N.P = n.P), n.P && (n.P.N = n.N), n.N = n.P = null;
            var t, e, r, u = n.U, i = n.L, o = n.R;
            if (e = i ? o ? Fr(o) : i : o, u ? u.L === n ? u.L = e : u.R = e : this._ = e, i && o ? (r = e.C, e.C = n.C, e.L = i, i.U = e, e !== o ? (u = e.U, e.U = n.U, n = e.R, u.L = n, e.R = o, o.U = e) : (e.U = u, u = e, n = e.R)) : (r = n.C, n = e), n && (n.U = u), !r) {
              if (n && n.C)
                return n.C = !1, void 0;
              do {
                if (n === this._)
                  break;
                if (n === u.L) {
                  if (t = u.R, t.C && (t.C = !1, u.C = !0, jr(this, u), t = u.R), t.L && t.L.C || t.R && t.R.C) {
                    t.R && t.R.C || (t.L.C = !1, t.C = !0, Hr(this, t), t = u.R), t.C = u.C, u.C = t.R.C = !1, jr(this, u), n = this._;
                    break;
                  }
                } else if (t = u.L, t.C && (t.C = !1, u.C = !0, Hr(this, u), t = u.L), t.L && t.L.C || t.R && t.R.C) {
                  t.L && t.L.C || (t.R.C = !1, t.C = !0, jr(this, t), t = u.L), t.C = u.C, u.C = t.L.C = !1, Hr(this, u), n = this._;
                  break;
                }
                t.C = !0, n = u, u = u.U;
              } while (!n.C);
              n && (n.C = !1);
            }
          }
        }, Zo.geom.voronoi = function (n) {
          function t(n) {
            var t = [];
            return Or(e(n), a).cells.forEach(function (e, r) {
              (t[r] = e.edges.length ? e.edges.map(function (n) {
                var t = n.start();
                return [
                  t.x,
                  t.y
                ];
              }) : [
                [
                  a[0][0],
                  a[1][1]
                ],
                [
                  a[1][0],
                  a[1][1]
                ],
                [
                  a[1][0],
                  a[0][1]
                ],
                [
                  a[0][0],
                  a[0][1]
                ]
              ]).point = n[r];
            }), t;
          }
          function e(n) {
            return n.map(function (n, t) {
              return {
                x: i(n, t),
                y: o(n, t),
                i: t
              };
            });
          }
          var r = Ze, u = Ve, i = r, o = u, a = Qc;
          return n ? t(n) : (t.links = function (n) {
            return Or(e(n)).edges.filter(function (n) {
              return n.l && n.r;
            }).map(function (t) {
              return {
                source: n[t.l.i],
                target: n[t.r.i]
              };
            });
          }, t.triangles = function (n) {
            var t = [];
            return Or(e(n)).cells.forEach(function (e, r) {
              for (var u, i, o = e.site, a = e.edges.sort(kr), c = -1, s = a.length, l = a[s - 1].edge, f = l.l === o ? l.r : l.l; ++c < s;)
                u = l, i = f, l = a[c].edge, f = l.l === o ? l.r : l.l, r < i.i && r < f.i && Ir(o, i, f) < 0 && t.push([
                  n[r],
                  n[i.i],
                  n[f.i]
                ]);
            }), t;
          }, t.x = function (n) {
            return arguments.length ? (i = pt(r = n), t) : r;
          }, t.y = function (n) {
            return arguments.length ? (o = pt(u = n), t) : u;
          }, t.clipExtent = function (n) {
            return arguments.length ? (a = null == n ? Qc : n, t) : a === Qc ? null : a;
          }, t.size = function (n) {
            return arguments.length ? t.clipExtent(n && [
              [
                0,
                0
              ],
              n
            ]) : a === Qc ? null : a && a[1];
          }, t);
        };
        var Qc = [
            [
              -1000000,
              -1000000
            ],
            [
              1000000,
              1000000
            ]
          ];
        Zo.geom.delaunay = function (n) {
          return Zo.geom.voronoi().triangles(n);
        }, Zo.geom.quadtree = function (n, t, e, r, u) {
          function i(n) {
            function i(n, t, e, r, u, i, o, a) {
              if (!isNaN(e) && !isNaN(r))
                if (n.leaf) {
                  var c = n.x, l = n.y;
                  if (null != c)
                    if (ua(c - e) + ua(l - r) < 0.01)
                      s(n, t, e, r, u, i, o, a);
                    else {
                      var f = n.point;
                      n.x = n.y = n.point = null, s(n, f, c, l, u, i, o, a), s(n, t, e, r, u, i, o, a);
                    }
                  else
                    n.x = e, n.y = r, n.point = t;
                } else
                  s(n, t, e, r, u, i, o, a);
            }
            function s(n, t, e, r, u, o, a, c) {
              var s = 0.5 * (u + a), l = 0.5 * (o + c), f = e >= s, h = r >= l, g = (h << 1) + f;
              n.leaf = !1, n = n.nodes[g] || (n.nodes[g] = Xr()), f ? u = s : a = s, h ? o = l : c = l, i(n, t, e, r, u, o, a, c);
            }
            var l, f, h, g, p, v, d, m, y, x = pt(a), M = pt(c);
            if (null != t)
              v = t, d = e, m = r, y = u;
            else if (m = y = -(v = d = 1 / 0), f = [], h = [], p = n.length, o)
              for (g = 0; p > g; ++g)
                l = n[g], l.x < v && (v = l.x), l.y < d && (d = l.y), l.x > m && (m = l.x), l.y > y && (y = l.y), f.push(l.x), h.push(l.y);
            else
              for (g = 0; p > g; ++g) {
                var _ = +x(l = n[g], g), b = +M(l, g);
                v > _ && (v = _), d > b && (d = b), _ > m && (m = _), b > y && (y = b), f.push(_), h.push(b);
              }
            var w = m - v, S = y - d;
            w > S ? y = d + w : m = v + S;
            var k = Xr();
            if (k.add = function (n) {
                i(k, n, +x(n, ++g), +M(n, g), v, d, m, y);
              }, k.visit = function (n) {
                $r(n, k, v, d, m, y);
              }, g = -1, null == t) {
              for (; ++g < p;)
                i(k, n[g], f[g], h[g], v, d, m, y);
              --g;
            } else
              n.forEach(k.add);
            return f = h = n = l = null, k;
          }
          var o, a = Ze, c = Ve;
          return (o = arguments.length) ? (a = Zr, c = Vr, 3 === o && (u = e, r = t, e = t = 0), i(n)) : (i.x = function (n) {
            return arguments.length ? (a = n, i) : a;
          }, i.y = function (n) {
            return arguments.length ? (c = n, i) : c;
          }, i.extent = function (n) {
            return arguments.length ? (null == n ? t = e = r = u = null : (t = +n[0][0], e = +n[0][1], r = +n[1][0], u = +n[1][1]), i) : null == t ? null : [
              [
                t,
                e
              ],
              [
                r,
                u
              ]
            ];
          }, i.size = function (n) {
            return arguments.length ? (null == n ? t = e = r = u = null : (t = e = 0, r = +n[0], u = +n[1]), i) : null == t ? null : [
              r - t,
              u - e
            ];
          }, i);
        }, Zo.interpolateRgb = Br, Zo.interpolateObject = Wr, Zo.interpolateNumber = Jr, Zo.interpolateString = Gr;
        var ns = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
        Zo.interpolate = Kr, Zo.interpolators = [function (n, t) {
            var e = typeof t;
            return ('string' === e ? Ia.has(t) || /^(#|rgb\(|hsl\()/.test(t) ? Br : Gr : t instanceof Z ? Br : 'object' === e ? Array.isArray(t) ? Qr : Wr : Jr)(n, t);
          }], Zo.interpolateArray = Qr;
        var ts = function () {
            return vt;
          }, es = Zo.map({
            linear: ts,
            poly: ou,
            quad: function () {
              return ru;
            },
            cubic: function () {
              return uu;
            },
            sin: function () {
              return au;
            },
            exp: function () {
              return cu;
            },
            circle: function () {
              return su;
            },
            elastic: lu,
            back: fu,
            bounce: function () {
              return hu;
            }
          }), rs = Zo.map({
            'in': vt,
            out: tu,
            'in-out': eu,
            'out-in': function (n) {
              return eu(tu(n));
            }
          });
        Zo.ease = function (n) {
          var t = n.indexOf('-'), e = t >= 0 ? n.substring(0, t) : n, r = t >= 0 ? n.substring(t + 1) : 'in';
          return e = es.get(e) || ts, r = rs.get(r) || vt, nu(r(e.apply(null, Vo.call(arguments, 1))));
        }, Zo.interpolateHcl = gu, Zo.interpolateHsl = pu, Zo.interpolateLab = vu, Zo.interpolateRound = du, Zo.transform = function (n) {
          var t = $o.createElementNS(Zo.ns.prefix.svg, 'g');
          return (Zo.transform = function (n) {
            if (null != n) {
              t.setAttribute('transform', n);
              var e = t.transform.baseVal.consolidate();
            }
            return new mu(e ? e.matrix : us);
          })(n);
        }, mu.prototype.toString = function () {
          return 'translate(' + this.translate + ')rotate(' + this.rotate + ')skewX(' + this.skew + ')scale(' + this.scale + ')';
        };
        var us = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: 0,
            f: 0
          };
        Zo.interpolateTransform = _u, Zo.layout = {}, Zo.layout.bundle = function () {
          return function (n) {
            for (var t = [], e = -1, r = n.length; ++e < r;)
              t.push(Su(n[e]));
            return t;
          };
        }, Zo.layout.chord = function () {
          function n() {
            var n, s, f, h, g, p = {}, v = [], d = Zo.range(i), m = [];
            for (e = [], r = [], n = 0, h = -1; ++h < i;) {
              for (s = 0, g = -1; ++g < i;)
                s += u[h][g];
              v.push(s), m.push(Zo.range(i)), n += s;
            }
            for (o && d.sort(function (n, t) {
                return o(v[n], v[t]);
              }), a && m.forEach(function (n, t) {
                n.sort(function (n, e) {
                  return a(u[t][n], u[t][e]);
                });
              }), n = (wa - l * i) / n, s = 0, h = -1; ++h < i;) {
              for (f = s, g = -1; ++g < i;) {
                var y = d[h], x = m[y][g], M = u[y][x], _ = s, b = s += M * n;
                p[y + '-' + x] = {
                  index: y,
                  subindex: x,
                  startAngle: _,
                  endAngle: b,
                  value: M
                };
              }
              r[y] = {
                index: y,
                startAngle: f,
                endAngle: s,
                value: (s - f) / n
              }, s += l;
            }
            for (h = -1; ++h < i;)
              for (g = h - 1; ++g < i;) {
                var w = p[h + '-' + g], S = p[g + '-' + h];
                (w.value || S.value) && e.push(w.value < S.value ? {
                  source: S,
                  target: w
                } : {
                  source: w,
                  target: S
                });
              }
            c && t();
          }
          function t() {
            e.sort(function (n, t) {
              return c((n.source.value + n.target.value) / 2, (t.source.value + t.target.value) / 2);
            });
          }
          var e, r, u, i, o, a, c, s = {}, l = 0;
          return s.matrix = function (n) {
            return arguments.length ? (i = (u = n) && u.length, e = r = null, s) : u;
          }, s.padding = function (n) {
            return arguments.length ? (l = n, e = r = null, s) : l;
          }, s.sortGroups = function (n) {
            return arguments.length ? (o = n, e = r = null, s) : o;
          }, s.sortSubgroups = function (n) {
            return arguments.length ? (a = n, e = null, s) : a;
          }, s.sortChords = function (n) {
            return arguments.length ? (c = n, e && t(), s) : c;
          }, s.chords = function () {
            return e || n(), e;
          }, s.groups = function () {
            return r || n(), r;
          }, s;
        }, Zo.layout.force = function () {
          function n(n) {
            return function (t, e, r, u) {
              if (t.point !== n) {
                var i = t.cx - n.x, o = t.cy - n.y, a = 1 / Math.sqrt(i * i + o * o);
                if (v > (u - e) * a) {
                  var c = t.charge * a * a;
                  return n.px -= i * c, n.py -= o * c, !0;
                }
                if (t.point && isFinite(a)) {
                  var c = t.pointCharge * a * a;
                  n.px -= i * c, n.py -= o * c;
                }
              }
              return !t.charge;
            };
          }
          function t(n) {
            n.px = Zo.event.x, n.py = Zo.event.y, a.resume();
          }
          var e, r, u, i, o, a = {}, c = Zo.dispatch('start', 'tick', 'end'), s = [
              1,
              1
            ], l = 0.9, f = is, h = os, g = -30, p = 0.1, v = 0.8, d = [], m = [];
          return a.tick = function () {
            if ((r *= 0.99) < 0.005)
              return c.end({
                type: 'end',
                alpha: r = 0
              }), !0;
            var t, e, a, f, h, v, y, x, M, _ = d.length, b = m.length;
            for (e = 0; b > e; ++e)
              a = m[e], f = a.source, h = a.target, x = h.x - f.x, M = h.y - f.y, (v = x * x + M * M) && (v = r * i[e] * ((v = Math.sqrt(v)) - u[e]) / v, x *= v, M *= v, h.x -= x * (y = f.weight / (h.weight + f.weight)), h.y -= M * y, f.x += x * (y = 1 - y), f.y += M * y);
            if ((y = r * p) && (x = s[0] / 2, M = s[1] / 2, e = -1, y))
              for (; ++e < _;)
                a = d[e], a.x += (x - a.x) * y, a.y += (M - a.y) * y;
            if (g)
              for (Tu(t = Zo.geom.quadtree(d), r, o), e = -1; ++e < _;)
                (a = d[e]).fixed || t.visit(n(a));
            for (e = -1; ++e < _;)
              a = d[e], a.fixed ? (a.x = a.px, a.y = a.py) : (a.x -= (a.px - (a.px = a.x)) * l, a.y -= (a.py - (a.py = a.y)) * l);
            c.tick({
              type: 'tick',
              alpha: r
            });
          }, a.nodes = function (n) {
            return arguments.length ? (d = n, a) : d;
          }, a.links = function (n) {
            return arguments.length ? (m = n, a) : m;
          }, a.size = function (n) {
            return arguments.length ? (s = n, a) : s;
          }, a.linkDistance = function (n) {
            return arguments.length ? (f = 'function' == typeof n ? n : +n, a) : f;
          }, a.distance = a.linkDistance, a.linkStrength = function (n) {
            return arguments.length ? (h = 'function' == typeof n ? n : +n, a) : h;
          }, a.friction = function (n) {
            return arguments.length ? (l = +n, a) : l;
          }, a.charge = function (n) {
            return arguments.length ? (g = 'function' == typeof n ? n : +n, a) : g;
          }, a.gravity = function (n) {
            return arguments.length ? (p = +n, a) : p;
          }, a.theta = function (n) {
            return arguments.length ? (v = +n, a) : v;
          }, a.alpha = function (n) {
            return arguments.length ? (n = +n, r ? r = n > 0 ? n : 0 : n > 0 && (c.start({
              type: 'start',
              alpha: r = n
            }), Zo.timer(a.tick)), a) : r;
          }, a.start = function () {
            function n(n, r) {
              if (!e) {
                for (e = new Array(c), a = 0; c > a; ++a)
                  e[a] = [];
                for (a = 0; s > a; ++a) {
                  var u = m[a];
                  e[u.source.index].push(u.target), e[u.target.index].push(u.source);
                }
              }
              for (var i, o = e[t], a = -1, s = o.length; ++a < s;)
                if (!isNaN(i = o[a][n]))
                  return i;
              return Math.random() * r;
            }
            var t, e, r, c = d.length, l = m.length, p = s[0], v = s[1];
            for (t = 0; c > t; ++t)
              (r = d[t]).index = t, r.weight = 0;
            for (t = 0; l > t; ++t)
              r = m[t], 'number' == typeof r.source && (r.source = d[r.source]), 'number' == typeof r.target && (r.target = d[r.target]), ++r.source.weight, ++r.target.weight;
            for (t = 0; c > t; ++t)
              r = d[t], isNaN(r.x) && (r.x = n('x', p)), isNaN(r.y) && (r.y = n('y', v)), isNaN(r.px) && (r.px = r.x), isNaN(r.py) && (r.py = r.y);
            if (u = [], 'function' == typeof f)
              for (t = 0; l > t; ++t)
                u[t] = +f.call(this, m[t], t);
            else
              for (t = 0; l > t; ++t)
                u[t] = f;
            if (i = [], 'function' == typeof h)
              for (t = 0; l > t; ++t)
                i[t] = +h.call(this, m[t], t);
            else
              for (t = 0; l > t; ++t)
                i[t] = h;
            if (o = [], 'function' == typeof g)
              for (t = 0; c > t; ++t)
                o[t] = +g.call(this, d[t], t);
            else
              for (t = 0; c > t; ++t)
                o[t] = g;
            return a.resume();
          }, a.resume = function () {
            return a.alpha(0.1);
          }, a.stop = function () {
            return a.alpha(0);
          }, a.drag = function () {
            return e || (e = Zo.behavior.drag().origin(vt).on('dragstart.force', Au).on('drag.force', t).on('dragend.force', Cu)), arguments.length ? (this.on('mouseover.force', Nu).on('mouseout.force', Lu).call(e), void 0) : e;
          }, Zo.rebind(a, c, 'on');
        };
        var is = 20, os = 1;
        Zo.layout.hierarchy = function () {
          function n(t, o, a) {
            var c = u.call(e, t, o);
            if (t.depth = o, a.push(t), c && (s = c.length)) {
              for (var s, l, f = -1, h = t.children = [], g = 0, p = o + 1; ++f < s;)
                l = n(c[f], p, a), l.parent = t, h.push(l), g += l.value;
              r && h.sort(r), i && (t.value = g);
            } else
              i && (t.value = +i.call(e, t, o) || 0);
            return t;
          }
          function t(n, r) {
            var u = n.children, o = 0;
            if (u && (a = u.length))
              for (var a, c = -1, s = r + 1; ++c < a;)
                o += t(u[c], s);
            else
              i && (o = +i.call(e, n, r) || 0);
            return i && (n.value = o), o;
          }
          function e(t) {
            var e = [];
            return n(t, 0, e), e;
          }
          var r = Du, u = zu, i = Ru;
          return e.sort = function (n) {
            return arguments.length ? (r = n, e) : r;
          }, e.children = function (n) {
            return arguments.length ? (u = n, e) : u;
          }, e.value = function (n) {
            return arguments.length ? (i = n, e) : i;
          }, e.revalue = function (n) {
            return t(n, 0), n;
          }, e;
        }, Zo.layout.partition = function () {
          function n(t, e, r, u) {
            var i = t.children;
            if (t.x = e, t.y = t.depth * u, t.dx = r, t.dy = u, i && (o = i.length)) {
              var o, a, c, s = -1;
              for (r = t.value ? r / t.value : 0; ++s < o;)
                n(a = i[s], e, c = a.value * r, u), e += c;
            }
          }
          function t(n) {
            var e = n.children, r = 0;
            if (e && (u = e.length))
              for (var u, i = -1; ++i < u;)
                r = Math.max(r, t(e[i]));
            return 1 + r;
          }
          function e(e, i) {
            var o = r.call(this, e, i);
            return n(o[0], 0, u[0], u[1] / t(o[0])), o;
          }
          var r = Zo.layout.hierarchy(), u = [
              1,
              1
            ];
          return e.size = function (n) {
            return arguments.length ? (u = n, e) : u;
          }, qu(e, r);
        }, Zo.layout.pie = function () {
          function n(i) {
            var o = i.map(function (e, r) {
                return +t.call(n, e, r);
              }), a = +('function' == typeof r ? r.apply(this, arguments) : r), c = (('function' == typeof u ? u.apply(this, arguments) : u) - a) / Zo.sum(o), s = Zo.range(i.length);
            null != e && s.sort(e === as ? function (n, t) {
              return o[t] - o[n];
            } : function (n, t) {
              return e(i[n], i[t]);
            });
            var l = [];
            return s.forEach(function (n) {
              var t;
              l[n] = {
                data: i[n],
                value: t = o[n],
                startAngle: a,
                endAngle: a += t * c
              };
            }), l;
          }
          var t = Number, e = as, r = 0, u = wa;
          return n.value = function (e) {
            return arguments.length ? (t = e, n) : t;
          }, n.sort = function (t) {
            return arguments.length ? (e = t, n) : e;
          }, n.startAngle = function (t) {
            return arguments.length ? (r = t, n) : r;
          }, n.endAngle = function (t) {
            return arguments.length ? (u = t, n) : u;
          }, n;
        };
        var as = {};
        Zo.layout.stack = function () {
          function n(a, c) {
            var s = a.map(function (e, r) {
                return t.call(n, e, r);
              }), l = s.map(function (t) {
                return t.map(function (t, e) {
                  return [
                    i.call(n, t, e),
                    o.call(n, t, e)
                  ];
                });
              }), f = e.call(n, l, c);
            s = Zo.permute(s, f), l = Zo.permute(l, f);
            var h, g, p, v = r.call(n, l, c), d = s.length, m = s[0].length;
            for (g = 0; m > g; ++g)
              for (u.call(n, s[0][g], p = v[g], l[0][g][1]), h = 1; d > h; ++h)
                u.call(n, s[h][g], p += l[h - 1][g][1], l[h][g][1]);
            return a;
          }
          var t = vt, e = Fu, r = Ou, u = Hu, i = Uu, o = ju;
          return n.values = function (e) {
            return arguments.length ? (t = e, n) : t;
          }, n.order = function (t) {
            return arguments.length ? (e = 'function' == typeof t ? t : cs.get(t) || Fu, n) : e;
          }, n.offset = function (t) {
            return arguments.length ? (r = 'function' == typeof t ? t : ss.get(t) || Ou, n) : r;
          }, n.x = function (t) {
            return arguments.length ? (i = t, n) : i;
          }, n.y = function (t) {
            return arguments.length ? (o = t, n) : o;
          }, n.out = function (t) {
            return arguments.length ? (u = t, n) : u;
          }, n;
        };
        var cs = Zo.map({
            'inside-out': function (n) {
              var t, e, r = n.length, u = n.map(Yu), i = n.map(Iu), o = Zo.range(r).sort(function (n, t) {
                  return u[n] - u[t];
                }), a = 0, c = 0, s = [], l = [];
              for (t = 0; r > t; ++t)
                e = o[t], c > a ? (a += i[e], s.push(e)) : (c += i[e], l.push(e));
              return l.reverse().concat(s);
            },
            reverse: function (n) {
              return Zo.range(n.length).reverse();
            },
            'default': Fu
          }), ss = Zo.map({
            silhouette: function (n) {
              var t, e, r, u = n.length, i = n[0].length, o = [], a = 0, c = [];
              for (e = 0; i > e; ++e) {
                for (t = 0, r = 0; u > t; t++)
                  r += n[t][e][1];
                r > a && (a = r), o.push(r);
              }
              for (e = 0; i > e; ++e)
                c[e] = (a - o[e]) / 2;
              return c;
            },
            wiggle: function (n) {
              var t, e, r, u, i, o, a, c, s, l = n.length, f = n[0], h = f.length, g = [];
              for (g[0] = c = s = 0, e = 1; h > e; ++e) {
                for (t = 0, u = 0; l > t; ++t)
                  u += n[t][e][1];
                for (t = 0, i = 0, a = f[e][0] - f[e - 1][0]; l > t; ++t) {
                  for (r = 0, o = (n[t][e][1] - n[t][e - 1][1]) / (2 * a); t > r; ++r)
                    o += (n[r][e][1] - n[r][e - 1][1]) / a;
                  i += o * n[t][e][1];
                }
                g[e] = c -= u ? i / u * a : 0, s > c && (s = c);
              }
              for (e = 0; h > e; ++e)
                g[e] -= s;
              return g;
            },
            expand: function (n) {
              var t, e, r, u = n.length, i = n[0].length, o = 1 / u, a = [];
              for (e = 0; i > e; ++e) {
                for (t = 0, r = 0; u > t; t++)
                  r += n[t][e][1];
                if (r)
                  for (t = 0; u > t; t++)
                    n[t][e][1] /= r;
                else
                  for (t = 0; u > t; t++)
                    n[t][e][1] = o;
              }
              for (e = 0; i > e; ++e)
                a[e] = 0;
              return a;
            },
            zero: Ou
          });
        Zo.layout.histogram = function () {
          function n(n, i) {
            for (var o, a, c = [], s = n.map(e, this), l = r.call(this, s, i), f = u.call(this, l, s, i), i = -1, h = s.length, g = f.length - 1, p = t ? 1 : 1 / h; ++i < g;)
              o = c[i] = [], o.dx = f[i + 1] - (o.x = f[i]), o.y = 0;
            if (g > 0)
              for (i = -1; ++i < h;)
                a = s[i], a >= l[0] && a <= l[1] && (o = c[Zo.bisect(f, a, 1, g) - 1], o.y += p, o.push(n[i]));
            return c;
          }
          var t = !0, e = Number, r = $u, u = Vu;
          return n.value = function (t) {
            return arguments.length ? (e = t, n) : e;
          }, n.range = function (t) {
            return arguments.length ? (r = pt(t), n) : r;
          }, n.bins = function (t) {
            return arguments.length ? (u = 'number' == typeof t ? function (n) {
              return Xu(n, t);
            } : pt(t), n) : u;
          }, n.frequency = function (e) {
            return arguments.length ? (t = !!e, n) : t;
          }, n;
        }, Zo.layout.tree = function () {
          function n(n, i) {
            function o(n, t) {
              var r = n.children, u = n._tree;
              if (r && (i = r.length)) {
                for (var i, a, s, l = r[0], f = l, h = -1; ++h < i;)
                  s = r[h], o(s, a), f = c(s, a, f), a = s;
                ei(n);
                var g = 0.5 * (l._tree.prelim + s._tree.prelim);
                t ? (u.prelim = t._tree.prelim + e(n, t), u.mod = u.prelim - g) : u.prelim = g;
              } else
                t && (u.prelim = t._tree.prelim + e(n, t));
            }
            function a(n, t) {
              n.x = n._tree.prelim + t;
              var e = n.children;
              if (e && (r = e.length)) {
                var r, u = -1;
                for (t += n._tree.mod; ++u < r;)
                  a(e[u], t);
              }
            }
            function c(n, t, r) {
              if (t) {
                for (var u, i = n, o = n, a = t, c = n.parent.children[0], s = i._tree.mod, l = o._tree.mod, f = a._tree.mod, h = c._tree.mod; a = Ju(a), i = Wu(i), a && i;)
                  c = Wu(c), o = Ju(o), o._tree.ancestor = n, u = a._tree.prelim + f - i._tree.prelim - s + e(a, i), u > 0 && (ri(ui(a, n, r), n, u), s += u, l += u), f += a._tree.mod, s += i._tree.mod, h += c._tree.mod, l += o._tree.mod;
                a && !Ju(o) && (o._tree.thread = a, o._tree.mod += f - l), i && !Wu(c) && (c._tree.thread = i, c._tree.mod += s - h, r = n);
              }
              return r;
            }
            var s = t.call(this, n, i), l = s[0];
            ti(l, function (n, t) {
              n._tree = {
                ancestor: n,
                prelim: 0,
                mod: 0,
                change: 0,
                shift: 0,
                number: t ? t._tree.number + 1 : 0
              };
            }), o(l), a(l, -l._tree.prelim);
            var f = Gu(l, Qu), h = Gu(l, Ku), g = Gu(l, ni), p = f.x - e(f, h) / 2, v = h.x + e(h, f) / 2, d = g.depth || 1;
            return ti(l, u ? function (n) {
              n.x *= r[0], n.y = n.depth * r[1], delete n._tree;
            } : function (n) {
              n.x = (n.x - p) / (v - p) * r[0], n.y = n.depth / d * r[1], delete n._tree;
            }), s;
          }
          var t = Zo.layout.hierarchy().sort(null).value(null), e = Bu, r = [
              1,
              1
            ], u = !1;
          return n.separation = function (t) {
            return arguments.length ? (e = t, n) : e;
          }, n.size = function (t) {
            return arguments.length ? (u = null == (r = t), n) : u ? null : r;
          }, n.nodeSize = function (t) {
            return arguments.length ? (u = null != (r = t), n) : u ? r : null;
          }, qu(n, t);
        }, Zo.layout.pack = function () {
          function n(n, i) {
            var o = e.call(this, n, i), a = o[0], c = u[0], s = u[1], l = null == t ? Math.sqrt : 'function' == typeof t ? t : function () {
                return t;
              };
            if (a.x = a.y = 0, ti(a, function (n) {
                n.r = +l(n.value);
              }), ti(a, si), r) {
              var f = r * (t ? 1 : Math.max(2 * a.r / c, 2 * a.r / s)) / 2;
              ti(a, function (n) {
                n.r += f;
              }), ti(a, si), ti(a, function (n) {
                n.r -= f;
              });
            }
            return hi(a, c / 2, s / 2, t ? 1 : 1 / Math.max(2 * a.r / c, 2 * a.r / s)), o;
          }
          var t, e = Zo.layout.hierarchy().sort(ii), r = 0, u = [
              1,
              1
            ];
          return n.size = function (t) {
            return arguments.length ? (u = t, n) : u;
          }, n.radius = function (e) {
            return arguments.length ? (t = null == e || 'function' == typeof e ? e : +e, n) : t;
          }, n.padding = function (t) {
            return arguments.length ? (r = +t, n) : r;
          }, qu(n, e);
        }, Zo.layout.cluster = function () {
          function n(n, i) {
            var o, a = t.call(this, n, i), c = a[0], s = 0;
            ti(c, function (n) {
              var t = n.children;
              t && t.length ? (n.x = vi(t), n.y = pi(t)) : (n.x = o ? s += e(n, o) : 0, n.y = 0, o = n);
            });
            var l = di(c), f = mi(c), h = l.x - e(l, f) / 2, g = f.x + e(f, l) / 2;
            return ti(c, u ? function (n) {
              n.x = (n.x - c.x) * r[0], n.y = (c.y - n.y) * r[1];
            } : function (n) {
              n.x = (n.x - h) / (g - h) * r[0], n.y = (1 - (c.y ? n.y / c.y : 1)) * r[1];
            }), a;
          }
          var t = Zo.layout.hierarchy().sort(null).value(null), e = Bu, r = [
              1,
              1
            ], u = !1;
          return n.separation = function (t) {
            return arguments.length ? (e = t, n) : e;
          }, n.size = function (t) {
            return arguments.length ? (u = null == (r = t), n) : u ? null : r;
          }, n.nodeSize = function (t) {
            return arguments.length ? (u = null != (r = t), n) : u ? r : null;
          }, qu(n, t);
        }, Zo.layout.treemap = function () {
          function n(n, t) {
            for (var e, r, u = -1, i = n.length; ++u < i;)
              r = (e = n[u]).value * (0 > t ? 0 : t), e.area = isNaN(r) || 0 >= r ? 0 : r;
          }
          function t(e) {
            var i = e.children;
            if (i && i.length) {
              var o, a, c, s = f(e), l = [], h = i.slice(), p = 1 / 0, v = 'slice' === g ? s.dx : 'dice' === g ? s.dy : 'slice-dice' === g ? 1 & e.depth ? s.dy : s.dx : Math.min(s.dx, s.dy);
              for (n(h, s.dx * s.dy / e.value), l.area = 0; (c = h.length) > 0;)
                l.push(o = h[c - 1]), l.area += o.area, 'squarify' !== g || (a = r(l, v)) <= p ? (h.pop(), p = a) : (l.area -= l.pop().area, u(l, v, s, !1), v = Math.min(s.dx, s.dy), l.length = l.area = 0, p = 1 / 0);
              l.length && (u(l, v, s, !0), l.length = l.area = 0), i.forEach(t);
            }
          }
          function e(t) {
            var r = t.children;
            if (r && r.length) {
              var i, o = f(t), a = r.slice(), c = [];
              for (n(a, o.dx * o.dy / t.value), c.area = 0; i = a.pop();)
                c.push(i), c.area += i.area, null != i.z && (u(c, i.z ? o.dx : o.dy, o, !a.length), c.length = c.area = 0);
              r.forEach(e);
            }
          }
          function r(n, t) {
            for (var e, r = n.area, u = 0, i = 1 / 0, o = -1, a = n.length; ++o < a;)
              (e = n[o].area) && (i > e && (i = e), e > u && (u = e));
            return r *= r, t *= t, r ? Math.max(t * u * p / r, r / (t * i * p)) : 1 / 0;
          }
          function u(n, t, e, r) {
            var u, i = -1, o = n.length, a = e.x, s = e.y, l = t ? c(n.area / t) : 0;
            if (t == e.dx) {
              for ((r || l > e.dy) && (l = e.dy); ++i < o;)
                u = n[i], u.x = a, u.y = s, u.dy = l, a += u.dx = Math.min(e.x + e.dx - a, l ? c(u.area / l) : 0);
              u.z = !0, u.dx += e.x + e.dx - a, e.y += l, e.dy -= l;
            } else {
              for ((r || l > e.dx) && (l = e.dx); ++i < o;)
                u = n[i], u.x = a, u.y = s, u.dx = l, s += u.dy = Math.min(e.y + e.dy - s, l ? c(u.area / l) : 0);
              u.z = !1, u.dy += e.y + e.dy - s, e.x += l, e.dx -= l;
            }
          }
          function i(r) {
            var u = o || a(r), i = u[0];
            return i.x = 0, i.y = 0, i.dx = s[0], i.dy = s[1], o && a.revalue(i), n([i], i.dx * i.dy / i.value), (o ? e : t)(i), h && (o = u), u;
          }
          var o, a = Zo.layout.hierarchy(), c = Math.round, s = [
              1,
              1
            ], l = null, f = yi, h = !1, g = 'squarify', p = 0.5 * (1 + Math.sqrt(5));
          return i.size = function (n) {
            return arguments.length ? (s = n, i) : s;
          }, i.padding = function (n) {
            function t(t) {
              var e = n.call(i, t, t.depth);
              return null == e ? yi(t) : xi(t, 'number' == typeof e ? [
                e,
                e,
                e,
                e
              ] : e);
            }
            function e(t) {
              return xi(t, n);
            }
            if (!arguments.length)
              return l;
            var r;
            return f = null == (l = n) ? yi : 'function' == (r = typeof n) ? t : 'number' === r ? (n = [
              n,
              n,
              n,
              n
            ], e) : e, i;
          }, i.round = function (n) {
            return arguments.length ? (c = n ? Math.round : Number, i) : c != Number;
          }, i.sticky = function (n) {
            return arguments.length ? (h = n, o = null, i) : h;
          }, i.ratio = function (n) {
            return arguments.length ? (p = n, i) : p;
          }, i.mode = function (n) {
            return arguments.length ? (g = n + '', i) : g;
          }, qu(i, a);
        }, Zo.random = {
          normal: function (n, t) {
            var e = arguments.length;
            return 2 > e && (t = 1), 1 > e && (n = 0), function () {
              var e, r, u;
              do
                e = 2 * Math.random() - 1, r = 2 * Math.random() - 1, u = e * e + r * r;
              while (!u || u > 1);
              return n + t * e * Math.sqrt(-2 * Math.log(u) / u);
            };
          },
          logNormal: function () {
            var n = Zo.random.normal.apply(Zo, arguments);
            return function () {
              return Math.exp(n());
            };
          },
          irwinHall: function (n) {
            return function () {
              for (var t = 0, e = 0; n > e; e++)
                t += Math.random();
              return t / n;
            };
          }
        }, Zo.scale = {};
        var ls = {
            floor: vt,
            ceil: vt
          };
        Zo.scale.linear = function () {
          return Ei([
            0,
            1
          ], [
            0,
            1
          ], Kr, !1);
        }, Zo.scale.log = function () {
          return qi(Zo.scale.linear().domain([
            0,
            1
          ]), 10, !0, [
            1,
            10
          ]);
        };
        var fs = Zo.format('.0e'), hs = {
            floor: function (n) {
              return -Math.ceil(-n);
            },
            ceil: function (n) {
              return -Math.floor(-n);
            }
          };
        Zo.scale.pow = function () {
          return zi(Zo.scale.linear(), 1, [
            0,
            1
          ]);
        }, Zo.scale.sqrt = function () {
          return Zo.scale.pow().exponent(0.5);
        }, Zo.scale.ordinal = function () {
          return Di([], {
            t: 'range',
            a: [[]]
          });
        }, Zo.scale.category10 = function () {
          return Zo.scale.ordinal().range(gs);
        }, Zo.scale.category20 = function () {
          return Zo.scale.ordinal().range(ps);
        }, Zo.scale.category20b = function () {
          return Zo.scale.ordinal().range(vs);
        }, Zo.scale.category20c = function () {
          return Zo.scale.ordinal().range(ds);
        };
        var gs = [
            2062260,
            16744206,
            2924588,
            14034728,
            9725885,
            9197131,
            14907330,
            8355711,
            12369186,
            1556175
          ].map(it), ps = [
            2062260,
            11454440,
            16744206,
            16759672,
            2924588,
            10018698,
            14034728,
            16750742,
            9725885,
            12955861,
            9197131,
            12885140,
            14907330,
            16234194,
            8355711,
            13092807,
            12369186,
            14408589,
            1556175,
            10410725
          ].map(it), vs = [
            3750777,
            5395619,
            7040719,
            10264286,
            6519097,
            9216594,
            11915115,
            13556636,
            9202993,
            12426809,
            15186514,
            15190932,
            8666169,
            11356490,
            14049643,
            15177372,
            8077683,
            10834324,
            13528509,
            14589654
          ].map(it), ds = [
            3244733,
            7057110,
            10406625,
            13032431,
            15095053,
            16616764,
            16625259,
            16634018,
            3253076,
            7652470,
            10607003,
            13101504,
            7695281,
            10394312,
            12369372,
            14342891,
            6513507,
            9868950,
            12434877,
            14277081
          ].map(it);
        Zo.scale.quantile = function () {
          return Pi([], []);
        }, Zo.scale.quantize = function () {
          return Ui(0, 1, [
            0,
            1
          ]);
        }, Zo.scale.threshold = function () {
          return ji([0.5], [
            0,
            1
          ]);
        }, Zo.scale.identity = function () {
          return Hi([
            0,
            1
          ]);
        }, Zo.svg.arc = function () {
          function n() {
            var n = t.apply(this, arguments), i = e.apply(this, arguments), o = r.apply(this, arguments) + ms, a = u.apply(this, arguments) + ms, c = (o > a && (c = o, o = a, a = c), a - o), s = ba > c ? '0' : '1', l = Math.cos(o), f = Math.sin(o), h = Math.cos(a), g = Math.sin(a);
            return c >= ys ? n ? 'M0,' + i + 'A' + i + ',' + i + ' 0 1,1 0,' + -i + 'A' + i + ',' + i + ' 0 1,1 0,' + i + 'M0,' + n + 'A' + n + ',' + n + ' 0 1,0 0,' + -n + 'A' + n + ',' + n + ' 0 1,0 0,' + n + 'Z' : 'M0,' + i + 'A' + i + ',' + i + ' 0 1,1 0,' + -i + 'A' + i + ',' + i + ' 0 1,1 0,' + i + 'Z' : n ? 'M' + i * l + ',' + i * f + 'A' + i + ',' + i + ' 0 ' + s + ',1 ' + i * h + ',' + i * g + 'L' + n * h + ',' + n * g + 'A' + n + ',' + n + ' 0 ' + s + ',0 ' + n * l + ',' + n * f + 'Z' : 'M' + i * l + ',' + i * f + 'A' + i + ',' + i + ' 0 ' + s + ',1 ' + i * h + ',' + i * g + 'L0,0' + 'Z';
          }
          var t = Fi, e = Oi, r = Yi, u = Ii;
          return n.innerRadius = function (e) {
            return arguments.length ? (t = pt(e), n) : t;
          }, n.outerRadius = function (t) {
            return arguments.length ? (e = pt(t), n) : e;
          }, n.startAngle = function (t) {
            return arguments.length ? (r = pt(t), n) : r;
          }, n.endAngle = function (t) {
            return arguments.length ? (u = pt(t), n) : u;
          }, n.centroid = function () {
            var n = (t.apply(this, arguments) + e.apply(this, arguments)) / 2, i = (r.apply(this, arguments) + u.apply(this, arguments)) / 2 + ms;
            return [
              Math.cos(i) * n,
              Math.sin(i) * n
            ];
          }, n;
        };
        var ms = -Sa, ys = wa - ka;
        Zo.svg.line.radial = function () {
          var n = Ie(Zi);
          return n.radius = n.x, delete n.x, n.angle = n.y, delete n.y, n;
        }, We.reverse = Je, Je.reverse = We, Zo.svg.area = function () {
          return Vi(vt);
        }, Zo.svg.area.radial = function () {
          var n = Vi(Zi);
          return n.radius = n.x, delete n.x, n.innerRadius = n.x0, delete n.x0, n.outerRadius = n.x1, delete n.x1, n.angle = n.y, delete n.y, n.startAngle = n.y0, delete n.y0, n.endAngle = n.y1, delete n.y1, n;
        }, Zo.svg.chord = function () {
          function n(n, a) {
            var c = t(this, i, n, a), s = t(this, o, n, a);
            return 'M' + c.p0 + r(c.r, c.p1, c.a1 - c.a0) + (e(c, s) ? u(c.r, c.p1, c.r, c.p0) : u(c.r, c.p1, s.r, s.p0) + r(s.r, s.p1, s.a1 - s.a0) + u(s.r, s.p1, c.r, c.p0)) + 'Z';
          }
          function t(n, t, e, r) {
            var u = t.call(n, e, r), i = a.call(n, u, r), o = c.call(n, u, r) + ms, l = s.call(n, u, r) + ms;
            return {
              r: i,
              a0: o,
              a1: l,
              p0: [
                i * Math.cos(o),
                i * Math.sin(o)
              ],
              p1: [
                i * Math.cos(l),
                i * Math.sin(l)
              ]
            };
          }
          function e(n, t) {
            return n.a0 == t.a0 && n.a1 == t.a1;
          }
          function r(n, t, e) {
            return 'A' + n + ',' + n + ' 0 ' + +(e > ba) + ',1 ' + t;
          }
          function u(n, t, e, r) {
            return 'Q 0,0 ' + r;
          }
          var i = ze, o = Re, a = Xi, c = Yi, s = Ii;
          return n.radius = function (t) {
            return arguments.length ? (a = pt(t), n) : a;
          }, n.source = function (t) {
            return arguments.length ? (i = pt(t), n) : i;
          }, n.target = function (t) {
            return arguments.length ? (o = pt(t), n) : o;
          }, n.startAngle = function (t) {
            return arguments.length ? (c = pt(t), n) : c;
          }, n.endAngle = function (t) {
            return arguments.length ? (s = pt(t), n) : s;
          }, n;
        }, Zo.svg.diagonal = function () {
          function n(n, u) {
            var i = t.call(this, n, u), o = e.call(this, n, u), a = (i.y + o.y) / 2, c = [
                i,
                {
                  x: i.x,
                  y: a
                },
                {
                  x: o.x,
                  y: a
                },
                o
              ];
            return c = c.map(r), 'M' + c[0] + 'C' + c[1] + ' ' + c[2] + ' ' + c[3];
          }
          var t = ze, e = Re, r = $i;
          return n.source = function (e) {
            return arguments.length ? (t = pt(e), n) : t;
          }, n.target = function (t) {
            return arguments.length ? (e = pt(t), n) : e;
          }, n.projection = function (t) {
            return arguments.length ? (r = t, n) : r;
          }, n;
        }, Zo.svg.diagonal.radial = function () {
          var n = Zo.svg.diagonal(), t = $i, e = n.projection;
          return n.projection = function (n) {
            return arguments.length ? e(Bi(t = n)) : t;
          }, n;
        }, Zo.svg.symbol = function () {
          function n(n, r) {
            return (xs.get(t.call(this, n, r)) || Gi)(e.call(this, n, r));
          }
          var t = Ji, e = Wi;
          return n.type = function (e) {
            return arguments.length ? (t = pt(e), n) : t;
          }, n.size = function (t) {
            return arguments.length ? (e = pt(t), n) : e;
          }, n;
        };
        var xs = Zo.map({
            circle: Gi,
            cross: function (n) {
              var t = Math.sqrt(n / 5) / 2;
              return 'M' + -3 * t + ',' + -t + 'H' + -t + 'V' + -3 * t + 'H' + t + 'V' + -t + 'H' + 3 * t + 'V' + t + 'H' + t + 'V' + 3 * t + 'H' + -t + 'V' + t + 'H' + -3 * t + 'Z';
            },
            diamond: function (n) {
              var t = Math.sqrt(n / (2 * ws)), e = t * ws;
              return 'M0,' + -t + 'L' + e + ',0' + ' 0,' + t + ' ' + -e + ',0' + 'Z';
            },
            square: function (n) {
              var t = Math.sqrt(n) / 2;
              return 'M' + -t + ',' + -t + 'L' + t + ',' + -t + ' ' + t + ',' + t + ' ' + -t + ',' + t + 'Z';
            },
            'triangle-down': function (n) {
              var t = Math.sqrt(n / bs), e = t * bs / 2;
              return 'M0,' + e + 'L' + t + ',' + -e + ' ' + -t + ',' + -e + 'Z';
            },
            'triangle-up': function (n) {
              var t = Math.sqrt(n / bs), e = t * bs / 2;
              return 'M0,' + -e + 'L' + t + ',' + e + ' ' + -t + ',' + e + 'Z';
            }
          });
        Zo.svg.symbolTypes = xs.keys();
        var Ms, _s, bs = Math.sqrt(3), ws = Math.tan(30 * Aa), Ss = [], ks = 0;
        Ss.call = pa.call, Ss.empty = pa.empty, Ss.node = pa.node, Ss.size = pa.size, Zo.transition = function (n) {
          return arguments.length ? Ms ? n.transition() : n : ma.transition();
        }, Zo.transition.prototype = Ss, Ss.select = function (n) {
          var t, e, r, u = this.id, i = [];
          n = v(n);
          for (var o = -1, a = this.length; ++o < a;) {
            i.push(t = []);
            for (var c = this[o], s = -1, l = c.length; ++s < l;)
              (r = c[s]) && (e = n.call(r, r.__data__, s, o)) ? ('__data__' in r && (e.__data__ = r.__data__), to(e, s, u, r.__transition__[u]), t.push(e)) : t.push(null);
          }
          return Ki(i, u);
        }, Ss.selectAll = function (n) {
          var t, e, r, u, i, o = this.id, a = [];
          n = d(n);
          for (var c = -1, s = this.length; ++c < s;)
            for (var l = this[c], f = -1, h = l.length; ++f < h;)
              if (r = l[f]) {
                i = r.__transition__[o], e = n.call(r, r.__data__, f, c), a.push(t = []);
                for (var g = -1, p = e.length; ++g < p;)
                  (u = e[g]) && to(u, g, o, i), t.push(u);
              }
          return Ki(a, o);
        }, Ss.filter = function (n) {
          var t, e, r, u = [];
          'function' != typeof n && (n = E(n));
          for (var i = 0, o = this.length; o > i; i++) {
            u.push(t = []);
            for (var e = this[i], a = 0, c = e.length; c > a; a++)
              (r = e[a]) && n.call(r, r.__data__, a) && t.push(r);
          }
          return Ki(u, this.id);
        }, Ss.tween = function (n, t) {
          var e = this.id;
          return arguments.length < 2 ? this.node().__transition__[e].tween.get(n) : C(this, null == t ? function (t) {
            t.__transition__[e].tween.remove(n);
          } : function (r) {
            r.__transition__[e].tween.set(n, t);
          });
        }, Ss.attr = function (n, t) {
          function e() {
            this.removeAttribute(a);
          }
          function r() {
            this.removeAttributeNS(a.space, a.local);
          }
          function u(n) {
            return null == n ? e : (n += '', function () {
              var t, e = this.getAttribute(a);
              return e !== n && (t = o(e, n), function (n) {
                this.setAttribute(a, t(n));
              });
            });
          }
          function i(n) {
            return null == n ? r : (n += '', function () {
              var t, e = this.getAttributeNS(a.space, a.local);
              return e !== n && (t = o(e, n), function (n) {
                this.setAttributeNS(a.space, a.local, t(n));
              });
            });
          }
          if (arguments.length < 2) {
            for (t in n)
              this.attr(t, n[t]);
            return this;
          }
          var o = 'transform' == n ? _u : Kr, a = Zo.ns.qualify(n);
          return Qi(this, 'attr.' + n, t, a.local ? i : u);
        }, Ss.attrTween = function (n, t) {
          function e(n, e) {
            var r = t.call(this, n, e, this.getAttribute(u));
            return r && function (n) {
              this.setAttribute(u, r(n));
            };
          }
          function r(n, e) {
            var r = t.call(this, n, e, this.getAttributeNS(u.space, u.local));
            return r && function (n) {
              this.setAttributeNS(u.space, u.local, r(n));
            };
          }
          var u = Zo.ns.qualify(n);
          return this.tween('attr.' + n, u.local ? r : e);
        }, Ss.style = function (n, t, e) {
          function r() {
            this.style.removeProperty(n);
          }
          function u(t) {
            return null == t ? r : (t += '', function () {
              var r, u = Wo.getComputedStyle(this, null).getPropertyValue(n);
              return u !== t && (r = Kr(u, t), function (t) {
                this.style.setProperty(n, r(t), e);
              });
            });
          }
          var i = arguments.length;
          if (3 > i) {
            if ('string' != typeof n) {
              2 > i && (t = '');
              for (e in n)
                this.style(e, n[e], t);
              return this;
            }
            e = '';
          }
          return Qi(this, 'style.' + n, t, u);
        }, Ss.styleTween = function (n, t, e) {
          function r(r, u) {
            var i = t.call(this, r, u, Wo.getComputedStyle(this, null).getPropertyValue(n));
            return i && function (t) {
              this.style.setProperty(n, i(t), e);
            };
          }
          return arguments.length < 3 && (e = ''), this.tween('style.' + n, r);
        }, Ss.text = function (n) {
          return Qi(this, 'text', n, no);
        }, Ss.remove = function () {
          return this.each('end.transition', function () {
            var n;
            this.__transition__.count < 2 && (n = this.parentNode) && n.removeChild(this);
          });
        }, Ss.ease = function (n) {
          var t = this.id;
          return arguments.length < 1 ? this.node().__transition__[t].ease : ('function' != typeof n && (n = Zo.ease.apply(Zo, arguments)), C(this, function (e) {
            e.__transition__[t].ease = n;
          }));
        }, Ss.delay = function (n) {
          var t = this.id;
          return C(this, 'function' == typeof n ? function (e, r, u) {
            e.__transition__[t].delay = +n.call(e, e.__data__, r, u);
          } : (n = +n, function (e) {
            e.__transition__[t].delay = n;
          }));
        }, Ss.duration = function (n) {
          var t = this.id;
          return C(this, 'function' == typeof n ? function (e, r, u) {
            e.__transition__[t].duration = Math.max(1, n.call(e, e.__data__, r, u));
          } : (n = Math.max(1, n), function (e) {
            e.__transition__[t].duration = n;
          }));
        }, Ss.each = function (n, t) {
          var e = this.id;
          if (arguments.length < 2) {
            var r = _s, u = Ms;
            Ms = e, C(this, function (t, r, u) {
              _s = t.__transition__[e], n.call(t, t.__data__, r, u);
            }), _s = r, Ms = u;
          } else
            C(this, function (r) {
              var u = r.__transition__[e];
              (u.event || (u.event = Zo.dispatch('start', 'end'))).on(n, t);
            });
          return this;
        }, Ss.transition = function () {
          for (var n, t, e, r, u = this.id, i = ++ks, o = [], a = 0, c = this.length; c > a; a++) {
            o.push(n = []);
            for (var t = this[a], s = 0, l = t.length; l > s; s++)
              (e = t[s]) && (r = Object.create(e.__transition__[u]), r.delay += r.duration, to(e, s, i, r)), n.push(e);
          }
          return Ki(o, i);
        }, Zo.svg.axis = function () {
          function n(n) {
            n.each(function () {
              var n, s = Zo.select(this), l = this.__chart__ || e, f = this.__chart__ = e.copy(), h = null == c ? f.ticks ? f.ticks.apply(f, a) : f.domain() : c, g = null == t ? f.tickFormat ? f.tickFormat.apply(f, a) : vt : t, p = s.selectAll('.tick').data(h, f), v = p.enter().insert('g', '.domain').attr('class', 'tick').style('opacity', ka), d = Zo.transition(p.exit()).style('opacity', ka).remove(), m = Zo.transition(p).style('opacity', 1), y = _i(f), x = s.selectAll('.domain').data([0]), M = (x.enter().append('path').attr('class', 'domain'), Zo.transition(x));
              v.append('line'), v.append('text');
              var _ = v.select('line'), b = m.select('line'), w = p.select('text').text(g), S = v.select('text'), k = m.select('text');
              switch (r) {
              case 'bottom':
                n = eo, _.attr('y2', u), S.attr('y', Math.max(u, 0) + o), b.attr('x2', 0).attr('y2', u), k.attr('x', 0).attr('y', Math.max(u, 0) + o), w.attr('dy', '.71em').style('text-anchor', 'middle'), M.attr('d', 'M' + y[0] + ',' + i + 'V0H' + y[1] + 'V' + i);
                break;
              case 'top':
                n = eo, _.attr('y2', -u), S.attr('y', -(Math.max(u, 0) + o)), b.attr('x2', 0).attr('y2', -u), k.attr('x', 0).attr('y', -(Math.max(u, 0) + o)), w.attr('dy', '0em').style('text-anchor', 'middle'), M.attr('d', 'M' + y[0] + ',' + -i + 'V0H' + y[1] + 'V' + -i);
                break;
              case 'left':
                n = ro, _.attr('x2', -u), S.attr('x', -(Math.max(u, 0) + o)), b.attr('x2', -u).attr('y2', 0), k.attr('x', -(Math.max(u, 0) + o)).attr('y', 0), w.attr('dy', '.32em').style('text-anchor', 'end'), M.attr('d', 'M' + -i + ',' + y[0] + 'H0V' + y[1] + 'H' + -i);
                break;
              case 'right':
                n = ro, _.attr('x2', u), S.attr('x', Math.max(u, 0) + o), b.attr('x2', u).attr('y2', 0), k.attr('x', Math.max(u, 0) + o).attr('y', 0), w.attr('dy', '.32em').style('text-anchor', 'start'), M.attr('d', 'M' + i + ',' + y[0] + 'H0V' + y[1] + 'H' + i);
              }
              if (f.rangeBand) {
                var E = f.rangeBand() / 2, A = function (n) {
                    return f(n) + E;
                  };
                v.call(n, A), m.call(n, A);
              } else
                v.call(n, l), m.call(n, f), d.call(n, f);
            });
          }
          var t, e = Zo.scale.linear(), r = Es, u = 6, i = 6, o = 3, a = [10], c = null;
          return n.scale = function (t) {
            return arguments.length ? (e = t, n) : e;
          }, n.orient = function (t) {
            return arguments.length ? (r = t in As ? t + '' : Es, n) : r;
          }, n.ticks = function () {
            return arguments.length ? (a = arguments, n) : a;
          }, n.tickValues = function (t) {
            return arguments.length ? (c = t, n) : c;
          }, n.tickFormat = function (e) {
            return arguments.length ? (t = e, n) : t;
          }, n.tickSize = function (t) {
            var e = arguments.length;
            return e ? (u = +t, i = +arguments[e - 1], n) : u;
          }, n.innerTickSize = function (t) {
            return arguments.length ? (u = +t, n) : u;
          }, n.outerTickSize = function (t) {
            return arguments.length ? (i = +t, n) : i;
          }, n.tickPadding = function (t) {
            return arguments.length ? (o = +t, n) : o;
          }, n.tickSubdivide = function () {
            return arguments.length && n;
          }, n;
        };
        var Es = 'bottom', As = {
            top: 1,
            right: 1,
            bottom: 1,
            left: 1
          };
        Zo.svg.brush = function () {
          function n(i) {
            i.each(function () {
              var i = Zo.select(this).style('pointer-events', 'all').style('-webkit-tap-highlight-color', 'rgba(0,0,0,0)').on('mousedown.brush', u).on('touchstart.brush', u), o = i.selectAll('.background').data([0]);
              o.enter().append('rect').attr('class', 'background').style('visibility', 'hidden').style('cursor', 'crosshair'), i.selectAll('.extent').data([0]).enter().append('rect').attr('class', 'extent').style('cursor', 'move');
              var a = i.selectAll('.resize').data(d, vt);
              a.exit().remove(), a.enter().append('g').attr('class', function (n) {
                return 'resize ' + n;
              }).style('cursor', function (n) {
                return Cs[n];
              }).append('rect').attr('x', function (n) {
                return /[ew]$/.test(n) ? -3 : null;
              }).attr('y', function (n) {
                return /^[ns]/.test(n) ? -3 : null;
              }).attr('width', 6).attr('height', 6).style('visibility', 'hidden'), a.style('display', n.empty() ? 'none' : null);
              var l, f = Zo.transition(i), h = Zo.transition(o);
              c && (l = _i(c), h.attr('x', l[0]).attr('width', l[1] - l[0]), e(f)), s && (l = _i(s), h.attr('y', l[0]).attr('height', l[1] - l[0]), r(f)), t(f);
            });
          }
          function t(n) {
            n.selectAll('.resize').attr('transform', function (n) {
              return 'translate(' + l[+/e$/.test(n)] + ',' + h[+/^s/.test(n)] + ')';
            });
          }
          function e(n) {
            n.select('.extent').attr('x', l[0]), n.selectAll('.extent,.n>rect,.s>rect').attr('width', l[1] - l[0]);
          }
          function r(n) {
            n.select('.extent').attr('y', h[0]), n.selectAll('.extent,.e>rect,.w>rect').attr('height', h[1] - h[0]);
          }
          function u() {
            function u() {
              32 == Zo.event.keyCode && (C || (x = null, L[0] -= l[1], L[1] -= h[1], C = 2), f());
            }
            function g() {
              32 == Zo.event.keyCode && 2 == C && (L[0] += l[1], L[1] += h[1], C = 0, f());
            }
            function d() {
              var n = Zo.mouse(_), u = !1;
              M && (n[0] += M[0], n[1] += M[1]), C || (Zo.event.altKey ? (x || (x = [
                (l[0] + l[1]) / 2,
                (h[0] + h[1]) / 2
              ]), L[0] = l[+(n[0] < x[0])], L[1] = h[+(n[1] < x[1])]) : x = null), E && m(n, c, 0) && (e(S), u = !0), A && m(n, s, 1) && (r(S), u = !0), u && (t(S), w({
                type: 'brush',
                mode: C ? 'move' : 'resize'
              }));
            }
            function m(n, t, e) {
              var r, u, a = _i(t), c = a[0], s = a[1], f = L[e], g = e ? h : l, d = g[1] - g[0];
              return C && (c -= f, s -= d + f), r = (e ? v : p) ? Math.max(c, Math.min(s, n[e])) : n[e], C ? u = (r += f) + d : (x && (f = Math.max(c, Math.min(s, 2 * x[e] - r))), r > f ? (u = r, r = f) : u = f), g[0] != r || g[1] != u ? (e ? o = null : i = null, g[0] = r, g[1] = u, !0) : void 0;
            }
            function y() {
              d(), S.style('pointer-events', 'all').selectAll('.resize').style('display', n.empty() ? 'none' : null), Zo.select('body').style('cursor', null), T.on('mousemove.brush', null).on('mouseup.brush', null).on('touchmove.brush', null).on('touchend.brush', null).on('keydown.brush', null).on('keyup.brush', null), N(), w({ type: 'brushend' });
            }
            var x, M, _ = this, b = Zo.select(Zo.event.target), w = a.of(_, arguments), S = Zo.select(_), k = b.datum(), E = !/^(n|s)$/.test(k) && c, A = !/^(e|w)$/.test(k) && s, C = b.classed('extent'), N = D(), L = Zo.mouse(_), T = Zo.select(Wo).on('keydown.brush', u).on('keyup.brush', g);
            if (Zo.event.changedTouches ? T.on('touchmove.brush', d).on('touchend.brush', y) : T.on('mousemove.brush', d).on('mouseup.brush', y), S.interrupt().selectAll('*').interrupt(), C)
              L[0] = l[0] - L[0], L[1] = h[0] - L[1];
            else if (k) {
              var q = +/w$/.test(k), z = +/^n/.test(k);
              M = [
                l[1 - q] - L[0],
                h[1 - z] - L[1]
              ], L[0] = l[q], L[1] = h[z];
            } else
              Zo.event.altKey && (x = L.slice());
            S.style('pointer-events', 'none').selectAll('.resize').style('display', null), Zo.select('body').style('cursor', b.style('cursor')), w({ type: 'brushstart' }), d();
          }
          var i, o, a = g(n, 'brushstart', 'brush', 'brushend'), c = null, s = null, l = [
              0,
              0
            ], h = [
              0,
              0
            ], p = !0, v = !0, d = Ns[0];
          return n.event = function (n) {
            n.each(function () {
              var n = a.of(this, arguments), t = {
                  x: l,
                  y: h,
                  i: i,
                  j: o
                }, e = this.__chart__ || t;
              this.__chart__ = t, Ms ? Zo.select(this).transition().each('start.brush', function () {
                i = e.i, o = e.j, l = e.x, h = e.y, n({ type: 'brushstart' });
              }).tween('brush:brush', function () {
                var e = Qr(l, t.x), r = Qr(h, t.y);
                return i = o = null, function (u) {
                  l = t.x = e(u), h = t.y = r(u), n({
                    type: 'brush',
                    mode: 'resize'
                  });
                };
              }).each('end.brush', function () {
                i = t.i, o = t.j, n({
                  type: 'brush',
                  mode: 'resize'
                }), n({ type: 'brushend' });
              }) : (n({ type: 'brushstart' }), n({
                type: 'brush',
                mode: 'resize'
              }), n({ type: 'brushend' }));
            });
          }, n.x = function (t) {
            return arguments.length ? (c = t, d = Ns[!c << 1 | !s], n) : c;
          }, n.y = function (t) {
            return arguments.length ? (s = t, d = Ns[!c << 1 | !s], n) : s;
          }, n.clamp = function (t) {
            return arguments.length ? (c && s ? (p = !!t[0], v = !!t[1]) : c ? p = !!t : s && (v = !!t), n) : c && s ? [
              p,
              v
            ] : c ? p : s ? v : null;
          }, n.extent = function (t) {
            var e, r, u, a, f;
            return arguments.length ? (c && (e = t[0], r = t[1], s && (e = e[0], r = r[0]), i = [
              e,
              r
            ], c.invert && (e = c(e), r = c(r)), e > r && (f = e, e = r, r = f), (e != l[0] || r != l[1]) && (l = [
              e,
              r
            ])), s && (u = t[0], a = t[1], c && (u = u[1], a = a[1]), o = [
              u,
              a
            ], s.invert && (u = s(u), a = s(a)), u > a && (f = u, u = a, a = f), (u != h[0] || a != h[1]) && (h = [
              u,
              a
            ])), n) : (c && (i ? (e = i[0], r = i[1]) : (e = l[0], r = l[1], c.invert && (e = c.invert(e), r = c.invert(r)), e > r && (f = e, e = r, r = f))), s && (o ? (u = o[0], a = o[1]) : (u = h[0], a = h[1], s.invert && (u = s.invert(u), a = s.invert(a)), u > a && (f = u, u = a, a = f))), c && s ? [
              [
                e,
                u
              ],
              [
                r,
                a
              ]
            ] : c ? [
              e,
              r
            ] : s && [
              u,
              a
            ]);
          }, n.clear = function () {
            return n.empty() || (l = [
              0,
              0
            ], h = [
              0,
              0
            ], i = o = null), n;
          }, n.empty = function () {
            return !!c && l[0] == l[1] || !!s && h[0] == h[1];
          }, Zo.rebind(n, a, 'on');
        };
        var Cs = {
            n: 'ns-resize',
            e: 'ew-resize',
            s: 'ns-resize',
            w: 'ew-resize',
            nw: 'nwse-resize',
            ne: 'nesw-resize',
            se: 'nwse-resize',
            sw: 'nesw-resize'
          }, Ns = [
            [
              'n',
              'e',
              's',
              'w',
              'nw',
              'ne',
              'se',
              'sw'
            ],
            [
              'e',
              'w'
            ],
            [
              'n',
              's'
            ],
            []
          ], Ls = Zo.time = {}, Ts = Date, qs = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ];
        uo.prototype = {
          getDate: function () {
            return this._.getUTCDate();
          },
          getDay: function () {
            return this._.getUTCDay();
          },
          getFullYear: function () {
            return this._.getUTCFullYear();
          },
          getHours: function () {
            return this._.getUTCHours();
          },
          getMilliseconds: function () {
            return this._.getUTCMilliseconds();
          },
          getMinutes: function () {
            return this._.getUTCMinutes();
          },
          getMonth: function () {
            return this._.getUTCMonth();
          },
          getSeconds: function () {
            return this._.getUTCSeconds();
          },
          getTime: function () {
            return this._.getTime();
          },
          getTimezoneOffset: function () {
            return 0;
          },
          valueOf: function () {
            return this._.valueOf();
          },
          setDate: function () {
            zs.setUTCDate.apply(this._, arguments);
          },
          setDay: function () {
            zs.setUTCDay.apply(this._, arguments);
          },
          setFullYear: function () {
            zs.setUTCFullYear.apply(this._, arguments);
          },
          setHours: function () {
            zs.setUTCHours.apply(this._, arguments);
          },
          setMilliseconds: function () {
            zs.setUTCMilliseconds.apply(this._, arguments);
          },
          setMinutes: function () {
            zs.setUTCMinutes.apply(this._, arguments);
          },
          setMonth: function () {
            zs.setUTCMonth.apply(this._, arguments);
          },
          setSeconds: function () {
            zs.setUTCSeconds.apply(this._, arguments);
          },
          setTime: function () {
            zs.setTime.apply(this._, arguments);
          }
        };
        var zs = Date.prototype, Rs = '%a %b %e %X %Y', Ds = '%m/%d/%Y', Ps = '%H:%M:%S', Us = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ], js = [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
          ], Hs = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ], Fs = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ];
        Ls.year = io(function (n) {
          return n = Ls.day(n), n.setMonth(0, 1), n;
        }, function (n, t) {
          n.setFullYear(n.getFullYear() + t);
        }, function (n) {
          return n.getFullYear();
        }), Ls.years = Ls.year.range, Ls.years.utc = Ls.year.utc.range, Ls.day = io(function (n) {
          var t = new Ts(2000, 0);
          return t.setFullYear(n.getFullYear(), n.getMonth(), n.getDate()), t;
        }, function (n, t) {
          n.setDate(n.getDate() + t);
        }, function (n) {
          return n.getDate() - 1;
        }), Ls.days = Ls.day.range, Ls.days.utc = Ls.day.utc.range, Ls.dayOfYear = function (n) {
          var t = Ls.year(n);
          return Math.floor((n - t - 60000 * (n.getTimezoneOffset() - t.getTimezoneOffset())) / 86400000);
        }, qs.forEach(function (n, t) {
          n = n.toLowerCase(), t = 7 - t;
          var e = Ls[n] = io(function (n) {
              return (n = Ls.day(n)).setDate(n.getDate() - (n.getDay() + t) % 7), n;
            }, function (n, t) {
              n.setDate(n.getDate() + 7 * Math.floor(t));
            }, function (n) {
              var e = Ls.year(n).getDay();
              return Math.floor((Ls.dayOfYear(n) + (e + t) % 7) / 7) - (e !== t);
            });
          Ls[n + 's'] = e.range, Ls[n + 's'].utc = e.utc.range, Ls[n + 'OfYear'] = function (n) {
            var e = Ls.year(n).getDay();
            return Math.floor((Ls.dayOfYear(n) + (e + t) % 7) / 7);
          };
        }), Ls.week = Ls.sunday, Ls.weeks = Ls.sunday.range, Ls.weeks.utc = Ls.sunday.utc.range, Ls.weekOfYear = Ls.sundayOfYear, Ls.format = ao;
        var Os = so(Us), Ys = lo(Us), Is = so(js), Zs = lo(js), Vs = so(Hs), Xs = lo(Hs), $s = so(Fs), Bs = lo(Fs), Ws = /^%/, Js = {
            '-': '',
            _: ' ',
            0: '0'
          }, Gs = {
            a: function (n) {
              return js[n.getDay()];
            },
            A: function (n) {
              return Us[n.getDay()];
            },
            b: function (n) {
              return Fs[n.getMonth()];
            },
            B: function (n) {
              return Hs[n.getMonth()];
            },
            c: ao(Rs),
            d: function (n, t) {
              return fo(n.getDate(), t, 2);
            },
            e: function (n, t) {
              return fo(n.getDate(), t, 2);
            },
            H: function (n, t) {
              return fo(n.getHours(), t, 2);
            },
            I: function (n, t) {
              return fo(n.getHours() % 12 || 12, t, 2);
            },
            j: function (n, t) {
              return fo(1 + Ls.dayOfYear(n), t, 3);
            },
            L: function (n, t) {
              return fo(n.getMilliseconds(), t, 3);
            },
            m: function (n, t) {
              return fo(n.getMonth() + 1, t, 2);
            },
            M: function (n, t) {
              return fo(n.getMinutes(), t, 2);
            },
            p: function (n) {
              return n.getHours() >= 12 ? 'PM' : 'AM';
            },
            S: function (n, t) {
              return fo(n.getSeconds(), t, 2);
            },
            U: function (n, t) {
              return fo(Ls.sundayOfYear(n), t, 2);
            },
            w: function (n) {
              return n.getDay();
            },
            W: function (n, t) {
              return fo(Ls.mondayOfYear(n), t, 2);
            },
            x: ao(Ds),
            X: ao(Ps),
            y: function (n, t) {
              return fo(n.getFullYear() % 100, t, 2);
            },
            Y: function (n, t) {
              return fo(n.getFullYear() % 10000, t, 4);
            },
            Z: Do,
            '%': function () {
              return '%';
            }
          }, Ks = {
            a: ho,
            A: go,
            b: yo,
            B: xo,
            c: Mo,
            d: Co,
            e: Co,
            H: Lo,
            I: Lo,
            j: No,
            L: zo,
            m: Ao,
            M: To,
            p: Ro,
            S: qo,
            U: vo,
            w: po,
            W: mo,
            x: _o,
            X: bo,
            y: So,
            Y: wo,
            Z: ko,
            '%': Po
          }, Qs = /^\s*\d+/, nl = Zo.map({
            am: 0,
            pm: 1
          });
        ao.utc = Uo;
        var tl = Uo('%Y-%m-%dT%H:%M:%S.%LZ');
        ao.iso = Date.prototype.toISOString && +new Date('2000-01-01T00:00:00.000Z') ? jo : tl, jo.parse = function (n) {
          var t = new Date(n);
          return isNaN(t) ? null : t;
        }, jo.toString = tl.toString, Ls.second = io(function (n) {
          return new Ts(1000 * Math.floor(n / 1000));
        }, function (n, t) {
          n.setTime(n.getTime() + 1000 * Math.floor(t));
        }, function (n) {
          return n.getSeconds();
        }), Ls.seconds = Ls.second.range, Ls.seconds.utc = Ls.second.utc.range, Ls.minute = io(function (n) {
          return new Ts(60000 * Math.floor(n / 60000));
        }, function (n, t) {
          n.setTime(n.getTime() + 60000 * Math.floor(t));
        }, function (n) {
          return n.getMinutes();
        }), Ls.minutes = Ls.minute.range, Ls.minutes.utc = Ls.minute.utc.range, Ls.hour = io(function (n) {
          var t = n.getTimezoneOffset() / 60;
          return new Ts(3600000 * (Math.floor(n / 3600000 - t) + t));
        }, function (n, t) {
          n.setTime(n.getTime() + 3600000 * Math.floor(t));
        }, function (n) {
          return n.getHours();
        }), Ls.hours = Ls.hour.range, Ls.hours.utc = Ls.hour.utc.range, Ls.month = io(function (n) {
          return n = Ls.day(n), n.setDate(1), n;
        }, function (n, t) {
          n.setMonth(n.getMonth() + t);
        }, function (n) {
          return n.getMonth();
        }), Ls.months = Ls.month.range, Ls.months.utc = Ls.month.utc.range;
        var el = [
            1000,
            5000,
            15000,
            30000,
            60000,
            300000,
            900000,
            1800000,
            3600000,
            10800000,
            21600000,
            43200000,
            86400000,
            172800000,
            604800000,
            2592000000,
            7776000000,
            31536000000
          ], rl = [
            [
              Ls.second,
              1
            ],
            [
              Ls.second,
              5
            ],
            [
              Ls.second,
              15
            ],
            [
              Ls.second,
              30
            ],
            [
              Ls.minute,
              1
            ],
            [
              Ls.minute,
              5
            ],
            [
              Ls.minute,
              15
            ],
            [
              Ls.minute,
              30
            ],
            [
              Ls.hour,
              1
            ],
            [
              Ls.hour,
              3
            ],
            [
              Ls.hour,
              6
            ],
            [
              Ls.hour,
              12
            ],
            [
              Ls.day,
              1
            ],
            [
              Ls.day,
              2
            ],
            [
              Ls.week,
              1
            ],
            [
              Ls.month,
              1
            ],
            [
              Ls.month,
              3
            ],
            [
              Ls.year,
              1
            ]
          ], ul = [
            [
              ao('%Y'),
              Zt
            ],
            [
              ao('%B'),
              function (n) {
                return n.getMonth();
              }
            ],
            [
              ao('%b %d'),
              function (n) {
                return 1 != n.getDate();
              }
            ],
            [
              ao('%a %d'),
              function (n) {
                return n.getDay() && 1 != n.getDate();
              }
            ],
            [
              ao('%I %p'),
              function (n) {
                return n.getHours();
              }
            ],
            [
              ao('%I:%M'),
              function (n) {
                return n.getMinutes();
              }
            ],
            [
              ao(':%S'),
              function (n) {
                return n.getSeconds();
              }
            ],
            [
              ao('.%L'),
              function (n) {
                return n.getMilliseconds();
              }
            ]
          ], il = Oo(ul);
        rl.year = Ls.year, Ls.scale = function () {
          return Ho(Zo.scale.linear(), rl, il);
        };
        var ol = {
            range: function (n, t, e) {
              return Zo.range(+n, +t, e).map(Fo);
            }
          }, al = rl.map(function (n) {
            return [
              n[0].utc,
              n[1]
            ];
          }), cl = [
            [
              Uo('%Y'),
              Zt
            ],
            [
              Uo('%B'),
              function (n) {
                return n.getUTCMonth();
              }
            ],
            [
              Uo('%b %d'),
              function (n) {
                return 1 != n.getUTCDate();
              }
            ],
            [
              Uo('%a %d'),
              function (n) {
                return n.getUTCDay() && 1 != n.getUTCDate();
              }
            ],
            [
              Uo('%I %p'),
              function (n) {
                return n.getUTCHours();
              }
            ],
            [
              Uo('%I:%M'),
              function (n) {
                return n.getUTCMinutes();
              }
            ],
            [
              Uo(':%S'),
              function (n) {
                return n.getUTCSeconds();
              }
            ],
            [
              Uo('.%L'),
              function (n) {
                return n.getUTCMilliseconds();
              }
            ]
          ], sl = Oo(cl);
        return al.year = Ls.year.utc, Ls.scale.utc = function () {
          return Ho(Zo.scale.linear(), al, sl);
        }, Zo.text = dt(function (n) {
          return n.responseText;
        }), Zo.json = function (n, t) {
          return mt(n, 'application/json', Yo, t);
        }, Zo.html = function (n, t) {
          return mt(n, 'text/html', Io, t);
        }, Zo.xml = dt(function (n) {
          return n.responseXML;
        }), Zo;
      }();
      ;
      return {
        d3: function () {
          return d3;
        }
      };
    }
  ]);
}.call(this));
(function () {
  angular.module('wwwsplit-timer.chart', ['d3']).directive('lineChart', [
    'd3Service',
    function (d3Service) {
      return {
        scope: { data: '=' },
        restrict: 'C',
        link: function ($scope, elem, attrs) {
          var d3;
          d3 = d3Service.d3();
          return d3.select(elem[0]).append('svg');
        }
      };
    }
  ]);
}.call(this));
(function () {
  angular.module('wwwsplit-timer', ['wwwsplit-timer.templates']).directive('timer', [
    '$timeout',
    function ($timeout) {
      return {
        restrict: 'C',
        scope: {
          current_run: '=ngModel',
          running: '=isRunning'
        },
        templateUrl: 'timer.tmpl',
        link: function ($scope, elem, attrs) {
          var calculate_split_statistics, find_elapsed_time, reset_splits, update_time_on_timeout;
          $scope.running = false;
          $scope.current_run_chart_series = { data: [] };
          calculate_split_statistics = function (split, index) {
            var i, _i, _ref;
            if (split.split_time == null) {
              split.live_data.relative_time = null;
              split.live_data.segment_diff = null;
              if (index === 0) {
                split.live_data.live_segment_time = split.live_data.live_time;
                split.live_data.segment_diff = null;
              } else {
                split.live_data.live_segment_time = split.live_data.live_time - $scope.current_run.splits[index - 1].live_data.live_time;
              }
            } else {
              split.live_data.relative_time = split.live_data.live_time - split.split_time;
              if (index === 0) {
                split.live_data.live_segment_time = split.live_data.live_time;
                split.live_data.segment_diff = split.live_data.relative_time;
              } else {
                split.live_data.live_segment_time = split.live_data.live_time - $scope.current_run.splits[index - 1].live_data.live_time;
                for (i = _i = _ref = index - 1; _ref <= 0 ? _i <= 0 : _i >= 0; i = _ref <= 0 ? ++_i : --_i) {
                  if ($scope.current_run.splits[i].live_data.relative_time != null) {
                    split.live_data.segment_diff = split.live_data.relative_time - $scope.current_run.splits[i].live_data.relative_time;
                    break;
                  }
                }
              }
            }
            if (split.best_segment == null || split.best_segment > split.live_data.live_segment_time) {
              return split.live_data.best_segment = true;
            } else {
              return split.live_data.best_segment = false;
            }
          };
          find_elapsed_time = function () {
            return $scope.elapsed_time = Date.now() - $scope.start_time;
          };
          update_time_on_timeout = function () {
            find_elapsed_time();
            return $scope.timer_timeout_promise = $timeout(update_time_on_timeout, 25);
          };
          $scope.start_timer = function () {
            var split, _i, _len, _ref;
            if (!$scope.current_run.splits.length) {
              return;
            }
            _ref = $scope.current_run.splits;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              split = _ref[_i];
              split.live_data = {};
            }
            $scope.current_split = $scope.current_run.splits[0];
            $timeout.cancel($scope.timer_timeout_promise);
            $scope.start_time = Date.now();
            $scope.current_run_chart_series.data = [];
            $scope.timer_timeout_promise = $timeout(update_time_on_timeout, 25);
            $scope.current_run.attempts++;
            $scope.running = true;
            $scope.is_finished = false;
            return $scope.is_editing = false;
          };
          reset_splits = function () {
            var split, _i, _len, _ref, _results;
            if ($scope.current_run.splits) {
              _ref = $scope.current_run.splits;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                split = _ref[_i];
                _results.push(split.live_data = {});
              }
              return _results;
            }
          };
          $scope.reset_timer = function () {
            $timeout.cancel($scope.timer_timeout_promise);
            reset_splits();
            $scope.current_split = null;
            if ($scope.current_run_chart_series) {
              $scope.current_run_chart_series.data = [];
            }
            $scope.running = false;
            $scope.is_finished = false;
            $scope.elapsed_time = null;
            return $scope.start_time = null;
          };
          $scope.poke_chart_options = function () {
            return $scope.current_run_chart_options.poke = !$scope.current_run_chart_options.poke;
          };
          $scope.split = function () {
            var data_point_id;
            $scope.current_split.live_data = {};
            $scope.current_split.live_data.live_time = $scope.elapsed_time;
            calculate_split_statistics($scope.current_split, $scope.current_run.splits.indexOf($scope.current_split));
            if ($scope.current_split.split_time != null) {
              data_point_id = (Math.random() * 1000000).toString(16);
              $scope.current_run_chart_series.data.push({
                x: $scope.current_split.live_data.live_time / 1000,
                y: $scope.current_split.live_data.relative_time / 1000,
                name: $scope.current_split.title,
                id: data_point_id
              });
              $scope.current_split.live_data.data_point_id = data_point_id;
            }
            if ($scope.current_split === $scope.current_run.splits[$scope.current_run.splits.length - 1]) {
              $scope.finish_run();
              return;
            }
            return $scope.current_split = $scope.current_run.splits[$scope.current_run.splits.indexOf($scope.current_split) + 1];
          };
          $scope.unsplit = function () {
            $scope.current_split = $scope.current_run.splits[$scope.current_run.splits.indexOf($scope.current_split) - 1];
            $scope.current_split.live_data = {};
            if ($scope.current_split.split_time != null) {
              return $scope.current_run_chart_series.data.pop();
            }
          };
          return $scope.finish_run = function () {
            $timeout.cancel($scope.timer_timeout_promise);
            $scope.current_split = null;
            $scope.running = false;
            return $scope.is_finished = true;
          };
        }
      };
    }
  ]).filter('milliseconds_to_HMS', function () {
    return function (milliseconds) {
      var h, is_negative, m, s, seconds;
      if (milliseconds == null) {
        return '-';
      }
      if (!milliseconds) {
        milliseconds = 0;
      }
      if (milliseconds < 0) {
        is_negative = true;
        milliseconds *= -1;
      }
      seconds = milliseconds / 1000;
      h = Math.floor(seconds / 3600);
      m = Math.floor(seconds % 3600 / 60);
      s = (seconds % 3600 % 60).toFixed(2);
      return (is_negative ? '-' : '') + (h > 0 ? h + ':' : '') + (m > 0 || h > 0 ? (h > 0 && m < 10 ? '0' : '') + m + ':' : '0:') + (s < 10 ? '0' : '') + s;
    };
  });
}.call(this));
angular.module('wwwsplit-timer.templates', ['timer.tmpl']), angular.module('timer.tmpl', []).run([
  '$templateCache',
  function (a) {
    a.put('timer.tmpl', '<div class="ng-scope" id="control_nav">\n  <button class="control" id="start" ng-click="start_timer()" ng-disabled="running || is_editing">\n    <i class="icon-play icon-2x icon-white"></i>\n  </button>\n  <button disabled="disabled" class="control" id="reset" ng-click="reset_timer()" ng-disabled="!(running || is_finished)">\n    <i class="icon-refresh icon-2x icon-white"></i>\n  </button>\n  <button disabled="disabled" class="control" id="split" ng-click="split()" ng-disabled="!running">\n    <i class="icon-forward icon-2x icon-white"></i>\n  </button>\n  <button disabled="disabled" class="control" id="unsplit" ng-click="unsplit()" ng-disabled="!running || current_split == current_run.splits[0]">\n    <i class="icon-backward icon-2x icon-white"></i>\n  </button>\n  <button style="display: none;" class="control" id="cancel_edit" ng-click="cancel_edit()" ng-disabled="running || run_editor_form.$invalid" ng-show="is_editing">\n    <i class="icon-ban-circle icon-2x icon-white"></i>\n  </button>\n</div>\n\n<div id=\'current_run\'>\n  <table class=\'table\' id=\'current_run_splits\' ng-class=\'{"table-hover": !running}\'>\n    <tr id=\'current_run_title\'>\n      <th colspan=\'2\'>\n        <h1>\n          {{current_run.title}} #{{current_run.attempts}}\n        </h1>\n        <h4 id=\'current_run_game_title\'>\n          <a ng-href=\'#/games/{{current_run.game.id}}\'>\n            {{current_run.game.title}}\n          </a>\n        </h4>\n      </th>\n    </tr>\n    <tr class=\'current_run_split\' ng-class=\'{active_split: split == current_split}\' ng-repeat=\'split in current_run.splits\'>\n      <td class=\'split_title\'>\n      {{split.title}}\n      </td>\n      <td class=\'split_time\' ng-class=\'{ahead: split.live_data.live_time < split.split_time, behind: split.live_data.live_time > split.split_time,\n      gained_time: split.live_data.segment_diff < 0, lost_time: split.live_data.segment_diff > 0 ,\n      unknown: split.live_data.live_time && !split.live_data.relative_time,\n      best: split.live_data.best_segment}\'>\n        <span>{{split.live_data.relative_time || split.live_data.live_time || split.split_time | milliseconds_to_HMS}}</span>\n      </td>\n    </tr>\n  </table>\n</div>\n\n<div class=\'text-right\' id=\'clock\'>\n  <h1 class=\'clock\'>\n    {{(elapsed_time | milliseconds_to_HMS) || \'\'}}\n  </h1>\n</div>\n\n' + '<div class=\'highchart\' id=\'current_run_chart_data\' ng-model=\'current_run_chart_series\' ng-options=\'current_run_chart_options\'></div>');
  }
]), function () {
  angular.module('d3', []).factory('d3Service', [
    '$document',
    '$q',
    '$rootScope',
    function (a, b, c) {
      var d, e, f, g;
      return d = b.defer(), e = function () {
        return c.$apply(function () {
          return d.resolve(window.d3);
        });
      }, g = a[0].createElement('script'), g.type = 'text/javascript', g.async = !0, g.onreadystatechange = function () {
        return 'complete' === this.readyState ? e() : void 0;
      }, g.onload = e, g.src = 'http://d3js.org/d3.v3.min.js', f = a[0].getElementsByTagName('body')[0], f.appendChild(g), {
        d3: function () {
          return d.promise;
        }
      };
    }
  ]);
}.call(this), function () {
  angular.module('wwwsplit-timer.chart', ['d3']).directive('lineChart', [
    'd3Service',
    function (a) {
      return {
        scope: { data: '=' },
        restrict: 'C',
        link: function (b, c) {
          return a.d3().then(function (a) {
            return console.log('resolved!~'), a.select(c[0]).append('svg');
          });
        }
      };
    }
  ]);
}.call(this), function () {
  angular.module('wwwsplit-timer', ['wwwsplit-timer.templates']).directive('timer', [
    '$timeout',
    function (a) {
      return {
        restrict: 'C',
        scope: {
          current_run: '=ngModel',
          running: '=isRunning'
        },
        templateUrl: 'timer.tmpl',
        link: function (b) {
          var c, d, e, f;
          return b.running = !1, b.current_run_chart_series = { data: [] }, c = function (a, c) {
            var d, e, f;
            if (null == a.split_time)
              a.live_data.relative_time = null, a.live_data.segment_diff = null, 0 === c ? (a.live_data.live_segment_time = a.live_data.live_time, a.live_data.segment_diff = null) : a.live_data.live_segment_time = a.live_data.live_time - b.current_run.splits[c - 1].live_data.live_time;
            else if (a.live_data.relative_time = a.live_data.live_time - a.split_time, 0 === c)
              a.live_data.live_segment_time = a.live_data.live_time, a.live_data.segment_diff = a.live_data.relative_time;
            else
              for (a.live_data.live_segment_time = a.live_data.live_time - b.current_run.splits[c - 1].live_data.live_time, d = e = f = c - 1; 0 >= f ? 0 >= e : e >= 0; d = 0 >= f ? ++e : --e)
                if (null != b.current_run.splits[d].live_data.relative_time) {
                  a.live_data.segment_diff = a.live_data.relative_time - b.current_run.splits[d].live_data.relative_time;
                  break;
                }
            return a.live_data.best_segment = null == a.best_segment || a.best_segment > a.live_data.live_segment_time ? !0 : !1;
          }, d = function () {
            return b.elapsed_time = Date.now() - b.start_time;
          }, f = function () {
            return d(), b.timer_timeout_promise = a(f, 25);
          }, b.start_timer = function () {
            var c, d, e, g;
            if (b.current_run.splits.length) {
              for (g = b.current_run.splits, d = 0, e = g.length; e > d; d++)
                c = g[d], c.live_data = {};
              return b.current_split = b.current_run.splits[0], a.cancel(b.timer_timeout_promise), b.start_time = Date.now(), b.current_run_chart_series.data = [], b.timer_timeout_promise = a(f, 25), b.current_run.attempts++, b.running = !0, b.is_finished = !1, b.is_editing = !1;
            }
          }, e = function () {
            var a, c, d, e, f;
            if (b.current_run.splits) {
              for (e = b.current_run.splits, f = [], c = 0, d = e.length; d > c; c++)
                a = e[c], f.push(a.live_data = {});
              return f;
            }
          }, b.reset_timer = function () {
            return a.cancel(b.timer_timeout_promise), e(), b.current_split = null, b.current_run_chart_series && (b.current_run_chart_series.data = []), b.running = !1, b.is_finished = !1, b.elapsed_time = null, b.start_time = null;
          }, b.poke_chart_options = function () {
            return b.current_run_chart_options.poke = !b.current_run_chart_options.poke;
          }, b.split = function () {
            var a;
            return b.current_split.live_data = {}, b.current_split.live_data.live_time = b.elapsed_time, c(b.current_split, b.current_run.splits.indexOf(b.current_split)), null != b.current_split.split_time && (a = (1000000 * Math.random()).toString(16), b.current_run_chart_series.data.push({
              x: b.current_split.live_data.live_time / 1000,
              y: b.current_split.live_data.relative_time / 1000,
              name: b.current_split.title,
              id: a
            }), b.current_split.live_data.data_point_id = a), b.current_split === b.current_run.splits[b.current_run.splits.length - 1] ? (b.finish_run(), void 0) : b.current_split = b.current_run.splits[b.current_run.splits.indexOf(b.current_split) + 1];
          }, b.unsplit = function () {
            return b.current_split = b.current_run.splits[b.current_run.splits.indexOf(b.current_split) - 1], b.current_split.live_data = {}, null != b.current_split.split_time ? b.current_run_chart_series.data.pop() : void 0;
          }, b.finish_run = function () {
            return a.cancel(b.timer_timeout_promise), b.current_split = null, b.running = !1, b.is_finished = !0;
          };
        }
      };
    }
  ]).filter('milliseconds_to_HMS', function () {
    return function (a) {
      var b, c, d, e, f;
      return null == a ? '-' : (a || (a = 0), 0 > a && (c = !0, a *= -1), f = a / 1000, b = Math.floor(f / 3600), d = Math.floor(f % 3600 / 60), e = (f % 3600 % 60).toFixed(2), (c ? '-' : '') + (b > 0 ? b + ':' : '') + (d > 0 || b > 0 ? (b > 0 && 10 > d ? '0' : '') + d + ':' : '0:') + (10 > e ? '0' : '') + e);
    };
  });
}.call(this), angular.module('wwwsplit-timer.templates', ['timer.tmpl']), angular.module('timer.tmpl', []).run([
  '$templateCache',
  function (a) {
    a.put('timer.tmpl', '<div class="ng-scope" id="control_nav">\n  <button class="control" id="start" ng-click="start_timer()" ng-disabled="running || is_editing">\n    <i class="icon-play icon-2x icon-white"></i>\n  </button>\n  <button disabled="disabled" class="control" id="reset" ng-click="reset_timer()" ng-disabled="!(running || is_finished)">\n    <i class="icon-refresh icon-2x icon-white"></i>\n  </button>\n  <button disabled="disabled" class="control" id="split" ng-click="split()" ng-disabled="!running">\n    <i class="icon-forward icon-2x icon-white"></i>\n  </button>\n  <button disabled="disabled" class="control" id="unsplit" ng-click="unsplit()" ng-disabled="!running || current_split == current_run.splits[0]">\n    <i class="icon-backward icon-2x icon-white"></i>\n  </button>\n  <button style="display: none;" class="control" id="cancel_edit" ng-click="cancel_edit()" ng-disabled="running || run_editor_form.$invalid" ng-show="is_editing">\n    <i class="icon-ban-circle icon-2x icon-white"></i>\n  </button>\n</div>\n\n<div id=\'current_run\'>\n  <table class=\'table\' id=\'current_run_splits\' ng-class=\'{"table-hover": !running}\'>\n    <tr id=\'current_run_title\'>\n      <th colspan=\'2\'>\n        <h1>\n          {{current_run.title}} #{{current_run.attempts}}\n        </h1>\n        <h4 id=\'current_run_game_title\'>\n          <a ng-href=\'#/games/{{current_run.game.id}}\'>\n            {{current_run.game.title}}\n          </a>\n        </h4>\n      </th>\n    </tr>\n    <tr class=\'current_run_split\' ng-class=\'{active_split: split == current_split}\' ng-repeat=\'split in current_run.splits\'>\n      <td class=\'split_title\'>\n      {{split.title}}\n      </td>\n      <td class=\'split_time\' ng-class=\'{ahead: split.live_data.live_time < split.split_time, behind: split.live_data.live_time > split.split_time,\n      gained_time: split.live_data.segment_diff < 0, lost_time: split.live_data.segment_diff > 0 ,\n      unknown: split.live_data.live_time && !split.live_data.relative_time,\n      best: split.live_data.best_segment}\'>\n        <span>{{split.live_data.relative_time || split.live_data.live_time || split.split_time | milliseconds_to_HMS}}</span>\n      </td>\n    </tr>\n  </table>\n</div>\n\n<div class=\'text-right\' id=\'clock\'>\n  <h1 class=\'clock\'>\n    {{(elapsed_time | milliseconds_to_HMS) || \'\'}}\n  </h1>\n</div>\n\n' + '<div class=\'highchart\' id=\'current_run_chart_data\' ng-model=\'current_run_chart_series\' ng-options=\'current_run_chart_options\'></div>');
  }
]), function () {
  angular.module('d3', []).factory('d3Service', [
    '$document',
    '$q',
    '$rootScope',
    function (a, b, c) {
      var d, e, f, g;
      return d = b.defer(), e = function () {
        return c.$apply(function () {
          return d.resolve(window.d3);
        });
      }, g = a[0].createElement('script'), g.type = 'text/javascript', g.onreadystatechange = function () {
        return 'complete' === this.readyState ? e() : void 0;
      }, g.onload = e, g.src = 'http://d3js.org/d3.v3.min.js', f = a[0].getElementsByTagName('body')[0], f.appendChild(g), {
        d3: function () {
          return d.promise;
        }
      };
    }
  ]);
}.call(this), function () {
  angular.module('wwwsplit-timer.chart', ['d3']).directive('lineChart', [
    'd3Service',
    function (a) {
      return {
        scope: { data: '=' },
        restrict: 'C',
        link: function (b, c) {
          return a.d3().then(function (a) {
            return console.log('resolved!~'), a.select(c[0]).append('svg');
          });
        }
      };
    }
  ]);
}.call(this), function () {
  angular.module('wwwsplit-timer', ['wwwsplit-timer.templates']).directive('timer', [
    '$timeout',
    function (a) {
      return {
        restrict: 'C',
        scope: {
          current_run: '=ngModel',
          running: '=isRunning'
        },
        templateUrl: 'timer.tmpl',
        link: function (b) {
          var c, d, e, f;
          return b.running = !1, b.current_run_chart_series = { data: [] }, c = function (a, c) {
            var d, e, f;
            if (null == a.split_time)
              a.live_data.relative_time = null, a.live_data.segment_diff = null, 0 === c ? (a.live_data.live_segment_time = a.live_data.live_time, a.live_data.segment_diff = null) : a.live_data.live_segment_time = a.live_data.live_time - b.current_run.splits[c - 1].live_data.live_time;
            else if (a.live_data.relative_time = a.live_data.live_time - a.split_time, 0 === c)
              a.live_data.live_segment_time = a.live_data.live_time, a.live_data.segment_diff = a.live_data.relative_time;
            else
              for (a.live_data.live_segment_time = a.live_data.live_time - b.current_run.splits[c - 1].live_data.live_time, d = e = f = c - 1; 0 >= f ? 0 >= e : e >= 0; d = 0 >= f ? ++e : --e)
                if (null != b.current_run.splits[d].live_data.relative_time) {
                  a.live_data.segment_diff = a.live_data.relative_time - b.current_run.splits[d].live_data.relative_time;
                  break;
                }
            return a.live_data.best_segment = null == a.best_segment || a.best_segment > a.live_data.live_segment_time ? !0 : !1;
          }, d = function () {
            return b.elapsed_time = Date.now() - b.start_time;
          }, f = function () {
            return d(), b.timer_timeout_promise = a(f, 25);
          }, b.start_timer = function () {
            var c, d, e, g;
            if (b.current_run.splits.length) {
              for (g = b.current_run.splits, d = 0, e = g.length; e > d; d++)
                c = g[d], c.live_data = {};
              return b.current_split = b.current_run.splits[0], a.cancel(b.timer_timeout_promise), b.start_time = Date.now(), b.current_run_chart_series.data = [], b.timer_timeout_promise = a(f, 25), b.current_run.attempts++, b.running = !0, b.is_finished = !1, b.is_editing = !1;
            }
          }, e = function () {
            var a, c, d, e, f;
            if (b.current_run.splits) {
              for (e = b.current_run.splits, f = [], c = 0, d = e.length; d > c; c++)
                a = e[c], f.push(a.live_data = {});
              return f;
            }
          }, b.reset_timer = function () {
            return a.cancel(b.timer_timeout_promise), e(), b.current_split = null, b.current_run_chart_series && (b.current_run_chart_series.data = []), b.running = !1, b.is_finished = !1, b.elapsed_time = null, b.start_time = null;
          }, b.poke_chart_options = function () {
            return b.current_run_chart_options.poke = !b.current_run_chart_options.poke;
          }, b.split = function () {
            var a;
            return b.current_split.live_data = {}, b.current_split.live_data.live_time = b.elapsed_time, c(b.current_split, b.current_run.splits.indexOf(b.current_split)), null != b.current_split.split_time && (a = (1000000 * Math.random()).toString(16), b.current_run_chart_series.data.push({
              x: b.current_split.live_data.live_time / 1000,
              y: b.current_split.live_data.relative_time / 1000,
              name: b.current_split.title,
              id: a
            }), b.current_split.live_data.data_point_id = a), b.current_split === b.current_run.splits[b.current_run.splits.length - 1] ? (b.finish_run(), void 0) : b.current_split = b.current_run.splits[b.current_run.splits.indexOf(b.current_split) + 1];
          }, b.unsplit = function () {
            return b.current_split = b.current_run.splits[b.current_run.splits.indexOf(b.current_split) - 1], b.current_split.live_data = {}, null != b.current_split.split_time ? b.current_run_chart_series.data.pop() : void 0;
          }, b.finish_run = function () {
            return a.cancel(b.timer_timeout_promise), b.current_split = null, b.running = !1, b.is_finished = !0;
          };
        }
      };
    }
  ]).filter('milliseconds_to_HMS', function () {
    return function (a) {
      var b, c, d, e, f;
      return null == a ? '-' : (a || (a = 0), 0 > a && (c = !0, a *= -1), f = a / 1000, b = Math.floor(f / 3600), d = Math.floor(f % 3600 / 60), e = (f % 3600 % 60).toFixed(2), (c ? '-' : '') + (b > 0 ? b + ':' : '') + (d > 0 || b > 0 ? (b > 0 && 10 > d ? '0' : '') + d + ':' : '0:') + (10 > e ? '0' : '') + e);
    };
  });
}.call(this);