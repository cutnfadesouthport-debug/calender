import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { userId } = await params;
    const { searchParams } = new URL(request.url);
    const startTime = searchParams.get('startTime');
    const endTime = searchParams.get('endTime');
    
    if (!startTime || !endTime) {
      return NextResponse.json({ error: 'startTime and endTime are required' }, { status: 400 });
    }
    
    const response = await fetch(
      `https://services.leadconnectorhq.com/calendars/events?locationId=${process.env.GHL_LOCATION_ID}&userId=${userId}&startTime=${startTime}&endTime=${endTime}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.GHL_TOKEN}`,
          'Version': '2021-04-15'
        }
      }
    );
    
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}