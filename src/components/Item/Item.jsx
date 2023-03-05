import {Link} from 'react-router-dom'
import { useDarkModeContext } from '../../context/DarkModeContext';

export const Item = ({item}) => {
    const {darkMode} = useDarkModeContext()
    return (
        <div className={`card mb-3 cardProducto ${darkMode ? 'text-white bg-danger' : 'border-warning'}`} style={{width: '18rem'}}>
            <img src={item.img} className="card-img-top" alt={`Imagen de ${item.nombre}`} />
            <div className={`card-body ${darkMode ? 'cardBodyDark' : 'cardBody'}`}>
                <p className="producto-title">{item.nombre}</p>
                <p className="producto-subtitulo">{item.unidades} unidad(es) de {item.volumen}ml.</p>
                <p className="producto-precio">${new Intl.NumberFormat('de-DE').format(item.precio)}</p>
                <button type="button" className={`botonAgregar btn ${darkMode ? 'btn-primary' : 'btn-secondary'}`}><Link className="nav-link" to={`/item/${item.id}`}>Ver producto</Link></button>
            </div>
      </div>
    );
}
