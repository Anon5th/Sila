FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json tsconfig.json ./
RUN npm install --no-audit --no-fund

COPY src ./src
COPY public ./public

RUN npx tsc

FROM node:20-alpine AS runtime

WORKDIR /app

RUN apk add --no-cache curl

COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --start-period=10s --retries=5 \
    CMD curl -fs http://localhost:3000/api/health || exit 1

CMD ["node", "dist/index.js"]
