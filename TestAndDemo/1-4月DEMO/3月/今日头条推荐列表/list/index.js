var data = {
    img_url: "https://p3.pstatp.com/list/190x124/pgc-image/RjlgxMWAViy0zm",
    title: "太治愈！武汉64岁奶奶患癌14年奇迹般好了，7岁孙女功不可没……",
    title_link: "https://www.toutiao.com/group/6766880179110281742/",
    banners: {
        type_name: "健康",
        type: "other",
        img_url:
            "https://p7.pstatp.com/large/pgc-image/e2c79d5500bc495799ee86d64dee9d25",
        avatar: "中国经济网",
        coments: 347,
        timer: 1584443389461
    }
};

var datas = [
    {
        img_url: "https://p3.pstatp.com/list/190x124/pgc-image/RjlgxMWAViy0zm",
        title: "太治愈！武汉64岁奶奶患癌14年奇迹般好了，7岁孙女功不可没……",
        title_link: "https://www.toutiao.com/group/6766880179110281742/",
        banners: {
            type_name: "健康",
            type: "other",
            img_url:"https://p7.pstatp.com/large/pgc-image/e2c79d5500bc495799ee86d64dee9d25",
            avatar: "中国经济网",
            coments: 347,
            timer: 1584443389461
        }
    },
    {
        img_url: "https://p1.pstatp.com/list/190x124/pgc-image/Rjq2TIh1W7nJ7i",
        title: "“全网最年轻帅气的爷爷”火了，抱小孙女看楼盘张罗嫁妆",
        title_link: "https://www.toutiao.com/group/6767156048642966029/",
        banners: {
            type_name: "房产",
            type: "other",
            img_url:
                "https://p3.pstatp.com/large/pgc-image/e3b1ffd031fb40ca9d1c76fe111b6787",
            avatar: "文水电视台",
            coments: 9,
            timer: 1584443389461
        }
    },
    {
        img_url: "https://p1.pstatp.com/list/190x124/pgc-image/Rhf6HnEEXyAci1",
        title: "如果孩子平时有这四种表现，说明内心很自卑，父母别不当回事",
        title_link: "https://www.toutiao.com/group/6758592335791014408/",
        banners: {
            type_name: "育儿",
            type: "other",
            img_url: "https://p4.pstatp.com/large/2c68000006582322ad80",
            avatar: "光明网",
            coments: 34,
            timer: 1584443389461
        }
    },
    {
        img_url: "https://p9.pstatp.com/list/190x124/2b288000133326f118b05",
        title: "3分钟黑掉阿里的“黑客男孩”，马云给500万年薪，现状如何？",
        title_link: "https://www.toutiao.com/group/6735195117839188227/",
        banners: {
            type_name: "科技",
            type: "technology",
            img_url: "https://p1.pstatp.com/large/da9c000d2bfd4ab0c621",
            avatar: "悟空问答",
            coments: 2292,
            timer: 1584443389461
        }
    },
    {
        img_url: "https://p1.pstatp.com/list/190x124/pgc-image/RjlwWWn20ANlap",
        title: "坐地铁回母校，捐出了100000000",
        title_link: "https://www.toutiao.com/group/6767111641575195147/",
        banners: {
            type_name: "教育",
            type: "other",
            img_url:
                "https://p7.pstatp.com/large/pgc-image/e2c79d5500bc495799ee86d64dee9d25",
            avatar: "中国经济网",
            coments: 347,
            timer: 1584443389461
        }
    }
];

function init(datas) {
    var ulWrapper = document.getElementById("list");
    ulWrapper.innerHTML = "";
    for (var i = 0; i < datas.length; i++) {
        ulWrapper.appendChild(render(datas[i]));
    }
}
// 创建DOM
// 添加属性（class src href, text）
// 添加到HTML中（添加到父级元素下面）
// tagName: 标签名称
// property: 标签上面的一些属性（class,id, href, text）
// child 是他的子元素 结构为数组 [{tagName, property, child}]
function createElement(tagName, property, child) {
    var ele = document.createElement(tagName);
    var child = child || [];
    for (var prop in property) {
        if (prop == "text") {
            ele.innerHTML = property[prop];
            continue;
        }
        ele.setAttribute(prop, property[prop]);
    }
    for (var i = 0; i < child.length; i++) {
        ele.appendChild(
            createElement(child[i].tagName, child[i].property, child[i].child)
        );
    }
    return ele;
}

// <li class="item">item</li>
// {class: "item", text: "item"} "li" []

