<template>
  <q-page class="q-py-md">
    <div class="container row flex-nowrap flex-center q-mb-md q-px-md">
      <div class="flex-1">
      </div>
      <div>
        <q-btn
          class="q-ml-sm"
          dense flat
          color="dark"
          icon="img:/images/share.svg"
          @click="$refs.dialogShare.show()"/>
      </div>
    </div>
    <div class="q-px-md">
      <q-card class="learnpath-header container">
        <div class="flex row">
          <div class="col-12 col-md-8 q-pa-md">
            <h1 class="--title">
              {{ category ? category.code : ''}}
            </h1>
            <p class="--description">
              {{ category ? category.description : ''}}
            </p>
          </div>
          <div class="learnpath-info col-12 col-md-4 q-pa-md">
            <div class="q-mb-md text-bold text-neutral">
              Detail Learning Path
            </div>
            <div class="q-mb-sm">
              <q-icon
                name="schedule"
                color="neutral"
                size="24px"
                class="q-mr-sm"/>
              <div class="inline-block text-neutral" style="line-height: 24px; vertical-align: middle;">
                {{ category ? category.minutes : '' }} menit
              </div>
            </div>
            <div class="q-mb-md">
              <q-icon
                name="school"
                color="neutral"
                size="24px"
                class="q-mr-sm"/>
              <div class="inline-block text-neutral" style="line-height: 24px; vertical-align: middle;">
                {{ products.length }} product
              </div>
            </div>
            <q-btn
              unelevated dense
              class="full-width"
              color='primary'
              label="Beli Kelas"
              v-if="!allBought"
              @click="buyClass">
            </q-btn>
          </div>
        </div>
      </q-card>
    </div>
    <div class="container q-pa-md">
      <!-- <div class="border-bottom q-mb-md">
        <div class="q-mb-md">
          <h1 class="text-primary q-ma-none text-bold" style="font-size: 32px; line-height: 1.01;">
            {{ category ? category.code : ''}}
          </h1>
        </div>
      </div> -->
      <div class="relative">
        <div :class="'learnpath-start ' + (startActive ? 'active' : '')">
          <div class="--title">
            Mulai
          </div>
          <div class="--duration">
            {{products.length}} Product - {{ category ? category.minutes : '' }} menit
          </div>
        </div>
        <div class="product-learnpath-container">
          <div v-if="products.length == 0"
            class="flex-center"
            style="width: 100%; height: 128px; color: #757575; display: flex;">
            Materi tidak ditemukan
          </div>
          <ItemProductLong
            v-else
            v-for="(product, idx) in products"
            :key="'product-'+idx"
            :idx="idx"
            :product="product"
            :active="product.currentActive"
            :activeBefore="product.beforeActive"
            :activeNext="product.nextActive"
            @bookmarked="(value) => {
              product.is_bookmarked = value
            }"/>
        </div>
        <div :class="'product-certificate flex-center ' + (finish ? 'active' : '')">
          <div :class="'--progress-before ' + (finish ? 'active' : '')">
          </div>
          <q-icon name="emoji_events" class="q-mr-md"
            :color="finish ? 'amber-7' : 'light'"
            size="40px"/>
            <!-- amber-7 -->
          <div class="flex-1">
            <template v-if="finish">
              <div class="flex row flex-nowrap flex-center">
                <div class="flex-1">
                  <h1>
                    Dapatkan Sertifikatmu!
                  </h1>
                  <p>
                    Selamat, kamu telah menyelesaikan semua kelas! Unduh sertifikatmu di sini.
                  </p>
                </div>
                <q-btn
                  dense no-caps flat
                  color="primary"
                  icon="download"
                  label="Unduh sertifikat"
                  @click="downloadCertificate"/>
              </div>
            </template>
            <template v-else>
              <h1>
                Dapatkan sertifikatmu!
              </h1>
              <p>
                Ketika selesai, kamu akan mendapatkan sertifikat penyelesaian.
              </p>
            </template>
          </div>
        </div>
      </div>
    </div>
    <DialogShare
      :model="{
        name: category ? category.code : '',
        description: category ? category.description : ''
        }"
      :url="$route.path"
      ref="dialogShare"/>
  </q-page>
