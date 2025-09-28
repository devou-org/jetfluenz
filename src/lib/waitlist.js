import { collection, addDoc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

// Add user to waitlist
export const addToWaitlist = async (name, email, phone, role) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      name: name,
      email: email,
      phone: phone,
      role: role, // 'influencer' or 'business'
      status: 'waitlist',
      createdAt: serverTimestamp(),
      submittedAt: new Date().toISOString()
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return { success: false, error: error.message };
  }
};

// Get all waitlist users (for admin)
export const getWaitlistUsers = async () => {
  try {
    const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { success: true, users };
  } catch (error) {
    console.error('Error getting waitlist users:', error);
    return { success: false, error: error.message };
  }
};
