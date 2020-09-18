//功能分析：要能够加载电影，显示到页面上
//1. 加载电影数据
//2. 把电影数据显示到页面

/**
 * 得到某一页的电影数组
 * @param {*} page 页码
 */
function getMovies(page, callback) { //callback: 回调函数
    //真实的开发中，这里应该使用ajax请求服务器拿取数据
    //模拟远程获取电影数据
    setTimeout(function () {
        if (page > 4) { //比方说，电影一共只有4页
            //模拟：没有电影数据
            var movies = [];
            //拿到电影数据后干嘛？
            callback(movies); //拿到电影数据后，我不直到干嘛？交给你来处理
        }
        else {
            //模拟：获取到了电影数据
            var movies = [
                { title: "扫毒2天地对决", cover: "https://p0.meituan.net/movie/8d3efdc44af04c3254fc9e4ad5334ae32660685.jpg@160w_220h_1e_1c", description: "毒品市场维持四分天下的格局已久，但自从地藏（古天乐 饰）与墨西哥大毒枭跨境合作扩展势力，再加上一连串黑吃黑的动作，毒界变得风声鹤唳。另一方面，因儿时亲眼目睹父亲被毒品所毁而嫉毒如仇的慈善家兼金融巨子余顺天（刘德华 饰），正悬赏一亿歼灭香港最大毒贩，此举在社会上引起轩然大波。警员林正风（苗侨伟 饰）本致力搜证拘捕地藏，毒贩却因巨额悬赏导致人身安全受威胁，他在执行保护毒贩的任务时深感无奈，但又被余顺天的出价所诱惑，陷入黑白正邪的心理挣扎。原来，余顺天和地藏有不可告人的同门关系，一场天地对决一触即发。" },
                { title: "千与千寻", cover: "https://p0.meituan.net/movie/30b20139e68c46d02e0893277d633b701292458.jpg@160w_220h_1e_1c", description: "千寻和爸爸妈妈一同驱车前往新家，在郊外的小路上不慎进入了神秘的隧道——他们去到了另外一个诡异世界—一个中世纪的小镇。远处飘来食物的香味，爸爸妈妈大快朵颐，孰料之后变成了猪！这时小镇上渐渐来了许多样子古怪、半透明的人。千寻仓皇逃出，一个叫小白的人救了他，喂了她阻止身体消失的药，并且告诉她怎样去找锅炉爷爷以及汤婆婆，而且必须获得一份工作才能不被魔法变成别的东西。千寻在小白的帮助下幸运地获得了一份在浴池打杂的工作。渐渐她不再被那些怪模怪样的人吓倒，并从小玲那儿知道了小白是凶恶的汤婆婆的弟子。一次，千寻发现小白被一群白色飞舞的纸人打伤，为了救受伤的小白，她用河神送给她的药丸驱出了小白身体内的封印以及守封印的小妖精，但小白还是没有醒过来。为了救小白，千寻又踏上了她的冒险之旅。" },
                { title: "最好的我们", cover: "https://p0.meituan.net/movie/b6e77d67efdc6ac89a52b956ead366ae5785152.jpg@160w_220h_1e_1c", description: "每个人的心里大概都藏着一个念念不忘的人。一个偶然被提及的名字，让女摄影师耿耿（何蓝逗 饰）内心掀起万千波澜，触动了回忆的开关，那个撩人心动的少年余淮（陈飞宇 饰）再度闯进她的思绪。那是记忆里最好的时光，“学渣”耿耿和“学霸”余淮成了同桌，还结识了简单（王初伊 饰）、贝塔（周楚濋 饰）、徐延亮（陈帅 饰）。校园里充盈着专属少男少女们的懵懂、青涩、怦然心动和勇敢，耿耿余淮也拥有了他们的约定。高考后，当耿耿满怀期待憧憬约定兑现之时，余淮却忽然消失不见了。七年后两人重逢，余淮当年未说出口的那句话、他不辞而别的秘密，耿耿能否得到解答？这段耿耿于怀的过往，让两人再度面临情感的抉择……" },
                { title: "命运之夜——天之杯II ：迷失之蝶", cover: "https://p0.meituan.net/movie/7b40e56e644cd04915e6e9cc09c1bdb1331242.jpg@160w_220h_1e_1c", description: "「圣杯战争」相隔10年再度在冬木市开战，随着被称作「圣杯战争」御三家之一的间桐家当主‧间桐脏砚（津嘉山正种 配音）的加入，战争变得错综复杂。不知名的黑影在城市内蠢蠢欲动，将御主及从者相继打倒。作为魔术师（御主）加入战争的卫宫士郎（杉山纪彰 配音）也再次受伤，并失去了他的从者Saber（川澄绫子 配音）。尽管如此，士郎为了守护间桐樱（下屋则子 配音），并没有退出战争，但担心着士郎的间桐樱却再次被魔术师的宿命所束缚…" },
                { title: "狮子王", cover: "https://p0.meituan.net/moviemachine/7b9b0725ab5feae642e1fbba9fbb90fe3702078.jpg@160w_220h_1e_1c", description: "小狮子王辛巴（唐纳德·格洛弗 配音）在众多热情的朋友的陪伴下，不但经历了生命中最光荣的时刻，也遭遇了最艰难的挑战，最后终于成为了森林之王，也在周而复始生生不息的自然中体会出生命的真义。非洲大草原上一轮红日冉冉升起，为高大的乞力马扎罗山披上层金色的光纱，所有的动物涌向了同一个地方——荣耀石，兴奋地等待着一个重大消息的宣布：它们的国王木法沙将迎来自己的新生儿。这个新生儿就是小狮子辛巴，它是木法沙的法定接班人、荣耀石未来的国王。" },
                { title: "蜘蛛侠：英雄远征", cover: "https://p0.meituan.net/moviemachine/5dac476535359b7bb951ff15d37a9d0b153821.jpg@160w_220h_1e_1c", description: "故事全面延续“复联4”，蜘蛛侠志承钢铁侠远征欧洲，独挑大梁对抗群敌！新角色“神秘客”穿越多元宇宙霸气登场！神盾局局长尼克·弗瑞回归领军！“漫威新铁三角”组合强势出击！全新蜘蛛战衣酷炫升级！史诗对决燃爆今夏突破想象极限！" },
            ];
            //拿到电影数据后干嘛？
            callback(movies); //拿到电影数据后，我不直到干嘛？交给你来处理
        }

    }, 3000)
}

