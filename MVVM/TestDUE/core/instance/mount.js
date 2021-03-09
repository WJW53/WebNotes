import VNode from "../vdom/vnode.js";
import { prepareRender, getVNodeByTemplate, renderNode, clearMap, getTemplate2VnodeMap, getVnode2TemplateMap } from "./render.js";
import { vforInit, vmodel, checkVBind } from "./grammer/index.js";
import { mergeAttr } from "../util/ObjectUtil.js";
import { checkVOn } from "./grammer/index.js";


export function initMount(Due) {
    Due.prototype.$mount = function (el) {
        let vm = this;
        let rootDom = document.getElementById(el);
        mount(vm, rootDom);
    }
}

export function mount(vm, el) {
    //将虚拟节点挂载到due上
    vm._vnode = constructVNode(vm, el, null);//根节点没有父节点,所以为null
    //进行预备渲染(实际就是建立渲染索引,通过模板找vnode,通过vnode找模板),遍历树形结构建立索引
    prepareRender(vm, vm._vnode);//到此为止,还没渲染呢
    // console.log(getTemplate2VnodeMap());
    // console.log(getVnode2TemplateMap());
}

//DFS,构建虚拟节点
function constructVNode(vm, elm, parent) {
    //先接收虚拟节点
    let vnode = analysisAttr(vm, elm, parent);//解决行间属性对内容的影响
    if (vnode == null) {//如果不是虚拟节点
        let children = [];
        let text = getNodeText(elm);//因为我们也不知道文本节点是否有内容
        let data = null;
        let nodeType = elm.nodeType;
        let tag = elm.nodeName;
        let key = null;
        vnode = new VNode(tag, elm, children, text, data, parent, nodeType, key);//elm, children, text, data, vnode
        if (elm.nodeType == 1 && elm.getAttribute("env")) {
            vnode.env = mergeAttr(vnode.env, JSON.parse(elm.getAttribute("env")));
        } else {
            vnode.env = mergeAttr(vnode.env, parent ? parent.env : {});//可以继承父亲环境里的属性
        }
    }
    checkVBind(vm, vnode);//对v-bind指令的处理
    checkVOn(vm, vnode);//对v-on指令的处理
    //如果是虚拟节点,就得从父级拿真实节点,不能从自身拿了
    let childs = vnode.nodeType == 0 ? vnode.parent.elm.childNodes : vnode.elm.childNodes;
    let len = vnode.nodeType == 0 ? vnode.parent.elm.childNodes.length : vnode.elm.childNodes.length;
    for (let i = 0; i < len; i++) {
        let childNodes = constructVNode(vm, childs[i], vnode);
        if (childNodes instanceof VNode) {//返回单一节点的时候
            vnode.children.push(childNodes);
        } else {//返回节点数据的时候,比如v-for循环,一个节点导致生成多个节点
            vnode.children = vnode.children.concat(childNodes);//拍平
        }
    }
    return vnode;
}
//得到文本节点内容
function getNodeText(elm) {
    if (elm.nodeType == 3) {
        return elm.nodeValue;
    } else {
        return "";
    }
}
//针对v-for和v-model进行解析
function analysisAttr(vm, elm, parent) {
    if (elm.nodeType == 1) {
        let attrNames = elm.getAttributeNames();
        if (attrNames.indexOf("v-for") > -1) {//(key) in list
            return vforInit(vm, elm.getAttribute("v-for"), elm, parent);
        }
        if (attrNames.indexOf("v-model") > -1) {
            return vmodel(vm, elm, elm.getAttribute("v-model"));
        }
    }
}
//在template对应的虚拟节点
export function rebuild(vm, template) {
    let virtualNodes = getVNodeByTemplate(template);//拿到对应的虚拟节点
    for (let i = 0; i < virtualNodes.length; i++) {
        virtualNodes[i].parent.elm.innerHTML = "";//清空
        virtualNodes[i].parent.elm.appendChild(virtualNodes[i].elm);
        //从这个节点开始再重新构建虚拟DOMN树
        let result = constructVNode(vm, virtualNodes[i].elm, virtualNodes[i].parent);
        virtualNodes[i].parent.children = [result];
        clearMap();//清空映射表
        prepareRender(vm, vm._vnode);//再重新渲染
        renderNode(vm, vm._vnode);
    }

}
