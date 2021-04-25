Vue.component('products-comp',{
    props:['showed','addproduct'],
    template: ` <div class="products">
                    <div v-for="product of showed" :key='product.id_product' class="items">
                        <a href="#" class="prod-link">
                            <div class="image"><img :src="product.img" alt="some img" class='product_img'></div>
                        
                            
                                <div class='name'>{{product.product_name}}</div>
                                <div class='price'>Стоимость: {{product.price}} руб</div>
                            
                            <a href="#" class="prod-back" :id="product.id_product" @click='$emit("addproduct",product)'><img src="img/backet-white.svg" alt=""> Add to Cart</a>
                        </a>
                    </div>
                </div>
`
})