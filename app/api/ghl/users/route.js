import { NextResponse } from 'next/server';
import User from '../../../../models/User';
import connectDB from '../../../../lib/mongodb';

export async function GET() {
  try {
    await connectDB();
    
    // Fetch users from GHL API
    const ghlResponse = await fetch(`https://services.leadconnectorhq.com/users/?locationId=${process.env.GHL_LOCATION_ID}`, {
      headers: {
        'Authorization': `Bearer ${process.env.GHL_TOKEN}`,
        'Version': '2021-07-28'
      }
    });
    
    const ghlData = await ghlResponse.json();
    const ghlUsers = ghlData.users || [];
    
    // Sync with database
    for (const ghlUser of ghlUsers) {
      await User.findOneAndUpdate(
        { userId: ghlUser.id },
        { 
          userId: ghlUser.id,
          name: ghlUser.name || ghlUser.firstName + ' ' + ghlUser.lastName
        },
        { upsert: true, new: true }
      );
    }
    
    // Return all users from database
    const users = await User.find({});
    return NextResponse.json(users);
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}