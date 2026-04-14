<template>
  <div class="cookie-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span class="header-title">Cookie 提取</span>
        </div>
      </template>

      <el-form label-position="top">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="目标浏览器">
              <el-select v-model="form.browser" placeholder="选择浏览器" class="full-width">
                <el-option label="Chrome" value="chrome" />
                <el-option label="Edge" value="edge" />
                <el-option label="Firefox" value="firefox" />
                <el-option label="Safari" value="safari" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="目标网站">
              <el-select v-model="form.website" placeholder="选择预设网站" class="full-width">
                <el-option label="Bilibili" value="bilibili" />
                <el-option label="Youtube" value="youtube" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="action-bar">
          <el-button
              type="primary"
              size="large"
              :disabled="loading"
              @click="handleFetchCookie"
          >
            开始提取 Cookie
          </el-button>
        </div>
      </el-form>

      <div class="terminal-wrapper">
        <div class="terminal-header">Terminal Output</div>
        <pre class="terminal-body">{{ terminalLog }}</pre>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import request from '@/api'

// 定义接口响应类型
interface FetchCookieRes {
  status: 'success' | 'error'
  message: string
}

const loading = ref(false)
const terminalLog = ref('[IDLE] 等待操作...\n')

const form = reactive({
  browser: 'chrome',
  website: 'bilibili'
})

const handleFetchCookie = async () => {
  loading.value = true
  terminalLog.value = `[INFO] 正在从 ${form.browser} 提取 ${form.website} 的 Cookie...\n`

  const res: FetchCookieRes = await request.post('/fetch-cookie', {
    website: form.website,
    browser: form.browser
  })

  if (res.status === 'success') {
    terminalLog.value += res.message
  } else {
    terminalLog.value += res.message
  }

  loading.value = false
}
</script>

<style scoped>
.cookie-container {
  padding: 30px;
  background-color: #f0f2f5;
  min-height: 100vh;
  font-family: "JetBrains Mono", "PingFang SC", sans-serif;
}

.box-card {
  max-width: 900px;
  margin: 0 auto;
  border-radius: 8px;
}

.header-title {
  font-weight: bold;
  font-size: 1.2rem;
}

.action-bar {
  margin-top: 10px;
  display: flex;
}

/* 保持与 DownloadPage 一致的终端样式 */
.terminal-wrapper {
  margin-top: 20px;
  background-color: #1e1e1e;
  border-radius: 4px;
  border: 1px solid #333;
  overflow: hidden;
}

.terminal-header {
  background-color: #333;
  color: #aaa;
  padding: 5px 10px;
  font-size: 12px;
  font-family: monospace;
}

.terminal-body {
  padding: 15px;
  color: #00ff00;
  font-family: "JetBrains Mono", monospace;
  font-size: 13px;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
}
</style>