FROM node:14

WORKDIR /app

COPY ./package*.json .
COPY ./.env .

RUN npm install

COPY ./dist/ ./dist/

EXPOSE 3000

CMD npm start