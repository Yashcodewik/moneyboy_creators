import { useEffect, useRef } from "react";
export function useWaveCanvas(uploadProgress: number) {
  const waveCanvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);
  const waveT = useRef(0);
  const progressRef = useRef(uploadProgress);
  progressRef.current = uploadProgress;

  useEffect(() => {
    const canvas = waveCanvasRef.current;

    if (!canvas || uploadProgress <= 0) {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const btn = canvas.closest(".upload-btn") as HTMLElement | null;
    if (btn) {
      canvas.width = btn.clientWidth - 4;
      canvas.height = btn.clientHeight - 4;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }

    const waves = [
      { amp: 6, freq: 0.025, speed: 0.012, offset: 0,             a1: "rgba(229,116,31,0.45)", a2: "rgba(254,206,38,0.45)" },
      { amp: 4, freq: 0.018, speed: 0.008, offset: Math.PI * 0.6, a1: "rgba(254,206,38,0.28)", a2: "rgba(229,116,31,0.28)" },
      { amp: 3, freq: 0.032, speed: 0.015, offset: Math.PI * 1.2, a1: "rgba(229,116,31,0.18)", a2: "rgba(254,206,38,0.18)" },
    ];

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // always read from ref — never stale
      const prog = progressRef.current;
      const fillY = H * (1 - prog / 100);

      waves.forEach((w) => {
        ctx.beginPath();
        ctx.moveTo(0, H);
        ctx.lineTo(0, fillY);
        for (let x = 0; x <= W; x += 1.5) {
          const y =
            fillY +
            Math.sin(x * w.freq + waveT.current * w.speed * 20 + w.offset) *
              w.amp;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H);
        ctx.closePath();

        const g = ctx.createLinearGradient(0, 0, W, 0);
        g.addColorStop(0, w.a1);
        g.addColorStop(1, w.a2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      waveT.current += 0.4;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
    };
  }, [uploadProgress]);

  return waveCanvasRef;
}