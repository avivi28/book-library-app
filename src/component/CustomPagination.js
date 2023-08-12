import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

function CustomPagination({ currentPage, totalPages, onPageChange }) {
	const paginationItems = [];

	// add First and Prev buttons
	paginationItems.push(
		<Pagination.First
			key="first"
			disabled={currentPage === 1}
			onClick={() => onPageChange(1)}
		/>,
		<Pagination.Prev
			key="prev"
			disabled={currentPage === 1}
			onClick={() => onPageChange(currentPage - 1)}
		/>
	);

	// add individual page numbers
	if (totalPages <= 10) {
		// If total pages is less than or equal to 10, show all page numbers
		for (let i = 1; i <= totalPages; i++) {
			paginationItems.push(
				<Pagination.Item
					key={i}
					active={i === currentPage}
					onClick={() => onPageChange(i)}
				>
					{i}
				</Pagination.Item>
			);
		}
	} else {
		// If total pages is greater than 10, show ellipsis in the middle
		if (currentPage <= 5) {
			// Show first 5 page numbers and ellipsis
			for (let i = 1; i <= 5; i++) {
				paginationItems.push(
					<Pagination.Item
						key={i}
						active={i === currentPage}
						onClick={() => onPageChange(i)}
					>
						{i}
					</Pagination.Item>
				);
			}
			paginationItems.push(<Pagination.Ellipsis key="ellipsis1" />);
		} else if (currentPage >= totalPages - 4) {
			// Show last 5 page numbers and ellipsis
			paginationItems.push(<Pagination.Ellipsis key="ellipsis2" />);
			for (let i = totalPages - 4; i <= totalPages; i++) {
				paginationItems.push(
					<Pagination.Item
						key={i}
						active={i === currentPage}
						onClick={() => onPageChange(i)}
					>
						{i}
					</Pagination.Item>
				);
			}
		} else {
			// Show current page, two pages before and after, and ellipsis on both sides
			paginationItems.push(
				<Pagination.Item
					key={currentPage - 2}
					onClick={() => onPageChange(currentPage - 2)}
				>
					{currentPage - 2}
				</Pagination.Item>,
				<Pagination.Ellipsis key="ellipsis3" />
			);
			for (let i = currentPage - 1; i <= currentPage + 1; i++) {
				paginationItems.push(
					<Pagination.Item
						key={i}
						active={i === currentPage}
						onClick={() => onPageChange(i)}
					>
						{i}
					</Pagination.Item>
				);
			}
			paginationItems.push(
				<Pagination.Ellipsis key="ellipsis4" />,
				<Pagination.Item
					key={currentPage + 2}
					onClick={() => onPageChange(currentPage + 2)}
				>
					{currentPage + 2}
				</Pagination.Item>
			);
		}
	}

	// add Next and Last buttons
	paginationItems.push(
		<Pagination.Next
			key="next"
			disabled={currentPage === totalPages}
			onClick={() => onPageChange(currentPage + 1)}
		/>,
		<Pagination.Last
			key="last"
			disabled={currentPage === totalPages}
			onClick={() => onPageChange(totalPages)}
		/>
	);

	return (
		<Pagination className="d-sm-flex flex-wrap justify-content-center">
			{paginationItems}
		</Pagination>
	);
}

export default CustomPagination;
