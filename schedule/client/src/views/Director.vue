<template>
  <el-container>
    <el-header>
      <el-button type="primary" @click="add_director">add</el-button>
      <el-button type="primary" @click="submit">submit</el-button>
    </el-header>
    <el-main>
      <el-table :data="table_data" stripe style="width: 100%" border height="600">
        <el-table-column label="Delete" width="100">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">delete</el-button>
          </template>
        </el-table-column>
        <el-table-column label="Name">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
class Director {
  constructor() {
    this.name = ""
  }
}

import { submitDirectorReq, getDirectorReq } from '../api/req'
export default {
  data() {
    return {
      table_data: []
    }
  },

  created() {
    getDirectorReq().then((res) => {
      console.log("getDirectorReq", res, res.table_data)
      this.table_data = res.table_data || []
    })
  },

  methods: {
    add_director() {
      this.table_data.push(new Director())
    },
    del(index, row) {
      this.table_data.splice(index, 1)
    },
    submit() {
      console.log("submit director", this.table_data)
      submitDirectorReq({
        table_data: this.table_data
      })
    }
  }

}
</script>