import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST() {
  try {
    await connectDB();
    
    const response = await fetch(
      "https://services.leadconnectorhq.com/users/?locationId=HJMdGIrc4MORK1Ts5Wru",
      {
        headers: {
          Authorization: "Bearer pit-f5571c91-b185-4028-b181-7eca7b39e9a3",
          Version: "2021-07-28",
        },
      }
    );
    
    const data = await response.json();
    
    if (!data.users || !Array.isArray(data.users)) {
      return Response.json({ error: "Invalid response format" }, { status: 400 });
    }
    
    const users = data.users.map(user => ({
      userId: user.id,
      name: user.name,
      checked: false
    }));
    
    await User.deleteMany({});
    await User.insertMany(users);
    
    return Response.json({ 
      success: true, 
      count: users.length,
      users 
    });
    
  } catch (error) {
    console.error("Error syncing users:", error);
    return Response.json({ error: "Failed to sync users" }, { status: 500 });
  }
}