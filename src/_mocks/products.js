import product1 from '@/assets/images/products/product_1.jpg';
import product2 from '@/assets/images/products/product_2.jpg';
import product3 from '@/assets/images/products/product_3.jpg';
import product4 from '@/assets/images/products/product_4.jpg';
import product5 from '@/assets/images/products/product_5.jpg';

function createData(id, productImg, name) {
	return {
		id,
		productImg,
		name,
	};
}

export default [
	createData(1, product1, 'Design query'),
	createData(2, product2, 'General meeting'),
	createData(3, product3, 'Bugs query'),
	createData(4, product4, 'New Figma design'),
	createData(5, product5, 'New Component Add'),
];
