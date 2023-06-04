import { Header } from '../../components/Header/Header';
import { Clock } from '../../components/Clock/Clock';
import css from './Home.module.css';

export const Home = () => {
    return (
        <div className={css.wrapper}>
            <Header />
            <main className={css.main}>
                <h1 className={css.caption}>Welcome to the test task!</h1>
                <Clock />
            </main>
        </div>
    );
};