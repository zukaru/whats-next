import { AfterViewInit, Directive, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[appAnimateOnView]'
})
export class AnimateOnViewDirective implements OnInit, OnDestroy, AfterViewInit {

  //




  
  innerHeight: number;
  eventSubscription: Subscription;

  @HostListener('window:resize', ['$event'])
    onResize() {
    this.innerHeight = window.innerHeight;
    }


  constructor(
    public elRef: ElementRef,
    public renderer: Renderer2
  ) { }

  ngOnInit() {
    this.innerHeight = window.innerHeight;

    this.animateOnScroll(this.elRef);

    
    this.eventSubscription = fromEvent(document, "scroll", {passive: true})
    .pipe(throttleTime(100))
    .subscribe(e => {
      this.animateOnScroll(this.elRef);
    })
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.animateOnScroll(this.elRef);
  }

  animateOnScroll(el: ElementRef) {
    let introPosition = el.nativeElement.getBoundingClientRect().top;

    if(this.innerHeight > 800) {
      if(introPosition < (this.innerHeight )) {
        this.renderer.setStyle(el.nativeElement, 'opacity', 1);
        this.renderer.setStyle(el.nativeElement, 'transform', 'scale(1) translateY(0)');
      } else if(introPosition > this.innerHeight - 200) {
        
        this.renderer.removeStyle(el.nativeElement, 'opacity');
        this.renderer.removeStyle(el.nativeElement, 'transform',);
      }
    } else if(introPosition < this.innerHeight + 200) {
      this.renderer.setStyle(el.nativeElement, 'opacity', 1);
      this.renderer.setStyle(el.nativeElement, 'transform', 'scale(1) translateY(0)');
    } else if(introPosition > this.innerHeight + 200) {
      this.renderer.removeStyle(el.nativeElement, 'opacity');
      this.renderer.removeStyle(el.nativeElement, 'transform');
    }

  }


}
