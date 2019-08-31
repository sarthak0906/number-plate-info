const express    = require('express');
const multer     = require('multer');
const bodyParser = require('body-parser');
var amqp = require('amqplib/callback_api')

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

app.get('/', (req, res) => {
    console.log('working on something');
    res.send('Hello There');
})

app.post('/predict', upload.single('test'), predict);

function predict (req, res){
    // console.log('file', req.files)
    // console.log('body', req.body)
    var result = "";
    // res.status(200).json({
    //     message: 'success!',
    // })

    amqp.connect('amqp://localhost', (err, con) => {
        if (err){
            return console.log(err);
        }
        
        console.log('amqp connected');
        con.createChannel((err, ch) => {
            if (err){
                return console.log(err);
            }
            console.log('channel created');
            var simulations = 'simulations';
            ch.assertQueue(simulations, {durable: false});
            
            var results = 'results';
            ch.assertQueue(results, {durable: false});
            
            ch.sendToQueue(simulations, new Buffer(JSON.stringify("something")));
            
            ch.consume(results, (msg) => {
                console.log('result sent');
                result = msg.content.toString();
                console.log('result is ' + result);
                res.end(JSON.stringify({'result': result}));
                // res.send(JSON.stringify({'result': result}));
                // return res.send()
            });
            // setTimeout(() => {con.close()}, 500);
        })
    })

    // res.send(result);
}

app.listen(8000, () => {
    console.log('server running on port 8000');
})