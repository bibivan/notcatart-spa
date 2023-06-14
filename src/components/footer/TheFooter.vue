<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__content">
        <div class="footer__left">
          <div class="footer__subscribe subscribe">
            <p class="subscribe__text">
              Подпишись и получай свежую информацию о новинках
              и эксклюзивных предложениях
            </p>
            <RouterLink to="/subscribe" class="btn btn--bordered uppercase subscribe__link">Подписаться</RouterLink>
          </div>
          <div class="footer__outer-logo hide-mobile">
            <a href="#" class="logo footer__logo">
              <span class="color-primary">@</span>notcatart
            </a>
            <small class="footer__copyright">2023 © Все права защищены</small>
          </div>
        </div>
        <div class="footer__right">
          <div class="grid grid-wrap grid--mobile-wrap grid--mobile-row w-100">
            <div class="grid__col grid__col--w-55-mobile submenu-footer">
              <h5 class="submenu-footer__title">ПРОДУКТЫ</h5>
              <div class="submenu-footer__links">
                <RouterLink
                  :to="{ name: 'home', hash: '#product_1' }"
                  class="submenu-footer__link submenu-footer__link--nobr"
                >
                  Палетка Rich B*tch
                </RouterLink>
                <RouterLink
                  :to="{ name: 'home', hash: '#product_2' }"
                  class="submenu-footer__link submenu-footer__link--nobr"
                >
                  Палетка Style is War
                </RouterLink>
                <RouterLink
                  :to="{ name: 'home', hash: '#course_advertising_section' }"
                  class="submenu-footer__link"
                >
                  Онлайн обучение
                </RouterLink>
                <RouterLink
                  :to="{ name: 'home', hash: '#gallery' }"
                  class="submenu-footer__link"
                >
                  Галерея Life
                </RouterLink>
              </div>
            </div>
            <div class="grid__col grid__col--w-45-mobile submenu-footer">

              <h5 class="submenu-footer__title">КУПИТЬ</h5>
              <div class="submenu-footer__links">
                <RouterLink
                  to="/about-product"
                  class="submenu-footer__link"
                >
                  О товарах
                </RouterLink>
                <RouterLink
                  to="/payment-info"
                  class="submenu-footer__link"
                >
                  Оплата
                </RouterLink>
                <RouterLink
                  to="/delivery-info"
                  class="submenu-footer__link"
                >
                  Доставка
                </RouterLink>
                <RouterLink
                  to="/cooperation"
                  class="submenu-footer__link"
                >
                  Сотрудничество
                </RouterLink>
              </div>
            </div>
            <div class="grid__col grid__col--w-55-mobile submenu-footer">
              <h5 class="submenu-footer__title">ИНФОРМАЦИЯ</h5>
              <div class="submenu-footer__links">
                <RouterLink
                  :to="{ name: 'home', hash: '#disclaimer' }"
                  class="submenu-footer__link"
                >
                  Дисклеймер 18+
                </RouterLink>
                <RouterLink
                  to="/privacy"
                  class="submenu-footer__link hide-mobile"
                >
                  Политика конфиденциальности
                </RouterLink>
                <RouterLink
                  to="/public-offer"
                  class="submenu-footer__link"
                >
                  Публичная оферта
                </RouterLink>
              </div>
            </div>
            <div class="grid__col grid__col--w-45-mobile submenu-footer submenu-footer--show-mobile-only">
              <h5 class="submenu-footer__title opacity-0">Информация</h5>
              <div class="submenu-footer__links">
                <RouterLink
                  to="/privacy"
                  class="submenu-footer__link"
                >
                  Политика<br>конфиденциальности
                </RouterLink>
              </div>
            </div>
            <div class="grid__col grid__col--w-100-mobile hide-desktop hide-tablet">
              <div class="footer__outer-logo">
                <a href="#" class="logo footer__logo">
                  <span class="color-primary">@</span>notcatart
                </a>
                <small class="footer__copyright">2023 © Все права защищены</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>

</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style scoped>

</style>
