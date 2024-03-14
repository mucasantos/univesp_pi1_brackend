FROM node:alpine

WORKDIR /node

COPY package.json .

RUN yarn install

COPY . .

CMD yarn start

EXPOSE 3001