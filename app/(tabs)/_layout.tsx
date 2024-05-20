import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import { router, Tabs } from 'expo-router';
import React from 'react';

import { SafeAreaView, TouchableOpacity } from 'react-native';

enum TabName {
  Home = 'index',
  Journal = 'journal',
  Add = 'add',
  Expense = 'expenses',
  Todo = 'todos',
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <SafeAreaView></SafeAreaView>,
      }}
      tabBar={props => (
        <ThemedView
          style={{
            backgroundColor: colors.primary[400],
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 8,
          }}
        >
          <TouchableOpacity onPress={() => props.navigation.navigate(TabName.Home)}>
            <ThemedText>Home</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate(TabName.Expense)}>
            <ThemedText>Expenses</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={e => {
              e.preventDefault();
              router.push('add');
            }}
            style={{
              bottom: 40, // space from bottombar
              backgroundColor: '#7d7d7d',
              width: 70,
              height: 70,
              borderRadius: 9999,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ThemedText>Add</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate(TabName.Todo)}>
            <ThemedText>Todo</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate(TabName.Journal)}>
            <ThemedText>Journal</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}
    >
      <Tabs.Screen name={TabName.Home}></Tabs.Screen>
      <Tabs.Screen name={TabName.Journal}></Tabs.Screen>
      <Tabs.Screen name={TabName.Add}></Tabs.Screen>
      <Tabs.Screen name={TabName.Expense}></Tabs.Screen>
      <Tabs.Screen name={TabName.Todo}></Tabs.Screen>
    </Tabs>
  );
}
