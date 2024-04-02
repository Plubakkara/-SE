import {
	ClockIcon,
	FilmIcon,
	HomeModernIcon,
	MagnifyingGlassIcon,
	TicketIcon,
	UsersIcon,
	VideoCameraIcon
} from '@heroicons/react/24/outline'
import { Bars3Icon } from '@heroicons/react/24/solid'
import axios from 'axios'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
	const { auth, setAuth } = useContext(AuthContext)
	const [menuOpen, setMenuOpen] = useState(false)
	const [isLoggingOut, SetLoggingOut] = useState(false)

	const toggleMenu = () => {
		setMenuOpen(!menuOpen)
	}

	const navigate = useNavigate()

	const onLogout = async () => {
		try {
			SetLoggingOut(true)
			const response = await axios.get('/auth/logout')
			// console.log(response)
			setAuth({ username: null, email: null, role: null, token: null })
			sessionStorage.clear()
			navigate('/')
			toast.success('Logout successful!', {
				position: 'top-center',
				autoClose: 2000,
				pauseOnHover: false
			})
		} catch (error) {
			console.error(error)
			toast.error('Error', {
				position: 'top-center',
				autoClose: 2000,
				pauseOnHover: false
			})
		} finally {
			SetLoggingOut(false)
		}
	}

	const menuLists = () => {
		return (
			<>
				<div className="flex flex-col gap-2 lg:flex-row">
					<Link
						to={'/cinema'}
						style={{ backgroundColor: '#A1C398'}}
						className={`flex items-center justify-center gap-2 rounded-md px-2 py-1 text-gray ${
							window.location.pathname === '/cinema'
								? 'bg-gradient-to-br from-red-400 to-red-400'
								: 'bg-gray-600'
						}`}
					>
						<HomeModernIcon className="h-6 w-6" />
						<p>Cinema</p>
					</Link>
					<Link
						to={'/schedule'}
						style={{ backgroundColor: '#A1C398'}}
						className={`flex items-center justify-center gap-2 rounded-md px-2 py-1 text-gray ${
							window.location.pathname === '/schedule'
								? 'bg-gradient-to-br from-red-400 to-red-400'
								: 'bg-gray-600'
						}`}
					>
						<ClockIcon className="h-6 w-6" />
						<p>Schedule</p>
					</Link>
					{auth.role && (
						<Link
							to={'/ticket'}
							style={{ backgroundColor: '#A1C398'}}
							className={`flex items-center justify-center gap-2 rounded-md px-2 py-1 text-gray ${
								window.location.pathname === '/ticket'
									? 'bg-gradient-to-br from-red-400 to-red-400'
									: 'bg-gray-600'
							}`}
						>
							<TicketIcon className="h-6 w-6" />
							<p>Ticket</p>
						</Link>
					)}
					{auth.role === 'admin' && (
						<>
							<Link
								to={'/movie'}
								style={{ backgroundColor: '#A1C398'}}
								className={`flex items-center justify-center gap-2 rounded-md px-2 py-1 text-gray ${
									window.location.pathname === '/movie'
										? 'bg-gradient-to-br from-red-400 to-red-400'
										: 'bg-gray-600'
								}`}
							>
								<VideoCameraIcon className="h-6 w-6" />
								<p>Movie</p>
							</Link>
							<Link
								to={'/search'}
								style={{ backgroundColor: '#A1C398'}}
								className={`flex items-center justify-center gap-2 rounded-md px-2 py-1 text-gray ${
									window.location.pathname === '/search'
										? 'bg-gradient-to-br from-red-400 to-red-400'
										: 'bg-gray-600'
								}`}
							>
								<MagnifyingGlassIcon className="h-6 w-6" />
								<p>Search</p>
							</Link>
							<Link
								to={'/user'}
								style={{ backgroundColor: '#A1C398'}}
								className={`flex items-center justify-center gap-2 rounded-md px-2 py-1 text-gray ${
									window.location.pathname === '/user'
										? 'bg-gradient-to-br from-red-400 to-red-400'
										: 'bg-gray-600'
								}`}
							>
								<UsersIcon className="h-6 w-6" />
								<p>User</p>
							</Link>
						</>
					)}
				</div>
				<div className="flex grow items-center justify-center gap-3 lg:justify-end">
					{auth.username && (
						<p className="text-md grayspace-nowrap leading-none text-gray">Welcome {auth.username}!</p>
					)}
					{auth.token ? (
						<button
							style={{ backgroundColor: '#A1C398'}}
							className="rounded-lg px-2 py-1 text-gray drop-shadow-md hover:from-indigo-500 hover:to-blue-400 disabled:from-slate-500 disabled:to-slate-400"
							onClick={() => onLogout()}
							disabled={isLoggingOut}
						>
							{isLoggingOut ? 'Processing...' : 'Logout'}
						</button>
					) : (
						<button style={{ backgroundColor: '#A1C398' }} className="rounded-lg px-2 py-1 text-gray drop-shadow-md">
							<Link to={'/login'}>Login</Link>
						</button>
					)}
				</div>
			</>
		)
	}

	return (
		<nav style={{ backgroundColor: '#C6EBC5' }} className="flex flex-col items-center justify-between gap-2 px-4 py-3 drop-shadow-lg lg:flex-row lg:justify-start sm:px-8">
			<div className="flex w-full flex-row justify-between lg:w-fit">
				<button className="flex flex-row items-center gap-2" onClick={() => navigate('/')}>
					<FilmIcon className="h-8 w-8 text-gray" />
					<h1 className="mr-2 text-xl text-gray">Cinema</h1>
				</button>
				<button
					className="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-700 lg:hidden"
					onClick={() => toggleMenu()}
				>
					<Bars3Icon className="h-6 w-6 text-gray" />
				</button>
			</div>
			<div className="hidden grow justify-between gap-2 lg:flex">{menuLists()}</div>
			{menuOpen && <div className="flex w-full grow flex-col gap-2 lg:hidden">{menuLists()}</div>}
		</nav>
	)
}

export default Navbar
