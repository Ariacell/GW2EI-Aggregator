FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 5000
CMD [ "yarn", "start:dev" ]