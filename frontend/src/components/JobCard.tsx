import React from 'react';
import Link from 'next/link';
import styles from '../styles/JobCard.module.css'; // Create this new CSS file

interface JobCardProps {
  title: string;
  description: string;
  requirements: string[];
}

const JobCard: React.FC<JobCardProps> = ({ title, description, requirements }) => {
  return (
    <div className={styles.jobCardWrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          {title}
        </div>
        <div className={styles.body}>
          <p>{description}</p>
          <ul>
            {requirements.map((requirement, idx) => (
              <li key={idx}>{requirement}</li>
            ))}
          </ul>
          <Link href={`/apply?jobTitle=${encodeURIComponent(title)}`}>
            <button className={styles.applyBtn}>
              Apply Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;