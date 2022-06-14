import { useContext } from "react";
import BackContext from "../../Contexts/BackContexts";

function ProductLine ({product}) {

    const {setDeleteProductData} = useContext(BackContext);
    const {setModalProductData} = useContext(BackContext);

    return (
          <li className="list-group-item">
            <div className="product-line">
                <div className="product-line__content">
                    <div className="product-line__content__top">
                        <div className="product-line__content__top__title">
                            {product.title}
                        </div>
                        <div className="product-line__content__top__price">
                            {(parseFloat(product.price)).toFixed(2)} Eur
                        </div>
                        <div className="product-line__content__top__code">
                            {product.code}
                        </div>
                    </div>
                    <div className="product-line__content__bottom">
                        {product.description}
                    </div>
                </div>
                <div className="product-line__buttons">
                    <button type="button" className="btn btn-outline-success fu" onClick={() => setModalProductData(product)}>Redaguoti</button>
                    <button type="button" className="btn btn-outline-danger fu" onClick={() => setDeleteProductData(product)}>Trinti</button>
                </div>
            </div>
        </li>
    );
}

export default ProductLine;