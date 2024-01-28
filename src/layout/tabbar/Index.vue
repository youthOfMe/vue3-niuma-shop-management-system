<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <BreadCrumb></BreadCrumb>
        </div>
        <div class="tabbar_right"></div>
    </div>
</template>

<script setup lang="ts">
// 引入面包屑组件
import BreadCrumb from './breadCrumb/Index.vue'
</script>

<style scoped lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    background-image: linear-gradient(
        to right,
        rgb(232, 223, 223),
        rgb(201, 178, 178),
        rgb(197, 165, 165)
    );
    &_left {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
    &_right {
        display: flex;
        align-items: center;
        margin-right: 20px;
    }
}
</style>
