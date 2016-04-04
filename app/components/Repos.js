import React, {
	Component,
	StyleSheet,
	ScrollView,
	View,
	Text,
	TouchableHighlight
} from 'react-native';
import Badge from './Badge.js';
import Web from './helpers/Web.js';
import Separator from './helpers/Separator.js';

export default class Repos extends Component {
	openPage(url) {
		this.props.navigator.push({
			component:  Web,
			title: 'Web View',
			passProps: { url: url }
		});
	}
	render() {
		let { userInfo, repos } = this.props;
		let list = repos.map((repo, key) => {
			let desc = repo.description
			?	<Text style={styles.description}>{repo.description}</Text>
			: <View />
			return (
				<View key={key} style={styles.rowContainer}>
					<TouchableHighlight
						onPress={this.openPage.bind(this, repo.html_url)}
						underlayColor='transparent'>
						<Text style={styles.name}>{repo.name}</Text>
					</TouchableHighlight>
					<Text style={styles.stars}> Stars: {repo.stargazers_count}</Text>
					{desc}
					<Separator />
				</View>
			);
		});
		return (
			<ScrollView style={styles.container}>
				<Badge userInfo={userInfo} />
				{ list }
			</ScrollView>
		);
	}
}

Repos.propTypes = {
	userInfo: React.PropTypes.object.isRequired,
	repos: React.PropTypes.array.isRequired
};

let styles = StyleSheet.create({
	container: {
		flex: 1
	},
	rowContainer: {
		padding: 10
	},
	name: {
		fontSize: 16,
		color: '#48bbec',
		paddingBottom: 5
	},
	stars: {
		fontSize: 14,
		color: '#48bbec',
		paddingBottom: 5
	},
	description: {
		fontSize: 14,
		paddingBottom: 5
	}
});
