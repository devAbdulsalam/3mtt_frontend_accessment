import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import './Repo.css';
import Loading from '../Loading';
import toast from 'react-hot-toast';
import axios from 'axios';

const Repo = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [repoData, setRepoData] = useState('');

	const { pathname } = location;
	const repoUrl = process.env.REACT_APP_GITHUB_REPO_URL;

	const fetchRepoDatas = async () => {
		setLoading(true);

		try {
			const res = await axios(repoUrl + pathname).then((res) => res.data);
			if (!res) {
				toast.error('Repo does not exist');
				navigate('/');
			}
			// const data = await res.json();
			// console.log('repo data', res);
			setRepoData(res);
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
					<div className="body-content px-8 py-8">
						<div className="flex justify-between items-end flex-wrap mb-4">
							<div className="page-title ">
								<h3 className="mb-0 text-[28px] text-primary-light">
									Name: {repoData?.name}
								</h3>
								<ul className="text-tiny font-medium flex items-center space-x-3 text-text3 text-black">
									<li className="breadcrumb-item text-muted">
										<Link to={'/'} className="text-hover-primary">
											{' '}
											Home
										</Link>
									</li>
									<li className="breadcrumb-item flex items-center">
										<span className="inline-block bg-text3/60 w-[4px] h-[4px] rounded-full"></span>
									</li>
									<li className="breadcrumb-item text-muted text-black">
										<Link to={'/repoDatas'}>{repoData?.name} Details</Link>
									</li>
								</ul>
							</div>
						</div>
						<div>
							<div className="text-primary p-2">
								<h2 className="text-primary-light font-bold text-xl md:text-2xl my-2">
									Create at
								</h2>
								<p className="text-sm md:text-lg">{repoData.created_at}</p>
							</div>
							<div className=" p-2">
								<h2 className="text-primary-light font-bold text-xl md:text-2xl my-2">
									Language
								</h2>
								<p className="text-sm md:text-lg">
									{repoData?.language || 'Javascript'}
								</p>
							</div>
							<div className=" p-2">
								<h2 className="text-primary-light font-bold text-xl md:text-2xl my-2">
									Description
								</h2>
								<p className="text-sm md:text-lg">{repoData?.description}</p>
							</div>
							<div className="text primary p-2">
								<h2 className="text-primary-light font-bold text-xl my-2">
									Updated at
								</h2>
								<p className="text-sm md:text-lg">{repoData.updated_at}</p>
							</div>

							<div className="text primary p-2">
								<h2 className="text-primary-light font-bold text-xl my-2">
									Pushed at
								</h2>
								<p className="text-sm md:text-lg">{repoData.pushed_at}</p>
							</div>
							<div key={repoData.id}>
								<div className="links">
									<a href={repoData.html_url}> Repo</a>
									<br />
									<a href={repoData.forks_url}>Forks</a>
									<br />
									<a
										href={repoData.statuses_url}
										className="px-4"
										style={{ padding: '10px' }}
									>
										Statuses
									</a>
									<br />
								</div>
							</div>
						</div>
					</div>
				)}
				<button onClick={() => navigate('/')} className="backBtn">
					back
				</button>
			</div>
		</div>
	);
};

export default Repo;
