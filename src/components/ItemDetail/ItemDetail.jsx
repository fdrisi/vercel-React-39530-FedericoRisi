import {ItemCount} from '../ItemCount/ItemCount'
import { useDarkModeContext } from '../../context/DarkModeContext'
import { useCarritoContext } from '../../context/CarritoContext'
import { Link } from 'react-router-dom'

export const ItemDetail = ({item}) => {
    const {darkMode} = useDarkModeContext()
    const {addItem} = useCarritoContext()
    
    const onAdd =(cantidad) => {
        addItem(item, cantidad)
    }
    return (
        <div className={`${darkMode ? 'itemDetailBodyDark' : ''}`}>
        <div className={`row g-0 ${darkMode ? 'itemDetailBodyDark' : ''}`}>
            <div className='col-md-4'>
                <img src={item.img} className="img-fluid rounded-start" alt={`Imagen de ${item.nombre}`}/>
            </div>
            <div className="col-md-8">
                <div className={`${darkMode ? 'cardbodydark' : 'card-body'}`}>
                    <p className="producto-title">{item.nombre}</p>
                    <p className="producto-subtitulo">{item.unidades} unidad(es) de {item.volumen}ml.</p>
                    <p className='card-text'>Stock: {item.stock}</p>
                    <p className="producto-precio">${new Intl.NumberFormat('de-DE').format(item.precio)}</p>
                    <ItemCount valInicial={1} stock={item.stock} onAdd={onAdd}/>
                    <Link className='nav-link' to={"/cart"}><button className='btn btn-primary'>Finalizar compra</button></Link>
                </div>
            </div>
            </div>
        </div>
    );
}