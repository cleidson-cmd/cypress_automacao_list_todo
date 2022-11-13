//const { it } = require("mocha")

describe('testando lista todo', ()=>{
    it("carregar site todo", () =>{
        cy.visit('https://phpauloreis.github.io/todo-list-alpine-js/')
    })
    //no cypress o alerta não esta aparecendo, por isso não validei esse ponto no teste
    //se tentar cadastrar um espaço em branco deve aparecer um alerta e não cadastrar a task em branco
    it('se tentar cadastrar um espaço em branco, não deve cadastrar a task em branco. e manter o contador no valor atual', ()=>{
        cy.get('#todo_title').type(' ')//pego input inserindo espaço em branco
        cy.get('.bg-white > .col-auto > .btn').click()//clicar em cadastrar
        cy.contains('[x-text="todo.task"]').should('not.exist')//verificando se não gravou a task em branco
        cy.get('.mb-3').should('include.text', '0')//contador deve estar 0
    })

     //no cypress o alerta não esta aparecendo, por isso não validei esse ponto no teste
     //clicar no botão excluir, deve mostrar um alrta de confirmacão: se sim excluir a task se não cancelar exclusão
    it('clicar no botão excluir, deve excluir a task e a quantidade de tarefas cadastradas deve voltar -1', ()=>{
        cy.get('.text-end > .btn').click() //clicar no botão excluir
        cy.contains('[x-text="todo.task"]').should('not.exist')//verificando se excluiu a task
        cy.get('.mb-3').should('include.text', '0')//verificando se o contador vlotou para 0
    }) 


     //cadastrar task sem inserir valor, deve abrir um aviso e não cadastrar a task em manter o contador com o mesmo valor
     it('cadastrar task sem inserir valor, não deve cadastrar a task, e deve manter o contador com o mesmo valor', ()=>{
        cy.get('#todo_title')//pegando campo input sem inserir valor
        cy.get('.bg-white > .col-auto > .btn').click()// clicando em cadastrar
        cy.get('.mb-3').should('include.text', '0')//verificando se não cadastrou a task vazia       
    })


    it('cadastrando uma task com valor valido, deve cadastrar o registro e a quantidade de tarefas deve aumentar +1', ()=>{
        cy.get('#todo_title').type('registro teste')//pegando campo e inserindo um valor
        cy.get('.bg-white > .col-auto > .btn').click()//clicar em cadastrar
        cy.get('[x-text="todo.task"]').should('include.text', 'registro teste')//verificando se cadastrou
        cy.get('.mb-3').should('include.text', '1')//verificando se o contador somou + 1  
    })


    it('marcar task como feito, deve ficar com aparencia de desabilitada', ()=>{
        cy.get('.form-check-input').check()//pegando checkbox e ativando
        cy.get('.completed')//verifica se tem seletor para aplicar o css 
        cy.get('#todo_title').type('registro em aberto')//inserindo uma task em aberto para testar o filtro
        cy.get('.bg-white > .col-auto > .btn').click()//cadastrando task em aberto
    })


    it('filtrar tasks em aberto, deve exibir apenas tasks em aberto. cadastrar mais uma task para comparar o filtro', ()=>{
        cy.get('select').select('Em aberto')//selecionando filtro de tasks em aberto
        cy.contains('.completed').should('not.exist')//verificando se não existe task concluidas
        cy.get('.mb-3').should('include.text', '1')//verificando se contador esta com1 registro 
    })


    it('filtrar tasks concluidas, deve exibir apenas tasks concluidas.', ()=>{
        cy.get('select').select('Concluídos')//mudando filtro para concluidos
        cy.get('.completed')//verificando se o seletor css de task concluido esta ativo
        cy.get('.mb-3').should('include.text', '1')//verificado contador 
    })

    it('filtrar todas tasks concluidas e não concluidas, deve exibir todas as tasks.', ()=>{
        cy.get('select').select('Todos')//mudando filtro para todos
        cy.get('.mb-3').should('include.text', '2')//verificando pelo contador se as 2 tasks concluidas e em abertas estão aparecendo  
    })
})