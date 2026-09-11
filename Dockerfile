FROM node:20-alpine AS base
WORKDIR /app
# Prisma's query/schema engines are native binaries that link against OpenSSL.
# node:20-alpine ships without it, which causes cryptic "Could not parse schema
# engine response" / JSON parse errors at runtime - installing it here (and it
# being present in every stage that inherits from `base`) fixes that.
RUN apk add --no-cache openssl libssl3

FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm install

FROM deps AS build
COPY . .

RUN npx prisma generate
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY package.json ./

EXPOSE 4000

CMD ["npm", "run", "start:dev","sh", "-c", "npx prisma migrate deploy && node dist/main"]
