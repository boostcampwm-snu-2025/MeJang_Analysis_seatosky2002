import { useState } from 'react';
import styled from 'styled-components';
import { Stock, NewsItem } from '../types/stock';

const PageContainer = styled.div`
  display: flex;
  height: calc(100vh - 65px);
`;

const LeftPanel = styled.div`
  width: 50%;
  overflow-y: auto;
  border-right: 1px solid #1e2749;
`;

const RightPanel = styled.div`
  width: 50%;
  overflow-y: auto;
  background-color: #0f1428;
`;

const Header = styled.div`
  padding: 2rem;
  background-color: #141b3a;
  border-bottom: 1px solid #1e2749;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #8b92b0;
  font-size: 0.875rem;
`;

const StockList = styled.div`
  padding: 1rem;
`;

const StockCard = styled.div<{ $isSelected: boolean }>`
  background-color: ${props => props.$isSelected ? '#1e2749' : '#141b3a'};
  border: 1px solid ${props => props.$isSelected ? '#3b82f6' : '#1e2749'};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #1e2749;
    border-color: #3b82f6;
  }
`;

const StockHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const StockSymbol = styled.div`
  width: 48px;
  height: 48px;
  background-color: #2563eb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
`;

const StockInfo = styled.div`
  flex: 1;
`;

const StockName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.25rem;
`;

const StockCompany = styled.div`
  font-size: 0.875rem;
  color: #8b92b0;
`;

const StockPrice = styled.div`
  text-align: right;
`;

const Price = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.25rem;
`;

const Change = styled.div<{ $isPositive: boolean }>`
  font-size: 0.875rem;
  color: ${props => props.$isPositive ? '#22c55e' : '#ef4444'};
  font-weight: 500;
`;

const MiniChart = styled.div`
  height: 60px;
  margin-top: 1rem;
  background: linear-gradient(to right, transparent, rgba(59, 130, 246, 0.1));
  border-radius: 4px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(to right, #3b82f6, #22c55e);
  }
`;

const NewsContainer = styled.div`
  padding: 2rem;
`;

const NewsHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const NewsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const NewsSubtitle = styled.p`
  color: #8b92b0;
  font-size: 0.875rem;
`;

const NewsCard = styled.div`
  background-color: #141b3a;
  border: 1px solid #1e2749;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const NewsCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
`;

const NewsItemTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  flex: 1;
`;

const SentimentBadge = styled.span<{ $sentiment: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${props => {
    switch (props.$sentiment) {
      case 'bullish': return '#22c55e';
      case 'bearish': return '#ef4444';
      default: return '#6b7280';
    }
  }};
  color: #ffffff;
`;

const NewsMetadata = styled.div`
  display: flex;
  gap: 1rem;
  color: #8b92b0;
  font-size: 0.75rem;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  color: #8b92b0;
  text-align: center;
`;

const mockStocks: Stock[] = [
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 495.82, change: 12.48, changePercent: 2.58 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 378.91, change: -3.21, changePercent: -0.84 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 141.80, change: 5.82, changePercent: 4.16 },
  { symbol: 'AAPL', name: 'Apple Inc.', price: 189.95, change: -2.15, changePercent: -1.12 },
  { symbol: 'META', name: 'Meta Platforms Inc.', price: 338.54, change: 9.02, changePercent: 2.71 },
];

const mockNews: Record<string, NewsItem[]> = {
  NVDA: [
    { id: '1', title: 'NVIDIA Announces Next-Gen AI Chip Architecture', source: 'Reuters', timestamp: '2 minutes ago', sentiment: 'bullish' },
    { id: '2', title: 'Fed Signals Potential Rate Cuts in Q1 2025', source: 'Bloomberg', timestamp: '15 minutes ago', sentiment: 'bullish' },
    { id: '3', title: 'Tech Stocks Face Headwinds from Regulatory Concerns', source: 'WSJ', timestamp: '32 minutes ago', sentiment: 'bearish' },
  ],
  MSFT: [
    { id: '4', title: 'Microsoft Cloud Revenue Beats Expectations', source: 'CNBC', timestamp: '1 hour ago', sentiment: 'bullish' },
  ],
  GOOGL: [
    { id: '5', title: 'Google AI Breakthrough in Quantum Computing', source: 'TechCrunch', timestamp: '45 minutes ago', sentiment: 'bullish' },
  ],
  AAPL: [
    { id: '6', title: 'Apple Faces Supply Chain Challenges', source: 'Financial Times', timestamp: '2 hours ago', sentiment: 'bearish' },
  ],
  META: [
    { id: '7', title: 'Meta Expands VR Product Line', source: 'The Verge', timestamp: '30 minutes ago', sentiment: 'bullish' },
  ],
};

export default function NasdaqTop100() {
  const [selectedStock, setSelectedStock] = useState<string | null>(null);

  const currentNews = selectedStock ? mockNews[selectedStock] || [] : [];

  return (
    <PageContainer>
      <LeftPanel>
        <Header>
          <Title>NASDAQ Stocks</Title>
          <Subtitle>Real-time market data</Subtitle>
        </Header>
        <StockList>
          {mockStocks.map((stock) => (
            <StockCard
              key={stock.symbol}
              $isSelected={selectedStock === stock.symbol}
              onClick={() => setSelectedStock(stock.symbol)}
            >
              <StockHeader>
                <StockSymbol>{stock.symbol.substring(0, 2)}</StockSymbol>
                <StockInfo>
                  <StockName>{stock.symbol}</StockName>
                  <StockCompany>{stock.name}</StockCompany>
                </StockInfo>
                <StockPrice>
                  <Price>${stock.price.toFixed(2)}</Price>
                  <Change $isPositive={stock.change >= 0}>
                    {stock.change >= 0 ? '↗' : '↘'} {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </Change>
                </StockPrice>
              </StockHeader>
              <MiniChart />
            </StockCard>
          ))}
        </StockList>
      </LeftPanel>

      <RightPanel>
        <Header>
          <Title>Live News Stream</Title>
          <Subtitle>Market updates & insights</Subtitle>
        </Header>
        <NewsContainer>
          {selectedStock ? (
            <>
              <NewsHeader>
                <NewsTitle>{selectedStock} News</NewsTitle>
                <NewsSubtitle>Latest updates for {mockStocks.find(s => s.symbol === selectedStock)?.name}</NewsSubtitle>
              </NewsHeader>
              {currentNews.map((news) => (
                <NewsCard key={news.id}>
                  <NewsCardHeader>
                    <NewsItemTitle>{news.title}</NewsItemTitle>
                    <SentimentBadge $sentiment={news.sentiment}>
                      {news.sentiment === 'bullish' ? 'Bullish' : news.sentiment === 'bearish' ? 'Bearish' : 'Neutral'}
                    </SentimentBadge>
                  </NewsCardHeader>
                  <NewsMetadata>
                    <span>⏱ {news.timestamp}</span>
                    <span>{news.source}</span>
                  </NewsMetadata>
                </NewsCard>
              ))}
            </>
          ) : (
            <EmptyState>
              <p>주식을 선택하면 관련 뉴스가 표시됩니다</p>
            </EmptyState>
          )}
        </NewsContainer>
      </RightPanel>
    </PageContainer>
  );
}
