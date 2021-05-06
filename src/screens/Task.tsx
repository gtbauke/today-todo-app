/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View, Platform, TextInput, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DatePicker, { Event } from '@react-native-community/datetimepicker';

import { useStyle } from '../styles/Style';
import { StackNavProps } from '../routes/MainRoutes';
import { Task as TaskModel } from '../models/Task';
import { keys } from '../utils/keys';
import { api } from '../services/api';
import { formatDate } from '../utils/date';
import { SelectableCategory } from '../components/SelectableCategory';
import { useCategories } from '../hooks/useCategories';
import { Button } from '../components/Button';
import { defaultTheme } from '../styles/theme';

type OnDateChangeType = (event: Event, date: Date | undefined) => void;

export const Task = ({
  route,
  navigation,
}: StackNavProps<'Task'>): JSX.Element => {
  const [task, setTask] = useState<TaskModel>({} as TaskModel);
  const [show, setShow] = useState(false);
  const { categories } = useCategories();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(keys.token).then(t => {
      const token = t || '';

      api
        .get(`tasks/${route.params?.taskId}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          const { data: body } = data as { data: TaskModel };
          setTask(body);
        })
        .catch(err => console.log(err));
    });
  }, [route.params?.taskId]);

  useEffect(() => {
    if (!task || !task.categories) {
      setSelectedCategories([]);
      return;
    }

    const taskCategories = task?.categories.map(
      name => categories.find(c => c.name === name)?.id,
    );

    setSelectedCategories(taskCategories);
  }, [categories, task]);

  const styles = useStyle(theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },

    titleInput: {
      fontSize: theme.fontSizes.larger,
      color: theme.colors.black,
      // padding: 8,
      marginBottom: 16,
      marginHorizontal: 32,
      fontWeight: 'bold',
    },

    divider: {
      width: '20%',
      height: 4,
      backgroundColor: theme.colors.primary[500],
      marginHorizontal: 32,
      borderRadius: 100,
    },

    descriptionInput: {
      marginTop: 16,
      fontSize: theme.fontSizes.md,
      color: theme.colors.black,
      // padding: 8,
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

    infoContainer: {
      marginTop: 32,
      borderRadius: 100,
      height: 48,
      width: '50%',
      borderColor: theme.colors.gray[900],
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      marginHorizontal: 32,
    },

    infoText: {
      fontSize: theme.fontSizes.md,
      color: theme.colors.gray[900],
    },

    buttonGroup: {
      marginHorizontal: 32,
      height: '15%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    saveText: {
      color: theme.colors.white,
      fontSize: theme.fontSizes.lg,
      fontWeight: 'bold',
    },
  }));

  const date = useMemo(() => formatDate(new Date(task?.dueTo)), [task?.dueTo]);

  const onDateChange: OnDateChangeType = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(task.dueTo);
    setShow(Platform.OS === 'ios');
    setTask({
      ...task,
      dueTo: currentDate.toISOString(),
    });
  };

  const setTitle = useCallback(
    (text: string) => {
      setTask({
        ...task,
        title: text,
      });
    },
    [task],
  );

  const setDescription = useCallback(
    (text: string) => {
      setTask({
        ...task,
        description: text,
      });
    },
    [task],
  );

  const handleCategoryPress = (id: string) => {
    if (selectedCategories.includes(id)) {
      const newData = selectedCategories.filter(s => s !== id);
      setSelectedCategories(newData);
      return;
    }

    const newData = [...selectedCategories, id];
    setSelectedCategories(newData);
  };

  const handleTaskUpdate = useCallback(async () => {
    const token = (await AsyncStorage.getItem(keys.token)) || '';
    const { status, data } = await api.put(
      `/tasks/${task.id}`,
      {
        title: task.title,
        description: task.description,
        categories: task.categories,
        dueTo: task.dueTo,
        completed: task.completed,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    if (status !== 200) console.log(data);
    navigation.navigate('Home', { shouldRefresh: true });
  }, [navigation, task]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter a task"
        autoCompleteType="off"
        autoCorrect={false}
        autoCapitalize="sentences"
        style={styles.titleInput}
        returnKeyType="next"
        keyboardType="ascii-capable"
        value={task?.title}
        onChangeText={setTitle}
        multiline
      />

      <View style={styles.divider} />

      <TextInput
        placeholder="Enter a description"
        autoCompleteType="off"
        autoCorrect={false}
        autoCapitalize="sentences"
        multiline
        style={styles.descriptionInput}
        keyboardType="ascii-capable"
        value={task?.description}
        onChangeText={setDescription}
      />
      <TouchableOpacity
        style={styles.infoContainer}
        onPress={() => setShow(true)}
      >
        <Text style={styles.infoText}>{date}</Text>
      </TouchableOpacity>

      {show && (
        <DatePicker
          display="default"
          mode="date"
          value={new Date(task?.dueTo)}
          onChange={onDateChange}
          is24Hour
        />
      )}

      <TouchableOpacity
        style={styles.infoContainer}
        onPress={() => {
          setTask({
            ...task,
            completed: !task?.completed,
          });
        }}
      >
        <Text style={styles.infoText}>
          {task?.completed ? 'Complete' : 'Not Complete'}
        </Text>
      </TouchableOpacity>

      <FlatList
        style={{
          height: 80,
          flexGrow: 0,
          marginVertical: 32,
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

      <View style={styles.buttonGroup}>
        <Button
          rippleColor={defaultTheme.colors.primary[700]}
          onPress={handleTaskUpdate}
        >
          <Text style={styles.saveText}>Save Changes</Text>
        </Button>
        <Button
          rippleColor={defaultTheme.colors.primary[700]}
          variant="outlined"
          onPress={() => navigation.goBack()}
        >
          Cancel
        </Button>
      </View>
    </View>
  );
};
