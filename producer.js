const Kafka = require('no-kafka')
const producer = new Kafka.Producer()
producer.init().then(function () {
  console.log('connected to local kafka server on port 9092 ...');
  producer.send({
    topic: 'test-topic',
    partition: 0,
    message: {
      value: `${new Date().toISOString()} Hello!`
    }
  }).then(function (result) {
    console.log('posted result:', result);
    producer.end();
  });
}).catch(e => { console.log('Error : ', e) });
