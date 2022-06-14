import { useContext } from "react";
import BackContext from "../../Contexts/BackContexts";
import ProductLine from "./ProductLine";
import ProductLineEmpty from "./ProductLineEmpty";
import Loader from "./Loader";

function ProductsList () {

     const {products} = useContext(BackContext);

    return (
         <div className="col-7">
            <div className="card mt-4">
                <div className="card-header">
                    <h2>Produktų Sąrašas</h2>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {
                            products === null ? <Loader/> : 
                                products.length ? products.map(p => <ProductLine key={p.id} product={p}></ProductLine>) :
                                <ProductLineEmpty/>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProductsList;