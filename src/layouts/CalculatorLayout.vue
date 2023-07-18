<template>
  <q-page id="personalBudget">
    <CarouselHeader/>
    <section class="calculator-navigation q-my-xl relative-position">
      <div
        :class="$q.platform.is.mobile ? 'hidden' : ''"
        class="absolute-right"
        style="
          background-image: url(/images/bg-ellipse-pattern.svg);
          background-repeat: no-repeat;
          width: 148px;
          height: 181px;
          transform: rotate(180deg) translateY(50%);
          top: 50%;
        "
      ></div>
      <div class="container q-mx-auto">
        <div
          class="--item-container q-px-md"
          :class="calculators.length < 5 ? 'justify-center' : 'justify-start'">
          <a
            :href="item.link"
            :class="'--item ' + ($route.path == item.link ? 'bg-secondary' : '')"
            :key="idx"
            v-for="(item, idx) in calculators"
          >
            <img
              :src="item.image"
              :alt="item.title"
            />
            <div v-html="item.title"></div>
          </a>
        </div>
      </div>
      <div class="text-center text-italic text-neutral q-mt-sm" style="font-size: 10px;">
        icon designed by Freepik
      </div>
    </section>
    <router-view/>
  </q-page>
</template>
<script>
import { defineComponent } from 'vue'
import CarouselHeader from "src/components/CarouselHeader.vue";

export default defineComponent({
  components: {
    CarouselHeader,
  },
  data () {
    return {
      calculators: [],
    }
  },

  created() {
    this.setupSetting(this.$utils.getSetting());
    this.$global.$on("setting", (setting) => {
      this.setupSetting(setting);
    });
  },

  methods: {
    setupSetting(setting) {
      let listKalkulator = setting["List Kalkulator"];
      if (listKalkulator) {
        this.calculators = JSON.parse(setting["List Kalkulator"]);
      }
    },
  }
})
</script>
