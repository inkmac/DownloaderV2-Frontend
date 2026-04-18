<template>
  <div class="contact-author">
    <span class="label-title" v-text="title"></span>

    <el-tooltip
        :content="url"
        placement="top"
        :show-after="200"
    >
      <el-link
          class="path-link"
          underline="never"
          @click="openMail(url)"
      >
        <span class="path-text">{{ label }}</span>
      </el-link>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import request from "@/api";
import { ElMessage } from "element-plus";

interface Props {
  title: string;
  url: string;    // 实际跳转链接 mailto:xxx
  label: string;
}

defineProps<Props>()

interface Props {}

interface OpenMailResponse {
  status: 'success' | 'error';
  message: string;
}

const openMail = async (url: string) => {
  const res: OpenMailResponse = await request.post('/open-mail', {
    url: url,
  })

  if (res.status === 'error') {
    ElMessage.warning(res.message)
  }
}
</script>

<style scoped>
.contact-author {
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  line-height: 1;
}

.label-title {
  color: var(--el-text-color-secondary);
  margin-right: 6px;
  font-weight: 500;
}

.path-link {
  font-size: 13px;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: var(--el-fill-color-lighter);
  transition: all 0.2s ease;
}

.path-text {
  color: var(--el-color-primary);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  border-bottom: 1px solid transparent;
}

.path-link:hover {
  background-color: var(--el-color-primary-light-9);
}

.path-link:hover .path-text {
  color: var(--el-color-primary-dark-2);
  border-bottom-color: var(--el-color-primary-light-3);
}
</style>