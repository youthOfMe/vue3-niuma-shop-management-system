<template>
  <!-- 测试svg图标 -->
  <!-- svg是图标外层的容器节点, 内层是使用use标签 -->
  <svg :style="{ width, height }">
    <!-- xlink: href执行用哪一个图标，属性值必须# icon-图标名称 -->
    <!-- use标签fill属性可以进行设置图标的颜色 -->
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  // 接收父组件传递过来的图标宽度
  width: {
    type: String,
    default: '16px',
  },
  height: {
    type: String,
    default: '16px',
  },
  // xinlink:href属性值前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  // 提供使用图标的名字
  name: String,
  // 接受父组件进行传递颜色
  color: {
    type: String,
    default: '',
  },
})
</script>

<style scoped></style>
