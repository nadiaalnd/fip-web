<template>
    <q-page class="q-py-md">
        <div class="container-sm">
            <div class="items-center">
                <h1 class="text-primary text-bold text-center q-ma-none" style="font-size: 32px; line-height: 1.01;">
                    Informasi Pembelian
                </h1>
                <hr/>
                </div>
                <div class="q-py-md payment-container">
                <div class="payment-main q-px-md q-mb-md"
                    v-if="purchase">
                    <template
                        v-for="(aPackage, idx) in purchase.packages"
                        :key="'package-' + idx">
                        <div class="q-mb-sm">
                            <div class="row" style="align-items: flex-start; justify-content: center; flex-wrap: nowrap;">
                                <h3 class="flex-1 title q-mx-none q-pl-none q-pr-sm" style="margin-bottom: 0">
                                {{ aPackage.name }}
                                </h3>
                                <div class="text-primary text-bold" style="font-size: 18px; white-space: nowrap;">
                                Rp {{aPackage.price_sell.toLocaleString()}}
                                </div>
                            </div>
                            <div class="row">
                            </div>
                            <div class="section text-neutral" style="font-weight: 300">
                                {{aPackage.duration_days}} hari
                            </div>
                        </div>
                        <div
                            class="jodit-wysiwyg-content q-mb-md"
                            v-html="aPackage.description"></div>
                    </template>
                </div>
                <div class="payment-sidebar q-px-md">
                    <q-card class="q-pa-sm q-mb-md"
                        v-if="purchase">
                        <div>
                            <div class="q-mb-md text-bold" style="font-size: 18px">
                                INVOICE
                            </div>
                            <div class="q-mb-sm"
                                v-if="purchase.order_number">
                                <div class="text-grey">
                                    ID Pemesanan
                                </div>
                                <div class="text-bold">
                                    {{purchase.order_number}}
                                </div>
                            </div>
                            <div class="row flex-center">
                                <div class="q-mb-sm flex-1">
                                    <div ref="paymentStatus" class="text-grey">Status Pembayaran</div>
                                    <div class="text-bold">{{
                                    purchase.is_paid == 1 ? 'Lunas'
                                    : purchase.is_paid == 2 ? 'Pembayaran Ditolak'
                                    : $utils.payment.isExpired(purchase.payment_expired, purchase.time_create) ? 'Transaksi Kadaluarsa'
                                    : purchase.proof == '' || purchase.proof == null ? 'Belum dibayar'
                                    : 'Menunggu Konfirmasi Admin' }}</div>
                                </div>
                                <div>
                                    <q-btn
                                        v-if="purchase.is_paid == 0"
                                        push dense no-caps
                                        color="primary"
                                        size="md"
                                        class="q-px-sm gtm-track"
                                        label="Perbarui status"
                                        :loading="loading"
                                        @click="getPurchaseStatus(purchase.id)"
                                        gtm-action="btn_transaction_check_status"/>
                                    <q-btn
                                        v-else-if="purchase.is_paid == 1"
                                        unelevated dense no-caps
                                        color="primary"
                                        size="md"
                                        class="q-px-sm gtm-track"
                                        label="Akses Pembelian"
                                        :loading="loading"
                                        @click="() =>{
                                            $router.push({
                                                path: `/profile`
                                            })
                                        }"
                                        gtm-action="btn_transaction_detail_access"/>
                                </div>
                            </div>
                            <section
                                v-if="purchase.notes && purchase.is_paid == 2"
                                class="q-mb-sm">
                                <div class="text-grey">Catatan dari Admin</div>
                                <div class="text-bold">
                                    {{purchase.notes}}
                                </div>
                            </section>
                            <section class="q-mb-sm">
                                <div class="text-grey">Pembelian untuk</div>
                                <ul class="q-mt-none q-pl-md q-mb-none">
                                    <li
                                    v-for="(pkg, idx) in purchase.packages"
                                    :key="'pkg-' + idx">
                                    Berlangganan E-Learning : {{pkg.name}}
                                    </li>
                                </ul>
                            </section>
                            <section>
                                <div class="row">
                                    <div class="text-grey flex-1" style="font-size: 14px;">
                                        Sub Total
                                    </div>
                                    <div>
                                        Rp {{ price.subTotal.toLocaleString() }}
                                    </div>
                                </div>
                                <div class="row" v-if="price.discount > 0">
                                    <div class="text-grey flex-1" style="font-size: 14px;">
                                        Diskon
                                    </div>
                                    <div class="text-red">
                                        - Rp {{ price.discount.toLocaleString() }}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="text-grey text-bold flex-1" style="font-size: 14px;">
                                        Total
                                    </div>
                                    <div class="text-bold" style="font-size: 16px">
                                        Rp {{ price.total.toLocaleString() }}
                                    </div>
                                </div>
                            </section>
                            <template v-if="purchase.proof">
                                <hr/>
                                <div class="text-center">
                                    <div style="font-weight: 600" class="q-mb-sm">
                                        Bukti bayar / kartu pelajar / KTM
                                    </div>
                                    <ImageComponent
                                        class="inline-block"
                                        :src="API_URL_IMG + purchase.proof"
                                        width="300px"
                                        height="400px"/>
                                </div>  
                            </template>
                            <template
                                v-if="price.total > 0">
                                <hr/>
                                <div class="payment-method-item q-mb-sm"
                                    style="padding: 0"
                                    v-if="payment.gateway">
                                    <img
                                        :src="payment.gateway.img"
                                        width="80"/>
                                    <div class="--label">
                                        {{ payment.gateway.name }}
                                    </div>
                                    <q-btn
                                        dense no-caps outline
                                        color="primary"
                                        size="sm"
                                        class="q-px-sm gtm-track"
                                        label="Cara Pembayaran"
                                        @click="$refs.dialogHowToPay.show(payment.gatewayMethodCode, payment.gateway.code)"
                                        gtm-action="btn_transaction_how_to_pay"/>
                                </div>
                                <div class="q-mb-md"
                                    v-if="purchase.payment_url">
                                    <div class="text-grey">
                                    Link Pembayaran
                                    </div>
                                    <a class="text-bold payment-box flex flex-center"
                                    :href="purchase.payment_url"
                                    target="_blank">
                                    <div class="flex-1">
                                        Klik untuk melakukan pembayaran
                                    </div>
                                    <q-icon
                                        name="chevron_right"/>
                                    </a>
                                    <div v-if="redirecting"
                                    class="text-italic text-positive text-sm">
                                    * Harap tunggu, sedang mengarahkan ke halaman pembayaran
                                    </div>
                                </div>
                                <div class="q-mb-md"
                                    v-if="purchase.payment_va">
                                    <div class="text-grey">
                                    Nomor Virtual Account
                                    </div>
                                    <div class="text-bold payment-box flex">
                                    <div class="flex-1">
                                        {{purchase.payment_va}}
                                    </div>
                                    <q-btn
                                        dense no-caps outline
                                        color="primary"
                                        size="sm"
                                        class="q-px-sm gtm-track"
                                        label="Salin"
                                        @click="copyText(purchase.payment_va)"
                                        gtm-action="btn_transaction_copy_va"/>
                                    </div>
                                </div>
                                <div class="q-mb-md"
                                    v-if="purchase.payment_code">
                                    <div class="text-grey">
                                    Kode Bayar
                                    </div>
                                    <div class="text-bold payment-box flex">
                                    <div class="flex-1">
                                        {{purchase.payment_code}}
                                    </div>
                                    <q-btn
                                        dense no-caps outline
                                        color="primary"
                                        size="sm"
                                        class="q-px-sm gtm-track"
                                        label="Salin"
                                        @click="copyText(purchase.payment_code)"
                                        gtm-action="btn_transaction_copy_code"/>
                                    </div>
                                </div>
                                <div class="q-mb-md"
                                    v-if="payment.qr">
                                    <div class="text-grey">
                                        Scan QR untuk bayar melalui QRIS
                                    </div>
                                    <div class="text-center">
                                    <img
                                        class="text-center"
                                        :src="payment.qr"/>
                                    </div>
                                </div>
                                <div class="q-mb-md">
                                    <div class="text-grey">
                                    Total Nominal Transfer
                                    </div>
                                    <div class="text-bold payment-box flex">
                                    <div class="flex-1">
                                        {{totalPriceStr()}}
                                    </div>
                                    <q-btn
                                        dense no-caps outline
                                        color="primary"
                                        size="sm"
                                        class="q-px-sm gtm-track"
                                        label="Salin"
                                        @click="copyText(price.total)"
                                        gtm-action="btn_transaction_copy_total"/>
                                    </div>
                                </div>
                                <div class="q-mb-md"
                                    v-if="purchase.payment_expired">
                                    <div class="text-grey">
                                    Bayar sebelum <span class="text-bold text-dark">{{$utils.getFullDate(purchase.payment_expired)}} WIB</span> atau pembelian akan dibatalkan oleh sistem
                                    </div>
                                </div>
                                <template v-if="purchase.is_paid == 2">
                                    <div class="text-bold">Catatan</div>
                                    <div class="q-mb-sm">{{ purchase.notes }}</div>
                                </template>
                            </template>
                        </div>
                        </q-card>
                </div>
            </div>
        </div>
        <DialogHowToPay
            ref="dialogHowToPay"/>
        <DialogPaymentSuccess
            ref="dialogPaymentSuccess"/>
    </q-page>
  </template>
  
