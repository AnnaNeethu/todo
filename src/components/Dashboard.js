import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from "react";
import './style.css';
import "../App.css";
import { MoreVertical, ChevronDown } from 'react-feather';
import { Input, Dropdown, DropdownItem, Table, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { addDoc, collection, onSnapshot, updateDoc, doc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useParams } from 'react-router-dom';

function Dashboard() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [favorite, setFavorite] = useState(false)
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { email } = useParams();

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, 'todos'), where('email', '==', email)),
            (snapshot) => {
                setData(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    title: doc.data().title,
                    description: doc.data().description,
                    isComplete: doc.data().isComplete,
                    favorite: doc.data().favorite
                })))
            }
        );
        return () => unsubscribe();
    }, [email]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const addTodo = async (e) => {
        try {
            e.preventDefault();
            // const setTodo = ([...data,{ title, description }])
            await addDoc(collection(db, 'todos'), { title, description, isComplete, favorite, email })
            // setData(setTodo)
        }
        catch (error) {
            console.error(error.message)
        }
    }
    const markCompleted = async (id, isComplete) => {
        try {
            const todoDocRef = doc(db, 'todos', id);
            await updateDoc(todoDocRef, { isComplete: !isComplete });
            setIsComplete(!isComplete)
        } catch (error) {
            console.error(error.message);
        }
    }

    const markFavorite = async (id, favorite) => {
        try {
            const todoDocRef = doc(db, 'todos', id);
            await updateDoc(todoDocRef, { favorite: !favorite });
            setFavorite(favorite)
        } catch (error) {
            console.error(error.message);
        }
    }
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilter = (filter) => {
        setFilter(filter);
    };

    const filteredData = data.filter((todo) => {
        if (filter === 'completed') {
            return todo.isComplete;
        } else if (filter === 'favorites') {
            return todo.favorite;
        } else if (filter === 'incomplete') {
            return !todo.isComplete;
        }
        return true;
    }).filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const deleteTodo = async (id) => {
        try {
            await deleteDoc(doc(db, 'todos', id));
            // const filteredTodo = data.filter((todo) => todo.id !== id)
            // setData(filteredTodo)
        }
        catch (error) {
            console.error(error.message)
        }
    }
    return (
        <Container>
            <Row>
                <Col sm='6'>
                    <div className='mt-3'>
                        <h6 className='text-dark'>TODO</h6>
                        <p className='mt-3'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the
                            1500s, when an unknown printer took a galley of type and scrambled
                            it to make a type specimen book.
                        </p>
                    </div>
                    <div>
                        <form onSubmit={(e) => addTodo(e)} className="form-control py-3 border-0">
                            <div className='mb-3 mt-2'>
                                <input type="text" id="title" name="title" placeholder="Title" value={title}
                                    onChange={e => setTitle(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <input type="text" id="description" name="description" placeholder="Description" value={description}
                                    onChange={e => setDescription(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <button type="submit" className='btn btn-primary'>Add</button>
                            </div>
                        </form>
                    </div>
                    {/* <div className="vertical-line"></div> */}
                </Col>
                <Col sm='1'>
                <div className="vertical-line"></div>
                </Col>
                <Col sm='5'>
                    <div className='mt-3'>
                        <h6 className='text-dark'>TODO LIST</h6>
                        <div className='mt-3'>
                            <div className="d-flex justify-contents-between mb-3">
                                <div className="col-3">
                                    <Input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={handleSearch}
                                    />
                                </div>
                                <div className="col-3"></div>
                                <div className="col-3"></div>
                                <div className="col-3">
                                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                                        <DropdownToggle tag="span" className="btn btn-light">
                                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                            <span>
                                                <ChevronDown size={14} />
                                            </span>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => handleFilter('all')}>All</DropdownItem>
                                            <DropdownItem onClick={() => handleFilter('completed')}>Completed</DropdownItem>
                                            <DropdownItem onClick={() => handleFilter('favorites')}>Favorites</DropdownItem>
                                            <DropdownItem onClick={() => handleFilter('incomplete')}>Incomplete</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className='mt-1'>
                                {filteredData.length > 0 && (
                                    <Table hover responsive>
                                        <tbody>
                                            {filteredData.map((row, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="d-flex flex-column">
                                                            <span className="">{row.title}</span>
                                                            <small className="text-truncate text-muted mb-0">{row.description}</small>
                                                            {/* <small className="text-truncate text-muted mb-0">{row.isComplete}</small>
                                                    <small className="text-truncate text-muted mb-0">{row.favorite}</small> */}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="column-action">
                                                            <UncontrolledDropdown>
                                                                <DropdownToggle tag="div" className="btn btn-sm">
                                                                    <MoreVertical size={14} />
                                                                </DropdownToggle>
                                                                <DropdownMenu>
                                                                    <DropdownItem onClick={(e) => { markCompleted(row.id, row.isComplete ?? false) }}>
                                                                        <span className="align-middle">{row.isComplete ? 'Incomplete' : 'Complete'}</span>
                                                                    </DropdownItem>
                                                                    <DropdownItem onClick={(e) => { markFavorite(row.id, row.favorite ?? false) }}>
                                                                        <span className="align-middle">{row.favorite === true ? 'Unfavorite' : 'Favorite'}</span>
                                                                    </DropdownItem>
                                                                    <DropdownItem onClick={(e) => { deleteTodo(row.id) }}>
                                                                        <span className="align-middle">Delete</span>
                                                                    </DropdownItem>
                                                                </DropdownMenu>
                                                            </UncontrolledDropdown>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard
