import React from 'react';
import BookList from './BookList';
import './App.css';

const App = () => {
	return (
		<div>
			<h1 className="App pt-4 pb-4">Book List</h1>
			<BookList />
		</div>
	);
};

export default App;
