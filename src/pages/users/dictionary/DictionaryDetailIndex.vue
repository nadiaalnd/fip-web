<template>
  <q-page class="q-py-md">
    <div class="container">
      <div class="content-header q-mb-lg flex flex-center q-px-md">
        <h1 class="content-title text-primary q-ma-none text-bold inline-block flex-1">
          {{content.name}}
        </h1>
        <!-- <q-icon color="amber-8" name="star" size="28px"/> -->
        <template
          v-if="false">
          <img height="28" width="28" src="/images/star-fill.svg"/>
          <span class="q-ml-sm text-primary vertical-middle text-bold" style="font-size: 20px;">{{$utils.getRating(content)}}</span>
          <span class="q-ml-sm text-light vertical-middle" style="font-size: 20px;">({{$utils.getRatingCnt(content)}})</span>
        </template>
        <q-btn
          size="sm"
          class="q-ml-sm"
          dense flat
          color="dark"
          icon="img:/images/share.svg"
          @click="$refs.dialogShare.show()"/>
        <q-btn
          size="sm"
          class="q-ml-sm"
          dense flat
          color="dark"
          :icon="content.is_bookmarked === 1 ? 'bookmark' : 'bookmark_border'"
          @click="bookmarkProduct"/>
      </div>
      <div class="row">
        <div class="col-md-8 q-px-md">
          <template v-if="otherDetails">
            <div
              class="v-html-no-margin q-mb-lg"
              id="long-description"
              v-html="otherDetails.long_description">
            </div>
          </template>
        </div>
        <div class="col-md-4 q-px-md">
          <div
            style="position: sticky; top: 80px;">
            <q-card
              class="q-pa-md">
              <div
                class="q-mb-md"
                style="font-size: 24px; font-weight: bold">
                Mau cari tahu tentang apa?
              </div>
              <div v-for="(heading, idx) in headings"
                :key="'heading-' + idx"
                class="cursor-pointer q-pa-xs block"
                @click="gotoHeading(idx)"
                v-html="heading">
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <DialogShare
      :model="content"
      :url="$route.path"
      ref="dialogShare"/>
  </q-page>
</template>

<script>
import DialogShare from 'components/dialogs/DialogShare'

export default {
  components: {
    DialogShare,
  },

  data () {
    return {
      content: {
        id: null,
        is_paid: 0,
        img: '',
        name: '',
        rating: '',
        rating_cnt: '',
        description: '',
        is_bookmarked: 0,
        tag: '',
        price_sell: '',
        thumbnail: '',
        price_ori: '',
        url: '',
        pointer: 0,
        duration: 0,
        subcategory: null
      },

      headings: []
    }
  },

  mounted () {
    this.$global.$on('user', (data) => {
      this.$nextTick(() => {
        this.getProductDetail(this.$route.params.slug)
      })
    })
    this.getProductDetail(this.$route.params.slug)
  },

  methods: {
    getProductDetail (slug) {
      this.$services.product.detailV2({
        slug: slug
      }, (data) => {
        if (data.id === 0) {
          this.$q.notify({
            message: 'Konten sudah dihapus / kadaluarsa',
            color: 'negative'
          })
          return this.$router.replace({
            path: "/e-learning"
          })
        }

        data.description = this.$utils.replaceEnter(data.description)

        Object.keys(this.content).forEach(key => {
          this.content[key] = data[key]
        })

        try {
          const otherDetails = JSON.parse(data.other_details)
          this.$nextTick(() => {
            let elements = document.querySelectorAll('#long-description h1')
            this.headings = []
            var i = 0
            for (let elem of elements) {
              elem.setAttribute('id', 'heading-' + i)
              this.headings.push(elem.innerHTML)
              i = i + 1
            }
          })

          //

          this.otherDetails = otherDetails
        } catch (e) {
          this.otherDetails = null
        }

        const feURL = process.env.HOST
        this.$global.$emit('meta-updated', {
          key: 'detail-' + data.id,
          title: `Istilah Keuangan - ${data.name} | Finplan.id`,
          description: data.description,
          image: data.image ? `${feURL}/meta-head${data.image}` : this.$route.meta.image
        })

        this.trackViewContent(data)
      }, (msg, errors) => {
        console.log(msg, errors)
        this.$q.notify({
          message: 'Konten sudah dihapus / kadaluarsa',
          color: 'negative'
        })
        return this.$router.replace({
          path: "/e-learning"
        })
      }, () => {
      })
    },

    trackViewContent (item) {
      this.$utils.track.custom(this.$route.meta.track, {name: item.id, link: this.$utils.getContentRoute(item)})
    },

    gotoHeading (idx) {
      window.scroll({
        top: document.getElementById('heading-' + idx).offsetTop,
        behavior: 'smooth'
      })
    },

    bookmarkProduct () {
      if (this.$utils.getToken() == null) {
        this.$q.notify({
          message: 'Harap masuk terlebih dahulu',
          color: 'primary'
        })
        this.$global.$emit('showLogin')
        return
      }
      if (this.content.is_bookmarked === 1) {
        return this.deleteBookmark()
      }
      this.$services.bookmark.add({
        id_product: this.content.id,
        id_user: this.$utils.getUser().id
      }, (data) => {
        this.content.is_bookmarked = 1
      }, () => {
      }, () => {
      })
    },

    deleteBookmark () {
      this.$services.bookmark.delete({
        id_product: this.content.id,
        id_user: this.$utils.getUser().id
      }, (data) => {
        this.content.is_bookmarked = 0
      }, () => {
      }, () => {
      })
    }
  }
}
</script>
