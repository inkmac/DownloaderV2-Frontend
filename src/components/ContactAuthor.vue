<template>
  <div class="contact-author">
    <span class="label-title" v-text="title"></span>

    <el-tooltip
        :content="uri"
        placement="top"
        :show-after="200"
    >
      <el-link
          class="path-link"
          underline="never"
          @click="handleOpenUri(uri)"
      >
        <span class="path-text">{{ label }}</span>
      </el-link>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { openUri } from "@/api/system.ts";

interface Props {
  title: string;
  uri: string;
  label: string;
}

defineProps<Props>()

const handleOpenUri = async (uri: string) => {
  const res = await openUri(uri);

  if (res.status === 'error') {
    ElMessage.warning(res.message);
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