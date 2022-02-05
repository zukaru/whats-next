import { AfterViewInit, Directive, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[appAnimateOnView]'
})
export class AnimateOnViewDirective implements OnInit, OnDestroy, AfterViewInit {
  height: number;
  eventSubscription: Subscription;

  @HostListener('window:resize', ['$event'])
    onResize() {
    this.height = window.innerHeight;
    }


  constructor(
    public elRef: ElementRef,
    public renderer: Renderer2
  ) { }

  ngOnInit() {
    this.height = window.innerHeight;
    
    this.eventSubscription = fromEvent(document, "scroll", {passive: true})
    .pipe(throttleTime(150))
    .subscribe(e => {
      this.animateOnScroll(this.elRef);
    })
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.renderer.setStyle(this.elRef.nativeElement, 'transition', 'opacity 0.3s, transform 0.3s ease');
    this.animateOnScroll(this.elRef);
  }

  animateOnScroll(el: ElementRef) {
    let introPosition = el.nativeElement.getBoundingClientRect().top;


    if(introPosition > (this.height + 25)) {
      this.renderer.setStyle(el.nativeElement, 'opacity', 0);
      this.renderer.setStyle(el.nativeElement, 'transform', 'scale(0.95)');
      
    }

    if(introPosition < (this.height - 50) ) {
      this.renderer.setStyle(el.nativeElement, 'opacity', 1);
      this.renderer.setStyle(el.nativeElement, 'transform', 'scale(1)');
    } 
  }
}
