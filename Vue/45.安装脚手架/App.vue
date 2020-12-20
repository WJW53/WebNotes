
<template>
<div>
    xxx
    {{ msg }}
    <p>我是App组件的p元素</p>
    <base-son></base-son>
</div>

</template>



<script>
// 一个组件要复用：
//结构样式行为
//HTML css js


import baseSon from "./Son";

export default {
    components: {
        baseSon,
    },
    data(){
        return {
            msg: "hello world!",
        }
    }
}
</script>



<style>
    div{
        background-color: red;
    }

</style>