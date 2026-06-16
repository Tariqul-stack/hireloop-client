import JobCard from "@/components/JobCard";

const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    description:
      "Build and maintain scalable software systems for a fast-growing tech company.",
    location: "USA",
    jobType: "Full-time",
    minSalary: 25000,
    maxSalary: 35000,
    currency: "USD",
    href: "/jobs/1",
  },
  {
    id: 2,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives.",
    location: "New York, USA",
    jobType: "Hybrid",
    minSalary: 25,
    maxSalary: 40,
    currency: "EUR/hour",
    href: "/jobs/2",
  },
  {
    id: 3,
    title: "Product Designer",
    description:
      "Create user-centered designs for web and mobile products across multiple platforms.",
    location: "Remote",
    jobType: "Full-time",
    minSalary: 3000,
    maxSalary: 5000,
    currency: "USD",
    href: "/jobs/3",
  },
  {
    id: 4,
    title: "Backend Engineer",
    description:
      "Design and implement robust APIs and microservices for enterprise-level applications.",
    location: "San Francisco, USA",
    jobType: "Contract",
    minSalary: 8000,
    maxSalary: 12000,
    currency: "USD",
    href: "/jobs/4",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    description:
      "Manage cloud infrastructure and CI/CD pipelines for high-availability systems.",
    location: "Berlin, Germany",
    jobType: "Full-time",
    minSalary: 5000,
    maxSalary: 8000,
    currency: "EUR",
    href: "/jobs/5",
  },
  {
    id: 6,
    title: "AI Engineer",
    description:
      "Develop and deploy machine learning models and AI-powered features at scale.",
    location: "Remote",
    jobType: "Full-time",
    minSalary: 10000,
    maxSalary: 15000,
    currency: "USD",
    href: "/jobs/6",
  },
];

export default function JobsPage() {
  return (
    <div
      style={{
        backgroundColor: "#0a0a0a",
        minHeight: "100vh",
        padding: "48px 24px",
      }}
    >
      {/* Container */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Heading Section */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "white",
              marginBottom: "8px",
              margin: 0,
              marginBottom: "8px",
            }}
          >
            Browse Jobs
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: "rgba(255, 255, 255, 0.4)",
              margin: 0,
            }}
          >
            Explore curated opportunities from top companies.
          </p>
        </div>

        {/* Jobs Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
