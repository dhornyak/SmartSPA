import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { DashboardNavComponent } from './dashboard-nav/dashboard-nav.component';
import { UsersComponent } from './users/users.component';
import { UsersService } from './services/users.service';
import { UserComponent } from './users/user/user.component';
import { UserResolver } from './users/user/user-resolver.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    DashboardNavComponent,
    UsersComponent,
    UserComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/:id', component: UserComponent, resolve: { user: UserResolver } }
    ])
  ],
  providers: [UsersService, UserResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
