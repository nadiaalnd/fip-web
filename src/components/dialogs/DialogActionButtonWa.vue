<template>
  <q-page-sticky position="bottom-right" :offset="[18, 18]" style="z-index: 1">
    <div @click="showDialogWhatsapp" class="flex flex-center floating-action-button-wa" style="background-color: transparent overflow: hidden; height: 120px; width: 120px; cursor: pointer;">
      <img class="image-logo-wa" src="/images/fab-wa.png" />
      <q-tooltip id="wa-tooltip">
        Tanya finplan
      </q-tooltip>
    </div>
  </q-page-sticky>

  <q-dialog v-model="dialogWaVisible" transition-show="slide-up" transition-hide="slide-down" class="dialog-form-whatsapp">
    <q-card class="dialog-card-wa">
      <q-icon name="highlight_off" type="button" size="24px" class="q-mr-sm cancel-icon-card-wa"
        @click="dialogWaVisible = false" />
      <q-card-section>
        <q-card-title style="display: flex; flex-wrap: wrap;">
          <span class="title-card-heading-wa">Hi, kami akan membantu kamu</span>
          <span class="text-card-body-wa">Silahkan isi nama kamu dan pertanyaan yang ingin kamu tanyakan</span>
        </q-card-title>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="sendQuestionWa">
          <span class="form-title-input-wa">Nama</span>
          <q-input outlined v-model="form.nama" dense placeholder="Ketik nama / institusi" class="q-mb-md"
            style="border: 1px solid #BDBDBD; border-radius: 5px;" maxlength="100" />

          <span class="form-title-input-wa">Pertanyaan</span>
          <q-input outlined v-model="form.question" type="textarea" rows="5" dense
            placeholder="Saya ingin bertanya mengenai" maxlength="256" :max-height="100" :input-style="{ resize: 'none' }"
            style="border: 1px solid #BDBDBD; border-radius: 5px; position: relative;">
            <template v-slot:append>
              <div class="character-counter-question-wa">{{ form.question.length }}/256</div>
            </template>
          </q-input>
          <small v-if="showErrorMessage" style="color: red;">Harap isi lebih dari 10 karakter</small>

          <q-card-actions align="center">
            <q-btn class="btn-send-wa-question" label="Kirim pesan" type="submit" :disable="!isFormValid"
              :class="{ 'disabled-button-send-wa': !isFormValid }" @click="validateForm($event)" />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DialogActionButtonWa',

  data() {
    return {
      dialogWaVisible: false,
      form: {
        nama: '',
        question: ''
      },
      showErrorMessage: false,
      useComponent: true
    }
  },
  computed: {
    isFormValid() {
      return this.form.nama.length > 0 && this.form.question.length > 0;
    }
  },
  methods: {
    showDialogWhatsapp() {
      this.dialogWaVisible = true;
    },
    validateForm(event) {
      event.preventDefault(); // Mencegah aksi default (pembukaan link)

      if (this.form.question.length < 11) {
        this.showErrorMessage = true;
      } else {
        this.showErrorMessage = false;
        this.sendQuestionWa();
      }
    },
    sendQuestionWa() {
      const nama = this.form.nama.trim();
      const question = this.form.question.trim();

      if (nama && question) {
        const data = {
          nama: nama,
          question: question
        };

        this.$services.sendQuestionWA(data, () => {
        }, (msg, error) => {
        }, () => {
          // on finish
          const whatsappLink = `https://api.whatsapp.com/send/?phone=6281230006989&text=Halo+saya+${encodeURIComponent(nama)}%0A${encodeURIComponent(question)}&app_absent=0`;
          window.open(whatsappLink, '_blank');
        })
      }
      this.dialogWaVisible = false;
    }
  },
}
</script>