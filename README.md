# AircraftPerformanceCalculator

AircraftPerformanceCalculator is a full-stack web appplication that utilizes the Angular, Spring Boot, MySQL, and Bootstrap. It contains a dashboard that receives initial aircraft data from the user and queries environmental conditions to output the respective performance parameters for the L39-ZA light attack aircraft. More information in the project can also be found in the presentation, which is included in the main directory.

## Running the Project

The project contains three servers that need to be configured and ran in development mode (MySQL, Spring Boot, and Angular).

Firstly a MySQL server will need to be ran on port `http://localhost:3306`.

In order to run Spring Boot from the command line do the following:

In the `Java` directory you can run `mvn spring-boot:run` which will start the application on `http://localhost:8080`.

Note: In order for Spring Boot to interface with the MySQL server, the `application.yml` configuration file located in 
`AircraftPerformanceCalculator/java/src/main/resources/` will need to be updated to match your MySQL server credentials.

To start the front-end, you can go to the `Front-End` directory and run `npm install` to install the packages and then `npm run serve` to start the server.

The full application should now be running and the UI can be accessed from `http://localhost:4200`.
