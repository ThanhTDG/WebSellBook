FROM node:lts-alpine

ENV NODE_ENV=production

LABEL authors="Duong Hieu"
LABEL description="API website ToiMuaSach"
LABEL version="0.0.4"

WORKDIR /usr/app/toi-mua-sach/server

COPY package*.json ./

RUN npm i --production --silent && mv node_modules ../

COPY . .

EXPOSE 5000
RUN chown -R node /usr/app/toi-mua-sach/server
USER node
CMD [ "npm", "start" ]
