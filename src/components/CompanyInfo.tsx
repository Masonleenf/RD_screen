import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Building2, Users, Calendar, MapPin, User, Globe } from 'lucide-react';
import { Company } from './mockData';

interface CompanyInfoProps {
  company: Company;
}

export function CompanyInfo({ company }: CompanyInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          기업 정보
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">업종</span>
            <Badge variant="secondary">{company.industry}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">설립년도</span>
            <span>{company.founded}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">임직원 수</span>
            <span>{company.employeeCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">총 자산</span>
            <span className="font-medium">{company.totalAssets}</span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          연락처 정보
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">대표이사</span>
            <span>{company.ceo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">본사 위치</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {company.location}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">웹사이트</span>
            <span className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              {company.website}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">지역</span>
            <Badge variant="outline">{company.region}</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}