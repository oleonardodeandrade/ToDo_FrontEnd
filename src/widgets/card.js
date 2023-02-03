import '../styles/card.css';
import axios from 'axios';
import { useState } from 'react';
import CardEdit from './cardEdit';
import DOMPurify from 'dompurify';
import { marked } from 'marked'

function Card({
    id,
    titulo,
    conteudo,
    lista
}) {

    const [edit, setEdit] = useState(false);
    const sanitizedHTML = DOMPurify.sanitize(conteudo);
    const markedHTML = marked(sanitizedHTML);

    const deleteTask = () => {

        var token = sessionStorage.getItem('jwtToken');
        axios.delete('http://localhost:5000/cards/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },


        }).then((response) => {
            if (response.status === 401) {
                sessionStorage.setItem('jwtToken', null);
            }
        });


    }
    const leftPosition = () => {
        if (lista === "Doing") {
            const body = {
                titulo: titulo,
                conteudo: conteudo,
                lista: "ToDo"
            }
            var token = sessionStorage.getItem('jwtToken');
            axios.put('http://localhost:5000/cards/' + id, body, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },


            }).then((response) => {
                if (response.status === 401) {
                    sessionStorage.setItem('jwtToken', null);
                }
            });

        } else {
            const body = {
                titulo: titulo,
                conteudo: conteudo,
                lista: "Doing"
            }
            var token = sessionStorage.getItem('jwtToken');
            axios.put('http://localhost:5000/cards/' + id, body, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },


            }).then((response) => {
                if (response.status === 401) {
                    sessionStorage.setItem('jwtToken', null);
                }
            });
        }
    }
    const RightPosition = () => {
        if (lista === "ToDo") {
            const body = {
                titulo: titulo,
                conteudo: conteudo,
                lista: "Doing"
            }
            var token = sessionStorage.getItem('jwtToken');
            axios.put('http://localhost:5000/cards/' + id, body, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },


            }).then((response) => {
                if (response.status === 401) {
                    sessionStorage.setItem('jwtToken', null);
                }
            });

        } else {
            const body = {
                titulo: titulo,
                conteudo: conteudo,
                lista: "Done"
            }
            var token = sessionStorage.getItem('jwtToken');
            axios.put('http://localhost:5000/cards/' + id, body, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },


            }).then((response) => {
                if (response.status === 401) {
                    sessionStorage.setItem('jwtToken', null);
                }
            });
        }



    }
    const typeCard = () => {
        if (edit === false) {
            setEdit(true);
        } else {
            setEdit(false);
        }
    }
    if (edit === true) {
        return (
            <div>
                <button className="btnClose" onClick={typeCard}><i class="fa fa-close"></i></button>
                <CardEdit id={id} titulo={titulo} conteudo={conteudo} lista={lista} />
            </div>
        );
    }
    return (

        <div className="cardTask">

            <form>

                {
                    lista === "ToDo" ? <div className='listRed' ></div> : null
                }
                {
                    lista === "Doing" ? <div className='listYellow' ></div> : null
                }
                {
                    lista === "Done" ? <div className='listGreen' ></div> : null
                }


                <div className="title">
                    <h2 className='titleText'>{titulo}</h2>
                    <button class="btn" onClick={typeCard}><i class="fa fa-edit"></i></button>
                </div>
                <div dangerouslySetInnerHTML={{ __html: markedHTML }} />

                <div className="functionDiv">
                    {
                        lista === "ToDo" ? <button class="btn" disabled><i class="fa fa-angle-left"></i></button> : <button class="btn" onClick={leftPosition}><i class="fa fa-angle-left"></i></button>
                    }

                    <button class="btn" onClick={deleteTask}><i class="fa fa-trash"></i></button>
                    {
                        lista === "Done" ? <button class="btn" disabled><i class="fa fa-angle-right"></i></button> : <button class="btn" onClick={RightPosition}><i class="fa fa-angle-right"></i></button>
                    }

                </div>

            </form>


        </div>
    );
}

export default Card;
