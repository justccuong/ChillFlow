import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import './LaserScrollTimeline.css';

export interface TimelineStep {
  idx: string;
  phase: string;
  title: string;
  desc: string;
  highlights: string[];
  image: string;
  imageAlt?: string;
  threshold?: number;
}

export interface LaserScrollTimelineProps {
  heading?: string;
  subtext?: string;
  steps?: TimelineStep[];
}

const DEFAULT_STEPS: TimelineStep[] = [
  {
    idx: '01',
    phase: 'Hiểu đúng trước khi làm',
    title: 'Khảo sát & Xây dựng chiến lược',
    desc: 'Hiểu doanh nghiệp, khách hàng và mục tiêu để website đi đúng hướng ngay từ đầu.',
    highlights: ['Hiểu khách hàng mục tiêu', 'Phân tích đối thủ', 'Xây dựng cấu trúc website'],
    image: 'https://kune-studio.vercel.app/assets/process-1.webp',
    imageAlt: 'Khảo sát và lên chiến lược',
    threshold: 0.12,
  },
  {
    idx: '02',
    phase: 'Nhìn thấy website trước khi code',
    title: 'Thiết kế UI/UX & Prototype',
    desc: 'Biến ý tưởng thành giao diện trực quan để bạn xem, trải nghiệm và duyệt trước khi lập trình.',
    highlights: ['Giao diện theo thương hiệu', 'Prototype tương tác', 'Responsive mọi thiết bị'],
    image: 'https://kune-studio.vercel.app/assets/process-2.webp',
    imageAlt: 'Thiết kế UI UX và prototype',
    threshold: 0.38,
  },
  {
    idx: '03',
    phase: 'Website nhanh, ổn định, dễ phát triển',
    title: 'Lập trình & Tối ưu hiệu suất',
    desc: 'Biến thiết kế thành website hoàn chỉnh, nhanh và hoạt động tốt trên mọi thiết bị.',
    highlights: ['Responsive mượt mà', 'Tối ưu tốc độ tải trang', 'Code sạch, dễ mở rộng'],
    image: 'https://kune-studio.vercel.app/assets/process-3.webp',
    imageAlt: 'Lập trình và tối ưu hiệu suất',
    threshold: 0.65,
  },
  {
    idx: '04',
    phase: 'Sẵn sàng vận hành',
    title: 'Kiểm thử, Bàn giao & Hỗ trợ',
    desc: 'Kiểm tra kỹ trước khi đưa website vào hoạt động và bàn giao đầy đủ để bạn chủ động quản lý.',
    highlights: ['Kiểm thử toàn diện', 'Bàn giao source code', 'Hướng dẫn quản trị', 'Hỗ trợ sau bàn giao'],
    image: 'https://kune-studio.vercel.app/assets/process-4.webp',
    imageAlt: 'Kiểm thử bàn giao và hỗ trợ',
    threshold: 0.90,
  },
];

export const LaserScrollTimeline: React.FC<LaserScrollTimelineProps> = ({
  heading = '4 bước biến ý tưởng thành sản phẩm chuẩn mực',
  subtext = 'Quy trình rõ ràng, minh bạch — bạn luôn biết dự án đang ở bước nào và nhận được gì sau mỗi giai đoạn.',
  steps = DEFAULT_STEPS,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const laserBeamRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let animId: number;
    let targetProgress = 0;
    let currentProgress = 0;
    let isRunning = false;

    // Calculate progress ratio (0 to 1) based on card position in viewport
    const calculateProgress = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const triggerY = window.innerHeight * 0.72; // Activates when 72% down viewport
      const totalHeight = rect.height;
      const ratio = (triggerY - rect.top) / totalHeight;
      targetProgress = Math.max(0, Math.min(1, ratio));
    };

    // Smooth Lerp Physics Loop: x += (target - current) * 0.18
    const animate = () => {
      currentProgress += (targetProgress - currentProgress) * 0.18;
      const delta = Math.abs(targetProgress - currentProgress);
      if (delta < 0.0004) {
        currentProgress = targetProgress;
      }

      const percent = currentProgress * 100;

      // 1. Update laser beam vertical height
      if (laserBeamRef.current) {
        laserBeamRef.current.style.height = `${percent}%`;
      }

      // 2. Update laser head spark position & visibility
      if (sparkRef.current) {
        sparkRef.current.style.top = `${percent}%`;
        sparkRef.current.style.opacity = currentProgress > 0.01 ? '1' : '0';
      }

      // 3. Update ambient glow orb position
      if (ambientGlowRef.current) {
        ambientGlowRef.current.style.top = `${percent}%`;
      }

      // 4. Update milestones state (passed vs upcoming)
      steps.forEach((step, idx) => {
        const itemEl = itemRefs.current[idx];
        if (itemEl) {
          const threshold = (step.threshold ?? (idx + 1) / steps.length) - 0.03;
          const isPassed = currentProgress >= threshold;
          if (isPassed && !itemEl.classList.contains('passed')) {
            itemEl.classList.add('passed');
            itemEl.classList.remove('upcoming');
          } else if (!isPassed && itemEl.classList.contains('passed')) {
            itemEl.classList.remove('passed');
            itemEl.classList.add('upcoming');
          }
        }
      });

      if (delta >= 0.0004) {
        animId = requestAnimationFrame(animate);
      } else {
        isRunning = false;
      }
    };

    const handleScrollOrResize = () => {
      calculateProgress();
      if (!isRunning) {
        isRunning = true;
        animId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });
    handleScrollOrResize();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [steps]);

  const handleMilestoneClick = (index: number) => {
    const item = itemRefs.current[index];
    if (item) {
      item.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="laser-timeline-section" id="process">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {heading}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            {subtext}
          </p>
        </div>

        {/* Laser Scroll Canvas Card */}
        <div className="laser-timeline-canvas-card" ref={cardRef}>
          {/* Ambient Glow Orb */}
          <div className="laser-timeline-ambient-glow" ref={ambientGlowRef} />

          {/* Central Laser Rail Track */}
          <div className="laser-timeline-rail-track">
            <div className="laser-rail-guide-wire" />
            <div className="laser-rail-beam" ref={laserBeamRef} />
            <div className="laser-head-spark" ref={sparkRef} />
          </div>

          {/* Milestones List */}
          <div className="laser-timeline-list">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={step.idx}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className={`laser-milestone-item upcoming ${isLeft ? 'side-left' : 'side-right'}`}
                  onClick={() => handleMilestoneClick(index)}
                >
                  {/* Node Anchor on the Rail */}
                  <div className="milestone-node-anchor">
                    <div className="node-outer-halo" />
                    <div className="node-ring-pulse" />
                    <div className="node-core-dot">
                      <span className="node-inner-idx">{step.idx}</span>
                    </div>
                  </div>

                  {/* Horizontal Branch Line connecting Rail to Content */}
                  <div className="node-branch-line" />

                  {/* Milestone Content */}
                  <div className="milestone-content-flow">
                    <div className="mb-1">
                      <span className="milestone-phase-badge">{step.phase}</span>
                    </div>
                    <h3 className="milestone-title">{step.title}</h3>
                    <p className="milestone-desc">{step.desc}</p>

                    <div className="milestone-highlights-grid">
                      {step.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="highlight-pill">
                          <Check size={16} strokeWidth={2.5} className="check-bullet" aria-hidden="true" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual Illustration Image */}
                  <figure className="milestone-visual">
                    <img
                      src={step.image}
                      alt={step.imageAlt || step.title}
                      loading="lazy"
                      width={1000}
                      height={625}
                    />
                  </figure>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LaserScrollTimeline;
