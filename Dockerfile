FROM node:16-alpine3.11

WORKDIR /usr/app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3001

CMD ["yarn", "dev"]

