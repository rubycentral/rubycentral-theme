const bs = require("browser-sync").create()
bs.watch("*.hbs").on("change", bs.reload)
bs.watch("assets/dist/*.js").on("change", bs.reload)
bs.watch("assets/dist/*.css").on("change", function() { bs.reload("*.css") })
bs.init({
  proxy: "http://localhost:2368",
  port: 2369,
  ui: { port: 2370 }
})
