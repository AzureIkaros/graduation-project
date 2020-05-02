<template>
  <div>
    <template>
      <el-table :data="tableData" style="width: 100%" highlight-current-row>
        <el-table-column type="index" width="100" />
        <el-table-column prop="table_name" label="表名" width="280"></el-table-column>
        <el-table-column prop="title" label="关键词" width="400"></el-table-column>
        <el-table-column width="200" align="right" label="删除">
          <template slot-scope="scope">
            <el-popconfirm
              title="您确定要删除这个表吗?"
              @onConfirm="delTable(scope.row.id,scope.row.table_name)"
            >
              <el-button slot="reference" type="danger">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>


<script>
import { getTable, deleteTable } from "../../../api";
export default {
  data() {
    return {
      tableData: []
    };
  },
  async mounted() {
    let data = await getTable();
    if (data.data.error === 5) {
      this.$router.push({ name: "login" });
      return;
    }
    this.tableData = data.data;
  },
  methods: {
    async delTable(id, table_name) {
      let data = await deleteTable({ id, table_name });
      if (data.data.error === 5) {
        this.$router.push({ name: "login" });
        return;
      }else if(data.data.error === 1){
          alert("发生错误,请尽快告知管理员");
      }else{
          window.location.reload()
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>