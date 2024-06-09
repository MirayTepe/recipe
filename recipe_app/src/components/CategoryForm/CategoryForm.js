// CategoryForm.js
import React, { useState } from 'react';
import { createCategory } from '../api/categoryApi';

const CategoryForm = ({ onCategoryCreated }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCategory = {
            name,
            description,
            tags: tags.split(',').map(tag => tag.trim()),
            photo_url: photoUrl
        };
        const createdCategory = await createCategory(newCategory);
        onCategoryCreated(createdCategory);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
            <input type="text" placeholder="Photo URL" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} required />
            <button type="submit">Create Category</button>
        </form>
    );
};

export default CategoryForm;
