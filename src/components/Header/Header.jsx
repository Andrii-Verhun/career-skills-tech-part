import { NavLink } from 'react-router-dom';
import css from './Header.module.css';

export const Header = () => {
    return (
        <header className={css.header}>
            <div className={css.container}>
                <nav className={css.navigation}>
                    <NavLink className={css.navLink} to='/'>Home</NavLink>
                    <NavLink className={css.navLink} to='/tweets' >Tweets</NavLink>
                </nav>
            </div>
        </header>
    );
};