export async function syncUsers() {
  try {
    const response = await fetch('/api/sync-users', {
      method: 'POST',
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to sync users');
    }
    
    return data;
  } catch (error) {
    console.error('Error syncing users:', error);
    throw error;
  }
}