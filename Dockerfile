FROM node:11.11.0-alpine

ARG directory=/usr/app

RUN mkdir $directory
WORKDIR $directory

# add `/usr/app/node_modules/.bin` to $PATH
ENV PATH $directory/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json $directory/package.json

RUN yarn install

COPY . $directory/

# start app
CMD ["yarn", "start"]
