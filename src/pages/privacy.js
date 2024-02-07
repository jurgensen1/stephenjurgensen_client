import React from 'react'
import { Layout } from '../components/layout'
import styles from './pages.module.css'
import {Helmet} from "react-helmet";


const Privacy = () => {
    return (
        <Layout>
            <div className={styles.page}>
                <div><h1> Privacy Policy </h1></div>
                <h2>Who we are</h2>

                <p>Our website address is: https://www.sjurgensen.com</p>

                <h2>Cookies</h2>

                <p>If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.</p>

                <p>If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.</p>

                <p>When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select “Remember Me”, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.</p>

                <h2   >Embedded content from other websites</h2>

                <p><strong ></strong>Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.</p>

                <p>These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.</p>

                <h2>We do not sell your data with</h2>

                <p>We do not sell or share your data. We use your data internally to improve our website and to optimize user exerience.</p>

                <h2>How long we retain your data</h2>

                <p>If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.</p>

                <p>For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.</p>

                <h2>What rights you have over your data</h2>

                <p>If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.</p>
            </div>
        </Layout>
    )
}

export default Privacy