
import { useState } from "react";
import { 
  Search, 
  MapPin, 
  BriefcaseBusiness, 
  Filter, 
  X,
  ChevronDown 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SearchFiltersProps {
  onSearch: (filters: {
    query: string;
    location: string;
    jobType: string;
  }) => void;
}

const jobTypes = [
  "All Types",
  "Full-time",
  "Part-time",
  "Contract",
  "Remote",
  "Freelance"
];

const locations = [
  "All Locations",
  "San Francisco, CA",
  "New York, NY",
  "Austin, TX",
  "Seattle, WA",
  "Boston, MA",
  "Chicago, IL",
  "Remote"
];

const SearchFilters = ({ onSearch }: SearchFiltersProps) => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleSearch = () => {
    onSearch({ query, location, jobType });
  };

  const clearFilters = () => {
    setQuery("");
    setLocation("");
    setJobType("");
    onSearch({ query: "", location: "", jobType: "" });
  };

  return (
    <div className="w-full">
      {/* Desktop Filters */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
          <div className="md:col-span-5 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Job title, keyword, or company"
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          
          <div className="md:col-span-3 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="pl-10 w-full">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="md:col-span-3 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BriefcaseBusiness className="h-5 w-5 text-gray-400" />
            </div>
            <Select value={jobType} onValueChange={setJobType}>
              <SelectTrigger className="pl-10 w-full">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                {jobTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-1 flex justify-end">
            <Button 
              className="w-full"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>

        {/* Applied filters */}
        {(query || location || jobType) && (
          <div className="px-4 py-2 bg-gray-50 border-t flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {query && (
                <div className="flex items-center bg-white px-2 py-1 rounded text-sm border">
                  <span className="mr-1">{query}</span>
                  <button onClick={() => setQuery("")}>
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {location && location !== "All Locations" && (
                <div className="flex items-center bg-white px-2 py-1 rounded text-sm border">
                  <span className="mr-1">{location}</span>
                  <button onClick={() => setLocation("")}>
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {jobType && jobType !== "All Types" && (
                <div className="flex items-center bg-white px-2 py-1 rounded text-sm border">
                  <span className="mr-1">{jobType}</span>
                  <button onClick={() => setJobType("")}>
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
            <Button variant="link" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Filters */}
      <div className="md:hidden bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search jobs..."
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          
          <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Type</label>
                  <Select value={jobType} onValueChange={setJobType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4 space-y-2">
                  <Button 
                    className="w-full"
                    onClick={() => {
                      handleSearch();
                      setIsMobileFiltersOpen(false);
                    }}
                  >
                    Apply Filters
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      clearFilters();
                      setIsMobileFiltersOpen(false);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Button 
            onClick={() => {
              handleSearch();
            }}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
