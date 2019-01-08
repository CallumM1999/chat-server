module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "parser": "babel-eslint",

    extends: ["eslint:recommended"],
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error", "always"
        ],
        "no-console": "off",
    }
};