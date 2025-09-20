import { useState } from 'react';
import { Building2, MapPin, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { mockCompanies } from './mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function CompaniesPage() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [assetRange, setAssetRange] = useState('all');

  const regions = ['서울', '경기', '인천', '부산', '대전'];
  const industries = ['바이오기술', '인공지능', '신재생에너지', '반도체', '첨단소재'];

  const filteredCompanies = mockCompanies.filter(company => {
    if (selectedRegion !== 'all' && company.region !== selectedRegion) return false;
    if (selectedIndustry !== 'all' && company.industry !== selectedIndustry) return false;
    return true;
  });

  const regionData = regions.map(region => ({
    name: region,
    count: mockCompanies.filter(c => c.region === region).length,
    totalAssets: mockCompanies
      .filter(c => c.region === region)
      .reduce((sum, c) => sum + parseFloat(c.totalAssets.replace(/[^\d.]/g, '')), 0)
  }));

  const industryData = industries.map(industry => ({
    name: industry,
    count: mockCompanies.filter(c => c.industry === industry).length,
    value: mockCompanies.filter(c => c.industry === industry).length
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const assetRangeData = [
    { range: '1조원 미만', count: mockCompanies.filter(c => parseFloat(c.totalAssets.replace(/[^\d.]/g, '')) < 1).length },
    { range: '1-3조원', count: mockCompanies.filter(c => {
      const assets = parseFloat(c.totalAssets.replace(/[^\d.]/g, ''));
      return assets >= 1 && assets < 3;
    }).length },
    { range: '3조원 이상', count: mockCompanies.filter(c => parseFloat(c.totalAssets.replace(/[^\d.]/g, '')) >= 3).length }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="mb-2">기업 조회</h1>
          <p className="text-muted-foreground">
            지역별, 업종별, 자산규모별 기업 현황을 조회하고 분석합니다
          </p>
        </div>
      </div>

      {/* 필터 섹션 */}
      <Card className="p-6">
        <h3 className="mb-4">조회 필터</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-2">지역</label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 지역</SelectItem>
                {regions.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm mb-2">업종</label>
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 업종</SelectItem>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm mb-2">자산 규모</label>
            <Select value={assetRange} onValueChange={setAssetRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 규모</SelectItem>
                <SelectItem value="under1t">1조원 미만</SelectItem>
                <SelectItem value="1t-3t">1조-3조원</SelectItem>
                <SelectItem value="over3t">3조원 이상</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* 지역별 기업 현황 */}
      <Card className="p-6">
        <h3 className="mb-6">지역별 기업 분포</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="mb-4">지역별 기업 수 & 총자산</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'count' ? `${value}개` : `${value.toFixed(1)}조원`,
                    name === 'count' ? '기업 수' : '총자산'
                  ]} />
                  <Bar dataKey="count" fill="#8884d8" name="count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h4 className="mb-4">대한민국 지도 - 기업 위치</h4>
            <div className="bg-gray-100 rounded-lg p-6 h-64 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                {regions.map(region => (
                  <div 
                    key={region}
                    className="bg-white rounded-lg p-3 text-center shadow-sm border"
                  >
                    <div className="font-medium">{region}</div>
                    <div className="text-sm text-muted-foreground">
                      {mockCompanies.filter(c => c.region === region).length}개 기업
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 업종별 분포 */}
      <Card className="p-6">
        <h3 className="mb-6">업종별 기업 분포</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="mb-4">업종별 비율</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={industryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {industryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h4 className="mb-4">업종별 상세 정보</h4>
            <div className="space-y-3">
              {industryData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.count}개 기업</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* 자산 규모별 분포 */}
      <Card className="p-6">
        <h3 className="mb-6">자산 규모별 기업 분포</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={assetRangeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}개`, '기업 수']} />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 기업 목록 */}
      <Card className="p-6">
        <h3 className="mb-6">
          기업 목록 
          <span className="text-sm text-muted-foreground ml-2">
            ({filteredCompanies.length}개 기업)
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium">{company.name}</h4>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {company.industry}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">총자산</div>
                  <div className="font-semibold text-sm">{company.totalAssets}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="text-muted-foreground">위치</span>
                  </div>
                  <span>{company.location}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    <span className="text-muted-foreground">매출액</span>
                  </div>
                  <span>{company.financials.revenue}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span className="text-muted-foreground">성장률</span>
                  </div>
                  <span className="text-green-600">{company.financials.revenueGrowth}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span className="text-muted-foreground">직원수</span>
                  </div>
                  <span>{company.employeeCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}