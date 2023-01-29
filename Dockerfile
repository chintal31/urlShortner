FROM node:lts-bullseye-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

COPY . .

EXPOSE 3005

RUN cd frontend/ && npm ci && npm run build

CMD ["npm", "run", "start"]