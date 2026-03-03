import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showCart = false;

  constructor(
    public cartService: CartService,
    private elementRef: ElementRef,
    private router: Router
  ) {}

  // Open full cart page
  openCartPage(): void {
    this.router.navigate(['/cart']);
  }

  // Toggle mini cart
  toggleCart(): void {
    this.showCart = !this.showCart;
  }

  checkout() {
    console.log('Checkout clicked');
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hideCart();
    }
  }

  private hideCart(): void {
    this.showCart = false;
  }
}