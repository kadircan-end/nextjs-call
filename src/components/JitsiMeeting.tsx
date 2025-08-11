'use client';
import { useEffect, useRef } from 'react';

type Props = {
  roomName: string;
  domain?: string;
  displayName?: string;
  email?: string;
  jwt?: string;
  height?: number | string;
  onApiReady?: (api:any)=>void;
};

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) return resolve();
    const s = document.createElement('script');
    s.src = src; s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Jitsi script yüklenemedi'));
    document.body.appendChild(s);
  });
}

export default function JitsiMeeting({
  roomName, domain='meet.jit.si', displayName, email, jwt,
  height='80vh', onApiReady
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const apiRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (typeof window === 'undefined') return;
      await loadScript(`https://${domain}/external_api.js`);
      for (let i = 0; i < 15 && !window.JitsiMeetExternalAPI; i++) {
        await new Promise(r => setTimeout(r, 100));
      }
      if (!mounted || !window.JitsiMeetExternalAPI || !containerRef.current) return;

      apiRef.current = new window.JitsiMeetExternalAPI(domain, {
        roomName,
        parentNode: containerRef.current,
        jwt,
        userInfo: { displayName, email },
        configOverwrite: {
          prejoinPageEnabled: true,
          disableDeepLinking: true,
          disableInviteFunctions: true, // jitsi invite kapalı
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: ['microphone','camera','desktop','chat','raisehand','tileview','hangup','settings'],
        },
      });

      onApiReady?.(apiRef.current);
    })();

    return () => { mounted = false; try { apiRef.current?.dispose?.(); } catch {} };
  }, [domain, roomName, jwt, displayName, email, onApiReady]);

  return (
    <div style={{ width: '100%', height, borderRadius: 16, overflow: 'hidden' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
