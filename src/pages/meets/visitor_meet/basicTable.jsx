import { useState } from 'react';
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
	TablePagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

import employeesData from '@/_mocks/employees';
import CardHeader from '@/components/cardHeader';

function TablesElements() {
	return (
		<>
			<EmployeeRequestTable />
			<EmployeeData />
		</>
	);
}

function EmployeeRequestTable() {
	const [data, setData] = useState(employeesData);

	const handleChange = (e) => {
		const query = e.target.value.toLowerCase();
		const filteredData = employeesData.filter((item) => item.name.toLowerCase().includes(query));
		setData(filteredData);
	};

	return (
		<Card>
			<CardHeader
				sx={{ p: 0, display: 'flex', justifyContent: 'space-between', width: '100%' }}
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
					</Box>
				}
			/>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Id</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Position</TableCell>
							<TableCell align="right" />
						</TableRow>
					</TableHead>
					<TableBody>
						{data.slice(0, 5).map((row) => (
							<TableRow hover key={row.id}>
								<TableCell>{row.id}</TableCell>
								<TableCell>{row.name}</TableCell>
								<TableCell>{row.position}</TableCell>
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
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Card>
	);
}

function EmployeeData() {
	const [data, setData] = useState(employeesData);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleChange = (e) => {
		const query = e.target.value.toLowerCase();
		const filteredData = employeesData.filter((item) => item.name.toLowerCase().includes(query));
		setData(filteredData);
		setPage(0); // Reset page to 0 when filtering
	};

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0); // Reset page to 0 when changing rows per page
	};

	// Slice data for current page
	const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

	return (
		<Card>
			<CardHeader
				sx={{ p: 0, display: 'flex', justifyContent: 'space-between', width: '100%' }}
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
						<Button variant="contained" endIcon={<AddIcon />} sx={{ ml: 2 }}>
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
							<TableCell>Name</TableCell>
							<TableCell>Position</TableCell>
							<TableCell>Salary</TableCell>
							<TableCell align="right" />
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedData.map((row) => (
							<TableRow hover key={row.id}>
								<TableCell>{row.id}</TableCell>
								<TableCell>{row.name}</TableCell>
								<TableCell>{row.position}</TableCell>
								<TableCell>${row.salary.toLocaleString()}</TableCell>
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
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={data.length}
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
