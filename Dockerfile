FROM sinet/nginx-node:latest

RUN mkdir -p /src
ADD . /src
RUN mkdir -p /etc/nginx/conf.d
COPY nginx.conf /etc/nginx/conf.d/
COPY default.conf /etc/nginx/conf.d/
WORKDIR /src
RUN npm i
RUN npm run build
RUN /etc/init.d/nginx start
