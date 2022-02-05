import React, { useState } from 'react'
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    Alert,
    Button,
    Switch
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'pink'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        paddingTop: 60,
        flex: 1, flexDirection: 'row', justifyContent: 'space-between'
    },
});

const Settings = ({ navigation, route }) => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [hasAirFryer, setHasAirFryer] = useState(false);
    const toggleAirFryer = () => setHasAirFryer(previousState => !previousState);

    const [hasOven, setHasOven] = useState(false);
    const toggleOven = () => setHasOven(previousState => !previousState);

    const [hasRefrigerator, setHasRefrigerator] = useState(false);
    const toggleRefrigerator = () => setHasRefrigerator(previousState => !previousState);

    const [hasGrill, setHasGrill] = useState(false);
    const toggleGrill = () => setHasGrill(previousState => !previousState);

    const [hasStove, setHasStove] = useState(false);
    const toggleStove = () => setHasStove(previousState => !previousState);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.title}>
                    <View style={{ flex: 1 }}>
                        <Text>
                            <Button
                                onPress={() => navigation.openDrawer()}
                                title="="
                                color="black"
                                accessibilityLabel="Toggle navigation drawer"
                            />
                        </Text>
                    </View>
                    <View style={{ flex: 8, paddingRight: 10 }}>
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>User Info</Text>
                    </View>
                    <View
                        style={{ flex: 1, paddingRight: 10 }}>
                    </View>
                </View>
            </View>
            <View style={{ flex: 5 }}>
                <ScrollView>
                    {[['Air fryer', hasAirFryer, toggleAirFryer], ['Oven', hasOven, toggleOven], ['Refrigerator', hasRefrigerator, toggleRefrigerator], ['Grill', hasGrill, toggleGrill], ['Stove', hasStove, toggleStove]].map(item =>
                        <View style={{ flex: 1, padding: 30 }} key={item[0]}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>{item[0]}</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Switch
                                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={item[2]}
                                        value={item[1]}
                                    />
                                </View>
                            </View>

                        </View>
                    )}
                </ScrollView>
            </View>

        </View>
    )
}
export default Settings;
