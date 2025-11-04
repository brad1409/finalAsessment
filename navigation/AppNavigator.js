import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useAuthContext } from '../context/AuthContext'
import OnboardingScreen from '../screens/OnboardingScreen'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import ExploreScreen from '../screens/ExploreScreen'
import HotelDetailScreen from '../screens/HotelDetailScreen'
import BookingScreen from '../screens/BookingScreen'
import ProfileScreen from '../screens/ProfileScreen'
import DealsScreen from '../screens/DealsScreen'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
)

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Explore" component={ExploreScreen} />
    <Tab.Screen name="Deals" component={DealsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
)

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
    <Stack.Screen name="HotelDetail" component={HotelDetailScreen} />
    <Stack.Screen name="Booking" component={BookingScreen} />
  </Stack.Navigator>
)

const AppNavigator = () => {
  const { user, loading } = useAuthContext()
  if (loading) return null
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (<Stack.Screen name="App" component={AppStack} />) : (<><Stack.Screen name="Onboarding" component={OnboardingScreen} /><Stack.Screen name="Auth" component={AuthStack} /></>)}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
