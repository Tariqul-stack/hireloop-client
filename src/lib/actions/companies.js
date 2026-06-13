'use server'
import { serverMutation } from "../core/server";

export const createCompany = async (newCompanyData) => {
    return serverMutation('/api/companies', newCompanyData);
}

export const updateCompany = async (id, updatedData) => {
    const res = await fetch(`http://localhost:8000/api/companies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
    });
    return res.json();
}

export const getCompanyByRecruiterId = async (recruiterId) => {
    const res = await fetch(`http://localhost:8000/api/companies?recruiterId=${recruiterId}`);
    return res.json();
}