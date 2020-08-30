import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreService } from '../services/store.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { closeWhen } from '../helpers/rxjs-helper';
import { RoutingService } from '../services/routing.service';
import { ProductsHelper } from '../helpers/products-helper';
import { combineLatest } from 'rxjs';
@Component({
  selector: 'app-login-v2',
  templateUrl: './login-v2.component.html',
})
export class LoginV2Component implements OnInit, OnDestroy {
  public fg: FormGroup;
  public isLogged$: Observable<boolean>;
  private destroy$: BehaviorSubject<null> = new BehaviorSubject(null);
  private loginError$: Observable<any>;
  public loginErrorMessage: string;

  constructor(private storeService: StoreService<any>, private routingService: RoutingService) {}

  public ngOnInit(): void {
    this.fg = new FormGroup({
      email: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      password: new FormControl(null, Validators.required),
    });
    this.isLogged$ = this.storeService.isLogged$();
    this.loginError$ = this.storeService.getErrorFromStore();

    combineLatest([this.isLogged$, this.loginError$])
      .pipe(closeWhen(this.destroy$))
      .subscribe(([isLogged, error]) => {
        if (isLogged) {
          this.routingService.updateURL({ status: ProductsHelper.DEFAULT_STATUS, ipp: 60, page: 1 });
        }
        if (error?.message) {
          this.loginErrorMessage = `Erreur d'authentification`;
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  public submit(): void {
    const email = this.fg.get('email').value;
    const pass = this.fg.get('password').value;
    this.storeService.login(email, pass);
  }
}
