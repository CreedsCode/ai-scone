FROM node:16

# yee we need this i guess, we need to test this thoo
RUN set -xe \
  && apt-get update -y \
  && apt-get install python -y \
  && apt-get install python3-pip -y
RUN pip3 install --upgrade pip
RUN pip3 install huggingface_hub langchain transformers pandas  

WORKDIR /app
COPY . .
RUN pip3 install tensorflow-1.13.2-cp37-cp37m-linux_x86_64.whl
RUN npm install
RUN npm run build

ENTRYPOINT [ "node", "/app/dist/app.js"]