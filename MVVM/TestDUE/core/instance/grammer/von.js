import { getValue, execute } from "../../util/ObjectUtil.js";
//解析节点上的v-on指令
export function checkVOn(vm, vnode) {
    if (vnode.nodeType != 1) {
        return;
    }
    let attrNames = vnode.elm.getAttributeNames();
    for (let i = 0; i < attrNames.length; i++) {
        if (attrNames[i].indexOf("v-on:") == 0 || attrNames[i].indexOf("@") == 0) {
            // vBind(vm, vnode, attrNames[i], vnode.elm.getAttribute(attrNames[i]));
            von(vm, vnode, attrNames[i].split(":")[1], vnode.elm.getAttribute(attrNames[i]));
        }
    }
}
//event是事件名,name是方法名
function von(vm, vnode, event, name) {
    let method = getValue(vm._methods, name);
    if (method) {
        vnode.elm.addEventListener(event, proxyExecute(vm, method));
    }
}
//用代理的方式调用method,是为了将this指向实例
function proxyExecute(vm, method) {
    return function () {
        method.call(vm);
    }
}