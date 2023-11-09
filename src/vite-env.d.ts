/// <reference types="vite/client" />

//让ts能够识别到.vue文件
declare module '*.vue' {
    import type { DefineComponent } from 'vue'

    const vueComponent: DefineComponent<object, object, any>

    export default vueComponent
}
