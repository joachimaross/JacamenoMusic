import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

export default function StudioScreen() {
  const [projectName, setProjectName] = useState('');
  const [bpm, setBpm] = useState('120');
  const [key, setKey] = useState('C');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Virtual Studio</Text>
        <Text style={styles.subtitle}>Professional music production</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>New Project</Text>
        <TextInput
          style={styles.input}
          placeholder="Project Name"
          placeholderTextColor="#666"
          value={projectName}
          onChangeText={setProjectName}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="BPM"
            placeholderTextColor="#666"
            value={bpm}
            onChangeText={setBpm}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Key"
            placeholderTextColor="#666"
            value={key}
            onChangeText={setKey}
          />
        </View>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.buttonText}>Create Project</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Projects</Text>
        <Text style={styles.emptyText}>No projects yet</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <FeatureItem icon="🎹" title="Multi-track Recording" />
        <FeatureItem icon="🎛️" title="VST Plugin Support" />
        <FeatureItem icon="🎚️" title="Advanced Mixing Console" />
        <FeatureItem icon="📹" title="Video/Photo Editing" />
        <FeatureItem icon="💾" title="Offline Mode" />
      </View>
    </ScrollView>
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
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
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
  emptyText: {
    color: '#666',
    textAlign: 'center',
    padding: 20,
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
