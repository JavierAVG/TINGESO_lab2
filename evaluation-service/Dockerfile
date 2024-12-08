FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} evaluation-service.jar
ENTRYPOINT ["java","-jar","/evaluation-service.jar"]
