/**
 *
 * @param date
 */
const formatData = (date: any) => {
  const o = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'S+': date.getMilliseconds(),
  }
  let fmt = 'yyyy-MM-dd HH:mm:ss'
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 4
          ? ('0000' + o[k]).substr(String(o[k]).length)
          : ('00' + o[k]).substr(String(o[k]).length)
      )
    }
  }
  return fmt
}

export default formatData
