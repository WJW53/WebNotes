var data = [
    {
        title: "庆余年: 张若昀陈道明领衔群像传奇",
        img: "https://puui.qpic.cn/vupload/0/1575436946778_zk1vlcj0cti.jpg/0",
        bg: "rgb(114, 16, 3)"
    },
    {
        title: "边境线之冷焰: 边防警察异域追击",
        img: "https://puui.qpic.cn/media_img/lena/PICrg56j1_580_1680/0",
        bg: "rgb(2, 10, 23)"
    },
    {
        title: "幸福三重奏: 郎朗吉娜甜蜜逛电玩城",
        img: "https://puui.qpic.cn/vupload/0/1577353371066_olge72wfte.jpg/0",
        bg: "rgb(65, 103, 104)"
    },
    {
        title: "心动的offer: 学霸上法庭激烈辩论",
        img: "https://puui.qpic.cn/media_img/lena/PICrqm5jz_580_1680/0",
        bg: "rgb(142, 176, 204)"
    },
    {
        title: "美食告白记: 赖美云曝年底参加艺考",
        img: "https://puui.qpic.cn/vupload/0/1577350986673_whyc8v3y0nl.jpg/0",
        bg: "rgb(175, 157, 133)"
    },
    {
        title: "我们的歌: 肖战张韶涵首度同台",
        img: "https://puui.qpic.cn/media_img/lena/PICbg6q9a_580_1680/0",
        bg: "rgb(29, 36, 178)"
    },
    {
        title: "精英律师: 靳东率律师军团守护正义",
        img: "https://puui.qpic.cn/media_img/lena/PICy8lf21_580_1680/0",
        bg: "rgb(9, 84, 79)"
    },
    {
        title: "中华兵王: 特警硬核激战大毒枭",
        img: "https://puui.qpic.cn/media_img/lena/PICk2rmix_580_1680/0",
        bg: "rgb(59,68,47)"
    },
    {
        title: "VIP7周年硬核福利: 刷片赢双人游",
        img: "https://puui.qpic.cn/vupload/0/1577453866286_78gg08ot7qx.jpg/0",
        bg: "rgb(12, 136, 108)"
    }
];

// [{title, img, bg}, ...]

var createEle = document.createElement.bind(document);
// bind 用于返回一个 带有明确this指向的 函数

function render() {
    var imgs = document.getElementById("imgs");
    var navs = document.getElementById("navs");
    var length = data.length;
    var activeNav, activeImg;
    var navList = [];
    var imgList = [];
    var timer = null;
    for (var i = 0; i < length; i++) {
        (function() {
            var item = data[i];
            // 创建导航并且插入
            var nav = createEle("a");
            nav.setAttribute("class", "nav");
            nav.setAttribute("title", item.title);
            var contents = item.title.split(":");
            nav.innerHTML = contents[0] + " <span>" + contents[1] + "</span>";
            navs.appendChild(nav);
            // 创建图片并插入
            var img = createEle("a");
            img.setAttribute("class", "img-nav");
            img.style.backgroundImage = "url(" + item.img + ")";
            img.style.backgroundColor = item.bg;
            img.style.display = "none";
            imgs.appendChild(img);

            // 初始化页面状态
            if (i == 0) {
                nav.setAttribute("class", "active");
                img.style.display = "block";
                activeImg = img;
                activeNav = nav;
            }

            // 绑定鼠标事件，移入移出
            nav.onmouseenter = function() {
                clearInterval(timer);
                activeImg.style.display = "none";
                activeNav.setAttribute("class", "nav");
                nav.setAttribute("class", "active");
                img.style.display = "block";
                activeNav = nav;
                activeImg = img;
            };

            nav.onmouseleave = function() {
                timer = setInterval(function() {
                    var index = navList.indexOf(activeNav);
                    var length = data.length;
                    activeImg.style.display = "none";
                    activeNav.setAttribute("class", "nav");
                    var nav = navList[(index + 1) % length];
                    var img = imgList[(index + 1) % length];
                    nav.setAttribute("class", "active");
                    img.style.display = "block";
                    activeNav = nav;
                    activeImg = img;
                }, 3000);
            };
            // 分别记录创建的nav 以及 img
            navList.push(nav);
            imgList.push(img);
        })();
    }
    timer = setInterval(function() {
        var index = navList.indexOf(activeNav);
        var length = data.length;
        activeImg.style.display = "none";
        activeNav.setAttribute("class", "nav");
        var nav = navList[(index + 1) % length];
        var img = imgList[(index + 1) % length];
        nav.setAttribute("class", "active");
        img.style.display = "block";
        activeNav = nav;
        activeImg = img;
    }, 3000);
}

render();
