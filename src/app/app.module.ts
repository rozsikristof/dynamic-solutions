import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserInformationComponent } from './pages/user-information/user-information.component';
import { AppRoutingModule } from './app-routing.module';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FooterComponent } from './components/footer/footer.component';
import { TextareaComponent } from './components/textarea/textarea.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        UserProfileComponent,
        UserInformationComponent,
        InputComponent,
        CardComponent,
        FooterComponent,
        TextareaComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxFileDropModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
