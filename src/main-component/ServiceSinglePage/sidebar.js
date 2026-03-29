import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Services from '../../api/Services';


const ServiceSidebar = (props) => {


    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    const [searchTerm, setSearchTerm] = useState('');
    const [showError, setShowError] = useState(false);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        if (showError) {
            setShowError(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim() === '') {
            setShowError(true);
        } else {
            setShowError(false);
            console.log('Searching for:', searchTerm);
        }
    };





    return (
        <div className="blog-sidebar">
            <div className="widget search-widget">
                <h3>Búsqueda</h3>
                <form
                    onSubmit={handleSubmit}>
                    <div>
                        <input
                            className="form-control"
                            type="text"
                            name="search"
                            value={searchTerm}
                            onChange={handleInputChange}
                            placeholder="Buscar..."
                        />
                        <button type="submit">
                            <i className="ti-search"></i>
                        </button>
                    </div>
                </form>
                {showError && <p style={{ color: 'red' }}>Por favor ingrese un criterio de búsqueda.</p>}
            </div>
            <div className="widget category-widget">
                <h3>Todos los Servicios</h3>
                <ul>
                    {Services.slice(0, 3).map((serv, item) => (
                        <li key={item}><Link onClick={ClickHandler} to={`/service-single/${serv.slug}`} >{serv.title}</Link></li>
                    ))}
                </ul>
            </div>
            <div className="wpo-contact-widget widget">
                <h2>Contáctenos hoy y obtenga un servicio de calidad.</h2>
                <div className="call">
                    <span>Llámenos al:</span>
                    <h5>2253 2834</h5>
                </div>
                <Link onClick={ClickHandler} className="theme-btn" to="/contact">Pedir Cotización</Link>
            </div>
        </div>
    )
}

export default ServiceSidebar;

