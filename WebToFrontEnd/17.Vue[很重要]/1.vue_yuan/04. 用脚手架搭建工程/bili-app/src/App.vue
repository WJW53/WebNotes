<template>
  <Channel />
</template>



<script>
// 一种思想, 数据是父组件的,由父组件传给子组件,
//而事件要子组件通知父组件,然后父组件再改变数据,致使重新渲染

// import Item from "./components/Item";

// import TitleMenu from "./components/TitleMenu";
// import ChannelList from "./components/ChannelList";
// import ChannelSearch from "./components/ChannelSearch";

import Channel from "./pages/Channel";


export default {
  components: {
    Channel,
  },
};
</script>
