import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-task-overview-card',
  templateUrl: './task-overview-card.component.html',
  styleUrls: ['./task-overview-card.component.scss']
})
export class TaskOverviewCardComponent implements OnInit, OnDestroy, AfterViewInit {
  eventSubscription: Subscription;
  public innerWidth: number;


  @Input() description = 'Replace 2 sections on front driver-side bottom bolster.';
  @Input() dateCreated = '11/14/20';
  @Input() dueDate = '12/4/20';
  @Input() price = '$175.00';
  @Input() fname = 'Joe';
  @Input() lname = 'Shmoe';
  @Input() phone = '(555) 555-5555';
  @Input() status = 'Work Started';

  @ViewChild('self') taskCard: ElementRef;


  @HostListener('window:resize', ['$event'])
    onResize() {
    this.innerWidth = window.innerWidth;
    }






  constructor(
    public renderer: Renderer2
  ) { }

  ngOnInit(): void {
    
    this.innerWidth = window.innerWidth;
    
    this.eventSubscription = fromEvent(document, "scroll", {passive: true})
    .pipe(throttleTime(200))
    .subscribe(e => {
      this.animateOnScroll(this.taskCard);
    })
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.renderer.setStyle(this.taskCard.nativeElement, 'opacity', 1);
    this.renderer.setStyle(this.taskCard.nativeElement, 'transform', 'scale(1)');

  }


  animateOnScroll(el: ElementRef) {
    let introPosition = el.nativeElement.getBoundingClientRect().top;

    if(this.innerWidth > 800) {
      if(introPosition < this.innerWidth) {
        this.renderer.setStyle(el.nativeElement, 'opacity', 1);
        this.renderer.setStyle(el.nativeElement, 'transform', 'scale(1)');
      } else if(introPosition > this.innerWidth * 0.5) {
        
        this.renderer.removeStyle(el.nativeElement, 'opacity');
        this.renderer.removeStyle(el.nativeElement, 'transform');
      }
    } else if(introPosition < this.innerWidth + 200) {
      this.renderer.setStyle(el.nativeElement, 'opacity', 1);
      this.renderer.setStyle(el.nativeElement, 'transform', 'scale(1)');
    } else if(introPosition > this.innerWidth + 200) {
      this.renderer.removeStyle(el.nativeElement, 'opacity');
      this.renderer.removeStyle(el.nativeElement, 'transform');
    }

  }

}
