<template>
  <div class="question-answer">
    <!-- 纵向三栏布局 -->

    <!-- 提问区域 -->
    <div class="question">
      <div class="question-header">
        <span class="iconfont icon-qst">&#xe678;</span>
        <span class="qa-qst-title">提问</span>
        <span class="qa-qst-text">如何提问</span>
      </div>
      <div class="question-title">
        <!-- 记得有那个if判断placeholder -->
        <textarea
          id="question-area"
          class="question-title-area"
          type="text"
          v-model="textAreaVal"
          placeholder="一句话完整的描述你的问题"
        >
                    a 
                </textarea
        >
        <span class="question-title-count">
          <b>{{ textAreaVal.length }}</b>
          /49
        </span>
      </div>
      <div class="title-error-tip" id="error-tip">
        您的提问标题超过49个字，请精简内容，感谢您的配合！
      </div>
      <!-- <div class="question-decription">
        <textarea
          id="question-inp"
          type="text"
          value=""
          placeholder="详细说明问题,以便更好的获得回答(选填)"
        >
                    啊
                </textarea
        >
      </div> -->
      <div class="question-submit">
        <input type="radio" id="anonymous" @click="changeChecked($event)" />
        <label for="anonymous">匿名</label>
        <button type="submit" value="提交" @click="submitQuestion">提交</button>
      </div>
    </div>
    <!-- 回答区域 -->
    <div class="answer">
      <textarea
        name=""
        id="answer-area"
        cols="30"
        rows="10"
        class="answer-text"
        v-model="resAreaVal"
      ></textarea>
    </div>

    <!-- 要跳转的都跳转到百度给的链接里去 -->
    <div class="qa-footer">
      <div class="qa-footer-help">
        <a
          href="http://help.baidu.com/question?prod_id=9&class=337"
          target="_blank"
          class="qa-footer-text"
          >帮助&nbsp;|&nbsp;</a
        >
        <a href="javascript:void(0);" target="_blank" class="qa-footer-text"
          >意见反馈&nbsp;|&nbsp;</a
        >
        <a
          href="http://help.baidu.com/newadd?prod_id=9&category=1"
          target="_blank"
          class="qa-footer-text"
          >投诉举报</a
        >
      </div>
      <div class="qa-footer-others">
        <span class="qa-footer-text">京ICP证030173号-1&nbsp;</span>
        <span class="qa-footer-text">京网文【2013】0934-983号&nbsp;</span>
        <span class="qa-footer-text">©2021Wenhai&nbsp;</span>
        <a
          href="http://www.baidu.com/duty/"
          target="_blank"
          class="qa-footer-text"
          >使用闻海前必读</a
        >
        <a
          href="http://help.baidu.com/question?prod_id=9&class=325&id=2760"
          target="_blank"
          class="qa-footer-text"
          >知道协议</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "question",

  data() {
    return {
      textAreaVal: "",
      resAreaVal: "",
      block: 0,
    };
  },
  watch: {
    textAreaVal() {
      if (this.textAreaVal.length > 49) {
        document.getElementById("error-tip").style.display = "block";
      } else {
        document.getElementById("error-tip").style.display = "none";
        this.resAreaVal = "";
      }
    },
  },
  methods: {
    changeChecked(e) {
      let dom = e.target;
      //   console.log(dom.checked);
      this.block = ++this.block % 2;
      if (dom.checked == true && this.block == 0) {
        //草拟大爷,非得让我上锁？
        dom.checked = false;
      }
    },
    showAnswer() {
      document.getElementById("answer-area").style.display = "block";
    },
    submitQuestion() {
      if (this.textAreaVal.length <= 49 && this.textAreaVal != "") {
        this.$axios
          .get("qna", {
            params: {
              wd: this.textAreaVal,
            },
            timeout: 6000,
          })
          .then((res) => {
            this.resAreaVal = res.data;
            this.showAnswer();
          })
          .catch((error) => {
            // console.log(error);
            this.resAreaVal = "很抱歉，没有为您搜索到结果";
            this.showAnswer();
          });
      }
    },
  },
};
</script>


