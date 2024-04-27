import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'animals',
    loadChildren: () => import('./animals/animals.module').then( m => m.AnimalsPageModule)
  },
  {
    path: 'keepers',
    loadChildren: () => import('./keepers/keepers.module').then( m => m.KeepersPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'animal-detail/:idanimal',
    loadChildren: () => import('./animal-detail/animal-detail.module').then( m => m.AnimalDetailPageModule)
  },
  {
    path: 'keeper-detail/:idkeeper',
    loadChildren: () => import('./keeper-detail/keeper-detail.module').then( m => m.KeeperDetailPageModule)
  },
  {
    path: 'detail-exhibit/:idkeeper',
    loadChildren: () => import('./detail-exhibit/detail-exhibit.module').then( m => m.DetailExhibitPageModule)
  },
  {
    path: 'notification/:page',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },

  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
