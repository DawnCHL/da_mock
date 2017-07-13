FROM daocloud.io/node
MAINTAINER dawn <dawn@hyx.com>

WORKDIR /da_mock
ENV CONFIG_DIR ./config
ENV DEBUG auth:*
ENV NODE_ENV prod
RUN mkdir -p /da_mock

COPY ./node_modules /da_mock/node_modules
COPY ./dist /da_mock/
COPY ./task /app/task

COPY ./package.json /da_mock/
COPY ./gulpfile.js /da_mock/
COPY ./config /da_mock/config

CMD ["npm","run","docker"]