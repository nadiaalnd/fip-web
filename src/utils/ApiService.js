/* eslint-disable no-unused-vars */
import axios from "axios";
import AppUtils from "./AppUtils";

const API_URL = process.env.API_URL.replace(/"/g, "");

const instance = axios.create({
  baseURL: API_URL,
  crossDomain: true,
});

function getToken(role = null) {
  return AppUtils.getToken();
}

function handleSuccess(response, onSuccess, onFailed, onFinish) {
  if (
    response.headers["content-type"] ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    const aEle = document.createElement("a"); // Create a label
    const href = window.URL.createObjectURL(blob); // Create downloaded link
    aEle.href = href;
    aEle.download = "data.xlsx"; // File name after download
    document.body.appendChild(aEle);
    aEle.click(); // Click to download
    document.body.removeChild(aEle); // Download complete remove element
    window.URL.revokeObjectURL(href); // Release blob object
    return;
  }
  const respData = response.data;
  var data = "";
  var message = "";
  var error = {};
  if (typeof respData.message === "string") {
    message = respData.message;
  }
  if (typeof respData.error === "object") {
    error = respData.error;
  }
  if (typeof respData.data != null) {
    data = respData.data;
  } else {
    data = message;
  }
  if (respData.status === -1) {
    onFailed(message, error);
    return typeof onFinish === "function" ? onFinish() : null;
  }
  onSuccess(data, message, response);
  return typeof onFinish === "function" ? onFinish() : null;
}

function handleError(error, onSuccess, onFailed, onFinish) {
  if (error && error.response && error.response.status == 401) {
    AppUtils.saveUser(null)
    AppUtils.saveToken(null)
  }
  if (
    typeof error.response === "object" &&
    typeof error.response.data === "object"
  ) {
    const data = error.response.data;
    const msg = !AppUtils.isEmpty(data.message)
      ? data.message
      : "Terdapat kesalahan, coba harap kembali beberapa saat lagi";
    onFailed(msg, data.errors ? data.errors : {}, error);
  } else if (error.message) {
    onFailed(error.message, {}, error);
  } else {
    onFailed(
      "Terdapat kesalahan, coba harap kembali beberapa saat lagi",
      {},
      error
    );
  }
  return typeof onFinish === "function" ? onFinish() : null;
}

function getData(
  url,
  params,
  onSuccess,
  onFailed,
  onFinish,
  role,
  options = {}
) {
  const token = getToken(role);
  let headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Token-Access"] = token;
  }
  instance
    .get(url, {
      params: params,
      headers: headers,
      ...options,
    })
    .then((response) => {
      return handleSuccess(response, onSuccess, onFailed, onFinish, role);
    })
    .catch((error) => {
      return handleError(error, onSuccess, onFailed, onFinish, role);
    });
}

function putData(url, data, onSuccess, onFailed, onFinish, role) {
  const token = getToken(role);
  let headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Token-Access"] = token;
  }
  instance
    .put(url, data, {
      headers: headers,
    })
    .then((response) => {
      return handleSuccess(response, onSuccess, onFailed, onFinish, role);
    })
    .catch((error) => {
      return handleError(error, onSuccess, onFailed, onFinish, role);
    });
}

function sendData(method, url, data, onSuccess, onFailed, onFinish, role) {
  const token = getToken(role);
  let headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Token-Access"] = token;
  }
  instance({
    method: method,
    headers: headers,
    data: data,
    url: url,
  })
    .then((response) => {
      return handleSuccess(response, onSuccess, onFailed, onFinish, role);
    })
    .catch((error) => {
      return handleError(error, onSuccess, onFailed, onFinish, role);
    });
}

function postData(url, data, onSuccess, onFailed, onFinish, role) {
  const token = getToken(role);
  instance
    .post(url, data, {
      headers: {
        "Content-Type": "application/json",
        "Token-Access": token,
      },
    })
    .then((response) => {
      return handleSuccess(response, onSuccess, onFailed, onFinish, role);
    })
    .catch((error) => {
      return handleError(error, onSuccess, onFailed, onFinish, role);
    });
}

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  console.log("mime", filename, mime);
  return new File([u8arr], filename, { type: mime });
}

