function n(n, t) {
  return (n * Math.pow(10, -t)).toFixed(t);
}
const t = ['currentBalance', 'multiplier'],
  e = () => {},
  i = () => {
    let i,
      r,
      o,
      u = !1;
    function a({ detail: t }) {
      if (!u) return;
      const { amount: e, assetScale: a } = t,
        c = (function ({
          assetScale: t,
          amount: e,
          currentBalance: i,
          multiplier: r,
        }) {
          return (function ({ currentBalance: n, amount: t, multiplier: e }) {
            return n + t * e;
          })({ currentBalance: i, amount: Number(n(e, t)), multiplier: r });
        })({ assetScale: a, amount: e, currentBalance: i, multiplier: r });
      !(function (n) {
        i = n;
      })(c),
        o(c);
    }
    function c() {
      (u = !0),
        document.monetization.addEventListener('monetizationprogress', a);
    }
    return {
      init: function (n) {
        try {
          if (!document.monetization)
            throw new Error('Monetization not initialized');
          ((n) => {
            for (const e of t)
              if (null == n[e])
                throw new Error(`${e} must be provided when initializing!`);
          })(n),
            (i = n.currentBalance),
            (r = n.multiplier),
            (o = n.onTransaction || e),
            c();
        } catch (n) {
          throw new Error(`Something went wrong: ${n}`);
        }
      },
      getCurrentBalance: function () {
        return i;
      },
      startMonetization: c,
      stopMonetization: function () {
        (u = !1),
          document.monetization.removeEventListener('monetizationprogress', a),
          (i = null),
          (r = null),
          (o = null);
      },
      isActive: function () {
        return u;
      },
    };
  };
export { i as default };
//# sourceMappingURL=index.modern.js.map
