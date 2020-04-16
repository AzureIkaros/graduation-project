const https = require("https");

https.get("https://blog.csdn.net/mutong8688/article/details/105474996?depth_1-utm_source=distribute.pc_feed.174454&utm_source=distribute.pc_feed.174454", (res) => {
    let chunks = [];
    let size = 0;
    res.on('data', (chunk) => {
        chunks.push(chunk);
        size += chunk.length;
    });
    res.on("end", () => {
        let data = Buffer.concat(chunks, size);
        let html = data.toString();
        console.log(html)
    })
})