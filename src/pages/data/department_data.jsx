import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import CardHeader from '@/components/cardHeader'; // Ensure this path is correct
import { Box } from '@mui/material';

function DepartmentData() {
	const [data, setData] = useState({
		departments: [], // Initialize with an empty array
	});

	const [loading, setLoading] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [newDepartment, setNewDepartment] = useState('');
	const [errors, setErrors] = useState('');

	const handleGetDropDownData = () => {
		setLoading(true);
		axios
			.get('https://rtpl-back.onrender.com/dropDown/getDropDown')
			.then((response) => {
				if (response.data.status === 'done') {
					setData(response.data.data); // Set the response data
				}
			})
			.catch((error) => {
				console.log('Error fetching dropdown data:', error);
			})
			.finally(() => {
				setLoading(false); // End loading
			});
	};

	useEffect(() => {
		if (!loading) {
			if (data.departments.length === 0) {
				handleGetDropDownData();
			}
		}
	}, [loading, data.departments.length]);

	const handleDialogOpen = () => setDialogOpen(true);
	const handleDialogClose = () => {
		setDialogOpen(false);
		setNewDepartment('');
		setErrors('');
	};

	const handleInputChange = (e) => {
		setNewDepartment(e.target.value);
	};

	const handleFormSubmit = () => {
		if (!newDepartment.trim()) {
			setErrors('department cannot be empty');
			return;
		}

		// Update the list of departments
		setData((prevData) => {
			const updateddepartments = [...prevData.departments, newDepartment.trim()];
			console.log('list_of_strings:', updateddepartments); // Print the entire list to the console
			axios
				.post('https://rtpl-back.onrender.com/dropDown/postDropDown', {
					departments: updateddepartments,
				})
				.then((response) => {
					if (response.data.status === 'done') {
						handleGetDropDownData();
					}
				})
				.catch((error) => {
					console.log(error);
				});
			return { ...prevData, departments: updateddepartments };
		});

		handleDialogClose();
	};

	return (
		<Card type="none">
			<CardHeader
				title="Department Data"
				size="medium"
				sx={{
					p: 3,
					pb: 0,
				}}
			>
				<Button variant="contained" sx={{ ml: 2 }} onClick={handleDialogOpen}>
					New Entry
				</Button>
			</CardHeader>
			<Box
				sx={{
					maxHeight: '300px', // Adjust the height as needed
					overflowY: 'auto', // Enable vertical scrolling
					p: 1,
					padding: 0,
					margin: 0,
				}}
			>
				<List
					sx={{
						'& > li:not(:last-child)': {
							borderBottom: 1,
							borderColor: (theme) => theme.palette.border,
						},
					}}
				>
					{data.departments.map((department, index) => (
						<UserListItem key={index} department={department} />
					))}
				</List>
			</Box>

			<Dialog open={dialogOpen} onClose={handleDialogClose}>
				<DialogTitle>Add New Department</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="department"
						label="New Department"
						type="text"
						fullWidth
						variant="outlined"
						value={newDepartment}
						onChange={handleInputChange}
						error={!!errors}
						helperText={errors}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose}>Cancel</Button>
					<Button onClick={handleFormSubmit} color="primary">
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</Card>
	);
}

function UserListItem({ department }) {
	return (
		<ListItem disablePadding alignItems="flex-start">
			<ListItemButton>
				<span
					style={{
						width: '100%',
					}}
				>
					<Typography variant="subtitle2" fontSize={16}>
						{department}
					</Typography>
				</span>
			</ListItemButton>
		</ListItem>
	);
}

export default DepartmentData;
