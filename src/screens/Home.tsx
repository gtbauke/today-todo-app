/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useStyle } from '../styles/Style';
import { Category } from '../components/Category';
import { Task } from '../components/Task';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { StackNavProps } from '../routes/MainRoutes';
import { ThemeContext } from '../contexts/ThemeContext';
import { useTasks } from '../hooks/useTasks';
import { AuthContext } from '../contexts/AuthContext';
import { User } from '../models/User';
import { api } from '../services/api';
import { useCategories } from '../hooks/useCategories';

const { width } = Dimensions.get('screen');

export const Home = ({
  navigation,
  route,
}: StackNavProps<'Home'>): JSX.Element => {
  const defaultTheme = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);

  const [user, setUser] = useState<User>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isCategoriesRefreshing, setIsCategoriesRefreshing] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const styles = useStyle(theme => ({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: theme.colors.white,
      paddingVertical: 24,
    },

    text: {
      color: theme.colors.black,
      fontSize: theme.fontSizes.md,
      marginLeft: 16,
    },

    heading: {
      color: theme.colors.black,
      fontSize: theme.fontSizes.larger,
      fontWeight: 'bold',
      marginBottom: 16,
      marginLeft: 16,
    },

    subHeading: {
      color: theme.colors.gray[800],
      fontSize: theme.fontSizes.sm,
      marginBottom: 8,
      marginLeft: 16,
    },
  }));

  const { tasks, setTasks, mutate, mutateSingle, refresh } = useTasks();
  const {
    categories,
    setCategories,
    refresh: refreshCategories,
  } = useCategories();

  const handleTaskIndicatorPress = (id: string) => {
    const data = tasks.find(t => t.id === id);
    if (!data) return;

    const updated = categories.map(t =>
      data.categories.includes(t.name)
        ? { ...t, completedTasks: t.completedTasks + (data.completed ? -1 : 1) }
        : t,
    );

    setCategories(updated);
    mutateSingle({ ...data, completed: !data.completed }, true);
  };

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    refresh();
    setIsRefreshing(false);
  }, [refresh]);

  const handleCategoriesRefresh = useCallback(() => {
    setIsCategoriesRefreshing(true);
    refreshCategories();
    setIsCategoriesRefreshing(false);
  }, [refreshCategories]);

  const handleCategoryPress = useCallback(
    (id: string) => {
      if (selectedCategories.includes(id)) {
        const newData = selectedCategories.filter(c => c !== id);
        setSelectedCategories(newData);
        return;
      }

      setSelectedCategories([...selectedCategories, id]);
    },
    [selectedCategories],
  );

  useEffect(() => {
    AsyncStorage.getItem('@token').then(t => {
      const token = t || '';

      api
        .get('/users/me', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          const { data: body } = data as { data: User };
          setUser(body);
        })
        .catch(err => console.log(err));
    });
  }, []);

  useEffect(() => {
    if (!route.params || !route.params.shouldRefresh) return;

    handleRefresh();
    handleCategoriesRefresh();
  }, [route, handleRefresh, handleCategoriesRefresh]);

  const tasksToShow = useMemo(() => {
    const mappedTasks = selectedCategories.map(
      id => categories.find(c => c.id === id)!.name,
    );

    return tasks.filter(
      t =>
        t.categories.length === 0 ||
        t.categories.some(name => mappedTasks.includes(name)),
    );
  }, [categories, tasks, selectedCategories]);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.heading}>Hello, {user?.name.split(' ')[0]}!</Text>
        </TouchableOpacity>
        <Text style={styles.subHeading}>Categories</Text>
        <FlatList
          style={{
            height: 200,
            flexGrow: 0,
            marginBottom: 16,
          }}
          contentContainerStyle={{
            paddingHorizontal: 16,
          }}
          refreshing={isCategoriesRefreshing}
          onRefresh={refreshCategories}
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => (
            <View style={{ width: 24, height: '100%' }} />
          )}
          renderItem={({ item, index }) => (
            <Category
              onPress={() => handleCategoryPress(item.id)}
              category={item}
              isOdd={index % 2 !== 0}
              isSelected={selectedCategories.includes(item.id)}
            />
          )}
        />
        <Text style={styles.subHeading}>Today&apos;s tasks</Text>
        {tasks ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 32,
              paddingVertical: 16,
              width,
            }}
            onRefresh={handleRefresh}
            refreshing={isRefreshing}
            ItemSeparatorComponent={() => (
              <View style={{ width: '100%', height: 16 }} />
            )}
            data={tasksToShow}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <Task
                task={item}
                isOdd={index % 2 !== 0}
                onIndicatorPress={handleTaskIndicatorPress}
              />
            )}
          />
        ) : (
          <ActivityIndicator
            size="large"
            color={defaultTheme.colors.accent[500]}
          />
        )}
      </View>
      <FloatingActionButton onPress={() => navigation.navigate('CreateTask')} />
    </>
  );
};
