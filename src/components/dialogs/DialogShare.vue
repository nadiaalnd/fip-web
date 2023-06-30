<template>
  <q-dialog
    :class="className"
    v-model="isOpen"
  >
    <q-card style="width: 400px; max-width: calc(100% - 32px)">
      <div class="text-right">
        <q-btn
          flat round dense
          icon="close"
          class="q-mt-md q-mr-md gtm-track"
          v-close-popup
          @click="isOpen = false"
          gtm-action="btn_share_close"
        />
      </div>
      <div class="modal text-center q-px-md">
        <div>
          <h4 class="text-bold q-mt-none q-mb-md">Bagikan</h4>
          <p>Bagikan product ini ke media sosial.</p>
        </div>
        <hr />
        <div class="q-py-md">
          <div class="row">
            <div class="col-sm-3 col-xs-6 q-py-sm">
              <a
                @click="onShare('https://facebook.com/sharer/sharer.php?u=' + baseUrl + (url || $route.path))"
                :href="'https://facebook.com/sharer/sharer.php?u=' + baseUrl + (url || $route.path)"
                target="_blank"
              >
                <div class="cursor-pointer text-black inline-block">
                  <svg
                    viewBox="0 0 60 60"
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                    style="width: 40px; height: 40px;"
                  >
                    <g>
                      <g fill="none" fill-rule="evenodd">
                        <path
                          d="M28.4863253 59.9692983c-6.6364044-.569063-11.5630204-2.3269561-16.3219736-5.8239327C4.44376366 48.4721168 3e-7 39.6467924 3e-7 29.9869344c0-14.8753747 10.506778-27.18854591 25.2744118-29.61975392 6.0281072-.9924119 12.7038532.04926445 18.2879399 2.85362966C57.1386273 10.0389054 63.3436516 25.7618627 58.2050229 40.3239688 54.677067 50.3216743 45.4153135 57.9417536 34.81395 59.5689067c-2.0856252.3201125-5.0651487.5086456-6.3276247.4003916z"
                          fill="#3B5998"
                          fill-rule="nonzero"
                        />
                        <path
                          d="M25.7305108 45h5.4583577V30.0073333h4.0947673l.8098295-4.6846666h-4.9045968V21.928c0-1.0943333.7076019-2.2433333 1.7188899-2.2433333h2.7874519V15h-3.4161354v.021c-5.3451414.194-6.4433395 3.2896667-6.5385744 6.5413333h-.0099897v3.7603334H23v4.6846666h2.7305108V45z"
                          fill="#FFF"
                        />
                      </g>
                    </g>
                  </svg>
                  <div>facebook</div>
                </div>
              </a>
            </div>
            <div class="col-sm-3 col-xs-6 q-py-sm">
              <a
                class="cursor-pointer"
                @click="onShare('https://twitter.com/intent/tweet?text=' + baseUrl + (url || $route.path))"
                :href="'https://twitter.com/intent/tweet?text=' + baseUrl + (url || $route.path)"
                target="_blank"
              >
                <div class="cursor-pointer text-black inline-block">
                  <svg
                    viewBox="0 0 60 60"
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                    style="width: 40px; height: 40px;"
                  >
                    <g>
                      <g fill="none" fill-rule="evenodd">
                        <path
                          d="M28.486325 59.969298c-6.636404-.569063-11.56302-2.326956-16.321973-5.823932C4.443764 48.472116 0 39.646792 0 29.986934 0 15.11156 10.506778 2.798388 25.274412.36718c6.028107-.992411 12.703853.049265 18.28794 2.85363 13.576275 6.818095 19.7813 22.541053 14.64267 37.103159-3.527955 9.997705-12.789708 17.617785-23.391072 19.244938-2.085625.320112-5.065149.508645-6.327625.400391z"
                          fill="#1DA1F2"
                          fill-rule="nonzero"
                        />
                        <path
                          d="M45.089067 17.577067c-.929778.595555-3.064534 1.460977-4.117334 1.460977v.001778C39.7696 17.784 38.077156 17 36.200178 17c-3.645511 0-6.6016 2.956089-6.6016 6.600178 0 .50631.058666 1.000178.16711 1.473778h-.001066c-4.945066-.129778-10.353422-2.608356-13.609244-6.85049-2.001778 3.46489-.269511 7.3184 2.002133 8.72249-.7776.058666-2.209067-.0896-2.882844-.747023-.045156 2.299734 1.060622 5.346845 5.092622 6.452267-.776533.417778-2.151111.297956-2.7488.209067.209778 1.941333 2.928355 4.479289 5.901155 4.479289C22.46009 38.565156 18.4736 40.788089 14 40.080889 17.038222 41.929422 20.5792 43 24.327111 43c10.650667 0 18.921956-8.631822 18.4768-19.280356-.001778-.011733-.001778-.023466-.002844-.036266.001066-.027378.002844-.054756.002844-.0832 0-.033067-.002844-.064356-.003911-.096356.9696-.66311 2.270578-1.836089 3.2-3.37991-.539022.296888-2.156089.891377-3.6608 1.038932.965689-.521244 2.396444-2.228266 2.749867-3.585777"
                          fill="#FFF"
                        />
                      </g>
                    </g>
                  </svg>
                  <div>twitter</div>
                </div>
              </a>
            </div>
            <div class="col-sm-3 col-xs-6 q-py-sm"
              v-if="$q.platform.is.mobile">
              <a
                class="cursor-pointer"
                :href="'whatsapp://send?text=' + baseUrl + (url || $route.path)"
                target="_blank">
                <div class="cursor-pointer text-black inline-block">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                         viewBox="0 0 39 39" width="39" height="39" style="enable-background:new 0 0 138 39;" xml:space="preserve">
                    <path
                      style="fill: #00E676"
                      class="st0" d="M10.7,32.8l0.6,0.3c2.5,1.5,5.3,2.2,8.1,2.2l0,0c8.8,0,16-7.2,16-16c0-4.2-1.7-8.3-4.7-11.3
                        c-3-3-7-4.7-11.3-4.7c-8.8,0-16,7.2-15.9,16.1c0,3,0.9,5.9,2.4,8.4l0.4,0.6l-1.6,5.9L10.7,32.8z"/>
                    <path
                      style="fill: #FFFFFF"
                      class="icon_logo_white" d="M32.4,6.4C29,2.9,24.3,1,19.5,1C9.3,1,1.1,9.3,1.2,19.4c0,3.2,0.9,6.3,2.4,9.1L1,38l9.7-2.5
                        c2.7,1.5,5.7,2.2,8.7,2.2l0,0c10.1,0,18.3-8.3,18.3-18.4C37.7,14.4,35.8,9.8,32.4,6.4z M19.5,34.6L19.5,34.6c-2.7,0-5.4-0.7-7.7-2.1
                        l-0.6-0.3l-5.8,1.5L6.9,28l-0.4-0.6c-4.4-7.1-2.3-16.5,4.9-20.9s16.5-2.3,20.9,4.9s2.3,16.5-4.9,20.9C25.1,33.8,22.3,34.6,19.5,34.6
                        z M28.3,23.5L27.2,23c0,0-1.6-0.7-2.6-1.2c-0.1,0-0.2-0.1-0.3-0.1c-0.3,0-0.5,0.1-0.7,0.2l0,0c0,0-0.1,0.1-1.5,1.7
                        c-0.1,0.2-0.3,0.3-0.5,0.3h-0.1c-0.1,0-0.3-0.1-0.4-0.2l-0.5-0.2l0,0c-1.1-0.5-2.1-1.1-2.9-1.9c-0.2-0.2-0.5-0.4-0.7-0.6
                        c-0.7-0.7-1.4-1.5-1.9-2.4l-0.1-0.2c-0.1-0.1-0.1-0.2-0.2-0.4c0-0.2,0-0.4,0.1-0.5c0,0,0.4-0.5,0.7-0.8c0.2-0.2,0.3-0.5,0.5-0.7
                        c0.2-0.3,0.3-0.7,0.2-1c-0.1-0.5-1.3-3.2-1.6-3.8c-0.2-0.3-0.4-0.4-0.7-0.5h-0.3c-0.2,0-0.5,0-0.8,0c-0.2,0-0.4,0.1-0.6,0.1
                        l-0.1,0.1c-0.2,0.1-0.4,0.3-0.6,0.4c-0.2,0.2-0.3,0.4-0.5,0.6c-0.7,0.9-1.1,2-1.1,3.1l0,0c0,0.8,0.2,1.6,0.5,2.3l0.1,0.3
                        c0.9,1.9,2.1,3.6,3.7,5.1l0.4,0.4c0.3,0.3,0.6,0.5,0.8,0.8c2.1,1.8,4.5,3.1,7.2,3.8c0.3,0.1,0.7,0.1,1,0.2l0,0c0.3,0,0.7,0,1,0
                        c0.5,0,1.1-0.2,1.5-0.4c0.3-0.2,0.5-0.2,0.7-0.4l0.2-0.2c0.2-0.2,0.4-0.3,0.6-0.5c0.2-0.2,0.4-0.4,0.5-0.6c0.2-0.4,0.3-0.9,0.4-1.4
                        c0-0.2,0-0.5,0-0.7C28.6,23.7,28.5,23.6,28.3,23.5z"/>
                    </svg>
                  <div>whatsapp</div>
                </div>
              </a>
            </div>
            <!-- <div class="col-xs-4">
              <a
                @click="onShare('https://plus.google.com/share?url=' + baseUrl + (url || $route.path))"
                :href="'https://plus.google.com/share?url=' + baseUrl + (url || $route.path)"
                target="_blank"
              >
                <div class="cursor-pointer text-black inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.917 16.083c-2.258 0-4.083-1.825-4.083-4.083s1.825-4.083 4.083-4.083c1.103 0 2.024.402 2.735 1.067l-1.107 1.068c-.304-.292-.834-.63-1.628-.63-1.394 0-2.531 1.155-2.531 2.579 0 1.424 1.138 2.579 2.531 2.579 1.616 0 2.224-1.162 2.316-1.762h-2.316v-1.4h3.855c.036.204.064.408.064.677.001 2.332-1.563 3.988-3.919 3.988zm9.917-3.5h-1.75v1.75h-1.167v-1.75h-1.75v-1.166h1.75v-1.75h1.167v1.75h1.75v1.166z"
                      fill="#DA4C3E"
                    />
                  </svg>
                  <div>google+</div>
                </div>
              </a>
            </div> -->
            <div class="col-sm-3 col-xs-6 q-py-sm">
              <a
                class="cursor-pointer"
                @click="onShare('https://www.linkedin.com/shareArticle?mini=true&url=' + baseUrl + (url || $route.path))"
                :href="'https://www.linkedin.com/shareArticle?mini=true&url=' + baseUrl + (url || $route.path)"
                target="_blank"
              >
                <div class="cursor-pointer text-black inline-block">
                  <svg
                    viewBox="0 0 60 60"
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                    style="width: 40px; height: 40px;"
                  >
                    <g>
                      <g fill="none" fill-rule="evenodd">
                        <path
                          d="M28.4863253 59.9692983c-6.6364044-.569063-11.5630204-2.3269561-16.3219736-5.8239327C4.44376366 48.4721168 3e-7 39.6467924 3e-7 29.9869344c0-14.8753747 10.506778-27.18854591 25.2744118-29.61975392 6.0281072-.9924119 12.7038532.04926445 18.2879399 2.85362966C57.1386273 10.0389054 63.3436516 25.7618627 58.2050229 40.3239688 54.677067 50.3216743 45.4153135 57.9417536 34.81395 59.5689067c-2.0856252.3201125-5.0651487.5086456-6.3276247.4003916z"
                          fill="#0077B5"
                          fill-rule="nonzero"
                        />
                        <g fill="#FFF">
                          <path
                            d="M17.88024691 22.0816337c2.14182716 0 3.87817284-1.58346229 3.87817284-3.53891365C21.75841975 16.58553851 20.02207407 15 17.88024691 15 15.73634568 15 14 16.58553851 14 18.54272005c0 1.95545136 1.73634568 3.53891365 3.88024691 3.53891365M14.88888889 44.8468474h6.95851852V24.77777778h-6.95851852zM31.6137778 33.6848316c0-2.3014877 1.0888889-4.552108 3.6925432-4.552108 2.6036543 0 3.2438518 2.2506203 3.2438518 4.4970883v10.960701h6.9274074V33.1816948c0-7.9263084-4.6853333-9.29280591-7.5676049-9.29280591-2.8798518 0-4.4682469.9740923-6.2961975 3.33440621v-2.70185178h-6.9471111V44.5905129h6.9471111V33.6848316z"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                  <div>linkedin</div>
                </div>
              </a>
            </div>
            <div class="col-sm-3 col-xs-6 q-py-sm">
              <a :href="'mailto:?subject='+model.name+'&body=' + baseUrl + (url || $route.path)">
                <div class="cursor-pointer text-black inline-block">
                  <svg
                    viewBox="0 0 60 60"
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                    style="width: 40px; height: 40px;"
                  >
                    <g>
                      <g fill-rule="nonzero" fill="none">
                        <path
                          d="M28.4863253 59.9692983c-6.6364044-.569063-11.5630204-2.3269561-16.3219736-5.8239327C4.44376366 48.4721168 3e-7 39.6467924 3e-7 29.9869344c0-14.8753747 10.506778-27.18854591 25.2744118-29.61975392 6.0281072-.9924119 12.7038532.04926445 18.2879399 2.85362966C57.1386273 10.0389054 63.3436516 25.7618627 58.2050229 40.3239688 54.677067 50.3216743 45.4153135 57.9417536 34.81395 59.5689067c-2.0856252.3201125-5.0651487.5086456-6.3276247.4003916z"
                          fill="#888"
                        />
                        <path
                          d="M40.531502 19.160814h-22c-1.74 0-2.986 1.2375-3 3v16c0 1.7625 1.26 3 3 3h22c1.74 0 3-1.2375 3-3v-16c0-1.7625-1.26-3-3-3zm0 6l-11 7-11-7v-3l11 7 11-7v3z"
                          fill="#FFF"
                        />
                      </g>
                    </g>
                  </svg>
                  <div>email</div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <hr class="q-mt-md q-mb-none" />
        <div class="q-py-md">
          <q-input
            :loading="loadingUrl"
            outlined
            class="bg-grey-12"
            readonly
            borderless
            ref="link"
            @click="onClick"
            v-model="theUrl"
          >
            <template v-slot:append>
              <q-btn round dense class="gtm-track" @click="copyClipboard" flat icon="content_copy" gtm-action="btn_share_copy"/>
            </template>
          </q-input>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { copyToClipboard } from 'quasar'

