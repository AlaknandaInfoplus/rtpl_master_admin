import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTopOnRouteChange from '@hocs/withScrollTopOnRouteChange';
import withLazyLoadably from '@hocs/withLazyLoadably';

import MainLayout from '@/components/layouts/mainLayout';
import Page404 from '@/pages/errorPages/404';
import VisitorMeet from '@/pages/meets/visitor_meet';
import InternalMeet from '@/pages/meets/internal_meet';
import OuterMeet from '@/pages/meets/outer_meet';
import Projects from '@/pages/projects';

const Dashboard3Page = withLazyLoadably(lazy(() => import('@/pages/dashboardsPages/dashboard3')));
const FormsComponentPage = withLazyLoadably(lazy(() => import('@/pages/componentsPages/admin')));
const TablesComponentPage = withLazyLoadably(lazy(() => import('@/pages/componentsPages/employee')));
const ModalComponentPage = withLazyLoadably(lazy(() => import('@/pages/componentsPages/receptionist')));
const Page403 = withLazyLoadably(lazy(() => import('@/pages/errorPages/403')));
const Page500 = withLazyLoadably(lazy(() => import('@/pages/errorPages/500')));
const Page503 = withLazyLoadably(lazy(() => import('@/pages/errorPages/503')));
const Page505 = withLazyLoadably(lazy(() => import('@/pages/errorPages/505')));
// const EditProfilePage = withLazyLoadably(lazy(() => import('@/pages/editProfile')));
const OtherData = withLazyLoadably(lazy(() => import('@/pages/data')));
const SamplePage = withLazyLoadably(lazy(() => import('@/pages/conferenceroom')));

function Router() {
	return (
		<BrowserRouter>
			<ScrollToTopOnRouteChange>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						<Route index element={<Dashboard3Page />} />
						<Route path="conferenceroom" element={<SamplePage />} />
						<Route path="projects" element={<Projects />} />
						<Route path="otherdata" element={<OtherData />} />
						<Route path="members/">
							<Route path="admin" element={<FormsComponentPage />} />
							<Route path="employee" element={<TablesComponentPage />} />
							<Route path="receptionist" element={<ModalComponentPage />} />
						</Route>
						<Route path="meetings/">
							<Route path="visitormeet" element={<VisitorMeet />} />
							<Route path="intermeet" element={<InternalMeet />} />
							<Route path="outermeet" element={<OuterMeet />} />
							<Route path="error/">
								<Route path="404" element={<Page404 />} />
								<Route path="403" element={<Page403 />} />
								<Route path="500" element={<Page500 />} />
								<Route path="503" element={<Page503 />} />
								<Route path="505" element={<Page505 />} />
							</Route>
						</Route>
					</Route>
					<Route path="*" element={<Page404 />} />
				</Routes>
			</ScrollToTopOnRouteChange>
		</BrowserRouter>
	);
}

export default Router;