<script>
import QRCode from 'qrcode'
import DialogHowToPay from 'components/dialogs/DialogHowToPay'
import DialogPaymentSuccess from 'components/dialogs/DialogPaymentSuccess'
import ImageComponent from 'components/Image.vue'
  
  export default {
    components: {
        DialogPaymentSuccess,
        DialogHowToPay,
        ImageComponent
    },
    data () {
        return {
            loading: false,
            purchase: null,
            price: {
                subTotal: 0,
                discount: 0,
                total: 0
            },

            setting: null,

            payment: {
                method: {
                    options: [],
                    value: null
                },
                qr: null,
                gateway: null,
                gatewayMethodId: null,
                gatewayMethodCode: null,
            }
        }
    },
    mounted () {
        this.setting = this.$utils.getSetting()
        this.getPurchasedProductDetail(this.$route.params.id_purchase)
    },

    methods: {
        totalPriceStr () {
            return 'Rp ' + (this.price.total).toLocaleString()
        },

        getPurchasedProductDetail (id_purchase) {
            this.loading = true
            this.$services.product.purchaseDetail({
                id: id_purchase
            }, (data) => {
                console.log(data)
                if (data == null || data.length == 0) {
                    return this.$router.replace('/')
                }
                const purchase = data[0]
                this.purchase = purchase
                this.setPurchaseDetail(purchase)
                this.loading = false
            }, (msg, errors) => {
                this.$q.notify({
                    message: msg,
                    color: 'negative'
                })
            }, () => {
                this.$nextTick(() => {
                    this.loading = false
                })
            })
        },


        setPurchaseDetail (purchase) {
            if (typeof purchase.is_paid === 'undefined') {
                purchase.is_paid = 0
            }

            this.generateQR(purchase.payment_qr)
            const issuer = purchase.payment_issuer
            this.payment.gateway = {
                code: issuer,
                img: this.$utils.payment.getImage(issuer)
            }

            const isExpired = this.$utils.payment.isExpired(purchase.payment_expired, purchase.time_create)
            if (purchase.is_paid == 0 && !isExpired && purchase.payment_url && purchase.payment_url != '') {
                this.redirecting = true
                setTimeout(function () {
                this.redirecting = false
                this.$nextTick(function () {
                    window.open(purchase.payment_url)
                }.bind(this))
                }.bind(this), 3000);
            }

            this.countPrice(purchase)
        },
        countPrice (purchase) {
            let subTotal = 0
            subTotal = purchase.price_sell
            this.price.subTotal = subTotal

            // count total price
            this.price.discount = purchase.discount ? purchase.discount : 0
            this.price.total = purchase.price_sell + purchase.unique_number - this.price.discount
        },
        generateQR (data) {
            if (data) {
                // With promises
                QRCode.toDataURL(data)
                .then(url => {
                    this.payment.qr = url
                })
                .catch(err => {
                    console.error(err)
                })
            } else {
                this.payment.qr = null
            }
        },

        copyText (text) {
            navigator.clipboard.writeText(text)
            this.$q.notify({
                message: 'Tersalin : ' + text,
                color: 'info'
            })
        },

        getPurchaseStatus (id_purchase) {
            this.$nextTick(() => {
                this.loading = true
            })
            this.$services.product.purchaseStatus({
                id: id_purchase
            }, (data) => {
                console.log(data)
            }, (msg, error) => {
            }, () => {
                this.$nextTick(() => {
                    this.loading = false
                    this.getPurchasedProductDetail(id_purchase, false)
                })
            })
        },
    }
  }
  </script>