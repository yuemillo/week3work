import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

    const site =  'https://vue3-course-api.hexschool.io/v2/';
    import pagintion from './Pagintion.js';
    import ProductModal from './ProductModal.js';
    import DelProductModal from './DelProductModal.js';

    // let productModal = null;
    // let delProductModal = null;

    const app = createApp({
        data(){
            return{
                apiPath : 'jslong',
                products: [],
                pages:{},
                tempProduct: {
                imageUrl:'',
                }, //Modal代入資料
                isNew: false, //Modal新增或編輯API時判斷
            };
        },
        methods: {
            checkAdmin(){
                      const url = `${site}/api/user/check`;
                      axios.post(url)
                        .then((res)=>{
                          this.getProducts();
                        }).catch((err)=>{
                          window.location = 'login.html';
                        });
                    },
            getProducts(page = 1){
                const api = `${site}api/${this.apiPath}/admin/products?page=${page}`;
                axios.get(api)
                .then(res => {
                    console.log(res);
                    this.products = res.data.products;
                    this.pages = res.data.pagination;
                });
            },
            openModal(status, product){
          //status判斷當前點擊是新增/編輯/刪除按鈕
          //product為當前點擊資料
          if(status === 'new'){
            this.tempProduct = {
                imageUrl:[],
            };
            this.isNew = true;
            // productModal.show();
            //用外層的ref控制內層的methods
            this.$refs.controlModal.openModal();
          } else if (status === "edit"){
            this.tempProduct = {...product};
            if(!Array.isArray(this.tempProduct.imagesUrl)){
                this.tempProduct.imagesUrl = []
            }
            this.isNew = false;
            // productModal.show();
            this.$refs.controlModal.openModal();
          } else if (status === "delete"){
            this.tempProduct = {...product};
            this.$refs.controlDelModal.openModal();
            //delProductModal.show();
          }
            },
            updateProduct(){
                //新增
                let api = `${site}api/${this.apiPath}/admin/product`;

                let method = 'post';
                //更新
                if(!this.isNew){
                    api = `${site}api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
                    method = 'put';
                }
                axios.put
                axios[method](api,{data: this.tempProduct})
                .then(res => {
                    console.log(res);
                   this.getProducts();
                //    productModal.hide();
                this.$refs.controlModal.closeModal();
                   this.tempProduct = {};
            }).catch(err =>{
                alert(err.data.message)
            });
        },
            deleteProduct(){
                const api = `${site}api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
                axios.delete(api)
                .then(res => {
                    console.log(res);
                   this.getProducts();
                   this.$refs.controlDelModal.closeModal();
            });
            },
        },
        mounted() {
            const token = document.cookie.replace(
                    /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
                    "$1");
                axios.defaults.headers.common['Authorization'] = token;
                //儲存token避免重複登入
                this.getProducts();

                
                //用一個new把modal變為實體
                //delProductModal = new bootstrap.Modal(this.$refs.delProductModal);
                this.checkAdmin()
        },
        //區域註冊,注意要加S
        components:{
            pagintion,
            ProductModal,
            DelProductModal
        }
    });

    app.mount('#app');



    // const app ={
    //   data(){
    //     return{
    //       apiPath : 'jslong',
    //       products: [],
    //       tempProduct: {
    //       imageUrl:'',
    //       }, //Modal代入資料
    //       isNew: false, //Modal新增或編輯API時判斷
    //     };
    //   },
    //   methods: {
    //     checkAdmin(){
    //       const url = `${this.apiUrl}/api/user/check`;
    //       axios
    //         .post(url)
    //         .then(()=>{
    //           this.getProducts();
    //         }).catch((err)=>{
    //           alert(err.response.data.message);
    //           window.location = 'login.html';
    //         });
    //     },
    //     openModal(status, item){
    //       //status判斷當前點擊是新增/編輯/刪除按鈕
    //       //item為當前點擊資料
    //       if(status === 'new'){
    //         this.tempProduct = {};
    //         this.isNew = true;
    //         productModal.show();
    //       } else if (status === "edit"){
    //         this.tempProduct = {...item};
    //         this.isNew = false;
    //         productModal.show();
    //       } else if (status === "delete"){
    //         this.tempProduct = {...item};
    //         delProductModal.show();
    //       }
    //     },
    //     updateProduct(){
    //       let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
    //       let http = 'put';
    //       if(this.isNew){
    //         url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
    //         http = 'post'
    //       }
    //       axios[http](url, { data: this.tempProduct }).then((res)=>{
    //         alert(res.data.message);
    //         productModal.hide();
    //         this.getData();
    //       }).catch((err)=>{
    //         alert(err.response.data.message);
    //       })
    //     },
    //     getProduct(){
    //       const url = `${site}/api/${this.apiPath}/admin/products`;
    //               axios
    //               .get(url)
    //               .then((res)=>{
    //                 this.products = res.data.products;
    //               })
    //               .catch((err)=>{
    //                 alert(err.response.data.message);
    //               })
    //     },
    //     deleteProduct(){}
    //   },
    //   mounted() {
    //     const token = document.cookie.replace(
    //               /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
    //               "$1");
    //           axios.defaults.headers.common['Authorization'] = token;
    //           //儲存token避免重複登入
              
    //           this.getProduct();
    //     productModal = new bootstrap.Modal(
    //       document.getElementById("productModal"),
    //       {
    //         keyboard: false, //禁止使用透過按關閉Modal視窗
    //         backdrop: 'static'//禁止使用者點擊Modal以外的地方來關閉視窗
    //       }
    //   );
    //   delProductModal = new bootstrap.Modal(
    //       document.getElementById("delProductModal"),
    //       {
    //         keyboard: false, //禁止使用透過按關閉Modal視窗
    //         backdrop: 'static'//禁止使用者點擊Modal以外的地方來關閉視窗
    //       }
    //   );
      
    //   }
     
    // }
  
    // Vue.createApp(app).mount('#app');