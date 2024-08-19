import axios from 'axios';
import { Product } from '@/types';

export async function fetchProductById(id: string): Promise<Product> {
  const response = await axios.get<Product>(`https://pm3uf3zsxf.us-east-1.awsapprunner.com/products/${id}`);
  return response.data;
}
