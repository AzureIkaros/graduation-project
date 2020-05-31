const cheerio = require("cheerio");
const connection = require("./mysql");
const superagent = require("superagent");

let writeDb = (url, title, table_name, text) => {
    connection.query(`insert into ${table_name} (url,title,clickNum,table_name,text) values('${url}','${title}',0,'${table_name}','${text}')`, (error, result) => {
        if (error)
            console.log("mysqlError:" + error)
        console.log("数据库写入了")
    })
}


let dealHttpUrl = (url, url_arr, table_name) => {
    try {
        superagent.get(url)
            .end((err, sres) => {
                // 常规的错误处理
                console.log("error")

                try {
                    var $ = cheerio.load(sres.text);
                    writeDb(url, $("title").text(), table_name, $("body").text().replace(/[\n,\s,','']/g, ""));
                    $("a").each((index, value) => {
                        let _url = $(value).attr("href");
                        _url = /^#/g.test(_url) ? '/' + _url : _url;
                        if (_url != undefined) {
                            if (/^http:\/\//g.test(_url) || /^https:\/\//g.test(_url)) {
                                url_arr.push(_url);
                            } else {
                                url_arr.push(url + _url);
                            }
                        }
                    })
                } catch (err) {
                    console.log("error")
                }

            });
    }catch(e){
        console.log("error")
    }

}

module.exports = {
    dealHttpUrl
};