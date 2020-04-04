const https = require("https");
const http = require("http");
const cheerio = require("cheerio");
const connection = require("./mysql");

// let url = "https://so.csdn.net/so/search/s.do?q=python%20%E7%88%AC%E8%99%AB&t=&u=";

let exitsArr = [];

let writeDb = (url,title,table_name)=>{
    connection.query(`insert into ${table_name} (url,title,clickNum) values('${url}','${title}',0)`,(error,result)=>{
        if(error)
            console.log(error)
    })
}


let dealHttpsUrl = (url,url_arr,table_name) => {
    exitsArr.push(url);
    https.get(url, (res) => {
        let chunks = [];
        let size = 0;

        res.on('data', (chunk) => {
            chunks.push(chunk);
            size += chunk.length;
        });

        res.on("end", () => {
            let data = Buffer.concat(chunks, size);
            let html = data.toString();

            let $ = cheerio.load(html);

            //console.log($("title").text())//拿标题
            // 写入数据库
            writeDb(url,$("title").text(),table_name);

            $("a").each((index, value) => {
                let _url = $(value).attr("href");
                _url = /^#/g.test(_url) ? '/' + _url : _url;
                if (_url != undefined) {
                    if (/^http:\/\//g.test(_url) || /^https:\/\//g.test(_url)) {
                        if(exitsArr.indexOf(_url) === -1 ){
                            url_arr.push(_url);
                            exitsArr.push(_url)
                        }    
                    } else {
                        if(exitsArr.indexOf(url + _url) === -1 ){
                            url_arr.push(url + _url);
                            exitsArr.push(url + _url);
                        }
                        
                    }
                }
            })
            console.log(url_arr)
        })
    })
}

let dealHttpUrl = (url,url_arr,table_name) => {
    exitsArr.push(url);
    http.get(url, (res) => {
        let chunks = [];
        let size = 0;

        res.on('data', (chunk) => {
            chunks.push(chunk);
            size += chunk.length;
        });

        res.on("end", () => {
            let data = Buffer.concat(chunks, size);
            let html = data.toString();

            let $ = cheerio.load(html);

            writeDb(url,$("title").text(),table_name);

            $("a").each((index, value) => {
                let _url = $(value).attr("href");
                _url = /^#/g.test(_url) ? '/' + _url : _url;
                if (_url != undefined) {
                    if (/^http:\/\//g.test(_url) || /^https:\/\//g.test(_url)) {
                        if(exitsArr.indexOf(_url) === -1 ){
                            url_arr.push(_url);
                            exitsArr.push(_url)
                        }    
                    } else {
                        if(exitsArr.indexOf(url + _url) === -1 ){
                            url_arr.push(url + _url);
                            exitsArr.push(url + _url)
                        }
                        
                    }
                }
            })
        })
    })
}


module.exports = { dealHttpUrl,dealHttpsUrl };