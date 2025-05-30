import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Job } from '../../types/job';
import { fetchJobById } from '../../utils/api';

const JobDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const getJob = async () => {
                try {
                    const jobData = await fetchJobById(id as string);
                    setJob(jobData);
                } catch (err) {
                    setError('Failed to fetch job details');
                } finally {
                    setLoading(false);
                }
            };

            getJob();
        }
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!job) return <div>Job not found</div>;

    return (
        <div>
            <h1>{job.title}</h1>
            <h2>{job.company}</h2>
            <p>{job.description}</p>
            <a href={job.applyLink}>Apply Now</a>
        </div>
    );
};

export default JobDetail;