import React from 'react';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { fetchJobs } from '../utils/api';
import JobCard from '../components/JobCard';

interface Job {
  id: number;
  title: string;
  description: string;
  requirements: string[];
}

const HomePage: React.FC<{ jobs: Job[] }> = ({ jobs }) => {
  return (
    <div className={styles.container}>
      {/* TopBar */}
      <div className={styles.topbar}>
        <div className={styles.logoContainer}>
          <Image 
            src="/logo.png" 
            alt="SLT Mobitel Logo" 
            width={234} 
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

      {/* Hero Image */}
      <div className={styles.heroSection}>
        <div className={styles.heroImgContainer}>
          <Image 
            src="/Banner.png" 
            alt="SLT Digital Network" 
            fill
            priority
            className={styles.heroImage}
          />
        </div>
      </div>

      {/* Job Cards */}
      <div className={styles.jobCards}>
        {jobs.map((job) => (
          <JobCard 
            key={job.id}
            title={job.title}
            description={job.description}
            requirements={job.requirements}
          />
        ))}
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>ABOUT US</h3>
            <ul>
              <li><a href="#">Cooperate Responsibility</a></li>
              <li><a href="#">Investors</a></li>
              <li><a href="#">Media Center</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3>BUSINESS</h3>
            <ul>
              <li><a href="#">Enterprises</a></li>
              <li><a href="#">SME</a></li>
              <li><a href="#">Wholesale</a></li>
              <li><a href="#">International</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3>CONTACT US</h3>
            <p>Sri Lanka Telecom PLC<br />
               Lotus Road, P.O.Box 503,<br />
               Colombo 01, Sri Lanka.<br />
               Telephone: +94 112 021 000<br />
               Email: pr@slt.lk<br />
               (Monday to Friday - 9am to 5pm)</p>
          </div>

          <div className={styles.footerSection}>
            <h3>CUSTOMER SUPPORT</h3>
            <p>Telephone: 1212<br />
               Email: 1212@slt.com.lk<br />
               Self Service: +94 112 12 12 12</p>
          </div>
        </div>

        <div className={styles.footerSocial}>
          <div className={styles.socialIcons}>
            <a href="#"><div className={styles.socialIcon} style={{backgroundImage: 'url(/img_facebook_1.png)'}}></div></a>
            <a href="#"><div className={styles.socialIcon} style={{backgroundImage: 'url(/img_twittersign_1.png)'}}></div></a>
            <a href="#"><div className={styles.socialIcon} style={{backgroundImage: 'url(/img_instagram_1.png)'}}></div></a>
            <a href="#"><div className={styles.socialIcon} style={{backgroundImage: 'url(/img_youtube_1.png)'}}></div></a>
            <a href="#"><div className={styles.socialIcon} style={{backgroundImage: 'url(/img_linkedin_1.png)'}}></div></a>
            <a href="#"><div className={styles.socialIcon} style={{backgroundImage: 'url(/img_tiktok_1.png)'}}></div></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export async function getStaticProps() {
  const jobs = await fetchJobs();
  
  // If we don't have real API data yet, use this mock data
  const mockJobs = [
    {
      id: 1,
      title: "Trainee Network Engineers",
      description: "We are hiring new training network engineers for SLTMobitel. Only an associate degree, a bachelor's degree in computer science, information technology, computer engineering, or a related field undergraduates (3rd year, 4th year), and fresh graduates are proffered.",
      requirements: [
        "No job experiences are needed.",
        "Networking knowledge.",
        "Operating systems knowledge.",
        "Network devices and security knowledge.",
        "Networking device configuration knowledge."
      ]
    },
    {
      id: 2,
      title: "ACCOUNTANT-FINANCIAL ACCOUNTING",
      description: "Sri Lanka Telecom is in search of high caliber, result-oriented and qualified individuals capable of playing a key role in the finance team. You will be engaged in a range of tasks in financial accounting in a highly IT-backed work environment and expected to collaborate with subsidiary companies and cross - functional departments to implement key business drivers and operational controls.",
      requirements: [
        "Associate Membership of ICA/CIMA/ACCA",
        "Preference will be given to the candidates who are prize winners.",
        "Be a resilient leader with excellent interpersonal and communication skills."
      ]
    },
    {
      id: 3,
      title: "ENGINEERS",
      description: "As an Engineer of the pioneering ICT solutions provider, you will be a distinguished members of our team, which is mainly responsible for planning, designing, operating and maintaining our state of the art ICT infrastructure.",
      requirements: [
        "Four-year Degree in BSc Engineering/ Bachelor of Technology from a University/Institute recognized by UGC - Sri Lanka and Institute of Engineers -Sri Lanka, equivalent to SLQF 6. OR Associate Member of the Institute of Engineers, Sri Lanka.",
        "Thorough knowledge and experience in the field of Data Centre Network Security/IDC Storage Systems/ Hybrid Cloud Deployment & Management and the area of IT & Digital Platforms would be a definite advantage."
      ]
    },
    {
      id: 4,
      title: "TECHNICIANS",
      description: "Technicians are mainly responsible in install, maintain and repair electronic communications equipment in telecommunication networks and internet supply systems. Examine telecommunications equipment and systems to find and repair faults.",
      requirements: [
        "06 passes at the G.C.E. (O/L) exam including Sinhala Tamil and English Language and Mathematics and 03 credit passes in one sitting AND",
        "Should have obtained Skilled Competence Certificate -NAITA in the relevant field equivalent to NVQ Level 4 (Telecommunication / Electrical/Electronic/ ICT/Power / Air Conditioning etc)."
      ]
    }
  ];
  
  return {
    props: {
      jobs: jobs || mockJobs,
    },
  };
}

export default HomePage;