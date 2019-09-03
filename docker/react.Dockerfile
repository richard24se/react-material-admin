FROM node:10-alpine

WORKDIR /react
RUN apk add --no-cache \
    autoconf \
    automake \
    bash \
    g++ \
    make
COPY ./react/package* /react/
RUN yarn install
COPY ./react /react