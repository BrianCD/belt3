var express = require("express");
var app = express();

app.use(require("body-parser").json());

require("./server/config/mongoose.js");
var static_loader = require("utils");

var routes = require("./server/config/routes.js");
routes(app);

app.get("/partials/:partial", function(req, res){
  console.log("partial:"+req.params.partial);
  static_loader.serve_partial(res, req.params.partial);
});
app.set("views", __dirname + "\\client");
app.set("view engine", "ejs");
app.get("/", function(req, res){
  static_loader.serve_static(res, "index.html");
});


app.listen(8000, function () {
  console.log("Listening");
});
