import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**  
 * Represents a single hero slide entry.
 */
export interface HeroSlide {
  id: number;
  label: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home implements OnInit, OnDestroy {

  // ─────────────────────────────────────────────
  // SLIDER STATE
  // ─────────────────────────────────────────────
  currentIndex: number = 0;
  readonly totalSlides: number = 3;

  readonly slides: HeroSlide[] = [
    { id: 0, label: 'Laptop Deal' },
    { id: 1, label: 'Desktop Deal' },
    { id: 2, label: 'Smartphone Deal' }
  ];

  // ─────────────────────────────────────────────
  // AUTO PLAY
  // ─────────────────────────────────────────────
  private autoPlayInterval: ReturnType<typeof setInterval> | null = null;
  private readonly AUTO_PLAY_DELAY_MS: number = 5000;

  // ─────────────────────────────────────────────
  // TOUCH SWIPE
  // ─────────────────────────────────────────────
  private touchStartX: number = 0;
  private readonly SWIPE_THRESHOLD_PX: number = 40;

  // ─────────────────────────────────────────────
  // COMPUTED TRANSFORM (Bound to HTML)
  // ─────────────────────────────────────────────
  get trackTransform(): string {
    return `translateX(-${this.currentIndex * (100 / this.totalSlides)}%)`;
  }

  constructor(private cdRef: ChangeDetectorRef) {}

  // ─────────────────────────────────────────────
  // LIFECYCLE
  // ─────────────────────────────────────────────
  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  // ─────────────────────────────────────────────
  // NAVIGATION METHODS (Called from template)
  // ─────────────────────────────────────────────
  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.triggerChangeDetection();
  }

  prevSlide(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.triggerChangeDetection();
  }

  goTo(index: number): void {
    if (index >= 0 && index < this.totalSlides) {
      this.currentIndex = index;
      this.triggerChangeDetection();
    }
  }

  // ─────────────────────────────────────────────
  // AUTO PLAY CONTROLS
  // ─────────────────────────────────────────────
  pauseAutoPlay(): void {
    this.stopAutoPlay();
  }

  resumeAutoPlay(): void {
    this.startAutoPlay();
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.AUTO_PLAY_DELAY_MS);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayInterval !== null) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  // ─────────────────────────────────────────────
  // KEYBOARD SUPPORT
  // ─────────────────────────────────────────────
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.prevSlide();
    } else if (event.key === 'ArrowRight') {
      this.nextSlide();
    }
  }

  // ─────────────────────────────────────────────
  // TOUCH EVENTS (Mobile Swipe)
  // ─────────────────────────────────────────────
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    const diff: number =
      this.touchStartX - event.changedTouches[0].clientX;

    if (Math.abs(diff) > this.SWIPE_THRESHOLD_PX) {
      diff > 0 ? this.nextSlide() : this.prevSlide();
    }
  }

  // ─────────────────────────────────────────────
  // ONPUSH CHANGE DETECTION FIX
  // ─────────────────────────────────────────────
  private triggerChangeDetection(): void {
    this.cdRef.markForCheck();
  }
}