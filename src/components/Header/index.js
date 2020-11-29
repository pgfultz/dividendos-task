import { Link } from 'react-router-dom';
import './styles.css';

export default function Header(){
  return(
    <header className="header">
      <h1>Logo</h1>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/notificacoes">Notificações</Link>
        </li>
      </ul>
    </header>
  );
}