import { useState } from 'react';
import { TrendingUp, Award, BarChart3, Target } from 'lucide-react';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { mockCompanies } from './mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ComposedChart, Area, AreaChart } from 'recharts';

export function AnalyticsPage() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMetric, setSelectedMetric] = useState('bcRatio');

  // 모든 기술 데이터 수집
  const allTechnologies = mockCompanies.flatMap(company => 
    company.technologies.map(tech => ({
      ...tech,
      companyName: company.name,
      companyRegion: company.region,
      companyIndustry: company.industry,
      totalAssets: company.totalAssets
    }))
  );

  const categories = [...new Set(allTechnologies.map(tech => tech.category))];

  // 기술분야별 B/C 비율 분석
  const bcRatioByCategory = categories.map(category => {
    const categoryTechs = allTechnologies.filter(tech => tech.category === category);
    return {
      category,
      avgBcRatio: categoryTechs.reduce((sum, tech) => sum + tech.bcRatio, 0) / categoryTechs.length,
      maxBcRatio: Math.max(...categoryTechs.map(tech => tech.bcRatio)),
      count: categoryTechs.length,
      totalInvestment: categoryTechs.reduce((sum, tech) => sum + parseFloat(tech.rdCost.replace(/[^\d]/g, '')), 0)
    };
  }).sort((a, b) => b.avgBcRatio - a.avgBcRatio);

  // 연도별 사업화 실적 시뮬레이션 데이터
  const yearlyPerformance = [
    { year: '2020', technologies: 8, totalInvestment: 120, totalRevenue: 280, avgBcRatio: 2.3 },
    { year: '2021', technologies: 12, totalInvestment: 185, totalRevenue: 520, avgBcRatio: 2.8 },
    { year: '2022', technologies: 15, totalInvestment: 240, totalRevenue: 890, avgBcRatio: 3.7 },
    { year: '2023', technologies: 18, totalInvestment: 310, totalRevenue: 1250, avgBcRatio: 4.0 },
    { year: '2024', technologies: 22, totalInvestment: 420, totalRevenue: 1980, avgBcRatio: 4.7 }
  ];

  // 상위 기술 기업 랭킹
  const topCompanies = mockCompanies.map(company => ({
    name: company.name,
    industry: company.industry,
    region: company.region,
    totalAssets: company.totalAssets,
    avgBcRatio: company.technologies.reduce((sum, tech) => sum + tech.bcRatio, 0) / company.technologies.length,
    totalTechnologies: company.technologies.length,
    totalRdInvestment: company.technologies.reduce((sum, tech) => sum + parseFloat(tech.rdCost.replace(/[^\d]/g, '')), 0),
    revenueGrowth: parseFloat(company.financials.revenueGrowth.replace(/[^\d.]/g, ''))
  })).sort((a, b) => b.avgBcRatio - a.avgBcRatio);

  // 지역별 기술혁신 지수
  const regions = ['서울', '경기', '인천', '부산', '대전'];
  const regionalInnovation = regions.map(region => {
    const regionCompanies = mockCompanies.filter(c => c.region === region);
    const regionTechnologies = regionCompanies.flatMap(c => c.technologies);
    
    return {
      region,
      companies: regionCompanies.length,
      technologies: regionTechnologies.length,
      avgBcRatio: regionTechnologies.length > 0 ? 
        regionTechnologies.reduce((sum, tech) => sum + tech.bcRatio, 0) / regionTechnologies.length : 0,
      totalInvestment: regionTechnologies.reduce((sum, tech) => sum + parseFloat(tech.rdCost.replace(/[^\d]/g, '')), 0),
      innovationIndex: regionTechnologies.length > 0 ? 
        (regionTechnologies.reduce((sum, tech) => sum + tech.bcRatio, 0) / regionTechnologies.length) * 
        Math.log(regionTechnologies.length + 1) : 0
    };
  }).sort((a, b) => b.innovationIndex - a.innovationIndex);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="mb-2">분석 리포트</h1>
          <p className="text-muted-foreground">
            기술분야별 성과 분석과 사업화 트렌드를 제공합니다
          </p>
        </div>
      </div>

      {/* 주요 지표 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">총 등록기술</div>
              <div className="text-2xl font-bold">{allTechnologies.length}개</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">평균 B/C 비율</div>
              <div className="text-2xl font-bold">
                {(allTechnologies.reduce((sum, tech) => sum + tech.bcRatio, 0) / allTechnologies.length).toFixed(1)}x
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">사업화 성공률</div>
              <div className="text-2xl font-bold">
                {((allTechnologies.filter(t => t.commercializationStatus === 'verified').length / allTechnologies.length) * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Award className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">최고 B/C 비율</div>
              <div className="text-2xl font-bold">
                {Math.max(...allTechnologies.map(tech => tech.bcRatio)).toFixed(1)}x
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 기술분야별 B/C 비율 막대그래프 */}
      <Card className="p-6">
        <h3 className="mb-6">기술분야별 B/C 비율 분석</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bcRatioByCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="category" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis 
                label={{ value: '비율 (배수)', angle: -90, position: 'insideLeft' }}
                tickFormatter={(value) => `${value.toFixed(1)}x`}
              />
              <Tooltip 
                formatter={(value, name) => [
                  `${Number(value).toFixed(1)}x`,
                  name === 'avgBcRatio' ? '평균 B/C 비율' : 
                  name === 'maxBcRatio' ? '최고 B/C 비율' : name
                ]}
                labelFormatter={(label) => `산업: ${label}`}
              />
              <Bar dataKey="avgBcRatio" fill="var(--chart-1)" name="avgBcRatio" radius={[4, 4, 0, 0]} />
              <Bar dataKey="maxBcRatio" fill="var(--chart-2)" name="maxBcRatio" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 연도별 사업화 실적 */}
      <Card className="p-6">
        <h3 className="mb-6">연도별 사업화 실적 트렌드</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={yearlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'technologies' ? `${value}개` :
                  name === 'totalInvestment' ? `₩${value}억` :
                  name === 'totalRevenue' ? `₩${value}억` :
                  `${value}x`,
                  name === 'technologies' ? '기술 수' :
                  name === 'totalInvestment' ? 'R&D 투자' :
                  name === 'totalRevenue' ? '사업화 매출' :
                  '평균 B/C 비율'
                ]}
              />
              <Area yAxisId="left" type="monotone" dataKey="totalInvestment" fill="#8884d8" fillOpacity={0.3} />
              <Area yAxisId="left" type="monotone" dataKey="totalRevenue" fill="#82ca9d" fillOpacity={0.3} />
              <Line yAxisId="right" type="monotone" dataKey="avgBcRatio" stroke="#ff7300" strokeWidth={3} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 상위 기술기업 랭킹 */}
      <Card className="p-6">
        <h3 className="mb-6">상위 기술기업 랭킹 (B/C 비율 기준)</h3>
        <div className="space-y-4">
          {topCompanies.slice(0, 8).map((company, index) => (
            <div key={company.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">{index + 1}</span>
                </div>
                <div>
                  <h4 className="font-medium">{company.name}</h4>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">{company.industry}</Badge>
                    <Badge variant="outline" className="text-xs">{company.region}</Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-6 text-right">
                <div>
                  <div className="text-sm text-muted-foreground">평균 B/C</div>
                  <div className="font-semibold text-lg text-primary">{company.avgBcRatio.toFixed(1)}x</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">보유기술</div>
                  <div className="font-semibold">{company.totalTechnologies}개</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">총자산</div>
                  <div className="font-semibold">{company.totalAssets}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">매출성장률</div>
                  <div className="font-semibold text-green-600">+{company.revenueGrowth}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 지역별 기술혁신 지수 */}
      <Card className="p-6">
        <h3 className="mb-6">지역별 기술혁신 지수</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="mb-4">혁신지수 순위</h4>
            <div className="space-y-3">
              {regionalInnovation.map((region, index) => (
                <div key={region.region} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-xs">{index + 1}</span>
                    </div>
                    <div>
                      <span className="font-medium">{region.region}</span>
                      <div className="text-xs text-muted-foreground">
                        {region.companies}개 기업, {region.technologies}개 기술
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{region.innovationIndex.toFixed(1)}</div>
                    <div className="text-xs text-muted-foreground">혁신지수</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="mb-4">지역별 R&D 투입대비 사업화 실적 비율</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalInnovation.map(item => ({
                  ...item,
                  ratio: item.companies && item.totalInvestment ? 
                    (item.companies * 100 / item.totalInvestment).toFixed(2) : 0
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis 
                    label={{ value: '비율 (%)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, '사업화 실적 비율']}
                    labelFormatter={(label) => `지역: ${label}`}
                  />
                  <Bar 
                    dataKey="ratio" 
                    fill="var(--chart-3)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Card>

      {/* 산업별 성장 전망 */}
      <Card className="p-6">
        <h3 className="mb-6">산업별 기술 성장 전망</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bcRatioByCategory.slice(0, 6).map((category, index) => (
            <div key={category.category} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium">{category.category}</h4>
                <Badge variant={index < 2 ? 'default' : index < 4 ? 'secondary' : 'outline'}>
                  {index < 2 ? '고성장' : index < 4 ? '안정성장' : '신규분야'}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">평균 B/C</span>
                  <span className="font-medium">{category.avgBcRatio.toFixed(1)}x</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">최고 B/C</span>
                  <span className="font-medium">{category.maxBcRatio.toFixed(1)}x</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">등록기술</span>
                  <span className="font-medium">{category.count}개</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">총 투자</span>
                  <span className="font-medium">₩{category.totalInvestment}억</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}