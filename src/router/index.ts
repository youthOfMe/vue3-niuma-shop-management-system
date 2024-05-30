// 通过vue-router插件实现模板路由配置
import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './routes'

// 创建路由器
const router = createRouter({
  // 路由模式history
  history: createWebHistory(),
  routes: constantRoute,
})

export default router
