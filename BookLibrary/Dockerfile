FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

# Use the .NET Core 7 SDK as a build image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["BookLibrary.csproj", ""]
RUN dotnet restore "./BookLibrary.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "BookLibrary.csproj" -c Release -o /app/build

# Publish the API
FROM build AS publish
RUN dotnet publish "BookLibrary.csproj" -c Release -o /app/publish

# Final stage/image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BookLibrary.dll"]
