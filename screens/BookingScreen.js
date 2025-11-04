import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useAuthContext } from '../context/AuthContext'

const BookingScreen = ({ route, navigation }) => {
  const { hotel } = route.params
  const { user } = useAuthContext()
  const [checkIn, setCheckIn] = useState(new Date())
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 86400000))
  const [rooms, setRooms] = useState(1)
  const calculateTotal = () => {
    const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
    return days * hotel.price * rooms
  }
  const handleBooking = async () => {
    if (checkOut <= checkIn) { Alert.alert('Error', 'Check-out date must be after check-in date'); return }
    try {
      const bookingData = { userId: user.uid, hotelId: hotel.id, hotelName: hotel.name, checkIn: checkIn.toISOString(), checkOut: checkOut.toISOString(), rooms, total: calculateTotal(), status: 'confirmed', createdAt: new Date() }
      await addDoc(collection(db, 'bookings'), bookingData)
      Alert.alert('Booking Confirmed!', `Your booking at ${hotel.name} has been confirmed.`, [{ text: 'OK', onPress: () => navigation.navigate('Explore') }])
    } catch (error) { Alert.alert('Error', 'Failed to create booking. Please try again.') }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book {hotel.name}</Text>
      <View style={styles.dateSection}>
        <Text style={styles.label}>Check-in Date</Text>
        <DateTimePicker value={checkIn} mode="date" onChange={(e, d) => d && setCheckIn(d)} />
        <Text style={styles.label}>Check-out Date</Text>
        <DateTimePicker value={checkOut} mode="date" onChange={(e, d) => d && setCheckOut(d)} />
      </View>
      <View style={styles.roomSection}>
        <Text style={styles.label}>Number of Rooms</Text>
        <View style={styles.roomCounter}>
          <TouchableOpacity onPress={() => rooms > 1 && setRooms(rooms - 1)} style={styles.counterButton}><Text style={styles.counterText}>-</Text></TouchableOpacity>
          <Text style={styles.roomText}>{rooms}</Text>
          <TouchableOpacity onPress={() => setRooms(rooms + 1)} style={styles.counterButton}><Text style={styles.counterText}>+</Text></TouchableOpacity>
        </View>
      </View>
      <View style={styles.totalSection}><Text style={styles.totalText}>Total: ${calculateTotal()}</Text></View>
      <TouchableOpacity style={styles.confirmButton} onPress={handleBooking}><Text style={styles.confirmButtonText}>Confirm Booking</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', padding: 20 },
  dateSection: { padding: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  roomSection: { padding: 20 },
  roomCounter: { flexDirection: 'row', alignItems: 'center' },
  counterButton: { backgroundColor: '#007AFF', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  counterText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  roomText: { fontSize: 18, marginHorizontal: 20 },
  totalSection: { padding: 20, alignItems: 'center' },
  totalText: { fontSize: 24, fontWeight: 'bold', color: '#007AFF' },
  confirmButton: { backgroundColor: '#28a745', margin: 20, padding: 15, borderRadius: 8, alignItems: 'center' },
  confirmButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
})

export default BookingScreen
