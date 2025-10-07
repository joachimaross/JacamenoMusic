import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>JACAMENO</Text>
        <Text style={styles.subtitle}>AI Music Production</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <ActionCard icon="🎹" title="Studio" />
            <ActionCard icon="🎵" title="Streaming" />
            <ActionCard icon="📝" title="Lyrics" />
            <ActionCard icon="🎤" title="Vocal Coach" />
          </View>
        </View>

        {/* Recent Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Projects</Text>
          <ProjectCard name="New Beat 2024" tracks={8} />
          <ProjectCard name="Collab Track" tracks={5} />
          <ProjectCard name="Demo Mix" tracks={12} />
        </View>

        {/* AI Assistant */}
        <View style={styles.aiSection}>
          <Text style={styles.aiTitle}>🤖 AI Producer</Text>
          <Text style={styles.aiMessage}>
            Ready to create something amazing? I can help with lyrics, mixing, mastering, and more!
          </Text>
          <TouchableOpacity style={styles.aiButton}>
            <Text style={styles.aiButtonText}>Start Session</Text>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Platform Features</Text>
          <FeatureItem icon="🎛️" title="VST Plugin Support" />
          <FeatureItem icon="🤝" title="Real-time Collaboration" />
          <FeatureItem icon="📊" title="Analytics Dashboard" />
          <FeatureItem icon="📱" title="Offline Mode" />
          <FeatureItem icon="🎬" title="Video & Photo Editing" />
          <FeatureItem icon="💰" title="Direct Royalty Payouts" />
        </View>
      </ScrollView>
    </View>
  );
}

function ActionCard({ icon, title }: { icon: string; title: string }) {
  return (
    <TouchableOpacity style={styles.actionCard}>
      <Text style={styles.actionIcon}>{icon}</Text>
      <Text style={styles.actionTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

function ProjectCard({ name, tracks }: { name: string; tracks: number }) {
  return (
    <TouchableOpacity style={styles.projectCard}>
      <View style={styles.projectIcon} />
      <View style={styles.projectInfo}>
        <Text style={styles.projectName}>{name}</Text>
        <Text style={styles.projectMeta}>{tracks} tracks</Text>
      </View>
      <Text style={styles.projectArrow}>›</Text>
    </TouchableOpacity>
  );
}

function FeatureItem({ icon, title }: { icon: string; title: string }) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={styles.featureTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '47%',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  actionIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  actionTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  projectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  projectIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  projectInfo: {
    flex: 1,
    marginLeft: 12,
  },
  projectName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  projectMeta: {
    color: '#888',
    fontSize: 14,
    marginTop: 4,
  },
  projectArrow: {
    color: '#888',
    fontSize: 24,
  },
  aiSection: {
    margin: 20,
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 20,
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  aiMessage: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  aiButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  aiButtonText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '600',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  featureTitle: {
    color: '#fff',
    fontSize: 16,
  },
});
