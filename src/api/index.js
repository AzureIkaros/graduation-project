import axios from 'axios'


// 搜索页面提交搜搜关键字
export function search(option){
    return axios.post('/api/serach',{
        data:option.inputData
    })
}

//管理员登录
export function adminLogin(option){
    return axios.post('/api/adminLogin',{
        username:option.username,
        password:option.password,
        code:option.code
    });
}

//获取验证码
export function getCode(){
    return axios.get('/api/getCode');
}


//密码修改
export function pushPassWD(option){
    return axios.post('/api/pushPassWD',{
        username:option.username,
        oldPassWd:option.oldPassWd,
        newPassWd:option.newPassWd
    })
}

//爬虫信息获取
export function getSpiderInfo(){
    return axios.get('/api/getSpiderInfo')
}

//爬虫信息的提交
export function setSpiderInfo(option){
    return axios.post('/api/setSpiderInfo',option);
}

//爬虫功能暂停和开始
export function stopSpider(){
    return axios.post('/api/stopSpider')
}

//爬虫功能结束
export function endSpider(){
    return axios.get('/api/endSpider')
}



