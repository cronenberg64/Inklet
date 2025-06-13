import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';
import { useTheme } from '../hooks/useTheme';
import Icon from 'react-native-vector-icons/Ionicons';

export const SettingsScreen: React.FC = () => {
  const { theme, setThemeMode } = useTheme();

  const renderSettingItem = (
    icon: string,
    title: string,
    rightElement?: React.ReactNode,
  ) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <Icon name={icon} size={24} color={COLORS.text} style={styles.settingIcon} />
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      {rightElement}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        {renderSettingItem(
          'moon',
          'Dark Mode',
          <Switch
            value={theme.isDarkMode}
            onValueChange={() =>
              setThemeMode(theme.isDarkMode ? 'light' : 'dark')
            }
          />,
        )}
        {renderSettingItem(
          'color-palette',
          'Theme Color',
          <Icon name="chevron-forward" size={24} color={COLORS.gray} />,
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notes</Text>
        {renderSettingItem(
          'cloud-upload',
          'Backup Notes',
          <Icon name="chevron-forward" size={24} color={COLORS.gray} />,
        )}
        {renderSettingItem(
          'cloud-download',
          'Restore Notes',
          <Icon name="chevron-forward" size={24} color={COLORS.gray} />,
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        {renderSettingItem(
          'information-circle',
          'Version',
          <Text style={styles.settingValue}>1.0.0</Text>,
        )}
        {renderSettingItem(
          'document-text',
          'Terms of Service',
          <Icon name="chevron-forward" size={24} color={COLORS.gray} />,
        )}
        {renderSettingItem(
          'shield-checkmark',
          'Privacy Policy',
          <Icon name="chevron-forward" size={24} color={COLORS.gray} />,
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  section: {
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.gray,
    marginBottom: SPACING.md,
    textTransform: 'uppercase',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: SPACING.md,
  },
  settingTitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
  },
  settingValue: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray,
  },
}); 