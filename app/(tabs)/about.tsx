import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Ionicons name="information-circle" size={80} color="#007AFF" />
                <Text style={styles.title}>Про додаток</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>ToDo List Premium</Text>
                <Text style={styles.text}>
                    Цей додаток створено для демонстрації сучасних підходів у розробці на React Native.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Технології</Text>
                <View style={styles.featureItem}>
                    <Ionicons name="logo-react" size={20} color="#61DBFB" />
                    <Text style={styles.featureText}>React Native & Expo</Text>
                </View>
                <View style={styles.featureItem}>
                    <Ionicons name="navigate" size={20} color="#007AFF" />
                    <Text style={styles.featureText}>Expo Router (Tab Navigation)</Text>
                </View>
                <View style={styles.featureItem}>
                    <Ionicons name="create" size={20} color="#4CAF50" />
                    <Text style={styles.featureText}>React Hook Form</Text>
                </View>
                <View style={styles.featureItem}>
                    <Ionicons name="cloud-download" size={20} color="#FF9800" />
                    <Text style={styles.featureText}>DummyJSON API</Text>
                </View>
            </View>

            <Text style={styles.footer}>Версія 1.0.0 © 2026</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    content: {
        padding: 24,
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#333',
        marginTop: 12,
    },
    section: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#007AFF',
        marginBottom: 12,
    },
    text: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    featureText: {
        marginLeft: 12,
        fontSize: 16,
        color: '#444',
    },
    footer: {
        marginTop: 20,
        fontSize: 14,
        color: '#AAA',
    },
});
