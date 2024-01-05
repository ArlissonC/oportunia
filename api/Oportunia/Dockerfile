#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Oportunia/Oportunia.Api.csproj", "Oportunia/"]
COPY ["Oportunia.Business/Oportunia.Business.csproj", "Oportunia.Business/"]
COPY ["Oportunia.Data/Oportunia.Data.csproj", "Oportunia.Data/"]
COPY ["Oportunia.Domain/Oportunia.Domain.csproj", "Oportunia.Domain/"]
COPY ["Oportunia.Utils/Oportunia.Utils.csproj", "Oportunia.Utils/"]
RUN dotnet restore "Oportunia/Oportunia.Api.csproj"
COPY . .
WORKDIR "/src/Oportunia"
RUN dotnet build "Oportunia.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Oportunia.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Oportunia.Api.dll"]