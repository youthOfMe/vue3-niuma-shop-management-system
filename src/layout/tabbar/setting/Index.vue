<template>
    <el-button
        size="small"
        icon="Refresh"
        circle
        @click="updateRefresh"
    ></el-button>
    <el-button size="small" icon="FullScreen" circle></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
    <img
        :src="userStore.avatar"
        alt=""
        style="width: 24px; height: 24px; margin: 0 10px; border-radius: 12px"
    />
    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down></arrow-down>
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
// 获取layout设置相关的小仓库
import useLayOutSettingStore from '@/store/modules/setting'

// 获取用户信息
const userStore = useUserStore()
// 获取设置仓库
const LayOutSettingStore = useLayOutSettingStore()

// 刷新按钮的回调
const updateRefresh = () => {
    LayOutSettingStore.refresh = !LayOutSettingStore.refresh
}
</script>

<style scoped></style>
