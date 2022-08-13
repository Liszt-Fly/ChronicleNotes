<script setup lang="ts">
import ControlBar from "@/components/common/ControlBar/ControlBar.vue";
import TabBar from "@/components/common/TabBar.vue";
import Welcome from "@/components/common/Welcome.vue"
import { onMounted, ref } from "vue";
import { chooseWorkspace } from "@/data/configdb"

</script>

<template>
  <control-bar></control-bar>
  <template v-if="!chooseWorkspace">
    <welcome></welcome>
  </template>
  <template v-else>
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

</template>

<style lang="scss">
.article {
  width: 100%;
}
</style>
