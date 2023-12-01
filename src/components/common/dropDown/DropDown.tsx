import React, { useState, ReactNode, useRef, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';

interface DropdownProps {
	buttonContent: ReactNode;
	items: { label: string }[];
	optionClicked: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
	buttonContent,
	items,
	optionClicked,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const closeDropdown = () => {
		setIsOpen(false);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			closeDropdown();
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<Menu as="div" className="relative ml-3" ref={dropdownRef}>
			<div>
				<Menu.Button
					className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
					onClick={() => setIsOpen(!isOpen)}
				>
					<span className="absolute -inset-1.5" />
					{buttonContent}
				</Menu.Button>
			</div>
			<Transition
				show={isOpen}
				as={React.Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					{items.map((item, index) => (
						<Menu.Item key={index}>
							{({ active }) => (
								<a
									onClick={() => optionClicked(item.label)}
									className={`${
										active ? 'bg-gray-100' : ''
									} block px-4 py-2 text-sm text-gray-700`}
								>
									{item.label}
								</a>
							)}
						</Menu.Item>
					))}
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default Dropdown;
