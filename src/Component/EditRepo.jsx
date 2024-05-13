/* eslint-disable react/prop-types */
import { useState } from 'react';
import Modal from './Modal';
import Swal from 'sweetalert2';

const EditModal = ({ show, setShow, handleAddRepo }) => {
	const [name, setName] = useState(() => show.name);
	const [description, setDescription] = useState(() => show.description);
	const handleSubmit = () => {
		if (!name) {
			Swal.fire(
				'Repo Name is required!',
				'Repository Name is required.',
				'error'
			);
			return;
		}
		if (!description) {
			Swal.fire(
				'Repo Name is required!',
				'Repository Name is required.',
				'error'
			);
			return;
		}
		const data = {
			...show,
			name,
			description,
		};
		handleAddRepo(data);
	};
	return (
		<Modal show={show}>
			<div className="transform overflow-hidden rounded-2xl w-full md:w-[600px] bg-white text-left align-middle shadow-xl transition-all font-josefin">
				<div className="space-y-5 p-4">
					<div className="flex justify-between">
						<h4 className="pl-2  font-semibold text-primary text-[22px]">
							Edit repo
						</h4>
						<button
							onClick={() => setShow(false)}
							className="m-1 p-2 py-1 shadow rounded-full hover:bg-red-300 duration-150 ease-in-out"
						>
							<svg
								data-slot="icon"
								fill="currentColor"
								stroke-width="1.5"
								// stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								className="text-xl text-red-300 hover:text-red-500"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M6 18 18 6M6 6l12 12"
								></path>
							</svg>
						</button>
					</div>
					<div className="divide-y w-full">
						<div className="mb-6 bg-white px-2 py-1 rounded-md">
							{/* <!-- input --> */}
							<div className="mb-5">
								<p className="mb-0 text-base text-black">
									Repo Name <span className="text-red">*</span>
								</p>
								<input
									className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
									type="text"
									placeholder="Repo name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
								<span className="text-tiny">
									A repo name is required and recommended to be unique.
								</span>
							</div>
							<div className="">
								<label className="text-black">
									Description <span className="text-red">*</span>
								</label>
								<textarea
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className="input py-4 rounded-md h-[200px] resize-none w-full border border-gray6  text-black"
								></textarea>
							</div>
						</div>
					</div>
					<div className="flex justify-center w-full">
						<button
							onClick={handleSubmit}
							className="p-2 px-10 bg-green-300 hover:bg-green-400 rounded-md"
						>
							Update repo
						</button>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default EditModal;
