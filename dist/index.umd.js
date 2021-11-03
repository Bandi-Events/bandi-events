!(function (n, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define(t)
    : ((n || self).bandiEvents = t());
})(this, function () {
  function n(n, t) {
    (null == t || t > n.length) && (t = n.length);
    for (var e = 0, r = new Array(t); e < t; e++) r[e] = n[e];
    return r;
  }
  var t = 'monetizationprogress',
    e = ['currentBalance', 'multiplier'],
    r = function () {};
  return function () {
    var o,
      i,
      a,
      u = !1;
    function l(n) {
      var t = n.detail;
      if (u) {
        var e = (function (n) {
          var t,
            e,
            r,
            o = n.multiplier;
          return (
            (r = {
              currentBalance: n.currentBalance,
              amount: Number(
                ((t = n.amount),
                (e = n.assetScale),
                (t * Math.pow(10, -e)).toFixed(e))
              ),
              multiplier: o,
            }).currentBalance +
            r.amount * r.multiplier
          );
        })({
          assetScale: t.assetScale,
          amount: t.amount,
          currentBalance: o,
          multiplier: i,
        });
        !(function (n) {
          o = n;
        })(e),
          a(e);
      }
    }
    function c() {
      (u = !0), document.monetization.addEventListener(t, l);
    }
    return {
      init: function (t) {
        try {
          if (!document.monetization)
            throw new Error('Monetization not initialized');
          !(function (t) {
            for (
              var r,
                o = (function (t, e) {
                  var r =
                    ('undefined' != typeof Symbol && t[Symbol.iterator]) ||
                    t['@@iterator'];
                  if (r) return (r = r.call(t)).next.bind(r);
                  if (
                    Array.isArray(t) ||
                    (r = (function (t, e) {
                      if (t) {
                        if ('string' == typeof t) return n(t, e);
                        var r = Object.prototype.toString.call(t).slice(8, -1);
                        return (
                          'Object' === r &&
                            t.constructor &&
                            (r = t.constructor.name),
                          'Map' === r || 'Set' === r
                            ? Array.from(t)
                            : 'Arguments' === r ||
                              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                            ? n(t, e)
                            : void 0
                        );
                      }
                    })(t))
                  ) {
                    r && (t = r);
                    var o = 0;
                    return function () {
                      return o >= t.length
                        ? { done: !0 }
                        : { done: !1, value: t[o++] };
                    };
                  }
                  throw new TypeError(
                    'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                  );
                })(e);
              !(r = o()).done;

            ) {
              var i = r.value;
              if (null == t[i])
                throw new Error(i + ' must be provided when initializing!');
            }
          })(t),
            (o = t.currentBalance),
            (i = t.multiplier),
            (a = t.onTransaction || r),
            c();
        } catch (n) {
          throw new Error('Something went wrong: ' + n);
        }
      },
      getCurrentBalance: function () {
        return o;
      },
      startMonetization: c,
      stopMonetization: function () {
        (u = !1),
          document.monetization.removeEventListener(t, l),
          (o = null),
          (i = null),
          (a = null);
      },
      isActive: function () {
        return u;
      },
    };
  };
});
//# sourceMappingURL=index.umd.js.map
