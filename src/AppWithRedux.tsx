import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./state/store";
import {Header} from "./components/Header/Header";
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "./components/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {TodoLists} from "./components/TodoLists/TodoLists";
import {authUserTC} from "./state/auth-reduser/auth-reducer";
import { CircularProgress } from '@mui/material';

function AppWithRedux() {
    const isInitialized = useAppSelector(state => state.app.isInitialized);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authUserTC());
    }, [dispatch]);

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className="App">
            <ErrorSnackbar/>
            <Header/>
            <Routes>
                <Route path={'/'} element={<TodoLists />}
                />
                <Route path={'/login'} element={<Login/>} />
                <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>} />
                <Route path={'*'} element={<Navigate to='/404' />} />
            </Routes>
        </div>
    );
}

export default AppWithRedux;
