import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProtectedInfo, onLogout } from '../apis/auth/auth'
import { Layout } from '../components/layout'
import { unauthenticateUser } from '../redux/slices/authSlice'
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from 'react-router-dom'
import styles from './pages.module.css'
import {Helmet} from "react-helmet";



const Dashboard = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [protectedData, setProtectedData] = useState(null)

    const logout = async () => {
        try {
            await onLogout();

            dispatch(unauthenticateUser());
            localStorage.removeItem('isAuth');
        } catch (error) {
            //   console.log(error.response)
        }
    }

    const protectedInfo = async () => {
        try {
            const { data } = await fetchProtectedInfo();

            setProtectedData(data.info);

            setLoading(false);
        } catch (error) {
            logout();
        }
    }

    useEffect(() => {
        protectedInfo();
    })
    const [values, setValues] = useState({ email: '', password: '' });
    const [title, setTitle] = useState('');
    const [search, setSearch] = useState('');
    const [type, setType] = useState('idea');
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

        try {
            // const { data } = await onRegistration(values)
            // // const response = await onRegistration(values)
            // // console.log(response);
            // setError1('')
            // setError2('')
            // setSuccess(data.message)
            // setValues({ email: '', password: '' })
            // setTimeout(() => {
            //     setSuccess(false)
            // }, "5000");

        } catch (error) {
            // console.log(error);
            // console.log(error.response.data.errors[0].msg);
            // if (error.response.data.errors[0].msg) {
            //     setError1(error.response.data.errors[0].msg)
            //     setTimeout(() => {
            //         setError1(false)
            //     }, "5000");
            // }
            // // // if (error.response.data.errors[1].msg !== undefined) {
            // //     setError1(error.response.data.errors[0].msg)
            // // // }
            // setSuccess('')
        }

    }

    return loading ? (
        <Layout>
            <h1>Loading...</h1>
        </Layout>
    ) : (
        <div>
            <Layout>
                <div className={styles.page}>
                    <h1>Search Notecards</h1>

                    <button onClick={() => logout()} className={styles.submitBtn}>
                        Logout
                    </button>
                    <form onSubmit={(e) => onSubmit(e)} id='search' className={styles.form}>
                        <div className={styles.formInput}>
                            <label htmlFor='search' className={styles.formLabel}>
                                Search
                            </label>
                            <input
                                onChange={(e) => onChange(e)}
                                type='text'
                                className={styles.formControl}
                                id='search'
                                name='search'
                                value={search}
                                placeholder=''
                                required
                            />

                        </div>

                        <div className={styles.formCheckbox}>
                            <label htmlFor='tags' className={styles.formLabel}>
                                Tags
                            </label>
                            <div className={styles.formCheckboxWrapper}>
                                <input
                                    type='checkbox'
                                    // value={source}
                                    className={styles.formControlCheckInput}
                                    id='source'
                                    name='tags_filter'
                                    placeholder='Type your source'
                                    required
                                />
                                <label
                                    htmlFor='tags_filter'
                                    className={styles.checkBoxLabel}>
                                    Example 1
                                </label>
                            </div>
                            <div className={styles.formCheckboxWrapper}>
                                <input
                                    type='checkbox'
                                    // value={source}
                                    className={styles.formControlCheckInput}
                                    id='source'
                                    name='tags_filter1'
                                    placeholder='Type your source'
                                    required
                                />
                                <label
                                    htmlFor='tags_filter1'
                                    className={styles.checkBoxLabel}>
                                    Example 2
                                </label>
                            </div>
                            <div className={styles.formCheckboxWrapper}>
                                <input
                                    type='checkbox'
                                    // value={source}
                                    className={styles.formControlCheckInput}
                                    id='source'
                                    name='tags_filter2'
                                    placeholder='Type your source'
                                    required
                                />
                                <label
                                    htmlFor='tags_filter2'
                                    className={styles.checkBoxLabel}>
                                    Example 2
                                </label>
                            </div>
                            <div className={styles.formCheckboxWrapper}>
                                <input
                                    type='checkbox'
                                    // value={source}
                                    className={styles.formControlCheckInput}
                                    id='source'
                                    name='tags_filter3'
                                    placeholder='Type your source'
                                    required
                                />
                                <label
                                    htmlFor='tags_filter3'
                                    className={styles.checkBoxLabel}>
                                    Example 3
                                </label>
                            </div>
                        </div>
                        <div className={styles.formCheckbox}>
                            <label htmlFor='tags' className={styles.formLabel}>
                                Type
                            </label>
                            <div className={styles.formCheckboxWrapper}> 
                                <input
                                    type='checkbox'
                                    // value={source}
                                    className={styles.formControlCheckInput}
                                    id='source'
                                    name='book'
                                    placeholder='Type your source'
                                    required
                                />
                                <label
                                    htmlFor='book'
                                    className={styles.checkBoxLabel}>
                                    Book
                                </label>
                            </div>
                            <div className={styles.formCheckboxWrapper}>
                                <input
                                    type='checkbox'
                                    // value={source}
                                    className={styles.formControlCheckInput}
                                    id='source'
                                    name='tags_filter1'
                                    placeholder='Type your source'
                                    required
                                />
                                <label
                                    htmlFor='tags_filter1'
                                    className={styles.checkBoxLabel}>
                                    Article
                                </label>
                            </div>
                            <div className={styles.formCheckboxWrapper}>
                                <input
                                    type='checkbox'
                                    // value={source}
                                    className={styles.formControlCheckInput}
                                    id='source'
                                    name='tags_filter2'
                                    placeholder='Type your source'
                                    required
                                />
                                <label
                                    htmlFor='tags_filter2'
                                    className={styles.checkBoxLabel}>
                                    Webpage
                                </label>
                            </div>
                            <div className={styles.formCheckboxWrapper}>
                                <input
                                    type='checkbox'
                                    // value={source}
                                    className={styles.formControlCheckInput}
                                    id='source'
                                    name='tags_filter3'
                                    placeholder='Type your source'
                                    required
                                />
                                <label
                                    htmlFor='tags_filter3'
                                    className={styles.checkBoxLabel}>
                                    Journal
                                </label>
                            </div>
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
                        <div>RESULTS:</div>
                        <p>{protectedData}</p>

                        {success ? <div style={{ color: 'green', margin: '10px 0' }}>{success}</div> : ''}
                        {error1 ? <div style={{ color: 'red', margin: '10px 0' }}>{error1}</div> : ''}
                        {/* {error2 ? <div style={{ color: 'red', margin: '10px 0' }}>{error2}</div> : ''} */}
                    </form>
                </div>
            </Layout>
        </div>
    )
}

export default Dashboard