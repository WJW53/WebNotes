import {getValue, setValue} from "../../util/ObjectUtil.js";

//due对象,该元素绑定的属性,该元素的新value
export function vmodel(vm, elm, attr) {
    elm.oninput = function (event) {//也可加change事件
        setValue(vm._data, attr, elm.value);
    }
}