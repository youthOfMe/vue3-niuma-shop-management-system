// 进行axios二次封装: 使用请求与响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
// 第一步: 利用axios的create
const request = axios.create({
    // 基础路径
    baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径携带/api
    timeout: 5000, // 超时事件设置
})
// 第二步: request实例添加请求与相应拦截器
request.interceptors.request.use((config) => {
    config.headers.token = 555
    return config
})
// 第三步: 配置响应拦截器
request.interceptors.response.use(
    (response) => {
        // 简化传回数据
        return response.data
    },
    (error) => {
        // 定义一个变量: 存储网络错误的信息
        let message = ''
        // http状态码
        const status = error.response.status
        switch (status) {
            case 401:
                message = 'TOKEN过期'
                break
            case 403:
                message = '无权访问'
                break
            case 404:
                message = '请求地址错误'
                break
            case 500:
                message = '服务器出现问题'
                break
            default:
                message = '网络出现问题'
        }
        // 提示的错误信息
        ElMessage({
            type: 'error',
            message,
        })
        // 响应拦截器需要返回一个请求失败的promise对象 终结promise链
        return Promise.reject()
    },
)

// 对外暴露
export default request