export default {
  name: "ModalShare",
  components: {},
  props: {
    model: Object,
    url: String
  },
  data() {
    return {
      className: "modal-share",
      baseUrl: "",
      url_short: "",
      theUrl: "",
      loadingUrl: false,
      isOpen: false
    };
  },
  created() {
    // this.baseUrl = process.env.HOST
    this.baseUrl = process.env.HOST
  },
  methods: {
    show () {
      console.log(this.model)
      console.log(this.url)
      this.isOpen = true
      this.theUrl = process.env.HOST + this.url
    },
    onShare(link) {
      window.open(
        link,
        "fbShareWindow",
        "height=600, width=800, top=" +
          (window.innerHeight / 2 - 275) +
          ", left=" +
          (window.innerWidth / 2 - 225) +
          ", toolbar=0, location=0, menubar=0, directories=0, scrollbars=0"
      );
      return false;
    },
    onClick(e) {
      let url = this.$refs.link;
      url.select();
    },
    copyClipboard() {
      copyToClipboard(this.contentToCopy())
        .then(() => {
          this.$q.notify({
            icon: 'check',
            timeout: 500,
            message: 'Tersalin'
          })
        })
        .catch((error) => {
          // fail
          console.log(error)
        })
    },

    contentToCopy () {
      return this.model.name + '\n' + process.env.HOST + this.url
    }
  },
  mounted() {
    document.body.classList.remove("modal-open");
  }
};
</script>
