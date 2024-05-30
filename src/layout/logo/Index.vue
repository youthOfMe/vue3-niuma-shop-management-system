<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
// 引入设置标题与logo的配置文件
import setting from '@/setting'
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  height: 50px;
  color: #000000;
  box-sizing: content-box;
  img {
    margin-right: 10px;
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-logo-title-fontSize;
  }
}
</style>
