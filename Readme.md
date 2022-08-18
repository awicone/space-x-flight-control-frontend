# Getting Started

This project is posted on Heroku. It is not necessary to run it locally. Link to the application: https://space-x-flight-control-app.herokuapp.com/

To run the application locally, follow the steps below

Current version of node: 16.14.0

### Installation

1. Clone the repo `console`
   ```sh
   git clone git@github.com:awicone/space-x-flight-control-frontend.git
   ```
2. Install required packages `console`
   ```sh
   yarn
   ```
4. Run this project! `console`
   ```js
   yarn start
   ```

## Usage

In this application, the user has access to information on Spacex rocket launches. The application uses launches endpoints https://github.com/r-spacex/SpaceX-API/tree/master/docs

To book a flight, a json server is used, which, like this application, is deployed on Heroku.
There are two pages available in the application: the home page and the flight viewing page (click on the card to go to the page). 

In order to return to the main page click on the icon of the house in the header

# Тестовое задание

Этот проект выполнялся как тестовое задание для прохождения собеседования. 

### Задача:
Разработать интерфейс бронирования космических полётов, используя SpaceX Open API.

### Функции интерфейса:
1. Просмотр списка предстоящих космических полётов.
2. Просмотр списка прошедших космических полетов.
3. Просмотр списка забронированных космических полётов.
4. Бронирование космического полёта.
5. Отмена бронирования космического полёта.
6. Детальный просмотр информации о полёте.

### Детальное описание функционала:
1. Основная страница состоит из заголовка и трёх столбцов с карточками полётов. При загрузке данных отображаются скелетоны.
2. Бронирование происходит механизмом drag-n-drop из второго столбца в третий. Система оповещает пользователя об успешном бронировании.
3. Первый столбец заблокирован для drag-n-drop.
4. Отмена бронирования происходит механизмом drag-n-drop из третьего столбца во второй. При отмене бронирования система просит подтверждения у пользователя модальным окном.
5. При клике на карточку полёта система перенаправляет пользователя на страницу с подробным описанием полёта. (Структура страницы на усмотрение исполнителя. Обязательное условие - наличие элемента интерфейса, отвечающего за возврат на главную страницу).

### API:
1. В качестве API используется [https://github.com/r-spacex/SpaceX-API/tree/master/docs](https://github.com/r-spacex/SpaceX-API/tree/master/docs)
2. Для приложение требуется один эндпоинт - launches.
3. Так как запросы, меняющие состояние сервера данное API не предоставляет , запросы на бронирование и отмену брони должны быть замоканы.

## Результат задачи:
Результатом задачи должно стать SPA приложение. Код должен реализовывать интерфейс с вышеописанными функциями. В README должно быть описание приложения с инструкциями по запуску. Плюсом будет деплой приложения на Heroku.
