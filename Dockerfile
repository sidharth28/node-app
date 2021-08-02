# FROM node:8

# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# COPY package*.json ./

# RUN npm install
# # If you are building your code for production
# # RUN npm install --only=production

# # Bundle app source
# COPY . .

# EXPOSE 8080
# CMD [ "npm", "start" ]


FROM node:12.11.1-alpine as base
RUN mkdir /home/app
WORKDIR /home/app
# COPY ./.npmrc ./.npmrc
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
FROM base as private-npm-installer
RUN apk update && apk upgrade && \
    apk add --no-cache python make g++ git
FROM private-npm-installer as production-modules
RUN npm ci --production
FROM private-npm-installer as build
RUN npm ci
COPY . .
RUN npm run build
FROM base as release
COPY --from=production-modules /home/app/node_modules /home/app/node_modules
COPY --from=build /home/app/dist /home/app
CMD ["npm","start"]