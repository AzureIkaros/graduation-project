const elasticsearch = require("elasticsearch");
let client = elasticsearch.Client({
    host:"127.0.0.1:9200",
})
async function analyze( str ){
    let resp;
    try{
        resp = await client.indices.analyze({
            body:{
                "analyzer":"ik_smart",
                "text":str
            }
        })
    }catch(e){
        resp = null;
    }
    return resp;
}

module.exports=  analyze;