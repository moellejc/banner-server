FROM node:18

WORKDIR /app

COPY ./package*.json .

COPY ./drizzle ./drizzle/

COPY ./.env* .

COPY ./tsconfig.json ./

COPY ./codegen.yml .

COPY ./generator ./generator/

COPY ./src ./src

RUN npm install

RUN npm run build

RUN npx drizzle:migration:generate

EXPOSE 3000

CMD npm start