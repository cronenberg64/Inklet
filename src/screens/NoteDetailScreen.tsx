import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';
import { Note, NoteFormData } from '../types/note';
import { storage, StorageKeys } from '../utils/storage';
import Icon from 'react-native-vector-icons/Ionicons';

export const NoteDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const noteId = (route.params as { noteId: string }).noteId;
  const isNewNote = noteId === 'new';

  const [formData, setFormData] = useState<NoteFormData>({
    title: '',
    content: '',
    tags: [],
    isPinned: false,
  });
  const [currentTag, setCurrentTag] = useState('');
  const [isLoading, setIsLoading] = useState(!isNewNote);

  useEffect(() => {
    if (!isNewNote) {
      loadNote();
    }
  }, [noteId]);

  const loadNote = async () => {
    try {
      const notes = await storage.getItem<Note[]>(StorageKeys.NOTES);
      const note = notes?.find(n => n.id === noteId);
      if (note) {
        setFormData({
          title: note.title,
          content: note.content,
          tags: note.tags,
          isPinned: note.isPinned,
          color: note.color,
        });
      }
    } catch (error) {
      console.error('Error loading note:', error);
      Alert.alert('Error', 'Failed to load note');
    } finally {
      setIsLoading(false);
    }
  };

  const saveNote = async () => {
    try {
      const notes = await storage.getItem<Note[]>(StorageKeys.NOTES) || [];
      const now = new Date().toISOString();

      if (isNewNote) {
        const newNote: Note = {
          id: Date.now().toString(),
          ...formData,
          createdAt: now,
          updatedAt: now,
        };
        await storage.setItem(StorageKeys.NOTES, [...notes, newNote]);
      } else {
        const noteIndex = notes.findIndex(n => n.id === noteId);
        if (noteIndex !== -1) {
          notes[noteIndex] = {
            ...notes[noteIndex],
            ...formData,
            updatedAt: now,
          };
          await storage.setItem(StorageKeys.NOTES, notes);
        }
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error saving note:', error);
      Alert.alert('Error', 'Failed to save note');
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFormData(prev => ({ ...prev, isPinned: !prev.isPinned }))}
        >
          <Icon
            name={formData.isPinned ? 'pin' : 'pin-outline'}
            size={24}
            color={formData.isPinned ? COLORS.primary : COLORS.text}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          value={formData.title}
          onChangeText={title => setFormData(prev => ({ ...prev, title }))}
          placeholderTextColor={COLORS.gray}
        />

        <TextInput
          style={styles.contentInput}
          placeholder="Start writing..."
          value={formData.content}
          onChangeText={content => setFormData(prev => ({ ...prev, content }))}
          multiline
          placeholderTextColor={COLORS.gray}
        />

        <View style={styles.tagsSection}>
          <Text style={styles.sectionTitle}>Tags</Text>
          <View style={styles.tagsContainer}>
            {formData.tags.map((tag, index) => (
              <TouchableOpacity
                key={index}
                style={styles.tag}
                onPress={() => removeTag(tag)}
              >
                <Text style={styles.tagText}>#{tag}</Text>
                <Icon name="close-circle" size={16} color={COLORS.gray} />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.addTagContainer}>
            <TextInput
              style={styles.tagInput}
              placeholder="Add a tag"
              value={currentTag}
              onChangeText={setCurrentTag}
              onSubmitEditing={addTag}
              placeholderTextColor={COLORS.gray}
            />
            <TouchableOpacity style={styles.addTagButton} onPress={addTag}>
              <Icon name="add" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  titleInput: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  contentInput: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    minHeight: 200,
    textAlignVertical: 'top',
  },
  tagsSection: {
    marginTop: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.md,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  tagText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
    marginRight: SPACING.xs,
  },
  addTagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagInput: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    marginRight: SPACING.sm,
  },
  addTagButton: {
    padding: SPACING.sm,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    margin: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: COLORS.background,
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
}); 