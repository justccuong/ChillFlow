export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function formatEventDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

export function calculateTimeRemaining(targetDate: string, now = Date.now()): TimeRemaining {
  let targetTime = new Date(targetDate).getTime();

  if (isNaN(targetTime) || targetTime <= now) {
    // 14 days, 8 hours, 45 minutes default lively countdown
    targetTime = now + 14 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000 + 45 * 60 * 1000;
  }

  const difference = Math.max(0, targetTime - now);

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}
