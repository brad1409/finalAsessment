import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native'
import { signOut } from 'firebase/auth'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { useAuthContext } from '../context/AuthContext'

const ProfileScreen = () => {
  const { user } = useAuthContext()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { fetchUserBookings() }, [])
  const fetchUserBookings = async () => {
    try {
      const q = query(collection(db, 'bookings'), where('userId', '==', user.uid))
      const snapshot = await getDocs(q)
      const list = []
      snapshot.forEach((d) => list.push({ id: d.id, ...d.data() }))
      setBookings(list)
    } catch (e) {} finally { setLoading(false) }
  }
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: async () => { try { await signOut(auth) } catch (e) { Alert.alert('Error', 'Failed to logout') } } }
    ])
  }
  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingCard}>
      <Text style={styles.bookingHotel}>{item.hotelName}</Text>
      <Text style={styles.bookingDates}>{new Date(item.checkIn).toLocaleDateString()} - {new Date(item.checkOut).toLocaleDateString()}</Text>
      <Text style={styles.bookingTotal}>Total: ${item.total}</Text>
    </View>
  )
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={require('../Materials/09-Account Page/profile-placeholder.png')} style={styles.profileImage} />
        <Text style={styles.userName}>{user?.displayName || 'User'}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
        <TouchableOpacity style={styles.editButton}><Text style={styles.editButtonText}>Edit Profile</Text></TouchableOpacity>
      </View>
      <View style={styles.bookingsSection}>
        <Text style={styles.sectionTitle}>My Bookings</Text>
        {loading ? (<Text>Loading bookings...</Text>) : bookings.length === 0 ? (<Text style={styles.emptyText}>No bookings yet</Text>) : (
          <FlatList data={bookings} renderItem={renderBookingItem} keyExtractor={(item) => item.id} showsVerticalScrollIndicator={false} />
        )}
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}><Text style={styles.logoutButtonText}>Logout</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  profileHeader: { backgroundColor: '#fff', padding: 20, alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 15 },
  userName: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  userEmail: { fontSize: 16, color: '#666', marginBottom: 15 },
  editButton: { backgroundColor: '#007AFF', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  editButtonText: { color: '#fff', fontWeight: '600' },
  bookingsSection: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  bookingCard: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10 },
  bookingHotel: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  bookingDates: { fontSize: 14, color: '#666', marginBottom: 5 },
  bookingTotal: { fontSize: 14, fontWeight: '600', color: '#007AFF' },
  emptyText: { textAlign: 'center', color: '#666', fontStyle: 'italic' },
  logoutButton: { backgroundColor: '#dc3545', margin: 20, padding: 15, borderRadius: 8, alignItems: 'center' },
  logoutButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
})

export default ProfileScreen
