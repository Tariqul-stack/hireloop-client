'use server'

import { serverMutation } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';

export const createCompany = async (newCompanyData) => {
    return serverMutation('/api/companies', newCompanyData);
}

export const updateCompany = async (id, updatedData) => {
    const res = await fetch(`${baseUrl}/api/companies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
    });
    return res.json();
}

export const getCompanyByRecruiterId = async (recruiterId) => {
    const res = await fetch(`${baseUrl}/api/companies?recruiterId=${recruiterId}`);
    return res.json();
}