BookLibrary Project

# Requirements

1. .NET 7 
1. ReactJS
1. SQL Server Management
1. Bonus: Bootstrap and Axios

# Instructions

In order to start the project, I have build a docker-compose that because of the time I was not able to integrate all the solutions here
but the idea of the Docker-Compose file is to orchestrate all the projects dotnet API, React Client and SQL Server only by calling 
"docker-compose up" this helps in local environments to avoid any individual start up of the projects.

Since that was no included you can start the project here are the instructions to start it

1. Run "docker-compose up in root folder to iniciate the SQL Server"
1. Start the dotnet application via cli with the following two commands: 
1.1 dotnet dev-certs https
1.2 dotnet run --project BookLibrary/BookLibrary.csproj 
1. Install all the dependencies of ReactJS with the command "npm install"
1. Start the react project with "npm run dev"

With this you will get the project up and running and you will find the pagination and search bar workable as requested via platform instructions.

# Azure Deployment

I have vast of experienece working with AKS, but unfortunately I have not free trial chance since I already use it a couple of years ago, so without resources 
I was no able to upload it to AKS, but of course I can discuss about my strategies to upload it if needed.