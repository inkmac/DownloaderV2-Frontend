<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      router
  >
    <el-menu-item index="/download">Download</el-menu-item>
    <el-menu-item index="/get-cookie">Get Cookie</el-menu-item>
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

const route = useRoute()

const activeIndex = computed(() => {
  const { path } = route
  return path
})
</script>

<style>
</style>
