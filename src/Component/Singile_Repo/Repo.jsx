import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import './Repo.css';
import Loading from '../Loding/Loading';
import toast from 'react-hot-toast';

const Repo = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [repodata, setRepodata] = useState([]);

	const { pathname } = location;
	const repoUrl = process.env.REACT_APP_GITHUB_REPO_URL;

	const fetchRepoDatas = async () => {
		setLoading(true);

		try {
			const res = await fetch(repoUrl + pathname);
			if (!res.ok) {
				toast.error('Repo does not exist');
				navigate('/');
			}
			const data = await res.json();

			setRepodata([data]);
		} catch (error) {
			console.error('Error fetching repository:', error);
			toast.error('Error fetching repository');
			navigate('/');
		}

		setLoading(false);
	};

	useEffect(() => {
		fetchRepoDatas();
	}, [pathname]);

	return (
		<div className="repo">
			<div className="repoData">
				{loading ? (
					<Loading />
				) : (
					repodata.map((repoItem) => (
						<div key={repoItem.id}>
							<h1>{repoItem.name}</h1>
							<div className="basicData">
								<span>
									{' '}
									Create at <br />
									{repoItem.created_at}
								</span>
								<span>
									{' '}
									Update at <br /> {repoItem.updated_at}
								</span>
								<span>
									{' '}
									Pushed at <br />
									{repoItem.pushed_at}
								</span>
							</div>
							<div className="links">
								<a href={repoItem.html_url}> Repo</a>
								<br />
								<a href={repoItem.forks_url}>Forks</a>
								<br />
								<a href={repoItem.statuses_url}>Statuses</a>
								<br />
							</div>
						</div>
					))
				)}
				<button onClick={() => navigate('/')} className="backBtn">
					back
				</button>
			</div>
		</div>
	);
};

export default Repo;
