import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { EPUBReader } from '../components/EPUBReader';
import { ReaderSettings } from '../components/ReaderSettings';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';
import { RootStackParamList } from '../navigation/types';
import { readingProgress } from '../utils/readingProgress';
import { readerSettings, ReaderSettings as ReaderSettingsType } from '../utils/readerSettings';
import { bookmarks } from '../utils/bookmarks';
import type { RouteProp } from '@react-navigation/native';

type ReaderScreenRouteProp = RouteProp<RootStackParamList, 'Reader'>;

export const ReaderScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ReaderScreenRouteProp>();
  const { bookId } = route.params;
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<ReaderSettingsType>({
    fontSize: 16,
    theme: 'light',
    scrollMode: 'scroll',
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await readerSettings.getSettings();
      setSettings(savedSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleProgressUpdate = async (progress: number) => {
    try {
      await readingProgress.updateProgress(bookId, progress);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const handleAddBookmark = async () => {
    try {
      await bookmarks.addBookmark(bookId, 0); // TODO: Get current position
      Alert.alert('Success', 'Bookmark added successfully');
    } catch (error) {
      console.error('Error adding bookmark:', error);
      Alert.alert('Error', 'Failed to add bookmark');
    }
  };

  const handleFontSizeChange = async (fontSize: number) => {
    try {
      await readerSettings.updateFontSize(fontSize);
      setSettings((prev) => ({ ...prev, fontSize }));
    } catch (error) {
      console.error('Error updating font size:', error);
      Alert.alert('Error', 'Failed to update font size');
    }
  };

  const handleThemeChange = async (theme: 'light' | 'dark' | 'sepia') => {
    try {
      await readerSettings.updateTheme(theme);
      setSettings((prev) => ({ ...prev, theme }));
    } catch (error) {
      console.error('Error updating theme:', error);
      Alert.alert('Error', 'Failed to update theme');
    }
  };

  const handleScrollModeChange = async (scrollMode: 'scroll' | 'page') => {
    try {
      await readerSettings.updateScrollMode(scrollMode);
      setSettings((prev) => ({ ...prev, scrollMode }));
    } catch (error) {
      console.error('Error updating scroll mode:', error);
      Alert.alert('Error', 'Failed to update scroll mode');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={settings.theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={COLORS.background}
        translucent
      />
      <EPUBReader
        bookId={bookId}
        onProgressUpdate={handleProgressUpdate}
        fontSize={settings.fontSize}
        theme={settings.theme}
        scrollMode={settings.scrollMode}
      />
      {showControls && (
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <View style={styles.rightControls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handleAddBookmark}
            >
              <Icon name="bookmark-outline" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setShowSettings(true)}
            >
              <Icon name="settings-outline" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ReaderSettings
        visible={showSettings}
        onClose={() => setShowSettings(false)}
        onFontSizeChange={handleFontSizeChange}
        onThemeChange={handleThemeChange}
        onScrollModeChange={handleScrollModeChange}
        currentFontSize={settings.fontSize}
        currentTheme={settings.theme}
        currentScrollMode={settings.scrollMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  controls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backButton: {
    padding: SPACING.sm,
  },
  rightControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    padding: SPACING.sm,
    marginLeft: SPACING.sm,
  },
}); 