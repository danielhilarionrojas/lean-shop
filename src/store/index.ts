import create from 'zustand';

interface Product {
  id: string;
  name: string;
  price: number;
  discount?: number;
  quantity: number;
  image: string;
}

interface StoreState {
  cart: Product[];
  clearCart: () => void
  productsStore: Product[];
  removeFromCart: (productId: number) => void;
  setProductsStore: (products: Product[]) => void;
  removeAllRelatedProducts: (productId: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  productsStore: [],
  cart: [],
  setProductsStore: (products) => {
    const productsWithQuantity = products.map(product => ({
      ...product,
      quantity: 0,
    }));
    set({ productsStore: productsWithQuantity });
  },
  addToCart: (product, quantity = 1) => set((state) => {
    const existingItem = state.cart.find(item => item.id === product.id);
    if (existingItem) {
      return {
        cart: state.cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      };
    } else {
      return {
        cart: [...state.cart, { ...product, quantity }]
      };
    }
  }),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter((product) => Number(product.id) !== productId),
  })),
  removeAllRelatedProducts: (productId) => set((state) => ({
    cart: state.cart.filter((product) => product.id !== productId),
  })),
  incrementQuantity: (productId) => set((state) => ({
    cart: state.cart.map(item =>
      item.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  })),
  decrementQuantity: (productId) => set((state) => ({
    cart: state.cart.map(item =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  })),
  clearCart: () => set({ cart: [] })
}));