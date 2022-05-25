# Build environment
FROM node:16.15.0 as builder

WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install --force
COPY . /usr/src/app
RUN npm run build

# Production environment
FROM nginx:1-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]