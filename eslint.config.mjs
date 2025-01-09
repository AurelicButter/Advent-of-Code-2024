import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/*.json", "**/build/", "**/node_modules"]
}, ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
), {
    plugins: {
        "@typescript-eslint": typescriptEslint
    },

    languageOptions: {
        globals: {
            ...globals.commonjs,
            ...globals.node
        },

        parser: tsParser,
        ecmaVersion: 6,
        sourceType: "module"
    },

    rules: {
        "no-extra-parens": "error",
        "no-else-return": "error",
        "comma-dangle": "warn",
        "no-var": "error",
        camelcase: "warn"
    }
}];