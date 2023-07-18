<template>
  <div>
    <div class="relative-position q-mb-xs" style="height: 480px">
      <div
        class="pulse-yellow"
        style="
          z-index: 1;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        "
      >
        <q-icon
          class="icon-play cursor-pointer"
          style="border-radius: 50%; display: block"
          @click="playVideo"
          size="4em"
          color="secondary"
          name="play_circle"
        />
      </div>
      <video
        id="my-video"
        ref="videoPlayer"
        class="video-js"
        controls
        preload="auto"
        style="width: 100%; height: 100%"
        :poster="videoPoster"
        data-setup="{}"
        @ready="playerReadied"
        @play="onPlayerPlay"
        @pause="onPlayerPause"
        @timeupdate="onPlayerTimeupdate"
        @seeked="onSeeked"
      >
        <p class="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to
          a web browser that
          <a href="https://videojs.com/html5-video-support/" target="_blank"
            >supports HTML5 video</a
          >
        </p>
      </video>
    </div>
    <dialog-nps v-if="showNPS" :showNPS="showNPS" :section="`video`" />
  </div>
</template>

<script>
import "https://vjs.zencdn.net/7.20.3/video.min.js";
import DialogNPS from "./dialogs/DialogNPS.vue";

export default {
  name: "VideoPlayer",
  components: {
    "dialog-nps": DialogNPS,
  },
  data() {
    return {
      videoUrl: "",
      videoPoster: "",
      isPlaying: false,
      lastTime: 0,
      report_data: {
        id_product: 0,
        pointer: 0,
        duration: 0,
      },
      showNPS: false,
    };
  },
  props: {
    product: Object,
    sendReport: {
      type: Boolean,
      default: true,
    },
    pointer: Number,
  },
  computed: {
    player() {
      return this.$refs.videoPlayer;
    },
  },
  methods: {
    setThumbnail(value) {
      this.videoPoster = value;
      videojs("my-video").poster(value);
    },
    setVideo(id, src) {
      this.isPlaying = false;
      if (this.player) {
        videojs("my-video").player().pause();
      }
      this.$nextTick(() => {
        this.report_data.second_start = 0;
        this.report_data.pointer = 0;
        this.report_data.duration = 0;
        this.setSrc(src);
        this.setIdOnReport(id);
      });
    },
    setSrc(value) {
      const isNew = this.videoUrl == null || this.videoUrl == "";
      this.videoUrl = value;
      videojs("my-video").src(value);
    },
    setIdOnReport(id) {
      this.report_data.id_product = id;
    },
    setAspectRatio(value) {
      this.player.aspectRatio(value);
    },
    playerReadied() {},
    onPlayerTimeupdate() {
      const currentTime = parseInt(this.player.currentTime);
      let duration = this.report_data.duration;
      if (this.player.duration) {
        duration = Math.floor(this.player.duration);
        this.report_data.duration = duration;
      }
      if (
        (duration != 0 && duration <= currentTime) ||
        (this.lastTime !== currentTime && currentTime % 5 === 0)
      ) {
        const pointer = this.pointer + 5;
        this.report_data.pointer = parseInt(pointer);
        this.reportProduct();
      }
      this.lastTime = currentTime;
    },
    onPlayerPause() {
      this.$el.querySelector(".icon-play").style.display = "block";
    },
    onPlayerPlay() {
      this.$el.querySelector(".icon-play").style.display = "none";
      if (this.player.currentTime <= 0) {
        this.reportProduct();
      }
      this.player.play();
    },
    onSeeked() {
      this.report_data.second_start = parseInt(this.player.currentTime);
    },
    reportProduct() {
      if (!this.sendReport || this.report_data.duration == 0) {
        return;
      }
      this.$services.product.updateProgress(
        this.report_data,
        (data) => {
          this.$emit(
            "updatePercentage",
            this.report_data.pointer,
            this.report_data.duration
          );
        },
        (msg, error) => {
          console.log(msg);
        },
        () => {}
      );
    },

    playVideo() {
      if (this.$utils.getToken() == null) {
        this.$q.notify({
          message: "Harap masuk terlebih dahulu",
          color: "primary",
        });
        this.$global.$emit("showLogin");
        return;
      }
      this.player.play();
    },

    setupVideo() {},
  },
  beforeUnmount() {
    videojs("my-video").dispose();
  },

  watch: {
    lastTime: function (newVal) {
      if (newVal > 20) {
        this.showNPS = true;
      }
    },
  },
};
</script>

<style lang="sass">
.video-js .vjs-big-play-button
  display: none !important
</style>
