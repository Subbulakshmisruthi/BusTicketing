import { Link } from 'react-router-dom';

export default function Nav(){
    return(
        <nav>
            <div className="logo">
                <Link to="/">Book<span>My</span>Bus</Link>
            </div>
            <div className="auth">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </nav>
    )
}