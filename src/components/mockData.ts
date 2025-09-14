export interface Technology {
  id: string;
  name: string;
  description: string;
  category: string;
  rdCost: string;
  bcRatio: number;
  developmentPeriod: string;
  trlLevel: number;
  commercializationStatus: 'verified' | 'in-progress' | 'planned';
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  marketCap: string;
  employeeCount: string;
  founded: string;
  financials: {
    revenue: string;
    rdInvestment: string;
    profitMargin: string;
  };
  technologies: Technology[];
}

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'BioGen Korea',
    industry: 'Biotechnology',
    marketCap: '₩2.4T',
    employeeCount: '1,250',
    founded: '2018',
    financials: {
      revenue: '₩850B',
      rdInvestment: '₩127B',
      profitMargin: '15.2%'
    },
    technologies: [
      {
        id: 'tech1',
        name: 'Next-Gen Cancer Immunotherapy',
        description: 'Novel CAR-T cell therapy platform for solid tumors with enhanced efficacy and reduced side effects',
        category: 'Biotechnology',
        rdCost: '₩3.2B',
        bcRatio: 4.7,
        developmentPeriod: '2019-2023',
        trlLevel: 8,
        commercializationStatus: 'verified'
      },
      {
        id: 'tech2',
        name: 'Personalized Medicine Platform',
        description: 'AI-driven genetic analysis system for tailored treatment recommendations',
        category: 'Digital Health',
        rdCost: '₩1.8B',
        bcRatio: 3.2,
        developmentPeriod: '2020-2024',
        trlLevel: 7,
        commercializationStatus: 'verified'
      }
    ]
  },
  {
    id: '2',
    name: 'AI Dynamics',
    industry: 'Artificial Intelligence',
    marketCap: '₩1.8T',
    employeeCount: '890',
    founded: '2019',
    financials: {
      revenue: '₩420B',
      rdInvestment: '₩84B',
      profitMargin: '22.1%'
    },
    technologies: [
      {
        id: 'tech3',
        name: 'Autonomous Manufacturing System',
        description: 'End-to-end AI solution for smart factory automation and predictive maintenance',
        category: 'Industrial AI',
        rdCost: '₩2.5B',
        bcRatio: 6.8,
        developmentPeriod: '2020-2024',
        trlLevel: 9,
        commercializationStatus: 'verified'
      },
      {
        id: 'tech4',
        name: 'Computer Vision Analytics',
        description: 'Real-time image processing and analysis for quality control and defect detection',
        category: 'Computer Vision',
        rdCost: '₩1.2B',
        bcRatio: 5.1,
        developmentPeriod: '2019-2022',
        trlLevel: 9,
        commercializationStatus: 'verified'
      }
    ]
  },
  {
    id: '3',
    name: 'GreenTech Solutions',
    industry: 'Renewable Energy',
    marketCap: '₩3.1T',
    employeeCount: '2,100',
    founded: '2016',
    financials: {
      revenue: '₩1.2T',
      rdInvestment: '₩180B',
      profitMargin: '18.7%'
    },
    technologies: [
      {
        id: 'tech5',
        name: 'Perovskite Solar Cell Technology',
        description: 'High-efficiency, low-cost solar cells with breakthrough stability improvements',
        category: 'Solar Energy',
        rdCost: '₩4.1B',
        bcRatio: 3.9,
        developmentPeriod: '2018-2023',
        trlLevel: 8,
        commercializationStatus: 'verified'
      },
      {
        id: 'tech6',
        name: 'Smart Grid Integration Platform',
        description: 'Advanced energy management system for renewable energy distribution optimization',
        category: 'Energy Storage',
        rdCost: '₩2.7B',
        bcRatio: 4.2,
        developmentPeriod: '2019-2023',
        trlLevel: 9,
        commercializationStatus: 'verified'
      }
    ]
  },
  {
    id: '4',
    name: 'Quantum Semiconductors',
    industry: 'Semiconductor',
    marketCap: '₩5.2T',
    employeeCount: '3,400',
    founded: '2015',
    financials: {
      revenue: '₩2.8T',
      rdInvestment: '₩420B',
      profitMargin: '25.3%'
    },
    technologies: [
      {
        id: 'tech7',
        name: 'Quantum Dot Memory Technology',
        description: 'Revolutionary memory storage technology with 100x faster access times and 50% lower power consumption',
        category: 'Memory Technology',
        rdCost: '₩8.5B',
        bcRatio: 7.2,
        developmentPeriod: '2017-2023',
        trlLevel: 8,
        commercializationStatus: 'verified'
      },
      {
        id: 'tech8',
        name: 'Advanced Chip Packaging',
        description: '3D semiconductor packaging technology for next-generation mobile processors',
        category: 'Packaging Technology',
        rdCost: '₩3.8B',
        bcRatio: 5.6,
        developmentPeriod: '2019-2023',
        trlLevel: 9,
        commercializationStatus: 'verified'
      }
    ]
  },
  {
    id: '5',
    name: 'NanoMaterials Plus',
    industry: 'Advanced Materials',
    marketCap: '₩890B',
    employeeCount: '680',
    founded: '2017',
    financials: {
      revenue: '₩320B',
      rdInvestment: '₩64B',
      profitMargin: '19.8%'
    },
    technologies: [
      {
        id: 'tech9',
        name: 'Self-Healing Polymer System',
        description: 'Autonomous repair material technology for aerospace and automotive applications',
        category: 'Smart Materials',
        rdCost: '₩2.1B',
        bcRatio: 4.5,
        developmentPeriod: '2018-2023',
        trlLevel: 7,
        commercializationStatus: 'verified'
      },
      {
        id: 'tech10',
        name: 'Graphene-Enhanced Composites',
        description: 'Ultra-lightweight, high-strength materials for next-generation transportation',
        category: 'Composite Materials',
        rdCost: '₩1.6B',
        bcRatio: 3.8,
        developmentPeriod: '2019-2024',
        trlLevel: 8,
        commercializationStatus: 'verified'
      }
    ]
  },
  {
    id: '6',
    name: 'TechVenture Labs',
    industry: 'Biotechnology',
    marketCap: '₩1.2T',
    employeeCount: '450',
    founded: '2020',
    financials: {
      revenue: '₩180B',
      rdInvestment: '₩36B',
      profitMargin: '12.4%'
    },
    technologies: [
      {
        id: 'tech11',
        name: 'Gene Editing Delivery System',
        description: 'Precision CRISPR delivery mechanism with 95% targeting accuracy',
        category: 'Gene Therapy',
        rdCost: '₩1.4B',
        bcRatio: 8.1,
        developmentPeriod: '2020-2024',
        trlLevel: 6,
        commercializationStatus: 'in-progress'
      }
    ]
  }
];