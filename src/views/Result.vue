<template>
  <div ref="box">
    <h3 v-if="titleShow">查询到{{resultList.length}}条记录</h3>
    <ul>
      <li v-for="(item) in currentList" :key="item.id" @click="goTo(item)">
        <h4>{{item.title}}</h4>
        <p>{{item.text}}</p>
      </li>
    </ul>
    <footer>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="resultList.length"
        :current-page.sync="currentPage"
        @current-change="prevClick"
        :page-size="20"
        :hide-on-single-page="true"
      ></el-pagination>
    </footer>
  </div>
</template>

<script>
import { search, click } from "../api";
export default {
  data() {
    return {
      resultList: [],
      currentPage: 1,
      currentList: []
    };
  },
  async mounted() {
    if (!this.$route.params.data) {
      let data = await search({
        inputData: window.sessionStorage.getItem("key")
      });
      this.resultList = data.data;
    } else {
      this.resultList = this.$route.params.data;
    }
    this.currentList = this.resultList.slice(0, 20);
  },
  computed: {
    titleShow() {
      return this.currentPage === 1;
    }
  },
  methods: {
    prevClick() {
      this.currentList = this.resultList.slice(
        (this.currentPage - 1) * 20,
        this.currentPage * 20 - 1
      );
      this.$refs.box.scrollTop = 0;
    },
    goTo(item) {
      click(item)
        .then(() => {
          window.open(item.url);
        })
        .catch(() => {
          window.open(item.url);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  height: 100%;
  overflow-y: auto;
  h3 {
    text-align: left;
    margin: 20px 0 0 100px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.4);
  }
  &::-webkit-scrollbar {
    width: 6px;
    height: 3px;
  }
  &::-webkit-scrollbar-thumb {
    width: 6px;
    background: rgb(219, 110, 8);
    border-radius: 6px;
  }
  &::-webkit-scrollbar-track {
    width: 3px;
    background: rgba(255, 255, 255, 0.1);
  }
  ul {
    margin-left: 100px;
    li {
      width: 700px;
      height: 150px;
      overflow: hidden;
      margin: 30px 0;
      cursor: pointer;
      h4 {
        width: 100%;
        text-align: left;
        margin-bottom: 10px;
        text-decoration: underline;
      }
      p {
        width: 100%;
        height: 98px;
        font-size: 12px;
        text-indent: 2em;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 6;
      }
    }
  }
  footer {
    margin: 50px 0 100px;
    display: flex;
    justify-content: left;
    padding: 0 100px;
  }
}
</style>