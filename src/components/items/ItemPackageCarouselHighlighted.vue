<template>
  <q-card class="--item">
    <div class="--tag text-center">Penawaran Terbaik!</div>
    <div
      class="bg-primary q-py-lg q-px-md"
      style="border-radius: 8px; margin-top: -10px"
    >
      <h2 class="--pkg-title text-white">
        {{ model.name }}
      </h2>
      <h5 class="--pkg-title-strikeline text-grey-4">
        Rp {{ model.price ? model.price.toLocaleString() : "0" }}
      </h5>
      <h2 class="--pkg-title text-white">
        Rp {{ model.price_sell ? model.price_sell.toLocaleString() : "0" }}
      </h2>
      <q-btn
        @click="onClickPackage"
        push
        no-caps
        class="full-width gtm-track"
        text-color="dark"
        color="white"
        label="Berlangganan"
        gtm-action="btn_package_highlighted_subscribe"
        :id="'subscribe-package'"
      />
    </div>
  </q-card>
</template>
<script>
export default {
  props: {
    model: {
      type: Object,
      default: new Object(),
    },
  },

  data() {
    return {};
  },

  methods: {
    onClickPackage() {
      if (this.$utils.getToken() == null) {
        this.$q.notify({
          message: "Harap masuk terlebih dahulu",
          color: "info",
        });
        this.$global.$emit("showLogin");
        return;
      }

      this.$router.push({
        path: this.$utils.getPackageDetailRoute(this.model),
      });
    },
  },
};
</script>
