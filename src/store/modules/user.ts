// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入数据类型
import type { UserState } from './types/type'

const useUserStore = defineStore('User', {
    state: (): UserState => {
        return {}
    },
})
