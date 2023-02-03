import '../styles/home.css';
import CardNew from '../widgets/cardNew';
import Card from '../widgets/card';
import React, { useState, useEffect } from 'react';
import Login from './login';
import axios from 'axios';

function Home() {
    const [cardToDo, setcardToDo] = useState([]);
    const [cardDoing, setcardDoing] = useState([]);
    const [cardDone, setcardDone] = useState([]);
    var listTodo = [];
    var listDoing = [];
    var listDone = [];
    useEffect(() => {

        setcardToDo([]);
        setcardDoing([]);
        setcardDone([]);
        var token = sessionStorage.getItem('jwtToken');
        axios.get('https://get-todo.onrender.com/cards', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },


        }).then((response) => {
            if (response.status === 401) {
                sessionStorage.setItem('jwtToken', null);
            } else {
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].lista === "ToDo") {
                        listTodo.push(response.data[i]);
                    } else if (response.data[i].lista === "Doing") {
                        listDoing.push(response.data[i]);
                    } else if (response.data[i].lista === "Done") {
                        listDone.push(response.data[i]);
                    }
                }
                setcardToDo(listTodo);
                setcardDoing(listDoing);
                setcardDone(listDone);
            }
        });
    }, []);
    const isLoggedIn = () => {
        const jwt = sessionStorage.getItem('jwtToken');
        return !!jwt;
    };
    if (isLoggedIn()) {
        return (
            <div className="kanban">
                <div className='new'>
                    <h1>Novo</h1>
                    <CardNew />
                </div>
                <div className='divider'></div>
                <div className='toDo'>
                    <h1>To Do</h1>
                    {cardToDo.map(item => (
                        <Card key={item.id} id={item.id} titulo={item.titulo} conteudo={item.conteudo} lista={item.lista} />
                    ))}
                </div>
                <div className='divider'></div>
                <div className='doing'>
                    <h1>Doing</h1>
                    {cardDoing.map(item => (
                        <Card key={item.id} id={item.id} titulo={item.titulo} conteudo={item.conteudo} lista={item.lista} />
                    ))}
                </div>
                <div className='divider'></div>
                <div className='done'>
                    <h1>Done</h1>
                    {cardDone.map((item, idx) => (
                        <Card key={idx} id={item.id} titulo={item.titulo} conteudo={item.conteudo} lista={item.lista} />
                    ))}
                </div>

            </div>
        );
    } else {
        return (
            <Login />
        );

    }

}

export default Home;
