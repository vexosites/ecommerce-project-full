FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN ls -R /app/prisma

RUN npm run prisma:generate

EXPOSE 3000

CMD ["sh", "-c", "npm run prisma:db:push && npm run dev"]