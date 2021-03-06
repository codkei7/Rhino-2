#!/usr/bin/env bash

echo "Installing NodeJS 6.x and dependencies"

set -ex \
  && for key in \
    9554F04D7259F04124DE6B476D5A82AC7E37093B \
    94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
    0034A06D9D9B0064CE8ADF6BF1747F4AD2306D93 \
    FD3A5288F042B6850C66B31F09FE44734EB7990E \
    71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
    DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
    B9AE9905FFD7803F25714661B63B535A4C206CA9 \
    C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
  ; do \
    gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key"; \
  done

NPM_CONFIG_LOGLEVEL=info
NODE_VERSION=6.3.0

curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
  && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
  && grep " node-v$NODE_VERSION-linux-x64.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
  && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt

echo "Installing yarn package manager, please wait!"
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn

echo "Installing npm packages, please wait!"

#FROM node:6.3

#set env's here, however you'd like in your ansible config
#HOST 0.0.0.0
#PORT 6001

#<setup the repo directories here>
cd /var/www/djavan_site
yarn

#unsafe perm is to allow the use of the package we would be making for npm, i think since we're not using docker and the rest of the package gen stuff this isn't necessary, and since we're using yarn, probably you can skip this, but i haven't tested it.
#npm install --unsafe-perm

#RUN is a docker thing, so if you just set the ENV variable to API_URL in the dev environments, it'll be fine.  the var is in .env file

##this runs webpack to build the jsx and tsx files
#npm run build

##this starts djavan
#npm start
