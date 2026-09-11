import { ImageResponse } from 'next/og';

export const alt = 'Oficina Producao Musical com IA — Pedro Itan';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: 64,
          background: 'linear-gradient(135deg, #050505 0%, #111 100%)',
          color: '#fff',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 560,
            height: 560,
            background: 'radial-gradient(circle at 80% 20%, rgba(0,255,255,0.16), transparent 60%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 480,
            height: 480,
            background: 'radial-gradient(circle at 20% 80%, rgba(175,50,250,0.14), transparent 60%)',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, zIndex: 1 }}>
          <div
            style={{
              fontSize: 18,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#00f0ff',
              fontWeight: 700,
            }}
          >
            Oficina presencial · Salvador
          </div>
          <div
            style={{
              fontSize: 62,
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 900,
              letterSpacing: '-0.02em',
            }}
          >
            Producao Musical com IA
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            zIndex: 1,
            width: '100%',
          }}
        >
          <div
            style={{
              fontSize: 26,
              color: '#d1d5db',
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            Crie musicas, trilhas e locucoes com Ableton Live 12, Suno, Splice, LANDR, ElevenLabs, ChatGPT e Claude.
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                fontSize: 22,
                color: '#00f0ff',
                fontWeight: 700,
              }}
            >
              <span>14h · 19 set 2026</span>
              <span style={{ color: '#4b5563' }}>|</span>
              <span>Docas · Studio do Forte</span>
            </div>
            <div
              style={{
                background: '#00f0ff',
                color: '#000',
                padding: '14px 28px',
                borderRadius: 999,
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              Inscreva-se
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
