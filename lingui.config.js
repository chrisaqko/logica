const { defineConfig } = require("@lingui/conf");

module.exports = defineConfig({
  sourceLocale: "es",
  locales: ["es", "en"],

  catalogs: [
    {
      path: "src/locales/{locale}/messages",
      include: ["src"],
    },
  ],

  extractors: [
    {
      match: ["**/*.{js,jsx,ts,tsx}"],
      extractor: "@lingui/babel-plugin-lingui-macro",
    },
  ],
});