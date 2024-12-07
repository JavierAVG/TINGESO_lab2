FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} evaluation-ms.jar
ENTRYPOINT ["java","-jar","/evaluation-ms.jar"]
