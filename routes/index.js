const axios = require('axios');
const cheerio = require('cheerio');
const models = require('../models');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('index', {
            pageTitle: 'News Scraper',
            isHome: true
        });
    });

    app.get('/about', (req, res) => {
        res.render('about', {
            pageTitle: 'About News Scraper',
            isAbout: true
        });
    });

    app.get('/scrape', (req, res) => {
        axios.get('http://www.echojs.com/').then(response => {
            let $ = cheerio.load(response.data);

            $('article h2').each(function(i, element) {
                let result = {};

                result.title = $(this).children('a').text();
                result.link = $(this).children('a').attr('href');

                models.Article.create(result).then(data => {
                    res.json(data);
                }).catch(error => {
                    res.json(error);
                });
            });
        });
    });

    app.get('/articles', (req, res) => {
        models.Article.find({}).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    })
}