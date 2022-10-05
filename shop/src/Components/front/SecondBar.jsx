import { useContext, useEffect, useRef, useState} from "react";
import { sortProducts, filterPrice, filterShowPhoto } from "../../Actions/products";
import FrontContext from "../../Contexts/FrontContexts";

function SecondBar () {

    const [select, setSelect] = useState('default_sort');

    const {dispatchProducts, min, max} = useContext(FrontContext);

    const [minRange, setMinRange] = useState(0);
    const [maxRange, setMaxRange] = useState(0);
    const [showPhoto, setShowPhoto] = useState(false);

    const run1 = useRef(true);
    const run2 = useRef(true);
    const run3 = useRef(true);

    useEffect(() => {
        if(run1.current){
            run1.current = false;
            return;
        }
        dispatchProducts(sortProducts(select));
    }, [select, dispatchProducts])

    useEffect(() => {
        if(run2.current){
            run2.current = false;
            return;
        }
        dispatchProducts(filterPrice({min: minRange, max: maxRange}));
    }, [minRange,maxRange, dispatchProducts])

    
    useEffect(() => {
        if(run3.current){
            run3.current = false;
            return;
        }
        dispatchProducts(filterShowPhoto(showPhoto));
    }, [showPhoto, dispatchProducts])

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
            <div className="sort">
                <span>Filtruoti pagal: </span>
                <div>
                    <div className="range">
                        <i>min:{minRange}</i><b>{min}</b>
                    <input type='range' value={minRange} min={min} onChange={e => setMinRange(e.target.value)}/>
                    <b>{max}</b>
                    </div>
                    <div className="range">
                        <i>max:{maxRange}</i><b>{max}</b>
                    <input type='range' className="max" value={maxRange} max={max} onChange={e => setMaxRange(e.target.value)}/>
                    <b>{min}</b>
                    </div>
                </div>
            </div>
            <div className="sort">
                <span>Tik su nuotraukomis: </span>
                <input type="checkbox" onChange={() => setShowPhoto(p => !p)} checked={showPhoto} />
            </div>
        </div>
    )
}

export default SecondBar;