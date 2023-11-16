import React, { useState } from 'react';
import userData from '../Data/userData.json';
import Menu from '../Components/Menu';

const UserTable = () => {
  const [users, setUsers] = useState(userData.users);
  const [sortOrder, setSortOrder] = useState({ column: 'username', order: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    if (currentPage > Math.ceil(updatedUsers.length / itemsPerPage)) {
      setCurrentPage(Math.ceil(updatedUsers.length / itemsPerPage));
    }
  };

  const filterUsers = (users, term) => {
    return users.filter((user) => {
      const searchableColumns = ['username', 'email', 'phone', 'creationDate'];

      return searchableColumns.some((column) => user[column].toLowerCase().includes(term.toLowerCase()));
    });
  };

  const handleSearch = () => {
    const filteredUsers = filterUsers(userData.users, searchTerm);
    setUsers(filteredUsers);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setUsers(userData.users);
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleSortOption = (option, column) => {
    const sortedUsers = [...users];
    sortedUsers.sort((a, b) => {
      return option === 'asc' ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]);
    });
    setUsers(sortedUsers);
    setSortOrder({ column, order: option });
  };

  const handleReport = (userId) => {
    setSelectedUserId(userId);
    setModal(true);
  };

  const closeModal = () => {
    setSelectedUserId(null);
    setModal(false);
  };

  const handleGenerateReport = () => {
    setModal(false);
  };

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const paginationText = `${indexOfFirstItem + 1}-${indexOfLastItem} of ${users.length}`;

  return (
    <div className="flex justify-center items-center flex-col h-[90vh] bg-gray-800">
      <div className="flex items-center flex-col mb-4 sm:flex-row">
        <input type="text" placeholder="Search for users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-4 py-2 border rounded-l focus:outline-none w-full sm:w-64"
        />
        <div className="mt-2 sm:mt-0 sm:ml-2">
          <button onClick={handleSearch} className="bg-indigo-600 text-white px-4 py-2 rounded-tl rounded-bl sm:rounded-l sm:rounded-t hover:bg-indigo-700 focus:outline-none"
          >
            Search
          </button>
          <button onClick={handleClearSearch} className="bg-gray-500 text-white px-4 py-2 rounded-tr rounded-br sm:rounded-r sm:rounded-b ml-2 sm:ml-0 hover:bg-gray-600 focus:outline-none"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="max-w-5xl overflow-auto">
        <table className="table-auto border-collapse sm:w-36 md:w-full h-3/4 bg-white shadow-md over">
          <thead className="text-left">
            <tr className="bg-indigo-800 text-white md:text-2xl ">
              <th className="py-2 px-2 sm:py-1 sm:px-1">ID</th>
              <Menu column="username" sortOrder={sortOrder} handleSortOption={(option) => handleSortOption(option, 'username')}>Username</Menu>
              <Menu column="email" sortOrder={sortOrder} handleSortOption={(option) => handleSortOption(option, 'email')}>Email</Menu>
              <Menu column="phone" sortOrder={sortOrder} handleSortOption={(option) => handleSortOption(option, 'phone')}>Phone</Menu>
              <Menu column="creationDate" sortOrder={sortOrder}handleSortOption={(option) => handleSortOption(option, 'creationDate')}>
              Creation Date</Menu>
              <th className="py-2 px-2 sm:py-4 sm:px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user) => (
              <tr key={user.id} className="border-t border-gray-300 md:text-lg">
                <td className="px-2 py-2 sm:px-3 sm:py-3">{user.id}</td>
                <td className="px-2 py-2 sm:px-3 sm:py-3">{user.username}</td>
                <td className="px-2 py-2 sm:px-3 sm:py-3">{user.email}</td>
                <td className="px-2 py-2 sm:px-3 sm:py-3">{user.phone}</td>
                <td className="px-2 py-2 sm:px-3 sm:py-3">{user.creationDate}</td>
                <td className="px-2 py-2 sm:px-3 sm:py-3">
                  <button className="text-blue-600 mr-2">
                    <span className="border border-blue-600 hover:border-blue-800 hover:text-blue-900 px-2 py-1 rounded transition duration-300 font-bold w-10" onClick={() => handleReport(user.id)}>
                      Report
                    </span>
                  </button>
                  <button className="text-red-600" onClick={() => handleDelete(user.id)}>
                    <span className="border border-red-600 hover:border-red-800 hover:text-red-900 px-2 py-1 rounded transition duration-300 font-bold w-10">
                      Delete
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-end items-center w-full max-w-4xl ml-12">
        <div className="text-white text-3xl mr-6">{paginationText}</div>
        <div className="flex items-center space-x-2">
          <button onClick={() => paginate(currentPage - 1)} className={`border rounded-full focus:outline-none ${currentPage === 1 ? 'bg-gray-400' : 'bg-white transition duration-300 hover:bg-gray-200'}`} disabled={currentPage === 1}
          >
            <svg className="h-10 w-10 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 8 8 12 12 16" /><line x1="16" y1="12" x2="8" y2="12" />
            </svg>
          </button>
          <button onClick={() => paginate(currentPage + 1)} className={`border rounded-full focus:outline-none ${currentPage === totalPages ? 'bg-gray-400' : 'bg-white transition duration-300 hover:bg-gray-200'}`} disabled={currentPage === totalPages}
          >
            <svg className="h-10 w-10 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <circle cx="12" cy="12" r="10" /> <polyline points="12 16 16 12 12 8" /> <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="modal-overlay fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>

          <div className="modal-container bg-indigo-800 w-96 p-4 rounded-md relative z-10">
            <div className="flex justify-end">
              <button className="text-gray-700 text-lg bg-red-500 rounded-full hover:bg-red-600 focus:outline-none" style={{ width: '2rem', height: '2rem' }} onClick={closeModal}>
                X
              </button>
            </div>

            <div className="content text-center text-white">
              <div className="mb-4">
                <span className="text-xl font-bold text-gray-300">ID:</span>{' '}
                <span className="text-xl font-semibold">
                  {users.find((user) => user.id === selectedUserId)?.id}
                </span>
              </div>
              <div className="mb-4">
                <span className="text-xl font-bold text-gray-300">Username:</span>{' '}
                <span className="text-xl font-semibold">
                  {users.find((user) => user.id === selectedUserId)?.username}
                </span>
              </div>
              <div className="mb-4">
                <span className="text-xl font-bold text-gray-300">Email:</span>{' '}
                <span className="text-xl font-semibold">
                  {users.find((user) => user.id === selectedUserId)?.email}
                </span>
              </div>
              <div className="mb-4">
                <span className="text-xl font-bold text-gray-300">Phone:</span>{' '}
                <span className="text-xl font-semibold">
                  {users.find((user) => user.id === selectedUserId)?.phone}
                </span>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded" onClick={handleGenerateReport}>
                Generate Report
              </button>
            </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default UserTable;
