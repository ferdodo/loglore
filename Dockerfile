FROM node
WORKDIR /loglore

RUN npx playwright install-deps
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=critical
RUN npx playwright install

COPY . .
RUN npm run build

FROM nginx
COPY --from=0 /loglore/docs /usr/share/nginx/html
