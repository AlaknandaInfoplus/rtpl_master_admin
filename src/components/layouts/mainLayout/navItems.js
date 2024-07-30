import { v4 as uuid } from 'uuid';
// Icons
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import ChairIcon from '@mui/icons-material/Chair';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';

/**
 * @example
 * {
 *	id: number,
 *	type: "group" | "item",
 *	title: string,
 *	Icon: NodeElement
 *	menuChildren?: {title: string, href: string}[]
 *  menuMinWidth?: number
 * }
 */

const NAV_LINKS_CONFIG = [
	{
		id: uuid(),
		type: 'item',
		title: 'Dashboard',
		Icon: DashboardIcon,
		href: '/',
	},
	{
		id: uuid(),
		type: 'group',
		title: 'Members',
		Icon: GroupIcon,
		menuChildren: [
			{
				title: 'Admins',
				href: '/members/admin',
			},
			{
				title: 'Employees',
				href: '/members/employee',
			},
			{
				title: 'Receptionists',
				href: '/members/receptionist',
			},
		],
	},
	{
		id: uuid(),
		type: 'group',
		title: 'Meetings',
		Icon: AutoStoriesOutlinedIcon,
		menuChildren: [
			{
				title: 'Visitor Meet',
				href: '/meetings/visitormeet',
			},
			{
				title: 'Inter Meeting',
				href: '/meetings/intermeet',
			},
			{
				title: 'Outer Meeting',
				href: '/meetings/outermeet',
			},
		],
	},
	{
		id: uuid(),
		type: 'item',
		title: 'projects',
		Icon: GraphicEqIcon,
		href: '/projects',
	},
	{
		id: uuid(),
		type: 'item',
		title: 'conference rooms',
		Icon: ChairIcon,
		href: '/conferenceroom',
	},
	{
		id: uuid(),
		type: 'item',
		title: 'Data',
		Icon: WidgetsOutlinedIcon,
		href: '/otherdata',
	},
	{
		id: uuid(),
		type: 'item',
		title: 'Profile',
		Icon: AccountCircleOutlinedIcon,
		href: '/profile',
	},
];

export default NAV_LINKS_CONFIG;
