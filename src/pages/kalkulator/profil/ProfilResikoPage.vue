<template>
    <q-page id="profil-resiko">
        <div class="container q-px-md q-pt-md q-mb-lg">
            <div class="q-mt-xl content-profil-resiko">
                <h1 style="font-weight: 700; font-size: 2.5em; color: $blue;">Kenali Profil Risiko Investasi Anda</h1>
                <p style="font-size: 1.5em;" class="q-mt-lg q-mb-md text-weight-medium">Pertanyaan-pertanyaan di bawah ini merupakan alat bantu bagi Anda untuk mengetahui risiko-risiko investasi Reksa Dana dan produk-produk investasi yang sesuai dengan dengan tingkat toleransi risiko Anda.</p>
            </div>
            
            <hr class="q-my-lg line"/>
            <div class="add-effect-fade" v-if="skor.length > 7">
                <div class="text-weight-regular" style="color: #7A7A7A; font-size: 1.25em;">Profil risiko investasi Anda</div>
                <div class="q-my-lg keterangan text-weight-regular">
                    {{ calculateSkor.tipe }}
                </div>

                <div class="text-weight-medium" style="color: #7A7A7A; font-size: 1.25em;">
                    {{ calculateSkor.keterangan }}
                </div>

                <div class="subTitle-profil text-weight-regular q-my-xl">
                    Profil risiko investasi Anda
                </div>

                <div>
                    <div class="statistik-profil">
                        <div>
                            <div class="q-mb-md">Kas / Deposito</div>
                            <div>{{ profilRisiko.kas }}</div>
                        </div>

                        <div>
                            <div class="q-mb-md">Pasar Uang</div>
                            <div>{{ profilRisiko.pasarUang }}%</div>
                        </div>

                        <div>
                            <div class="q-mb-md">Jangka waktu investasi</div>
                            <div>{{ profilRisiko.jangkaWaktu }}</div>
                        </div>
                    </div>
                </div>
                <div @click="resetQuestion" class="flex q-mt-xl btn-reset">
                    <div class="text-weight-medium" style="font-size: 1.5em;">Ulangi Pertanyaan</div>
                </div>
            </div>


            <div v-else ref="content_question" v-for="(data, idx) in selectedQuestion" :class="data.addClass" class="q-mt-lg" :key="idx" >
                <div v-if="skor.length !== 0" 
                @click="previous" class="flex container-circle">
                    <div class="circle flex" style="width: 44px; height: 44px; border-radius: 50%;
                    align-items: center; justify-content: center; background-color: #FFDE59;">
                        <img src="icons/Arrow-Left.svg" alt="arrow left">

                    </div>
                    <div class="text-weight-regular" style="font-size: 1.5em;">Pertanyaan Sebelumnya</div>
                </div>

                <div class="content-question flex">
                    <div class="text-article" style="font-size: 1.5em; font-weight: 600;"><span>Pertanyaan {{ data.no }}/8 : </span> <span style="font-weight: bolder; display: inline-block;">Tujuan Investasi</span></div>
                    <div class="question-title" style="font-weight: 400;">{{ data.question }}</div>

                </div>


                <div class="q-pa-lg">
                    <q-option-group
                        v-model="data.selected"
                        :options="data.choose"
                        :model-value="data.selected"
                        @update:model-value="val => selectAnswer(val, data)"
                        color="primary"
                        class="text-weight-regular"
                        style="font-size: 20px; letter-spacing: 0.2px;" 
                    />
                </div>

            </div>

        </div>
    </q-page>
</template>

