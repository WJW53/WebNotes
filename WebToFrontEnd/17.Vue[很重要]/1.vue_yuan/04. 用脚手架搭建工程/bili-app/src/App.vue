<template>
    
  <div>
        
    <div style="width: 250px">
        <TitleMenu :isActive="select" @active="select = true">
            <template v-slot:title>
                <!-- 给title具名插槽传递内容 -->
                发现频道         
            </template>
            <template v-slot:icon>
                  >         
            </template>
        </TitleMenu>  
    </div>
      
  </div>
</template>

  <!-- 这样就达到了 外层的组件,控制能否使用内部组件的样式 -->
  <!-- 必须用:(bind), 否则就代表字符串,而不能解析为js的true -->
// <div style="width: 100px; height: 60px; border: 1px solid">
//       <!-- 这样就达到了 外层的组件,控制能否使用内部组件的样式 -->
//       <!-- 必须用:(bind), 否则就代表字符串,而不能解析为js的true -->
//       <Item :isActive="curActive === 'dongman'" @active="curActive = 'dongman'"
//         >动漫</Item
//       >
//     </div>

//     <div style="width: 100px; height: 60px; border: 1px solid">
//       <Item :isActive="curActive === 'keji'" @active="curActive = 'keji'"
//         >科技</Item
//       >
//     </div>


<script>
// 一种思想, 数据是父组件的,由父组件传给子组件,
//而事件要子组件通知父组件,然后父组件再改变数据,致使重新渲染

// import Item from "./components/Item";
import TitleMenu from "./components/TitleMenu";
export default {
  components: {
    // Item,
    TitleMenu,
  }, // data(){ //   return { //     curActive: "dianjing", //   } // },
  data() {
    return {
      select: false,
    };
  },
};
</script>
