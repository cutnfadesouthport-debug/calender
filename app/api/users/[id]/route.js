import { NextResponse } from 'next/server';
import User from '../../../../models/User';
import connectDB from '../../../../lib/mongodb';

export async function PUT(request, { params }) {
  try {
    const { checked } = await request.json();
    await connectDB();
    
    const user = await User.findByIdAndUpdate(
      params.id,
      { checked },
      { new: true }
    );
    
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}