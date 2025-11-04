import { doc, setDoc, updateDoc, collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../config/firebase'

export const createUserProfile = async (userId, userData) => {
  await setDoc(doc(db, 'users', userId), { ...userData, createdAt: new Date(), updatedAt: new Date() })
}
export const updateUserProfile = async (userId, updates) => {
  await updateDoc(doc(db, 'users', userId), { ...updates, updatedAt: new Date() })
}
export const createBooking = async (bookingData) => {
  const ref = await addDoc(collection(db, 'bookings'), { ...bookingData, createdAt: new Date() })
  return ref.id
}
export const getUserBookings = async (userId) => {
  const q = query(collection(db, 'bookings'), where('userId', '==', userId))
  const snap = await getDocs(q)
  const bookings = []
  snap.forEach((d) => bookings.push({ id: d.id, ...d.data() }))
  return bookings
}
export const addHotelReview = async (hotelId, reviewData) => {
  await addDoc(collection(db, 'reviews'), { hotelId, ...reviewData, createdAt: new Date() })
}
