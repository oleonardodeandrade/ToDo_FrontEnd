import '../styles/cardNew.css';
import { useState } from 'react';

import axios from 'axios';

function CardNew() {
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');

    const handleChangeTitulo = (event) => {
        setTitulo(event.target.value);
    };
    const handleChangeConteudo = (event) => {
        setConteudo(event.target.value);
    };

    const insertCard = () => {

        const body = {

            titulo: titulo,
            conteudo: conteudo,
            lista: "ToDo"

        }
        var token = sessionStorage.getItem('jwtToken');
        console.log(token);
        axios.post('https://get-todo.onrender.com/cards', body, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },


        }).then((response) => {
            if (response.status === 401) {
                sessionStorage.setItem('jwtToken', null);
            }
        });
    };

    return (
        <div className="card">
            <form>
                <input type="text" id="username" name="username" placeholder='Titulo' value={titulo} onChange={handleChangeTitulo} />
                {titulo === '' ? <p>O titúlo está vazio</p> : <p></p>}
                <textarea id="story" name="story"
                    rows="5" cols="33" placeholder='Conteúdo' value={conteudo} onChange={handleChangeConteudo}>
                </textarea>
                {conteudo === '' ? <p>O conteúdo está vazio</p> : <p></p>}
                <p className='tip'>Dica: Para utilizar o negrito é neccessario colocar o texto entre
                    asterisco como no exemplo: "**teste**".</p>
                <button className="btn" onClick={insertCard}>Salvar</button>
            </form>

        </div >
    );
}

export default CardNew;
