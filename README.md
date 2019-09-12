# kafka-local
Setup local kafka 

### Instructions to setup local kafka docker
run `docker build . -t "kafka-local"` 

run `docker run -itp 9092:9092 kafka-local`

### Testing

 run `node producer.js`
 
 run `node consumer.js`

