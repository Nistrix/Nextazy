const amqp = require("amqplib");
const config = require("./config/rabbitConfig");

  async function consumeMessages() {
    //creating channel
    const connection = await amqp.connect(config.rabbitMQ.url);
    const channel = await connection.createChannel();


    //create exchange
    const exchangeName = config.rabbitMQ.exchangeName;
    await channel.assertExchange(exchangeName, "direct");

    //create queue
    const q = await channel.assertQueue("ErrosAndWarningQueue");

    //binding
    await channel.bindQueue(q.queue, exchangeName, 'Warning');
    await channel.bindQueue(q.queue, exchangeName, 'Error');

    channel.consume(q.queue,(msg)=>{
      const data = JSON.parse(msg.content);
      console.log(data);
      channel.ack(msg); //producer has been ackwlgd
    });
  }

  consumeMessages();

