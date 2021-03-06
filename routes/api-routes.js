var request = require("request");
var cheerio = require("cheerio");
var db = require("../models");

var axios = require("axios");

module.exports = function (app) {
    app.get("/articles", function (req, res) {
        db.Article.find({})
            .then(function (dbArticle) {
                res.json(dbArticle)
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get("/scrape", function (req, res) {
        axios.get("https://www.washingtonpost.com")
            .then(function (response) {
                var $ = cheerio.load(response.data);

                $("div .headline").each(function (i, element) {
                    var result = {};

                    result.title = $(this).children("a").text();

                    result.link = $(this).children("a").attr("href");

                    result.summary = $(this).next().text();

                    if (result.title && result.link && result.summary) {
                        db.Article.create(result)
                            .then(function (dbArticle) {
                                console.log(dbArticle);
                            })
                            .catch(function (err) {
                                return res.json(err);
                            });
                    }
                });

                res.sendStatus(200);
            });
    });

    app.get("/articles", function(req, res){
        Article.find({}, function(error, doc){
            if (error){
                console.log(error);
            }
            else {
                res.json(doc);
            }
        })
    })

    app.get("/articles/:id", function(req, res){
        Article.findOne({"_id": req.params.id})
        .populate("note")
        .exec(function(error, doc){
            if (error){
                console.log(error);
            } else {
                res.json(doc);
            }
        });
    });

    app.post("/articles/save/:id", function(req, res){
        Article.findOneAndUpdate({ "_id": req.params.id }, { "saved": true})
        .exec(function(err, doc){
            if (err) {
                console.log(err);
            } else {
                res.send(doc);
            }
        })
    } )

}