const express    = require('express');
const multer     = require('multer');
const bodyParser = require('body-parser');
// var amqp = require('amqplib/callback_api');
// const MongoClient    = require('mongodb').MongoClient;
// const puppeteer = require('puppeteer');
const fs = require('fs');
const app = express();

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get('/', (req, res) => {
    console.log('working on something');
    res.send('Hello There');
})

app.post('/fileUp', (req, res) => {
    if (!req.body){
        res.send('FO');
    }
    else {
        // console.log(req.body);
        let base64String = req.body.b64;
        // Remove header
        let base64Image = base64String.split(';base64,').pop();
        fs.writeFile('imageb64.png', base64Image, {encoding: 'base64'}, (err) => {
            console.log('image created');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ "res": "Image created"}));
        })
    }
})

// app.get('/r/:str', async (req, res) => {
//     str = str;
//     cap = req.query.cap;

//     await page.focus('#regn_no1_exact');
//     await page.keyboard.type(str);
//     await page.focus('#txt_ALPHA_NUMERIC');
//     await page.keyboard.type(cap);

//     await page.click('#j_idt42');

//     const result = await page.evaluate(() => {
//         let title = document.querySelector('#rcDetailsPanel > table > tbody > tr:nth-child(4) > td:nth-child(2)').innerText;
//         // let price = document.querySelector('.price_color').innerText;

//         return title;

//     });
// });

// app.post('/file', fileUp);

// app.post('/predict', predict);

// function fileUp(req, res){
//     if (!req.body){
//         console.log('No body recieved in the request to be saved');
//         res.setHeader('Content-Type', 'application/json');
//         res.end(JSON.stringify({ "res": "No file found" }));
//     }
    // else {
    //     console.log(req.body);
    //     let base64String = req.body.b64;
    //     // Remove header
    //     let base64Image = base64String.split(';base64,').pop();
    //     fs.writeFile('imageb64.png', base64Image, {encoding: 'base64'}, (err) => {
    //         console.log('image created');
    //         res.setHeader('Content-Type', 'application/json');
    //         res.end(JSON.stringify({ "res": "Image created"}));
    //     })
    // }
// }

// function predict(req, res){
//     // console.log('file', req.files)
//     console.log('body', req.body)

//     if(req.body.b64){
//         console.log('Does contain file');
//         let base64String = res.body.b64;
//         // Remove header
//         let base64Image = base64String.split(';base64,').pop();
//         const fs = require('fs');
//         fs.writeFile('i.png', base64Image, {encoding: 'base64'}, function(err) {
//             console.log('File created');
//         });
//     }

    // const exec = require('child_process').exec;
    // exec('python3 model.py', (err, stdout, stderr) => {
    //     if (err){
    //         console.error(err);
    //         res.send('error')
    //         return;
    //     }
        
    //     if (stderr){
    //         console.error(stderr);
    //         res.send('error')
    //         return;
    //     }
        
    //     res.send({"result":stdout});
    // })
// }

// function predict (req, res){
//     var result = "";
//     // res.status(200).json({
//     //     message: 'success!',
//     // })

//     amqp.connect('amqp://localhost', (err, con) => {
//         if (err){
//             return console.log(err);
//         }
        
//         console.log('amqp connected');
//         con.createChannel((err, ch) => {
//             if (err){
//                 return console.log(err);
//             }
//             console.log('channel created');
//             var simulations = 'simulations';
//             ch.assertQueue(simulations, {durable: false});
            
//             var results = 'results';
//             ch.assertQueue(results, {durable: false});
            
//             ch.sendToQueue(simulations, new Buffer(JSON.stringify("something")));
            
//             ch.consume(results, (msg) => {
//                 console.log('result sent');
//                 result = msg.content.toString();
//                 console.log('result is ' + result);
//                 res.end(JSON.stringify({'result': result}));
//                 // res.send(JSON.stringify({'result': result}));
//                 // return res.send()
//             });
//             // setTimeout(() => {con.close()}, 500);
//         })
//     })

//     // res.send(result);
// }

var port = 8002;

app.listen(port, () => {    
    console.log('server running on port ' + port);
})
