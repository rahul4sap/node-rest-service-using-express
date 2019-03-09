'use-strict';

const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.get('/read', (req, res) => {
    fs.readFile('packets-received-from-dynatrace.json', (err, data) => {
        if(err) throw err;        
        res.status(200).send(data);
    });
});

app.delete('/remove', (req, res) => {
    fs.writeFile('packets-received-from-dynatrace.json', '', (err) => {              
        if (err) throw err;
        res.status(202).send('Data deleted sucessfully from file');
    });  
});

app.use('/', (req, res, next)=>{
    if (req.path == "/" && req.method == "POST") {
        const body = [];
        req.on("data", (chunk) => {
            //console.log('Chunk is: ' + chunk);
            body.push(chunk);
        });
        req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            //console.log('Buffer.concat(body): '+ Buffer.concat(body));
            //console.log('ParsedBody: '+parsedBody);        
            fs.appendFile('packets-received-from-dynatrace.json', `${parsedBody}\n`, (err) => {              
                if (err) throw err;
                console.log('Data saved in file!');
            });        
            //console.log(message);
        });
        //console.log('Body is: '+ body);    
        res.status(202).send('Data inserted succesfully into file');
    }
});

app.listen(port, () => console.log(`Node REST service using express listening on port ${port}!`));