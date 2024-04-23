import { View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const Filters = ({ sectionSelection, selections, sections}) => {
    return (
        <View style={styles.filtersContainer}>
            {sections.map((section, index) => (
            <TouchableOpacity
                key={index}
                onPress={() => {
                    sectionSelection(index);
                }}
                style={{
                    flex: 1 / sections.length,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 12,
                    borderRadius: 6,
                }}
                >

                <View>
                    <Text
                        style={{
                            color: selections[index] ? '#EDEFEE' : '#495E57'
                        }}
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </Text>
                </View>
            </TouchableOpacity>
            ))}
        </View>
    )
}


const styles = StyleSheet.create({
    filtersContainer: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'cetner',
        marginBottom: 14,
        paddingLeft: 12,
    },
})

export default Filters;