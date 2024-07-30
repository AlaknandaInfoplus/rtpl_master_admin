import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';

import PageHeader from '@/components/pageHeader';
import BasicTable from './basicTable';

function Conferenceroom() {
	return (
		<>
			<PageHeader title="Conference Room">
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

export default Conferenceroom;
