import { BamboAuthService } from 'src/app/shared/services/bambo-auth.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe, HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { fr_FR, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';

import { AppComponent } from './app.component';
import { ROUTES, RoutingModule } from './routing/routing.module';
import { LayoutModule } from './layout/layout.module';
import { UIModule } from './ui/ui.module';
import { PagesModule } from './pages/pages.module';
import { pageDataReducer } from './store/reducers/page-data.reducer';
import { appSettingsReducer } from './store/reducers/app-settings.reducer';
import { patientsReducer } from './store/reducers/patients.reducer';
import { NgHttpLoaderModule } from 'ng-http-loader';
import fr from '@angular/common/locales/fr';
registerLocaleData(fr);

export function currentUserProviderFactory(authSrv: BamboAuthService) {
  return () => authSrv.getCurrentUser();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot({
      pageData: pageDataReducer,
      appSettings: appSettingsReducer,
      patients: patientsReducer
    }),
    NgZorroAntdModule,

    RoutingModule,
    LayoutModule,
    UIModule,
    PagesModule,

    ToastrModule.forRoot(),
    NgHttpLoaderModule.forRoot()
    
  ],
  providers: [
    BamboAuthService,
    DatePipe,
    {
      provide: APP_INITIALIZER,
      useFactory: currentUserProviderFactory, deps: [BamboAuthService], multi: true
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: NZ_I18N, useValue: fr_FR }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

declare module '@angular/core' {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
  }
}

