'use client';
import { useEffect, useRef } from 'react';

type Props = {
  roomName: string;
  domain?: string; // self-host'un varsa: meet.sirket.com; yoksa meet.jit.si
  displayName?: string;
  email?: string;
  jwt?: string;    // self-host + JWT kullanırsan
  height?: number | string;
};

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Jitsi script yüklenemedi'));
    document.body.appendChild(s);
  });
}

export default function JitsiMeeting({
  roomName,
  domain = 'meet.jit.si',
  displayName,
  email,
  jwt,
  height = '80vh',
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const apiRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      if (typeof window === 'undefined') return;
      await loadScript(`https://${domain}/external_api.js`);
      if (!mounted || !window.JitsiMeetExternalAPI || !containerRef.current) return;

      apiRef.current = new window.JitsiMeetExternalAPI(domain, {
        roomName,
        parentNode: containerRef.current,
        jwt,
        userInfo: { displayName, email },
        configOverwrite: {
          prejoinPageEnabled: true,
          disableDeepLinking: true, // mobilde app’e zorlama olmasın
        },
        interfaceConfigOverwrite: {
          // İstersen toolbarı kısıtlayabilirsin:
          // TOOLBAR_BUTTONS: ['microphone','camera','desktop','chat','raisehand','tileview','hangup'],
        },
      });

      apiRef.current.addListener('videoConferenceJoined', () => {
        // ör: odaya girildiğinde bir şey yapmak istersen
        // apiRef.current.executeCommand('toggleTileView');
      });
    })();

    return () => {
      mounted = false;
      try { apiRef.current?.dispose?.(); } catch {}
    };
  }, [domain, roomName, jwt, displayName, email]);

  return (
    <div style={{ width: '100%', height, borderRadius: 12, overflow: 'hidden' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
