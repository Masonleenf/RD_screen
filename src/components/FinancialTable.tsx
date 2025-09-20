import { Card } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { FinancialHistory } from './mockData';

interface FinancialTableProps {
  data: FinancialHistory[];
}

export function FinancialTable({ data }: FinancialTableProps) {
  const formatValue = (value: number) => {
    if (value >= 10000) {
      return `₩${(value / 10000).toFixed(1)}조`;
    } else if (value >= 1000) {
      return `₩${(value / 1000).toFixed(1)}천억`;
    } else {
      return `₩${value}억`;
    }
  };

  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <Card className="p-6">
      <h3 className="mb-6">연도별 재무 데이터</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>연도</TableHead>
              <TableHead>매출액</TableHead>
              <TableHead>성장률</TableHead>
              <TableHead>총자산</TableHead>
              <TableHead>영업이익</TableHead>
              <TableHead>이익률</TableHead>
              <TableHead>R&D 투자</TableHead>
              <TableHead>R&D 비율</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => {
              const previousYear = index > 0 ? data[index - 1] : null;
              const revenueGrowth = previousYear ? calculateGrowth(item.revenue, previousYear.revenue) : '0';
              const profitMargin = ((item.operatingProfit / item.revenue) * 100).toFixed(1);
              const rdRatio = ((item.rdInvestment / item.revenue) * 100).toFixed(1);
              
              return (
                <TableRow key={item.year}>
                  <TableCell className="font-medium">{item.year}</TableCell>
                  <TableCell>{formatValue(item.revenue)}</TableCell>
                  <TableCell>
                    <span className={`${parseFloat(revenueGrowth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {parseFloat(revenueGrowth) >= 0 ? '+' : ''}{revenueGrowth}%
                    </span>
                  </TableCell>
                  <TableCell>{formatValue(item.assets)}</TableCell>
                  <TableCell>{formatValue(item.operatingProfit)}</TableCell>
                  <TableCell>{profitMargin}%</TableCell>
                  <TableCell>{formatValue(item.rdInvestment)}</TableCell>
                  <TableCell>{rdRatio}%</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}