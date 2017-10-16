var express = require('express');
var router = express.Router();
var movies = [
    { id: 101, name: "Fight Club", year: 1999, rating: 8.1 },
    { id: 102, name: "Inception", year: 2010, rating: 8.7 },
    { id: 103, name: "The Dark Knight", year: 2008, rating: 9 },
    { id: 104, name: "12 Angry Men", year: 1957, rating: 8.9 }
];
//Routes will go here
router.get('/', function (req, res) {
    res.json(movies);
});
router.post('/', function (req, res) {
    if (!req.body.name ||
        !req.body.year.toString().match(/^[0-9]{4}$/g) ||
        !req.body.rating.toString().match(/^[0-9]\.[0-9]$/)) {
        res.status(400);
        res.json({ message: "Bad Request" + req.body.name });
    }
    else {
        var newId = movies[movies.length - 1].id + 1;
        movies.push({
            id: newId,
            name: req.body.name,
            year: req.body.year,
            rating: req.body.rating
        });
        res.status(200);
        res.json({ message: "Successfully Created Post", location: "/movies/" + newId });
    }
});
router.get('/:id([0-9]{3,})', function (req, res) {
    var movieObj = movies.filter(function (item) {
        if (item.id == req.params.id) {
            return true;
        }
        else {
            return false;
        }
    });
    if (movieObj.length === 1) {
        res.json(movieObj[0]);
    }
    else {
        res.send("Not Found");
    }
});

router.put('/', function (req, res) {
    if (!req.body.name ||
        !req.body.year.toString().match(/^[0-9]{4}$/g) ||
        !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g) ||
        !req.params.id.toString().match(/^[0-9]{3,}$/g)) {
        res.status(400);
        res.json({ message: "Bad Request" });
    }
    else {
        var movieObjId = movies.map(function (item) {
            return item.id;
        }).indexOf(parseInt(req.params.id));
        if (movieObjId === -1) {
            movies.push({
                id: req.params.id,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            });
            res.json({ message: "New movie Added", location: '/movies/' + req.params.id });
        }
        else {
            movies[movieObjId] = {
                id: req.params.id,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            };
          res.json({ message: "New movie Updated", location: '/movies/' + req.params.id });
     }
    }

});
router.delete('/:id', function (req, res) {
    console.log("abdc");
    console.log("abc" +req.params.id);
    var movieIndex = movies.map(function (item) {
        return item.id;
    }).indexOf(parseInt(req.params.id));
    if (movieIndex == -1) {
        res.send({ message: "Not Found" });
    }
    else {
        movies.slice(1, movieIndex);
        res.send({ message: "Successfully Deleted", id: req.params.id });
    }

});

module.exports = router;