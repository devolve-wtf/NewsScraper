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
}