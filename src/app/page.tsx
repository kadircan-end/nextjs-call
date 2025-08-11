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
    <main style={{ maxWidth: 560, margin: '40px auto', padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>Hızlı Toplantı</h1>
      <p style={{ opacity: 0.8, marginBottom: 20 }}>
        Tamamen ücretsiz, Jitsi tabanlı. Oda adı gir veya rastgele oda oluştur.
      </p>

      <label>Görünen ad</label>
      <input
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Adın"
        style={{ width: '100%', padding: 10, margin: '6px 0 16px', borderRadius: 8, border: '1px solid #ddd' }}
      />

      <label>Oda adı</label>
      <input
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        placeholder="örn. ekip-toplantisi"
        style={{ width: '100%', padding: 10, margin: '6px 0 16px', borderRadius: 8, border: '1px solid #ddd' }}
      />

      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={() => go()} style={{ padding: '10px 14px', borderRadius: 10 }}>
          Rastgele Oda Oluştur
        </button>
        <button onClick={() => go(room)} style={{ padding: '10px 14px', borderRadius: 10 }}>
          Bu Odaya Katıl
        </button>
      </div>
    </main>
  );
}
