import { defineStore } from 'pinia'
// 创建layout组件相关的配置仓库

const useLayOutSettingStore = defineStore('SettingStore', {
    state: () => {
        return {
            fold: false,
            refresh: false,
        }
    },
})

export default useLayOutSettingStore
