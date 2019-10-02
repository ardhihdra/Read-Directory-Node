const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
  let path = ".";
  path += req.url;
  if(path == './favicon.ico') path = "./";
  //if(!fs.existsSync(path)) res.statusCode = 204;

  let arrayTarget = req.url.split("/")
  let target = arrayTarget[arrayTarget.length-1]
  //console.log(path)

  fs.stat(path, (error,stats) => {
    if(error) throw error;

    if(stats.isDirectory()) {

      fs.readdir(path, (err,items) => {
        if(err) throw err;
        //console.log('readdir')
        let listItem = "";

        for(var i = 0; i < items.length; i++) {
          stats2 = fs.statSync(path + "/" + items[i])
          if(stats2.isDirectory()) {
            listItem += "/direktori " + items[i];
            listItem += "\n";
          } else if(stats2.isFile()) {
            listItem += "/file " + items[i] + " - " + stats2.size + " B";
            listItem += "\n";
          }
        }
        res.write(listItem);
        res.end();
      })

    } else if (stats.isFile()) {
      let message = "File " + target + ", ukuran " + stats.size + " B";
      console.log(message);
      res.write(message);
      res.end();
    }

  })
  //
})

server.listen(3000);

/*
if(process.argv.length < 2) {
  console.log("find" + __filename );
  process.exit(-1);
}

let path = process.argv[2]

fs.readdir(path, (error,items) => {
  console.log(items);
  let listItem = "";
  for(var i = 0; i < items.length; i++) {
    console.log(items[i]);
  }
})
*/
//
