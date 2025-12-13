import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
  margin-bottom: 2rem;
`;

const PortfolioSelector = styled.div`
  margin-bottom: 1.5rem;
`;

const PortfolioButton = styled.button<{ selected: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: 2px solid ${props => props.selected ? '#3b82f6' : '#1e2749'};
  background-color: ${props => props.selected ? '#1e3a8a' : '#1e2749'};
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 0.75rem;
  margin-bottom: 0.75rem;

  &:hover {
    border-color: #3b82f6;
    background-color: #1e3a8a;
  }
`;

const DateInputSection = styled.div`
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const DateInput = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #1e2749;
  background-color: #1e2749;
  color: #ffffff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const CalculateButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  background-color: #3b82f6;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #4b5563;
    cursor: not-allowed;
  }
`;

const PortfolioTable = styled.table`
  width: 100%;
  margin-top: 1.5rem;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 1rem;
  color: #8b92b0;
  font-weight: 600;
  border-bottom: 1px solid #1e2749;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #1e2749;

  &:hover {
    background-color: #1e2749;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  color: #ffffff;
`;

const ResultCard = styled.div`
  background-color: #1e2749;
  padding: 2rem;
  border-radius: 12px;
  margin-top: 2rem;
`;

const ResultTitle = styled.h3`
  color: #ffffff;
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const ResultItem = styled.div`
  background-color: #141b3a;
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

const ChartContainer = styled.div`
  margin-top: 2rem;
  background-color: #141b3a;
  padding: 1.5rem;
  border-radius: 8px;
`;

interface Stock {
  symbol: string;
  name: string;
  allocation: number;
  historicalPrices: { [date: string]: number };
}

interface Portfolio {
  id: string;
  name: string;
  description: string;
  stocks: Stock[];
}

interface StockResult {
  symbol: string;
  name: string;
  allocation: number;
  initialPrice: number;
  currentPrice: number;
  return: number;
  returnRate: number;
}

interface CalculationResult {
  initialValue: number;
  currentValue: number;
  profit: number;
  returnRate: number;
  startDate: string;
  stockResults: StockResult[];
  monthlyData: { month: string; value: number }[];
}

