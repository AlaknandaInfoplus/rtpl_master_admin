import { useEffect, useState } from 'react';
import {
	Button,
	Card,
	IconButton,
	Tooltip,
	TextField,
	InputAdornment,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Box,
	Typography,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	CardHeader,
	CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import axios from 'axios';

function ConferenceRoomData() {
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [formData, setFormData] = useState({
		room_name: '',
		room_address: '',
	});
	const [errors, setErrors] = useState({});
	const [submitLoading, setSubmitLoading] = useState(false); // State for submit loading

	const handleGetConferenceRoom = () => {
		setLoading(true);
		axios
			.get('https://rtpl-back.onrender.com/conferenceroom')
			.then((response) => {
				if (response.data.status === 'success') {
					setData(response.data.data);
					setFilteredData(response.data.data); // Initialize filtered data
				}
			})
			.catch((error) => {
				console.log('something wrong in fetch receptionist', error);
			})
			.finally(() => {
				setLoading(false); // End loading
			});
	};

	useEffect(() => {
		if (!loading) {
			if (data.length === 0) {
				handleGetConferenceRoom();
			}
		}
	}, [loading]);

	const handleChange = (e) => {
		const query = e.target.value.toLowerCase();
		const filtered = data.filter((item) => item.room_name.toLowerCase().includes(query));
		setFilteredData(filtered);
	};

	const handleDialogOpen = () => setDialogOpen(true);
	const handleDialogClose = () => {
		setDialogOpen(false);
		setFormData({
			room_name: '',
			room_address: '',
		});
		setErrors({});
	};

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const validateForm = () => {
		let isValid = true;
		const newErrors = {};

		if (!formData.room_name) {
			newErrors.room_name = 'Room name is required';
			isValid = false;
		}
		if (!formData.room_address) {
			newErrors.room_address = 'Room address is required';
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleFormSubmit = async () => {
		if (validateForm()) {
			setSubmitLoading(true); // Show loading spinner
			try {
				axios
					.post('https://rtpl-back.onrender.com/conferenceroom', {
						room_name: formData.room_name,
						room_address: formData.room_address,
					})
					.then((response) => {
						if (response.data.status === 'success') {
							handleGetConferenceRoom();
						}
					})
					.catch((error) => {
						console.log(error);
					})
					.finally(() => {
						setSubmitLoading(false); // Hide loading spinner
						handleDialogClose(); // Close dialog after submission
					});
			} catch (error) {
				console.error('Error uploading files:', error);
				setSubmitLoading(false); // Hide loading spinner in case of error
			}
		}
	};

	return (
		<Card>
			{/* Your CardHeader Component here */}
			<CardHeader
				sx={{ p: 1, display: 'flex', justifyContent: 'space-between', width: '100%' }}
				title={
					<Box sx={{ display: 'flex', alignItems: 'center', width: '500px' }}>
						<TextField
							onChange={handleChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								),
							}}
							placeholder="Search by name"
							variant="outlined"
							size="small"
							sx={{ flexGrow: 1 }}
						/>
						<Button variant="contained" endIcon={<AddIcon />} sx={{ ml: 2 }} onClick={handleDialogOpen}>
							New entry
						</Button>
					</Box>
				}
			/>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Id</TableCell>
							<TableCell>Room Name</TableCell>
							<TableCell>Room Address</TableCell>
							<TableCell align="right" />
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredData.length === 0 ? (
							<TableRow>
								<TableCell colSpan={6} align="center">
									<Typography>No matching records found</Typography>
								</TableCell>
							</TableRow>
						) : (
							filteredData.map((row, index) => (
								<TableRow hover key={row.id}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{row.room_name}</TableCell>
									<TableCell>{row.room_address}</TableCell>
									<TableCell align="right">
										<Tooltip title="View" arrow>
											<IconButton size="small">
												<VisibilityOutlinedIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="Edit" arrow>
											<IconButton size="small">
												<ModeEditOutlineOutlinedIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="Delete" arrow>
											<IconButton size="small">
												<DeleteOutlineOutlinedIcon />
											</IconButton>
										</Tooltip>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="md">
				<DialogTitle>New Conference Room</DialogTitle>
				<DialogContent style={{ paddingTop: '10px' }}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								name="room_name"
								label="Room Name"
								value={formData.room_name}
								onChange={handleFormChange}
								fullWidth
								required
								error={!!errors.room_name}
								helperText={errors.room_name}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								name="room_address"
								label="Room Address"
								value={formData.room_address}
								onChange={handleFormChange}
								fullWidth
								required
								error={!!errors.room_address}
								helperText={errors.room_address}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose}>Cancel</Button>
					<Button onClick={handleFormSubmit} color="primary" disabled={submitLoading}>
						{submitLoading ? <CircularProgress size={24} /> : 'Submit'}
					</Button>
				</DialogActions>
			</Dialog>
		</Card>
	);
}

export default ConferenceRoomData;
