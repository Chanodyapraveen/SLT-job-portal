import React from 'react';
import JobCard from './JobCard';
import { Job } from '../types/job';

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
      {jobs.map((job, idx) => (
        <JobCard requirements={[]} key={idx} {...job} />
      ))}
    </div>
  );
};

export default JobList;