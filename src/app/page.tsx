'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');
  const [room, setRoom] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('displayName');
    if (saved) setDisplayName(saved);
  }, []);

  function randomRoom() {
    return 'room-' + Math.random().toString(36).slice(2, 10);
  }

  const go = (targetRoom?: string) => {
    const r = (targetRoom || room || randomRoom()).trim();
    if (!r) return;
    localStorage.setItem('displayName', displayName || 'Guest');
    router.push(`/room/${encodeURIComponent(r)}`);
  };

  return (
    <main className="glass hero">
      <h1>Hızlı, ücretsiz ve güzel bir toplantı deneyimi</h1>
      <p>Jitsi tabanlı, tarayıcıdan anında katıl. Davet linkini paylaş, geri kalanını bize bırak.</p>

      <div className="card glass stack">
        <div className="stack">
          <label>Görünen ad</label>
          <input className="input" value={displayName} onChange={(e)=>setDisplayName(e.target.value)} placeholder="Adın" />
        </div>

        <div className="stack">
          <label>Oda adı</label>
          <input className="input" value={room} onChange={(e)=>setRoom(e.target.value)} placeholder="örn. ekip-toplantisi" />
        </div>

        <div className="row" style={{justifyContent:'flex-end', marginTop:6}}>
          <button className="btn btn-primary" onClick={()=>go(room)}>Bu Odaya Katıl</button>
        </div>
      </div>
    </main>
  );
}
