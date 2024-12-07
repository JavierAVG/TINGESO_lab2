FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} simulator-ms.jar
ENTRYPOINT ["java","-jar","/simulator-ms.jar"]
