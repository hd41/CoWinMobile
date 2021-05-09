import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Picker, TouchableOpacity, Button, ScrollView } from 'react-native';
import SlotCard from './SlotCard';
import { Text, View } from './Themed';
import * as WebBrowser from 'expo-web-browser';
import Colors from '../constants/Colors';


interface FindSlotProps {}

export interface Slot  {
	center_id: number,
	name: string,
	address: string,
	state_name: string,
	district_name: string,
	pincode: string,
	from: string,
	to: string,
	fee_type: string,
	fee: string,
	date: string,
	available_capacity: number,
	min_age_limit: number,
	vaccine: string
}

export default function FindSlot(props: FindSlotProps) {

  const COWIN_URL = 'https://cdn-api.co-vin.in/api'; 
	const [states, setStates] = useState<Record<number, string>>({});
	const [districts, setDistricts] = useState<Record<number, string>>({});
	const [selectedState, setSelectedState] = useState<string>();
	const [selectedDistrict, setSelectedDistrict] = useState<string>();
	const [slots, setSlots] = useState<Slot[] | undefined>(undefined);


	const clearStates = () => {
		setStates({});
		setDistricts({});
		setSelectedState("");
		setSelectedDistrict("");
		setSelectedDistrict(undefined);
	}

  useEffect(() => {
		clearStates();
		let state_response:Record<number, string> = {};
    fetch(COWIN_URL + '/v2/admin/location/states', {headers: {
			Accept: 'application/json',
			"Accept-Language": "hi_IN",
    	"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) " +
                  "Chrome/39.0.2171.95 Safari/537.36 "
		}}).then(response => response.json()).then((data) => {
			data["states"].forEach((state: {state_id: number, state_name: string}) => {
				state_response[state.state_id] = state.state_name;
			});
			setStates(state_response);
		})
  }, []);

  const onStateSelection = (itemValue: string) => {

		let district_response:Record<number, string> = {};
    fetch(COWIN_URL + '/v2/admin/location/districts/'+itemValue, {headers: {
			Accept: 'application/json',
			"Accept-Language": "hi_IN",
    	"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) " +
                  "Chrome/39.0.2171.95 Safari/537.36 "
		}}).then(response => response.json()).then((data) => {
			data["districts"].forEach((district: {district_id: number, district_name: string}) => {
				district_response[district.district_id] = district.district_name;
			});
			setDistricts(district_response);
		})
		setSelectedState(itemValue);
	};
	
	const onDistrictSelection = (districtId: string) => {
		let slots: Slot[]= [];
		var d = new Date();
		d.setDate(new Date().getDate()+1);
		var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear();
    fetch(COWIN_URL + '/v2/appointment/sessions/public/findByDistrict?district_id='+districtId+'&date='+datestring, {headers: {
			Accept: 'application/json',
			"Accept-Language": "hi_IN",
    	"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) " +
                  "Chrome/39.0.2171.95 Safari/537.36 "
		}}).then(response => response.json()).then((data) => {
			setSlots(data["sessions"]);
		})
		setSelectedDistrict(districtId);
	}

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Select your state and district:
        </Text>

        <View style={styles.dropdownContainer}>
            <Picker
							selectedValue={selectedState}
							style={{ height: 50, width: 350 }}
							onValueChange={(itemValue, itemIndex) => onStateSelection(itemValue)}
							>
							{Object.keys(states).map(stateId => <Picker.Item key={stateId} label={states[parseInt(stateId)]} value={stateId} />)}
						</Picker>

            <Picker
							selectedValue={selectedDistrict}
							style={{ height: 50, width: 350 }}
							onValueChange={(itemValue, itemIndex) => onDistrictSelection(itemValue) }
							>
							{Object.keys(districts).map(districtId => <Picker.Item key={districtId} label={districts[parseInt(districtId)]} value={districtId} />)}
						</Picker>
        </View>
				
				{slots != undefined ? (slots.length == 0 ? (
					<Text style={styles.noSlotMessage}>
						No Slot Available
				</Text>
				) : (
					<ScrollView style={{marginBottom:50}}>
					{
						slots.map(slot => <SlotCard slot={slot}/>)
					}
					</ScrollView>
				)) : <Text /> }
				
				<View style={styles.helpContainer}>
					<TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
						<Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
							Tap here to go to registration site
						</Text>
					</TouchableOpacity>
				</View>
      </View>
    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://selfregistration.cowin.gov.in/'
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 18,
    lineHeight: 24,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	dropdownContainer: {
		alignItems: 'center',
		width: 380,
		paddingTop: 20
	},
	noSlotMessage: {
		paddingTop: 30,
		alignItems: 'center',
		fontSize: 18,
		fontWeight: 'bold',
	},
	helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
		alignItems: 'center'
	},
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
