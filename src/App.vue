<template>
    <div class="box">
        <h1>这是app</h1>
        <el-button type="primary" :icon="Plus">主要按钮</el-button>
        <el-button type="success" size="small" :icon="Edit">小按钮</el-button>
        <el-button type="danger" size="default" :icon="Delete">
            失败按钮
        </el-button>
    </div>
</template>

<script lang="ts" setup>
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
console.log(import.meta.env)
</script>

<style lang="scss" scoped></style>
