
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Globe, Users } from "lucide-react";
import { Company } from "@/data/mockData";

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <Card className="card-hover overflow-hidden border border-gray-200">
      <CardContent className="p-0">
        <Link to={`/companies/${company.id}`} className="block p-6">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
              <img 
                src={company.logo} 
                alt={`${company.name} logo`} 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap justify-between gap-2">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {company.name}
                </h3>
                <div className="flex items-center">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {company.industry}
                  </Badge>
                </div>
              </div>
              
              <p className="mt-1 text-sm text-gray-600">{company.description}</p>
              
              <div className="mt-3 flex flex-col sm:flex-row sm:flex-wrap gap-y-1 gap-x-4">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  {company.location}
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  {company.employees} employees
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Globe className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  <a 
                    href={company.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Website
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
