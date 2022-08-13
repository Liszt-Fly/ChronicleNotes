<script setup lang="ts">
import ControlBar from "@/components/common/ControlBar/ControlBar.vue";
import TabBar from "@/components/common/TabBar.vue";
</script>

<template>
  <control-bar></control-bar>
  <div class="main" spellcheck="false">
    <tab-bar></tab-bar>
    <div class="article">
      <el-scrollbar>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-scrollbar>
    </div>
  </div>
</template>

<style>
.article {
  width: calc(100% - 48px);
}
</style>
