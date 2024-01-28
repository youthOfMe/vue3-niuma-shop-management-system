<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <Logo></Logo>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabBar"></div>
        <!-- 内容展示区域 -->
        <div class="layout_main"></div>
    </div>
</template>

<script setup lang="ts">
// 引入左侧菜单logo子组件
import Logo from './logo/Index.vue'
</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
}

.layout_slider {
    color: white;
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
}

.layout_tabBar {
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    position: fixed;
    top: 0;
    left: $base-menu-width;
}

.layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background-color: yellowgreen;
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
}
</style>
