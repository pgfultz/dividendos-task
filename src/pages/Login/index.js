import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import './styles.css';

export default function Login(){
  const history = useHistory();

  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(token) {
      goToDashBoard();
    }
  }, []);

  function goToDashBoard(){
    history.push('/');
  }

  async function handleLogin(){
    axios.post('https://api.dividendos.me/auth/login', {
        //username => henri@ig.com.br
        //password => 123456
        grant_type: 'password',
        username: login,
        password: senha,
        refresh_token: 'string'
      }).then(async res => {
        const token = res.data.value.token;
        if(token){
          await localStorage.setItem('token', token);

          history.push('/');
        }else{
          alert('Ocorreu um erro ao logar!');
        }
      }).catch(err => {
        const error = err.response.data;
        alert('Login ou senha inválidos!');
      });
  }

  return(
    <div className="box-login">
      <h2>Login</h2>
      <input type="text" name="login" placeholder="Login" value={login} onChange={e => setLogin(e.target.value)} />
      <input type="password" name="senha" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
      <button onClick={handleLogin}>Logar</button>
    </div>
  );
}