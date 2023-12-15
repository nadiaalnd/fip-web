import AppUtils from "@utils/AppUtils.js";
import RouteMeta from "@utils/RouteMeta.js";
import jwt_decode from "jwt-decode";
import { Notify } from "quasar";

const verifyToken = function () {
  let token = AppUtils.getToken();
  let user = AppUtils.getUser();
  if (token === null) {
    return false;
  }

  var decoded = jwt_decode(token);
  if (decoded == null) {
    AppUtils.logoutUser();
    return false;
  }
  let timeNow = new Date().getTime() / 1000;
  if (timeNow > decoded.exp) {
    AppUtils.logoutUser();
    return false;
  } else {
    return true;
  }
};

const notifyMustLogin = function (next, path, from, to) {
  Notify.create({
    message: "Harap masuk / daftar untuk melanjutkan",
    color: "negative"
  })
  console.log(from, to)
  next({
    path: from?.fullPath ?? path,
    query: {
      login: true,
      next: to.fullPath
    }
  })
}

const routes = [
  {
    path: "/iframe",
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      {
        path: "academy",
        component: () =>
          import("pages/users/template/SimpleListSliderIndex.vue"),
        meta: {
          storageKey: "Akademi",
          track: "AkademiAndProgram",
          name: "academy",
        },
      },
      {
        path: "program",
        component: () =>
          import("pages/users/template/SimpleListSliderIndex.vue"),
        meta: {
          storageKey: "Akademi",
          track: "AkademiAndProgram",
          name: "program",
        },
      },
      {
        path: "siapkarir",
        component: () =>
          import("pages/users/template/SimpleListSliderIndex.vue"),
        meta: {
          storageKey: "Job Preparation",
          track: "SiapKarir",
          name: "siapkarir",
        },
      },
      {
        path: "dialog",
        component: () => import("pages/users/template/DialogIndex.vue"),
      },
      {
        path: "elearning",
        component: () => import("pages/users/template/ProductSliderIndex.vue"),
      },
    ],
  },
  {
    path: "/",
    beforeEnter: (to, from, next) => {
      verifyToken();
      return next();
    },
    component: () => import("layouts/FrontLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/landing/LandingPageIndex.vue"),
      },
      {
        name: "e-learning-free-package",
        path: "free/package/e-learning",
        meta: RouteMeta.user["free/package/e-learning"],
        beforeEnter: (to, from, next) => {
          const user = AppUtils.getUser();
          if (user != null) {
            return next();
          } else {
            notifyMustLogin(next, "/", from, to)
          }
        },
        component: () => import("pages/users/static/FreePackageIndex.vue"),
      },

      {
        name: "e-learning-recommendation",
        path: "free/package/e-learning/recommendation",
        meta: RouteMeta.user["e-learning-recommendation"],
        component: () =>
          import("pages/users/elearning/ELearningRecommendationIndex.vue"),
      },
      {
        name: "e-learning",
        path: "e-learning",
        meta: RouteMeta.user["e-learning"],
        component: () => import("pages/landing/LandingElearning2.vue"),
      },
      {
        path: "privacy-policy",
        meta: RouteMeta.user["default"],
        component: () => import("pages/static/PrivacyPolicyPage.vue"),
      },
      {
        path: "profile",
        meta: RouteMeta.user["profile"],
        beforeEnter: (to, from, next) => {
          const user = AppUtils.getUser();
          if (user != null) {
            return next();
          } else {
            notifyMustLogin(next, "/", from, to)
          }
        },
        component: () => import("pages/users/profile/ProfileIndex.vue"),
      },
      {
        path: "product/purchased",
        name: "product-purchased-v1",
        beforeEnter: (to, from, next) => {
          const user = AppUtils.getUser();
          if (user != null) {
            return next();
          } else {
            notifyMustLogin(next, "/", from, to)
          }
        },
        component: () => import("pages/users/content/PurchasedIndex.vue"),
      },
      {
        path: "transaction/history",
        name: "transaction-history",
        beforeEnter: (to, from, next) => {
          const user = AppUtils.getUser();
          if (user != null) {
            return next();
          } else {
            notifyMustLogin(next, "/", from, to)
          }
        },
        component: () => import("pages/users/content/PurchasedIndex.vue"),
      },
      {
        path: "transaction/detail/:id_purchase",
        name: "transaction-detail",
        beforeEnter: (to, from, next) => {
          const user = AppUtils.getUser();
          if (user != null) {
            return next();
          } else {
            notifyMustLogin(next, "/", from, to)
          }
        },
        component: () =>
          import("pages/users/transaction/TransactionDetailIndex.vue"),
      },
      {
        path: "kalkulator/",
        component: () => import("layouts/CalculatorLayout.vue"),
        children: [
          {
            path: "personal/budget",
            meta: RouteMeta.user["budget"],
            component: () =>
              import("pages/kalkulator/personal/PersonalBudgetPage.vue"),
          },

          {
            path: "personal/profil-resiko",
            meta: RouteMeta.user["profil-resiko"],
            component: () => import("pages/kalkulator/profil/ProfilResikoPage.vue"),
          },

          {
            path: "personal/zakat-mal",
            meta: RouteMeta.user["kalkulator-zakat"],
            component: () =>
              import("pages/kalkulator/personal/PersonalZakatPage.vue"),
          },

          {
            path: "personal/investasi",
            meta: RouteMeta.user["kalkulator-investasi"],
            component: () =>
              import("pages/kalkulator/personal/PersonalInvestmentPage.vue"),
          },
          {
            path: "personal/dana-darurat",
            meta: RouteMeta.user["dana-darurat"],
            component: () =>
              import("pages/kalkulator/dana-darurat/DanaDaruratPage.vue")
          },
          {
            path: "personal/properti",
            meta: RouteMeta.user["property"],
            component: () =>
              import("pages/kalkulator/properti/PropertyPage.vue")
          },
          {
            path: "personal/pendidikan",
            meta: RouteMeta.user["pendidikan"],
            component: () =>
              import("pages/kalkulator/personal/PersonalEducationPage.vue")
          }
        ]
      },

      {
        path: "package/list",
        name: "package-list",
        meta: RouteMeta.user["package-list"],
        component: () => import("pages/users/package/PackageListIndex.vue"),
      },
      {
        beforeEnter: (to, from, next) => {
          const user = AppUtils.getUser();
          if (user != null) {
            if (to.query.id_purchase) {
              console.log(to.query.id_purchase);
              return next({
                name: "transaction-detail",
                params: {
                  id_purchase: to.query.id_purchase,
                },
              });
            }
            return next();
          } else {
            notifyMustLogin(next, "/package/list", from, to)
          }
        },
        path: "package/:slug",
        name: "package-detail",
        meta: RouteMeta.user["package-detail"],
        component: () => import("pages/users/package/PackageDetailIndex.vue"),
      },
      {
        path: "package/detail/:slug",
        name: "package-detail-readonly",
        meta: RouteMeta.user["package-detail"],
        component: () =>
          import("pages/users/package/PackageDetailReadonlyIndex.vue"),
      },
      {
        beforeEnter: (to, from, next) => {
          const user = AppUtils.getUser();
          if (user != null) {
            if (to.query.id_purchase) {
              console.log(to.query.id_purchase);
              return next({
                name: "transaction-detail",
                params: {
                  id_purchase: to.query.id_purchase,
                },
              });
            }
            return next();
          } else {
            notifyMustLogin(next, "/package/list", from, to)
          }
        },
        path: "package/:id/:name",
        meta: RouteMeta.user["package-detail"],
        component: () => import("pages/users/package/PackageDetailIndex.vue"),
      },
      {
        beforeEnter: (to, from, next) => {
          const user = AppUtils.getUser();
          if (user != null) {
            return next();
          } else {
            notifyMustLogin(next, "/package/list", from, to)
          }
        },
        path: "student-package/:slug",
        name: "student-package-detail",
        meta: RouteMeta.user["student-package-detail"],
        component: () =>
          import("pages/users/package/StudentPackageDetailIndex.vue"),
      },

      {
        path: "page/:section/:subsection",
        component: () => import("pages/users/iframe/IframeIndex.vue"),
      },
      {
        path: "page/:section/:subsection/:id",
        component: () => import("pages/users/iframe/IframeIndex.vue"),
      },
      {
        path: "content",
        component: () => import("pages/users/content/ContentIndex.vue"),
      },
      // {
      //   path: "content/category/:id_subcategory/:code",
      //   component: () =>
      //     import("pages/users/content/ContentPerCategoryIndex.vue"),
      // },
      {
        path: "e-learning/:subcategory/:title",
        component: () => import("pages/users/content/ContentIndex.vue"),
      },
      {
        path: "content/:id/:subcategory/:title",
        component: () => import("pages/users/content/ContentIndex.vue"),
      },
      {
        path: "academy/:title",
        meta: RouteMeta.user["academy"],
        meta: {
          buy_label: "Daftar Sekarang!",
          name: "program",
          track: "AkademiAndProgram",
        },
        component: () => import("pages/users/content/BuyableContentIndex.vue"),
      },
      {
        path: "academy/:id/:title",
        meta: RouteMeta.user["academy"],
        meta: {
          buy_label: "Daftar Sekarang!",
          name: "program",
          track: "AkademiAndProgram",
        },
        component: () => import("pages/users/content/BuyableContentIndex.vue"),
      },

      {
        path: "learning-path/:id_subcategory/:code",
        component: () =>
          import("pages/users/learning-path/LearningPathIndex.vue"),
      },
      {
        path: "payment",
        name: "payment",
        component: () => import("pages/users/payment/PaymentIndex.vue"),
      },

      {
        path: "dictionary",
        name: "dictionary",
        meta: RouteMeta.user["kamus"],
        component: () => import("pages/users/dictionary/DictionaryIndex.vue"),
      },
      {
        path: "kamus",
        name: "kamus",
        meta: RouteMeta.user["kamus"],
        component: () => import("pages/users/dictionary/DictionaryIndex.vue"),
      },
      {
        path: "kamus/:alphabet",
        name: "kamus-alphabet",
        meta: RouteMeta.user["kamus"],
        component: () => import("pages/users/dictionary/DictionaryIndex.vue"),
      },
      {
        path: "kamus/:id/:slug",
        name: "kamus-detail",
        meta: RouteMeta.user["kamus"],
        component: () =>
          import("pages/users/dictionary/DictionaryDetailIndex.vue"),
      },

      {
        path: "academy",
        name: "academy",
        meta: RouteMeta.user["academy"],
        component: () => import("pages/users/template/BuyableListIndex.vue"),
      },

      {
        path: "page/:section/:subsection",
        component: () => import("pages/users/iframe/IframeIndex.vue"),
      },
      {
        path: "page/:section/:subsection/:id",
        component: () => import("pages/users/iframe/IframeIndex.vue"),
      },
      {
        path: "content",
        component: () => import("pages/users/content/ContentIndex.vue"),
      },
      // {
      //   path: "content/category/:id_subcategory/:code",
      //   component: () =>
      //     import("pages/users/content/ContentPerCategoryIndex.vue"),
      // },
      {
        path: "content/:id/:subcategory/:title",
        component: () => import("pages/users/content/ContentIndex.vue"),
      },
      {
        path: "academy/:id/:title",
        meta: {
          buy_label: "Daftar Sekarang!",
          name: "program",
          track: "AkademiAndProgram",
        },
        component: () => import("pages/users/content/BuyableContentIndex.vue"),
      },
      {
        path: "event/:id/:title",
        meta: {
          buy_label: "Daftar Sekarang!",
          name: "event",
          track: "AkademiAndProgram",
        },
        component: () => import("pages/users/content/BuyableContentIndex.vue"),
      },
      {
        path: "learning-path/:id_subcategory/:code",
        component: () =>
          import("pages/users/learning-path/LearningPathIndex.vue"),
      },
      {
        path: "payment",
        name: "payment",
        component: () => import("pages/users/payment/PaymentIndex.vue"),
      },

      {
        path: "event",
        name: "event",
        component: () => import("pages/users/template/BuyableListIndex.vue"),
        meta: { name: "event", type: 5, storageKey: "Event", track: "Event" },
      },

      {
        path: "event/:title",
        meta: {
          buy_label: "Daftar Sekarang!",
          name: "event",
          track: "AkademiAndProgram",
        },
        component: () => import("pages/users/content/BuyableContentIndex.vue"),
      },

      {
        path: "certificate/:id/:title",
        component: () => import("pages/users/certificate/CertificateIndex.vue"),
      },

      // {
      //   path: "search",
      //   component: () => import("pages/users/search/SearchIndex.vue"),
      // },

      {
        path: "auth/forgotpassword",
        component: () => import("pages/users/auth/ForgotPasswordIndex.vue"),
      },
      {
        path: "auth/register",
        component: () => import("pages/users/auth/VerifyRegistrationIndex.vue"),
      },
    ],
  },

  {
    path: "/creator",
    component: () => import("layouts/BlankLayout.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
