FROM node:16

# yee we need this i guess, we need to test this thoo
RUN apt-get update || : && apt-get install python -y   



WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

ENTRYPOINT [ "node", "/app/dist/app.js"]