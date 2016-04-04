import React, {
	Component,
	StyleSheet,
	View,
	WebView
} from 'react-native';

export default class Web extends Component {
	render() {
		return (
			<View style={styles.container}>
				<WebView source={{uri: this.props.url}}/>
			</View>
		);
	}
}

Web.propTypes = {
	url: React.PropTypes.string.isRequired
};

let styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f6f6ef',
		flexDirection: 'column'
	}
});