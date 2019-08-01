FROM nevergone/alpine-yarn:3.10.0

ADD client.js /opt/app/client.js

WORKDIR /opt/app


# Install yarn
RUN mkdir -p /opt/

ENV PATH "$PATH:/usr/local/bin"

ADD package.json *yarn* /tmp/

# Copy cache contents (if any) from local machine
# ADD .yarn-cache.tgz /

# Install packages
RUN cd /tmp && yarn && mkdir -p /opt/app && cd /opt/app && ln -s /tmp/node_modules

# Copy the code
ADD . /opt/app

RUN  ls && yarn deploy

RUN echo "Successfully ran deploy"

RUN yarn add ftp-client

WORKDIR /opt/app

RUN yarn node client.js

RUN ls

WORKDIR /opt/

RUN ls

WORKDIR /

RUN ls
