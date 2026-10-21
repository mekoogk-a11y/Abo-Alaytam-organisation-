import React, { useEffect, useRef, useState } from 'react';
import {
  Play,
  Square,
  Volume2,
  Sliders,
  Radio,
  Sparkles,
  Copy,
  Check,
  Music,
  Share2,
  Mic,
  Award,
} from 'lucide-react';
import { audioService, speakSudaneseScript, stopSpeaking } from '../services/audioEngine';

interface CampaignScript {
  id: string;
  title: string;
  tagline: string;
  duration: string;
  dialectStyle: string;
  scriptText: string;
  performanceNotes: string;
}

export const SUDANESE_CAMPAIGNS: CampaignScript[] = [
  {
    id: 'campaign-national-hero',
    title: 'الإعلان الحماسي الوطني العام للمنظمة',
    tagline: 'نداء الفزعة والشهامة والنخوة السودانية الأصيلة',
    duration: '45 ثانية',
    dialectStyle: 'عامية سودانية حماسية جهورية (نبرة فخر وعزيمة)',
    scriptText: `يا أهلي وعزوتي وسندي في سوداننا الحبيب.. في كل قرية وحِلّة وفريق ومخيم نزوح.. يا أهل الفزعة والشهامة والنخوة السودانية المأصلة!
ديل أيتامنا، وديل أمهاتنا الأرامل، أمانة في رقابنا ليوم الدين!
بئر موية بتروي عطشان وتكسر الشِدة،
كفالة يتيم بتمسح دمعة وتفتح باب علم وأمل،
وسلّة غذائية بتسند ضهر أسرة عزيزة ومتعففة!
إيد على إيد تجدع بعيد، وفي الحارة نحنا أهل الفزعة ونفير البلد!
منظمة أبو الأيتام لرعاية وكفالة الأيتام والأرامل بتناديك:
ساهم ولو بالقليل.. الخير فينا وممتد ليوم الدين!
معاً نرعى الأيتام، ونغيث المحتاجين، ونصنع الأمل في كل شبر من سوداننا الحبيب!`,
    performanceNotes: 'يبدأ بنبرة رجولية قوية دافئة تشد الانتباه، ويتصاعد الحماس عند تعداد المبادرات، ويختتم بنبرة فخر واثقة.',
  },
  {
    id: 'campaign-water-wells',
    title: 'نداء سقيا الماء وحفر الآبار "سُقيا الأمل"',
    tagline: 'قطرة الموية حياة وكرامة لأهلنا في الأرياف',
    duration: '35 ثانية',
    dialectStyle: 'عامية سودانية وجدانية ملحة وعميقة',
    scriptText: `في هجير الصيف ونيران العطش، لما المسافات تطول والأمهات يمشوا فراسخ عشان جرعة موية..
أفضل الصدقة عند الله سقيا الماء!
بئر واحدة بالطاقة الشمسية من منظمة أبو الأيتام بتروي قرية كاملة،
وتحيي زرع وضرع، وتحمي صغارنا من الأمراض والعطش!
بئر ارتوازية تدوم سنين صدقة جارية ليك ولوالديك.
شاركونا في مشروع محطات سُقيا الأمل في أرياف القضارف وكردفان والبحر الأحمر.
أروي عطشان.. تلقاها يوم العطش الأكبر!`,
    performanceNotes: 'نبرة عميقة مشحونة بالتعاطف ثم تتحول إلى دعوة واثقة ومبشرة بالأجر العظيم والصدقة الجارية.',
  },
  {
    id: 'campaign-orphan-care',
    title: 'حملة كفالة يتيم ورعاية الأرامل "سند وعزوة"',
    tagline: 'أنا وكافل اليتيم في الجنة هكذا',
    duration: '40 ثانية',
    dialectStyle: 'عامية سودانية عاطفية حنونة ومحفزة للهمم',
    scriptText: `طفل فقد سنده وظهره في الدنيا، وأم أرملة صابرة بتصارع عشان لقمة العيش ودفتر المدرسة!
النبي عليه الصلاة والسلام قال: "أنا وكافل اليتيم في الجنة هكذا".
مع منظمة أبو الأيتام، كفالتك بتصل يد اليتيم كاملة غير منقوصة؛
تعليم وعلاج وكسوة وكرامة محفوظة.
ما تحرم نفسك أجر مرافقة الحبيب المصطفى.
كون إنت السند، وكون إنت العزوة، وخلّي ابتسامتهم في ميزان حسناتك.
منظمة أبو الأيتام.. بابك الموثوق لكفالة الأيتام في السودان!`,
    performanceNotes: 'نبرة حنونة دافئة تخاطب القلب والضمير، مع نبرة مهيبة عند ذكر الحديث الشريف.',
  },
  {
    id: 'campaign-emergency-food',
    title: 'نداء طوارئ الإغاثة والكسر الغذائي "فزعة إخوان"',
    tagline: 'سلال الكرامة والمطابخ المجتمعية في مراكز النزوح',
    duration: '30 ثانية',
    dialectStyle: 'عامية سودانية سريعة ملحة استغاثية',
    scriptText: `أهلنا النازحين في مراكز الإيواء بيواجهوا شح الغذاء والظروف القاسية.
البيت السوداني طول عمرو فاتح ديوانو للضيف والمحتاج!
الليلة نداء الفزعة العاجل: سلة غذائية تطعم أسرة شهر كامل،
ومطابخ خيرية تكفي جوع الصغار في مراكز الإيواء ببورتسودان وكسلا ونهر النيل.
الريال والجنيه بيفرِق وينقذ روح!
أقف مع أهلك، أطعم جائع، وفرّج كربة أخيك.
تواصلوا هسع مع منظمة أبو الأيتام، والخير ما بينقطع أبداً!`,
    performanceNotes: 'إيقاع سريع وتصاعد حماسي لحث الهمة العاجلة لتقديم الغذاء والمساندة الفورية.',
  },
];

