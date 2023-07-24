import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom'

export default function LoginFormModal() {

    const dispatch = useDispatch();
    const [credential, setCredential] = useState("")
    const [password, setPassword] = useState("")
    const [validations, setValidations] = useState({ errors: [] })
    const { closeModal } = useModal();

    const history = useHistory()


    //  useEffect(() => {
    //     if ()
    //  }[credential, password])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credential.length < 4 || password.length < 6) {
            return
        }

        dispatch(sessionActions.login({ credential, password })).then(closeModal).catch(
            async (res) => {
                const data = await res.json();
                console.log(data)
                if (data && data.message) {
                    const errors = []
                    for (let error of Object.values(data)) {
                        errors.push(error)
                    }
                    setValidations({ errors: [...errors] })
                };
            }
        );
    }

    const disabled = credential.length < 4 || password.length < 6

    return (
        <div id='log-in'>
            <h1>Log In</h1>
            <form
                id='login-form'
                onSubmit={handleSubmit}>
                {validations.errors && validations.errors.map((error) => {
                    console.log(validations)
                    return <p className='errors'>The provided credentials were invalid.</p>
                })}
                <label
                    className="login-label"
                >Username or E-mail:
                    <input
                        className="login-input"
                        type="text"
                        value={credential}
                        onChange={(e) => {
                            setCredential(e.target.value)
                        }}
                        required
                    ></input>
                </label>

                <label
                    className="login-label">Password:
                    <input
                        className="login-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    ></input>
                </label>

                <button
                    disabled={credential.length < 4 || password.length < 6}
                    className={credential.length < 4 || password.length < 6 ? 'disabled' : 'login-button'}
                    type="submit">Log In</button>

            </form>
            <button
                className='demo-button'
                onClick={() => {
                    dispatch(sessionActions.login({
                        credential: 'smooth@criminal.com', password: 'password'

                    })).then(closeModal)
                }}
            >Log in as Demo User</button>
        </div>
    )
}
