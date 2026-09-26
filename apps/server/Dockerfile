FROM node:22-alpine AS builder

WORKDIR /app

# Copy root workspace manifests
COPY package.json package-lock.json* ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/server/package.json ./apps/server/
COPY apps/web/package.json ./apps/web/

RUN npm install

# Copy source
COPY packages/shared ./packages/shared
COPY apps/server ./apps/server

# Build shared and server
RUN npm run build --workspace=@solavin/shared
RUN npm run prisma:generate --workspace=@solavin/server
RUN npm run build --workspace=@solavin/server

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package.json /app/package-lock.json* ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/shared ./packages/shared
COPY --from=builder /app/apps/server/dist ./apps/server/dist
COPY --from=builder /app/apps/server/prisma ./apps/server/prisma
COPY --from=builder /app/apps/server/package.json ./apps/server/package.json

EXPOSE 3001
CMD ["node", "apps/server/dist/main.js"]
