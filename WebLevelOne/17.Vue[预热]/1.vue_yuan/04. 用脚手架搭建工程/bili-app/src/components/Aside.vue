<template>
<!--   可以更改width,和columns的值,组件做了处理的 -->
    <div class="aside">

        <ChannelSearch />
      
        <TitleMenu :isActive="activeId === 100" @active="activeId = 100">
            <template v-slot:title>发现频道</template>
            <template v-slot:icon>></template>
        </TitleMenu>  

        <ChannelList
            :columns="2"
            :activeId="activeId"
            @active="activeId = $event"
        >
      </ChannelList>

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
import TitleMenu from "./TitleMenu";
import ChannelList from "./ChannelList";
import ChannelSearch from "./ChannelSearch";



export default {
  components: {
    // Item,
    TitleMenu,
    ChannelList,
    ChannelSearch,
  },
  data() {
    return {
      select: false,
      activeId: 100, //默认是热门,也就是发现频道
    };
  },
};
</script>

<style scoped>
.aside{
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>
