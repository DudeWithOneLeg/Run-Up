import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import { useModal } from "../../context/Modal";

export default function LoginFormModal() {

    const dispatch = useDispatch();
    const [credential, setCredential] = useState("")
    const [password, setPassword] = useState("")
    const [validations, setValidations] = useState({})
    const { closeModal } = useModal();


    const handleSubmit = (e) => {

        e.preventDefault();
    setValidations({});
     dispatch(sessionActions.login({ credential, password })).then(closeModal).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setValidations(data.errors);
      }
    );
    }

    const demoUser = () => {

    setValidations({});
     dispatch(sessionActions.login({ credential: 'john1@doe.com', password: 'password' })).then(closeModal).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setValidations(data.errors);
      }
    );


    }

    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>Username or E-mail:
                  <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                ></input>
                </label>

                <label>Password:
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                ></input>
                </label>
                {validations.credential && <p>{validations.credential}</p>}
                <button type="submit">Log In</button>
                <button onClick={() => demoUser()}>Demo-User</button>
            </form>

        </div>
    )
}
