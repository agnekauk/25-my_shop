import '../../bootstrap.css';
import '../../back.scss';
import BackContext from '../../Contexts/BackContexts';
import NavBar from './NavBar';
import ProductsList from './ProductsList';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import ProductCreate from './ProductCreate';
import Message from './Message';
import ProductEdit from './ProductEdit';

function Back() {

    const [products, setProducts] = useState(null);
    const [lastProductUpdate, setLastProductUpdate] = useState(Date.now());
    const [message, setMessage] = useState({show: false});

    const [modalProductData, setModalProductData] = useState(null);

    const [createProductData, setCreateProductData] = useState(null);
    const [deleteProductData, setDeleteProductData] = useState(null);
    const [editProductData, setEditProductData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3003/admin/products')
        .then(res => setProducts(res.data));
    }, [lastProductUpdate]);

    useEffect(() => {
        if(createProductData === null) return;
        axios.post('http://localhost:3003/admin/products', createProductData)
        .then(setLastProductUpdate(Date.now()));
        showMessage('success', 'Naujas produktas pridėtas');
    }, [createProductData]);

    useEffect(() => {
        if(deleteProductData === null) return;
        axios.delete('http://localhost:3003/admin/products/' + deleteProductData.id)
        .then(setLastProductUpdate(Date.now()));
        showMessage('success', 'Produktas ištrintas');
    }, [deleteProductData]);

    useEffect(() => {
        if(editProductData === null) return;
        axios.put('http://localhost:3003/admin/products/' + editProductData.id, editProductData)
        .then(setLastProductUpdate(Date.now()));
        showMessage('success', 'Produktas sėkmingai atnaujintas');
    }, [editProductData]);

    const showMessage = (type, text) => {
        setMessage({
            type,
            text,
            show: true,
        });
        setInterval(()=> setMessage({show:false}), 7000);
    }

    return (
        <BackContext.Provider value = {{
            products, 
            setCreateProductData, 
            message,
            setDeleteProductData,
            modalProductData,
            setModalProductData,
            setEditProductData}}>
            <div className="container">
                <div className="row">
                    <NavBar></NavBar>
                    <ProductCreate></ProductCreate>
                    <ProductsList></ProductsList>
                </div>
            </div>
            <Message></Message>
            <ProductEdit></ProductEdit>
        </BackContext.Provider>
    );
}

export default Back;
