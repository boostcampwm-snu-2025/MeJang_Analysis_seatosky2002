import styled from 'styled-components';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #ffffff;
`;

const PortfolioCard = styled.div`
  background-color: #141b3a;
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid #1e2749;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const StatItem = styled.div`
  background-color: #1e2749;
  padding: 1.5rem;
  border-radius: 8px;
`;

const StatLabel = styled.div`
  color: #8b92b0;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 600;
`;

export default function Portfolio() {
  return (
    <Container>
      <Title>내 잔고</Title>
      <PortfolioCard>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>포트폴리오 요약</h2>
        <StatsGrid>
          <StatItem>
            <StatLabel>총 자산</StatLabel>
            <StatValue>$50,000.00</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>총 손익</StatLabel>
            <StatValue style={{ color: '#22c55e' }}>+$5,234.50</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>수익률</StatLabel>
            <StatValue style={{ color: '#22c55e' }}>+11.63%</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>보유 종목</StatLabel>
            <StatValue>12</StatValue>
          </StatItem>
        </StatsGrid>
      </PortfolioCard>
    </Container>
  );
}
