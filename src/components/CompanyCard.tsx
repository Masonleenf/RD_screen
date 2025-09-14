import { TrendingUp, Building2, Users } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { type Company } from './mockData';

interface CompanyCardProps {
  company: Company;
  onSelect: (company: Company) => void;
}

export function CompanyCard({ company, onSelect }: CompanyCardProps) {
  const topTechnology = company.technologies.reduce((prev, current) => 
    prev.bcRatio > current.bcRatio ? prev : current
  );

  return (
    <Card 
      className="p-6 cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary"
      onClick={() => onSelect(company)}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="mb-2">{company.name}</h3>
          <Badge variant="secondary" className="text-xs">
            {company.industry}
          </Badge>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Market Cap</div>
          <div className="font-semibold">{company.marketCap}</div>
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4" />
            Revenue
          </div>
          <span className="font-medium">{company.financials.revenue}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            R&D Investment
          </div>
          <span className="font-medium">{company.financials.rdInvestment}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            Employees
          </div>
          <span className="font-medium">{company.employeeCount}</span>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Top Technology</span>
          <span className="font-semibold text-primary">{topTechnology.bcRatio.toFixed(1)}x B/C</span>
        </div>
        <div className="text-sm font-medium">{topTechnology.name}</div>
        <div className="text-xs text-muted-foreground mt-1">
          {company.technologies.length} technologies total
        </div>
      </div>
    </Card>
  );
}