FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} eureka-ms.jar
ENTRYPOINT ["java","-jar","/eureka-ms.jar"]
