import { NextResponse } from 'next/server';
import Admin from '../../../models/Admin';
import connectDB from '../../../lib/mongodb';

export async function POST() {
  try {
    await connectDB();
    
    const existingAdmin = await Admin.findOne();
    if (!existingAdmin) {
      await Admin.create({ key: 'admin123' });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const admin = await Admin.findOne();
    return NextResponse.json({ key: admin?.key || null });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { password } = await request.json();
    await connectDB();
    const admin = await Admin.findOne();
    const isValid = admin?.key === password;
    return NextResponse.json({ valid: isValid });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}