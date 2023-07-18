<template>
  <div class="q-pa-md q-gutter-sm">
    <div v-if="NPS" class="nps-wrapper">
      <q-card class="nps-container">
        <q-card-section class="row items-center q-pb-none">
          <q-space />
          <div
                class="flex"
                style="cursor: pointer;"
                @click="closeNPS"
              >
                <img src="icons/Close Square.svg" alt="arrow left" />
              </div>
        </q-card-section>
        <div v-if="npsQuestions.length != 0">
          <q-card-section class="q-mx-lg text-weight-bold text-subtitle1" style="text-align: center;">
            {{ npsQuestions[currentQuestion].question }}
          </q-card-section>

          <q-card-section v-if="npsQuestions[currentQuestion].type == 2">
            <div class="q-pa-none">
              <div class="row justify-center flex flex-center">
                <div>
                  <!-- <span class="q-mx-sm rating-label-hide">Sangat Sulit</span> -->
                  <q-rating
                    class=""
                    v-model="ratingModel"
                    :disable="isUseReview()"
                    :max="npsQuestions[currentQuestion].max_rating"
                    size="3.5em"
                    color="yellow-7"
                    icon="star_border"
                    icon-selected="star"
                  />
                  <!-- <span class="q-mx-sm rating-label-hide">Sangat Mudah</span> -->
                </div>
              </div>
              <div class="row justify-center flex flex-center rating-label">
                <span
                  v-for="index in npsQuestions[currentQuestion].max_rating" :key="index"
                  class=""
                  style="width: 3.5em; text-align: center; margin: 1px;"
                  >{{ index }}</span>
              </div>
            </div>
          </q-card-section>
          <q-card-section v-else-if="npsQuestions[currentQuestion].type == 1">
            <div class="q-pa-none">
              <div class="row flex flex-center">
                <q-btn
                  :color="answer.answer == true ? 'primary' : ''"
                  padding="xs md"
                  :text-color="answer.answer == true ? 'white' : 'black'"
                  :outline="answer.answer == false || answer.answer == null"
                  label="Yes"
                  style="margin: auto 3px; border-radius: 10px 0px 0px 10px; border: 5px;"
                  @click="handleYesNoAnswer(true)"
                  :disable="isUseReview()"
                />
                <q-btn
                  :color="answer.answer == false ? 'primary' : ''"
                  padding="xs md"
                  :text-color="answer.answer == false ? 'white' : 'black'"
                  :outline="answer.answer == true || answer.answer == null"
                  label="No"
                  style="margin: auto 3px; border-radius: 0px 10px 10px 0px"
                  @click="handleYesNoAnswer(false)"
                  :disable="isUseReview()"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-section class="q-mx-lg" v-if="isUseReview()">
            <div class="text-subtitle1 text-weight-bold">
              {{ npsQuestions[currentQuestion].optional_question }}
            </div>
            <div class="q-my-md">
              <q-input
                dense
                v-model="answer.optional_answer"
                autofocus
                autogrow
                outlined
              />
            </div>
            <div class="flex justify-end container-circle">
              <div
                class="circle flex"
                style="
                  width: 44px;
                  height: 44px;
                  border-radius: 50%;
                  align-items: center;
                  justify-content: center;
                  background-color: #ffde59;
                  cursor: pointer;
                "
                @click="arrowButton"
              >
                <img src="icons/Arrow-Right.svg" alt="arrow left" />
              </div>
            </div>
          </q-card-section>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "DialogNPS",
  props: {
    showNPS: {
      type: Boolean,
      default: true,
    },
    section:String,
  },

  data() {
    return {
      NPS: this.showNPS,
      npsQuestions: [],
      answer : {
        answer : null,
        type : null,
        id_question : null,
        rating : null,
        optional_answer:null
      },
      ratingModel: 0,
      currentQuestion: 0
    };
  },

  mounted(){
    this.getQuestion();
  },

  methods: {
    isUseReview() {
      if (this.npsQuestions[this.currentQuestion].type == 2) {
        return this.ratingModel <= this.npsQuestions[this.currentQuestion].optional_threshold && this.ratingModel != 0
      } else {
        let isYesInt = this.answer.answer
        isYesInt = isYesInt == null ? null : isYesInt ? 1 : 0
        return isYesInt == null ? false : (isYesInt == this.npsQuestions[this.currentQuestion].optional_threshold)
      }
    },

    handleYesNoAnswer(isYes) {
      this.answer.answer = isYes;
      if(!this.isUseReview()){
        //POST NPS
        this.answer.type = this.npsQuestions[this.currentQuestion].type;
        this.answer.id_question = this.npsQuestions[this.currentQuestion].id;
        this.submitAnswer();
        this.makeTemplateAnswer();

        this.currentQuestion++
      }
      if (this.currentQuestion == this.npsQuestions.length) {
        this.NPS = false;
      }
    },

    arrowButton() {
      //POST NPS
      this.answer.type = this.npsQuestions[this.currentQuestion].type;
      this.answer.id_question = this.npsQuestions[this.currentQuestion].id;
      this.answer.rating = this.ratingModel;
      this.submitAnswer()
      this.makeTemplateAnswer();

      this.currentQuestion++;
      if (this.currentQuestion == this.npsQuestions.length) {
        this.NPS = false;
      }
    },

    getQuestion(){
      this.$services.nps.getQuestion({
          section : this.section,
        },
        (data) => {
          this.getAnswered(data)
        },
        (msg, errors) => {
          console.log(msg)
        },
        () => {}
      );
    },

    getAnswered (npsQuestions) {
      this.$services.nps.getAnswered({}, (data) => {
        if (data && data.length > 0) {
          let tempQuestions = []
          npsQuestions.forEach((e) => {
            let idx = data.indexOf(e.id)
            if (idx == -1) {
              tempQuestions.push(e)
            }
          }) 
          this.npsQuestions = tempQuestions
          if (tempQuestions.length == 0) {
            this.NPS = false
          }
        } else {
          this.npsQuestions = npsQuestions
        }
        
      }, (msg, errors) => {
        console.log(msg)
      }, () => {
      })
    },

    submitAnswer(){
      this.$services.nps.submitAnswer(
        this.answer,
        (data) => {
          console.log("Result successfully added");
        },
        (msg, errors) => {
          console.log(msg)
        },
        () => {}
      );
    },

    makeTemplateAnswer(){
      this.answer.answer = null;
      this.answer.type = null;
      this.answer.id_question = null;
      this.answer.rating = null;
      this.answer.optional_answer = null;
      this.ratingModel = 0 
    },

    closeNPS(){
      this.NPS = false;
    }
  },

  watch: {
    "ratingModel": function (newVal) {
      this.ratingModel = newVal;

      //Rating diatas threshold lanjut ke NPS selanjutnya
      if (newVal > this.npsQuestions[this.currentQuestion].optional_threshold) {
        //Post NPS
        this.answer.rating = this.ratingModel;
        this.answer.type = this.npsQuestions[this.currentQuestion].type;
        this.answer.id_question = this.npsQuestions[this.currentQuestion].id;
        this.submitAnswer()
        this.makeTemplateAnswer()

        this.currentQuestion++;
        if(this.currentQuestion == this.npsQuestions.length){
          this.NPS = false;
        }
      }
    },
  },
};
</script>

<style>
.rating-label {
  left: -0.5rem;
}

.nps-container{
  width: 35rem;
  padding-bottom: 20px;
  position: relative;
}

.nps-wrapper{
  position: fixed;
  bottom: 16px;
  z-index: 2;
  right: 16px;
}


@media (max-width: 576px) {
  .rating-label-hide {
    display: none;
  }
  .rating-label {
    left: 0rem;
  }

  .nps-container{
    width: fit-content;
  }
}
</style>
