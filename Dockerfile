FROM php:8.2-fpm

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \              
    zip \
    unzip \
    curl \
    git \
    nodejs \
    npm

RUN docker-php-ext-install pdo pdo_mysql pdo_pgsql mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . /var/www

RUN composer install

RUN npm install

RUN npm run build

RUN chown -R www-data:www-data /var/www

EXPOSE 9000

CMD ["php-fpm"]
