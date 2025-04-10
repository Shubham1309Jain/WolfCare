import React from 'react';
import { Button, Input, Space, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

/**
 * React component for listing all hospitals
 * @extends React.Component
 */
class HospitalsList extends React.Component {
	/**
	 * Set initial state
	 * @param {Object} props Props for the component
	 */
	constructor (props) {
		super(props);
		this.state = {
			hospitals: props.hospitals || [],
			loading: false,
			columns: [
				{
					title: 'Name',
					dataIndex: 'name',
					key: 'name',
					...this.getColumnSearchProps('name')
				},
				{
					title: 'Address',
					dataIndex: 'addressline1',
					key: 'addressline1',
					...this.getColumnSearchProps('addressline1')
				},
				{
					title: 'Email',
					dataIndex: 'email',
					key: 'email'
				},
				{
					title: 'Phone number',
					dataIndex: 'phone',
					key: 'phone'
				}
			],
			searchedColumn: '',
			searchText: ''
		};
	}

	/**
	 * React lifecycle method to load all available hospitals
	 */
	componentDidMount() {
		this.handleSubmit();
	}

	/**
	 * Validate input values and call onGetHospitals API to get all hospitals
	 * @returns {Boolean} True if everything succeeds, false otherwise
	 */
	handleSubmit = async () => {
		if (Object.keys(this.props.parentProps).length > 0) {
			this.setState({
				loading: true
			});
			await this.props.parentProps.onGetHospitals();
			if (this.props.parentProps.getHospitalsApiStatus) {
				this.setState({
					loading: false,
					hospitals: this.props.parentProps.hospitals
				});
				return true;
			} else {
				this.setState({
					loading: false
				});
				alert(this.props.parentProps.getHospitalsApiMessage || 'Could not get list of hospitals, please try again.');
				return false;
			}
		}
	};

	/**
	 * Set state with user defined filter patterns
	 * @param {Array} selectedKeys List containing the selected key
	 * @param {Function} confirm Library function
	 * @param {String} dataIndex Column to match
	 */
	handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		this.setSearchText(selectedKeys[ 0 ]);
		this.setSearchedColumn(dataIndex);
	};

	/**
	 * Reset filter patterns in state
	 * @param {Function} clearFilters Library function
	 */
	handleReset = (clearFilters) => {
		clearFilters();
		this.setSearchText('');
	};

	/**
	 * Set column to search in state
	 * @param {String} col Column name
	 */
	setSearchedColumn = (col) => {
		this.setState({
			searchedColumn: col
		});
	};

	/**
	 * Set text to search in state
	 * @param {String} text Text to search
	 */
	setSearchText = (text) => {
		this.setState({
			searchText: text
		});
	};

	/**
	 * Provide functions for enabling column filtering
	 * @param {String} dataIndex Column to have filter enabled
	 */
	getColumnSearchProps = (dataIndex) => ({
		/**
		 * Return filter dropdown components
		 * @param {Function} setSelectedKeys Library function
		 * @param {Array} selectedKeys List of column filtered
		 * @param {Function} confirm Library function
		 * @param {Function} clearFilters Library function
		 */
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div
				style={ {
					padding: 8,
				} }
				onKeyDown={ (e) => e.stopPropagation() }
			>
				<Input
					placeholder={ `Search ${dataIndex}` }
					value={ selectedKeys[ 0 ] }
					onChange={ (e) => setSelectedKeys(e.target.value ? [ e.target.value ] : []) }
					onPressEnter={ () => this.handleSearch(selectedKeys, confirm, dataIndex) }
					style={ {
						marginBottom: 8,
						display: 'block',
					} }
				/>
				<Space>
					<Button
						type='primary'
						onClick={ () => this.handleSearch(selectedKeys, confirm, dataIndex) }
						icon={ <SearchOutlined /> }
						size='small'
						style={ {
							width: 90,
						} }
					>
						Search
					</Button>
					<Button
						onClick={ () => clearFilters && this.handleReset(clearFilters) }
						size='small'
						style={ {
							width: 90,
						} }
					>
						Reset
					</Button>
				</Space>
			</div>
		),
		/**
		 * Render filter icon for dropdown
		 * @param {Boolean} filtered Whether column is filtered or not
		 */
		filterIcon: (filtered) => (
			<SearchOutlined
				style={ {
					color: filtered ? '#1890ff' : undefined,
				} }
			/>
		),
		/**
		 * Event listener if filter is updated
		 * @param {String} value Value to match against
		 * @param {Object} record Record to match
		 */
		onFilter: (value, record) => record[ dataIndex ].toString().toLowerCase().includes(value.toLowerCase()),
		/**
		 * Is dropdown visible
		 * @param {Boolean} visible Whether dropdown is visible or not
		 */
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => this.state.searchInput.current?.select(), 100);
			}
		},
		/**
		 * Render filterted content
		 * @param {String} text Filtered text
		 */
		render: (text) =>
			this.state.searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={ {
						backgroundColor: '#ffc069',
						padding: 0,
					} }
					searchWords={ [ this.state.searchText ] }
					autoEscape
					textToHighlight={ text ? text.toString() : '' }
				/>
			) : (text),
	});

	/**
	 * Render hospitals list component
	 * @returns {React.Component} Form with register user related HTML tags
	 */
	render() {
		return (
			<section style={ { margin: '2% 2% 2% 2%' } }>
				<h2>Member hospitals</h2>
				<Table
					columns={ this.state.columns }
					dataSource={ this.state.hospitals }
					bordered={ true }
					showHeader
					scroll={ {
						y: 530
					} }
					pagination={ {
						position: [ 'bottomCenter' ],
						showQuickJumper: true
					} }
					loading={ this.state.loading }
					style={ { marginTop: '2%' } }
				>
				</Table>
			</section>
		);
	}
}

export default HospitalsList;
