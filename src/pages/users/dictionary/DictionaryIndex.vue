<template>
  <q-page>
    <section id="section-head" class="bg-dark q-pa-md flex flex-center">
      <div class="container text-center q-py-lg">
        <h5 class="--landing-title text-secondary q-my-none q-mb-lg">
          Ada istilah keuangan yang bikin bingung?
        </h5>
        <q-select
          outlined
          dark
          dense
          use-input
          hide-selected
          fill-input
          emit-value
          map-options
          color="secondary"
          class="q-mx-auto"
          placeholder="Cari istilah keuangan di sini"
          v-model="search.model"
          option-label="name"
          option-value="slug"
          input-debounce="500"
          :options="search.options"
          @filter="searchKeyword"
          style="max-width: 480px"
          @update:model-value="onSearchSelected"
          id="search-input"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </section>
    <section class="container-sm q-pa-md">
      <q-card class="q-pa-md q-mb-lg text-center">
        <q-btn
          v-for="(content, idx) in contents"
          :key="'label-' + idx"
          :outline="selected != idx"
          :unelevated="selected == idx"
          :color="selected == idx ? 'secondary' : 'neutral'"
          :text-color="selected == idx ? 'dark' : ''"
          class="q-ma-xs gtm-track"
          style="border-radius: 12px; min-width: 48px"
          :label="content.label"
          @click="selected = idx"
          gtm-action="btn_kamus_select"
          :id="'abjad-' + content.label"
        />
      </q-card>

      <q-card class="q-mb-lg">
        <div
          class="bg-secondary-light text-dark q-pa-md"
          style="
            display: inline-block;
            left: 0;
            top: 0;
            border-radius: 0;
            border-bottom-right-radius: 16px;
            font-size: 24px;
            font-weight: bold;
          "
        >
          {{ contents[selected].label }}
        </div>
        <div class="q-pa-md row dictionary-container">
          <a
            v-for="(dictionary, idx) in contents[selected].data"
            :href="detailLocation(dictionary.slug)"
            :key="'data-' + idx"
            no-caps
            flat
            dense
            class="block col-md-4 q-my-xs app-link"
            :id="'dictionary-' + idx"
            >{{ dictionary.name }}</a
          >
        </div>
      </q-card>
    </section>
  </q-page>
</template>

<script>
export default {
  name: "DictionaryIndex",
  data() {
    return {
      contents: [],
      selected: 0,
      search: {
        model: null,
        options: [],
      },
    };
  },

  created() {
    const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",];
    for (var i in alphabets) {
      this.contents.push({ label: alphabets[i], data: [] });
    }
    if (typeof this.$route.params.alphabet === "undefined") {
      this.$router.replace({
        name: "kamus-alphabet",
        params: {
          alphabet: "a",
        },
      });
    }
  },

  mounted() {
    this.searchSelected();
    this.getProducts();
  },

  methods: {
    searchSelected() {
      const length = this.contents.length;
      const alphabet = (this.$route.params.alphabet ?? "#").toUpperCase();
      for (var i = 0; i < length; i++) {
        if (alphabet == this.contents[i].label) {
          console.log("selected", i);
          this.selected = i;
          break;
        }
      }
    },
    getProducts() {
      const filter = {
        type: 3,
        tag: "letter " + this.$route.params.alphabet ?? "a",
      };
      this.$services.product.get(
        filter,
        (data) => {
          const kamus = [];
          data.forEach((item, i) => {
            kamus.push(item);
          });
          this.contents[this.selected].data = kamus;
          console.log(this.contents[this.selected]);
        },
        (msg, errors) => {},
        () => {}
      );
    },
    searchKeyword(val, update, abort) {
      const needle = val.toLowerCase();
      if (needle.length > 0) {
        this.$services.product.get(
          {
            name: needle,
            type: 3,
          },
          (data) => {
            update(() => {
              this.search.options = data;
            });
          },
          (msg, errors) => {},
          () => {}
        );
      }
    },
    onSearchSelected(value) {
      console.log("test");
      console.log(value, this.$utils.escapeRoute(value));
      this.$router.push({
        path:
          this.$route.params.alphabet + "/" + this.$utils.escapeRoute(value),
      });
    },

    detailLocation(word) {
      return window.location.href + "/" + this.$utils.escapeRoute(word);
    },
  },

  watch: {
    selected: function (idx) {
      const alphabet = this.contents[idx].label.toLowerCase();
      // console.log('alphabet', alphabet, alphabet != this.$route.params.alphabet)
      if (alphabet != this.$route.params.alphabet) {
        console.log("path", `/kamus/${encodeURIComponent(alphabet)}`);
        this.$router.replace({
          name: "kamus-alphabet",
          params: {
            alphabet: alphabet,
          },
        });
      }
    },
    "$route.params.alphabet": function (newVal) {
      console.log("this.selected", this.selected);
      if (this.contents[this.selected].data.length == 0) {
        this.getProducts();
      }
    },
  },
};
</script>
