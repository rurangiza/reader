FROM node:20-alpine AS build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine AS production
COPY --from=build /build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]