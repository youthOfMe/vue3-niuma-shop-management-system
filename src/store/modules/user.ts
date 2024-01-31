// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入数据类型
import type { UserState } from './types/type'
// 引入路由(常量路由)
import { constantRoute } from '@/router/routes'
// 引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
import { loginResponseData, loginForm } from '@/api/user/type'
// 用户登录的方法
import { reqLogin } from '@/api/user'

const useUserStore = defineStore('User', {
    state: (): UserState => {
        return {
            token: GET_TOKEN(), // 用户登录时的Token
            menuRoutes: constantRoute, // 仓库中拿出生成菜单需要的数组
            // 初始化用户信息数据
            username: '',
            avatar: '',
        }
    },
    actions: {
        // 用户登录的方法
        async userLogin(data: loginForm) {
            const result: loginResponseData = await reqLogin(data)
            if (result.code === 200) {
                this.token = result.data.token!
                SET_TOKEN(this.token)
                return 'ok'
            } else return Promise.reject(new Error(result.data.message))
        },
    },
})
// 对外暴露小仓库
export default useUserStore
