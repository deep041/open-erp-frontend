import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErpToastContainerComponent } from './shared/ui/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ErpToastContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  title = 'Open ERP';

}
