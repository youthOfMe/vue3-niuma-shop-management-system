<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0">占位的格子</el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form">
                    <h1>Hello</h1>
                    <h2>欢迎来到牛马商城后台管理系统</h2>
                    <el-form-item>
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="login_btn" type="primary">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts"></script>

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