function render(data) {
    return createElement("li", { class: "item" }, [
        {
            tagName: "div",
            property: { class: "left-img" },
            child: [
                {
                    tagName: "img",
                    property: {
                        src: data.img_url
                    }
                }
            ]
        },
        {
            tagName: "div",
            property: { class: "right-content" },
            child: [
                {
                    tagName: "div",
                    property: {
                        class: "content-title"
                    },
                    child: [
                        {
                            tagName: "a",
                            property: {
                                target: '_blank',
                                href: data.title_link,
                                text: data.title
                            }
                        }
                    ]
                },
                {
                    tagName: "div",
                    property: { class: "banners" },
                    child: [
                        {
                            tagName: "span",
                            property: {
                                class: "type-" + data.banners.type,
                                text: data.banners.type_name
                            }
                        },
                        {
                            tagName: "span",
                            property: {
                                class: "img-wrapper"
                            },
                            child: [
                                {
                                    tagName: "img",
                                    property: {
                                        class: "banner-img",
                                        src: data.banners.img_url
                                    }
                                }
                            ]
                        },
                        {
                            tagName: "span",
                            property: { text: data.banners.avatar }
                        },
                        {
                            tagName: "span",
                            property: { text: "·" }
                        },
                        {
                            tagName: "span",
                            property: {
                                text: data.banners.coments + "评论"
                            }
                        },
                        {
                            tagName: "span",
                            property: { text: "·" }
                        },
                        {
                            tagName: "span",
                            property: { text: countTime(data.banners.timer) }
                        }
                    ]
                }
            ]
        }
    ]);
    // var li = document.createElement("li");
    // var leftImg = document.createElement("div");
    // var rightContent = document.createElement("div");
    // var img1 = document.createElement("img");
    // var title = document.createElement("div");
    // var titleLink = document.createElement("a");
    // var banners = document.createElement("div");
    // var type = document.createElement("span");
    // var imgWrapper = document.createElement("span");
    // var img2 = document.createElement("img");
    // var avatar = document.createElement("span");
    // var tag1 = document.createElement("span");
    // var tag2 = document.createElement("span");
    // var comments = document.createElement("span");
    // var timer = document.createElement("span");

    // li.setAttribute("class", "item");
    // // 缩略图片区
    // leftImg.setAttribute("class", "left-img");
    // img1.setAttribute("src", data.img_url);
    // leftImg.appendChild(img1);

    // // 右侧内容区
    // // title 区域
    // rightContent.setAttribute("class", "right-content");
    // title.setAttribute("class", "content-title");
    // titleLink.setAttribute("target", "_blank");
    // titleLink.setAttribute("href", data.title_link);
    // titleLink.innerHTML = data.title;
    // title.appendChild(titleLink);
    // banners.appendChild(title);
    // rightContent.appendChild(banners);

    // // banner区
    // banners.setAttribute("class", "banners");
    // type.setAttribute("class", "type-" + data.banners.type_name);
    // type.innerHTML = types[data.banners.type_name];
    // imgWrapper.setAttribute("class", "img-wrapper");
    // img2.setAttribute("class", "banner-img");
    // img2.setAttribute("src", data.banners.img_url);
    // imgWrapper.appendChild(img2);
    // avatar.innerHTML = data.banners.avatar;
    // comments.innerHTML = data.banners.coments + "评论";
    // timer.innerHTML = countTime(data.banners.timer);
    // tag1.innerHTML = "·";
    // tag2.innerHTML = "·";

    // banners.appendChild(type);
    // banners.appendChild(imgWrapper);
    // banners.appendChild(avatar);
    // banners.appendChild(tag1);
    // banners.appendChild(comments);
    // banners.appendChild(tag2);
    // banners.appendChild(timer);

    // rightContent.appendChild(banners);

    // li.appendChild(leftImg);
    // li.appendChild(rightContent);
    // return li;
}

function countTime(time) {
    // 起始时间 1970 1.1 8:00 am
    var amountOfChange = new Date().getTime() - time;
    if (Math.floor(amountOfChange / (1000 * 60 * 60 * 24 * 7)) > 0) {
        return "很久很久之前";
    } else if (Math.floor(amountOfChange / (1000 * 60 * 60 * 24)) > 0) {
        return Math.floor(amountOfChange / (1000 * 60 * 60 * 24)) + "天前";
    } else if (Math.floor(amountOfChange / (1000 * 60 * 60)) > 0) {
        return Math.floor(amountOfChange / (1000 * 60 * 60)) + "小时前";
    } else if (Math.floor(amountOfChange / (1000 * 60)) > 0) {
        return Math.floor(amountOfChange / (1000 * 60)) + "分钟前";
    } else if (Math.floor(amountOfChange / 1000) > 0) {
        return "刚刚";
    }
}
init(datas);
setInterval(function() {
    init(datas);
}, 1000 * 60);
