import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Category = () => {
    const [category, setCategory] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/auth/category')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    setError(result.data.Error);
                    alert(result.data.Error);
                }
            })
            .catch(err => {
                console.log(err);
                setError('An error occurred while fetching categories.');
            });
    }, []);

    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Category List</h3>
            </div>
            <Link to="/dashboard/add_category" className='btn btn-success'>Add Category</Link>
            <div className='mt-3'>
                {error && <div className='alert alert-danger'>{error}</div>}
                {category.length === 0 && !error && <div className='alert alert-info'>No categories found.</div>}
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.map((c, index) => (
                            <tr key={index}>
                                <td>{c.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Category;
