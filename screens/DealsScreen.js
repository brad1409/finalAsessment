import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native'
import ApiService from '../services/apiService'

const DealsScreen = () => {
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => { fetchDeals() }, [])
  const fetchDeals = async () => {
    try { setLoading(true); const d = await ApiService.getRecommendedDeals(); setDeals(d); setError(null) }
    catch { setError('Failed to load deals') }
    finally { setLoading(false) }
  }
  const renderDealItem = ({ item }) => (
    <TouchableOpacity style={styles.dealCard}>
      <Image source={{ uri: item.image }} style={styles.dealImage} />
      <View style={styles.dealInfo}>
        <Text style={styles.dealName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.dealRating}>⭐ {item.rating}</Text>
        <Text style={styles.dealPrice}>${item.price}/night</Text>
      </View>
    </TouchableOpacity>
  )
  if (loading) return (<View style={styles.centerContainer}><ActivityIndicator size="large" color="#007AFF" /><Text style={styles.loadingText}>Loading deals...</Text></View>)
  if (error) return (<View style={styles.centerContainer}><Text style={styles.errorText}>{error}</Text><TouchableOpacity style={styles.retryButton} onPress={fetchDeals}><Text style={styles.retryButtonText}>Retry</Text></TouchableOpacity></View>)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Special Deals</Text>
      <FlatList data={deals} renderItem={renderDealItem} keyExtractor={(i) => i.id.toString()} numColumns={2} contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  dealCard: { backgroundColor: '#fff', borderRadius: 12, margin: 8, flex: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  dealImage: { width: '100%', height: 120, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  dealInfo: { padding: 12 },
  dealName: { fontSize: 14, fontWeight: 'bold', marginBottom: 4, color: '#333' },
  dealRating: { fontSize: 12, color: '#f39c12', marginBottom: 4 },
  dealPrice: { fontSize: 16, fontWeight: 'bold', color: '#007AFF' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#666' },
  errorText: { fontSize: 16, color: '#dc3545', textAlign: 'center', marginBottom: 20 },
  retryButton: { backgroundColor: '#007AFF', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  retryButtonText: { color: '#fff', fontWeight: '600' },
  listContainer: { paddingBottom: 20 }
})

export default DealsScreen
