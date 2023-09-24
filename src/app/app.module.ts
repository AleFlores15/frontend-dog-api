import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DogcomponentComponent } from './components/dogcomponent/dogcomponent.component';
import { HttpClientModule } from '@angular/common/http';
import { FactComponent } from './components/fact/fact.component';
import { PaginationControlsPipe } from './components/fact/pagination-controls.pipe';
import { FormsModule } from '@angular/forms';
import { EditFactDialogComponent } from './components/edit-fact-dialog/edit-fact-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FactFormComponent } from './components/fact-form/fact-form.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';


function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'arquitectura',
        clientId: 'dog-api'
      },
      initOptions: {
        onLoad: 'login-required',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}



@NgModule({
  declarations: [
    AppComponent,
    DogcomponentComponent,
    FactComponent,
    PaginationControlsPipe,
    EditFactDialogComponent,
    FactFormComponent,
    ForbiddenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
