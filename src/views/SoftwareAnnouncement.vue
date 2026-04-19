<template>
  <div class="announce-container">
    <el-card class="announce-card" shadow="never">
      <template #header>
        <div class="card-header">
          <el-icon><InfoFilled /></el-icon>
          <span>关于软件与开源声明</span>
        </div>
      </template>

      <div class="content">
        <section>
          <h3>项目初衷</h3>
          <p>
            本软件（DownloaderV2）是一个基于 <strong>yt-dlp</strong> 核心开发的 GUI 封装工具，旨在为学术研究及个人学习提供便利。
          </p>
        </section>

        <section>
          <h3>源码托管</h3>
          <div class="repo-links">
            <p>前端：<el-link type="primary" @click="handleOpen(frontendUrl)">{{ frontendUrl }}</el-link></p>
            <p>后端：<el-link type="primary" @click="handleOpen(backendUrl)">{{ backendUrl }}</el-link></p>
          </div>
        </section>

        <section class="disclaimer">
          <h3>免责声明</h3>
          <ul>
            <li><strong>严禁非法分发：</strong> 作者不鼓励、不支持任何形式的非法分发本软件的行为。</li>
            <li><strong>版权合规：</strong> 本工具仅供个人学习及技术交流使用。请勿利用本软件下载、存储或分发受版权保护的内容。用户需自行承担因不当使用导致的法律责任。</li>
            <li><strong>技术归属：</strong> 本软件仅作为 UI 交互层，核心下载功能由开源项目 yt-dlp 提供。</li>
          </ul>
        </section>

        <div class="footer-info">
          <span class="author-tag">Maintained by inkmac</span>
          <span class="divider">|</span>
          <el-link @click="handleOpen(mail)">提交 Bug反馈</el-link>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { InfoFilled } from '@element-plus/icons-vue'
import { openSystem } from "@/api/system.ts";
import { ElMessage } from "element-plus";

const frontendUrl = 'https://github.com/inkmac/DownloaderV2-Frontend'
const backendUrl = 'https://github.com/inkmac/DownloaderV2-Backend'
const mail = 'mailto:wenyuan_zhao@outlook.com'

const handleOpen = async (url: string) => {
  const res = await openSystem(url);

  if (res.status === 'error') {
    ElMessage.warning(res.message);
  }
}
</script>

<style scoped>
.announce-container {
  max-width: 600px;
  margin: 20px auto;
  line-height: 1.6;
}

.announce-card {
  border-radius: 8px;
  border: 1px solid #ebeef5;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  color: #303133;
}

h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #409eff;
  display: flex;
  align-items: center;
}

h3::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 16px;
  background-color: #409eff;
  margin-right: 8px;
  border-radius: 2px;
}

.content p {
  font-size: 14px;
  color: #606266;
  margin-bottom: 12px;
}

.repo-links p {
  margin: 4px 0;
  word-break: break-all;
}

.disclaimer ul {
  padding-left: 18px;
  font-size: 13px;
  color: #909399;
}

.disclaimer li {
  margin-bottom: 8px;
}

.footer-info {
  margin-top: 25px;
  padding-top: 15px;
  border-top: 1px solid #f2f6fc;
  text-align: center;
  font-size: 12px;
  color: #c0c4cc;
}

.author-tag {
  font-style: italic;
}

.divider {
  margin: 0 10px;
}
</style>