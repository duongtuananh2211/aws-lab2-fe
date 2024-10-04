# base node image

FROM node:18.18.0-alpine as base

# set for base and all layer that inherit from it

ENV NODE_ENV production

# Install all node_modules, including dev dependencies

FROM base as deps

WORKDIR /app

ADD package.json  ./
RUN npm install --include=dev

# Setup production node_modules

FROM base as production-deps

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
ADD package.json  ./
RUN npm prune --omit=dev

# Build the app

FROM base as build

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules

ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint

FROM base

WORKDIR /app
COPY --from=production-deps /app/package.json /app/package.json

COPY --from=production-deps /app/node_modules /app/node_modules

COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
ADD . .


EXPOSE 3000

CMD ["npm", "start"]