const connection = require("../utils/mysql");
const https = require("https");
const http = require("http");
const { dealHttpUrl,dealHttpsUrl } = require("./dealSpider");

const spider = {
    url: "",
    keyword: "",
    table_name: "",
    state_flag: 0,
    start_flag: false,
    end_flag: true,
    stop_flag: true,
    radio_flag: false,
    num: 0,
    startnum:0,

    timer: null,
    work_flag: null,


    url_arr: [], //保存爬取的url


    setSpiderInfo(info, res) {
        connection.query(`select * from tableset where table_name = "${info.table_name}"`, (error, result) => {
            if (result.length == 0) {

                connection.query(`insert into tableset (table_name,title) values("${info.table_name}","${info.keyword}")`, (error) => {
                    if (error) {
                        res.json({
                            status: 0,
                            error: 2
                        })
                    } else {
                        connection.query(`create table ${info.table_name}(id int primary key auto_increment,
                            url varchar(1000),
                            title varchar(256),
                            clickNum int,
                            table_name varchar(256),
                            text longtext,
                            fulltext index full_text(text) with parser ngram)`, (error, result) => {
                            if (error) {
                                console.log("createTableError")
                                res.json({
                                    status: 0,
                                    error: 2
                                })
                            } else {
                                this.url = info.url;
                                this.keyword = info.keyword;
                                this.table_name = info.table_name;
                                this.num = info.num;

                                this.start_flag = true;
                                this.radio_flag = true;
                                this.stop_flag = false;
                                this.end_flag = false;
                                this.state_flag = 1;
                                this.work_flag = true;

                                this.spiderGetUrl();
                                this.spiderMainWork();


                                res.json({
                                    status: 0,
                                    error: 0
                                })
                            }
                        })
                    }
                })
            } else {
                res.json({
                    status: 0,
                    error: 1
                })
            }
        });

    },
    getSpiderInfo() {
        return {
            url: this.url,
            keyword: this.keyword,
            table_name: this.table_name,
            state_flag: this.state_flag,
            start_flag: this.start_flag,
            end_flag: this.end_flag,
            stop_flag: this.stop_flag,
            radio_flag: this.radio_flag
        }
    },
    endSpider() {
        this.url = "";
        this.keyword = "";
        this.table_name = "";
        this.state_flag = 0;
        this.start_flag = false;
        this.stop_flag = true;
        this.end_flag = true;
        this.radio_flag = false;
        this.num = 0;
        this.url_arr = [];
        clearInterval(this.timer);

        return this.getSpiderInfo();
    },
    stopSpider() {
        this.work_flag = !this.work_flag
        if (this.work_flag) {
            //继续工作
            this.spiderMainWork();
        } else {
            //暂停工作
            clearInterval(this.timer);
        }
    },
    spiderMainWork() {
        this.timer = setInterval(() => {
            this.url_arr = Array.from(new Set(this.url_arr));
            if(this.url_arr.length === 0){
                clearInterval(this.timer);
                console.log("没数据了")
                this.endSpider()
                return;
            }
            this.url = this.url_arr.shift();
            dealHttpUrl(this.url,this.url_arr,this.table_name)
            this.startnum++;
            if(this.num !== 0){
                if(this.startnum === this.num)
                    this.endSpider();
            }
        }, 1000);
    },
    spiderGetUrl() {
        dealHttpUrl(this.url,this.url_arr,this.table_name)
        this.startnum++;
    }

}



module.exports = spider;