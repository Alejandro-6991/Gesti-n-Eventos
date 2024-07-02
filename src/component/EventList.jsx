import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Text } from '@chakra-ui/react';
import { EventContext } from '../App';

const EventList = () => {
    const { state, dispatch } = useContext(EventContext);

    const handleDelete = (id) => {
        dispatch({ type: 'DELETE_EVENT', payload: id });
    };

    return (
        <div className="notas-container">
            <Text fontSize="2xl" mb={4}>Lista de Eventos</Text>
             {state.map(event => (
                <div key={event.id} className="notas">
                     <p><strong>ID del Evento:</strong> {event.id}</p>
                    <p><strong>Cliente:</strong> {event.name}</p>
                    <p><strong>Día:</strong> {event.date}</p>
                    <p><strong>Lugar:</strong> {event.place}</p>
                    <p><strong>Cantidad de Personas:</strong> {event.numberOfPeople}</p>
                    <p><strong>Tema:</strong> {event.theme}</p>
                    <div className="buttons">
                        <Button colorScheme="red" onClick={() => handleDelete(event.id)}>Borrar</Button>
                        <Link to={`/edit/${event.id}`}>
                            <Button colorScheme="blue" ml={2}>Editar</Button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EventList;
