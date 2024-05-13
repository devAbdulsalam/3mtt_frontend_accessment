import { Link } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import './Repost.css';
import Loading from '../Loading';
import axios from 'axios';
import logo from '../../logo.png';
import AddRepoModal from '../AddRepoModal';
import Swal from 'sweetalert2';
import EditModal from '../EditRepo';
import toast from 'react-hot-toast';
const Repost = () => {
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(true);
	const repoInputRef = useRef(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [reposPerPage] = useState(10);

	const baseUrl = process.env.REACT_APP_GITHUB_API_URL;
	const repoUrl = process.env.REACT_APP_GITHUB_REPO_URL;

	const fetchRepos = async () => {
		setLoading(true);
		try {
			const res = await axios.get(`${baseUrl}/repos`).then((res) => res.data);
			// console.log(res);
			// const data = await res.json();
			setRepos(res);
		} catch (error) {
			console.error('Error fetching repositories:', error);
		}
		setLoading(false);
	};

	const fetchRepoByName = async () => {
		const repoName = repoInputRef.current.value.trim();
		if (!repoName) return;
		setLoading(true);
		if (repoName) {
			try {
				const res = await axios(`${repoUrl}/${repoName}`).then(
					(res) => res.data
				);
				if (!res.ok) {
				  toast.error('Repo does not exist');
				}
				setRepos([res]);
			} catch (error) {
				toast.error('Error fetching repository:', error);
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
	useEffect(() => {
		fetchRepos();
	}, []);

	// const [search, setSearch] = useState('');
	const [addModal, setAddModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const handleAddRepo = (data) => {
		setAddModal(false);
		setLoading(true);
		setRepos((prev) => [...prev, data]);
		Swal.fire('Added!', 'Repository has been added successfully.', 'success');
		setLoading(false);
	};

	const handleDelete = (repo) => {
		Swal.fire({
			title: 'Are you sure?',
			text: `You want to delete ${repo.name} repository?`,
			icon: 'question',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, redeem!',
		}).then((result) => {
			if (result.isConfirmed) {
				setLoading(true);
				setRepos((prev) => prev.filter((item) => item.id !== repo.id));
				Swal.fire('Deleted!', 'Repository has been deleted.', 'success');
				setLoading(false);
			}
		});
	};

	const handleEdit = (data) => {
		setRepos((prev) => {
			const updatedRepos = prev.map((item) => {
				if (item.id === data.id) {
					return data;
				}
				return item;
			});
			return [...updatedRepos];
		});
		setEditModal(false);
		Swal.fire('Updated!', 'Repository has been updated.', 'success');
	};

	const [showDeleteTooltip, setShowDeleteTooltip] = useState(false);
	const [showEditTooltip, setShowEditTooltip] = useState(false);

	const handleMouseEnterEdit = (index) => {
		setShowEditTooltip(index);
	};

	const handleMouseLeaveEdit = () => {
		setShowEditTooltip(null);
	};
	const handleMouseEnterDelete = (index) => {
		setShowDeleteTooltip(index);
	};

	const handleMouseLeaveDelete = () => {
		setShowDeleteTooltip(null);
	};

	return (
		<>
			<div className="repost">
				<div className="flex justify-center mb-10">
					<div className="page-title w-full ">
						<img
							src={logo}
							alt="Logo"
							style={{ margin: '0 auto', display: 'block' }}
						/>
						<h3 className="mb-0 text-[28px] text-primary-light text-center">
							My Repositories
						</h3>
					</div>
				</div>
				<div className="body-content px-8 py-8 bg-slate-100">
					{/* <!-- table --> */}
					<div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
						<div className="tp-search-box flex items-center justify-between px-8 py-8">
							<div className="search-input relative">
								<input
									className="input h-[44px] w-full pl-14"
									type="text"
									placeholder="Search by name..."
									ref={repoInputRef}
									autoFocus
								/>
								<button
									onClick={fetchRepoByName}
									className="absolute top-1/2 left-5 translate-y-[-50%] hover:text-theme"
								>
									<svg
										width="16"
										height="16"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										></path>
										<path
											d="M18.9999 19L14.6499 14.65"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										></path>
									</svg>
								</button>
							</div>
							<div className="flex justify-end space-x-6">
								<div className="search-select mr-3 flex items-center space-x-3 ">
									<span className="text-tiny inline-block leading-none -translate-y-[2px]">
										Status :{' '}
									</span>
									<select>
										<option>All</option>
										<option>pending</option>
									</select>
								</div>
								<div className="product-add-btn flex ">
									<button
										onClick={() => setAddModal(true)}
										className="tp-btn bg-info/10 text-info hover:text-white hover:bg-theme"
									>
										{' '}
										<span className="mr-2">
											<svg
												width="15"
												height="15"
												data-slot="icon"
												fill="none"
												stroke-width="1.5"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
												aria-hidden="true"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M12 4.5v15m7.5-7.5h-15"
												></path>
											</svg>
										</span>
										New repo
									</button>
								</div>
							</div>
						</div>
						<div className="relative overflow-x-auto  mx-8">
							<table className="w-full text-base text-left text-gray-500">
								<thead className="bg-white">
									<tr className="border-b border-gray6 text-tiny">
										<th
											scope="col"
											className=" py-3 text-tiny text-text2 uppercase font-semibold w-[3%]"
										>
											<div className="tp-checkbox -translate-y-[3px]">
												<input id="selectAllProduct" type="checkbox" />
												<label htmlFor="selectAllProduct"></label>
											</div>
										</th>
										<th
											scope="col"
											className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold w-[12%]"
										>
											ID
										</th>
										<th
											scope="col"
											className="px-3 py-3 text-tiny text-text2 uppercase font-semibold"
										>
											Name
										</th>
										<th
											scope="col"
											className="px-3 py-3 text-tiny text-text2 uppercase font-semibold text-end"
										>
											Created at
										</th>
										<th
											scope="col"
											className="px-3 py-3 text-tiny text-text2 uppercase font-semibold text-end"
										>
											Language
										</th>
										<th
											scope="col"
											className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-end"
										>
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{currentRepos?.length > 0 &&
										currentRepos?.map((item) => {
											return (
												<tr
													key={item.id}
													className="bg-white border-b border-gray6 last:border-0 text-start mx-9"
												>
													<td className="pr-3  whitespace-nowrap">
														<div className="tp-checkbox">
															<input id="product-1" type="checkbox" />
															<label htmlFor="product-1"></label>
														</div>
													</td>
													<td className="px-3 py-3 font-normal text-[#55585B]">
														#{item?.id}
													</td>
													<td className="pr-8 py-5 whitespace-nowrap">
														<Link to={`/${item.name}`}>
															<div className="flex items-center space-x-5 text-heading">
																<img
																	className="w-[40px] h-[40px] rounded-md"
																	src={`https://ui-avatars.com/api/?name=${item.name}`}
																	alt={item.name}
																/>
																<span className="font-medium ">
																	{item.name}
																</span>
															</div>
														</Link>
													</td>

													<td className="px-3 py-3 text-end">
														{item.created_at}
													</td>
													<td className="px-3 py-3 text-end">
														{item.language}
													</td>
													<td className="px-9 py-3 text-end">
														<div className="flex items-center justify-end space-x-2">
															<div className="relative">
																<button
																	className="w-10 h-10 leading-10 text-tiny bg-success text-white rounded-md hover:bg-green-600"
																	onMouseEnter={() =>
																		handleMouseEnterEdit(item.id)
																	}
																	onMouseLeave={handleMouseLeaveEdit}
																	onClick={() => setEditModal(() => item)}
																	aria-label="Edit"
																>
																	<svg
																		className="-translate-y-px"
																		height="12"
																		viewBox="0 0 492.49284 492"
																		width="12"
																		xmlns="http://www.w3.org/2000/svg"
																	>
																		<path
																			fill="currentColor"
																			d="m304.140625 82.472656-270.976563 270.996094c-1.363281 1.367188-2.347656 3.09375-2.816406 4.949219l-30.035156 120.554687c-.898438 3.628906.167969 7.488282 2.816406 10.136719 2.003906 2.003906 4.734375 3.113281 7.527344 3.113281.855469 0 1.730469-.105468 2.582031-.320312l120.554688-30.039063c1.878906-.46875 3.585937-1.449219 4.949219-2.8125l271-270.976562zm0 0"
																		/>
																		<path
																			fill="currentColor"
																			d="m476.875 45.523438-30.164062-30.164063c-20.160157-20.160156-55.296876-20.140625-75.433594 0l-36.949219 36.949219 105.597656 105.597656 36.949219-36.949219c10.070312-10.066406 15.617188-23.464843 15.617188-37.714843s-5.546876-27.648438-15.617188-37.71875zm0 0"
																		/>
																	</svg>
																</button>
																{showEditTooltip === item.id && (
																	<div className="tooltip-container">
																		<span className="tooltip-content text-tiny whitespace-no-wrap">
																			Edit
																		</span>
																		<div className="tooltip-arrow"></div>
																	</div>
																)}
															</div>
															<div className="relative">
																<button
																	className="w-10 h-10 leading-[33px] text-tiny bg-white border border-gray text-slate-600 rounded-md hover:bg-danger hover:border-danger hover:text-white"
																	onMouseEnter={() =>
																		handleMouseEnterDelete(item.id)
																	}
																	onMouseLeave={handleMouseLeaveDelete}
																	onClick={() => handleDelete(item)}
																>
																	<svg
																		className="-translate-y-px"
																		width="14"
																		height="14"
																		viewBox="0 0 20 22"
																		fill="none"
																		xmlns="http://www.w3.org/2000/svg"
																	>
																		<path
																			d="M19.0697 4.23C17.4597 4.07 15.8497 3.95 14.2297 3.86V3.85L14.0097 2.55C13.8597 1.63 13.6397 0.25 11.2997 0.25H8.67967C6.34967 0.25 6.12967 1.57 5.96967 2.54L5.75967 3.82C4.82967 3.88 3.89967 3.94 2.96967 4.03L0.929669 4.23C0.509669 4.27 0.209669 4.64 0.249669 5.05C0.289669 5.46 0.649669 5.76 1.06967 5.72L3.10967 5.52C8.34967 5 13.6297 5.2 18.9297 5.73C18.9597 5.73 18.9797 5.73 19.0097 5.73C19.3897 5.73 19.7197 5.44 19.7597 5.05C19.7897 4.64 19.4897 4.27 19.0697 4.23Z"
																			fill="currentColor"
																		/>
																		<path
																			d="M17.2297 7.14C16.9897 6.89 16.6597 6.75 16.3197 6.75H3.67975C3.33975 6.75 2.99975 6.89 2.76975 7.14C2.53975 7.39 2.40975 7.73 2.42975 8.08L3.04975 18.34C3.15975 19.86 3.29975 21.76 6.78975 21.76H13.2097C16.6997 21.76 16.8398 19.87 16.9497 18.34L17.5697 8.09C17.5897 7.73 17.4597 7.39 17.2297 7.14ZM11.6597 16.75H8.32975C7.91975 16.75 7.57975 16.41 7.57975 16C7.57975 15.59 7.91975 15.25 8.32975 15.25H11.6597C12.0697 15.25 12.4097 15.59 12.4097 16C12.4097 16.41 12.0697 16.75 11.6597 16.75ZM12.4997 12.75H7.49975C7.08975 12.75 6.74975 12.41 6.74975 12C6.74975 11.59 7.08975 11.25 7.49975 11.25H12.4997C12.9097 11.25 13.2497 11.59 13.2497 12C13.2497 12.41 12.9097 12.75 12.4997 12.75Z"
																			fill="currentColor"
																		/>
																	</svg>
																</button>
																{showDeleteTooltip === item.id && (
																	<div className="flex flex-col items-center z-50 absolute left-1/2 -translate-x-1/2 bottom-full mb-1">
																		<span className="relative z-10 p-2 text-tiny leading-none font-medium text-white whitespace-no-wrap w-max bg-slate-800 rounded py-1 px-2 inline-block">
																			Delete
																		</span>
																		<div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
																	</div>
																)}
															</div>
														</div>
													</td>
												</tr>
											);
										})}
								</tbody>
							</table>
						</div>
						<div className="flex justify-between items-center flex-wrap mx-8">
							<p className="mb-0 text-tiny">
								Showing {reposPerPage} Repos of {repos.length}
							</p>
							<div className="pagination py-3 flex justify-end items-center  mx-8">
								<button
									onClick={() => paginate(currentPage - 1)}
									className="inline-block rounded-md w-10 h-10 text-center leading-[33px] border border-gray mr-2 last:mr-0 hover:bg-theme hover:text-white hover:border-theme"
								>
									<svg
										className="-translate-y-[2px] -translate-x-px"
										width="12"
										height="12"
										viewBox="0 0 12 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M11.9209 1.50495C11.9206 1.90264 11.7623 2.28392 11.4809 2.56495L3.80895 10.237C3.57673 10.4691 3.39252 10.7447 3.26684 11.0481C3.14117 11.3515 3.07648 11.6766 3.07648 12.005C3.07648 12.3333 3.14117 12.6585 3.26684 12.9618C3.39252 13.2652 3.57673 13.5408 3.80895 13.773L11.4709 21.435C11.7442 21.7179 11.8954 22.0968 11.892 22.4901C11.8885 22.8834 11.7308 23.2596 11.4527 23.5377C11.1746 23.8158 10.7983 23.9735 10.405 23.977C10.0118 23.9804 9.63285 23.8292 9.34995 23.556L1.68795 15.9C0.657711 14.8677 0.0791016 13.4689 0.0791016 12.0105C0.0791016 10.552 0.657711 9.15322 1.68795 8.12095L9.35995 0.443953C9.56973 0.234037 9.83706 0.0910666 10.1281 0.0331324C10.4192 -0.0248017 10.7209 0.00490445 10.9951 0.118492C11.2692 0.232079 11.5036 0.424443 11.6684 0.671242C11.8332 0.918041 11.9211 1.20818 11.9209 1.50495Z"
											fill="currentColor"
										/>
									</svg>
								</button>
								{repos &&
									repos.length > 0 &&
									Array.from({
										length: Math.ceil(repos.length / reposPerPage),
									}).map((_, index) => {
										if (currentPage === index + 1) {
											return (
												<button
													key={index}
													className="inline-block rounded-md w-10 h-10 text-center leading-[33px] border mr-2 last:mr-0 text-white bg-theme border-theme hover:bg-theme hover:text-white hover:border-theme"
												>
													{index + 1}
												</button>
											);
										} else {
											return (
												<button
													onClick={() => paginate(index + 1)}
													key={index}
													className="inline-block rounded-md w-10 h-10 text-center leading-[33px] border border-gray mr-2 last:mr-0 hover:bg-theme hover:text-white hover:border-theme"
												>
													{index + 1}
												</button>
											);
										}
									})}

								<button
									onClick={() => paginate(currentPage + 1)}
									className="inline-block rounded-md w-10 h-10 text-center leading-[33px] border border-gray mr-2 last:mr-0 hover:bg-theme hover:text-white hover:border-theme"
								>
									<svg
										className="-translate-y-px"
										width="12"
										height="12"
										viewBox="0 0 12 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M0.0790405 22.5C0.0793906 22.1023 0.237656 21.7211 0.519041 21.44L8.19104 13.768C8.42326 13.5359 8.60747 13.2602 8.73314 12.9569C8.85882 12.6535 8.92351 12.3284 8.92351 12C8.92351 11.6717 8.85882 11.3465 8.73314 11.0432C8.60747 10.7398 8.42326 10.4642 8.19104 10.232L0.52904 2.56502C0.255803 2.28211 0.104612 1.90321 0.108029 1.50992C0.111447 1.11662 0.269201 0.740401 0.547313 0.462289C0.825425 0.184177 1.20164 0.0264236 1.59494 0.0230059C1.98823 0.0195883 2.36714 0.17078 2.65004 0.444017L10.312 8.10502C11.3423 9.13728 11.9209 10.5361 11.9209 11.9945C11.9209 13.4529 11.3423 14.8518 10.312 15.884L2.64004 23.556C2.43056 23.7656 2.16368 23.9085 1.87309 23.9666C1.58249 24.0247 1.2812 23.9954 1.00723 23.8824C0.733259 23.7695 0.498891 23.5779 0.333699 23.3319C0.168506 23.0858 0.0798928 22.7964 0.0790405 22.5Z"
											fill="currentColor"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			{loading && <Loading />}
			<AddRepoModal
				setShow={setAddModal}
				show={addModal}
				handleAddRepo={handleAddRepo}
			/>
			<EditModal
				setShow={setEditModal}
				show={editModal}
				handleAddRepo={handleEdit}
			/>
		</>
	);
};

export default Repost;
