export const validateCategoryId = (categoryId: number): string | null => {
    if (categoryId === 0) {
        return 'Please select a category.';
    }
    return null;
};

export const validateUserId = (userId: number): string | null => {
    if (userId === 0) {
        return 'Please select a user.';
    }
    return null;
};

export const validateContent = (content: string): string | null => {
    if (content.trim() === '') {
        return 'Please enter a message content.';
    }
    return null;
};
