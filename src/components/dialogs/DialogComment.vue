<template>
  <div class="q-pa-md">
    <q-dialog :class="className" v-model="isOpen" persistent
      position="right"
      transition-show="right" transition-hide="right"
      maximized>
      <q-card
        style="width: 400px; background-color: #f5f5f5"
      >
        <!-- list topic/comment section -->
        <q-card-section v-if="listTopicSection" class="row items-center">
          <div class="text-h6 text-blue text-bold">Komentar atau Diskusi</div>
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
            class="text-grey"
            @click="isOpen = false"
          />
          <q-btn
            unelevated
            no-caps
            color="secondary"
            text-color="dark"
            label="Buat Topik Terbaru"
            class="full-width text-bold q-my-md q-py-sm"
            @click="openAddTopicSection"
          />

          <q-card
            v-for="(item, idx) in comments"
            :key="idx"
            class="my-card full-width"
            style="
              box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
              border-radius: 10px;
              margin-bottom: 15px;
            "
          >
            <q-card-section>
              <div class="title-section row items-center">
                <div
                  @click="openTopicSection(item.id, idx)"
                  class="cursor-pointer text-h6 text-capitalize text-blue text-bold"
                >
                  {{ item.title }}
                </div>
                <q-chip
                  v-if="item.status == 'finish'"
                  class="q-ml-sm"
                  outline
                  color="teal"
                  text-color="white"
                  size="10px"
                >
                  Selesai
                </q-chip>
                <q-space />
                <q-btn
                  v-if="item.user.username == this.username"
                  icon="more_vert"
                  flat
                  round
                  dense
                  class="text-grey"
                  style="z-index: 99"
                >
                  <q-menu
                    transition-show="flip-right"
                    transition-hide="flip-left"
                  >
                    <q-list style="min-width: 170px">
                      <q-item clickable>
                        <q-item-section @click="finishTopic(item.id)"
                          >Akhiri Topik/Diskusi</q-item-section
                        >
                      </q-item>
                      <q-item clickable>
                        <q-item-section
                          @click="
                            tempDelete(item.id, item.id_product),
                              (confirmEndTopic = true)
                          "
                          >Hapus</q-item-section
                        >
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
              <div
                @click="openTopicSection(item.id, idx)"
                class="row items-center text-capitalize text-subtitle2 text-bold cursor-pointer"
              >
                {{ item.user.name }}
                <span
                  class="text-caption text-uppercase q-ml-sm text-grey"
                  style="font-weight: normal"
                  >{{ dateFormat(item.time_create) }}</span
                >
              </div>
            </q-card-section>
          </q-card>
        </q-card-section>

        <!-- add new topic/comment section -->
        <q-card-section v-if="addTopicSection" class="row items-center">
          <q-btn
            icon="arrow_back"
            flat
            round
            dense
            v-close-popup
            class="text-grey"
            @click="closeAddTopicSection"
          />
          <q-space />
          <div class="text-h6 text-blue text-bold text-center">
            Buat Topik Terbaru
          </div>
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
            class="text-grey"
            @click="isOpen = false"
          />

          <q-card
            class="my-card full-width q-mt-lg"
            style="
              box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
              border-radius: 10px;
            "
          >
            <q-card-section>
              <div class="q-pa-md q-gutter-sm">
                <div class="">Judul</div>
                <q-input outlined v-model="form.title" id="title-topic"/>
                <!-- <q-input outlined v-model="text"/> -->

                <div class="q-mt-md">Posting</div>
                <q-editor
                  v-model="form.comment"
                  :toolbar="[['bold', 'italic', 'underline']]"
                  id="posting-topic"
                />

                <q-card-actions align="right" class="q-mt-md">
                  <q-btn
                    id="cancelTopic-button"
                    @click="confirmCancelTopic = true"
                    flat
                    no-caps
                    label="Batalkan"
                    color="dark"
                    class="q-mx-md"
                  />
                  <q-btn
                    id="createTopic-button"
                    @click="saveTopic"
                    unelevated
                    no-caps
                    label="Buat"
                    color="blue"
                    class="text-center"
                    v-close-popup
                    style="border-radius: 8px; min-width: 80px"
                  />
                </q-card-actions>
              </div>
            </q-card-section>
          </q-card>
        </q-card-section>

        <!-- topic/comment clicked section -->
        <div v-for="(item, idx) in commentTemp" :key="idx">
          <q-card-section v-if="topicCickedSection" class="row items-center">
            <q-btn
              icon="arrow_back"
              flat
              round
              dense
              v-close-popup
              class="text-grey"
              @click="closeTopicSection"
            />
            <q-space />
            <div class="text-h6 text-blue text-bold text-center">
              {{ item.title }}
            </div>
            <q-space />
            <q-btn
              icon="close"
              flat
              round
              dense
              v-close-popup
              class="text-grey"
              @click="isOpen = false"
            />

            <!-- main card -->
            <q-card
              class="my-card full-width q-mt-lg q-pa-sm"
              style="
                box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
                border-radius: 10px;
              "
            >
              <q-card-section>
                <div class="profile-section row items-center">
                  <div class="col-auto">
                    <img
                      v-if="item.user.avatar == ''"
                      src="/images/avatar/bagus.svg"
                      style="width: 48px; height: 48px; border-radius: 50%"
                    />
                    <img
                      v-else
                      :src="item.user.avatar"
                      style="width: 48px; height: 48px; border-radius: 50%"
                    />
                  </div>
                  <div class="col">
                    <div class="q-ml-md">
                      <div class="text-bold text-capitalize">
                        {{ item.user.name }}
                        <span
                          v-if="item.user.role[0] == 'user'"
                          class="text-bold text-positive"
                          style="font-weight: normal"
                          >({{ item.user.role[0] }})</span
                        >
                        <span
                          v-else
                          class="text-bold text-negative"
                          style="font-weight: normal"
                          >({{ item.user.role[0] }})</span
                        >
                      </div>
                      <span
                        class="text-caption text-grey"
                        style="font-weight: normal"
                        >{{ item.user.username }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="text-body1 text-blue text-bold q-mt-lg">
                  {{ item.title }}
                </div>
                <div
                  v-html="item.comment"
                  class="desc-section text-justify q-mt-md"
                />
                <div class="text-right q-mt-sm">
                  <span
                    class="text-caption text-grey text-uppercase"
                    style="font-weight: normal"
                    >{{ dateFormat(item.time_create) }}</span
                  >
                </div>
                <q-card-actions
                  align="right"
                  class="q-mt-md"
                  style="padding: 0px"
                >
                  <q-btn
                    @click="replySection"
                    unelevated
                    no-caps
                    label="Balas"
                    class="text-center text-dark"
                    style="
                      border-radius: 8px;
                      background-color: #ffde59;
                      width: 95px;
                    "
                  />
                </q-card-actions>
              </q-card-section>
            </q-card>

            <!-- editor reply card -->
            <q-card
              v-if="isReply"
              class="my-card full-width q-mt-lg q-pa-sm"
              style="
                box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
                border-radius: 10px;
              "
            >
              <q-card-section>
                <div class="q-gutter-sm">
                  <q-editor
                    v-model="formChild.comment"
                    :toolbar="[['bold', 'italic', 'underline']]"
                  />

                  <q-card-actions
                    align="right"
                    class="q-mt-md"
                    style="padding: 0px"
                  >
                    <q-btn
                      @click="closeReplySection"
                      flat
                      no-caps
                      label="Batalkan"
                      color="dark"
                      class="q-mx-md"
                    />
                    <q-btn
                      @click="sendComment"
                      unelevated
                      no-caps
                      label="Kirim"
                      color="blue"
                      class="text-center"
                      style="border-radius: 8px; min-width: 80px"
                    />
                  </q-card-actions>
                </div>
              </q-card-section>
            </q-card>

            <!-- replies card -->
            <q-card
              v-for="(item, idx) in childComments"
              :key="idx"
              class="my-card full-width q-mt-lg q-pa-sm"
              style="
                box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
                border-radius: 10px;
              "
            >
              <q-card-section>
                <div class="row">
                  <div class="col-auto">
                    <img
                      v-if="item.user.avatar == ''"
                      src="/images/avatar/bagus.svg"
                      style="width: 48px; height: 48px; border-radius: 50%"
                    />
                    <img
                      v-else
                      :src="item.user.avatar"
                      style="width: 48px; height: 48px; border-radius: 50%"
                    />
                  </div>
                  <div class="col">
                    <div class="q-ml-md">
                      <div class="text-bold text-capitalize">
                        {{ item.user.name }}
                        <span
                          v-if="item.user.role[0] == 'user'"
                          class="text-bold text-positive"
                          style="font-weight: normal"
                          >({{ item.user.role[0] }})</span
                        >
                        <span
                          v-else
                          class="text-bold text-negative"
                          style="font-weight: normal"
                          >({{ item.user.role[0] }})</span
                        >
                      </div>
                      <span
                        class="text-caption text-grey"
                        style="font-weight: normal"
                        >{{ item.user.username }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <q-btn
                    v-if="item.user.username == this.username"
                    @click="
                      tempDelete(item.id, item.id_product),
                        (confirmEndTopic = true)
                    "
                    unelevated
                    no-caps
                    style="
                      padding: 0px;
                      border-radius: 8px;
                      background-color: #ff5555;
                      width: 95px;
                    "
                  >
                    <q-icon center size="1.2em" name="img:/images/delete.svg" />

                    <div
                      class="q-ml-sm"
                      style="font-size: 14px; color: #fff; font-weight: normal"
                    >
                      Hapus
                    </div>
                  </q-btn>
                </div>
                <div
                  v-html="item.comment"
                  class="desc-section text-justify q-mt-md"
                />
                <div class="text-right q-mt-sm">
                  <span
                    class="text-caption text-grey text-uppercase"
                    style="font-weight: normal"
                    >{{ dateFormat(item.time_create) }}</span
                  >
                </div>
              </q-card-section>
            </q-card>
          </q-card-section>
        </div>
      </q-card>
    </q-dialog>

    <!-- DIALOG CONFIRM end topic/discussion -->
    <q-dialog v-model="confirmEndTopic" persistent>
      <q-card class="q-pa-lg">
        <q-card-section class="text-center q-mb-md">
          <div class="text-h5">Apakah Anda yakin untuk menghapus ini?</div>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            flat
            no-caps
            label="Batalkan"
            color="dark"
            class="text-body1 q-mx-md"
            v-close-popup
          />
          <q-btn
            @click="endTopic"
            unelevated
            no-caps
            label="Ya"
            color="blue"
            class="text-body1 q-mx-md"
            v-close-popup
            style="border-radius: 8px"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- DIALOG CONFIRM cancel add topic/discussion -->
    <q-dialog v-model="confirmCancelTopic" persistent>
      <q-card class="q-pa-lg">
        <q-card-section class="text-center q-mb-md">
          <div class="text-h5">
            Apakah Anda yakin untuk menghapus postingan Anda?
          </div>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            flat
            no-caps
            label="Batalkan"
            color="dark"
            class="text-body1 q-mx-md"
            v-close-popup
          />
          <q-btn
            @click="cancelTopic"
            unelevated
            no-caps
            label="Ya"
            color="blue"
            class="text-body1 q-mx-md"
            v-close-popup
            style="border-radius: 8px"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <DialogAddTopic ref="dialogAddTopic" />
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import moment from "moment";

export default {
  name: "ModalComment",
  components: {},
  setup() {
    const $q = useQuasar();
    return {
      editor: ref(""),
    };
  },
  data() {
    return {
      className: "modal-comment",

      username: null,

      comments: [],
      commentTemp: {
        comment: null,
      },

      idCommentSelected: null,
      idProductCommentSelected: null,

      statusComment: null,

      product: {
        id: null,
      },

      childComments: [],
      idProduct: null,

      form: {
        title: "",
        id_product: parseInt(this.$route.params.id),
        comment: "",
      },

      formChild: {
        id_parent: null,
        comment: "",
      },

      isOpen: false,
      isEndTopic: ref(false),
      confirmEndTopic: ref(false),
      confirmCancelTopic: ref(false),
      addTopicSection: ref(false),
      listTopicSection: ref(true),
      topicCickedSection: ref(false),
      isReply: ref(false),
    };
  },

  mounted() {
    let user = this.$utils.getUser()
    this.username = user?.username
    document.body.classList.remove("modal-open");
    this.getComments(this.$route.params.id);
  },

  methods: {
    dateFormat(date) {
      return moment(date).fromNow();
    },
    tempDelete(id, id_product) {
      this.idCommentSelected = id;
      this.idProductCommentSelected = id_product;
    },
    getComments(id) {
      this.$services.product.getComment(
        id,
        (data) => {
          this.comments = data;
        },
        (msg, error) => {},
        () => {}
      );
    },
    getChildComment() {
      this.$services.product.getChildComments(
        this.formChild.id_parent,
        (data) => {
          this.childComments = data;
        },
        (msg, error) => {},
        () => {}
      );
    },
    sendComment() {
      // logic here
      this.$services.product.sendComment(
        this.formChild,
        (data) => {},
        (msg, errors) => {},
        () => {
          this.loading = false;
          this.getComments(this.$route.params.id);
          this.getChildComment();
        }
      );
      this.formChild.comment = "";
      this.isReply = false;
    },
    finishTopic(idComment) {
      console.log(`id comment selected: ${idComment}`);
      this.$services.product.updateFinishComment(
        {
          id: idComment,
        },
        (data) => {
          this.statusComment = data.status;
        },
        (msg, errors) => {},
        () => {
          this.getComments(this.$route.params.id);
        }
      );
      this.isFinish = true;
    },
    show() {
      if (this.$utils.getToken() == null) {
        this.$q.notify({
          message: "Harap masuk terlebih dahulu",
          color: "negative",
        });
        this.$global.$emit("showLogin");
        return;
      }
      this.getComments(this.$route.params.id);
      this.isOpen = true;
      this.theUrl = process.env.HOST + this.url;
    },
    openAddTopicSection() {
      this.addTopicSection = true;
      this.listTopicSection = false;
    },
    closeAddTopicSection() {
      this.addTopicSection = false;
      this.listTopicSection = true;
    },
    //delete
    endTopic() {
      this.isEndTopic = true;
      this.$services.product.deleteComment(
        {
          id: this.idCommentSelected,
          id_product: this.idProductCommentSelected,
        },
        (data) => {
          this.getComments(this.$route.params.id);
          // this.product.is_bookmarked = 0
        },
        () => {},
        () => {
          this.getComments(this.$route.params.id);
        }
      );
    },

    deleteChild() {
      this.$services.product.deleteComment(
        {
          id: this.idCommentSelected,
          id_product: 0,
        },
        (data) => {
          this.getComments(this.$route.params.id);
          // this.product.is_bookmarked = 0
        },
        () => {},
        () => {
          this.getComments(this.$route.params.id);
        }
      );
    },
    cancelTopic() {
      this.addTopicSection = false;
      this.listTopicSection = true;
    },
    saveTopic() {
      // logic here
      this.$services.product.sendComment(
        this.form,
        (data) => {},
        (msg, errors) => {
          this.$q.notify({
            message: "Gagal Dikirim",
            color: "negative",
          });
        },
        () => {
          this.loading = false;
          this.getComments(this.$route.params.id);
        }
      );

      this.form.title = "";
      this.form.comment = "";
      this.addTopicSection = false;
      this.listTopicSection = true;
    },
    openTopicSection(id, idx) {
      this.commentTemp.comment = this.comments[idx];
      this.formChild.id_parent = id;
      this.getChildComment();

      this.listTopicSection = false;
      this.topicCickedSection = true;
    },
    closeTopicSection() {
      this.topicCickedSection = false;
      this.listTopicSection = true;
    },
    replySection() {
      this.isReply = true;
    },
    closeReplySection() {
      this.isReply = false;
    },
  },
};
</script>