<script>
    export default{
        methods: {
            resetQuestion(){
                this.skor = [];
                this.numberQuestion = 1;
                this.input.forEach((data, idx) => {
                    data.selected = null
                })
            },

            selectAnswer(select, data){
                this.nextPrevious(data.choose[select], data.no)
                return select
            },

            previous(){
                this.skor.pop();
                let numberCurrent = this.numberQuestion - 1;
                const indexQustionCurrent = this.input.findIndex((data) => data.no === numberCurrent)
                this.input[indexQustionCurrent].selected = null;
                return this.numberQuestion--;
            },

            nextPrevious(select, no){
                this.skor.push({...select, no})
                return this.numberQuestion++;
            },

            findQuestion(datas, id){
                const result = datas.filter((data) => data.no === id);
                return result;
            },

            calculateAndSaveResult : function(){
                this.$services.calculator.add(this.calculatorBodyProfilResiko,
                    (data) => {
                    },
                    () => {},
                    () => {},
                )
            },

            setIDuser : function(){
                const user = this.$utils.getUser()
                if(user){
                    this.calculatorBodyProfilResiko.id_user = user.id
                }else
                    this.calculatorBodyProfilResiko.id_user = 1
            }
        },

        computed: {
            selectedQuestion(){
                const filterQuestion = this.findQuestion(this.input, this.numberQuestion);
                return filterQuestion;
            },

            calculateSkor(){
                const total = this.skor.reduce((acc, {value}) => acc + value, 0);
                let result = {};
                if(total >= 24){
                    result = {keterangan:"Investor tipe agresif, berani mengambil resiko lebih tinggi buat dapet hasil yang lebih tinggi", tipe: "Agresif"}
                
                }else if(total >= 15){
                    result = {keterangan:"Investor tipe berkembang. berani mengambil resiko tinggi untuk mendapatkan hasil yang tinggi tapi masih memikirkan opsi untuk investasi yang lebih aman", tipe: "Berkembang"}
                
                }else if(total >= 10){
                    result = {keterangan:"Investor tipe seimbang. Berani mengambil resiko, tapi lebih menyukai investasi yang berimbang yang dapat memberikan hasil secara reguler.", tipe: "Seimbang"}
                
                }else if(total >= 5){
                    result = {keterangan:"Investor tipe konservatif. Tidak suka mengambil resiko dan selalu ingin melindungi nilai pokok investai anda.", tipe: "Konservatif"}
                
                }else if(total >= 0){
                    result = {keterangan:"Anda tipe investor sangat konservatif. Anda menghindari resiko dan tidak ingin kehilangan uang anda sama sekali", tipe: "Sangat Konservatif"}
                
                }else{
                    result = {keterangan:"", tipe: ""}
                }
                return result;
            }
        },  


        data(){
            return {
                calculatorBodyProfilResiko:{
                    input : [],
                    output : "",
                    type : "calculator_profil-resiko",
                    id_user : 1
                },
                skor: [],
                profilRisiko: {},
                numberQuestion: 1,
                input: [
                    {
                        no: 1,
                        selected: null,
                        addClass: "add-effect-fade",
                        question: "Menurutmu, gaya investasi apa yang saat ini paling cocok denganmu?",
                        choose: [
                             
                            {label:"konservatif", value: 0},
                            {label:"seimbang", value: 1},
                            {label:"berkembang", value: 2},
                            {label:"agresif", value: 3}
                            
                        ],
                        
                    },
                    {
                        no: 2,
                        selected: null,
                        addClass: "add-effect-fade",
                        question: "Berapa lama kamu mau menginvestasikan uangmu?",
                        choose: [
                             
                            {label:"kurang dari 1 tahun",value: 0},
                            {label:"1-3 tahun",value: 1},
                            {label:"3-5 tahun",value: 2},
                            {label:"lebih dari 5 tahun",value: 3},
                            
                        ],
                        
                    },
                    {
                        no: 3,
                        selected: null,
                        addClass: "add-effect-fade",
                        question: "Berapa besar Dana Darurat (Emergency Fund) yang sudah kamu miliki sampai saat ini?",
                        choose: [
                             
                            {label:"lebih dari 6 bulan gaji",value: 0},
                            {label:"3-6 bulan gaji",value: 1},
                            {label:"1-3 bulan gaji",value: 2},
                            {label:"kurang dari 1 bulan gaji", value: 3},
                            
                        ],
                        
                    },
                    {
                        no: 4,
                        selected: null,
                        addClass: "add-effect-fade",
                        question: "Seberapa tinggi toleransi risiko yang bisa kamu tanggung saat investasi?",
                        choose: [
                             
                            {label:"Tidak ambil risiko atas uang dan modal pokoknya", value: 0},
                            {label:"Sedikit ambil risiko, tapi tetap melindungi nilai uang dari penurunan", value: 1},
                            {label:"Berani ambil risiko, karena ingin investasi jangka panjang untuk dapat hasil yang lebih tinggi", value: 2},
                            {label:"Gw berani ambil resiko dengan investasi jangka panjang saya buat dapet hasil yang tinggi", value: 3},
                            
                        ],
                        
                    },
                    {
                        no:5,
                        selected: null,
                        addClass: "add-effect-fade",
                        question: "Pilih salah satu skenario investasi yang kamu banget!",
                        choose: [
                             
                            {label: "Nilai maksimal keuntungan 33% dan kerugian 12%",value: 0},
                            {label:"Nilai maksimal keuntungan 42% dan kerugian 15%",value: 1},
                            {label:"Nilai maksimal keuntungan 60% dan kerugian 30%",value: 2},
                            {label:"Nilai maksimal keuntungan 80% dan kerugian 50%", value: 3},
                            
                        ],
                        
                    },
                    {
                        no:6,
                        selected: null,
                        addClass: "add-effect-fade",
                        question: "Apa saja portofolio investasi yang kamu miliki sampai saat ini?",
                        choose: [
                            {label:"kas atau setara kas (tabungan dan deposito berjangka)",value: 0},
                            {label:"kebanyakan di kas, beberapa investasi (property selain rumah tinggal, saham unggulan)",value: 1},
                            {label:"beberapa investasi, sebagian besar tidak di kas ( saham, obligasi, reksadana, property selain rumah tinggal)", value: 2},
                            {label:"campuran investasi termasuk yang spekulasi( opsi, reksadana beresiko tinggi, valuta asing, saham perusahaan kecil)", value: 3},
                        
                        ],
                        
                    },
                    {
                        no:7,
                        selected: null,
                        addClass: "add-effect-fade",
                        question: "Berapa besar total investasi reksadana mu saat ini?",
                        choose: [
                             
                            {label:"0-10%", value: 0},
                            {label:"11-15%", value: 1},
                            {label:"26-40%", value: 2},
                            {label:"lebih dari 40%", value: 3},
                            
                        ],
                        
                    },
                    {
                        no:8,
                        selected: null,
                        addClass: "add-effect-fade",
                        question: "Apabila salah satu investasi mu mengalami kerugian sebesar 25% dari pokok, hal apa yang akan kamu lakukan?",
                        choose: [
                            {label:"jual secepatnya untuk mencegah kerugian lebih jauh “cut loss”", value: 0},
                            {label:"tahan dulu dan jual kalau harganya sudah naik lagi agar kembali “break even”", value: 1},
                            {label:"bertahan dengan investasi ini untuk jangka panjang", value: 2},
                            {label:"beli lebih banyak lagi, ini kesempatan untuk mendapatkan saham dengan harga lebih murah", value: 3},
                        ],
                        
                    },
                ]
            }
        },


        watch : {'skor.length'(newSkor, oldSkor) {
            if(this.skor.length <= 7){
                if(this.$refs.content_question.length !== 0){
                    if(this.$refs.content_question[0].classList.contains("add-effect-fade")){
                        this.$refs.content_question[0].classList.remove("add-effect-fade");
                        setTimeout(() => {
                            this.$refs.content_question[0].classList.add("add-effect-fade")
                        }, 10);
                    }
                }
                
            
            }else{
                const {label: kas} = this.findQuestion(this.skor, 7)[0];
                const txtLabel = this.findQuestion(this.skor, 5)[0].label;
                const pasarUang = txtLabel.split(" ").filter((i) => i.match(/\d+/)).map((j) => parseInt(j.replace("%", ""))).reduce((acc, crv) => acc - crv);
                const {label: jangkaWaktu} = this.findQuestion(this.skor, 2)[0];
                this.profilRisiko = {kas, pasarUang, jangkaWaktu};

                this.setIDuser()
                const input = this.skor.map((data) => data.value);
                this.calculatorBodyProfilResiko.input = JSON.stringify(input);
                this.calculatorBodyProfilResiko.output = JSON.stringify(this.calculateSkor.tipe);

                this.calculateAndSaveResult()
            }
        }}
    }
</script>