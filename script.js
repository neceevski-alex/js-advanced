const goods = [
    { title: 'Shirt', price: 150, image:'shirt.jpg' },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250, image:'shoes.jpg'},
  ];
  
  const renderGoodsItem = (title, price, image) => {
    return `<div class="goods-item"><h3>${title}</h3>${image?`<img src="img/${image}">`:'<i class="fa fa-times" aria-hidden="true"></i>'}<p>${price}</p><a href="#"class="add-in-cart btn">Добавить</a></div>`;
  };
  
  const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.image));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
  }
  
  renderGoodsList(goods);
  