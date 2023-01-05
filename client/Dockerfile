FROM node:lts-alpine

LABEL authors="Nhu Van Huu"
LABEL description="Client website ToiMuaSach"
LABEL version="0.0.1"

ENV NODE_ENV=production

WORKDIR /usr/app/toi-mua-sach/client

COPY package*.json ./

RUN npm i --production --silent

COPY . .

EXPOSE 3000
RUN chown -R node /usr/app/toi-mua-sach/client
USER node
CMD [ "npm", "run", "build" ]