const portfolios: Portfolio[] = [
  {
    id: 'tech-giants',
    name: '빅테크 포트폴리오',
    description: 'FAANG 중심의 테크 대기업 포트폴리오',
    stocks: [
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        allocation: 25,
        historicalPrices: {
          '2024-01-01': 185.64, '2024-02-01': 181.42, '2024-03-01': 171.48,
          '2024-04-01': 169.30, '2024-05-01': 189.98, '2024-06-01': 214.29,
          '2024-07-01': 218.24, '2024-08-01': 224.72, '2024-09-01': 226.37,
          '2024-10-01': 225.91, '2024-11-01': 222.91, '2024-12-01': 245.50,
        }
      },
      {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        allocation: 20,
        historicalPrices: {
          '2024-01-01': 140.93, '2024-02-01': 142.56, '2024-03-01': 151.57,
          '2024-04-01': 157.79, '2024-05-01': 176.89, '2024-06-01': 183.31,
          '2024-07-01': 181.34, '2024-08-01': 165.00, '2024-09-01': 163.57,
          '2024-10-01': 166.84, '2024-11-01': 171.69, '2024-12-01': 178.20,
        }
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft Corp.',
        allocation: 25,
        historicalPrices: {
          '2024-01-01': 376.04, '2024-02-01': 407.04, '2024-03-01': 420.72,
          '2024-04-01': 398.95, '2024-05-01': 424.01, '2024-06-01': 446.95,
          '2024-07-01': 432.61, '2024-08-01': 417.35, '2024-09-01': 430.35,
          '2024-10-01': 416.06, '2024-11-01': 423.02, '2024-12-01': 445.80,
        }
      },
      {
        symbol: 'AMZN',
        name: 'Amazon.com Inc.',
        allocation: 20,
        historicalPrices: {
          '2024-01-01': 151.94, '2024-02-01': 171.81, '2024-03-01': 180.74,
          '2024-04-01': 179.29, '2024-05-01': 186.13, '2024-06-01': 193.25,
          '2024-07-01': 181.05, '2024-08-01': 176.57, '2024-09-01': 186.51,
          '2024-10-01': 197.93, '2024-11-01': 206.90, '2024-12-01': 215.30,
        }
      },
      {
        symbol: 'META',
        name: 'Meta Platforms',
        allocation: 10,
        historicalPrices: {
          '2024-01-01': 353.96, '2024-02-01': 474.99, '2024-03-01': 493.86,
          '2024-04-01': 440.36, '2024-05-01': 467.01, '2024-06-01': 497.96,
          '2024-07-01': 476.89, '2024-08-01': 527.34, '2024-09-01': 567.32,
          '2024-10-01': 567.58, '2024-11-01': 559.04, '2024-12-01': 595.94,
        }
      }
    ]
  },
  {
    id: 'buffett-style',
    name: '워렌 버핏 스타일',
    description: '가치투자 중심의 안정적인 대형주 포트폴리오',
    stocks: [
      {
        symbol: 'BRK.B',
        name: 'Berkshire Hathaway',
        allocation: 30,
        historicalPrices: {
          '2024-01-01': 355.17, '2024-02-01': 400.80, '2024-03-01': 418.36,
          '2024-04-01': 393.24, '2024-05-01': 411.63, '2024-06-01': 400.45,
          '2024-07-01': 442.28, '2024-08-01': 455.58, '2024-09-01': 458.02,
          '2024-10-01': 450.91, '2024-11-01': 465.70, '2024-12-01': 478.50,
        }
      },
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        allocation: 25,
        historicalPrices: {
          '2024-01-01': 185.64, '2024-02-01': 181.42, '2024-03-01': 171.48,
          '2024-04-01': 169.30, '2024-05-01': 189.98, '2024-06-01': 214.29,
          '2024-07-01': 218.24, '2024-08-01': 224.72, '2024-09-01': 226.37,
          '2024-10-01': 225.91, '2024-11-01': 222.91, '2024-12-01': 245.50,
        }
      },
      {
        symbol: 'BAC',
        name: 'Bank of America',
        allocation: 20,
        historicalPrices: {
          '2024-01-01': 33.19, '2024-02-01': 34.15, '2024-03-01': 38.51,
          '2024-04-01': 37.05, '2024-05-01': 39.65, '2024-06-01': 40.08,
          '2024-07-01': 40.53, '2024-08-01': 39.55, '2024-09-01': 40.29,
          '2024-10-01': 40.86, '2024-11-01': 45.79, '2024-12-01': 47.20,
        }
      },
      {
        symbol: 'KO',
        name: 'Coca-Cola',
        allocation: 15,
        historicalPrices: {
          '2024-01-01': 59.37, '2024-02-01': 59.86, '2024-03-01': 61.75,
          '2024-04-01': 61.51, '2024-05-01': 63.72, '2024-06-01': 63.02,
          '2024-07-01': 65.96, '2024-08-01': 70.54, '2024-09-01': 70.21,
          '2024-10-01': 69.05, '2024-11-01': 63.35, '2024-12-01': 64.50,
        }
      },
      {
        symbol: 'AXP',
        name: 'American Express',
        allocation: 10,
        historicalPrices: {
          '2024-01-01': 189.12, '2024-02-01': 216.71, '2024-03-01': 227.61,
          '2024-04-01': 223.74, '2024-05-01': 242.61, '2024-06-01': 230.60,
          '2024-07-01': 255.71, '2024-08-01': 265.92, '2024-09-01': 279.99,
          '2024-10-01': 294.55, '2024-11-01': 298.16, '2024-12-01': 310.75,
        }
      }
    ]
  },
  {
    id: 'ark-innovation',
    name: 'ARK Innovation 스타일 (캐시 우드)',
    description: '혁신 기술 기업 중심의 성장형 포트폴리오',
    stocks: [
      {
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        allocation: 30,
        historicalPrices: {
          '2024-01-01': 248.48, '2024-02-01': 199.73, '2024-03-01': 175.79,
          '2024-04-01': 162.03, '2024-05-01': 177.48, '2024-06-01': 196.37,
          '2024-07-01': 263.26, '2024-08-01': 224.26, '2024-09-01': 250.08,
          '2024-10-01': 262.51, '2024-11-01': 345.16, '2024-12-01': 380.50,
        }
      },
      {
        symbol: 'COIN',
        name: 'Coinbase',
        allocation: 25,
        historicalPrices: {
          '2024-01-01': 159.67, '2024-02-01': 156.21, '2024-03-01': 234.49,
          '2024-04-01': 215.03, '2024-05-01': 243.40, '2024-06-01': 226.13,
          '2024-07-01': 233.56, '2024-08-01': 203.64, '2024-09-01': 203.23,
          '2024-10-01': 203.61, '2024-11-01': 329.84, '2024-12-01': 310.25,
        }
      },
      {
        symbol: 'ROKU',
        name: 'Roku Inc.',
        allocation: 15,
        historicalPrices: {
          '2024-01-01': 72.10, '2024-02-01': 67.71, '2024-03-01': 62.88,
          '2024-04-01': 61.01, '2024-05-01': 56.14, '2024-06-01': 60.69,
          '2024-07-01': 63.90, '2024-08-01': 66.80, '2024-09-01': 73.23,
          '2024-10-01': 77.89, '2024-11-01': 84.80, '2024-12-01': 92.40,
        }
      },
      {
        symbol: 'SQ',
        name: 'Block Inc.',
        allocation: 15,
        historicalPrices: {
          '2024-01-01': 74.27, '2024-02-01': 77.39, '2024-03-01': 75.78,
          '2024-04-01': 67.09, '2024-05-01': 63.71, '2024-06-01': 62.94,
          '2024-07-01': 65.88, '2024-08-01': 61.07, '2024-09-01': 66.90,
          '2024-10-01': 70.61, '2024-11-01': 85.95, '2024-12-01': 95.50,
        }
      },
      {
        symbol: 'ZM',
        name: 'Zoom Video',
        allocation: 15,
        historicalPrices: {
          '2024-01-01': 69.34, '2024-02-01': 69.51, '2024-03-01': 62.47,
          '2024-04-01': 61.78, '2024-05-01': 60.72, '2024-06-01': 60.58,
          '2024-07-01': 64.41, '2024-08-01': 66.53, '2024-09-01': 69.02,
          '2024-10-01': 70.69, '2024-11-01': 76.48, '2024-12-01': 85.70,
        }
      }
    ]
  },
  {
    id: 'dividend-kings',
    name: '배당왕 포트폴리오',
    description: '안정적인 배당 수익 중심의 보수적 포트폴리오',
    stocks: [
      {
        symbol: 'JNJ',
        name: 'Johnson & Johnson',
        allocation: 25,
        historicalPrices: {
          '2024-01-01': 157.13, '2024-02-01': 160.36, '2024-03-01': 159.78,
          '2024-04-01': 146.61, '2024-05-01': 145.35, '2024-06-01': 145.84,
          '2024-07-01': 155.62, '2024-08-01': 162.96, '2024-09-01': 162.49,
          '2024-10-01': 159.48, '2024-11-01': 154.59, '2024-12-01': 158.20,
        }
      },
      {
        symbol: 'PG',
        name: 'Procter & Gamble',
        allocation: 25,
        historicalPrices: {
          '2024-01-01': 150.21, '2024-02-01': 160.04, '2024-03-01': 163.76,
          '2024-04-01': 162.73, '2024-05-01': 164.63, '2024-06-01': 164.48,
          '2024-07-01': 169.52, '2024-08-01': 171.49, '2024-09-01': 172.06,
          '2024-10-01': 170.84, '2024-11-01': 165.49, '2024-12-01': 168.90,
        }
      },
      {
        symbol: 'KO',
        name: 'Coca-Cola',
        allocation: 20,
        historicalPrices: {
          '2024-01-01': 59.37, '2024-02-01': 59.86, '2024-03-01': 61.75,
          '2024-04-01': 61.51, '2024-05-01': 63.72, '2024-06-01': 63.02,
          '2024-07-01': 65.96, '2024-08-01': 70.54, '2024-09-01': 70.21,
          '2024-10-01': 69.05, '2024-11-01': 63.35, '2024-12-01': 64.50,
        }
      },
      {
        symbol: 'MCD',
        name: 'McDonald\'s',
        allocation: 15,
        historicalPrices: {
          '2024-01-01': 294.17, '2024-02-01': 287.76, '2024-03-01': 281.68,
          '2024-04-01': 271.87, '2024-05-01': 261.34, '2024-06-01': 258.15,
          '2024-07-01': 264.00, '2024-08-01': 285.75, '2024-09-01': 303.27,
          '2024-10-01': 301.35, '2024-11-01': 289.18, '2024-12-01': 295.40,
        }
      },
      {
        symbol: 'VZ',
        name: 'Verizon',
        allocation: 15,
        historicalPrices: {
          '2024-01-01': 38.64, '2024-02-01': 39.95, '2024-03-01': 40.23,
          '2024-04-01': 39.82, '2024-05-01': 39.58, '2024-06-01': 40.51,
          '2024-07-01': 40.98, '2024-08-01': 41.55, '2024-09-01': 43.50,
          '2024-10-01': 43.21, '2024-11-01': 41.68, '2024-12-01': 42.85,
        }
      }
    ]
  }
];

