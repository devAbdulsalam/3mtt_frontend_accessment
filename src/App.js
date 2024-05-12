import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Repost from './Component/Repos_page/Repost';
import Repo from './Component/Singile_Repo/Repo';
import { useState, useRef, useEffect } from 'react';
// import dotenv from 'dotenv';
import logo from './logo.png';
import axios from 'axios';
// dotenv.config();

function App() {
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const repoInputRef = useRef(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [reposPerPage] = useState(10);

	const baseUrl = process.env.REACT_APP_GITHUB_API_URL;
	const repoUrl = process.env.REACT_APP_GITHUB_REPO_URL;

	const fetchRepos = async () => {
		setLoading(true);
		try {
			const res = await axios.get(`${baseUrl}/repos`).then((res) => res.data);
			console.log(res);
			// const data = await res.json();
			setRepos(res);
		} catch (error) {
			console.error('Error fetching repositories:', error);
		}
		setLoading(false);
	};

	const fetchRepoByName = async () => {
		setLoading(true);
		const repoName = repoInputRef.current.value.trim();
		if (repoName) {
			try {
				const res = await fetch(repoUrl + repoName);
				if (!res.ok) {
					throw new Error('Repo does not exist');
				}
				const data = await res.json();
				setRepos([data]);
			} catch (error) {
				console.error('Error fetching repository:', error);
			}
		} else {
			fetchRepos();
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchRepos();
	}, []);

	// Calculate currentRepos based on the currentPage and reposPerPage
	const indexOfLastRepo = currentPage * reposPerPage;
	const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
	const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<Router>
			<div style={{ textAlign: 'center', height: '100%' }}>
				<img
					src={logo}
					alt="Logo"
					style={{ margin: '0 auto', display: 'block' }}
				/>
			</div>
			<Routes>
				<Route
					path="/"
					element={
						<Repost
							fetchRepoByName={fetchRepoByName}
							loading={loading}
							repos={repos}
							fetchRepos={fetchRepos}
							repoInputRef={repoInputRef}
							currentRepos={currentRepos}
							setCurrentPage={setCurrentPage}
							reposPerPage={reposPerPage}
							paginate={paginate}
						/>
					}
				/>
				<Route path="/:id" element={<Repo repoUrl={repoUrl} />} />
			</Routes>
		</Router>
	);
}

export default App;
