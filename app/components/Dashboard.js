import React, {
	Component,
	View,
	Text,
	Image,
	TouchableHighlight,
	StyleSheet
} from 'react-native';
import Profile from './Profile.js';
import Repos from './Repos.js';
import Notes from './Notes.js';
import api from '../utils/api';

export default class Dashboard extends Component {
	goToProfile() {
		this.props.navigator.push({
			component: Profile,
			title: 'Profile Page',
			passProps: {userInfo: this.props.userInfo}
		});
	}
	goToRepos() {
		api.getRepos(this.props.userInfo.login)
			.then((resp) => {
				this.props.navigator.push({
					component: Repos,
					title: 'Repos',
					passProps: {
					userInfo: this.props.userInfo,
					repos: resp }
				});
		});
		
	}
	goToNotes() {
		api.getNotes(this.props.userInfo.loging)
			.then(resp => {
				resp = resp || {};
				this.props.navigator.push({
					component: Notes,
					title: 'Notes',
					passProps: {
						userInfo: this.props.userInfo,
						notes: resp}
				})
		});
	}
	makeBgd(btn) {
		let btnStyle = {
			flexDirection: 'row',
			alignSelf: 'stretch',
			justifyContent: 'center',
			flex: 1
		}
		if (btn === 0) {
			btnStyle.backgroundColor = '#f4733d';
		} else if (btn === 1) {
			btnStyle.backgroundColor = '#2cc0b3';
		} else {
			btnStyle.backgroundColor = '#38595e';
		}
		return btnStyle;
	}
	render() {
		return (
			<View style={styles.container}>
				<Image
					source={{uri: this.props.userInfo.avatar_url}}
					style={styles.image}/>
				<TouchableHighlight
					style={this.makeBgd(0)}
					onPress={this.goToProfile.bind(this)}
					underlayColor="#fff" >
					<Text style={styles.buttonText}>View Profile</Text>
				</TouchableHighlight>
				<TouchableHighlight
				style={this.makeBgd(1)}
					onPress={this.goToRepos.bind(this)}
					underlayColor="#fff" >
					<Text style={styles.buttonText}>View Repos</Text>
				</TouchableHighlight>
				<TouchableHighlight
				style={this.makeBgd(2)}
					onPress={this.goToNotes.bind(this)}
					underlayColor="#fff" >
					<Text style={styles.buttonText}>View Notes</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

Dashboard.propTypes = {
	userInfo: React.PropTypes.object.isRequired
};

let styles = StyleSheet.create({
	container: {
		marginTop: 65,
		flex: 1
	},
	image: {
		height: 350,
	},
	buttonText: {
		fontSize: 24,
		color: '#fff',
		alignSelf: 'center'
	}
});

