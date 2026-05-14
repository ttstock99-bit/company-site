import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Youtube, 
  BarChart3, 
  LineChart, 
  PlayCircle,
  Bell,
  ArrowRight,
  Activity
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// Mock data for the stock chart
const initialData = [
  { time: '10:00', price: 150.2 },
  { time: '11:00', price: 151.5 },
  { time: '12:00', price: 149.8 },
  { time: '13:00', price: 153.2 },
  { time: '14:00', price: 152.0 },
  { time: '15:00', price: 155.6 },
  { time: '16:00', price: 158.4 },
  { time: '17:00', price: 162.1 },
  { time: '18:00', price: 161.8 },
  { time: '19:00', price: 165.5 },
  { time: '20:00', price: 164.2 },
  { time: '21:00', price: 168.9 },
  { time: '22:00', price: 172.5 },
];

export default function App() {
  const [chartData, setChartData] = useState(initialData);

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const lastPrice = prev[prev.length - 1].price;
        const change = (Math.random() - 0.3) * 3; // Slight upward bias
        const newPrice = Number((lastPrice + change).toFixed(1));
        const newTime = `${(22 + Math.floor(prev.length / 2)) % 24}:00`;
        
        return [...prev.slice(1), { time: newTime, price: newPrice }];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const ytLink = "https://www.youtube.com/@%ED%8A%BC%ED%8A%BC%EC%A3%BC%EC%8B%9D-i5u";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <TrendingUp className="text-slate-950" size={24} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold tracking-tight">튼튼주식</span>
          </div>
          <a shrink-0
            href={ytLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium transition-colors"
          >
            <Youtube size={20} />
            <span className="hidden sm:inline">구독하기</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                실시간 주식 인사이트
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                흔들리지 않는<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  튼튼한 투자
                </span>
                의 시작
              </h1>
              <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed max-w-lg">
                시장 분석부터 종목 발굴까지. 튼튼주식과 함께라면 당신의 계좌도 우상향할 수 있습니다. 지금 유튜브 채널에서 확인하세요.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href={ytLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-8 py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-2 text-lg"
                >
                  <PlayCircle size={24} />
                  최신 영상 보기
                </a>
                <a 
                  href="#videos" 
                  className="px-8 py-4 bg-slate-900 border border-slate-800 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2 text-lg"
                >
                  채널 소개
                </a>
              </div>
              
              <div className="mt-10 flex items-center gap-6 text-sm text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <Activity size={18} className="text-emerald-500" />
                  <span>시황 분석</span>
                </div>
                <div className="flex items-center gap-2">
                  <LineChart size={18} className="text-emerald-500" />
                  <span>차트 분석</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bell size={18} className="text-emerald-500" />
                  <span>실시간 이슈</span>
                </div>
              </div>
            </motion.div>

            {/* Chart Area */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full h-[400px] md:h-[500px]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-cyan-500/5 rounded-3xl border border-slate-800/50 backdrop-blur-sm p-6 flex flex-col">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h3 className="text-slate-400 font-medium flex items-center gap-2">
                      <BarChart3 size={18} />
                      TTStock Portfolio Index
                    </h3>
                    <div className="text-4xl font-bold mt-2 text-white flex items-center gap-3">
                      {chartData[chartData.length - 1].price.toFixed(2)}
                      <span className="text-emerald-400 text-lg flex items-center bg-emerald-400/10 px-2 py-1 rounded-md">
                        <TrendingUp size={16} className="mr-1"/>
                        +{(chartData[chartData.length - 1].price - chartData[0].price).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-slate-500 bg-slate-900/80 px-2 py-1 rounded">
                    LIVE
                  </div>
                </div>
                
                <div className="flex-1 w-full min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis 
                        dataKey="time" 
                        hide 
                      />
                      <YAxis 
                        domain={['dataMin - 5', 'dataMax + 5']} 
                        hide 
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                        itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                        labelStyle={{ color: '#94a3b8' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorPrice)" 
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos" className="py-24 bg-slate-900/50 border-t border-slate-800">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">인기 콘텐츠</h2>
              <p className="text-slate-400">구독자들이 가장 많이 찾는 튼튼주식의 핵심 분석 영상들입니다.</p>
            </div>
            <a href={ytLink} target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              채널로 이동하기 <ArrowRight size={18} />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                title: "2026년 하반기 주도주 장세, 이 섹터를 주목하라! 🚀",
                category: "시장 분석",
                views: "4.2만 회",
                time: "2일 전",
                color: "from-blue-500/20 to-indigo-500/20",
                iconColor: "text-blue-400"
              },
              {
                id: 2,
                title: "초보 개미도 물리지 않는 마법의 차트 보는 법 📈",
                category: "차트 교육",
                views: "12만 회",
                time: "1주 전",
                color: "from-emerald-500/20 to-teal-500/20",
                iconColor: "text-emerald-400"
              },
              {
                id: 3,
                title: "[긴급점검] 나스닥 급락, 지금이 기회일까 위기일까? 📊",
                category: "시황 속보",
                views: "8.5만 회",
                time: "3주 전",
                color: "from-rose-500/20 to-orange-500/20",
                iconColor: "text-rose-400"
              }
            ].map((video, idx) => (
              <motion.a
                href={ytLink}
                target="_blank"
                rel="noreferrer"
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group block bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer"
              >
                <div className={`aspect-video w-full bg-gradient-to-br ${video.color} relative flex items-center justify-center p-6 text-center`}>
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors"></div>
                  <PlayCircle className={`w-16 h-16 ${video.iconColor} opacity-80 group-hover:scale-110 transition-transform relative z-10`} strokeWidth={1.5} />
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold text-emerald-400 mb-2">{video.category}</div>
                  <h3 className="text-lg font-bold mb-3 line-clamp-2 text-slate-100 group-hover:text-emerald-300 transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center text-sm text-slate-500 gap-2">
                    <span>조회수 {video.views}</span>
                    <span>•</span>
                    <span>{video.time}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
          
          <div className="mt-8 md:hidden flex justify-center">
            <a href={ytLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              더 많은 영상 보기 <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-6 border-t border-slate-800">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <TrendingUp className="text-emerald-400" size={32} />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">투자는 감이 아니라 데이터입니다.</h2>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed">
            매일 쏟아지는 수많은 정보 속에서 진짜 가치 있는 인사이트를 찾아냅니다.<br className="hidden md:block"/>
            튼튼주식과 함께 객관적인 데이터와 날카로운 차트 분석으로 시장을 앞서가세요.
          </p>
          <a 
            href={ytLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-lg transition-colors shadow-lg shadow-red-600/20"
          >
            <Youtube size={24} />
            지금 유튜브 채널 구독하기
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 border-t border-slate-900 text-center text-slate-500">
        <p>© {new Date().getFullYear()} 튼튼주식 (TTStock). All rights reserved.</p>
        <p className="text-sm mt-2">본 채널의 정보는 투자 참고용이며, 투자 책임은 본인에게 있습니다.</p>
      </footer>
    </div>
  );
}

