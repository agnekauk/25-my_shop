import axios from 'axios';
import { useRef } from 'react';
import { useEffect, useReducer } from 'react';
import {getProductsFromServer} from '../../Actions/products';
import FrontContext from '../../Contexts/FrontContexts';
import '../../front.scss'
import productsReducer from '../../Reducers/productsReducer';
import Loader from './Loader';
import Products from './Products';
import SecondBar from './SecondBar';
import TopBar from './TopBar';



function Front() {

  const min = useRef();
  const max = useRef();
  
  const [products, dispatchProducts] = useReducer(productsReducer, null);
  
  useEffect(()=> {
    axios.get('http://localhost:3003/products')
    .then(res => {
      const pr = [...res.data];
      pr.sort((a,b) => a.price - b.price);
      min.current = Math.floor(pr.shift().price);
      max.current = Math.ceil(pr.pop().price);
      dispatchProducts(getProductsFromServer(res.data))
    })
  }, [])

  return (
    <FrontContext.Provider value = {
      {
      products, 
      dispatchProducts, 
      min:min.current, 
      max:max.current
      }
    }>
    <div id ="shop">
      <div className="shop-container">
        <TopBar/>
        <SecondBar/>
        {
          products !== null ? <Products></Products> : <Loader></Loader>
        }
      </div>
    </div>
    </FrontContext.Provider>
  );
}

export default Front;