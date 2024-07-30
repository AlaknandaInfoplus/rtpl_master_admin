import useAutoCounter from '@hooks/useAutoCounter';

import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
// MUI
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

const STATS_DATA = [
	{
		id: 1,
		color: 'cuaternary.main',
		name: 'Total Visitor meets',
		total: 32604,
		Icon: AssessmentOutlinedIcon,
	},
	{
		id: 2,
		color: 'tertiary.400',
		name: 'Total Internal meets',
		total: 17583,
		Icon: AssessmentOutlinedIcon,
	},
	{
		id: 3,
		color: 'secondary.main',
		name: 'Total Outer meets',
		total: 61119,
		Icon: AssessmentOutlinedIcon,
	},
	{
		id: 4,
		color: 'success.main',
		name: 'Total Projects',
		total: 2942,
		Icon: AssessmentOutlinedIcon,
	},
];

function StatsSection() {
	return (
		<section>
			<Grid container spacing={2}>
				{STATS_DATA.map((stat) => (
					<Grid item xs={12} sm={6} md={3} key={stat.id}>
						<StatSection statData={stat} />
					</Grid>
				))}
			</Grid>
		</section>
	);
}

function StatSection({ statData }) {
	const { name, total, color, Icon } = statData;
	const counter = useAutoCounter({
		limiter: total,
		increment: 500,
		interval: 10,
	});

	return (
		<Card>
			<Stack direction="row" spacing={1} alignItems="center">
				<Icon
					sx={{
						fontSize: 70,
						color,
					}}
					color="disabled"
				/>
				<span>
					<Typography fontSize={30} variant="subtitle1">
						{counter.toLocaleString()}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{name}
					</Typography>
				</span>
			</Stack>
		</Card>
	);
}

export default StatsSection;
