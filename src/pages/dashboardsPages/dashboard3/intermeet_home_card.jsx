import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import CardHeader from '@/components/cardHeader';

import usersData from '@/_mocks/customers';

function IntermeetHomeCard() {
	return (
		<Card type="none">
			<CardHeader
				title="New Internal meet"
				size="small"
				sx={{
					p: 3,
					pb: 0,
				}}
			/>
			<List
				sx={{
					'& > li:not(:last-child)': {
						borderBottom: 1,
						borderColor: (theme) => theme.palette.border,
					},
				}}
			>
				{usersData.slice(0, 6).map((user) => (
					<UserListItem key={user.id} user={user} />
				))}
			</List>
		</Card>
	);
}

function UserListItem({ user }) {
	const { avatarImg, name, rol } = user;
	return (
		<ListItem disablePadding alignItems="flex-start">
			<ListItemButton>
				<ListItemAvatar>
					<Avatar alt="Remy Sharp" src={avatarImg} />
				</ListItemAvatar>
				<span
					style={{
						width: '100%',
					}}
				>
					<Typography variant="subtitle2" fontSize={13} color="primary.main">
						{name}
					</Typography>
					<Typography variant="caption">{rol}</Typography>
				</span>
			</ListItemButton>
		</ListItem>
	);
}

export default IntermeetHomeCard;
