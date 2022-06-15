import axios from 'axios';
import { useEffect } from 'react';
import { useReducer } from 'react';
import {getProductsFromServer} from '../../Actions/products';
import FrontContext from '../../Contexts/FrontContexts';
import '../../front.scss'
import productsReducer from '../../Reducers/productsReducer';
import Loader from './Loader';
import Products from './Products';
import SecondBar from './SecondBar';
import TopBar from './TopBar';


function Front() {
  
  const [products, dispatchProducts] = useReducer(productsReducer, null);
  
  useEffect(()=> {
    axios.get('http://localhost:3003/products')
    .then(res => {
      dispatchProducts(getProductsFromServer(res.data))
    })
  }, [])

  return (
    <FrontContext.Provider value = {{products, dispatchProducts}}>
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