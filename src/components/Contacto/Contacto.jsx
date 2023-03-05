import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Contacto = () => {
    const datosFromulario = React.useRef()
    let navigate = useNavigate()
    const consultarFormulario = (e) => {
        e.preventDefault();
        const datForm = new FormData(datosFromulario.current)
        const contacto = Object.fromEntries(datForm)
        e.target.reset()
        toast.success("Formulario enviado con éxito")
        navigate("/")
        }
    return (
        <div className="container">
            <form onSubmit={consultarFormulario} ref={datosFromulario}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" name="nombre" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="celular" className="form-label">Teléfono</label>
                    <input type="number" className="form-control" name="celular" />
                </div>
                <div className="mb-3">
                    <label htmlFor="textarea" className="form-label">Consulta</label>
                    <textarea className="form-control" name="textarea" rows="3 " />
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    );
}