var nextPage = 1; //下一次要加载的页码
var divLoading = document.getElementById("loading");
var divNoData = document.getElementById("noData");
var hasData = true; //是否还有数据
var isLoading = false; //表示是否正处于加载中
/**
 * 加载下一页电影
 * 获取电影数据
 * 将电影数据加入到页面上
 */
function loadNextPage() {
    if (!hasData) {
        //没有数据啦
        return;
    }
    if (isLoading) { //如果正处于加载中
        return;
    }
    isLoading = true; //要准备加载了，所以将它设置为true
    divLoading.style.display = "block"; //显示加载效果
    //下面的代码会经过一段时间才能拿到数据
    getMovies(nextPage, function (movies) {
        if (movies.length === 0) {
            //这一次没有拿到数据，说明以后都不会有数据了
            hasData = false;
            divNoData.style.display = "block"; //把没有数据的div显示出来
        }
        //将数据添加到页面上
        createLis(movies);
        //下一次获取的页码+1
        nextPage++;
        divLoading.style.display = "none"; //隐藏加载效果
        isLoading = false; //加载结束了
    })
}
var ul = document.getElementById("container");
/**
 * 根据给定的电影数据，生成li
 * @param {*} movies 
 */
function createLis(movies) {
    for (var i = 0; i < movies.length; i++) {
        var m = movies[i]; //得到每一个电影对象  title   cover   description
        var li = document.createElement("li");
        li.innerHTML = `<a href="" class="cover">
        <img src="${m.cover}" alt="">
    </a>
    <h2>${m.title}</h2>
    <p>
       ${m.description}
    </p>`;
        ul.appendChild(li);
    }
}

loadNextPage(); //一开始就要加载第一页数据

window.onscroll = function () {
    var bottom = document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight;
    if (bottom <= 60) {
        loadNextPage();
    }
}