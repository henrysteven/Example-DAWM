FROM node:16.17.1
LABEL authors="Henry"

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/usr/src/app
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]

# Instalamos angular cli en nuestra imágen
RUN npm install -g @angular/cli@14.2.10
RUN npm i
COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]


