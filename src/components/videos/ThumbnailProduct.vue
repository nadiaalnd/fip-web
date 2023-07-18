<template>
  <div class="relative-position">
    <div
      class="relative-position thumbnail-product"
      :style="`background-image: url(${src}); width: ${width}; padding-top: ${Math.round(
        (1 / $utils.thumbnailRatio) * 100
      )}%`"
    >
      <q-icon
        v-if="showPlayIcon"
        class="icon-play"
        size="3em"
        color="white"
        name="img:/images/play.svg"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ThumbnailProduct",
  props: {
    src: String,
    width: String,
    height: String,
    showPlayIcon: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
