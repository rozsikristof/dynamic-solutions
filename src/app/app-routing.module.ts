import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInformationComponent } from './pages/user-information/user-information.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
    },
    {
        path: 'profile',
        component: UserProfileComponent
    },
    {
        path: 'information',
        component: UserInformationComponent
    },
    {
        path: '**', // Wildcard: no matching path will redirect to the profile page
        redirectTo: 'profile'
    }
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
