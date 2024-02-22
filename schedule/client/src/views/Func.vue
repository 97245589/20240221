<template>
  <el-container class="index-con">
    <el-aside class="asideshow">
      <leftnav></leftnav>
    </el-aside>
    <el-container class="main-con">
      <el-main clss="index-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// 导入组件
import leftnav from "../components/leftnav.vue"
export default {
  name: "index",
  data() { return {} },
  // 注册组件
  components: {
    leftnav,
  },
  methods: {},
  created() { },
};
</script>
<style >
.index-con {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.asideshow {
  width: 240px !important;
  height: 100%;
  background-color: #334157;
  margin: 0px;
}

.index-header,
.index-main {
  padding: 0px;
  border-left: 2px solid #333;
}
</style>
  