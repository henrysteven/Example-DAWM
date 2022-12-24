FROM node:16.17.1
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .
CMD [ "npm", "start" ]