FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} loan-ms.jar
ENTRYPOINT ["java","-jar","/loan-ms.jar"]
