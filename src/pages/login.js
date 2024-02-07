import React, { useState } from 'react'
import { Layout } from '../components/layout'
import styles from './pages.module.css'
import { onLogin } from '../apis/auth/auth';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../redux/slices/authSlice';
import {Helmet} from "react-helmet";

const Login = () => {
    const [values, setValues] = useState({ email: '', password: '', rememberMe: false});
    const [rememberMe, setRememberMe] = useState(false);
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });

    }
    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            await onLogin(values);
            dispatch(authenticateUser());
            localStorage.setItem('isAuth', 'true');
        } catch (error) {
            // console.log(error.response.data.errors[0].msg);
            // setError2(error.response.data.errors[1].msg)
            setError1(error.response.data.errors[0].msg)
            // setSuccess('')
        }
    }
const handleRememberMe = () => {
    if (!values.rememberMe) {
        // setRememberMe(true);
        setValues({ ...values, rememberMe: true });

    } else {
        // setRememberMe(false);
        setValues({ ...values, rememberMe: false });

    }
}

    return (
        <Layout>
            <form onSubmit={(e) => onSubmit(e)} className={styles.form}>
                <h1>Login</h1>

                <div className={styles.formInput}>
                    <label htmlFor='email' className={styles.formLabel}>
                        Email
                    </label>
                    <input
                        onChange={(e) => onChange(e)}
                        type='email'
                        className={styles.formControl}
                        id='email'
                        name='email'
                        value={values.email}
                        placeholder='Type your email'
                        required
                    />
                </div>

                <div className={styles.formInput}>
                    <label htmlFor='password' className={styles.formLabel}>
                        Password
                    </label>
                    <input
                        onChange={(e) => onChange(e)}
                        type='password'
                        value={values.password}
                        className={styles.formControl}
                        id='password'
                        name='password'
                        placeholder='Type your password'
                        required
                    />
                </div>
                <div className={styles.formSubmit}>
                    <button type='submit' className={styles.submitBtn}>
                        Submit
                    </button>
                </div>
                <div className={styles.formInput}>
                    <div>
                        <input
                            type="checkbox"
                            className={styles.formControlCheck}
                            id='rememberMe'
                            name='rememberMe'
                            value={values.rememberMe}
                            onChange={() => {
                                handleRememberMe();
                            }}
                        />
                        <label htmlFor='rememberMe' className={styles.formLabel}>
                            Remember Me
                        </label>
                    </div>
                </div>
                {error1 ? <div style={{ color: 'red', margin: '10px 0' }}>{error1}</div> : ''}
                {error2 ? <div style={{ color: 'red', margin: '10px 0' }}>{error2}</div> : ''}
            </form>
        </Layout>
    )
}

export default Login