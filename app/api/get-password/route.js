import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function GET() {
  try {
    await connectDB();
    const password = await Admin.findOne({});

    // get key from password.key
    return new Response(JSON.stringify({ key: password?.key }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
