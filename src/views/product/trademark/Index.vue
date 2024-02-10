<template>
    <el-card class="box-card">
        <!-- 卡片顶部添加品牌按钮 -->
        <el-button type="primary" size="default" icon="Plus" @click="addTrademark">
            添加品牌
        </el-button>
        <!-- 表格组件: 用于展示已有的平台数据 -->
        <el-table style="margin: 10px 0" :border="true" :data="trademarkArr">
            <el-table-column
                label="序号"
                width="80px"
                aligin="center"
                type="index"
            ></el-table-column>
            <el-table-column label="品牌名称" prop="tmName">
                <template #="{ row }">
                    <pre style="color: brown">{{ row.tmName }}</pre>
                </template>
            </el-table-column>
            <el-table-column label="品牌LOGO">
                <template #="{ row }">
                    <img :src="row.logoUrl" style="width: 100px; height: 100px" />
                </template>
            </el-table-column>
            <el-table-column label="品牌操作">
                <template #="{ row }">
                    <el-button type="primary" size="small" icon="Edit"></el-button>
                    <el-button type="danger" size="small" icon="Delete"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <div class="demo-pagination-block">
            <el-pagination
                v-model:current-page="pageNo"
                v-model:page-size="limit"
                :page-sizes="[3, 5, 7, 9, 11]"
                :small="false"
                :background="true"
                layout="prev, pager, next, jumper, ->,sizes, total"
                :total="total"
                @size-change="sizeChange"
                @current-change="changePageNo"
            />
        </div>
    </el-card>
    <!-- 对话框组件 -->
    <el-dialog v-model="dialogFormVisble" title="添加品牌">
        <el-form style="width: 80%" :model="trademarkParams">
            <el-form-item label="品牌名称" label-width="80px">
                <el-input
                    placeholder="请您输入品牌的名称"
                    v-model="trademarkParams.tmName"
                ></el-input>
            </el-form-item>
            <el-form-item label="品牌LOGO" label-width="80px">
                <el-upload
                    class="avatar-uploader"
                    action="/api/admin/product/fileUpload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img
                        v-if="trademarkParams.logoUrl"
                        :src="trademarkParams.logoUrl"
                        class="avatar"
                    />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <!-- 具名插槽 footer -->
        <template #footer>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
            <el-button type="primary" size="default" @click="confirm">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
// 引入响应式ref
import { ref } from 'vue'
// 引入组件挂在完毕的钩子
import { onMounted } from 'vue'

// 引入全部品牌接口返回的数据类型
import type { TradeMarkResponseData } from '@/api/product/trademark/type'
// 引入品牌数据数据类型
import type { Records } from '@/api/product/trademark/type'
// 引入品牌类型
import type { TradeMark } from '@/api/product/trademark/type'
// 引入上传图片类型
import type { UploadProps } from 'element-plus/lib/components/upload/src/upload.js'

// 引入请求全部品牌数据接口
import { reqHasTrademark } from '@/api/product/trademark'
// 引入新增/更新数据的接口
import { reqAddOrUpdateTrademark } from '@/api/product/trademark'
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'

/*

    -----------------展示数据-------------------

*/

// 当前页码
const pageNo = ref<number>(1)
// 定义每一页展示多少条数据
const limit = ref<number>(3)
// 存储已有品牌的数据总数
const total = ref<number>(0)
// 存储已有品牌的数据
const trademarkArr = ref<Records>([])

// 封装一个获取已有品牌接口的函数
const getHasTrademark = async () => {
    const result: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
    if (result.code === 200) {
        // 存储已有品牌的总个数
        total.value = result.data.total
        trademarkArr.value = result.data.records
    }
    return result
}
// 获取全部已有品牌数据
onMounted(() => {
    getHasTrademark()
})

// 分页器页码发生变化时触发
const changePageNo = () => {
    getHasTrademark()
}
// 当下拉菜单发生变化时触发
const sizeChange = () => {
    getHasTrademark()
}

/*

    -----------------新增/更新数据-------------------

*/

// 控制对话框的显示与隐藏
const dialogFormVisble = ref(false)
// 定义新增品牌数据
const trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: '',
})

// 添加品牌按钮的回调
const addTrademark = () => {
    // 显示对话框
    dialogFormVisble.value = true
}

// 对话框底部取消按钮
const cancel = () => {
    // 对话框隐藏
    dialogFormVisble.value = false
}
// 对话框底部确定按钮
const confirm = async () => {
    const result: any = await reqAddOrUpdateTrademark(trademarkParams)
    // 添加|更新品牌成功
    if (result.code === 200) {
        // 关闭对话框
        dialogFormVisble.value = false
        // 弹出提示信息
        ElMessage({
            type: 'success',
            message: '添加品牌成功',
        })
        // 再次进行发送请求获取已有的全部的品牌数据
        getHasTrademark()
    } else {
        // 添加品牌失败
        ElMessage({
            type: 'error',
            message: '添加品牌失败',
        })
    }
}

// 上传图片组件 -> 上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (
        !(
            rawFile.type === 'image/png' ||
            rawFile.type === 'image/jpg' ||
            rawFile.type === 'image/gif' ||
            rawFile.type === 'image/jpeg'
        )
    ) {
        ElMessage({
            type: 'error',
            message: '上传的文件格式务必是JPG|PNG|GIF|JPEG',
        })
    }
    if (rawFile.size / 1024 / 1024 < 4) return true
    else {
        ElMessage({
            type: 'error',
            message: '上传的文件大小必须小于4M',
        })
        return false
    }
}
// 图片上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    // response: 即为当前这次上传图片post请求 服务器返回的数据
    // 收集上传图片的地址 添加品牌的时候将数据带给服务器
    trademarkParams.logoUrl = response.data!
}

// 品牌校验规则执行函数
const validatorTmName = (rule: any, value: any, callBack: any) => {
    // 自定义校验规则
    if (value.trim().length >= 2) {
        callBack()
    } else {
        callBack(new Error('品牌名称位数大于两位'))
    }
}
// 品牌LOGO图片的自定义校验规则
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
    // 图片上传校验规则
    if (value) callBack()
    else callBack(new Error('Logo的图片请务必上传'))
}
// 表单校验规则
const rules = {
    tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
    logoUrl: [{ required: true, validator: validatorLogoUrl }],
}
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.avatar-uploader .el-upload .el-icon {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover .el-icon {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
