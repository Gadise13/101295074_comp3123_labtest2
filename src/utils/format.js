
export function toLocalTime(unixSeconds, timezoneOffsetSeconds = 0) {
  if (!unixSeconds) return '—';
  const ms = (unixSeconds + timezoneOffsetSeconds) * 1000;
  const date = new Date(ms);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
}