<style scoped>
:root,body{
  height: 100%;
}
/* qustion-answer */
.question-answer {
  margin-top: 200px;
  margin-left: 600px;
  width: 600px;
  height: 600px;
  display: flex;
  flex-direction: column;
  /* background-color: red; */
}
.question .question-header {
  position: relative;
  width: 100%;
  height: 34px;
  /* background-color: yellow; */
}

.question .iconfont {
  /* position: absolute; */
  display: block;
  color: #33cc75;
  width: 26px;
  height: 26px;
  font-size: 26px;
  padding-top: 4px;
}
.question .qa-qst-title {
  position: absolute;
  top: 0;
  left: 30px;
  font-size: 24px;
  line-height: 34px;
  color: #8296a0;
}
.question .qa-qst-text {
  font-size: 12px;
  color: #26bf68;
  line-height: 12px;
  position: absolute;
  right: 0;
  bottom: 4px;
  cursor: pointer;
}
.question-title {
  position: relative;
  margin-top: 20px;
  border: 1px solid #c6d1d9;
  border-radius: 3px;
  /* background-color: yellow; */
  padding: 15px;
  height: 110px;
  box-sizing: border-box;
}

.answer{
  flex-grow: 1;
}

.question-title:hover,
.answer .answer-text:hover {
  border-color: #26bf68;
}
.question-title .question-title-area {
  width: 100%;
  height: 76px;
  max-height: 76px;
  min-height: 30px;
  color: #333;
  word-break: break-all;
  border: 0;
  overflow: hidden;
  font-size: 23px;
  /* WC,这个resize精髓啊,那个边框被干掉了,而且用户不能拉框了 */
  resize: none;
  outline: none;
}

.question-title .question-title-count {
  position: absolute;
  color: #9eacb6;
  right: 0;
  bottom: 0px;
  font-size: 12px;
  text-align: right;
  height: 14px;
  line-height: 14px;
}

.title-error-tip {
  color: red;
  font-size: 12px;
  height: 14px;
  line-height: 14px;
  padding-top: 10px;
  text-align: right;
  display: none;
}

.question-submit {
  margin-top: 35px;
  padding-left: 420px;
}
.question-submit input {
  display: inline-block;
  vertical-align: -1px;
}
.question-submit input,
.question-submit label {
  font-size: 14px;
  color: #9eadb6;
}

.question-submit button {
  background-image: linear-gradient(90deg, #35d479 0, #2ad4b7 99%);
  border-radius: 4px;
  width: 90px;
  height: 34px;
  padding: 0;
  line-height: 34px;
  border-radius: 4px;
  background: #4aca6d;
  margin-left: 40px;
  border: 0;
  outline: 0;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  font-family: "Microsoft YaHei";
}

.question-submit button:hover {
  color: #f4fef6;
  background: #35b558;
}

.answer {
  /* background-color: yellow; */
  margin-top: 20px;
}

.answer .answer-text {
  width: 100%;
  max-height: 200px;
  color: #333;
  /* background-color: red; */
  word-break: break-all;
  border: 1px solid #c6d1d9;
  overflow: hidden;
  font-size: 23px;
  resize: none;
  outline: none;
  box-sizing: border-box;
  display: none;
}

.qa-footer {
  /* position: absolute; */
  /* background-color: yellow; */
  width: 100%;
  bottom: 15px;
  line-height: 24px;
  color: #77c;
  font: 12px/1.5 arial;
  white-space: nowrap;
  text-align: center;
}
.qa-footer-help {
  margin-bottom: 10px;
}
.qa-footer a {
  /* text-decoration: underline; */
  margin-left: 10px;
  color: #2d64b3;
}
.qa-footer-others span {
  margin-right: 10px;
}
</style>