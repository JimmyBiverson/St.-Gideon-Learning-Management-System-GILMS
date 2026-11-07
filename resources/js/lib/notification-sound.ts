type FeedItem = { id: string; created_at: string };

export function createNotificationTracker() {
   let seen: Set<string> | null = null;
   let newest = 0;
   return (items: FeedItem[]) => {
      const fresh =
         seen === null
            ? []
            : items.filter(
                 (item) =>
                    !seen!.has(item.id) &&
                    Date.parse(item.created_at) >= newest,
              );
      newest = Math.max(
         newest,
         ...items
            .map((item) => Date.parse(item.created_at))
            .filter(Number.isFinite),
      );
      seen = new Set(
         [...(seen ?? []), ...items.map((item) => item.id)].slice(-500),
      );
      return fresh;
   };
}

const preferenceKey = 'gilms-notification-sound';
export const soundEvent = 'gilms-notification-sound-change';
let audio: AudioContext | null = null;

export function soundEnabled(): boolean {
   try {
      return localStorage.getItem(preferenceKey) !== 'muted';
   } catch {
      return false;
   }
}
export function setSoundEnabled(enabled: boolean) {
   try {
      localStorage.setItem(preferenceKey, enabled ? 'enabled' : 'muted');
   } catch {
      return;
   }
   window.dispatchEvent(new Event(soundEvent));
}
export function unlockNotificationAudio() {
   if (!soundEnabled() || typeof AudioContext === 'undefined') return;
   audio ??= new AudioContext();
   if (audio.state === 'suspended') void audio.resume().catch(() => {});
}
export async function playNotificationSound() {
   if (!soundEnabled() || !audio || audio.state !== 'running') return;
   const start = audio.currentTime;
   [660, 880].forEach((frequency, index) => {
      const oscillator = audio!.createOscillator();
      const gain = audio!.createGain();
      const time = start + index * 0.14;
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.06, time + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
      oscillator.connect(gain);
      gain.connect(audio!.destination);
      oscillator.start(time);
      oscillator.stop(time + 0.32);
   });
}
