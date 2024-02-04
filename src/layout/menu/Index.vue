<template>
    <template v-for="item in menuList" :key="item.path">
        <!-- 无子路由 -->
        <el-menu-item
            v-if="!item.children && !item.meta.hidden"
            :index="item.path"
            @click="goRoute"
        >
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <template #title>
                <span>{{ item.meta.title }}</span>
            </template>
        </el-menu-item>
        <!-- 有子路由但是仅仅有一个 -->
        <el-menu-item
            v-if="
                item.children &&
                item.children.length === 1 &&
                !item.meta.hidden &&
                !item.children[0].hidden
            "
            :index="item.children[0].path"
            @click="goRoute"
        >
            <el-icon>
                <component :is="item.children[0].meta.icon"></component>
            </el-icon>
            <template #title>
                <span>{{ item.children[0].meta.title }}</span>
            </template>
        </el-menu-item>
        <!-- 有子路由且个数大于一个 -->
        <el-sub-menu
            v-if="item.children && item.children.length > 1 && !item.meta.hidden"
            :index="item.path"
        >
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menu-list="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
// 引入路由对象
import { useRouter } from 'vue-router'

// 获取父组件注入的数据
defineProps(['menuList'])

// 获取路由器对象
const $router = useRouter()
// 点击菜单的回调
const goRoute = (vc: any) => {
    // 路由跳转
    $router.push(vc.index)
}
</script>

<!-- 递归组件必须有名字 多script标签 必须语言相同 -->
<script lang="ts">
export default {
    name: 'Menu', // 组件名字不能和html中使用的组件名一样 但是如果使用递归必须进行同名处理
}
</script>

<style scoped>
div {
    color: white;
}
</style>
