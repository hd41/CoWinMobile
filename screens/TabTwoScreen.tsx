import * as React from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import VaccineScheduler from '../components/VaccineScheduler';

export default function TabTwoScreen() {

  const [timerScreen, setTimerScreen] = React.useState<boolean>(true);
  const [runEvery, setRunEvery] = React.useState<string>("1");

  return (
    <View style={styles.container}>
      {timerScreen ? (
        <>
          <Text style={styles.title}>Tab Two</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Text style={{fontSize: 18, marginBottom: 10}}>Run scheduler for every </Text>
          <TextInput 
          style={{fontSize: 30, lineHeight: 30}}
            onChangeText={(val: string) => setRunEvery(val)}
            value={runEvery}
          />
          <Text style={{marginTop: 10, marginBottom: 30, fontSize: 18}}>minutes.</Text>
          <Button
            onPress={() => setTimerScreen(!timerScreen)}
            title={"Start scheduler"}
            >
              <b>Start Scheduler</b>
          </Button>
        </>
      ) : (
        <VaccineScheduler 
            runEvery={ parseFloat(runEvery) > 0.1 ? Math.ceil(parseFloat(runEvery)*60) : 60}
            reset={() => setTimerScreen(!timerScreen)}/>
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
