<template>
    <!-- 顶部左侧的静态资源 -->
    <el-icon style="margin-right: 10px" @click="changeIcon">
        <component
            :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"
        ></component>
    </el-icon>
    <!-- 左侧的面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <!-- 面包动态展示路由名字与标题 -->
        <el-breadcrumb-item
            v-for="(item, index) in $route.matched"
            :key="index"
            v-show="item.meta.title"
            :to="item.path"
        >
            <!-- 图标 -->
            <el-icon style="margin: 0px 5px">
                <component :is="item.meta.icon"></component>
            </el-icon>
            <!-- 面包屑展示疲惫路由的标题 -->
            <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
// 引入页面路由对象
import { useRoute } from 'vue-router'
// 引layout配置相关的仓库
import useLayOutSettingStore from '@/store/modules/setting'

// 获取页面路由对象
const $route = useRoute()

// 获取layout配置仓库
const LayOutSettingStore = useLayOutSettingStore()

// 点击图标的方法
const changeIcon = () => {
    LayOutSettingStore.fold = !LayOutSettingStore.fold
}
</script>

<style scoped></style>
