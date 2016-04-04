import React, {
	Component,
	StyleSheet,
	View,
	Text,
	ListView,
	TextInput,
	TouchableHighlight } from 'react-native';
import api from '../utils/api.js';
import Separator from './helpers/Separator.js';
import Badge from './Badge.js';

export default class Notes extends Component {
	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: this.ds.cloneWithRows(this.props.notes),
			note: '',
			error: ''
		};
	}
	handleChange(e) {
		this.setState({
			note: e.nativeEvent.text
		});
	}
	handleSubmit() {
		let note = this.state.note;
		this.setState({ note: '' });
		api.addNote(this.props.userInfo.login, note)
			.then(data => {
				api.getNotes(this.props.userInfo.login)
				.then(data => {
					this.setState({
						dataSource: this.ds.cloneWithRows(data)
					})
				});
			})
			.catch(error => {
				this.setState({ error }); // same as: this.setState({error: error});
		});	
	}
	renderRow(rowData) {
		return (
			<View>
				<View style={styles.container}>
					<Text> { rowData }</Text>
				</View>
				<Separator />
			</View>
		);
	}
 	footer() {
		return (
			<View style={styles.footContainer}>
				<TextInput
					style={styles.searchInput}
					value={this.state.note}
					onChange={this.handleChange.bind(this)}
					placeholder="New Note" />
				<TouchableHighlight
					style={styles.button}
					onPress={this.handleSubmit.bind(this)}
					underlayColor="#88d4f5" >
					<Text style={styles.buttonText}>Submit</Text>
				</TouchableHighlight>
			</View>
		);
	}
	render() {
		return (
			<View style={styles.container}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderRow}
					renderHeader={() => <Badge userInfo={this.props.userInfo} />} />
				{this.footer()}
			</View>
		);
	}
}

Notes.propTypes = {
	userInfo: React.PropTypes.object.isRequired,
	notes: React.PropTypes.object.isRequired
};

let styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	buttonText: {
		fontSize: 18,
		color: '#ffffff'
	},
	button: {
		height: 60,
		backgroundColor: '#48bbec',
		flex: 3,
		alignItems: 'center',
		justifyContent: 'center'
	},
	searchInput: {
		height: 60,
		padding: 10,
		fontSize: 18,
		color: '#111',
		flex: 10
	},
	rowContainer: {
		padding: 10
	},
	footerContainer: {
		backgroundColor: '#e3e3e3',
		alignItems: 'center',
		flexDirection: 'row'
	}
});


