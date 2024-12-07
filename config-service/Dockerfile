FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} config-ms.jar
ENTRYPOINT ["java","-jar","/config-ms.jar"]
