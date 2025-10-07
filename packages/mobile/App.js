import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';

// Screens (placeholders)
import HomeScreen from './src/screens/HomeScreen';
import StudioScreen from './src/screens/StudioScreen';
import AIAssistantScreen from './src/screens/AIAssistantScreen';
import CollaborationScreen from './src/screens/CollaborationScreen';
import StreamingScreen from './src/screens/StreamingScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          headerStyle: styles.header,
          headerTintColor: '#fff',
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'JACAMENO' }}
        />
        <Tab.Screen 
          name="Studio" 
          component={StudioScreen}
          options={{ title: 'Virtual Studio' }}
        />
        <Tab.Screen 
          name="AI" 
          component={AIAssistantScreen}
          options={{ title: 'AI Assistant' }}
        />
        <Tab.Screen 
          name="Collab" 
          component={CollaborationScreen}
          options={{ title: 'Collaborate' }}
        />
        <Tab.Screen 
          name="Stream" 
          component={StreamingScreen}
          options={{ title: 'Streaming' }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{ title: 'Profile' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1a1a1a',
    borderTopColor: '#333',
  },
  header: {
    backgroundColor: '#000',
  },
});
