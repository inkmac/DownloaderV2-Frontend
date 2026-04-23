<template>
  <div class="cookie-container">
    <SettingsButton class="settings-button" @click="showSettingsDialog = true"/>
    <SettingsDialog v-model="showSettingsDialog"></SettingsDialog>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span class="header-title">{{ $t('cookie.title') }}</span>
        </div>
      </template>

      <el-form label-position="top">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('cookie.browser')">
              <el-select v-model="form.browser" :placeholder="$t('cookie.browserPlaceholder')" class="full-width">
                <el-option label="Chrome" value="chrome" />
                <el-option label="Edge" value="edge" />
                <el-option label="Firefox" value="firefox" />
                <el-option label="Safari" value="safari" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item :label="$t('cookie.website')">
              <el-select v-model="form.website" :placeholder="$t('cookie.websitePlaceholder')" class="full-width">
                <el-option label="Bilibili" value="bilibili" />
                <el-option label="YouTube" value="youtube" />
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
            {{ $t('cookie.start') }}
          </el-button>
        </div>
      </el-form>

      <TerminalConsole :logs="terminalLog" :title="$t('cookie.terminal')"/>

      <ContactAuthor
          title=""
          uri="https://github.com/inkmac/DownloaderV2-Frontend/issues"
          :label="$t('common.reportIssue')"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import request from '@/api'
import TerminalConsole from "@/components/TerminalConsole.vue";
import ContactAuthor from "@/components/ContactAuthor.vue";
import SettingsButton from "@/components/SettingsButton.vue";
import SettingsDialog from "@/views/SettingsDialog.vue";

const { t } = useI18n()

// 定义接口响应类型
interface FetchCookieRes {
  status: 'success' | 'error'
  message: string
}

const showSettingsDialog = ref(false)
const loading = ref(false)
const terminalLog = ref<string[]>([])

const form = reactive({
  browser: 'chrome',
  website: 'bilibili'
})

const handleFetchCookie = async () => {
  loading.value = true

  const initLog = t('cookie.log.fetching', {
    browser: form.browser,
    website: form.website
  })

  terminalLog.value = [initLog]

  const res: FetchCookieRes = await request.post('/fetch-cookie', {
    website: form.website,
    browser: form.browser
  })

  if (res.status === 'success') {
    terminalLog.value.push(res.message)
  } else {
    terminalLog.value.push(res.message)
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

.settings-button {
  position: fixed;
  top: 100px;
  right: 30px;
  z-index: 999;
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
  margin-bottom: 20px;
}
</style>