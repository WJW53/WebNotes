<template>
  <div>
    <div class="channel-list" :style="{
        height: height,//计算属性
    }">
      <div
        v-for="item in channels"
        :key="item.id"
        class="item"
        :style="{
          width: `${100 / columns}%`,
        }"
      >
        <Channel
          @active="$emit('active', item.id)"
          :isActive="item.id === activeId"
          :data="item"
        />
      </div>
    </div>

    <div class="collapse" @click="isExpand = !isExpand">
      <span>{{ isExpand ? "收起" : "展开" }}</span>
      <!-- <i
        class="iconfont"
        :class="isExpand ? 'iconshangjiantou' : 'iconxiajiantou_huaban'"
      ></i> -->
      <Icon :type="isExpand ? 'arrowUp' : 'arrowDown'" extraClass="icon" />
    </div>
  </div>
</template>

<script>
import Channel from "./Channel";
import channelServ from "../services/channel";
import Icon from "./Icon"



export default {
  components: {
    Channel,
    Icon,
  },
  props: {
    activeId: {
      type: Number,
      required: true,
    },
    columns: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      channels: [
        // { id: 0, name: "全部", channel_count: "1177" },
        // { id: 0, name: "动漫", channel_count: "226" },
      ],
      isExpand: false, //是否是展开状态,默认是收起状态
    };
  },
  computed: {
    height() {
      var rows = 3; //默认3行
      if (this.isExpand) {
        //展开时
        //高度
        // console.log(this.channels.length);
        rows = Math.ceil(this.channels.length / this.columns);
      }
      return rows * 40 + "px";
    },
  },
  async created() {
    var datas = await channelServ.getChannels();
    this.channels = datas.filter((item) => item.name !== "热门");
  },
};
</script>

<style scoped>


.channel-list {
  overflow: hidden;
  transition: 0.5s;
}
.item {
  float: left;
}
.collapse {
  clear: both;
  text-align: center;
  height: 40px;
  line-height: 40px;
  color: #999;
  font-size: 14px;
  cursor: pointer;
  border-bottom:1px solid #e7e7e7;
}
.icon {
  font-size: 12px;
  margin-left: 5px;
}
</style>