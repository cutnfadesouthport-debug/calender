import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();
    
    const response = await fetch(
      "https://services.leadconnectorhq.com/calendars/?locationId=HJMdGIrc4MORK1Ts5Wru",
      {
        headers: {
          Authorization: "Bearer pit-f5571c91-b185-4028-b181-7eca7b39e9a3",
          Version: "2021-04-15",
        },
      }
    );
    
    const data = await response.json();
    const dbUsers = await User.find({});
    
    const matchedCalendars = data.calendars?.filter(calendar => {
      const calendarName = calendar.name?.toLowerCase();
      return dbUsers.some(user => 
        calendarName?.includes(user.name.toLowerCase().split(' ')[0])
      );
    }) || [];
    
    const result = matchedCalendars.map(calendar => {
      const matchedUser = dbUsers.find(user => 
        calendar.name?.toLowerCase().includes(user.name.toLowerCase().split(' ')[0])
      );
      
      return {
        calendarId: calendar.id,
        calendarName: calendar.name,
        userId: matchedUser?.userId,
        userName: matchedUser?.name,
        openHours: calendar.openHours
      };
    });
    
    return Response.json({ calendars: result });
    
  } catch (error) {
    console.error("Error fetching calendars:", error);
    return Response.json({ error: "Failed to fetch calendars" }, { status: 500 });
  }
}