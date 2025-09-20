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

export interface FinancialHistory {
  year: string;
  revenue: number;
  assets: number;
  operatingProfit: number;
  rdInvestment: number;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  totalAssets: string; // Market Cap을 총자산으로 변경
  employeeCount: string;
  founded: string;
  location: string; // 위치 정보 추가
  region: string; // 지역 정보 추가
  ceo: string; // CEO 정보 추가
  website: string; // 웹사이트 추가
  financials: {
    revenue: string;
    rdInvestment: string;
    profitMargin: string;
    revenueGrowth: string; // 매출성장률 추가
  };
  financialHistory: FinancialHistory[]; // 연도별 재무 데이터
  technologies: Technology[];
}

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: '바이오젠코리아',
    industry: '바이오기술',
    totalAssets: '₩2.4조',
    employeeCount: '1,250명',
    founded: '2018년',
    location: '경기도 성남시',
    region: '경기',
    ceo: '김바이오',
    website: 'www.biogenkorea.com',
    financials: {
      revenue: '₩8,500억',
      rdInvestment: '₩1,270억',
      profitMargin: '15.2%',
      revenueGrowth: '+23.4%'
    },
    financialHistory: [
      { year: '2020', revenue: 4200, assets: 1800, operatingProfit: 630, rdInvestment: 840 },
      { year: '2021', revenue: 5800, assets: 2000, operatingProfit: 870, rdInvestment: 980 },
      { year: '2022', revenue: 6900, assets: 2200, operatingProfit: 1035, rdInvestment: 1100 },
      { year: '2023', revenue: 8500, assets: 2400, operatingProfit: 1292, rdInvestment: 1270 }
    ],
    technologies: [
      {
        id: 'tech1',
        name: '차세대 암 면역치료기술',
        description: '고형암 대상 신규 CAR-T 세포치료 플랫폼으로 향상된 효능과 부작용 감소',
        category: '바이오기술',
        rdCost: '₩32억',
        bcRatio: 4.7,
        developmentPeriod: '2019-2023',
        trlLevel: 8,
        commercializationStatus: 'verified'
      },
      {
        id: 'tech2',
        name: '개인맞춤형 의료 플랫폼',
        description: 'AI 기반 유전자 분석 시스템으로 맞춤형 치료법 제안',
        category: '디지털헬스',
        rdCost: '₩18억',
        bcRatio: 3.2,
        developmentPeriod: '2020-2024',
        trlLevel: 7,
        commercializationStatus: 'verified'
      }
    ]
  },
  {
    id: '2',
    name: 'AI다이나믹스',
    industry: '인공지능',
    totalAssets: '₩1.8조',
    employeeCount: '890명',
    founded: '2019년',
    location: '서울시 강남구',
    region: '서울',
    ceo: '이인공',
    website: 'www.aidynamics.ai',
    financials: {
      revenue: '₩4,200억',
      rdInvestment: '₩840억',
      profitMargin: '22.1%',
      revenueGrowth: '+31.2%'
    },
    financialHistory: [
      { year: '2020', revenue: 1800, assets: 1200, operatingProfit: 396, rdInvestment: 360 },
      { year: '2021', revenue: 2600, assets: 1400, operatingProfit: 574, rdInvestment: 520 },
      { year: '2022', revenue: 3200, assets: 1600, operatingProfit: 707, rdInvestment: 640 },
      { year: '2023', revenue: 4200, assets: 1800, operatingProfit: 928, rdInvestment: 840 }
    ],
    technologies: [
      {
        id: 'tech3',
        name: '자율제조시스템',
        description: '스마트팩토리 자동화 및 예측정비를 위한 종합 AI 솔루션',
        category: '산업용AI',
        rdCost: '₩25억',
        bcRatio: 6.8,
        developmentPeriod: '2020-2024',
        trlLevel: 9,
        commercializationStatus: 'verified'
      },
      {
        id: 'tech4',
        name: '컴퓨터비전 분석기술',
        description: '품질관리 및 불량검출을 위한 실시간 영상처리 분석',
        category: '컴퓨터비전',
        rdCost: '₩12억',
        bcRatio: 5.1,
        developmentPeriod: '2019-2022',
        trlLevel: 9,
        commercializationStatus: 'verified'
      }
    ]
  },
  {
    id: '3',
    name: '그린테크솔루션',
    industry: '신재생에너지',
    totalAssets: '₩3.1조',
    employeeCount: '2,100명',
    founded: '2016년',
    location: '인천시 연수구',
    region: '인천',
    ceo: '박그린',
    website: 'www.greentech.co.kr',
    financials: {
      revenue: '₩1조 2천억',
      rdInvestment: '₩1,800억',
      profitMargin: '18.7%',
      revenueGrowth: '+18.9%'
    },
    financialHistory: [
      { year: '2020', revenue: 8500, assets: 2600, operatingProfit: 1590, rdInvestment: 1275 },
      { year: '2021', revenue: 9800, assets: 2800, operatingProfit: 1833, rdInvestment: 1470 },
      { year: '2022', revenue: 10100, assets: 2950, operatingProfit: 1889, rdInvestment: 1515 },
      { year: '2023', revenue: 12000, assets: 3100, operatingProfit: 2244, rdInvestment: 1800 }
    ],
    technologies: [
      {
        id: 'tech5',
        name: '페로브스카이트 태양전지 기술',
        description: '고효율, 저비용 태양전지로 안정성 대폭 향상',
        category: '태양광에너지',
        rdCost: '₩41억',
        bcRatio: 3.9,
        developmentPeriod: '2018-2023',
        trlLevel: 8,
        commercializationStatus: 'verified'
      },
      {
        id: 'tech6',
        name: '스마트그리드 통합 플랫폼',
        description: '신재생에너지 분배 최적화를 위한 첨단 에너지 관리 시스템',
        category: '에너지저장',
        rdCost: '₩27억',
        bcRatio: 4.2,
        developmentPeriod: '2019-2023',
        trlLevel: 9,
        commercializationStatus: 'verified'
      }
    ]
  },
  {
    id: '4',
    name: '퀀텀반도체',
    industry: '반도체',
    totalAssets: '₩5.2조',
    employeeCount: '3,400명',
    founded: '2015년',
    location: '경기도 화성시',
    region: '경기',
    ceo: '최반도',
    website: 'www.quantumsemi.kr',
    financials: {
      revenue: '₩2조 8천억',
      rdInvestment: '₩4,200억',
      profitMargin: '25.3%',
      revenueGrowth: '+15.7%'
    },
    financialHistory: [
      { year: '2020', revenue: 18500, assets: 4200, operatingProfit: 4625, rdInvestment: 2775 },
      { year: '2021', revenue: 21200, assets: 4600, operatingProfit: 5304, rdInvestment: 3180 },
      { year: '2022', revenue: 24200, assets: 4900, operatingProfit: 6049, rdInvestment: 3630 },
      { year: '2023', revenue: 28000, assets: 5200, operatingProfit: 7084, rdInvestment: 4200 }
    ],
    technologies: [
      {
        id: 'tech7',
        name: '퀀텀닷 메모리 기술',
        description: '100배 빠른 접근속도와 50% 절전을 실현한 혁신적 메모리 저장기술',
        category: '메모리기술',
        rdCost: '₩85억',
        bcRatio: 7.2,
        developmentPeriod: '2017-2023',
        trlLevel: 8,
        commercializationStatus: 'verified'
      },
      {
        id: 'tech8',
        name: '첨단 칩 패키징 기술',
        description: '차세대 모바일 프로세서를 위한 3D 반도체 패키징 기술',
        category: '패키징기술',
        rdCost: '₩38억',
        bcRatio: 5.6,
        developmentPeriod: '2019-2023',
        trlLevel: 9,
        commercializationStatus: 'verified'
      }
    ]
  },
  {
    id: '5',
    name: '나노소재플러스',
    industry: '첨단소재',
    totalAssets: '₩8,900억',
    employeeCount: '680명',
    founded: '2017년',
    location: '대전시 유성구',
    region: '대전',
    ceo: '정나노',
    website: 'www.nanoplus.kr',
    financials: {
      revenue: '₩3,200억',
      rdInvestment: '₩640억',
      profitMargin: '19.8%',
      revenueGrowth: '+28.5%'
    },
    financialHistory: [
      { year: '2020', revenue: 1800, assets: 720, operatingProfit: 356, rdInvestment: 360 },
      { year: '2021', revenue: 2200, assets: 780, operatingProfit: 436, rdInvestment: 440 },
      { year: '2022', revenue: 2490, assets: 830, operatingProfit: 493, rdInvestment: 498 },
      { year: '2023', revenue: 3200, assets: 890, operatingProfit: 634, rdInvestment: 640 }
    ],
    technologies: [
      {
        id: 'tech9',
        name: '자가치유 폴리머 시스템',
        description: '항공우주 및 자동차 분야를 위한 자율적 손상복구 소재기술',
        category: '스마트소재',
        rdCost: '₩21억',
        bcRatio: 4.5,
        developmentPeriod: '2018-2023',
        trlLevel: 7,
        commercializationStatus: 'verified'
      },
      {
        id: 'tech10',
        name: '그래핀 강화 복합소재',
        description: '차세대 교통수단을 위한 초경량, 고강도 소재',
        category: '복합소재',
        rdCost: '₩16억',
        bcRatio: 3.8,
        developmentPeriod: '2019-2024',
        trlLevel: 8,
        commercializationStatus: 'verified'
      }
    ]
  },
  {
    id: '6',
    name: '테크벤처랩스',
    industry: '바이오기술',
    totalAssets: '₩1.2조',
    employeeCount: '450명',
    founded: '2020년',
    location: '부산시 해운대구',
    region: '부산',
    ceo: '한벤처',
    website: 'www.techventure.kr',
    financials: {
      revenue: '₩1,800억',
      rdInvestment: '₩360억',
      profitMargin: '12.4%',
      revenueGrowth: '+42.1%'
    },
    financialHistory: [
      { year: '2020', revenue: 850, assets: 600, operatingProfit: 105, rdInvestment: 170 },
      { year: '2021', revenue: 1200, assets: 850, operatingProfit: 149, rdInvestment: 240 },
      { year: '2022', revenue: 1350, assets: 1000, operatingProfit: 167, rdInvestment: 270 },
      { year: '2023', revenue: 1800, assets: 1200, operatingProfit: 223, rdInvestment: 360 }
    ],
    technologies: [
      {
        id: 'tech11',
        name: '유전자편집 전달시스템',
        description: '95% 표적 정확도를 가진 정밀 CRISPR 전달 메커니즘',
        category: '유전자치료',
        rdCost: '₩14억',
        bcRatio: 8.1,
        developmentPeriod: '2020-2024',
        trlLevel: 6,
        commercializationStatus: 'in-progress'
      }
    ]
  }
];