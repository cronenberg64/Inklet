import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fileManager } from '../utils/fileManager';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';

export const AddBookScreen: React.FC = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleAddBook = async () => {
    try {
      setLoading(true);
      const book = await fileManager.pickBook();
      if (book) {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error adding book:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="close" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Add Book</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddBook}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.primary} />
          ) : (
            <>
              <Icon name="add-circle" size={48} color={COLORS.primary} />
              <Text style={styles.addButtonText}>Import EPUB</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.description}>
          Import your EPUB files to start reading. Your books will be stored
          locally on your device.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  closeButton: {
    padding: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: SPACING.md,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  addButton: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  addButtonText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.primary,
    marginTop: SPACING.sm,
  },
  description: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
}); 