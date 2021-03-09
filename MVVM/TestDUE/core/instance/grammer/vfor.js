import VNode from "../../vdom/vnode.js";
import {getValue} from "../../util/ObjectUtil.js";

export function vforInit(vm, instructions, elm, parent) {//instructions为(key) in list这种格式的
    //nodeType===0代表虚拟节点,
    let virtualNode = new VNode(elm.nodeName, elm, [], "", getVirtualNodeData(instructions)[2], parent, 0, "");
    virtualNode.instructions = instructions;
    parent.elm.removeChild(elm);//先让父级删除这个当前的虚拟的节点(就是带有v-for指令的这个节点)
    //因为有bug的存在,他还会连带着删除一个文本节点,所以我们再加一个文本节点
    parent.elm.appendChild(document.createTextNode(""));
    let resultSet = analysisInstructions(vm, instructions, elm, parent);//没用到这东西的返回值而已,
    //但在函数内部已经将新创建的dom节点添加进parent的DOM节点中了
    return virtualNode;//返回这个虚拟节点即可
}
//解析指令值
function analysisInstructions(vm, instructions, elm, parent) {
    let insSet = getVirtualNodeData(instructions);
    let dataSet = getValue(vm._data, insSet[2]);//就是取list对应的值
    if (!dataSet) {
        throw new Error("error");
    }
    let resultSet = [];
    for (let i = 0 ; i < dataSet.length ; i ++) {
        let tempDom = document.createElement(elm.nodeName);
        tempDom.innerHTML = elm.innerHTML;
        let env = analysisKV(insSet[0], dataSet[i], i);//获取局部变量
        tempDom.setAttribute("env", JSON.stringify(env));//将变量设置到dom中
        parent.elm.appendChild(tempDom);
        resultSet.push(tempDom);//返回虚拟节点对应的真实DOM节点数组
    }
    return resultSet;
}
//语法解析instructions(我们当然没法做正经的解析,那成千上万行代码呢,一套编译解析的代码很值钱呢)
function getVirtualNodeData(instructions) {
    let insSet = instructions.trim().split(" ");
    if (insSet.length !== 3 || insSet[1] !== "in" && insSet[1] !== "of") {
        throw new Error("error");
    }
    return insSet;
}
//解析出key和index的值
function analysisKV(instructions, value, index) {
    if (/([a-zA-z0-9-_$]+)/.test(instructions)) {//带括号的形式
        instructions = instructions.trim();
        instructions = instructions.substring(1, instructions.length - 1);
    }//这一步处理后就是  key   key, index   的形式了
    let keys = instructions.split(",");
    if (keys.length == 0) {
        throw new Error("error");
    }
    let obj = {};
    if (keys.length >= 1) {
        obj[keys[0].trim()] = value;
    }
    if (keys.length >= 2) {
        obj[keys[1].trim()] = index;
    }
    return obj;//局部变量,因为每个for循环的值都不一样呗,再赋值给env
}