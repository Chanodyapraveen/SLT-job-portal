import React from 'react';
import styles from '../styles/JobCard.module.css';

interface JobCardProps {
  title: string;
  description: string;
  requirements: string[];
}

const JobCard: React.FC<JobCardProps> = ({ title, description, requirements }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {title}
      </div>
      <div className={styles.body}>
        <p>{description}</p>
        <ul>
          {requirements.map((requirement, index) => (
            <li key={index}>{requirement}</li>
          ))}
        </ul>
        <button className={styles.applyBtn}>Apply Now</button>
      </div>
    </div>
  );
};

export default JobCard;