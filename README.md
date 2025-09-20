# R&D Earning Screener - MongoDB 데이터베이스 설계 문서

## 📋 목차
- [개요](#개요)
- [데이터베이스 구조](#데이터베이스-구조)
- [컬렉션 상세 설계](#컬렉션-상세-설계)
- [데이터 관계도](#데이터-관계도)
- [인덱스 설계](#인덱스-설계)
- [데이터 타입 및 단위 규칙](#데이터-타입-및-단위-규칙)

---

## 개요

### 데이터베이스명
`rnd_earning_screener`

### 핵심 설계 원칙
1. **숫자 기반 저장**: 모든 금액, 비율은 숫자로 저장 (분석 및 집계 가능)
2. **명확한 단위**: 백만원 단위로 통일
3. **1:N 관계**: 1개 기업 → N개 기술
4. **참조 무결성**: companyId, technologyId로 연결
5. **확장 가능**: 새 필드 추가 용이

---

## 데이터베이스 구조

### 전체 컬렉션 (4개)

| 컬렉션명 | 역할 | 문서 수 예상 | 관계 |
|---------|------|------------|------|
| `companies` | 기업 기본정보 + 재무 | 수백~수천 | 1 |
| `technologies` | 기술정보 + R&D + 사업화 | 수천~수만 | N (belongs to company) |
| `commercialization_records` | 사업화 거래 이력 | 수천~수만 | N (belongs to technology) |
| `bc_ratio_history` | B/C 비율 시계열 | 수만~수십만 | N (belongs to technology) |

---

## 컬렉션 상세 설계

### 1️⃣ companies (기업 컬렉션)

**목적**: 기업의 기본 정보와 전사 재무 데이터 관리

#### 필드 구조

| 필드명 | 타입 | 필수 | 설명 | 예시 | 단위/형식 |
|--------|------|------|------|------|----------|
| `_id` | ObjectId | ✅ | MongoDB 자동 생성 ID | - | - |
| `companyId` | String | ✅ | 기업 고유 식별자 | "comp_biogen_korea" | unique |
| `name` | String | ✅ | 기업명 | "바이오젠코리아" | - |
| `industry` | String | ✅ | 산업 분류 | "바이오기술" | - |
| `totalAssets` | Number | ✅ | 총 자산 | 2400000 | 백만원 (2.4조) |
| `employeeCount` | Number | ✅ | 직원 수 | 1250 | 명 |
| `foundedYear` | Number | ✅ | 설립 연도 | 2018 | 4자리 연도 |
| `location` | String | ❌ | 상세 위치 | "경기도 성남시" | - |
| `region` | String | ❌ | 지역 | "경기" | - |
| `ceo` | String | ❌ | 대표자명 | "김바이오" | - |
| `website` | String | ❌ | 웹사이트 | "www.biogenkorea.com" | - |
| `fundingStage` | String | ❌ | 펀딩 단계 | "growth", "public" | - |
| `financials` | Object | ✅ | 재무 정보 객체 | 아래 참조 | - |
| `financialHistory` | Array | ✅ | 연도별 재무 이력 | 아래 참조 | - |
| `createdAt` | Date | ✅ | 생성 일시 | ISODate("2024-01-01") | - |
| `updatedAt` | Date | ✅ | 수정 일시 | ISODate("2024-01-15") | - |

#### financials 객체 구조

| 필드명 | 타입 | 필수 | 설명 | 예시 | 단위 |
|--------|------|------|------|------|------|
| `revenue` | Number | ✅ | 전사 매출 | 850000 | 백만원 (8500억) |
| `rdInvestment` | Number | ✅ | 전사 R&D 투자 | 127000 | 백만원 (1270억) |
| `profitMargin` | Number | ✅ | 영업이익률 | 15.2 | % |
| `revenueGrowth` | Number | ✅ | 매출 성장률 | 23.4 | % |

#### financialHistory 배열 구조

| 필드명 | 타입 | 필수 | 설명 | 예시 | 단위 |
|--------|------|------|------|------|------|
| `year` | Number | ✅ | 연도 | 2023 | 4자리 |
| `revenue` | Number | ✅ | 해당 연도 매출 | 850000 | 백만원 |
| `assets` | Number | ✅ | 해당 연도 자산 | 240000 | 백만원 |
| `operatingProfit` | Number | ✅ | 영업이익 | 129200 | 백만원 |
| `rdInvestment` | Number | ✅ | R&D 투자 | 127000 | 백만원 |

---

### 2️⃣ technologies (기술 컬렉션)

**목적**: 기술별 상세 정보, R&D 투자, 사업화 실적 관리

#### 필드 구조

| 필드명 | 타입 | 필수 | 설명 | 예시 | 단위/형식 |
|--------|------|------|------|------|----------|
| `_id` | ObjectId | ✅ | MongoDB 자동 생성 ID | - | - |
| `technologyId` | String | ✅ | 기술 고유 식별자 | "tech_cancer_immuno_001" | unique |
| `companyId` | String | ✅ | 소속 기업 ID (FK) | "comp_biogen_korea" | 외래키 |
| `name` | String | ✅ | 기술명 | "차세대 암 면역치료기술" | - |
| `description` | String | ❌ | 기술 설명 | "혁신적인 CAR-T 세포..." | - |
| `category` | String | ✅ | 기술 분류 | "바이오기술" | - |
| `developmentPeriod` | Object | ✅ | 개발 기간 | 아래 참조 | - |
| `trlLevel` | Number | ✅ | 기술성숙도 | 8 | 1-9 |
| `commercializationStatus` | String | ✅ | 사업화 상태 | "verified" | verified/in-progress/planned |
| `rdData` | Object | ✅ | R&D 투자 정보 | 아래 참조 | - |
| `commercialization` | Object | ✅ | 사업화 실적 정보 | 아래 참조 | - |
| `performance` | Object | ❌ | 성과 지표 | 아래 참조 | - |
| `createdAt` | Date | ✅ | 생성 일시 | - | - |
| `updatedAt` | Date | ✅ | 수정 일시 | - | - |

#### developmentPeriod 객체 구조

| 필드명 | 타입 | 필수 | 설명 | 예시 |
|--------|------|------|------|------|
| `startYear` | Number | ✅ | 개발 시작 연도 | 2019 |
| `endYear` | Number | ✅ | 개발 종료 연도 | 2023 |

#### rdData 객체 구조

| 필드명 | 타입 | 필수 | 설명 | 예시 | 단위 |
|--------|------|------|------|------|------|
| `totalInvestment` | Number | ✅ | 총 R&D 투자 | 3200 | 백만원 (32억) |
| `investmentByYear` | Array | ❌ | 연도별 투자 | [{year: 2020, amount: 850}] | 백만원 |
| `teamSize` | Number | ❌ | 연구 인력 | 15 | 명 |
| `facilities` | String | ❌ | 연구 시설 | "성남 R&D 센터" | - |

#### commercialization 객체 구조

| 필드명 | 타입 | 필수 | 설명 | 예시 | 단위 |
|--------|------|------|------|------|------|
| `totalRevenue` | Number | ✅ | 총 사업화 수익 | 15040 | 백만원 (150.4억) |
| `bcRatio` | Number | ✅ | B/C 비율 | 4.7 | 배수 |
| `revenueByYear` | Array | ❌ | 연도별 수익 | [{year: 2024, revenue: 9400}] | 백만원 |

#### performance 객체 구조

| 필드명 | 타입 | 필수 | 설명 | 예시 | 단위 |
|--------|------|------|------|------|------|
| `patentsFiled` | Number | ❌ | 출원 특허 수 | 24 | 건 |
| `patentsGrowthRate` | Number | ❌ | 특허 증가율 | 15 | % |
| `technologyTransfers` | Number | ❌ | 기술이전 건수 | 8 | 건 |
| `transfersGrowthRate` | Number | ❌ | 기술이전 증가율 | 60 | % |
| `licensingRevenue` | Number | ❌ | 라이선싱 수익 | 1200 | 백만원 |
| `licensingGrowthRate` | Number | ❌ | 라이선싱 증가율 | 85 | % |
| `commercialProducts` | Number | ❌ | 상용화 제품 수 | 12 | 개 |
| `productsGrowthRate` | Number | ❌ | 제품 증가율 | 33 | % |

---

### 3️⃣ commercialization_records (사업화 실적 컬렉션)

**목적**: 기술별 사업화 거래 상세 이력 관리

#### 필드 구조

| 필드명 | 타입 | 필수 | 설명 | 예시 | 단위 |
|--------|------|------|------|------|------|
| `_id` | ObjectId | ✅ | MongoDB 자동 생성 ID | - | - |
| `commercializationId` | String | ✅ | 사업화 실적 ID | "comm_001" | unique |
| `technologyId` | String | ✅ | 기술 ID (FK) | "tech_cancer_immuno_001" | 외래키 |
| `companyId` | String | ✅ | 기업 ID (FK) | "comp_biogen_korea" | 외래키 |
| `client` | String | ✅ | 거래처 | "삼성전자" | - |
| `dealType` | String | ✅ | 거래 유형 | "라이선싱" | 기술이전/라이선싱/공동개발 |
| `dealYear` | Number | ✅ | 거래 연도 | 2023 | 4자리 |
| `dealValue` | Number | ✅ | 거래 금액 | 450 | 백만원 (4.5억) |
| `revenueType` | String | ✅ | 수익 유형 | "annual" | annual/one-time |
| `status` | String | ✅ | 진행 상태 | "active" | active/completed |
| `createdAt` | Date | ✅ | 생성 일시 | - | - |

---

### 4️⃣ bc_ratio_history (B/C 비율 이력 컬렉션)

**목적**: 기술별 B/C 비율 시계열 데이터 추적

#### 필드 구조

| 필드명 | 타입 | 필수 | 설명 | 예시 | 단위 |
|--------|------|------|------|------|------|
| `_id` | ObjectId | ✅ | MongoDB 자동 생성 ID | - | - |
| `historyId` | String | ✅ | 이력 ID | "hist_001" | unique |
| `technologyId` | String | ✅ | 기술 ID (FK) | "tech_cancer_immuno_001" | 외래키 |
| `companyId` | String | ✅ | 기업 ID (FK) | "comp_biogen_korea" | 외래키 |
| `year` | Number | ✅ | 연도 | 2024 | 4자리 |
| `bcRatio` | Number | ✅ | B/C 비율 | 4.7 | 배수 |
| `investment` | Number | ✅ | 투자 금액 | 2000 | 백만원 |
| `revenue` | Number | ✅ | 수익 금액 | 9400 | 백만원 |
| `createdAt` | Date | ✅ | 생성 일시 | - | - |

---

## 데이터 관계도

### ERD (Entity Relationship Diagram)

```
┌─────────────────────┐
│     companies       │
│ ─────────────────── │
│ companyId (PK)      │◄─┐
│ name                │  │
│ industry            │  │
│ totalAssets         │  │
│ financials          │  │
│ financialHistory[]  │  │
└─────────────────────┘  │
                         │ 1:N
                         │
┌─────────────────────┐  │
│   technologies      │  │
│ ─────────────────── │  │
│ technologyId (PK)   │  │
│ companyId (FK)      │──┘
│ name                │◄─┐
│ category            │  │
│ rdData              │  │
│ commercialization   │  │
│ performance         │  │
└─────────────────────┘  │
         ▲               │
         │ 1:N           │ 1:N
         │               │
┌────────┴──────────┐    │
│ bc_ratio_history  │    │
│ ─────────────────│     │
│ historyId (PK)    │    │
│ technologyId (FK) │    │
│ year              │    │
│ bcRatio           │    │
└───────────────────┘    │
                         │
        ┌────────────────┘
        │ 1:N
        │
┌───────┴──────────────────┐
│ commercialization_records │
│ ──────────────────────── │
│ commercializationId (PK)  │
│ technologyId (FK)         │
│ client                    │
│ dealValue                 │
└───────────────────────────┘
```

### 관계 설명

| 관계 | 설명 | 카디널리티 |
|------|------|-----------|
| companies ↔ technologies | 기업이 여러 기술 보유 | 1:N |
| technologies ↔ commercialization_records | 기술당 여러 거래 기록 | 1:N |
| technologies ↔ bc_ratio_history | 기술당 여러 연도 이력 | 1:N |

---

## 인덱스 설계

### companies 인덱스

| 필드 | 타입 | 목적 |
|------|------|------|
| `companyId` | unique | 고유 식별, 기본키 |
| `industry` | 일반 | 산업별 필터링 |
| `region` | 일반 | 지역별 필터링 |
| `name` | text | 텍스트 검색 |
| `(region, industry)` | compound | 복합 쿼리 최적화 |

### technologies 인덱스

| 필드 | 타입 | 목적 |
|------|------|------|
| `technologyId` | unique | 고유 식별, 기본키 |
| `companyId` | 일반 | 기업별 기술 조회 |
| `commercialization.bcRatio` | 일반 | B/C ratio 정렬 |
| `category` | 일반 | 기술 분류별 조회 |
| `name, description` | text | 텍스트 검색 |
| `(companyId, commercializationStatus)` | compound | 기업별 상태 조회 |

### commercialization_records 인덱스

| 필드 | 타입 | 목적 |
|------|------|------|
| `commercializationId` | unique | 고유 식별 |
| `technologyId` | 일반 | 기술별 조회 |
| `(technologyId, dealYear)` | compound | 기술별 연도별 조회 |
| `companyId` | 일반 | 기업별 조회 |

### bc_ratio_history 인덱스

| 필드 | 타입 | 목적 |
|------|------|------|
| `(technologyId, year)` | compound, unique | 시계열 조회, 중복 방지 |
| `companyId` | 일반 | 기업별 조회 |

---

## 데이터 타입 및 단위 규칙

### 공통 규칙

| 데이터 종류 | 저장 타입 | 저장 단위 | 표시 예시 | 비고 |
|-----------|---------|---------|----------|------|
| **금액** | Number | 백만원 | 850000 → "₩8,500억" | 소수점 없음 |
| **퍼센트** | Number | 소수점 | 15.2 → "15.2%" | 소수점 1자리 |
| **연도** | Number | 4자리 | 2024 | YYYY 형식 |
| **인원** | Number | 명 | 1250 → "1,250명" | 정수 |
| **비율** | Number | 배수 | 4.7 → "4.7x" | 소수점 1자리 |

### 금액 변환 예시

| DB 값 (백만원) | 억원 | 조원 | 표시 형식 |
|--------------|------|------|----------|
| 850 | 8.5 | 0.00085 | ₩8.5억 |
| 850000 | 8500 | 0.85 | ₩8,500억 |
| 2400000 | 24000 | 2.4 | ₩2.4조 |

### Enum 값 정의

#### commercializationStatus
- `verified`: 검증 완료
- `in-progress`: 진행 중
- `planned`: 계획 중

#### dealType
- `기술이전`: Technology Transfer
- `라이선싱`: Licensing
- `공동개발`: Joint Development

#### revenueType
- `annual`: 연간 수익
- `one-time`: 일회성 수익

#### status
- `active`: 진행 중
- `completed`: 완료

---

## 샘플 데이터 구조

### companies 샘플
```json
{
  "_id": ObjectId("..."),
  "companyId": "comp_biogen_korea",
  "name": "바이오젠코리아",
  "industry": "바이오기술",
  "totalAssets": 2400000,
  "employeeCount": 1250,
  "foundedYear": 2018,
  "location": "경기도 성남시",
  "region": "경기",
  "ceo": "김바이오",
  "website": "www.biogenkorea.com",
  "fundingStage": "growth",
  "financials": {
    "revenue": 850000,
    "rdInvestment": 127000,
    "profitMargin": 15.2,
    "revenueGrowth": 23.4
  },
  "financialHistory": [
    {
      "year": 2020,
      "revenue": 420000,
      "assets": 180000,
      "operatingProfit": 63000,
      "rdInvestment": 84000
    },
    {
      "year": 2023,
      "revenue": 850000,
      "assets": 240000,
      "operatingProfit": 129200,
      "rdInvestment": 127000
    }
  ],
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00Z")
}
```

### technologies 샘플
```json
{
  "_id": ObjectId("..."),
  "technologyId": "tech_cancer_immuno_001",
  "companyId": "comp_biogen_korea",
  "name": "차세대 암 면역치료기술",
  "description": "Novel CAR-T cell therapy platform",
  "category": "바이오기술",
  "developmentPeriod": {
    "startYear": 2019,
    "endYear": 2023
  },
  "trlLevel": 8,
  "commercializationStatus": "verified",
  "rdData": {
    "totalInvestment": 3200,
    "investmentByYear": [
      { "year": 2020, "amount": 850 },
      { "year": 2023, "amount": 1800 }
    ],
    "teamSize": 15,
    "facilities": "성남 R&D 센터"
  },
  "commercialization": {
    "totalRevenue": 15040,
    "bcRatio": 4.7,
    "revenueByYear": [
      { "year": 2020, "revenue": 680 },
      { "year": 2024, "revenue": 9400 }
    ]
  },
  "performance": {
    "patentsFiled": 24,
    "patentsGrowthRate": 15,
    "technologyTransfers": 8,
    "transfersGrowthRate": 60,
    "licensingRevenue": 1200,
    "licensingGrowthRate": 85,
    "commercialProducts": 12,
    "productsGrowthRate": 33
  },
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00Z")
}
```

---

## 설계 특징 요약

### ✅ 장점
1. **분석 친화적**: 모든 수치 데이터가 숫자형
2. **확장 가능**: 새 필드 추가 용이
3. **성능 최적화**: 적절한 인덱스 설계
4. **데이터 무결성**: 외래키 관계 명확
5. **유연성**: MongoDB의 스키마리스 특성 활용

### 🎯 핵심 설계 포인트
- **단위 통일**: 금액은 백만원으로 통일
- **1:N 관계**: companyId, technologyId로 연결
- **Embedded vs Referenced**: 자주 조회되는 데이터는 Embedded, 독립 관리는 Referenced
- **성능**: B/C ratio, category 등 자주 검색되는 필드에 인덱스

---

