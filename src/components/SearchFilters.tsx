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
            placeholder="기업명, 기술명, 또는 업종으로 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch}>검색</Button>

      </div>
      
      {showFilters && (
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm mb-2">업종</label>
              <Select value={filters.industry} onValueChange={(value) => handleFilterChange('industry', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 업종</SelectItem>
                  <SelectItem value="바이오기술">바이오기술</SelectItem>
                  <SelectItem value="인공지능">인공지능</SelectItem>
                  <SelectItem value="신재생에너지">신재생에너지</SelectItem>
                  <SelectItem value="반도체">반도체</SelectItem>
                  <SelectItem value="첨단소재">첨단소재</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm mb-2">최소 B/C 비율</label>
              <Select value={filters.minBcRatio} onValueChange={(value) => handleFilterChange('minBcRatio', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="전체 비율" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">전체 비율</SelectItem>
                  <SelectItem value="2">2.0배 이상</SelectItem>
                  <SelectItem value="3">3.0배 이상</SelectItem>
                  <SelectItem value="5">5.0배 이상</SelectItem>
                  <SelectItem value="10">10.0배 이상</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm mb-2">R&D 투자규모</label>
              <Select value={filters.rdRange} onValueChange={(value) => handleFilterChange('rdRange', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 규모</SelectItem>
                  <SelectItem value="0-1B">10억원 미만</SelectItem>
                  <SelectItem value="1B-5B">10억 - 50억원</SelectItem>
                  <SelectItem value="5B-10B">50억 - 100억원</SelectItem>
                  <SelectItem value="10B+">100억원 이상</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm mb-2">투자단계</label>
              <Select value={filters.fundingStage} onValueChange={(value) => handleFilterChange('fundingStage', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 단계</SelectItem>
                  <SelectItem value="seed">시드</SelectItem>
                  <SelectItem value="series-a">시리즈 A</SelectItem>
                  <SelectItem value="series-b">시리즈 B</SelectItem>
                  <SelectItem value="growth">성장</SelectItem>
                  <SelectItem value="public">상장</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}