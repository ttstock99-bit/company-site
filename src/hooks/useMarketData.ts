import { useState, useEffect } from 'react';

export interface MarketItem {
  id: string;
  name: string;
  value: number;
  change: number;
  percent: number;
  isUp: boolean;
  type: 'crypto' | 'stock' | 'currency';
  prefix?: string;
  suffix?: string;
}

const initialData: MarketItem[] = [
  { id: 'kospi', name: 'KOSPI', value: 2753.12, change: 24.10, percent: 0.88, isUp: true, type: 'stock' },
  { id: 'kosdaq', name: 'KOSDAQ', value: 870.43, change: -5.21, percent: -0.59, isUp: false, type: 'stock' },
  { id: 'sp500', name: 'S&P 500', value: 5210.30, change: 35.12, percent: 0.68, isUp: true, type: 'stock' },
  { id: 'nasdaq', name: 'NASDAQ', value: 16340.50, change: -120.40, percent: -0.74, isUp: false, type: 'stock' },
  { id: 'usdkrw', name: 'USD/KRW', value: 1380.20, change: 4.50, percent: 0.33, isUp: true, type: 'currency', suffix: '원' },
  { id: 'btc', name: 'Bitcoin', value: 64000.00, change: 150.00, percent: 0.23, isUp: true, type: 'crypto', prefix: '$' },
];

export function useMarketData() {
  const [marketData, setMarketData] = useState<MarketItem[]>(initialData);

  // 증시 및 환율 시뮬레이션 (2~4초마다 변동)
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prevData => prevData.map(item => {
        if (item.type !== 'crypto') {
          // 주식은 0.05%, 환율은 0.02% 변동폭
          const volatility = item.type === 'stock' ? (item.value * 0.0005) : (item.value * 0.0002); 
          const changeDelta = (Math.random() - 0.5) * volatility;
          
          const newValue = item.value + changeDelta;
          const newChange = item.change + changeDelta;
          // 등락률 계산: newChange / (newValue - newChange) * 100
          const baseValue = newValue - newChange;
          const newPercent = (newChange / baseValue) * 100;

          return {
            ...item,
            value: newValue,
            change: newChange,
            percent: newPercent,
            isUp: newChange >= 0
          };
        }
        return item;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 비트코인 실제 실시간 데이터 연동 (Binance WebSocket)
  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const currentPrice = parseFloat(data.c); // 현재가
        const priceChange = parseFloat(data.p); // 24시간 변동량
        const percentChange = parseFloat(data.P); // 24시간 변동률

        setMarketData(prevData => prevData.map(item => 
          item.id === 'btc' 
            ? { 
                ...item, 
                value: currentPrice, 
                change: priceChange, 
                percent: percentChange, 
                isUp: priceChange >= 0 
              } 
            : item
        ));
      } catch (e) {
        console.error('WebSocket 데이터 파싱 에러', e);
      }
    };

    return () => ws.close();
  }, []);

  return marketData;
}
