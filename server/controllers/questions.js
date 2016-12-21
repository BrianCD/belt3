

var mongoose = require("mongoose");
var Question = mongoose.model("question");

module.exports = {

  index: function (req, res){
    Question.find({}, function (err, items) {
      if (err) {return;}
      res.json({ items: items });
    });
  },

  create: function (req, res){
    var item = new Question({
      question: req.body.question,
      description: req.body.details,
      answers: []
    });
    item.save(function (err) {
      if (err) {
        console.log(err);
        res.json({ errors: err });
      } else {
        console.log("Successfully Saved:", item);
        res.json({/*nothing needed*/});
      }
    });
  },
  show: function (req, res){
    Question.findOne({_id:req.params.id}, function(err, question) {
      if (err){
        console.log(err);
        res.json({ err: err });
      } else {
        res.json({ question: question });
      }
    });
  },
  answer: function (req, res){
    Question.findOne({_id:req.params.id}, function(err, question) {
      if (err){
        console.log(err);
        res.json({ err: err });
      } else {
        question.answers.push({
          author: req.body.author,
          answer: req.body.answer,
          details: req.body.details
        });
        question.save(function(err){
          if (err) {
            console.log(err);
            res.json({ errors: err });
          } else {
            res.json({/*nothing needed*/});
          }
        });
      }
    });
  },
  like: function(req, res){
    Question.findOne({_id:req.params.qID}, function(err, question) {
      if (err){
        console.log(err);
        res.json({ errors: err });
      } else {
        var answer = question.answers.id(req.params.aID);
        answer.likes++;
        question.save(function(err){
          if (err) {
            console.log(err);
            res.json({ errors: err });
          } else {
            res.json({/*nothing needed*/});
          }
        });
      }
    });
  }

};
