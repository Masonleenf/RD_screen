import { useState } from 'react';
import { Header } from './components/Header';
import { SearchFilters } from './components/SearchFilters';
import { CompanyCard } from './components/CompanyCard';
import { TechnologyDetail } from './components/TechnologyDetail';
import { CompaniesPage } from './components/CompaniesPage';
import { TechnologiesPage } from './components/TechnologiesPage';
import { AnalyticsPage } from './components/AnalyticsPage';
import { CompanyInfo } from './components/CompanyInfo';
import { FinancialChart } from './components/FinancialChart';
import { FinancialTable } from './components/FinancialTable';
import { TechnologyList } from './components/TechnologyList';
import { mockCompanies, type Company, type Technology } from './components/mockData';

type PageType = 'dashboard' | 'companies' | 'technologies' | 'analytics';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
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
    
    // Find the company that owns this technology
    const ownerCompany = mockCompanies.find(company => 
      company.technologies.some(tech => tech.id === technology.id)
    );
    
    if (ownerCompany) {
      setSelectedCompany(ownerCompany);
    }
  };

  const handleBack = () => {
    if (selectedTechnology) {
      setSelectedTechnology(null);
    } else if (selectedCompany) {
      setSelectedCompany(null);
    }
  };

  const renderDashboard = () => (
    <>
      <div className="mb-8">
        <h1 className="mb-2">BlackTutle</h1>
        <p className="text-muted-foreground">
          NTIS 데이터와 검증된 사업성과를 기반으로 한 기술 사업화 검색 플랫폼
        </p>
      </div>
      
      <SearchFilters onSearch={handleSearch} />
      
      {searchQuery && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onSelect={handleCompanySelect}
            />
          ))}
        </div>
      )}
      
      {searchQuery && filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">검색 결과가 없습니다.</p>
        </div>
      )}
    </>
  );

  const renderCompanyDetail = () => {
    if (!selectedCompany) return null;
    
    return currentPage === 'dashboard' ? (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2">{selectedCompany.name}</h1>
            <p className="text-muted-foreground">{selectedCompany.industry} | {selectedCompany.location}</p>
          </div>
          <button 
            onClick={handleBack}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            뒤로 가기
          </button>
        </div>

        {/* Company Basic Info */}
        <CompanyInfo company={selectedCompany} />

        {/* Financial Chart */}
        <FinancialChart data={selectedCompany.financialHistory} />

        {/* Financial Table */}
        <FinancialTable data={selectedCompany.financialHistory} />

        {/* Technology List */}
        <TechnologyList 
          technologies={selectedCompany.technologies}
          onTechnologySelect={handleTechnologySelect}
        />
      </div>
    ) : null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        {currentPage === 'dashboard' && !selectedCompany && !selectedTechnology && renderDashboard()}
        {currentPage === 'companies' && !selectedTechnology && <CompaniesPage />}
        {currentPage === 'technologies' && !selectedTechnology && <TechnologiesPage onTechnologySelect={handleTechnologySelect} />}
        {currentPage === 'analytics' && !selectedTechnology && <AnalyticsPage />}
        {selectedCompany && !selectedTechnology && currentPage === 'dashboard' && renderCompanyDetail()}
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