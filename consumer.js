const Kafka = require('no-kafka');
const Promise = require('bluebird');
const consumer = new Kafka.GroupConsumer();
const topic = 'test-topic';


const dataHandler = function (messageSet, topic, partition) {
    return Promise.each(messageSet, function (m) {
        console.log(topic, partition, m.offset, m.message.value.toString('utf8'));
        // commit offset
        return consumer.commitOffset({ topic: topic, partition: partition, offset: m.offset, metadata: 'optional' });
    });
};

const strategies = [{
    subscriptions: [topic],
    handler: dataHandler
}];

consumer.init(strategies);
