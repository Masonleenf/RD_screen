import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';

interface SearchFiltersProps {
  onSearch: (query: string, filters: any) => void;
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    industry: 'all',
    minBcRatio: '',
    fundingStage: 'all',
    rdRange: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    onSearch(query, filters);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch(query, newFilters);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search companies, technologies, or industries..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch}>Search</Button>
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>
      
      {showFilters && (
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm mb-2">Industry</label>
              <Select value={filters.industry} onValueChange={(value) => handleFilterChange('industry', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="Biotechnology">Biotechnology</SelectItem>
                  <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                  <SelectItem value="Renewable Energy">Renewable Energy</SelectItem>
                  <SelectItem value="Semiconductor">Semiconductor</SelectItem>
                  <SelectItem value="Advanced Materials">Advanced Materials</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm mb-2">Min B/C Ratio</label>
              <Select value={filters.minBcRatio} onValueChange={(value) => handleFilterChange('minBcRatio', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Any ratio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any ratio</SelectItem>
                  <SelectItem value="2">2.0x+</SelectItem>
                  <SelectItem value="3">3.0x+</SelectItem>
                  <SelectItem value="5">5.0x+</SelectItem>
                  <SelectItem value="10">10.0x+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm mb-2">R&D Investment</label>
              <Select value={filters.rdRange} onValueChange={(value) => handleFilterChange('rdRange', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ranges</SelectItem>
                  <SelectItem value="0-1B">Under ₩1B</SelectItem>
                  <SelectItem value="1B-5B">₩1B - ₩5B</SelectItem>
                  <SelectItem value="5B-10B">₩5B - ₩10B</SelectItem>
                  <SelectItem value="10B+">₩10B+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm mb-2">Funding Stage</label>
              <Select value={filters.fundingStage} onValueChange={(value) => handleFilterChange('fundingStage', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="seed">Seed</SelectItem>
                  <SelectItem value="series-a">Series A</SelectItem>
                  <SelectItem value="series-b">Series B</SelectItem>
                  <SelectItem value="growth">Growth</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}