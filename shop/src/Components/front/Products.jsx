import { useContext } from "react";
import FrontContext from "../../Contexts/FrontContexts";
import filterShow from "../../Functions/filterShow";
import Product from "./Product";

function Products () {

    const {products} = useContext(FrontContext);

    return (
        <div className="products row">
            {
            products.map(p => filterShow(p.show) ? <Product key = {p.id} product ={p}></Product> :null)
            }
        </div>
 )
}

export default Products;