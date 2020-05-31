<template>
  <div class="table-item">
    <el-table :data="currentList" style="width: 100%" highlight-current-row>
      <el-table-column prop="id" label="序号" width="100"></el-table-column>
      <el-table-column prop="title" label="标题" width="280"></el-table-column>
      <el-table-column prop="url" label="链接" width="280"></el-table-column>
      <el-table-column prop="title" label="关键词" width="400"></el-table-column>
      <el-table-column width="200" align="right" label="删除">
        <template slot-scope="scope">
          <el-popconfirm
            title="您确定要删除这个表吗?"
            @onConfirm="delTableItem(scope.row.id,scope.row.table_name)"
          >
            <el-button slot="reference" type="danger">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <footer>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="tableList.length"
        :current-page.sync="currentPage"
        @current-change="prevClick"
        :page-size="20"
        :hide-on-single-page="true"
      ></el-pagination>
    </footer>
  </div>
</template>

<script>
import { getTableInfo, delTableInfo } from "../../../api";
export default {
  data() {
    return {
      tableList: [],
      currentPage: 1,
      currentList: []
    };
  },
  async mounted() {
    let data = await getTableInfo({ id: +this.$route.query.id });
    if (data.data.error === 5) {
      this.$router.push({ name: "login" });
      return;
    }
    this.tableList = data.data.data;
    this.currentList = this.tableList.slice(0, 20);
  },
  methods: {
    prevClick() {
      this.currentList = this.tableList.slice(
        (this.currentPage - 1) * 20,
        this.currentPage * 20 - 1
      );
      this.$refs.box.scrollTop = 0;
    },
    async delTableItem(id, table_name) {
      let result = await delTableInfo({ id, table_name });
      if (result.data.status === 0) {
          window.location.reload()
        return;
      }
      if (result.data.error === 5) {
        this.$router.push({ name: "login" });
        return;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.table-item {
  overflow: auto;
  height: 100%;
  tbody {
    tr,
    td {
      display: flex;
    }
  }
  footer {
    margin: 20px 0;
    display: flex;
    justify-content: flex-end;
  }
}
</style>