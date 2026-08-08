FROM node:24-alpine

WORKDIR /usr/src/orders

RUN chown -R node:node /usr/src/orders

COPY ./package*.json ./

USER node

RUN npm install

COPY ./ .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]