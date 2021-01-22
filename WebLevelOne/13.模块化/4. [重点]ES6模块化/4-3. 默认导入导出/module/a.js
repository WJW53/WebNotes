// var c = 3;
// export {c as ccc};

export var a = 1;//这俩是基本导出
export var b = 2;

// export { c as default};//作为默认导出

export default {//这是唯一的一个默认导出
    fn: function () {
        console.log('WTF?');
    },
    name: 'wjw'
}