# Git 브랜치 전략

## 브랜치 구조

```
main (프로덕션 브랜치)
├── feature/project-setup     (프로젝트 초기 설정)
├── feature/ui-components     (UI 컴포넌트)
├── feature/pages            (페이지 구현)
└── feature/config           (설정 파일)
```

## 브랜치 네이밍 규칙

**기능 개발:**
```
feature/[기능명]
```

예시:
- `feature/stock-api` - 주식 API 연동
- `feature/chart-visualization` - 차트 시각화
- `feature/search-filter` - 검색/필터링
- `feature/portfolio-management` - 포트폴리오 관리
- `feature/watchlist` - 관심종목

**버그 수정:**
```
fix/[버그명]
```

예시:
- `fix/price-display-error`
- `fix/routing-issue`

**리팩토링:**
```
refactor/[대상]
```

예시:
- `refactor/component-structure`
- `refactor/api-layer`

## 작업 흐름

### 1. 새로운 기능 개발 시작

```bash
# main 브랜치에서 최신 코드 받기
git checkout main
git pull origin main

# feature 브랜치 생성
git checkout -b feature/기능명
```

### 2. 개발 진행

```bash
# 작업 후 커밋
git add .
git commit -m "feat: 기능 설명"

# 원격 저장소에 푸시
git push origin feature/기능명
```

### 3. Pull Request 생성

1. GitHub에서 `feature/기능명` → `main` PR 생성
2. 코드 리뷰 요청
3. 리뷰 승인 후 Merge

### 4. Merge 후 정리

```bash
# main으로 전환
git checkout main
git pull origin main

# 완료된 feature 브랜치 삭제
git branch -d feature/기능명
git push origin --delete feature/기능명
```

## 커밋 메시지 규칙

```
<type>: <subject>

<body> (선택)
```

**Type:**
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `refactor`: 리팩토링
- `style`: 코드 포맷팅, 세미콜론 누락 등
- `chore`: 빌드, 설정 파일 수정
- `docs`: 문서 수정
- `test`: 테스트 코드

**예시:**
```
feat: Add real-time stock price API integration
fix: Fix navigation active state bug
refactor: Extract stock card into reusable component
```

## 현재 Feature 브랜치 상태

| 브랜치 | 설명 | 상태 |
|--------|------|------|
| `feature/project-setup` | 프로젝트 초기 설정, 의존성 설치 | ✅ 완료 |
| `feature/ui-components` | Navigation, Layout 등 공통 컴포넌트 | ✅ 완료 |
| `feature/pages` | Portfolio, NASDAQ 페이지 | ✅ 완료 |
| `feature/config` | .gitignore, package-lock 등 | ✅ 완료 |

## 주의사항

1. **main 브랜치에서 직접 개발 금지**
   - 항상 feature 브랜치에서 작업

2. **feature 브랜치는 작은 단위로**
   - 하나의 기능 = 하나의 브랜치
   - 너무 크면 리뷰가 어려움

3. **정기적으로 main과 동기화**
   ```bash
   git checkout feature/내브랜치
   git rebase main
   ```

4. **Merge 전 테스트**
   - 빌드 확인: `npm run build`
   - 개발 서버: `npm run dev`
