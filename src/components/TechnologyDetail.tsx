import { ArrowLeft, TrendingUp, DollarSign, Target, Brain, BarChart3 } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { type Technology, type Company } from './mockData';

interface TechnologyDetailProps {
  technology: Technology;
  company: Company;
  onBack: () => void;
}

export function TechnologyDetail({ technology, company, onBack }: TechnologyDetailProps) {
  const bcRatioData = [
    { year: '2020', ratio: 0.8, investment: 850, revenue: 680 },
    { year: '2021', ratio: 1.5, investment: 1200, revenue: 1800 },
    { year: '2022', ratio: 2.3, investment: 1500, revenue: 3450 },
    { year: '2023', ratio: 3.1, investment: 1800, revenue: 5580 },
    { year: '2024', ratio: technology.bcRatio, investment: 2000, revenue: technology.bcRatio * 2000 }
  ];

  const performanceData = [
    { metric: 'Patents Filed', value: '24', change: '+15%' },
    { metric: 'Technology Transfer', value: '8', change: '+60%' },
    { metric: 'Licensing Revenue', value: '₩1.2B', change: '+85%' },
    { metric: 'Commercial Products', value: '12', change: '+33%' }
  ];

  return (
    <div className="space-y-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {company.name}
      </button>

      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="mb-2">{technology.name}</h1>
            <p className="text-muted-foreground mb-4">{technology.description}</p>
            <div className="flex gap-2">
              <Badge variant="outline">NTIS Verified</Badge>
              <Badge variant="secondary">{technology.category}</Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">{technology.bcRatio.toFixed(1)}x</div>
            <div className="text-sm text-muted-foreground">Current B/C Ratio</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total R&D Investment</div>
              <div className="font-semibold">{technology.rdCost}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Commercialization Revenue</div>
              <div className="font-semibold">₩{(parseFloat(technology.rdCost.replace(/[^\d]/g, '')) * technology.bcRatio / 100).toFixed(1)}B</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Development Period</div>
              <div className="font-semibold">{technology.developmentPeriod}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">TRL Level</div>
              <div className="font-semibold">TRL {technology.trlLevel}</div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="bctrend">B/C Trend</TabsTrigger>
          <TabsTrigger value="ai-insights" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Insights (Beta)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-6">Verified Commercialization Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {performanceData.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold">{item.value}</div>
                  <div className="text-sm text-muted-foreground">{item.metric}</div>
                  <div className="text-sm text-green-600 font-medium mt-1">{item.change}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-6">Technology 사업화 실적</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">Samsung Electronics</div>
                  <div className="text-sm text-muted-foreground">공급계약 - 2023</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₩450M</div>
                  <div className="text-sm text-muted-foreground">Annual Revenue</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">LG Chem</div>
                  <div className="text-sm text-muted-foreground">Technology Transfer - 2022</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₩320M</div>
                  <div className="text-sm text-muted-foreground">One-time Payment</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">SK Hynix</div>
                  <div className="text-sm text-muted-foreground">Joint Development - 2024</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₩180M</div>
                  <div className="text-sm text-muted-foreground">Ongoing Revenue</div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="bctrend" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-6">B/C Ratio Time Series Analysis</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bcRatioData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'ratio' ? `${value}x` : `₩${value}M`,
                    name === 'ratio' ? 'B/C Ratio' : name === 'investment' ? 'Investment' : 'Revenue'
                  ]} />
                  <Line type="monotone" dataKey="ratio" stroke="#8884d8" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-6">Investment vs Revenue Comparison</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bcRatioData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₩${value}M`, '']} />
                  <Bar dataKey="investment" fill="#8884d8" name="Investment" />
                  <Bar dataKey="revenue" fill="#82ca9d" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="mb-2">AI Insights (Beta)</h3>
                <p className="text-muted-foreground">준비중</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}