import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserInformationComponent } from './pages/user-information/user-information.component';
import { AppRoutingModule } from './app-routing.module';
import { InputComponent } from './components/input/input.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        UserProfileComponent,
        UserInformationComponent,
        InputComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
