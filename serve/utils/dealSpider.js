const cheerio = require("cheerio");
const connection = require("./mysql");

let writeDb = (url, title, table_name, text) => {
    connection.query(`insert into ${table_name} (url,title,clickNum,table_name,text) values('${url}','${title}',0,'${table_name}','${text}')`, (error, result) => {
        if (error)
            console.log("mysqlError:" + error)
        console.log("数据库写入了")
    })
}


let dealHttpUrl = (url, url_arr, table_name, serve) => {
    console.log("url有了")
    serve.get(url, (res) => {
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
            console.log("arr添加了")
        }).on('error', (e) => {
            console.log("内部出现错误")
        })
    })
}

module.exports = {
    dealHttpUrl
};