import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './components.module.css';

const Footer = () => {
    // const authState = useSelector((state) => state.auth);
    const { isAuth } = useSelector((state) => state.auth)
    return (
        <>
            <div className={styles.footer}>
                <Link to='/'>
                    <div className={styles.footLink}>
                        <span className={styles.link}>Home</span>
                    </div>
                </Link>
                <Link to='/terms'>
                    <div className={styles.footLink}>
                        <span className={styles.link}>Terms</span>
                    </div>
                </Link>
                <Link to='/privacy'>
                    <div className={styles.footLink}>
                        <span className={styles.link}>Privacy</span>
                    </div>
                </Link>
                <Link to='/faq'>
                    <div className={styles.footLink}>
                        <span className={styles.link}>FAQ</span>
                    </div>
                </Link>
            </div>
            <div className={styles.copyright}>Copyright Stephen Jurgensen</div>
        </>
    )
}

export default Footer