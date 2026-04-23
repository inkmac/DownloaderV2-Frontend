<template>
  <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      :ellipsis="false"
      router
  >
    <el-menu-item index="/download">
      {{ $t('navigator.download') }}
    </el-menu-item>

    <el-menu-item index="/get-cookie">
      {{ $t('navigator.cookie') }}
    </el-menu-item>

    <el-menu-item index="/software-announcement">
      {{ $t('navigator.info') }}
    </el-menu-item>

    <div class="flex-filler"></div>

    <el-sub-menu class="menu-item-right">
      <template #title>Language Choose</template>
      <el-menu-item @click="changeLang('zh')">简体中文</el-menu-item>
      <el-menu-item @click="changeLang('en')">English</el-menu-item>
      <el-menu-item @click="changeLang('fr')">Français</el-menu-item>
    </el-sub-menu>
  </el-menu>

  <router-view v-slot="{ Component, route }">
    <KeepAlive>
      <component :is="Component" :key="route.path" />
    </KeepAlive>
  </router-view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { LanguageType } from "@/i18n";

const route = useRoute()
const { locale } = useI18n()

const activeIndex = computed(() => {
  const { path } = route
  return path
})

const changeLang = (lang: LanguageType) => {
  locale.value = lang
}
</script>

<style>
.flex-filler {
  flex-grow: 1;
}
</style>
