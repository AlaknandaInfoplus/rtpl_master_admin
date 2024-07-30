import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';

import PageHeader from '@/components/pageHeader';
import BasicTable from './basicTable';

function InternalMeet() {
	return (
		<>
			<PageHeader title="Internal Meet">
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					{/*  */}
				</Breadcrumbs>
			</PageHeader>

			<Stack spacing={5}>
				<BasicTable />
			</Stack>
		</>
	);
}

export default InternalMeet;
