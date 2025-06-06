import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css'; // Adjust the path as necessary

const Header: React.FC = () => {
    return (
        <header>
            <h1>Slt Job Portal</h1>
            <nav>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/jobs">Jobs</Link>
                    </li>
                    <li>
                        <Link href="/login" className={styles.navLink}>Login</Link>
                    </li>
                    <li>
                        <Link href="/register" className={styles.navLink} style={{ marginLeft: '10px' }}>Register</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;