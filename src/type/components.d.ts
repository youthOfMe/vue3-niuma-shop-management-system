import SvgIcon from '@/components/SvgIcon/Index.vue'

declare module 'vue' {
  interface Globalcomponents {
    svgIcon: typeof SvgIcon
  }
}
