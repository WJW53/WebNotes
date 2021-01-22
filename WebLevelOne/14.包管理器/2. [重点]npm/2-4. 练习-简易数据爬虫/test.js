//这个文件跟getMovies.js内容其实是一致的,只是我练习用的

const axios = require("axios");
const cheerio = require("cheerio");


async function getMovieHtml() {
    const resp = await axios.get("https://movie.douban.com/chart");
    // const body = resp.data;

    // console.log(body);
    // console.log(typeof body);
    return resp.data;
}

// async function test() {
//     const html = await getMovieHtml();
//     console.log(html);
// }


async function getMoviesData() {
    const html = await getMovieHtml();
    const $ = cheerio.load(html);
    // console.log($);

    var trs = $("tr.item");
    // console.log(trs.length);
    var movies = [];

    for (let i = 0; i < trs.length; i++) {
        var tr = trs[i];//这个好像都是虚拟DOM对象,不是真正的dom对象
        // console.log(tr);
        //分析每个tr的数据,得到一部电影对象
        var m = getMovie($(tr));//$(tr)是真正的jq对象
        movies.push(m);
    }
    return movies;
}


function getMovie(tr) {
    var name = tr.find("div.pl2 a").text();
    name = name.replace(/\s/g, "");//去掉空白字符
    name = name.split("/")[0]; //拿到主名字
    // console.log(name);

    var imgSrc = tr.find("a.nbg img").attr("src");//拿到所有图片链接
    // console.log(imgSrc);

    var details = tr.find("div.pl2 p.pl").text();//拿到详情
    console.log(details);

    return {
        name,
        imgSrc,
        details
    }
}

// getMoviesData();

module.exports = getMoviesData;