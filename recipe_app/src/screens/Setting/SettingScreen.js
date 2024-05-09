// SettingScreen.js

import React, { useState } from 'react';
import { View, Text, Switch, SectionList } from 'react-native';
import styles from './styles';

export default function SettingScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled(prevState => !prevState);
  };

  const toggleDarkMode = () => {
    setDarkModeEnabled(prevState => !prevState);
  };

  const sections = [
    {
      title: 'Genel',
      data: [
        { label: 'Bildirimler', value: notificationsEnabled, toggle: toggleNotifications },
        { label: 'Gece Modu', value: darkModeEnabled, toggle: toggleDarkMode },
      ],
    },
    {
      title: 'Hesap',
      data: [
        { label: 'Email Bildirimleri', value: true, toggle: () => {} },
        { label: 'Şifre Değiştir', value: true, toggle: () => {} },
      ],
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.settingItem}>
      <Text style={styles.settingLabel}>{item.label}</Text>
      <View style={styles.switchContainer}>
        <Switch
          value={item.value}
          onValueChange={item.toggle}
          trackColor={{ false: styles.switchOffColor.color, true: styles.switchOnColor.color }}
          thumbColor={item.value ? styles.switchOnColor.color : styles.switchOffColor.color}
        />
        <Text style={[styles.switchText, item.value ? styles.switchOnColor : styles.switchOffColor]}>
          {item.value ? 'Açık' : 'Kapalı'}
        </Text>
      </View>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
}
