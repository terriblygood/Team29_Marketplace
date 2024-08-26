#!/bin/bash

# Проверяем, передан ли аргумент (тег)
if [ $# -eq 0 ]; then
    echo "Ошибка: не указан тег. Использование: $0 <тег>"
    exit 1
fi

TAG=$1

# Функция для обработки ошибок
handle_error() {
    echo "Ошибка, обратитесь к администратору"
    exit 1
}

# Сборка Docker образа
docker build -t 29_frontend_t1 . || handle_error

# Назначение тегов
docker tag 29_frontend_t1 jubastik/29_frontend_t1:$TAG || handle_error
docker tag 29_frontend_t1 jubastik/29_frontend_t1:latest || handle_error

# Публикация образов на Docker Hub
docker push jubastik/29_frontend_t1:$TAG || handle_error
docker push jubastik/29_frontend_t1:latest || handle_error

echo "Операция успешно завершена"

# Запрос на обновление образа на сервере
read -p "Запустить обновление образа на сервере? [y/N] " choice
case "$choice" in
  y|Y )
    echo "Отправка запроса на обновление..."
    sleep 3
    curl -X POST "https://portainer.gortem.ru/api/stacks/webhooks/56dc6257-733c-4b9c-82da-43e910f9a195" || handle_error
    echo "Запрос на обновление отправлен успешно"
    ;;
  * )
    echo "Обновление на сервере не запущено"
    ;;
esac