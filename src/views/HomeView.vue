<template>
  <div class="main-page">
    <p class="main-page__description">
      Привет! Спасибо, что согласился пройти тестовое задание на позицию Frontend-разработчика (VueJS).
      Надеемся на скорую встречу на тех. собесе
    </p>
    <h1 class="main-page__title">
      Тестовое задание SquareGPS
    </h1>
    <p class="main-page__text">
      Необходимо с помощью <strong>Vuejs</strong>, <strong>Vuex</strong>, <strong>VueRouter</strong>,
      <strong>Vuetify</strong> написать приложение. Хэдер приложения должен содержать меню из 2-х пунктов:
      <strong>О задании</strong> и <strong>Карта</strong>.В основной части приложения должно отображаться содержимое разделов.
    </p>
    <section class="main-page__section">
      <h2 class="main-page__subtitle">
        Раздел “О задании”
      </h2>
      <p>
        В разделе должен быть текст этого задания, сверстанный аналогично.
      </p>
    </section>
    <section class="main-page__section">
      <h2 class="main-page__subtitle">
        Раздел “Карта”
      </h2>
      <span>На экране должны быть карта и список (см пример):</span>
      <ol class="main-page__ordered-list">
        <li>
          <p>
            При клике на кнопку добавления, карта должна перейти в режим добавления маркера:
            в месте клика должен появится маркер, а в списке - запись с адресом точки
          </p>
          <p>
            Для поиска адреса можно использовать любое бесплатное API для геокодирования, например:
            <a href="https://geocode.maps.co/" target="_blank">https://geocode.maps.co/</a>
          </p>
          <p>
            В случае, если адрес не найден, необходимо вывести ошибку и не добавлять маркер в список.
          </p>
        </li>
        <li>
          При клике на маркер должна подсвечиваться запись в списке
        </li>
        <li>При клике на запись в списке карта должна центрироваться на маркере</li>
        <li>Маркеры должны храниться локально и не пропадать после перезагрузки страницы</li>
        <li>В адресной строке должен отображаться id выбранного маркера</li>
      </ol>
    </section>
    <section class="main-page__section">
      <p>
        Локальное хранение данных должно быть организовано в виде сервиса, эмулирующего бекенд.
        (Необходим класс Backend, который псевдо-асинхронно сохраняет данные в localStorage)
      </p>
      <span>
        <strong>Дополнительно:</strong>
      </span>
      <ol class="main-page__ordered-list">
        <li>Продумать отображение на мобильных устройствах</li>
        <li>Предусмотреть локализацию</li>
        <li>Необходимо с помощью <strong>jest</strong> написть 1 модульный тест на любой компонент</li>
      </ol>
    </section>
    <section class="main-page__section">
      <p>
        <strong>Напоминание:</strong> тестовое задание призвано показать умение писать хороший модульный код,
        а также умение пользоваться указанными технологиями и не только. Этим кодом нужно гордиться.
      </p>
    </section>
    <section class="main-page__section">
      <span>
        Пример:
      </span>
      <img class="main-page__image" src="/images/screen.png" alt="screenshot">
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style lang="scss" scoped>
.main-page {
  margin: 40px auto;
  max-width: 640px;
  font-family: "Arial", sans-serif;
  font-size: 15px;

  @media screen and (max-width: 540px) {
    margin: 30px 20px;
  }

  &__description, &__title {
    font-size: 1.7rem;
    line-height: 120%;
  }

  &__title, &__subtitle {
    margin-bottom: .6rem;
  }

  &__subtitle {
    font-size: 1.4rem;
  }

  &__description, &__title, &__subtitle {
    font-weight: 500;
  }

  &__ordered-list {
    margin: .3rem 0 2rem;
  }

  a {
    color: #1658CD !important;
    text-decoration: underline;
  }

  &__image {
    padding: 0 3rem;
    width: 100%;
  }
}
</style>
