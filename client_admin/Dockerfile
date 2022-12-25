FROM node:lts-alpine

LABEL authors="Nguyen Huu Duc Thanh"
LABEL description="Client admin website ToiMuaSach"
LABEL version="0.0.1"

ENV NODE_ENV=production

WORKDIR /usr/app/toi-mua-sach/admin

COPY package*.json ./

RUN npm i --production --silent

COPY . .

EXPOSE 3001
RUN chown -R node /usr/app/toi-mua-sach/admin
USER node
CMD [ "npm", "run", "build" ]
