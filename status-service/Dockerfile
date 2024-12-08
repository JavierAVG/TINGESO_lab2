FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} status-service.jar
ENTRYPOINT ["java","-jar","/status-service.jar"]
