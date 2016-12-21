var questions = require("../controllers/questions.js");

/*
    Routes File

    Tells app to listen for url-routes,
    passes work off to Controllers
*/

module.exports = function (app){
  app.get("/questions", questions.index);
  app.post("/questions", questions.create);
  app.get("/questions/:id", questions.show);
  app.post("/questions/:id/answer", questions.answer);
  app.post("/questions/:qID/:aID", questions.like);

};
