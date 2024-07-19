# Command line arguments, such as Node version
ARG NODE_VERSION=lts

#
# --- Stage 1: Build ---
#

FROM node:${NODE_VERSION} as build
RUN corepack enable pnpm

ARG BUILD_COMMIT
ARG BUILD_NUMBER
ARG BUILD_TIMESTAMP

# Install dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml tsconfig.json .npmrc ./
RUN pnpm install --frozen-lockfile

# Copy files
COPY . .

# Build & optimize a bit
RUN pnpm run build

#
# --- Stage 2: Run ---
#

FROM ghcr.io/wisemen-digital/nuxt-base:${NODE_VERSION} as final

# Add application
COPY --from=build --chown=nobody /app/.output /app/www/
