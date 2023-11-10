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

// svg插件需要的配置代码
import 'virtual:svg-icons-register'

// 引入自定义插件对象，注册整个项目的全局组件
import globalcomponent from '@/components'

// 安装自定义插件
app.use(globalcomponent)

// 安装element-plus插件
app.use(ElementPlus, {
    locale: zhCn,
})

// 进行挂载
app.mount('#app')
