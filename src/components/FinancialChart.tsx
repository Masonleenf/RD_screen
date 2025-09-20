import { Card } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FinancialHistory } from './mockData';

interface FinancialChartProps {
  data: FinancialHistory[];
}

export function FinancialChart({ data }: FinancialChartProps) {
  const formatValue = (value: number) => {
    if (value >= 10000) {
      return `${(value / 10000).toFixed(1)}조`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}천억`;
    } else {
      return `${value}억`;
    }
  };

  return (
    <Card className="p-6">
      <h3 className="mb-6">재무 성과 추이</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 매출액 차트 */}
        <div className="h-64">
          <h4 className="mb-3 text-center font-medium">매출액</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatValue} />
              <Tooltip 
                formatter={(value: number) => [formatValue(value), '매출액']}
                labelFormatter={(label) => `${label}년`}
              />
              <Bar 
                dataKey="revenue" 
                fill="var(--chart-1)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 총자산 차트 */}
        <div className="h-64">
          <h4 className="mb-3 text-center font-medium">총자산</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatValue} />
              <Tooltip 
                formatter={(value: number) => [formatValue(value), '총자산']}
                labelFormatter={(label) => `${label}년`}
              />
              <Bar 
                dataKey="assets" 
                fill="var(--chart-2)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 영업이익 차트 */}
        <div className="h-64">
          <h4 className="mb-3 text-center font-medium">영업이익</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatValue} />
              <Tooltip 
                formatter={(value: number) => [formatValue(value), '영업이익']}
                labelFormatter={(label) => `${label}년`}
              />
              <Bar 
                dataKey="operatingProfit" 
                fill="var(--chart-3)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* R&D 투자 차트 */}
        <div className="h-64">
          <h4 className="mb-3 text-center font-medium">R&D 투자</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatValue} />
              <Tooltip 
                formatter={(value: number) => [formatValue(value), 'R&D 투자']}
                labelFormatter={(label) => `${label}년`}
              />
              <Bar 
                dataKey="rdInvestment" 
                fill="var(--chart-4)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}