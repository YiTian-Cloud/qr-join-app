/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: "next/core-web-vitals",
  ignorePatterns: [
    "Next.js/**",  // ignore the old project folder
    "types/**"     // ignore top-level generated types if any
  ],
  overrides: [
    {
      files: ["**/*.d.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-empty-object-type": "off",
        "@typescript-eslint/no-unsafe-function-type": "off",
        "@typescript-eslint/no-wrapper-object-types": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-unused-vars": "off"
      }
    }
  ]
};
