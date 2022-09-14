# Building the app
FROM node:14-alpine as build 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Deploying the app
FROM nginx:latest
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80