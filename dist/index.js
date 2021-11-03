function t(t, n) {
  (null == n || n > t.length) && (n = t.length);
  for (var r = 0, e = new Array(n); r < n; r++) e[r] = t[r];
  return e;
}
var n = ['currentBalance', 'multiplier'],
  r = function () {};
module.exports = function () {
  var e,
    o,
    i,
    a = !1;
  function u(t) {
    var n = t.detail;
    if (a) {
      var r = (function (t) {
        var n,
          r,
          e,
          o = t.multiplier;
        return (
          (e = {
            currentBalance: t.currentBalance,
            amount: Number(
              ((n = t.amount),
              (r = t.assetScale),
              (n * Math.pow(10, -r)).toFixed(r))
            ),
            multiplier: o,
          }).currentBalance +
          e.amount * e.multiplier
        );
      })({
        assetScale: n.assetScale,
        amount: n.amount,
        currentBalance: e,
        multiplier: o,
      });
      !(function (t) {
        e = t;
      })(r),
        i(r);
    }
  }
  function l() {
    (a = !0), document.monetization.addEventListener('monetizationprogress', u);
  }
  return {
    init: function (a) {
      try {
        if (!document.monetization)
          throw new Error('Monetization not initialized');
        !(function (r) {
          for (
            var e,
              o = (function (n, r) {
                var e =
                  ('undefined' != typeof Symbol && n[Symbol.iterator]) ||
                  n['@@iterator'];
                if (e) return (e = e.call(n)).next.bind(e);
                if (
                  Array.isArray(n) ||
                  (e = (function (n, r) {
                    if (n) {
                      if ('string' == typeof n) return t(n, r);
                      var e = Object.prototype.toString.call(n).slice(8, -1);
                      return (
                        'Object' === e &&
                          n.constructor &&
                          (e = n.constructor.name),
                        'Map' === e || 'Set' === e
                          ? Array.from(n)
                          : 'Arguments' === e ||
                            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)
                          ? t(n, r)
                          : void 0
                      );
                    }
                  })(n))
                ) {
                  e && (n = e);
                  var o = 0;
                  return function () {
                    return o >= n.length
                      ? { done: !0 }
                      : { done: !1, value: n[o++] };
                  };
                }
                throw new TypeError(
                  'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                );
              })(n);
            !(e = o()).done;

          ) {
            var i = e.value;
            if (null == r[i])
              throw new Error(i + ' must be provided when initializing!');
          }
        })(a),
          (e = a.currentBalance),
          (o = a.multiplier),
          (i = a.onTransaction || r),
          l();
      } catch (t) {
        throw new Error('Something went wrong: ' + t);
      }
    },
    getCurrentBalance: function () {
      return e;
    },
    startMonetization: l,
    stopMonetization: function () {
      (a = !1),
        document.monetization.removeEventListener('monetizationprogress', u),
        (e = null),
        (o = null),
        (i = null);
    },
    isActive: function () {
      return a;
    },
  };
};
//# sourceMappingURL=index.js.map
