import React, { useState, useEffect } from 'react';
import { Button, Table, Card, Pagination } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faChevronLeft,faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Siswa() {
    const [posts, setPosts] = useState([]);
    const [records, setRecords] = useState([]);
    const [searchResult, setSearchResult] = useState(true); // Menyimpan status hasil pencarian
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    const getData = () => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };
        fetch("http://localhost:3030/siswa", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setPosts(result);
                setRecords(result);
            })
            .catch((error) => console.log("error", error));
    };

    useEffect(() => {
        getData();
    }, []);

    const handleDelete = async (id) => {
        Swal.fire({
            icon: 'question',
            title: 'Yakin ingin menghapus data?',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const requestOptions = {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                    };
                    await fetch(`http://localhost:3030/siswa/${id}`, requestOptions);
                    const updatedRecords = records.filter(record => record.id !== id);
                    setRecords(updatedRecords);
                    setSearchResult(updatedRecords.length > 0);
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Berhasil menghapus data',
                        timer: 1500,
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                } catch (error) {
                    console.error('Kesalahan saat menghapus data:', error);
                }
            }
        });
    };

    function handleFilter(event) {
        const searchQuery = event.target.value.toLowerCase();
        const newData = posts.filter(row => {
            const { nama, nik, alamat, kelas, gender } = row;
            const rowData = `${nama} ${nik} ${alamat} ${kelas} ${gender}`.toLowerCase();
            return rowData.includes(searchQuery);
        });
        setRecords(newData);
        setSearchResult(newData.length > 0); // Perbarui status hasil pencarian
    }

    // Menghitung indeks data pada halaman saat ini
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = records.slice(indexOfFirstPost, indexOfLastPost);

    // Mengubah halaman
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-5">
            <h1 className='text-center' style={{fontFamily: 'Poopins'}}>Data Siswa</h1>
            <div className="text-end mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <Button href={`/tambah`} className="btn btn-primary" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <input type="text" onChange={handleFilter} placeholder="Search" />
                </div>
            </div>
            <Card>
                <Card.Body>
                    {records.length === 0 ? (
                        <p className="text-center">{searchResult ? "Tidak ada data terbaru" : "Data tidak ditemukan"}</p>
                    ) : (
                        <>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th style={{fontFamily: 'sans-serif'}}>No</th>
                                        <th style={{fontFamily: 'sans-serif'}}>Nama</th>
                                        <th style={{fontFamily: 'sans-serif'}}>NIK</th>
                                        <th style={{fontFamily: 'sans-serif'}}>Alamat</th>
                                        <th style={{fontFamily: 'sans-serif'}}>Kelas</th>
                                        <th style={{fontFamily: 'sans-serif'}}>Gender</th>
                                        <th style={{fontFamily: 'sans-serif'}}>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPosts.map((row, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{row.nama}</td>
                                            <td>{row.nik}</td>
                                            <td>{row.alamat}</td>
                                            <td>{row.kelas}</td>
                                            <td>{row.gender}</td>
                                            <td>
                                                <Button href={`/edit/${row.id}`} variant="warning" className="me-2">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                                <Button variant="danger" onClick={() => handleDelete(row.id)}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div className="d-flex justify-content-center mt-3">
                            <Pagination className="justify-content-center">
                <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    <FontAwesomeIcon icon={faChevronLeft} /> {/* Panah ke kiri */}
                </Pagination.Prev>
                {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map(number => (
                    <Pagination.Item key={number} onClick={() => paginate(number + 1)} active={number + 1 === currentPage}>
                        {number + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(posts.length / postsPerPage)}>
                    <FontAwesomeIcon icon={faChevronRight} /> {/* Panah ke kanan */}
                </Pagination.Next>
            </Pagination>
                            </div>
                        </>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}

export default Siswa;
