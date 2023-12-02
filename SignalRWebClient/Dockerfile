FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

ENV ASPNETCORE_URLS="http://*:8000"
ENV ASPNETCORE_ENVIRONMENT="Development"

WORKDIR /app

COPY . .

RUN dotnet restore

RUN dotnet build

EXPOSE 8000

ENTRYPOINT [ "dotnet", "run" ]
