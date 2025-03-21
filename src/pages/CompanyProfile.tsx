
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Globe,
  Users,
  Calendar,
  ArrowLeft,
  Building,
  Share2,
  Bookmark
} from "lucide-react";
import { companiesData, jobsData, Company, Job } from "@/data/mockData";

const CompanyProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [companyJobs, setCompanyJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timeout = setTimeout(() => {
      const foundCompany = companiesData.find(c => c.id === id) || null;
      setCompany(foundCompany);
      
      if (foundCompany) {
        const jobs = jobsData.filter(job => job.companyId === foundCompany.id);
        setCompanyJobs(jobs);
      }
      
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="page-container flex items-center justify-center h-screen">
          <div className="animate-pulse flex flex-col space-y-4 w-full max-w-3xl">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
            <div className="h-64 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="page-container flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Company Not Found</h2>
          <p className="text-gray-600 mb-8">The company you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/">Return to Companies</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="page-container pt-28">
        <div className="animate-fade-in">
          <Link to="/" className="inline-flex items-center text-primary hover:underline mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Companies
          </Link>

          {/* Company Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="h-24 w-24 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                <img 
                  src={company.logo} 
                  alt={`${company.name} logo`} 
                  className="object-cover w-full h-full"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">{company.name}</h1>
                    <p className="text-lg text-gray-600">{company.description}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button asChild>
                      <a 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Visit Website
                      </a>
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="mr-2 h-5 w-5 text-gray-500" />
                    <span>{company.employees} employees</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                    <span>Founded in {company.founded}</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {company.industry}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="jobs">Open Positions ({companyJobs.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="animate-fade-in">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">About {company.name}</h2>
                <div className="prose max-w-none">
                  <p className="mb-6">{company.about}</p>
                  
                  <h3 className="text-lg font-medium mb-3">Industry</h3>
                  <p className="mb-6">{company.industry}</p>
                  
                  <h3 className="text-lg font-medium mb-3">Company Size</h3>
                  <p className="mb-6">{company.employees} employees</p>
                  
                  <h3 className="text-lg font-medium mb-3">Founded</h3>
                  <p className="mb-6">Established in {company.founded}</p>
                  
                  <h3 className="text-lg font-medium mb-3">Headquarters</h3>
                  <p className="mb-6">{company.location}</p>
                  
                  <h3 className="text-lg font-medium mb-3">Website</h3>
                  <a 
                    href={company.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {company.website}
                  </a>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="jobs" className="animate-fade-in">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-6">Open Positions at {company.name}</h2>
                
                {companyJobs.length > 0 ? (
                  <div className="space-y-6">
                    {companyJobs.map(job => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No open positions</h3>
                    <p className="text-gray-500 mb-6">This company doesn't have any jobs posted at the moment.</p>
                    <Button asChild>
                      <Link to="/">Browse All Jobs</Link>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
