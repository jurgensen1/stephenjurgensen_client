import React, { useEffect, useState } from 'react'
import { Layout } from '../components/layout'
import styles from './pages.module.css'
import { onRegistration } from '../apis/auth/auth';
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useParams } from 'react-router-dom';
import { confirmEmail } from '../apis/emailList/emailList';
import {Helmet} from "react-helmet";

const Subscribe = () => {
    const [values, setValues] = useState({ email: '', password: '' });
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [success, setSuccess] = useState(false);
    const [recaptcha, setRecaptcha] = useState(false);
    let { key } = useParams();


    function onReCAPTCHA(value) {
        // console.log("Captcha value:", value);
        setRecaptcha(true);
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const onSubmit = async (e) => {
        e.preventDefault()

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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await confirmEmail(key);
                console.log("response:");
                setSuccess(response.data.message);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);
    return (
        <Layout>
            <div className={styles.page}>
                {success ? <div style={{ color: 'green', margin: '10px 0' }}>{success}</div> : ''}
                {error1 ? <div style={{ color: 'red', margin: '10px 0' }}>{error1}</div> : ''}
                {/* {error2 ? <div style={{ color: 'red', margin: '10px 0' }}>{error2}</div> : ''} */}
                </div>
        </Layout>
    )
}

export default Subscribe