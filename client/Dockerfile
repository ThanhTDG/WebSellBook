FROM node:lts-alpine

ENV NODE_ENV=production

LABEL authors="Nhu Van Huu"
LABEL description="Client website ToiMuaSach"
LABEL version="0.0.1"

WORKDIR /usr/app/toi-mua-sach/client

COPY package*.json ./

RUN npm i --production --silent

COPY . .

EXPOSE 3000
RUN chown -R node /usr/app/toi-mua-sach/client
USER node
CMD [ "npm", "run", "build" ]
