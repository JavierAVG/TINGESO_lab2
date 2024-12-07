FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} status-ms.jar
ENTRYPOINT ["java","-jar","/status-ms.jar"]
