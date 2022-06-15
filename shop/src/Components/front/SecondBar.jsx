import { useContext, useEffect, useRef, useState} from "react";
import { sortProducts } from "../../Actions/products";
import FrontContext from "../../Contexts/FrontContexts";

function SecondBar () {

    const [select, setSelect] = useState('default_sort');

    const {dispatchProducts} = useContext(FrontContext);

    const run = useRef(true);

    useEffect(() => {
        if(run.current){
            run.current = false;
            return;
        }
        dispatchProducts(sortProducts(select));
    }, [select, dispatchProducts])

    return (
        <div className="bar">
            <div className="sort">
                <span>Rūšiuoti pagal: </span>
               <select value = {select} onChange={e => setSelect(e.target.value)}>
                <option value="default_sort">Numatytasis</option>
                <option value="price_asc_sort">Kaina nuo mažiausios</option>
                <option value="price_desc_sort">Kaina nuo didžiausios</option>
                <option value="title_sort">Pagal pavadinimą</option>
               </select>
            </div>
        </div>
    )
}

export default SecondBar;