export default function Portfolio() {
  const [selectedPortfolioId, setSelectedPortfolioId] = useState('tech-giants');
  const [startDate, setStartDate] = useState('2024-01');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const selectedPortfolio = portfolios.find(p => p.id === selectedPortfolioId) || portfolios[0];

  const calculateReturn = () => {
    if (!startDate) return;

    const selectedDate = new Date(startDate);
    const startMonth = selectedDate.getMonth() + 1;
    const startYear = selectedDate.getFullYear();
    const dateKey = `${startYear}-${String(startMonth).padStart(2, '0')}-01`;

    const initialInvestment = 100000;
    let initialPortfolioValue = 0;
    let currentPortfolioValue = 0;
    const stockResults: StockResult[] = [];
    const monthlyData: { month: string; value: number }[] = [];

    selectedPortfolio.stocks.forEach(stock => {
      const allocation = (stock.allocation / 100) * initialInvestment;
      const startPrice = stock.historicalPrices[dateKey];
      const currentPrice = stock.historicalPrices['2024-12-01'];

      if (startPrice && currentPrice) {
        const shares = allocation / startPrice;
        const initialValue = shares * startPrice;
        const currentValue = shares * currentPrice;

        initialPortfolioValue += initialValue;
        currentPortfolioValue += currentValue;

        const stockProfit = currentValue - initialValue;
        const stockReturnRate = (stockProfit / initialValue) * 100;

        stockResults.push({
          symbol: stock.symbol,
          name: stock.name,
          allocation: stock.allocation,
          initialPrice: startPrice,
          currentPrice: currentPrice,
          return: stockProfit,
          returnRate: stockReturnRate
        });
      }
    });

    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    for (let i = startMonth - 1; i < 12; i++) {
      const monthKey = `2024-${months[i]}-01`;
      let monthValue = 0;

      selectedPortfolio.stocks.forEach(stock => {
        const allocation = (stock.allocation / 100) * initialInvestment;
        const startPrice = stock.historicalPrices[dateKey];
        const monthPrice = stock.historicalPrices[monthKey];

        if (startPrice && monthPrice) {
          const shares = allocation / startPrice;
          monthValue += shares * monthPrice;
        }
      });

      monthlyData.push({
        month: `2024-${months[i]}`,
        value: monthValue
      });
    }

    const profit = currentPortfolioValue - initialPortfolioValue;
    const returnRate = (profit / initialPortfolioValue) * 100;

    setResult({
      initialValue: initialPortfolioValue,
      currentValue: currentPortfolioValue,
      profit,
      returnRate,
      startDate: dateKey,
      stockResults,
      monthlyData
    });
  };

  useEffect(() => {
    if (!startDate) return;

    const selectedDate = new Date(startDate);
    const startMonth = selectedDate.getMonth() + 1;
    const startYear = selectedDate.getFullYear();
    const dateKey = `${startYear}-${String(startMonth).padStart(2, '0')}-01`;

    const initialInvestment = 100000;
    let initialPortfolioValue = 0;
    let currentPortfolioValue = 0;
    const stockResults: StockResult[] = [];
    const monthlyData: { month: string; value: number }[] = [];

    selectedPortfolio.stocks.forEach(stock => {
      const allocation = (stock.allocation / 100) * initialInvestment;
      const startPrice = stock.historicalPrices[dateKey];
      const currentPrice = stock.historicalPrices['2024-12-01'];

      if (startPrice && currentPrice) {
        const shares = allocation / startPrice;
        const initialValue = shares * startPrice;
        const currentValue = shares * currentPrice;

        initialPortfolioValue += initialValue;
        currentPortfolioValue += currentValue;

        const stockProfit = currentValue - initialValue;
        const stockReturnRate = (stockProfit / initialValue) * 100;

        stockResults.push({
          symbol: stock.symbol,
          name: stock.name,
          allocation: stock.allocation,
          initialPrice: startPrice,
          currentPrice: currentPrice,
          return: stockProfit,
          returnRate: stockReturnRate
        });
      }
    });

    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    for (let i = startMonth - 1; i < 12; i++) {
      const monthKey = `2024-${months[i]}-01`;
      let monthValue = 0;

      selectedPortfolio.stocks.forEach(stock => {
        const allocation = (stock.allocation / 100) * initialInvestment;
        const startPrice = stock.historicalPrices[dateKey];
        const monthPrice = stock.historicalPrices[monthKey];

        if (startPrice && monthPrice) {
          const shares = allocation / startPrice;
          monthValue += shares * monthPrice;
        }
      });

      monthlyData.push({
        month: `2024-${months[i]}`,
        value: monthValue
      });
    }

    const profit = currentPortfolioValue - initialPortfolioValue;
    const returnRate = (profit / initialPortfolioValue) * 100;

    setResult({
      initialValue: initialPortfolioValue,
      currentValue: currentPortfolioValue,
      profit,
      returnRate,
      startDate: dateKey,
      stockResults,
      monthlyData
    });
  }, [selectedPortfolio, startDate]);

  return (
    <Container>
      <Title>내 잔고</Title>

      <PortfolioCard>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ffffff' }}>포트폴리오 시뮬레이션</h2>
        <p style={{ color: '#8b92b0', marginBottom: '1rem' }}>
          유명 투자자 스타일의 포트폴리오를 선택하고, 특정 날짜부터 투자했다면 얼마나 수익이 났을지 계산해보세요.
        </p>

        <PortfolioSelector>
          {portfolios.map(portfolio => (
            <PortfolioButton
              key={portfolio.id}
              selected={selectedPortfolioId === portfolio.id}
              onClick={() => setSelectedPortfolioId(portfolio.id)}
            >
              {portfolio.name}
            </PortfolioButton>
          ))}
        </PortfolioSelector>

        <div style={{ backgroundColor: '#1e2749', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
          <h3 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '0.5rem' }}>
            {selectedPortfolio.name}
          </h3>
          <p style={{ color: '#8b92b0', fontSize: '0.875rem' }}>
            {selectedPortfolio.description}
          </p>
        </div>

        <PortfolioTable>
          <thead>
            <tr>
              <TableHeader>종목</TableHeader>
              <TableHeader>회사명</TableHeader>
              <TableHeader>비중</TableHeader>
            </tr>
          </thead>
          <tbody>
            {selectedPortfolio.stocks.map(stock => (
              <TableRow key={stock.symbol}>
                <TableCell style={{ fontWeight: 600 }}>{stock.symbol}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell>{stock.allocation}%</TableCell>
              </TableRow>
            ))}
          </tbody>
        </PortfolioTable>

        <DateInputSection>
          <div>
            <label style={{ color: '#8b92b0', marginRight: '0.5rem' }}>시작 날짜:</label>
            <DateInput
              type="month"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min="2024-01"
              max="2024-12"
            />
          </div>
          <CalculateButton onClick={calculateReturn} disabled={!startDate}>
            수익률 계산하기
          </CalculateButton>
        </DateInputSection>

        {result && (
          <>
            <ResultCard>
              <ResultTitle>
                {result.startDate}부터 현재까지의 총 수익률
              </ResultTitle>
              <p style={{ color: '#8b92b0', marginBottom: '1rem' }}>
                초기 투자금: $100,000 기준
              </p>
              <ResultGrid>
                <ResultItem>
                  <StatLabel>초기 투자금</StatLabel>
                  <StatValue>${result.initialValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</StatValue>
                </ResultItem>
                <ResultItem>
                  <StatLabel>현재 가치</StatLabel>
                  <StatValue>${result.currentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</StatValue>
                </ResultItem>
                <ResultItem>
                  <StatLabel>총 수익</StatLabel>
                  <StatValue style={{ color: result.profit >= 0 ? '#22c55e' : '#ef4444' }}>
                    {result.profit >= 0 ? '+' : ''}${result.profit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </StatValue>
                </ResultItem>
                <ResultItem>
                  <StatLabel>수익률</StatLabel>
                  <StatValue style={{ color: result.returnRate >= 0 ? '#22c55e' : '#ef4444' }}>
                    {result.returnRate >= 0 ? '+' : ''}{result.returnRate.toFixed(2)}%
                  </StatValue>
                </ResultItem>
              </ResultGrid>
            </ResultCard>

            <ResultCard>
              <ResultTitle>종목별 수익률</ResultTitle>
              <PortfolioTable>
                <thead>
                  <tr>
                    <TableHeader>종목</TableHeader>
                    <TableHeader>회사명</TableHeader>
                    <TableHeader>비중</TableHeader>
                    <TableHeader>시작가</TableHeader>
                    <TableHeader>현재가</TableHeader>
                    <TableHeader>수익</TableHeader>
                    <TableHeader>수익률</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {result.stockResults.map(stock => (
                    <TableRow key={stock.symbol}>
                      <TableCell style={{ fontWeight: 600 }}>{stock.symbol}</TableCell>
                      <TableCell>{stock.name}</TableCell>
                      <TableCell>{stock.allocation}%</TableCell>
                      <TableCell>${stock.initialPrice.toFixed(2)}</TableCell>
                      <TableCell>${stock.currentPrice.toFixed(2)}</TableCell>
                      <TableCell style={{ color: stock.return >= 0 ? '#22c55e' : '#ef4444' }}>
                        {stock.return >= 0 ? '+' : ''}${stock.return.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell style={{ color: stock.returnRate >= 0 ? '#22c55e' : '#ef4444', fontWeight: 600 }}>
                        {stock.returnRate >= 0 ? '+' : ''}{stock.returnRate.toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </PortfolioTable>
            </ResultCard>

            <ResultCard>
              <ResultTitle>월별 포트폴리오 가치 변화</ResultTitle>
              <ChartContainer>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={result.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e2749" />
                    <XAxis
                      dataKey="month"
                      stroke="#8b92b0"
                      tick={{ fill: '#8b92b0' }}
                    />
                    <YAxis
                      stroke="#8b92b0"
                      tick={{ fill: '#8b92b0' }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e2749',
                        border: '1px solid #3b82f6',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, '포트폴리오 가치']}
                    />
                    <Legend
                      wrapperStyle={{ color: '#8b92b0' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', r: 4 }}
                      activeDot={{ r: 6 }}
                      name="포트폴리오 가치"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </ResultCard>
          </>
        )}
      </PortfolioCard>
    </Container>
  );
}
