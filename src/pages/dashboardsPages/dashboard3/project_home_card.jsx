import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import CardHeader from '@/components/cardHeader';

function ProjectHomeCard() {
	return (
		<Card type="none">
			<Stack direction="column">
				<CardHeader
					title="All Projects"
					size="small"
					sx={{
						m: 2,
					}}
				>
					{/* <ButtonGroup variant="outlined" size="small" aria-label="temporaly button group">
						{['Today', 'This Month', 'This Week'].map((tab, i) => (
							<Button
								key={i}
								variant={tab === 'This Week' ? 'contained' : 'outlined'}
								sx={{
									...(tab === 'This Week' && {
										outline: (theme) => `2px solid ${theme.palette.primary.main}`,
									}),
								}}
							>
								{tab}
							</Button>
						))}
					</ButtonGroup> */}
				</CardHeader>
				<ProductsTable />
			</Stack>
		</Card>
	);
}

const PURCHASES_DATA = [
	{
		id: '1',
		product: 'RTPL Project 1',
		sold: '1',
		stock: {
			title: 'Pending',
			status: 'error',
		},
		added: '',
		added1: '10/21/2017 10:00 AM',
		gain: 'Rutik Vasani',
	},
	{
		id: '2',
		product: 'RTPL Project 2',
		sold: '4',
		stock: {
			title: 'Completed',
			status: 'success',
		},
		added: '10/20/2017 10:00 AM',
		added1: '10/21/2017 10:00 AM',
		location: 'Room-1',
		gain: 'Rutik Vasani',
	},
	{
		id: '3',
		product: 'RTPL Project 3',
		sold: '3',
		stock: {
			title: 'Completed',
			status: 'success',
		},
		added: '10/19/2017 10:00 AM',
		added1: '10/21/2017 10:00 AM',
		location: 'Room-3',
		gain: 'Rutik Vasani',
	},
	{
		id: '4',
		product: 'RTPL Project 4',
		sold: '8',
		stock: {
			title: 'In Progress',
			status: 'warning',
		},
		added: '',
		added1: '10/21/2017 10:00 AM',
		location: 'Online',
		gain: 'Rutik Vasani',
	},
];

const STATUS_CONFIG = {
	success: {
		color: 'success.main',
	},
	error: {
		color: 'error.main',
	},
	warning: {
		color: 'warning.light',
	},
};

function ProductsTable() {
	return (
		<TableContainer>
			<Table aria-label="products purchases table" size="medium">
				<TableHead>
					<TableRow>
						<TableCell>No</TableCell>
						<TableCell align="left" padding="none" sx={{ minWidth: 140 }}>
							Project
						</TableCell>
						<TableCell align="right">Total Meet</TableCell>
						<TableCell align="right">Start Date</TableCell>
						<TableCell align="right">End Date</TableCell>
						<TableCell align="right">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{PURCHASES_DATA.map((purchase) => (
						<ProductsTableRow key={purchase.id} purchase={purchase} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

function ProductsTableRow({ purchase }) {
	const { id, product, sold, stock, added, added1 } = purchase;
	return (
		<TableRow hover>
			<TableCell>
				{/* <img alt="Item Img" src={product?.productImg} height={40} /> */}
				<Typography variant="body1" color="text.tertiary">
					{id}
				</Typography>
			</TableCell>
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
					{product}
				</Link>
				<Stack direction="row" alignItems="center" spacing={1}>
					<Box
						component="span"
						width={8}
						height={8}
						bgcolor={STATUS_CONFIG[stock?.status]?.color || '#d3d3d3'}
						borderRadius="50%"
					/>
					<Typography variant="caption" color="text.tertiary">
						{stock?.title}
					</Typography>
				</Stack>
			</TableCell>
			<TableCell align="right">
				<Typography variant="body1" color="text.tertiary">
					{sold}
				</Typography>
			</TableCell>
			<TableCell align="right">
				<Typography variant="body1" color="text.tertiary">
					{added1}
				</Typography>
			</TableCell>
			<TableCell align="right">
				<Typography variant="body1" color="text.tertiary">
					{added}
				</Typography>
			</TableCell>
			<TableCell align="center">
				<IconButton size="small">
					<MoreHorizIcon fontSize="small" />
				</IconButton>
			</TableCell>
		</TableRow>
	);
}

export default ProjectHomeCard;
