const express = require('express')
const app = express()
const port = process.env.PORT || 8080;
const Kafka = require('no-kafka')
const bodyParser = require('body-parser')


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.get('/', function (req, res) {
  res.send('hello world')
})

app.post('/events', function (req, res) {
  const payload = req.body
  const topic = payload.topic
  
  producer.send({
    topic: topic,
    partition: 0,
    message: payload
  }).then(function (result) {
    res.send('done')
  });

  // send response to client 
  //res.send('ok')

})

const producer = new Kafka.Producer()

producer.init().then(function () {
  console.log('connected to local kafka server on port 9092 ...');

  // respond with "hello world" when a GET request is made to the homepage


  // start the server
  app.listen(port);
  console.log('Server started! At http://localhost:' + port);

} //end producer init
).catch(e => { console.log('Error : ', e) });
