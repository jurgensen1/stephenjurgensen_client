import React, { useState } from 'react'
import { Layout } from '../components/layout'
import styles from './pages.module.css'
import { onRegistration } from '../apis/auth/auth';
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";

const Register = () => {
    const [values, setValues] = useState({ email: '', password: '' });
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [success, setSuccess] = useState(false);
    const [recaptcha, setRecaptcha] = useState(false);


    function onReCAPTCHA(value) {
        // console.log("Captcha value:", value);
        setRecaptcha(true);
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const onSubmit = async (e) => {
        e.preventDefault()


        // grecaptcha.ready(function() {
        //   grecaptcha.execute('reCAPTCHA_site_key', {action: 'submit'}).then(function(token) {
        //       // Add your logic to submit to your backend server here.
        //   });
        // });
        // fetch(`http://localhost:8080'/email`, {
        //     method: 'pOSt',
        //     headers: {
        //       aCcePt: 'aPpliCaTIon/JsOn', 
        //       'cOntENt-type': 'applicAtion/JSoN'
        //     },
        //     body: JSON.stringify({ email: this.email.value })
        //   })
        //   .then(res => res.json())  
        //   .then(data => {

        //     // Everything has come back successfully, time to update the state to 
        //     // reenable the button and stop the <Spinner>. Also, show a toast with a 
        //     // message from the server to give the user feedback and reset the form 
        //     // so the user can start over if she chooses.
        //     this.setState({ sendingEmail: false})
        //     console.log(data.msg)
        //     this.form.reset()
        //   })
        //   .catch(err => console.log(err))

        try {
            const { data } = await onRegistration(values)
            // const response = await onRegistration(values)
            // console.log(response);
            setError1('')
            setError2('')
            setSuccess(data.message)
            setValues({ email: '', password: '' })
            setTimeout(() => {
                setSuccess(false)
            }, "5000");

        } catch (error) {
            // console.log(error);
            // console.log(error.response.data.errors[0].msg);
            if (error.response.data.errors[0].msg) {
                setError1(error.response.data.errors[0].msg)
                setTimeout(() => {
                    setError1(false)
                }, "5000");
            }
            // // if (error.response.data.errors[1].msg !== undefined) {
            //     setError1(error.response.data.errors[0].msg)
            // // }
            setSuccess('')
        }

    }
    return (
        <Layout>
            <form onSubmit={(e) => onSubmit(e)} id='register' className={styles.form}>
                <h1>Register</h1>
                <h3>Registation is currently closed</h3>
                <div>Consider signing up for <Link to='/'>email newsletter.</Link></div>
                
                <div className={styles.formInput}>
                    <label htmlFor='email' className={styles.formLabel}>
                        Email*
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
                        Password*
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
                <div className={styles.formInput}>
                    <div>
                        <input
                            type="checkbox"
                            className={styles.formControlCheck}
                            id='terms'
                            name='terms'
                            required
                        />
                        <label htmlFor='terms' className={styles.formLabel}>
                            Agree to {' '}
                            <Link to='/privacy'>
                                Terms and Conditions
                            </Link>*
                        </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            className={styles.formControlCheck}
                            id='privacy'
                            name='privacy'
                            required
                        />
                        <label htmlFor='privacy' className={styles.formLabel}>
                            Agree to {' '}
                            <Link to='/privacy'>
                                Privacy Policy
                            </Link>*
                        </label>
                    </div>

                </div>
                <div className={styles.formInput}>

                    <ReCAPTCHA
                        sitekey={process.env.NODE_ENV === 'development' 
                        ?  "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" 
                        : "6Ld000smAAAAADiSZ-7pXODcHNfZkMixqNpq0TFk"}
                        onChange={onReCAPTCHA}
                    />
                </div>
                <div className={styles.formSubmit}>

                    <button type='submit'
                        className={styles.submitBtn}
                        disabled={!recaptcha}
                    // onClick={onSubmit1()}
                    >
                        Submit
                    </button>
                </div>
                {success ? <div style={{ color: 'green', margin: '10px 0' }}>{success}</div> : ''}
                {error1 ? <div style={{ color: 'red', margin: '10px 0' }}>{error1}</div> : ''}
                {/* {error2 ? <div style={{ color: 'red', margin: '10px 0' }}>{error2}</div> : ''} */}
            </form>
        </Layout>
    )
}

export default Register