FROM node:24-alpine

WORKDIR /usr/src/gateway

RUN chown -R node:node /usr/src/gateway

COPY ./package*.json ./

USER node

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "run", "start:dev"]