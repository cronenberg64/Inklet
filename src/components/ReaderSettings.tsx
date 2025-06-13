import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';

interface ReaderSettingsProps {
  visible: boolean;
  onClose: () => void;
  onFontSizeChange: (size: number) => void;
  onThemeChange: (theme: 'light' | 'dark' | 'sepia') => void;
  onScrollModeChange: (mode: 'scroll' | 'page') => void;
  currentFontSize: number;
  currentTheme: 'light' | 'dark' | 'sepia';
  currentScrollMode: 'scroll' | 'page';
}

export const ReaderSettings: React.FC<ReaderSettingsProps> = ({
  visible,
  onClose,
  onFontSizeChange,
  onThemeChange,
  onScrollModeChange,
  currentFontSize,
  currentTheme,
  currentScrollMode,
}) => {
  const fontSizes = [12, 14, 16, 18, 20, 22, 24];
  const themes = [
    { id: 'light', name: 'Light', icon: 'sunny' },
    { id: 'dark', name: 'Dark', icon: 'moon' },
    { id: 'sepia', name: 'Sepia', icon: 'color-palette' },
  ] as const;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Reader Settings</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.settingsContainer}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Font Size</Text>
              <View style={styles.fontSizeContainer}>
                {fontSizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.fontSizeButton,
                      currentFontSize === size && styles.fontSizeButtonActive,
                    ]}
                    onPress={() => onFontSizeChange(size)}
                  >
                    <Text
                      style={[
                        styles.fontSizeText,
                        currentFontSize === size && styles.fontSizeTextActive,
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Theme</Text>
              <View style={styles.themeContainer}>
                {themes.map((theme) => (
                  <TouchableOpacity
                    key={theme.id}
                    style={[
                      styles.themeButton,
                      currentTheme === theme.id && styles.themeButtonActive,
                    ]}
                    onPress={() => onThemeChange(theme.id)}
                  >
                    <Icon
                      name={theme.icon}
                      size={24}
                      color={currentTheme === theme.id ? COLORS.white : COLORS.text}
                    />
                    <Text
                      style={[
                        styles.themeText,
                        currentTheme === theme.id && styles.themeTextActive,
                      ]}
                    >
                      {theme.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Reading Mode</Text>
              <View style={styles.scrollModeContainer}>
                <TouchableOpacity
                  style={[
                    styles.scrollModeButton,
                    currentScrollMode === 'scroll' && styles.scrollModeButtonActive,
                  ]}
                  onPress={() => onScrollModeChange('scroll')}
                >
                  <Icon
                    name="swap-vertical"
                    size={24}
                    color={currentScrollMode === 'scroll' ? COLORS.white : COLORS.text}
                  />
                  <Text
                    style={[
                      styles.scrollModeText,
                      currentScrollMode === 'scroll' && styles.scrollModeTextActive,
                    ]}
                  >
                    Scroll
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.scrollModeButton,
                    currentScrollMode === 'page' && styles.scrollModeButtonActive,
                  ]}
                  onPress={() => onScrollModeChange('page')}
                >
                  <Icon
                    name="document"
                    size={24}
                    color={currentScrollMode === 'page' ? COLORS.white : COLORS.text}
                  />
                  <Text
                    style={[
                      styles.scrollModeText,
                      currentScrollMode === 'page' && styles.scrollModeTextActive,
                    ]}
                  >
                    Page
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  closeButton: {
    padding: SPACING.sm,
  },
  settingsContainer: {
    padding: SPACING.md,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  fontSizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  fontSizeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  fontSizeButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  fontSizeText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text,
  },
  fontSizeTextActive: {
    color: COLORS.white,
  },
  themeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  themeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    marginHorizontal: SPACING.xs,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  themeButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  themeText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text,
    marginLeft: SPACING.xs,
  },
  themeTextActive: {
    color: COLORS.white,
  },
  scrollModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollModeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    marginHorizontal: SPACING.xs,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  scrollModeButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  scrollModeText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text,
    marginLeft: SPACING.xs,
  },
  scrollModeTextActive: {
    color: COLORS.white,
  },
}); 