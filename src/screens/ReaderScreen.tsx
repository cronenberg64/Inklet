import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { EPUBReader } from '../components/EPUBReader';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';
import { RootStackParamList } from '../navigation/types';
import type { RouteProp } from '@react-navigation/native';

type ReaderScreenRouteProp = RouteProp<RootStackParamList, 'Reader'>;

export const ReaderScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ReaderScreenRouteProp>();
  const { bookId } = route.params;
  const [showControls, setShowControls] = useState(true);

  const handleProgressUpdate = (progress: number) => {
    // TODO: Update reading progress in storage
    console.log('Reading progress:', progress);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.background}
        translucent
      />
      <EPUBReader
        bookId={bookId}
        onProgressUpdate={handleProgressUpdate}
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
              onPress={() => {
                // TODO: Implement bookmark functionality
              }}
            >
              <Icon name="bookmark-outline" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => {
                // TODO: Implement settings panel
              }}
            >
              <Icon name="settings-outline" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>
        </View>
      )}
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