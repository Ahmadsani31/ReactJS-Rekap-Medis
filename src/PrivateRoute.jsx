import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AppContext } from './Context/AppContext'


export default function PrivateRoute({ children }) {
    const { user } = useContext(AppContext);
    return user ? children : <Navigate to="/signin" replace />;

}
