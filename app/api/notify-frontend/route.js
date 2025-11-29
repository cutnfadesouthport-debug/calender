import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST() {
  try {
    await connectDB();
    
    // Get current selected users
    const selectedUsers = await User.find({ checked: true }).select('userId name');
    const usersList = selectedUsers.map(user => ({
      id: user.userId,
      name: user.name
    }));

    return Response.json({ 
      selectedUsers: usersList,
      timestamp: Date.now()
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    return Response.json({ error: error.message }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}