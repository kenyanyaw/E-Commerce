import { Component, HostListener, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnDestroy {
  /* STATE */
  // Sticky header
  isScrolled = signal(false);
  // Mobile drawer
  drawerOpen = signal(false);
  // Badge counts
  cartCount = signal(5);
  messageCount = signal(3);
  // Search
  searchQuery = '';
 readonly categoryGroups = [
  {
    title: 'Electronics',
    items: [
      { label: 'Laptops & PCs',   icon: 'fa-laptop',         path: '/shop?category=laptops' },
      { label: 'Smartphones',     icon: 'fa-mobile-screen',  path: '/shop?category=smartphones' },
      { label: 'Audio',           icon: 'fa-headphones',     path: '/shop?category=audio' },
      { label: 'Televisions',     icon: 'fa-tv',             path: '/shop?category=televisions' },
      { label: 'Cameras',         icon: 'fa-camera',         path: '/shop?category=cameras' },
    ]
  },
  {
    title: 'Fashion & Apparel',
    items: [
      { label: "Men's Clothing",  icon: 'fa-shirt',          path: '/shop?category=mens-clothing' },
      { label: "Women's Clothing",icon: 'fa-vest',           path: '/shop?category=womens-clothing' },
      { label: 'Shoes',           icon: 'fa-shoe-prints',    path: '/shop?category=shoes' },
      { label: 'Watches',         icon: 'fa-clock',          path: '/shop?category=watches' },
      { label: 'Bags',            icon: 'fa-bag-shopping',   path: '/shop?category=bags' },
    ]
  },
  {
    title: 'Home & Living',
    items: [
      { label: 'Furniture',       icon: 'fa-couch',          path: '/shop?category=furniture' },
      { label: 'Kitchen',         icon: 'fa-kitchen-set',    path: '/shop?category=kitchen' },
      { label: 'Bedding',         icon: 'fa-bed',            path: '/shop?category=bedding' },
      { label: 'Lighting',        icon: 'fa-lightbulb',      path: '/shop?category=lighting' },
      { label: 'Garden',          icon: 'fa-seedling',       path: '/shop?category=garden' },
    ]
  },
  {
    title: 'Digital Products',
    items: [
      { label: 'eBooks & Guides', icon: 'fa-book-open',      path: '/shop?category=ebooks' },
      { label: 'Software & Tools',icon: 'fa-floppy-disk',    path: '/shop?category=software' },
      { label: 'Templates',       icon: 'fa-file-code',      path: '/shop?category=templates' },
      { label: 'Online Courses',  icon: 'fa-graduation-cap', path: '/shop?category=courses' },
      { label: 'Graphics & Art',  icon: 'fa-palette',        path: '/shop?category=graphics' },
    ]
  },
  {
    title: 'Services',
    items: [
      { label: 'Web Development', icon: 'fa-code',           path: '/services?category=web-dev' },
      { label: 'Graphic Design',  icon: 'fa-pen-ruler',      path: '/services?category=design' },
      { label: 'Photography',     icon: 'fa-camera-retro',   path: '/services?category=photography' },
      { label: 'Consulting',      icon: 'fa-briefcase',      path: '/services?category=consulting' },
      { label: 'Marketing',       icon: 'fa-bullhorn',       path: '/services?category=marketing' },
    ]
  },
  {
    title: 'Health & Beauty',
    items: [
      { label: 'Skincare',        icon: 'fa-soap',           path: '/shop?category=skincare' },
      { label: 'Supplements',     icon: 'fa-capsules',       path: '/shop?category=supplements' },
      { label: 'Hair Care',       icon: 'fa-pump-soap',      path: '/shop?category=haircare' },
      { label: 'Fitness Gear',    icon: 'fa-dumbbell',       path: '/shop?category=fitness' },
      { label: 'Medical',         icon: 'fa-stethoscope',    path: '/shop?category=medical' },
    ]
  },
  {
    title: 'Vendors',
    items: [
      { label: 'Top Rated',       icon: 'fa-star',           path: '/vendors?filter=top-rated' },
      { label: 'New Sellers',     icon: 'fa-store',          path: '/vendors?filter=new' },
      { label: 'Verified Stores', icon: 'fa-circle-check',   path: '/vendors?filter=verified' },
      { label: 'Local Vendors',   icon: 'fa-location-dot',   path: '/vendors?filter=local' },
      { label: 'Become a Vendor', icon: 'fa-handshake',      path: '/vendor/register' },
    ]
  },
  {
    title: 'Deals & Offers',
    items: [
      { label: 'Flash Sales',     icon: 'fa-bolt',           path: '/deals?type=flash' },
      { label: 'Daily Deals',     icon: 'fa-calendar-day',   path: '/deals?type=daily' },
      { label: 'Clearance',       icon: 'fa-tags',           path: '/deals?type=clearance' },
      { label: 'Bundle Offers',   icon: 'fa-boxes-stacked',  path: '/deals?type=bundles' },
      { label: 'Promo Codes',     icon: 'fa-ticket',         path: '/deals?type=promo' },
    ]
  },
];
  /*  MOBILE DRAWER LINKS  */
  readonly drawerLinks = [
    { label: 'Home', path: '/', icon: 'fa-house', iconColor: '#0f4fff' },
    { label: 'Categories', path: '/categories', icon: 'fa-grip', iconColor: '#0f4fff' },
    { label: 'MarketPlace', path: '/marketplace', icon: 'fa-tag', iconColor: '#ff4a1c' },
    { label: 'Services', path: '/services', icon: 'fa-star', iconColor: '#0f4fff' },
    { label: 'Vendors', path: '/vendors', icon: 'fa-trophy', iconColor: '#0f4fff' },
    { label: 'About Us', path: '/about-us', icon: 'fa-user', iconColor: '#0f4fff' },
    { label: 'Messages', path: '/messages', icon: 'fa-comment-dots', iconColor: '#0f4fff' },
    { label: 'Cart (5)', path: '/cart', icon: 'fa-bag-shopping', iconColor: '#0f4fff' },
    { label: 'Trade Assurance', path: '/trade-assurance', icon: 'fa-shield-halved', iconColor: '#0f4fff' },
    { label: 'Contact Us', path: '/contact-us', icon: 'fa-phone', iconColor: '#0f4fff' },
    { label: 'Blog', path: '/blog', icon: 'fa-newspaper', iconColor: '#0f4fff' },
    { label: 'Support', path: '/support', icon: 'fa-circle-question', iconColor: '#0f4fff' },
  ];

  /* ───────── SCROLL BEHAVIOR ───────── */
  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  /* ───────── ESC KEY CLOSE DRAWER ───────── */

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeDrawer();
  }

  /* ───────── DRAWER CONTROL ───────── */

  toggleDrawer() {
    this.drawerOpen() ? this.closeDrawer() : this.openDrawer();
  }

  openDrawer() {
    this.drawerOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeDrawer() {
    this.drawerOpen.set(false);
    document.body.style.overflow = '';
  }

  /* ───────── SEARCH ───────── */

  onSearch(event: Event) {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      console.log('Search:', this.searchQuery);
    }
  }

  onDrawerSearch(event: Event) {
    event.preventDefault();
    console.log('Mobile Search:', this.searchQuery);
  }

  /* ───────── ACCESSIBILITY ───────── */

  get hamburgerExpanded(): string {
    return this.drawerOpen() ? 'true' : 'false';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }
}  