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
	FormControl,
	FormLabel,
	FormHelperText,
	CardHeader,
	CircularProgress,
	Select,
	MenuItem,
	Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import axios from 'axios';

function ReceptionistData() {
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [formData, setFormData] = useState({
		contact_number: '',
		email_address: '',
		is_all_permission: false,
		have_an_access: [],
	});
	const [errors, setErrors] = useState({});
	const [submitLoading, setSubmitLoading] = useState(false); // State for submit loading

	const accessOptions = ['Dashboard', 'Members', 'Meetings', 'Projects', 'Conference rooms', 'Data']; // Replace these with your actual options

	const handleGetAdmin = () => {
		setLoading(true);
		axios
			.get('https://rtpl-back.onrender.com/admin')
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
				handleGetAdmin();
			}
		}
	}, [loading]);

	const handleChange = (e) => {
		const query = e.target.value.toLowerCase();
		const filtered = data.filter((item) => item.email_address.toLowerCase().includes(query));
		setFilteredData(filtered);
	};

	const handleDialogOpen = () => setDialogOpen(true);
	const handleDialogClose = () => {
		setDialogOpen(false);
		setFormData({
			contact_number: '',
			email_address: '',
			is_all_permission: false,
			have_an_access: [],
		});
		setErrors({});
	};

	const handleFormChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	const handleAccessChange = (event) => {
		setFormData({
			...formData,
			have_an_access: event.target.value,
		});
	};

	const validateForm = () => {
		let isValid = true;
		const newErrors = {};

		if (!formData.email_address || !/\S+@\S+\.\S+/.test(formData.email_address)) {
			newErrors.email_address = 'Valid email address is required';
			isValid = false;
		}
		if (!formData.contact_number) {
			newErrors.contact_number = 'Contact number is required';
			isValid = false;
		}

		if (!formData.have_an_access) {
			newErrors.contact_number = 'Alteast one permission needed';
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
					.post('https://rtpl-back.onrender.com/admin', formData)
					.then((response) => {
						if (response.data.status === 'success') {
							handleGetAdmin();
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
				console.error('Error submitting form:', error);
				setSubmitLoading(false); // Hide loading spinner in case of error
			}
		}
	};

	return (
		<Card>
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
							<TableCell>Email Address</TableCell>
							<TableCell>Contact Number</TableCell>
							<TableCell align="right" />
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredData.length === 0 ? (
							<TableRow>
								<TableCell colSpan={4} align="center">
									<Typography>No matching records found</Typography>
								</TableCell>
							</TableRow>
						) : (
							filteredData.map((row, index) => (
								<TableRow hover key={row.id}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{row.email_address}</TableCell>
									<TableCell>{row.contact_number}</TableCell>
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
			<Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="md">
				<DialogTitle>Receptionist Entry</DialogTitle>
				<DialogContent style={{ paddingTop: '10px' }}>
					<Grid container spacing={3}>
						<Grid item xs={6}>
							<TextField
								name="email_address"
								label="Email Address"
								value={formData.email_address}
								onChange={handleFormChange}
								fullWidth
								required
								error={!!errors.email_address}
								helperText={errors.email_address}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								name="contact_number"
								label="Contact Number"
								value={formData.contact_number}
								onChange={handleFormChange}
								fullWidth
								required
								error={!!errors.contact_number}
								helperText={errors.contact_number}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth>
								<FormLabel>All Permissions</FormLabel>
								<input
									type="checkbox"
									name="is_all_permission"
									checked={formData.is_all_permission}
									onChange={handleFormChange}
								/>
								<FormHelperText>{errors.is_all_permission}</FormHelperText>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth>
								<FormLabel>Access Rights</FormLabel>
								<Select
									multiple
									value={formData.have_an_access}
									onChange={handleAccessChange}
									renderValue={(selected) => (
										<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
											{selected.map((value) => (
												<Chip key={value} label={value} />
											))}
										</Box>
									)}
								>
									{accessOptions.map((option) => (
										<MenuItem key={option} value={option}>
											{option}
										</MenuItem>
									))}
								</Select>
								<FormHelperText>{errors.have_an_access}</FormHelperText>
							</FormControl>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose}>Cancel</Button>
					<Button
						onClick={handleFormSubmit}
						color="primary"
						disabled={submitLoading} // Disable button while loading
					>
						{submitLoading ? <CircularProgress size={24} /> : 'Submit'}
					</Button>
				</DialogActions>
			</Dialog>
		</Card>
	);
}

export default ReceptionistData;
