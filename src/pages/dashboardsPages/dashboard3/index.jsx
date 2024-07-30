import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';

import PageHeader from '@/components/pageHeader';

import StatsSection from './statsSection';
import MeetingHomeCard from './meeting_home_card';
import VisitorMeetHomeCard from './visitor_meet_homecard';
import IntermeetHomeCard from './intermeet_home_card';
import OutermeetHomeCard from './outer_meet_home_card';
import EmployeeRequestHomeCard from './employee_request_homecard';
import ProjectHomeCard from './project_home_card';

function Dashboard3() {
	return (
		<>
			<PageHeader title="Dashboard">
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					{/* <Link underline="hover" href="#!">
						Inicio
					</Link>
					<Typography color="text.tertiary">Dashboard</Typography> */}
				</Breadcrumbs>
			</PageHeader>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={12} md={12}>
					<StatsSection />
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<VisitorMeetHomeCard />
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<OutermeetHomeCard />
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<EmployeeRequestHomeCard />
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<IntermeetHomeCard />
				</Grid>
				<Grid item xs={12} sm={12} md={9}>
					<ProjectHomeCard />
				</Grid>
				<Grid item xs={12} sm={12} md={12}>
					<MeetingHomeCard />
				</Grid>
			</Grid>
		</>
	);
}

export default Dashboard3;
