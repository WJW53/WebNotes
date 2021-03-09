//obj为对象,code为属性名,比如:key.a
export function getValue(obj, code) {
    if (!obj) {
        return obj;
    }
    let codeList = code.split(".");
    let temp = obj;
    for (let i = 0 ; i < codeList.length ; i ++) {//一层层的迭代更新维护temp
        if (temp[codeList[i]]!==undefined) {
            temp = temp[codeList[i]];
        } else {
            return undefined;
        }
    }
    return temp;
}
//due对象,该元素绑定的属性,该元素的新value
export function setValue(obj, attr, value) {
    if (!obj) {
        return obj;
    }
    let attrList = attr.split(".");
    let temp = obj;
    for (let i = 0 ; i < attrList.length - 1 ; i ++) {//截止到到倒数第二层
        if (temp[attrList[i]]) {
            temp = temp[attrList[i]];
        } else {
            return;
        }
    }
    if (temp[attrList[attrList.length - 1]] != null) {
        temp[attrList[attrList.length - 1]] = value;
    }
}
//合并vnode原先的属性 和 env环境里的属性,比如子能访问父的for循环里的数据
export function mergeAttr(obj1, obj2) {
    if (obj1 == null) {
        return clone(obj2);
    }
    if (obj2 == null) {
        return clone(obj1);
    }
    let result = {};
    let obj1Attrs = Object.getOwnPropertyNames(obj1);//即便不可枚举也能获取到自身所有属性值
    for (let i = 0 ; i < obj1Attrs.length ; i ++) {
        result[obj1Attrs[i]] = obj1[obj1Attrs[i]];
    }
    let obj2Attrs = Object.getOwnPropertyNames(obj2);
    for (let i = 0 ; i < obj2Attrs.length ; i ++) {
        result[obj2Attrs[i]] = obj2[obj2Attrs[i]];
    }
    return result;
}
//获取当前vnode环境
export function getEnvAttr(vm, vnode) {
    let result = mergeAttr(vm._data, vnode.env);
    result = mergeAttr(result, vm._computed);
    return result;
}
//是函数就执行,不是就直接返回
export function execute(obj) {
    if (typeof obj === "function") {
        return obj();
    } else {
        return obj;
    }
}

//以下是关于克隆的代码
export function easyClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function clone(obj) {
    if (obj instanceof Array) {
        return cloneArray(obj);
    } else if (obj instanceof Object) {
        return cloneObject(obj);
    } else {
        return obj;
    }
}

function cloneObject(obj) {
    let result = {};
    let names = Object.getOwnPropertyNames(obj);
    for (let i = 0 ; i < names.length ; i ++) {
        result[names[i]] = clone(obj[names[i]]);
    }
    return result;
}

function cloneArray(obj) {
    let result = new Array(obj.length);
    for (let i = 0 ; i < obj.length ; i ++) {
        result[i] = clone(obj[i]);
    }
    return result;
}

