import {mount} from "./mount.js";
import {constructProxy} from "./proxy.js";

let uid = 0;

export function initMixin(Due) {
    Due.prototype._init = function (options) {
        const vm = this;//virtual model,跟踪是哪一个due
        vm.uid = uid ++;//就是给个id,不让你重复
        vm._isDue = true;//是不是Due的对象

        //初始化data
        if (options && options.data) {
            vm._data = constructProxy(vm, options.data, "");
        }
        //初始化created
        if (options && options.created) {
            vm.created = options.created;
        }
        //初始化methods
        if (options && options.methods) {
            vm._methods = options.methods;
            for (let temp in options.methods) {
                vm[temp] = options.methods[temp];
            }
        }
        //初始化computed
        if (options && options.computed) {
            vm._computed = options.computed;
            for (let temp in options.computed) {
                vm[temp] = options.computed[temp];
            }
        }
        //初始化el并挂载
        if (options && options.el) {
            let rootDom = document.getElementById(options.el);
            mount(vm, rootDom);//将vm挂载到真实根节点el中
        }

    }
}