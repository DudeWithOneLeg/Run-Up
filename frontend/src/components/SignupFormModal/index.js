import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import './index.css'

export default function SignupFormModal() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
const { closeModal } = useModal();

  const handleSubmit = (e) => {
    console.log({
      email,
      username,
      firstName,
      lastName,
      password,
    })
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      ).then(() => dispatch(sessionActions.login({ credential: email, password }))).then(closeModal).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          console.log(data)
          return setErrors(data.errors);
        }

        history.push('/')
      });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div id='sign-up-form'>
      <h1>Sign Up</h1>
      <form
      id='sign-up-form-form'
      onSubmit={handleSubmit}>
        <label className="label">
          Email
          <input
          className='signup-input'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

        </label>
        {errors.email && <p className="errors">{errors.email}</p>}
        <label className="label">
          Username
          <input
          className='signup-input'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className="errors">{errors.username}</p>}
        <label className="label">
          First Name
          <input
          className='signup-input'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p className="errors">{errors.firstName}</p>}
        <label className="label">
          Last Name
          <input
          className='signup-input'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p className="errors">{errors.lastName}</p>}
        <label className="label">
          Password
          <input
          className='signup-input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="errors">{errors.password}</p>}
        <label className="label">
          Confirm Password
          <input
          className='signup-input'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className="errors">{errors.confirmPassword}</p>}
        <button
        disabled={!email || !username || !firstName || !lastName || !password || !confirmPassword || username.length < 4 || password.length < 6}
        id={!email || !username || !firstName || !lastName || !password || !confirmPassword || username.length < 4 || password.length < 6 ? 'disabled-signup-button' : 'signup-button'}
        type="submit">Sign Up</button>
      </form>
    </div>
  );
}
