'use server'
export const createJob = async (newJobData) => {
    const res = await fetch('http://localhost:8000/api/jobs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJobData)
    });
    return res.json();
}