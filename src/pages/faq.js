import React, { useState } from 'react'
import { Layout } from '../components/layout'
import styles from './pages.module.css'
import ReCAPTCHA from "react-google-recaptcha";
import { onRegistration } from '../apis/auth/auth';
import { onEmailUnsubscribe } from '../apis/emailList/emailList';
import {Helmet} from "react-helmet";


const Faq = () => {
    const [values, setValues] = useState({ email: '', password: '' });
    const [email, setEmail] = useState({email: ''});
    const [recaptcha, setRecaptcha] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error1, setError1] = useState(false);


    function onReCAPTCHA(value) {
        // console.log("Captcha value:", value);
        setRecaptcha(true);
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        // styles.recaptcha = { dispaly: 'block' }
    }
    const onEmailChange = (e) => {
        setEmail({ ...email, [e.target.name]: e.target.value });
        // styles.recaptcha = { dispaly: 'block' }
    }
    const onEmailSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await onEmailUnsubscribe(email)
            // const response = await onRegistration(values)
            // console.log(response);
            setError1('')
            setSuccess(data.message)
            setEmail('')
            setTimeout(() => {
                setSuccess(false)
            }, "5000");

        } catch (error) {
            // console.log(error);
            // console.log(error.response.data.errors[0].msg);
            // if (error.response.data.errors[0].msg) {
            //     setError1(error.response.data.errors[0].msg)
            //     setTimeout(() => {
            //         setError1(false)
            //     }, "5000");
            // }
            // // if (error.response.data.errors[1].msg !== undefined) {
            //     setError1(error.response.data.errors[0].msg)
            // // }
            setSuccess('')
        }

    }
    return (
        <Layout>

            <div className={styles.page}>
                <h1>FAQ</h1>
                <h3>How do I unsubscribe?</h3>
                <p > Follow these steps:</p>
                <ol>
                    <li>
                        <p>Submit your email below and we will send you an email (if it's on the list).</p>
                        <p>• If you don't get an email, then you are not subscribed.</p>
                    </li>

                    <li>
                        <p>Follow the link in the email.</p>
                        <p>• Check your spam folder if you don't see the email.</p>
                    </li>
                </ol>
                <form onSubmit={(e) => onEmailSubmit(e)} id='unsubscribe' className={styles.newsletter}>
                    <div className={styles.formInputDiv}>
                        <label htmlFor='email' className={'' + styles.formNewsletterLabel + ' ' + styles.warning + ''}>
                            Unsubscribe from newsletter:
                        </label>
                        <input
                            onChange={(e) => onEmailChange(e)}
                            type='email'
                            className={styles.newsletterInput}
                            id='email'
                            name='email'
                            value={email.email}
                            placeholder='Type your email'
                            required
                        />
                    </div>

                    <div className={styles.formInputRecaptcha}>

                        <ReCAPTCHA className={styles.recaptcha}
                            sitekey={process.env.NODE_ENV === 'development'
                                ? "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                : "6Ld000smAAAAADiSZ-7pXODcHNfZkMixqNpq0TFk"}
                            onChange={onReCAPTCHA}
                        />

                    </div>
                    <div className={styles.formInputSubmit}>

                        <button type='submit'
                            className={styles.submitBtn}
                            disabled={!recaptcha}

                        >
                            Submit
                        </button>

                        {success ? <div style={{ color: 'green', margin: '10px 0' }}>{success}</div> : ''}
                        {error1 ? <div style={{ color: 'red', margin: '10px 0' }}>{error1}</div> : ''}
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Faq