export default {
  handleError: handleError,
  handleSuccess: handleSuccess,
  instance() {
    return instance;
  },
  sendData(method, url, body, onSuccess, onFailed, onFinish, role, options) {
    return sendData(
      method,
      url,
      body,
      onSuccess,
      onFailed,
      onFinish,
      role,
      options
    );
  },

  postData(url, body, onSuccess, onFailed, onFinish, role, options) {
    return postData(url, body, onSuccess, onFailed, onFinish, role, options);
  },

  getData(url, params, onSuccess, onFailed, onFinish, role, options) {
    return getData(url, params, onSuccess, onFailed, onFinish, role, options);
  },

  dashboard(onSuccess, onFailed, onFinish) {
    return getData("/dashboard", {}, onSuccess, onFailed, onFinish);
  },
  certificate: {
    generate(params, onSuccess, onFailed, onFinish) {
      // id_user, id_product
      return sendData(
        "put",
        "/certificate/generate",
        params,
        onSuccess,
        onFailed,
        onFinish
      );
    },
    generateSubcategory(params, onSuccess, onFailed, onFinish) {
      // id_user, id_subcategory
      return sendData(
        "put",
        "/certificate/subcategory/generate",
        params,
        onSuccess,
        onFailed,
        onFinish
      );
    },
  },
  product: {
    get(params, onSuccess, onFailed, onFinish) {
      if (typeof params.percentagemax === "undefined") {
        params["percentagemax"] = 100;
      }
      return getData("/product", params, onSuccess, onFailed, onFinish);
    },
    getSubCategory(params, onSuccess, onFailed, onFinish) {
      return getData("/product/subcategory", params, onSuccess, onFailed, onFinish);
    },
    getBySubCategory(params, onSuccess, onFailed, onFinish) {
      return getData("/product", params, onSuccess, onFailed, onFinish);
    },
    detailV2(filter, onSuccess, onFailed, onFinish) {
      AppUtils.track.viewContent();
      return getData("/product/detail", filter, onSuccess, onFailed, onFinish);
    },
    detail(id, onSuccess, onFailed, onFinish) {
      AppUtils.track.viewContent();
      return getData(
        "/product/detail",
        {
          slug: id,
        },
        onSuccess,
        onFailed,
        onFinish
      );
    },

    purchase(body, onSuccess, onFailed, onFinish) {
      // id_paymentmethod: 101 : VA, 102 : E-wallet
      if (body.user_phone) {
        body.user_phone = AppUtils.getPhone(body.user_phone, "+62", "0");
      }
      AppUtils.track.initiateCheckout();
      return sendData(
        "put",
        "/product/purchase",
        body,
        onSuccess,
        onFailed,
        onFinish
      );
    },

    purchaseStatus(params, onSuccess, onFailed, onFinish) {
      return getData(
        "/product/purchase/check",
        params,
        onSuccess,
        onFailed,
        onFinish
      );
    },

    purchaseSimulate(body, onSuccess, onFailed, onFinish) {
      return sendData(
        "put",
        "/product/purchase/simulate",
        body,
        onSuccess,
        onFailed,
        onFinish
      );
    },

    purchaseDetail(params, onSuccess, onFailed, onFinish) {
      return getData(
        "/product/purchase",
        params,
        onSuccess,
        onFailed,
        onFinish
      );
    },
    purchaseList(page, isPaid, onSuccess, onFailed, onFinish) {
      return postData(
        "/product/purchase",
        {
          page: page,
          rows_per_page: 20,
          filter: {
            is_paid: isPaid,
          },
        },
        onSuccess,
        onFailed,
        onFinish
      );
    },
    submitProof(totalPrice, id, url, notes, onSuccess, onFailed, onFinish) {
      AppUtils.track.purchase({
        type: "product",
        contents: [
          {
            id: id,
            quantity: 1,
          },
        ],
        value: totalPrice,
        currency: "IDR",
      });
      return sendData(
        "put",
        "/product/purchase/paymentproof",
        {
          id: id,
          proof: url,
          notes: notes,
        },
        onSuccess,
        onFailed,
        onFinish
      );
    },
    updateProgress(body, onSuccess, onFailed, onFinish) {
      return sendData(
        "patch",
        "/product/progress",
        body,
        onSuccess,
        onFailed,
        onFinish
      );
    },
    rate(body, onSuccess, onFailed, onFinish) {
      // id_product, rating, review
      return sendData(
        "put",
        "/product/rating",
        body,
        onSuccess,
        onFailed,
        onFinish
      );
    },

    simulatePurchase(body, onSuccess, onFailed, onFinish) {
      return sendData(
        "put",
        "/product/purchase/simulate",
        body,
        onSuccess,
        onFailed,
        onFinish
      );
    },
  },
  user: {
    fillAdditionalUserProfile(body, onSuccess, onFailed, onFinish) {
      // phone, birth_year, gender, job, city_id, is_marriege, child_count
      return sendData("put", "/user/profile/additional", body, onSuccess, onFailed, onFinish);
    },
    getAdditionalUserProfile(onSuccess, onFailed, onFinish) {
      // phone, birth_year, gender, job, city_id, is_marriege, child_count
      return getData("/user/profile/additional", {}, onSuccess, onFailed, onFinish);
    },
    checkActivePackage(onSuccess, onFailed, onFinish) {
      return getData("/user/package", {}, onSuccess, onFailed, onFinish);
    },
    checkUnique(form, onSuccess, onFailed, onFinish) {
      return getData("/user/check/unique", form, onSuccess, onFailed, onFinish);
    },
    profile(onSuccess, onFailed, onFinish) {
      return getData("/user/profile", {}, onSuccess, onFailed, onFinish);
    },

    loginSocmed(body, provider = "", onSuccess, onFailed, onFinish) {
      return sendData(
        "patch",
        "/user/socmed" + provider,
        body,
        (data) => {
          AppUtils.track.completeRegistration();
          onSuccess(data);
        },
        onFailed,
        onFinish
      );
    },
    loginSocmedFacebook(body, onSuccess, onFailed, onFinish) {
      return sendData(
        "patch",
        "/user/socmed/facebook",
        body,
        (data) => {
          AppUtils.track.completeRegistration();
          onSuccess(data);
        },
        onFailed,
        onFinish
      );
    },
    register(body, onSuccess, onFailed, onFinish) {
      return sendData(
        "put",
        "/user/registration",
        body,
        (data) => {
          AppUtils.track.completeRegistration();
          onSuccess(data);
        },
        onFailed,
        onFinish
      );
    },
    login(body, onSuccess, onFailed, onFinish) {
      return postData(
        "/user/login",
        body,
        (data) => {
          AppUtils.track.completeRegistration();
          onSuccess(data);
        },
        onFailed,
        onFinish
      );
    },
    updateSelf(body, onSuccess, onFailed, onFinish) {
      return sendData("patch", "/user", body, onSuccess, onFailed, onFinish);
    },
    forgotPassword(body, onSuccess, onFailed, onFinish) {
      return sendData(
        "put",
        "/user/forgotpassword",
        body,
        onSuccess,
        onFailed,
        onFinish
      );
    },
    resetPassword(body, onSuccess, onFailed, onFinish) {
      return sendData(
        "patch",
        "/user/password",
        body,
        onSuccess,
        onFailed,
        onFinish
      );
    },
    verify(token, onSuccess, onFailed, onFinish) {
      return getData(
        "/user/verify",
        {
          token: token,
        },
        onSuccess,
        onFailed,
        onFinish
      );
    },
  },
  bookmark: {
    add(body, onSuccess, onFailed, onFinish) {
      AppUtils.track.addToWishlist();
      return sendData("put", "/bookmark", body, onSuccess, onFailed, onFinish);
    },
    delete(body, onSuccess, onFailed, onFinish) {
      return sendData(
        "delete",
        "/bookmark",
        body,
        onSuccess,
        onFailed,
        onFinish
      );
    },
    get(onSuccess, onFailed, onFinish) {
      return getData(
        "/bookmark",
        {
          id_user: AppUtils.getUser().id,
        },
        onSuccess,
        onFailed,
        onFinish
      );
    },
  },

  upload: {
    file(files, cancelToken, onUploadProgress, onSuccess, onFailed, onFinish) {
      uploadFile(files, cancelToken, onUploadProgress, onSuccess, onFailed, onFinish)
    },
    image(type, image, onSuccess, onFailed, onFinish) {
      const file = AppUtils.dataURLtoFile(image, 'temp.png')

      let path = '/file/upload'

      const formData = new FormData()
      formData.append(type, file)

      postData(path, formData, onSuccess, onFailed, onFinish)
    },
  },

  uploadFile(
    files,
    cancelToken,
    onUploadProgress,
    onSuccess,
    onFailed,
    onFinish
  ) {
    const config = {
      onUploadProgress: function (progressEvent) {
        // var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        onUploadProgress(progressEvent.loaded / progressEvent.total);
      },
      headers: {
        "Token-Access": AppUtils.getToken(),
      },
      cancelToken: cancelToken,
    };

    const data = new FormData();
    data.append("file", files[0]);

    this.instance()
      .post("/file/upload", data, config)
      .then((response) => {
        return handleSuccess(response, onSuccess, onFailed, onFinish);
      })
      .catch((error) => {
        console.log(error);
        return handleError(error, onSuccess, onFailed, onFinish);
      });
  },

  getSetting(params, onSuccess, onFailed, onFinish) {
    return getData(
      "/setting",
      params,
      (data) => {
        AppUtils.saveSetting(data);
        onSuccess(data);
      },
      onFailed,
      onFinish
    );
  },

  visitor: {
    generate(onSuccess, onFailed, onFinish) {
      return sendData("put", "/visitor/generate", {}, onSuccess, onFailed, onFinish);
    },
  },

  category: {
    get(onSuccess, onFailed, onFinish) {
      return getData("/product/subcategory", {}, onSuccess, onFailed, onFinish);
    },

    detail(id, onSuccess, onFailed, onFinish) {
      return getData(
        "/product/subcategory/detail",
        {
          id_subcategory: id,
        },
        onSuccess,
        onFailed,
        onFinish
      );
    },
  },

  coupon: {
    check(code, onSuccess, onFailed, onFinish) {
      return getData(
        "/coupon/active",
        {
          code: code,
        },
        onSuccess,
        onFailed,
        onFinish
      );
    },
    getDetail(code, onSuccess, onFailed, onFinish) {
      return getData(
        "/coupon/detail",
        {
          code: code,
        },
        onSuccess,
        onFailed,
        onFinish
      );
    },
    list(pagination, onSuccess, onFailed, onFinish) {
      return postData(
        "/coupon/actives",
        pagination,
        onSuccess,
        onFailed,
        onFinish
      );
    },
  },

  payment: {
    gateway(method, onSuccess, onFailed, onFinish) {
      // banks
      return getData(
        `paymentgateway/${method}`,
        {},
        onSuccess,
        onFailed,
        onFinish
      );
    },
  },

  package: {
    get(params = {}, onSuccess, onFailed, onFinish) {
      if (params.is_active != 0 && params.is_active != 1) {
        params.is_active = 1;
      }
      return getData(`package`, params, onSuccess, onFailed, onFinish);
    },
    getPurchased(params = {}, onSuccess, onFailed, onFinish) {
      return getData(
        `package/purchased`,
        params,
        onSuccess,
        onFailed,
        onFinish
      );
    },
  },

  organization: {
    add(form, onSuccess, onFailed, onFinish) {
      // name, logo, cover, short_bio, desc
      return sendData(
        "put",
        "organization",
        form,
        onSuccess,
        onFailed,
        onFinish
      );
    },
    edit(form, onSuccess, onFailed, onFinish) {
      // name, logo, cover, short_bio, desc
      return sendData(
        "patch",
        "organization",
        form,
        onSuccess,
        onFailed,
        onFinish
      );
    },
    get(params, onSuccess, onFailed, onFinish) {
      // mine, page, rows_per_page
      return postData("/organization", params, onSuccess, onFailed, onFinish);
    },
  },

  calculator: {
    add(form, onSuccess, onFailed, onFinish) {
      form.uuid = AppUtils.getDeviceId()
      return sendData(
        "put",
        "/calculator",
        form,
        onSuccess,
        onFailed,
        onFinish
      );
    },
  },

  location: {
    getCity(onSuccess, onFailed, onFinish) {
      return getData(`/location/cities`, {}, onSuccess, onFailed, onFinish)
    }
  }
};
