import { useEffect, useState } from 'react';
import {
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
	TablePagination,
	Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';

import axios from 'axios';
import CardHeader from '@/components/cardHeader';

function TablesElements() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await axios.get('https://rtpl-back.onrender.com/employee');
				if (response.data.status === 'success') {
					setData(response.data.data);
				}
			} catch (error) {
				console.error('Something went wrong in fetching employees', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) return <p>Loading...</p>;

	return (
		<>
			<EmployeeRequestTable data={data} />
			<EmployeeData data={data} />
		</>
	);
}

function EmployeeRequestTable({ data }) {
	const [filteredData, setFilteredData] = useState(data);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		const query = searchQuery.toLowerCase();
		const filtered = data.filter((item) => {
			const queryLower = query.toLowerCase();
			const isAcceptFalse = item.is_accept === false; // Assuming is_accept is a boolean
			return (
				isAcceptFalse &&
				(item.first_name.toLowerCase().includes(queryLower) ||
					item.last_name.toLowerCase().includes(queryLower) ||
					item.employee_code.toLowerCase().includes(queryLower))
			);
		});
		setFilteredData(filtered);
		setPage(0); // Reset page to 0 when filtering
	}, [searchQuery, data]);

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0); // Reset page to 0 when changing rows per page
	};

	const handleEditClick = (id) => {
		const ID = `${id._id}`;
		console.log('id', ID);
		console.log('Edit clicked for:', id);
		axios
			.put(`https://rtpl-back.onrender.com/employee/${ID}`, {
				is_accept: true,
			})
			.then((response) => {
				if (response.data.status === 'success') {
					// handleGet();
					window.location.reload();
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				// setSubmitLoading(false); // Hide loading spinner
				// handleDialogClose(); // Close dialog after submission
			});
	};

	const handleDeleteClick = (id) => {
		console.log('Delete clicked for:', id);
	};

	const handleViewClick = (id) => {
		console.log('View clicked for:', id);
	};

	const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

	return (
		<Card>
			<CardHeader
				sx={{ p: 0, display: 'flex', justifyContent: 'space-between', width: '100%' }}
				title={
					<Box sx={{ display: 'flex', alignItems: 'center', width: '500px' }}>
						<TextField
							value={searchQuery}
							onChange={handleSearchChange}
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
							<TableCell>Employee Code</TableCell>
							<TableCell>Email Id</TableCell>
							<TableCell>Contact No</TableCell>
							<TableCell align="right" />
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredData.length === 0 ? (
							<TableRow>
								<TableCell colSpan={7} align="center">
									<Typography>No matching records found</Typography>
								</TableCell>
							</TableRow>
						) : (
							paginatedData.map((row) => (
								<TableRow hover key={row.id}>
									<TableCell>{row.id}</TableCell>
									<TableCell>{row.first_name}</TableCell>
									<TableCell>{row.last_name}</TableCell>
									<TableCell>{row.employee_code}</TableCell>
									<TableCell>{row.email_address}</TableCell>
									<TableCell>{row.contact_number}</TableCell>
									<TableCell align="right">
										<Tooltip title="View" arrow>
											<IconButton size="small" onClick={() => handleViewClick(row)}>
												<VisibilityOutlinedIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="Accept" arrow>
											<IconButton
												color="warning"
												size="small"
												onClick={() => handleEditClick(row)}
											>
												<PersonAddAlt1OutlinedIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="Delete" arrow>
											<IconButton
												color="error"
												size="small"
												onClick={() => handleDeleteClick(row)}
											>
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
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={filteredData.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handlePageChange}
				onRowsPerPageChange={handleRowsPerPageChange}
				labelRowsPerPage="Rows per pages"
			/>
		</Card>
	);
}

function EmployeeData({ data }) {
	const [filteredData, setFilteredData] = useState(data);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		const query = searchQuery.toLowerCase();
		const filtered = data.filter((item) => {
			const queryLower = query.toLowerCase();
			const isAcceptFalse = item.is_accept === true; // Assuming is_accept is a boolean
			return (
				isAcceptFalse &&
				(item.first_name.toLowerCase().includes(queryLower) ||
					item.last_name.toLowerCase().includes(queryLower) ||
					item.employee_code.toLowerCase().includes(queryLower))
			);
		});
		setFilteredData(filtered);
		setPage(0); // Reset page to 0 when filtering
	}, [searchQuery, data]);

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0); // Reset page to 0 when changing rows per page
	};

	const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

	return (
		<Card>
			<CardHeader
				sx={{ p: 0, display: 'flex', justifyContent: 'space-between', width: '100%' }}
				title={
					<Box sx={{ display: 'flex', alignItems: 'center', width: '500px' }}>
						<TextField
							value={searchQuery}
							onChange={handleSearchChange}
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
							<TableCell>Employee Code</TableCell>
							<TableCell>Email Id</TableCell>
							<TableCell>Contact No</TableCell>
							<TableCell align="right" />
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredData.length === 0 ? (
							<TableRow>
								<TableCell colSpan={7} align="center">
									<Typography>No matching records found</Typography>
								</TableCell>
							</TableRow>
						) : (
							paginatedData.map((row) => (
								<TableRow hover key={row.id}>
									<TableCell>{row.id}</TableCell>
									<TableCell>{row.first_name}</TableCell>
									<TableCell>{row.last_name}</TableCell>
									<TableCell>{row.employee_code}</TableCell>
									<TableCell>{row.email_address}</TableCell>
									<TableCell>{row.contact_number}</TableCell>
									<TableCell align="right">
										<Tooltip title="View" arrow>
											<IconButton size="small">
												<VisibilityOutlinedIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="Edit" arrow>
											<IconButton color="warning" size="small">
												<ModeEditOutlineOutlinedIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="Delete" arrow>
											<IconButton color="error" size="small">
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
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={filteredData.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handlePageChange}
				onRowsPerPageChange={handleRowsPerPageChange}
				labelRowsPerPage="Rows per pages"
			/>
		</Card>
	);
}

export default TablesElements;
