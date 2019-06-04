module.exports = {
   "proxy": {
      "/api/dealerblock/**": {
         "target": "https://0u45cbfika.execute-api.us-east-1.amazonaws.com/testdev/",
         "secure": false,
         "changeOrigin": true
      },
      "/api/**": {
         "target": "https://us-east-1-testdev.nw.adesa.com/",
         "secure": false,
         "changeOrigin": true
      },
      "/search/**": {
         "target": "https://nw-search-apigw-testdev.nw.adesa.com/testdev/api/",
         "secure": false,
         "changeOrigin": true
      },
      "/assets/img/**": {
        "target": "https://us-east-1-testdev.nw.adesa.com/",
        "secure": false,
        "changeOrigin": true
      },  
      "/assets/js/**": {
        "target": "https://us-east-1-testdev.nw.adesa.com/",
        "secure": false,
        "changeOrigin": true
      },           
      "/static-components/**": {
         "target": "https://us-east-1-testdev.nw.adesa.com/",
         "secure": false,
         "changeOrigin": true
      },
      "/apps/**": {
         "target": "https://us-east-1-testdev.nw.adesa.com/",
         "secure": false,
         "changeOrigin": true
      }
   },

    "historyApiFallback": true,
   "contentBase": "./dist",
   "hot": false,
   "inline": true,
   "compress": false,
   "stats": {
      "assets": true,
      "children": true,
      "chunks": true,
      "hash": true,
      "modules": true,
      "publicPath": false,
      "timings": true,
      "version": true,
      "warnings": true,
      "colors": {
         "green": "\u001b[36m"
      }
   }
}
