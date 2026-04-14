<template>
  <div class="download-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span class="header-title">视频下载器</span>
        </div>
      </template>

      <el-form label-position="top">
        <el-form-item>
          <template #label>
            <div style="display: flex; align-items: center;">
              <span>视频 URL</span>
              <el-tooltip content="点击查看当前支持的网站" placement="top">
                <el-icon
                    @click="dialogVisible = true"
                    class="info-icon"
                >
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </template>

          <el-input
              v-model="videoUrl"
              placeholder="请输入视频链接 (例如: https://www.bilibili.com/video/...)"
              clearable
          />
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="视频流 (Video)">
              <el-select v-model="selectedVideo" placeholder="选择视频分辨率" class="full-width">
                <el-option
                    v-for="item in videoFormats"
                    :key="item.id"
                    :label="`id: ${item.id} | ${item.res}P | ${item.ext} | ${item.fps}fps | ${item.filesize} | ${item.vbr}kbps`"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="音频流 (Audio)">
              <el-select v-model="selectedAudio" placeholder="选择音质" class="full-width">
                <el-option
                    v-for="item in audioFormats"
                    :key="item.id"
                    :label="`id: ${item.id} | ${item.ext} | ${item.filesize} | ${item.abr}kbps`"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="action-buttons">
          <el-button
              type="primary"
              size="large"
              :disabled="!videoUrl || loading"
              @click="handleFetchFormats"
          >
            解析可用格式
          </el-button>
          <el-button
              type="success"
              size="large"
              :disabled="!videoUrl || loading"
              @click="handleDownload"
          >
            立即下载
          </el-button>
        </div>

        <div class="terminal-wrapper">
          <div class="terminal-header">控制台输出</div>
          <el-input
              v-model="terminalLog"
              type="textarea"
              :rows="12"
              readonly
              resize="none"
              class="custom-terminal"
          />
        </div>
      </el-form>
    </el-card>
  </div>

  <el-dialog
      v-model="dialogVisible"
      title="支持的网站列表"
      width="30%"
  >
    <div class="sites-container">
      <el-tag
          v-for="site in supportedWebsites"
          :key="site"
          class="site-tag"
          effect="plain"
          round
      >
        {{ site }}
      </el-tag>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">了解了</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage } from "element-plus";
import { QuestionFilled } from '@element-plus/icons-vue'
import request from "@/api/index.js";

const supportedWebsites = ref<string[]>([])
const dialogVisible = ref(false)
const videoUrl = ref('')
const selectedVideo = ref('')
const selectedAudio = ref('')
const terminalLog = ref('等待任务开始...\n')
const loading = ref(false)

// 模拟格式数据（后续通过 Python 后端获取）
interface VideoFormatDetail {
  id: string;        // 格式 ID (e.g., '137')
  ext: string;       // 扩展名 (e.g., 'mp4')
  filesize: string;  // 已格式化的文件大小 (e.g., '45.2MB')

  res: number;       // 分辨率高度 (e.g., 1080)
  fps: number;       // 帧率 (e.g., 30.0)
  vbr: number;       // 视频码率 (e.g., 128.1)
  vcodec: string;    // 视频编码器 (e.g., 'avc1.640028')
}

interface AudioFormatDetail {
  id: string;        // 格式 ID (e.g., '140')
  ext: string;       // 扩展名 (e.g., 'm4a')
  filesize: string;  // 已格式化的文件大小 (e.g., '1.2MB')

  abr: number;       // 音频平均码率 (e.g., 128.1)
  acodec: string;    // 音频编码器 (e.g., 'mp4a.40.2')
}

interface FetchVideoFormatResponse {
  status: 'success' | 'error';
  message: string;
  videoFormats: VideoFormatDetail[];
  audioFormats: AudioFormatDetail[];
}

interface DownloadVideoResponse {
  status: 'success' | 'error';
  message: string;
}

interface GetSupportedWebsitesResponse {
  status: 'success' | 'error';
  websites: string[];
  message: string;
}

const videoFormats = ref<VideoFormatDetail[]>([])
const audioFormats = ref<AudioFormatDetail[]>([])

onMounted(async () => {
  const res: GetSupportedWebsitesResponse = await request.get("/get-supported-websites");

  if (res.status === 'success') {
    supportedWebsites.value = res.websites;
  }
})

// 逻辑函数
const handleFetchFormats = async () => {
  if (!videoUrl.value) return ElMessage.warning('请先输入 URL')

  loading.value = true
  terminalLog.value = `[START] 开始解析: ${videoUrl.value}\n`

  // 直接使用 request.post
  const res: FetchVideoFormatResponse = await request.post('/get-available-formats', {
    url: videoUrl.value
  })

  if (res.status === 'success') {
    videoFormats.value = res.videoFormats
    audioFormats.value = res.audioFormats

    terminalLog.value += res.message
  } else {
    terminalLog.value += res.message
  }

  loading.value = false
}

const handleDownload = async () => {
  if (!selectedVideo.value || !selectedAudio.value) {
    return ElMessage.warning('请先选择视频和音频格式')
  }

  const combinedFmtId = [selectedVideo.value, selectedAudio.value]
      .filter(id => id)
      .join('+')

  loading.value = true
  terminalLog.value = `[START] 开始下载，格式 ID: ${combinedFmtId}...\n`

  // 1. 发起下载任务
  const res: DownloadVideoResponse = await request.post('/download-video', {
    url: videoUrl.value,
    formatId: combinedFmtId
  })
  terminalLog.value += res.message
  loading.value = false
}
</script>

<style scoped>
.download-container {
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

.full-width {
  width: 100%;
}

.action-buttons {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}

.terminal-wrapper {
  margin-top: 25px;
}

.terminal-header {
  font-size: 13px;
  color: #909399;
  margin-bottom: 8px;
  padding-left: 5px;
}

.custom-terminal :deep(.el-textarea__inner) {
  background-color: #1e1e1e;
  color: #a9b7c6;
  font-family: "JetBrains Mono", monospace;
  font-size: 13px;
  line-height: 1.5;
  border: none;
}

.info-icon {
  margin-left: 6px;
  cursor: pointer;
  color: #67c23a; /* 使用成功色（绿色）表示支持情况 */
  transition: transform 0.2s;
}

.info-icon:hover {
  transform: scale(1.2);
}

.site-tag {
  margin: 5px 5px 0 0;
  font-weight: bold;
  text-transform: capitalize;
}
</style>