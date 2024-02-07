import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './components.module.css';
import logov3 from '../img/logov3.png'

const Navbar = () => {
    // const authState = useSelector((state) => state.auth);
    const { isAuth } = useSelector((state) => state.auth)
    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.container}>
                    <div className={styles.left}>
                        <Link to='/'>
                            <span className={styles.logo}>STEPHEN JURGENSEN</span>
                        </Link>
                    </div>

                    {isAuth ? (
                        <div className={styles.right}>
                           
                            <Link to='/capture' className={styles.link}>
                                <span>CAPTURE</span>
                            </Link>
                            {/* <Link to='/login' className={styles.link}>
                                <span>MENU</span>
                            </Link>
                            <Link to='/search' className={styles.link}>
                                <span>SEARCH</span>
                            </Link> */}
                            <a className={styles.link}>
                                <span>MENU</span>
                            </a>
                            <Link to='/dashboard' className={styles.link}>
                                <span>SEARCH</span>
                            </Link>
                        </div>
                    ) : (
                        <div className={styles.right}>
                            {/* <Link to='/' className={styles.link}>
                                <span>MENU</span>
                            </Link>
                            <Link to='/search' className={styles.link}>
                                <span>SEARCH</span>
                            </Link> */}
                            <a className={styles.link}>
                                <span>MENU</span>
                            </a>
                            <a className={styles.link}>
                                <span>SEARCH</span>
                            </a>
                            {/* <Link to='/register' className={styles.link}>
                                <span>Register</span>
                            </Link> */}
                        </div>
                    )}
                </div>
            </nav>
        </>
    )
}

export default Navbar