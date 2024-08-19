import axios from 'axios';
import { Product } from '@/types';

export async function fetchProducts(): Promise<Product[]> {
  const response = await axios.get<Product[]>('https://pm3uf3zsxf.us-east-1.awsapprunner.com/products');
  return response.data;
}
