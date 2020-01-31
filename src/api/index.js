import axios from 'axios'


// 搜索页面提交搜搜关键字
export function search(option){
    alert(option.inputData)
}

export function adminLogin(option){
    return axios.post('/api/adminLogin',{
        username:option.username,
        password:option.password,
        code:option.code
    });
}

export function getCode(){
    return axios.get('/api/getCode');
}