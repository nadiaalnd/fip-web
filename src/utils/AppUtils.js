/* eslint-disable no-unused-vars */
import { LocalStorage, Cookies } from "quasar";

function twoDigit(numberStr) {
  const temp = `0${numberStr}`;
  return temp.slice(-2);
}

export default {
  thumbnailRatio: 1.625,
  lastPurchase: null,
  user: null,

  saveToken(token) {
    LocalStorage.set("token", token);
  },

  saveDeviceId(deviceId) {
    LocalStorage.set("device_id", deviceId);
  },

  hasLogin() {
    return !this.isEmpty(this.getToken());
  },

  getToken() {
    const token = LocalStorage.getItem("token");
    if (token == "null") {
      return null;
    } else {
      return token;
    }
  },

  getDeviceId() {
    const deviceId = LocalStorage.getItem("device_id");
    if (deviceId == "null") {
      return null;
    } else {
      return deviceId;
    }
  },

  saveUser(user) {
    LocalStorage.set("user", JSON.stringify(user));
    this.user = user;
  },

  getUser() {
    const user = LocalStorage.getItem("user");
    if (user && user != "null") {
      return JSON.parse(user);
    } else {
      return null;
    }
  },

  checkRole(role) {
    let user;
    if (this.user) {
      user = this.user;
    } else {
      user = this.getUser();
    }
    if (user) {
      return user.role.indexOf(role) > -1;
    } else {
      return false;
    }
  },

  logoutUser() {
    LocalStorage.set("token", null);
    LocalStorage.set("user", null);
  },

  saveSetting(setting) {
    if (setting == null || Object.keys(setting).length == 0) {
      return;
    }
    this.saveOtherSetting(
      "academy",
      setting["Akademi"] || setting["academy"] || "[]"
    );
    this.saveOtherSetting("siapkarir", setting["Job Preparation"] || "[]");
    this.saveOtherSetting("vacancy", setting["Job Vacancy"] || "[]");
    this.saveOtherSetting("how_to_pay", setting["How To Pay"] || "{}");
    this.saveOtherSetting(
      "cooperation",
      setting["List Image Cooperation"] || "[]"
    );
    this.saveOtherSetting("media", setting["List Image Media"] || "[]");
    this.saveOtherSetting("highlight", setting["List Image Highlight"] || "[]");
    // this.saveOtherSetting('product_carts', setting['List Image Media'] || '[]')

    LocalStorage.set(
      "setting",
      JSON.stringify({
        ...setting,
        Akademi: undefined,
        "How To Pay": undefined,
        "Job Vacancy": undefined,
        "List Image Cooperation": undefined,
        "List Image Media": undefined,
        "List Image Highlight": undefined,
      })
    );
  },

  getSetting() {
    const setting = LocalStorage.getItem("setting");
    if (setting) {
      return JSON.parse(setting);
    } else {
      return null;
    }
  },

  saveOtherSetting(key, setting) {
    LocalStorage.set("setting_" + key, setting);
  },

  getOtherSetting(key) {
    let aKey = key;
    if (aKey === "program") {
      aKey = "academy";
    }
    const setting = LocalStorage.getItem("setting_" + aKey);
    if (setting) {
      return JSON.parse(setting);
    } else {
      return [];
    }
  },

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  },

  getDateStr(date) {
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const d = date.getDate();
    const hour = twoDigit(date.getHours());
    const minute = twoDigit(date.getMinutes());

    return `${d} ${month} ${year}`;
  },

  days: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],

  getFullDate(date, withDay = true) {
    let mDate = date;
    if (typeof mDate == "string") {
      mDate = new Date(date.substring(0, 16).replace(/-/g, "/"));
    }
    // Minggu, 6 Mei 2020, 17 : 30 WIB
    const days = this.days;
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const day = days[mDate.getDay()];
    const month = months[mDate.getMonth()];
    const year = mDate.getFullYear();
    const d = mDate.getDate();
    const hour = twoDigit(mDate.getHours());
    const minute = twoDigit(mDate.getMinutes());
    if (withDay) {
      return `${day}, ${d} ${month} ${year}, pukul ${hour}:${minute}`;
    } else {
      return `${d} ${month} ${year}, pukul ${hour}:${minute}`;
    }
  },

  getDatabaseDate(dateStr) {
    if (this.isEmpty(dateStr)) {
      return "";
    }
    // database dateStr -> 2020-05-28 17:56:15
    const months = [
      "",
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const d = dateStr.substring(8, 10);
    const month =
      dateStr[5] === "0"
        ? months[dateStr.substring(6, 7)]
        : months[dateStr.substring(5, 7)];
    const year = dateStr.substring(0, 4);

    const hour = dateStr.substring(11, 13);
    const minute = dateStr.substring(14, 16);

    return `${d} ${month} ${year}, ${hour} : ${minute}`;
  },

  getDatabaseTime(dateStr) {
    if (this.isEmpty(dateStr)) {
      return "";
    }
    // database date -> 2020-05-28 17:56:15
    const hour = dateStr.substring(11, 13);
    const minute = dateStr.substring(14, 16);
    const second = dateStr.substring(17, 19);

    return `${hour} : ${minute} : ${second}`;
  },

  getISODate(date) {
    // YYYY-MM-dd
    const YYYY = date.getFullYear();
    const dd = twoDigit(date.getDate());
    const MM = twoDigit(date.getMonth() + 1);

    return `${YYYY}-${MM}-${dd}`;
  },

  checkTimeInRange(nowD, start, end) {
    const startD = new Date();
    startD.setHours(this.getHours(start), this.getMinutes(start), 0); // 5.30 pm
    const endD = new Date();
    endD.setHours(this.getHours(end), this.getMinutes(end), 0);

    return startD <= nowD && nowD <= endD;
  },

  getHours(str) {
    // 05:30
    return str.substring(0, 2);
  },

  getMinutes(str) {
    // 05:30
    return str.substring(3, 5);
  },

  twoDigit(numberStr) {
    return twoDigit(numberStr);
  },

  isEmpty(str) {
    return str == null || str === "";
  },

  getPhone(phone, firstShould, firstTarget) {
    if (!this.isEmpty(phone) && phone.indexOf(firstShould) === 0) {
      return phone.replace(firstShould, firstTarget);
    }
    return phone;
  },

  isPhoneValid(phone, firstShould) {
    if (
      !this.isEmpty(phone) &&
      phone.length > 4 &&
      phone.indexOf(firstShould) === 0
    ) {
      return true;
    }
    return false;
  },

  isEmailValid(email) {
    var mailformat =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (mailformat.test(email)) {
      return true;
    } else {
      return false;
    }
  },

  checkHasVerified() {
    const profile = this.getProfile();
    return (
      profile != null &&
      (!this.isEmpty(profile.msisdn) || !this.isEmpty(profile.username))
    );
  },

  clearErrors(errors) {
    Object.keys(errors).forEach((key) => {
      errors[key] = null;
    });
  },

  alphanumeric(string) {
    const letterNumber = /^[0-9a-zA-Z]+$/;
    if (string.match(letterNumber)) {
      return true;
    } else {
      return false;
    }
  },

  autoRefreshTime() {
    const dateNow = new Date();
    let remaining = (60 - dateNow.getSeconds()) % 15;
    if (remaining === 0) {
      remaining = 15;
    }
    return remaining * 1000;
  },

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?)/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime ? mime : "image/png" });
  },

  replaceEnter(string) {
    if (string) {
      return string.replace(/\n/g, "<br />");
    } else {
      return string;
    }
  },

  getPackageDetailRoute(model) {
    return `/package/${model.slug}`;
  },

  getContentRoute(product) {
    if (product.type != 0) {
      return this.getBuyableContentRoute(product);
    }
    const title = product.name || "---";
    const id = product.id;
    const category = product.subcategory
      ? product.subcategory.code
      : "purchased";
    return `/e-learning/${this.escapeRoute(category)}/${product.slug}`;
  },

  dictionaryDetailLocation(slug) {
    return `/kamus/${slug[0]}/${slug}`;
  },

  getBuyableContentRoute(data) {
    const title = data.name || "----";
    const id = data.id;
    let type = "content";
    if (parseInt(data.type) == 1) {
      type = "academy";
    } else if (parseInt(data.type) == 5) {
      type = "event";
    }
    return `/${type}/${data.slug}`;
  },

  getCategoryRoute(category) {
    const title = category.code;
    const id = category.id;
    return `/content/category/${id}/${this.escapeRoute(title)}`;
  },

  escapeRoute(title) {
    return title.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-");
  },

  getStatusColor(item) {
    let colors = ["grey-6", "positive", "negative", "grey-6", "grey-6"];
    let color = this.getStatus(item);
    return colors[color];
  },
  getStatusStr(item) {
    let statusStr = [
      "",
      "Lunas",
      "Ditolak",
      "Belum dibayar",
      "Menunggu konfirmasi",
    ];
    let status = this.getStatus(item);
    return statusStr[status];
  },
  getStatus(item) {
    if (item == null) return 0;
    let status =
      item.is_paid == 1
        ? 1
        : item.is_paid == 2
        ? 2
        : this.isEmpty(item.proof)
        ? 3
        : 4;
    return status;
  },

  settingBank: null,
  getBank(model) {
    if (model.id_paymentmethod < 100) {
      if (this.settingBank == null) {
        this.settingBank = {};
        JSON.parse(this.getSetting()["List Bank"]).forEach((item) => {
          this.settingBank[item.val] = item.key;
        });
      }
      return this.settingBank[model.id_paymentmethod];
    } else {
      return model.payment_issuer;
    }
  },

  getRating(product, round) {
    // const firstRating = (38 + product.id % 7) / 10
    // let rating = (firstRating + (product.rating ? product.rating : 5)) / 2
    // if (rating <= 4.2) {
    //   rating = 4.3
    // }
    // if (round) {
    //   return Math.round(rating)
    // }
    // return Math.round(rating * 10) / 10
    return product.rating;
  },

  getRatingCnt(product) {
    // let cnt = 5000 + (product.id % 8) * 500 + (product.id * 7) + (product.rating_cnt ? product.rating_cnt : 0)
    // return cnt.toLocaleString()
    return product.rating_cnt;
  },

  localeString(num) {
    if (num) {
      return num.toLocaleString();
    } else {
      return "0";
    }
  },

  openLink(e, link, router, target) {
    e.preventDefault();
    if (target) {
      window.open(link, target);
    } else {
      router.push(link)
    }
    
  },

  stripHtml(html) {
    let tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  },

  validateCoupon(discount, subTotal, items) {
    discount.isValid = true;
    discount.invalidMessage = "";

    const dateStart = new Date(discount.time_start);
    const dateEnd = new Date(discount.time_end);
    const now = new Date();
    if (discount.is_active == 0) {
      discount.isValid = false;
      discount.invalidMessage = "Promo sudah tidak berlaku";
    } else if (now.getTime() > dateEnd.getTime()) {
      discount.isValid = false;
      discount.invalidMessage = "Masa berlaku promo sudah kadaluarsa";
    } else if (now.getTime() < dateStart.getTime()) {
      discount.isValid = false;
      discount.invalidMessage = "Masa berlaku promo belum dimulai";
    } else if (discount.maxusage < discount.used) {
      discount.isValid = false;
      discount.invalidMessage = "Kuota promo sudah habis";
    } else if (subTotal < discount.minpurchase) {
      discount.isValid = false;
      discount.invalidMessage =
        "Minimal pembelian Rp " + discount.minpurchase.toLocaleString();
    }

    return discount;
  },

  content: {
    typeName(id) {
      if (id < 3) {
        let types = ["E-Learning", "Akademi", "Mentoring", "Kamus"];
        return types[id];
      }
      return "";
    },
    options: [
      { label: "E-Learning", value: 0 },
      { label: "Akademi", value: 1 },
      { label: "Mentoring", value: 2 },
      { label: "Kamus", value: 3 },
      { label: "Event", value: 5 },
    ],
  },

  payment: {
    getImage(code) {
      return "/images/pm_" + code.toLowerCase() + ".png";
    },
    isExpired(expiredDate, createdDate) {
      const now = new Date();
      let expired = new Date();
      if (expiredDate) {
        expired = new Date(expiredDate.replace(/-/g, "/"));
      } else if (createdDate) {
        expired = new Date(createdDate.replace(/-/g, "/"));
        expired.setTime(expired.getTime() + 3600000);
      }
      return expired.getTime() < now.getTime();
    },
  },

  track: {
    viewContent() {
      fbq('track', 'ViewContent')
      // dataLayer.push({ _event: 'Any Custom Events', event: 'cstm_ViewContent', event_name: 'view_content'})
    },
    initiateCheckout() {
      fbq('track', 'InitiateCheckout')
      // dataLayer.push({ _event: 'Any Custom Events', event: 'cstm_InitiateCheckout', event_name: 'initial_checkout'})
    },
    // type, contents, totalPrice
    purchase(items) {
      fbq('track', 'Purchase', {
        content_type: items.type,
        contents: items.contents,
        value: items.value,
        currency: 'IDR'
      })
      // dataLayer.push({ _event: 'Any Custom Events', event: 'cstm_Purchase', event_name: 'purchase', price: items.value, currency: 'IDR' })
    },
    completeRegistration() {
      fbq('track', 'CompleteRegistration')
      // dataLayer.push({ _event: 'Any Custom Events', event: 'cstm_CompleteRegistration', event_name: 'complete_registration'})
    },
    addToWishlist() {
      fbq('track', 'AddToWishlist')
      // dataLayer.push({ _event: 'Any Custom Events', event: 'cstm_AddToWishlist', event_name: 'add_to_wishlist'})
    },
    addToCart() {
      fbq('track', 'AddToCart')
      // dataLayer.push({ _event: 'Any Custom Events', event: 'cstm_AddToCart', event_name: 'add_to_cart'})
    },
    custom(name, variable) {
      fbq('trackCustom', name, variable)
      // dataLayer.push({ _event: 'Any Custom Events', event: 'cstm_' + name, event_name: name, variable: variable})
    },
  },

  purchases: {
    get() {
      let idxs = LocalStorage.getItem("last_purchases");
      if (idxs == "null" || !idxs) {
        idxs = [];
      } else {
        idxs = JSON.parse(idxs);
      }
      return idxs;
    },

    remove(id_purchase) {
      const idxs = this.get();
      const purchase = this.find(id_purchase);
      if (purchase != null) {
        idxs.splice(purchase.i, 1);
        LocalStorage.set("last_purchases", JSON.stringify(idxs));
      }
    },

    add(id_purchase) {
      const idxs = this.get();
      const time = new Date().getTime();
      idxs.push({
        id: id_purchase,
        date: Math.floor(time / 1000),
      });
      LocalStorage.set("last_purchases", JSON.stringify(idxs));
    },

    find(id_purchase, products) {
      const idxs = this.get();
      for (let i in idxs) {
        const purchase = idxs[i];
        if (purchase.id == id_purchase) {
          return {
            i: i,
            purchase: purchase,
          };
        } else if (purchase == id_purchase) {
          return {
            i: i,
            purchase: {
              id: purchase,
            },
          };
        }
      }
      return null;
    },
  }
};
