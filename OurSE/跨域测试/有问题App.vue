<template>
  <div class="box">
    <!-- tab-1  当前图片预览-->
    <div class="tab" v-show="tabIndex == 0">
      <!-- 当前图片预览位置 -->
      <img src alt class="previewImg" />

      <!-- 选择上传文件 -->
      <input
        type="file"
        ref="file"
        style="opacity: 0; width: 100%"
        @change="getfile()"
        accept="image/*"
      />
      <!-- 用来展示的为上传btn -->
      <button class="btn">选择图片</button>

      <button class="myok" @click="confirm()">确定</button>
    </div>

    <!-- tab-2 多图预览 -->
    <div class="tab two" v-show="tabIndex == 1">
      <div
        class="imgbox smpreview"
        v-for="(item, index) in filesImgArr"
        :key="index"
      >
        <span class="delimg" @click="delimg(index)">×</span>
        <img :src="item" alt class="smimg" />
      </div>
      <button
        @click="
          'submit';

        "
      >
        上传
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "App2",
  data() {
    return {
      tabIndex: 0,
      files: "", //当前被选择的文件
      filesImgArr: [], //待上传图片预览Arr
      filesArr: [], //待上传图片文件信息Arr
    };
  },
  methods: {
    //实现当前图片预览
    getfile() {
      //获取文件信息
      this.files = this.$refs.file.files[0];
      if (this.files) {
        let reader = new FileReader(); //调用FileReader
        reader.readAsDataURL(files); //将文件读取为 DataURL(base64)
        reader.onload = function (evt) {
          $(".previewImg").attr("src", evt.target.result); //将img标签的src绑定为DataURL
        };
      } else {
        alert("上传失败");
      }
    },
    //点击确定加入待上传列表
    confirm() {
      this.filesArr.push(this.files); //文件信息存入待上传文件Arr
      let _this = this;
      let reader = new FileReader(); //调用FileReader
      reader.readAsDataURL(this.files); //将文件读取为 DataURL(base64)
      reader.onload = function (evt) {
        _this.filesImgArr.push(evt.target.result); //存入待上传图片预览Arr
      };
      $(".previewImg").attr("src", ""); //当前选择图片src清空
      this.files = ""; //当前文件信息清空
      this.tabIndex = 1;
    },
    //点击上传
    submit() {
      let formData = new FormData();
      formData.append("username", "test"); //
      formData.append("id_number", "123456");
      for (let i = 0; i < this.filesArr.length; i++) {
        //多图上传
        formData.append("imgarr[]", this.filesArr[i]);
      }
      this.updataAPI(formData);
    },
    updataAPI(data) {
      //请求API上传
      console.log(this);
      this.$axios
        .post("http://29s13l8324.wicp.vip/up_photo", data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
