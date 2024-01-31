<template>
    <!-- 进行配置路由出口和动画效果 -->
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <Component :is="Component" v-if="flag"></Component>
        </transition>
    </router-view>
</template>

<script setup lang="ts">
// 引入ref
import { ref } from 'vue'
// 引入监听函数
import { watch } from 'vue'
// 引入dom更新完毕回调函数
import { nextTick } from 'vue'

// 引入layout设置仓库
import useLayOutSettingStore from '@/store/modules/setting'

// 创建layout设置仓库
const LayOutSettingStore = useLayOutSettingStore()

// 控制当前组件是否销毁重建
const flag = ref(true)

// 监听是否进行刷新 重塑组件
watch(
    () => LayOutSettingStore.refresh,
    () => {
        // 点击刷新按钮: 路由组件销毁
        flag.value = false
        nextTick(() => {
            // 等dom更新完毕后在进行显示组件
            flag.value = true
        })
    },
)
</script>

<style scoped>
.fade-enter-from {
    opacity: 0;
    transform: scale(0);
}

.fade-enter-active {
    transition: all 1s;
}

.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}
</style>
