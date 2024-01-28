<template>
    <!-- 进行配置路由出口和动画效果 -->
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <Component :is="Component"></Component>
        </transition>
    </router-view>
</template>

<script setup lang="ts"></script>

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
