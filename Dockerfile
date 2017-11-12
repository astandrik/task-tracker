FROM sinet/nginx-node:latest

RUN mkdir -p /src
ADD . /src
COPY nginx.conf /etc/nginx/conf.d/
WORKDIR /src
RUN npm i
RUN npm run build
