<template>
  <el-container>
    <el-header>
      <el-button size="small" type="primary" @click="download">下载文件</el-button>

    </el-header>
    <el-main>
      <el-upload class="upload-demo" action="/upload_file" :before-upload="beforeUpload" :on-success="onSuccess"
        :on-error="onError" :before-remove="beforeRemove" :on-remove="onRemove" :on-progress="onProgress" multiple
        :limit="3" :on-exceed="handleExceed" :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__size">文件大小不能超过2MB</div>
      </el-upload>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    beforeUpload(file) {
      return true
      /*
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
          this.$message.error('上传文件只能是图片格式!');
      }
      if (!isLt2M) {
          this.$message.error('上传文件大小不能超过2MB!');
      }
      return isJPG && isLt2M;
      */
    },
    onSuccess(res) {
      this.$message.success('上传成功');
      console.log(res);
    },
    onError(error, file) {
      this.$message.error(`上传失败：${error}`);
      console.log(error, file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    onRemove(file, fileList) {
      console.log(file, fileList);
      this.$message.warning(`${file.name}已移除`);
    },
    onProgress(event, file, fileList) {
      console.log(file, fileList);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`文件数量超过限制，最多只能上传 ${this.limit} 个文件`);
    },
    download() {
      var a = document.createElement('a')
      a.href = './config.js'
      a.download = 'config.js'
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      a.remove()
    }
  }
}
</script>