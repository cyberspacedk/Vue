module.exports = {
    configureWebpack: {
        devServer:{
            proxy: {
                "api" : {
                    target: "http://localhost:9000"
                }
            }
        }
    }
}