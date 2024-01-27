<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0">占位的格子</el-col>
            <el-col :span="12" :xs="24">
                <el-form
                    class="login_form"
                    :model="loginForm"
                    :rules="rules"
                    ref="loginForms"
                >
                    <h1>Hello</h1>
                    <h2>欢迎来到牛马商城后台管理系统</h2>
                    <el-form-item prop="username">
                        <el-input
                            v-model="loginForm.username"
                            :prefix-icon="User"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            type="password"
                            :prefix-icon="Lock"
                            v-model="loginForm.password"
                            show-password
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            class="login_btn"
                            type="primary"
                            @click="login()"
                            :loading="loading"
                        >
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ref } from 'vue'
// 引入用户相关的仓库
import useUserStore from '@/store/modules/user'
// 引入路由对象
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
// 引入获取当前时间的函数
import { getTime } from '@/utils/time'
// 引入element
import { ElNotification } from 'element-plus'
// 引入输出框图标
import { User, Lock } from '@element-plus/icons-vue'

// 创建用户仓库进行使用
const userStore = useUserStore()
// 获取路由对象
const $route = useRoute()
// 获取全局路由对象
const $router = useRouter()
// 收集账号密码
const loginForm = reactive({ username: 'admin', password: '111111' })
// 控制按钮的加载效果
const loading = ref<boolean>(false)
// 获取表单对象
const loginForms = ref()
// 配置自定义校验的方法
const validatorUserName = (rule: object, value: string, callback: any) => {
    if (value.length >= 5 && value.length <= 18) callback()
    else callback(new Error('账号长度要在5-18位之间'))
}
const validatorPassword = (rule: object, value: string, callback: any) => {
    if (value.length >= 5 && value.length <= 18) callback()
    else callback(new Error('密码长度要在6-18位之间'))
}
// 定义表单校验需要进行配置的对象
const rules = {
    // 自定义校验规则
    username: [{ trigger: 'change', validator: validatorUserName }],
    password: [{ trigger: 'change', validator: validatorPassword }],
}
// 登录按钮的回调
const login = async () => {
    // 保证表单校验通过再发送请求
    await loginForms.value.validate()
    // 开始加载
    loading.value = true
    // 处理登录请求
    try {
        // 保证登录成功
        await userStore.userLogin(loginForm)
        // 跳转到首页
        const redirect = $route.query.redirect
        $router.push({ path: (redirect as string) || '/' })
        // 登录成功后的提示信息
        ElNotification({
            type: 'success',
            title: `Hi, ${getTime()}好`,
            message: '您辛苦了, 管理员',
        })
    } catch (error) {
        ElNotification({
            type: 'error',
            message: (error as Error).message,
        })
    }
    // 无论是否失败都要改变按钮的状态
    loading.value = false
}
</script>

<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') repeat;
    background-size: cover;
    .login_form {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url('@/assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 40px;
        h1 {
            color: white;
            font-size: 40px;
        }
        h2 {
            font-size: 20px;
            color: white;
            margin: 20px 0;
        }
        .login_btn {
            width: 100%;
        }
    }
}
</style>
