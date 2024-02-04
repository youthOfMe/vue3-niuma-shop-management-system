<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider" :class="{ fold: LayOutSettingStore.fold }">
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
                    :collapse="LayOutSettingStore.fold"
                >
                    <!-- 采用封装 -->
                    <Menu :menu-list="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabBar" :class="{ fold: LayOutSettingStore.fold }">
            <Tabbar></Tabbar>
        </div>
        <!-- 内容展示区域 -->
        <div class="layout_main" :class="{ fold: LayOutSettingStore.fold }">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
// 引入路由对象钩子
import { useRoute } from 'vue-router'

// 引入左侧菜单logo子组件
import Logo from './logo/Index.vue'
// 引入菜单组件
import Menu from './menu/Index.vue'
// 引入右侧的展示组件
import Main from './main/Index.vue'
// 引入顶部的导航组件
import Tabbar from './tabbar/Index.vue'

// 获取与用户相关的小仓库
import useUserStore from '@/store/modules/user'
// 获取与layout配置相关的仓库
import useLayOutSettingStore from '@/store/modules/setting'

// 创建用户仓库
const userStore = useUserStore()
// 创建layout配置仓库
const LayOutSettingStore = useLayOutSettingStore()

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
    transition: all 0.3s;
    .scrollbar {
        width: 100%;
        height: calc(100vh - $base-menu-logo-height - 40px);
        .el-menu {
            border-right: 0;
        }
    }

    &.fold {
        width: $base-menu-min-width;
    }
}

.layout_tabBar {
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    position: fixed;
    top: 0;
    left: $base-menu-width;

    transition: all 0.3s;
    &.fold {
        width: calc(100vw - $base-menu-min-width);
        left: $base-menu-min-width;
    }
}

.layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    /* background-color: yellowgreen; */
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;

    transition: all 0.3s;
    &.fold {
        width: calc(100vw - $base-menu-min-width);
        left: $base-menu-min-width;
    }
}
</style>
