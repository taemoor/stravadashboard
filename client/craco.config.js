module.exports = {
  webpack: {
    module: {
      rules: [
        {
          test: /react-spring/,
          sideEffects: true
        }
      ]
    }
  }
};
