import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'

const ExploreScreen = ({ navigation }) => {
  const [filteredHotels, setFilteredHotels] = useState([])
  const [sortBy, setSortBy] = useState('name')
  const [loading, setLoading] = useState(true)
  const sampleHotels = [
    { id: '1', name: 'Grand Palace Hotel', location: 'New York, USA', rating: 4.8, price: 299, image: require('../Materials/06-Explore Page/hotel1.png') },
    { id: '2', name: 'Ocean View Resort', location: 'Miami, USA', rating: 4.5, price: 199, image: require('../Materials/06-Explore Page/hotel2.png') },
    { id: '3', name: 'Mountain Lodge', location: 'Colorado, USA', rating: 4.7, price: 159, image: require('../Materials/06-Explore Page/hotel3.png') }
  ]
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredHotels(sampleHotels)
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])
  const sortHotels = (criteria) => {
    const sorted = [...filteredHotels].sort((a, b) => {
      if (criteria === 'price') return a.price - b.price
      if (criteria === 'rating') return b.rating - a.rating
      return a.name.localeCompare(b.name)
    })
    setFilteredHotels(sorted)
    setSortBy(criteria)
  }
  const renderHotelCard = ({ item }) => (
    <TouchableOpacity style={styles.hotelCard} onPress={() => navigation.navigate('HotelDetail', { hotel: item })}>
      <Image source={item.image} style={styles.hotelImage} />
      <View style={styles.hotelInfo}>
        <Text style={styles.hotelName}>{item.name}</Text>
        <Text style={styles.hotelLocation}>{item.location}</Text>
        <View style={styles.ratingPriceRow}>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
          <Text style={styles.price}>${item.price}/night</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
  if (loading) return (<View style={styles.loadingContainer}><Text>Loading hotels...</Text></View>)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Hotels</Text>
      <View style={styles.sortContainer}>
        <TouchableOpacity style={[styles.sortButton, sortBy === 'name' && styles.activeSort]} onPress={() => sortHotels('name')}>
          <Text style={styles.sortText}>Name</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.sortButton, sortBy === 'price' && styles.activeSort]} onPress={() => sortHotels('price')}>
          <Text style={styles.sortText}>Price</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.sortButton, sortBy === 'rating' && styles.activeSort]} onPress={() => sortHotels('rating')}>
          <Text style={styles.sortText}>Rating</Text>
        </TouchableOpacity>
      </View>
      <FlatList data={filteredHotels} renderItem={renderHotelCard} keyExtractor={(item) => item.id} showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  sortContainer: { flexDirection: 'row', marginBottom: 20 },
  sortButton: { padding: 10, marginRight: 10, backgroundColor: '#fff', borderRadius: 20, borderWidth: 1, borderColor: '#ddd' },
  activeSort: { backgroundColor: '#007AFF' },
  sortText: { color: '#333' },
  hotelCard: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  hotelImage: { width: '100%', height: 200, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  hotelInfo: { padding: 16 },
  hotelName: { fontSize: 18, fontWeight: 'bold', marginBottom: 4, color: '#333' },
  hotelLocation: { fontSize: 14, color: '#666', marginBottom: 8 },
  ratingPriceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rating: { fontSize: 14, color: '#f39c12' },
  price: { fontSize: 16, fontWeight: 'bold', color: '#007AFF' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContainer: { paddingBottom: 20 }
})

export default ExploreScreen
