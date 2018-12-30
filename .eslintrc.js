module.exports = {
    env: {
        es6: true,
        node: true
    },
    extends: ["eslint:recommended", "prettier"],
    parserOptions: {
        ecmaVersion: 2018
    },
    rules: {
        indent: ["error", 4],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "single"],
        semi: ["error", "always"],
        "no-console": "off",

        "prettier/prettier": [
            "error",
            {
                trailingComma: "es5",
                singleQuote: true,
                printWidth: 120
            }
        ]
    }

};
