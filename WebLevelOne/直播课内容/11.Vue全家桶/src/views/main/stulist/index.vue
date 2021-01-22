<template>
  <div id="student-list">
    <stu-table></stu-table>
    <transition>
      <show-modal v-if="show"></show-modal>
    </transition>
    <turn-page
    :totalPage="totalPage"
    :nowPage="nowPage"
    @current-page="cpage"
    ></turn-page>
  </div>
</template>

<script>
import stuTable from '@/components/stulist/stuTable.vue';
import turnPage from '@/components/stulist/turnPage.vue';
import showModal from '@/components/stulist/showModal.vue';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    stuTable,
    turnPage,
    showModal,
  },
  methods: {
    ...mapActions(['getStuList']),
    cpage(i) {
      this.getStuList(i);
    },
  },
  created() {
    this.getStuList(1);
  },
  computed: {
    ...mapState(['show', 'nowPage', 'totalPage']),
  },
};
</script>

<style>
.v-enter {
  top: -100%;
  opacity: 0;
}
.v-enter-to {
  top: 0;
  opacity: 1;
}
.v-leave {
  top: 0;
  opacity: 1;
}
.v-leave-to {
  top: -100%;
  opacity: 0;
}

.v-enter-active, .v-leave-active {
  transition: all .5s;
}
</style>
