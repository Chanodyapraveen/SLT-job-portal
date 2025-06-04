import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/vacancies.module.css';

const VacanciesPage = () => {
  const jobs = [
    {
      id: 1,
      title: "Trainee Network Engineers",
      description: "We are hiring new training network engineers for SLTMobitel, Only an associate degree, a bachelor's degree in computer science, information technology, computer engineering, or a related field undergraduates (3rd year, 4th year), and fresh graduates are proffered.",
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
        "AND",
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
          <Link href="/jobstatus" className={styles.navLink}>Job status</Link>
          <span className={styles.divider}>|</span>
          <Link href="/apply" className={styles.navLink}>Apply for job</Link>
          <span className={styles.divider}>|</span>
          <Link href="/vacancies" className={styles.navLink}>jobs for you</Link>
          <span className={styles.divider}>|</span>
          <Link href="/" className={styles.navLink}>Home</Link>
          <span className={styles.divider}>|</span>
          <Link href="/login" className={styles.navLink}>Login</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <h1 className={styles.mainHeading}>Find Your Job that is prefer for you</h1>
        
        {/* Job Cards */}
        <div className={styles.jobCards}>
          {jobs.map((job, index) => (
            <div key={job.id} className={styles.jobCardWrapper}>
              <div className={styles.card}>
                <div className={styles.header}>
                  {job.title}
                </div>
                <div className={styles.body}>
                  <p>{job.description}</p>
                  <ul>
                    {job.requirements.map((requirement, idx) => (
                      <li key={idx}>{requirement}</li>
                    ))}
                  </ul>
                  <Link href={`/apply?jobTitle=${encodeURIComponent(job.title)}`}>
                    <button className={styles.applyBtn}>
                      Apply Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Status Check Button */}
        <div className={styles.statusCheckContainer}>
          <button 
            className={styles.statusCheckButton} 
            onClick={() => window.location.href = '/jobstatus'}
          >
            Check the Applied Job Status
          </button>
        </div>
      </div>

      <div className={styles.footer}></div>
    </div>
  );
};

export default VacanciesPage;