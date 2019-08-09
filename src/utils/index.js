/*
* 工具
* */

// 用于判断是否完善信息
export function getredirectTo(type, header) {
    /*
    *  1、首先判断当前登录或注册的是大神还是老板咯
    *  2、判断完之后更改路径
    *  3、判断是否已完善信息
    * */
    // 1、首先判断当前登录或注册的是大神还是老板咯
    let path
    if(type === 'laoban') {
        // 2、判断完之后更改路径
        path = 'laoban'
    } else {
        // 2、判断完之后更改路径
        path = 'dashen'
    }
    // 3、判断是否已完善信息
    if(!header) {
        path += 'info'
    }

    return path
}
