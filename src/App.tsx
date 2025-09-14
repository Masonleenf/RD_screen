import { useState } from 'react';
import { Header } from './components/Header';
import { SearchFilters } from './components/SearchFilters';
import { CompanyCard } from './components/CompanyCard';
import { TechnologyDetail } from './components/TechnologyDetail';
import { mockCompanies, type Company, type Technology } from './components/mockData';

export default function App() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedTechnology, setSelectedTechnology] = useState<Technology | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState(mockCompanies);

  const handleSearch = (query: string, filters: any) => {
    setSearchQuery(query);
    let filtered = mockCompanies;
    
    if (query) {
      filtered = filtered.filter(company => 
        company.name.toLowerCase().includes(query.toLowerCase()) ||
        company.industry.toLowerCase().includes(query.toLowerCase()) ||
        company.technologies.some(tech => 
          tech.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
    
    if (filters.industry && filters.industry !== 'all') {
      filtered = filtered.filter(company => company.industry === filters.industry);
    }
    
    if (filters.minBcRatio) {
      filtered = filtered.filter(company => 
        company.technologies.some(tech => tech.bcRatio >= filters.minBcRatio)
      );
    }
    
    setFilteredCompanies(filtered);
  };

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    setSelectedTechnology(null);
  };

  const handleTechnologySelect = (technology: Technology) => {
    setSelectedTechnology(technology);
  };

  const handleBack = () => {
    if (selectedTechnology) {
      setSelectedTechnology(null);
    } else if (selectedCompany) {
      setSelectedCompany(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        {!selectedCompany && !selectedTechnology && (
          <>
            <div className="mb-8">
              <h1 className="mb-2">R&D Earning Screener</h1>
              <p className="text-muted-foreground">
                Technology commercialization search platform powered by NTIS data and verified business performance
              </p>
            </div>
            
            <SearchFilters onSearch={handleSearch} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filteredCompanies.map((company) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  onSelect={handleCompanySelect}
                />
              ))}
            </div>
          </>
        )}

        {selectedCompany && !selectedTechnology && (
          <div>
            <button 
              onClick={handleBack}
              className="mb-6 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              ← Back to Search
            </button>
            
            <div className="bg-white rounded-lg p-6 mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="mb-2">{selectedCompany.name}</h1>
                  <p className="text-muted-foreground">{selectedCompany.industry}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Market Cap</div>
                  <div className="text-lg font-semibold">{selectedCompany.marketCap}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-sm text-muted-foreground">Revenue</div>
                  <div className="font-semibold">{selectedCompany.financials.revenue}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">R&D Investment</div>
                  <div className="font-semibold">{selectedCompany.financials.rdInvestment}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Employee Count</div>
                  <div className="font-semibold">{selectedCompany.employeeCount}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Founded</div>
                  <div className="font-semibold">{selectedCompany.founded}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="mb-6">Technology Portfolio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedCompany.technologies.map((technology) => (
                  <div
                    key={technology.id}
                    onClick={() => handleTechnologySelect(technology)}
                    className="bg-white rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow border"
                  >
                    <h3 className="mb-2">{technology.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{technology.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-muted-foreground">B/C Ratio</div>
                        <div className="font-semibold text-lg">{technology.bcRatio.toFixed(1)}x</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">R&D Investment</div>
                        <div className="font-semibold">{technology.rdCost}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTechnology && (
          <TechnologyDetail
            technology={selectedTechnology}
            company={selectedCompany!}
            onBack={handleBack}
          />
        )}
      </main>
    </div>
  );
}