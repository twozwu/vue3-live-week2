const url = "https://vue3-course-api.hexschool.io"; // 請加入站點
const path = "onedog"; // 請加入個人 API Path

const length = document.querySelector("#productCount");
let listenerSwitch = false; //商品頁監聽判斷

const app = {
  data: {
    products: [],
  },
  getData() {
    axios.get(`${url}/api/${path}/admin/products`).then((res) => {
      //   console.log(res);
      this.data.products = res.data.products;
      console.log(this.data.products);
      this.render();
    });
  },
  render() {
    const productList = document.querySelector("#productList");
    // let template = ``;
    // this.data.products.forEach((item) => {
    //   template += `<tr>
    //             <td>${item.category}</td>
    //             <td width="120">
    //               ${item.origin_price}
    //             </td>
    //             <td width="120">
    //               ${item.price}
    //             </td>
    //             <td width="100">
    //               <span class="">${item.is_enabled ? "啟用" : "未啟用"}</span>
    //             </td>
    //             <td width="120">
    //               <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id="${
    //                 item.id
    //               }"> 刪除 </button>
    //             </td>
    //           </tr>`;
    // });
    const template = this.data.products
      .map(
        (item) =>
          `<tr>
              <td>${item.category}</td>
              <td width="120">
                ${item.origin_price}
              </td>
              <td width="120">
                ${item.price}
              </td>
              <td width="100">
                <span class="">${item.is_enabled ? "啟用" : "未啟用"}</span>
              </td>
              <td width="120">
                <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id="${
                  item.id
                }"> 刪除 </button>
              </td>
            </tr>`
      )
      .join("");
    // console.log(template);
    productList.innerHTML = template;
    length.innerHTML = `${this.data.products.length}`;
    if (!listenerSwitch) {
      productList.addEventListener("click", this.doSomething);
      listenerSwitch = true;
    }
  },
  doSomething(e) {
    console.log(e);
    const action = e.target.dataset.action;
    const id = e.target.dataset.id;
    if (action == "remove") {
      if (confirm("確認要刪除嗎?")) {
        app.deleteProduct(id);
      }
    }
    if (action == "complete") {
      app.statusProduct(id);
    }
  },
  deleteProduct(id) {
    // axios.defaults.headers.common["Authorization"] = token;
    axios.delete(`${url}/api/${path}/admin/product/${id}`).then((res) => {
      console.log("已刪除");
      this.getData();
    });
  },
  init() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    this.getData();
  },
};

app.init();
