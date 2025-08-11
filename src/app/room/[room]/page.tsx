'use client';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import JitsiMeeting from '@/components/JitsiMeeting';

export default function RoomPage() {
  const params = useParams<{ room?: string | string[] }>();
  const [roomName, setRoomName] = useState<string | null>(null);
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    const raw = params?.room;
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (typeof value === 'string' && value.trim()) setRoomName(value.trim());
  }, [params]);

  const appLink = useMemo(() => {
    if (!roomName || typeof window === 'undefined') return '';
    return `${window.location.origin}/room/${encodeURIComponent(roomName)}`;
  }, [roomName]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(appLink);
      // basit toast
      alert('Toplantı linki kopyalandı!');
    } catch { prompt('Bu linki kopyalayın:', appLink); }
  };

  if (!roomName) return <div className="glass card">Oda hazırlanıyor…</div>;

  return (
    <main>
      <div className="glass topbar">
        <div className="row" style={{flex:1, minWidth:0}}>
          <div className="link" title={appLink} style={{flex:1}}>{appLink}</div>
          <button className="btn" onClick={copy}>Kopyala</button>
        </div>
        <div className="controls">
          <button className="ctrl" onClick={()=>{ api?.executeCommand('hangup'); history.back(); }}>Ayrıl</button>
        </div>
      </div>

      <div className="glass card" style={{padding:0}}>
        <JitsiMeeting key={roomName} roomName={roomName} height="82vh" onApiReady={setApi}/>
      </div>
    </main>
  );
}
