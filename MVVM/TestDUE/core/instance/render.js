import { getValue } from "../util/ObjectUtil.js";
import { vmodel } from "./grammer/index.js";

// 要做个模板和节点之间的映射,2的意思就是To,4的意思就是For
// 通过模板,找到 哪些节点用到了这个模板
// 通过节点,找到 这个节点下有哪些模板
let template2Vnode = new Map();
let vnode2Template = new Map();

export function renderMixin(Due) {
    Due.prototype._render = function () {
        renderNode(this, this._vnode);
    }
}

//修改属性后自动渲染页面视图
export function renderData(vm, data) {
    let vnodes = template2Vnode.get(data);//找到对应数据所在的每个节点 
    if (vnodes != null) {
        for (let i = 0; i < vnodes.length; i++) {
            renderNode(vm, vnodes[i]);
        }
    }
}

//传入对应due,以及根节点,那就啥都能找到
export function renderNode(vm, vnode) {
    if (vnode.nodeType === 3) {//文本节点
        let templates = vnode2Template.get(vnode);
        if (templates !== undefined) {//存在模板,template是个数组
            let result = vnode.text;
            for (let i = 0; i < templates.length; i++) {
                //预留vnode.env是因为,当前节点的参数可以来自于Due,还可以来自于父级节点的参数(例如v-for)
                let templateValue = getTemplateValue([vm._data, vnode.env], templates[i]);
                if (templateValue) {
                    result = result.replace("{{" + templates[i] + "}}", templateValue);
                }
            }
            // vnode.text = result;//这个不能加!!,否则v-model数据渲染有问题
            vnode.elm.nodeValue = result;
        }
    } else if (vnode.nodeType === 1 && vnode.tag === "INPUT") {
        let templates = vnode2Template.get(vnode);//找到所有对应的模板
        if (templates) {
            for (let i = 0; i < templates.length; i++) {//将所有模板属性改为对应的值
                let templateValue = getTemplateValue([vm._data, vnode.env], templates[i]);
                if (templateValue) {
                    // vnode.text = templateValue;
                    vnode.elm.value = templateValue;
                }
            }
        }
    } else {
        for (let i = 0; i < vnode.children.length; i++) {
            renderNode(vm, vnode.children[i]);
        }
    }
}
//预备渲染
export function prepareRender(vm, vnode) {
    if (vnode == null) {
        return;
    }
    if (vnode.nodeType == 3) {//如果当前是文本，则解析是否存在模板(插值表达式啥的)
        analysisTemplateString(vnode);
    }
    if (vnode.nodeType == 0) {
        setTemplate2Vnode("{{" + vnode.data + "}}", vnode);
        setVnode2Template("{{" + vnode.data + "}}", vnode);
    }

    //元素节点
    analysisAttr(vm, vnode);//在这里也要解析属性
    for (let i = 0; i < vnode.children.length; i++) {
        prepareRender(vm, vnode.children[i]);
    }
}

//分析模板字符串
function analysisTemplateString(vnode) {
    let templateStrList = vnode.text.match(/{{\s*[\w.]+\s*}}/g);
    for (let i = 0; templateStrList && i < templateStrList.length; i++) {
        setTemplate2Vnode(templateStrList[i], vnode);
        setVnode2Template(templateStrList[i], vnode);
    }
}

// 通过模板,找到 哪些节点用到了这个模板
function setTemplate2Vnode(template, vnode) {
    let templateName = getTemplateName(template);
    let templateSet = template2Vnode.get(templateName);//看看map中有没有
    if (templateSet !== undefined) {
        templateSet.push(vnode);
    } else {
        template2Vnode.set(templateName, [vnode]);//值是数组形式
    }
}
// 通过节点,找到 这个节点下有哪些模板
function setVnode2Template(template, vnode) {
    let vnodeSet = vnode2Template.get(vnode);
    if (vnodeSet !== undefined) {
        vnodeSet.push(getTemplateName(template));
    } else {
        vnode2Template.set(vnode, [getTemplateName(template)]);
    }
}

//判断是否是花括号,有就解掉,没有就直接返回
function getTemplateName(template) {
    if (template.substring(0, 2) === '{{' && template.substring(template.length - 2, template.length) === '}}') {
        return template.substring(2, template.length - 2);
    } else {
        return template;
    }
}
//得到对应模板(属性)的属性值
function getTemplateValue(objs, templateName) {
    for (let i = 0; i < objs.length; i++) {//objs是个数组
        let temp = getValue(objs[i], templateName);
        if (temp !== undefined) {
            return temp;
        }
    }
    return undefined;
}

//分析元素节点属性
function analysisAttr(vm, vnode) {
    if (vnode.nodeType !== 1) {
        return;
    }
    let attrNames = vnode.elm.getAttributeNames();
    if (attrNames.indexOf("v-model") > -1) {
        // vmodel(vm, vnode.ele, vnode.getAttribute('v-model'));
        setTemplate2Vnode("{{" + vnode.elm.getAttribute("v-model") + "}}", vnode);
        setVnode2Template("{{" + vnode.elm.getAttribute("v-model") + "}}", vnode);
    }
}

export function getVNodeByTemplate(template) {
    return template2Vnode.get(template);
}

export function getTemplate2VnodeMap() {
    return template2Vnode;
}
export function getVnode2TemplateMap() {
    return vnode2Template;
}
export function clearMap() {
    template2Vnode.clear();
    vnode2Template.clear();
}
