import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import { useAuthContext } from '../context/AuthContext'

const HotelDetailScreen = ({ route, navigation }) => {
  const { hotel } = route.params
  const { user } = useAuthContext()
  const [reviews] = useState([
    { id: '1', user: 'John D.', rating: 5, text: 'Amazing hotel with great service!' },
    { id: '2', user: 'Sarah M.', rating: 4, text: 'Beautiful location and clean rooms.' }
  ])
  const handleBookNow = () => {
    if (!user) {
      Alert.alert('Sign In Required', 'Please sign in to book a room', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign In', onPress: () => navigation.navigate('Auth') }
      ])
      return
    }
    navigation.navigate('Booking', { hotel })
  }
  return (
    <ScrollView style={styles.container}>
      <Image source={hotel.image} style={styles.hotelImage} />
      <View style={styles.content}>
        <Text style={styles.hotelName}>{hotel.name}</Text>
        <Text style={styles.location}>{hotel.location}</Text>
        <Text style={styles.rating}>⭐ {hotel.rating} (124 reviews)</Text>
        <Text style={styles.price}>${hotel.price}/night</Text>
        <TouchableOpacity style={[styles.bookButton, !user && styles.bookButtonDisabled]} onPress={handleBookNow}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <Text style={styles.reviewUser}>{review.user}</Text>
              <Text style={styles.reviewRating}>{'⭐'.repeat(review.rating)}</Text>
              <Text style={styles.reviewText}>{review.text}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.addReviewButton} onPress={() => user ? navigation.navigate('AddReview', { hotel }) : null}>
            <Text style={styles.addReviewText}>Add Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  hotelImage: { width: '100%', height: 300 },
  content: { padding: 20 },
  hotelName: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  location: { fontSize: 16, color: '#666', marginBottom: 5 },
  rating: { fontSize: 16, color: '#f39c12', marginBottom: 10 },
  price: { fontSize: 20, fontWeight: 'bold', color: '#007AFF', marginBottom: 20 },
  bookButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 30 },
  bookButtonDisabled: { backgroundColor: '#ccc' },
  bookButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  reviewsSection: { marginTop: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  reviewCard: { backgroundColor: '#f9f9f9', padding: 15, borderRadius: 8, marginBottom: 10 },
  reviewUser: { fontWeight: 'bold', marginBottom: 5 },
  reviewRating: { marginBottom: 5 },
  reviewText: { color: '#666' },
  addReviewButton: { alignItems: 'center', padding: 15 },
  addReviewText: { color: '#007AFF', fontSize: 16 }
})

export default HotelDetailScreen
