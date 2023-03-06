import React from "react";
import { useCarritoContext } from "../../context/CarritoContext"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import { createOrdenCompra, getOrdenCompra, getProducto, updateProducto } from "../../firebase/firebase";
import { useState } from "react";

export const Checkout = () => {
    const {carrito, emptyCart, totalPrice} = useCarritoContext()
    const datosFormulario = React.useRef()
    let navigate = useNavigate()
    
    const [mail1, setMail1] = useState('');
    const [mail2, setMail2] = useState('');
    const [error, setError] = useState('');

    const changeMail1 = (e) => {
        setMail1(e.target.value);
        setError('');
    }

    const changeMail2 = (e) => {
        setMail2(e.target.value);
        setError('');
    }
    const consultarFormulario = (e) => {
        e.preventDefault()
        const datForm = new FormData(datosFormulario.current)
        const cliente = Object.fromEntries(datForm)

        const aux = [...carrito]

        aux.forEach(prodCarrito=>{
            getProducto(prodCarrito.id).then(prodBDD=>{
                prodBDD.stock -= prodCarrito.cant
                updateProducto(prodCarrito.id, prodBDD)
            })
        })

        if (mail1 === mail2) {

            createOrdenCompra(cliente, aux, totalPrice(), new Date().toISOString()).then(ordenCompra=>{
                toast.success(`'¡Muchas gracias por su compra! Su orden de compra por ${ordenCompra.id} por un total de $${new Intl.NumberFormat('de-DE').format(totalPrice())} fue realizada con éxito'`)
                emptyCart()
                e.target.reset()
                navigate("/")
            })
        } else {
            setMail2('')
            setError('Los Emails no son iguales')
        }

    }
    return (
        <>
            {carrito.length === 0
            ?
            <>
                <h2>Carrito vacío</h2>
                <Link className="nav-link" to={'/'}><button className="btn btn-primary">Continuar comprando</button></Link>
            </>
            :
            <>
                <div className="container" style={{marginTop:"20px"}}>
                    <form onSubmit={consultarFormulario} ref={datosFormulario}>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" name="nombre" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Apellido</label>
                            <input type="text" className="form-control" name="apellido" required/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={mail1} onChange={changeMail1} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="repEmail" className="form-label">Repetir Email</label>
                        <input type="email" className="form-control" name="repEmail" value={mail2} onChange={changeMail2} required/>
                        {error && <p>Los emails ingresados no coinciden</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="celular" className="form-label">Numero telefonico</label>
                        <input type="number" className="form-control" name="celular" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="direccion" className="form-label">Direccion</label>
                        <input type="text" className="form-control" name="direccion" required/>
                    </div>

                    <button type="submit" className="btn btn-primary">Finalizar Compra</button>
                    </form>
                </div>
            </>
        }
        </>
    );
}