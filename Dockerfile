From node:18.14.2-alpine3.17

RUN apk update
RUN apk add nginx


COPY /backend/. /
COPY /frontend/build /var/www/localhost/htdocs/activate-science/20481
COPY /start.sh /
RUN chmod +x /start.sh

COPY default.conf /etc/nginx/http.d/default.conf

ENTRYPOINT ["/bin/sh", "-c", "/start.sh"]
