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
    width: 100%;
    height: 50px;
    color: white;
    display: flex;
    align-items: center;
    padding: 10px;
    box-sizing: content-box;
    img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
    }
    p {
        font-size: $base-logo-title-fontSize;
    }
}
</style>
