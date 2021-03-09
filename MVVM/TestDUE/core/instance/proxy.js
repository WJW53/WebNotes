import {renderData} from "./render.js"
import {rebuild} from "./mount.js";
import {getValue} from "../util/ObjectUtil.js";

const arrayProto = Array.prototype // 获取Array的原型
function defArrayFunc (obj, func, namespace, vm) {
    Object.defineProperty(obj, func, {
        enumerable: true,
        configurable: true,
        value: function(...args) {//当调用对应的方法的时候,就会来执行这个函数
            let original = arrayProto[func];
            const result = original.apply(this, args);
            rebuild(vm, getNameSpace(namespace, ""));
            renderData(vm, getNameSpace(namespace, ""));
            return result;
        }
    });
}

function proxyArr(vm, arr, namespace) {
    let obj = {
        eleType: "Array",
        toString: function() {
            let result = "";
            for (let i = 0 ; i < arr.length ; i ++) {
                result += arr[i] + ", "
            }
            return result.substring(0, result.length - 2);
        },
        push() {},
        pop() {},
        shift() {},
        unshift() {}
    }
    defArrayFunc.call(vm, obj, 'push', namespace, vm);
    defArrayFunc.call(vm, obj, 'pop', namespace, vm);
    defArrayFunc.call(vm, obj, 'shift', namespace, vm);
    defArrayFunc.call(vm, obj, 'unshift', namespace, vm);
    arr.__proto__ = obj;
    return arr;
}

function constructObjectProxy(vm, obj, namespace) {
    if(typeof obj !== 'object'){
        return obj;
    }
    let proxyObj = {};//包裹一层代理对象
    for (let prop in obj) {
        Object.defineProperty(proxyObj, prop, {//劫持obj里的属性,但是是在另外一个代理对象里,也是最终被返回的对象
            configurable: true,
            set: function (value) {
                // console.log("set:" + getNameSpace(namespace, prop));
                obj[prop] = value;
                renderData(vm, getNameSpace(namespace, prop));
            },
            get() {
                return obj[prop];
            }
        });
        Object.defineProperty(vm, prop, {//vm也要被劫持
            configurable: true,
            set: function (value) {
                // console.log("set:" + getNameSpace(namespace, prop));
                obj[prop] = value;
                //这是直接操作数组索引的时候劫持的操作
                let val = getValue(vm._data, getNameSpace(namespace, prop));
                if (val instanceof Array) {//如果是数组,则需要先rebuild一次
                    rebuild(vm, getNameSpace(namespace, prop));
                    renderData(vm, getNameSpace(namespace, prop));
                } else {
                    renderData(vm, getNameSpace(namespace, prop));
                }
            },
            get() {
                return obj[prop];
            }
        });
        //递归劫持
        if (obj[prop] instanceof Object) {//数组的instanceof Object也会返回true,因为可以在原型链上找到啊
            proxyObj[prop] = constructProxy(vm, obj[prop], getNameSpace(namespace, prop));
        }
    }
    return proxyObj;
}

//基于当前命名空间,拼接上当前的属性,返回这个新的命名空间
function getNameSpace(nowNameSpace, nowProp) {
    if (nowNameSpace == null || nowNameSpace == "") {
        return nowProp;
    } else if (nowProp == null || nowProp == "") {
        return nowNameSpace;
    } else {
        return nowNameSpace + "." + nowProp;
    }
}

//vm表示Due对象,obj表示要进行代理的对象,namespace命名空间(可以看做是嵌套的路径)
//我们得知道那个属性被修改了,我们才能对页面上的内容进行更新
//所以我们需要用代理的方式来实现监听属性修改
export function constructProxy(vm, obj, namespace) {
    let proxyObj = null;
    if (obj instanceof Array) {
        proxyObj = new Array(obj.length);
        for (let i = 0 ; i < proxyObj.length ; i ++) {
            proxyObj[i] = constructProxy(vm, obj[i], namespace);//劫持数组中的每个属性
        }
        proxyObj = proxyArr(vm, obj, namespace);//劫持这个数组本身
    } else if (obj instanceof Object) {
        proxyObj = constructObjectProxy(vm, obj, namespace);
    } else {
        proxyObj = obj;
        // throw new Error("error: 我只接受对象和数组!");
    }
    return proxyObj;
}

