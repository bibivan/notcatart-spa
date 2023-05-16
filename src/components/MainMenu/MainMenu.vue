<template>
  <div class="main-menu" @click.stop="$emit('closeMenu')">
    <div class="main-menu__holder" @click.stop>
      <nav class="main-menu__nav nav">
        <ul class="nav__list  list-reset">
          <li class="nav__item">
            <RouterLink to="/" class="nav__link" @click="$emit('closeMenu')">
              Палетка RICH B*TCH
            </RouterLink>
          </li>
          <li class="nav__item">
            <RouterLink to="/" class="nav__link" @click="$emit('closeMenu')">
              Палетка STYLE IS WAR
            </RouterLink>
          </li>
          <li class="nav__item">
            <RouterLink to="/" class="nav__link" @click="$emit('closeMenu')">
              Онлайн обучение
            </RouterLink>
          </li>
          <li class="nav__item">
            <RouterLink to="/" class="nav__link" @click="$emit('closeMenu')">
              Галерея Life
            </RouterLink>
          </li>
        </ul>
      </nav>
      <ul class="main-menu__submenu submenu list-reset">
        <li class="submenu__item">
          <RouterLink to="/" class="submenu__link" @click="$emit('closeMenu')">Оплата</RouterLink>
        </li>
        <li class="submenu__item">
          <RouterLink to="/" class="submenu__link" @click="$emit('closeMenu')">Доставка</RouterLink>
        </li>
        <li class="submenu__item">
          <RouterLink to="/" class="submenu__link" @click="$emit('closeMenu')">Сотрудничество</RouterLink>
        </li>
      </ul>
      <button class="main-menu__close-btn btn-reset" @click="$emit('closeMenu')"/>
    </div>
  </div>

</template>

<script>
export default {
  name: 'MainMenu'
}
</script>

<style scoped>

</style>
