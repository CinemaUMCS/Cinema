FROM microsoft/aspnetcore
WORKDIR /dotnetapp
COPY ./bin/Release/PublishOutput .
ENV ASPNETCORE_URLS http://*:5000
ENV ASPNETCORE_ENVIRONMENT docker
ENTRYPOINT dotnet Cinema.dll