import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width, height } = Dimensions.get('window')

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const onboardingData = [
    { title: 'Discover Amazing Hotels', description: 'Browse through thousands of hotels worldwide', image: require('../Materials/01-Onboarding Page/onboarding1.png') },
    { title: 'Easy Booking Process', description: 'Book your perfect room in just a few taps', image: require('../Materials/01-Onboarding Page/onboarding2.png') },
    { title: 'Manage Your Trips', description: 'Keep track of all your bookings in one place', image: require('../Materials/01-Onboarding Page/onboarding3.png') }
  ]
  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) setCurrentIndex(currentIndex + 1)
    else handleComplete()
  }
  const handleComplete = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true')
    navigation.replace('Auth')
  }
  return (
    <View style={styles.container}>
      <Image source={onboardingData[currentIndex].image} style={styles.image} resizeMode="contain" />
      <View style={styles.content}>
        <Text style={styles.title}>{onboardingData[currentIndex].title}</Text>
        <Text style={styles.description}>{onboardingData[currentIndex].description}</Text>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>{currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  image: { width: width * 0.8, height: height * 0.4 },
  content: { alignItems: 'center', paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 15, color: '#333' },
  description: { fontSize: 16, textAlign: 'center', color: '#666', marginBottom: 30 },
  button: { backgroundColor: '#007AFF', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 25 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' }
})

export default OnboardingScreen