</template>

<script>
import ItemProductLong from 'components/items/ItemProductLong'
import DialogShare from 'components/dialogs/DialogShare'

export default {
  components: {
    DialogShare,
    ItemProductLong
  },

  meta () {
    return {
      title: this.aMeta.title
    }
  },

  data () {
    return {
      aMeta: {
        title: 'Finplan.id',
        description: ''
      },

      loading: false,
      form: {
        id_subcategory: null,
        name: ''
      },

      startActive: false,
      products: [],

      categories: [],
      category: null,

      finish: false,

      allBought: false,

      certificatePath: null
    }
  },

  created () {
    this.form.id_subcategory = this.$route.params.id_subcategory
    this.form.name = this.$route.query.search
  },

  mounted () {
    this.getCategory()
  },

  methods: {
    getCategory () {
      let id = this.$route.params.id_subcategory
      this.$services.category.detail(id, (data) => {
        let found = false
        if (data.description.indexOf('{') === -1) {
          data.description = data.description
          data.minutes = 0
        } else {
          const description = JSON.parse(data.description)
          data.description = description.description
          data.minutes = description.minutes
        }
        this.category = data
      }, (msg, errors) => {
      }, () => {
      })
    },

    getProducts () {
      this.$services.product.get(this.form, (data) => {
        let allBought = true
        const length = data.length
        let beforeActive = true
        let finish = true
        data.forEach((item, i) => {
          if (item.is_paid === 0) {
            allBought = false
          }
          let pass = item.percentage >= 80
          item.percentage = Math.round(item.percentage)

          if (!pass && item.percentage === 80) {
            item.percentage = 79
          }

          item.currentActive = this.isActive(item)
          if (!item.currentActive) {
            finish = false
          }

          if (i == 0) {
            // first row
            item.beforeActive = item.currentActive
          } else {
            item.beforeActive = beforeActive && item.currentActive
          }

          if (data.length - 1 === i) {
            // last row
            item.nextActive = item.currentActive
          } else {
            item.nextActive = this.isActive(data[i + 1]) && item.currentActive
          }

          beforeActive = item.currentActive
        })
        this.startActive = data[0].currentActive
        this.products = data
        this.finish = finish
        this.allBought = allBought
      }, (msg, errors) => {
        console.log(msg)
      }, () => {
      })
    },

    isActive (product) {
      return product.percentage > 80
    },

    buyClass () {
      if (this.$utils.getToken() == null) {
        this.$q.notify({
          message: 'Harap masuk terlebih dahulu',
          color: 'info'
        })
        this.$global.$emit('showLogin')
        return
      }

      this.products.forEach((item, i) => {
        this.$global.$emit('addCart', item)
      })
    },
    downloadCertificate () {
      if (this.certificatePath != null) {
        this.downloadCertificatePdf()
      } else {
        this.generateCertificate(() => {
          this.downloadCertificatePdf()
        })
      }
    },

    downloadCertificatePdf () {
      window.open(process.env.API_URL + this.certificatePath, '_blank');
    },

    generateCertificate (onSuccess) {
      this.$services.certificate.generateSubcategory({
        id_subcategory: parseInt(this.$route.params.id_subcategory),
        id_user: this.$utils.getUser().id
      }, (data, msg, response) => {
        this.certificatePath = response.data.path
        onSuccess()
      }, (msg, errors) => {
      }, () => {
      })
    }
  },

  watch: {
    'form.name' : function (newVal, oldVal) {
      this.$route.query.search = newVal
      this.getProducts()
    },
    'category': function (newVal, oldVal) {
      this.aMeta.title = newVal.code + ' - Finplan.id'
      this.aMeta.description = newVal.description
    }
  }
}
</script>
