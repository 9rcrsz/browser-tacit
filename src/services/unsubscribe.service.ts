import {Injectable, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

@Injectable()
export class UnsubscribeService implements OnDestroy {
    list: Array<Subscription> = [];

    set handle(o: Subscription) {
        this.list.push(o);
    }

    ngOnDestroy() {
        this.list.forEach(o => o.unsubscribe());
    }
}

