/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useRef, useState } from 'react';
import { View, Text, TextInput, Platform, FlatList } from 'react-native';
import DatePicker, { Event } from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useStyle } from '../styles/Style';
import { formatDate } from '../utils/date';
import { useCategories } from '../hooks/useCategories';
import { SelectableCategory } from '../components/SelectableCategory';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { api } from '../services/api';
import { StackNavProps } from '../routes/MainRoutes';
import { Task } from '../models/Task';
import { keys } from '../utils/keys';

type OnDateChangeType = (event: Event, date: Date | undefined) => void;

export const CreateTask = ({
  navigation,
}: StackNavProps<'CreateTask'>): JSX.Element => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const descInput = useRef<TextInput>(null);
  const { categories } = useCategories();

  const styles = useStyle(theme => ({
    title: {
      fontSize: theme.fontSizes.xl,
      color: theme.colors.black,
      fontWeight: 'bold',
      marginBottom: 16,
      marginHorizontal: 32,
    },

    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
      // paddingHorizontal: 32,
      paddingVertical: 16,
    },

    titleInput: {
      fontSize: theme.fontSizes.md,
      color: theme.colors.black,
      padding: 8,
      marginBottom: 16,
      height: 48,
      marginHorizontal: 32,
    },

    divider: {
      width: '20%',
      height: 2,
      backgroundColor: theme.colors.primary[500],
      marginHorizontal: 32,
    },

    descriptionInput: {
      marginTop: 16,
      fontSize: theme.fontSizes.md,
      color: theme.colors.black,
      padding: 8,
      marginHorizontal: 32,
    },

    date: {
      marginTop: 32,
      borderRadius: 100,
      height: 48,
      width: '50%',
      borderColor: theme.colors.gray[200],
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      marginBottom: 32,
      marginHorizontal: 32,
    },

    dateText: {
      fontSize: theme.fontSizes.md,
      color: theme.colors.gray[600],
    },

    subHeading: {
      color: theme.colors.gray[800],
      fontSize: theme.fontSizes.sm,
      marginBottom: 8,
      marginHorizontal: 32,
    },
  }));

  const onDateChange: OnDateChangeType = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleCategoryPress = (id: string) => {
    if (selectedCategories.includes(id)) {
      const newData = selectedCategories.filter(s => s !== id);
      setSelectedCategories(newData);
      return;
    }

    const newData = [...selectedCategories, id];
    setSelectedCategories(newData);
  };

  const handleTaskCreation = useCallback(async () => {
    const token = (await AsyncStorage.getItem(keys.token)) || '';
    const { status, data } = await api.post(
      '/tasks',
      {
        title,
        description,
        dueTo: date.toISOString(),
        categories: selectedCategories.map(
          id => categories.find(c => c.id === id)!.name,
        ),
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    if (status !== 201) {
      console.log(data);
    }

    navigation.navigate('Home', { shouldRefresh: true });
  }, [title, description, date, categories, selectedCategories, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Task</Text>
      <TextInput
        placeholder="Enter a task"
        autoFocus
        autoCompleteType="off"
        autoCorrect={false}
        autoCapitalize="sentences"
        style={styles.titleInput}
        onBlur={() => descInput.current?.focus()}
        returnKeyType="next"
        keyboardType="ascii-capable"
        value={title}
        onChangeText={setTitle}
      />

      <View style={styles.divider} />

      <TextInput
        ref={descInput}
        placeholder="Enter a description"
        autoCompleteType="off"
        autoCorrect={false}
        autoCapitalize="sentences"
        multiline
        style={styles.descriptionInput}
        keyboardType="ascii-capable"
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.date} onPress={() => setShow(true)}>
        <Text style={styles.dateText}>{formatDate(date)}</Text>
      </TouchableOpacity>

      {show && (
        <DatePicker
          display="default"
          mode="date"
          value={date}
          onChange={onDateChange}
          is24Hour
        />
      )}

      <Text style={styles.subHeading}>Categories</Text>
      <FlatList
        style={{
          height: 80,
          flexGrow: 0,
        }}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <View style={{ width: 24, height: '100%' }} />
        )}
        renderItem={({ item }) => (
          <SelectableCategory
            category={item}
            isSelected={selectedCategories.includes(item.id)}
            onPress={handleCategoryPress}
          />
        )}
      />

      <FloatingActionButton onPress={handleTaskCreation} />
    </View>
  );
};
