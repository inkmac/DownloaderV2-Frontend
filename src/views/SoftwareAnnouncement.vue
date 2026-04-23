<template>
  <div class="announce-container">
    <el-card class="announce-card" shadow="never">
      <template #header>
        <div class="card-header">
          <el-icon><InfoFilled /></el-icon>
          <span>{{ $t('info.title') }}</span>
        </div>
      </template>

      <div class="content">
        <section>
          <h3>{{ $t('info.intent.title') }}</h3>
          <p>
            <i18n-t keypath="info.intent.content" tag="span">
              <template #bold>
                <strong>yt-dlp</strong>
              </template>
            </i18n-t>
          </p>
        </section>

        <section>
          <h3>{{ $t('info.repo.title') }}</h3>
          <div class="repo-links">
            <p>
              {{ $t('info.repo.frontend') }}
              <el-link type="primary" @click="handleOpenUri(frontendUrl)">{{ frontendUrl }}</el-link>
            </p>
            <p>
              {{ $t('info.repo.backend') }}
              <el-link type="primary" @click="handleOpenUri(backendUrl)">{{ backendUrl }}</el-link>
            </p>
          </div>
        </section>

        <section class="disclaimer">
          <h3>{{ $t('info.disclaimer.title') }}</h3>
          <ul>
            <li>
              <strong>{{ $t('info.disclaimer.illegal.label') }}</strong>
              {{ $t('info.disclaimer.illegal.content') }}
            </li>
            <li>
              <strong>{{ $t('info.disclaimer.copyright.label') }}</strong>
              {{ $t('info.disclaimer.copyright.content') }}
            </li>
            <li>
              <strong>{{ $t('info.disclaimer.tech.label') }}</strong>
              {{ $t('info.disclaimer.tech.content') }}
            </li>
          </ul>
        </section>

        <div class="footer-info">
          <span class="author-tag">{{ $t('info.footer.maintained') }}</span>
          <span class="divider">|</span>
          <el-link @click="handleOpenUri(issues)">{{ $t('info.footer.report') }}</el-link>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { InfoFilled } from '@element-plus/icons-vue'
import { openUri } from "@/api/system.ts";
import { ElMessage } from "element-plus";

const frontendUrl = 'https://github.com/inkmac/DownloaderV2-Frontend'
const backendUrl = 'https://github.com/inkmac/DownloaderV2-Backend'
const issues = 'https://github.com/inkmac/DownloaderV2-Frontend/issues'

const handleOpenUri = async (uri: string) => {
  const res = await openUri(uri);

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