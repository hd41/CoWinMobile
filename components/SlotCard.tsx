import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

import { Slot } from './FindSlot';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function SlotCard(props: { slot: Slot }) {
  return (
    <View>
      <View style={styles.cardContainer}>

        <View style={{flexDirection: 'row', justifyContent: "space-around"}}>
          <Text style={{flex: 2}}> Center Id: {props.slot.center_id} </Text>
          <Text style={{flex: 2}}> Pincode: {props.slot.pincode} </Text>
          <View style={{
            backgroundColor: props.slot.min_age_limit == 18 ? "rgba(214, 241, 59, 1)" : "rgba(94, 139, 207, 1)",
            borderRadius: 10
          }}>
            <Text style={{flex: 2, paddingHorizontal: 3}}> {props.slot.min_age_limit}+ </Text>
          </View>
        </View>

        <Text
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Center Name: {props.slot.name}
        </Text>

        <Text
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Time Available: {props.slot.from} - {props.slot.to}  ({props.slot.date})
        </Text>

        <View
          style={[styles.codeHighlightContainer]}
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)">
          <MonoText style={{ flex: 3 }}>{props.slot.vaccine}</MonoText>
          <View
            style={{ flex: 1 , alignSelf: "center", borderRadius: 8, alignItems: 'center'}}
            darkColor={props.slot.fee_type == "Paid" ? "rgba(51, 255, 133, 1)" : "rgba(221, 14, 73, 0.87)"}
            lightColor={props.slot.fee_type == "Paid" ? "rgba(221, 14, 73, 0.87)" : "rgba(51, 255, 133, 1)"}>
          <MonoText>Fees: {props.slot.fee}</MonoText>
          </View>
        </View>

        <Text
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          District: {props.slot.district_name}
        </Text>

        <View style={{flexDirection: "row"}}>
          <Text
            style={{textAlign:'right', flex:1, 
                    backgroundColor: "rgba(105, 115, 100, 1)", 
                    borderRadius: 10,
                    color: 'white', paddingEnd: 10}}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)">
            Available slots: {props.slot.available_capacity}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 0.9*Dimensions.get('window').width,
    marginHorizontal: 5,
    margin: 5,
    padding: 3,
    borderBottomColor: '#0a0a0a',
    borderRadius: 5,
    borderWidth: 1
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingVertical:2,
    flexDirection: 'row',
  }
});
