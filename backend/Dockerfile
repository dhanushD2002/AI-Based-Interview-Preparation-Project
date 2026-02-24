FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

# Fix mvnw permission (Windows → Linux issue)
RUN chmod +x mvnw

# Build Spring Boot
RUN ./mvnw clean package -DskipTests

EXPOSE 8080

# ⚠️ Change jar name if needed
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]