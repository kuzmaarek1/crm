FROM node:18.12.1-alpine
WORKDIR /app
COPY package.json /app/
RUN npm install -g npm@9.2.0
COPY . /app/
EXPOSE 3000
CMD ["npm", "start"]