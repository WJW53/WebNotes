<template>
  <div class="hello" style="border:1px solid #666">
    <h1>Brother1 component</h1>
    <h2 @click="send">click send onb2</h2>
  </div>
</template>
<script>
export default {
  name: 'Brother1',
  data () {
    return {
      msg: 'Brother1'
    }
  },
  methods: {
    send () {
      this.bus.$emit('onb2', 'from brother1') // 触发Brother2.vue监听的onb2事件
    }
  },
  created () {
    this.bus.$on('onb1', (param) => { // 创建时，进行事件onb1监听
      console.log('receive onb1', param)
    })
  },
  beforeDestroy () {
    this.bus.$off('onb1') // 销毁时，事件onb1监听取消
    console.log('onb1 listener was closed')
  }
}
</script>