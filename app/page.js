"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useMarketData } from '../hooks/useMarketData';
import { 
  TrendingUp, 
  Youtube, 
  BarChart3, 
  LineChart, 
  PlayCircle,
  ArrowRight,
  Activity,
  MessageSquareQuote,
  Clock,
  ShieldCheck
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

// --- 차트 가상 데이터 생성 ---
const generateChartData = (points, trend, volatility) => {
  let currentPrice = 2500;
  return Array.from({ length: points }).map((_, i) => {
    const change = (Math.random() - (trend === 'up' ? 0.4 : 0.6)) * volatility;
    currentPrice = currentPrice + change;
    return { 
      time: `${9 + Math.floor(i / 6)}:${(i % 6) * 10 || '00'}`, 
      price: Number(currentPrice.toFixed(2)) 
    };
  });
};

export default function App() {
  const [timeframe, setTimeframe] = useState('1D');
  const [chartData, setChartData] = useState(generateChartData(40, 'up', 15));
  const marketIndices = useMarketData();

  // 탭 변경 시 차트 데이터 갱신 시뮬레이션
  useEffect(() => {
    if (timeframe === '1D') setChartData(generateChartData(40, 'up', 15));
    if (timeframe === '1W') setChartData(generateChartData(30, 'up', 40));
    if (timeframe === '1M') setChartData(generateChartData(20, 'up', 100));
  }, [timeframe]);


  const ytLink = "https://www.youtube.com/@%ED%8A%BC%ED%8A%BC%EC%A3%BC%EC%8B%9D-i5u";

  return (
    <div className="min-h-screen bg-[#0a0f16] text-slate-100 font-sans selection:bg-red-500/30">
      
      {/* 1. 글로벌 네비게이션 (Header) */}
      <header className="fixed top-0 w-full z-50 bg-[#0a0f16]/90 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-black border border-white/10 shadow-lg shadow-black/50 flex items-center justify-center">
              {/* 스크린샷에 올리신 public 폴더 내부의 logo.png 파일을 사용합니다 */}
              <img src="/logo.png" alt="튼튼주식 로고" className="w-full h-full object-cover" />
            </div>
            <span className="text-2xl font-bold tracking-tight">튼튼주식</span>
          </div>
          <a 
            href={ytLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-red-500/30"
          >
            <Youtube size={20} />
            <span className="hidden sm:inline">유튜브 구독</span>
          </a>
        </div>

        {/* 2. 실시간 증시 전광판 (Ticker) */}
        <div className="w-full bg-[#111824] border-b border-white/5 overflow-hidden flex items-center h-10 text-sm">
          <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
            {[...marketIndices, ...marketIndices].map((index, i) => (
              <div key={i} className="flex items-center gap-2 mx-6">
                <span className="text-slate-400 font-medium">{index.name}</span>
                <span className="font-bold">
                  {index.prefix || ''}
                  {index.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  {index.suffix || ''}
                </span>
                <span className={`text-xs font-bold flex items-center ${index.isUp ? 'text-red-500' : 'text-blue-500'}`}>
                  {index.isUp ? '▲' : '▼'} {Math.abs(index.change).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({Math.abs(index.percent).toFixed(2)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* 3. Hero 섹션 (실시간 차트 & 메인 카피) */}
      <section className="pt-36 pb-20 md:pt-48 md:pb-28 px-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                장중 실시간 브리핑 진행중
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.15] text-white">
                흔들림 없는 투자의 기준,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">
                  튼튼주식
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-lg font-light">
                감에 의존하는 투자는 이제 그만. 정확한 데이터 분석과 실전 차트리딩으로 당신의 계좌를 튼튼하게 지켜드립니다.
              </p>
              
              <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                <a 
                  href={ytLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-[#0a0f16] font-bold rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 text-lg shadow-xl shadow-white/10"
                >
                  <PlayCircle size={24} />
                  최신 분석 영상 보기
                </a>
              </div>
            </motion.div>

            {/* 인터랙티브 차트 컴포넌트 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full h-[450px]"
            >
              <div className="absolute inset-0 bg-[#111824]/80 rounded-3xl border border-white/10 backdrop-blur-lg p-5 md:p-6 flex flex-col shadow-2xl">
                <div className="flex flex-wrap gap-4 justify-between items-start mb-6">
                  <div>
                    <h3 className="text-slate-400 font-medium flex items-center gap-2 text-sm uppercase tracking-wider">
                      <BarChart3 size={16} />
                      TTStock Model Portfolio
                    </h3>
                    <div className="text-3xl md:text-4xl font-bold mt-2 text-white flex items-end gap-3 tracking-tight">
                      {chartData[chartData.length - 1].price.toLocaleString(undefined, {minimumFractionDigits: 2})}
                      <span className="text-red-500 text-lg flex items-center bg-red-500/10 px-2 py-0.5 rounded-md font-semibold mb-1">
                        ▲ 2.45%
                      </span>
                    </div>
                  </div>
                  
                  {/* 타임프레임 스위치 */}
                  <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
                    {['1D', '1W', '1M'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setTimeframe(tab)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                          timeframe === tab 
                            ? 'bg-slate-800 text-white shadow-sm' 
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex-1 w-full min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                      <XAxis 
                        dataKey="time" 
                        hide 
                      />
                      <YAxis 
                        domain={['dataMin - 100', 'dataMax + 100']} 
                        hide 
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0a0f16', borderColor: '#ffffff1a', borderRadius: '8px', color: '#fff' }}
                        itemStyle={{ color: '#ef4444', fontWeight: 'bold' }}
                        labelStyle={{ color: '#94a3b8' }}
                        formatter={(value) => [`${value.toLocaleString()}`, 'Price']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#ef4444" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorPrice)" 
                        isAnimationActive={true}
                        animationDuration={1000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* 4. 주요 콘텐츠 소개 (Features) */}
      <section className="py-24 bg-[#0d131c]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">채널 핵심 포인트</h2>
            <p className="text-slate-400 text-lg">튼튼주식은 오직 팩트와 차트에 기반한 정보만 전달합니다.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Activity className="text-red-500" size={32} />,
                title: "매일 아침 시황 브리핑",
                desc: "미국 증시 마감 상황부터 국내 증시 개장 전 필수 체크 포인트까지 매일 아침 요약해 드립니다."
              },
              {
                icon: <LineChart className="text-blue-500" size={32} />,
                title: "가치/실전 차트 분석",
                desc: "단순한 기법이 아닌, 거래량과 캔들을 통해 세력의 흐름을 읽어내는 실전 차트 분석을 알려드립니다."
              },
              {
                icon: <ShieldCheck className="text-emerald-500" size={32} />,
                title: "소외주/저평가 발굴",
                desc: "시장에서 소외되어 있지만 실적이 탄탄한 기업들을 미리 발굴하여 안전한 투자를 지향합니다."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-[#111824] p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="mb-6 bg-[#0a0f16] w-16 h-16 rounded-xl flex items-center justify-center border border-white/5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 비디오 섹션 */}
      <section id="videos" className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">필수 시청 영상 🎬</h2>
              <p className="text-slate-400">구독자들이 추천하는 튼튼주식의 핵심 분석 강좌입니다.</p>
            </div>
            <a href={ytLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-red-500 hover:text-red-400 font-bold transition-colors">
              유튜브에서 더 보기 <ArrowRight size={18} />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                title: "[필독] 2026년 하반기 주도주 장세, 이 섹터를 주목하라! 🚀",
                category: "하반기 전망",
                views: "4.2만 회",
                time: "2일 전",
                image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
              },
              {
                id: 2,
                title: "초보 개미도 절대 물리지 않는 마법의 차트 보는 법 📈",
                category: "차트 교육",
                views: "12만 회",
                time: "1주 전",
                image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
              },
              {
                id: 3,
                title: "[긴급점검] 나스닥 급락상황, 위기일까 기회일까? 📊",
                category: "시황 속보",
                views: "8.5만 회",
                time: "3주 전",
                image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80",
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
                className="group block bg-[#111824] border border-white/5 rounded-2xl overflow-hidden hover:border-red-500/50 transition-all hover:shadow-2xl hover:shadow-red-500/10 cursor-pointer"
              >
                <div className="aspect-video w-full relative overflow-hidden bg-slate-800">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors z-10"></div>
                  <img src={video.image} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-14 h-14 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-xl">
                      <PlayCircle size={32} strokeWidth={1.5} className="ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold text-red-500 mb-3 tracking-widest">{video.category}</div>
                  <h3 className="text-lg font-bold mb-4 line-clamp-2 text-slate-100 group-hover:text-red-400 transition-colors leading-snug">
                    {video.title}
                  </h3>
                  <div className="flex items-center text-sm text-slate-500 gap-2 font-medium">
                    <Clock size={14} />
                    <span>조회수 {video.views}</span>
                    <span>•</span>
                    <span>{video.time}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 구독자 후기 */}
      <section className="py-24 bg-[#0d131c] border-t border-white/5">
         <div className="container mx-auto px-6 max-w-7xl">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-bold mb-4">함께 성장하는 구독자들</h2>
             <p className="text-slate-400 text-lg">튼튼주식과 함께 투자 습관을 바꿔나가는 분들의 리얼 후기입니다.</p>
           </div>

           <div className="grid md:grid-cols-3 gap-6">
             {[
               { name: "주린이탈출", text: "상승장 하락장 가리지 않고 멘탈 잡는 법을 배웠습니다. 요즘은 뇌동매매 절대 안해요!", label: "구독 6개월차" },
               { name: "불기둥가즈아", text: "차트 보는 눈이 완전히 달라졌어요. 알려주신 타점에서 분할매수 하니까 승률이 정말 좋아졌습니다.", label: "구독 1년차" },
               { name: "직장인투자자", text: "매일 아침 출근길에 시황 브리핑 듣는게 하루 루틴입니다. 핵심만 짚어주셔서 시간이 절약돼요.", label: "구독 3개월차" }
             ].map((review, i) => (
               <div key={i} className="bg-[#111824] p-8 rounded-2xl border border-white/5 relative">
                 <MessageSquareQuote className="absolute top-6 right-6 text-white/5" size={60} />
                 <div className="flex text-amber-400 mb-4">
                   {"★★★★★".split("").map((star, j) => <span key={j}>{star}</span>)}
                 </div>
                 <p className="text-lg text-slate-300 leading-relaxed mb-6">"{review.text}"</p>
                 <div className="flex items-center justify-between">
                   <div className="font-bold text-white">{review.name}</div>
                   <div className="text-xs text-slate-500 bg-[#0a0f16] px-2 py-1 rounded">{review.label}</div>
                 </div>
               </div>
             ))}
           </div>
         </div>
      </section>

      {/* 7. 마무리 CTA & Footer */}
      <section className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="w-16 h-16 bg-red-500/20 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Youtube className="text-red-500" size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">투자는 감이 아니라 데이터입니다</h2>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            매일 쏟아지는 수많은 정보 속에서 진짜 가치 있는 인사이트를 찾아냅니다.<br className="hidden md:block"/>
            튼튼주식과 함께 잃지 않는 투자를 시작하세요.
          </p>
          <a 
            href={ytLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-10 py-5 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-xl shadow-red-600/20"
          >
            <Youtube size={24} />
            채널 바로가기
          </a>
        </div>
      </section>

      <footer className="py-12 bg-[#05080c] border-t border-white/5 text-slate-500 text-sm">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex items-center gap-2 font-bold text-slate-300 text-lg">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-black">
                <img src="/logo.png" alt="튼튼주식 로고" className="w-full h-full object-cover" />
              </div>
              튼튼주식
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">이용약관</a>
              <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
              <a href={ytLink} className="hover:text-white transition-colors">유튜브 채널</a>
            </div>
          </div>
          
          <div className="bg-white/5 p-6 rounded-xl border border-white/5 text-xs text-slate-500 leading-relaxed mb-8">
            <h4 className="font-bold text-slate-400 mb-2 flex items-center gap-2">
              <ShieldCheck size={16}/> 투자 유의사항 (Disclaimer)
            </h4>
            본 웹사이트 및 '튼튼주식' 채널에서 제공하는 모든 콘텐츠는 투자 판단을 위한 참고 자료일 뿐이며, 투자 권유를 목적으로 하지 않습니다. 주식 투자는 원금 손실의 위험이 있으며, 모든 투자에 대한 최종 판단과 책임은 투자자 본인에게 있습니다. 과거의 수익률이 미래의 수익을 보장하지 않습니다. 
          </div>

          <div className="text-center md:text-left flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} 튼튼주식 (TTStock). All rights reserved.</p>
            <p className="mt-2 md:mt-0">이메일 문의: contact@ttstock.example.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}