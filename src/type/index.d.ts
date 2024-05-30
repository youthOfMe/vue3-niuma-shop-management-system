import SvgIcon from '@/components/SvgIcon'

// 定义全局自动注册对象的类型
// 进行定义全局自动注册对象的类型的时候使用type来进行定义即可
type allGlobalComponentType = {
  [svgIcon: string]: typeof SvgIcon
}

export { allGlobalComponentType }
