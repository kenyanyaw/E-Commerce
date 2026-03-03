import { Component } from '@angular/core';
import { CartService } from './cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports: [CommonModule],
  styleUrls: []
})
export class CartComponent {
  constructor(public cartService: CartService) {}

  checkout(): void {            // ← method inside class, lowercase
    console.log('checkout clicked');
  }
}