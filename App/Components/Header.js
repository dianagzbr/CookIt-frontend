import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../Utils/Colors';

const Header = ({ headerText, headerIcon, onIconPress, logoutIcon, onLogoutPress }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {logoutIcon && onLogoutPress && (
        <TouchableOpacity onPress={onLogoutPress} style={{ padding: 10 }}>
          <FontAwesome name={logoutIcon} size={24} color={Colors.BLACK} />
        </TouchableOpacity>
      )}
      <Text style={{ textAlign: 'center', flex: 1, fontSize: 30, fontWeight: '700' }}>
        {headerText}
      </Text>
      <TouchableOpacity onPress={onIconPress} style={{ padding: 10 }}>
        <FontAwesome name={headerIcon} size={24} color={Colors.BLACK} />
      </TouchableOpacity>
      
    </View>
  );
};

export default Header;
