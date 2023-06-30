<template>
  <div>
    <q-avatar
      :style="{
        borderRadius: circle ? '50%' : '0',
        width: width ? width : '128px',
        height: 'auto',
        border: '1px solid #e0e0e0'
      }"
      :class="color ? ('bg-'+color) : ''">
      <img
        v-if="aspectRatio==null"
        :src="imagePreview"
        height="auto"
        :width="width"/>
      <app-img
        v-else
        :src="imagePreview"
        :width="width"
        :height="height"/>
      <q-btn
        class="gtm-track"
        style="z-index: 999; bottom: 0; position: absolute; right: 0"
        round color="primary" icon="camera_alt"
        @click="selectPhoto"
        gtm-action="click_photo_select"/>
      <input
        style="display: none"
        ref="inputPhoto"
        type="file"
        accept="image/*"
        @input="onPhotoChanged"/>
    </q-avatar>
    <span
      v-if="error"
      class="block text-center error">
      {{ error }}
    </span>
    <q-dialog
      persistent
      v-model="cropModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ title }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <vue-cropper
            ref="cropper"
            :src="cropImage"
            alt="Source Image"
            :initialAspectRatio="aspectRatio"
            :aspectRatio="aspectRatio"
            style="width: 248px; height: 248px;"
            :zoomable="false"
            :movable="false" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            class="gtm-track"
            flat label="Batal" color="neutral" v-close-popup
            gtm-action="click_photo_cancel"/>
          <q-btn
            class="gtm-track"
            flat label="Simpan" color="primary" v-close-popup
            @click="doCropImage"
            gtm-action="click_photo_save"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import ImageComponent from 'components/Image.vue'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  components: {
    'app-img': ImageComponent,
    VueCropper
  },

  props: {
    color: {
      type: String,
    },
    circle: {
      type: Boolean,
      default: true
    },
    error: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: 'Crop Gambar'
    },
    imagePreview: {
      type: String,
      default: 'statics/icons/user-icon.svg'
    },
    onPreviewChanged: {
      type: Function,
      default: null
    },
    aspectRatio: {
      type: Number,
      default: 1
    },
    width: {
      type: String,
      default: '128px'
    },
    height: {
      type: String,
      default: '128px'
    }
  },

  data () {
    return {
      cropImage: '',
      cropModal: false
    }
  },

  mounted () {
    console.log('aspectRatio', this.aspectRatio)
  },

  methods: {
    onPhotoChanged (event) {
      const files = event.target.files
      try {
        const file = files[0]
        this.getBase64(file, (base64) => {
          // upload photo here
          // this.profile.profpic = base64
          this.cropImage = base64
          this.cropModal = true
        }, (error) => {
          this.onErrorPhotoChanged(error)
        })
      } catch (error) {
        this.onErrorPhotoChanged(error)
      }
    },

    selectPhoto () {
      this.$refs.inputPhoto.click()
    },

    onErrorPhotoChanged (error) {
      // error
      this.$q.notify({
        message: error.message,
        color: 'negative'
      })
    },

    getBase64 (file, onSuccess, onError) {
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        onSuccess(reader.result)
      }
      reader.onerror = function (error) {
        onSuccess(error)
      }
    },

    doCropImage () {
      this.shouldUpload = true
      // this.imagePreview = this.$refs.cropper.getCroppedCanvas().toDataURL()
      if (this.onPreviewChanged) this.onPreviewChanged(this.$refs.cropper.getCroppedCanvas().toDataURL())
    }
  }
}
</script>
