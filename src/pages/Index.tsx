
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import SearchFilters from "@/components/SearchFilters";
import JobCard from "@/components/JobCard";
import CompanyCard from "@/components/CompanyCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Company, companiesData } from "@/data/mockData";
import { JobApiResult, fetchJobs } from "@/services/jobsApi";
import { toast } from "sonner";
import { SearchX } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Index = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [searchFilters, setSearchFilters] = useState({
    query: "",
    location: "",
    jobType: ""
  });
  const [period, setPeriod] = useState<'7d' | '24h' | '1h'>('7d');

  // Fetch jobs using React Query
  const { data: jobs, isLoading, isError, refetch } = useQuery({
    queryKey: ['jobs', period, searchFilters.query, searchFilters.location],
    queryFn: () => fetchJobs(
      period,
      searchFilters.query,
      searchFilters.location,
      20,
      0
    ),
    staleTime: 1000 * 60 * 5, // 5 minutes
    meta: {
      onError: () => {
        toast.error("Failed to load jobs. Please try again.");
      }
    }
  });

  // Filter jobs based on job type
  const filteredJobs = jobs?.filter(job => {
    const matchType = !searchFilters.jobType || 
      searchFilters.jobType === "All Types" ||
      job.type === searchFilters.jobType;
    
    return matchType;
  }) || [];

  // Apply filters to companies (still using mock data for companies)
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(companiesData);
  
  // Apply filters to companies when search filters change
  const handleSearch = (filters: { query: string; location: string; jobType: string }) => {
    setSearchFilters(filters);
    
    // Filter companies based on search query and location
    const filtered = companiesData.filter(company => {
      const matchQuery = !filters.query || 
        company.name.toLowerCase().includes(filters.query.toLowerCase()) || 
        company.industry.toLowerCase().includes(filters.query.toLowerCase());
      
      const matchLocation = !filters.location || 
        filters.location === "All Locations" ||
        company.location.includes(filters.location);
      
      return matchQuery && matchLocation;
    });
    
    setFilteredCompanies(filtered);
  };

  // Change the time period for job listings
  const handlePeriodChange = (newPeriod: '7d' | '24h' | '1h') => {
    setPeriod(newPeriod);
    toast.info(`Showing jobs from the last ${newPeriod === '7d' ? '7 days' : newPeriod === '24h' ? '24 hours' : 'hour'}`);
  };

  // Empty state component for no jobs found
  const NoJobsFound = () => (
    <div className="text-center py-16">
      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <SearchX className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">No jobs found</h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        We couldn't find any jobs matching your criteria. Try adjusting your search filters or check back later.
      </p>
      
      {(searchFilters.query || searchFilters.location || searchFilters.jobType) && (
        <Button variant="outline" className="mr-2" onClick={() => {
          handleSearch({ query: "", location: "", jobType: "" });
        }}>
          Clear Filters
        </Button>
      )}
      
      <Button onClick={() => refetch()}>Try Again</Button>
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="w-full max-w-3xl mx-auto">
      <Alert variant="destructive" className="mb-6">
        <AlertTitle>Error loading jobs</AlertTitle>
        <AlertDescription>
          There was a problem loading job listings. This could be due to network issues or API limitations.
        </AlertDescription>
      </Alert>
      <div className="text-center py-6">
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    </div>
  );

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
            {isLoading ? (
              <div className="space-y-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-white rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 bg-gray-200 rounded"></div>
                      <div className="flex-1">
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : isError ? (
              <ErrorState />
            ) : (
              <>
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Found
                  </h2>
                  <div className="flex gap-2">
                    <Button 
                      variant={period === '7d' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => handlePeriodChange('7d')}
                    >
                      Last 7 Days
                    </Button>
                    <Button 
                      variant={period === '24h' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => handlePeriodChange('24h')}
                    >
                      Last 24 Hours
                    </Button>
                    <Button 
                      variant={period === '1h' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => handlePeriodChange('1h')}
                    >
                      Last Hour
                    </Button>
                  </div>
                </div>
                
                {filteredJobs.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6">
                    {filteredJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                ) : (
                  <NoJobsFound />
                )}
              </>
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
