import {useState, useEffect} from 'react';
import './Header.css';
import {useLocation} from 'react-router-dom';
import {Link} from "react-router-dom";
import {useAuth} from "../../auth-context.js";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const {pathname} = useLocation();
    const {logout} = useAuth();
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    const link = role ? (role === 'coach' ? '/coach_profile' : '/profile') : '/'

    // Закрытие меню при смене страницы
    useEffect(() => {
        setMenuOpen(false);
        setTimeout(() => window.scrollTo(0, 0), 0);
    }, [pathname]);

    return (
        <header className="static-header">
            <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
            <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
                {token
                    ? <button onClick={logout} className="logout-button">Выйти</button>
                    : <Link to="/login">Войти</Link>}
            </nav>
            <div className="logo"><Link to={link}>Тренерская</Link></div>
        </header>
    );
}
