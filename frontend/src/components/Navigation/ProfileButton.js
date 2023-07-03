import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

export default function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!showMenu) return
    const closeMenu = (e) => {
        console.log("CLOSE MENU")
        setShowMenu(false);
      };

      document.addEventListener('click', closeMenu);

      return () => document.removeEventListener("click", closeMenu);
  }, [showMenu])

  const openMenu = () => {
    console.log("OPEN MENU")
    if (showMenu) return;
    setShowMenu(true);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown"  + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && <ul className={ulClassName}>
        <li>{ showMenu && user.username}</li>
        <li>{showMenu && user.firstName} {showMenu && user.lastName}</li>
        <li>{showMenu && user.email}</li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>}

    </>
  );
}
