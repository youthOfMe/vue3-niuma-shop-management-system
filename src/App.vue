<template>
    <div class="box">
        <h1>这是app</h1>
        <el-button type="primary" :icon="Plus">主要按钮</el-button>
        <el-button type="success" size="small" :icon="Edit">小按钮</el-button>
        <el-button type="danger" size="default" :icon="Delete">
            失败按钮
        </el-button>
        <svg-icon name="welcome" :width="66" :height="66"></svg-icon>
    </div>
</template>

<script lang="ts" setup>
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import request from '@/utils/request'
import { reqLogin } from '@/api/user'
import { onMounted } from 'vue'

// 当你的组件挂载完毕测试一个请求 测试axios
// onMounted(() => {
//     request({
//         url: '/user/login',
//         method: 'post',
//         data: {
//             username: 'admin',
//             password: '111111',
//         },
//     }).then((res) => {
//         console.log(res)
//     })
// })

onMounted(() => {
    reqLogin({ username: 'admin', password: '111111' })
})
</script>

<style scoped lang="scss">
div {
    h1 {
        color: $color;
    }
}
</style>
