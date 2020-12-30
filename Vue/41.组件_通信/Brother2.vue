<template>
  <div class="hello" style="border:1px solid #666">
    <h1>Brother2 component</h1>
    <h2 @click="send">click send onb1</h2>
  </div>
</template>
<script>
export default {
  name: 'Brother2',
  data () {
    return {
      msg: 'Brother2'
    }
  },
  methods: {
    send () {
      this.bus.$emit('onb1', 'from brother2') // 触发Brother1.vue监听的onb1事件
    }
  },
  created () {
    this.bus.$on('onb2', (param) => { // 创建时，进行事件onb1监听
      console.log('receive onb2', param)
    })
  },
  beforeDestroy () {
    this.bus.$off('onb2') // 销毁时，事件onb2监听取消
    console.log('onb2 listener was closed')
  }
}
</script>