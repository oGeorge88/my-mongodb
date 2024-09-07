import connect from '@/lib/db';
import Product from '@/models/product';

// API handler to manage product requests
export default async function handler(req, res) {
    try {
        await connect(); // Ensure the database is connected

        switch (req.method) {
            case 'GET':
                // Fetch all products with their category data populated
                try {
                    const products = await Product.find().populate('category');
                    res.status(200).json(products);
                } catch (error) {
                    console.error('Error fetching products:', error);
                    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
                }
                break;

            case 'POST':
                // Add a new product
                try {
                    const newProduct = new Product(req.body); // assuming JSON body is properly formatted
                    const savedProduct = await newProduct.save();
                    res.status(201).json(savedProduct);
                } catch (error) {
                    console.error('Error creating product:', error);
                    res.status(400).json({ message: 'Failed to create product', error: error.message });
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
