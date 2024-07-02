import React, { useState, useContext, useEffect } from 'react';
import { Button, Input } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { EventContext } from '../App';

const CreateEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state, dispatch, nextId, setNextId } = useContext(EventContext);
    const [reservation, setReservation] = useState({
        id: '',
         name: '',
        date: '',
        place: '',
        numberOfPeople: '',
        theme: '',
    });
    const [message, setMessage] = useState('');


    useEffect(() => {
        if (id) {
        const eventToEdit = state.find(event => event.id === parseInt(id));
            if (eventToEdit) {
                setReservation(eventToEdit);
            }
        } else {
            setReservation({
                id: '',
                name: '',
                date: '',
                place: '',
                numberOfPeople: '',
                theme: '',
            });
        }
    }, [id, state]);

    const handleChange = (e) => {
        setReservation({ ...reservation, [e.target.name]: e.target.value });
    };

     const handleSubmit = (e) => {
        e.preventDefault();
        if (
            reservation.name &&
            reservation.date &&
             reservation.place &&
            reservation.numberOfPeople &&
            reservation.theme
        ) {
            if (id) {
                dispatch({ type: 'EDIT_EVENT', payload: reservation });
                setMessage('Editado.');
            } else {
                dispatch({
                    type: 'CREATE_EVENT',
                     payload: { ...reservation, id: nextId },
                });
                setMessage(`Creado: ${nextId}.`);
                setNextId(nextId + 1);
            }
            setReservation({
                id: '',
                name: '',
                date: '',
                 place: '',
                numberOfPeople: '',
                theme: '',
            });
            setTimeout(() => {
                setMessage('');
                navigate('/events');
            }, 3000);
        } else {
            alert('Completa todos los campos.');
        }
    };

    return (
        <div className="notas">
            {message && <div className="message">{message}</div>}
            <form className="datos" onSubmit={handleSubmit}>
                {id && (
                    <label>
                        ID del Evento:
                        <Input name="id" type="text" value={reservation.id} readOnly />
                    </label>
                )}
                <label>
                    Cliente:
                    <Input name="name" type="text" value={reservation.name} onChange={handleChange} />
                </label>
                <label>
                    Día:
                     <Input name="date" type="text" value={reservation.date} onChange={handleChange} />
                </label>
                <label>
                    Lugar:
                    <Input name="place" type="text" value={reservation.place} onChange={handleChange} />
                </label>
                <label>
                    Cantidad de Personas:
                    <Input name="numberOfPeople" type="text" value={reservation.numberOfPeople} onChange={handleChange} />
                 </label>
                <label>
                    Tema:
                    <Input name="theme" type="text" value={reservation.theme} onChange={handleChange} />
                </label>
                <Button colorScheme='blue' type="submit">Guardar</Button>
            </form>
        </div>
    );
};

export default CreateEvent;
