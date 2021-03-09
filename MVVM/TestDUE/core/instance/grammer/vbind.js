import {getValue, mergeAttr, getEnvAttr, execute} from "../../util/ObjectUtil.js";
import {generateAnnoCode, isTrue} from "../../util/Code.js";
//解析节点上的v-bind指令
export function checkVBind(vm, vnode) {
    if (vnode.nodeType != 1) {
        return;
    }
    let attrNames = vnode.elm.getAttributeNames();
    for (let i = 0 ; i < attrNames.length ; i ++) {
        if (attrNames[i].indexOf("v-bind:") == 0 || attrNames[i].indexOf(":") == 0) {
            vBind(vm, vnode, attrNames[i], vnode.elm.getAttribute(attrNames[i]));
        }
    }
}
//将对应属性及其值绑定到节点上
function vBind(vm, vnode, name, value) {
    let k = name.split(":")[1];
    if (/^{[\w\W]+}$/.test(value)) {//v-bind:class='{red: obj.x < 2, blue: obj.x > 2}'
        let str = value.substring(1, value.length - 1).trim();//解析出表达式的内容
        let expressionList = str.split(",");
        //expressionList = ['red: obj.x < 2','blue: obj.x > 2]
        let result = analysisExpression(vm, vnode, expressionList);//解析表达式
        vnode.elm.setAttribute(k, result);//然后就可以给节点对应属性赋值了
    } else {//v-bind:src='imgSrc'
        let v = getValue(vm._data, value);
        vnode.elm.setAttribute(k, v);
    }
}
//解析表达式
function analysisExpression(vm, vnode, expressionList) {
    //获取当前的环境
    let attr = getEnvAttr(vm, vnode);
    //将当前环境变量解析为声明赋值字符串
    let code = generateAnnoCode(attr);
    //拼接成最终结果
    let result = "";
    for (let i = 0 ; i < expressionList.length ; i ++) {
        let site = expressionList[i].indexOf(":");//将属性名和表达式分开
        if (site > -1) {//结合上面的环境声明代码, isTrue判断表达式是否成立
            if (isTrue(expressionList[i].substring(site + 1, expressionList[i].length), code)) {
                result += expressionList[i].substring(0, site) + ",";
            }
        } else {
            result += expressionList[i] + ",";
        }
    }
    if (result.length > 0) {
        result = result.substring(0, result.length - 1);//再去掉最后的逗号即可
    }
    return result;
}

