FROM node:lts-alpine

LABEL authors="Duong Hieu"
LABEL description="API website ToiMuaSach"
LABEL version="0.0.8"

ENV NODE_ENV=production

WORKDIR /usr/app/toi-mua-sach/api

COPY package*.json ./

RUN npm i --production --silent

COPY . .

EXPOSE 5000
RUN chown -R node /usr/app/toi-mua-sach/api
USER node
CMD [ "npm", "start" ]
