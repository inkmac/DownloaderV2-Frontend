<template>
  <el-dialog
      v-model="visible"
      title="设置"
      width="700"
  >
    <div class="setting-content">
      <el-form label-position="top">
        <el-form-item label="视频保存路径">
          <el-input v-model="videoSavedPath" readonly placeholder="请选择保存路径">
            <template #append>
              <el-button-group>
                <el-tooltip content="选择 Video 保存文件夹" :show-after="200">
                  <el-button @click="handleChooseVideoPath" :disabled="loading" title="选择路径">
                    <el-icon><FolderOpened /></el-icon>
                  </el-button>
                </el-tooltip>
                <el-tooltip content="打开 Video 保存文件夹" :show-after="200">
                  <el-button @click="openPath(videoSavedPath)" :disabled="loading" title="打开文件夹">
                    <el-icon><Position /></el-icon>
                  </el-button>
                </el-tooltip>
              </el-button-group>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="Cookie 存储路径">
          <el-input v-model="cookieSavedPath" readonly placeholder="请选择 Cookie 路径">
            <template #append>
              <el-button-group>
                <el-tooltip content="选择 Cookie 保存文件夹" :show-after="200">
                  <el-button @click="handleChooseCookiePath()" :disabled="loading" title="选择路径">
                    <el-icon><FolderOpened /></el-icon>
                  </el-button>
                </el-tooltip>
                <el-tooltip content="打开 Cookie 保存文件夹" :show-after="200">
                  <el-button @click="openPath(cookieSavedPath)" :disabled="loading" title="打开文件夹">
                    <el-icon><Position /></el-icon>
                  </el-button>
                </el-tooltip>
              </el-button-group>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSave">
          关闭
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { FolderOpened, Position } from '@element-plus/icons-vue';
import { choosePath, openPath } from "@/api/system.ts";
import { ElMessage } from "element-plus";
import { getGeneralConfig, updateGeneralConfig } from "@/api/config.ts";

const visible = defineModel<boolean>({ default: false });

const loading = ref(false);
const videoSavedPath = ref("");
const cookieSavedPath = ref("");

onMounted(async () => {
  const res = await getGeneralConfig();
  const config = res.config;

  if (res.status === "success") {
    videoSavedPath.value = config.videoSavedPath;
    cookieSavedPath.value = config.cookieSavedPath;
  }
})

const handleChooseVideoPath = async () => {
  loading.value = true;
  const choosePathRes = await choosePath();

  if (choosePathRes.status !== "success") {
    ElMessage.warning(choosePathRes.message);
    loading.value = false;
    return;
  }

  videoSavedPath.value = choosePathRes.path;

  const updateGeneralConfigRes = await updateGeneralConfig({
    videoSavedPath: videoSavedPath.value
  });

  if (updateGeneralConfigRes.status === "success") {
    ElMessage.success("Successfully changed video save path");
  } else {
    ElMessage.warning(updateGeneralConfigRes.message);
  }

  loading.value = false;
}

const handleChooseCookiePath = async () => {
  loading.value = true;
  const choosePathRes = await choosePath();

  if (choosePathRes.status !== "success") {
    ElMessage.warning(choosePathRes.message);
    loading.value = false;
    return;
  }

  cookieSavedPath.value = choosePathRes.path;

  const updateGeneralConfigRes = await updateGeneralConfig({
    cookieSavedPath: cookieSavedPath.value
  });

  if (updateGeneralConfigRes.status === "success") {
    ElMessage.success("Successfully changed video save path");
  } else {
    ElMessage.warning(updateGeneralConfigRes.message);
  }

  loading.value = false;
}

const handleSave = () => {
  visible.value = false;
}
</script>

<style scoped>
.setting-content {
  padding: 10px 20px;
}
</style>