FROM node:14

WORKDIR /app

COPY ./package*.json .

COPY ./prisma ./prisma/

COPY ./.env .

COPY ./tsconfig.json ./

RUN npm install

COPY ./dist/ ./dist/

RUN npx prisma generate

EXPOSE 3000

CMD npm start