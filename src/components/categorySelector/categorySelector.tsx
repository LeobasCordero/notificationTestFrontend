import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../../services/categoryService';
import Category from '../../models/Category';

interface CategorySelectProps {
    userId: number;
    onCategoryChange: (category: Category) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ userId, onCategoryChange }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | ''>('');

    useEffect(() => {
        const getCategories = async () => {
            if (userId === 0) {
                setCategories([]);
                return;
            }
            try {
                const data = await fetchCategories(userId);
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        getCategories();
    }, [userId]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(event.target.value);
        setSelectedCategory(selectedId);
        const selectedCategoryObj = categories.find(category => category.id === selectedId);
        if (selectedCategoryObj) {
            onCategoryChange(selectedCategoryObj);
        }
    };

    return (
        <div className='category-select'>
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
