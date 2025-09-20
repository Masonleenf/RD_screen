import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ChevronRight, Zap, Beaker, TrendingUp } from 'lucide-react';
import { Technology } from './mockData';

interface TechnologyListProps {
  technologies: Technology[];
  onTechnologySelect: (technology: Technology) => void;
}

export function TechnologyList({ technologies, onTechnologySelect }: TechnologyListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'planned': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified': return '사업화 완료';
      case 'in-progress': return '사업화 진행중';
      case 'planned': return '사업화 계획';
      default: return status;
    }
  };

  const getTrlProgress = (level: number) => (level / 9) * 100;

  return (
    <Card className="p-6">
      <h3 className="mb-6 flex items-center gap-2">
        <Beaker className="w-5 h-5" />
        보유 기술 ({technologies.length}개)
      </h3>
      <div className="space-y-4">
        {technologies.map((technology) => (
          <div
            key={technology.id}
            className="border rounded-lg p-4 cursor-pointer hover:bg-accent/50 transition-colors group"
            onClick={() => onTechnologySelect(technology)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium group-hover:text-primary transition-colors">
                    {technology.name}
                  </h4>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {technology.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <TrendingUp className="w-3 h-3" />
                  B/C 비율
                </div>
                <div className="font-medium text-lg">{technology.bcRatio}</div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Zap className="w-3 h-3" />
                  R&D 투입
                </div>
                <div className="font-medium">{technology.rdCost}</div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">TRL 수준</div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{technology.trlLevel}/9</span>
                  <Progress value={getTrlProgress(technology.trlLevel)} className="h-2 flex-1" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">사업화 현황</div>
                <Badge className={getStatusColor(technology.commercializationStatus)}>
                  {getStatusText(technology.commercializationStatus)}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{technology.category}</Badge>
                <span className="text-sm text-muted-foreground">
                  개발기간: {technology.developmentPeriod}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}