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
	Link,
	Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import axios from 'axios';
import { format } from 'date-fns';

const STATUS_CONFIG = {
	Delivered: {
		color: 'success.main',
	},
	Pending: {
		color: 'error.main',
	},
	'In Progress': {
		color: 'warning.light',
	},
};

function ReceptionistData() {
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [formData, setFormData] = useState({
		project_name: '',
		description: '',
		contact_person_name: '',
		contact_person_email: '',
		contact_person_contact_no: '',
		referral_by: '',
	});
	const [errors, setErrors] = useState({});
	const [submitLoading, setSubmitLoading] = useState(false); // State for submit loading

	const handleGetReceptionist = () => {
		setLoading(true);
		axios
			.get('https://rtpl-back.onrender.com/project')
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
		const filtered = data.filter((item) => item.project_name.toLowerCase().includes(query));
		setFilteredData(filtered);
	};

	const handleDialogOpen = () => setDialogOpen(true);
	const handleDialogClose = () => {
		setDialogOpen(false);
		setFormData({
			project_name: '',
			description: '',
			contact_person_name: '',
			contact_person_email: '',
			contact_person_contact_no: '',
			referral_by: '',
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

		if (!formData.project_name) {
			newErrors.project_name = 'Project name is required';
			isValid = false;
		}
		if (!formData.description) {
			newErrors.description = 'Description is required';
			isValid = false;
		}
		if (!formData.contact_person_name) {
			newErrors.contact_person_name = 'Contact person name is required';
			isValid = false;
		}
		if (!formData.contact_person_email || !/\S+@\S+\.\S+/.test(formData.contact_person_email)) {
			newErrors.contact_person_email = 'Valid contact person email is required';
			isValid = false;
		}
		if (!formData.contact_person_contact_no) {
			newErrors.contact_person_contact_no = 'Contact person contact number is required';
			isValid = false;
		}
		if (!formData.referral_by) {
			newErrors.referral_by = 'Referral by field is required';
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
					.post('https://rtpl-back.onrender.com/project', {
						project_name: formData.project_name,
						description: formData.description,
						contact_person_name: formData.contact_person_name,
						contact_person_email: formData.contact_person_email,
						contact_person_contact_no: formData.contact_person_contact_no,
						referral_by: formData.referral_by,
						progress: 'Pending',
						taken_date: Date(),
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

	const formatDate = (date) => (date ? format(new Date(date), 'dd/MM/yyyy') : '');

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
							<TableCell>Project</TableCell>
							<TableCell>Total Meet</TableCell>
							<TableCell>Taken Date</TableCell>
							<TableCell>Start Date</TableCell>
							<TableCell>End Date</TableCell>
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
									<TableCell align="left" padding="none">
										<Link
											href="#!"
											variant="subtitle1"
											underline="hover"
											color="text.primary"
											sx={{
												display: 'block',
												'&:hover': {
													color: 'primary.main',
												},
											}}
										>
											{row.project_name}
										</Link>
										<Stack direction="row" alignItems="center" spacing={1}>
											<Box
												component="span"
												width={8}
												height={8}
												bgcolor={STATUS_CONFIG[row.progress]?.color || '#d3d3d3'}
												borderRadius="50%"
											/>
											<Typography variant="caption" color="text.tertiary">
												{row.progress}
											</Typography>
										</Stack>
									</TableCell>
									<TableCell>{row.all_meet.length}</TableCell>
									<TableCell>{formatDate(row.date)}</TableCell>
									<TableCell>{formatDate(row.start_date)}</TableCell>
									<TableCell>{formatDate(row.delivery_date)}</TableCell>
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
				<DialogTitle>New Project Entry</DialogTitle>
				<DialogContent style={{ paddingTop: '10px' }}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								name="project_name"
								label="Project Name"
								value={formData.project_name}
								onChange={handleFormChange}
								fullWidth
								required
								error={!!errors.project_name}
								helperText={errors.project_name}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								name="description"
								label="Description"
								value={formData.description}
								onChange={handleFormChange}
								fullWidth
								required
								error={!!errors.description}
								helperText={errors.description}
								multiline
								rows={4}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								name="contact_person_name"
								label="Contact Person Name"
								value={formData.contact_person_name}
								onChange={handleFormChange}
								fullWidth
								required
								error={!!errors.contact_person_name}
								helperText={errors.contact_person_name}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								name="contact_person_email"
								label="Contact Person Email"
								value={formData.contact_person_email}
								onChange={handleFormChange}
								fullWidth
								required
								error={!!errors.contact_person_email}
								helperText={errors.contact_person_email}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								name="contact_person_contact_no"
								label="Contact Person Contact Number"
								value={formData.contact_person_contact_no}
								onChange={handleFormChange}
								type="number"
								fullWidth
								required
								error={!!errors.contact_person_contact_no}
								helperText={errors.contact_person_contact_no}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								name="referral_by"
								label="Referral By"
								value={formData.referral_by}
								onChange={handleFormChange}
								fullWidth
								required
								error={!!errors.referral_by}
								helperText={errors.referral_by}
							/>
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
