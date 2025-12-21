import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function PATCH(request) {
  try {
    const { key } = await request.json();

    await connectDB();
    const admin = await Admin.findOne();
    admin.key = key;
    await admin.save();

    return new Response(
      JSON.stringify({
        success: true,
        key,
        message: "Key updated successfully",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Update failed" }), {
      status: 500,
    });
  }
}
