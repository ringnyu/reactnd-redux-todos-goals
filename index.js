//createStore acts as our library

function createStore (reducer) {
    // The store should have four parts
 // 1. The state
 // 2. Get the state.
 // 3. Listen to changes on the state.
 // 4. Update the state

 //1. The state: state variable will hold the state of our entire application
 let state
 let listeners = []

 //2. Get the state: getState() is solely responsible for returning us the state of our application
 const getState = () => state

 //3.listen to changes on the store
const subscribe = (listener) => {
   listeners.push(listener)
   return () => {
       listeners = listeners.filter((l) => l !== listener)
   }
}

//4. update the state 
const dispatch = (action) => {
   //modify the state by passing the todos function, passing it the specific action that occured
   state = reducer(state, action);
   //loop through the listeners so any listener the user sets up is invoked
   listeners.forEach((listener) => listener())
}
 // giving the user ability to access the state when ever the createStore() is invoked
 return {
     getState,
     subscribe,
     dispatch,
 }
}

//variables to hold the type property
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

//creator functions, used to create the action  objects

function addTodoAction(todo){
    return{
        type: ADD_TODO,
        todo,
    }
}

function removeTodoAction(id){
    return{
        type: REMOVE_TODO,
        id,
    }
}

function toggleTodoAction(id){
    return {
        type: TOGGLE_TODO,
        id,
    }
}

function addGoalAction(goal){
    return {
        type: ADD_GOAL,
        goal,
    }
}

function removeGoalAction(id){
    return {
        type: REMOVE_GOAL,
        id,
    }
}
//our reducer fxn which: updates our state based on a specific action that occurs, we use a pure function
function todos(state = [], action){
    switch(action.type){
        case ADD_TODO :
            return state.concat([action.todo])
        case REMOVE_TODO :
            return state.filter((todo) => todo.id !== action.id)
        case TOGGLE_TODO:
            return state.map((todo) => todo.id !== action.id ? todo :
            Object.assign({}, todo, { complete : !todo.complete }))
        default:
            return state
    }
    
}

function goals(state = [], action){
    switch(action.type){
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id)
        default:
            return state
    }
}

//Since createStore() takes just one argument(reducer), we have to combine the todos and goals reduce
function app (state = {}, action){
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action),
    }
}

//create your store
const store = createStore(app);

//set the listeners, listening to the action user will invoke
store.subscribe(() => {
    console.log("The new state is: ", store.getState())
})

//update the state
 store.dispatch(
     addTodoAction({
        id: 0,
        name: 'Learn Redux',
        complete: false
     }))

 store.dispatch(addTodoAction({
    id: 1,
    name: 'Wash the car',
    complete: false,
  }))
  
  store.dispatch(addTodoAction({
    id: 2,
    name: 'Go to the gym',
    complete: true,
  }))
  
  store.dispatch(removeTodoAction(1))
  
  store.dispatch(toggleTodoAction(0))
  
  store.dispatch(addGoalAction({
    id: 0,
    name: 'Learn Redux'
  }))
  
  store.dispatch(addGoalAction({
    id: 1,
    name: 'Lose 20 pounds'
  }))
  
  store.dispatch(removeGoalAction(0))