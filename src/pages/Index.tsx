
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SearchFilters from "@/components/SearchFilters";
import JobCard from "@/components/JobCard";
import CompanyCard from "@/components/CompanyCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Job, Company, jobsData, companiesData } from "@/data/mockData";

const Index = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobsData);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(companiesData);
  const [searchFilters, setSearchFilters] = useState({
    query: "",
    location: "",
    jobType: ""
  });

  // Apply filters to jobs
  useEffect(() => {
    const filtered = jobsData.filter(job => {
      const matchQuery = !searchFilters.query || 
        job.title.toLowerCase().includes(searchFilters.query.toLowerCase()) || 
        job.company.toLowerCase().includes(searchFilters.query.toLowerCase());
      
      const matchLocation = !searchFilters.location || 
        searchFilters.location === "All Locations" ||
        job.location.includes(searchFilters.location);
      
      const matchType = !searchFilters.jobType || 
        searchFilters.jobType === "All Types" ||
        job.type === searchFilters.jobType;
      
      return matchQuery && matchLocation && matchType;
    });
    
    setFilteredJobs(filtered);
  }, [searchFilters]);

  // Apply filters to companies
  useEffect(() => {
    const filtered = companiesData.filter(company => {
      const matchQuery = !searchFilters.query || 
        company.name.toLowerCase().includes(searchFilters.query.toLowerCase()) || 
        company.industry.toLowerCase().includes(searchFilters.query.toLowerCase());
      
      const matchLocation = !searchFilters.location || 
        searchFilters.location === "All Locations" ||
        company.location.includes(searchFilters.location);
      
      return matchQuery && matchLocation;
    });
    
    setFilteredCompanies(filtered);
  }, [searchFilters]);

  const handleSearch = (filters: { query: string; location: string; jobType: string }) => {
    setSearchFilters(filters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4 animate-slide-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              Find Your Dream Job Today
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-slide-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              Discover opportunities with top companies and take the next step in your career journey
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto animate-slide-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <SearchFilters onSearch={handleSearch} />
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="page-container pb-24">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
              <TabsTrigger value="companies">Companies</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="jobs" className="space-y-6 animate-fade-in">
            {filteredJobs.length > 0 ? (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Found
                  </h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Most Recent
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-500">Try adjusting your search filters</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="companies" className="space-y-6 animate-fade-in">
            {filteredCompanies.length > 0 ? (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {filteredCompanies.length} Compan{filteredCompanies.length !== 1 ? 'ies' : 'y'} Found
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  {filteredCompanies.map((company) => (
                    <CompanyCard key={company.id} company={company} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
                <p className="text-gray-500">Try adjusting your search filters</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
