import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

// Initialize Supabase (Use your keys here)
const supabaseUrl = 'https://yqvoiuzecnhwegceihfx.supabase.co';
const supabaseAnonKey = 'sb_publishable_dfwztNCReR5SGKlAYdXnqQ_bT80sG9e';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  const [audits, setAudits] = useState([]);

  useEffect(() => {
    async function fetchAudits() {
      const { data } = await supabase.from('audits').select('*').order('created_at', { ascending: false });
      setAudits(data || []);
    }
    fetchAudits();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Agency Mobile</Text>
        <Text style={styles.subtitle}>{audits.length} Real-time Leads</Text>
      </View>

      <ScrollView style={styles.scroll}>
        {audits.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.url}>{item.url}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
        ))}
        {audits.length === 0 && (
          <Text style={styles.empty}>No audits found yet. Run your scraper to see data!</Text>
        )}
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 30,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -1,
  },
  subtitle: {
    color: '#64748b',
    marginTop: 5,
  },
  scroll: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  url: {
    fontWeight: '700',
    fontSize: 16,
  },
  statusBadge: {
    marginTop: 10,
    backgroundColor: '#eff6ff',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: '#2563eb',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  empty: {
    textAlign: 'center',
    marginTop: 100,
    color: '#94a3b8',
  }
});
