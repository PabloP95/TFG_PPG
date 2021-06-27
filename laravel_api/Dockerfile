FROM php
RUN apt-get update
WORKDIR /app/laravel_api
COPY . .
RUN docker-php-ext-install pdo pdo_mysql
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
EXPOSE 8000
CMD php artisan serve --host=0.0.0.0
