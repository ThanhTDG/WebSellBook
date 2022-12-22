FROM nginx:stable-alpine

WORKDIR /etc/nginx/sites-available

RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY *toimuasach.click.conf .

CMD [ "sudo", "ln", "-s", "/etc/nginx/sites-available/*toimuasach.click.conf", "/etc/nginx/sites-enabled" ]
