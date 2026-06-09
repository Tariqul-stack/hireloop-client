

const baseURL = 'http://localhost:8000';
export const getCompanyJobs = async(companyId, status = 'active') => {
        const res = await fetch (`${baseURL}/api/jobs?companyId=${companyId}&status=${status}`);
        return res.json();
    }
