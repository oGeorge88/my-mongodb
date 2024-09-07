import connect from '@/lib/db';
import Category from '@/models/category';

// API handler to manage category requests
export default async function handler(req, res) {
    try {
        await connect(); // Ensure the database is connected

        switch (req.method) {
            case 'GET':
                // Fetch all categories
                try {
                    const categories = await Category.find();
                    res.status(200).json(categories);
                } catch (error) {
                    console.error('Error fetching categories:', error);
                    res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
                }
                break;

            case 'POST':
                // Add a new category
                try {
                    const newCategory = new Category(req.body); // assuming JSON body is properly formatted
                    const savedCategory = await newCategory.save();
                    res.status(201).json(savedCategory);
                } catch (error) {
                    console.error('Error creating category:', error);
                    res.status(400).json({ message: 'Failed to create category', error: error.message });
                }
                break;

            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ message: 'Database connection error', error: error.message });
    }
}
