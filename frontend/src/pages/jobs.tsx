import React, { useEffect, useState } from 'react';
import JobList from '../components/JobList';
import { Job } from '../types/job';
import { fetchJobs } from '../utils/api';

const JobsPage: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadJobs = async () => {
            try {
                const jobData = await fetchJobs();
                setJobs(jobData);
            } catch (err) {
                setError('Failed to load jobs');
            } finally {
                setLoading(false);
            }
        };

        loadJobs();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Job Listings</h1>
            <JobList jobs={jobs} />
        </div>
    );
};

export default JobsPage;