<template>
    <el-card class="box-card">
        <!-- 卡片顶部添加品牌按钮 -->
        <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
        <!-- 表格组件: 用于展示已有的平台数据 -->
        <el-table style="margin: 10px 0" :border="true" :data="trademarkArr">
            <el-table-colum label="序号" width="80px" aligin="center" type="index"></el-table-colum>
            <el-table-column label="品牌名称">
                <template></template>
            </el-table-column>
            <el-table-column label="品牌LOGO">
                <template></template>
            </el-table-column>
            <el-table-column label="品牌操作">
                <template></template>
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

// 引入请求全部品牌数据接口
import { reqHasTrademark } from '@/api/product/trademark'

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
</script>

<style scoped></style>
