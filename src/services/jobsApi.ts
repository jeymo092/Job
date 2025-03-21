import axios from 'axios';
import { jobsData } from '@/data/mockData';

// API types
export interface RapidApiJob {
  active_ats_id: string;
  source_url: string;
  title: string;
  company: string;
  location: string;
  text_description: string;
  salary?: string;
  posted_at: string;
  first_seen_at: string;
  last_seen_at?: string;
  company_id?: string;
  company_url?: string;
  company_logo?: string;
}

export interface RapidApiResponse {
  results: RapidApiJob[];
  count: number;
  next: string | null;
  previous: string | null;
}

// Adapted job type to work with our existing components
export interface JobApiResult {
  id: string;
  title: string;
  company: string;
  companyId: string;
  location: string;
  description: string;
  salary: string;
  postedDate: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote" | "Freelance";
  logo: string;
  requirements: string[];
  source_url: string;
}

// API base configuration
const apiClient = axios.create({
  baseURL: 'https://active-jobs-db.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': 'dc3a2f3260msh0a744cd1233f1a2p1def2ejsn248c50c8febb',
    'x-rapidapi-host': 'active-jobs-db.p.rapidapi.com'
  }
});

// Helper function to determine job type from description and title
const inferJobType = (title: string, description: string): "Full-time" | "Part-time" | "Contract" | "Remote" | "Freelance" => {
  const titleLower = title.toLowerCase();
  const descLower = description.toLowerCase();
  
  if (titleLower.includes('remote') || descLower.includes('remote work') || descLower.includes('work from home')) {
    return "Remote";
  } else if (titleLower.includes('contract') || descLower.includes('contract')) {
    return "Contract";
  } else if (titleLower.includes('part-time') || descLower.includes('part time') || descLower.includes('part-time')) {
    return "Part-time";
  } else if (titleLower.includes('freelance') || descLower.includes('freelance')) {
    return "Freelance";
  } else {
    return "Full-time";
  }
};

// Helper function to extract requirements from description
const extractRequirements = (description: string): string[] => {
  const lines = description.split('\n').filter(line => line.trim().length > 0);
  
  const requirementKeywords = ['require', 'qualification', 'skill', 'experience', 'proficien', 'familiar', 'knowledge'];
  
  const requirements = lines.filter(line => {
    const lineLower = line.toLowerCase();
    return requirementKeywords.some(keyword => lineLower.includes(keyword));
  });
  
  if (requirements.length < 2) {
    return [
      "Relevant experience in the field",
      "Strong communication skills",
      "Problem-solving abilities",
      "Team collaboration",
    ];
  }
  
  return requirements.slice(0, 8);
};

// Transform API job to our app's job format
const transformJobData = (job: RapidApiJob): JobApiResult => {
  return {
    id: job.active_ats_id,
    title: job.title,
    company: job.company,
    companyId: job.company_id || job.company.replace(/\s+/g, '-').toLowerCase(),
    location: job.location,
    description: job.text_description,
    salary: job.salary || 'Competitive salary',
    postedDate: job.posted_at,
    type: inferJobType(job.title, job.text_description),
    logo: job.company_logo || '/placeholder.svg',
    requirements: extractRequirements(job.text_description),
    source_url: job.source_url
  };
};

// Convert mock data to JobApiResult format for fallback
const convertMockToApiFormat = (limit = 20, offset = 0, titleFilter = '', locationFilter = ''): JobApiResult[] => {
  return jobsData
    .filter(job => {
      const matchTitle = !titleFilter || job.title.toLowerCase().includes(titleFilter.toLowerCase());
      const matchLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
      return matchTitle && matchLocation;
    })
    .slice(offset, offset + limit)
    .map(job => ({
      id: job.id,
      title: job.title,
      company: job.company,
      companyId: job.companyId,
      location: job.location,
      description: job.description,
      salary: job.salary,
      postedDate: job.postedDate,
      type: job.type,
      logo: job.logo,
      requirements: job.requirements,
      source_url: '#'
    }));
};

// API Endpoints
export const fetchJobs = async (
  period: '7d' | '24h' | '1h' = '7d',
  titleFilter: string = '',
  locationFilter: string = '',
  limit: number = 20,
  offset: number = 0
): Promise<JobApiResult[]> => {
  try {
    const path = `/active-ats-${period}`;
    
    const params: Record<string, string> = {
      limit: limit.toString(),
      offset: offset.toString(),
      description_type: 'text'
    };
    
    if (titleFilter) {
      params.title_filter = `"${titleFilter}"`;
    }
    
    if (locationFilter) {
      params.location_filter = `"${locationFilter}"`;
    }
    
    const response = await apiClient.get<RapidApiResponse>(path, { params });
    
    return response.data.results.map(transformJobData);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    
    console.log('Using mock data as fallback');
    return convertMockToApiFormat(limit, offset, titleFilter, locationFilter);
  }
};

export const fetchExpiredJobs = async (): Promise<JobApiResult[]> => {
  try {
    const response = await apiClient.get<RapidApiResponse>('/active-ats-expired');
    return response.data.results.map(transformJobData);
  } catch (error) {
    console.error('Error fetching expired jobs:', error);
    
    return convertMockToApiFormat(5, 0).map(job => ({
      ...job,
      postedDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
    }));
  }
};
