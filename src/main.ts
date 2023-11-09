/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 引入element-plus插件于样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 配置element-plus 国际化配置

// @ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 获取vue应用实例
const app = createApp(App)

// 安装element-plus插件
app.use(ElementPlus, {
    locale: zhCn,
})

// 进行挂载
app.mount('#app')
