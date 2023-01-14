import express from "express";
import truecallerjs from "truecallerjs";
import bodyParser from "body-parser";
var app = express(); 
import path from "path"
import fs  from "fs";
const __dirname = path.resolve();
app.get('/',function(req,res){ 
  res.sendFile(path.join(__dirname+'/index.html')); 
  //__dirname : It will resolve to your project folder. 
}); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/info', function (req, res) {  
    var p_num = req.body.num;
    console.log(p_num);
    var searchData = {
        number: p_num,
        countryCode: "IN",
        installationId: "a1i0I--cc9ivxFQkQml2IJ-QDAq-IbsV4FPbtfGziqqoav9F3Y884BZS66ceCNS1"
        
    }
    
    var sn = truecallerjs.searchNumber(searchData);
    sn.then(function(response) {
        //console.log(response)
        res.writeHead(200);
        //res.end(JSON.stringify(response, null, 3));
        fs.writeFile('users.json', JSON.stringify(response, null, 3), err => {
            if (err) {
              throw err
            }
            console.log('JSON data is saved.')
          })
    //     fs.readFile('users.json',
    //       // callback function that is called when reading file is done
    //       function(err, data) {       
    //           // json data
    //           var jsonData = data;
       
    //           // parse json
    //           var jsonParsed = JSON.parse(jsonData);
       
    //           // access elements
    //           res.end("Name is: "+jsonParsed.data[0].name);
              
    //   });
    }); 
 });  

app.listen(8080); 
console.log("Server running at Port 8080");  


