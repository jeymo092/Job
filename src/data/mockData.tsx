
export interface Job {
  id: string;
  title: string;
  company: string;
  companyId: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote" | "Freelance";
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
  logo: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  industry: string;
  location: string;
  website: string;
  logo: string;
  employees: string;
  founded: string;
  about: string;
}

export const jobsData: Job[] = [
  {
    id: "job1",
    title: "Senior Frontend Developer",
    company: "TechVision",
    companyId: "company1",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    description: "We're looking for a Senior Frontend Developer to join our team and help build intuitive, responsive web applications. You'll work with the latest technologies and be part of an innovative team.",
    requirements: [
      "5+ years of experience with React, TypeScript, and modern frontend frameworks",
      "Strong understanding of web standards and best practices",
      "Experience with responsive design and cross-browser compatibility",
      "Good communication skills and ability to work in a team"
    ],
    postedDate: "2023-05-15",
    logo: "/placeholder.svg"
  },
  {
    id: "job2",
    title: "Backend Engineer",
    company: "DataSphere",
    companyId: "company2",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130,000 - $160,000",
    description: "Join our backend team and help build scalable APIs and services. You'll be working with a modern tech stack and contributing to the architecture of our growing platform.",
    requirements: [
      "4+ years experience with Node.js, Python, or similar backend technologies",
      "Experience with database design and optimization",
      "Knowledge of cloud services (AWS, GCP, or Azure)",
      "Understanding of security best practices"
    ],
    postedDate: "2023-05-20",
    logo: "/placeholder.svg"
  },
  {
    id: "job3",
    title: "UX/UI Designer",
    company: "CreativeMinds",
    companyId: "company3",
    location: "Remote",
    type: "Remote",
    salary: "$90,000 - $120,000",
    description: "We're seeking a talented UX/UI Designer to create beautiful, intuitive interfaces for our products. You'll work closely with product managers and developers to bring ideas to life.",
    requirements: [
      "3+ years of experience in UX/UI design",
      "Proficiency in design tools like Figma or Sketch",
      "Portfolio demonstrating strong visual design skills",
      "Experience conducting user research and usability testing"
    ],
    postedDate: "2023-05-25",
    logo: "/placeholder.svg"
  },
  {
    id: "job4",
    title: "DevOps Engineer",
    company: "TechVision",
    companyId: "company1",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    description: "We're looking for a DevOps Engineer to help automate our infrastructure and improve our CI/CD pipelines. You'll work with cutting-edge technologies and have a direct impact on our product delivery.",
    requirements: [
      "Experience with CI/CD tools like Jenkins, GitLab CI, or GitHub Actions",
      "Knowledge of container technologies (Docker, Kubernetes)",
      "Experience with infrastructure as code (Terraform, CloudFormation)",
      "Understanding of cloud services and architectures"
    ],
    postedDate: "2023-06-01",
    logo: "/placeholder.svg"
  },
  {
    id: "job5",
    title: "Product Manager",
    company: "InnovateHub",
    companyId: "company4",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125,000 - $150,000",
    description: "Join our product team and help shape the future of our platform. You'll work with cross-functional teams to define requirements, plan roadmaps, and deliver successful products.",
    requirements: [
      "3+ years of experience in product management",
      "Strong analytical and problem-solving skills",
      "Excellent communication and stakeholder management abilities",
      "Experience with agile methodologies"
    ],
    postedDate: "2023-06-05",
    logo: "/placeholder.svg"
  },
  {
    id: "job6",
    title: "Mobile Developer",
    company: "AppWorks",
    companyId: "company5",
    location: "Seattle, WA",
    type: "Contract",
    salary: "$100 - $120 per hour",
    description: "We're seeking a skilled Mobile Developer to join our team for a 6-month contract. You'll be responsible for developing and maintaining our iOS and Android applications.",
    requirements: [
      "Experience with React Native or Flutter",
      "Knowledge of native iOS and Android development",
      "Understanding of mobile UI/UX best practices",
      "Experience with RESTful APIs and data integration"
    ],
    postedDate: "2023-06-10",
    logo: "/placeholder.svg"
  },
  {
    id: "job7",
    title: "Data Scientist",
    company: "DataSphere",
    companyId: "company2",
    location: "Remote",
    type: "Remote",
    salary: "$130,000 - $160,000",
    description: "Join our data science team and help extract insights from our vast datasets. You'll develop models, create visualizations, and contribute to data-driven decision making.",
    requirements: [
      "Advanced degree in a quantitative field",
      "Experience with Python, R, and data analysis libraries",
      "Knowledge of machine learning algorithms and techniques",
      "Ability to communicate complex findings to non-technical stakeholders"
    ],
    postedDate: "2023-06-15",
    logo: "/placeholder.svg"
  },
  {
    id: "job8",
    title: "Technical Writer",
    company: "InnovateHub",
    companyId: "company4",
    location: "Chicago, IL",
    type: "Part-time",
    salary: "$50,000 - $70,000",
    description: "We're looking for a Technical Writer to help create clear, concise documentation for our products. You'll work with engineering teams to understand complex concepts and explain them simply.",
    requirements: [
      "Experience writing technical documentation",
      "Strong English language skills",
      "Ability to understand and explain technical concepts",
      "Familiarity with documentation tools and standards"
    ],
    postedDate: "2023-06-20",
    logo: "/placeholder.svg"
  }
];

