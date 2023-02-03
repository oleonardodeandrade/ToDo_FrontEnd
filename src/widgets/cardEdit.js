import '../styles/cardEdit.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function CardEdit({
    id,
    titulo,
    conteudo,
    lista
}) {
    const [tituloEdit, setTituloEdit] = useState('');
    const [conteudoEdit, setConteudoEdit] = useState('');
    // 
    useEffect(() => {
        setConteudoEdit(conteudo);
        setTituloEdit(titulo);
    }, []);

    const handleChangeTitulo = (event) => {
        console.log(tituloEdit)
        setTituloEdit(event.target.value);
    };
    const handleChangeConteudo = (event) => {
        setConteudoEdit(event.target.value);
    };

    const alterCard = () => {
        if (tituloEdit === '' || conteudoEdit === '') {
            return;
        }

        const body = {
            titulo: tituloEdit,
            conteudo: conteudoEdit,
            lista: lista
        }
        var token = sessionStorage.getItem('jwtToken');
        axios.put('https://get-todo.onrender.com/cards/' + id, body, {
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
        <div className="cardEdit">
            <form>
                <input type="text" id="username" name="username" placeholder='Titulo' value={tituloEdit} onChange={handleChangeTitulo} />
                {titulo === '' ? <p>O titúlo está vazio</p> : <p></p>}
                <textarea id="story" name="story"
                    rows="5" cols="33" placeholder='Conteúdo' value={conteudoEdit} onChange={handleChangeConteudo}>
                </textarea>
                {conteudo === '' ? <p>O conteúdo está vazio</p> : <p></p>}
                <button class="btn" onClick={alterCard}>Salvar</button>
            </form>

        </div >
    );
}

export default CardEdit;
