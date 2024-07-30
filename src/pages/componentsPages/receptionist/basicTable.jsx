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
		first_name: '',
		last_name: '',
		email_address: '',
		contact_number: '',
		dob: '',
		anniversary_date: '',
		company_id: '',
		aadhar_number: '',
		aadhar_card: null,
		profile_photo: null,
	});
	const [aadharCardPreview, setAadharCardPreview] = useState('');
	const [profilePreview, setProfilePhotoPreview] = useState('');
	const [errors, setErrors] = useState({});
	const [submitLoading, setSubmitLoading] = useState(false); // State for submit loading

	const handleGetReceptionist = () => {
		setLoading(true);
		axios
			.get('https://rtpl-back.onrender.com/receptionists')
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
				handleGetReceptionist();
			}
		}
	}, [loading]);

	const handleChange = (e) => {
		const query = e.target.value.toLowerCase();
		const filtered = data.filter((item) => item.first_name.toLowerCase().includes(query));
		setFilteredData(filtered);
	};

	const handleDialogOpen = () => setDialogOpen(true);
	const handleDialogClose = () => {
		setDialogOpen(false);
		setFormData({
			first_name: '',
			last_name: '',
			email_address: '',
			contact_number: '',
			dob: '',
			anniversary_date: '',
			company_id: '',
			aadhar_number: '',
			aadhar_card: null,
			profile_photo: null,
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

		if (!formData.first_name) {
			newErrors.first_name = 'First name is required';
			isValid = false;
		}
		if (!formData.last_name) {
			newErrors.last_name = 'Last name is required';
			isValid = false;
		}
		if (!formData.email_address || !/\S+@\S+\.\S+/.test(formData.email_address)) {
			newErrors.email_address = 'Valid email address is required';
			isValid = false;
		}
		if (!formData.contact_number) {
			newErrors.contact_number = 'Contact number is required';
			isValid = false;
		}
		if (!formData.dob) {
			newErrors.dob = 'Date of Birth is required';
			isValid = false;
		}
		if (!formData.anniversary_date) {
			newErrors.anniversary_date = 'Anniversary Date is required';
			isValid = false;
		}
		if (!formData.company_id) {
			newErrors.company_id = 'Company ID is required';
			isValid = false;
		}
		if (!formData.aadhar_number) {
			newErrors.aadhar_number = 'Aadhar Number is required';
			isValid = false;
		}
		if (!formData.aadhar_card) {
			newErrors.aadhar_card = 'Aadhar card is required';
			isValid = false;
		}
		if (!formData.profile_photo) {
			newErrors.profile_photo = 'Profile photo is required';
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleFileChange = (e) => {
		const { name, files } = e.target;
		const file = files[0];
		const uniqueFileName = `${Date.now()}-${file.name}`; // Generating unique file name
		if (name === 'aadhar_card') {
			if (file && file.type !== 'application/pdf') {
				setErrors((prevErrors) => ({ ...prevErrors, aadhar_card: 'Aadhar card must be a PDF' }));
				return;
			}
			setFormData({
				...formData,
				aadhar_card: { file, uniqueFileName }, // Storing file along with unique name
			});
			setAadharCardPreview(URL.createObjectURL(file));
			setErrors((prevErrors) => ({ ...prevErrors, aadhar_card: '' }));
		} else if (name === 'profile_photo') {
			if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
				setErrors((prevErrors) => ({ ...prevErrors, profile_photo: 'Profile photo must be JPG or PNG' }));
				return;
			}
			setFormData({
				...formData,
				profile_photo: { file, uniqueFileName }, // Storing file along with unique name
			});
			setProfilePhotoPreview(URL.createObjectURL(file));
			setErrors((prevErrors) => ({ ...prevErrors, profile_photo: '' }));
		}
	};

	const handleFormSubmit = async () => {
		if (validateForm()) {
			setSubmitLoading(true); // Show loading spinner
			try {
				const responseAadhar = await axios.post(
					'https://rtpl-back.onrender.com/file/upload',
					formData.aadhar_card,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					},
				);
				const responseProfilePhoto = await axios.post(
					'https://rtpl-back.onrender.com/file/upload',
					formData.profile_photo,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					},
				);
				const aadharCardUrl = responseAadhar.data;
				const profilePhotoUrl = responseProfilePhoto.data;
				console.log('photo done');
				axios
					.post('https://rtpl-back.onrender.com/receptionists', {
						first_name: formData.first_name,
						last_name: formData.last_name,
						email_address: formData.email_address,
						contact_number: formData.contact_number,
						dob: formData.dob,
						anniversary_date: formData.anniversary_date,
						company_id: '6699fc3ed4be6988d03464e9',
						aadhar_number: formData.aadhar_number,
						aadhar_card: aadharCardUrl,
						profile_photo: profilePhotoUrl,
					})
					.then((response) => {
						if (response.data.status === 'success') {
							handleGetReceptionist();
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
							<TableCell>First Name</TableCell>
							<TableCell>Last Name</TableCell>
							<TableCell>Email Address</TableCell>
							<TableCell>Contact Number</TableCell>
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
									<TableCell>{row.first_name}</TableCell>
									<TableCell>{row.last_name}</TableCell>
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
								name="first_name"
								label="First Name"
								value={formData.first_name}
								onChange={handleFormChange}
								fullWidth
								required
								error={!!errors.first_name}
								helperText={errors.first_name}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								name="last_name"
								label="Last Name"
								value={formData.last_name}
								onChange={handleFormChange}
								fullWidth
								required
								error={!!errors.last_name}
								helperText={errors.last_name}
							/>
						</Grid>
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
						<Grid item xs={6}>
							<TextField
								name="dob"
								label="Date of Birth"
								type="date"
								value={formData.dob}
								onChange={handleFormChange}
								fullWidth
								required
								error={!!errors.dob}
								helperText={errors.dob}
								InputLabelProps={{ shrink: true }}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								name="anniversary_date"
								label="Anniversary Date"
								type="date"
								value={formData.anniversary_date}
								onChange={handleFormChange}
								fullWidth
								required
								error={!!errors.anniversary_date}
								helperText={errors.anniversary_date}
								InputLabelProps={{ shrink: true }}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								name="company_id"
								label="Company ID"
								value={formData.company_id}
								onChange={handleFormChange}
								fullWidth
								required
								error={!!errors.company_id}
								helperText={errors.company_id}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								name="aadhar_number"
								label="Aadhar Number"
								value={formData.aadhar_number}
								onChange={handleFormChange}
								fullWidth
								required
								error={!!errors.aadhar_number}
								helperText={errors.aadhar_number}
							/>
						</Grid>
						<Grid item xs={6}>
							<FormControl fullWidth error={!!errors.aadhar_card}>
								<FormLabel>Aadhar Card</FormLabel>
								<input type="file" name="aadhar_card" accept=".pdf" onChange={handleFileChange} />
								<FormHelperText>{errors.aadhar_card}</FormHelperText>
								{aadharCardPreview && (
									<a href={aadharCardPreview} target="_blank" rel="noopener noreferrer">
										View Aadhar Card
									</a>
								)}
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<FormControl fullWidth error={!!errors.profile_photo}>
								<FormLabel>Profile Photo</FormLabel>
								<input
									type="file"
									name="profile_photo"
									accept="image/jpeg, image/png"
									onChange={handleFileChange}
								/>
								<FormHelperText>{errors.profile_photo}</FormHelperText>
								{profilePreview && <img src={profilePreview} alt="Profile Preview" width="100" />}
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
