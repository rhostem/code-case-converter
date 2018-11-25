const keyProxy = new Proxy(
  {},
  {
    get(_target, propKey, _receiver) {
      return propKey
    },
  }
)

// const {foo, bar, baz} = keyProxy;

export default keyProxy
