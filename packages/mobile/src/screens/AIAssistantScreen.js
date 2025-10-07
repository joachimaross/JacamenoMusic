import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

export default function AIAssistantScreen() {
  const [prompt, setPrompt] = useState('');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Assistant</Text>
        <Text style={styles.subtitle}>Your creative AI partner</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.aiCard}>
          <Text style={styles.aiCardIcon}>🎛️</Text>
          <View style={styles.aiCardContent}>
            <Text style={styles.aiCardTitle}>AI Mixing & Mastering</Text>
            <Text style={styles.aiCardDescription}>
              Professional mixing and mastering powered by AI
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.aiCard}>
          <Text style={styles.aiCardIcon}>✍️</Text>
          <View style={styles.aiCardContent}>
            <Text style={styles.aiCardTitle}>Songwriting Assistant</Text>
            <Text style={styles.aiCardDescription}>
              Generate lyrics, melodies, and chord progressions
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.aiCard}>
          <Text style={styles.aiCardIcon}>🎤</Text>
          <View style={styles.aiCardContent}>
            <Text style={styles.aiCardTitle}>Vocal Coaching</Text>
            <Text style={styles.aiCardDescription}>
              Get real-time feedback on your vocal performance
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.aiCard}>
          <Text style={styles.aiCardIcon}>🎵</Text>
          <View style={styles.aiCardContent}>
            <Text style={styles.aiCardTitle}>Music Generation</Text>
            <Text style={styles.aiCardDescription}>
              Create unique tracks with Suno AI integration
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.aiCard}>
          <Text style={styles.aiCardIcon}>🎬</Text>
          <View style={styles.aiCardContent}>
            <Text style={styles.aiCardTitle}>Video Generation</Text>
            <Text style={styles.aiCardDescription}>
              Create music videos with Kaiber AI
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Prompt</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Describe what you want to create..."
          placeholderTextColor="#666"
          value={prompt}
          onChangeText={setPrompt}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.buttonText}>Generate with AI</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  section: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  aiCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  aiCardIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  aiCardContent: {
    flex: 1,
  },
  aiCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  aiCardDescription: {
    fontSize: 14,
    color: '#888',
  },
  textArea: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
