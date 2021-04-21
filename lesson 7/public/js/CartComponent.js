// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('cart', {
    data(){
      return {
          cartUrl: '/getBasket.json',
          cartItems: [],
          //imgCart: 'https://placehold.it/50x100',
          showCart: false
      }
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item){
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++
                        };
                        this.totalAmount()
                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.push(prod)
                        };
                        this.totalAmount()
                    })
            };
            

            // this.$parent.getJson(`${API}/addToBasket.json`)
            //     .then(data => {
            //         if(data.result === 1){
            //             let find = this.cartItems.find(el => el.id_product === item.id_product);
            //             if(find){
            //                 find.quantity++;
            //             } else {
            //                 const prod = Object.assign({quantity: 1}, item);
            //                 this.cartItems.push(prod)
            //             }
            //         }
            //     })
        },
        totalAmount(){
            let total=document.getElementById('total');
            total.innerHTML="Total: "+this.cartItems.reduce((sum,cur)=>sum+(cur.quantity*cur.price),0)
        },
        remove(item){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    };
                    this.totalAmount()
                })
            //this.totalAmount()
        },
    },
    template: `<div>
<button class="btn-cart" type="button" @click="showCart = !showCart"><i class="fa fa-shopping-cart" aria-hidden="true"></i>
</button>
        <div class="cart-block" v-show="showCart">
            <div id="total"></div>
            <cart-item v-for="item of cartItems" :key="item.id_product" :cart-item="item" @remove="remove"
            @addProduct="addProduct">
            </cart-item>
        </div>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
    <div class="cart-item">
        <div class="product-bio">
            <div class="cart-image" v-html="cartItem.product_image"></div>
            <div class="product-title">{{ cartItem.product_name }}</div>
        </div>

        <div class="product-desc">
            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
            <div class="product-single-price">$ {{ cartItem.price }} each</div>
        </div>
        
        <div class="right-block">
            <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
            <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
            <button class="del-btn" @click="$emit('addProduct', cartItem)">+</button>
        </div>
    </div>
    `
})