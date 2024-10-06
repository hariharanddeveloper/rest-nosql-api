FROM node:18

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm install pm2 -g

COPY . .

EXPOSE 3000

CMD ["npm", "run" ,"pm2"]
