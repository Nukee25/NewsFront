import { useEffect, useRef } from 'react';

interface WaveformProps {
  isPlaying: boolean;
  barCount?: number;
}

export default function Waveform({ isPlaying, barCount = 10 }: WaveformProps) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        barsRef.current.forEach((bar) => {
          if (bar) {
            const height = Math.floor(Math.random() * 120) + 20;
            bar.style.height = `${height}px`;
          }
        });
      }, 200);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      barsRef.current.forEach((bar) => {
        if (bar) bar.style.height = '20px';
      });
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  return (
    <div className="flex items-end justify-center my-5" style={{ height: '160px' }}>
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { barsRef.current[i] = el; }}
          className="rounded mx-1 transition-all duration-200"
          style={{
            width: '10px',
            height: '20px',
            backgroundColor: isPlaying ? '#ff3c3c' : 'white',
            transitionDuration: '0.2s',
          }}
        />
      ))}
    </div>
  );
}
