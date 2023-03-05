import { Link } from "react-router-dom"
import {ItemList} from "../ItemList/ItemList"
import { useCarritoContext } from "../../context/CarritoContext"
export const Cart = () => {
    const {carrito, totalPrice, emptyCart} = useCarritoContext()

    return (
            <>
            { carrito.length === 0 
              ?
               <> 
               <h2>Carrito vacío</h2>
               <Link className="nav-link" to={'/'}><button className="btn btn-primary">Continuar comprando</button></Link>
               </>
               :
               <div className="container cartContainer">
                {<ItemList products={carrito} plantilla={'itemCart'}/>}
                <div className="divButtons">
                    <p>Resumen de la compra: ${new Intl.NumberFormat ('de-De').format(totalPrice())}</p>
                    <button className="btn btn-primary" onClick={()=>emptyCart()}>Vaciar carrito</button>
                    <Link className="nav-link" to={'/'}><button className="btn btn-primary">Continuar comprando</button></Link>
                    <Link className="nav-link" to={'/checkout'}><button className="btn btn-primary">Finalizar compra</button></Link>
                </div>             
               </div>


            }
        </>
    )
}
