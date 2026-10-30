FROM node:26-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

# NEXT_PUBLIC_* values are inlined at build time, and pages are prerendered
# with data from Sanity during the build
ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET
ARG NEXT_PUBLIC_UMAMI_SRC
ARG NEXT_PUBLIC_UMAMI_WEBSITE_ID

RUN npm run build

EXPOSE 9000

CMD ["npm", "run", "start"]
