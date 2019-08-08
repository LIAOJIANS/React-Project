
import axios from 'axios'

export default function ajax(url, data={}, type='GET') {
    if(type === 'GET') {
        let paramStr = ''
        // 拿到参数对象的key值
        Object.keys(data).forEach( key  => {
            paramStr += key + '=' + data[key] + '&'
        })
        if(paramStr) {
            // 去掉后面的&符号
            paramStr = paramStr.substring(0, paramStr.length-1)
        }
        // 发送get请求
       return axios.get(url + '?' + paramStr)
    } else {
        // 发post请求
       return axios.post(url, data)
    }
}
