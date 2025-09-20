# R&D Earning Screener - MongoDB Database Structure (간소화 버전)

## 📋 목차
- [개요](#개요)
- [데이터베이스 구조](#데이터베이스-구조)
- [컬렉션 상세 스펙](#컬렉션-상세-스펙)
- [데이터 관계도](#데이터-관계도)
- [인덱스 전략](#인덱스-전략)
- [구현 가능성 검증](#구현-가능성-검증)
- [샘플 데이터](#샘플-데이터)

---

## 개요

### 데이터베이스명
`rnd_earning_screener`

### 핵심 설계 원칙
1. **기업 재무 데이터**: 기술과 무관하게 전사 단위로 관리
2. **기술별 데이터**: 각 기술의 R&D 투자, 사업화 실적, B/C ratio 등은 해당 기술에 종속
3. **1:N 관계**: 1개 기업 → N개 기술 (한 기술은 1개 기업에만 소속)
4. **하이브리드 패턴**: 자주 조회되는 데이터는 Embedded, 독립적 관리가 필요한 데이터는 Referenced

---

## 데이터베이스 구조

### 📊 전체 컬렉션 목록 (4개)

| 컬렉션명 | 문서 수 예상 | 용도 |
|---------|------------|------|
| `companies` | 수백~수천 | 기업 기본 정보 + 전사 재무 |
| `technologies` | 수천~수만 | 기술 정보 + R&D/사업화 데이터 |
| `commercialization_records` | 수천~수만 | 사업화 실적 (거래 이력) |
| `bc_ratio_history` | 수만~수십만 | B/C ratio 시계열 데이터 |

---

## 컬렉션 상세 스펙

### 1️⃣ companies (기업 정보)
**용도**: 기업의 기본 정보와 전사 단위 재무 데이터

```javascript
{
  _id: ObjectId,                    // MongoDB 자동 생성
  companyId: String (unique),       // "comp_biogen_korea"
  name: String,                     // "BioGen Korea"
  industry: String,                 // "Biotechnology"
  marketCap: String,                // "₩2.4T"
  employeeCount: String,            // "1,250"
  founded: String,                  // "2018"
  fundingStage: String,             // "growth", "public"
  
  // 전사 재무 데이터 (기술과 무관)
  financials: {
    revenue: String,                // "₩850B" - 전사 매출
    rdInvestment: String,           // "₩127B" - 전사 R&D 총 투자
    profitMargin: String            // "15.2%" - 영업이익률
  },
  
  createdAt: Date,
  updatedAt: Date
}
```

**인덱스**:
- `companyId` (unique)
- `industry` (일반)
- `name` (text search)

---

### 2️⃣ technologies (기술 정보)
**용도**: 기술별 상세 정보 및 성과 데이터

```javascript
{
  _id: ObjectId,
  technologyId: String (unique),    // "tech_cancer_immuno_001"
  companyId: String,                // "comp_biogen_korea" (FK)
  
  // 기본 정보
  name: String,                     // "Next-Gen Cancer Immunotherapy"
  description: String,              // 기술 설명
  category: String,                 // "Biotechnology"
  developmentPeriod: String,        // "2019-2023"
  trlLevel: Integer,                // 8 (1-9)
  commercializationStatus: String,  // "verified", "in-progress", "planned"
  
  // 해당 기술의 R&D 투자
  rdData: {
    totalInvestment: String,        // "₩3.2B" - 이 기술에 투입된 총 R&D
    investmentByYear: [
      { year: Integer, amount: String }
    ],
    teamSize: Integer,
    facilities: String
  },
  
  // 해당 기술의 사업화 실적
  commercialization: {
    totalRevenue: String,           // "₩15.04B" - 이 기술의 사업화 수익
    bcRatio: Number,                // 4.7 - 이 기술의 B/C ratio
    revenueByYear: [
      { year: Integer, revenue: String }
    ]
  },
  
  // 성과 지표 (Embedded)
  performance: {
    patentsFiled: Integer,          // 24
    patentsChange: String,          // "+15%"
    technologyTransfers: Integer,   // 8
    transfersChange: String,        // "+60%"
    licensingRevenue: String,       // "₩1.2B"
    licensingChange: String,        // "+85%"
    commercialProducts: Integer,    // 12
    productsChange: String          // "+33%"
  },
  
  createdAt: Date,
  updatedAt: Date
}
```

**인덱스**:
- `technologyId` (unique)
- `companyId` (일반)
- `commercialization.bcRatio` (일반)
- `name, description` (text search)
- Compound: `(companyId, commercializationStatus)`

---

### 3️⃣ commercialization_records (사업화 실적)
**용도**: 특정 기술의 사업화 거래 이력

```javascript
{
  _id: ObjectId,
  commercializationId: String (unique),  // "comm_001"
  technologyId: String,                  // FK to technologies
  companyId: String,                     // FK to companies
  client: String,                        // "삼성전자" (거래처)
  dealType: String,                      // "기술이전", "라이선싱", "공동개발"
  dealYear: Integer,                     // 2023
  dealValue: String,                     // "₩450M"
  revenueType: String,                   // "연간수익", "일회성수익"
  status: String,                        // "진행중", "완료"
  createdAt: Date
}
```

**인덱스**:
- `commercializationId` (unique)
- Compound: `(technologyId, dealYear)`

---

### 4️⃣ bc_ratio_history (B/C 비율 시계열)
**용도**: 기술별 B/C 비율 변화 추적

```javascript
{
  _id: ObjectId,
  historyId: String (unique),
  technologyId: String,             // FK
  companyId: String,                // FK
  year: String,                     // "2024"
  bcRatio: Number,                  // 4.7
  investment: Number,               // 2000 (백만원)
  revenue: Number,                  // 9400 (백만원)
  createdAt: Date
}
```

**인덱스**:
- Compound: `(technologyId, year)` (unique)

---

## 데이터 관계도

```
companies (기업 전체 재무)
    │
    │ 1:N
    ↓
technologies (기술별 데이터)
    ├── rdData (Embedded - 기술별 R&D 투자)
    ├── commercialization (Embedded - 사업화 실적, B/C ratio)
    ├── performance (Embedded - 성과 지표)
    │
    ├── 1:N → commercialization_records (사업화 거래 이력)
    └── 1:N → bc_ratio_history (B/C 비율 시계열)
```

---

## 인덱스 전략

### 📈 성능 최적화를 위한 인덱스

| 컬렉션 | 인덱스 | 타입 | 용도 |
|--------|--------|------|------|
| companies | companyId | unique | 기업 조회 |
| companies | industry | 일반 | 산업별 필터링 |
| companies | name | text | 텍스트 검색 |
| technologies | technologyId | unique | 기술 조회 |
| technologies | companyId | 일반 | 기업별 기술 조회 |
| technologies | commercialization.bcRatio | 일반 | B/C ratio 필터링 |
| technologies | name, description | text | 텍스트 검색 |
| technologies | (companyId, commercializationStatus) | compound | 복합 쿼리 |
| commercialization_records | commercializationId | unique | 사업화 실적 조회 |
| commercialization_records | (technologyId, dealYear) | compound | 기술별 연도별 조회 |
| bc_ratio_history | (technologyId, year) | compound, unique | 시계열 조회 |

---

## 구현 가능성 검증

### ✅ MongoDB 적합성

#### 1. **하이브리드 패턴 사용**
- **Embedded**: 자주 함께 조회되는 데이터 (rdData, commercialization, performance)
- **Referenced**: 독립적 관리가 필요한 데이터 (commercialization_records, bc_ratio_history)
- ✅ **판단**: MongoDB의 장점을 최대한 활용

#### 2. **스키마 검증**
```javascript
db.createCollection("companies", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["companyId", "name", "industry"],
      properties: {
        companyId: { bsonType: "string" },
        name: { bsonType: "string" },
        // ... 스키마 검증 가능
      }
    }
  }
})
```
✅ **구현 가능**: MongoDB 3.6+ 스키마 검증 지원

#### 3. **트랜잭션**
```javascript
// Multi-document ACID 트랜잭션 (필요시)
const session = client.startSession();
session.startTransaction();
try {
  await companies.updateOne(..., { session });
  await technologies.insertOne(..., { session });
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
}
```
✅ **구현 가능**: MongoDB 4.0+ 트랜잭션 지원

#### 4. **Aggregation Pipeline**
```javascript
// 복잡한 집계 쿼리
db.technologies.aggregate([
  { $match: { "commercialization.bcRatio": { $gte: 5.0 } } },
  { $lookup: {
      from: "companies",
      localField: "companyId",
      foreignField: "companyId",
      as: "company"
  }},
  { $unwind: "$company" },
  { $group: {
      _id: "$company.industry",
      avgBcRatio: { $avg: "$commercialization.bcRatio" }
  }}
])
```
✅ **구현 가능**: 강력한 집계 파이프라인

#### 5. **확장성**
- 샤딩 키: `companyId`, `technologyId`
- 복제 세트: 고가용성 보장
- ✅ **구현 가능**: 대규모 데이터 처리 가능

---

## 샘플 데이터

### companies 컬렉션 샘플
```json
{
  "_id": ObjectId("..."),
  "companyId": "comp_biogen_korea",
  "name": "BioGen Korea",
  "industry": "Biotechnology",
  "marketCap": "₩2.4T",
  "employeeCount": "1,250",
  "founded": "2018",
  "fundingStage": "growth",
  "financials": {
    "revenue": "₩850B",
    "rdInvestment": "₩127B",
    "profitMargin": "15.2%"
  },
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-01T00:00:00Z")
}
```

### technologies 컬렉션 샘플
```json
{
  "_id": ObjectId("..."),
  "technologyId": "tech_cancer_immuno_001",
  "companyId": "comp_biogen_korea",
  "name": "Next-Gen Cancer Immunotherapy",
  "description": "Novel CAR-T cell therapy platform for solid tumors",
  "category": "Biotechnology",
  "developmentPeriod": "2019-2023",
  "trlLevel": 8,
  "commercializationStatus": "verified",
  "rdData": {
    "totalInvestment": "₩3.2B",
    "investmentByYear": [
      { "year": 2020, "amount": "₩850M" },
      { "year": 2021, "amount": "₩1.2B" },
      { "year": 2022, "amount": "₩1.5B" },
      { "year": 2023, "amount": "₩1.8B" }
    ],
    "teamSize": 15
  },
  "commercialization": {
    "totalRevenue": "₩15.04B",
    "bcRatio": 4.7,
    "revenueByYear": [
      { "year": 2020, "revenue": "₩680M" },
      { "year": 2024, "revenue": "₩9.4B" }
    ]
  },
  "performance": {
    "patentsFiled": 24,
    "patentsChange": "+15%",
    "technologyTransfers": 8,
    "transfersChange": "+60%",
    "licensingRevenue": "₩1.2B",
    "commercialProducts": 12
  },
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00Z")
}
```

### commercialization_records 컬렉션 샘플
```json
{
  "_id": ObjectId("..."),
  "commercializationId": "comm_001",
  "technologyId": "tech_cancer_immuno_001",
  "companyId": "comp_biogen_korea",
  "client": "삼성전자",
  "dealType": "라이선싱 계약",
  "dealYear": 2023,
  "dealValue": "₩450M",
  "revenueType": "연간수익",
  "status": "진행중",
  "createdAt": ISODate("2023-03-15T00:00:00Z")
}
```

### bc_ratio_history 컬렉션 샘플
```json
{
  "_id": ObjectId("..."),
  "historyId": "hist_001",
  "technologyId": "tech_cancer_immuno_001",
  "companyId": "comp_biogen_korea",
  "year": "2024",
  "bcRatio": 4.7,
  "investment": 2000,
  "revenue": 9400,
  "createdAt": ISODate("2024-12-31T00:00:00Z")
}
```

---

## 주요 쿼리 예시

### 1. 특정 기술의 모든 사업화 실적 조회
```javascript
db.commercialization_records.find({
  technologyId: "tech_cancer_immuno_001"
}).sort({ dealYear: -1 })
```

### 2. B/C ratio 5.0 이상 기술 검색
```javascript
db.technologies.find({
  "commercialization.bcRatio": { $gte: 5.0 }
}).sort({ "commercialization.bcRatio": -1 })
```

### 3. 산업별 평균 B/C ratio 계산
```javascript
db.technologies.aggregate([
  { $lookup: {
      from: "companies",
      localField: "companyId",
      foreignField: "companyId",
      as: "company"
  }},
  { $unwind: "$company" },
  { $group: {
      _id: "$company.industry",
      avgBcRatio: { $avg: "$commercialization.bcRatio" },
      count: { $sum: 1 }
  }}
])
```

### 4. 특정 기업의 모든 기술과 사업화 실적 조회
```javascript
db.technologies.aggregate([
  { $match: { companyId: "comp_biogen_korea" } },
  { $lookup: {
      from: "commercialization_records",
      localField: "technologyId",
      foreignField: "technologyId",
      as: "deals"
  }},
  { $project: {
      name: 1,
      bcRatio: "$commercialization.bcRatio",
      totalDeals: { $size: "$deals" },
      deals: { $slice: ["$deals", 5] }  // 최근 5건만
  }}
])
```

---

## 💡 결론

### ✅ MongoDB 구현 완벽 지원 (간소화 버전)
1. **4개 컬렉션으로 간소화**: 핵심 기능에 집중
2. **문서 지향 구조**: JSON 형태의 중첩 데이터 자연스럽게 표현
3. **유연한 스키마**: 필요에 따라 필드 추가/변경 용이
4. **강력한 쿼리**: Aggregation Pipeline으로 복잡한 분석 가능
5. **확장성**: 샤딩과 복제로 대규모 데이터 처리

### 🚀 다음 단계
1. MongoDB Atlas 클러스터 생성
2. 샘플 데이터 삽입
3. 백엔드 API 개발 (Node.js + Express + MongoDB)
4. 프론트엔드 통합 테스트

---

**작성일**: 2024년 1월
**버전**: 2.0 (간소화 버전)
**작성자**: R&D Earning Screener Team