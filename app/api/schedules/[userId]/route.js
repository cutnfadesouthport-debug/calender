import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { userId } = await params;
    
    const response = await fetch(
      `https://services.leadconnectorhq.com/calendars/schedules/search?locationId=${process.env.GHL_LOCATION_ID}&userId=${userId}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.GHL_TOKEN}`,
          'Version': '2021-07-28'
        }
      }
    );
    
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}