import { useState } from 'react';

import { useGetUsersQuery } from '../../redux/usersApi';
import { selectFollowers } from '../../redux/followers/selectors';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { Header } from '../../components/Header/Header';
import { UserCard } from '../../components/UserCard/UserCard';
import css from './Tweets.module.css';
import { useSelector } from 'react-redux';

export const Tweets = () => {
    const [limit, setLimit] = useState(3);
    const [filter, setFilter] = useState('All');
    const { data } = useGetUsersQuery(limit);
    const follower = useSelector(selectFollowers);

    const handleLoadMore = () => {
        setLimit(limit + 3);
    };

    const options = ['All', 'Follow', 'Followings'];
    const defaultOption = options[0];

    const handleChange = (e) => {
        setFilter(e.value)
    };

    const filterData = (data || []).filter((el) => {
        if (filter === 'Follow') {
            return !follower.includes(el.user);
        };
        if (filter === 'Followings') {
            return follower.includes(el.user);
        };
        return true;
    });

    return (
        <>
            <Header />
            <main>
                <div className={css.container}>
                    <Dropdown
                        className={css.dropdown}
                        controlClassName={css.controlDropdown}
                        menuClassName={css.menuDropdown}
                        placeholderClassName={css.placeholderDropdown}
                        options={options}
                        onChange={handleChange}
                        value={defaultOption}
                        placeholder="Select an option" />
                    {data && filterData.map((el) => (
                        <UserCard
                            key={el.id}
                            id={el.id}
                            avatar={el.avatar}
                            name={el.user}
                            tweets={el.tweets}
                            followers={el.followers}
                        />))}
                </div>
                {data && !(data.length === 12) && (
                    <button
                        className={css.button}
                        type='button'
                        onClick={handleLoadMore}>
                        Load more
                    </button>)}
            </main>
        </>
    );
};