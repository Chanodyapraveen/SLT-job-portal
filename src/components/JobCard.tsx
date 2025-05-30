import React from 'react';
import styles from '../styles/JobCard.module.css';

interface JobCardProps {
    title: string;
    description: string;
    requirements: string[];
    onApply?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ title, description, requirements, onApply }) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h2>{title}</h2>
            </div>
            <div className={styles.body}>
                <p>{description}</p>
                <ul>
                    {requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                    ))}
                </ul>
                <button className={styles.applyBtn} onClick={onApply}>Apply Now</button>
            </div>
        </div>
    );
};

export default JobCard;