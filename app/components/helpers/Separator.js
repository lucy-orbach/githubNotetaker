import React, {
	Component,
	StyleSheet,
	View
} from 'react-native';

export default class Separator extends Component {
	render() {
		return (
			<View style={styles.separator} />
		);
	}
}

let styles = StyleSheet.create({
	separator: {
		height: 1,
		backgroundColor: '#e4e4e4',
		flex: 1,
		marginLeft: 15
	}
});

