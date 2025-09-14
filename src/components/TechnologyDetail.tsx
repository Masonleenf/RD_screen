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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="bctrend">B/C Trend</TabsTrigger>
          <TabsTrigger value="market">Market Analysis</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
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
            <h3 className="mb-6">Technology Transfer & Licensing</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">Samsung Electronics</div>
                  <div className="text-sm text-muted-foreground">Licensing Agreement - 2023</div>
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

        <TabsContent value="market" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-6">Market Position & Industry Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="mb-4">Market Size & Growth</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Addressable Market</span>
                    <span className="font-semibold">$24.5B</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Growth Rate</span>
                    <span className="font-semibold text-green-600">18.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Market Penetration</span>
                    <span className="font-semibold">2.3%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="mb-4">Competitive Landscape</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Market Rank</span>
                    <span className="font-semibold">#3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Key Competitors</span>
                    <span className="font-semibold">5 major players</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Technology Differentiation</span>
                    <span className="font-semibold text-green-600">High</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="mb-4">Regional Market Distribution</h4>
            <div className="space-y-4">
              {[
                { region: 'South Korea', share: 45, growth: '+12%' },
                { region: 'Asia Pacific', share: 30, growth: '+25%' },
                { region: 'North America', share: 15, growth: '+8%' },
                { region: 'Europe', share: 10, growth: '+15%' }
              ].map((region, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{region.region}</span>
                    <span className="text-sm text-green-600">{region.growth}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${region.share * 2}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8">{region.share}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="h-6 w-6 text-primary" />
              <h3>AI-Powered Market Intelligence</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="mb-3">Industry Trend Analysis</h4>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm">
                    The {technology.category.toLowerCase()} sector is experiencing accelerated growth driven by increased demand 
                    for sustainable solutions and government regulatory support. Our AI analysis indicates a 73% probability 
                    of continued market expansion over the next 3 years, with particular strength in enterprise applications.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="mb-3">Technology Impact Forecast</h4>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm">
                    Machine learning models predict this technology will capture 8-12% additional market share within 
                    18 months, based on patent strength, commercialization velocity, and competitive positioning. 
                    Key growth drivers include strategic partnerships and expanding application domains.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="mb-3">Investment Risk Assessment</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-100 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">Low</div>
                    <div className="text-sm">Technical Risk</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-100 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">Medium</div>
                    <div className="text-sm">Market Risk</div>
                  </div>
                  <div className="text-center p-4 bg-green-100 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">Low</div>
                    <div className="text-sm">Regulatory Risk</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-3">Strategic Recommendations</h4>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <ul className="text-sm space-y-2">
                    <li>• Focus on expanding into Southeast Asian markets where regulatory environment is favorable</li>
                    <li>• Consider strategic partnerships with established industry leaders to accelerate market penetration</li>
                    <li>• Invest in additional R&D for next-generation applications to maintain competitive advantage</li>
                    <li>• Monitor patent landscape for potential IP conflicts or licensing opportunities</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}