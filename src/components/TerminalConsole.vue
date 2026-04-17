<template>
  <div class="terminal-wrapper">
    <div class="terminal-header">{{ title }}</div>
    <pre
        ref="terminalRef"
        v-text="logs.join('')"
        class="terminal-body"
    ></pre>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';

interface Props {
  logs: string[];
  title?: string;
  autoScroll?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  logs: () => [],
  title: '控制台输出',
  autoScroll: true
});

const terminalRef = ref<HTMLPreElement | null>(null);

watch(() => props.logs.length, async () => {
  if (props.autoScroll && terminalRef.value) {
    await nextTick();
    terminalRef.value.scrollTop = terminalRef.value.scrollHeight;
  }
});
</script>

<style scoped>
.terminal-wrapper {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #444;
}

.terminal-header {
  background: #2d2d30;
  color: #cccccc;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
}

.terminal-body {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 12px 16px;
  height: 280px;
  overflow-y: auto;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'Consolas', 'Monaco', monospace;
  line-height: 1.6;
  font-size: 14px;
}

.terminal-body::-webkit-scrollbar {
  width: 8px;
}
.terminal-body::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 4px;
}
.terminal-body::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>