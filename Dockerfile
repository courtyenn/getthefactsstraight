FROM node:latest
MAINTAINER Courtney Nguyen <courtneythuy@gmail.com>
ADD ./ /var/getthefactsstraight/
WORKDIR /var/getthefactsstraight/
# replace this with your application's default port
RUN npm install
CMD COMPOSELET=NODE_ENV=production MONGOHQ_URL=mongodb://mongo/getthefactsstraight node server
EXPOSE 8080
