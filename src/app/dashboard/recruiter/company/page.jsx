import React from "react";
import CompanyProfile from "./CompanyProfile";
import { getUserSession } from "@/lib/core/session";
import { getRecruiterCompany } from "@/lib/api/companies";

const CompanyPage = async () => {
  const user = await getUserSession();
  const companies = await getRecruiterCompany(user?.id);

  const company =
    Array.isArray(companies) && companies.length > 0 ? companies[0] : null;

  return (
    <div>
      <CompanyProfile recruiter={user} recruiterCompany={company} />
    </div>
  );
};

export default CompanyPage;
