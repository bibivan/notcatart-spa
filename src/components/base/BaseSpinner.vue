<template>
  <svg width="18" viewBox="-2 -2 42 42" stroke="none"
       class="app-preloader">
    <g fill="none" fill-rule="evenodd">
      <g transform="translate(1 1)" stroke-width="4">
        <circle stroke-opacity=".5" cx="18" cy="18" r="18"></circle>
        <path d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="1s"
            repeatCount="indefinite"/>
        </path>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'BaseSpinner'
}
</script>
