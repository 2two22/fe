FROM node:18-alpine As build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html