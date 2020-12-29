<template>
  <Pager
    v-if="!dataChanged"
    ref="pager"
    :pageSize="pageSize"
    :page="curPage"
    :total="total"
    @setPage="gotoPage"
    @setRowNum="changeRowNum"
  />
</template>

<script>
import Pager from "@/components/Pager";
export default {
  data() {
    return {
      curPage: 1, //当前页
      total: 0, //总共页数
      pageSize: 20, //每页记录数
      dataChanged: false,
    };
  },
  components: {
    Pager: Pager,
  },
  methods: {
    refresh() {
      //用于刷新组件，需手动调用
      this.dataChanged = true;
      this.$nextTick(() => {
        this.dataChanged = false;
      });
    },
    gotoPage(page) {

    },
    changeRowNum(pageSize) {
        
    },
  },
};
</script>