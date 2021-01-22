const getMovies = require("./getMovies");
const getMoviesData = require("./getMovies");
const fs = require("fs");

// console.log(fs);


getMovies().then(movies => {
    var moviesJson = JSON.stringify(movies);

    fs.writeFile("testMovies.json", moviesJson, function () {
        console.log('简易爬取豆瓣电影榜成功');
    });
})
