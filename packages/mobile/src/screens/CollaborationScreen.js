import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function CollaborationScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Collaboration</Text>
        <Text style={styles.subtitle}>Work together in real-time</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.buttonText}>Create New Session</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Join Session</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active Sessions</Text>
        <Text style={styles.emptyText}>No active sessions</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Smart Suggestions</Text>
        <SuggestionCard
          type="Collaborator Match"
          description="Found 3 producers with similar genre experience"
        />
        <SuggestionCard
          type="Optimal Time"
          description="Best collaboration window: 7-9 PM"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <FeatureItem icon="🎙️" title="Real-time Audio Sync" />
        <FeatureItem icon="💬" title="In-app Chat" />
        <FeatureItem icon="🎥" title="Video Call Support" />
        <FeatureItem icon="🔒" title="Permission Management" />
        <FeatureItem icon="⏱️" title="Session Recording" />
      </View>
    </ScrollView>
  );
}

function SuggestionCard({ type, description }) {
  return (
    <View style={styles.suggestionCard}>
      <Text style={styles.suggestionType}>{type}</Text>
      <Text style={styles.suggestionDescription}>{description}</Text>
    </View>
  );
}

function FeatureItem({ icon, title }) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={styles.featureText}>{title}</Text>
    </View>
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
  primaryButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
    padding: 20,
  },
  suggestionCard: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  suggestionType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  suggestionDescription: {
    fontSize: 14,
    color: '#888',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    marginBottom: 10,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  featureText: {
    color: '#fff',
    fontSize: 16,
  },
});
