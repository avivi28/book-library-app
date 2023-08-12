import React, { useState } from 'react';
import { Container, Form, ListGroup, Stack, Pagination } from 'react-bootstrap';
import axios from 'axios';

const BookList = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredBooks, setFilteredBooks] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
		const formattedKeyword = convertToPlus(searchTerm);
		axios
			.get(
				`https://openlibrary.org/search.json?q=${formattedKeyword}&limit=10&page=${currentPage}`
			)
			.then((res) => {
				setFilteredBooks(res.data.docs);
			});
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
					{filteredBooks.map((book, index) => (
						<ListGroup.Item key={index}>{book.title}</ListGroup.Item>
					))}
				</ListGroup>
				<Pagination className="d-sm-flex flex-wrap justify-content-center">
					<Pagination.First />
					<Pagination.Prev />
					<Pagination.Item>{1}</Pagination.Item>
					<Pagination.Ellipsis />

					<Pagination.Item>{10}</Pagination.Item>
					<Pagination.Item>{11}</Pagination.Item>
					<Pagination.Item active>{12}</Pagination.Item>
					<Pagination.Item>{13}</Pagination.Item>
					<Pagination.Item disabled>{14}</Pagination.Item>

					<Pagination.Ellipsis />
					<Pagination.Item>{20}</Pagination.Item>
					<Pagination.Next />
					<Pagination.Last />
				</Pagination>
			</Stack>
		</Container>
	);
};

export default BookList;
