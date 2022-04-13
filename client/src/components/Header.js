import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from 'react-query';
import { logOutApi } from '../api/user';
import {
  HeaderBackColor,
  HeaderNavbar,
  Logo,
  Rightmenu,
} from '../styles/HeaderStyle';
import { LOG_OUT_SUCCESS } from '../reducers/user';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { refetch, status } = useQuery('logout', logOutApi, {
    enabled: false,
  });

  const { me } = useSelector((state) => state.user);

  const handleLogout = async () => {
    await refetch();
    if (status === 'success') {
      dispatch({
        type: LOG_OUT_SUCCESS,
      });
      navigate('/');
    }
  };

  return (
    <HeaderBackColor>
      <HeaderNavbar>
        <Logo>
          <Link className="link-style" to="/">
            <>
              <img className="logo" src="/images/logo1.png" alt="logo" />
              <span className="header-title">dev interview</span>
            </>
          </Link>
        </Logo>
        <Rightmenu>
          <div className="menu">
            {me ? (
              <>
                {' '}
                <div className="dropdown">
                  <span className="user-profile">
                    {me.username} 님 안녕하세요
                  </span>
                  <div className="dropdown-content">
                    <hr />
                    <Link className="link-style" to="/myPage">
                      <button className="toggle-sub" type="button">
                        myPage
                      </button>
                    </Link>
                    <hr />
                    <button
                      className="toggle-sub"
                      type="button"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <ul className="navbar-menu">
                <Link className="link-style" to="/">
                  <li className="menu-btn">HOME</li>
                </Link>
                <Link className="link-style" to="/login">
                  <li className="menu-btn">LOGIN</li>
                </Link>
                <Link className="link-style" to="/signup">
                  <li className="menu-btn">SIGN UP</li>
                </Link>
              </ul>
            )}
          </div>
        </Rightmenu>
      </HeaderNavbar>
    </HeaderBackColor>
  );
}

export default Header;
