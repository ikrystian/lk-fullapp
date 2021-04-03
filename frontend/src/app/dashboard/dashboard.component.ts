import { Component, Inject, Renderer2, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthenticationStateService } from '../shared/authentication-state.service';
import { Router } from '@angular/router';
import { TokenAuthService } from '../shared/token-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  USER_IMAGE = 'https://scontent-frt3-1.xx.fbcdn.net/v/t1.0-1/p200x200/105966252_10216830499211784_1193981541556713056_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=7206a8&_nc_ohc=3nQs7TVM02IAX8754nu&_nc_ht=scontent-frt3-1.xx&tp=6&oh=f38da299e4057b6485d123c3645dc1e0&oe=6081A1AE';
  showStats:boolean;

  get isDarkMode(): boolean {
    return this.currentTheme === 'theme-dark';
  }

  private currentTheme = 'theme-dark';
  lang = true;
  constructor(
    public translate: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public authenticationStateService: AuthenticationStateService,
    private tokenAuthService: TokenAuthService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {
    translate.addLangs(['pl', 'en']);
    translate.setDefaultLang('pl');
  }

  toggleStatsSection(showStatsOutput: boolean): void {
    this.showStats = showStatsOutput;
  }

  ngOnInit(): void {
    this.currentTheme = localStorage.getItem('activeTheme') || 'theme-dark';
    this.renderer.setAttribute(this.document.body, 'class', this.currentTheme);
  }

  changeLang(lang: string): void {
    this.translate.use(lang);
  }

  onDarkModeSwitched({checked}: MatSlideToggleChange): void {
    this.currentTheme = checked ? 'theme-dark' : 'theme-light';
    this.renderer.setAttribute(this.document.body, 'class', this.currentTheme);
    localStorage.setItem('activeTheme', this.currentTheme);
  }

  logout(): void {
    this.authenticationStateService.setAuthState(false);
    this.tokenAuthService.destroyToken();
    this.router.navigate(['/auth/login']);
    this.snackBar.open('Zostałeś wylogowany', '😥');
  }
}
