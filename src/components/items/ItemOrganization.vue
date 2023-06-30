<template>
  <div class="q-py-sm">
    <q-item dense class="q-px-none">
      <Image
        :src="host + org.logo"
        height="56px"
        width="56px"
        circle
        class="q-mr-md"/>
      <q-item-section class="flex-1">
        <q-item-label>
          <div
            class="text-primary text-bold inline-block"
            style="vertical-align: middle; font-size: 18px">
            {{org.name}}
          </div>
          <q-icon
            v-if="org.is_verified == 1"
            class="cursor-pointer q-ml-sm bg-positive inline-block"
            style="padding: 4px; border-radius: 50%; vertical-align: middle"
            size="14px"
            name="check"
            color="white">
            <q-tooltip dense class="q-px-sm bg-positive">
              Terverifikasi
            </q-tooltip>
          </q-icon>
          <q-icon
            v-else-if="org.is_verified == 0"
            class="cursor-pointer q-ml-sm bg-grey inline-block"
            style="padding: 4px; border-radius: 50%; vertical-align: middle"
            size="14px"
            name="hourglass_bottom"
            color="white">
            <q-tooltip dense class="q-px-sm">
              Menunggu verifikasi
            </q-tooltip>
          </q-icon>
        </q-item-label>
        <q-item-label caption>{{org.short_bio}}</q-item-label>
      </q-item-section>
      <div>
        <q-btn
          dense no-caps push
          type="a"
          :href="'/creator/edit?id='+org.id"
          class="q-px-md"
          label="Atur"
          color="primary"/>
        <q-btn
          v-if="org.is_verified"
          dense no-caps push
          type="a"
          href="/creator/dashboard"
          class="q-ml-sm q-px-md btn-secondary"
          label="Unggah Konten"/>
      </div>
    </q-item>
  </div>
</template>
<script>
import Image from 'components/Image'

export default {
  components: {
    Image
  },

  props: {
    org: {
      type: Object
    }
  },
  data () {
    return {
      host: ''
    }
  },

  created () {
    this.host = process.env.API_URL_IMG
  }
}
</script>