export const SudaneseVoiceoverStudio: React.FC = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignScript>(SUDANESE_CAMPAIGNS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [beatsEnabled, setBeatsEnabled] = useState<boolean>(true);
  const [radioFxEnabled, setRadioFxEnabled] = useState<boolean>(true);
  const [pitch, setPitch] = useState<number>(0.84); // deep masculine voice
  const [rate, setRate] = useState<number>(0.96); // energetic broadcast cadence
  const [beatsVolume, setBeatsVolume] = useState<number>(0.28);
  const [copied, setCopied] = useState<boolean>(false);
  const [customText, setCustomText] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
      audioService.stopSudaneseBeats();
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  // Visualizer loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = audioService.getAnalyser();
    const dataArray = new Uint8Array(analyser ? analyser.frequencyBinCount : 128);

    const render = () => {
      animFrameId.current = requestAnimationFrame(render);
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (analyser && isPlaying) {
        analyser.getByteFrequencyData(dataArray);
      }

      const barWidth = (canvas.width / 32) - 2;
      let x = 0;

      for (let i = 0; i < 32; i++) {
        let barHeight = isPlaying ? (dataArray[i * 2] / 255) * canvas.height * 0.85 : 4;
        if (barHeight < 4) barHeight = 4;

        // Gradient from Sudanese Blue to Gold
        const grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
        grad.addColorStop(0, '#0878C9');
        grad.addColorStop(0.7, '#18864B');
        grad.addColorStop(1, '#D9AE52');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, canvas.height - barHeight, barWidth, barHeight, 3);
        ctx.fill();

        x += barWidth + 2;
      }
    };

    render();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isPlaying]);

  const handlePlayVoiceover = () => {
    if (isPlaying) {
      stopSpeaking();
      audioService.stopSudaneseBeats();
      setIsPlaying(false);
      return;
    }

    const textToSpeak = isCustomMode && customText.trim() ? customText : selectedCampaign.scriptText;

    // Start background Dalluka beats
    if (beatsEnabled) {
      audioService.setBeatsVolume(beatsVolume);
      audioService.setRadioEffect(radioFxEnabled);
      audioService.startSudaneseBeats(94);
    }

    setIsPlaying(true);

    speakSudaneseScript(textToSpeak, {
      pitch,
      rate,
      volume: 1.0,
      onStart: () => {
        setIsPlaying(true);
      },
      onEnd: () => {
        setIsPlaying(false);
        audioService.stopSudaneseBeats();
      },
      onError: () => {
        setIsPlaying(false);
        audioService.stopSudaneseBeats();
      },
    });
  };

  const handleStop = () => {
    stopSpeaking();
    audioService.stopSudaneseBeats();
    setIsPlaying(false);
  };

  const handleCopyScript = () => {
    const textToCopy = isCustomMode && customText ? customText : selectedCampaign.scriptText;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-gradient-to-br from-[#17365D] via-[#0E2849] to-[#0A1D36] text-white rounded-3xl p-6 md:p-8 shadow-2xl border border-white/10 relative overflow-hidden">
      {/* Decorative Traditional Cultural Pattern Overlay */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#0878C9]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#18864B]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#D9AE52]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0878C9] to-[#18864B] flex items-center justify-center shadow-lg shadow-[#0878C9]/30 text-white">
              <Mic className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D9AE52]/20 text-[#D9AE52] border border-[#D9AE52]/30">
                  صوت رجالي إذاعي حماسي
                </span>
                <span className="text-xs text-blue-200">بالعامية السودانية الأصيلة</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white mt-0.5">
                استوديو الإعلان الصوتي الحماسي لمنظمة أبو الأيتام
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCustomMode(!isCustomMode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border ${
                isCustomMode
                  ? 'bg-[#D9AE52] text-[#17365D] border-[#D9AE52]'
                  : 'bg-white/10 hover:bg-white/15 text-white border-white/20'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {isCustomMode ? 'العودة للإعلانات الجاهزة' : 'كتابة إعلان مخصص'}
            </button>
            <button
              onClick={handleCopyScript}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition flex items-center gap-1.5 border border-white/20"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'تم نسخ النص!' : 'نسخ السيناريو'}
            </button>
          </div>
        </div>

        {/* Campaign Tabs */}
        {!isCustomMode && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
            {SUDANESE_CAMPAIGNS.map((camp) => (
              <button
                key={camp.id}
                onClick={() => {
                  if (isPlaying) handleStop();
                  setSelectedCampaign(camp);
                }}
                className={`p-3.5 rounded-2xl text-right transition border ${
                  selectedCampaign.id === camp.id
                    ? 'bg-gradient-to-r from-[#0878C9] to-[#12588F] text-white border-[#0878C9] shadow-lg shadow-[#0878C9]/30 ring-2 ring-white/20'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold truncate">{camp.title}</span>
                  <span className="text-[11px] px-1.5 py-0.5 rounded bg-black/30 text-amber-300 font-mono">
                    {camp.duration}
                  </span>
                </div>
                <p className="text-[11px] text-gray-300 line-clamp-1 opacity-90">{camp.tagline}</p>
              </button>
            ))}
          </div>
        )}

        {/* Studio Visualizer & Main Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left / Script Box (8 Cols) */}
          <div className="lg:col-span-8 bg-black/25 rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 text-xs text-blue-200">
                <span className="flex items-center gap-1 font-semibold">
                  <Award className="w-4 h-4 text-[#D9AE52]" />
                  {isCustomMode ? 'نص الإعلان المخصص المكتوب' : selectedCampaign.dialectStyle}
                </span>
                <span className="text-[11px] text-gray-400 font-sans">
                  {isCustomMode ? 'قابل للتعديل' : `ملاحظة الإلقاء: ${selectedCampaign.performanceNotes}`}
                </span>
              </div>

              {isCustomMode ? (
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="اكتب هنا نص الإعلان بالعامية السودانية بصوت رجالي حماسي... مثال: يا أهلي ويا عزوتي في سوداننا الحبيب، ديل أيتامنا أمانة في رقابنا..."
                  rows={6}
                  className="w-full bg-white/5 border border-white/20 rounded-xl p-4 text-white text-base md:text-lg leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#0878C9] font-medium resize-none"
                />
              ) : (
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 md:p-5 relative min-h-[170px]">
                  <p className="text-base md:text-lg leading-relaxed font-semibold text-gray-100 whitespace-pre-line tracking-wide">
                    {selectedCampaign.scriptText}
                  </p>
                  {isPlaying && (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      جاري البث الإذاعي الصوتي...
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Audio Waveform Canvas */}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-1/2">
                <div className="text-[11px] text-gray-400 mb-1 flex items-center justify-between">
                  <span>مستوى التردد الصوتي المباشر:</span>
                  <span className="font-mono text-emerald-400">{isPlaying ? 'نشط (44.1 kHz)' : 'جاهز'}</span>
                </div>
                <canvas ref={canvasRef} width={280} height={40} className="w-full h-10 rounded-lg bg-black/40" />
              </div>

              {/* Main Play / Stop Button */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                {isPlaying ? (
                  <button
                    onClick={handleStop}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-600/30 transition transform active:scale-95"
                  >
                    <Square className="w-5 h-5 fill-current" />
                    إيقاف البث
                  </button>
                ) : (
                  <button
                    onClick={handlePlayVoiceover}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#18864B] to-[#22C55E] hover:from-[#15723F] hover:to-[#18864B] text-white font-black text-lg shadow-xl shadow-[#18864B]/40 transition transform hover:-translate-y-0.5 active:scale-95"
                  >
                    <Play className="w-6 h-6 fill-current" />
                    استمع للإعلان الحماسي الآن
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right / Soundboard Controls (4 Cols) */}
          <div className="lg:col-span-4 bg-black/35 rounded-2xl p-5 border border-white/10 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold text-gray-200 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-[#D9AE52]" />
                  مؤثرات وهندسة الصوت الإذاعي
                </span>
                <span className="text-[10px] text-gray-400">Audio Studio FX</span>
              </div>

              {/* Toggles */}
              <div className="space-y-3 mt-4">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2">
                    <Music className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-xs font-bold text-white">إيقاع النفير والدلوكة</div>
                      <div className="text-[10px] text-gray-400">إيقاع حماسي سوداني تقليدي</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={beatsEnabled}
                    onChange={(e) => {
                      setBeatsEnabled(e.target.checked);
                      if (!e.target.checked) audioService.stopSudaneseBeats();
                      else if (isPlaying) audioService.startSudaneseBeats(94);
                    }}
                    className="w-4 h-4 accent-[#18864B] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-xs font-bold text-white">صدى البث الإذاعي والميداني</div>
                      <div className="text-[10px] text-gray-400">فلاتر استوديو البث الراديو</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={radioFxEnabled}
                    onChange={(e) => {
                      setRadioFxEnabled(e.target.checked);
                      audioService.setRadioEffect(e.target.checked);
                    }}
                    className="w-4 h-4 accent-[#D9AE52] cursor-pointer"
                  />
                </div>
              </div>

              {/* Sliders */}
              <div className="mt-4 space-y-3">
                {/* Voice Pitch (Tone) */}
                <div>
                  <div className="flex justify-between text-[11px] text-gray-300 mb-1">
                    <span>طبقة الصوت الرجولي:</span>
                    <span className="text-amber-300 font-mono">
                      {pitch < 0.85 ? 'جهوري عميق جداً' : pitch < 0.95 ? 'رجولي حماسي متزن' : 'نبرة شبابية'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.75"
                    max="1.1"
                    step="0.03"
                    value={pitch}
                    onChange={(e) => setPitch(parseFloat(e.target.value))}
                    className="w-full accent-[#0878C9] h-1.5 bg-white/20 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Cadence Speed */}
                <div>
                  <div className="flex justify-between text-[11px] text-gray-300 mb-1">
                    <span>سرعة الإلقاء والهمّة:</span>
                    <span className="text-blue-300 font-mono">{rate.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.85"
                    max="1.15"
                    step="0.03"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value))}
                    className="w-full accent-[#0878C9] h-1.5 bg-white/20 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Beats Volume */}
                {beatsEnabled && (
                  <div>
                    <div className="flex justify-between text-[11px] text-gray-300 mb-1">
                      <span>صوت الإيقاع المصاحب:</span>
                      <span className="text-green-300 font-mono">{Math.round(beatsVolume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.05"
                      max="0.6"
                      step="0.05"
                      value={beatsVolume}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setBeatsVolume(val);
                        audioService.setBeatsVolume(val);
                      }}
                      className="w-full accent-[#18864B] h-1.5 bg-white/20 rounded-lg cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Quick Share / Call to Action */}
            <div className="pt-3 border-t border-white/10">
              <a
                href="#donations"
                className="w-full py-2.5 rounded-xl bg-[#D9AE52] hover:bg-[#c49a40] text-[#17365D] font-bold text-xs flex items-center justify-center gap-1.5 transition shadow"
              >
                <Sparkles className="w-4 h-4 text-[#17365D]" />
                لَبِّ النداء وتبرع للمنظمة الآن
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
