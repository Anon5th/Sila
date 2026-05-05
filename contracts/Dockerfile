FROM node:20-alpine

RUN apk add --no-cache curl bash

WORKDIR /app

COPY package.json ./
RUN npm install --no-audit --no-fund

COPY hardhat.config.ts tsconfig.json ./
COPY contracts ./contracts
COPY scripts ./scripts

RUN npx hardhat compile

EXPOSE 8545
