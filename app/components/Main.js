import React, {
	Component,
	View,
	Text,
	TextInput,
	TouchableHighlight,
	ActivityIndicatorIOS,
	StyleSheet
} from 'react-native';
import api from '../utils/api';
import Dashboard from './Dashboard.js';

export default class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			isLoading: false,
			error: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(e) {
		this.setState({
			username: e.nativeEvent.text
		});
	}
	handleSubmit() {
		let { username } = this.state;
		this.setState({ isLoading: true });
		api.getBio(username)
			.then(resp => {
				if (resp.message === 'Not Found') {
					this.setState({
						error: 'User not found',
						isLoading: false
					});
				} else {
					this.props.navigator.push({
						component: Dashboard,
						title: resp.name || 'Select an Option',
						passProps: {userInfo: resp}
					});
				}
			});
		this.setState({
			username: '',
			isLoading: false,
			error: false
		});
	}
	render() {
		let showErr = ( this.state.error
			? <Text>{this.state.error}</Text>
			: <View></View>);
		return (
			<View style={styles.mainContainer}>
				<Text style={styles.title}>Enter Github User</Text>
				<TextInput
					style={styles.searchInput}
					value={this.state.username}
					onChange={this.handleChange} />
				<TouchableHighlight
					style={styles.button}
					onPress={this.handleSubmit}
					underlayColor="white">
						<Text style={styles.buttonText}>SEARCH</Text>
				</TouchableHighlight>
				<ActivityIndicatorIOS
					animating={this.state.isLoading}
					color="#111111"
					size="large" />
				{ showErr }
			</View>
		);
	}
}

let styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		padding: 30,
		marginTop: 65,
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: '#48BBEC'
	},
	title: {
		marginBottom: 20,
		fontSize: 25,
		textAlign: 'center',
		color: '#fff'
	},
	searchInput: {
		height: 50,
		padding: 4,
		marginRight: 5,
		fontSize: 23,
		borderWidth: 1,
		borderColor: 'white',
		borderRadius: 8,
		color: 'white'
	},
	buttonText: {
		fontSize: 18,
		color: '#111',
		alignSelf: 'center'
	},
	button: {
		height: 45,
		flexDirection: 'row',
		backgroundColor: '#fff',
		borderColor: '#fff',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		marginTop: 10,
		alignSelf: 'stretch',
		justifyContent: 'center'
	}
});

