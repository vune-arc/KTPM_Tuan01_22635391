const amqp = require('amqplib');

const RABBITMQ_URL = 'amqp://localhost';
const QUEUE_NAME = 'message_queue';

async function sendMessage() {
  try {
    // Kết nối RabbitMQ
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    // Khai báo queue
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    // Message gửi đi
    const message = {
      service: 'producer',
      content: 'Hello RabbitMQ!',
      time: new Date()
    };

    // Gửi message
    channel.sendToQueue(
      QUEUE_NAME,
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );

    console.log('📤 Sent message:', message);

    // Đóng kết nối
    setTimeout(() => {
      channel.close();
      connection.close();
      process.exit(0);
    }, 500);

  } catch (error) {
    console.error('❌ Producer error:', error);
  }
}

sendMessage();
