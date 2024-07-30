import Breadcrumbs from '@mui/material/Breadcrumbs';

import PageHeader from '@/components/pageHeader';
import { Grid } from '@mui/material';
import DepartmentData from './department_data';
import DesignationData from './designation_data';

function OtherData() {
	return (
		<>
			<PageHeader title="Other Datas">
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					{/*  */}
				</Breadcrumbs>
			</PageHeader>

			<Grid container spacing={2}>
				<Grid item xs={12} sm={6} md={4}>
					<DepartmentData />
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<DesignationData />
				</Grid>
			</Grid>
		</>
	);
}

export default OtherData;
