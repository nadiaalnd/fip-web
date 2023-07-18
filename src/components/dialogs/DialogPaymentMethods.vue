<template>
  <q-dialog v-model="dialog">
    <q-card
      class="q-pa-md"
      style="width: 600px; height: 100%; max-width: calc(100% - 32px)"
    >
      <q-toolbar>
        <q-toolbar-title>
          <span class="text-h6">Metode Pembayaran</span>
        </q-toolbar-title>
        <q-btn
          flat round dense v-close-popup
          icon="close"
          size="1em"
          class="gtm-track"
          gtm-action="btn_payment_method_close"
        >
        </q-btn>
      </q-toolbar>
      <q-card-section class="q-pa-none q-ma-xs">
        <div v-for="method in Object.keys(payment.methods)" :key="method">
          <div class="payment-method-group">
            <div class="--label">
              {{ payment.methods[method].label }}
            </div>
            <div
              :class="
                'payment-method-item ' +
                (['BCA', 'SAHABAT_SAMPOERNA', 'BJB', 'CIMB', 'BSI'].indexOf(
                  item.code
                ) > -1
                  ? 'hidden'
                  : '')
              "
              v-for="(item, idx) in payment.methods[method].list"
              :key="idx"
              @click="
                () => {
                  $emit('selected', item, payment.methods[method].code, method);
                  dialog = false;
                }
              "
            >
              <div :id="`bankButton-${item.code}`">
                <img :src="item.img" width="80" />
                <div class="--label">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "DialogPaymentMethods",
  props: {
    code: null,
  },
  data() {
    return {
      dialog: false,
      payment: {
        methods: {
          banks: {
            code: 101,
            label: "Transfer Bank",
            list: [],
          },
          ewallet: {
            code: 102,
            label: "E-Wallet",
            list: [
              {
                name: "OVO",
                code: "OVO",
                img: "/images/pm_ovo.png",
              },
              {
                name: "LINKAJA",
                code: "LINKAJA",
                img: "/images/pm_linkaja.png",
              },
              {
                name: "DANA",
                code: "DANA",
                img: "/images/pm_dana.png",
              },
            ],
          },
          qrcode: {
            code: 104,
            label: "QR Code",
            list: [
              {
                name: "QRIS",
                code: "QRIS",
                img: "/images/pm_qris.png",
              },
            ],
          },
          retail: {
            code: 105,
            label: "Retail Store",
            list: [
              {
                name: "ALFAMART",
                code: "ALFAMART",
                img: "/images/pm_alfamart.png",
              },
            ],
          },
        },
      },
    };
  },

  mounted() {
    // Object.keys(this.payment.methods).forEach((key, i) => {
    //   this.getPaymentMethods(key)
    // })
    this.getPaymentMethods("banks");
  },

  methods: {
    show() {
      this.dialog = true;
    },
    getPaymentMethods (method) {
      this.$services.payment.gateway(method, (data) => {
        data.forEach((item, i) => {
          item.img = this.$utils.payment.getImage(item.code)
          if (this.code == item.code) {
            this.$emit('selected', item, this.payment.methods[method].code, method)
          }
        })
        this.payment.methods[method].list = data.filter((element) => element?.is_activated)
      }, (msg, errors) => {
      }, () => {
      })
    },

    getDefaultPaymentMethod(paymentMethod, code) {
      const methods = this.payment.methods;
      Object.keys(methods).forEach((method) => {
        if (methods[method].code == paymentMethod) {
          const list = methods[method].list;
          list.forEach((item, i) => {
            const issuer = item.code;
            if (issuer == code) {
              this.$emit("selected", item, paymentMethod, method);
            }
          });
        }
      });
    },
  },
};
</script>
