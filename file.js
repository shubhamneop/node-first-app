const fs  = require('fs');

const files = fs.readdirSync('./');

// console.info(files);
 fs.readdir('./', function(error,files) {
  if(error) console.info("Error",error)
  else console.log("Result",files)
})