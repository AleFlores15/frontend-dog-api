FROM node:20.4 as build

ARG environment
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm install -g @angular/cli
RUN ng build --configuration $environment


FROM nginx:1.17.0-alpine

#COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/frontend-dog-api /usr/share/nginx/html
