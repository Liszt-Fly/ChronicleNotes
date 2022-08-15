<template>
  <div class="setting">

    <div class="routers">
      <router-link to="/Setting/About" @click="SettingPage = '/Setting/About'">
        <el-button key="primary" text>
          <i class="bi bi-house-heart"></i>
          {{ $t('setting.about_tab') }}
        </el-button>
      </router-link>
      <router-link to="/Setting/General" @click="SettingPage = '/Setting/General'">
        <el-button key="primary" text>
          <i class="bi bi-gear"></i>
          {{ $t('setting.general_tab') }}
        </el-button>
      </router-link>
      <router-link to="/Setting/Appearance" @click="SettingPage = '/Setting/Appearance'">
        <el-button key="primary" text>
          <i class="bi bi-window"></i>
          {{ $t('setting.appearance_tab') }}
        </el-button>
      </router-link>

      <!-- <router-link to="/Setting/Shortcut" @click="SettingPage = '/Setting/Shortcut'">
        <el-button key="primary" text>
          <i class="bi bi-command"></i>
          {{ $t('setting.shortcut_tab') }}
        </el-button>
      </router-link> -->
    </div>

    <el-scrollbar class="settingView">
      <router-view></router-view>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { SettingPage } from "@/data/configdb"
</script>

<style lang="scss">
.setting {
  height: 100%;
  display: flex;
  flex-direction: column;

  .routers {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 80%;
    margin: 0 5%;
    padding-bottom: 10px;
    position: fixed;
    z-index: 999;
    background: var(--el-bg-color);
  }

  .settingView {
    margin-top: 42px;
  }

  .el-button i {
    font-size: 1rem;
    margin-right: 6px;
  }

  .router-link-exact-active button {
    background-color: var(--el-fill-color-light);
  }
}
</style>
