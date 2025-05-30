import React from 'react';
import Header from '../components/Header';
import JobList from '../components/JobList';
import { fetchJobs } from '../utils/api';

const HomePage = ({ jobs }) => {
    return (
        <div>
            <Header />
            <main>
                <h1>Welcome to the SLT Job Portal</h1>
                <p>Find your dream job today!</p>
                <JobList jobs={jobs} />
            </main>
        </div>
    );
};

export async function getStaticProps() {
    const jobs = await fetchJobs(); // Fetch jobs from the API
    return {
        props: {
            jobs,
        },
    };
}

export default HomePage;