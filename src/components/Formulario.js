import React, {Fragment, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    // Crear state de turnos
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',        
        sintomas: ''
    });

    // Error de validación
    const [error, actualizarError ] = useState(false)

    // Función que se ejecuta cada vez que el usuario escribe en un input
    const actualizarState = e => {        
        actualizarCita ({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    // Extraer valores
    const { mascota, propietario, fecha, hora, sintomas }  = cita;

    // Cuando el usuario presiona Reservar turno
    const submitCita = e => {
        e.preventDefault();

        //Validar
        if(mascota.trim() === '' || propietario.trim() === '' || hora.trim() === '' || fecha.trim() === '' || sintomas.trim() === '') {
            actualizarError(true);
            return;
        }

        actualizarError(false);

        //asignar un id
        cita.id = uuidv4();
        // console.log('cita');
        //crear la cita
        crearCita(cita);

        //reiniciar el form

        actualizarCita({
            mascota: '',
            propietario: '',
            hora: '',
            fecha: '',
            sintomas: ''
        })

    }    
    return ( 
        <Fragment>
            <h2>Reserva de turnos</h2>
            { error ? <p className="alerta-error">Todos los campos son obligatorios</p>
            : null }

            <form
                onSubmit={submitCita}
            >
                <label>Nombre de la mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre de la mascota"
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre del dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="nombre dueño mascota"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Síntomas</label>
                <textarea 
                    name="sintomas" 
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button 
                    type="submit" 
                    className="u-full-width button-primary"
                    onSubmit={submitCita}
                    >Reservar turno
                </button>
            </form>
        </Fragment>
     );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;