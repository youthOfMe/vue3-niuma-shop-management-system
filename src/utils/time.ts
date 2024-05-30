// 封装一个函数: 获取一个结果: 当前早上|上午|下午|晚上
export const getTime = () => {
  let message = ''
  // 通过内置构造函数Date
  const hours = new Date().getHours()
  if (hours <= 4) {
    message = '半夜'
  } else if (hours <= 6) {
    message = '凌晨'
  } else if (hours <= 9) {
    message = '早晨'
  } else if (hours <= 12) {
    message = '上午'
  } else if (hours <= 1) {
    message = '中午'
  } else if (hours <= 17) {
    message = '下午'
  } else if (hours <= 18) {
    message = '黄昏'
  } else if (hours <= 19) {
    message = '傍晚'
  } else {
    message = '晚上'
  }

  return message
}
