var data = {
    img_url: "https://p9.pstatp.com/list/190x124/pgc-image/RtTuwhq3nnIniO",
    title_link : "https://www.toutiao.com/group/6805100065816838663/",
    title: "北京市疾病预防控制中心：美国输入确诊病例黎某丈夫被确诊",
    banners: {
        logo_url: "https://p1.pstatp.com/large/4d00054b126ceaf920",
        type: "h",
        type_name: "健康",
        avatar: "环球网",
        comments: "666",
        time: 1584448891036
    }
}

var datas = [
    
]

// 数据 => 视图View
function init() {
    var list = document.getElementById("list");
    // 创建li插入到list
    list.appendChild(render(data))
}
// li
function render(data) {

    return createElement({
        tag: "li",
        props: {
            class: "item"
        },
        child: [
            {
                tag: "div",
                props: {
                    class: "left-img"
                },
                child: [
                    {
                        tag: "img",
                        props: {
                            src: data.img_url
                        }
                    }
                ]
            },
            {
                tag: "div",
                props: {
                    class: "right-content"
                },
                child: [
                    {
                        tag: "div",
                        props: {
                            class: "content-title"
                        },
                        child: [
                            {
                                tag: "a",
                                props: {
                                    href: data.title_link,
                                    text: data.title
                                }
                            }
                        ]
                    },
                    {
                        tag: "div",
                        props: {
                            class: "banners"
                        },
                        child: [
                            {

                                tag: "span",
                                props: {
                                    class: "type-" + data.banners.type,
                                    text: data.banners.type_name
                                }
                            },
                            {
                                tag: "span",
                                props: {
                                    class: "logo"
                                },
                                child: [
                                    {
                                        tag: "img",
                                        porps: {
                                            src: data.banners.logo_url
                                        }
                                    }
                                ]
                            },
                            {
                                tag: "span",
                                props: {
                                    text: data.banners.avatar
                                }
                            },
                            {
                                tag: "span",
                                props: {
                                    text: "·"
                                }
                            },
                            {
                                tag: "span",
                                props: {
                                    text: data.banners.comments+"评论"
                                }
                            },
                            {
                                tag: "span",
                                props: {
                                    text: "·"
                                }
                            },
                            {
                                tag: "span",
                                props: {
                                    text: formatTime(data.banners.time)
                                }
                            },
                            
                            
                        ]
                    }
                ]
            }
        ]
    })


    // var item = document.createElement("li");
    //     item.setAttribute("class", "item");
    // //leftImg
    // var leftImg = document.createElement("div");
    //     leftImg.setAttribute("class", "left-img");
    //     item.appendChild(leftImg);
    // var img1 = document.createElement("img");
    //     img1.setAttribute("src", data.img_url);
    //     leftImg.appendChild(img1);
    // // rightContent
    // var rightContent = document.createElement("div");
    //     rightContent.setAttribute("class", "right-content");
    // var title = document.createElement("div");
    //     title.setAttribute("class", "content-title")
    // var link = document.createElement("a");
    //     link.setAttribute("href", data.title_link);
    //     link.innerText = data.title;
    //     title.appendChild(link);
    //     rightContent.appendChild(title);
    //     item.appendChild(rightContent);
    
    // return item;
}
// 用一组数据用来表示一个DOM
/**
 * <li class="wrapper">
 *  <span>duyi</span>
 *  <span>web</span>
 * </li>
 */
//  VDOM

function createElement(options) {
    var tag = options.tag || "div";
    var props = options.props || {};
    var child  = options.child || [];
    var dom = document.createElement(tag);
        for(var prop in props) {
            if(prop == "text") {
                dom.innerText = props[prop];
            } else {
                dom.setAttribute(prop, props[prop])
            }
        }

        for(var i=0; i<child.length; i++) {
                dom.appendChild(createElement(child[i]))
        }

    return dom

}
// VDOM => DOM
init();

// 格式化时间 刚刚，5分钟前，一小时前，两天前，很久很久以前。
function formatTime(date) {
    var amonutOfChange = new Date().getTime() - date;
    if(Math.floor(amonutOfChange/1000/60/60/24/7)>0) {
        return "很久很久以前"
    } else if(Math.floor(amonutOfChange/1000/60/60/24)>0) {
        return Math.floor(amonutOfChange/1000/60/60/24)+"天前"
    } else if(Math.floor(amonutOfChange/1000/60/60) > 0) {
        return Math.floor(amonutOfChange/1000/60/60) + "小时前"
    } else if(Math.floor(amonutOfChange/1000/60)>0) {
        return Math.floor(amonutOfChange/1000/60) + "分钟前"
    } else {
        return "刚刚"
    }
}