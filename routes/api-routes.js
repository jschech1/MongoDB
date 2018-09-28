var request = require("request");
var cheerio = require("cheerio");
var db = require("../models");

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



}