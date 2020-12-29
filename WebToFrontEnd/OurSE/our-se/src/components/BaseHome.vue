<template>
  <!-- 网页头部 -->

  <div class="se-base-home">
    <!-- logo v-if 最初的页面，还没输入东西的时候，要显示这个logo1
                但总之要一直有下面那个search-box组件，但是下面那个组件的样式却又不一样了
                切换组件的时候 只是样式改变了而已还有位置，位置也能用样式改
            -->
    <!-- <slot> </slot> -->
    <div class="search-logo">
      <!-- <img src="" alt="" class="img-lg"> -->
      <span class="logo-title">闻</span>
      <!-- <span class="iconfont icon-logo">&#xe6a2;</span> -->
      <img src="../assets/images/se-logo.png" alt="闻海" title="闻海一下，速览新闻" />
      <span class="logo-title">海</span>
    </div>
    <!-- v-else -->

    <!-- 搜索部分 -->
    <div class="search-box">
      <!-- 第一排 -->
      <div class="search">
        <span class="search-area">
          <span class="iconfont img-se">&#xe63c;</span>
          <span class="iconfont file-se">&#xe685;</span>
          <span class="iconfont qa-se">&#xe601;</span>
          <input type="text" class="search-text" />

          <!-- 下面三个span文本一开始是隐藏着的 -->
          <span class="img-hover-tip" style="display:none">按图片搜索</span>
          <!-- 点击图片/文件对应的icon之后弹出一个框框，就是选择文件的 -->
          <span class="file-hover-tip" style="display:none">上传文件</span>
          <!-- 我要提问的话就用路由转新的页面 -->
          <span class="qa-hover-tip" style="display:none">我要提问</span>
        </span>
        <span class="submit-box">
          <!-- 点击提交之后,就请求拿到数据,然后动态实时渲染页面. 
                            这也是路由换新的页面哦 -->
          <input type="submit" value="闻海搜索" class="se-btn-sub" />
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>