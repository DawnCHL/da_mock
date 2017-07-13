FROM reg.miz.so/bernie/centos-node:v4.4.5
MAINTAINER dawn <dawn@hyx.com>

WORKDIR /da_mock
ENV CONFIG_DIR ./config
ENV DEBUG auth:*

RUN mkdir -p /da_mock

COPY ./node_modules /da_mock/node_modules
COPY ./dist /da_mock/
COPY ./task /app/task

COPY ./package.json /da_mock/
COPY ./gulpfile.js /da_mock/
COPY ./config /da_mock/config

CMD ["start","node index"]