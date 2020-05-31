import axios from 'axios'

const post = (url,option)=>{
    return axios.post(url,{...option,token:localStorage.getItem("token")});
}

// 搜索页面提交搜搜关键字
export function search(option){
    return axios.post('/api/serach',{
        data:option.inputData
    })
}

//管理员登录
export function adminLogin(option){
    return post('/api/adminLogin',{
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
    return post('/api/pushPassWD',{
        username:option.username,
        oldPassWd:option.oldPassWd,
        newPassWd:option.newPassWd
    })
}

//爬虫信息获取
export function getSpiderInfo(){
    return post('/api/getSpiderInfo')
}

//爬虫信息的提交
export function setSpiderInfo(option){
    return post('/api/setSpiderInfo',option);
}

//爬虫功能暂停和开始
export function stopSpider(){
    return post('/api/stopSpider');
}

//爬虫功能结束
export function endSpider(){
    return post('/api/endSpider');
}

//获取表
export function getTable(){
    return post("/api/getTable");
}

//删除表
export function deleteTable(option){
    return post("/api/deleteTable",option);
}

//点击增加
export function click(option){
    return axios.post('/api/click',option);
}


//获取具体的表
export function getTableInfo(option){
    return post('/api/getTableInfo',option);
}

export function delTableInfo(option){
    return post('/api/delTableInfo',option);
}


