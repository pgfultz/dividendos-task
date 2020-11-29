import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import dateFormat from 'dateformat';


import Header from '../../components/Header';

import './styles.css';

export default function Notificacoes(){

  const [notificacoes, setNotificacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function loadData(){
      const token = await localStorage.getItem('token');
      if(token){
        //alert(token);
      }else{
        alert('Sem token');
      }

      axios.get('https://api.dividendos.me/notification', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then( res => {
        setNotificacoes(res.data.value);
        setLoading(false);
      }).catch(err => {
        alert('Ocorreu um erro inesperado!');
      });
    })()
  }, []);

  if(loading){
    return(
      <div className="fundo-carregando">
        <div className="box-carregando">Carregando...</div>
      </div>
    );
  }

  return(
    <>
    <Header />

    <div className="box-notificacoes">
      <h2>Notificacoes</h2>
      <div className="header-notificacoes">
        <div className="side">
          <input type="checkbox" name="mark-all" id="mark-all"/>
          <label htmlFor="mark-all">Selecionar todas</label>
        </div>
        <div className="side j-end">
          <div className="btn-apagar">Apagar</div>
        </div>
      </div>
      {notificacoes && notificacoes.length > 0 && (
        notificacoes.map((notificacao, index) => (
          <div className="notificacao">
            <div className="area-checkbox"><input type="checkbox" /></div>
            <div className="area-middle">
              <h5>{notificacao.title}</h5>
              <p>{notificacao.text}</p>
            </div>
            <div className="area-data">{dateFormat(notificacao.createdDate, "dd/mm/yyyy")} as {dateFormat(notificacao.createdDate, "hh:mm")}</div>
          </div>
        ))
      )}
    </div>
    </>
  );
}