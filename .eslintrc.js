module.exports = {
  "env": {
      "browser": true,
      "commonjs": true,
      "es6": true,
      "jest/globals": true
  },
  "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
  ],
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
      "sourceType": "module",
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2018
  },
  "plugins": [
      "react",
      "jest"
  ],
  "rules": {
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error"
  },
  "settings": {
    "jest": {
      "version": 25
    },
    "react": {
      "version": "detect"
    }
  }
};