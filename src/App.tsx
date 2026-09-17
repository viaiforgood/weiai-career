import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Briefcase,
  Users,
  Shield,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Send,
  Building2,
  GraduationCap,
  FileText,
  Lock,
  Clock,
  ExternalLink,
  ChevronRight,
  Copy,
  Check,
  AlertCircle,
  HelpCircle,
  Award,
  Compass,
  FileCheck,
  Globe,
  UserCheck,
  Zap,
  Share2,
  X,
} from 'lucide-react';

export default function App() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  
  // URL param role detection (?role=referrer or ?role=seeker)
  const [activeTab, setActiveTab] = useState<'referrer' | 'seeker'>('referrer');
  const [copiedText, setCopiedText] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedRole, setSubmittedRole] = useState<'referrer' | 'seeker'>('referrer');

  // Web of Trust simulation state
  const [vouchCount, setVouchCount] = useState<number>(2);
  const [isFastTrack, setIsFastTrack] = useState<boolean>(false);
  const [showVouchModal, setShowVouchModal] = useState<boolean>(false);
  const [vouchCopied, setVouchCopied] = useState<boolean>(false);

  // Referrer form state
  const [refCompany, setRefCompany] = useState('');
  const [refTitle, setRefTitle] = useState('');
  const [refSchool, setRefSchool] = useState('');
  const [refQuota, setRefQuota] = useState('2');
  const [refEmail, setRefEmail] = useState('');
  const [refWeChat, setRefWeChat] = useState('');
  const [refRequirement, setRefRequirement] = useState('');

  // Seeker form state
  const [skSchool, setSkSchool] = useState('');
  const [skDegree, setSkDegree] = useState('Master');
  const [skGradYear, setSkGradYear] = useState('2026');
  const [skWorkAuth, setSkWorkAuth] = useState('STEM OPT (3年)');
  const [skTargetCompany, setSkTargetCompany] = useState('');
  const [skRole, setSkRole] = useState('');
  const [skEmail, setSkEmail] = useState('');
  const [skWeChat, setSkWeChat] = useState('');
  const [skVoucherInfo, setSkVoucherInfo] = useState('');
  const [skNeedCouncilFastTrack, setSkNeedCouncilFastTrack] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get('role');
    if (roleParam === 'seeker') {
      setActiveTab('seeker');
    } else if (roleParam === 'referrer') {
      setActiveTab('referrer');
    }
  }, []);

  const handleCopyReferralNote = () => {
    const text = `Recommending fellow alum [Zhang] for the L4 Backend role. Strong distributed systems background from CMU with hands-on C++ storage engine contributions. Meets all core team requirements via NACUAA Alum verification.`;
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleCopyVouchLink = () => {
    navigator.clipboard.writeText('https://c.vi.fyi/vouch/zhang-cmu24');
    setVouchCopied(true);
    setTimeout(() => setVouchCopied(false), 2000);
  };

  const handleReferrerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refCompany || !refEmail) return;
    setSubmittedRole('referrer');
    setSubmitted(true);
  };

  const handleSeekerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skSchool || !skEmail) return;
    setSubmittedRole('seeker');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-indigo-900/60 via-purple-900/50 to-slate-900/60 border-b border-indigo-500/30 px-4 py-2 text-center text-xs text-indigo-200 flex items-center justify-center gap-2">
        <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">
          Closed Beta
        </span>
        <span>VI AI 职引首期名企校友内测启动 · 严禁任何形式内推买卖，真实校友纯公益互助</span>
        <span className="hidden sm:inline text-slate-500">|</span>
        <span className="hidden sm:inline text-slate-400 font-mono text-[11px]">短链: c.vi.fyi (求职) · r.vi.fyi (引路人)</span>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#050b18]/90 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 flex items-center justify-center font-black text-white text-base shadow-lg shadow-indigo-500/25 border border-indigo-400/40">
              VI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-white">VI AI 职引</span>
                <span className="text-[10px] bg-slate-800 text-indigo-300 border border-slate-700 px-1.5 py-0.5 rounded font-mono">
                  ViCareer
                </span>
              </div>
              <p className="text-[10px] text-slate-400">北美高校校友职业与内推协作平台 · NACUAA 联合发起</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">平台优势</a>
            <a href="#ai-demo" className="hover:text-white transition-colors">AI 分诊评语</a>
            <a href="#web-of-trust" className="hover:text-cyan-300 transition-colors text-cyan-400 font-medium flex items-center gap-1">
              <Shield className="w-3 h-3 text-cyan-400" />
              <span>三度背书网</span>
            </a>
            <a href="#workflow" className="hover:text-white transition-colors">五态流转</a>
            <a href="#intake" className="hover:text-white transition-colors font-semibold text-indigo-300">内测报名</a>
            <a href="#compliance" className="hover:text-white transition-colors">风控合规</a>
          </nav>

          {/* Ecosystem & Auth Buttons */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://account.weiai.ai"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs hover:border-slate-700 transition-colors"
            >
              <span>个人中心</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-indigo-300 font-mono hidden sm:inline">{user?.email}</span>
                <button
                  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  退出
                </button>
              </div>
            ) : (
              <button
                onClick={() => loginWithRedirect()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all active:scale-95"
              >
                SSO 登录
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1">

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
          {/* Ambient Background Glows */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Badges */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-indigo-500/30 text-xs text-indigo-300 backdrop-blur shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>以校友信任为基石 · 以职场内推为桥梁</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 font-medium">VI AI × NACUAA 北美高校联盟</span>
          </div>

          {/* Headline */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              拒绝简历海投石沉大海<br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                名企校友 1 对 1 纯净直推
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              汇聚 Google、Meta、OpenAI、微软、Apple、量化对冲及各领域北美在职校友。
              替内推人生成 <strong>150 字 Workday 推荐评语</strong>，按 <strong>OPT / H-1B 签证合规分诊</strong>，全程五态透明跟踪。
            </p>
          </div>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-2">
            <a
              href="#intake"
              onClick={() => setActiveTab('referrer')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/25 transition-all active:scale-95"
            >
              <Briefcase className="w-4 h-4" />
              <span>在职引路人登记 (首批 30 席)</span>
            </a>

            <a
              href="#intake"
              onClick={() => setActiveTab('seeker')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Users className="w-4 h-4 text-cyan-400" />
              <span>求职校友排队报名</span>
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto pt-6 text-left">
            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100% 真实在职
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">严格校验企业邮箱与校友身份</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <Shield className="w-3.5 h-3.5 text-indigo-400" /> 严禁任何对价
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">纯校友公益互助，永久免费</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> 每周配额限流
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">每周最多2~3份，保护内推人精力</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <Lock className="w-3.5 h-3.5 text-cyan-400" /> 隐私私有存储
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">私有 R2 加密，严禁 AI 语料滥用</p>
            </div>
          </div>
        </section>

        {/* Section 2: AI Triage Showcase (P0 Killer Feature) */}
        <section id="ai-demo" className="py-12 bg-slate-900/40 border-y border-slate-800/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center space-y-2">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider font-mono">
                P0 Killer Feature · 为内推人减负
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                AI 候选人一页分诊卡与评语生成
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
                不让在职工程师翻看臃肿的 3 页 PDF。系统将简历与 JD 压成一页对比表，并直接草拟好粘贴至 Workday 的评语。
              </p>
            </div>

            {/* Interactive Card */}
            <div className="bg-gradient-to-b from-slate-900/90 via-[#0a1733]/90 to-slate-900/90 border border-indigo-500/30 rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
              
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center font-bold text-indigo-300">
                    张
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">张校友</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-mono">
                        校友已认证 · 清华 18 级本 / CMU 22 级 MS
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">目标内推：Google Core Infra · L4 Backend Engineer (Sunnyvale)</p>
                  </div>
                </div>

                {/* Work Auth Tag */}
                <div className="px-3 py-1 rounded-xl bg-indigo-950/80 border border-indigo-500/40 text-xs font-mono text-indigo-300 shrink-0">
                  <span>🛂 身份状态：</span>
                  <strong className="text-white">STEM OPT (剩余2.5年)</strong>
                  <span className="text-[10px] text-emerald-400 ml-1.5">✓ 历史 LCA 支持率 98%</span>
                </div>
              </div>

              {/* Matcher Table */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>岗位关键要求 vs 简历客观证据链 (可溯源)</span>
                  <span className="text-[11px] text-slate-500">拒绝无依据的单一打分</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/90 flex items-start gap-3">
                    <span className="text-emerald-400 font-bold shrink-0">✓ 吻合</span>
                    <div>
                      <strong className="text-white">分布式存储与高并发：</strong>
                      <span className="text-slate-300 ml-1">简历第 2 段有与 Google Spanner 类似架构的分布式 KV 引擎自研经历，支持 10w+ QPS。</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/90 flex items-start gap-3">
                    <span className="text-emerald-400 font-bold shrink-0">✓ 吻合</span>
                    <div>
                      <strong className="text-white">C++ / Go 核心系统编程：</strong>
                      <span className="text-slate-300 ml-1">拥有 1.2k Star GitHub 基础设施开源项目核心代码贡献记录。</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/90 flex items-start gap-3">
                    <span className="text-amber-400 font-bold shrink-0">❓ 待补</span>
                    <div>
                      <strong className="text-white">云原生 Kubernetes 编排：</strong>
                      <span className="text-slate-300 ml-1">简历未显式体现大型集群实操，自述仅有本地单机部署经验。</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Auto-Drafted Referral Note */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-indigo-500/30 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="font-bold text-white">AI 推荐评语草稿 (直接粘贴至 Workday 内部推荐栏)</span>
                  </div>
                  <button
                    onClick={handleCopyReferralNote}
                    className="flex items-center gap-1 text-[11px] text-indigo-300 hover:text-white transition-colors bg-indigo-500/20 px-2.5 py-1 rounded-lg border border-indigo-400/40"
                  >
                    {copiedText ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>已复制评语</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>一键复制评语</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-[#070e1e] border border-slate-800 text-xs font-mono text-indigo-200 leading-relaxed">
                  "Recommending fellow alum [Zhang] for the L4 Backend role. Strong distributed systems background from CMU with hands-on C++ storage engine contributions. Meets all core team requirements via NACUAA Alum verification."
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors shadow">
                    确认已提交内网
                  </button>
                  <button className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-colors">
                    使用礼貌模板婉拒
                  </button>
                  <span className="text-[10px] text-slate-500 ml-auto">
                    内推人在职合规有保障 · 绝不向求职者许诺录用保证
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 2.5: 3-Alumni Web-of-Trust Mechanism */}
        <section id="web-of-trust" className="py-14 bg-gradient-to-b from-[#060e22] via-[#08122c] to-[#050b18] border-b border-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>Join by Referral · 3-Alumni Web-of-Trust</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                校友三度背书信任网 · 破解冷启动死锁
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                在职校友<strong>企业邮箱免背书秒进</strong>并获封【创世背书人】；求职校友需<strong>3位校友信用背书</strong>阶梯解锁顶级大厂；特别开通<strong>【北美高校联盟理事直通车】</strong>1票抵3票，杜绝劣质海投，防止新人孤立。
              </p>
            </div>

            {/* 3 Strategic Pillars Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-indigo-500/30 space-y-2">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>在职引路人 · 零门槛秒进</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  验证公司邮箱（@google, @meta等）即刻入驻，自动成为<strong>创世背书人</strong>，每月拥有 3 张信用背书券，无需找人背书。
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  <span>求职校友 · 四阶渐进式解锁</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  0票体验AI分诊 ➔ 1票解锁Coffee Chat ➔ 2票解锁独角兽 ➔ <strong>3票完全解锁 Tier-1 顶级大厂 1v1 纯净直推</strong>。
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>破局冷启动 · 联盟理事直通车</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  初来北美无工业界人脉？<strong>1 位 NACUAA 联盟理事或校友会会长官方背书，直接等效抵扣 3 个常规背书</strong>，即刻满血点亮！
                </p>
              </div>
            </div>

            {/* Live Interactive Simulator Box */}
            <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl">
              
              {/* Simulator Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center font-bold text-white text-lg shadow-md">
                    张
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-base">张校友 (模拟候选人)</span>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-mono">
                        CMU '24 MS · 清华 '18 BS
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">目标意向：Google Core Infra · L4 Backend Engineer</p>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">当前背书累积</div>
                    <div className="text-base font-black font-mono text-cyan-300">
                      {isFastTrack ? '3 / 3 (理事特批)' : `${vouchCount} / 3 票`}
                    </div>
                  </div>
                  <div className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                    (vouchCount >= 3 || isFastTrack)
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : vouchCount === 2
                      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                      : vouchCount === 1
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {(vouchCount >= 3 || isFastTrack)
                      ? '🌟 Tier-1 大厂权限已满血解锁'
                      : vouchCount === 2
                      ? '中型名企/独角兽已解锁'
                      : vouchCount === 1
                      ? 'Coffee Chat 已解锁'
                      : '游客态 (仅限基础工具)'}
                  </div>
                </div>
              </div>

              {/* Progress Stepper Visualizer */}
              <div className="space-y-2">
                <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 transition-all duration-500"
                    style={{
                      width: isFastTrack ? '100%' : vouchCount === 0 ? '10%' : vouchCount === 1 ? '38%' : vouchCount === 2 ? '72%' : '100%'
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 text-[10px] text-center font-mono">
                  <span className={vouchCount >= 0 ? 'text-slate-300 font-bold' : 'text-slate-600'}>0票 基础认证</span>
                  <span className={(vouchCount >= 1 || isFastTrack) ? 'text-cyan-300 font-bold' : 'text-slate-600'}>1票 CoffeeChat</span>
                  <span className={(vouchCount >= 2 || isFastTrack) ? 'text-indigo-300 font-bold' : 'text-slate-600'}>2票 独角兽内推</span>
                  <span className={(vouchCount >= 3 || isFastTrack) ? 'text-emerald-400 font-bold' : 'text-slate-600'}>3票 Tier-1大厂</span>
                </div>
              </div>

              {/* Endorsement Feed (Dynamic) */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>已点亮背书清单 ({isFastTrack ? '1位理事官方背书' : `${vouchCount} 位校友`})</span>
                  <span className="text-[11px] text-slate-500">每位在职校友每月限量3张背书券 · 连带信用惩戒</span>
                </div>

                {isFastTrack ? (
                  <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs border border-emerald-400/40">
                          盟
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="text-white text-xs">NACUAA 北美高校联盟 · 大纽约校友会理事会</strong>
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                              会长亲审 · 直通车抵扣 3 票
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400">背书人：陈会长 (纽约大学校友会理事长 / 资深总监)</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">2026-09-17 官方特批</span>
                    </div>
                    <p className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                      "该校友通过校友会实名认证与作品集复核，学术经历严谨，编程基础优良。经会长会合议，特别启用联盟理事直通车点亮全站 Tier-1 直推资格！"
                    </p>
                  </div>
                ) : vouchCount === 0 ? (
                  <div className="p-6 rounded-2xl bg-slate-950/60 border border-dashed border-slate-800 text-center space-y-2">
                    <UserCheck className="w-8 h-8 text-slate-600 mx-auto" />
                    <p className="text-xs text-slate-400">目前暂无校友背书，处于基础认证阶段（可免费使用 AI 分诊诊断与 LCA 签证查询）</p>
                    <p className="text-[11px] text-slate-500">请点击下方按钮模拟获得学长背书，或点击“生成专属求背书卡片”分享给学长学姐！</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {vouchCount >= 1 && (
                      <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xs">
                              李
                            </div>
                            <span className="text-white text-xs font-bold">李校友 · Google Core Infra Tech Lead (清华 15 级)</span>
                            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/30">
                              大厂在职创世背书人
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">2026-09-15 认证</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                          <span className="bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">✓ 代码功底扎实</span>
                          <span className="bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">✓ 推荐推本组</span>
                        </div>
                        <p className="text-xs text-slate-300">"清华本科同系学弟，分布式存储课程设计与 GitHub 代码均很扎实，值得信赖。"</p>
                      </div>
                    )}

                    {vouchCount >= 2 && (
                      <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs">
                              王
                            </div>
                            <span className="text-white text-xs font-bold">王校友 · Meta Ads Staff SDE (CMU 20 级)</span>
                            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/30">
                              已验证 @meta.com
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">2026-09-16 认证</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                          <span className="bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">✓ 系统设计优良</span>
                          <span className="bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">✓ 沟通协作靠谱</span>
                        </div>
                        <p className="text-xs text-slate-300">"CMU 实验室同组学弟，共同发表过顶会 Workshop 论文，工程执行力极强。"</p>
                      </div>
                    )}

                    {vouchCount >= 3 && (
                      <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-emerald-500/30 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs">
                              陈
                            </div>
                            <span className="text-white text-xs font-bold">陈校友 · OpenAI Research Engineer (CMU 19 级)</span>
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                              满血第3票
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">2026-09-17 认证</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                          <span className="bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">✓ 大模型基础设施</span>
                          <span className="bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">✓ 强烈推荐</span>
                        </div>
                        <p className="text-xs text-slate-300">"对分布式训练通信优化理解深刻，已在开源库完成 2 个重大 PR，强烈推荐进入工业界大厂！"</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    setIsFastTrack(false);
                    setVouchCount((prev) => Math.min(3, prev + 1));
                  }}
                  disabled={vouchCount >= 3 && !isFastTrack}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all active:scale-95"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>模拟学长微信为 TA 点亮背书 (+1)</span>
                </button>

                <button
                  onClick={() => {
                    setIsFastTrack(!isFastTrack);
                    if (!isFastTrack) setVouchCount(3);
                  }}
                  className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 border ${
                    isFastTrack
                      ? 'bg-emerald-600 text-white border-emerald-400'
                      : 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border-emerald-500/30'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isFastTrack ? '已启用联盟理事直通车 (1抵3)' : '启用【联盟理事直通车】(1抵3)'}</span>
                </button>

                <button
                  onClick={() => setShowVouchModal(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all active:scale-95 ml-auto"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>生成我的微信求背书卡片</span>
                </button>

                <button
                  onClick={() => {
                    setVouchCount(0);
                    setIsFastTrack(false);
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs border border-slate-800"
                >
                  重置模拟
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* Section 3: 5-State Workflow */}
        <section id="workflow" className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider font-mono">
              Transparent & Compliant
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">五态流转看板 · 进度客观透明</h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              不许诺无法核实的“内部 Referral ID 自动对接”，收敛为纯粹真实的五步闭环流转。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1.5 relative">
              <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-mono font-bold text-[11px]">
                1
              </div>
              <h4 className="font-bold text-white text-sm">已提交申请</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                求职者填写规范材料包，未达内推人基础门槛由系统自动拦截。
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1.5 relative">
              <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center justify-center font-mono font-bold text-[11px]">
                2
              </div>
              <h4 className="font-bold text-indigo-300 text-sm">待内推人查阅</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                进入学长学姐每周专属清单，求职者实时掌握排队位次。
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1.5 relative">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center font-mono font-bold text-[11px]">
                3
              </div>
              <h4 className="font-bold text-amber-300 text-sm">待补材料/婉拒</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                一键补充关键经历，或使用标准模板礼貌婉拒，体面保护校友关系。
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1.5 relative">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 flex items-center justify-center font-mono font-bold text-[11px]">
                4
              </div>
              <h4 className="font-bold text-purple-300 text-sm">确认已提交内网</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                内推人在雇主系统提交后点击确认，正式进入官方招聘管道。
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/70 border border-emerald-500/30 bg-emerald-950/20 space-y-1.5 relative">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center font-mono font-bold text-[11px]">
                5
              </div>
              <h4 className="font-bold text-emerald-300 text-sm">确认进入面试</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                由求职者在收到 HR 邮件后主动回写确认，回馈内推感谢闭环。
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Interactive Intake Form (Referrer vs Seeker) */}
        <section id="intake" className="py-12 bg-slate-900/40 border-t border-slate-800">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center space-y-2">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider font-mono">
                Intake & Waitlist
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">首批封闭内测登记通道</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                第一期仅招募 30 位名企在职引路人，以及按配额开放同等规模的求职校友。
              </p>
            </div>

            {/* Toggle Switch */}
            <div className="flex p-1 bg-slate-950 rounded-2xl border border-slate-800">
              <button
                onClick={() => { setActiveTab('referrer'); setSubmitted(false); }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'referrer'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>我是在职校友 (提供内推 · r.vi.fyi)</span>
              </button>

              <button
                onClick={() => { setActiveTab('seeker'); setSubmitted(false); }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'seeker'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>我是求职校友 (预约排队 · c.vi.fyi)</span>
              </button>
            </div>

            {/* Form Box */}
            <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
              
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white">
                      {submittedRole === 'referrer' ? '引路人席位登记成功！' : '求职校友预约排队成功！'}
                    </h3>
                    <p className="text-xs text-slate-300 max-w-sm mx-auto">
                      感谢您的支持！校友会工作组将在 48 小时内核验信息，并通过微信或邮件将封闭内测凭证与首批名单同步给您。
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-indigo-300 transition-colors"
                  >
                    返回再次登记
                  </button>
                </div>
              ) : activeTab === 'referrer' ? (
                /* Referrer Form */
                <form onSubmit={handleReferrerSubmit} className="space-y-4 text-xs">
                  <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-[11px] leading-relaxed">
                    💡 <strong>内推人专属保护</strong>：您的姓名与私人微信号默认绝不对外公开，申请者只能看到您的母校、公司与方向。每周最多仅向您推送 {refQuota} 份材料，随时可一键暂停。
                  </div>

                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-[11px]">
                    <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>企业邮箱验证后自动授予<strong>【创世背书人】</strong>身份，每月享有 3 张信用背书券，无需他人为您背书。</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">所在公司 (Company) *</label>
                      <input
                        type="text"
                        required
                        placeholder="例如: Google / Meta / OpenAI / 微软"
                        value={refCompany}
                        onChange={(e) => setRefCompany(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">当前职位或方向 (Title / Domain)</label>
                      <input
                        type="text"
                        placeholder="例如: Senior SDE / AI Research / PM"
                        value={refTitle}
                        onChange={(e) => setRefTitle(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">毕业高校母校 (Alumni School)</label>
                      <input
                        type="text"
                        placeholder="例如: 浙大 / 清华 / 北大 / CMU / UIUC"
                        value={refSchool}
                        onChange={(e) => setRefSchool(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">每周愿意接收上限 (Weekly Limit)</label>
                      <select
                        value={refQuota}
                        onChange={(e) => setRefQuota(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                      >
                        <option value="1">每周最多 1 份 (精选推本组)</option>
                        <option value="2">每周最多 2 份 (适中)</option>
                        <option value="3">每周最多 3 份 (高意愿)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">工作邮箱或主要邮箱 *</label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com 或 personal"
                        value={refEmail}
                        onChange={(e) => setRefEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">微信微信号 (联络对接专用，不对外)</label>
                      <input
                        type="text"
                        placeholder="用于工作组闭环拉群"
                        value={refWeChat}
                        onChange={(e) => setRefWeChat(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">您对候选人的期望门槛 (可选)</label>
                    <input
                      type="text"
                      placeholder="例如: 必须具有 1 段北美名企实习 / 具备 C++ 功底 / 同校优先"
                      value={refRequirement}
                      onChange={(e) => setRefRequirement(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all active:scale-95"
                  >
                    提交并锁定首批引路人名额
                  </button>
                </form>
              ) : (
                /* Seeker Form */
                <form onSubmit={handleSeekerSubmit} className="space-y-4 text-xs">
                  <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-[11px] leading-relaxed">
                    🎓 <strong>求职校友须知</strong>：这不是海投看板。每一个坑位均有严格接收配额，请确保材料真实规范。内测期优先向已完成母校校友认证的同学开放。
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">就读或毕业高校母校 *</label>
                      <input
                        type="text"
                        required
                        placeholder="国内母校及北美就读院校"
                        value={skSchool}
                        onChange={(e) => setSkSchool(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-white outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">最高学历与学位</label>
                      <select
                        value={skDegree}
                        onChange={(e) => setSkDegree(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                      >
                        <option value="Bachelor">本科 (Bachelor)</option>
                        <option value="Master">硕士 (Master)</option>
                        <option value="PhD">博士 (PhD)</option>
                        <option value="PostDoc">博士后 (Postdoc)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">当前工作签证身份 (Work Auth) *</label>
                      <select
                        value={skWorkAuth}
                        onChange={(e) => setSkWorkAuth(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none font-mono"
                      >
                        <option value="STEM OPT (3年)">STEM OPT (剩余 2~3 年)</option>
                        <option value="OPT (首年)">OPT 首年 (需要抽签)</option>
                        <option value="H-1B Transfer">H-1B 现职 (可直接 Transfer)</option>
                        <option value="Day-1 CPT">Day-1 CPT 合法工作</option>
                        <option value="Green Card / Citizen">绿卡 (GC) / 公民</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">期望毕业或看机会年份</label>
                      <select
                        value={skGradYear}
                        onChange={(e) => setSkGradYear(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none font-mono"
                      >
                        <option value="2026">2026 年 (应届或在职)</option>
                        <option value="2027">2027 年 (次年毕业)</option>
                        <option value="Experienced">在职社招 (3年+经历)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">目标心仪公司 (最多 3 家)</label>
                      <input
                        type="text"
                        placeholder="例如: Google, Meta, OpenAI"
                        value={skTargetCompany}
                        onChange={(e) => setSkTargetCompany(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-white outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">求职意向岗位族</label>
                      <input
                        type="text"
                        placeholder="例如: Backend / ML / Fullstack"
                        value={skRole}
                        onChange={(e) => setSkRole(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">联系邮箱 *</label>
                      <input
                        type="email"
                        required
                        placeholder="用于接收内测资格通知"
                        value={skEmail}
                        onChange={(e) => setSkEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-white outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">微信号 (可选)</label>
                      <input
                        type="text"
                        placeholder="方便校友会志愿者建联"
                        value={skWeChat}
                        onChange={(e) => setSkWeChat(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">已有在职背书人姓名或企业邮箱 (可选)</label>
                      <input
                        type="text"
                        placeholder="例如: 张学长 @ Google / wang@meta.com"
                        value={skVoucherInfo}
                        onChange={(e) => setSkVoucherInfo(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-white outline-none"
                      />
                      <p className="text-[10px] text-slate-500">已获得校友背书者可加快审核与解锁速度</p>
                    </div>

                    <div className="flex flex-col justify-center space-y-1 sm:pt-2">
                      <label className="flex items-start gap-2 cursor-pointer select-none bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                        <input
                          type="checkbox"
                          checked={skNeedCouncilFastTrack}
                          onChange={(e) => setSkNeedCouncilFastTrack(e.target.checked)}
                          className="w-4 h-4 mt-0.5 rounded border-slate-700 text-cyan-500 focus:ring-0 bg-slate-900"
                        />
                        <span className="text-[11px] text-slate-300">
                          初来北美暂无学长人脉，申请<strong>【联盟理事直通车】</strong>审核（会长1票抵扣3票）
                        </span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all active:scale-95"
                  >
                    提交求职排队意向
                  </button>
                </form>
              )}

            </div>
          </div>
        </section>

        {/* Section 5: Compliance Redlines */}
        <section id="compliance" className="py-12 max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>严正合规底线与法律声明 (Legal Disclaimers)</span>
            </div>

            <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
              <p>
                <strong>1. 严禁任何形式的对价与内推买卖：</strong>
                VI AI 职引（ViCareer）为非营利性校友互助协作工具，对校友永久免费。平台严禁买卖内部推荐资格、付费优先或中介分成。雇主提供的官方招聘奖金属于在职内推人本人，平台不设抽成，不触碰金钱。
              </p>
              <p>
                <strong>2. 免责声明三原则：</strong>
                ① 平台不保证任何内推必定成功，不暗示或承诺面试与录取结果；
                ② 平台不是职业介绍所（Employment Agency），不参与任何雇佣决策；
                ③ 平台提供之 Work Auth 标签仅供匹配参考，不构成任何移民与签证法律意见。
              </p>
              <p>
                <strong>3. 简历隐私主权：</strong>
                校友简历存放于私有 Cloudflare R2 加密存储，仅按需向具体坑位生成 15 分钟短效访问授权，未经授权绝不对公网公开，严禁未经许可作为 AI 大模型预训练语料。
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 bg-[#040813] text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              VI
            </div>
            <span className="text-slate-300 font-semibold">VI AI 职引 · ViCareer</span>
            <span>© 2026 VI AI Foundation & NACUAA. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>career.weiai.ai</span>
            <span>·</span>
            <span>c.vi.fyi (Seekers)</span>
            <span>·</span>
            <span>r.vi.fyi (Referrers)</span>
          </div>
        </div>
      </footer>

      {/* Shareable Vouch Card Modal */}
      {showVouchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowVouchModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1 text-center">
              <span className="text-[11px] font-bold text-cyan-400 font-mono uppercase">
                WeChat Vouch Card Preview
              </span>
              <h3 className="text-lg font-bold text-white">专属校友求背书卡片</h3>
              <p className="text-xs text-slate-400">分享至微信校友群或私发给在职学长学姐，点击即可 15 秒快速背书。</p>
            </div>

            {/* Mobile Card Styled Preview */}
            <div className="bg-[#0b1428] p-5 rounded-2xl border border-slate-700/80 space-y-4 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-black text-white text-xs">
                    VI
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">VI AI 职引 · 校友信用背书邀请</div>
                    <div className="text-[10px] text-slate-400">NACUAA 北美高校联盟认证生态</div>
                  </div>
                </div>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono">
                  求助点亮 3/3
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="font-bold text-white">候选人：张校友 (CMU '24 硕 / 清华 '18 本)</div>
                <div className="text-slate-300 text-[11px]">
                  意向目标：<strong>Google / Meta / OpenAI (L4 Backend)</strong>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1 text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300">分布式存储架构</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300">C++ 开源 1.2k Star</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300">STEM OPT 剩余2.5年</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 italic">
                “学长学姐好！我正在申请 VI AI 职引的名企内推资格，诚邀在职的前辈为我的专业硬核度与靠谱品质点亮信用背书，非常感谢您的提携！”
              </div>

              <div className="text-[11px] text-slate-400 space-y-1 bg-slate-900/60 p-2.5 rounded-xl">
                <div className="text-slate-300 font-semibold">学长学姐微信打开可一键勾选背书：</div>
                <div>✓ 编程与系统设计功底扎实</div>
                <div>✓ 团队协作负责，值得信赖</div>
                <div>✓ 愿意引荐进入我司/我组</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono text-cyan-300">
                <span className="truncate mr-2">https://c.vi.fyi/vouch/zhang-cmu24</span>
                <span className="text-[10px] text-slate-500 shrink-0">专属短链</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyVouchLink}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/25 transition-all active:scale-95"
              >
                {vouchCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>已复制微信卡片链接</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>一键复制微信卡片分享链接</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowVouchModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
