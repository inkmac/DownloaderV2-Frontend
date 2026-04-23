<template>
  <el-dialog
      v-model="visible"
      :title="$t('settings.title')"
      width="700"
  >
    <div class="setting-content">
      <el-form label-position="top">
        <el-form-item :label="$t('settings.videoPath')">
          <el-input v-model="videoSavedPath" readonly :placeholder="$t('settings.videoPathPlaceholder')">
            <template #append>
              <el-button-group>
                <el-tooltip :content="$t('settings.tooltip.selectVideo')" :show-after="200">
                  <el-button @click="handleChooseVideoPath" :disabled="loading">
                    <el-icon><FolderOpened /></el-icon>
                  </el-button>
                </el-tooltip>
                <el-tooltip :content="$t('settings.tooltip.openVideo')" :show-after="200">
                  <el-button @click="openPath(videoSavedPath)" :disabled="loading">
                    <el-icon><Position /></el-icon>
                  </el-button>
                </el-tooltip>
              </el-button-group>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('settings.cookiePath')">
          <el-input v-model="cookieSavedPath" readonly :placeholder="$t('settings.cookiePathPlaceholder')">
            <template #append>
              <el-button-group>
                <el-tooltip :content="$t('settings.tooltip.selectCookie')" :show-after="200">
                  <el-button @click="handleChooseCookiePath()" :disabled="loading">
                    <el-icon><FolderOpened /></el-icon>
                  </el-button>
                </el-tooltip>
                <el-tooltip :content="$t('settings.tooltip.openCookie')" :show-after="200">
                  <el-button @click="openPath(cookieSavedPath)" :disabled="loading">
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
          {{ $t('settings.close') }}
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
import { useI18n } from 'vue-i18n';

const visible = defineModel<boolean>({ default: false });

const { t } = useI18n();

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
    ElMessage.success(t('settings.success'));
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
    ElMessage.success(t('settings.success'));
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