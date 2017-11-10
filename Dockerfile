FROM node:6-alpine

RUN mkdir -p /src
ADD . /src
WORKDIR /src
RUN npm i
RUN npm run build
