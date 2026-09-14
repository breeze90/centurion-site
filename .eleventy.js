module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/static": "." });

  return {
    dir: {
      input: "src",
      output: "site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
