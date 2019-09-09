const express    = require('express');
const multer     = require('multer');
const bodyParser = require('body-parser');
var amqp = require('amqplib/callback_api');
const MongoClient    = require('mongodb').MongoClient;


const app = express();

app.use(bodyParser.json())

const Storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './images')
    },
    filename(req, file, callback) {
        callback(null, `test1.png`)
    },
})

const upload = multer({ storage: Storage })

MongoClient.connect('mongodb+srv://aman:bewda@cluster0-cvvwa.mongodb.net/test?retryWrites=true&w=majority', (err, db) => {
    if (err) {
        console.log(err);
        return;
    }
    else {
        app.get('/', (req, res) => {
            console.log('working on something');
            res.send('Hello There');
        })
        
        app.get('/r/:str', (req, res) => {
            var dbo = db.db('NPR');

            dbo.collection('NPR').findOne({key: 'str'})
            .then((doc) => {
                res.send(doc);
            })
        });
    }
})

app.post('/predict', upload.single('test'), predict);

function predict(req, res){
    console.log('file', req.files)
    console.log('body', req.body)

    const exec = require('child_process').exec;
    exec('predict.bat', (err, stdout, stderr) => {
        if (err){
            console.error(err);
            res.send('error')
            return;
        }
        
        if (stderr){
            console.error(stderr);
            res.send('error')
            return;
        }

        res.send(stdout);
    })
}

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

app.listen(8000, () => {
    console.log('server running on port 8000');
})