import { useDispatch, useSelector } from 'react-redux';

import { useFollowUserMutation } from '../../redux/usersApi';
import { addFollower, removeFollower } from '../../redux/followers/followersSlice';
import { selectFollowers } from '../../redux/followers/selectors';

import PropTypes from 'prop-types';

import css from './UserCard.module.css';

import cardImg from '../../images/card.png';
import cardLogo from '../../images/card-logo.png';

export const UserCard = ({ avatar, name, tweets, followers, id }) => {
    const dispatch = useDispatch();
    const usersFollow = useSelector(selectFollowers);
    const [follow] = useFollowUserMutation();

    const isFollow = (name) => {
        return (
            usersFollow.includes(name)
        );
    };

    const handleButtonFollow = () => {
        follow({ id, patch: { followers: followers + 1 }});
        dispatch(addFollower(name));
    };

    const handleButtonFollowing = () => {
        follow({ id, patch: { followers: followers - 1 }});
        dispatch(removeFollower(name));
    };
    
    const normalizeNumber = (number) => {
        const string = String(number);
        const length = string.length;

        if (length === 6) {
            const start = string.slice(0, 3);
            const end = string.slice(3, 6)
            return (start + ',' + end)
        };

        if (length === 5) {
            const start = string.slice(0, 2);
            const end = string.slice(2, 5)
            return (start + ',' + end)
        };

        if (length === 4) {
            const start = string.slice(0, 1);
            const end = string.slice(1, 4)
            return (start + ',' + end)
        };
    };

    return (
        <div className={css.wrapper}>
            <img className={css.logo} src={cardLogo} alt="Logo" />
            <img className={css.decImg} src={cardImg} alt="Decoration img" />
            <img className={css.avatar} src={avatar} alt="Avatar" />
            <div className={css['wrapper-info']}>
                <p className={css.userInfo}>{name}</p>
                <p className={css.userInfo}>{tweets} Tweets</p>
                <p className={css.userInfo}>{normalizeNumber(followers)} Followers</p>
            </div>
            {(!isFollow(name)) ? (
                <button className={css['button-follow']} type='button' onClick={handleButtonFollow}>Follow</button>
            ) : (
                <button className={css['button-following']} type='button' onClick={handleButtonFollowing}>Following</button>
            )}
        </div>
    );
};

UserCard.propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tweets: PropTypes.number.isRequired,
    followers: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
};