import pika
import model
import json

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

channel.queue_declare(queue='simulations')
channel.queue_declare(queue='results')

def callback(ch, method, properties, body):
    requestParams = json.loads(body.decode('utf-8'))

    results = model.ml_predict()
    print(results)

    # send a message back
    channel.basic_publish(exchange='',
                          routing_key='results',
                          body=json.dumps(results, ensure_ascii=False))

    # connection.close()

#  receive message and complete simulation
channel.basic_consume('simulations' ,callback ,auto_ack=True )

channel.start_consuming()