import React, { useState, useEffect } from 'react';
import { Container, Form, ListGroup, Stack, Spinner } from 'react-bootstrap';
import axios from 'axios';
import CustomPagination from './component/CustomPagination';

const BookList = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredBooks, setFilteredBooks] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [showLoader, setShowLoader] = useState(false);
	const [totalResults, setTotalResults] = useState(0);
	const [resultsPerPage] = useState(10);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			setShowLoader(true);
			const formattedKeyword = convertToPlus(searchTerm);
			axios
				.get(
					`https://openlibrary.org/search.json?q=${formattedKeyword}&limit=${resultsPerPage}&page=${currentPage}`
				)
				.then((res) => {
					setFilteredBooks(res.data.docs);
					setTotalResults(res.data.num_found);
					const totalPages = Math.ceil(res.data.num_found / resultsPerPage);
					setTotalPages(totalPages);
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => {
					setShowLoader(false);
				});
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm, currentPage]);

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const convertToPlus = (input) => {
		// Replace special characters and spaces with "+"
		const output = input.replace(/[^a-zA-Z0-9]/g, '+');
		return output;
	};

	return (
		<Container>
			<Stack gap="2">
				<Form>
					<Form.Group controlId="search">
						<Form.Control
							type="text"
							placeholder="Search books"
							value={searchTerm}
							onChange={handleSearch}
						/>
					</Form.Group>
				</Form>
				<ListGroup>
					{showLoader ? (
						<Container className="d-flex justify-content-center mt-4 mb-4">
							<Spinner animation="border" role="status"></Spinner>
						</Container>
					) : (
						filteredBooks.map((book, index) => (
							<ListGroup.Item key={index}>{book.title}</ListGroup.Item>
						))
					)}
				</ListGroup>
				<CustomPagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			</Stack>
		</Container>
	);
};

export default BookList;
