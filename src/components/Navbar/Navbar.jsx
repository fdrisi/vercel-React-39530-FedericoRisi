import CartWidget from "../CartWidget/CartWidget";
import Categorias from "./Categorias/Categorias";
import Secciones from "./Secciones/Secciones";
import { BotonDarkMode } from './BotonDarkMode/BotonDarkMode';
import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <ul><Link className="navbar-brand" to={"/"}>Tienda</Link></ul>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav me-auto">
                    <Categorias/>
                    <Secciones/>
                </ul>
                    <CartWidget/>
                    <BotonDarkMode/>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
