import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Repost from './Component/Repos_page/Repost';
import Repo from './Component/Singile_Repo/Repo';
import NotFound from './Component/NotFound';
function App() {
	const baseUrl = process.env.REACT_APP_GITHUB_API_URL;
	const repoUrl = process.env.REACT_APP_GITHUB_REPO_URL;

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Repost />} />
				<Route path="/:id" element={<Repo repoUrl={repoUrl} />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
