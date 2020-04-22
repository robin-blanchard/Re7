FROM node:alpine AS build
ARG REACT_APP_BACKEND_URL

ENV REACT_APP_BACKEND_URL $REACT_APP_BACKEND_URL

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine AS finale

COPY --from=build /build/ /usr/share/nginx/html/


RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

COPY boot.sh .
RUN chmod +x /boot.sh && dos2unix /boot.sh

CMD ["/boot.sh"]