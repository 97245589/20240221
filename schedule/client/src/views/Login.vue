<template>
  <div class="login-wrap">
    <el-form
      label-position="left"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <h3 class="title">用户登录</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="ruleForm.username"
          auto-complete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%"
          @click="submitForm('ruleForm')"
          :loading="logining"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { loginReq } from "../api/req";
export default {
  data() {
    return {
      logining: false,
      ruleForm: {
        //username和password默认为空
        username: "",
        password: "",
      },
      //rules前端验证
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.logining = true;
          //this.$router.push({ path: "/index" });
          loginReq(this.ruleForm).then((res) => {
            if (!res.success) {
              this.$message.error("没有权限");
              return;
            } else {
              this.$router.push({ path: "/index" });
            }
          });
        } else {
          this.$message.error("没有权限");
        }
      });
    },
  },
};
</script>

<style>
.login-wrap {
  padding-top: 10%;
}
.login-container {
  border-radius: 10px;
  margin: 0px auto;
  width: 350px;
  padding: 30px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>