export const companiesData: Company[] = [
  {
    id: "company1",
    name: "TechVision",
    description: "Building next-generation software solutions",
    industry: "Technology",
    location: "San Francisco, CA",
    website: "https://techvision.example.com",
    logo: "/placeholder.svg",
    employees: "500-1000",
    founded: "2010",
    about: "TechVision is a leading technology company focused on creating innovative software solutions that help businesses transform their operations. With our team of expert engineers and designers, we deliver products that combine cutting-edge technology with intuitive user experiences."
  },
  {
    id: "company2",
    name: "DataSphere",
    description: "Turning data into actionable insights",
    industry: "Data Analytics",
    location: "New York, NY",
    website: "https://datasphere.example.com",
    logo: "/placeholder.svg",
    employees: "250-500",
    founded: "2015",
    about: "DataSphere specializes in data analytics and business intelligence solutions. We help companies make sense of their data and transform it into strategic insights. Our platform combines advanced analytics with easy-to-understand visualizations, enabling data-driven decision making at all levels."
  },
  {
    id: "company3",
    name: "CreativeMinds",
    description: "Where design meets innovation",
    industry: "Design",
    location: "Los Angeles, CA",
    website: "https://creativeminds.example.com",
    logo: "/placeholder.svg",
    employees: "50-100",
    founded: "2018",
    about: "CreativeMinds is a design studio that believes in the power of beautiful, functional design. We work with clients across various industries to create visually stunning and user-friendly digital experiences. Our team combines artistic vision with technical expertise to deliver designs that stand out."
  },
  {
    id: "company4",
    name: "InnovateHub",
    description: "Accelerating digital transformation",
    industry: "Consulting",
    location: "Boston, MA",
    website: "https://innovatehub.example.com",
    logo: "/placeholder.svg",
    employees: "100-250",
    founded: "2012",
    about: "InnovateHub is a digital transformation consultancy that helps organizations adapt and thrive in the digital age. We provide strategic guidance and implementation support across various domains, including technology, operations, and organizational change. Our mission is to empower businesses to innovate and stay ahead of the curve."
  },
  {
    id: "company5",
    name: "AppWorks",
    description: "Crafting exceptional mobile experiences",
    industry: "Mobile Development",
    location: "Seattle, WA",
    website: "https://appworks.example.com",
    logo: "/placeholder.svg",
    employees: "25-50",
    founded: "2016",
    about: "AppWorks specializes in creating premium mobile applications for iOS and Android platforms. Our development team combines technical excellence with a deep understanding of mobile user experience to deliver apps that users love. We work with startups and established companies alike to bring their mobile vision to life."
  }
];
