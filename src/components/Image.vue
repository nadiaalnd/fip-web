<template>
  <div
    :style="`${circle ? 'border-radius: 50%;' : ''}position: relative; width: ${width}; height: ${height}; padding-top: ${ratio}; background-image: url(${src}); background-size: cover; background-position: center; display: ${display}`"
    :class="disable ? 'img-unavailable' : ''">
    <img
      style="display: none"
      :src="src">
  </div>
</template>
<script>

export default {
  name: 'ImageComponent',
  props: {
    src: {
      type: String,
      default: ''
    },
    width: {
      type: String
    },
    height: {
      type: String
    },
    ratio: {
      type: String
    },
    display: {
      type: String
    },
    disable: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    }
  }
}
</script>
