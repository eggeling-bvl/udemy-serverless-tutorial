const result = document.querySelector('.result')
const fetchProducts = async () =>{
    result.innerHTML = '<h3>Loading...</h3>'
   try {
       const id = window.location.search
       const {data:{fields}} = await axios.get(`/api/3-z-complete${id}`)
       const {name, desc,price,image} = fields;
       result.innerHTML = `<h1 class="title">${name}</h1>
       <article class="product">
         <img class="product-img"
         src="${image[0].url}"
         alt="${name}"
         />
         <div class="product-info">
           <h5 class="title">${name}</h5>
           <h5 class="price">$${price}</h5>
           <p class="desc">${desc}</p>
         </div>
       </article>`


       
   } catch (error) {
    result.innerHTML = `<h3>${error.response.data}</h3>`
   }


}
fetchProducts();