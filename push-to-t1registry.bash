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
docker tag 29_frontend_t1 10.4.56.80:5000/29_frontend_t1:$TAG || handle_error


# Публикация образов на Docker Hub
docker push 10.4.56.80:5000/29_frontend_t1:$TAG || handle_error

echo "Операция успешно завершена"

# Запрос на обновление образа на сервере
read -p "Запушить как версию latest? [y/N] " choice
case "$choice" in
  y|Y )
    docker tag 29_frontend_t1 10.4.56.80:5000/29_frontend_t1:latest || handle_error
    docker push 10.4.56.80:5000/29_frontend_t1:latest || handle_error
    echo "Обновление на сервере произойдет в течение 5 минут"
    ;;
  * )
    echo "Пуш latest не отменен"
    ;;
esac