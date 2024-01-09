import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersService } from '@services/users.service';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    RouterModule
  ],
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsersComponent {
  public usersService = inject(UsersService)


 }
