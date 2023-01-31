import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IonicModule } from '@ionic/angular';

import { Storage } from '@ionic/storage-angular';

import { HomePage } from './home.page';

import { LogoComponent } from '../components/icons/logo/logo.component';

import { StorageService } from '../services/storage.service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        CommonModule,
        FormsModule,
        HttpClientTestingModule,
        IonicModule.forRoot(),
        LogoComponent,
      ],
      providers: [Storage, StorageService],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
