module.exports = {
   "proxy": {

		 				'/api/**': {
		 					target: 'https://ryanspice.com',
		 					secure: false,
		 					changeOrigin: true
		 				},

						'/images/**': {
							target: 'https://ryanspice.com',
							secure: false,
							changeOrigin: true
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
