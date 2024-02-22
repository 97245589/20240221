/**
* 左边菜单
*/ 
<template>
  <el-menu default-active="1" :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened
    class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#ffd04b">
    <el-menu-item-group>
      <el-menu-item v-for="menu in allmenu" :key="menu.menuid" :index="'/' + menu.url">
        <span>{{ menu.menuname }}</span>
      </el-menu-item>
    </el-menu-item-group>
  </el-menu>
</template>
<script>
export default {
  name: "leftnav",
  data() {
    return {
      collapsed: false,
      allmenu: [],
    };
  },
  // 创建完毕状态(里面是操作)
  created() {
    this.allmenu = [];
    this.allmenu.push({
      menuid: 1,
      menuname: "Director",
      url: "director"
    })
    this.allmenu.push({
      menuid: 2,
      menuname: "Ingredient Analyse",
      url: "ingredient",
    })
    this.allmenu.push({
      menuid: 3,
      menuname: "Schedule",
      url: "schedule",
    })
    this.allmenu.push({
      menuid: 4,
      menuname: "ShowSchedule",
      url: "showschedule"
    })
  },
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}

.logobox {
  height: 40px;
  line-height: 40px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: center;
  padding: 20px 0px;
}

.logoimg {
  height: 40px;
}
</style>