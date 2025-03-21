
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  ArrowLeft,
  Share2,
  Bookmark,
  ExternalLink
} from "lucide-react";
import { Job, jobsData } from "@/data/mockData";

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timeout = setTimeout(() => {
      const foundJob = jobsData.find(j => j.id === id) || null;
      setJob(foundJob);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [id]);

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Map job type to color
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "bg-blue-100 text-blue-800";
      case "Part-time":
        return "bg-purple-100 text-purple-800";
      case "Contract":
        return "bg-amber-100 text-amber-800";
      case "Remote":
        return "bg-green-100 text-green-800";
      case "Freelance":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="page-container flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Job Not Found</h2>
          <p className="text-gray-600 mb-8">The job you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/">Return to Jobs</Link>
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
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img 
                        src={job.logo} 
                        alt={`${job.company} logo`} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl font-semibold text-gray-900">{job.title}</h1>
                      <Link 
                        to={`/companies/${job.companyId}`}
                        className="text-lg text-primary hover:underline"
                      >
                        {job.company}
                      </Link>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Building className="mr-2 h-5 w-5 text-gray-500" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                    <span>Posted on {formatDate(job.postedDate)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="mr-2 h-5 w-5 text-gray-500" />
                    <span>{job.salary}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge className={`${getTypeColor(job.type)}`}>
                    {job.type}
                  </Badge>
                </div>

                <div className="prose max-w-none">
                  <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                  <p className="mb-6">{job.description}</p>
                  
                  <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                  <ul className="space-y-2 list-disc pl-5">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-6">Apply for this position</h2>
                <Button className="w-full mb-4">Apply Now</Button>
                <p className="text-sm text-gray-600 mb-6">
                  This job was posted on {formatDate(job.postedDate)}. Applications will be accepted until the position is filled.
                </p>

                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">About {job.company}</h3>
                  <Link 
                    to={`/companies/${job.companyId}`}
                    className="flex items-center text-primary hover:underline mb-4"
                  >
                    <Building className="mr-2 h-4 w-4" />
                    View Company Profile
                  </Link>
                  <a 
                    href="#" 
                    className="flex items-center text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Company Website
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
