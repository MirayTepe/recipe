import React, { Component } from 'react';
import { View, Text, Switch, SectionList } from 'react-native';
import styles from './styles';

class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationsEnabled: true,
      darkModeEnabled: false,
    };
  }

  toggleNotifications = () => {
    this.setState(prevState => ({
      notificationsEnabled: !prevState.notificationsEnabled
    }));
  };

  toggleDarkMode = () => {
    this.setState(prevState => ({
      darkModeEnabled: !prevState.darkModeEnabled
    }));
  };

  renderItem = ({ item }) => (
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

  renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  render() {
    const sections = [
      {
        title: 'Genel',
        data: [
          { label: 'Bildirimler', value: this.state.notificationsEnabled, toggle: this.toggleNotifications },
          { label: 'Gece Modu', value: this.state.darkModeEnabled, toggle: this.toggleDarkMode },
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

    return (
      <View style={styles.container}>
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item + index}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
        />
      </View>
    );
  }
}

export default SettingScreen;
