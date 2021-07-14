import bcrypt from 'bcryptjs';
const data = {
    users: [
        {
          name: 'lovehelo98',
          email: 'admin@gmail.com',
          phone: 9866405778,
          password: bcrypt.hashSync('1234', 8),
          isAdmin: true,
        },
        {
          name: 'John',
          email: 'user@example.com',
          phone: 9806835748,
          password: bcrypt.hashSync('1234', 8),
          isAdmin: false,
        },
      ],
    products:[
        {
            name:'Nike Slim Shirt',
            category: 'T-shirts',
            image: '/images/jacket.png',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name:'Adidas Fit Shirt',
            category: 'T-shirts',
            image: '/images/jacket.png',
            price: 120,
            countInStock: 0,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name: 'Lacoste Free Shirt',
            category: 'T-shirts',
            image: '/images/jacket.png',
            price: 120,
            countInStock: 20,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name: 'Nike Slim Pant',
            category: 'T-shirts',
            image: '/images/jacket.png',
            price: 120,
            countInStock: 120,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name:  'Puma Slim Pant',
            category: 'T-shirts',
            image: '/images/jacket.png',
            price: 120,
            countInStock: 120,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name:  'Adidas Fit Pant',
            category: 'T-shirts',
            image: '/images/jacket.png',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name: 'Nike T-shirt 2',
            category: 'T-shirts',
            image: '/images/jacket.png',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name: 'Nike T-shirt 3 ',
            category: 'T-shirts',
            image: '/images/jacket.png',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name: 'Nike T-shirt 4',
            category: 'T-shirts',
            image: '/images/jacket.png',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name: 'Nike T-shirt 5',
            category: 'T-shirts',
            image: '/images/jacket.png',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        }
    ],
};
export default data;