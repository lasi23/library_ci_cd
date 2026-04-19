describe('test du site de librairie', ()=>{
    beforeEach(() => {
        cy.fixture('usersLibrary').as('userData');
        cy.visit('http://127.0.0.1:8000')
    })

    it('doit aVOIR UNE BARRE NAV', ()=> {
        cy.get('nav').should('exist')
    })

    it('dioit remplir le formulaire d inscription avec 19 utilisateur', function(){
        cy.visit('127.0.0.1:8000/register')
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
        cy.visit('127.0.0.1:8000/register')

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
        cy.visit('127.0.0.1:8000/login')

        cy.fixture('usersLibrary').then((data) => {
            const user = data.users[5]
            cy.get('#email').type(user.email)
            cy.get('#password').type(user.password)

            cy.get('button[type="submit"]').click()
        })

    })
    
    it('ne doit pas pouvoir ce connecter avec un identiant et mdp non enregisté', ()=>{
        cy.visit('127.0.0.1:8000/login')

        cy.get('#email').type('bob@eponge.fr')
        cy.get('#password').type('1234')

        cy.get('button[type="submit"]').click()
        
        cy.get('article[aria-invalid="true"]').should('contain.text', 'Les informations de connexion sont invalides')
    })

    it('doit ajouter un  livre', ()=>{
    cy.visit('127.0.0.1:8000/login')

            cy.fixture('usersLibrary').then((data) => {
                const user = data.users[5]
                cy.get('#email').type(user.email)
                cy.get('#password').type(user.password)

                cy.get('button[type="submit"]').click()
            })
            cy.visit('127.0.0.1:8000/book/add')
            cy.get('#author').type('Don Miguel RHUIZ')
            cy.get('#description').type('Premier accord toltèque : Que votre parole soit impeccable. Deuxième accord toltèque : N en faites pas une affaire personnelle. Troisième accord toltèque : Ne faites pas de suppositions. Quatrième accord toltèque : Faites toujours de votre mieux.')
            cy.get('#publish_at').type('1997-01-01')
            cy.get('input[type="file"]').selectFile('cypress/fixtures/les_4_accord_tolteque.jpg')
            cy.get('#categories').eq('0')
            cy.get('button[type="submit"]').click()
            cy.get('#title').type('Les 4 accords tolteques')
            
    })

    it('dois pouvoir emprunter un film', ()=> {
        cy.visit('127.0.0.1:8000/login')

        cy.fixture('usersLibrary').then((data) => {
            const user = data.users[5]
            cy.get('#email').type(user.email)
            cy.get('#password').type(user.password)
            cy.get('button[type="submit"]').click()
        })

        cy.visit('127.0.0.1:8000/lending/add')
        // cy.get(#book_id).eq('10')
    })
})
