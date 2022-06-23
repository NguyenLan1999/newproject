class BooksController {
    index(req, res) {
        res.render('books');
    }

    show(req, res) {
        res.send('New detail !!');
    }
}

module.exports = new BooksController();
