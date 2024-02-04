// 引入路由
import router from '@/router'
// 引入pinia大仓库
import pinia from './store'

// 引入用户信息仓库
import useUserStore from './store/modules/user'
// 搭建用户信息仓库
const userStore = useUserStore(pinia)

// 引入加载插件
import nprogress from '@/utils/nprogress.js'
// 引入系统配置信息
import setting from './setting'

// 全局守卫
// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
    document.title = setting.title + '-' + to.meta.title
    // 加载插件启动
    nprogress.start()
    // 获取token判断用户登录了还是没有登录
    const token = userStore.token
    // 获取用户名字
    const username = userStore.username
    if (token) {
        // 用户登录成功
        if (to.path === '/login' || to.path === '/login/') next({ path: '/' })
        else {
            if (username) next()
            else {
                try {
                    // 获取用户信息
                    await userStore.userInfo()
                    next()
                } catch (error) {
                    // TOKEN过期 退出登录
                    userStore.userLogout()
                    next({ path: '/login', query: { redirect: to.path } })
                }
            }
        }
    } else {
        // 用户未登录判断
        if (to.path === '/login') next()
        else next({ path: '/login', query: { redirect: to.path } })

        // 当前我也是会写这种sb代码的
        // to.path === '/login'
        //     ? next()
        //     : next({ path: '/login', query: { redirect: to.path } })
    }
})
// 全局后置守卫
router.afterEach((to: any, from: any, next: any) => {
    // 加载结束
    nprogress.done()
})
