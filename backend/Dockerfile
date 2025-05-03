# Build Stage
FROM node:23-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

# Run Stage
FROM node:23-alpine

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

EXPOSE 8000

CMD ["node", "app.js"]
