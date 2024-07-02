// EventDetails.js
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { EventContext } from '../App';

const EventDetails = () => {
    const { id } = useParams();
    const { state } = useContext(EventContext);
    const event = state.find(event => event.id === id);

    return (
        <div className="notas">
            {event ? (
                <div>
                    <p>Cliente: {event.name}</p>
                    <p>Día: {event.date}</p>
                    <p>Lugar: {event.place}</p>
                     <p>Cantidad de Personas: {event.numberOfPeople}</p>
                    <p>Tema: {event.theme}</p>
                </div>
            ) : (
                 <p>Evento no encontrado</p>
            )}
        </div>
    );
};

export default EventDetails;
