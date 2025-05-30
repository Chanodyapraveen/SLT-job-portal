export interface Job {
    id: string;
    title: string;
    company: string;
    description: string;
    location: string;
    salary?: string;
    postedDate: string;
    applyLink: string;
}

export interface JobListResponse {
    jobs: Job[];
    total: number;
    page: number;
    limit: number;
}