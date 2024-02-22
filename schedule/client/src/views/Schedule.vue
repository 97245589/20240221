<template>
  <el-container>
    <el-header>
      <el-select v-model="director_name" placeholder="director" @change="director_change()">
        <el-option v-for="item in directors" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <!-- <el-button type="primary" @click="agree()">agree
      </el-button> -->
    </el-header>
    <el-main>
      <el-form :inline="true" class="demo-form-inline">
        <el-select v-model="status">
          <el-option label="unfinished" key="unfinished" value="unfinished"></el-option>
          <el-option label="finished" key="finished" value="finished"></el-option>
          <el-option label="checked" key="checked" value="checked"></el-option>
        </el-select>
        <el-button type="primary" @click="newEmployee()">add
        </el-button>
        <el-button type="primary" @click="submitInfo()">submit
        </el-button>
        <el-button type="primary" @click="calculate_all()">workingHours
        </el-button>
      </el-form>
      <el-table :data="table_data" stripe style="width: 100%" border height="600">
        <el-table-column label="Delete" width="100">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">delete</el-button>
          </template>
        </el-table-column>
        <el-table-column label="WorkingHours" width="150">
          <template slot-scope="scope">
            <el-input v-model="scope.row.time" :placeholder="scope.row.time"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="Name">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" :placeholder="scope.row.name"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="Mon">
          <template slot-scope="scope">
            <el-time-picker v-model="scope.row.mon_st" :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"> </el-time-picker>
            <el-time-picker v-model="scope.row.mon_et" :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"> </el-time-picker>
          </template>
        </el-table-column>

        <el-table-column label="Tues">
          <template slot-scope="scope">
            <el-time-picker v-model="scope.row.tues_st" :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"> </el-time-picker>
            <el-time-picker v-model="scope.row.tues_et" :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"> </el-time-picker>
          </template>
        </el-table-column>

        <el-table-column label="Wed">
          <template slot-scope="scope">
            <el-time-picker v-model="scope.row.wed_st" :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"> </el-time-picker>
            <el-time-picker v-model="scope.row.wed_et" :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"> </el-time-picker>
          </template>
        </el-table-column>

        <el-table-column label="Thur">
          <template slot-scope="scope">
            <el-time-picker v-model="scope.row.thur_st" :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"> </el-time-picker>
            <el-time-picker v-model="scope.row.thur_et" :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"> </el-time-picker>
          </template>
        </el-table-column>

        <el-table-column label="Fri">
          <template slot-scope="scope">
            <el-time-picker v-model="scope.row.fri_st" :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"> </el-time-picker>
            <el-time-picker v-model="scope.row.fri_et" :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"> </el-time-picker>
          </template>
        </el-table-column>

        <el-table-column label="Sat">
          <template slot-scope="scope">
            <el-time-picker v-model="scope.row.sat_st" :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"> </el-time-picker>
            <el-time-picker v-model="scope.row.sat_et" :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"> </el-time-picker>
          </template>
        </el-table-column>

        <el-table-column label="Sun">
          <template slot-scope="scope">
            <el-time-picker v-model="scope.row.sun_st" :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"> </el-time-picker>
            <el-time-picker v-model="scope.row.sun_et" :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"> </el-time-picker>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import { scheduleReq, getScheduleReq, getDirectorReq } from '../api/req'
class Date_data {
  constructor() {
    this.name = ''
    this.time = 0
    this.mon_st = this.dayStart()
    this.mon_et = this.dayStart()
    this.tues_st = this.dayStart()
    this.tues_et = this.dayStart()
    this.wed_st = this.dayStart()
    this.wed_et = this.dayStart()
    this.thur_st = this.dayStart()
    this.thur_et = this.dayStart()
    this.fri_st = this.dayStart()
    this.fri_et = this.dayStart()
    this.sat_st = this.dayStart()
    this.sat_et = this.dayStart()
    this.sun_st = this.dayStart()
    this.sun_et = this.dayStart()
  }

  convert(obj) {
    var arr = ['mon', 'tues', 'wed', 'thur', 'fri', 'sat', 'sun']
    for (w of arr) {
      var st = w + '_st'
      var et = w + '_et'
      obj[st] = new Date(obj[st])
      obj[et] = new Date(obj[et])
    }
    return obj
  }

  dayStart() {
    var d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }
}

export default {
  data() {
    return {
      status: '',
      director_name: "",
      table_data: [],
      directors: []
    }
  },
  created() {
    getDirectorReq().then((res) => {
      console.log("getDirectorReq", res.table_data)
      var directors = []
      for (var v of res.table_data) {
        directors.push(v.name)
      }
      this.directors = directors
    })
    /*
    getScheduleReq().then((res) => {
      console.log(JSON.stringify(res, null, 2))
      this.table_data = res || []
    })
    */
  },
  methods: {
    handleDelete(index, row) {
      this.table_data.splice(index, 1)
    },
    newEmployee() {
      this.table_data.push(new Date_data())
    },
    submitInfo() {
      // for (var i = this.table_data.length - 1; i >= 0; --i) { 
      //   var data = this.table_data[i]
      //}
      if (!this.director_name) return
      scheduleReq({
        table_data: this.table_data,
        director_name: this.director_name,
        status: this.status
      })
    },
    calculate_all() {
      for (var data of this.table_data) {
        data.time = 0
        data.time += new Date(data.mon_et).getTime() - new Date(data.mon_st).getTime()
        data.time += new Date(data.tues_et).getTime() - new Date(data.tues_st).getTime()
        data.time += new Date(data.wed_et).getTime() - new Date(data.wed_st).getTime()
        data.time += new Date(data.thur_et).getTime() - new Date(data.thur_st).getTime()
        data.time += new Date(data.fri_et).getTime() - new Date(data.fri_st).getTime()
        data.time += new Date(data.sat_et).getTime() - new Date(data.sat_st).getTime()
        data.time += new Date(data.sun_et).getTime() - new Date(data.sun_st).getTime()
        data.time /= 3600000
      }
    },
    director_change() {
      console.log("director change", this.director_name)
      getScheduleReq({ director_name: this.director_name }).then((res) => {
        console.log("schedulereq", res, res.table_data)
        this.table_data = res.table_data || []
        this.status = res.status || ''
      })
    }
  },
}
</script>