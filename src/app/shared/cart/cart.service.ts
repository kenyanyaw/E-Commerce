import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  addItem(item: any) {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity if item exists
    } else {
      this.cartItems.push({ ...item, quantity: 1 }); // Add new item
    }
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1); // Remove item at index
  }

  clearCart() {
    this.cartItems = []; // Clear all items
  }

  getCartItems() {
    return this.cartItems; // Return all items
  }

  getCartCount() {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0); // Total item count
  }

  getTotal() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0); // Total price
  }
}