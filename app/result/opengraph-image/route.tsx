import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const day = searchParams.get('d');
  const month = searchParams.get('m');
  const year = searchParams.get('y');

  if (!day || !month || !year) {
    return new Response('Missing parameters', { status: 400 });
  }

  const formattedDate = `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          border: '8px solid #111827',
          borderRadius: '16px',
        }}
      >
        {/* Map Area */}
        <div
          style={{
            width: '100%',
            height: '40%',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '4px dashed #d1d5db',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#ef4444',
                border: '3px solid #ffffff',
              }}
            />
            <div
              style={{
                fontSize: '14px',
                color: '#6b7280',
                fontWeight: '600',
              }}
            >
              Your Birthday Place
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div
          style={{
            flex: 1,
            padding: '48px',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}
        >
          {/* Birthday and Coordinates */}
          <div
            style={{
              display: 'flex',
              gap: '48px',
              paddingBottom: '32px',
              borderBottom: '4px dashed #d1d5db',
            }}
          >
            <div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Birthday</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}>{formattedDate}</div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Coordinates</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}>Your Place</div>
            </div>
          </div>

          {/* Location Info */}
          <div>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>Location</div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
              Your Birthday Place
            </div>
            <div style={{ fontSize: '18px', color: '#374151', lineHeight: '1.6' }}>
              Discover where your birthday exists on Earth through mathematical mapping.
            </div>
          </div>

          {/* Website */}
          <div
            style={{
              paddingTop: '32px',
              borderTop: '4px dashed #d1d5db',
            }}
          >
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>
              Discover your birthday place at <span style={{ fontWeight: '600', color: '#374151' }}>co-date.vercel.app</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
