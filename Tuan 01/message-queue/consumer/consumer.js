const amqp = require('amqplib');

const RABBITMQ_URL = 'amqp://localhost';
const QUEUE_NAME = 'message_queue';

async function receiveMessage() {
  try {
    // Kết nối RabbitMQ
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    // Khai báo queue
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    // Chỉ xử lý 1 message tại 1 thời điểm
    await channel.prefetch(1);

    console.log('👂 Consumer is waiting for messages...');

    channel.consume(
      QUEUE_NAME,
      (msg) => {
        if (msg) {
          const content = JSON.parse(msg.content.toString());
          console.log('📥 Received message:', content);

          // Giả lập xử lý
          setTimeout(() => {
            console.log('✅ Processed message');
            channel.ack(msg);
          }, 1000);
        }
      },
      { noAck: false }
    );

  } catch (error) {
    console.error('❌ Consumer error:', error);
  }
}

receiveMessage();
