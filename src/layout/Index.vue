<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <Logo></Logo>
            <!-- 展示菜单 -->
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件 -->
                <el-menu
                    background-color="#001529"
                    text-color="white"
                    active-text-color="yellowgreen"
                    :default-active="$route.path"
                >
                    <!-- 采用封装 -->
                    <Menu :menu-list="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabBar"></div>
        <!-- 内容展示区域 -->
        <div class="layout_main"></div>
    </div>
</template>

<script setup lang="ts">
// 引入路由对象钩子
import { useRoute } from 'vue-router'

// 引入左侧菜单logo子组件
import Logo from './logo/Index.vue'
// 引入菜单组件
import Menu from './menu/Index.vue'

// 获取与用户相关的小仓库
import useUserStore from '@/store/modules/user'

// 创建用户仓库
const userStore = useUserStore()

// 获取路由对象
const $route = useRoute()
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
