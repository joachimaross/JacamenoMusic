import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

export default function StreamingScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Streaming</Text>
        <Text style={styles.subtitle}>Discover and share music</Text>
      </View>

      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search tracks, artists, playlists..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Music</Text>
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Upload Track</Text>
        </TouchableOpacity>
        <Text style={styles.emptyText}>No tracks uploaded yet</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Playlists</Text>
        <TouchableOpacity style={styles.playlistButton}>
          <Text style={styles.playlistButtonText}>Create Playlist</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Integrations</Text>
        <IntegrationCard
          name="Spotify"
          icon="🎵"
          description="Sync your Spotify library"
        />
        <IntegrationCard
          name="Apple Music"
          icon="🎶"
          description="Connect Apple Music"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <FeatureItem icon="📊" title="Analytics Dashboard" />
        <FeatureItem icon="💰" title="Monetization Tools" />
        <FeatureItem icon="🌐" title="Global Distribution" />
        <FeatureItem icon="📱" title="Offline Playback" />
      </View>
    </ScrollView>
  );
}

function IntegrationCard({ name, icon, description }) {
  return (
    <TouchableOpacity style={styles.integrationCard}>
      <Text style={styles.integrationIcon}>{icon}</Text>
      <View style={styles.integrationContent}>
        <Text style={styles.integrationName}>{name}</Text>
        <Text style={styles.integrationDescription}>{description}</Text>
      </View>
      <Text style={styles.connectButton}>Connect</Text>
    </TouchableOpacity>
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
  searchSection: {
    padding: 20,
    paddingTop: 0,
  },
  searchInput: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
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
  uploadButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  playlistButton: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  playlistButtonText: {
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
  integrationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  integrationIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  integrationContent: {
    flex: 1,
  },
  integrationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 3,
  },
  integrationDescription: {
    fontSize: 13,
    color: '#888',
  },
  connectButton: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
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
