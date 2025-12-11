import { useEffect, useState } from 'react';
import'../styles/pages/HomePage.css';
import'../styles/shared/header.css';
import { Header } from './utils/header';
import axios from 'axios';
import { ProductCard } from './productCard';

export function HomePage({checkouts,quantity,setQuantity,getCheckouts}) {


 const [productGrid,setProductGrid]=useState([]);

  async function homePage(){  let response=await axios.get('api/products');

    return setProductGrid(response.data)
  };
 

useEffect( ()=>
 {     
 
  homePage();


},[]

)


    return(   
 
    <> 
 
     <title>HomePage</title>
   <Header checkouts={checkouts}   quantity={quantity} setQuantity={setQuantity} />

    <div className="home-page">
      <div className="products-grid">


{productGrid.map(product =>{ 

 return <ProductCard  product={product} key={product.id} quantity={quantity} setQuantity={setQuantity} 
 getCheckouts={getCheckouts}/>;
 

}) 

}



    
      </div>
    </div></>

    )
}
