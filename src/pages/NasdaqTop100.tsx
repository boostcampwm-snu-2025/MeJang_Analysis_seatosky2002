import { useState } from 'react';
import styled from 'styled-components';
import { Stock, NewsItem } from '../types/stock';
import TradingViewWidget from '../components/TradingViewWidget';

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

const ChartContainer = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: #0f1428;
`;

const ChartTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
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

// Mock 주식 데이터
const mockStocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 277.18, change: -0.71, changePercent: -0.26 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 492.02, change: 1.00, changePercent: 0.20 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 141.80, change: 5.82, changePercent: 4.16 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 227.92, change: 1.03, changePercent: 0.45 },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 184.97, change: -0.58, changePercent: -0.31 },
  { symbol: 'META', name: 'Meta Platforms Inc.', price: 338.54, change: 9.02, changePercent: 2.71 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 385.45, change: -5.20, changePercent: -1.33 },
  { symbol: 'AVGO', name: 'Broadcom Inc.', price: 228.50, change: 3.15, changePercent: 1.40 },
  { symbol: 'COST', name: 'Costco Wholesale Corporation', price: 1028.75, change: 12.50, changePercent: 1.23 },
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 858.92, change: -8.45, changePercent: -0.97 },
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
          <Subtitle>Top 10 NASDAQ stocks</Subtitle>
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
            </StockCard>
          ))}
        </StockList>
      </LeftPanel>

      <RightPanel>
        <Header>
          <Title>Stock Chart & News</Title>
          <Subtitle>
            {selectedStock
              ? `${selectedStock} - ${mockStocks.find(s => s.symbol === selectedStock)?.name}`
              : 'Select a stock to view details'}
          </Subtitle>
        </Header>
        {selectedStock ? (
          <>
            <ChartContainer>
              <ChartTitle>Price Chart</ChartTitle>
              <div style={{ height: '400px', width: '100%' }}>
                <TradingViewWidget symbol={selectedStock} theme="dark" />
              </div>
            </ChartContainer>
            <NewsContainer>
              <NewsHeader>
                <NewsTitle>Latest News</NewsTitle>
                <NewsSubtitle>Market updates & insights</NewsSubtitle>
              </NewsHeader>
              {currentNews.length > 0 ? (
                currentNews.map((news) => (
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
                ))
              ) : (
                <EmptyState>
                  <p>No news available for {selectedStock}</p>
                </EmptyState>
              )}
            </NewsContainer>
          </>
        ) : (
          <EmptyState>
            <p>주식을 선택하면 차트와 뉴스가 표시됩니다</p>
          </EmptyState>
        )}
      </RightPanel>
    </PageContainer>
  );
}
