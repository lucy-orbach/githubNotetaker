import React, {
	Component,
	StyleSheet,
	ScrollView,
	View,
	Text
} from 'react-native';
import Badge from './Badge.js';
import Separator from './helpers/Separator.js';

export default class Profile extends Component {
	render() {
		let { userInfo } = this.props;
		let topicArr = ['company', 'location', 'followers', 'following', 'email', 'bio', 'public_repos'];
		let list =  topicArr.map((item, i) => {
			let title = item === 'public_repos'
				? item.replace('_', ' ')
				: item;
			if (title[0]) {
				title = title[0].toUpperCase() + item.slice(1);
			}
			if (!userInfo[item]) {
				return <View key={i} />
			} else {
				return (
					<View key={i}>
						<View style={styles.rowContainer}>
							<Text style={styles.rowTitle}>{title}</Text>
							<Text style={styles.rowContent}>{userInfo[item]}</Text>
						</View>
						<Separator />
					</View>
				)
			}
		});
		return (
			<ScrollView style={styles.container}>
				<Badge userInfo={userInfo} />
				{ list }
			</ScrollView>
		);
	}
}

Profile.propTypes = {
	userInfo: React.PropTypes.object.isRequired
};

let styles = StyleSheet.create({
	container: {
		flex: 1
	},
	buttonText: {
		alignSelf: 'center',
		fontSize: 16,
		color: '#ffffff'
	},
	rowTitle: {
		fontSize: 16,
		color: '#48bbec',
		padding: 10
	},
	rowContent: {
		fontSize: 19,
		padding: 10
	},
});
