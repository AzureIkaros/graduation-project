<template>
  <main>
    <el-input v-model="url" placeholder="请输入爬取的网址" @input="changeUrl"></el-input>
    <el-input v-model="keyword" placeholder="请输入爬取的关键字" @input="changeKeyW"></el-input>
    <el-input v-model="table_name" placeholder="请输入创建的表名" @input="changeTableN"></el-input>
    <div class="tError">{{ table_error }}</div>
    <div class="inputNum">
      <el-input-number v-model="num" :min="100" :max="4000" label="描述文字" :disabled="num_can_use"></el-input-number>
    </div>
    <div class="select">
      <el-radio-group v-model="radio" @change="setNum">
        <el-radio label="noLimit" border :disabled="radio_flag">无限制爬取网页数</el-radio>
        <el-radio label="limit" border :disabled="radio_flag">设置爬取网页数</el-radio>
      </el-radio-group>
    </div>
    <p>状态:{{ getStateFlag() }}</p>
    <div>
      <el-button type="primary" :disabled="getStartFlag" @click="start">开始</el-button>
      <el-button :type="getType" :disabled="stop_flag" @click="stop">{{ getStopTitle }}</el-button>
      <el-button type="danger" :disabled="stop_flag" @click="end">结束</el-button>
    </div>
  </main>
</template>

<script>
import {
  getSpiderInfo,
  setSpiderInfo,
  endSpider,
  stopSpider
} from "../../../api";
export default {
  data() {
    return {
      url: "",
      keyword: "",
      table_name: "",

      start_flag: false, //开始按钮
      stop_flag: true, //暂停按钮
      end_flag: true, //结束按钮
      state_flag: 0, //当前状态信息
      radio_flag: false,
      type_flag: true,

      radio: "noLimit",
      num: 0,

      url_flag: true,
      keyword_flag: true,
      tableName_flag: true,
      num_can_use: true,
      table_error: ""
    };
  },
  async created() {
    let result = await getSpiderInfo();
    if (result.data.error === 5) {
      this.$router.push({ name: "login" });
      return;
    }
    let data = result.data;

    this.url = data.url;
    this.keyword = data.keyword;
    this.table_name = data.table_name;

    this.start_flag = data.start_flag;
    this.stop_flag = data.stop_flag;
    this.end_flag = data.end_flag;
    this.state_flag = data.state_flag;
    this.radio_flag = data.radio_flag;
  },
  computed: {
    getStateFlag() {
      return () => {
        switch (this.state_flag) {
          case 0:
            return "爬虫尚未开始工作";
          case 1:
            return "爬虫正在工作";
          case 2:
            return "爬虫暂停工作";
          case 3:
            return "爬虫停止工作";
        }
      };
    },
    getType() {
      return this.type_flag ? "warning" : "info";
    },
    getStopTitle() {
      return this.type_flag ? "暂停" : "继续";
    },
    getStartFlag() {
      return (
        this.url_flag ||
        this.keyword_flag ||
        this.tableName_flag ||
        !(this.state_flag == 0)
      );
    }
  },
  methods: {
    setNum() {
      this.num_can_use = this.radio == "limit" ? false : true;
    },
    changeUrl() {
      this.url_flag = this.url == "" ? true : false;
    },
    changeKeyW() {
      this.keyword_flag = this.keyword == "" ? true : false;
    },
    changeTableN() {
      let reg = /^[a-zA-z0-9]{2,16}$/g;
      if (this.table_name != "") {
        this.table_error = reg.test(this.table_name)
          ? ""
          : "表名要求为字母或字母,必须字母开头,长度至少两位,最大16位";
        reg.test(this.table_name);
        this.tableName_flag = reg.test(this.table_name) ? false : true;
      } else {
        this.table_error = "";
        this.tableName_flag = true;
      }
    },
    async start() {
      if (confirm("你确定要开始吗?")) {
        let result = await setSpiderInfo({
          url: this.url,
          keyword: this.keyword,
          table_name: this.table_name,
          num: this.num_can_use ? 0 : this.num
        });
        if (result.data.error === 5) {
          this.$router.push({ name: "login" });
          return;
        }
        if (result.data.error == 0) {
          window.history.go();
        } else if (result.data.error == 2) {
          alert("服务器错误,请尽快联系管理员");
        } else {
          alert("您输入的表名已存在,请重新输入");
        }
      }
    },
    stop() {
      if (confirm(`是否${this.type_flag ? "暂停" : "继续"}`)) {
        this.type_flag = !this.type_flag;
        let result = stopSpider();
        if (result.data && result.data.error === 5) {
          this.$router.push({ name: "login" });
          return;
        }
      }
    },
    end() {
      if (confirm("你确定要结束吗")) {
        let result = endSpider();
        if (result.data && result.data.error === 5) {
          this.$router.push({ name: "login" });
          return;
        }
        window.location.reload();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  width: 600px;
  margin: 20vh auto;
  .el-input {
    width: 350px;
    margin: 10px 0;
  }
  p {
    margin: 10px 0;
    text-align: left;
    font-size: 12px;
    text-indent: 125px;
  }
  .el-button {
    margin: 10px 20px;
  }
  .select {
    margin: 20px 0 10px 0px;
  }
  .inputNum {
    text-align: left;
    margin-left: 125px;
  }
  .tError {
    text-align: left;
    text-indent: 125px;
    font-size: 12px;
    height: 25px;
  }
}
</style>