describe('Bandák listája', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('meg kell jelennie a kereső inputnak és a dátumválasztónak', () => {
    cy.get('input[placeholder="Keress a felépő bandák között..."]').should(
      'exist'
    );
    cy.get('select').should('exist');
  });

  it('meg kell jelennie a bandák logóinak', () => {
    cy.get('.img-wrapper').find('img.logo').its('length').should('be.gt', 0);
  });

  it('a lapozás gombok működnek', () => {
    cy.contains('button', 'Előző').should('be.disabled');
    cy.contains('button', 'Következő').click();
    cy.get('.pagination span').should('contain.text', '2');
    cy.contains('button', 'Előző').should('not.be.disabled');
  });

  it('a keresési feltétel megváltoztatása visszaállítja az oldalt az elsőre', () => {
    cy.contains('button', 'Következő').click();
    cy.get('.pagination span').should('contain.text', '2');
    cy.get('input[placeholder="Keress a felépő bandák között..."]')
      .clear()
      .type('rock');
    cy.get('.pagination span').should('contain.text', '1');
  });

  it('a lábléc megfelelően jelenik meg és a közösségi média ikonok helyes linkeket tartalmaznak', () => {
    cy.get('footer.footer').should(
      'contain.text',
      'Töltsd le a mobilalkalmazásunkat'
    );
    cy.get('.social-icons a')
      .should('have.length', 4)
      .each(($el) => {
        cy.wrap($el)
          .should('have.attr', 'href')
          .and('match', /^(https:\/\/)/);
      });
  });

  it('Meg kell jelennie a dátum választónak, és tartalmaznia kell a helyes opciókat', () => {
    cy.get('select')
      .should('be.visible')
      .within(() => {
        cy.get('option').first().should('have.value', '');
      });
  });
});

describe('Bejelentkezés oldal', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Megjelenik a bejelentkezési űrlap', () => {
    cy.get('h1.login__title').should('contain.text', 'Bejelentkezés');
    cy.get('input#username').should(
      'have.attr',
      'placeholder',
      'Felhasználónév'
    );
    cy.get('input#password').should('have.attr', 'placeholder', 'Jelszó');
    cy.get('button[type="submit"]').should('contain.text', 'Bejelentkezés');
  });

  it('Felhasználónév és jelszó beírható', () => {
    cy.get('input#username')
      .type('tesztuser')
      .should('have.value', 'tesztuser');
    cy.get('input#password').type('jelszo').should('have.value', 'jelszo');
  });

  it('Hibaüzenet megjelenik sikertelen bejelentkezésnél', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 401,
      body: { message: 'Hibás felhasználónév vagy jelszó' },
    }).as('loginRequest');

    cy.get('#username').type('hibas');
    cy.get('#password').type('rossz');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.get('#error-msg').should(
      'contain.text',
      'Hibás felhasználónév vagy jelszó'
    );
  });

  it('Regisztrációs link elérhető', () => {
    cy.get('.login__sign-in a').should('have.attr', 'routerlink', '/register');
  });

  it('A lábléc és közösségi ikonok helyesen jelennek meg', () => {
    cy.get('footer.footer').should(
      'contain.text',
      'Töltsd le a mobilalkalmazásunkat'
    );
    cy.get('.social-icons a').should('have.length', 4);
    cy.get('.social-icons a[href*="facebook"]').should('exist');
    cy.get('.social-icons a[href*="instagram"]').should('exist');
    cy.get('.social-icons a[href*="youtube"]').should('exist');
    cy.get('.social-icons a[href*="tiktok"]').should('exist');
  });
});

describe('Galéria képek megjelenítése', () => {
  beforeEach(() => {
    cy.visit('/gallery');
  });

  it('Megjelennek a képek', () => {
    cy.get('.image-wrapper img').should('have.length.greaterThan', 0);
  });
});

describe('Kép modál megnyitása és bezárása', () => {
  beforeEach(() => {
    cy.visit('/gallery');
  });

  it('Kattintásra megnyílik a modál', () => {
    cy.get('.image-wrapper').first().click();
    cy.get('.modal').should('be.visible');
    cy.get('.modal-image').should('be.visible');
  });

  it('Kép bezárása a modálon kívülre kattintva', () => {
    cy.get('.image-wrapper').first().click();
    cy.get('.modal').click('topRight');
    cy.get('.modal').should('not.exist');
  });

  it('Kép bezárása az "×" ikonra kattintva', () => {
    cy.get('.image-wrapper').first().click();
    cy.get('.close').click();
    cy.get('.modal').should('not.exist');
  });

  it('Minden kép rendelkezik alt szöveggel', () => {
    cy.get('.image-wrapper img').each(($img) => {
      expect($img).to.have.attr('alt').and.not.be.empty;
    });
  });
});
