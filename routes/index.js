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
        axios.get('https://www.suavecito.com/blogs/daily-digest').then(response => {
            let $ = cheerio.load(response.data);

            $('.wrap').each(function(i, element) {
                let result = {};

                let title = $(this).children('.the-post-title').children('a').children('h2').text();
                let link = $(this).children('.the-post-title').children('a').attr('href');
                let summary = $(this).children('.excerpt').children('.rte').children('p').text();

                console.log(summary);

                result.title = title;
                result.link = 'https://www.suavecito.com' + link;
                result.summary = summary;

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
            res.render('articles', {
                articles: data,
                pageTitle: 'Articles',
                isArticles: true
            });
        }).catch(error => {
            res.json(error);
        });
    })
}