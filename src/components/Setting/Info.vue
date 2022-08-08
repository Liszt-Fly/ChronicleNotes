<template>
  <div class="info">
    <el-form label-width="180px" :model="info" label-position="left">
      <h1> Welcome to <span class="icon">π</span> 🤗</h1>
      <h3> Made with ❤️</h3>

      <img src="@/assets/img/成功.svg" />

      <!-- <el-button type="primary"><i class="bi bi-plugin"></i>{{ $t('setting.info.sponsorUs') }}
      </el-button> -->
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const info = reactive({})
</script>

<style lang="scss" scoped>
.info {
  padding: 1rem;
  text-align: center;
  max-width: 400px;
  margin: auto;
  user-select: none;
  height: 100%;

  .el-form-item__label i {
    margin-right: 1rem;
    font-size: 1rem
  }

  h1 {
    margin: 20px;

    .icon {
      font-family: sans-serif;
      color: var(--pi-theme-color);
      font-size: 3rem;
      font-weight: bolder;
      position: relative;
      top: 2px;
    }
  }

  .el-button i {
    font-size: 1rem;
    margin-right: 6px;
  }

  .home {
    width: 100%;
    margin: 20px 0;

    a {
      text-decoration: none;

      i {
        margin-right: 1rem;
        font-size: 1rem
      }

      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
