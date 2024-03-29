FROM ubuntu:latest
RUN apt update
RUN apt install openjdk-8-jdk net-tools vim wget -y
WORKDIR /opt
RUN wget http://apachemirror.wuchna.com/kafka/2.2.0/kafka_2.12-2.2.0.tgz
RUN tar -xvzf kafka_2.12-2.2.0.tgz
RUN mv kafka_2.12-2.2.0 kafka
WORKDIR /opt/kafka
RUN cp config/server.properties config/serverorg.properties
RUN sed -i '/^#listeners=*/s/^#//' config/server.properties
RUN sed -i '/^#advertised.listeners=*/s/^#//' config/server.properties
RUN sed -i '/^advertised.listeners=*/s/your.host.name/localhost/' config/server.properties 
RUN echo "#!/bin/bash" >start.sh
RUN echo "nohup bin/zookeeper-server-start.sh config/zookeeper.properties &" >>start.sh
RUN echo "nohup bin/kafka-server-start.sh config/server.properties &" >>start.sh
RUN echo "tail -f nohup.out" >>start.sh
RUN chmod +x start.sh
EXPOSE 2181 9092
CMD ./start.sh
