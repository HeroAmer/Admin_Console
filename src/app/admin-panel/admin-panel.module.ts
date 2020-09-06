import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
// import { HeaderPanelComponent} from './header-panel/header-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PreviewUsersComponent } from './preview-users/preview-users.component';

@NgModule({
  declarations: [DashboardComponent, PreviewUsersComponent],
  imports: [CommonModule, AdminPanelRoutingModule],
})
export class AdminPanelModule {}
