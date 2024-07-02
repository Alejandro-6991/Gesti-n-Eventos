import React, { useReducer, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import HomePage from './component/HomePage';
import CreateEvent from './component/CreateEvent';
import EventList from './component/EventList';
import EventDetails from './component/EventDetails';
import Menu from './component/Menu';
import './App.css';


export const EventContext = React.createContext();


function reducer(state, action) {
    switch (action.type) {
        case 'INIT_EVENTS':
            return action.payload;
          case 'CREATE_EVENT':
            return [...state, action.payload];
           case 'GET_EVENTS':
            return state;
        case 'GET_EVENT':
            return state.find(event => event.id === action.payload);
        case 'EDIT_EVENT':
            return state.map(event =>
                event.id === action.payload.id ? action.payload : event
            );
                 case 'DELETE_EVENT':
            return state.filter(event => event.id !== action.payload);
        default:
            return state;
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, []);
    const [nextId, setNextId] = useState(1);

    useEffect(() => {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        dispatch({ type: 'INIT_EVENTS', payload: events });
        if (events.length > 0) {
            const maxId = Math.max(...events.map(event => event.id));
            setNextId(maxId + 1);
        }
    }, []);

     useEffect(() => {
        localStorage.setItem('events', JSON.stringify(state));
    }, [state]);

    return (
          <EventContext.Provider value={{ state, dispatch, nextId, setNextId }}>
            <ChakraProvider>
                <Router>
                    <Menu />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/create" element={<CreateEvent />} />
                        <Route path="/events" element={<EventList />} />
                        <Route path="/event/:id" element={<EventDetails />} />
                        <Route path="/edit/:id" element={<CreateEvent />} />
                    </Routes>
                 </Router>
            </ChakraProvider>
        </EventContext.Provider>
    );
}

export default App;
