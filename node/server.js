var express = require('express');
var amqp = require('amqplib/callback_api')

const app = express();

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
        con.createChannel((err, ch) => {
            if (err){
                return console.log(err);
            }
            var simulations = 'simulations';
            ch.assertQueue(simulations, {durable: false});

            var results = 'results';
            ch.assertQueue(results, {durable: false});

            ch.sendToQueue(simulations, new Buffer(JSON.stringify(input)));

            ch.consume(results, (msg) => {
                return res.send(msg.content.toString())
            }, {noAck: true});
            setTimeout(() => {con.close()}, 500);
        })
    })
}

app.listen('3000', () => {
    console.log('server running on port 3000');
})