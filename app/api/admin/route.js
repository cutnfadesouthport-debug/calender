import { NextResponse } from "next/server";
import Admin from "../../../models/Admin";
import connectDB from "../../../lib/mongodb";

// Add CORS headers to all responses
function addCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}

export async function OPTIONS() {
  return addCorsHeaders(new NextResponse(null, { status: 200 }));
}

export async function POST(request) {
  try {
    const { password } = await request.json();
    await connectDB();

    // Update or create admin with new password
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      existingAdmin.key = password;
      await existingAdmin.save();
    } else {
      await Admin.create({ key: password });
    }

    const response = NextResponse.json({ success: true });
    return addCorsHeaders(response);
  } catch (error) {
    const response = NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
    return addCorsHeaders(response);
  }
}

export async function GET() {
  try {
    await connectDB();
    const admin = await Admin.findOne();
    const response = NextResponse.json({ key: admin?.key || null });
    return addCorsHeaders(response);
  } catch (error) {
    const response = NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
    return addCorsHeaders(response);
  }
}

export async function PUT(request) {
  try {
    const { password } = await request.json();
    await connectDB();
    const admin = await Admin.findOne();
    const isValid = admin?.key === password;
    const response = NextResponse.json({ valid: isValid });
    return addCorsHeaders(response);
  } catch (error) {
    const response = NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
    return addCorsHeaders(response);
  }
}
