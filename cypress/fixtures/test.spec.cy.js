describe('test du site de librairie', ()=>{
    beforeEach(() => {
      // On considère que l'app tourne sur le port par défaut de Vite
        cy.visit('https://library.mithridatem.fr/')
        cy.fixture('usersLibrary').as('userData');
    })

    it('doit aVOIR UNE BARRE NAV', ()=> {
        cy.get('nav').should('exist')
    })

    it('dioit remplir le formulaire d inscription avec 19 utilisateur', function(){
        cy.visit('https://library.mithridatem.fr/register')
        cy.fixture('usersLibrary').then((userData) => {
        const users = userData.all

            userData.users.forEach((user) => {

            cy.get('#firstname').type(user.firstname);
            cy.get('#lastname').type(user.lastname);
            cy.get('#email').type(user.email);
            cy.get('#password').type(user.password);
            cy.get('#confirm-password').type(user.confirmPassword);

            cy.get('button[type="submit"]').click();
            })
        }) 
    })

    it('doit afficher un message si le compte existe déjà', ()=>{
        cy.visit('https://library.mithridatem.fr/register')

        cy.fixture('usersLibrary').then((data) => {

        const user = data.users[0]

        cy.get('#firstname').type(user.firstname)
        cy.get('#lastname').type(user.lastname)
        cy.get('#email').type(user.email)
        cy.get('#password').type(user.password)
        cy.get('#confirm-password').type(user.confirmPassword)

        cy.get('button[type=submit]').click()

        cy.get('article[aria-invalid="true"]').should('contain.text', 'Le compte existe deja en BDD')

        })
    })

    it('doit pouvoir ce connecter', ()=>{
        cy.visit('https://library.mithridatem.fr/login')

        cy.fixture('usersLibrary').then((data) => {
            const user = data.users[5]
            cy.get('#email').type(user.email)
            cy.get('#password').type(user.password)

            cy.get('button[type="submit"]').click()
        })

    })
    
    it('ne doit pas pouvoir ce connecter avec un identiant et mdp non enregisté', ()=>{
        cy.visit('https://library.mithridatem.fr/login')

        cy.get('#email').type('bob@eponge.fr')
        cy.get('#password').type('1234')

        cy.get('button[type="submit"]').click()
        
        cy.get('article[aria-invalid="true"]').should('contain.text', 'Les informations de connexion sont invalides')
    })

    it('doit ajouter un  livre', ()=>{
    cy.visit('https://library.mithridatem.fr/login')

            cy.fixture('usersLibrary').then((data) => {
                const user = data.users[5]
                cy.get('#email').type(user.email)
                cy.get('#password').type(user.password)

                cy.get('button[type="submit"]').click()
            })
            cy.visit('https://library.mithridatem.fr/book/add')
            cy.get('#author').type('Don Miguel RHUIZ')
            cy.get('#description').type('Premier accord toltèque : Que votre parole soit impeccable. Deuxième accord toltèque : N en faites pas une affaire personnelle. Troisième accord toltèque : Ne faites pas de suppositions. Quatrième accord toltèque : Faites toujours de votre mieux.')
            cy.get('#publish_at').type('1997-01-01')
            cy.get('input[type="file"]').selectFile('cypress/fixtures/les_4_accord_tolteque.jpg')
            cy.get('#categories').select('17').invoke('val').should('deep.equal', ['17'])
            cy.get('button[type="submit"]').click()
            cy.get('#title').type('Les 4 accords tolteques')
            
    })

    it('dois pouvoir emprunter un film', ()=> {
        cy.visit('https://library.mithridatem.fr/login')

        cy.fixture('usersLibrary').then((data) => {
            const user = data.users[5]
            cy.get('#email').type(user.email)
            cy.get('#password').type(user.password)
            cy.get('button[type="submit"]').click()
        })

        cy.visit('https://library.mithridatem.fr/lending/add')
        // cy.get(#book_id).eq('10')
    })
})
