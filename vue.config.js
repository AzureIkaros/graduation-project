module.exports = {
    publicPath: '/',
    devServer: {
        disableHostCheck:true,
        proxy: {
            '/api':{
                target:"http://localhost:3000",
                ws:true,
                changeOrigin:true,
             },
        }
    },
};
