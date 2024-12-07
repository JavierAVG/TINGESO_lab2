FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} client-ms.jar
ENTRYPOINT ["java","-jar","/client-ms.jar"]
