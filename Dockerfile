FROM node:24-alpine

WORKDIR /usr/src/products

RUN chown -R node:node /usr/src/products

COPY ./products/package*.json ./

USER node

RUN npm install

COPY ./products .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]