import React, { useState } from 'react';
import { createIngredient } from '../api/ingredientApi';

const IngredientForm = ({ onIngredientCreated }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [calories, setCalories] = useState('');
    const [nutrients, setNutrients] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newIngredient = {
            name,
            description,
            calories: parseInt(calories),
            nutrients: JSON.parse(nutrients),
            photo_url: photoUrl
        };
        const createdIngredient = await createIngredient(newIngredient);
        onIngredientCreated(createdIngredient);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="number" placeholder="Calories" value={calories} onChange={(e) => setCalories(e.target.value)} required />
            <input type="text" placeholder="Nutrients (JSON)" value={nutrients} onChange={(e) => setNutrients(e.target.value)} required />
            <input type="text" placeholder="Photo URL" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} required />
            <button type="submit">Create Ingredient</button>
        </form>
    );
};

export default IngredientForm;
