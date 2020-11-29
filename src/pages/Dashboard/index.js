import { useHistory, Link } from 'react-router-dom';

import Header from '../../components/Header';

export default function DashBoard(){
  const history = useHistory();
  
  function handleLogout(){
    localStorage.removeItem('token');

    history.push('/login');
  }

  return(
    <>
    <Header />

    <div className="box-login">
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Sair</button>
    </div>
    </>
  );
}