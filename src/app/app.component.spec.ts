import { AppComponent } from './app.component';
import { DscSidenavComponent } from 'sidsc-components/dsc-sidenav';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    component = new AppComponent();
  });

  it('deve ter o título definido corretamente', () => {
    expect(component.title).toBe('app-emprestimos');
  });

  it('deve inicializar os itens do menu no ngOnInit', () => {
    component.ngOnInit();
    expect(component.itemsMenu.length).toBe(4);
    expect(component.itemsMenu[0].title).toBe('Início');
    expect(component.itemsMenu[3].url).toBe('/simulation');
  });

  it('deve alternar o estado do menu lateral ao chamar toggleMenu()', () => {
    const mockSidenav = {
      opened: false
    } as DscSidenavComponent;

    component.sidenav = mockSidenav;
    component.toggleMenu(null);
    expect(component.sidenav.opened).toBe(true);

    component.toggleMenu(null);
    expect(component.sidenav.opened).toBe(false);
  });

  it('não deve lançar erro se sidenav estiver indefinido ao chamar toggleMenu()', () => {
    component.sidenav = undefined;
    expect(() => component.toggleMenu(null)).not.toThrow();
  });
});
