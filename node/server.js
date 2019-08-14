var express = require('express');
var amqp = require('amqplib/callback_api')

const app = express();

app.get('/', (req, res) => {
    console.log('working on something');
    res.send('Hello There');
})

app.get('/dalembert', callD_alembert);

function callD_alembert (req, res){
    var input = [
        req.query.funds, // starting funds
        req.query.size, // (initial) wager size
        req.query.count, // wager count — number of wagers per sim
        req.query.sims // number of simulations
    ]

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
            
            ch.sendToQueue(simulations, new Buffer(JSON.stringify(input)));
            
            ch.consume(results, (msg) => {
                console.log('result sent');
                return res.send(msg.content.toString())
            }, {noAck: true});
            setTimeout(() => {con.close()}, 500);
        })
    })
}

app.listen( 8080, () => {
    console.log('server running on port 3000');
})