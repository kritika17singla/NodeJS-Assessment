var express =require ('express');
var crawler =require( './web_crawler/crawler');


var app=express();
var fs=require('fs');
var port=3001;




app.get('/',(req,res)=>{
  var data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
  res.status(200).send(data);
})

app.get('/product/:x&:y',(req,res)=>{
  var data=req.params;
  var product=data.x*data.y;
  console.log(product);
  res.status(200).send("Product is "+product);
})

app.get('/nonrepeating/:s',(req,res)=>{
var data=req.params;
console.log(data);
var string=data.s;
  for (var i = 0; i < string.length; i++) {
    var c = string.charAt(i);
    if (string.indexOf(c) == i && string.indexOf(c, i + 1) == -1) {
      res.status(200).send("First non repeating character is "+c);
    }
  }
  res.status(200).send("No character is repeating");

})


app.post('/fileUpload',(req,res)=>{
   req.on('data', (data) => {
     fs.writeFile('newFile.txt', data, (err) => {
     if (err) throw err;
 });
   });
   req.on('end', () => {
     res.status(200).send('file saved');
   });
})


app.get('/crawler',(req,res)=>{

  crawler(req.query.url,(data,err)=>{
    console.log(data);
    if(err){
      res.send(err);
    }
    if(data=="true"){
        res.status(200).send("done");
    }
  })
})

app.listen(port);

console.log("Server running at http://localhost:" + port );
