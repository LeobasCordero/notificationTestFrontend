import React, { useEffect, useState } from 'react';
import { fetchCategories, Category } from '../../services/categoryService';


interface CategorySelectProps {
    onCategoryChange: (categoryId: number) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ onCategoryChange }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | ''>('');

    useEffect(() => {
        
        const getCategories  = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        getCategories ();
    }, []);


    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(event.target.value);
        setSelectedCategory(selectedId);
        onCategoryChange(selectedId);
    };

    return (
        <div>
            <label htmlFor="categorySelect">Category:</label>
            <select id="categorySelect" value={selectedCategory} onChange={handleSelectChange}>
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.displayName}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategorySelect;
