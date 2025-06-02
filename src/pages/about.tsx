import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/About.module.css';

const AboutPage: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* TopBar */}
      <div className={styles.topbar}>
        <div className={styles.logoContainer}>
          <Image 
            src="/logo.png" 
            alt="SLT Mobitel Logo" 
            width={233} 
            height={81}
            priority
          />
        </div>
        <span className={styles.title}>Training Program</span>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <span className={styles.divider}>|</span>
          <Link href="/about" className={styles.navLink}>About Us</Link>
          <span className={styles.divider}>|</span>
          <Link href="/vacancies" className={styles.navLink}>Vacancies</Link>
          <span className={styles.divider}>|</span>
          <Link href="/login" className={styles.navLink}>Login</Link>
        </nav>
      </div>

      {/* About Us Content */}
      <div className={styles.contentSection}>
        <div className={styles.textContent}>
          <h1 className={styles.aboutHeading}>About Us</h1>
          <p className={styles.aboutDescription}>
            "Welcome to SLT Mobitel, where innovation meets passion. Established with a commitment to [briefly mention your mission or purpose], we strive to [highlight key values or goals]. Our dedicated team of [mention your team's expertise] is driven by a shared vision: [describe the overarching goal or impact]. At SLT Mobitel, we believe in [mention any unique approach or philosophy]. Join us on this exciting journey as we [briefly describe what sets your company apart]."
          </p>
          
          <div className={styles.learnMoreContainer}>
            <button className={styles.learnMoreButton}>Learn more</button>
          </div>
        </div>
        
        <div className={styles.imageContent}>
          <Image
            src="/team-image.jpg"
            alt="Team members"
            width={812}
            height={643}
            className={styles.teamImage}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;