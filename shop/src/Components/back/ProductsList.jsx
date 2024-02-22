import { useContext, useEffect, useState } from "react";
import BackContext from "../../Contexts/BackContexts";
import ProductLine from "./ProductLine";
import ProductLineEmpty from "./ProductLineEmpty";
import Loader from "./Loader";

function ProductsList () {

     const {products} = useContext(BackContext);

     const [isMobile, setIsMobile] = useState(window.innerWidth < 769);

     useEffect(() => {
        window.addEventListener("resize", () => {
        const ismobile = window.innerWidth < 769;
        if (ismobile !== isMobile) setIsMobile(ismobile);
     }, false);
     }, [isMobile]);

    return (
         <div className={`${isMobile ? "col-12" : "col-7"}`}>
            <div className="card mt-4">
                <div className="card-header header-color">
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