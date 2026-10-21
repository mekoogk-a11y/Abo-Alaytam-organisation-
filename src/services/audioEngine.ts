/**
 * Sudanese Voiceover & Audio Engine
 * Combines Web Audio API synthesized Sudanese rhythmic backdrop (Dalluka rhythm)
 * with SpeechSynthesis tuned for an authoritative, passionate Sudanese male broadcast voice.
 */

class SudaneseAudioEngine {
  private ctx: AudioContext | null = null;
  private isBeatsPlaying: boolean = false;
  private beatIntervalId: number | null = null;
  private gainNode: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  public analyser: AnalyserNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.value = 0.25;

      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.value = 3500;

      this.gainNode.connect(this.filterNode);
      this.filterNode.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Synthesize an authentic Sudanese Dalluka (deep earthen drum) strike
   */
  private playDallukaHit(time: number, isBass: boolean = true) {
    if (!this.ctx || !this.gainNode) return;

    // Drum oscillator
    const osc = this.ctx.createOscillator();
    const drumGain = this.ctx.createGain();

    osc.type = 'sine';
    const startFreq = isBass ? 120 : 210;
    const endFreq = isBass ? 45 : 75;

    osc.frequency.setValueAtTime(startFreq, time);
    osc.frequency.exponentialRampToValueAtTime(endFreq, time + 0.18);

    drumGain.gain.setValueAtTime(isBass ? 0.8 : 0.45, time);
    drumGain.gain.exponentialRampToValueAtTime(0.001, time + (isBass ? 0.35 : 0.18));

    osc.connect(drumGain);
    drumGain.connect(this.gainNode);

    osc.start(time);
    osc.stop(time + 0.38);

    // Add wooden/snap texture for authentic Sudanese rhythmic tap
    if (!isBass) {
      const snapOsc = this.ctx.createOscillator();
      const snapGain = this.ctx.createGain();
      snapOsc.type = 'triangle';
      snapOsc.frequency.setValueAtTime(420, time);
      snapOsc.frequency.exponentialRampToValueAtTime(110, time + 0.08);

      snapGain.gain.setValueAtTime(0.3, time);
      snapGain.gain.exponentialRampToValueAtTime(0.001, time + 0.09);

      snapOsc.connect(snapGain);
      snapGain.connect(this.gainNode);

      snapOsc.start(time);
      snapOsc.stop(time + 0.1);
    }
  }

  /**
   * Start traditional rhythmic accompaniment
   */
  public startSudaneseBeats(tempoBpm: number = 96) {
    this.initContext();
    if (this.isBeatsPlaying) return;
    this.isBeatsPlaying = true;

    const beatDuration = 60 / tempoBpm;
    let step = 0;

    // Pattern: Sudanese traditional syncopated March / Dalluka pulse (DUM - tak - DUM - DUM - tak)
    this.beatIntervalId = window.setInterval(() => {
      if (!this.ctx || !this.isBeatsPlaying) return;
      const now = this.ctx.currentTime;

      if (step === 0) {
        this.playDallukaHit(now, true); // Strong bass hit (DUM)
      } else if (step === 1) {
        this.playDallukaHit(now, false); // Rim hit (tak)
      } else if (step === 2) {
        this.playDallukaHit(now, true); // Accent bass
      } else if (step === 3) {
        this.playDallukaHit(now, false); // Snap
      }

      step = (step + 1) % 4;
    }, (beatDuration * 1000) / 2);
  }

  public stopSudaneseBeats() {
    this.isBeatsPlaying = false;
    if (this.beatIntervalId !== null) {
      clearInterval(this.beatIntervalId);
      this.beatIntervalId = null;
    }
  }

  public setBeatsVolume(vol: number) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime);
    }
  }

  public setRadioEffect(enabled: boolean) {
    if (this.filterNode && this.ctx) {
      if (enabled) {
        this.filterNode.frequency.setValueAtTime(1900, this.ctx.currentTime);
        this.filterNode.Q.setValueAtTime(3.5, this.ctx.currentTime);
      } else {
        this.filterNode.frequency.setValueAtTime(4500, this.ctx.currentTime);
        this.filterNode.Q.setValueAtTime(1, this.ctx.currentTime);
      }
    }
  }

  public getAnalyser(): AnalyserNode | null {
    this.initContext();
    return this.analyser;
  }
}

export const audioService = new SudaneseAudioEngine();

/**
 * Speech Synthesis Helper tuned for deep, commanding, passionate male Sudanese delivery
 */
export function speakSudaneseScript(
  text: string,
  options: {
    pitch?: number; // 0.75 - 0.90 for deep male tone
    rate?: number;  // 0.90 - 1.05 for clear enthusiastic cadence
    volume?: number;
    onEnd?: () => void;
    onStart?: () => void;
    onError?: (e: unknown) => void;
  } = {}
) {
  if (!('speechSynthesis' in window)) {
    alert('متصفحك لا يدعم تحويل النص إلى صوت مباشر.');
    return null;
  }

  window.speechSynthesis.cancel(); // cancel any ongoing speech

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Find best Arabic voice
  const voices = window.speechSynthesis.getVoices();
  const arabicVoices = voices.filter(
    (v) => v.lang.startsWith('ar') || v.lang.includes('AR')
  );

  // Prefer male Arabic or standard Arabic voice
  const maleVoice = arabicVoices.find(
    (v) =>
      v.name.toLowerCase().includes('male') ||
      v.name.toLowerCase().includes('maged') ||
      v.name.toLowerCase().includes('tarik') ||
      v.name.toLowerCase().includes('naif')
  ) || arabicVoices[0];

  if (maleVoice) {
    utterance.voice = maleVoice;
  }

  utterance.lang = 'ar-SA';
  // Tuned for enthusiastic masculine broadcast voice
  utterance.pitch = options.pitch ?? 0.84;
  utterance.rate = options.rate ?? 0.95;
  utterance.volume = options.volume ?? 1.0;

  if (options.onStart) utterance.onstart = options.onStart;
  if (options.onEnd) utterance.onend = options.onEnd;
  if (options.onError) utterance.onerror = options.onError;

  window.speechSynthesis.speak(utterance);
  return utterance;
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
