FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} simulator-service.jar
ENTRYPOINT ["java","-jar","/simulator-service.jar"]
