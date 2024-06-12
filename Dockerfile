FROM node:18-alpine
WORKDIR /src
COPY package.json package-lock.json ./
# RUN npm install esbuild@0.18.20
RUN npm install
COPY . .
EXPOSE 5173
CMD npm run dev 