import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { DscDialogService } from 'sidsc-components/dsc-dialog';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockRouter: jest.Mocked<Router>;
  let mockDialogService: jest.Mocked<DscDialogService>;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn()
    } as any;

    mockDialogService = {
      confirm: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: DscDialogService, useValue: mockDialogService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve navegar para a rota correta ao clicar no card', () => {
    component.cardClicked('/simulacao');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/simulacao']);
  });

  it('deve abrir o dialog e executar a função de confirmação', () => {
    const confirmFunction = jest.fn();
    mockDialogService.confirm.mockImplementation(({ data }) => {
      // Simula o clique no botão de confirmação
      data.actionButton?.confirmFunction?.();
      return { afterClosed: () => of(true) }; // Simula fechamento do diálogo
    });
    

    component.abrirDialogNeutral();

    expect(component.retorno).toBe('Dialog neutral confirmado!');
  });

  it('deve chamar abrirDialogNeutral no ngOnInit se não tiver sido mostrado', () => {
    jest.spyOn(sessionStorage, 'getItem').mockReturnValue(null);
    const abrirDialogSpy = jest.spyOn(component, 'abrirDialogNeutral');

    component.ngOnInit();

    expect(abrirDialogSpy).toHaveBeenCalled();
    expect(sessionStorage.getItem('dialogNeutralShown')).toBe('true');
  });

  it('não deve chamar abrirDialogNeutral no ngOnInit se já tiver sido mostrado', () => {
    jest.spyOn(sessionStorage, 'getItem').mockReturnValue('true');
    const abrirDialogSpy = jest.spyOn(component, 'abrirDialogNeutral');

    component.ngOnInit();

    expect(abrirDialogSpy).not.toHaveBeenCalled();
  });
});
