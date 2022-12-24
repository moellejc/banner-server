FROM node:18

WORKDIR /app

COPY ./package*.json .

COPY ./prisma ./prisma/

COPY ./.env.example ./.env

COPY ./.env* .

COPY ./tsconfig.json ./

COPY src ./src

RUN npm install

RUN npm build

RUN npx prisma generate

EXPOSE 3000

CMD npm start