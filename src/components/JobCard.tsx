
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Building, MapPin, Clock } from "lucide-react";
import { Job } from "@/data/mockData";

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  // Calculate time ago
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`;
    } else {
      return `${Math.floor(diffDays / 30)} months ago`;
    }
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

  return (
    <Card className="card-hover overflow-hidden border border-gray-200">
      <CardContent className="p-0">
        <Link to={`/jobs/${job.id}`} className="block p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
              <img 
                src={job.logo} 
                alt={`${job.company} logo`} 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap justify-between gap-2">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {job.title}
                </h3>
                <div className="flex items-center">
                  <Badge variant="outline" className={`${getTypeColor(job.type)}`}>
                    {job.type}
                  </Badge>
                </div>
              </div>
              
              <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap gap-y-1 gap-x-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Building className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  <Link to={`/companies/${job.companyId}`} className="hover:text-primary transition-colors">
                    {job.company}
                  </Link>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  {job.location}
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  {getTimeAgo(job.postedDate)}
                </div>
              </div>
              
              <div className="mt-3">
                <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
              </div>
              
              <div className="mt-3 text-sm font-medium text-gray-900">
                {job.salary}
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default JobCard;
