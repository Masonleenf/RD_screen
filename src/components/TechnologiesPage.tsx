import { useState } from 'react';
import { Brain, Zap, FlaskConical, Cpu, Atom } from 'lucide-react';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { mockCompanies, type Technology } from './mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, PieChart, Pie, Cell } from 'recharts';

interface TechnologiesPageProps {
  onTechnologySelect: (technology: Technology) => void;
}

export function TechnologiesPage({ onTechnologySelect }: TechnologiesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [trlFilter, setTrlFilter] = useState('all');

  // 모든 기술 데이터 수집
  const allTechnologies = mockCompanies.flatMap(company => 
    company.technologies.map(tech => ({
      ...tech,
      companyName: company.name,
      companyIndustry: company.industry
    }))
  );

  const categories = [...new Set(allTechnologies.map(tech => tech.category))];
  
  const filteredTechnologies = allTechnologies.filter(tech => {
    if (selectedCategory !== 'all' && tech.category !== selectedCategory) return false;
    if (trlFilter !== 'all') {
      const trlRange = trlFilter.split('-');
      const minTrl = parseInt(trlRange[0]);
      const maxTrl = parseInt(trlRange[1] || trlRange[0]);
      if (tech.trlLevel < minTrl || tech.trlLevel > maxTrl) return false;
    }
    return true;
  });

  // 기술분야별 통계
  const categoryStats = categories.map(category => {
    const categoryTechs = allTechnologies.filter(tech => tech.category === category);
    return {
      name: category,
      count: categoryTechs.length,
      avgBcRatio: categoryTechs.reduce((sum, tech) => sum + tech.bcRatio, 0) / categoryTechs.length,
      totalInvestment: categoryTechs.reduce((sum, tech) => sum + parseFloat(tech.rdCost.replace(/[^\d]/g, '')), 0)
    };
  });

  // TRL 레벨별 분포
  const trlDistribution = Array.from({length: 10}, (_, i) => i + 1).map(trl => ({
    trl: `TRL ${trl}`,
    count: allTechnologies.filter(tech => tech.trlLevel === trl).length
  }));

  // B/C 비율 vs R&D 투자 산점도
  const bcRatioData = allTechnologies.map(tech => ({
    name: tech.name,
    bcRatio: tech.bcRatio,
    investment: parseFloat(tech.rdCost.replace(/[^\d]/g, '')),
    category: tech.category
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '바이오기술':
      case '디지털헬스':
      case '유전자치료':
        return FlaskConical;
      case '산업용AI':
      case '컴퓨터비전':
        return Brain;
      case '태양광에너지':
      case '에너지저장':
        return Zap;
      case '메모리기술':
      case '패키징기술':
        return Cpu;
      default:
        return Atom;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="mb-2">기술 조회</h1>
          <p className="text-muted-foreground">
            기술분야별 R&D 현황과 사업화 성과를 분석합니다
          </p>
        </div>
      </div>

      {/* 필터 섹션 */}
      <Card className="p-6">
        <h3 className="mb-4">조회 필터</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">기술분야</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 분야</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm mb-2">기술성숙도 (TRL)</label>
            <Select value={trlFilter} onValueChange={setTrlFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 레벨</SelectItem>
                <SelectItem value="1-3">초기단계 (TRL 1-3)</SelectItem>
                <SelectItem value="4-6">개발단계 (TRL 4-6)</SelectItem>
                <SelectItem value="7-9">상용화단계 (TRL 7-9)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* 기술분야별 개요 */}
      <Card className="p-6">
        <h3 className="mb-6">기술분야별 현황</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryStats.map((category, index) => {
            const IconComponent = getCategoryIcon(category.name);
            return (
              <div key={category.name} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{category.name}</h4>
                    <div className="text-sm text-muted-foreground">{category.count}개 기술</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">평균 B/C 비율</span>
                    <span className="font-medium">{category.avgBcRatio.toFixed(1)}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">총 R&D 투자</span>
                    <span className="font-medium">₩{category.totalInvestment}억</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 기술분야별 B/C 비율 분석 */}
      <Card className="p-6">
        <h3 className="mb-6">기술분야별 B/C 비율 및 투자현황</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="mb-4">분야별 평균 B/C 비율</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value.toFixed(1)}x`, 'B/C 비율']} />
                  <Bar dataKey="avgBcRatio" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h4 className="mb-4">분야별 R&D 투자 현황</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₩${value}억`, 'R&D 투자']} />
                  <Bar dataKey="totalInvestment" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Card>

      {/* TRL 분포 및 B/C 산점도 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="mb-6">기술성숙도(TRL) 분포</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trlDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="trl" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}개`, '기술 수']} />
                <Bar dataKey="count" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-6">B/C 비율 vs R&D 투자</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart data={bcRatioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="investment" 
                  name="R&D 투자" 
                  unit="억원"
                />
                <YAxis 
                  dataKey="bcRatio" 
                  name="B/C 비율" 
                  unit="x"
                />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'bcRatio' ? `${value}x` : `₩${value}억`,
                    name === 'bcRatio' ? 'B/C 비율' : 'R&D 투자'
                  ]}
                  labelFormatter={(label, payload) => payload?.[0]?.payload?.name || ''}
                />
                <Scatter dataKey="bcRatio" fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* 기술 목록 */}
      <Card className="p-6">
        <h3 className="mb-6">
          기술 목록 
          <span className="text-sm text-muted-foreground ml-2">
            ({filteredTechnologies.length}개 기술)
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTechnologies.map((tech) => (
            <div 
              key={tech.id} 
              className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer hover:border-primary/50"
              onClick={() => onTechnologySelect(tech)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium">{tech.name}</h4>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {tech.category}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">B/C 비율</div>
                  <div className="font-semibold text-lg text-primary">{tech.bcRatio.toFixed(1)}x</div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {tech.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">보유기업</span>
                  <span>{tech.companyName}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">R&D 투자</span>
                  <span>{tech.rdCost}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">기술성숙도</span>
                  <span>TRL {tech.trlLevel}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">개발기간</span>
                  <span>{tech.developmentPeriod}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">사업화상태</span>
                  <Badge 
                    variant={tech.commercializationStatus === 'verified' ? 'default' : 'outline'}
                    className="text-xs"
                  >
                    {tech.commercializationStatus === 'verified' ? '검증완료' : 
                     tech.commercializationStatus === 'in-progress' ? '진행중' : '계획중'}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}