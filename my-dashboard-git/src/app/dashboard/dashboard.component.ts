import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidemenuComponent } from '@shared/sidemenu/sidemenu.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ RouterModule, SidemenuComponent ],
  templateUrl: './dashboard.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent { }
