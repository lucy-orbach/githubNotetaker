import React, {
	Component,
	StyleSheet,
	View,
	Image,
	Text
} from 'react-native';

export default class Badge extends Component {
	render() {
		let { userInfo } = this.props;
		console.log(userInfo.avatar_url);
		return (
			<View style={styles.container}>
				<Image
					source={{uri: userInfo.avatar_url}}
					style={styles.image} />
				<Text style={styles.name}>{userInfo.name}</Text>
				<Text style={styles.handle}>{userInfo.login}</Text>
			</View>
		);
	}
}

Badge.propTypes = {
	userInfo: React.PropTypes.object.isRequired
};

let styles = StyleSheet.create({
	container: {
		backgroundColor: '#48bbec',
		paddingBottom: 10
	},
	name: {
		alignSelf: 'center',
		fontSize: 21,
		marginTop: 10,
		marginBottom: 5,
		color: 'red'
	},
	handle: {
		alignSelf: 'center',
		fontSize: 16,
		color: 'yellow'
	},
	image: {
		height: 125,
		width: 125,
		borderRadius: 65,
		marginTop: 10,
		alignSelf: 'center'
	}
});