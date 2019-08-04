import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { FeaturedComponent } from './featured/featured.component';



@NgModule({
    declarations: [HomeComponent, HeroComponent, FeaturedComponent],
    exports: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '',
            component: HomeComponent
        }])
    ]
})
export class HomeModule { }
