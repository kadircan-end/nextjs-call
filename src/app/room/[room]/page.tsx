'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import JitsiMeeting from '@/components/JitsiMeeting';

export default function RoomPage() {
  const { room } = useParams<{ room: string }>();
  const [displayName, setDisplayName] = useState<string>('Guest');

  useEffect(() => {
    const saved = localStorage.getItem('displayName');
    if (saved) setDisplayName(saved);
  }, []);

  // room paramı Next 14'te string | string[] olabilir
  const roomName = Array.isArray(room) ? room[0] : room;

  if (!roomName) return null;

  return (
    <main style={{ padding: 12 }}>
      <JitsiMeeting
        roomName={roomName}
        displayName={displayName}
        // domain="meet.jit.si" // default
        // jwt="..."            // self-host + JWT kullanırsan
        height="90vh"
      />
    </main>
  );
}
