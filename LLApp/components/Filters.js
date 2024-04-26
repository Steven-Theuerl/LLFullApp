import { View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const Filters = ({ onChange, selections, sections}) => {
    return (
        <View style={styles.filtersContainer}>
            {sections.map((section, index) => (
            <TouchableOpacity
                key={index}
                onPress={() => {
                    onChange(index);
                }}
                style={{
                    flex: 1 / sections.length,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 12,
                    borderRadius: 6,
                    marginRight: 12,
                    backgroundColor: selections[index] ? '#EE9972' : '#FBDABB'
                }}
                >

                <View>
                    <Text
                        style={{
                            color: selections[index] ? '#FBDABB' : '#EE9972'
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
        backgroundColor: 'fff',
        flexDirection: 'row',
        alignItems: 'cetner',
        marginBottom: 14,
        paddingLeft: 12,
    },
});

export default Filters;